import { AtlasDriftSplash } from "@/components/splash/atlas-drift-splash";
import { FloatstarSplash } from "@/components/splash/floatstar-splash";
import { HexMoireGridSplash } from "@/components/splash/hex-moire-grid-splash";
import { WaveformSilkSplash } from "@/components/splash/waveform-silk-splash";
import { AbyssBloomSplash } from "@/components/splash/abyss-bloom-splash";
import { HexMoireGridSplash as ResonanceFieldSplash } from "@/components/splash/hex-moire-grid-splash";
import { StrataSplash } from "@/components/splash/strata-splash";

export function getSpaceBanner(spaceId: string | undefined) {
  switch (spaceId) {
    case "ai-discoverability-optimization":
      return <HexMoireGridSplash />;
    case "auto-build-pipeline":
      return <WaveformSilkSplash />;
    case "talent-agency":
      return <FloatstarSplash />;
    case "ai-support-group":
      return <ResonanceFieldSplash />;
    case "sales":
      return <AtlasDriftSplash />;
    case "mining":
      return <StrataSplash />;
    case "home":
      return <WaveformSilkSplash />;
    default:
      return <AbyssBloomSplash />;
  }
}