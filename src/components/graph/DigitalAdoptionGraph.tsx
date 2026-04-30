import React, { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";

export type AdoptionPoint = {
  year: string;
  value: number;
};

type DigitalAdoptionGraphProps = {
  data: AdoptionPoint[];
  height?: number;
};

export function DigitalAdoptionGraph({ data, height = 150 }: DigitalAdoptionGraphProps) {
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
    const margin = { top: 20, right: 30, bottom: 40, left: 30 };
    const xScale = d3.scalePoint().domain(data.map(d => d.year)).range([margin.left, width - margin.right]);
    const yScale = d3.scaleLinear().domain([0, 100]).range([height - margin.bottom, margin.top]);

    return { margin, xScale, yScale };
  }, [data, width, height]);

  useEffect(() => {
    if (!svgRef.current || width === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const { xScale, yScale, margin } = layout;

    const area = d3.area<AdoptionPoint>()
      .x(d => xScale(d.year)!)
      .y0(height - margin.bottom)
      .y1(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    const line = d3.line<AdoptionPoint>()
      .x(d => xScale(d.year)!)
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // Area
    svg.append("path")
      .datum(data)
      .attr("d", area)
      .attr("fill", "url(#adoption-gradient)")
      .attr("opacity", 0.3);

    // Line
    const path = svg.append("path")
      .datum(data)
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "#14b8a6")
      .attr("stroke-width", 2)
      .attr("opacity", 0.8);

    const length = path.node()?.getTotalLength() ?? 0;
    path.attr("stroke-dasharray", length + " " + length)
      .attr("stroke-dashoffset", length)
      .transition()
      .duration(1500)
      .attr("stroke-dashoffset", 0);

    // Gradient
    const defs = svg.append("defs");
    const grad = defs.append("linearGradient")
      .attr("id", "adoption-gradient")
      .attr("x1", "0%").attr("y1", "0%")
      .attr("x2", "0%").attr("y2", "100%");
    grad.append("stop").attr("offset", "0%").attr("stop-color", "#14b8a6");
    grad.append("stop").attr("offset", "100%").attr("stop-color", "transparent");

    // X Axis
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickSize(0))
      .call(g => g.select(".domain").attr("stroke-opacity", 0.1))
      .selectAll("text")
      .attr("fill", "currentColor")
      .attr("font-size", "12px")
      .attr("font-weight", "500")
      .attr("dy", "15px");

    // End Label
    const last = data[data.length - 1];
    svg.append("text")
      .attr("x", xScale(last.year)!)
      .attr("y", yScale(last.value) - 10)
      .attr("text-anchor", "end")
      .text(`${last.value}% Adoption`)
      .attr("font-size", "13px")
      .attr("font-weight", "bold")
      .attr("fill", "#14b8a6");

  }, [data, layout, width, height]);

  return (
    <div ref={hostRef} className="w-full h-full">
      <svg ref={svgRef} width={width} height={height} className="text-foreground" />
    </div>
  );
}

export default DigitalAdoptionGraph;
