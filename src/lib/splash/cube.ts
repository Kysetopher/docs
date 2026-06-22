export type CubeFace = {
  points: Array<[number, number]>;
  fill: string;
  stroke: string;
  opacity: number;
  lineWidth: number;
};

export type CubeFrame = {
  centerX: number;
  centerY: number;
  size: number;
  dx: number;
  dy: number;
  scale: number;
  faces: {
    top: CubeFace;
    left: CubeFace;
    right: CubeFace;
  };
  outline: Array<[number, number]>;
};

function isoPoint(x: number, y: number, z: number, centerX: number, centerY: number, size: number, dx: number, dy: number, scale: number) {
  const px = (x - y) * dx;
  const py = (x + y) * dy - z * scale;
  return [centerX + px * size, centerY + py * size] as const;
}

export function buildCubeFrame({
  width,
  height,
  timeSeconds,
  progress = 0,
  quiet = false,
}: {
  width: number;
  height: number;
  timeSeconds: number;
  progress?: number;
  quiet?: boolean;
}): CubeFrame {
  const centerX = width * 0.5;
  const centerY = height * 0.5;
  const baseSize = Math.min(width, height) * (quiet ? 0.24 : 0.27);
  const size = baseSize * (0.96 + Math.sin(timeSeconds * 0.17) * (quiet ? 0.008 : 0.02));
  const dx = 0.72 + Math.sin(timeSeconds * 0.11) * (quiet ? 0.01 : 0.03);
  const dy = 0.42 + Math.cos(timeSeconds * 0.09) * (quiet ? 0.008 : 0.02);
  const scale = 0.92 + Math.sin(timeSeconds * 0.13 + progress * 3.1) * (quiet ? 0.01 : 0.04);
  const wobble = quiet ? 0.015 : 0.06;
  const bandShift = Math.sin(timeSeconds * (quiet ? 0.18 : 0.28) + progress * 4.5) * size * wobble;

  const top = {
    points: [
      isoPoint(0, 0, 0, centerX, centerY + bandShift, size, dx, dy, scale),
      isoPoint(1, 0, 0, centerX, centerY + bandShift, size, dx, dy, scale),
      isoPoint(1, 1, 0, centerX, centerY + bandShift, size, dx, dy, scale),
      isoPoint(0, 1, 0, centerX, centerY + bandShift, size, dx, dy, scale),
    ],
    fill: quiet ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.05)",
    stroke: quiet ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.16)",
    opacity: quiet ? 0.35 : 0.75,
    lineWidth: quiet ? 1 : 1.25,
  };

  const left = {
    points: [
      isoPoint(0, 0, 0, centerX, centerY + bandShift, size, dx, dy, scale),
      isoPoint(0, 1, 0, centerX, centerY + bandShift, size, dx, dy, scale),
      isoPoint(0, 1, 1, centerX, centerY + bandShift, size, dx, dy, scale),
      isoPoint(0, 0, 1, centerX, centerY + bandShift, size, dx, dy, scale),
    ],
    fill: quiet ? "rgba(56,189,248,0.02)" : "rgba(56,189,248,0.06)",
    stroke: quiet ? "rgba(56,189,248,0.08)" : "rgba(56,189,248,0.16)",
    opacity: quiet ? 0.4 : 0.78,
    lineWidth: quiet ? 1 : 1.15,
  };

  const right = {
    points: [
      isoPoint(1, 0, 0, centerX, centerY + bandShift, size, dx, dy, scale),
      isoPoint(1, 1, 0, centerX, centerY + bandShift, size, dx, dy, scale),
      isoPoint(1, 1, 1, centerX, centerY + bandShift, size, dx, dy, scale),
      isoPoint(1, 0, 1, centerX, centerY + bandShift, size, dx, dy, scale),
    ],
    fill: quiet ? "rgba(99,102,241,0.02)" : "rgba(99,102,241,0.06)",
    stroke: quiet ? "rgba(99,102,241,0.08)" : "rgba(99,102,241,0.16)",
    opacity: quiet ? 0.4 : 0.78,
    lineWidth: quiet ? 1 : 1.15,
  };

  const outline = [
    isoPoint(0, 0, 0, centerX, centerY + bandShift, size, dx, dy, scale),
    isoPoint(1, 0, 0, centerX, centerY + bandShift, size, dx, dy, scale),
    isoPoint(1, 1, 0, centerX, centerY + bandShift, size, dx, dy, scale),
    isoPoint(0, 1, 0, centerX, centerY + bandShift, size, dx, dy, scale),
    isoPoint(0, 0, 0, centerX, centerY + bandShift, size, dx, dy, scale),
    isoPoint(0, 0, 1, centerX, centerY + bandShift, size, dx, dy, scale),
    isoPoint(1, 0, 1, centerX, centerY + bandShift, size, dx, dy, scale),
    isoPoint(1, 1, 1, centerX, centerY + bandShift, size, dx, dy, scale),
    isoPoint(0, 1, 1, centerX, centerY + bandShift, size, dx, dy, scale),
    isoPoint(0, 0, 1, centerX, centerY + bandShift, size, dx, dy, scale),
  ];

  return { centerX, centerY, size, dx, dy, scale, faces: { top, left, right }, outline };
}

export function drawClosedPath(ctx: CanvasRenderingContext2D, points: Array<[number, number]>) {
  if (!points.length) return;
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i += 1) {
    ctx.lineTo(points[i][0], points[i][1]);
  }
  ctx.closePath();
}

export function drawPolyline(ctx: CanvasRenderingContext2D, points: Array<[number, number]>) {
  if (!points.length) return;
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i += 1) {
    ctx.lineTo(points[i][0], points[i][1]);
  }
}

