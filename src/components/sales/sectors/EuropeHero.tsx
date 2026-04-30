import React from "react";
import { SectorHeader } from "./SectorHeader";
import { SystemFragmentationGraph, type NetworkNode, type NetworkLink } from "@/components/graph/SystemFragmentationGraph";

const FRAGMENTATION_NODES: NetworkNode[] = [
  { id: "Guest", group: 1, size: 10, icon: "line-md:account" },
  { id: "Booking", group: 2, size: 8, icon: "logos:bookingcom" },
  { id: "PMS", group: 3, size: 9, icon: "logos:opera" },
  { id: "Manual", group: 4, size: 8, icon: "mdi:pencil" },
  { id: "Excel", group: 4, size: 8, icon: "logos:microsoft-excel" },
  { id: "WA", group: 2, size: 8, icon: "logos:whatsapp-icon" },
  { id: "Leak", group: 4, size: 9, icon: "mdi:alert-circle" },
  { id: "Email", group: 2, size: 8, icon: "logos:microsoft-outlook" },
  { id: "GitHub", group: 3, size: 8, icon: "line-md:github-loop" },
  { id: "Twitter", group: 2, size: 8, icon: "line-md:twitter-x" },
  { id: "Discord", group: 2, size: 8, icon: "line-md:discord" },
  { id: "YouTube", group: 2, size: 8, icon: "line-md:youtube" },
  { id: "Telegram", group: 2, size: 8, icon: "line-md:telegram" },
  { id: "Database", group: 3, size: 9, icon: "logos:postgresql" },
  { id: "Cloud", group: 3, size: 8, icon: "logos:aws" },
  { id: "Slack", group: 2, size: 8, icon: "logos:slack-icon" },
];

const FRAGMENTATION_LINKS: NetworkLink[] = [
  { source: "Guest", target: "Booking" },
  { source: "Guest", target: "WA" },
  { source: "Guest", target: "Email" },
  { source: "Guest", target: "Twitter" },
  { source: "Guest", target: "Discord" },
  { source: "Booking", target: "PMS" },
  { source: "PMS", target: "Database" },
  { source: "PMS", target: "Cloud" },
  { source: "PMS", target: "Manual" },
  { source: "Manual", target: "Excel" },
  { source: "WA", target: "Excel" },
  { source: "Email", target: "Excel" },
  { source: "Database", target: "Leak" },
  { source: "Excel", target: "Leak" },
  { source: "Slack", target: "Manual" },
  { source: "GitHub", target: "Cloud" },
  { source: "YouTube", target: "Guest" },
  { source: "Telegram", target: "WA" },
];

export function EuropeHero({ isOpen, onToggle }: { isOpen?: boolean; onToggle?: () => void }) {
  return (
    <SectorHeader
      title="Europe & UK"
      subtitle="Focus on boutique chains and retreat operators. High-margin clients drowning in a manual mess of fragmented CRMs and legacy tools."
      icon="twemoji:flag-european-union"
      gradientFrom="from-violet-950/40"
      gradientTo="to-indigo-950/40"
      isOpen={isOpen}
      onToggle={onToggle}
      minHeight="min-h-[300px]"
    >
      <div className="flex flex-col items-center justify-center w-full h-full min-w-[400px]">
        <SystemFragmentationGraph nodes={FRAGMENTATION_NODES} links={FRAGMENTATION_LINKS} height={300} />
      </div>
    </SectorHeader>
  );
}
