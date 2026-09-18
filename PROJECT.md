# PROJECT.md — Lumen Product Marketing Site

## What this repository is

This repository is the **public product marketing website for Lumen** — a standalone
Next.js application, independent from the Lumen clinical application repository.

Its only job is to explain the product to people evaluating it: health-system executives,
physicians, clinical technologists, informatics leaders, and technical reviewers. It answers
what Lumen is, who it's for, and why it's different — then routes interested visitors to a
demo or a conversation with the team.

## What this repository is not

This is not the clinical application. It does not run the reporting engine, does not store
exam data, does not talk to DICOM/PACS systems, and does not authenticate real clinical users.
See [Public-Site Security Boundary](#public-site-security-boundary) below — this separation is
a hard architectural rule, not an implementation detail.

## Relationship to the Lumen application

| | This repo | The Lumen application |
|---|---|---|
| Audience | Prospects, buyers, evaluators | Clinicians, technologists, admins |
| Data | None (static marketing copy, synthetic examples) | Real clinical/PHI data |
| Auth | None | External JWT auth (Gait) |
| Stack | Next.js (this document) | Django + React + FastAPI (separate repos) |
| Deploy | Independent, public, no VPN/auth required | Tenant-scoped, authenticated |

Screenshots, diagrams, and mock conversations shown on this site describe or illustrate the
Lumen product but are **not generated from or connected to** the live application. All example
data is synthetic.

## Architecture

Feature-oriented structure on top of the Next.js App Router:

```text
src/
├── app/                    # Routes only. Each route composes sections/components.
│   ├── layout.tsx          # Root shell: fonts, metadata, NavBar, Footer
│   ├── page.tsx            # Homepage — composes features/home sections in order
│   ├── product/page.tsx
│   ├── imaging/page.tsx
│   ├── ai/page.tsx
│   ├── interoperability/page.tsx
│   ├── security/page.tsx
│   └── contact/page.tsx
│
├── features/
│   └── home/
│       ├── parts/          # One component per homepage section (Hero, Workflow, ...)
│       └── index.ts         # Barrel export consumed by app/page.tsx
│
├── components/
│   ├── navigation/          # NavBar (client component — mobile menu state)
│   ├── layout/              # Footer, PageHero, CTABanner — shared across routes
│   └── ui/                  # Container, Button, Badge, SectionHeading — primitives
│
├── lib/                     # Site-wide constants (nav links, CTA copy, site config)
└── styles/                  # Reserved for non-Tailwind design tokens if ever needed
```

Key decisions:

- **Server Components by default.** Only `NavBar` is a client component, because it owns
  mobile-menu open/close state. Every homepage section and every secondary page is a Server
  Component — there is no client-side data fetching, no global state library, and no React
  Query on this site, because there is no server state to manage.
- **`features/home/` owns the homepage narrative.** Each of the eleven homepage sections
  (Hero → Workflow → Reporting Engine → Vascular First → Imaging → AI Knowledge → Billing →
  Interoperability → Security → Expansion → Final CTA) is its own file under
  `features/home/parts/`, composed in order by `app/page.tsx`. This keeps the homepage
  readable and lets any one section be revised without touching the others.
- **Secondary pages reuse primitives, not homepage sections.** `/product`, `/imaging`, `/ai`,
  `/interoperability`, `/security`, and `/contact` each write their own copy using the shared
  `components/ui/` and `components/layout/` primitives (`PageHero`, `CTABanner`,
  `SectionHeading`, `Container`, `Badge`, `Button`). Homepage sections in `features/home/`
  are not imported by other routes — the homepage narrative and the deep-dive page narrative
  are allowed to diverge without one edit breaking the other.
- **Design tokens live in `globals.css`, mapped through Tailwind v4's `@theme inline`.**
  Colors (`ink`, `ink-elevated`, `ink-card`, `paper`, `accent`, `foreground`, `line`, …) are
  CSS custom properties, exposed as Tailwind utilities (`bg-ink-card`, `text-accent`,
  `border-line-strong`). Change the palette in one place — `src/app/globals.css` — and every
  component picks it up.

## Tech stack

- Next.js (App Router, Server Components)
- TypeScript
- Tailwind CSS v4 (CSS-variable theme, no `tailwind.config.js` needed)
- ESLint (`eslint-config-next`)

No state-management library, no data-fetching library, and no animation library are used —
none are needed for a static marketing site, and adding one would be scope creep against the
project's own ground rules.

## Public-Site Security Boundary

This is a hard boundary, not a suggestion:

- This site **never** connects to a production clinical database or internal clinical API.
- This site **never** handles, stores, or transmits protected health information (PHI).
- All exam data, patient scenarios, and AI conversation examples shown anywhere on this site
  are **synthetic** — written for illustration, not sourced from real cases.
- The contact flow uses a plain `mailto:` link. There is no form backend, no database, and no
  server-side handler collecting visitor data on this site.
- Security and HIPAA language on this site is deliberately conservative: it describes the
  Lumen application's architecture (organization isolation, facility scoping, authorization
  policy, auditability) without claiming certifications the product does not hold. See
  `docs/Lumen_Homepage.md` for the exact approved phrasing.

## Where the canonical copy lives

The marketing narrative — headlines, section copy, product positioning — is preserved in
[`docs/Lumen_Homepage.md`](docs/Lumen_Homepage.md), independent of the JSX it's implemented in.
If the homepage copy and that document ever disagree, treat that document as intent and the
code as (possibly stale) implementation — update whichever one is wrong.
