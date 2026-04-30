import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { SALES_REFERENCES } from "@/lib/records/sales/target-sections";

export type SunburstNode = {
  name: string;
  targetId?: string;
  value?: number;
  children?: SunburstNode[];
  color?: string;
};

type GlobalPortfolioSunburstProps = {
  data: SunburstNode;
  height?: number;
};

const FLAG_MAP: Record<string, string> = {
  "Singapore": "https://flagcdn.com/w320/sg.png",
  "Indonesia": "https://flagcdn.com/w320/id.png",
  "Thailand & Malaysia": "https://flagcdn.com/w320/th.png",
  "Japan & Korea": "https://flagcdn.com/w320/jp.png",
  "Australia": "https://flagcdn.com/w320/au.png",
  "Europe & UK": "https://flagcdn.com/w320/eu.png"
};

export function GlobalPortfolioSunburst({ data, height = 700 }: GlobalPortfolioSunburstProps) {
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

    const defs = svg.append("defs");
    Object.entries(FLAG_MAP).forEach(([name, url]) => {
      const patternId = `flag-${name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`;
      const pattern = defs.append("pattern")
        .attr("id", patternId)
        .attr("patternUnits", "objectBoundingBox")
        .attr("width", 1)
        .attr("height", 1);
      
      pattern.append("image")
        .attr("href", url)
        .attr("width", 200)
        .attr("height", 120)
        .attr("preserveAspectRatio", "xMidYMid slice")
        .attr("opacity", 0.5);
    });

    const radius = Math.min(width, height) / 2;
    const g = svg.append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const partition = d3.partition<SunburstNode>()
      .size([2 * Math.PI, radius]);

    const root = d3.hierarchy(data)
      .sum(d => d.value || 1)
      .sort((a, b) => (b.value || 0) - (a.value || 0));

    root.each((d: any) => {
      d.id = d.ancestors().reverse().map((a: any) => a.data.name).join("/");
    });

    partition(root);

    const arc = d3.arc<d3.HierarchyRectangularNode<SunburstNode>>()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius / 2)
      .innerRadius(d => d.y0)
      .outerRadius(d => d.y1 - 1);

    const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, root.children?.length || 10));
    const tooltip = d3.select(tooltipRef.current);

    const visualGroup = g.append("g").attr("class", "visual-segments");
    const hitGroup = g.append("g").attr("class", "hit-areas");

    const visualPaths = visualGroup.selectAll("path")
      .data(root.descendants().filter(d => d.depth > 0))
      .join("path")
      .attr("fill", (d: any) => {
        if (d.depth === 1) {
          const patternId = `flag-${d.data.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`;
          if (FLAG_MAP[d.data.name]) return `url(#${patternId})`;
          return color(d.data.name);
        }
        const baseColor = d.depth === 2 ? color(d.parent.data.name) : d.depth === 3 ? color(d.parent.parent.data.name) : color(d.parent.parent.parent.data.name);
        return d3.interpolateRgb(baseColor, "#000")(d.depth === 4 ? 0.5 : d.depth === 3 ? 0.3 : 0.1);
      })
      .attr("fill-opacity", d => (d.depth === 1 ? 0.9 : 0.4))
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)
      .attr("stroke-opacity", 0.1)
      .attr("d", arc as any);

    hitGroup.selectAll("path")
      .data(root.descendants().filter(d => d.depth > 0))
      .join("path")
      .attr("d", arc as any)
      .attr("fill", "transparent")
      .style("cursor", "crosshair")
      .on("mouseenter", function(event, d: any) {
        const offset = 25;
        const descendants = d.descendants();
        const descendantIds = new Set(descendants.map((desc: any) => desc.id));

        visualPaths.filter((node: any) => descendantIds.has(node.id))
          .interrupt()
          .transition()
          .duration(350)
          .ease(d3.easeCubicOut)
          .attr("transform", () => {
            const angle = (d.x0 + d.x1) / 2;
            const x = Math.sin(angle) * offset;
            const y = -Math.cos(angle) * offset;
            return `translate(${x},${y})`;
          })
          .attr("fill-opacity", 0.95);

        const label = d.depth === 1 ? 'REGION' : d.depth === 2 ? 'CATEGORY' : d.depth === 3 ? 'SECTOR' : 'TARGET';
        
        // If it's a target, show the rich reference chip content
        if (d.depth === 4 && d.data.targetId) {
          const ref = (SALES_REFERENCES as any)[d.data.targetId];
          if (ref) {
            tooltip
              .style("opacity", 1)
              .style("width", "400px")
              .html(`
                <div class="flex flex-col bg-slate-900 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                  <div class="flex items-start justify-between gap-3 p-4 border-b border-white/10 bg-white/5">
                    <div class="min-w-0 flex-1">
                      <div class="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80 mb-1">TARGET PROFILE</div>
                      <div class="text-sm font-bold leading-tight text-white uppercase tracking-tight">${ref.title}</div>
                    </div>
                  </div>
                  <div class="flex gap-4 p-4">
                    <div class="flex-1 space-y-4">
                      ${ref.note ? `
                        <div class="text-[11px] text-white/80 bg-white/5 p-3 rounded-lg border border-white/5 leading-relaxed">
                          ${ref.note}
                        </div>
                      ` : ''}
                      ${ref.painPoints ? `
                        <div class="space-y-2">
                          <span class="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 block">CRITICAL FRICTION</span>
                          <div class="flex flex-wrap gap-1.5">
                            ${ref.painPoints.filter(Boolean).map((p: string) => `<span class="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-[9px] font-bold uppercase">${p}</span>`).join('')}
                          </div>
                        </div>
                      ` : ''}
                      ${ref.sellingStrategy ? `
                        <div class="space-y-2">
                          <span class="text-[9px] font-bold uppercase tracking-[0.2em] text-primary/40 block">EXECUTION PLAYBOOK</span>
                          <div class="rounded-lg bg-primary/10 p-3 border border-primary/20 text-[11px] text-primary/90 italic leading-snug">
                            ${ref.sellingStrategy}
                          </div>
                        </div>
                      ` : ''}
                    </div>
                    ${ref.photo ? `
                      <div class="w-32 shrink-0 h-40 overflow-hidden rounded-lg border border-white/10">
                        <img src="${ref.photo.src}" class="h-full w-full object-cover grayscale-[0.3]" />
                      </div>
                    ` : ''}
                  </div>
                </div>
              `);
            return;
          }
        }

        // Default tooltip for other levels
        tooltip
          .style("opacity", 1)
          .style("width", "auto")
          .html(`
            <div class="space-y-1 min-w-[120px]">
              <div class="text-[10px] font-bold uppercase tracking-widest text-primary/80">${label}</div>
              <div class="text-xs font-bold text-white uppercase">${d.data.name}</div>
              ${d.children ? `<div class="text-[10px] text-muted-foreground uppercase font-medium">Nodes: ${d.descendants().length - 1}</div>` : ''}
            </div>
          `);
      })
      .on("mousemove", function(event) {
        const tooltipNode = tooltip.node() as HTMLElement;
        const tooltipWidth = tooltipNode.offsetWidth;
        const tooltipHeight = tooltipNode.offsetHeight;
        
        // Prevent tooltip from going off-screen
        let x = event.pageX + 20;
        let y = event.pageY - 20;

        if (x + tooltipWidth > window.innerWidth) x = event.pageX - tooltipWidth - 20;
        if (y + tooltipHeight > window.innerHeight) y = window.innerHeight - tooltipHeight - 20;

        tooltip
          .style("left", x + "px")
          .style("top", y + "px");
      })
      .on("mouseleave", function(event, d: any) {
        const descendants = d.descendants();
        const descendantIds = new Set(descendants.map((desc: any) => desc.id));

        visualPaths.filter((node: any) => descendantIds.has(node.id))
          .interrupt()
          .transition()
          .duration(250)
          .ease(d3.easeCubicIn)
          .attr("transform", "translate(0,0)")
          .attr("fill-opacity", (node: any) => node.depth === 1 ? 0.9 : 0.4);

        tooltip.style("opacity", 0);
      });

  }, [data, width, height]);

  return (
    <div ref={hostRef} className="w-full h-full relative overflow-visible">
      <svg ref={svgRef} width={width} height={height} className="overflow-visible" />
      <div 
        ref={tooltipRef} 
        className="fixed pointer-events-none opacity-0 bg-transparent z-[9999] transition-opacity duration-200"
        style={{ transform: 'translate3d(0,0,0)' }}
      />
    </div>
  );
}
