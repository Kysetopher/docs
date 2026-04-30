import React, { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";

export type RadarPoint = {
  axis: string;
  value: number;
};

type AutomationIndexGraphProps = {
  data: RadarPoint[];
  height?: number;
};

export function AutomationIndexGraph({ data, height = 220 }: AutomationIndexGraphProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const observer = new ResizeObserver((entries) => {
      const nextWidth = Math.floor(entries[0]?.contentRect.width ?? 0);
      setWidth(nextWidth);
    });

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || width === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const radius = Math.min(width, height) / 2 - 50;
    const centerX = width / 2;
    const centerY = height / 2;

    const angleSlice = (Math.PI * 2) / data.length;
    const rScale = d3.scaleLinear().domain([0, 100]).range([0, radius]);

    const container = svg.append("g").attr("transform", `translate(${centerX},${centerY})`);

    // Grid (Concentric circles)
    [20, 40, 60, 80, 100].forEach(v => {
      container.append("circle")
        .attr("r", rScale(v))
        .attr("fill", "none")
        .attr("stroke", "currentColor")
        .attr("stroke-width", 0.5)
        .attr("opacity", 0.1);
    });

    // Axes
    const axes = container.selectAll(".axis")
      .data(data)
      .join("g")
      .attr("class", "axis");

    axes.append("line")
      .attr("x1", 0).attr("y1", 0)
      .attr("x2", (d, i) => rScale(100) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y2", (d, i) => rScale(100) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr("stroke", "currentColor")
      .attr("stroke-width", 1)
      .attr("opacity", 0.1);

    axes.append("text")
      .attr("x", (d, i) => rScale(115) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y", (d, i) => rScale(115) * Math.sin(angleSlice * i - Math.PI / 2))
      .text(d => d.axis)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "600")
      .attr("fill", "currentColor")
      .attr("opacity", 0.8);

    // Radar Line
    const radarLine = d3.lineRadial<RadarPoint>()
      .radius(d => rScale(d.value))
      .angle((d, i) => i * angleSlice)
      .curve(d3.curveLinearClosed);

    container.append("path")
      .datum(data)
      .attr("d", radarLine)
      .attr("fill", "#6366f1")
      .attr("fill-opacity", 0.2)
      .attr("stroke", "#6366f1")
      .attr("stroke-width", 2)
      .attr("opacity", 0);

    container.select("path")
      .transition()
      .duration(1000)
      .attr("opacity", 1);

    // Points
    container.selectAll(".radar-point")
      .data(data)
      .join("circle")
      .attr("class", "radar-point")
      .attr("cx", (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("cy", (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr("r", 4)
      .attr("fill", "#6366f1")
      .attr("stroke", "white")
      .attr("stroke-width", 1);

  }, [data, width, height]);

  return (
    <div ref={hostRef} className="w-full h-full">
      <svg ref={svgRef} width={width} height={height} className="text-foreground" />
    </div>
  );
}

export default AutomationIndexGraph;
