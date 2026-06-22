import { createAnimationBuffers } from "./animation";
import { rgba, stableIndexFromNumber } from "./math";
import type { SplashPalette } from "./color";

export type WaveStrand = {
  baseY: number;
  amplitude: number;
  wavelength: number;
  speed: number;
  thickness: number;
  phase: number;
  colorIndex: number;
  curveInfluence: number;
  localInfluence: number;
  detailInfluence: number;
  opacityPhase: number;
  pointCount: number;
  baseX: Float32Array;
  animatedXY: Float32Array;
};

export function buildWaveStrands({
  width,
  height,
  paletteSize,
  buffers = createAnimationBuffers(16384),
}: {
  width: number;
  height: number;
  paletteSize: number;
  buffers?: ReturnType<typeof createAnimationBuffers>;
}) {
  const strands: WaveStrand[] = [];
  const cellSize = Math.max(24, Math.min(width, height) * 0.045);
  const strandGap = Math.max(24, Math.floor(cellSize * 2.1));
  const pointGap = Math.max(18, Math.floor(cellSize * 0.9));
  const strandCount = Math.ceil((height + strandGap * 4) / strandGap);
  const startX = -pointGap * 4;
  const endX = width + pointGap * 4;
  const pointCount = Math.floor((endX - startX) / pointGap) + 1;

  buffers.clearPersistent();
  for (let i = -2; i < strandCount; i += 1) {
    const baseY = i * strandGap;
    const normalizedBand = ((i % 9) + 9) % 9;
    const baseX = buffers.getPersistentF32(`waveform-baseX-${i + 2}`, pointCount);
    const animatedXY = buffers.getPersistentF32(`waveform-animatedXY-${i + 2}`, pointCount * 2);
    for (let p = 0; p < pointCount; p += 1) {
      baseX[p] = startX + p * pointGap;
      animatedXY[p * 2] = baseX[p];
      animatedXY[p * 2 + 1] = baseY;
    }

    strands.push({
      baseY,
      amplitude: cellSize * (0.28 + normalizedBand * 0.04),
      wavelength: 280 + (((i % 7) + 7) % 7) * 72,
      speed: 0.06 + (((i % 8) + 8) % 8) * 0.022,
      thickness: 2.2 + (((i % 4) + 4) % 4) * 0.4,
      phase: i * 0.82,
      opacityPhase: i * 0.41,
      colorIndex: stableIndexFromNumber(baseY * 0.173, paletteSize),
      curveInfluence: 0.82 + (((i % 5) + 5) % 5) * 0.08,
      localInfluence: 0.76 + (((i % 6) + 6) % 6) * 0.05,
      detailInfluence: 0.4 + (((i % 7) + 7) % 7) * 0.04,
      pointCount,
      baseX,
      animatedXY,
    });
  }

  return strands;
}

export function buildWaveFrame({
  timeSeconds,
  width,
  height,
  ctx,
  buffers,
  palette,
}: {
  timeSeconds: number;
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  buffers: ReturnType<typeof createAnimationBuffers>;
  palette: SplashPalette;
}) {
  buffers.beginFrame();
  const pulse = 0.5 + 0.5 * Math.sin(timeSeconds * 0.82);
  const slowPulse = 0.5 + 0.5 * Math.sin(timeSeconds * 0.19 + 1.1);
  const anchorX = width * (0.5 + Math.sin(timeSeconds * 0.07) * 0.08);
  const anchorY = height * (0.5 + Math.cos(timeSeconds * 0.05) * 0.08);

  ctx.clearRect(0, 0, width, height);
  const sky = ctx.createLinearGradient(0, 0, width, height);
  sky.addColorStop(0, rgba(palette.deep, 1));
  sky.addColorStop(0.52, rgba(palette.shadow, 0.98));
  sky.addColorStop(1, rgba(palette.deep, 1));
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  const glow = ctx.createRadialGradient(
    width * 0.5,
    height * 0.45,
    Math.max(20, Math.min(width, height) * 0.08),
    width * 0.5,
    height * 0.5,
    Math.max(width, height) * 0.88,
  );
  glow.addColorStop(0, rgba(palette.primary, 0.07 + pulse * 0.05));
  glow.addColorStop(0.45, rgba(palette.secondary, 0.05 + slowPulse * 0.03));
  glow.addColorStop(1, rgba(palette.deep, 0));
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  return { pulse, slowPulse, anchorX, anchorY };
}
