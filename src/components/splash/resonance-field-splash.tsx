"use client";

import * as React from "react";
import { createAnimationBuffers, startAnimationLoop } from "@/lib/splash/animation";
import { createSplashPalette } from "@/lib/splash/color";
import { drawSpline } from "@/lib/splash/geometry";
import { rgba } from "@/lib/splash/math";

const TARGET_FPS = 30;
const FRAME_INTERVAL_MS = 1000 / TARGET_FPS;

type Strand = {
  baseX: Float32Array;
  baseY: number;
  animatedXY: Float32Array;
  pointCount: number;
  phase: number;
  thickness: number;
  colorIndex: number;
};

function buildStrands(width: number, height: number) {
  const strands: Strand[] = [];
  const count = 10;
  const points = 36;
  const gap = height / (count + 1);

  for (let s = 0; s < count; s += 1) {
    const baseY = gap * (s + 1);
    const baseX = new Float32Array(points);
    for (let i = 0; i < points; i += 1) {
      const t = i / (points - 1);
      baseX[i] = t * width;
    }
    strands.push({
      baseX,
      baseY,
      animatedXY: new Float32Array(points * 2),
      pointCount: points,
      phase: s * 0.68,
      thickness: 0.9 + (s % 4) * 0.12,
      colorIndex: s % 4,
    });
  }

  return strands;
}

export function ResonanceFieldSplash({ color = "#38bdf8" }: { color?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const palette = React.useMemo(() => createSplashPalette(color), [color]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const buffers = createAnimationBuffers(8192);
    let logicalWidth = 0;
    let logicalHeight = 0;
    let logicalDpr = 1;
    let strands: Strand[] = [];

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
      strands = buildStrands(logicalWidth, logicalHeight);
    };

    const stopLoop = startAnimationLoop({
      frameBudgetMs: FRAME_INTERVAL_MS,
      onFrame(nowMs) {
        if (!strands.length) return;
        const t = nowMs * 0.001 * 0.22;
        buffers.beginFrame();

        ctx.clearRect(0, 0, logicalWidth, logicalHeight);
        ctx.fillStyle = rgba(palette.deep, 1);
        ctx.fillRect(0, 0, logicalWidth, logicalHeight);

        const anchorX = logicalWidth * (0.5 + Math.sin(t * 0.12) * 0.12);
        const anchorY = logicalHeight * (0.5 + Math.cos(t * 0.08) * 0.08);

        for (let s = 0; s < strands.length; s += 1) {
          const strand = strands[s];
          const rgb = strand.colorIndex % 2 === 0 ? palette.primary : palette.secondary;
          const accentRgb = strand.colorIndex % 3 === 0 ? palette.tertiary : palette.soft;
          const animatedXY = strand.animatedXY;

          for (let i = 0; i < strand.pointCount; i += 1) {
            const x = strand.baseX[i];
            const dx = x - anchorX;
            const dy = strand.baseY - anchorY;
            const radial = Math.hypot(dx, dy);
            const carrierA = Math.sin((x / 720) * Math.PI * 2 - t * (0.12 + strand.phase * 0.02) + strand.phase * 0.18);
            const carrierB = Math.sin((x / 1120) * Math.PI * 2 + t * 0.08 - strand.phase * 0.12);
            const carrierC = Math.sin((radial / 860) * Math.PI * 2 - t * 0.14 + strand.phase * 0.22);
            const carrierOffset = (carrierA * 1.25 + carrierB * 0.95 + carrierC * 0.65) * Math.min(logicalWidth, logicalHeight) * 0.022;
            const localA = Math.sin((x / (logicalWidth / 4.5)) * Math.PI * 2 - t * 0.52 + strand.phase + s * 0.24);
            const localB = Math.sin((x / (logicalWidth / 7.3)) * Math.PI * 2 + t * 0.31 - strand.phase * 0.9 + s * 0.16);
            const localOffset = (localA * 0.72 + localB * 0.38) * Math.min(logicalWidth, logicalHeight) * 0.018;
            const detail = Math.sin(x * 0.0042 - t * 0.46 + s * 0.33) * Math.min(logicalWidth, logicalHeight) * 0.008;
            const offset = i * 2;
            animatedXY[offset] = x;
            animatedXY[offset + 1] = strand.baseY + carrierOffset + localOffset + detail;
          }

          const opacityWaveA = Math.sin(t * 0.22 + strand.phase + s * 0.15);
          const opacityWaveB = Math.sin((strand.baseY / Math.max(1, logicalHeight)) * Math.PI * 2 * 1.4 - t * 0.1);
          const opacityMix = (opacityWaveA * 0.5 + opacityWaveB * 0.3 + 1) / 2;
          const glowOpacity = 0.06 + opacityMix * 0.18;
          const lineOpacity = 0.16 + opacityMix * 0.34;
          const coreOpacity = 0.24 + opacityMix * 0.48;

          ctx.save();
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.globalCompositeOperation = "lighter";
          ctx.shadowColor = rgba(rgb, glowOpacity * 1.1);
          ctx.shadowBlur = 18;
          drawSpline(ctx, animatedXY, strand.pointCount, rgba(rgb, glowOpacity * 0.75), strand.thickness * 4.2);
          ctx.shadowColor = rgba(accentRgb, glowOpacity * 0.85);
          ctx.shadowBlur = 10;
          drawSpline(ctx, animatedXY, strand.pointCount, rgba(accentRgb, glowOpacity), strand.thickness * 2.2);
          ctx.shadowColor = rgba(rgb, lineOpacity * 0.7);
          ctx.shadowBlur = 4;
          drawSpline(ctx, animatedXY, strand.pointCount, rgba(rgb, lineOpacity), strand.thickness);
          drawSpline(ctx, animatedXY, strand.pointCount, rgba(palette.soft, coreOpacity * 0.38), strand.thickness * 0.72);
          ctx.restore();
        }

        const haze = ctx.createRadialGradient(
          logicalWidth * 0.5,
          logicalHeight * 0.5,
          Math.max(40, Math.min(logicalWidth, logicalHeight) * 0.15),
          logicalWidth * 0.5,
          logicalHeight * 0.5,
          Math.max(logicalWidth, logicalHeight) * 0.88,
        );
        haze.addColorStop(0, rgba(palette.highlight, 0.02));
        haze.addColorStop(1, rgba(palette.deep, 0.4));
        ctx.fillStyle = haze;
        ctx.fillRect(0, 0, logicalWidth, logicalHeight);
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
    }, [palette]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full select-none pointer-events-none overflow-hidden" />;
}
