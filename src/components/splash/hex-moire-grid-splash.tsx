"use client";

import * as React from "react";
import { createAnimationBuffers, startAnimationLoop } from "@/lib/splash/animation";
import { createSplashPalette } from "@/lib/splash/color";
import { rgba } from "@/lib/splash/math";

// Unit hexagon vertex directions, precomputed once (avoids per-cell array
// allocations and degree→radian trig in the render loop).
const HEX_UNIT = Array.from({ length: 6 }, (_, index) => {
  const angle = (Math.PI / 180) * (60 * index + 30);
  return [Math.cos(angle), Math.sin(angle)] as const;
});

function traceHexPath(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(cx + HEX_UNIT[0][0] * r, cy + HEX_UNIT[0][1] * r);
  for (let j = 1; j < 6; j += 1) {
    ctx.lineTo(cx + HEX_UNIT[j][0] * r, cy + HEX_UNIT[j][1] * r);
  }
  ctx.closePath();
}

const TARGET_FPS = 30;
const FRAME_INTERVAL_MS = 1000 / TARGET_FPS;

type HexCell = {
  key: string;
  x: number;
  y: number;
  r: number;
  phase: number;
  opacity: number;
  thickness: number;
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function HexMoireGridSplash({ color = "#38bdf8" }: { color?: string }) {
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
    let cells: HexCell[] = [];

    const buildCells = () => {
      const radius = Math.max(26, Math.min(logicalWidth, logicalHeight) / 10.5);
      const colStep = radius * 1.7;
      const rowStep = radius * 1.45;
      const cols = Math.ceil(logicalWidth / colStep) + 6;
      const rows = Math.ceil(logicalHeight / rowStep) + 6;
      const startX = -colStep * 2;
      const startY = -rowStep * 2;
      const nextCells: HexCell[] = [];

      for (let row = 0; row < rows; row += 1) {
        const rowOffset = row % 2 === 0 ? 0 : radius * 0.85;
        for (let col = 0; col < cols; col += 1) {
          const x = startX + col * colStep + rowOffset;
          const y = startY + row * rowStep;
          const hash = row * 100 + col;
          nextCells.push({
            key: `hex-${row}-${col}`,
            x,
            y,
            r: radius * (0.9 + ((hash * 17) % 7) * 0.01),
            phase: ((hash * 2654435761) >>> 0) / 4294967296 * Math.PI * 2,
            opacity: 0.14 + ((hash * 31) % 100) / 100 * 0.22,
            thickness: 0.8 + ((hash * 13) % 100) / 100 * 0.65,
          });
        }
      }

      cells = nextCells;
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
      buildCells();
    };

    const stopLoop = startAnimationLoop({
      visibilityTarget: canvas,
      frameBudgetMs: FRAME_INTERVAL_MS,
      onFrame(nowMs) {
        if (!logicalWidth || !logicalHeight) return;

        buffers.beginFrame();
        ctx.clearRect(0, 0, logicalWidth, logicalHeight);

        const t = nowMs * 0.001;
        const anchorX = logicalWidth * (0.5 + Math.sin(t * 0.11) * 0.18);
        const anchorY = logicalHeight * (0.5 + Math.cos(t * 0.13) * 0.16);
        const shiftR = 0.5 * (anchorX + anchorY);
        const shiftD = anchorX - anchorY;
        const periodR = Math.max(80, logicalWidth * 0.22);
        const periodD = Math.max(120, logicalWidth * 0.34);

        ctx.save();
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = rgba(palette.deep, 1);
        ctx.fillRect(0, 0, logicalWidth, logicalHeight);
        ctx.restore();

        ctx.globalCompositeOperation = "lighter";
        ctx.lineJoin = "round";
        ctx.lineCap = "round";

        for (let i = 0; i < cells.length; i += 1) {
          const cell = cells[i];
          const dx = cell.x - anchorX;
          const dy = cell.y - anchorY;

          const radial = Math.cos((Math.hypot(dx, dy) + shiftR * 0.06) / (periodR / 10));
          const diagonal = Math.cos(((dx + dy) + shiftD * 0.04) / (periodD / 10));
          const moire = 0.5 * (radial + diagonal);
          const wave01 = (moire + 1) / 2;

          const angle = Math.atan2(dy, dx || 1);
          const localPush = (wave01 - 0.5) * cell.r * 0.95;
          const driftA = Math.sin(t * 1.1 + cell.phase) * cell.r * 0.06;
          const driftB = Math.cos(t * 0.8 + cell.phase * 1.3) * cell.r * 0.06;

          const cx = cell.x + Math.cos(angle) * localPush + driftA;
          const cy = cell.y + Math.sin(angle) * localPush + driftB;
          const radius = cell.r * (0.92 + wave01 * 0.18);
          // Inset vertices sit along the same radial direction, so the inset
          // hexagon is just a smaller radius — no per-vertex work needed.
          const insetRadius = radius - lerp(0.16, 0.02, wave01) * radius;

          const strokeAlpha = 0.10 + wave01 * 0.24;
          const fillAlpha = 0.02 + wave01 * 0.06;
          const glowAlpha = 0.05 + wave01 * 0.09;
          const baseRgb = i % 3 === 0 ? palette.soft : palette.primary;

          // Fill + stroke share a single traced path.
          traceHexPath(ctx, cx, cy, insetRadius);
          ctx.fillStyle = rgba(baseRgb, fillAlpha);
          ctx.fill();
          ctx.strokeStyle = rgba(baseRgb, strokeAlpha);
          ctx.lineWidth = Math.max(0.5, cell.thickness * 0.45);
          ctx.stroke();

          // The outer ring drift is uniform per cell — a translated hexagon.
          traceHexPath(
            ctx,
            cx + Math.cos(cell.phase + t * 0.14) * cell.r * 0.03,
            cy + Math.sin(cell.phase + t * 0.12) * cell.r * 0.03,
            radius,
          );
          ctx.strokeStyle = rgba(palette.highlight, glowAlpha);
          ctx.lineWidth = Math.max(0.35, cell.thickness * 0.26);
          ctx.stroke();
        }
        ctx.globalCompositeOperation = "source-over";

        ctx.save();
        const vignette = ctx.createRadialGradient(
          logicalWidth * 0.5,
          logicalHeight * 0.5,
          Math.max(40, Math.min(logicalWidth, logicalHeight) * 0.18),
          logicalWidth * 0.5,
          logicalHeight * 0.5,
          Math.max(logicalWidth, logicalHeight) * 0.9,
        );
        vignette.addColorStop(0, rgba(palette.highlight, 0));
        vignette.addColorStop(1, rgba(palette.deep, 0.22));
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, logicalWidth, logicalHeight);
        ctx.restore();
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

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: `rgb(${palette.deep})` }}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full select-none overflow-hidden pointer-events-none" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 40%, rgba(${palette.highlight},0) 0, rgba(${palette.deep},0.24) 72%)`,
        }}
      />
    </div>
  );
}
