"use client";

import * as React from "react";
import { createAnimationBuffers, startAnimationLoop } from "@/lib/splash/animation";
import { createSplashPalette } from "@/lib/splash/color";
import { buildMoireBands, drawMoireField } from "@/lib/splash/moire-field";

const TARGET_FPS = 20;
const FRAME_INTERVAL_MS = 1000 / TARGET_FPS;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const BAND_OPTIONS = {
  columns: 1,
  rows: 3,
  radiusScale: 0.82,
};

export function CelluloseSplash({ color = "#38bdf8" }: { color?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const palette = React.useMemo(() => createSplashPalette(color), [color]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const buffers = createAnimationBuffers(1024);
    let logicalWidth = 0;
    let logicalHeight = 0;
    let logicalDpr = 1;
    let bands = buildMoireBands(1, 1, BAND_OPTIONS);
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.floor(rect.width));
      const nextHeight = Math.max(1, Math.floor(rect.height));
      const nextDpr = Math.max(1, Math.min(1.5, window.devicePixelRatio || 1));
      if (nextWidth === logicalWidth && nextHeight === logicalHeight && nextDpr === logicalDpr) return;

      logicalWidth = nextWidth;
      logicalHeight = nextHeight;
      logicalDpr = nextDpr;
      canvas.width = Math.floor(logicalWidth * logicalDpr);
      canvas.height = Math.floor(logicalHeight * logicalDpr);
      ctx.setTransform(logicalDpr, 0, 0, logicalDpr, 0, 0);
      bands = buildMoireBands(logicalWidth, logicalHeight, BAND_OPTIONS);
    };

    const renderFrame = (nowMs: number) => {
      if (!logicalWidth || !logicalHeight) return;
      buffers.beginFrame();
      drawMoireField({
        ctx,
        width: logicalWidth,
        height: logicalHeight,
        timeSeconds: nowMs * 0.001,
        bands,
        accentBlend: 0.18,
        palette,
      });
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener("resize", resize);
    resize();

    if (reducedMotion) {
      renderFrame(0);
      return () => {
        observer.disconnect();
        window.removeEventListener("resize", resize);
      };
    }

    const stopLoop = startAnimationLoop({
      frameBudgetMs: FRAME_INTERVAL_MS,
      onFrame(nowMs) {
        renderFrame(nowMs);
      },
    });

    return () => {
      stopLoop();
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [palette]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full select-none pointer-events-none overflow-hidden" />;
}