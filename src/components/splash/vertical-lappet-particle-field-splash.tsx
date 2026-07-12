"use client";

import * as React from "react";

import { createAnimationBuffers, startAnimationLoop } from "@/lib/splash/animation";
import { createSplashPalette } from "@/lib/splash/color";
import { clamp, rgba, seededRandom } from "@/lib/splash/math";

const TARGET_FPS = 30;
const FRAME_INTERVAL_MS = 1000 / TARGET_FPS;
const FOCAL_LENGTH = 1080;

type ParticleStrand = {
  baseX: number;
  baseZ: number;
  amplitudeX: number;
  amplitudeZ: number;
  secondaryAmplitudeX: number;
  secondaryAmplitudeZ: number;
  speed: number;
  phase: number;
  thickness: number;
  colorIndex: number;
  pointCount: number;
  layerIndex: number;
  opacityBias: number;
  lean: number;
  sway: number;
  depthBias: number;
  curl: number;
  flutter: number;
  density: number;
};

function buildParticleStrands(width: number, height: number, paletteSize: number) {
  const seed = Math.round(width * 29 + height * 37);
  const random = seededRandom(seed);
  const layerCount = 5;
  const columnCount = Math.max(4, Math.ceil(width / Math.max(92, width * 0.2)) + 1);
  const pointCount = Math.max(26, Math.round(height / Math.max(16, Math.min(width, height) * 0.026)) + 10);
  const strands: ParticleStrand[] = [];

  for (let layerIndex = 0; layerIndex < layerCount; layerIndex += 1) {
    const layerProgress = layerIndex / (layerCount - 1);
    const layerDepth = 100 + Math.pow(layerProgress, 1.18) * 820;
    const layerSpacing = width / (columnCount + 1.1);

    for (let column = -1; column < columnCount + 1; column += 1) {
      if (layerIndex > 0 && random() < 0.48) continue;
      if (layerIndex >= 3 && random() < 0.62) continue;
      if (layerIndex === layerCount - 1 && random() < 0.74) continue;

      const baseX = column * layerSpacing + layerSpacing * 0.5 + (random() - 0.5) * layerSpacing * 0.4;
      const baseZ = layerDepth + Math.pow(random(), 1.72) * (170 + layerIndex * 170) + (random() - 0.5) * 52;
      const amplitudeX = (9 + random() * 28) * (1 + layerProgress * 0.42);
      const amplitudeZ = 28 + random() * 96;
      const secondaryAmplitudeX = 5 + random() * 18;
      const secondaryAmplitudeZ = 14 + random() * 32;
      const speed = 0.12 + random() * 0.28;
      const phase = random() * Math.PI * 2;
      const thickness = 0.62 + (layerCount - layerIndex) * 0.14 + random() * 0.38;
      const colorIndex = (Math.floor(column * 1.2 + layerIndex * 2.4 + random() * paletteSize) + paletteSize) % paletteSize;
      const opacityBias = 0.36 + (1 - layerProgress) * 0.2;
      const lean = (random() - 0.5) * 0.28;
      const sway = (random() - 0.5) * 0.32;
      const depthBias = (random() - 0.5) * 28;
      const curl = 0.9 + random() * 1.8;
      const flutter = 0.6 + random() * 1.6;
      const density = 0.32 + random() * 0.5;

      strands.push({
        baseX,
        baseZ,
        amplitudeX,
        amplitudeZ,
        secondaryAmplitudeX,
        secondaryAmplitudeZ,
        speed,
        phase,
        thickness,
        colorIndex,
        pointCount,
        layerIndex,
        opacityBias,
        lean,
        sway,
        depthBias,
        curl,
        flutter,
        density,
      });
    }
  }

  return strands.sort((a, b) => a.baseZ - b.baseZ);
}

function projectStrand({
  strand,
  width,
  height,
  timeSeconds,
  cameraX,
  cameraY,
  buffers,
}: {
  strand: ParticleStrand;
  width: number;
  height: number;
  timeSeconds: number;
  cameraX: number;
  cameraY: number;
  buffers: ReturnType<typeof createAnimationBuffers>;
}) {
  const xy = buffers.allocScratchF32(strand.pointCount * 2);
  const normal = buffers.allocScratchF32(strand.pointCount * 2);
  const tangent = buffers.allocScratchF32(strand.pointCount * 2);
  const yStart = -height * (0.36 + strand.layerIndex * 0.07);
  const yEnd = height * (1.28 + strand.layerIndex * 0.1);
  const orbit = Math.sin(timeSeconds * 0.18 + strand.phase + strand.layerIndex * 0.25);
  let depthSum = 0;

  for (let point = 0; point < strand.pointCount; point += 1) {
    const t = strand.pointCount === 1 ? 0 : point / (strand.pointCount - 1);
    const curve = Math.sin(t * Math.PI);
    const y = yStart + t * (yEnd - yStart);
    const waveA = Math.sin(t * Math.PI * 2.1 + timeSeconds * strand.speed * 1.28 + strand.phase);
    const waveB = Math.cos(t * Math.PI * 3.4 - timeSeconds * (strand.speed * 0.86) + strand.phase * 0.82);
    const waveC = Math.sin((t * 6.8 + strand.layerIndex * 0.18) * Math.PI + timeSeconds * 0.72 + strand.phase * 0.36);

    const worldX =
      strand.baseX +
      waveA * strand.amplitudeX * (0.7 + curve * 0.34) +
      waveB * strand.secondaryAmplitudeX +
      waveC * strand.lean * width * 0.045 +
      orbit * strand.sway * width * 0.055;
    const worldZ =
      strand.baseZ +
      waveA * strand.amplitudeZ * 0.26 +
      waveB * strand.secondaryAmplitudeZ * 0.22 +
      Math.cos((t - 0.5) * Math.PI * 2.15 + timeSeconds * 0.54 + strand.phase * 0.4) * 20 +
      strand.depthBias * 0.24;
    const perspective = FOCAL_LENGTH / (FOCAL_LENGTH + worldZ);
    const offset = point * 2;
    const screenX = cameraX + (worldX - cameraX) * perspective;
    const screenY = cameraY + (y - cameraY) * perspective;
    xy[offset] = screenX;
    xy[offset + 1] = screenY;
    depthSum += worldZ;
  }

  for (let point = 0; point < strand.pointCount; point += 1) {
    const offset = point * 2;
    const prevOffset = Math.max(0, (point - 1) * 2);
    const nextOffset = Math.min((strand.pointCount - 1) * 2, (point + 1) * 2);
    const dx = xy[nextOffset] - xy[prevOffset];
    const dy = xy[nextOffset + 1] - xy[prevOffset + 1];
    const len = Math.max(1, Math.hypot(dx, dy));
    const scale = 1 / len;
    tangent[offset] = dx * scale;
    tangent[offset + 1] = dy * scale;
    normal[offset] = -tangent[offset + 1];
    normal[offset + 1] = tangent[offset];
  }

  return {
    xy,
    tangent,
    normal,
    averageDepth: depthSum / strand.pointCount,
  };
}

function paintBackdrop(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  palette: ReturnType<typeof createSplashPalette>,
  timeSeconds: number,
) {
  ctx.fillStyle = rgba(palette.deep, 1);
  ctx.fillRect(0, 0, width, height);

  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, rgba(palette.shadow, 1));
  sky.addColorStop(0.44, rgba(palette.deep, 1));
  sky.addColorStop(1, rgba(palette.shadow, 1));
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  const haze = ctx.createRadialGradient(
    width * 0.5,
    height * 0.44,
    Math.max(20, Math.min(width, height) * 0.08),
    width * 0.5,
    height * 0.48,
    Math.max(width, height) * 1.05,
  );
  haze.addColorStop(0, rgba(palette.highlight, 0.16));
  haze.addColorStop(0.34, rgba(palette.soft, 0.06));
  haze.addColorStop(1, rgba(palette.deep, 0));
  ctx.fillStyle = haze;
  ctx.fillRect(0, 0, width, height);

  const shift = ctx.createLinearGradient(0, 0, width, 0);
  shift.addColorStop(0, rgba(palette.primary, 0.026 + Math.sin(timeSeconds * 0.2) * 0.01));
  shift.addColorStop(0.5, rgba(palette.highlight, 0.04 + Math.cos(timeSeconds * 0.14) * 0.01));
  shift.addColorStop(1, rgba(palette.secondary, 0.024));
  ctx.fillStyle = shift;
  ctx.fillRect(0, 0, width, height);

  const vignette = ctx.createRadialGradient(
    width * 0.5,
    height * 0.5,
    Math.max(38, Math.min(width, height) * 0.16),
    width * 0.5,
    height * 0.5,
    Math.max(width, height) * 0.94,
  );
  vignette.addColorStop(0, rgba(palette.highlight, 0));
  vignette.addColorStop(1, rgba(palette.deep, 0.42));
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);
}

function paintParticleStrand(
  ctx: CanvasRenderingContext2D,
  strand: ParticleStrand,
  xy: Float32Array,
  tangent: Float32Array,
  normal: Float32Array,
  palette: ReturnType<typeof createSplashPalette>,
  color: string,
  depthFactor: number,
  timeSeconds: number,
) {
  const particleBase = strand.density * (1.3 + depthFactor * 1.8);
  const glow = clamp(0.04 + depthFactor * 0.16, 0, 0.24) * strand.opacityBias;
  const accent = strand.layerIndex % 2 === 0 ? palette.highlight : palette.soft;

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  for (let point = 0; point < strand.pointCount; point += 1) {
    const offset = point * 2;
    const x = xy[offset];
    const y = xy[offset + 1];
    const tx = tangent[offset];
    const ty = tangent[offset + 1];
    const nx = normal[offset];
    const ny = normal[offset + 1];
    const t = strand.pointCount === 1 ? 0 : point / (strand.pointCount - 1);
    const depthLift = 0.4 + depthFactor * 0.9;
    const flutter = Math.sin(timeSeconds * (0.86 + strand.speed * 0.12) + t * 11.2 + strand.phase);
    const curl = Math.cos(timeSeconds * 1.08 + t * 7.8 + strand.phase * 0.8);
    const spread = (1.1 + Math.abs(flutter) * 1.2 + Math.abs(curl) * 0.7) * depthLift;
    const count = Math.max(2, Math.round(particleBase + Math.abs(flutter) * 2.2 + (t < 0.3 ? 1 : 0)));

    for (let i = 0; i < count; i += 1) {
      const local = (i / Math.max(1, count - 1)) * 2 - 1;
      const radial = local * spread * strand.thickness * (6 + depthFactor * 10);
      const along = Math.sin(timeSeconds * 0.94 + point * 0.42 + i * 0.8 + strand.phase) * strand.curl;
      const px = x + nx * radial + tx * along * strand.thickness * 3.4;
      const py = y + ny * radial + ty * along * strand.thickness * 3.4;
      const size = (1.1 + strand.thickness * 0.7 + Math.abs(curl) * 1.6) * (0.7 + depthFactor * 0.9);
      const alpha = glow * (0.34 + 0.66 * (1 - Math.abs(local))) * (0.72 + 0.28 * Math.max(0, flutter));
      if (alpha <= 0.004) continue;

      ctx.shadowColor = rgba(color, alpha * 1.2);
      ctx.shadowBlur = 10 + depthFactor * 10;
      ctx.fillStyle = rgba(color, alpha);
      ctx.beginPath();
      ctx.ellipse(px, py, size * (0.68 + Math.abs(flutter) * 0.45), size * (1.2 + Math.abs(curl) * 0.9), Math.atan2(ty, tx) + flutter * 0.45, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = rgba(accent, alpha * 0.45);
      ctx.beginPath();
      ctx.ellipse(px + nx * size * 0.2, py + ny * size * 0.2, size * 0.28, size * 0.5, Math.atan2(ty, tx) + 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
}

export function VerticalLappetParticleFieldSplash({ color = "#38bdf8" }: { color?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const palette = React.useMemo(() => createSplashPalette(color), [color]);
  const fieldPalette = React.useMemo(
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
    let strands: ParticleStrand[] = [];

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
      strands = buildParticleStrands(logicalWidth, logicalHeight, fieldPalette.length);
    };

    const stopLoop = startAnimationLoop({
      frameBudgetMs: FRAME_INTERVAL_MS,
      onFrame(nowMs) {
        if (!logicalWidth || !logicalHeight || strands.length === 0) return;
        buffers.beginFrame();
        const timeSeconds = nowMs * 0.001 * 0.36;
        const cameraX = logicalWidth * 0.5 + Math.sin(timeSeconds * 0.74) * logicalWidth * 0.035;
        const cameraY = logicalHeight * 0.44 + Math.cos(timeSeconds * 0.52) * logicalHeight * 0.03;

        paintBackdrop(ctx, logicalWidth, logicalHeight, palette, timeSeconds);

        const projected = strands.map((strand) => {
          const result = projectStrand({
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
          const { strand, xy, tangent, normal, averageDepth } = projected[i];
          const depthFactor = clamp(1 - averageDepth / 1700, 0.12, 1);
          const color = fieldPalette[strand.colorIndex % fieldPalette.length];
          paintParticleStrand(ctx, strand, xy, tangent, normal, palette, color, depthFactor, timeSeconds);
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
  }, [fieldPalette, palette]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full select-none pointer-events-none overflow-hidden" />;
}
