import React from "react";
import { UpsellGapGraph, type UpsellDataPoint } from "@/components/graph/UpsellGapGraph";
import { SectorHeader } from "./SectorHeader";

const UPSELL_GAP_DATA: UpsellDataPoint[] = [
  { label: "Bookings", value: 100, color: "#3b82f6" },
  { label: "Check-in", value: 85, color: "#6366f1" },
  { label: "Upsell", value: 40, color: "#ef4444" },
  { label: "Retention", value: 25, color: "#f59e0b" },
];

export function IndonesiaHero({ isOpen, onToggle }: { isOpen?: boolean; onToggle?: () => void }) {
  return (
    <SectorHeader
      title="Indonesia"
      subtitle="Targets suffer from extreme fragmentation. Boutique resorts rely on manual processes for upsells and experiences, leading to massive revenue leakage."
      icon="twemoji:flag-indonesia"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="flex flex-col items-center justify-center space-y-1 bg-background/40 p-4 shadow-inner backdrop-blur-sm w-full h-full min-w-[320px]">
        <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">
          The Upsell Gap
        </h3>
        <UpsellGapGraph data={UPSELL_GAP_DATA} height={100} />
      </div>
    </SectorHeader>
  );
}
