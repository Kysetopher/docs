"use client";

import * as React from "react";
import { createAnimationBuffers, startAnimationLoop } from "@/lib/splash/animation";
import { createSplashPalette } from "@/lib/splash/color";
import { hexPoints } from "@/lib/splash/geometry";
import { rgba } from "@/lib/splash/math";

type HexCell = {
  x: number;
  y: number;
  r: number;
  phase: number;
  hue: number;
};

function buildCells(width: number, height: number) {
  const cells: HexCell[] = [];
  const radius = Math.max(20, Math.min(width, height) * 0.08);
  const colStep = radius * 1.74;
  const rowStep = radius * 1.5;
  const cols = Math.ceil(width / colStep) + 5;
  const rows = Math.ceil(height / rowStep) + 5;
  const startX = -colStep * 2;
  const startY = -rowStep * 2;

  for (let row = 0; row < rows; row += 1) {
    const offset = row % 2 === 0 ? 0 : radius * 0.86;
    for (let col = 0; col < cols; col += 1) {
      const seed = row * 31 + col * 43;
      cells.push({
        x: startX + col * colStep + offset,
        y: startY + row * rowStep,
        r: radius * (0.92 + ((seed * 11) % 13) / 100),
        phase: ((seed * 97) % 1000) / 1000 * Math.PI * 2,
        hue: seed % 4,
      });
    }
  }

  return cells;
}

export function HexCurrentSplash({ color = "#38bdf8" }: { color?: string }) {
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
      cells = buildCells(logicalWidth, logicalHeight);
    };

    const stopLoop = startAnimationLoop({
      frameBudgetMs: 1000 / 30,
      onFrame(nowMs) {
        if (!logicalWidth || !logicalHeight) return;
        buffers.beginFrame();
        const t = nowMs * 0.001 * 0.18;
        const anchorX = logicalWidth * (0.5 + Math.sin(t * 0.13) * 0.1);
        const anchorY = logicalHeight * (0.5 + Math.cos(t * 0.11) * 0.08);

        ctx.clearRect(0, 0, logicalWidth, logicalHeight);
        ctx.fillStyle = rgba(palette.deep, 1);
        ctx.fillRect(0, 0, logicalWidth, logicalHeight);

        for (let i = 0; i < cells.length; i += 1) {
          const cell = cells[i];
          const dx = cell.x - anchorX;
          const dy = cell.y - anchorY;
          const radial = Math.hypot(dx, dy);
          const wave = Math.cos((radial / Math.max(1, Math.min(logicalWidth, logicalHeight) * 0.22)) + t * 0.7 + cell.phase) * 0.5 + 0.5;
          const pulse = Math.sin(t * 0.5 + cell.phase) * 0.5 + 0.5;
          const x = cell.x + Math.cos(t * 0.32 + cell.phase) * cell.r * 0.08;
          const y = cell.y + Math.sin(t * 0.27 - cell.phase) * cell.r * 0.08;
          const points = hexPoints(x, y, cell.r * (0.92 + wave * 0.16));
          const rgb = cell.hue % 2 === 0 ? palette.primary : palette.secondary;
          const fill = ctx.createRadialGradient(x, y, cell.r * 0.05, x, y, cell.r * 1.3);
          fill.addColorStop(0, rgba(rgb, 0.16 + pulse * 0.12));
          fill.addColorStop(0.55, rgba(palette.soft, 0.04 + wave * 0.05));
          fill.addColorStop(1, rgba(palette.deep, 0));

          ctx.save();
          ctx.globalCompositeOperation = "lighter";
          ctx.filter = pulse > 0.72 ? "blur(1.6px)" : "none";
          ctx.beginPath();
          ctx.moveTo(points[0][0], points[0][1]);
          for (let p = 1; p < points.length; p += 1) ctx.lineTo(points[p][0], points[p][1]);
          ctx.closePath();
          ctx.fillStyle = fill;
          ctx.fill();
          ctx.filter = "none";
          ctx.strokeStyle = rgba(rgb, 0.1 + wave * 0.08);
          ctx.lineWidth = 0.52 + wave * 0.12;
          ctx.stroke();
          ctx.restore();
        }

        const bloom = ctx.createRadialGradient(
          logicalWidth * 0.5,
          logicalHeight * 0.5,
          Math.max(36, Math.min(logicalWidth, logicalHeight) * 0.16),
          logicalWidth * 0.5,
          logicalHeight * 0.5,
          Math.max(logicalWidth, logicalHeight) * 0.92,
        );
        bloom.addColorStop(0, rgba(palette.highlight, 0.02));
        bloom.addColorStop(1, rgba(palette.deep, 0.42));
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

  return (
    <div className="absolute inset-0" style={{ backgroundColor: `rgb(${palette.deep})` }}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full select-none pointer-events-none overflow-hidden" />
    </div>
  );
}
