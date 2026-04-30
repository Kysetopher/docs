import React, { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";

export type TierDataPoint = {
  id: string;
  x: number;
  y: number;
  label: string;
  color: string;
};

type ICPTierMatrixGraphProps = {
  data: TierDataPoint[];
  height?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
};

export function ICPTierMatrixGraph({ 
  data, 
  height = 240,
  xAxisLabel = "Operational Chaos →",
  yAxisLabel = "Revenue Leakage Potential ↑"
}: ICPTierMatrixGraphProps) {
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

  const layout = useMemo(() => {
    const margin = { top: 30, right: 30, bottom: 40, left: 40 };
    const innerWidth = Math.max(width - margin.left - margin.right, 1);
    const innerHeight = Math.max(height - margin.top - margin.bottom, 1);

    const xScale = d3.scaleLinear().domain([0, 100]).range([margin.left, width - margin.right]);
    const yScale = d3.scaleLinear().domain([0, 100]).range([height - margin.bottom, margin.top]);

    return { margin, innerWidth, innerHeight, xScale, yScale };
  }, [width, height]);

  useEffect(() => {
    if (!svgRef.current || width === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const { xScale, yScale, margin } = layout;

    // Axes
    svg.append("line")
      .attr("x1", margin.left)
      .attr("y1", height - margin.bottom)
      .attr("x2", width - margin.right)
      .attr("y2", height - margin.bottom)
      .attr("stroke", "currentColor")
      .attr("opacity", 0.5);

    svg.append("line")
      .attr("x1", margin.left)
      .attr("y1", margin.top)
      .attr("x2", margin.left)
      .attr("y2", height - margin.bottom)
      .attr("stroke", "currentColor")
      .attr("opacity", 0.5);

    // Points
    svg.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 0)
      .attr("fill", (d) => d.color)
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .transition()
      .duration(800)
      .attr("r", 8);

    // Labels
    svg.selectAll(".target-label")
      .data(data)
      .join("text")
      .attr("class", "target-label")
      .attr("x", (d) => xScale(d.x) + 12)
      .attr("y", (d) => yScale(d.y) + 4)
      .text((d) => d.id)
      .attr("font-size", "9px")
      .attr("fill", "currentColor")
      .attr("opacity", 0)
      .transition()
      .delay(400)
      .duration(400)
      .attr("opacity", 0.8);

    // Axis labels
    svg.append("text")
      .attr("x", width / 2 + 10)
      .attr("y", height - 5)
      .attr("text-anchor", "middle")
      .text(xAxisLabel)
      .attr("font-size", "10px")
      .attr("fill", "currentColor")
      .attr("font-weight", "bold");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .text(yAxisLabel)
      .attr("font-size", "10px")
      .attr("fill", "currentColor")
      .attr("font-weight", "bold");

  }, [data, layout, width, height, xAxisLabel, yAxisLabel]);

  return (
    <div ref={hostRef} className="w-full">
      <svg ref={svgRef} width={width} height={height} className="text-foreground/80" />
    </div>
  );
}

export default ICPTierMatrixGraph;
