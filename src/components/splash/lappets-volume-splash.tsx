"use client";

import * as React from "react";

import { createAnimationBuffers, startAnimationLoop } from "@/lib/splash/animation";
import { createSplashPalette } from "@/lib/splash/color";
import { buildCubeMoireBands, type CubeMoireBand } from "@/lib/splash/cube-moire-texture";

const TARGET_FPS = 30;
const FRAME_INTERVAL_MS = 1000 / TARGET_FPS;

type Rgb = {
  r: number;
  g: number;
  b: number;
};

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function mixRgb(a: Rgb, b: Rgb, weight: number) {
  const t = clamp01(weight);
  return {
    r: a.r * (1 - t) + b.r * t,
    g: a.g * (1 - t) + b.g * t,
    b: a.b * (1 - t) + b.b * t,
  };
}

function parseRgbTriplet(input: string) {
  const match = input.replace(/\s+/g, "").match(/^rgba?\(([^)]+)\)$/i);
  if (!match) return { r: 56, g: 189, b: 248 } satisfies Rgb;
  const [r, g, b] = match[1].split(",").slice(0, 3).map((part) => Number.parseFloat(part));
  if ([r, g, b].some((value) => Number.isNaN(value))) return { r: 56, g: 189, b: 248 } satisfies Rgb;
  return { r, g, b } satisfies Rgb;
}

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

function buildLappetSpine(
  centerX: number,
  originY: number,
  length: number,
  sway: number,
  frill: number,
  seed: number,
  timeSeconds: number,
) {
  const points: Array<[number, number]> = [];
  const segments = 40;
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const taper = 1 - t * 0.88;
    const reach = length * t;
    const curlA = Math.sin(t * Math.PI * 2.2 + timeSeconds * 0.82 + seed * 1.3) * sway * taper;
    const curlB = Math.cos(t * Math.PI * 4.8 + timeSeconds * 0.64 + seed * 2.1) * frill * taper;
    const curlC = Math.sin(t * Math.PI * 8.3 + timeSeconds * 0.31 + seed * 0.92) * frill * 0.32 * taper;
    const drift = Math.cos(t * Math.PI * 1.08 + timeSeconds * 0.38 + seed) * sway * 0.18;
    points.push([centerX + curlA + curlB * 0.5 + curlC * 0.35 + drift, originY + reach]);
  }
  return points;
}

function sampleSpine(spine: Array<[number, number]>, t: number) {
  const clamped = clamp01(t) * (spine.length - 1);
  const index = Math.floor(clamped);
  const nextIndex = Math.min(spine.length - 1, index + 1);
  const mix = clamped - index;
  const a = spine[index];
  const b = spine[nextIndex];
  return {
    x: a[0] * (1 - mix) + b[0] * mix,
    y: a[1] * (1 - mix) + b[1] * mix,
  };
}

function computeSurfaceColor(
  palette: ReturnType<typeof createSplashPalette>,
  field: number,
  t: number,
  fold: number,
) {
  const primary = parseRgbTriplet(palette.primary);
  const secondary = parseRgbTriplet(palette.secondary);
  const highlight = parseRgbTriplet(palette.highlight);
  const deep = parseRgbTriplet(palette.deep);

  const warm = mixRgb(primary, secondary, 0.35 + field * 0.2);
  const bright = mixRgb(warm, highlight, 0.28 + fold * 0.18);
  const shadow = mixRgb(deep, warm, 0.2 + (1 - t) * 0.2);
  const tone = mixRgb(shadow, bright, 0.34 + field * 0.18);

  return tone;
}

export function LappetsVolumeSplash({ color = "#5dd6ff" }: { color?: string }) {
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

  const centerX = width * 0.5 + Math.sin(time * 0.17) * width * 0.014;
  const topY = height * 0.2 + Math.cos(time * 0.12) * height * 0.008;
  const bodyWidth = Math.min(width, height) * 0.2;
  const bodyHeight = Math.min(width, height) * 0.5;
  const originY = topY + bodyHeight * 0.06;
  const spine = buildLappetSpine(centerX, originY, bodyHeight * 0.88, bodyWidth * 0.08, bodyWidth * 0.03, 0.18, time);

  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  for (let i = 0; i < spine.length; i += 1) {
    const [x, y] = spine[i];
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  const paddingX = bodyWidth * 0.9;
  const paddingY = bodyWidth * 0.4;
  minX = Math.max(0, Math.floor(minX - paddingX));
  maxX = Math.min(width, Math.ceil(maxX + paddingX));
  minY = Math.max(0, Math.floor(minY - paddingY));
  maxY = Math.min(height, Math.ceil(maxY + bodyWidth * 0.5));

  const boxWidth = Math.max(1, maxX - minX);
  const boxHeight = Math.max(1, maxY - minY);
  const image = ctx.createImageData(boxWidth, boxHeight);
  const data = image.data;

  for (let y = 0; y < boxHeight; y += 1) {
    const yAbs = minY + y + 0.5;
    const t = clamp01((yAbs - originY) / Math.max(1, bodyHeight * 0.88));
    const center = sampleSpine(spine, t);
    const field = sampleLappetField(bands, center.x, yAbs, time);
    const halfWidth = bodyWidth * (0.48 * (1 - Math.pow(t, 0.82)) + 0.07 + field * 0.12);
    const foldPhase = time * 0.8 + t * 8.5 + field * 1.8;

    for (let x = 0; x < boxWidth; x += 1) {
      const xAbs = minX + x + 0.5;
      const dist = Math.abs(xAbs - center.x) / Math.max(1, halfWidth);
      if (dist > 1.08) continue;

      const edge = 1 - smoothstep(0.5, 1.08, dist);
      const fold = 0.5 + 0.5 * Math.sin(dist * 6.8 - foldPhase + Math.sin(t * Math.PI * 2.4) * 0.65);
      const overlap = 0.45 + 0.55 * Math.sin((1 - dist) * 8.2 + t * 5.7 + field * 2.1 + time * 0.35);
      const depth = 0.18 + (1 - t) * 0.34;
      const alpha = edge * (0.07 + field * 0.2) * (0.72 + 0.28 * fold) * (0.82 + 0.18 * overlap) * depth;
      if (alpha <= 0.01) continue;

      const tone = computeSurfaceColor(palette, field, t, fold);
      const idx = (y * boxWidth + x) * 4;
      data[idx] = tone.r;
      data[idx + 1] = tone.g;
      data[idx + 2] = tone.b;
      data[idx + 3] = Math.max(data[idx + 3], Math.round(alpha * 255));
    }
  }

  ctx.putImageData(image, minX, minY);
}