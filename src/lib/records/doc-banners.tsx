import type { ComponentType, ReactNode } from "react";
import { AbyssBloomSplash } from "@/components/splash/abyss-bloom-splash";
import { AtlasDriftSplash } from "@/components/splash/atlas-drift-splash";
import { BathymetrySplash } from "@/components/splash/bathymetry-splash";
import { CausticVeilSplash } from "@/components/splash/caustic-veil-splash";
import { AbyssBloomSplash as CelluloseSplash } from "@/components/splash/abyss-bloom-splash";
import { CubeMoireTextureSplash } from "@/components/splash/cube-moire-texture-splash";
import { FloatstarSplash } from "@/components/splash/floatstar-splash";
import { HexMoireGridSplash } from "@/components/splash/hex-moire-grid-splash";
import { EstuarySplash } from "@/components/splash/estuary-splash";
import { LappetsSplash } from "@/components/splash/lappets-splash";
import { LappetsVolumeSplash } from "@/components/splash/lappets-volume-splash";
import { LappetsFieldSplash } from "@/components/splash/lappets-volume-study-splash";
import { MoireWaterSplash } from "@/components/splash/moire-water-splash";
import { PosturizeSplash } from "@/components/splash/posturize-splash";
import { StrataSplash } from "@/components/splash/strata-splash";
import { TideglassSplash } from "@/components/splash/tideglass-splash";
import { UndertowSplash } from "@/components/splash/undertow-splash";
import { WaveformSilkSplash } from "@/components/splash/waveform-silk-splash";

type SplashProps = {
  color?: string;
};

type SplashComponent = ComponentType<SplashProps>;

type DocBannerConfig = {
  component: SplashComponent;
  color: string;
};

const DOC_BANNERS: Record<string, DocBannerConfig> = {
  "canonical-definition": { component: AbyssBloomSplash, color: "#5dd6ff" },
  "geo-optimization": { component: HexMoireGridSplash, color: "#38bdf8" },
  frameworks: { component: WaveformSilkSplash, color: "#8b5cf6" },
  "research-and-benchmarking": { component: HexMoireGridSplash, color: "#22c55e" },
  "tooling-and-glossary": { component: CelluloseSplash, color: "#f59e0b" },
  "business-plan": { component: AtlasDriftSplash, color: "#e11d48" },
  "hosting-control-plane": { component: TideglassSplash, color: "#06b6d4" },
  "concept-system": { component: FloatstarSplash, color: "#a855f7" },
  "market-analysis": { component: StrataSplash, color: "#fb7185" },
  "market-research": { component: EstuarySplash, color: "#14b8a6" },
  "scenes-and-examples": { component: CausticVeilSplash, color: "#f97316" },
  "products-services": { component: PosturizeSplash, color: "#8b5cf6" },
  "upskill-services": { component: LappetsSplash, color: "#10b981" },
  "target-sectors": { component: BathymetrySplash, color: "#0ea5e9" },
  "research-on-ai-psychosis": { component: UndertowSplash, color: "#60a5fa" },
  "current-programs-and-figures-in-ai-psychosis": { component: BathymetrySplash, color: "#d946ef" },
  "cases-of-ai-psychosis": { component: MoireWaterSplash, color: "#84cc16" },
  "petitioning-for-medical-recognition": { component: TideglassSplash, color: "#f43f5e" },
  "stages-of-ai-psychosis": { component: MoireWaterSplash, color: "#3b82f6" },
  "sales-playbook": { component: LappetsVolumeSplash, color: "#f59e0b" },
  "target-Sectors": { component: LappetsFieldSplash, color: "#a3e635" },
  "scraping-methods": { component: CubeMoireTextureSplash, color: "#22c55e" },
};

export function getDocBanner(docId: string | undefined): ReactNode {
  if (!docId) return null;

  const banner = DOC_BANNERS[docId];
  if (!banner) return null;

  const Splash = banner.component;
  return <Splash color={banner.color} />;
}