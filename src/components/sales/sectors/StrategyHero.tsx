import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Icon } from "@iconify/react";

export function StrategyHero() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 400;
    const height = 240;
    const margin = { top: 30, right: 30, bottom: 40, left: 40 };

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

    const targets = [
      { id: "T1: Boutique Chains", x: 85, y: 90, label: "Tier 1", color: "#3b82f6" },
      { id: "T1: Experience Ops", x: 90, y: 80, label: "Tier 1", color: "#3b82f6" },
      { id: "T2: Digital Platforms", x: 60, y: 70, label: "Tier 2", color: "#6366f1" },
      { id: "T3: Massive Chains", x: 20, y: 40, label: "Tier 3", color: "#ef4444" },
      { id: "T3: Gov Orgs", x: 10, y: 30, label: "Tier 3", color: "#ef4444" },
    ];

    const xScale = d3.scaleLinear().domain([0, 100]).range([margin.left, width - margin.right]);
    const yScale = d3.scaleLinear().domain([0, 100]).range([height - margin.bottom, margin.top]);

    svg.selectAll("circle")
      .data(targets)
      .join("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 8)
      .attr("fill", (d) => d.color)
      .attr("stroke", "white")
      .attr("stroke-width", 2);

    svg.selectAll(".target-label")
      .data(targets)
      .join("text")
      .attr("class", "target-label")
      .attr("x", (d) => xScale(d.x) + 12)
      .attr("y", (d) => yScale(d.y) + 4)
      .text((d) => d.id)
      .attr("font-size", "9px")
      .attr("fill", "currentColor")
      .attr("opacity", 0.8);

    // Axis labels
    svg.append("text")
      .attr("x", width / 2 + 10)
      .attr("y", height - 5)
      .attr("text-anchor", "middle")
      .text("Operational Chaos →")
      .attr("font-size", "10px")
      .attr("fill", "currentColor")
      .attr("font-weight", "bold");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .text("Revenue Leakage Potential ↑")
      .attr("font-size", "10px")
      .attr("fill", "currentColor")
      .attr("font-weight", "bold");

  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-slate-950/40 to-slate-900/40 backdrop-blur-xl border-t-primary/20 shadow-2xl">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col space-y-6 items-center">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Clients don't buy <span className="italic">AI or Agents</span>. They buy
          </p>
          <span className="font-semibold text-foreground"> Revenue increase, operational clarity, and conversion optimization</span>.
          <div className="grid grid-cols-2 gap-4 rounded-2xl bg-background/20 p-4 border border-white/5">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Tier 1 Target</p>
              <p className="text-sm font-medium">5-50 Locations / High-Ticket</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Tier 3 (Avoid)</p>
              <p className="text-sm font-medium">Massive Chains / Gov Orgs</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4 rounded-2xl border border-border/20 bg-background/40 p-6 shadow-inner backdrop-blur-sm">
          <div className="text-center">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/60">
              The ICP Tier Matrix
            </h3>
            <p className="text-xs text-muted-foreground">Prioritizing high-leverage operator segments</p>
          </div>
          <svg ref={svgRef} width="400" height="240" className="text-foreground/80" />
        </div>
      </div>
    </div>
  );
}
