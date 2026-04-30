import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export type SunburstNode = {
  name: string;
  value?: number;
  children?: SunburstNode[];
  color?: string;
};

type GlobalPortfolioSunburstProps = {
  data: SunburstNode;
  height?: number;
};

export function GlobalPortfolioSunburst({ data, height = 500 }: GlobalPortfolioSunburstProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
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

    const radius = Math.min(width, height) / 2;
    const g = svg.append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const partition = d3.partition<SunburstNode>()
      .size([2 * Math.PI, radius]);

    const root = d3.hierarchy(data)
      .sum(d => d.value || 1)
      .sort((a, b) => (b.value || 0) - (a.value || 0));

    partition(root);

    const arc = d3.arc<d3.HierarchyRectangularNode<SunburstNode>>()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius / 2)
      .innerRadius(d => d.y0)
      .outerRadius(d => d.y1 - 1);

    const hoverArc = d3.arc<d3.HierarchyRectangularNode<SunburstNode>>()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius / 2)
      .innerRadius(d => d.y0 + 4)
      .outerRadius(d => d.y1 + 4);

    const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, root.children?.length || 10));

    const tooltip = d3.select(tooltipRef.current);

    const paths = g.selectAll("path")
      .data(root.descendants().filter(d => d.depth > 0))
      .join("path")
      .attr("fill", (d: any) => {
        if (d.depth === 1) return color(d.data.name);
        return d3.interpolateRgb(color(d.parent.data.name), "#000")(0.2);
      })
      .attr("fill-opacity", d => (d.depth === 1 ? 0.6 : 0.4))
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)
      .attr("stroke-opacity", 0.1)
      .attr("d", arc as any)
      .style("cursor", "crosshair")
      .style("transition", "fill-opacity 0.2s ease")
      .on("mouseenter", function(event, d) {
        d3.select(this)
          .interrupt()
          .transition()
          .duration(250)
          .ease(d3.easeCubicOut)
          .attr("d", hoverArc as any)
          .attr("fill-opacity", 0.95);

        const label = d.depth === 1 ? 'REGION' : d.depth === 2 ? 'CATEGORY' : 'SECTOR';
        
        tooltip
          .style("opacity", 1)
          .html(`
            <div class="space-y-1">
              <div class="text-[10px] font-bold uppercase tracking-widest text-primary/80">${label}</div>
              <div class="text-xs font-bold text-white uppercase">${d.data.name}</div>
              ${d.value ? `<div class="text-[10px] text-muted-foreground uppercase font-medium">Targets: ${Math.floor(d.value)}</div>` : ''}
            </div>
          `);
      })
      .on("mousemove", function(event) {
        tooltip
          .style("left", (event.pageX + 15) + "px")
          .style("top", (event.pageY - 15) + "px");
      })
      .on("mouseleave", function() {
        d3.select(this)
          .interrupt()
          .transition()
          .duration(200)
          .ease(d3.easeCubicIn)
          .attr("d", arc as any)
          .attr("fill-opacity", d => (d.depth === 1 ? 0.6 : 0.4));

        tooltip.style("opacity", 0);
      });

  }, [data, width, height]);

  return (
    <div ref={hostRef} className="w-full h-full relative overflow-visible">
      <svg ref={svgRef} width={width} height={height} className="overflow-visible" />
      <div 
        ref={tooltipRef} 
        className="fixed pointer-events-none opacity-0 bg-slate-950/95 border border-white/10 px-3 py-2 backdrop-blur-xl z-[9999] transition-opacity duration-200 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        style={{ transform: 'translate3d(0,0,0)' }}
      />
    </div>
  );
}
