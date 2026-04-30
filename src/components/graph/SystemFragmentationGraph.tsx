import React, { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";

export type NetworkNode = {
  id: string;
  group: number;
  size: number;
};

export type NetworkLink = {
  source: string;
  target: string;
};

type SystemFragmentationGraphProps = {
  nodes: NetworkNode[];
  links: NetworkLink[];
  height?: number;
};

export function SystemFragmentationGraph({ nodes, links, height = 240 }: SystemFragmentationGraphProps) {
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

    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(60))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .attr("stroke", "currentColor")
      .attr("stroke-opacity", 0.3)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1.5);

    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g");

    node.append("circle")
      .attr("r", (d) => d.size)
      .attr("fill", (d) => {
        if (d.id === "Guest") return "#3b82f6";
        if (d.group === 4) return "#ef4444";
        return "#6366f1";
      })
      .attr("stroke", "white")
      .attr("stroke-width", 1);

    node.append("text")
      .text((d) => d.id)
      .attr("x", (d) => d.size + 2)
      .attr("y", 3)
      .attr("font-size", "9px")
      .attr("fill", "currentColor")
      .attr("font-weight", "500");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => { simulation.stop(); };
  }, [nodes, links, width, height]);

  return (
    <div ref={hostRef} className="w-full">
      <svg ref={svgRef} width={width} height={height} className="text-foreground/80" />
    </div>
  );
}

export default SystemFragmentationGraph;
