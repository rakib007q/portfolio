"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { prefersReducedMotion } from "@/lib/device";

/** Magnetic effect on the main buttons (desktop, pointer only). */
export default function MagneticButton({
  children,
  href,
  variant = "primary",
  ariaLabel,
}: {
  children: ReactNode;
  href: string;
  variant?: "primary" | "outline";
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  function onMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const base =
    "inline-flex min-h-[48px] items-center justify-center rounded-full px-7 py-3 text-base font-semibold transition-colors";
  const style =
    variant === "primary"
      ? "bg-[#14E3C6] text-[#070B10] hover:bg-[#2DD4BF] shadow-[0_0_32px_rgba(20,227,198,0.35)]"
      : "border-2 border-[#14E3C6] bg-[#070B10] text-white hover:border-[#2DD4BF] hover:bg-[#0B1118]";

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`${base} ${style}`}
    >
      {children}
    </motion.a>
  );
}
