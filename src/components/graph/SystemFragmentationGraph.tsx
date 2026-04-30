import React, { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";
import { Icon } from "@iconify/react";
import { createRoot } from "react-dom/client";

export type NetworkNode = {
  id: string;
  group: number;
  size: number;
  icon?: string;
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
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(45));

    const link = svg.append("g")
      .attr("stroke", "currentColor")
      .attr("stroke-opacity", 0.1)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "3,3");

    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("class", "node-group");

    const getNodeColor = (group: number) => {
      if (group === 1) return "#3b82f6"; // Blue (Primary)
      if (group === 2) return "#6366f1"; // Indigo (Service)
      if (group === 3) return "#10b981"; // Emerald (Infrastructure)
      return "#94a3b8"; // Slate (Manual/Legacy - NO RED NORMALLY)
    };

    // Hexagon path generator
    const hexagonPath = (size: number) => {
      const points = [];
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const x = size * Math.cos(angle);
        const y = size * Math.sin(angle);
        points.push(`${x},${y}`);
      }
      return `M${points.join(" L")} Z`;
    };

    node.append("path")
      .attr("d", d => hexagonPath(d.size * 3.5))
      .attr("fill", d => getNodeColor(d.group))
      .attr("fill-opacity", 0.08)
      .attr("stroke", d => getNodeColor(d.group))
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.3);

    // ForeignObject for Iconify Icons
    node.each(function(d) {
      if (d.icon) {
        const fo = d3.select(this)
          .append("foreignObject")
          .attr("width", 32)
          .attr("height", 32)
          .attr("x", -16)
          .attr("y", -16)
          .style("pointer-events", "none");

        const div = fo.append("xhtml:div")
          .attr("class", "flex items-center justify-center w-full h-full")
          .style("color", () => {
             if (d.icon?.startsWith("logos:")) return "inherit";
             return getNodeColor(d.group);
          });

        const root = createRoot(div.node() as HTMLElement);
        root.render(<Icon icon={d.icon} className="w-6 h-6 opacity-60" />);
      }
    });

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // Living "Chaos" effect: Perpetual slow drift
    simulation.alphaTarget(0.01).restart();

    // Occasional gentle nudge to prevent settling
    const interval = setInterval(() => {
      simulation.alpha(0.05);
    }, 5000);

    // Scary "Alert" effect: Flash RED and disappear
    const alertInterval = setInterval(() => {
      const targetIdx = Math.floor(Math.random() * nodes.length);
      const targetNode = node.filter((d, i) => i === targetIdx);
      
      targetNode.select("path")
        .transition()
        .duration(200)
        .attr("fill", "#ef4444")
        .attr("fill-opacity", 0.7)
        .attr("stroke", "#ef4444")
        .attr("stroke-width", 3)
        .attr("stroke-opacity", 1)
        .transition()
        .delay(1000)
        .duration(1500)
        .attr("fill", d => getNodeColor(d.group))
        .attr("fill-opacity", 0.08)
        .attr("stroke", d => getNodeColor(d.group))
        .attr("stroke-width", 1.5)
        .attr("stroke-opacity", 0.3);

      targetNode.select("foreignObject")
        .transition()
        .duration(200)
        .style("filter", "drop-shadow(0 0 10px #ef4444)")
        .style("transform", "scale(1.5)")
        .transition()
        .delay(1000)
        .duration(1500)
        .style("filter", "none")
        .style("transform", "scale(1)");

    }, 4000);

    return () => { 
      simulation.stop();
      clearInterval(interval);
      clearInterval(alertInterval);
    };
  }, [nodes, links, width, height]);

  return (
    <div ref={hostRef} className="w-full h-full">
      <svg ref={svgRef} width={width} height={height} className="text-foreground overflow-visible" />
    </div>
  );
}

export default SystemFragmentationGraph;
