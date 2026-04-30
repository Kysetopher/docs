import React from "react";
import { ICPTierMatrixGraph, type TierDataPoint } from "@/components/graph/ICPTierMatrixGraph";

const TIER_MATRIX_DATA: TierDataPoint[] = [
  { id: "T1: Boutique Chains", x: 85, y: 90, label: "Tier 1", color: "#3b82f6" },
  { id: "T1: Experience Ops", x: 90, y: 80, label: "Tier 1", color: "#3b82f6" },
  { id: "T2: Digital Platforms", x: 60, y: 70, label: "Tier 2", color: "#6366f1" },
  { id: "T3: Massive Chains", x: 20, y: 40, label: "Tier 3", color: "#ef4444" },
  { id: "T3: Gov Orgs", x: 10, y: 30, label: "Tier 3", color: "#ef4444" },
];

export function StrategyHero() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-slate-950/40 to-slate-900/40 backdrop-blur-xl border-t-primary/20 shadow-2xl">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col space-y-6 items-center p-6 text-center">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Clients don't buy <span className="italic">AI or Agents</span>. They buy
          </p>
          <span className="text-xl font-semibold text-foreground"> 
            Revenue increase, operational clarity, and conversion optimization
          </span>.
          <div className="grid grid-cols-2 gap-4 rounded-2xl bg-background/20 p-4 border border-white/5 w-full">
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
          <ICPTierMatrixGraph data={TIER_MATRIX_DATA} />
        </div>
      </div>
    </div>
  );
}
