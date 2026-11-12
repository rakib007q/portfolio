"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats } from "@/config/site.config";
import { prefersReducedMotion } from "@/lib/device";
import Reveal from "./Reveal";

export default function About() {
  const ref = useRef<HTMLElement>(null);

  // GSAP ScrollTrigger: a gentle scroll reveal for the stats row.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".gsap-stat", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: ".gsap-stats", start: "top 85%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} aria-labelledby="about-heading" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#14E3C6]">About</p>
        <h2 id="about-heading" className="mt-3 font-display text-3xl font-bold tracking-tight text-[#E6EDF3] sm:text-4xl">
          Simple websites that work — and get found.
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-[#8B98A5]">
          <p>
            I&apos;m Rakibul Hasan, a web developer and SEO professional. I
            build fast, modern websites for businesses, and I help those
            businesses show up on Google when customers search for what they
            sell.
          </p>
          <p>
            My work is simple on purpose: a clear website, honest SEO, and no
            confusing jargon. If a customer can find you, understand you, and
            contact you easily — the website is doing its job.
          </p>
        </div>
      </Reveal>
      <dl className="gsap-stats mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="gsap-stat glass-card rounded-2xl p-6">
            <dt className="order-2 mt-2 text-sm text-[#8B98A5]">{s.label}</dt>
            <dd className="font-display text-4xl font-bold text-[#14E3C6]">{s.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs text-[#8B98A5]">
        Stats marked “—” are placeholders — replace them in{" "}
        <code className="rounded bg-white/5 px-1 py-0.5">src/config/site.config.ts</code>{" "}
        with real numbers.
      </p>
    </section>
  );
}
