"use client";

import Image from "next/image";
import { projects } from "@/config/site.config";
import TiltCard from "./TiltCard";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#14E3C6]">Projects</p>
        <h2 id="projects-heading" className="mt-3 font-display text-3xl font-bold tracking-tight text-[#E6EDF3] sm:text-4xl">
          My work
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#8B98A5]">
          Real projects, in a simple format: the problem, what I did, and the
          result.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08} className="h-full">
            <TiltCard className="glass-card flex h-full flex-col overflow-hidden rounded-2xl">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0b1118]">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#14E3C6]">
                  {project.category}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-[#E6EDF3]">{project.title}</h3>
                <p className="mt-2 leading-relaxed text-[#8B98A5]">{project.summary}</p>
                <dl className="mt-5 space-y-3 text-[15px] leading-relaxed">
                  <div>
                    <dt className="font-semibold text-[#E6EDF3]">Problem</dt>
                    <dd className="text-[#8B98A5]">{project.problem}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[#E6EDF3]">What I did</dt>
                    <dd className="text-[#8B98A5]">{project.whatIDid}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[#E6EDF3]">Result</dt>
                    <dd className="text-[#8B98A5]">{project.result}</dd>
                  </div>
                </dl>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
                  {project.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[#E6EDF3]">
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex gap-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center rounded-full bg-[#14E3C6] px-5 text-sm font-semibold text-[#070B10] hover:bg-[#2DD4BF]"
                  >
                    Visit live site ↗
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex min-h-[44px] items-center rounded-full border border-[#14E3C6]/50 px-5 text-sm font-semibold text-[#E6EDF3] hover:bg-[#14E3C6]/10"
                  >
                    Ask about this
                  </a>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-sm text-[#8B98A5]">
        More projects can be added in{" "}
        <code className="rounded bg-white/5 px-1 py-0.5">src/config/site.config.ts</code>{" "}
        — the grid is ready for 4–6 projects. Screenshot slots are in{" "}
        <code className="rounded bg-white/5 px-1 py-0.5">public/projects/</code>.
      </p>
    </section>
  );
}
