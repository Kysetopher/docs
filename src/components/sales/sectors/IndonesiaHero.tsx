import React from "react";
import { UpsellGapGraph, type UpsellDataPoint } from "@/components/graph/UpsellGapGraph";
import { SectorHeader } from "./SectorHeader";

const UPSELL_GAP_DATA: UpsellDataPoint[] = [
  { label: "Bookings", value: 100, color: "#3b82f6" },
  { label: "Check-in", value: 85, color: "#6366f1" },
  { label: "Upsell", value: 42, color: "#ef4444" },
  { label: "Retention", value: 28, color: "#f59e0b" },
];

export function IndonesiaHero({ isOpen, onToggle }: { isOpen?: boolean; onToggle?: () => void }) {
  return (
    <SectorHeader
      title="Indonesia"
      subtitle="Targets suffer from extreme fragmentation. Boutique resorts rely on manual processes for upsells and experiences, leading to massive revenue leakage."
      icon="twemoji:flag-indonesia"
      isOpen={isOpen}
      onToggle={onToggle}
      minHeight="min-h-[180px]"
      gradientFrom="from-red-950/40"
      gradientTo="to-slate-900/40"
    >
      <div className="flex flex-col items-center justify-center w-full h-full min-w-[350px]">
        <UpsellGapGraph data={UPSELL_GAP_DATA} height={180} />
      </div>
    </SectorHeader>
  );
}
