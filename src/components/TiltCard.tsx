"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { prefersReducedMotion } from "@/lib/device";

/**
 * 3D tilt card with a mouse-follow light reflection.
 * Pure CSS 3D — no WebGL, so it is cheap and works everywhere.
 * Disabled when the user prefers reduced motion.
 */
export default function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg) translateY(-4px)`;
    el.style.setProperty("--mx", `${((x + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${((y + 0.5) * 100).toFixed(1)}%`);
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{
        background:
          "radial-gradient(240px 180px at var(--mx, 50%) var(--my, 50%), rgba(20,227,198,0.12), transparent 70%)",
      }}
    >
      {children}
    </div>
  );
}
