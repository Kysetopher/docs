import { AtlasDriftSplash } from "@/components/splash/atlas-drift-splash";
import { AbyssBloomSplash } from "@/components/splash/abyss-bloom-splash";
import { FloatstarSplash } from "@/components/splash/floatstar-splash";
import { HexCurrentSplash } from "@/components/splash/hex-current-splash";
import { HexLatticeSplash } from "@/components/splash/hex-lattice-splash";
import { HexMoireGridSplash } from "@/components/splash/hex-moire-grid-splash";
import { StrataSplash } from "@/components/splash/strata-splash";
import { WaveformSilkSplash } from "@/components/splash/waveform-silk-splash";

export function getSpaceBanner(spaceId: string | undefined) {
  switch (spaceId) {
    case "ai-discoverability-optimization":
      return <HexMoireGridSplash color="#38bdf8" />;
    case "auto-build-pipeline":
      return <WaveformSilkSplash color="#8b5cf6" />;
    case "talent-agency":
      return <FloatstarSplash color="#f59e0b" />;
    case "ai-support-group":
      return <HexCurrentSplash color="#22c55e" />;
    case "sales":
      return <AtlasDriftSplash color="#e11d48" />;
    case "mining":
      return <StrataSplash color="#f97316" />;
    case "home":
      return <AbyssBloomSplash color="#14b8a6" />;
    default:
      return <HexLatticeSplash color="#60a5fa" />;
  }
}
