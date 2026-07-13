"use client";

import * as React from "react";

import { createAnimationBuffers, startAnimationLoop } from "@/lib/splash/animation";
import { createSplashPalette } from "@/lib/splash/color";
import { rgba } from "@/lib/splash/math";

const TARGET_FPS = 30;
const FRAME_INTERVAL_MS = 1000 / TARGET_FPS;
const MOTION_SCALE = 0.55;

type OrbitBand = {
  radiusX: number;
  radiusY: number;
  tiltX: number;
  tiltY: number;
  phase: number;
  width: number;
  density: number;
  depth: number;
};

type Dot = {
  bandIndex: number;
  angle: number;
  radiusJitter: number;
  phase: number;
  size: number;
  depth: number;
  tint: number;
};

function buildOrbitBands(width: number, height: number) {
  const bands: OrbitBand[] = [];
  const minSide = Math.min(width, height);
  const scale = 2.2;
  const baseX = minSide * 0.34 * scale;
  const baseY = minSide * 0.18 * scale;

  for (let i = 0; i < 10; i += 1) {
    const depth = i / 9;
    bands.push({
      radiusX: baseX * (0.82 + depth * 0.95),
      radiusY: baseY * (0.92 + depth * 0.72),
      tiltX: -0.38 + depth * 0.78,
      tiltY: -0.16 + depth * 0.34,
      phase: i * 0.55,
      width: 1.4 + depth * 1.8,
      density: 0.7 + depth * 0.55,
      depth,
    });
  }

  return bands;
}

function buildDots() {
  const dots: Dot[] = [];
  for (let bandIndex = 0; bandIndex < 10; bandIndex += 1) {
    const count = 18 + bandIndex * 5;
    for (let i = 0; i < count; i += 1) {
      const t = i / count;
      dots.push({
        bandIndex,
        angle: t * Math.PI * 2,
        radiusJitter: 0.82 + ((i * 17 + bandIndex * 11) % 37) / 120,
        phase: (bandIndex * 19 + i * 13) * 0.11,
        size: 0.8 + ((i * 23 + bandIndex * 7) % 5) * 0.35,
        depth: bandIndex / 9,
        tint: ((i * 7 + bandIndex * 3) % 4) / 3,
      });
    }
  }
  return dots;
}

function projectPoint(
  x: number,
  y: number,
  z: number,
  centerX: number,
  centerY: number,
  cameraDistance: number,
  zoom: number,
) {
  const perspective = cameraDistance / (cameraDistance + z);
  return {
    x: centerX + x * perspective * zoom,
    y: centerY + y * perspective * zoom,
    perspective,
  };
}

function sampleFieldLift(band: OrbitBand, time: number, angle: number) {
  const slowWave = Math.sin(time * 0.45 + band.phase * 1.4) * band.radiusY * 0.09;
  const fastWave = Math.sin(angle * 2.4 + time * 1.15 + band.phase) * band.radiusY * 0.05;
  const driftWave = Math.cos(angle * 3.2 - time * 0.72 + band.phase * 0.6) * band.radiusY * 0.025;
  return slowWave + fastWave + driftWave;
}

function buildOrbitPath(
  band: OrbitBand,
  time: number,
  sampleCount: number,
  ringTilt: number,
  ringLean: number,
  cameraDistance: number,
  centerX: number,
  centerY: number,
  zoom: number,
  path: Float32Array,
) {
  const startAngle = -Math.PI * 2;
  const endAngle = Math.PI * 4;
  const span = endAngle - startAngle;

  for (let i = 0; i < sampleCount * 3; i += 1) {
    const t = i / Math.max(1, sampleCount * 3 - 1);
    const angle = startAngle + t * span;
    const wobble = Math.sin(angle * 2.2 + time * 0.56 + band.phase) * 0.065 + Math.cos(angle * 4.4 - time * 0.08) * 0.025;
    const spread = 1 + wobble;
    const fieldLift = Math.sin(time * 0.14 + band.phase * 1.2) * band.radiusY * 0.08;
    const x = Math.cos(angle) * band.radiusX * spread;
    const y =
      Math.sin(angle) * band.radiusY * (1 + Math.sin(angle * 2 + band.phase) * 0.03) +
      fieldLift +
      Math.sin(angle * 3 + time * 0.3 + band.phase) * band.radiusY * 0.04;
    const z =
      Math.sin(angle + band.phase) * band.radiusX * 0.18 +
      Math.cos(angle * 2.2 - band.phase) * band.radiusY * 0.16 +
      band.depth * 42 +
      Math.sin(time * 0.25 + band.phase) * 16;

    const rotatedX = x * Math.cos(ringLean) - z * Math.sin(ringLean);
    const rotatedZ = x * Math.sin(ringLean) + z * Math.cos(ringLean);
    const rotatedY = y * Math.cos(ringTilt) - rotatedZ * Math.sin(ringTilt);
    const finalZ = y * Math.sin(ringTilt) + rotatedZ * Math.cos(ringTilt);
    const projected = projectPoint(rotatedX, rotatedY, finalZ, centerX, centerY, cameraDistance, zoom);

    const offset = i * 2;
    path[offset] = projected.x;
    path[offset + 1] = projected.y;
  }

  return path;
}

function drawFadedOrbitPath(
  ctx: CanvasRenderingContext2D,
  path: Float32Array,
  pointCount: number,
  rgb: string,
  lineWidth: number,
  baseAlpha: number,
) {
  if (pointCount < 2) return;

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = lineWidth;
  const sliceCount = Math.min(18, Math.max(6, Math.floor(pointCount / 10)));

  for (let sliceIndex = 0; sliceIndex < sliceCount; sliceIndex += 1) {
    const sliceStart = Math.floor((sliceIndex / sliceCount) * (pointCount - 1));
    const sliceEnd = Math.max(sliceStart + 1, Math.floor(((sliceIndex + 1) / sliceCount) * (pointCount - 1)));
    const centerT = (sliceIndex + 0.5) / sliceCount;
    const fadeIn = Math.min(1, centerT / 0.3333333333);
    const fadeOut = Math.min(1, (1 - centerT) / 0.3333333333);
    const alpha = baseAlpha * Math.min(fadeIn, fadeOut);

    ctx.beginPath();
    ctx.moveTo(path[sliceStart * 2], path[sliceStart * 2 + 1]);
    for (let i = sliceStart + 1; i <= sliceEnd; i += 1) {
      ctx.lineTo(path[i * 2], path[i * 2 + 1]);
    }
    ctx.strokeStyle = rgba(rgb, alpha);
    ctx.stroke();
  }
}

export function AtlasDriftSplash({ color = "#38bdf8" }: { color?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const palette = React.useMemo(() => createSplashPalette(color), [color]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const buffers = createAnimationBuffers(4096);
    let logicalWidth = 0;
    let logicalHeight = 0;
    let logicalDpr = 1;
    let bands = buildOrbitBands(1, 1);
    let dots = buildDots();

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
      bands = buildOrbitBands(logicalWidth, logicalHeight);
      dots = buildDots();
    };

    const stopLoop = startAnimationLoop({
      visibilityTarget: canvas,
      frameBudgetMs: FRAME_INTERVAL_MS,
      onFrame(nowMs) {
        if (!logicalWidth || !logicalHeight) return;
        buffers.beginFrame();

        const time = nowMs * 0.001 * MOTION_SCALE;
        const cameraOrbitX =
          Math.sin(time * 0.018) * logicalWidth * 0.15 +
          Math.cos(time * 0.006) * logicalWidth * 0.06 +
          Math.sin(time * 0.041) * logicalWidth * 0.025;
        const cameraOrbitY =
          Math.cos(time * 0.016) * logicalHeight * 0.13 +
          Math.sin(time * 0.009) * logicalHeight * 0.05 +
          Math.cos(time * 0.038) * logicalHeight * 0.02;
        const centerX = logicalWidth * 0.5 + cameraOrbitX;
        const centerY = logicalHeight * 0.5 + cameraOrbitY;
        const cameraDistance = Math.max(logicalWidth, logicalHeight) * 2.8;
        const zoom = 0.58;

        ctx.clearRect(0, 0, logicalWidth, logicalHeight);
        const sky = ctx.createLinearGradient(0, 0, logicalWidth, logicalHeight);
        sky.addColorStop(0, rgba(palette.deep, 1));
        sky.addColorStop(0.5, rgba(palette.shadow, 1));
        sky.addColorStop(1, rgba(palette.deep, 1));
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, logicalWidth, logicalHeight);

        const atmosphere = ctx.createRadialGradient(
          centerX * 0.96,
          centerY * 0.96,
          Math.max(24, Math.min(logicalWidth, logicalHeight) * 0.08),
          centerX,
          centerY,
          Math.max(logicalWidth, logicalHeight) * 0.92,
        );
        atmosphere.addColorStop(0, rgba(palette.primary, 0.04));
        atmosphere.addColorStop(0.52, rgba(palette.secondary, 0.025));
        atmosphere.addColorStop(1, rgba(palette.deep, 0));
        ctx.fillStyle = atmosphere;
        ctx.fillRect(0, 0, logicalWidth, logicalHeight);

        ctx.save();
        ctx.globalCompositeOperation = "lighter";

        for (let i = 0; i < bands.length; i += 1) {
          const band = bands[i];
          const ringTilt = band.tiltX + Math.sin(time * 0.024 + band.phase) * 0.11;
          const ringLean = band.tiltY + Math.cos(time * 0.02 + band.phase) * 0.09;
          const sampleCount = Math.max(48, Math.floor(72 * band.density));
          // Project directly into the frame scratch buffer — no per-band
          // allocation or copy.
          const path = buffers.allocScratchF32(sampleCount * 3 * 2);
          buildOrbitPath(
            band,
            time,
            sampleCount,
            ringTilt,
            ringLean,
            cameraDistance,
            centerX,
            centerY,
            zoom,
            path,
          );

          const rgb = i % 2 === 0 ? palette.primary : palette.secondary;

          drawFadedOrbitPath(
            ctx,
            path,
            sampleCount * 3,
            rgb,
            band.width,
            0.46,
          );
        }

        for (let i = 0; i < dots.length; i += 1) {
          const dot = dots[i];
          const band = bands[dot.bandIndex];
          const orbitTime = time * (0.03 + dot.depth * 0.01);
          const angle = dot.angle + orbitTime + dot.phase * 0.22;
          const ringRadiusX = band.radiusX * (0.98 + Math.sin(time * 0.02 + band.phase) * 0.02);
          const ringRadiusY = band.radiusY * (0.98 + Math.cos(time * 0.018 + band.phase) * 0.015);
          const fieldLift = sampleFieldLift(band, time, angle);
          const x = Math.cos(angle) * ringRadiusX * dot.radiusJitter;
          const y = Math.sin(angle) * ringRadiusY * dot.radiusJitter + fieldLift;
          const z =
            Math.sin(angle + band.phase) * ringRadiusX * 0.2 +
            Math.cos(angle * 2 - band.phase) * ringRadiusY * 0.16 +
            dot.depth * 42 +
            Math.sin(time * 0.08 + dot.phase) * 18;

          const projected = projectPoint(
            x,
            y,
            z,
            centerX,
            centerY,
            cameraDistance,
            zoom,
          );

          const alpha = 0.09 + (Math.sin(time * 0.68 + dot.phase) * 0.5 + 0.5) * (0.2 + dot.depth * 0.12);
          const rgb = dot.tint > 0.45 ? palette.highlight : palette.soft;
          ctx.beginPath();
          ctx.arc(projected.x, projected.y, dot.size * projected.perspective, 0, Math.PI * 2);
          ctx.fillStyle = rgba(rgb, alpha);
          ctx.fill();
        }
        const sweep = ctx.createLinearGradient(0, 0, logicalWidth, 0);
        sweep.addColorStop(0, rgba(palette.primary, 0.02));
        sweep.addColorStop(0.35, rgba(palette.highlight, 0.01));
        sweep.addColorStop(0.7, rgba(palette.secondary, 0.015));
        sweep.addColorStop(1, rgba(palette.primary, 0.02));
        ctx.fillStyle = sweep;
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
    }, [palette]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full select-none pointer-events-none overflow-hidden" />;
}





