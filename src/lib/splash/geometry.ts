import { seededRandom } from "./math";

export function drawSpline(
  ctx: CanvasRenderingContext2D,
  xy: Float32Array,
  pointCount: number,
  strokeStyle: string | CanvasGradient | CanvasPattern,
  lineWidth: number,
) {
  if (pointCount < 2) return;
  ctx.beginPath();
  ctx.moveTo(xy[0], xy[1]);
  for (let i = 0; i < pointCount - 1; i += 1) {
    const offset = i * 2;
    const nextOffset = offset + 2;
    const x = xy[offset];
    const y = xy[offset + 1];
    const nextX = xy[nextOffset];
    const nextY = xy[nextOffset + 1];
    const cx = (x + nextX) * 0.5;
    const cy = (y + nextY) * 0.5;
    ctx.quadraticCurveTo(x, y, cx, cy);
  }
  const lastOffset = (pointCount - 1) * 2;
  ctx.lineTo(xy[lastOffset], xy[lastOffset + 1]);
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

export function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, index) => {
    const angle = (Math.PI / 180) * (60 * index + 30);
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as const;
  });
}

export function buildStarPoints(seed: number, count: number) {
  const random = seededRandom(seed);
  return Array.from({ length: count }, (_, index) => {
    const angle = random() * Math.PI * 2 + index * 0.31;
    const radius = 14 + random() * 42;
    const x = 50 + Math.cos(angle) * radius;
    const y = 50 + Math.sin(angle) * radius;
    return {
      x,
      y,
      r: 0.3 + random() * 0.9,
      delay: random() * 5.5,
      period: 4.8 + random() * 6.2,
      peak: 0.68 + random() * 0.3,
    };
  });
}

export function buildHexGrid(seed: number, radius = 4.8) {
  const random = seededRandom(seed);
  const cells = [] as Array<{
    key: string;
    x: number;
    y: number;
    r: number;
    phase: number;
    opacity: number;
    thickness: number;
  }>;
  const cols = 10;
  const rows = 8;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const offset = row % 2 === 0 ? 0 : radius * 0.85;
      const x = 10 + col * radius * 1.7 + offset;
      const y = 10 + row * radius * 1.45;
      cells.push({
        key: `hex-${row}-${col}`,
        x,
        y,
        r: radius * (0.86 + random() * 0.22),
        phase: random() * Math.PI * 2,
        opacity: 0.18 + random() * 0.36,
        thickness: 0.8 + random() * 0.7,
      });
    }
  }

  return cells;
}
