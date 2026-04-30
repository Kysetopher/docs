import React from "react";
import { Icon } from "@iconify/react";
import { SystemFragmentationGraph, type NetworkNode, type NetworkLink } from "@/components/graph/SystemFragmentationGraph";

const FRAGMENTATION_NODES: NetworkNode[] = [
  { id: "Guest", group: 1, size: 10 },
  { id: "Booking.com", group: 2, size: 6 },
  { id: "Legacy PMS", group: 3, size: 8 },
  { id: "Manual CRM", group: 4, size: 7 },
  { id: "Excel Sheets", group: 4, size: 5 },
  { id: "WhatsApp", group: 2, size: 5 },
  { id: "Upsell Mess", group: 5, size: 6 },
];

const FRAGMENTATION_LINKS: NetworkLink[] = [
  { source: "Guest", target: "Booking.com" },
  { source: "Booking.com", target: "Legacy PMS" },
  { source: "Legacy PMS", target: "Manual CRM" },
  { source: "Manual CRM", target: "Excel Sheets" },
  { source: "Guest", target: "WhatsApp" },
  { source: "WhatsApp", target: "Excel Sheets" },
  { source: "Legacy PMS", target: "Upsell Mess" },
  { source: "Excel Sheets", target: "Upsell Mess" },
];

export function EuropeHero() {
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
          <SystemFragmentationGraph nodes={FRAGMENTATION_NODES} links={FRAGMENTATION_LINKS} />
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
