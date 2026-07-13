"use client";

import * as React from "react";
import { createAnimationBuffers, startAnimationLoop } from "@/lib/splash/animation";
import { drawSpline } from "@/lib/splash/geometry";
import { rgba } from "@/lib/splash/math";
import { createSplashPalette } from "@/lib/splash/color";
import { buildWaveFrame, buildWaveStrands, type WaveStrand } from "@/lib/splash/waveform";

const TARGET_FPS = 30;
const FRAME_INTERVAL_MS = 1000 / TARGET_FPS;

export function WaveformSilkSplash({ color = "#38bdf8" }: { color?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const palette = React.useMemo(() => createSplashPalette(color), [color]);
  const wavePalette = React.useMemo(
    () => [palette.primary, palette.secondary, palette.tertiary, palette.quaternary],
    [palette],
  );

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const buffers = createAnimationBuffers(16384);
    let logicalWidth = 0;
    let logicalHeight = 0;
    let logicalDpr = 1;
    let strands: WaveStrand[] = [];
    const cellSize = () => Math.max(24, Math.min(logicalWidth, logicalHeight) * 0.045);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.floor(rect.width));
      const nextHeight = Math.max(1, Math.floor(rect.height));
      const nextDpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      if (nextWidth === logicalWidth && nextHeight === logicalHeight && nextDpr === logicalDpr) return;

      logicalWidth = nextWidth;
      logicalHeight = nextHeight;
      logicalDpr = nextDpr;
      canvas.width = Math.floor(logicalWidth * logicalDpr);
      canvas.height = Math.floor(logicalHeight * logicalDpr);
      ctx.setTransform(logicalDpr, 0, 0, logicalDpr, 0, 0);
      strands = buildWaveStrands({
        width: logicalWidth,
        height: logicalHeight,
        paletteSize: wavePalette.length,
        buffers,
      });
    };

    const stopLoop = startAnimationLoop({
      visibilityTarget: canvas,
      frameBudgetMs: FRAME_INTERVAL_MS,
      onFrame(nowMs) {
        if (!strands.length) return;
        const timeSeconds = nowMs * 0.001 * 0.2;
        const { pulse, anchorX, anchorY } = buildWaveFrame({
          timeSeconds,
          width: logicalWidth,
          height: logicalHeight,
          ctx,
          buffers,
          palette,
        });

        for (let s = 0; s < strands.length; s += 1) {
          const strand = strands[s];
          const rgb = wavePalette[strand.colorIndex % wavePalette.length];
          const nextRgb = wavePalette[(strand.colorIndex + 2) % wavePalette.length];
          const animatedXY = strand.animatedXY;
          const speedBoost = 0.92 + pulse * 0.6;
          const normalizedBand = strand.baseY / Math.max(1, logicalHeight);
          const size = cellSize();

          for (let i = 0; i < strand.pointCount; i += 1) {
            const x = strand.baseX[i];
            const dx = x - anchorX;
            const dy = strand.baseY - anchorY;
            const radial = Math.hypot(dx, dy);
            const carrierA = Math.sin((x / 720) * Math.PI * 2 - timeSeconds * (0.12 * speedBoost) + strand.phase * 0.18);
            const carrierB = Math.sin((x / 1120) * Math.PI * 2 + timeSeconds * (0.08 * speedBoost) - strand.phase * 0.12);
            const carrierC = Math.sin((radial / 860) * Math.PI * 2 - timeSeconds * (0.14 * speedBoost) + strand.phase * 0.22);
            const carrierOffset =
              (carrierA * 1.25 + carrierB * 0.95 + carrierC * 0.65) * size * 1.65 * strand.curveInfluence;

            const localA = Math.sin((x / strand.wavelength) * Math.PI * 2 - timeSeconds * strand.speed * speedBoost + strand.phase + s * 0.24);
            const localB = Math.sin((x / (strand.wavelength * 1.7)) * Math.PI * 2 + timeSeconds * (strand.speed * 0.62 * speedBoost) - strand.phase * 0.9 + s * 0.16);
            const localOffset = (localA * 0.72 + localB * 0.38) * strand.amplitude * strand.localInfluence;
            const detail =
              Math.sin(x * 0.0042 - timeSeconds * 0.46 + s * 0.33) *
              Math.sin(x * 0.0023 + timeSeconds * 0.21 - s * 0.14) *
              size *
              0.18 *
              strand.detailInfluence;
            const compressionWave = Math.sin((x / 820) * Math.PI * 2 - timeSeconds * 0.11 + s * 0.09);
            const compressionFactor = 1 - Math.abs(compressionWave) * 0.18;

            const offset = i * 2;
            animatedXY[offset] = x;
            animatedXY[offset + 1] = strand.baseY + carrierOffset + localOffset * compressionFactor + detail * compressionFactor;
          }

          const opacityWaveA = Math.sin(timeSeconds * 0.22 + strand.opacityPhase + s * 0.15);
          const opacityWaveB = Math.sin(normalizedBand * Math.PI * 2 * 1.4 - timeSeconds * 0.1);
          const opacityWaveC = Math.sin(timeSeconds * 0.08 + s * 0.32);
          const opacityMix = (opacityWaveA * 0.5 + opacityWaveB * 0.3 + opacityWaveC * 0.2 + 1) / 2;
          const glowOpacity = 0.08 + opacityMix * 0.24;
          const lineOpacity = 0.18 + opacityMix * 0.42;
          const coreOpacity = 0.28 + opacityMix * 0.56;

          ctx.save();
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.globalCompositeOperation = "lighter";
          // Shadow-free glow: an extra wide soft stroke replaces the previous
          // shadowBlur halos (a gaussian blur per stroke) at a fraction of the cost.
          drawSpline(ctx, animatedXY, strand.pointCount, rgba(rgb, glowOpacity * 0.34), strand.thickness * 8.6);
          drawSpline(ctx, animatedXY, strand.pointCount, rgba(rgb, glowOpacity * 0.7), strand.thickness * 4.8);
          drawSpline(ctx, animatedXY, strand.pointCount, rgba(nextRgb, glowOpacity), strand.thickness * 2.4);
          drawSpline(ctx, animatedXY, strand.pointCount, rgba(rgb, lineOpacity), strand.thickness);
          drawSpline(ctx, animatedXY, strand.pointCount, rgba(palette.soft, coreOpacity * 0.42), strand.thickness * 0.72);
          ctx.restore();
        }

        ctx.save();
        const vignette = ctx.createRadialGradient(
          logicalWidth * 0.5,
          logicalHeight * 0.5,
          Math.max(40, Math.min(logicalWidth, logicalHeight) * 0.18),
          logicalWidth * 0.5,
          logicalHeight * 0.5,
          Math.max(logicalWidth, logicalHeight) * 0.88,
        );
        vignette.addColorStop(0, rgba(palette.highlight, 0));
        vignette.addColorStop(1, rgba(palette.deep, 0.36));
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, logicalWidth, logicalHeight);
        ctx.restore();
      },
    });

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener("resize", resize);
    resize();

    return () => {
      stopLoop();
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
    }, [palette, wavePalette]);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(${palette.primary},0.18), rgba(${palette.secondary},0.12) 44%, rgba(${palette.deep},1))`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(${palette.soft},0.08), rgba(${palette.highlight},0.05) 42%, rgba(${palette.deep},0.18))`,
          opacity: 0.14,
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none select-none overflow-hidden" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(${palette.highlight},0.04), rgba(${palette.deep},0) 72%)`,
        }}
      />
    </div>
  );
}
