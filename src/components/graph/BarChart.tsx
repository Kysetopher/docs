import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { GRAPH_COLORS } from "./graph-colors";

type Margin = { top: number; right: number; bottom: number; left: number };

export type BarChartProps<T extends Record<string, unknown>> = {
  data: T[];
  categoryKey: keyof T;
  valueKey: keyof T;
  groupKey?: keyof T;
  horizontal?: boolean;
  height?: number;
  margin?: Margin;
  className?: string;
};

export function BarChart<T extends Record<string, unknown>>({
  data,
  categoryKey,
  valueKey,
  groupKey,
  horizontal = false,
  height = 280,
  margin = { top: 20, right: 20, bottom: 44, left: 56 },
  className,
}: BarChartProps<T>) {
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

    const categories = Array.from(new Set(data.map((d) => String(d[categoryKey] ?? "")))).filter(Boolean);
    const groups = groupKey
      ? Array.from(new Set(data.map((d) => String(d[groupKey] ?? "")))).filter(Boolean)
      : ["__single__"];
    const palette = groups.map((_, index) => GRAPH_COLORS[index % GRAPH_COLORS.length]);
    const color = d3.scaleOrdinal<string>().domain(groups).range(palette);

    const maxValue = d3.max(data, (d) => {
      const raw = Number(d[valueKey]);
      return Number.isFinite(raw) ? raw : 0;
    }) ?? 0;

    if (maxValue <= 0) return;

    if (!horizontal) {
      const x0 = d3.scaleBand<string>().domain(categories).range([0, innerWidth]).padding(0.2);
      const x1 = d3.scaleBand<string>().domain(groups).range([0, x0.bandwidth()]).padding(0.12);
      const y = d3.scaleLinear().domain([0, maxValue]).nice().range([innerHeight, 0]);

      root
        .append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x0).tickSizeOuter(0))
        .call((g) => g.selectAll("text").attr("fill", "hsl(var(--muted-foreground))"));

      root
        .append("g")
        .call(d3.axisLeft(y).ticks(5))
        .call((g) => g.selectAll("text").attr("fill", "hsl(var(--muted-foreground))"));

      const groupedData = categories.map((category) =>
        groups.map((group) => {
          const item = data.find(
            (d) =>
              String(d[categoryKey] ?? "") === category &&
              (groupKey ? String(d[groupKey] ?? "") === group : true),
          );
          const raw = item ? Number(item[valueKey]) : 0;
          const value = Number.isFinite(raw) ? raw : 0;
          return { category, group, value };
        }),
      );

      root
        .append("g")
        .selectAll("g")
        .data(groupedData)
        .join("g")
        .attr("transform", (category) => `translate(${x0(category[0]?.category ?? "") ?? 0},0)`)
        .selectAll("rect")
        .data((category) => category)
        .join("rect")
        .attr("x", (d) => x1(d.group) ?? 0)
        .attr("y", (d) => y(d.value))
        .attr("width", x1.bandwidth())
        .attr("height", (d) => innerHeight - y(d.value))
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("fill", (d) => color(d.group) as string);
    } else {
      const y0 = d3.scaleBand<string>().domain(categories).range([0, innerHeight]).padding(0.2);
      const y1 = d3.scaleBand<string>().domain(groups).range([0, y0.bandwidth()]).padding(0.12);
      const x = d3.scaleLinear().domain([0, maxValue]).nice().range([0, innerWidth]);

      root
        .append("g")
        .call(d3.axisLeft(y0).tickSizeOuter(0))
        .call((g) => g.selectAll("text").attr("fill", "hsl(var(--muted-foreground))"));

      root
        .append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x).ticks(5))
        .call((g) => g.selectAll("text").attr("fill", "hsl(var(--muted-foreground))"));

      const groupedData = categories.map((category) =>
        groups.map((group) => {
          const item = data.find(
            (d) =>
              String(d[categoryKey] ?? "") === category &&
              (groupKey ? String(d[groupKey] ?? "") === group : true),
          );
          const raw = item ? Number(item[valueKey]) : 0;
          const value = Number.isFinite(raw) ? raw : 0;
          return { category, group, value };
        }),
      );

      root
        .append("g")
        .selectAll("g")
        .data(groupedData)
        .join("g")
        .attr("transform", (category) => `translate(0,${y0(category[0]?.category ?? "") ?? 0})`)
        .selectAll("rect")
        .data((category) => category)
        .join("rect")
        .attr("y", (d) => y1(d.group) ?? 0)
        .attr("x", 0)
        .attr("height", y1.bandwidth())
        .attr("width", (d) => x(d.value))
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("fill", (d) => color(d.group) as string);
    }
  }, [categoryKey, data, groupKey, height, horizontal, margin.bottom, margin.left, margin.right, margin.top, valueKey, width]);

  return (
    <div ref={hostRef} className={`h-full w-full ${className ?? ""}`}>
      <svg ref={svgRef} className="block h-full w-full" />
    </div>
  );
}

export default BarChart;

