import React, { useMemo } from "react";
import { SectorHeader } from "./SectorHeader";
import { ICPTierMatrixGraph, type TierDataPoint } from "@/components/graph/ICPTierMatrixGraph";
import { GlobalPortfolioSunburst, type SunburstNode } from "@/components/graph/GlobalPortfolioSunburst";
import { targetSectionsContent } from "@/lib/records/sales/target-sections";

const TIER_MATRIX_DATA: TierDataPoint[] = [
  { id: "T1: Boutique Chains", x: 85, y: 90, label: "Tier 1", color: "#3b82f6" },
  { id: "T1: Experience Ops", x: 90, y: 80, label: "Tier 1", color: "#3b82f6" },
  { id: "T2: Platforms", x: 60, y: 70, label: "Tier 2", color: "#6366f1" },
  { id: "T3: Massive Chains", x: 20, y: 40, label: "Tier 3", color: "#ef4444" },
  { id: "T3: Gov Orgs", x: 10, y: 30, label: "Tier 3", color: "#ef4444" },
];

export function StrategyHero({ isOpen, onToggle }: { isOpen?: boolean; onToggle?: () => void }) {
  const sunburstData = useMemo(() => {
    const root: SunburstNode = {
      name: "Innerflect",
      children: targetSectionsContent
        .filter(section => section.id !== "strategy-framework")
        .map(section => {
          const categories: SunburstNode[] = [];
          
          if (section.children) {
            section.children.forEach((category: any) => {
              const sectors: SunburstNode[] = [];
              
              if (category.children) {
                category.children.forEach((sector: any) => {
                  const count = sector.content?.props?.ids?.length || 0;
                  sectors.push({
                    name: sector.title,
                    value: Math.max(count, 0.5)
                  });
                });
              }

              if (sectors.length > 0) {
                categories.push({
                  name: category.title,
                  children: sectors
                });
              }
            });
          }

          return {
            name: section.title,
            children: categories.length > 0 ? categories : undefined,
            value: categories.length === 0 ? 1 : undefined
          };
        })
    };
    return root;
  }, []);

  return (
    <div className="space-y-4">
      <SectorHeader
        title="Strategic Framework"
        subtitle="Without structure, real signals are invisible. We create a control layer for your automations using live domain context."
        icon="mdi:sword-cross"
        gradientFrom="from-slate-950/40"
        gradientTo="to-slate-900/40"
        isOpen={isOpen}
        onToggle={onToggle}
        minHeight="min-h-[220px]"
      >
        <div className="flex flex-col items-center justify-center space-y-2 bg-black/20 w-full h-full min-w-[400px]">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/40 mt-6">
            The ICP Tier Matrix
          </h3>
          <div className="flex-1 w-full flex items-center justify-center p-4">
            <ICPTierMatrixGraph data={TIER_MATRIX_DATA} height={180} />
          </div>
        </div>
      </SectorHeader>

      {isOpen && (
        <div className="space-y-4 px-4 pb-8">
          {/* Transparent, edge-to-edge Sunburst Section */}
          <div className="flex items-center justify-center overflow-hidden">
            <div className="w-full flex items-center justify-center">
              <GlobalPortfolioSunburst data={sunburstData} height={500} />
            </div>
          </div>

          {/* Phase Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <PhaseCard 
              phase="01" 
              title="DIAGNOSTIC" 
              description="Diagnosis first. We audit and map the highest-cost drag with real numbers to reveal invisible signals." 
            />
            <PhaseCard 
              phase="02" 
              title="ARCHITECTURE" 
              description="Defining data flows, governance boundaries, and decision paths before the first line of code is built." 
            />
            <PhaseCard 
              phase="03" 
              title="IMPLEMENTATION" 
              description="Deploying adaptive operational layers that consolidate your tools into a single, composable system." 
            />
            <PhaseCard 
              phase="04" 
              title="EVALUATION" 
              description="Continuous iteration against baselines where we re-evaluate goals, metrics, and UX constraints." 
            />
          </div>
        </div>
      )}
    </div>
  );
}

function PhaseCard({ phase, title, description }: { phase: string; title: string; description: string }) {
  return (
    <div className="p-6 bg-slate-950/40 border border-white/5 backdrop-blur-sm space-y-3 hover:bg-slate-900/40 transition-colors cursor-default">
      <div className="text-[10px] font-bold tracking-widest text-primary/60 uppercase">Phase: {phase}</div>
      <h4 className="text-sm font-bold tracking-tight text-foreground uppercase">{title}</h4>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
