import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { GRAPH_COLORS } from "./graph-colors";

type Margin = { top: number; right: number; bottom: number; left: number };

export type GanttTask = {
  id: string;
  label: string;
  start: Date;
  end: Date;
  group?: string;
};

export type GanttChartProps = {
  tasks: GanttTask[];
  height?: number;
  margin?: Margin;
  className?: string;
};

export function GanttChart({
  tasks,
  height = 260,
  margin = { top: 20, right: 20, bottom: 40, left: 140 },
  className,
}: GanttChartProps) {
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

    if (!tasks.length) return;

    const innerWidth = Math.max(width - margin.left - margin.right, 0);
    const innerHeight = Math.max(height - margin.top - margin.bottom, 0);
    if (innerWidth <= 0 || innerHeight <= 0) return;

    const root = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    const extent = d3.extent(tasks.flatMap((task) => [task.start, task.end])) as [Date, Date];
    const x = d3.scaleTime().domain(extent).range([0, innerWidth]).nice();
    const y = d3
      .scaleBand<string>()
      .domain(tasks.map((task) => task.label))
      .range([0, innerHeight])
      .padding(0.25);
    const groups = Array.from(new Set(tasks.map((task) => task.group ?? "default")));
    const color = d3.scaleOrdinal<string>().domain(groups).range(GRAPH_COLORS);

    root
      .append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).ticks(6))
      .call((g) => g.selectAll("text").attr("fill", "hsl(var(--muted-foreground))"));

    root
      .append("g")
      .call(d3.axisLeft(y).tickSizeOuter(0))
      .call((g) => g.selectAll("text").attr("fill", "hsl(var(--muted-foreground))"));

    root
      .selectAll("rect.task")
      .data(tasks)
      .join("rect")
      .attr("class", "task")
      .attr("x", (task) => x(task.start))
      .attr("y", (task) => y(task.label) ?? 0)
      .attr("width", (task) => Math.max(2, x(task.end) - x(task.start)))
      .attr("height", y.bandwidth())
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("fill", (task) => color(task.group ?? "default") as string)
      .attr("fill-opacity", 0.85);
  }, [height, margin.bottom, margin.left, margin.right, margin.top, tasks, width]);

  return (
    <div ref={hostRef} className={`h-full w-full ${className ?? ""}`}>
      <svg ref={svgRef} className="block h-full w-full" />
    </div>
  );
}

export default GanttChart;

