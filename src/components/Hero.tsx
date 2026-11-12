"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { isLowEndDevice, prefersReducedMotion, webglSupported } from "@/lib/device";
import MagneticButton from "./MagneticButton";

// Lazy-load ALL 3D after first paint — the headline is the LCP, not the canvas.
const HeroScene = dynamic(() => import("./three/HeroScene"), {
  ssr: false,
  loading: () => <div className="hero-static absolute inset-0" aria-hidden="true" />,
});

export default function Hero() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [use3d, setUse3d] = useState(false);

  useEffect(() => {
    // After first paint: decide whether WebGL is worth it on this device.
    const t = window.setTimeout(() => {
      setMounted(true);
      setUse3d(
        !prefersReducedMotion() && webglSupported() && !isLowEndDevice()
      );
    }, 150);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-svh items-center overflow-hidden pt-[72px]"
    >
      {/* 3D background, or a lightweight static gradient on low-end devices. */}
      <div className="absolute inset-0" aria-hidden="true">
        {mounted && use3d ? (
          <HeroScene />
        ) : (
          <div className="hero-static absolute inset-0" />
        )}
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#070B10]/40 via-transparent to-[#070B10]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#14E3C6]/30 bg-[#14E3C6]/10 px-4 py-1.5 text-sm font-medium text-[#14E3C6]">
            <span className="h-2 w-2 rounded-full bg-[#14E3C6]" aria-hidden="true" />
            Available for new projects
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-[#E6EDF3] sm:text-7xl lg:text-8xl">
            Rakibul Hasan
            <span className="mt-3 block bg-gradient-to-r from-[#14E3C6] via-[#2DD4BF] to-[#3B82F6] bg-clip-text text-3xl text-transparent sm:text-5xl lg:text-6xl">
              Web Developer &amp; SEO Professional
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#8B98A5] sm:text-xl">
            I build fast, modern websites and help your business grow on
            Google.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton href="#projects" ariaLabel="View my work">
              View My Work
            </MagneticButton>
            <MagneticButton href="#contact" variant="outline" ariaLabel="Hire me — go to contact">
              Hire Me
            </MagneticButton>
          </div>
          <p className="mt-8 text-sm font-medium tracking-wide text-[#8B98A5]">
            Websites &nbsp;•&nbsp; SEO &nbsp;•&nbsp; Ecommerce
          </p>
        </motion.div>
      </div>
    </section>
  );
}
