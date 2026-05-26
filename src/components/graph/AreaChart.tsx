import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { GRAPH_COLORS } from "./graph-colors";

type Margin = { top: number; right: number; bottom: number; left: number };

export type AreaPoint = {
  x: Date | number | string;
  y: number;
  label?: string;
};

export type AreaChartProps = {
  data: AreaPoint[];
  height?: number;
  xScaleType?: "time" | "linear";
  showPoints?: boolean;
  margin?: Margin;
  className?: string;
};

export function AreaChart({
  data,
  height = 280,
  xScaleType = "time",
  showPoints = true,
  margin = { top: 20, right: 20, bottom: 40, left: 56 },
  className,
}: AreaChartProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const observer = new ResizeObserver((entries) => {
      const nextWidth = Math.floor(entries[0]?.contentRect.width ?? 0);
      setWidth((prev) => (prev === nextWidth ? prev : nextWidth));
    });

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || width <= 0 || height <= 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("color", "hsl(var(--muted-foreground))");

    if (!data.length) return;

    const innerWidth = Math.max(width - margin.left - margin.right, 0);
    const innerHeight = Math.max(height - margin.top - margin.bottom, 0);
    if (innerWidth <= 0 || innerHeight <= 0) return;

    const root = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    const xValues = data.map((d) => d.x);

    const x =
      xScaleType === "time"
        ? d3
            .scaleTime()
            .domain(d3.extent(xValues, (value) => new Date(value)) as [Date, Date])
            .range([0, innerWidth])
        : d3
            .scaleLinear()
            .domain(d3.extent(xValues, (value) => Number(value)) as [number, number])
            .nice()
            .range([0, innerWidth]);

    const maxY = d3.max(data, (d) => (Number.isFinite(d.y) ? d.y : 0)) ?? 0;
    const y = d3.scaleLinear().domain([0, maxY * 1.05 || 1]).nice().range([innerHeight, 0]);

    const area = d3
      .area<AreaPoint>()
      .x((d) => (xScaleType === "time" ? (x(new Date(d.x)) ?? 0) : (x(Number(d.x)) ?? 0)))
      .y0(innerHeight)
      .y1((d) => y(d.y))
      .curve(d3.curveMonotoneX);

    const line = d3
      .line<AreaPoint>()
      .x((d) => (xScaleType === "time" ? (x(new Date(d.x)) ?? 0) : (x(Number(d.x)) ?? 0)))
      .y((d) => y(d.y))
      .curve(d3.curveMonotoneX);

    root
      .append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(
        xScaleType === "time"
          ? d3.axisBottom(x as d3.ScaleTime<number, number>).ticks(Math.min(6, data.length))
          : d3.axisBottom(x as d3.ScaleLinear<number, number>).ticks(6),
      )
      .call((g) => g.selectAll("text").attr("fill", "hsl(var(--muted-foreground))"));

    root
      .append("g")
      .call(d3.axisLeft(y).ticks(5))
      .call((g) => g.selectAll("text").attr("fill", "hsl(var(--muted-foreground))"));

    root
      .append("path")
      .datum(data)
      .attr("fill", "hsl(var(--chart-1) / 0.26)")
      .attr("d", area as never);

    root
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", GRAPH_COLORS[0])
      .attr("stroke-width", 2.5)
      .attr("d", line as never);

    if (showPoints) {
      root
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", (d) => (xScaleType === "time" ? (x(new Date(d.x)) ?? 0) : (x(Number(d.x)) ?? 0)))
        .attr("cy", (d) => y(d.y))
        .attr("r", 3.5)
        .attr("fill", GRAPH_COLORS[1])
        .attr("stroke", "hsl(var(--background))")
        .attr("stroke-width", 1.5);
    }
  }, [data, height, margin.bottom, margin.left, margin.right, margin.top, showPoints, width, xScaleType]);

  return (
    <div ref={hostRef} className={`h-full w-full ${className ?? ""}`}>
      <svg ref={svgRef} className="block h-full w-full" />
    </div>
  );
}

export default AreaChart;

