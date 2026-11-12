"use client";

import { useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#070B10]/80 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight text-[#E6EDF3]"
        >
          Rakibul<span className="text-[#14E3C6]">.</span>
          <span className="sr-only"> — home</span>
        </a>
        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="min-h-[44px] inline-flex items-center text-sm font-medium text-[#8B98A5] transition-colors hover:text-[#E6EDF3]"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="inline-flex min-h-[44px] items-center rounded-full bg-[#14E3C6] px-5 text-sm font-semibold text-[#070B10] hover:bg-[#2DD4BF]"
            >
              Hire Me
            </a>
          </li>
        </ul>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-[#E6EDF3] md:hidden"
        >
          <span aria-hidden="true" className="text-2xl leading-none">
            {open ? "✕" : "☰"}
          </span>
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t border-white/5 bg-[#070B10] px-4 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[48px] items-center text-base font-medium text-[#E6EDF3]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
