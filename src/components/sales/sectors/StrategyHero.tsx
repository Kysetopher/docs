import { useMemo, useState } from "react";
import { SectorHeader } from "./SectorHeader";
import { ICPTierMatrixGraph, type TierDataPoint } from "@/components/graph/ICPTierMatrixGraph";
import { GlobalPortfolioSunburst, type SunburstNode } from "@/components/graph/GlobalPortfolioSunburst";
import { targetSectionsContent, SALES_REFERENCES } from "@/lib/records/sales/target-sections";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Icon } from "@iconify/react";
import { Slider } from "@/components/ui/slider";

type CompanySizeBucket = "10-50" | "51-200" | "201-500" | "500+";
type AiMarginBucket = "0-25" | "26-50" | "51-75" | "76-100";

type FilterState = {
  regions: string[];
  verticals: string[];
  employeeRange: [number, number];
  aiMargins: AiMarginBucket[];
};

type TargetProfile = {
  id: string;
  region: string;
  vertical: string;
  employeeCount: number;
  aiMargin: number;
};

const COMPANY_SIZE_OPTIONS: { value: CompanySizeBucket; label: string; note: string }[] = [
  { value: "10-50", label: "10-50", note: "Founder-led or very small team" },
  { value: "51-200", label: "51-200", note: "Lean operator / growth-stage" },
  { value: "201-500", label: "201-500", note: "Mid-market or scaling team" },
  { value: "500+", label: "500+", note: "Enterprise or platform-scale" },
];

const AI_MARGIN_OPTIONS: { value: AiMarginBucket; label: string; note: string }[] = [
  { value: "0-25", label: "0-25", note: "Mostly manual, early AI exposure" },
  { value: "26-50", label: "26-50", note: "Some pilots or partial integration" },
  { value: "51-75", label: "51-75", note: "Multiple workflows already using AI" },
  { value: "76-100", label: "76-100", note: "AI is already embedded in operations" },
];

const TARGET_PROFILE_OVERRIDES: Record<string, { companySize: CompanySizeBucket; aiMargin: number }> = {
  revolut: { companySize: "201-500", aiMargin: 72 },
  wise: { companySize: "201-500", aiMargin: 68 },
  monzo: { companySize: "201-500", aiMargin: 66 },
  personio: { companySize: "201-500", aiMargin: 58 },
  deel: { companySize: "201-500", aiMargin: 60 },
  stripe: { companySize: "500+", aiMargin: 82 },
  checkout: { companySize: "500+", aiMargin: 66 },
  shopify: { companySize: "500+", aiMargin: 78 },
  booking: { companySize: "500+", aiMargin: 54 },
  getyourguide: { companySize: "201-500", aiMargin: 57 },
  deliveroo: { companySize: "500+", aiMargin: 46 },
  hellofresh: { companySize: "500+", aiMargin: 52 },
  ocado: { companySize: "500+", aiMargin: 74 },
  bolt: { companySize: "500+", aiMargin: 42 },
  airbnb: { companySize: "500+", aiMargin: 84 },
  klarna: { companySize: "500+", aiMargin: 77 },
  truelayer: { companySize: "201-500", aiMargin: 64 },
  bunq: { companySize: "201-500", aiMargin: 59 },
  n26: { companySize: "201-500", aiMargin: 61 },
  canva: { companySize: "500+", aiMargin: 73 },
};

function inferCompanySize(ref: any): CompanySizeBucket {
  const tags = new Set((ref.tags ?? []).map((tag: { id: string }) => tag.id));
  if (tags.has("government") || tags.has("research") || tags.has("aviation")) return "500+";
  if (tags.has("enterprise")) return "500+";
  if (tags.has("scale")) return "201-500";
  if (tags.has("marketplace")) return "201-500";
  if (tags.has("manufacturing")) return "500+";
  if (tags.has("construction")) return "201-500";
  if (tags.has("hospitality")) return "51-200";
  return "201-500";
}

function inferAiMargin(ref: any): number {
  const tags = new Set((ref.tags ?? []).map((tag: { id: string }) => tag.id));
  const note = `${ref.note ?? ""} ${ref.sellingStrategy ?? ""}`.toLowerCase();
  let score = 24;

  if (tags.has("governance")) score += 20;
  if (tags.has("execution")) score += 14;
  if (tags.has("framework")) score += 12;
  if (tags.has("innovation")) score += 18;
  if (tags.has("scale")) score += 10;
  if (tags.has("enterprise")) score += 8;
  if (tags.has("marketplace")) score += 6;
  if (tags.has("hospitality")) score += 4;
  if (tags.has("research")) score += 16;
  if (note.includes("ai")) score += 10;
  if (note.includes("manual")) score -= 6;

  return Math.max(0, Math.min(100, score));
}

function getAiMarginBucket(score: number): AiMarginBucket {
  if (score <= 25) return "0-25";
  if (score <= 50) return "26-50";
  if (score <= 75) return "51-75";
  return "76-100";
}

function matchesFilter<T extends string>(selected: T[], value: T) {
  return selected.length === 0 || selected.includes(value);
}

const MAX_EMPLOYEES = 500000;
const SLIDER_POWER = 4; // Higher = more precision at low end

const toPhys = (val: number) => Math.round(MAX_EMPLOYEES * Math.pow(val / 100, SLIDER_POWER));
const toLog = (phys: number) => 100 * Math.pow(phys / MAX_EMPLOYEES, 1 / SLIDER_POWER);

const TIER_MATRIX_DATA: TierDataPoint[] = [
  { id: "T1: Boutique Chains", x: 85, y: 90, label: "Tier 1", color: "#3b82f6" },
  { id: "T1: Experience Ops", x: 90, y: 80, label: "Tier 1", color: "#3b82f6" },
  { id: "T2: Platforms", x: 60, y: 70, label: "Tier 2", color: "#6366f1" },
  { id: "T3: Massive Chains", x: 20, y: 40, label: "Tier 3", color: "#ef4444" },
  { id: "T3: Gov Orgs", x: 10, y: 30, label: "Tier 3", color: "#ef4444" },
];

const STRATEGIC_TRIGGERS = [
  {
    id: "ai-context",
    title: "Zero-Context AI Assistance",
    description: "Start AI assistance chats without prior context. AI finds required context based on initial prompts.",
    source: "DevTools / Automation",
    relevance: "High",
    tag: "Productivity"
  },
  {
    id: "mcp-cli",
    title: "MCP Server & CLI Expansion",
    description: "Exposing automation capabilities through CLI to enable coding agents to batch tool calls and improve token efficiency.",
    source: "Infrastructure",
    relevance: "Critical",
    tag: "Efficiency"
  },
  {
    id: "code-gen",
    title: "Console-Level Code Generation",
    description: "Generate entire code blocks directly in Console and Sources via natural language comments.",
    source: "Developer Experience",
    relevance: "Medium",
    tag: "Velocity"
  }
];

export function StrategyHero({ isOpen, onToggle }: { isOpen?: boolean; onToggle?: () => void }) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    regions: [],
    verticals: [],
    employeeRange: [0, MAX_EMPLOYEES],
    aiMargins: [],
  });

  const targetProfiles = useMemo(() => {
    const profiles: TargetProfile[] = [];
    const regionSet = new Set<string>();
    const verticalSet = new Set<string>();

    targetSectionsContent
      .filter((section) => section.id !== "strategy-framework")
      .forEach((section: any) => {
        regionSet.add(section.title);
        section.children?.forEach((category: any) => {
          category.children?.forEach((sector: any) => {
            const targetIds: string[] = sector.content?.props?.ids || [];
            if (targetIds.length === 0) return;

            verticalSet.add(sector.title);

            targetIds.forEach((id) => {
              const ref = (SALES_REFERENCES as any)[id];
              if (!ref) return;
              const override = TARGET_PROFILE_OVERRIDES[id];
              const aiMargin = override?.aiMargin ?? inferAiMargin(ref);
              
              let employeeCount = ref.employeeCount;
              if (!employeeCount) {
                const bucket = override?.companySize ?? inferCompanySize(ref);
                const map = { "10-50": 30, "51-200": 125, "201-500": 350, "500+": 1000 };
                employeeCount = map[bucket];
              }

              profiles.push({
                id,
                region: section.title,
                vertical: sector.title,
                employeeCount,
                aiMargin,
              });
            });
          });
        });
      });

    return {
      profiles,
      regions: Array.from(regionSet),
      verticals: Array.from(verticalSet),
    };
  }, []);

  const filteredTargetIds = useMemo(() => {
    return new Set(
      targetProfiles.profiles
        .filter((profile) =>
          matchesFilter(filters.regions, profile.region) &&
          matchesFilter(filters.verticals, profile.vertical) &&
          profile.employeeCount >= filters.employeeRange[0] &&
          profile.employeeCount <= filters.employeeRange[1] &&
          matchesFilter(filters.aiMargins, getAiMarginBucket(profile.aiMargin))
        )
        .map((profile) => profile.id)
    );
  }, [filters, targetProfiles.profiles]);

  const activeFilterCount =
    filters.regions.length +
    filters.verticals.length +
    (filters.employeeRange[0] > 0 || filters.employeeRange[1] < MAX_EMPLOYEES ? 1 : 0) +
    filters.aiMargins.length;

  const sunburstData = useMemo(() => {
    const sections: SunburstNode[] = targetSectionsContent
      .filter(section => section.id !== "strategy-framework")
      .map(section => {
        const categories: SunburstNode[] = [];
        
        if (section.children) {
          section.children.forEach((category: any) => {
            const sectors: SunburstNode[] = [];
            
            if (category.children) {
              category.children.forEach((sector: any) => {
                const targetIds = sector.content?.props?.ids || [];
                const targets: SunburstNode[] = targetIds
                  .filter((id: string) => filteredTargetIds.has(id))
                  .map((id: string) => ({
                    name: id.replace(/_/g, ' '),
                    targetId: id,
                    value: 1
                  }));

                if (targets.length > 0) {
                  sectors.push({
                    name: sector.title,
                    sectionId: sector.id,
                    children: targets
                  });
                }
              });
            }

            if (sectors.length > 0) {
              categories.push({
                name: category.title,
                sectionId: category.id,
                children: sectors
              });
            }
          });
        }

        if (categories.length === 0) return null;

        return {
          name: section.title,
          sectionId: section.id,
          children: categories
        };
      })
      .filter(Boolean) as SunburstNode[];

    const root: SunburstNode = {
      name: "Innerflect",
      children: sections.length > 0 ? sections : undefined
    };
    return root;
  }, [filteredTargetIds]);

  const updateList = (key: keyof FilterState, value: string) => {
    setFilters((current) => {
      const list = current[key] as string[];
      return {
        ...current,
        [key]: list.includes(value) ? list.filter((item) => item !== value) : [...list, value],
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      regions: [],
      verticals: [],
      employeeRange: [0, MAX_EMPLOYEES],
      aiMargins: [],
    });
  };

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
        <div className="space-y-4 pb-8">
          {/* Transparent, edge-to-edge Sunburst Section with Filter Overlay */}
          <div className="group/graph relative flex min-h-[700px] w-full items-center justify-center overflow-hidden">
            {/* ABSOLUTE OVERLAY FILTER BUTTON */}
            <div className="absolute left-8 top-8 z-30">
              <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="h-12 gap-3 rounded-2xl border-white/10 bg-slate-950/80 px-5 text-sm font-bold tracking-tight backdrop-blur-2xl hover:bg-slate-900 transition-all shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:border-primary/40 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Icon icon="mdi:filter-variant" className="h-5 w-5 text-primary" />
                    Portfolio Filter
                    {activeFilterCount > 0 ? (
                      <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-primary/20 px-1.5 text-[11px] font-black text-primary border border-primary/30">
                        {activeFilterCount}
                      </span>
                    ) : null}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-5xl border-white/10 bg-slate-950 text-foreground shadow-2xl backdrop-blur-3xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold tracking-tight">Filter Portfolio Graph</DialogTitle>
                    <DialogDescription className="text-muted-foreground/60">
                      Narrow the sunburst by region, vertical, company size, or how much AI is already embedded.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-6 md:grid-cols-2 mt-4">
                    <FilterGroup
                      title="Region"
                      items={targetProfiles.regions}
                      selected={filters.regions}
                      onToggle={(value) => updateList("regions", value)}
                    />
                    <FilterGroup
                      title="Vertical"
                      items={targetProfiles.verticals}
                      selected={filters.verticals}
                      onToggle={(value) => updateList("verticals", value)}
                    />
                    <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-inner">
                      <div className="flex items-center justify-between">
                        <div className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/40">
                          Number of employees
                        </div>
                        <div className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                          {filters.employeeRange[0].toLocaleString()} - {filters.employeeRange[1] >= MAX_EMPLOYEES ? "500k+" : filters.employeeRange[1].toLocaleString()}
                        </div>
                      </div>
                      <Slider
                        defaultValue={[0, 100]}
                        max={100}
                        step={0.1}
                        value={[toLog(filters.employeeRange[0]), toLog(filters.employeeRange[1])]}
                        onValueChange={(val) => {
                          const [min, max] = val as [number, number];
                          setFilters(f => ({ ...f, employeeRange: [toPhys(min), toPhys(max)] }));
                        }}
                        className="py-6"
                      />
                      <div className="flex justify-between text-[10px] font-bold text-muted-foreground/30 uppercase tracking-widest px-1">
                        <span>Startup</span>
                        <span>Mid-Market</span>
                        <span>Enterprise</span>
                        <span>Global Tier</span>
                      </div>
                    </div>

                    <FilterGroup
                      title="AI adaptive margin"
                      items={AI_MARGIN_OPTIONS.map((option) => option.value)}
                      selected={filters.aiMargins}
                      onToggle={(value) => updateList("aiMargins", value)}
                      notes={Object.fromEntries(AI_MARGIN_OPTIONS.map((option) => [option.value, option.note]))}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-6 mt-4">
                    <div className="text-xs font-medium text-muted-foreground/50">
                      <span className="text-foreground font-bold">{filteredTargetIds.size}</span> targets visible in the current view
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" size="sm" onClick={clearFilters} className="font-bold">
                        Reset All
                      </Button>
                      <Button size="sm" onClick={() => setFilterOpen(false)} className="font-bold px-6 shadow-lg shadow-primary/20">
                        Apply View
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="w-full flex items-center justify-center pointer-events-auto">
              {filteredTargetIds.size > 0 ? (
                <GlobalPortfolioSunburst data={sunburstData} height={700} />
              ) : (
                <div className="flex h-[700px] w-full items-center justify-center text-sm text-muted-foreground italic">
                  No targets match the current filters.
                </div>
              )}
            </div>
          </div>

          {/* Live Strategic Triggers Feed */}
          <div className="space-y-3 px-4">
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">Live Strategic Triggers</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {STRATEGIC_TRIGGERS.map((trigger) => (
                <div key={trigger.id} className="group relative overflow-hidden rounded-2xl border border-white/5 bg-slate-950/40 p-4 transition-all hover:border-primary/20 hover:bg-slate-900/40">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/40 bg-white/5 px-2 py-0.5 rounded-full">{trigger.tag}</span>
                    <span className={`text-[9px] font-black uppercase tracking-tighter ${trigger.relevance === 'Critical' ? 'text-rose-500' : trigger.relevance === 'High' ? 'text-amber-500' : 'text-blue-500'}`}>{trigger.relevance}</span>
                  </div>
                  <h5 className="text-xs font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{trigger.title}</h5>
                  <p className="text-[11px] leading-relaxed text-muted-foreground/70">{trigger.description}</p>
                  <div className="mt-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] font-mono text-muted-foreground/30">Source: {trigger.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Phase Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
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

function FilterGroup({
  title,
  items,
  selected,
  onToggle,
  notes,
}: {
  title: string;
  items: string[];
  selected: string[];
  onToggle: (value: string) => void;
  notes?: Record<string, string>;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="mb-3">
        <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground/50">{title}</div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {items.map((item) => {
          const isChecked = selected.includes(item);
          return (
            <label
              key={item}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-slate-950/30 p-3 transition hover:border-primary/30 hover:bg-slate-950/50"
            >
              <Checkbox checked={isChecked} onCheckedChange={() => onToggle(item)} className="mt-0.5" />
              <span className="min-w-0">
                <span className="block text-sm font-medium text-foreground">{item}</span>
                {notes?.[item] ? (
                  <span className="block text-[11px] leading-relaxed text-muted-foreground">{notes[item]}</span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>
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
