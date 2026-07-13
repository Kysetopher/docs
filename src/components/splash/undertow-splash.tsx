"use client";

import * as React from "react";

import { createAnimationBuffers, startAnimationLoop } from "@/lib/splash/animation";
import { createSplashPalette } from "@/lib/splash/color";
import { buildCubeMoireBands, type CubeMoireBand } from "@/lib/splash/cube-moire-texture";
import { rgba } from "@/lib/splash/math";

const TARGET_FPS = 30;
const FRAME_INTERVAL_MS = 1000 / TARGET_FPS;

function sampleUndertowField(bands: CubeMoireBand[], x: number, y: number, timeSeconds: number) {
  let value = 0;
  for (let i = 0; i < bands.length; i += 1) {
    const band = bands[i];
    const driftX = Math.cos(timeSeconds * 0.11 + band.phase) * band.radius * 0.24;
    const driftY = Math.sin(timeSeconds * 0.09 + band.phase * 0.77) * band.radius * 0.18;
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
    const radial = Math.hypot(local, cross);
    const funnel = Math.exp(-(radial * radial) * 0.88);
    const rotation = Math.atan2(cross, local + 1e-5);
    const swirl = Math.sin(rotation * 3.2 + timeSeconds * 0.34 + band.phase);
    const pull = Math.cos(radial * 7.2 - timeSeconds * 0.28 + band.phase * 0.55);
    const shears = 0.5 + 0.5 * Math.sin((local - cross) * Math.PI * 1.6 + timeSeconds * 0.14 + band.phase);
    value += (shears * 0.45 + Math.abs(swirl * pull) * 0.55) * funnel * band.boost;
  }

  const sweep =
    0.08 * Math.sin(x * 0.0022 + timeSeconds * 0.24) +
    0.08 * Math.cos(y * 0.0025 - timeSeconds * 0.16) +
    0.05 * Math.sin((x - y) * 0.0016 + timeSeconds * 0.08);
  return value + sweep;
}

export function UndertowSplash({ color = "#5dd6ff" }: { color?: string }) {
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
      visibilityTarget: canvas,
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
  const base = ctx.createLinearGradient(0, 0, width, height);
  base.addColorStop(0, rgba(palette.deep, 1));
  base.addColorStop(0.48, rgba(palette.shadow, 1));
  base.addColorStop(1, rgba(palette.primary, 0.24));
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, width, height);

  const centerX = width * 0.54;
  const centerY = height * 0.58;
  ctx.globalCompositeOperation = "lighter";

  // The field is sampled at the fixed center — identical for every ring, so
  // compute it once instead of 10x (each sample walks all 40 bands).
  const field = sampleUndertowField(bands, centerX, centerY, time);

  for (let ring = 0; ring < 10; ring += 1) {
    const t = ring / 9;
    const radius = Math.min(width, height) * (0.12 + t * 0.5);
    const turn = 2.2 + t * 2.6;
    const alpha = 0.05 + field * 0.08;
    ctx.strokeStyle = rgba(ring % 2 === 0 ? palette.highlight : palette.secondary, alpha);
    ctx.lineWidth = 0.9 + t * 1.2;
    ctx.beginPath();
    for (let step = 0; step <= 120; step += 1) {
      const p = step / 120;
      const angle = p * Math.PI * 2 * turn + time * (0.45 + t * 0.24);
      const pull = Math.sin(angle * 1.7 + time * 0.55 + ring) * radius * 0.12;
      const swirl = Math.cos(angle * 0.6 - time * 0.28) * radius * 0.06;
      const r = radius * (0.48 + p * 0.55) + pull + swirl;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r * 0.84;
      if (step === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  const sinkGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height) * 0.88);
  sinkGlow.addColorStop(0, rgba(palette.highlight, 0.08));
  sinkGlow.addColorStop(0.42, rgba(palette.soft, 0.04));
  sinkGlow.addColorStop(1, rgba(palette.deep, 0.32));
  ctx.fillStyle = sinkGlow;
  ctx.fillRect(0, 0, width, height);
  ctx.globalCompositeOperation = "source-over";
}