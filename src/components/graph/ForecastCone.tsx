import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { GRAPH_COLORS } from "./graph-colors";

type Margin = { top: number; right: number; bottom: number; left: number };

export type ForecastConePoint = {
  date: Date;
  actual?: number;
  median: number;
  best: number;
  worst: number;
};

export type ForecastConeProps = {
  data: ForecastConePoint[];
  height?: number;
  margin?: Margin;
  className?: string;
};

export function ForecastCone({
  data,
  height = 280,
  margin = { top: 24, right: 20, bottom: 40, left: 56 },
  className,
}: ForecastConeProps) {
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
    const x = d3.scaleTime().domain(d3.extent(data, (point) => point.date) as [Date, Date]).range([0, innerWidth]);
    const y = d3
      .scaleLinear()
      .domain([0, (d3.max(data, (point) => point.best) ?? 0) * 1.1 || 1])
      .nice()
      .range([innerHeight, 0]);

    const area = d3
      .area<ForecastConePoint>()
      .x((point) => x(point.date))
      .y0((point) => y(point.worst))
      .y1((point) => y(point.best))
      .curve(d3.curveMonotoneX);

    const medianLine = d3
      .line<ForecastConePoint>()
      .x((point) => x(point.date))
      .y((point) => y(point.median))
      .curve(d3.curveMonotoneX);

    const actualLine = d3
      .line<ForecastConePoint>()
      .defined((point) => typeof point.actual === "number")
      .x((point) => x(point.date))
      .y((point) => y(point.actual ?? 0))
      .curve(d3.curveMonotoneX);

    root
      .append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).ticks(6))
      .call((g) => g.selectAll("text").attr("fill", "hsl(var(--muted-foreground))"));

    root
      .append("g")
      .call(d3.axisLeft(y).ticks(5))
      .call((g) => g.selectAll("text").attr("fill", "hsl(var(--muted-foreground))"));

    root
      .append("path")
      .datum(data)
      .attr("fill", "hsl(var(--chart-1) / 0.25)")
      .attr("d", area as never);

    root
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", GRAPH_COLORS[0])
      .attr("stroke-width", 2.5)
      .attr("d", medianLine as never);

    root
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", GRAPH_COLORS[2])
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5 4")
      .attr("d", actualLine as never);

    const legend = svg.append("g").attr("transform", `translate(${margin.left},${Math.max(16, margin.top - 8)})`);
    const entries = [
      { label: "Forecast cone", color: "hsl(var(--chart-1) / 0.25)" },
      { label: "Median", color: GRAPH_COLORS[0] },
      { label: "Actual", color: GRAPH_COLORS[2] },
    ];

    entries.forEach((entry, index) => {
      const offset = index * 138;
      legend
        .append("rect")
        .attr("x", offset)
        .attr("y", -10)
        .attr("width", 10)
        .attr("height", 10)
        .attr("rx", 2)
        .attr("ry", 2)
        .attr("fill", entry.color);

      legend
        .append("text")
        .attr("x", offset + 15)
        .attr("y", -1)
        .attr("font-size", 11)
        .attr("fill", "hsl(var(--foreground))")
        .text(entry.label);
    });
  }, [data, height, margin.bottom, margin.left, margin.right, margin.top, width]);

  return (
    <div ref={hostRef} className={`h-full w-full ${className ?? ""}`}>
      <svg ref={svgRef} className="block h-full w-full" />
    </div>
  );
}

export default ForecastCone;

