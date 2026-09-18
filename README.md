# Lumen — Product Marketing Site

**Clinical reporting. Imaging. AI-guided knowledge. One connected diagnostic workflow.**

Lumen is a configurable clinical diagnostic platform that connects structured reporting,
DICOM imaging, clinical criteria, physician interpretation, interoperability, and billing
preparation into a single workflow:

> **Order → Exam → Imaging → Measurements → Calculations → Interpretation → Physician Review
> → Final Report → Billing Preparation → EMR / PACS**

It starts with vascular ultrasound — carotid, renal, lower-extremity arterial, venous,
mesenteric, and dialysis access studies — but it isn't a vascular tool with a fixed feature
list. It's one reporting engine where measurements, protocols, diagnostic criteria, and
facility-specific rules are configuration, not code. That's what lets it expand into new
specialties, starting with cardiac imaging, without becoming a different product.

**Vascular is where Lumen begins. It is not where Lumen ends.**

This repository is the public website that makes that case — a fast, credible, enterprise-grade
front door for health systems, physicians, technologists, and informatics leaders evaluating
Lumen.

---

## What's in this repository

This is the **public marketing site only** — not the clinical application. See
[Public-Site Security Boundary](#public-site-security-boundary) for exactly what that means,
and [`PROJECT.md`](PROJECT.md) for the full architectural writeup.

| Page | Purpose |
|---|---|
| `/` | Homepage — the full product narrative, in eleven sections |
| `/product` | The reporting engine, in depth |
| `/imaging` | DICOM, stills, cine, and image-to-exam linkage |
| `/ai` | The AI clinical knowledge layer |
| `/interoperability` | EMR / HL7 / DICOM / PACS / billing system connections |
| `/security` | Tenancy, facility scoping, and HIPAA-aligned architecture |
| `/contact` | Request a demo / reach the team |

## Tech stack

- **[Next.js](https://nextjs.org)** — App Router, Server Components by default
- **TypeScript**
- **Tailwind CSS v4** — theme tokens as CSS variables, no `tailwind.config.js` required
- **ESLint** (`eslint-config-next`)

No React Query, no state-management library, no animation library. This is a static marketing
site — see [`PROJECT.md`](PROJECT.md#tech-stack) for why that's a deliberate choice, not an
oversight.

## Local setup

Requires Node.js 20+ and npm.

```bash
npm install
npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # type-check + production build
npm run start   # serve the production build locally
npm run lint    # ESLint
```

### Environment variables

Copy [`example.env`](example.env) to `.env.local` for local development.

| Variable | Purpose | Local default | Production |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL, used for `metadataBase` and Open Graph tags | `http://localhost:3000` | `https://lumenfoundry.net` |

`NEXT_PUBLIC_SITE_URL` must be set to `https://lumenfoundry.net` in the Netlify site's
environment variables so social previews and canonical URLs resolve correctly in production.

## Architecture overview

Feature-oriented structure under `src/`:

```text
src/
├── app/                # Routes — one folder per page, composes sections/primitives
├── features/home/      # Homepage-only content, one component per section
├── components/
│   ├── navigation/      # NavBar (the one client component — mobile menu state)
│   ├── layout/          # Footer, PageHero, CTABanner — shared across routes
│   └── ui/              # Container, Button, Badge, SectionHeading — primitives
├── lib/                 # Site-wide constants (nav links, CTA copy)
└── styles/              # Reserved for non-Tailwind design tokens if ever needed
```

Full rationale for these boundaries — why the homepage doesn't share section components with
the deep-dive pages, why almost everything is a Server Component, how the color system works —
is in [`PROJECT.md`](PROJECT.md#architecture).

The canonical marketing copy (headlines, section narrative, the non-negotiable framing rules
around AI and billing claims) lives in [`docs/Lumen_Homepage.md`](docs/Lumen_Homepage.md),
independent of the JSX that implements it.

## Deployment

This site deploys to **Netlify** at **[lumenfoundry.net](https://lumenfoundry.net)**, using
Netlify's zero-config Next.js support (`netlify.toml` pins the build command and Node version).
There is no database, no server-side session state, and no environment secrets required beyond
`NEXT_PUBLIC_SITE_URL`.

```bash
npm run build
npm run start   # local production preview only — Netlify runs its own build on deploy
```

Before a production deploy:

1. Set `NEXT_PUBLIC_SITE_URL=https://lumenfoundry.net` in the Netlify site's environment
   variables (see [`example.env`](example.env)).
2. Confirm DNS for `lumenfoundry.net` points at Netlify.
3. Confirm the contact address in `src/app/contact/page.tsx` (`hello@lumenfoundry.net`) is a
   real, monitored inbox before launch.
4. Confirm `favicon.ico` and any social-preview assets reflect the final brand, if they change
   after this initial build.

## Public-Site Security Boundary

This site is intentionally isolated from the clinical product it describes:

- It **never** connects to a production clinical database or internal clinical API.
- It **never** handles, stores, or transmits protected health information (PHI).
- All patient scenarios, AI conversation examples, and exam data shown anywhere on this site
  are **synthetic** — written for illustration, not sourced from real cases.
- The contact flow is a plain `mailto:` link. There is no form backend or database on this
  site collecting visitor data.
- HIPAA language on this site is deliberately conservative — see
  [`docs/Lumen_Homepage.md`](docs/Lumen_Homepage.md#9-healthcare-security--securitysectiontsx)
  for the exact approved wording. This site does not claim HIPAA certification.

## Contributing

Keep changes scoped to this repository — it does not share code, dependencies, or deployment
with the Lumen clinical application. See [`PROJECT.md`](PROJECT.md) before adding a new page,
section, or dependency.
