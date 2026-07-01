"use client";

import * as React from "react";

import { createAnimationBuffers, startAnimationLoop } from "@/lib/splash/animation";
import { createSplashPalette } from "@/lib/splash/color";
import { buildCubeMoireBands, type CubeMoireBand } from "@/lib/splash/cube-moire-texture";
import { rgba } from "@/lib/splash/math";

const TARGET_FPS = 30;
const FRAME_INTERVAL_MS = 1000 / TARGET_FPS;



function sampleCubeField(bands: CubeMoireBand[], x: number, y: number, timeSeconds: number) {
  let value = 0;
  for (let i = 0; i < bands.length; i += 1) {
    const band = bands[i];
    const driftX =
      Math.cos(timeSeconds * 0.16 * band.drift + band.phase) * band.radius * 0.22 +
      Math.sin(timeSeconds * 0.07 + band.phase * 0.41) * band.radius * 0.07;
    const driftY =
      Math.sin(timeSeconds * 0.12 * band.drift + band.phase * 0.73) * band.radius * 0.18 +
      Math.cos(timeSeconds * 0.09 + band.phase * 0.57) * band.radius * 0.06;
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
    const radial = Math.hypot(local, cross);
    const warp = Math.sin((x + y) * 0.0032 + timeSeconds * 0.18 + band.phase) * 0.15;
    const warp2 = Math.cos((x - y) * 0.0026 - timeSeconds * 0.14 - band.phase * 0.7) * 0.12;
    const w1 = Math.sin(local + warp + timeSeconds * 0.72 + band.phase) * Math.cos(cross - warp2 - timeSeconds * 0.41 - band.phase * 0.33);
    const w2 =
      Math.sin((local * 0.78 + cross * 0.22) - timeSeconds * 0.28 + band.phase * 0.5) *
      Math.cos((cross * 0.84 - local * 0.16) + timeSeconds * 0.53 - band.phase * 0.2);
    const moire = Math.sin(w1 * Math.PI + w2 * Math.PI);
    const core = 0.5 + 0.5 * moire;
    const ripple = 0.5 + 0.5 * Math.sin(radial * 8.2 + timeSeconds * 0.55 + band.phase);
    const gate = Math.exp(-(radial * radial) * 0.68);
    value += (core * 0.82 + ripple * 0.18) * gate * band.boost;
  }

  const sweep =
    0.12 * Math.sin((x + y) * 0.0038 + timeSeconds * 0.32) +
    0.08 * Math.cos((x - y) * 0.0029 - timeSeconds * 0.24) +
    0.04 * Math.sin(x * 0.0018 + y * 0.0023 + timeSeconds * 0.18);
  return value + sweep;
}


function makeBands(width: number, height: number) {
  return buildCubeMoireBands(width, height);
}

export function LagoonMirrorSplash({ color = "#5dd6ff" }: { color?: string }) {
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
    let bands = makeBands(1, 1);

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
      bands = makeBands(logicalWidth, logicalHeight);
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
function paintScene(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, palette: ReturnType<typeof createSplashPalette>, bands: CubeMoireBand[]) {
  ctx.clearRect(0, 0, width, height);
  const horizon = height * 0.52;
  const sky = ctx.createLinearGradient(0, 0, 0, horizon);
  sky.addColorStop(0, rgba(palette.highlight, 0.16));
  sky.addColorStop(0.6, rgba(palette.soft, 0.06));
  sky.addColorStop(1, rgba(palette.primary, 0.02));
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, horizon);

  const water = ctx.createLinearGradient(0, horizon, 0, height);
  water.addColorStop(0, rgba(palette.primary, 0.18));
  water.addColorStop(0.42, rgba(palette.secondary, 0.08));
  water.addColorStop(1, rgba(palette.deep, 1));
  ctx.fillStyle = water;
  ctx.fillRect(0, horizon, width, height - horizon);

  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 7; i += 1) {
    const t = i / 6;
    const y = horizon + t * (height - horizon) * 0.92;
    const field = sampleCubeField(bands, width * 0.5, y, time);
    const amp = 4 + field * 10;
    ctx.strokeStyle = rgba(i % 2 === 0 ? palette.highlight : palette.soft, 0.04 + field * 0.06);
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= width; x += Math.max(8, width / 72)) {
      const nx = x / Math.max(1, width);
      const ripple = Math.sin(nx * Math.PI * 2 * 4.5 + time * 0.35 + i * 0.7) * amp;
      const shimmer = Math.sin(nx * Math.PI * 2 * 13 - time * 0.16 + i) * (1.8 + field * 1.6);
      const yy = y + ripple + shimmer;
      if (x === 0) ctx.moveTo(x, yy);
      else ctx.lineTo(x, yy);
    }
    ctx.stroke();
  }

  const mirror = ctx.createRadialGradient(width * 0.5, horizon, 0, width * 0.5, horizon, Math.max(width, height));
  mirror.addColorStop(0, rgba(palette.highlight, 0.08));
  mirror.addColorStop(0.5, rgba(palette.soft, 0.04));
  mirror.addColorStop(1, rgba(palette.deep, 0.24));
  ctx.fillStyle = mirror;
  ctx.fillRect(0, horizon, width, height - horizon);
  ctx.globalCompositeOperation = "source-over";
}
