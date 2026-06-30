"use client";

import * as React from "react";

import { createAnimationBuffers, startAnimationLoop } from "@/lib/splash/animation";
import { createSplashPalette } from "@/lib/splash/color";
import { buildCubeMoireBands, type CubeMoireBand } from "@/lib/splash/cube-moire-texture";
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

function sampleStrataBands(bands: CubeMoireBand[], x: number, y: number, timeSeconds: number) {
  let value = 0;
  for (let i = 0; i < bands.length; i += 1) {
    const band = bands[i];
    const driftX = Math.sin(timeSeconds * 0.08 + band.phase) * band.radius * 0.14;
    const driftY = Math.cos(timeSeconds * 0.06 + band.phase * 0.83) * band.radius * 0.1;
    const cx = band.baseX + driftX;
    const cy = band.baseY + driftY;

    const dx = x - cx;
    const dy = y - cy;
    const cosS = Math.cos(band.skew);
    const sinS = Math.sin(band.skew);
    const rx = dx * cosS - dy * sinS;
    const ry = dx * sinS + dy * cosS;

    const local = rx / band.radius;
    const cross = ry / Math.max(1, band.radius * band.stretch);
    const shelf = Math.hypot(local * 0.72, cross * 1.18);
    const ridge = Math.sin(local * 3.2 + timeSeconds * 0.22 + band.phase * 0.9);
    const cut = Math.cos(cross * 2.1 - timeSeconds * 0.18 - band.phase * 0.35);
    const terraces = 0.5 + 0.5 * Math.sin((local + cross * 0.5) * Math.PI * 1.8 + timeSeconds * 0.12 + band.phase);
    const banding = 0.5 + 0.5 * Math.cos((local - cross) * Math.PI * 1.25 - timeSeconds * 0.16 + band.phase * 0.6);
    const gate = Math.exp(-(shelf * shelf) * 0.92);
    value += (terraces * 0.54 + banding * 0.34 + Math.abs(ridge * cut) * 0.12) * gate * band.boost;
  }

  const sweep =
    0.09 * Math.sin(x * 0.0021 + timeSeconds * 0.24) +
    0.07 * Math.cos(y * 0.0024 - timeSeconds * 0.19) +
    0.04 * Math.sin((x - y) * 0.0018 + timeSeconds * 0.11);
  return value + sweep;
}

export function StrataSplash({ color = "#5dd6ff" }: { color?: string }) {
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
    let bands = buildCubeMoireBands(1, 1);

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
      bands = buildCubeMoireBands(logicalWidth, logicalHeight);
    };

    const stopLoop = startAnimationLoop({
      frameBudgetMs: FRAME_INTERVAL_MS,
      onFrame(nowMs) {
        if (!logicalWidth || !logicalHeight) return;
        buffers.beginFrame();
        const timeSeconds = nowMs * 0.001 * 0.2;

        ctx.clearRect(0, 0, logicalWidth, logicalHeight);
        ctx.fillStyle = rgba(palette.deep, 1);
        ctx.fillRect(0, 0, logicalWidth, logicalHeight);

        const step = Math.max(6, Math.min(logicalWidth, logicalHeight) / 54);
        const cols = Math.max(2, Math.ceil(logicalWidth / step) + 1);
        const rows = Math.max(2, Math.ceil(logicalHeight / step) + 1);
        const field = buffers.allocScratchF32(cols * rows);

        let min = Number.POSITIVE_INFINITY;
        let max = Number.NEGATIVE_INFINITY;
        for (let row = 0; row < rows; row += 1) {
          const py = row * step;
          for (let col = 0; col < cols; col += 1) {
            const px = col * step;
            const value = sampleStrataBands(bands, px, py, timeSeconds);
            const index = row * cols + col;
            field[index] = value;
            if (value < min) min = value;
            if (value > max) max = value;
          }
        }
        const range = Math.max(1e-5, max - min);
        for (let i = 0; i < cols * rows; i += 1) {
          field[i] = (field[i] - min) / range;
        }

        ctx.globalCompositeOperation = "source-over";
        for (let row = 0; row < rows - 1; row += 1) {
          const y = row * step;
          const strip = field[row * cols + Math.floor(cols * 0.5)];
          const band = Math.floor(strip * 7);
          const tone = band % 3 === 0 ? palette.primary : band % 3 === 1 ? palette.secondary : palette.tertiary;
          const ribbonTop = y - step * (0.15 + strip * 0.45);
          const ribbonBottom = y + step * (0.8 + strip * 0.6);
          const fade = smoothstep(0, 1, strip);

          ctx.fillStyle = rgba(tone, 0.04 + fade * 0.11);
          ctx.fillRect(0, ribbonTop, logicalWidth, ribbonBottom - ribbonTop);
        }

        ctx.globalCompositeOperation = "lighter";
        for (let row = 0; row < rows - 1; row += 1) {
          const y = row * step;
          let pathStarted = false;
          for (let col = 0; col < cols; col += 1) {
            const value = field[row * cols + col];
            const nextValue = field[row * cols + Math.min(cols - 1, col + 1)];
            if (Math.abs(value - nextValue) > 0.08 || Math.abs(value - 0.5) < 0.08) {
              const x = col * step;
              const mx = x + Math.sin((x + y) * 0.006 + timeSeconds * 0.45) * 1.3;
              const my = y + Math.cos((x - y) * 0.005 - timeSeconds * 0.32) * 1.05;
              if (!pathStarted) {
                ctx.beginPath();
                ctx.moveTo(mx, my);
                pathStarted = true;
              } else {
                ctx.lineTo(mx, my);
              }
            }
          }
          if (pathStarted) {
            const tint = row % 2 === 0 ? palette.highlight : palette.soft;
            ctx.strokeStyle = rgba(tint, 0.12);
            ctx.lineWidth = 1 + (row % 5) * 0.12;
            ctx.stroke();
          }
        }

        const seam = ctx.createLinearGradient(0, 0, logicalWidth, logicalHeight);
        seam.addColorStop(0, rgba(palette.highlight, 0.08));
        seam.addColorStop(0.45, rgba(palette.soft, 0.05));
        seam.addColorStop(1, rgba(palette.deep, 0.22));
        ctx.fillStyle = seam;
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