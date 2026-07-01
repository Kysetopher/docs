"use client";

import * as React from "react";

import { createAnimationBuffers, startAnimationLoop } from "@/lib/splash/animation";
import { createSplashPalette } from "@/lib/splash/color";
import { buildCubeMoireBands, type CubeMoireBand } from "@/lib/splash/cube-moire-texture";
import { rgba } from "@/lib/splash/math";

const TARGET_FPS = 30;
const FRAME_INTERVAL_MS = 1000 / TARGET_FPS;



function sampleReefField(bands: CubeMoireBand[], x: number, y: number, timeSeconds: number) {
  let value = 0;
  for (let i = 0; i < bands.length; i += 1) {
    const band = bands[i];
    const driftX = Math.sin(timeSeconds * 0.08 + band.phase * 0.9) * band.radius * 0.16;
    const driftY = Math.cos(timeSeconds * 0.07 + band.phase * 0.63) * band.radius * 0.14;
    const cx = band.baseX + driftX;
    const cy = band.baseY + driftY;

    const dx = x - cx;
    const dy = y - cy;
    const cosS = Math.cos(band.skew * 0.9);
    const sinS = Math.sin(band.skew * 0.9);
    const rx = dx * cosS - dy * sinS;
    const ry = dx * sinS + dy * cosS;

    const local = rx / band.radius;
    const cross = ry / Math.max(1, band.radius * band.stretch);
    const moundRadius = Math.hypot(local * 0.82, cross * 1.1);
    const mound = Math.exp(-(moundRadius * moundRadius) * 0.9);
    const shelf = 0.5 + 0.5 * Math.sin(local * 4.7 + timeSeconds * 0.24 + band.phase * 0.7);
    const coral = 0.5 + 0.5 * Math.cos(cross * 6.1 - timeSeconds * 0.17 + band.phase);
    const ridge = Math.sin((local - cross) * Math.PI * 1.5 + timeSeconds * 0.12 + band.phase);
    value += (mound * 0.56 + shelf * 0.22 + coral * 0.16 + Math.abs(ridge) * 0.18) * band.boost;
  }

  const sweep =
    0.08 * Math.sin((x + y) * 0.0025 + timeSeconds * 0.18) +
    0.06 * Math.cos((x - y) * 0.0021 - timeSeconds * 0.15) +
    0.04 * Math.sin(x * 0.0015 + y * 0.0018 + timeSeconds * 0.1);
  return value + sweep;
}

function fillBackground(ctx: CanvasRenderingContext2D, width: number, height: number, palette: ReturnType<typeof createSplashPalette>) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, rgba(palette.primary, 0.34));
  gradient.addColorStop(0.42, rgba(palette.deep, 1));
  gradient.addColorStop(1, rgba(palette.shadow, 1));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

export function ReefReliefSplash({ color = "#5dd6ff" }: { color?: string }) {
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
        paintScene(ctx, logicalWidth, logicalHeight, nowMs * 0.001, palette, bands);
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

function paintScene(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  palette: ReturnType<typeof createSplashPalette>,
  bands: CubeMoireBand[],
) {
  ctx.clearRect(0, 0, width, height);
  fillBackground(ctx, width, height, palette);

  const horizon = height * 0.57;
  const reefCount = 8;
  ctx.globalCompositeOperation = "lighter";

  for (let i = 0; i < reefCount; i += 1) {
    const t = i / (reefCount - 1);
    const centerX = width * (0.13 + t * 0.76);
    const centerY = horizon + Math.sin(time * 0.22 + i * 0.6) * height * 0.025;
    const field = sampleReefField(bands, centerX, centerY, time);
    const radius = Math.min(width, height) * (0.08 + field * 0.07 + t * 0.012);
    const peak = Math.sin(time * 0.31 + i * 0.52) * 0.18;
    const mound = ctx.createRadialGradient(centerX, centerY - radius * 0.2, 0, centerX, centerY, radius * 1.9);
    mound.addColorStop(0, rgba(i % 2 === 0 ? palette.highlight : palette.soft, 0.18 + field * 0.08));
    mound.addColorStop(0.38, rgba(palette.primary, 0.08 + field * 0.06));
    mound.addColorStop(1, rgba(palette.deep, 0));
    ctx.fillStyle = mound;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radius * (1.5 + field * 0.3), radius * (0.8 + field * 0.28), peak, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < 7; i += 1) {
    const y = horizon - 26 + i * 30;
    const field = sampleReefField(bands, width * 0.5, y, time);
    const tint = i % 3 === 0 ? palette.primary : i % 3 === 1 ? palette.secondary : palette.highlight;
    ctx.strokeStyle = rgba(tint, 0.05 + field * 0.08);
    ctx.lineWidth = 0.9 + field * 1.4;
    ctx.beginPath();
    for (let x = -40; x <= width + 40; x += Math.max(8, width / 78)) {
      const nx = x / Math.max(1, width);
      const ridge = Math.sin(nx * Math.PI * 2 * 3.1 + time * 0.42 + i * 0.4) * (3 + field * 9);
      const coral = Math.cos(nx * Math.PI * 2 * 12 - time * 0.15) * (1.2 + field * 1.8);
      const yy = y + ridge + coral;
      if (x <= -40) ctx.moveTo(x, yy);
      else ctx.lineTo(x, yy);
    }
    ctx.stroke();
  }

  const reefGlow = ctx.createRadialGradient(width * 0.5, horizon, 0, width * 0.5, horizon, Math.max(width, height) * 0.9);
  reefGlow.addColorStop(0, rgba(palette.highlight, 0.08));
  reefGlow.addColorStop(0.5, rgba(palette.soft, 0.03));
  reefGlow.addColorStop(1, rgba(palette.deep, 0.24));
  ctx.fillStyle = reefGlow;
  ctx.fillRect(0, 0, width, height);
  ctx.globalCompositeOperation = "source-over";
}
