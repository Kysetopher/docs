"use client";

import * as React from "react";
import { createAnimationBuffers, startAnimationLoop } from "@/lib/splash/animation";
import { createSplashPalette } from "@/lib/splash/color";
import { hexPoints } from "@/lib/splash/geometry";
import { rgba } from "@/lib/splash/math";

const PERIOD_R_BASE = 220;
const PERIOD_D_BASE = 340;
const PERIOD_R_JITTER = 0;
const PERIOD_D_JITTER = 0;
const DRIFT_SPEED_R = 0.047;
const DRIFT_SPEED_D = 0.029;
const TARGET_FPS = 30;
const FRAME_INTERVAL_MS = 1000 / TARGET_FPS;

type HexCell = {
  x: number;
  y: number;
  phase: number;
  colorIndex: number;
};

function stableIndexFromCoords(x: number, y: number, mod: number) {
  if (mod <= 0) return 0;
  const xi = Math.round(x * 10);
  const yi = Math.round(y * 10);
  const hash = ((xi * 73856093) ^ (yi * 19349663)) >>> 0;
  return hash % mod;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function HexLatticeSplash({ color = "#38bdf8" }: { color?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const palette = React.useMemo(() => createSplashPalette(color), [color]);
  const tones = React.useMemo(
    () => [palette.primary, palette.secondary, palette.tertiary, palette.quaternary],
    [palette],
  );

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let logicalWidth = 0;
    let logicalHeight = 0;
    let logicalDpr = 1;
    const buffers = createAnimationBuffers(32768);

    let cells: HexCell[] = [];

    const buildMesh = () => {
      cells = [];
      const baseRadius = Math.max(12, Math.min(logicalWidth, logicalHeight) * 0.045);
      const vertexSpacingX = Math.sqrt(3) * baseRadius;
      const vertexSpacingY = 1.5 * baseRadius;
      const cols = Math.ceil(logicalWidth / vertexSpacingX) + 8;
      const rows = Math.ceil(logicalHeight / vertexSpacingY) + 8;

      for (let row = 0; row < rows; row += 1) {
        const rowOffset = row % 2 === 0 ? 0 : vertexSpacingX / 2;
        for (let col = 0; col < cols; col += 1) {
          const x = col * vertexSpacingX + rowOffset - vertexSpacingX * 2;
          const y = row * vertexSpacingY - vertexSpacingY * 2;

          cells.push({
            x,
            y,
            phase: stableIndexFromCoords(x * 0.37, y * 1.91, 1000) * 0.17,
            colorIndex: stableIndexFromCoords(x * 1.11, y * 0.73, tones.length),
          });
        }
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.floor(rect.width));
      const nextHeight = Math.max(1, Math.floor(rect.height));
      const nextDpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

      if (nextWidth === logicalWidth && nextHeight === logicalHeight && nextDpr === logicalDpr) {
        return;
      }

      logicalWidth = nextWidth;
      logicalHeight = nextHeight;
      logicalDpr = nextDpr;

      canvas.width = Math.floor(logicalWidth * logicalDpr);
      canvas.height = Math.floor(logicalHeight * logicalDpr);
      ctx.setTransform(logicalDpr, 0, 0, logicalDpr, 0, 0);

      buildMesh();
    };

    const stopLoop = startAnimationLoop({
      frameBudgetMs: FRAME_INTERVAL_MS,
      onFrame(timeMs: number) {
        if (!logicalWidth || !logicalHeight) return;
        buffers.beginFrame();
        const t = timeMs * 0.001;

        const periodR = PERIOD_R_BASE + PERIOD_R_JITTER * Math.sin(t * DRIFT_SPEED_R * Math.PI * 2);
        const periodD = PERIOD_D_BASE + PERIOD_D_JITTER * Math.sin(t * DRIFT_SPEED_D * Math.PI * 2);

        const anchorX = logicalWidth * (0.5 + Math.sin(t * 0.11) * 0.18);
        const anchorY = logicalHeight * (0.5 + Math.cos(t * 0.13) * 0.16);
        const shiftR = 0.5 * (anchorX + anchorY);
        const shiftD = anchorX - anchorY;

        const deformedX = buffers.allocScratchF32(cells.length);
        const deformedY = buffers.allocScratchF32(cells.length);
        const deformedWave = buffers.allocScratchF32(cells.length);

        ctx.clearRect(0, 0, logicalWidth, logicalHeight);

        const background = ctx.createLinearGradient(0, 0, logicalWidth, logicalHeight);
        background.addColorStop(0, rgba(palette.deep, 1));
        background.addColorStop(0.5, rgba(palette.shadow, 1));
        background.addColorStop(1, rgba(palette.deep, 1));
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, logicalWidth, logicalHeight);

        for (let i = 0; i < cells.length; i += 1) {
          const cell = cells[i];
          const dx = cell.x - anchorX;
          const dy = cell.y - anchorY;

          const radial = Math.cos((Math.hypot(dx, dy) + shiftR) / periodR);
          const diagonal = Math.cos((dx + dy + shiftD) / periodD);
          const moire = 0.5 * (radial + diagonal);
          const wave01 = (moire + 1) / 2;

          const angle = Math.atan2(dy, dx);
          const localPush = (wave01 - 0.5) * 0.9 * Math.max(12, Math.min(logicalWidth, logicalHeight) * 0.045);
          const driftA = Math.sin(t * 1.1 + cell.phase) * 2.4;
          const driftB = Math.cos(t * 0.8 + cell.phase * 1.3) * 2.4;

          const px = cell.x + Math.cos(angle) * localPush + driftA;
          const py = cell.y + Math.sin(angle) * localPush + driftB;

          deformedX[i] = px;
          deformedY[i] = py;
          deformedWave[i] = wave01;
        }

        ctx.globalCompositeOperation = "source-over";
        const stripeCount = Math.max(1, Math.ceil(logicalHeight / 18));
        for (let row = 0; row < stripeCount; row += 1) {
          const strip = row / Math.max(1, stripeCount - 1);
          const tone = row % 3 === 0 ? palette.primary : row % 3 === 1 ? palette.secondary : palette.tertiary;
          const ribbonTop = logicalHeight * strip - 14;
          const ribbonBottom = logicalHeight * strip + 16;
          ctx.fillStyle = rgba(tone, 0.03 + strip * 0.05);
          ctx.fillRect(0, ribbonTop, logicalWidth, ribbonBottom - ribbonTop);
        }

        ctx.globalCompositeOperation = "lighter";
        for (let i = 0; i < cells.length; i += 1) {
          const cell = cells[i];
          const wave01 = deformedWave[i];
          const cx = deformedX[i];
          const cy = deformedY[i];
          const size = Math.max(12, Math.min(logicalWidth, logicalHeight) * 0.045);
          const radius = size * (0.92 + wave01 * 0.18);
          const points = hexPoints(cx, cy, radius);
          const inset = lerp(0.16, 0.02, wave01) * radius;

          const insetPoints = points.map(([px, py]) => {
            const vx = px - cx;
            const vy = py - cy;
            const len = Math.hypot(vx, vy) || 1;
            return {
              x: px - (vx / len) * inset,
              y: py - (vy / len) * inset,
            };
          });

          const rgb = tones[cell.colorIndex % tones.length];
          const fillAlpha = 0.02 + wave01 * 0.08;
          const strokeAlpha = 0.12 + wave01 * 0.22;

          ctx.save();
          ctx.lineJoin = "round";
          ctx.lineCap = "round";

          ctx.beginPath();
          ctx.moveTo(insetPoints[0].x, insetPoints[0].y);
          for (let j = 1; j < insetPoints.length; j += 1) {
            ctx.lineTo(insetPoints[j].x, insetPoints[j].y);
          }
          ctx.closePath();
          ctx.fillStyle = rgba(rgb, fillAlpha);
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(insetPoints[0].x, insetPoints[0].y);
          for (let j = 1; j < insetPoints.length; j += 1) {
            ctx.lineTo(insetPoints[j].x, insetPoints[j].y);
          }
          ctx.closePath();
          ctx.strokeStyle = rgba(rgb, strokeAlpha);
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(points[0][0], points[0][1]);
          for (let j = 1; j < points.length; j += 1) {
            ctx.lineTo(points[j][0], points[j][1]);
          }
          ctx.closePath();
          ctx.strokeStyle = rgba(palette.highlight, 0.04 + wave01 * 0.07);
          ctx.lineWidth = 0.6 + cell.phase * 0.02;
          ctx.stroke();

          ctx.restore();
        }

        const seam = ctx.createLinearGradient(0, 0, logicalWidth, logicalHeight);
        seam.addColorStop(0, rgba(palette.highlight, 0.08));
        seam.addColorStop(0.45, rgba(palette.soft, 0.05));
        seam.addColorStop(1, rgba(palette.deep, 0.22));
        ctx.fillStyle = seam;
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
  }, [palette, tones]);

  return (
    <div className="absolute inset-0" style={{ backgroundColor: `rgb(${palette.deep})` }}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full select-none pointer-events-none overflow-hidden" />
    </div>
  );
}