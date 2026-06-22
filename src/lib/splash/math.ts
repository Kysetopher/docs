export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function rgba(rgb: string, alpha: number) {
  return `rgba(${rgb}, ${clamp(alpha, 0, 1)})`;
}

export function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let t = Math.imul(value ^ (value >>> 15), 1 | value);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function stableIndexFromNumber(value: number, mod: number) {
  if (mod <= 0) return 0;
  const hash = ((Math.floor(value * 1000) * 2654435761) >>> 0) >>> 0;
  return hash % mod;
}
