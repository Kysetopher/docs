"use client";

import * as React from "react";

import { createAnimationBuffers, startAnimationLoop } from "@/lib/splash/animation";
import { createSplashPalette } from "@/lib/splash/color";
import { drawSpline } from "@/lib/splash/geometry";
import { clamp, rgba, seededRandom } from "@/lib/splash/math";

const TARGET_FPS = 30;
const FRAME_INTERVAL_MS = 1000 / TARGET_FPS;
const FOCAL_LENGTH = 980;

type VolumetricStrand = {
  baseX: number;
  baseZ: number;
  amplitudeX: number;
  amplitudeZ: number;
  secondaryAmplitudeX: number;
  secondaryAmplitudeZ: number;
  wavelength: number;
  secondaryWavelength: number;
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
};

function buildVolumetricStrands(width: number, height: number, paletteSize: number) {
  const seed = Math.round(width * 23 + height * 17);
  const random = seededRandom(seed);
  const layerCount = 5;
  const columnCount = Math.max(4, Math.ceil(width / Math.max(72, width * 0.18)) + 2);
  const pointCount = Math.max(24, Math.round(height / Math.max(18, Math.min(width, height) * 0.03)) + 8);
  const strands: VolumetricStrand[] = [];

  for (let layerIndex = 0; layerIndex < layerCount; layerIndex += 1) {
    const layerProgress = layerIndex / (layerCount - 1);
    const layerDepth = 110 + Math.pow(layerProgress, 1.25) * 720;
    const layerSpacing = width / (columnCount + 1.4);

    for (let column = -1; column < columnCount + 1; column += 1) {
      if (layerIndex > 0 && random() < 0.54) continue;
      if (layerIndex >= 3 && random() < 0.66) continue;
      if (layerIndex === layerCount - 1 && random() < 0.78) continue;

      const jitter = (random() - 0.5) * layerSpacing * 0.42;
      const baseX = column * layerSpacing + layerSpacing * 0.5 + jitter;
      const baseZ = layerDepth + Math.pow(random(), 1.8) * (160 + layerIndex * 140) + (random() - 0.5) * 42;
      const amplitudeX = (10 + random() * 30) * (1 + layerProgress * 0.42);
      const amplitudeZ = 28 + random() * 108;
      const secondaryAmplitudeX = 6 + random() * 20;
      const secondaryAmplitudeZ = 16 + random() * 34;
      const wavelength = 0.7 + random() * 0.95;
      const secondaryWavelength = 1.3 + random() * 1.1;
      const speed = 0.08 + random() * 0.22;
      const phase = random() * Math.PI * 2;
      const thickness = 0.74 + (layerCount - layerIndex) * 0.18 + random() * 0.46;
      const colorIndex = (Math.floor(layerIndex * 1.8 + column * 0.9 + random() * paletteSize) + paletteSize) % paletteSize;
      const opacityBias = 0.42 + (1 - layerProgress) * 0.2;
      const lean = (random() - 0.5) * 0.26;
      const sway = (random() - 0.5) * 0.2;
      const depthBias = (random() - 0.5) * 22;

      strands.push({
        baseX,
        baseZ,
        amplitudeX,
        amplitudeZ,
        secondaryAmplitudeX,
        secondaryAmplitudeZ,
        wavelength,
        secondaryWavelength,
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
      });
    }
  }

  return strands.sort((a, b) => a.baseZ - b.baseZ);
}

function projectStrandPoints({
  strand,
  width,
  height,
  timeSeconds,
  cameraX,
  cameraY,
  buffers,
}: {
  strand: VolumetricStrand;
  width: number;
  height: number;
  timeSeconds: number;
  cameraX: number;
  cameraY: number;
  buffers: ReturnType<typeof createAnimationBuffers>;
}) {
  const xy = buffers.allocScratchF32(strand.pointCount * 2);
  const yStart = -height * (0.34 + strand.layerIndex * 0.08);
  const yEnd = height * (1.3 + strand.layerIndex * 0.1);
  let depthSum = 0;
  const drift = Math.sin(timeSeconds * 0.16 + strand.phase + strand.layerIndex * 0.24);

  for (let point = 0; point < strand.pointCount; point += 1) {
    const t = strand.pointCount === 1 ? 0 : point / (strand.pointCount - 1);
    const curve = Math.sin(t * Math.PI);
    const y = yStart + t * (yEnd - yStart);
    const waveA = Math.sin(t * Math.PI * strand.wavelength * 2 + timeSeconds * strand.speed * 1.26 + strand.phase);
    const waveB = Math.cos(t * Math.PI * strand.secondaryWavelength * 2 - timeSeconds * (strand.speed * 0.96) + strand.phase * 0.86);
    const waveC = Math.sin((t * 6.4 + strand.layerIndex * 0.14) * Math.PI + timeSeconds * 0.56 + strand.phase * 0.31);

    const worldX =
      strand.baseX +
      waveA * strand.amplitudeX * (0.72 + curve * 0.38) +
      waveB * strand.secondaryAmplitudeX +
      waveC * strand.lean * width * 0.03 +
      drift * strand.sway * width * 0.04;
    const worldZ =
      strand.baseZ +
      waveA * strand.amplitudeZ * 0.22 +
      waveB * strand.secondaryAmplitudeZ * 0.18 +
      Math.cos((t - 0.5) * Math.PI * 2 + timeSeconds * 0.46 + strand.phase * 0.34) * 18 +
      strand.depthBias * 0.22;
    const perspective = FOCAL_LENGTH / (FOCAL_LENGTH + worldZ);
    const offset = point * 2;
    xy[offset] = cameraX + (worldX - cameraX) * perspective;
    xy[offset + 1] = cameraY + (y - cameraY) * perspective + curve * (1 - perspective) * height * 0.014;
    depthSum += worldZ;
  }

  return {
    xy,
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
  sky.addColorStop(0.46, rgba(palette.deep, 1));
  sky.addColorStop(1, rgba(palette.shadow, 1));
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  const volume = ctx.createRadialGradient(
    width * 0.5,
    height * 0.44,
    Math.max(20, Math.min(width, height) * 0.1),
    width * 0.5,
    height * 0.5,
    Math.max(width, height) * 1.02,
  );
  volume.addColorStop(0, rgba(palette.highlight, 0.15));
  volume.addColorStop(0.36, rgba(palette.soft, 0.06));
  volume.addColorStop(1, rgba(palette.deep, 0));
  ctx.fillStyle = volume;
  ctx.fillRect(0, 0, width, height);

  const shafts = ctx.createLinearGradient(0, 0, width, 0);
  shafts.addColorStop(0, rgba(palette.primary, 0.025 + Math.sin(timeSeconds * 0.13) * 0.01));
  shafts.addColorStop(0.5, rgba(palette.highlight, 0.035 + Math.cos(timeSeconds * 0.1) * 0.01));
  shafts.addColorStop(1, rgba(palette.secondary, 0.022));
  ctx.fillStyle = shafts;
  ctx.fillRect(0, 0, width, height);

  const vignette = ctx.createRadialGradient(
    width * 0.5,
    height * 0.48,
    Math.max(40, Math.min(width, height) * 0.18),
    width * 0.5,
    height * 0.48,
    Math.max(width, height) * 0.94,
  );
  vignette.addColorStop(0, rgba(palette.highlight, 0));
  vignette.addColorStop(1, rgba(palette.deep, 0.42));
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);
}

function paintStrand(
  ctx: CanvasRenderingContext2D,
  strand: VolumetricStrand,
  xy: Float32Array,
  palette: ReturnType<typeof createSplashPalette>,
  color: string,
  depthFactor: number,
) {
  const glow = clamp(0.05 + depthFactor * 0.18, 0, 0.26) * strand.opacityBias;
  const line = clamp(0.1 + depthFactor * 0.3, 0, 0.44) * strand.opacityBias;
  const core = clamp(0.14 + depthFactor * 0.42, 0, 0.7) * strand.opacityBias;
  const accent = strand.layerIndex % 2 === 0 ? palette.highlight : palette.soft;

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.globalCompositeOperation = "lighter";

  ctx.shadowColor = rgba(color, glow * 0.92);
  ctx.shadowBlur = 20 + depthFactor * 16;
  drawSpline(ctx, xy, strand.pointCount, rgba(color, glow * 0.72), strand.thickness * (3.6 + depthFactor * 1.2));

  ctx.shadowColor = rgba(accent, glow * 0.8);
  ctx.shadowBlur = 12 + depthFactor * 8;
  drawSpline(ctx, xy, strand.pointCount, rgba(color, glow), strand.thickness * (1.95 + depthFactor * 0.76));

  ctx.shadowColor = rgba(color, line * 0.55);
  ctx.shadowBlur = 6 + depthFactor * 4;
  drawSpline(ctx, xy, strand.pointCount, rgba(color, line), strand.thickness * (1.02 + depthFactor * 0.2));

  drawSpline(ctx, xy, strand.pointCount, rgba(palette.soft, core * 0.4), strand.thickness * 0.7);
  ctx.restore();
}

export function VerticalVolumetricFieldSplash({ color = "#38bdf8" }: { color?: string }) {
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
    let strands: VolumetricStrand[] = [];

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
      strands = buildVolumetricStrands(logicalWidth, logicalHeight, fieldPalette.length);
    };

    const stopLoop = startAnimationLoop({
      frameBudgetMs: FRAME_INTERVAL_MS,
      onFrame(nowMs) {
        if (!logicalWidth || !logicalHeight || strands.length === 0) return;
        buffers.beginFrame();
        const timeSeconds = nowMs * 0.001 * 0.28;
        const cameraX = logicalWidth * 0.5 + Math.sin(timeSeconds * 0.42) * logicalWidth * 0.025;
        const cameraY = logicalHeight * 0.42 + Math.cos(timeSeconds * 0.31) * logicalHeight * 0.018;

        paintBackdrop(ctx, logicalWidth, logicalHeight, palette, timeSeconds);

        const projectedStrands = strands.map((strand) => {
          const projected = projectStrandPoints({
            strand,
            width: logicalWidth,
            height: logicalHeight,
            timeSeconds,
            cameraX,
            cameraY,
            buffers,
          });

          return {
            strand,
            xy: projected.xy,
            averageDepth: projected.averageDepth,
          };
        });

        projectedStrands.sort((a, b) => b.averageDepth - a.averageDepth);

        for (let i = 0; i < projectedStrands.length; i += 1) {
          const { strand, xy, averageDepth } = projectedStrands[i];
          const depthFactor = clamp(1 - averageDepth / 1500, 0.14, 1);
          const color = fieldPalette[strand.colorIndex % fieldPalette.length];
          paintStrand(ctx, strand, xy, palette, color, depthFactor);
        }

        const fog = ctx.createLinearGradient(0, 0, 0, logicalHeight);
        fog.addColorStop(0, rgba(palette.highlight, 0.03));
        fog.addColorStop(0.56, rgba(palette.soft, 0.02));
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



