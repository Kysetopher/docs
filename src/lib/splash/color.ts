import { clamp } from "./math";

type Rgb = {
  r: number;
  g: number;
  b: number;
};

type Hsl = {
  h: number;
  s: number;
  l: number;
};

export type SplashPalette = {
  base: string;
  primary: string;
  secondary: string;
  tertiary: string;
  quaternary: string;
  accent: string;
  highlight: string;
  soft: string;
  surface: string;
  deep: string;
  shadow: string;
};

const FALLBACK_RGB: Rgb = { r: 56, g: 189, b: 248 };

function toRgbString({ r, g, b }: Rgb) {
  return `${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}`;
}

function normalizeHue(h: number) {
  return ((h % 360) + 360) % 360;
}

function clampChannel(value: number) {
  return clamp(value, 0, 255);
}

function rgbToHsl({ r, g, b }: Rgb): Hsl {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  let h = 0;
  if (delta > 0) {
    switch (max) {
      case rn:
        h = ((gn - bn) / delta + (gn < bn ? 6 : 0)) * 60;
        break;
      case gn:
        h = ((bn - rn) / delta + 2) * 60;
        break;
      default:
        h = ((rn - gn) / delta + 4) * 60;
        break;
    }
  }

  const l = (max + min) * 0.5;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  return { h, s, l };
}

function hueToRgb(p: number, q: number, t: number) {
  let nextT = t;
  if (nextT < 0) nextT += 1;
  if (nextT > 1) nextT -= 1;
  if (nextT < 1 / 6) return p + (q - p) * 6 * nextT;
  if (nextT < 1 / 2) return q;
  if (nextT < 2 / 3) return p + (q - p) * (2 / 3 - nextT) * 6;
  return p;
}

function hslToRgb({ h, s, l }: Hsl): Rgb {
  const hue = normalizeHue(h) / 360;
  if (s <= 0) {
    const gray = clampChannel(l * 255);
    return { r: gray, g: gray, b: gray };
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return {
    r: clampChannel(hueToRgb(p, q, hue + 1 / 3) * 255),
    g: clampChannel(hueToRgb(p, q, hue) * 255),
    b: clampChannel(hueToRgb(p, q, hue - 1 / 3) * 255),
  };
}

function mixRgb(a: Rgb, b: Rgb, weight: number) {
  const t = clamp(weight, 0, 1);
  return {
    r: a.r * (1 - t) + b.r * t,
    g: a.g * (1 - t) + b.g * t,
    b: a.b * (1 - t) + b.b * t,
  };
}

function deriveTone(
  base: Hsl,
  {
    hueShift = 0,
    satScale = 1,
    satOffset = 0,
    lightScale = 1,
    lightOffset = 0,
    mix = 0,
    target = FALLBACK_RGB,
  }: {
    hueShift?: number;
    satScale?: number;
    satOffset?: number;
    lightScale?: number;
    lightOffset?: number;
    mix?: number;
    target?: Rgb;
  } = {},
) {
  const rgb = hslToRgb({
    h: normalizeHue(base.h + hueShift),
    s: clamp(base.s * satScale + satOffset, 0, 1),
    l: clamp(base.l * lightScale + lightOffset, 0, 1),
  });
  return mix > 0 ? mixRgb(rgb, target, mix) : rgb;
}

function parseHexColor(value: string) {
  const hex = value.replace("#", "").trim();
  if (![3, 4, 6, 8].includes(hex.length)) return null;

  const expand = (part: string) => (part.length === 1 ? part + part : part);
  const size = hex.length <= 4 ? 1 : 2;
  const r = Number.parseInt(expand(hex.slice(0, size)), 16);
  const g = Number.parseInt(expand(hex.slice(size, size * 2)), 16);
  const b = Number.parseInt(expand(hex.slice(size * 2, size * 3)), 16);
  if ([r, g, b].some((channel) => Number.isNaN(channel))) return null;
  return { r, g, b } satisfies Rgb;
}

function parseRgbColor(value: string) {
  const match = value
    .replace(/\s+/g, "")
    .match(/^rgba?\(([^)]+)\)$/i);
  if (!match) return null;

  const parts = match[1].split(",").slice(0, 3).map((part) => part.trim());
  if (parts.length < 3) return null;

  const channels = parts.map((part) => {
    if (part.endsWith("%")) {
      return clamp((Number.parseFloat(part) / 100) * 255, 0, 255);
    }
    return clamp(Number.parseFloat(part), 0, 255);
  });

  if (channels.some((channel) => Number.isNaN(channel))) return null;
  const [r, g, b] = channels;
  return { r, g, b } satisfies Rgb;
}

function parseHslColor(value: string) {
  const match = value
    .replace(/\s+/g, "")
    .match(/^hsla?\(([^)]+)\)$/i);
  if (!match) return null;

  const parts = match[1].split(",").slice(0, 3).map((part) => part.trim());
  if (parts.length < 3) return null;

  const h = Number.parseFloat(parts[0]);
  const s = Number.parseFloat(parts[1]) / 100;
  const l = Number.parseFloat(parts[2]) / 100;
  if ([h, s, l].some((channel) => Number.isNaN(channel))) return null;

  return hslToRgb({
    h,
    s: clamp(s, 0, 1),
    l: clamp(l, 0, 1),
  });
}

function parseColor(input: string) {
  const value = input.trim();
  if (!value) return FALLBACK_RGB;
  if (value.startsWith("#")) return parseHexColor(value) ?? FALLBACK_RGB;
  if (value.startsWith("rgb")) return parseRgbColor(value) ?? FALLBACK_RGB;
  if (value.startsWith("hsl")) return parseHslColor(value) ?? FALLBACK_RGB;
  return FALLBACK_RGB;
}

export function createSplashPalette(input: string = "#38bdf8"): SplashPalette {
  const baseRgb = parseColor(input);
  const baseHsl = rgbToHsl(baseRgb);

  const primary = baseRgb;
  const secondary = deriveTone(baseHsl, { hueShift: 24, satScale: 0.94, lightScale: 1.02, lightOffset: 0.02 });
  const tertiary = deriveTone(baseHsl, { hueShift: -34, satScale: 0.78, lightScale: 1.08, lightOffset: 0.04 });
  const quaternary = deriveTone(baseHsl, { hueShift: 148, satScale: 0.82, lightScale: 1.0, lightOffset: 0.01 });
  const accent = deriveTone(baseHsl, { hueShift: 176, satScale: 0.88, lightScale: 1.02, lightOffset: 0.03 });
  const highlight = mixRgb(
    deriveTone(baseHsl, { hueShift: 10, satScale: 0.48, lightScale: 1.38, lightOffset: 0.04 }),
    { r: 255, g: 255, b: 255 },
    0.28,
  );
  const soft = mixRgb(
    deriveTone(baseHsl, { hueShift: 0, satScale: 0.28, lightScale: 1.7, lightOffset: 0.06 }),
    { r: 255, g: 255, b: 255 },
    0.52,
  );
  const surface = deriveTone(baseHsl, { hueShift: -8, satScale: 0.42, lightScale: 0.42, lightOffset: 0.02 });
  const deep = deriveTone(baseHsl, { hueShift: -14, satScale: 0.58, lightScale: 0.16, lightOffset: 0.01 });
  const shadow = deriveTone(baseHsl, { hueShift: 0, satScale: 0.32, lightScale: 0.08, lightOffset: 0.01 });

  return {
    base: toRgbString(baseRgb),
    primary: toRgbString(primary),
    secondary: toRgbString(secondary),
    tertiary: toRgbString(tertiary),
    quaternary: toRgbString(quaternary),
    accent: toRgbString(accent),
    highlight: toRgbString(highlight),
    soft: toRgbString(soft),
    surface: toRgbString(surface),
    deep: toRgbString(deep),
    shadow: toRgbString(shadow),
  };
}
