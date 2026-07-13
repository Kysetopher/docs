"use client";

import * as React from "react";

import { createAnimationBuffers, startAnimationLoop } from "@/lib/splash/animation";
import { createSplashPalette } from "@/lib/splash/color";
import { drawSpline } from "@/lib/splash/geometry";
import { clamp, rgba, seededRandom } from "@/lib/splash/math";

const TARGET_FPS = 30;
const FRAME_INTERVAL_MS = 1000 / TARGET_FPS;
const FOCAL_LENGTH = 1020;

type LappetStrand = {
  baseX: number;
  baseZ: number;
  amplitudeX: number;
  secondaryAmplitudeX: number;
  amplitudeZ: number;
  secondaryAmplitudeZ: number;
  radius: number;
  speed: number;
  phase: number;
  thickness: number;
  colorIndex: number;
  pointCount: number;
  layerIndex: number;
  opacityBias: number;
  twist: number;
  curl: number;
  lean: number;
  sway: number;
  depthBias: number;
};

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = clamp01((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function buildLappetStrands(width: number, height: number, paletteSize: number) {
  const seed = Math.round(width * 31 + height * 19);
  const random = seededRandom(seed);
  const layerCount = 5;
  const columnCount = Math.max(4, Math.ceil(width / Math.max(112, width * 0.24)) + 1);
  const pointCount = Math.max(28, Math.round(height / Math.max(16, Math.min(width, height) * 0.026)) + 10);
  const strands: LappetStrand[] = [];

  for (let layerIndex = 0; layerIndex < layerCount; layerIndex += 1) {
    const layerProgress = layerIndex / (layerCount - 1);
    const layerDepth = 120 + Math.pow(layerProgress, 1.2) * 760;
    const layerSpacing = width / (columnCount + 1.2);

    for (let column = -1; column < columnCount + 1; column += 1) {
      if (layerIndex > 0 && random() < 0.42) continue;
      if (layerIndex >= 3 && random() < 0.6) continue;
      if (layerIndex === layerCount - 1 && random() < 0.72) continue;

      const baseX = column * layerSpacing + layerSpacing * 0.5 + (random() - 0.5) * layerSpacing * 0.38;
      const baseZ = layerDepth + Math.pow(random(), 1.65) * (190 + layerIndex * 160) + (random() - 0.5) * 58;
      const amplitudeX = (12 + random() * 34) * (1 + layerProgress * 0.36);
      const secondaryAmplitudeX = 8 + random() * 22;
      const amplitudeZ = 34 + random() * 112;
      const secondaryAmplitudeZ = 18 + random() * 42;
      const radius = 24 + random() * 62;
      const speed = 0.1 + random() * 0.3;
      const phase = random() * Math.PI * 2;
      const thickness = 0.92 + (layerCount - layerIndex) * 0.22 + random() * 0.58;
      const colorIndex = (Math.floor(column * 1.3 + layerIndex * 1.9 + random() * paletteSize) + paletteSize) % paletteSize;
      const opacityBias = 0.34 + (1 - layerProgress) * 0.22;
      const twist = 1.1 + random() * 1.9;
      const curl = 0.6 + random() * 1.7;
      const lean = (random() - 0.5) * 0.24;
      const sway = (random() - 0.5) * 0.28;
      const depthBias = (random() - 0.5) * 26;

      strands.push({
        baseX,
        baseZ,
        amplitudeX,
        secondaryAmplitudeX,
        amplitudeZ,
        secondaryAmplitudeZ,
        radius,
        speed,
        phase,
        thickness,
        colorIndex,
        pointCount,
        layerIndex,
        opacityBias,
        twist,
        curl,
        lean,
        sway,
        depthBias,
      });
    }
  }

  return strands.sort((a, b) => a.baseZ - b.baseZ);
}

function projectLappetStrand({
  strand,
  width,
  height,
  timeSeconds,
  cameraX,
  cameraY,
  buffers,
}: {
  strand: LappetStrand;
  width: number;
  height: number;
  timeSeconds: number;
  cameraX: number;
  cameraY: number;
  buffers: ReturnType<typeof createAnimationBuffers>;
}) {
  const center = buffers.allocScratchF32(strand.pointCount * 2);
  const left = buffers.allocScratchF32(strand.pointCount * 2);
  const right = buffers.allocScratchF32(strand.pointCount * 2);
  const yStart = -height * (0.4 + strand.layerIndex * 0.08);
  const yEnd = height * (1.36 + strand.layerIndex * 0.12);
  const orbit = Math.sin(timeSeconds * 0.16 + strand.phase + strand.layerIndex * 0.3);
  let depthSum = 0;

  for (let point = 0; point < strand.pointCount; point += 1) {
    const t = strand.pointCount === 1 ? 0 : point / (strand.pointCount - 1);
    const curve = Math.sin(t * Math.PI);
    const y = yStart + t * (yEnd - yStart);
    const ribbonWaveA = Math.sin(t * Math.PI * strand.twist * 2 + timeSeconds * strand.speed * 1.28 + strand.phase);
    const ribbonWaveB = Math.cos(t * Math.PI * (strand.twist * 1.6 + 0.7) - timeSeconds * (strand.speed * 1.08) + strand.phase * 0.8);
    const ribbonWaveC = Math.sin((t * 6.2 + strand.layerIndex * 0.17) * Math.PI + timeSeconds * 0.7 + strand.phase * 0.33);

    const centerX =
      strand.baseX +
      ribbonWaveA * strand.amplitudeX * (0.78 + curve * 0.28) +
      ribbonWaveB * strand.secondaryAmplitudeX +
      ribbonWaveC * strand.lean * width * 0.04 +
      orbit * strand.sway * width * 0.065;
    const centerZ =
      strand.baseZ +
      ribbonWaveA * strand.amplitudeZ * 0.28 +
      ribbonWaveB * strand.secondaryAmplitudeZ * 0.24 +
      Math.cos((t - 0.5) * Math.PI * 2.1 + timeSeconds * 0.52 + strand.phase * 0.42) * 18 +
      strand.depthBias * 0.22;

    const perspective = FOCAL_LENGTH / (FOCAL_LENGTH + centerZ);
    const offset = point * 2;
    const screenX = cameraX + (centerX - cameraX) * perspective;
    const screenY = cameraY + (y - cameraY) * perspective;
    center[offset] = screenX;
    center[offset + 1] = screenY;
    depthSum += centerZ;

    const foldA = 0.5 + 0.5 * Math.sin(t * Math.PI * (2.6 + strand.twist * 0.45) + timeSeconds * 1.34 + strand.phase);
    const foldB = 0.5 + 0.5 * Math.cos((t * 5.2 + strand.layerIndex * 0.22) * Math.PI - timeSeconds * 1.0 + strand.phase * 0.7);
    const vein = Math.abs(Math.sin(t * Math.PI * 8.2 + timeSeconds * 1.8 + strand.phase * 1.4));
    const volume = 0.22 + smoothstep(0.05, 0.95, foldA) * 0.64 + foldB * 0.42 + vein * 0.2;
    const shellRadius = (strand.radius * volume * (0.82 + curve * 0.24)) * perspective;
    const curl = Math.sin(timeSeconds * 0.84 + t * 9.2 + strand.phase) * strand.curl * shellRadius * 0.24;
    const asym = Math.sin(timeSeconds * 0.56 + t * 5.7 + strand.phase * 1.3) * shellRadius * 0.14;

    left[offset] = screenX - shellRadius - curl - asym;
    left[offset + 1] = screenY;
    right[offset] = screenX + shellRadius + curl * 0.82 + asym * 0.86;
    right[offset + 1] = screenY;
  }

  return {
    center,
    left,
    right,
    averageDepth: depthSum / strand.pointCount,
  };
}

function fillShell(
  ctx: CanvasRenderingContext2D,
  left: Float32Array,
  right: Float32Array,
  pointCount: number,
  fillStyle: string,
) {
  if (pointCount < 2) return;
  ctx.beginPath();
  ctx.moveTo(left[0], left[1]);
  for (let i = 1; i < pointCount; i += 1) {
    const offset = i * 2;
    ctx.lineTo(left[offset], left[offset + 1]);
  }
  for (let i = pointCount - 1; i >= 0; i -= 1) {
    const offset = i * 2;
    ctx.lineTo(right[offset], right[offset + 1]);
  }
  ctx.closePath();
  ctx.fillStyle = fillStyle;
  ctx.fill();
}

// The sky/haze/vignette layers are static — render them once per resize into
// an offscreen canvas so each frame pays one blit instead of four fullscreen
// gradient fills.
function renderStaticBackdrop(
  width: number,
  height: number,
  palette: ReturnType<typeof createSplashPalette>,
) {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, width);
  canvas.height = Math.max(1, height);
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.fillStyle = rgba(palette.deep, 1);
  ctx.fillRect(0, 0, width, height);

  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, rgba(palette.shadow, 1));
  sky.addColorStop(0.46, rgba(palette.deep, 1));
  sky.addColorStop(1, rgba(palette.shadow, 1));
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  const haze = ctx.createRadialGradient(
    width * 0.5,
    height * 0.42,
    Math.max(20, Math.min(width, height) * 0.1),
    width * 0.5,
    height * 0.48,
    Math.max(width, height) * 1.04,
  );
  haze.addColorStop(0, rgba(palette.highlight, 0.14));
  haze.addColorStop(0.36, rgba(palette.soft, 0.06));
  haze.addColorStop(1, rgba(palette.deep, 0));
  ctx.fillStyle = haze;
  ctx.fillRect(0, 0, width, height);

  const vignette = ctx.createRadialGradient(
    width * 0.5,
    height * 0.5,
    Math.max(36, Math.min(width, height) * 0.16),
    width * 0.5,
    height * 0.5,
    Math.max(width, height) * 0.94,
  );
  vignette.addColorStop(0, rgba(palette.highlight, 0));
  vignette.addColorStop(1, rgba(palette.deep, 0.42));
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);

  return canvas;
}

function paintBackdrop(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  palette: ReturnType<typeof createSplashPalette>,
  timeSeconds: number,
  staticBackdrop: HTMLCanvasElement,
) {
  ctx.drawImage(staticBackdrop, 0, 0, width, height);

  // Only the slow color shift is time-varying — paint it live.
  const shift = ctx.createLinearGradient(0, 0, width, 0);
  shift.addColorStop(0, rgba(palette.primary, 0.025 + Math.sin(timeSeconds * 0.16) * 0.01));
  shift.addColorStop(0.5, rgba(palette.highlight, 0.038 + Math.cos(timeSeconds * 0.12) * 0.01));
  shift.addColorStop(1, rgba(palette.secondary, 0.022));
  ctx.fillStyle = shift;
  ctx.fillRect(0, 0, width, height);
}

function paintLappetStrand(
  ctx: CanvasRenderingContext2D,
  strand: LappetStrand,
  left: Float32Array,
  right: Float32Array,
  palette: ReturnType<typeof createSplashPalette>,
  color: string,
  depthFactor: number,
) {
  const outerGlow = clamp(0.05 + depthFactor * 0.18, 0, 0.25) * strand.opacityBias;
  const midGlow = clamp(0.08 + depthFactor * 0.24, 0, 0.34) * strand.opacityBias;
  const accent = strand.layerIndex % 2 === 0 ? palette.highlight : palette.soft;

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  fillShell(ctx, left, right, strand.pointCount, rgba(color, outerGlow * 0.18));
  fillShell(ctx, left, right, strand.pointCount, rgba(color, midGlow * 0.18));


  // Shadow-free glow: wide soft strokes replace the previous shadowBlur halo
  // (a gaussian blur per stroke) at a fraction of the raster cost.
  drawSpline(ctx, left, strand.pointCount, rgba(accent, midGlow * 0.26), strand.thickness * (3.2 + depthFactor * 0.9));
  drawSpline(ctx, right, strand.pointCount, rgba(accent, midGlow * 0.25), strand.thickness * (3.1 + depthFactor * 0.8));
  drawSpline(ctx, left, strand.pointCount, rgba(color, midGlow * 0.72), strand.thickness * (1.05 + depthFactor * 0.18));
  drawSpline(ctx, right, strand.pointCount, rgba(color, midGlow * 0.7), strand.thickness * (1.02 + depthFactor * 0.16));

  ctx.restore();
}

export function VerticalLappetTornadoSplash({ color = "#38bdf8" }: { color?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const palette = React.useMemo(() => createSplashPalette(color), [color]);
  const tornadoPalette = React.useMemo(
    () => [palette.primary, palette.secondary, palette.tertiary, palette.quaternary, palette.accent, palette.highlight],
    [palette],
  );

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const buffers = createAnimationBuffers(12288);
    let logicalWidth = 0;
    let logicalHeight = 0;
    let logicalDpr = 1;
    let strands: LappetStrand[] = [];
    let staticBackdrop: HTMLCanvasElement | null = null;

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
      strands = buildLappetStrands(logicalWidth, logicalHeight, tornadoPalette.length);
      staticBackdrop = renderStaticBackdrop(logicalWidth, logicalHeight, palette);
    };

    const stopLoop = startAnimationLoop({
      visibilityTarget: canvas,
      frameBudgetMs: FRAME_INTERVAL_MS,
      onFrame(nowMs) {
        if (!logicalWidth || !logicalHeight || strands.length === 0 || !staticBackdrop) return;
        buffers.beginFrame();
        const timeSeconds = nowMs * 0.001 * 0.32;
        const cameraX = logicalWidth * 0.5 + Math.sin(timeSeconds * 0.62) * logicalWidth * 0.04;
        const cameraY = logicalHeight * 0.44 + Math.cos(timeSeconds * 0.46) * logicalHeight * 0.028;

        paintBackdrop(ctx, logicalWidth, logicalHeight, palette, timeSeconds, staticBackdrop);

        const projected = strands.map((strand) => {
          const result = projectLappetStrand({
            strand,
            width: logicalWidth,
            height: logicalHeight,
            timeSeconds,
            cameraX,
            cameraY,
            buffers,
          });
          return { strand, ...result };
        });

        projected.sort((a, b) => b.averageDepth - a.averageDepth);

        for (let i = 0; i < projected.length; i += 1) {
          const { strand, left, right, averageDepth } = projected[i];
          const depthFactor = clamp(1 - averageDepth / 1620, 0.14, 1);
          const color = tornadoPalette[strand.colorIndex % tornadoPalette.length];
          paintLappetStrand(ctx, strand, left, right, palette, color, depthFactor);
        }

        const fog = ctx.createLinearGradient(0, 0, 0, logicalHeight);
        fog.addColorStop(0, rgba(palette.highlight, 0.03));
        fog.addColorStop(0.58, rgba(palette.soft, 0.02));
        fog.addColorStop(1, rgba(palette.deep, 0.18));
        ctx.fillStyle = fog;
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
  }, [palette, tornadoPalette]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full select-none pointer-events-none overflow-hidden" />;
}





