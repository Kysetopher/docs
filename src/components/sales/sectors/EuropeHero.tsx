import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Icon } from "@iconify/react";

export function EuropeHero() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 400;
    const height = 240;

    const nodes = [
      { id: "Guest", group: 1, size: 10 },
      { id: "Booking.com", group: 2, size: 6 },
      { id: "Legacy PMS", group: 3, size: 8 },
      { id: "Manual CRM", group: 4, size: 7 },
      { id: "Excel Sheets", group: 4, size: 5 },
      { id: "WhatsApp", group: 2, size: 5 },
      { id: "Upsell Mess", group: 5, size: 6 },
    ];

    const links = [
      { source: "Guest", target: "Booking.com" },
      { source: "Booking.com", target: "Legacy PMS" },
      { source: "Legacy PMS", target: "Manual CRM" },
      { source: "Manual CRM", target: "Excel Sheets" },
      { source: "Guest", target: "WhatsApp" },
      { source: "WhatsApp", target: "Excel Sheets" },
      { source: "Legacy PMS", target: "Upsell Mess" },
      { source: "Excel Sheets", target: "Upsell Mess" },
    ];

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
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-violet-950/20 to-indigo-950/20 p-6 backdrop-blur-xl">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
             <Icon icon="twemoji:flag-european-union" />
            Niche Experiential Operators
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-foreground">
            Europe: Experiential Scaling
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            In Europe, we focus on <span className="font-semibold text-foreground">boutique chains and retreat operators</span>. 
            High-margin clients are drowning in a "manual mess" of fragmented CRMs and legacy tools, missing out on massive upsell potential.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon icon="mdi:fleur-de-lis" className="text-violet-400" />
              High Margin / High Ticket
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon icon="mdi:spa-outline" className="text-emerald-400" />
              Retreat & Wellness
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon icon="mdi:server-off" className="text-amber-400" />
              Legacy Tool Mess
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4 rounded-2xl border border-border/20 bg-background/40 p-6 shadow-inner backdrop-blur-sm">
          <div className="text-center">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/60">
              System Fragmentation
            </h3>
            <p className="text-xs text-muted-foreground">Common legacy architecture in EU boutique ops</p>
          </div>
          <svg ref={svgRef} width="400" height="240" className="text-foreground/80" />
          <div className="rounded-lg bg-amber-500/10 p-3 text-center border border-amber-500/20">
             <p className="text-xs font-semibold text-amber-400">
               ICP Focus: High-margin clients + CRM mess + upsell heavy + manual ops.
             </p>
          </div>
        </div>
      </div>
      
      <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-violet-500/5 blur-3xl" />
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/5 blur-3xl" />
    </div>
  );
}
