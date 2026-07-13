import { clamp, rgba } from "./math";
import type { SplashPalette } from "./color";

export type CubeMoireBand = {
  baseX: number;
  baseY: number;
  radius: number;
  phase: number;
  skew: number;
  drift: number;
  stretch: number;
  boost: number;
  hue: number;
};

type Segment = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  levelIndex: number;
};

function stableHash(value: number) {
  const scaled = Math.floor(value * 9973);
  return ((scaled ^ (scaled >>> 16)) * 2246822519) >>> 0;
}

function seededValue(seed: number) {
  const hashed = stableHash(seed);
  return (hashed % 10000) / 10000;
}

function interpolate(a: number, b: number, level: number) {
  const denom = b - a;
  if (Math.abs(denom) < 1e-6) return 0.5;
  return clamp((level - a) / denom, 0, 1);
}

function drawSegment(ctx: CanvasRenderingContext2D, segment: Segment) {
  ctx.moveTo(segment.x1, segment.y1);
  ctx.lineTo(segment.x2, segment.y2);
}

function drawCellPath(ctx: CanvasRenderingContext2D, x: number, y: number, step: number) {
  ctx.beginPath();
  ctx.rect(x, y, step, step);
}

// Per-frame band constants (center, rotation, radii) hoisted out of the
// per-gridpoint sampling loop. Stride layout per band:
// [cx, cy, cosS, sinS, invRadius, invCrossDenom, cutoffDistSq]
export const BAND_FRAME_STRIDE = 7;

export function computeBandFrameCache(bands: CubeMoireBand[], timeSeconds: number, out: Float32Array) {
  for (let i = 0; i < bands.length; i += 1) {
    const band = bands[i];
    const driftX =
      Math.cos(timeSeconds * 0.16 * band.drift + band.phase) * band.radius * 0.22 +
      Math.sin(timeSeconds * 0.07 + band.phase * 0.41) * band.radius * 0.07;
    const driftY =
      Math.sin(timeSeconds * 0.12 * band.drift + band.phase * 0.73) * band.radius * 0.18 +
      Math.cos(timeSeconds * 0.09 + band.phase * 0.57) * band.radius * 0.06;
    const crossDenom = Math.max(1, band.radius * band.stretch);
    const cutoff = 3.5 * Math.max(band.radius, crossDenom);
    const o = i * BAND_FRAME_STRIDE;
    out[o] = band.baseX + driftX;
    out[o + 1] = band.baseY + driftY;
    out[o + 2] = Math.cos(band.skew);
    out[o + 3] = Math.sin(band.skew);
    out[o + 4] = 1 / band.radius;
    out[o + 5] = 1 / crossDenom;
    out[o + 6] = cutoff * cutoff;
  }
}

export function sampleBandValueCached(
  band: CubeMoireBand,
  frame: Float32Array,
  o: number,
  x: number,
  y: number,
  timeSeconds: number,
) {
  const dx = x - frame[o];
  const dy = y - frame[o + 1];
  // Beyond the cutoff the gaussian gate is < 3e-4, visually zero — skip.
  if (dx * dx + dy * dy > frame[o + 6]) return 0;

  const cosS = frame[o + 2];
  const sinS = frame[o + 3];
  const rx = dx * cosS - dy * sinS;
  const ry = dx * sinS + dy * cosS;

  const local = rx * frame[o + 4];
  const cross = ry * frame[o + 5];
  const radialSq = local * local + cross * cross;
  const radial = Math.sqrt(radialSq);
  const warp = Math.sin((x + y) * 0.0032 + timeSeconds * 0.18 + band.phase) * 0.15;
  const warp2 = Math.cos((x - y) * 0.0026 - timeSeconds * 0.14 - band.phase * 0.7) * 0.12;
  const w1 = Math.sin(local + warp + timeSeconds * 0.72 + band.phase) * Math.cos(cross - warp2 - timeSeconds * 0.41 - band.phase * 0.33);
  const w2 =
    Math.sin((local * 0.78 + cross * 0.22) - timeSeconds * 0.28 + band.phase * 0.5) *
    Math.cos((cross * 0.84 - local * 0.16) + timeSeconds * 0.53 - band.phase * 0.2);
  const moire = Math.sin(w1 * Math.PI + w2 * Math.PI);
  const core = 0.5 + 0.5 * moire;
  const ripple = 0.5 + 0.5 * Math.sin(radial * 8.2 + timeSeconds * 0.55 + band.phase);
  const gate = Math.exp(-radialSq * 0.68);
  return (core * 0.82 + ripple * 0.18) * gate * band.boost;
}

let sharedBandFrame = new Float32Array(0);

function getBandFrame(bands: CubeMoireBand[], timeSeconds: number) {
  const required = bands.length * BAND_FRAME_STRIDE;
  if (sharedBandFrame.length < required) sharedBandFrame = new Float32Array(required);
  computeBandFrameCache(bands, timeSeconds, sharedBandFrame);
  return sharedBandFrame;
}

function buildSegmentsForLevel(
  field: Float32Array,
  cols: number,
  rows: number,
  step: number,
  level: number,
  levelIndex: number,
) {
  const segments: Segment[] = [];

  for (let row = 0; row < rows - 1; row += 1) {
    for (let col = 0; col < cols - 1; col += 1) {
      const topLeftIndex = row * cols + col;
      const topRightIndex = topLeftIndex + 1;
      const bottomLeftIndex = topLeftIndex + cols;
      const bottomRightIndex = bottomLeftIndex + 1;

      const tl = field[topLeftIndex];
      const tr = field[topRightIndex];
      const bl = field[bottomLeftIndex];
      const br = field[bottomRightIndex];
      const caseIndex = (tl >= level ? 1 : 0) | (tr >= level ? 2 : 0) | (br >= level ? 4 : 0) | (bl >= level ? 8 : 0);

      if (caseIndex === 0 || caseIndex === 15) continue;

      const x = col * step;
      const y = row * step;

      const topT = interpolate(tl, tr, level);
      const rightT = interpolate(tr, br, level);
      const bottomT = interpolate(bl, br, level);
      const leftT = interpolate(tl, bl, level);
      const topX = x + topT * step;
      const topY = y;
      const rightX = x + step;
      const rightY = y + rightT * step;
      const bottomX = x + bottomT * step;
      const bottomY = y + step;
      const leftX = x;
      const leftY = y + leftT * step;
      const center = (tl + tr + bl + br) * 0.25;
      const flip = center >= level;

      switch (caseIndex) {
        case 1:
        case 14:
          segments.push({ x1: leftX, y1: leftY, x2: topX, y2: topY, levelIndex });
          break;
        case 2:
        case 13:
          segments.push({ x1: topX, y1: topY, x2: rightX, y2: rightY, levelIndex });
          break;
        case 3:
        case 12:
          segments.push({ x1: leftX, y1: leftY, x2: rightX, y2: rightY, levelIndex });
          break;
        case 4:
        case 11:
          segments.push({ x1: rightX, y1: rightY, x2: bottomX, y2: bottomY, levelIndex });
          break;
        case 5:
          if (flip) {
            segments.push({ x1: leftX, y1: leftY, x2: topX, y2: topY, levelIndex });
            segments.push({ x1: rightX, y1: rightY, x2: bottomX, y2: bottomY, levelIndex });
          } else {
            segments.push({ x1: leftX, y1: leftY, x2: bottomX, y2: bottomY, levelIndex });
            segments.push({ x1: topX, y1: topY, x2: rightX, y2: rightY, levelIndex });
          }
          break;
        case 6:
        case 9:
          segments.push({ x1: topX, y1: topY, x2: bottomX, y2: bottomY, levelIndex });
          break;
        case 7:
        case 8:
          segments.push({ x1: leftX, y1: leftY, x2: bottomX, y2: bottomY, levelIndex });
          break;
        case 10:
          if (flip) {
            segments.push({ x1: topX, y1: topY, x2: rightX, y2: rightY, levelIndex });
            segments.push({ x1: leftX, y1: leftY, x2: bottomX, y2: bottomY, levelIndex });
          } else {
            segments.push({ x1: leftX, y1: leftY, x2: topX, y2: topY, levelIndex });
            segments.push({ x1: rightX, y1: rightY, x2: bottomX, y2: bottomY, levelIndex });
          }
          break;
        default:
          break;
      }
    }
  }

  return segments;
}

export function buildCubeMoireBands(width: number, height: number) {
  const bands: CubeMoireBand[] = [];
  const cols = 8;
  const rows = 5;
  const xStep = width / Math.max(1, cols - 1);
  const yStep = height / Math.max(1, rows - 1);
  const radiusBase = Math.min(width, height) * 0.15;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const seed = row * 29 + col * 43 + 211;
      const bias = 1 - Math.abs(row / Math.max(1, rows - 1) - 0.5) * 0.5;
      bands.push({
        baseX: col * xStep + (seededValue(seed * 1.7) - 0.5) * xStep * 0.48,
        baseY: row * yStep + (seededValue(seed * 3.9) - 0.5) * yStep * 0.38,
        radius: radiusBase * (0.56 + seededValue(seed * 5.1) * 0.75) * (0.92 + bias * 0.32),
        phase: seededValue(seed * 7.3) * Math.PI * 2,
        skew: (seededValue(seed * 11.1) - 0.5) * 1.25,
        drift: 0.46 + seededValue(seed * 13.7) * 0.88,
        stretch: 0.8 + seededValue(seed * 17.3) * 0.48,
        boost: 0.7 + seededValue(seed * 19.9) * 0.6,
        hue: seed % 4,
      });
    }
  }

  return bands;
}

export function drawCubeMoireTexture({
  ctx,
  width,
  height,
  timeSeconds,
  bands,
  field,
  palette,
}: {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  timeSeconds: number;
  bands: CubeMoireBand[];
  field: Float32Array;
  palette: SplashPalette;
}) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = rgba(palette.deep, 1);
  ctx.fillRect(0, 0, width, height);

  const step = Math.max(10, Math.min(width, height) * 0.022);
  const cols = Math.max(2, Math.ceil(width / step) + 1);
  const rows = Math.max(2, Math.ceil(height / step) + 1);
  const required = cols * rows;
  if (field.length < required) return;

  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;

  const bandFrame = getBandFrame(bands, timeSeconds);

  for (let row = 0; row < rows; row += 1) {
    const py = row * step;
    for (let col = 0; col < cols; col += 1) {
      const px = col * step;
      let value = 0;

      for (let i = 0; i < bands.length; i += 1) {
        value += sampleBandValueCached(bands[i], bandFrame, i * BAND_FRAME_STRIDE, px, py, timeSeconds);
      }

      const sweep =
        0.12 * Math.sin((px + py) * 0.0038 + timeSeconds * 0.32) +
        0.08 * Math.cos((px - py) * 0.0029 - timeSeconds * 0.24) +
        0.04 * Math.sin(px * 0.0018 + py * 0.0023 + timeSeconds * 0.18);
      value += sweep;

      const index = row * cols + col;
      field[index] = value;
      if (value < min) min = value;
      if (value > max) max = value;
    }
  }

  const range = Math.max(1e-5, max - min);
  for (let i = 0; i < required; i += 1) {
    field[i] = (field[i] - min) / range;
  }

  const levels = [0.14, 0.24, 0.34, 0.46, 0.58, 0.7, 0.82];
  const colors = [palette.primary, palette.secondary, palette.tertiary, palette.quaternary];

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.globalCompositeOperation = "lighter";

  for (let levelIndex = 0; levelIndex < levels.length; levelIndex += 1) {
    const level = levels[levelIndex];
    const segments = buildSegmentsForLevel(field, cols, rows, step, level, levelIndex);
    if (!segments.length) continue;

    const rgb = colors[levelIndex % colors.length];
    const glowAlpha = 0.05 + levelIndex * 0.008;
    const strokeAlpha = 0.12 + levelIndex * 0.024;
    const lineWidth = 0.52 + levelIndex * 0.12;

    // Shadow-free glow: a wider soft underlay stroke reads the same as the
    // previous shadowBlur halo at a fraction of the raster cost.
    ctx.beginPath();
    for (let i = 0; i < segments.length; i += 1) drawSegment(ctx, segments[i]);
    ctx.strokeStyle = rgba(rgb, glowAlpha * 0.55);
    ctx.lineWidth = lineWidth * 4.4;
    ctx.stroke();

    ctx.strokeStyle = rgba(rgb, glowAlpha * 0.9);
    ctx.lineWidth = lineWidth * 2.2;
    ctx.stroke();

    ctx.strokeStyle = rgba(rgb, strokeAlpha);
    ctx.lineWidth = lineWidth;
    ctx.stroke();

    if (levelIndex >= 2) {
      ctx.beginPath();
      for (let i = 0; i < segments.length; i += 1) drawSegment(ctx, segments[i]);
      ctx.strokeStyle = rgba(colors[(levelIndex + 1) % colors.length], strokeAlpha * 0.5);
      ctx.lineWidth = Math.max(0.35, lineWidth * 0.68);
      ctx.stroke();
    }
  }

  ctx.restore();
}

export function drawCubeMoirePosterize({
  ctx,
  width,
  height,
  timeSeconds,
  bands,
  field,
  includeContours = true,
  palette,
}: {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  timeSeconds: number;
  bands: CubeMoireBand[];
  field: Float32Array;
  includeContours?: boolean;
  palette: SplashPalette;
}) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = rgba(palette.deep, 1);
  ctx.fillRect(0, 0, width, height);

  const step = Math.max(10, Math.min(width, height) * 0.022);
  const cols = Math.max(2, Math.ceil(width / step) + 1);
  const rows = Math.max(2, Math.ceil(height / step) + 1);
  const required = cols * rows;
  if (field.length < required) return;

  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;

  const bandFrame = getBandFrame(bands, timeSeconds);

  for (let row = 0; row < rows; row += 1) {
    const py = row * step;
    for (let col = 0; col < cols; col += 1) {
      const px = col * step;
      let value = 0;

      for (let i = 0; i < bands.length; i += 1) {
        value += sampleBandValueCached(bands[i], bandFrame, i * BAND_FRAME_STRIDE, px, py, timeSeconds);
      }

      const sweep =
        0.12 * Math.sin((px + py) * 0.0038 + timeSeconds * 0.32) +
        0.08 * Math.cos((px - py) * 0.0029 - timeSeconds * 0.24) +
        0.04 * Math.sin(px * 0.0018 + py * 0.0023 + timeSeconds * 0.18);
      value += sweep;

      const index = row * cols + col;
      field[index] = value;
      if (value < min) min = value;
      if (value > max) max = value;
    }
  }

  const range = Math.max(1e-5, max - min);
  for (let i = 0; i < required; i += 1) {
    field[i] = (field[i] - min) / range;
  }

  const fillPalette = [palette.primary, palette.secondary, palette.quaternary, palette.tertiary, palette.accent];
  const contourLevels = [0.16, 0.28, 0.4, 0.54, 0.68, 0.82];

  ctx.save();
  ctx.globalCompositeOperation = "source-over";

  for (let row = 0; row < rows - 1; row += 1) {
    for (let col = 0; col < cols - 1; col += 1) {
      const index = row * cols + col;
      const value = field[index];
      const bandIndex = Math.max(0, Math.min(fillPalette.length - 1, Math.floor(value * fillPalette.length)));
      const rgb = fillPalette[bandIndex];
      const alpha = 0.055 + bandIndex * 0.03 + value * 0.05;

      drawCellPath(ctx, col * step, row * step, step);
      ctx.fillStyle = rgba(rgb, alpha);
      ctx.fill();
    }
  }

  if (includeContours) {
    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (let levelIndex = 0; levelIndex < contourLevels.length; levelIndex += 1) {
      const level = contourLevels[levelIndex];
      const segments = buildSegmentsForLevel(field, cols, rows, step, level, levelIndex);
      if (!segments.length) continue;

      const rgb = fillPalette[levelIndex % fillPalette.length];
      const strokeAlpha = 0.08 + levelIndex * 0.02;
      const lineWidth = 0.45 + levelIndex * 0.1;

      // Shadow-free glow: layered wider strokes on one shared path.
      ctx.beginPath();
      for (let i = 0; i < segments.length; i += 1) drawSegment(ctx, segments[i]);
      ctx.strokeStyle = rgba(rgb, strokeAlpha * 0.45);
      ctx.lineWidth = lineWidth * 3.6;
      ctx.stroke();

      ctx.strokeStyle = rgba(rgb, strokeAlpha);
      ctx.lineWidth = lineWidth * 1.9;
      ctx.stroke();

      ctx.strokeStyle = rgba(palette.soft, 0.04 + levelIndex * 0.01);
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }
  }

  ctx.restore();
}
