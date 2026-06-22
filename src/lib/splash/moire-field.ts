import { clamp, rgba } from "./math";
import type { SplashPalette } from "./color";

export type MoireBand = {
  x: number;
  y: number;
  radius: number;
  aspect: number;
  tilt: number;
  phase: number;
  opacity: number;
  thickness: number;
  hue: number;
  loops: number;
  drift: number;
  speckle: number;
};

function stableHash(value: number) {
  const scaled = Math.floor(value * 9973);
  return ((scaled ^ (scaled >>> 16)) * 2246822519) >>> 0;
}

function seededValue(seed: number) {
  const hashed = stableHash(seed);
  return (hashed % 10000) / 10000;
}

function drawClosedShape(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radiusX: number,
  radiusY: number,
  tilt: number,
  phase: number,
  wobble: number,
  spin: number,
) {
  const pointCount = 32;
  ctx.beginPath();
  for (let i = 0; i <= pointCount; i += 1) {
    const t = (i / pointCount) * Math.PI * 2;
    const local = t + tilt;
    const ripples = Math.sin(t * 3 + phase) * wobble + Math.cos(t * 5 - phase * 0.7) * wobble * 0.5;
    const bloom = 1 + Math.sin(t * 2 + spin) * wobble * 0.34;
    const x = cx + Math.cos(local) * radiusX * bloom + Math.sin(t * 7 + phase) * radiusX * wobble * 0.1;
    const y = cy + Math.sin(local) * radiusY * (1 + ripples * 0.55) + Math.cos(t * 4 - phase) * radiusY * wobble * 0.1;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

export function buildMoireBands(width: number, height: number) {
  const bands: MoireBand[] = [];
  const cols = 6;
  const rows = 5;
  const xStep = width / (cols + 1);
  const yStep = height / (rows + 1);
  const radiusBase = Math.min(width, height) * 0.17;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const gx = (col - 0.5) / (cols - 2);
      const gy = (row - 0.35) / (rows - 1.2);
      const seed = row * 17 + col * 31 + 97;
      const j1 = seededValue(seed * 1.3) - 0.5;
      const j2 = seededValue(seed * 2.1 + 7.7) - 0.5;
      const j3 = seededValue(seed * 3.7 + 4.2) - 0.5;
      const x = gx * width + j1 * xStep * 0.6 + Math.sin((gy + 0.2) * Math.PI * 2) * width * 0.018;
      const y = gy * height + j2 * yStep * 0.5 + Math.cos((gx + 0.15) * Math.PI * 2) * height * 0.016;

      bands.push({
        x,
        y,
        radius: radiusBase * (0.78 + seededValue(seed * 5.1) * 0.84),
        aspect: 1.08 + j3 * 0.42,
        tilt: j1 * 1.2 + j2 * 0.6,
        phase: seed * 0.11,
        opacity: 0.2 + seededValue(seed * 7.9) * 0.2,
        thickness: 0.95 + seededValue(seed * 9.1) * 0.72,
        hue: seed % 4,
        loops: 1 + Math.floor(seededValue(seed * 2.3) * 2),
        drift: 0.45 + seededValue(seed * 4.7) * 0.9,
        speckle: 0.08 + seededValue(seed * 6.1) * 0.12,
      });
    }
  }

  return bands;
}

export function drawMoireField({
  ctx,
  width,
  height,
  timeSeconds,
  bands,
  accentBlend = 0,
  palette,
}: {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  timeSeconds: number;
  bands: MoireBand[];
  accentBlend?: number;
  palette: SplashPalette;
}) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = rgba(palette.deep, 1);
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalCompositeOperation = "source-over";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  const blurPulse = Math.max(0, Math.sin(timeSeconds * 0.11 + 0.6) * 0.5 + 0.5);
  const fieldBlur = blurPulse > 0.72 ? 1.25 + blurPulse * 1.25 : 0;

  const colors = [palette.primary, palette.secondary, palette.tertiary, palette.quaternary];

  for (let i = 0; i < bands.length; i += 1) {
    const band = bands[i];
    const cxDrift =
      Math.cos(timeSeconds * 0.17 * band.drift + band.phase) * band.radius * 0.14 +
      Math.sin(timeSeconds * 0.13 + band.phase * 0.7) * band.radius * 0.08;
    const cyDrift =
      Math.sin(timeSeconds * 0.15 * band.drift + band.phase * 0.8) * band.radius * 0.11 +
      Math.cos(timeSeconds * 0.09 + band.phase * 0.5) * band.radius * 0.07;
    const cx = band.x + cxDrift;
    const cy = band.y + cyDrift;

    const horizontal = Math.cos((cx / Math.max(1, width)) * Math.PI * 2 * 1.7 + timeSeconds * 0.36 + band.phase);
    const vertical = Math.cos((cy / Math.max(1, height)) * Math.PI * 2 * 1.3 - timeSeconds * 0.28 + band.phase * 1.2);
    const diagonal = Math.cos(((cx - cy) / Math.max(1, Math.min(width, height) * 0.42)) - timeSeconds * 0.2 + band.phase * 0.85);
    const moire = (horizontal * 0.44 + vertical * 0.36 + diagonal * 0.2);
    const active = (moire + 1) * 0.5;
    const baseOpacity = clamp(band.opacity + accentBlend * 0.18 + active * 0.08, 0, 1);

    const rgb = colors[band.hue % colors.length];
    const primaryGradient = ctx.createRadialGradient(
      cx - band.radius * 0.12,
      cy - band.radius * 0.08,
      Math.max(1, band.radius * 0.08),
      cx,
      cy,
      band.radius * 1.35,
    );
    primaryGradient.addColorStop(0, rgba(rgb, baseOpacity * 0.28));
    primaryGradient.addColorStop(0.45, rgba(colors[(band.hue + 1) % colors.length], baseOpacity * 0.14));
    primaryGradient.addColorStop(1, rgba(palette.deep, 0));
    const loopPhase = band.phase;
    const spread = band.radius * (0.9 + active * 0.12);
    const rx = spread * band.aspect;
    const ry = spread * (1 / Math.max(0.76, band.aspect)) * (0.76 + active * 0.18);
    const wobble = 0.07 + active * 0.08 + band.speckle * 0.18;
    const spin = timeSeconds * (0.22 + band.drift * 0.12) + loopPhase;

    drawClosedShape(ctx, cx, cy, rx, ry, band.tilt + timeSeconds * 0.015, loopPhase, wobble, spin);
    ctx.filter = fieldBlur ? `blur(${fieldBlur}px)` : "none";
    ctx.fillStyle = primaryGradient;
    ctx.fill();
    ctx.filter = "none";
  }

  ctx.globalCompositeOperation = "source-over";
  if (fieldBlur) {
    ctx.filter = `blur(${fieldBlur * 0.35}px)`;
  }
  ctx.fillStyle = rgba(palette.deep, 0.05);
  ctx.fillRect(0, 0, width, height);
  ctx.filter = "none";
  ctx.restore();
}
