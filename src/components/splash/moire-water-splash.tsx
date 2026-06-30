"use client";

import * as React from "react";

import { createAnimationBuffers, startAnimationLoop } from "@/lib/splash/animation";
import { createSplashPalette } from "@/lib/splash/color";
import { rgba } from "@/lib/splash/math";

const TARGET_FPS = 30;
const FRAME_INTERVAL_MS = 1000 / TARGET_FPS;

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = clamp01((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function sampleWaterField(x: number, y: number, width: number, height: number, time: number) {
  const nx = x / Math.max(1, width);
  const ny = y / Math.max(1, height);
  const depth = ny;
  const perspective = 1 - clamp01(depth * 0.92);
  const stretch = 0.78 + depth * 1.7;

  const waveA = Math.sin((nx * 13.8 + ny * 4.1) * stretch + time * 0.94);
  const waveB = Math.sin((nx * 14.25 - ny * 3.85) * stretch - time * 0.91 + 1.4);
  const waveC = Math.sin((nx * 7.3 + ny * 11.6) + time * 0.43);
  const waveD = Math.cos((nx * 9.4 - ny * 8.8) - time * 0.36 + waveC * 0.7);

  const interference = waveA * waveB;
  const moire = Math.sin((waveA + waveB) * 1.8 + waveC * 1.15 + waveD * 0.65);
  const crest = 0.5 + 0.5 * interference;
  const shimmer = 0.5 + 0.5 * moire;
  const horizon = 1 - clamp01(Math.abs(depth - 0.46) / 0.56);
  const falloff = 0.16 + depth * 0.56;

  return clamp01(crest * 0.52 + shimmer * 0.28 + horizon * 0.14 + perspective * 0.1 - falloff * 0.08);
}

function toneForIntensity(
  palette: {
    deep: string;
    shadow: string;
    surface: string;
    primary: string;
    secondary: string;
    tertiary: string;
    accent: string;
    highlight: string;
    soft: string;
  },
  value: number,
) {
  if (value < 0.14) return palette.deep;
  if (value < 0.26) return palette.shadow;
  if (value < 0.4) return palette.surface;
  if (value < 0.54) return palette.primary;
  if (value < 0.68) return palette.secondary;
  if (value < 0.82) return palette.tertiary;
  if (value < 0.92) return palette.accent;
  return palette.highlight;
}

export function MoireWaterSplash({ color = "#5dd6ff" }: { color?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const palette = React.useMemo(() => createSplashPalette(color), [color]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const buffers = createAnimationBuffers(4096);
    let logicalWidth = 0;
    let logicalHeight = 0;
    let logicalDpr = 1;

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
    };

    const stopLoop = startAnimationLoop({
      frameBudgetMs: FRAME_INTERVAL_MS,
      onFrame(nowMs) {
        if (!logicalWidth || !logicalHeight) return;
        buffers.beginFrame();

        const time = nowMs * 0.001 * 0.28;
        const step = Math.max(10, Math.min(logicalWidth, logicalHeight) * 0.024);
        const cols = Math.max(2, Math.ceil(logicalWidth / step) + 1);
        const rows = Math.max(2, Math.ceil(logicalHeight / step) + 1);
        const delta = Math.max(3, step * 0.38);

        for (let row = 0; row < rows - 1; row += 1) {
          const y = row * step;
          const rowHeight = Math.min(step + 1, logicalHeight - y);

          for (let col = 0; col < cols - 1; col += 1) {
            const x = col * step;
            const cellWidth = Math.min(step + 1, logicalWidth - x);
            const sampleX = x + cellWidth * 0.5;
            const sampleY = y + rowHeight * 0.5;

            const value = sampleWaterField(sampleX, sampleY, logicalWidth, logicalHeight, time);
            const slopeX =
              sampleWaterField(sampleX + delta, sampleY, logicalWidth, logicalHeight, time) -
              sampleWaterField(sampleX - delta, sampleY, logicalWidth, logicalHeight, time);
            const slopeY =
              sampleWaterField(sampleX, sampleY + delta, logicalWidth, logicalHeight, time) -
              sampleWaterField(sampleX, sampleY - delta, logicalWidth, logicalHeight, time);

            const crest = smoothstep(0.48, 0.82, value);
            const gloss = smoothstep(0.18, 0.02, Math.abs(slopeX) * 0.68 + Math.abs(slopeY) * 0.32);
            const bandPulse = 0.5 + 0.5 * Math.sin((sampleY / logicalHeight) * 9.5 - time * 0.82);
            const light = clamp01(
              value * 0.42 +
                crest * 0.3 +
                gloss * (0.24 + bandPulse * 0.16) +
                (1 - sampleY / logicalHeight) * 0.08,
            );
            const poster = Math.round(light * 6) / 6;
            const tone = toneForIntensity(palette, poster);

            ctx.fillStyle = rgba(tone, 0.07 + light * 0.11);
            ctx.fillRect(x, y, cellWidth, rowHeight);
          }
        }
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
  }, [palette]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full select-none pointer-events-none overflow-hidden" />;
}
