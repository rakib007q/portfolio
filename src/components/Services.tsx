"use client";

import { processSteps, services } from "@/config/site.config";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#14E3C6]">Services</p>
        <h2 id="services-heading" className="mt-3 font-display text-3xl font-bold tracking-tight text-[#E6EDF3] sm:text-4xl">
          How I can help you
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#8B98A5]">
          No prices here — every project is different. Tell me what you need
          and I will give you a clear quote.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.title} delay={i * 0.06} className="h-full">
            <article className="glass-card flex h-full flex-col rounded-2xl p-7">
              <h3 className="font-display text-xl font-bold text-[#E6EDF3]">{service.title}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-[#8B98A5]">{service.benefit}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[#E6EDF3]">
                    {tag}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-6 inline-flex min-h-[44px] w-fit items-center rounded-full border border-[#14E3C6]/50 px-5 text-sm font-semibold text-[#14E3C6] hover:bg-[#14E3C6]/10"
              >
                Get a quote →
              </a>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-14">
          <h3 className="font-display text-2xl font-bold text-[#E6EDF3]">How it works</h3>
          <ol className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {processSteps.map((step) => (
              <li key={step.step} className="glass-card rounded-2xl p-6">
                <p className="font-display text-3xl font-bold text-[#14E3C6]">{step.step}</p>
                <p className="mt-2 font-display text-lg font-bold text-[#E6EDF3]">{step.title}</p>
                <p className="mt-1 leading-relaxed text-[#8B98A5]">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}
