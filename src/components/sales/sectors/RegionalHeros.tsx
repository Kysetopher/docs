import React from "react";
import { SectorHeader } from "./SectorHeader";

interface HeroProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export function SingaporeHero({ isOpen, onToggle }: HeroProps) {
  return (
    <SectorHeader
      title="Singapore"
      subtitle="The core hub for institutional infrastructure and regional HQ operations. Focus on GovTech, SNDGO, and large-scale platform players."
      icon="twemoji:flag-singapore"
      isOpen={isOpen}
      onToggle={onToggle}
    />
  );
}

export function ThailandMalaysiaHero({ isOpen, onToggle }: HeroProps) {
  return (
    <SectorHeader
      title="Thailand & Malaysia"
      subtitle="Emerging markets with strong government digital initiatives (DEPA, MDEC) and a rapidly growing experiential hospitality sector."
      icon="twemoji:flag-thailand"
      gradientFrom="from-emerald-950/20"
      gradientTo="to-teal-950/20"
      isOpen={isOpen}
      onToggle={onToggle}
    />
  );
}

export function JapanKoreaHero({ isOpen, onToggle }: HeroProps) {
  return (
    <SectorHeader
      title="Japan & Korea"
      subtitle="Advanced manufacturing and high-tech construction hubs. Focus on RIKEN, Toyota, and super-contractors like Obayashi and Kajima."
      icon="twemoji:flag-japan"
      gradientFrom="from-rose-950/20"
      gradientTo="to-slate-950/20"
      isOpen={isOpen}
      onToggle={onToggle}
    />
  );
}

export function AustraliaHero({ isOpen, onToggle }: HeroProps) {
  return (
    <SectorHeader
      title="Australia"
      subtitle="Strong focus on R&D (CSIRO Data61) and global real estate development (Lendlease). Strategic link between APAC and Western markets."
      icon="twemoji:flag-australia"
      gradientFrom="from-blue-950/20"
      gradientTo="to-red-950/20"
      isOpen={isOpen}
      onToggle={onToggle}
    />
  );
}
