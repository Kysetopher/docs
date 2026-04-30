import React from "react";
import { SectorHeader } from "./SectorHeader";
import { ICPTierMatrixGraph, type TierDataPoint } from "@/components/graph/ICPTierMatrixGraph";

const TIER_MATRIX_DATA: TierDataPoint[] = [
  { id: "T1: Boutique Chains", x: 85, y: 90, label: "Tier 1", color: "#3b82f6" },
  { id: "T1: Experience Ops", x: 90, y: 80, label: "Tier 1", color: "#3b82f6" },
  { id: "T2: Platforms", x: 60, y: 70, label: "Tier 2", color: "#6366f1" },
  { id: "T3: Massive Chains", x: 20, y: 40, label: "Tier 3", color: "#ef4444" },
  { id: "T3: Gov Orgs", x: 10, y: 30, label: "Tier 3", color: "#ef4444" },
];

export function StrategyHero({ isOpen, onToggle }: { isOpen?: boolean; onToggle?: () => void }) {
  return (
    <SectorHeader
      title="Strategic Framework"
      subtitle="Clients buy revenue increase, operational clarity, and conversion optimization. Pivot narrative from tech builders to revenue leakage plumbers."
      icon="mdi:sword-cross"
      gradientFrom="from-slate-950/40"
      gradientTo="to-slate-900/40"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="flex flex-col items-center justify-center space-y-1 bg-background/40 p-4 shadow-inner backdrop-blur-sm w-full h-full min-w-[320px]">
        <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">
          The ICP Tier Matrix
        </h3>
        <ICPTierMatrixGraph data={TIER_MATRIX_DATA} height={120} />
      </div>
    </SectorHeader>
  );
}
