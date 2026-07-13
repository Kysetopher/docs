"use client";

import * as React from "react";

import { createAnimationBuffers, startAnimationLoop } from "@/lib/splash/animation";
import { createSplashPalette } from "@/lib/splash/color";
import {
  BAND_FRAME_STRIDE,
  buildCubeMoireBands,
  computeBandFrameCache,
  sampleBandValueCached,
  type CubeMoireBand,
} from "@/lib/splash/cube-moire-texture";
import { rgba } from "@/lib/splash/math";

const TARGET_FPS = 30;
const FRAME_INTERVAL_MS = 1000 / TARGET_FPS;



// Band math is identical to the shared lib sampler; per-frame constants
// (drift, rotation, radii) are precomputed once per frame instead of per grid point.
function sampleDepthField(
  bands: CubeMoireBand[],
  bandFrame: Float32Array,
  x: number,
  y: number,
  timeSeconds: number,
) {
  let value = 0;
  for (let i = 0; i < bands.length; i += 1) {
    value += sampleBandValueCached(bands[i], bandFrame, i * BAND_FRAME_STRIDE, x, y, timeSeconds);
  }

  const sweep =
    0.12 * Math.sin((x + y) * 0.0038 + timeSeconds * 0.32) +
    0.08 * Math.cos((x - y) * 0.0029 - timeSeconds * 0.24) +
    0.04 * Math.sin(x * 0.0018 + y * 0.0023 + timeSeconds * 0.18);
  return value + sweep;
}

export function BathymetrySplash({ color = "#5dd6ff" }: { color?: string }) {
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
        const timeSeconds = nowMs * 0.001 * 0.24;

        ctx.clearRect(0, 0, logicalWidth, logicalHeight);
        ctx.fillStyle = rgba(palette.deep, 1);
        ctx.fillRect(0, 0, logicalWidth, logicalHeight);

        const contourCount = 11;
        const step = Math.max(8, Math.min(logicalWidth, logicalHeight) / 58);
        const cols = Math.max(2, Math.ceil(logicalWidth / step) + 1);
        const rows = Math.max(2, Math.ceil(logicalHeight / step) + 1);
        const field = buffers.allocScratchF32(cols * rows);
        const bandFrame = buffers.allocScratchF32(bands.length * BAND_FRAME_STRIDE);
        computeBandFrameCache(bands, timeSeconds, bandFrame);

        let min = Number.POSITIVE_INFINITY;
        let max = Number.NEGATIVE_INFINITY;
        for (let row = 0; row < rows; row += 1) {
          const py = row * step;
          for (let col = 0; col < cols; col += 1) {
            const px = col * step;
            const value = sampleDepthField(bands, bandFrame, px, py, timeSeconds);
            const index = row * cols + col;
            field[index] = value;
            if (value < min) min = value;
            if (value > max) max = value;
          }
        }
        const range = Math.max(1e-5, max - min);
        for (let i = 0; i < cols * rows; i += 1) {
          field[i] = (field[i] - min) / range;
        }

        ctx.globalCompositeOperation = "source-over";
        for (let row = 0; row < rows - 1; row += 1) {
          for (let col = 0; col < cols - 1; col += 1) {
            const index = row * cols + col;
            const value = field[index];
            const band = Math.min(contourCount - 1, Math.floor(value * contourCount));
            const tone = band % 3 === 0 ? palette.primary : band % 3 === 1 ? palette.secondary : palette.tertiary;
            const alpha = 0.035 + value * 0.1;

            ctx.beginPath();
            ctx.rect(col * step, row * step, step, step);
            ctx.fillStyle = rgba(tone, alpha);
            ctx.fill();
          }
        }

        ctx.globalCompositeOperation = "lighter";
        const levels = [0.14, 0.24, 0.34, 0.46, 0.58, 0.7, 0.82];
        for (let levelIndex = 0; levelIndex < levels.length; levelIndex += 1) {
          const level = levels[levelIndex];
          const rgb = levelIndex % 2 === 0 ? palette.highlight : palette.soft;
          ctx.strokeStyle = rgba(rgb, 0.08 + levelIndex * 0.02);
          ctx.lineWidth = 1 + levelIndex * 0.08;
          ctx.beginPath();
          for (let row = 0; row < rows; row += 1) {
            const y = row * step;
            let started = false;
            for (let col = 0; col < cols; col += 1) {
              const x = col * step;
              const value = field[row * cols + col];
              if (Math.abs(value - level) < 0.06) {
                const mx = x + Math.sin((x + y) * 0.01 + timeSeconds * 0.9) * 1.4;
                const my = y + Math.cos((x - y) * 0.01 - timeSeconds * 0.7) * 1.2;
                if (!started) {
                  ctx.moveTo(mx, my);
                  started = true;
                } else {
                  ctx.lineTo(mx, my);
                }
              }
            }
          }
          ctx.stroke();
        }

        const bloom = ctx.createRadialGradient(logicalWidth * 0.5, logicalHeight * 0.52, 0, logicalWidth * 0.5, logicalHeight * 0.52, Math.max(logicalWidth, logicalHeight) * 0.92);
        bloom.addColorStop(0, rgba(palette.highlight, 0.08));
        bloom.addColorStop(0.52, rgba(palette.soft, 0.04));
        bloom.addColorStop(1, rgba(palette.deep, 0.26));
        ctx.fillStyle = bloom;
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
