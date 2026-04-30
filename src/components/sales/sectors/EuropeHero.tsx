import React from "react";
import { SectorHeader } from "./SectorHeader";
import { SystemFragmentationGraph, type NetworkNode, type NetworkLink } from "@/components/graph/SystemFragmentationGraph";

const FRAGMENTATION_NODES: NetworkNode[] = [
  { id: "Guest", group: 1, size: 6 },
  { id: "Booking", group: 2, size: 4 },
  { id: "PMS", group: 3, size: 5 },
  { id: "Manual", group: 4, size: 4 },
  { id: "Excel", group: 4, size: 3 },
  { id: "WA", group: 2, size: 3 },
  { id: "Leak", group: 5, size: 4 },
];

const FRAGMENTATION_LINKS: NetworkLink[] = [
  { source: "Guest", target: "Booking" },
  { source: "Booking", target: "PMS" },
  { source: "PMS", target: "Manual" },
  { source: "Manual", target: "Excel" },
  { source: "Guest", target: "WA" },
  { source: "WA", target: "Excel" },
  { source: "PMS", target: "Leak" },
];

export function EuropeHero({ isOpen, onToggle }: { isOpen?: boolean; onToggle?: () => void }) {
  return (
    <SectorHeader
      title="Europe & UK"
      subtitle="Focus on boutique chains and retreat operators. High-margin clients drowning in a manual mess of fragmented CRMs and legacy tools."
      icon="twemoji:flag-european-union"
      gradientFrom="from-violet-950/20"
      gradientTo="to-indigo-950/20"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="flex flex-col items-center justify-center space-y-1 bg-background/40 p-4 shadow-inner backdrop-blur-sm w-full h-full min-w-[320px]">
        <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">
          System Fragmentation
        </h3>
        <SystemFragmentationGraph nodes={FRAGMENTATION_NODES} links={FRAGMENTATION_LINKS} height={120} />
      </div>
    </SectorHeader>
  );
}
