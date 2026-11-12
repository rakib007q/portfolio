/** Device-tier + motion detection, used to keep the 3D light and safe. */

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isSaveData(): boolean {
  if (typeof navigator === "undefined") return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
    .connection;
  return Boolean(conn?.saveData);
}

/**
 * "low" tier = show a static gradient hero instead of WebGL.
 * Heuristics: Save-Data on, very small screen with few CPU cores,
 * or a device that reports low memory.
 */
export function isLowEndDevice(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined")
    return false;
  if (isSaveData()) return true;
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number })
    .deviceMemory;
  // A small screen alone is not low-end — most modern phones have 4+
  // cores and run the reduced 2-shape mobile scene fine. Only very
  // weak hardware (<=2 cores) gets the static fallback on small screens.
  const smallScreen = window.innerWidth < 480;
  if (smallScreen && cores <= 2) return true;
  if (typeof memory === "number" && memory <= 2) return true;
  return false;
}

/** True on screens under 768px (the mobile breakpoint). */
export function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

/**
 * One decision for the hero: use the static gradient fallback (no WebGL
 * canvas) when the device is low-end, Save-Data is on, reduced motion is
 * requested, or WebGL is unavailable.
 */
export function shouldUseStaticHero(): boolean {
  return (
    prefersReducedMotion() || isSaveData() || isLowEndDevice() || !webglSupported()
  );
}

export function webglSupported(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") || canvas.getContext("webgl")
    );
  } catch {
    return false;
  }
}
