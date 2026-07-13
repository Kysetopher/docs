"use client";

import * as React from "react";

import { createAnimationBuffers, startAnimationLoop } from "@/lib/splash/animation";
import { createSplashPalette } from "@/lib/splash/color";
import { buildCubeMoireBands, type CubeMoireBand } from "@/lib/splash/cube-moire-texture";
import { rgba } from "@/lib/splash/math";

const TARGET_FPS = 30;
const FRAME_INTERVAL_MS = 1000 / TARGET_FPS;

function sampleTideglassField(bands: CubeMoireBand[], x: number, y: number, timeSeconds: number) {
  let value = 0;
  for (let i = 0; i < bands.length; i += 1) {
    const band = bands[i];
    const driftX = Math.sin(timeSeconds * 0.09 + band.phase) * band.radius * 0.18 + Math.cos(timeSeconds * 0.04 + band.phase * 0.61) * band.radius * 0.08;
    const driftY = Math.cos(timeSeconds * 0.08 + band.phase * 0.8) * band.radius * 0.16 + Math.sin(timeSeconds * 0.05 + band.phase * 0.33) * band.radius * 0.06;
    const cx = band.baseX + driftX;
    const cy = band.baseY + driftY;

    const dx = x - cx;
    const dy = y - cy;
    const cosS = Math.cos(band.skew * 0.8);
    const sinS = Math.sin(band.skew * 0.8);
    const rx = dx * cosS - dy * sinS;
    const ry = dx * sinS + dy * cosS;

    const local = rx / band.radius;
    const cross = ry / Math.max(1, band.radius * band.stretch);
    const glassRadius = Math.hypot(local * 0.92, cross * 1.45);
    const glass = Math.exp(-(glassRadius * glassRadius) * 0.65);
    const prism = 0.5 + 0.5 * Math.sin(local * 4.4 + timeSeconds * 0.32 + band.phase * 1.2);
    const seam = 0.5 + 0.5 * Math.cos(cross * 6.2 - timeSeconds * 0.18 - band.phase * 0.75);
    const bend = Math.sin((local + cross) * Math.PI * 1.1 + timeSeconds * 0.16 + band.phase);
    value += (prism * 0.52 + seam * 0.28 + Math.abs(bend) * 0.2) * glass * band.boost;
  }

  const sweep =
    0.1 * Math.sin(x * 0.0024 + timeSeconds * 0.22) +
    0.06 * Math.cos(y * 0.002 + timeSeconds * 0.17) +
    0.04 * Math.sin((x - y) * 0.0018 + timeSeconds * 0.11);
  return value + sweep;
}

export function TideglassSplash({ color = "#5dd6ff" }: { color?: string }) {
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
  const base = ctx.createLinearGradient(0, 0, 0, height);
  base.addColorStop(0, rgba(palette.primary, 0.32));
  base.addColorStop(0.45, rgba(palette.deep, 1));
  base.addColorStop(1, rgba(palette.shadow, 1));
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, width, height);

  const columns = Math.max(16, Math.round(width / 32));
  const step = width / columns;
  ctx.globalCompositeOperation = "lighter";

  for (let col = 0; col < columns; col += 1) {
    const x = col * step;
    const field = sampleTideglassField(bands, x, height * 0.5, time);
    const topW = step * (0.22 + field * 0.22);
    const midW = step * (0.46 + field * 0.32);
    const bottomW = step * (0.58 + field * 0.44);
    const bend = Math.sin(time * 0.18 + col * 0.5) * step * 0.16;
    const hue = col % 4 === 0 ? palette.highlight : col % 3 === 0 ? palette.secondary : palette.primary;
    const alpha = 0.03 + field * 0.13;

    ctx.beginPath();
    ctx.moveTo(x - topW * 0.5 + bend * 0.1, 0);
    ctx.lineTo(x + topW * 0.5 + bend * 0.15, 0);
    ctx.lineTo(x + midW * 0.38 + bend * 0.35, height * 0.5);
    ctx.lineTo(x + bottomW * 0.46 + bend * 0.18, height);
    ctx.lineTo(x - bottomW * 0.54 + bend * 0.08, height);
    ctx.lineTo(x - midW * 0.42 + bend * 0.28, height * 0.5);
    ctx.closePath();
    ctx.fillStyle = rgba(hue, alpha);
    ctx.fill();

    ctx.strokeStyle = rgba(palette.soft, 0.05 + field * 0.06);
    ctx.lineWidth = 0.8 + field * 0.8;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + bend * 0.28, height);
    ctx.strokeStyle = rgba(palette.highlight, 0.04 + field * 0.07);
    ctx.lineWidth = 0.65 + field * 0.6;
    ctx.stroke();
  }

  const sheen = ctx.createRadialGradient(width * 0.5, height * 0.32, 0, width * 0.5, height * 0.32, Math.max(width, height) * 0.94);
  sheen.addColorStop(0, rgba(palette.highlight, 0.11));
  sheen.addColorStop(0.55, rgba(palette.soft, 0.03));
  sheen.addColorStop(1, rgba(palette.deep, 0.28));
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, width, height);
}