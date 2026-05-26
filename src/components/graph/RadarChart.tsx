import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { GRAPH_COLORS } from "./graph-colors";

type Margin = { top: number; right: number; bottom: number; left: number };

export type RadarPoint = {
  key: string;
  label: string;
  value: number;
};

export type RadarSeries = {
  id: string;
  points: RadarPoint[];
};

export type RadarChartProps = {
  data: RadarSeries[];
  height?: number;
  minValue?: number;
  maxValue?: number;
  levels?: number;
  margin?: Margin;
  className?: string;
};

export function RadarChart({
  data,
  height = 320,
  minValue = 0,
  maxValue = 100,
  levels = 5,
  margin = { top: 24, right: 24, bottom: 24, left: 24 },
  className,
}: RadarChartProps) {
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

    const dimensions = Array.from(
      new Set(data.flatMap((series) => series.points.map((point) => point.key))),
    );
    if (dimensions.length < 3) return;

    const innerWidth = Math.max(width - margin.left - margin.right, 0);
    const innerHeight = Math.max(height - margin.top - margin.bottom, 0);
    const radius = Math.max(0, Math.min(innerWidth, innerHeight) / 2);
    if (radius <= 0) return;

    const cx = margin.left + innerWidth / 2;
    const cy = margin.top + innerHeight / 2;
    const root = svg.append("g").attr("transform", `translate(${cx},${cy})`);
    const angleForIndex = (index: number) => (Math.PI * 2 * index) / dimensions.length;
    const rScale = d3.scaleLinear().domain([minValue, maxValue]).range([0, radius]).clamp(true);

    const gridLevels = d3.range(1, levels + 1).map((level) => level / levels);
    const gridLine = d3
      .lineRadial<number>()
      .angle((_d, index) => angleForIndex(index))
      .radius((value) => rScale(minValue + value * (maxValue - minValue)))
      .curve(d3.curveLinearClosed);

    root
      .selectAll("path.grid")
      .data(gridLevels)
      .join("path")
      .attr("class", "grid")
      .attr("fill", "none")
      .attr("stroke", "currentColor")
      .attr("stroke-opacity", 0.18)
      .attr("d", (level) => gridLine(dimensions.map(() => level)) as string);

    root
      .selectAll("line.axis")
      .data(dimensions)
      .join("line")
      .attr("class", "axis")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", (_d, index) => d3.pointRadial(angleForIndex(index), radius)[0])
      .attr("y2", (_d, index) => d3.pointRadial(angleForIndex(index), radius)[1])
      .attr("stroke", "currentColor")
      .attr("stroke-opacity", 0.25)
      .attr("stroke-width", 1);

    root
      .selectAll("text.axis-label")
      .data(dimensions)
      .join("text")
      .attr("class", "axis-label")
      .attr("x", (_d, index) => d3.pointRadial(angleForIndex(index), radius + 16)[0])
      .attr("y", (_d, index) => d3.pointRadial(angleForIndex(index), radius + 16)[1])
      .attr("text-anchor", (_d, index) => {
        const [x] = d3.pointRadial(angleForIndex(index), 1);
        if (Math.abs(x) < 0.2) return "middle";
        return x > 0 ? "start" : "end";
      })
      .attr("dominant-baseline", "middle")
      .attr("font-size", 12)
      .attr("font-weight", 600)
      .attr("fill", "hsl(var(--foreground))")
      .text((key) => data[0]?.points.find((point) => point.key === key)?.label ?? key);

    const radarLine = d3
      .lineRadial<number>()
      .angle((_value, index) => angleForIndex(index))
      .radius((value) => rScale(value))
      .curve(d3.curveLinearClosed);

    data.forEach((series, index) => {
      const color = GRAPH_COLORS[index % GRAPH_COLORS.length];
      const values = dimensions.map((dimension) => {
        const found = series.points.find((point) => point.key === dimension);
        return Number.isFinite(found?.value ?? NaN) ? (found?.value ?? minValue) : minValue;
      });

      root
        .append("path")
        .datum(values)
        .attr("fill", color)
        .attr("fill-opacity", 0.18)
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("d", radarLine as never);

      root
        .selectAll(`circle.series-${index}`)
        .data(values)
        .join("circle")
        .attr("class", `series-${index}`)
        .attr("cx", (_value, dimIndex) => d3.pointRadial(angleForIndex(dimIndex), rScale(_value))[0])
        .attr("cy", (_value, dimIndex) => d3.pointRadial(angleForIndex(dimIndex), rScale(_value))[1])
        .attr("r", 3.5)
        .attr("fill", color)
        .attr("stroke", "hsl(var(--background))")
        .attr("stroke-width", 1.5);
    });
  }, [data, height, margin.bottom, margin.left, margin.right, margin.top, maxValue, minValue, levels, width]);

  return (
    <div ref={hostRef} className={`h-full w-full ${className ?? ""}`}>
      <svg ref={svgRef} className="block h-full w-full" />
    </div>
  );
}

export default RadarChart;

