import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { GRAPH_COLORS } from "@/components/graph/graph-colors";
import { cn } from "@/lib/utils";

type ProjectionInputs = {
  subscription: number;
  initialCharge: number;
  retentionRate: number;
  acquisitionRate: number;
  leadVolume: number;
};

type ProjectionPoint = {
  month: number;
  label: string;
  activeClients: number;
  newClients: number;
  revenue: number;
  cost: number;
  profit: number;
};

type CostModel = {
  fixedMonthly: number;
  perLead: number;
  perNewClient: number;
  perActiveClient: number;
};

const PROJECTION_MONTHS = Array.from({ length: 12 }, (_, index) => index + 1);
const DEFAULT_INPUTS: ProjectionInputs = {
  subscription: 15,
  initialCharge: 30,
  retentionRate: 90,
  acquisitionRate: 8,
  leadVolume: 120,
};

const COST_MODEL: CostModel = {
  fixedMonthly: 240,
  perLead: 4,
  perNewClient: 28,
  perActiveClient: 14,
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value: number) {
  return `${value.toFixed(0)}%`;
}

function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
  }).format(value);
}

function buildProjection(inputs: ProjectionInputs): ProjectionPoint[] {
  const points: ProjectionPoint[] = [];
  let activeClients = 0;
  const retention = inputs.retentionRate / 100;
  const acquisition = inputs.acquisitionRate / 100;

  for (const month of PROJECTION_MONTHS) {
    const newClients = inputs.leadVolume * acquisition;
    const retainedClients = activeClients * retention;
    activeClients = retainedClients + newClients;

    const recurringRevenue = activeClients * inputs.subscription;
    const onboardingRevenue = newClients * inputs.initialCharge;
    const revenue = recurringRevenue + onboardingRevenue;

    const cost =
      COST_MODEL.fixedMonthly +
      inputs.leadVolume * COST_MODEL.perLead +
      newClients * COST_MODEL.perNewClient +
      activeClients * COST_MODEL.perActiveClient;

    points.push({
      month,
      label: `M${month}`,
      activeClients,
      newClients,
      revenue,
      cost,
      profit: revenue - cost,
    });
  }

  return points;
}

function StatCard({
  label,
  value,
  note,
  tone = "default",
}: {
  label: string;
  value: string;
  note?: string;
  tone?: "default" | "positive" | "negative";
}) {
  return (
    <div
      className={cn(
        "border border-border/40 bg-background/30 p-4",
        tone === "positive" && "border-emerald-500/30 bg-emerald-500/5",
        tone === "negative" && "border-rose-500/30 bg-rose-500/5"
      )}
    >
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-xl font-semibold text-foreground">{value}</p>
      {note ? <p className="mt-1 text-sm text-muted-foreground">{note}</p> : null}
    </div>
  );
}

function SliderRow({
  label,
  valueLabel,
  minLabel,
  maxLabel,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  valueLabel: string;
  minLabel: string;
  maxLabel: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-2 rounded-2xl border border-border/40 bg-background/30 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">{valueLabel}</p>
        </div>
        <p className="text-sm font-semibold text-primary">{valueLabel}</p>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(next) => onChange(next[0] ?? value)}
      />
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

function ProjectionChart({
  data,
}: {
  data: ProjectionPoint[];
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const observer = new ResizeObserver((entries) => {
      const nextWidth = Math.floor(entries[0]?.contentRect.width ?? 0);
      setWidth((prev) => (prev === nextWidth ? prev : nextWidth));
    });

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || width <= 0 || data.length === 0) return;

    const height = 320;
    const margin = { top: 20, right: 24, bottom: 44, left: 56 };
    const innerWidth = Math.max(width - margin.left - margin.right, 0);
    const innerHeight = Math.max(height - margin.top - margin.bottom, 0);
    if (innerWidth <= 0 || innerHeight <= 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "none");

    const root = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    const x = d3.scaleLinear().domain([1, data.length]).range([0, innerWidth]);
    const minY = Math.min(0, d3.min(data, (point) => Math.min(point.profit, point.cost, point.revenue)) ?? 0);
    const maxY = d3.max(data, (point) => Math.max(point.profit, point.cost, point.revenue)) ?? 0;
    const y = d3.scaleLinear().domain([minY, maxY * 1.08 || 1]).nice().range([innerHeight, 0]);

    const line = d3
      .line<ProjectionPoint>()
      .x((point) => x(point.month))
      .y((point) => y(point.revenue))
      .curve(d3.curveMonotoneX);

    const costLine = d3
      .line<ProjectionPoint>()
      .x((point) => x(point.month))
      .y((point) => y(point.cost))
      .curve(d3.curveMonotoneX);

    const profitLine = d3
      .line<ProjectionPoint>()
      .x((point) => x(point.month))
      .y((point) => y(point.profit))
      .curve(d3.curveMonotoneX);

    const revenueArea = d3
      .area<ProjectionPoint>()
      .x((point) => x(point.month))
      .y0(y(0))
      .y1((point) => y(point.revenue))
      .curve(d3.curveMonotoneX);

    const profitArea = d3
      .area<ProjectionPoint>()
      .x((point) => x(point.month))
      .y0(y(0))
      .y1((point) => y(Math.max(0, point.profit)))
      .curve(d3.curveMonotoneX);

    const xAxis = d3
      .axisBottom(x)
      .tickValues(data.map((point) => point.month))
      .tickFormat((value) => `M${value}`);
    const yAxis = d3.axisLeft(y).ticks(5).tickFormat((value) => formatMoney(Number(value)));

    root
      .append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis as never)
      .call((group) => group.selectAll("text").attr("fill", "hsl(var(--muted-foreground))"));

    root
      .append("g")
      .call(yAxis as never)
      .call((group) => group.selectAll("text").attr("fill", "hsl(var(--muted-foreground))"));

    root
      .append("g")
      .selectAll("line")
      .data(y.ticks(5))
      .join("line")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", (tick) => y(tick))
      .attr("y2", (tick) => y(tick))
      .attr("stroke", "hsl(var(--border) / 0.5)")
      .attr("stroke-dasharray", "4 6");

    root
      .append("path")
      .datum(data)
      .attr("fill", "hsl(var(--chart-1) / 0.12)")
      .attr("d", revenueArea as never);

    root
      .append("path")
      .datum(data)
      .attr("fill", "hsl(var(--chart-4) / 0.12)")
      .attr("d", profitArea as never);

    root
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", GRAPH_COLORS[0])
      .attr("stroke-width", 3)
      .attr("d", line as never);

    root
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", GRAPH_COLORS[3])
      .attr("stroke-dasharray", "7 5")
      .attr("stroke-width", 2.25)
      .attr("d", costLine as never);

    root
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", GRAPH_COLORS[2])
      .attr("stroke-width", 2.5)
      .attr("d", profitLine as never);

    root
      .selectAll("circle.revenue")
      .data(data)
      .join("circle")
      .attr("class", "revenue")
      .attr("cx", (point) => x(point.month))
      .attr("cy", (point) => y(point.revenue))
      .attr("r", 3.5)
      .attr("fill", GRAPH_COLORS[0]);

    root
      .selectAll("circle.cost")
      .data(data)
      .join("circle")
      .attr("class", "cost")
      .attr("cx", (point) => x(point.month))
      .attr("cy", (point) => y(point.cost))
      .attr("r", 3)
      .attr("fill", GRAPH_COLORS[3]);

    root
      .selectAll("circle.profit")
      .data(data)
      .join("circle")
      .attr("class", "profit")
      .attr("cx", (point) => x(point.month))
      .attr("cy", (point) => y(point.profit))
      .attr("r", 3.25)
      .attr("fill", GRAPH_COLORS[2]);
  }, [data, width]);

  return (
    <div ref={hostRef} className="h-full w-full">
      <svg ref={svgRef} className="block h-full w-full" />
    </div>
  );
}

export function BusinessPlanProjectionModel() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);

  const projection = useMemo(() => buildProjection(inputs), [inputs]);

  const totals = useMemo(() => {
    const totalRevenue = projection.reduce((sum, point) => sum + point.revenue, 0);
    const totalCost = projection.reduce((sum, point) => sum + point.cost, 0);
    const totalProfit = totalRevenue - totalCost;
    let runningProfit = 0;
    let breakEvenMonth: number | null = null;

    for (const point of projection) {
      runningProfit += point.profit;
      if (runningProfit >= 0) {
        breakEvenMonth = point.month;
        break;
      }
    }
    const finalMonth = projection[projection.length - 1];

    return {
      totalRevenue,
      totalCost,
      totalProfit,
      breakEvenMonth,
      finalMonth,
    };
  }, [projection]);

  const leadToClientNote = `${formatPercent(inputs.acquisitionRate)} of ${formatCompactNumber(inputs.leadVolume)} leads = ${formatCompactNumber(
    inputs.leadVolume * (inputs.acquisitionRate / 100)
  )} new clients/month`;

  return (
    <Card className="rounded-none border-border/60 bg-background/40 backdrop-blur">
      <CardHeader className="border-b border-border/40 pb-4">
        <CardTitle className="text-lg font-semibold">Revenue Projection Model</CardTitle>
        <p className="text-sm text-muted-foreground">
          Tune the deal shape below. Revenue is projected from recurring subscriptions, initial charges, retention, acquisition, and lead volume, then compared against the launch-beta cost model.
        </p>
      </CardHeader>

      <CardContent className="space-y-6 p-4">
        <div className="grid gap-4 xl:grid-cols-[360px_minmax(0,1fr)]">
          <div className="space-y-3">
            <SliderRow
              label="Subscription"
              valueLabel={formatMoney(inputs.subscription) + " / mo"}
              minLabel={formatMoney(5)}
              maxLabel={formatMoney(30)}
              value={inputs.subscription}
              min={5}
              max={30}
              step={1}
              onChange={(value) => setInputs((current) => ({ ...current, subscription: value }))}
            />
            <SliderRow
              label="Initial charge"
              valueLabel={formatMoney(inputs.initialCharge) + " upfront"}
              minLabel={formatMoney(10)}
              maxLabel={formatMoney(60)}
              value={inputs.initialCharge}
              min={10}
              max={60}
              step={1}
              onChange={(value) => setInputs((current) => ({ ...current, initialCharge: value }))}
            />
            <SliderRow
              label="Client retention rate"
              valueLabel={formatPercent(inputs.retentionRate)}
              minLabel="50%"
              maxLabel="99%"
              value={inputs.retentionRate}
              min={50}
              max={99}
              step={1}
              onChange={(value) => setInputs((current) => ({ ...current, retentionRate: value }))}
            />
            <SliderRow
              label="Client acquisition rate"
              valueLabel={formatPercent(inputs.acquisitionRate)}
              minLabel="0%"
              maxLabel="30%"
              value={inputs.acquisitionRate}
              min={0}
              max={30}
              step={0.5}
              onChange={(value) => setInputs((current) => ({ ...current, acquisitionRate: value }))}
            />
            <SliderRow
              label="Lead volume per month"
              valueLabel={`${formatCompactNumber(inputs.leadVolume)} leads`}
              minLabel="0"
              maxLabel="500"
              value={inputs.leadVolume}
              min={0}
              max={500}
              step={1}
              onChange={(value) => setInputs((current) => ({ ...current, leadVolume: value }))}
            />

            <div className="space-y-2 rounded-2xl border border-border/40 bg-background/30 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Cost model</p>
              <p className="text-sm text-muted-foreground">
                Monthly projection is compared against a planning cost stack built from a Vercel Pro launch beta, optional Cloudflare migration, lead handling, onboarding, and support overhead.
              </p>
              <div className="grid gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Fixed monthly cost</span>
                  <span className="font-medium text-foreground">{formatMoney(COST_MODEL.fixedMonthly)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Per lead</span>
                  <span className="font-medium text-foreground">{formatMoney(COST_MODEL.perLead)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Per new client</span>
                  <span className="font-medium text-foreground">{formatMoney(COST_MODEL.perNewClient)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Per active client</span>
                  <span className="font-medium text-foreground">{formatMoney(COST_MODEL.perActiveClient)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-4">
              <StatCard
                label="Year 1 revenue"
                value={formatMoney(totals.totalRevenue)}
                note="Subscription and upfront charges combined."
              />
              <StatCard
                label="Year 1 cost"
                value={formatMoney(totals.totalCost)}
                note="Based on the projected cost model."
              />
              <StatCard
                label="Year 1 profit"
                value={formatMoney(totals.totalProfit)}
                note={leadToClientNote}
                tone={totals.totalProfit >= 0 ? "positive" : "negative"}
              />
              <StatCard
                label="Break-even"
                value={totals.breakEvenMonth ? `Month ${totals.breakEvenMonth}` : "Not within 12 months"}
                note={`Ending month: ${formatCompactNumber(totals.finalMonth.activeClients)} active clients`}
              />
            </div>

            <div className="overflow-hidden border border-border/40 bg-background/20">
              <div className="flex flex-wrap items-center gap-4 border-b border-border/40 px-4 py-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--chart-1)]" />
                  Revenue
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--chart-4)]" />
                  Cost
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--chart-3)]" />
                  Profit
                </span>
              </div>
              <div className="h-[360px] p-2">
                <ProjectionChart data={projection} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default BusinessPlanProjectionModel;

