import React from "react";
import { Icon } from "@iconify/react";
import { UpsellGapGraph, type UpsellDataPoint } from "@/components/graph/UpsellGapGraph";

const UPSELL_GAP_DATA: UpsellDataPoint[] = [
  { label: "Bookings", value: 100, color: "#3b82f6" },
  { label: "Check-in", value: 85, color: "#6366f1" },
  { label: "Upsell", value: 40, color: "#ef4444" }, // Large drop
  { label: "Retention", value: 25, color: "#f59e0b" },
];

export function IndonesiaHero() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-indigo-950/20 to-cyan-950/20 p-6 backdrop-blur-xl">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Icon icon="twemoji:flag-indonesia" />
            High Probability Region
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-foreground">
            Indonesia: The Ops Chaos Opportunity
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Targets in Indonesia suffer from <span className="font-semibold text-foreground">extreme fragmentation</span>. 
            Boutique resorts and operators rely on manual processes for upsells and experiences, leading to massive revenue leakage.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon icon="mdi:alert-circle-outline" className="text-red-400" />
              Manual Ops Chaos
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon icon="mdi:trending-down" className="text-amber-400" />
              Revenue Leakage
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon icon="mdi:link-variant-off" className="text-blue-400" />
              Fragmented CRM
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4 rounded-2xl border border-border/20 bg-background/40 p-6 shadow-inner backdrop-blur-sm">
          <div className="text-center">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/60">
              The Upsell Gap
            </h3>
            <p className="text-xs text-muted-foreground">Estimated conversion decay in manual systems</p>
          </div>
          <UpsellGapGraph data={UPSELL_GAP_DATA} />
          <div className="rounded-lg bg-red-500/10 p-3 text-center border border-red-500/20">
             <p className="text-xs font-semibold text-red-400">
               ICP Focus: Fragmented ops + manual upsell + heavy reliance on bookings.
             </p>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl" />
    </div>
  );
}
