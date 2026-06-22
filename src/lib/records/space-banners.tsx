import { AtlasDriftSplash } from "@/components/splash/atlas-drift-splash";
import { FloatstarSplash } from "@/components/splash/floatstar-splash";
import { HexMoireGridSplash } from "@/components/splash/hex-moire-grid-splash";
import { WaveformSilkSplash } from "@/components/splash/waveform-silk-splash";
import { CelluloseSplash } from "@/components/splash/nebula-splash";
import { ResonanceFieldSplash } from "@/components/splash/resonance-field-splash";

export function getSpaceBanner(spaceId: string | undefined) {
  switch (spaceId) {
    case "ai-discoverability-optimization":
      return <HexMoireGridSplash />;
    case "talent-agency":
      return <FloatstarSplash />;
    case "ai-support-group":
      return <ResonanceFieldSplash />;
    case "sales":
      return <AtlasDriftSplash />;
    case "home":
      return <WaveformSilkSplash />;
    default:
      return <CelluloseSplash />;
  }
}
