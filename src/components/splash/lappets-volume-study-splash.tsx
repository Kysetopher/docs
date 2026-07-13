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

function buildRibbonSpine(
  centerX: number,
  originY: number,
  length: number,
  sway: number,
  frill: number,
  seed: number,
  timeSeconds: number,
) {
  const points: Array<[number, number]> = [];
  const segments = 48;
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const taper = 1 - t * 0.92;
    const reach = length * t;
    const curlA = Math.sin(t * Math.PI * 2.35 + timeSeconds * 0.78 + seed * 1.25) * sway * taper;
    const curlB = Math.cos(t * Math.PI * 5.4 + timeSeconds * 0.62 + seed * 1.9) * frill * taper;
    const curlC = Math.sin(t * Math.PI * 8.8 + timeSeconds * 0.29 + seed * 0.8) * frill * 0.35 * taper;
    const drift = Math.cos(t * Math.PI * 1.05 + timeSeconds * 0.4 + seed) * sway * 0.22;
    points.push([centerX + curlA + curlB * 0.45 + curlC * 0.3 + drift, originY + reach]);
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

type ParsedPalette = {
  primary: Rgb;
  secondary: Rgb;
  highlight: Rgb;
  deep: Rgb;
};

// Scratch output reused across pixels — avoids millions of per-pixel allocations.
const toneScratch: Rgb = { r: 0, g: 0, b: 0 };

function computeTone(parsed: ParsedPalette, field: number, density: number, t: number) {
  // Same math as the original mixRgb chain (base → lift → tone), inlined
  // channel-wise with zero allocations and no per-pixel parsing.
  const bT = clamp01(0.16 + density * 0.28);
  const baseR = parsed.deep.r + (parsed.primary.r - parsed.deep.r) * bT;
  const baseG = parsed.deep.g + (parsed.primary.g - parsed.deep.g) * bT;
  const baseB = parsed.deep.b + (parsed.primary.b - parsed.deep.b) * bT;

  const lT = clamp01(0.22 + field * 0.2);
  const liftR = baseR + (parsed.secondary.r - baseR) * lT;
  const liftG = baseG + (parsed.secondary.g - baseG) * lT;
  const liftB = baseB + (parsed.secondary.b - baseB) * lT;

  const tT = clamp01(0.1 + t * 0.08 + density * 0.1);
  toneScratch.r = liftR + (parsed.highlight.r - liftR) * tT;
  toneScratch.g = liftG + (parsed.highlight.g - liftG) * tT;
  toneScratch.b = liftB + (parsed.highlight.b - liftB) * tT;
  return toneScratch;
}


export function LappetsFieldSplash({ color = "#5dd6ff" }: { color?: string }) {
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

  const centerX = width * 0.5 + Math.sin(time * 0.12) * width * 0.04;
  const centerY = height * 0.3 + Math.cos(time * 0.09) * height * 0.015;
  const bellWidth = Math.min(width, height) * 0.26;
  const bellHeight = Math.min(width, height) * 0.18;
  const tentacleLength = Math.min(width, height) * 0.48;
  const spine = buildRibbonSpine(centerX, centerY + bellHeight * 0.02, bellHeight * 2.6, bellWidth * 0.32, bellWidth * 0.18, 0.26, time);

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

  minX = Math.max(0, Math.floor(minX - bellWidth * 1.3));
  maxX = Math.min(width, Math.ceil(maxX + bellWidth * 1.3));
  minY = Math.max(0, Math.floor(centerY - bellHeight * 1.6));
  maxY = Math.min(height, Math.ceil(centerY + tentacleLength * 1.05));

  const boxWidth = Math.max(1, maxX - minX);
  const boxHeight = Math.max(1, maxY - minY);
  const image = ctx.createImageData(boxWidth, boxHeight);
  const data = image.data;

  // Parse palette once per frame instead of 4 regex parses per pixel.
  const parsed: ParsedPalette = {
    primary: parseRgbTriplet(palette.primary),
    secondary: parseRgbTriplet(palette.secondary),
    highlight: parseRgbTriplet(palette.highlight),
    deep: parseRgbTriplet(palette.deep),
  };

  for (let y = 0; y < boxHeight; y += 1) {
    const yAbs = minY + y + 0.5;
    const t = clamp01((yAbs - (centerY - bellHeight * 1.2)) / (tentacleLength + bellHeight * 1.4));
    const fieldY = yAbs;
    const fieldMid = sampleSpine(spine, t);
    const field = sampleLappetField(bands, fieldMid.x, fieldY, time);

    const bellT = clamp01((yAbs - (centerY - bellHeight * 1.1)) / (bellHeight * 1.7));
    const bellWidthAtY = bellWidth * (0.28 + 0.82 * Math.sin(bellT * Math.PI * 0.5)) * (1 + field * 0.12);
    const bellCenterY = centerY - bellHeight * 0.34;
    const bellShape = 1 - smoothstep(0.45, 1.1, Math.hypot((yAbs - bellCenterY) / Math.max(1, bellHeight), 0.0));

    for (let x = 0; x < boxWidth; x += 1) {
      const xAbs = minX + x + 0.5;
      const dxBell = (xAbs - centerX) / Math.max(1, bellWidthAtY);
      const bellProfile = Math.hypot(dxBell * 0.96, (yAbs - bellCenterY) / Math.max(1, bellHeight * 0.92));
      const bell = 1 - smoothstep(0.5, 1.08, bellProfile);

      const dx = xAbs - fieldMid.x;
      const dist = Math.abs(dx) / Math.max(1, bellWidth * (0.18 + (1 - t) * 0.52 + field * 0.1));
      const tentacle = t > 0.18 ? 1 - smoothstep(0.38, 1.0, dist) : 0;

      const flowA = Math.sin(dx * 0.1 - time * 2.2 + t * 6.2 + field * 2.1);
      const flowB = Math.cos((dx + yAbs) * 0.055 + time * 1.3 - t * 8.4);
      const flowC = Math.sin(dx * 0.07 + yAbs * 0.03 + time * 0.9 + field);
      const strand = 0.5 + 0.5 * Math.sin(flowA * 1.35 + flowB * 0.9 + flowC * 1.1);
      const body = Math.max(bell * (0.95 - t * 0.15), tentacle * (0.7 + 0.3 * strand));
      if (body <= 0.01) continue;

      const opacityBase = t < 0.28 ? 0.12 : 0.06;
      const alpha = body * (opacityBase + field * 0.16) * (0.72 + 0.28 * strand) * (0.82 + 0.18 * bellShape);
      if (alpha <= 0.008) continue;

      const density = 0.32 + 0.68 * Math.max(strand, field);
      const tone = computeTone(parsed, field, density, t);
      const idx = (y * boxWidth + x) * 4;
      data[idx] = tone.r;
      data[idx + 1] = tone.g;
      data[idx + 2] = tone.b;
      data[idx + 3] = Math.max(data[idx + 3], Math.round(alpha * 255));
    }
  }

  ctx.putImageData(image, minX, minY);
}