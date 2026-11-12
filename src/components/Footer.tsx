"use client";

import { siteConfig } from "@/config/site.config";

export default function Footer() {
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
        <a
          href="#top"
          className="inline-flex min-h-[44px] w-fit items-center rounded-full border border-[#14E3C6]/50 px-5 text-sm font-semibold text-[#14E3C6] hover:bg-[#14E3C6]/10"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
