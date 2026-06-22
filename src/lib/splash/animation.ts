function nextPowerOfTwo(value: number) {
  let v = Math.max(1, value | 0);
  v -= 1;
  v |= v >> 1;
  v |= v >> 2;
  v |= v >> 4;
  v |= v >> 8;
  v |= v >> 16;
  return v + 1;
}

export function createAnimationBuffers(initialScratchSize = 2048) {
  let scratch = new Float32Array(Math.max(256, initialScratchSize));
  let scratchCursor = 0;
  const persistent = new Map<string, Float32Array>();

  const ensureScratchCapacity = (requiredLength: number) => {
    if (requiredLength <= scratch.length) return;
    const next = new Float32Array(nextPowerOfTwo(requiredLength));
    next.set(scratch);
    scratch = next;
  };

  return {
    beginFrame() {
      scratchCursor = 0;
    },
    allocScratchF32(length: number) {
      const requested = Math.max(0, length | 0);
      const end = scratchCursor + requested;
      ensureScratchCapacity(end);
      const slice = scratch.subarray(scratchCursor, end);
      scratchCursor = end;
      return slice;
    },
    getPersistentF32(key: string, length: number) {
      const requested = Math.max(0, length | 0);
      const current = persistent.get(key);
      if (!current || current.length < requested) {
        const next = new Float32Array(nextPowerOfTwo(requested));
        if (current) next.set(current.subarray(0, Math.min(current.length, next.length)));
        persistent.set(key, next);
        return next;
      }
      return current;
    },
    clearPersistent() {
      persistent.clear();
    },
  };
}

export function startAnimationLoop({
  frameBudgetMs,
  onFrame,
}: {
  frameBudgetMs: number;
  onFrame: (nowMs: number) => void;
}) {
  let rafId = 0;
  let stopped = false;
  let lastFrame = 0;

  const tick = (now: number) => {
    if (stopped) return;
    if (now - lastFrame >= frameBudgetMs) {
      lastFrame = now;
      onFrame(now);
    }
    rafId = window.requestAnimationFrame(tick);
  };

  rafId = window.requestAnimationFrame(tick);

  return () => {
    stopped = true;
    window.cancelAnimationFrame(rafId);
  };
}
