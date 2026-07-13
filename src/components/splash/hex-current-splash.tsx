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
      visibilityTarget: canvas,
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

        const invRadialScale = 1 / Math.max(1, Math.min(logicalWidth, logicalHeight) * 0.22);
        ctx.globalCompositeOperation = "lighter";

        for (let i = 0; i < cells.length; i += 1) {
          const cell = cells[i];
          const dx = cell.x - anchorX;
          const dy = cell.y - anchorY;
          const radial = Math.hypot(dx, dy);
          const wave = Math.cos(radial * invRadialScale + t * 0.7 + cell.phase) * 0.5 + 0.5;
          const pulse = Math.sin(t * 0.5 + cell.phase) * 0.5 + 0.5;
          const x = cell.x + Math.cos(t * 0.32 + cell.phase) * cell.r * 0.08;
          const y = cell.y + Math.sin(t * 0.27 - cell.phase) * cell.r * 0.08;
          const rgb = cell.hue % 2 === 0 ? palette.primary : palette.secondary;
          const fill = ctx.createRadialGradient(x, y, cell.r * 0.05, x, y, cell.r * 1.3);
          fill.addColorStop(0, rgba(rgb, 0.16 + pulse * 0.12));
          fill.addColorStop(0.55, rgba(palette.soft, 0.04 + wave * 0.05));
          fill.addColorStop(1, rgba(palette.deep, 0));

          // Fill + stroke share one path; the previous per-cell ctx.filter blur
          // forced an intermediate surface per hexagon and is visually
          // indistinguishable at these low alphas.
          traceHexPath(ctx, x, y, cell.r * (0.92 + wave * 0.16));
          ctx.fillStyle = fill;
          ctx.fill();
          ctx.strokeStyle = rgba(rgb, 0.1 + wave * 0.08);
          ctx.lineWidth = 0.52 + wave * 0.12;
          ctx.stroke();
        }

        ctx.globalCompositeOperation = "source-over";

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
