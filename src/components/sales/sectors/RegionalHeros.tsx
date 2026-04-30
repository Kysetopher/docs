import { SectorHeader } from "./SectorHeader";
import { MarketMaturityGraph } from "@/components/graph/MarketMaturityGraph";
import { DigitalAdoptionGraph } from "@/components/graph/DigitalAdoptionGraph";
import { AutomationIndexGraph } from "@/components/graph/AutomationIndexGraph";
import { ProjectPipelineGraph } from "@/components/graph/ProjectPipelineGraph";

interface HeroProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export function SingaporeHero({ isOpen, onToggle }: HeroProps) {
  const data = [
    { label: "Institutional", value: 92, color: "#3b82f6" },
    { label: "Infrastructure", value: 85, color: "#6366f1" },
    { label: "Service Ops", value: 78, color: "#10b981" },
  ];

  return (
    <SectorHeader
      title="Singapore"
      subtitle="The core hub for institutional infrastructure and regional HQ operations. Focus on GovTech, SNDGO, and large-scale platform players."
      icon="twemoji:flag-singapore"
      isOpen={isOpen}
      onToggle={onToggle}
      minHeight="min-h-[180px]"
    >
      <MarketMaturityGraph data={data} height={180} />
    </SectorHeader>
  );
}

export function ThailandMalaysiaHero({ isOpen, onToggle }: HeroProps) {
  const data = [
    { year: "2021", value: 35 },
    { year: "2022", value: 48 },
    { year: "2023", value: 62 },
    { year: "2024", value: 78 },
    { year: "2025", value: 89 },
  ];

  return (
    <SectorHeader
      title="Thailand & Malaysia"
      subtitle="Emerging markets with strong government digital initiatives (DEPA, MDEC) and a rapidly growing experiential hospitality sector."
      icon="twemoji:flag-thailand"
      gradientFrom="from-emerald-950/40"
      gradientTo="to-teal-950/40"
      isOpen={isOpen}
      onToggle={onToggle}
      minHeight="min-h-[180px]"
    >
      <DigitalAdoptionGraph data={data} height={180} />
    </SectorHeader>
  );
}

export function JapanKoreaHero({ isOpen, onToggle }: HeroProps) {
  const data = [
    { axis: "AI Agents", value: 85 },
    { axis: "Robotics", value: 95 },
    { axis: "Cloud ERP", value: 75 },
    { axis: "R&D Sync", value: 90 },
    { axis: "Digital Twin", value: 80 },
  ];

  return (
    <SectorHeader
      title="Japan & Korea"
      subtitle="Advanced manufacturing and high-tech construction hubs. Focus on RIKEN, Toyota, and super-contractors like Obayashi and Kajima."
      icon="twemoji:flag-japan"
      gradientFrom="from-rose-950/40"
      gradientTo="to-slate-950/40"
      isOpen={isOpen}
      onToggle={onToggle}
      minHeight="min-h-[180px]"
    >
      <AutomationIndexGraph data={data} height={180} />
    </SectorHeader>
  );
}

export function AustraliaHero({ isOpen, onToggle }: HeroProps) {
  const data = [
    { stage: "Planned", count: 124, color: "#3b82f6" },
    { stage: "Permit", count: 86, color: "#6366f1" },
    { stage: "Build", count: 42, color: "#8b5cf6" },
    { stage: "Ops", count: 28, color: "#10b981" },
  ];

  return (
    <SectorHeader
      title="Australia"
      subtitle="Strong focus on R&D (CSIRO Data61) and global real estate development (Lendlease). Strategic link between APAC and Western markets."
      icon="twemoji:flag-australia"
      gradientFrom="from-blue-950/40"
      gradientTo="to-red-950/40"
      isOpen={isOpen}
      onToggle={onToggle}
      minHeight="min-h-[180px]"
    >
      <ProjectPipelineGraph data={data} height={180} />
    </SectorHeader>
  );
}
