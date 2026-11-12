# Rakibul Hasan — 3D Portfolio

A production-ready 3D portfolio for **Rakibul Hasan, Web Developer & SEO
Professional**. Dark, modern, premium. One visual idea throughout:
*floating glass-and-glow geometry that reacts to the visitor.*

## Live preview

**[Open the live preview](https://muse.ai/s/rakibul-hasan-portfolio-xuxa6kkxfvxnxixlw/tvtbLxxAPOeeL3JxhRXX3mCX8W589jSWYBCwYpvLncA)**

This is a static preview of the same site. The full Next.js source in this
repository is what gets deployed to Vercel.

## What it is

- **Stack:** Next.js 15 (App Router) + TypeScript + Tailwind CSS v4,
  Three.js via React Three Fiber, GSAP ScrollTrigger, Lenis smooth scroll,
  Framer Motion, Vercel Analytics.
- **Sections:** Hero (3D), About, Skills (3D tilt cards + SEO rank-climb
  scene), Projects, Services, Contact, Footer.
- **SEO-first:** real HTML text (never only in the canvas), one H1, JSON-LD
  Person + ProfessionalService, sitemap, robots.txt, Open Graph + Twitter
  cards with a generated 1200×630 OG image.
- **Performance-first:** all 3D is lazy-loaded after first paint
  (`dynamic(..., { ssr: false })`), DPR capped at 1.75, procedural geometry
  only (no downloaded models), rendering paused off-screen, and a static
  gradient hero on low-end / Save-Data devices. Reduced-motion is respected.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in your values (see below)
npm run dev                  # http://localhost:3000
```

## Build & run in production

```bash
npm run build
npm run start
```

## Deploy on Vercel

1. Push this folder to a Git repository (GitHub / GitLab / Bitbucket).
2. In Vercel: **Add New → Project → Import** that repository.
3. Framework is detected automatically (Next.js). No build settings to change.
4. Add environment variables in Vercel → Project → Settings → Environment
   Variables (see below), then **Deploy**.
5. Point your domain at the Vercel project and set the same domain in
   `src/config/site.config.ts` (`siteUrl`).

## Environment variables

| Variable | Required? | What it does |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No (defaults in config) | Canonical URL, sitemap, OG. Set it in Vercel too. |
| `RESEND_API_KEY` | Only for the contact form | Without it the form returns a clear “email not configured” error and tells visitors to email `hrakibul571@gmail.com` directly. Get a key at resend.com/api-keys. |
| `CONTACT_FROM_EMAIL` | Only with Resend | The “from” address. Use `onboarding@resend.dev` for testing, or a verified domain address. |

No secrets are hardcoded anywhere in the code.

## Edit everything in one place

**`src/config/site.config.ts`** holds: name, email, WhatsApp number,
site URL, location keyword, Google Search Console verification code,
keywords, social links, stats, skills, projects, services and colours.

Before launch, replace every **EDITABLE PLACEHOLDER** in that file:

- [ ] WhatsApp number (`whatsappNumber`, digits only with country code)
- [ ] Domain (`siteUrl`)
- [ ] Location keyword (`locationKeyword`)
- [ ] Google Search Console verification (`googleSiteVerification`)
- [ ] Real stats (projects delivered, years, clients) — currently “—”
- [ ] Real project results — currently placeholder text, no invented numbers
- [ ] Project screenshots — replace `public/projects/bexobd.svg` and
      `public/projects/seo-audit.svg` with real screenshots (same filenames,
      or update the `image` path in the config)
- [ ] Social links — replace the `#` placeholders
- [ ] `RESEND_API_KEY` in Vercel, if you want the contact form to send

## How to add a new project

1. Add a screenshot to `public/projects/` (e.g. `my-project.png`).
2. Copy one object in the `projects` array in
   `src/config/site.config.ts`, change the `slug`, `title`, `category`,
   `summary`, `problem`, `whatIDid`, `result`, `liveUrl`, `image` and
   `imageAlt`.
3. The grid is designed for 4–6 projects. No other file needs changing.

## How to add a new service

Add an object to the `services` array in `src/config/site.config.ts`
(title, benefit, tags).

## File structure

```
src/
  app/
    layout.tsx          Metadata, fonts (Sora + Inter), JSON-LD, Analytics
    page.tsx            Single-page composition
    globals.css         Tailwind v4 theme, glass cards, focus styles
    sitemap.ts          /sitemap.xml
    robots.ts           /robots.txt
    opengraph-image.tsx Generated 1200×630 OG image
    api/contact/route.ts Contact form API (Resend if key set, else 503)
  config/site.config.ts One-file content & settings (edit here first)
  lib/device.ts         Low-end / Save-Data / reduced-motion detection
  components/
    Navbar.tsx  Hero.tsx  About.tsx  Skills.tsx  Projects.tsx
    Services.tsx  Contact.tsx  Footer.tsx  WhatsAppFloat.tsx
    CursorGlow.tsx  SmoothScroll.tsx (Lenis)
    MagneticButton.tsx  TiltCard.tsx  Reveal.tsx
    three/HeroScene.tsx  three/RankClimb.tsx
public/projects/        Screenshot slots (SVG placeholders)
```

## Notes

- No testimonials, client names or results are invented anywhere. Anything
  not yet provided is a clearly marked placeholder.
- The contact form has validation, success/error states and a honeypot
  field (`website`). Bots that fill it get a fake success and nothing is sent.
