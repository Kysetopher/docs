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
  visibilityTarget,
}: {
  frameBudgetMs: number;
  onFrame: (nowMs: number) => void;
  /**
   * When provided, the loop is fully paused while this element is scrolled
   * out of the viewport, so offscreen splashes cost zero CPU/GPU.
   */
  visibilityTarget?: Element;
}) {
  let rafId = 0;
  let stopped = false;
  let running = false;
  let lastFrame = 0;

  const tick = (now: number) => {
    if (stopped || !running) return;
    if (now - lastFrame >= frameBudgetMs) {
      lastFrame = now;
      onFrame(now);
    }
    rafId = window.requestAnimationFrame(tick);
  };

  const start = () => {
    if (stopped || running) return;
    running = true;
    rafId = window.requestAnimationFrame(tick);
  };

  const pause = () => {
    if (!running) return;
    running = false;
    window.cancelAnimationFrame(rafId);
  };

  let observer: IntersectionObserver | null = null;
  if (visibilityTarget && typeof IntersectionObserver !== "undefined") {
    observer = new IntersectionObserver((entries) => {
      const entry = entries[entries.length - 1];
      if (entry.isIntersecting) start();
      else pause();
    });
    observer.observe(visibilityTarget);
  }

  start();

  return () => {
    stopped = true;
    pause();
    observer?.disconnect();
  };
}
