"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site.config";

export default function Footer() {
  // Back-to-top stays hidden until the user has scrolled past the hero.
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  return (
    <footer className="border-t border-white/5 bg-[#070B10]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-[#8B98A5]">
          © {new Date().getFullYear()} {siteConfig.name} — Web Developer &amp; SEO Professional.
        </p>
        <nav aria-label="Social links">
          <ul className="flex flex-wrap gap-5">
            {siteConfig.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center text-sm font-medium text-[#8B98A5] hover:text-[#14E3C6]"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Floating back-to-top — only after scrolling past the hero.
          Sits above the WhatsApp button spot (bottom-20 on mobile) so
          the two never overlap if a WhatsApp number is added later. */}
      <a
        href="#top"
        aria-label="Back to top"
        aria-hidden={!pastHero}
        tabIndex={pastHero ? 0 : -1}
        className={`fixed bottom-20 right-5 z-50 inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full border-2 border-[#14E3C6] bg-[#070B10] text-lg font-bold text-white shadow-lg transition-opacity duration-300 hover:bg-[#0B1118] md:bottom-6 md:right-6 ${
          pastHero ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <span aria-hidden="true">↑</span>
      </a>
    </footer>
  );
}
