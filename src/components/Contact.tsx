"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/config/site.config";
import Reveal from "./Reveal";

type Status = { kind: "idle" | "sending" | "success" | "error"; message?: string };

export default function Contact() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const whatsappUrl = siteConfig.whatsappNumber
    ? `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hi Rakibul, I saw your portfolio and I want to talk about a project.")}`
    : "";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const next: typeof errors = {};
    if (name.length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email address.";
    if (message.length < 10) next.message = "Please write at least 10 characters.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          website: String(form.get("website") ?? ""), // honeypot, keep empty
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setStatus({ kind: "success", message: "Thank you! Your message was sent. I will reply soon." });
        e.currentTarget.reset();
      } else {
        setStatus({
          kind: "error",
          message: data.error ?? "Sorry, the message could not be sent. Please email me directly.",
        });
      }
    } catch {
      setStatus({
        kind: "error",
        message: "Sorry, something went wrong. Please email me directly at hrakibul571@gmail.com.",
      });
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#14E3C6]">Contact</p>
        <h2 id="contact-heading" className="mt-3 font-display text-3xl font-bold tracking-tight text-[#E6EDF3] sm:text-4xl">
          Let&apos;s build something for your business
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#8B98A5]">
          Tell me about your project. I reply to every message.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <div className="glass-card rounded-2xl p-7">
            <h3 className="font-display text-xl font-bold text-[#E6EDF3]">Contact me directly</h3>
            <p className="mt-4 text-sm text-[#8B98A5]">Email</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-1 inline-flex min-h-[44px] items-center break-all font-semibold text-[#14E3C6] hover:underline"
            >
              {siteConfig.email}
            </a>
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#25D366] px-6 font-semibold text-[#070B10] hover:brightness-110"
              >
                Chat on WhatsApp
              </a>
            ) : (
              <p className="mt-5 rounded-xl border border-dashed border-white/15 p-4 text-sm leading-relaxed text-[#8B98A5]">
                WhatsApp button is hidden until you set your number in{" "}
                <code className="rounded bg-white/5 px-1 py-0.5">src/config/site.config.ts</code>{" "}
                (whatsappNumber).
              </p>
            )}
            <p className="mt-5 text-sm leading-relaxed text-[#8B98A5]">
              Prefer email? Use the form. It goes straight to{" "}
              {siteConfig.email}.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-3">
          <form onSubmit={onSubmit} noValidate className="glass-card rounded-2xl p-7" aria-label="Contact form">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-[#E6EDF3]">
                  Your name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className="min-h-[48px] w-full rounded-xl border border-white/10 bg-white/5 px-4 text-[#E6EDF3] placeholder:text-[#8B98A5]"
                  placeholder="Your name"
                />
                {errors.name && <p id="name-error" role="alert" className="mt-1 text-sm text-red-400">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-[#E6EDF3]">
                  Your email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="min-h-[48px] w-full rounded-xl border border-white/10 bg-white/5 px-4 text-[#E6EDF3] placeholder:text-[#8B98A5]"
                  placeholder="you@example.com"
                />
                {errors.email && <p id="email-error" role="alert" className="mt-1 text-sm text-red-400">{errors.email}</p>}
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-[#E6EDF3]">
                Your message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[#E6EDF3] placeholder:text-[#8B98A5]"
                placeholder="Tell me about your project — what do you need, and when?"
              />
              {errors.message && <p id="message-error" role="alert" className="mt-1 text-sm text-red-400">{errors.message}</p>}
            </div>
            {/* Honeypot — leave empty. Hidden from real users. */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <button
              type="submit"
              disabled={status.kind === "sending"}
              className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#14E3C6] px-7 font-semibold text-[#070B10] hover:bg-[#2DD4BF] disabled:opacity-60"
            >
              {status.kind === "sending" ? "Sending…" : "Send message"}
            </button>
            {status.kind === "success" && (
              <p role="status" className="mt-4 rounded-xl bg-[#14E3C6]/10 p-4 text-sm font-medium text-[#14E3C6]">
                {status.message}
              </p>
            )}
            {status.kind === "error" && (
              <p role="alert" className="mt-4 rounded-xl bg-red-500/10 p-4 text-sm font-medium text-red-400">
                {status.message}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
