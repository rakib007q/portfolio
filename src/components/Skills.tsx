"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { skills } from "@/config/site.config";
import TiltCard from "./TiltCard";
import Reveal from "./Reveal";
import { isLowEndDevice, prefersReducedMotion, webglSupported } from "@/lib/device";

// The rank-climb scene is lazy-loaded and only mounted in view.
const RankClimb = dynamic(() => import("./three/RankClimb"), {
  ssr: false,
  loading: () => <div className="hero-static h-64 w-full rounded-2xl sm:h-72" aria-hidden="true" />,
});

const SHAPES: Record<string, React.ReactNode> = {
  cube: (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
      <rect x="8" y="8" width="24" height="24" rx="4" fill="none" stroke="#14E3C6" strokeWidth="2.5" />
      <rect x="14" y="14" width="12" height="12" rx="2" fill="#14E3C6" opacity="0.35" />
    </svg>
  ),
  torus: (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="13" fill="none" stroke="#3B82F6" strokeWidth="2.5" />
      <circle cx="20" cy="20" r="5" fill="#3B82F6" opacity="0.5" />
    </svg>
  ),
  icosahedron: (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
      <polygon points="20,5 34,32 6,32" fill="none" stroke="#14E3C6" strokeWidth="2.5" />
      <circle cx="20" cy="24" r="4" fill="#14E3C6" opacity="0.5" />
    </svg>
  ),
  sphere: (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="14" fill="none" stroke="#2DD4BF" strokeWidth="2.5" />
      <ellipse cx="20" cy="20" rx="14" ry="5" fill="none" stroke="#2DD4BF" strokeWidth="1.5" opacity="0.6" />
    </svg>
  ),
};

export default function Skills() {
  const climbRef = useRef<HTMLDivElement>(null);
  const [climbInView, setClimbInView] = useState(false);
  const [use3d, setUse3d] = useState(false);

  useEffect(() => {
    setUse3d(!prefersReducedMotion() && webglSupported() && !isLowEndDevice());
    const el = climbRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setClimbInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" aria-labelledby="skills-heading" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#14E3C6]">Skills</p>
        <h2 id="skills-heading" className="mt-3 font-display text-3xl font-bold tracking-tight text-[#E6EDF3] sm:text-4xl">
          What I can do for your business
        </h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {skills.map((skill, i) => (
          <Reveal key={skill.title} delay={i * 0.08}>
            <TiltCard className="glass-card h-full rounded-2xl p-7">
              <div className="mb-4">{SHAPES[skill.shape]}</div>
              <h3 className="font-display text-xl font-bold text-[#E6EDF3]">{skill.title}</h3>
              <p className="mt-2 leading-relaxed text-[#8B98A5]">{skill.benefit}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${skill.title} tools and topics`}>
                {skill.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-[#14E3C6]/25 bg-[#14E3C6]/5 px-3 py-1 text-xs font-medium text-[#14E3C6]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      {/* SEO signature scene: the rank climb */}
      <Reveal delay={0.1}>
        <div ref={climbRef} className="glass-card mt-10 overflow-hidden rounded-2xl p-6 sm:p-8">
          <h3 className="font-display text-xl font-bold text-[#E6EDF3]">
            SEO, in one picture: climbing to #1
          </h3>
          <p className="mt-2 max-w-2xl leading-relaxed text-[#8B98A5]">
            Good SEO is not a trick. It is fixing the basics, writing clear
            pages, and improving step by step — until your business is the one
            customers find first.
          </p>
          {climbInView && use3d ? (
            <div className="mt-4">
              <RankClimb />
            </div>
          ) : (
            <div className="hero-static mt-4 flex h-64 items-end justify-center gap-3 rounded-2xl p-6 sm:h-72" aria-hidden="true">
              {[0.7, 1.1, 1.6, 2.1, 2.8].map((h, i) => (
                <div
                  key={i}
                  className="w-10 rounded-t-md sm:w-14"
                  style={{
                    height: `${h * 56}px`,
                    background: i === 4 ? "#14E3C6" : "#3B82F6",
                    opacity: i === 4 ? 1 : 0.45,
                  }}
                />
              ))}
            </div>
          )}
          <p className="mt-3 text-sm text-[#8B98A5]">
            Bars rise to #1 as you scroll here. On low-end devices a static
            version is shown instead.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
