"use client";

import * as React from "react";

import { createAnimationBuffers, startAnimationLoop } from "@/lib/splash/animation";
import { createSplashPalette } from "@/lib/splash/color";
import { buildCubeMoireBands, type CubeMoireBand } from "@/lib/splash/cube-moire-texture";
import { rgba } from "@/lib/splash/math";

const TARGET_FPS = 30;
const FRAME_INTERVAL_MS = 1000 / TARGET_FPS;

function sampleLappetField(bands: CubeMoireBand[], x: number, y: number, timeSeconds: number) {
  let value = 0;
  for (let i = 0; i < bands.length; i += 1) {
    const band = bands[i];
    const driftX = Math.sin(timeSeconds * 0.1 + band.phase * 0.8) * band.radius * 0.16;
    const driftY = Math.cos(timeSeconds * 0.08 + band.phase * 0.55) * band.radius * 0.12;
    const cx = band.baseX + driftX;
    const cy = band.baseY + driftY;

    const dx = x - cx;
    const dy = y - cy;
    const cosS = Math.cos(band.skew * 0.82);
    const sinS = Math.sin(band.skew * 0.82);
    const rx = dx * cosS - dy * sinS;
    const ry = dx * sinS + dy * cosS;

    const local = rx / band.radius;
    const cross = ry / Math.max(1, band.radius * band.stretch);
    const fieldRadius = Math.hypot(local * 0.72, cross * 1.24);
    const field = Math.exp(-(fieldRadius * fieldRadius) * 0.82);
    const fold = 0.5 + 0.5 * Math.sin(local * 4.8 + timeSeconds * 0.28 + band.phase * 1.1);
    const flare = 0.5 + 0.5 * Math.cos(cross * 7.2 - timeSeconds * 0.16 - band.phase * 0.6);
    const vein = Math.sin((local + cross) * Math.PI * 1.3 + timeSeconds * 0.14 + band.phase);
    value += (fold * 0.42 + flare * 0.34 + Math.abs(vein) * 0.24) * field * band.boost;
  }

  const sweep =
    0.06 * Math.sin(x * 0.0021 + timeSeconds * 0.2) +
    0.05 * Math.cos(y * 0.002 + timeSeconds * 0.15) +
    0.04 * Math.sin((x - y) * 0.0016 + timeSeconds * 0.1);
  return value + sweep;
}

function buildTendrilPoints(
  originX: number,
  originY: number,
  length: number,
  sway: number,
  frill: number,
  seed: number,
  timeSeconds: number,
) {
  const points: Array<[number, number]> = [];
  const segments = 32;
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const taper = 1 - t * 0.88;
    const reach = length * t;
    const curlA = Math.sin(t * Math.PI * 2.3 + timeSeconds * 0.9 + seed * 1.4) * sway * taper;
    const curlB = Math.cos(t * Math.PI * 5.4 + timeSeconds * 0.7 + seed * 2.2) * frill * taper;
    const curlC = Math.sin(t * Math.PI * 9.1 + timeSeconds * 0.35 + seed * 0.9) * frill * 0.34 * taper;
    const drift = Math.cos(t * Math.PI * 1.1 + timeSeconds * 0.4 + seed) * sway * 0.18;
    points.push([originX + curlA + curlB * 0.5 + curlC * 0.35 + drift, originY + reach]);
  }
  return points;
}

export function LappetsSplash({ color = "#5dd6ff" }: { color?: string }) {
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

  const centerX = width * 0.5 + Math.sin(time * 0.18) * width * 0.02;
  const centerY = height * 0.29 + Math.cos(time * 0.12) * height * 0.012;
  const bellRadiusX = Math.min(width, height) * 0.19;
  const bellRadiusY = Math.min(width, height) * 0.15;

  ctx.globalCompositeOperation = "lighter";

  for (let i = 0; i < 11; i += 1) {
    const spread = i / 10 - 0.5;
    const originX = centerX + spread * bellRadiusX * 1.1;
    const originY = centerY + bellRadiusY * (0.5 + Math.abs(spread) * 0.05);
    const field = sampleLappetField(bands, originX, originY, time);
    const length = height * (0.38 + field * 0.22 + Math.abs(spread) * 0.06);
    const sway = bellRadiusX * (0.08 + field * 0.12 + Math.abs(spread) * 0.04);
    const frill = bellRadiusX * (0.04 + field * 0.08);
    const pts = buildTendrilPoints(originX, originY, length, sway, frill, i * 0.37, time);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let j = 1; j < pts.length; j += 1) {
      ctx.lineTo(pts[j][0], pts[j][1]);
    }
    ctx.strokeStyle = rgba(i % 3 === 0 ? palette.secondary : palette.primary, 0.08 + field * 0.14);
    ctx.lineWidth = 1.05 + field * 1.05;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let j = 1; j < pts.length; j += 1) {
      const [px, py] = pts[j];
      const offsetX = Math.sin((j / pts.length) * Math.PI * 6 + time * 0.9 + i * 0.4) * frill * 0.16;
      const offsetY = Math.cos((j / pts.length) * Math.PI * 4 + time * 0.7) * frill * 0.08;
      ctx.lineTo(px + offsetX, py + offsetY);
    }
    ctx.strokeStyle = rgba(palette.highlight, 0.03 + field * 0.07);
    ctx.lineWidth = 0.62 + field * 0.62;
    ctx.stroke();
  }

  ctx.globalCompositeOperation = "source-over";
}