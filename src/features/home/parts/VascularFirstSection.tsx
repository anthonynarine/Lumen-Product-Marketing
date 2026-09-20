import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { ParticleField } from "@/components/ui/ParticleField";

// Positioning: vascular is not Lumen's scope, it's Lumen's first *engine*.
// The factory/engine split — what is built once versus what each specialty
// defines — is carried by the diagram at the top of the section; this file
// now owns the lab itself, grouped the way a lab thinks about it.

// The vascular lab grouped the way a lab actually thinks about it, rather
// than as a flat list of study names. `live` marks what is built and
// demonstrable today — flip these as each exam lands.
type DomainExam = { name: string; live?: boolean };

// Where each domain sits around the engine at lg, and which edge its connector
// leaves from. Tailwind needs the placement classes as literal strings, so they
// live here in full rather than being assembled at render time. Below lg these
// are ignored entirely and the domains fall back to an ordinary grid.
type Placement = {
  cell: string;
  side: "left" | "right" | "bottom";
};

// The four facets the engine contributes to every domain. Deliberately the
// same list the render above labels on the red block, so the picture and the
// diagram never drift apart.
const ENGINE_FACETS = ["Anatomy", "Rules", "Language", "Schema"];

const DOMAINS: { name: string; exams: DomainExam[]; at: Placement }[] = [
  {
    name: "Cerebrovascular",
    exams: [{ name: "Carotid", live: true }],
    at: { cell: "lg:col-start-1 lg:row-start-2", side: "left" },
  },
  {
    name: "Peripheral arterial",
    exams: [{ name: "Lower-extremity arterial" }, { name: "Upper-extremity arterial" }],
    at: { cell: "lg:col-start-1 lg:row-start-1", side: "left" },
  },
  {
    name: "Physiologic arterial",
    exams: [{ name: "ABI" }, { name: "PVR / segmental pressures" }],
    at: { cell: "lg:col-start-3 lg:row-start-2", side: "right" },
  },
  {
    name: "Peripheral venous",
    exams: [
      { name: "Lower-extremity venous" },
      { name: "Upper-extremity venous" },
      { name: "Venous reflux" },
    ],
    at: { cell: "lg:col-start-3 lg:row-start-3", side: "right" },
  },
  {
    name: "Visceral vascular",
    exams: [{ name: "Renal" }, { name: "Mesenteric" }, { name: "Aortoiliac / aortic" }, { name: "IVC" }],
    at: { cell: "lg:col-start-1 lg:row-start-3", side: "left" },
  },
  {
    name: "Dialysis access",
    exams: [{ name: "Hemodialysis access" }],
    at: { cell: "lg:col-start-3 lg:row-start-1", side: "right" },
  },
  {
    name: "Postoperative surveillance",
    exams: [{ name: "Bypass graft" }, { name: "Pseudoaneurysm" }, { name: "Targeted follow-up" }],
    at: { cell: "lg:col-start-2 lg:row-start-4", side: "bottom" },
  },
];

// The one domain currently plugged in and running — drives which wall of the
// engine gets its border broken open for that domain's duct to pass through.
const LIVE_DOMAIN = DOMAINS.find((domain) => domain.exams.some((exam) => exam.live));

export function VascularFirstSection() {
  return (
    <section className="border-b border-line bg-ink-elevated py-20 sm:py-28" id="vascular">
      <Container className="flex flex-col gap-16 sm:gap-20">
        <SectionHeading
          eyebrow="Where Lumen begins"
          title="The Vascular Reporting Engine"
          description="Vascular ultrasound is not one exam. It's a family of diagnostic workflows that share infrastructure but differ sharply in protocol, measurements, calculations, criteria, and reporting. Lumen runs all of them through a single exam reporting factory — each study plugs its own clinical rules into a shared pipeline and inherits the same security, tenancy, workflow state, auditability, imaging, and hospital integration underneath."
        />

        {/* ------------------------------------------------------------------
            Beat 1 — the factory and the engine, as one picture. The platform,
            the shared pipeline and the pluggable specialty engine are all here;
            the section heading above carries the same argument as text, so the
            render is never the only place the claim is made.
            ------------------------------------------------------------------ */}
        <figure className="flex flex-col gap-5">
          <div className="overflow-hidden rounded-2xl border border-line-strong bg-ink-card">
            <Image
              src="/images/lumen-exam-reporting-factory.13873e12.jpg"
              alt="The Lumen exam reporting factory: a shared platform of users, exam lifecycle, imaging and integrations feeding a three-stage pipeline — protocol, measure, interpret — with the vascular engine plugged in at the end, contributing anatomy, rules, language and schema, and a finished carotid duplex report coming out."
              width={1792}
              height={1008}
              sizes="(min-width: 1152px) 1088px, 100vw"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="max-w-3xl text-xs leading-relaxed text-foreground-muted">
            The platform and the pipeline are built once. The vascular engine is what plugs into
            the end of it — and what a second specialty would replace without touching anything
            to its left.
          </figcaption>
        </figure>

        {/* ------------------------------------------------------------------
            Beat 2 — the vascular lab, grouped the way a lab thinks about it.
            ------------------------------------------------------------------ */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Domains on the engine
            </h3>
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-foreground-muted/70">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_2px_rgb(var(--color-accent-rgb)/0.6)]"
              />
              built and demonstrable today
            </span>
          </div>

          {/* A hub, not a list. The engine sits at the centre and the domains
              ring it, because the claim is that they are all configurations of
              one engine rather than seven separate products. The ring geometry
              only exists at lg; below that the explicit cell placements are
              dropped and everything falls back to an ordinary grid, so no
              connector is ever drawn between cards that have reflowed. */}
          <div className="rounded-2xl border border-line-strong bg-ink-card p-6 sm:p-8 lg:px-8 lg:py-12">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_minmax(17rem,1.45fr)_1fr] lg:grid-rows-[auto_auto_auto_auto] lg:gap-x-16 lg:gap-y-6">
              {/* The core. Spans the three domain rows so each side connector
                  meets it at its own height. */}
              <div className="relative flex flex-col items-center justify-center gap-2 rounded-2xl border border-accent/50 bg-ink px-6 py-8 text-center shadow-[0_0_45px_-28px_rgb(var(--color-accent-rgb)/0.5)] sm:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:row-span-3">
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <ParticleField count={220} />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(var(--color-accent-rgb)/0.12),rgb(var(--color-accent-rgb)/0.03)_50%,transparent_70%)]"
                  />
                </div>
                {LIVE_DOMAIN ? (
                  // Sits on the border itself (not just inside it), which is
                  // only possible because this box no longer clips its own
                  // children — the particle canvas above is what's clipped now.
                  <span
                    aria-hidden="true"
                    className={`hidden lg:block lg:absolute lg:bg-ink ${
                      LIVE_DOMAIN.at.side === "left"
                        ? "lg:-left-px lg:top-1/2 lg:h-11 lg:w-[3px] lg:-translate-y-1/2"
                        : LIVE_DOMAIN.at.side === "right"
                          ? "lg:-right-px lg:top-1/2 lg:h-11 lg:w-[3px] lg:-translate-y-1/2"
                          : "lg:-bottom-px lg:left-1/2 lg:h-[3px] lg:w-11 lg:-translate-x-1/2"
                    }`}
                  />
                ) : null}
                <h4 className="relative text-sm font-semibold uppercase tracking-[0.15em] text-accent">
                  The vascular engine
                </h4>
                <p className="relative text-xs leading-relaxed text-foreground-muted">
                  One configuration layer. Not a separate application.
                </p>
                <ul className="relative mt-3 flex flex-wrap justify-center gap-1.5">
                  {ENGINE_FACETS.map((facet) => (
                    <li
                      key={facet}
                      className="rounded-full border border-line-strong bg-ink-elevated px-2 py-1 text-[11px] font-medium text-foreground-muted"
                    >
                      {facet}
                    </li>
                  ))}
                </ul>
              </div>

              {DOMAINS.map((domain) => {
                const hasLive = domain.exams.some((exam) => exam.live);
                const { cell, side } = domain.at;

                // Each connector runs from the card's inner edge across the
                // grid gap to the core: 4rem horizontally, 1.25rem vertically.
                const connectorPosition =
                  side === "left"
                    ? "lg:left-full lg:top-1/2"
                    : side === "right"
                      ? "lg:right-full lg:top-1/2"
                      : "lg:bottom-full lg:left-1/2";
                const isVerticalConnector = side === "bottom";
                const connectorSize = isVerticalConnector ? "lg:h-5 lg:w-px" : "lg:h-px lg:w-16";
                const connector = `${connectorPosition} ${connectorSize}`;
                // A ready domain's duct has two rails, like a real pipe wall,
                // running the full gap and touching both the card and the
                // engine flush. Each container's own border is broken open
                // exactly where the duct meets it (see the wall-break patches
                // below), so the rails read as running straight through a cut
                // in the wall rather than stopping at it. Real particles drift
                // through the channel between the rails, not a CSS dot.
                const ductSize = isVerticalConnector
                  ? "lg:h-5 lg:w-10 lg:-translate-x-1/2"
                  : "lg:h-10 lg:w-16 lg:-translate-y-1/2";
                const railClass = isVerticalConnector
                  ? "absolute inset-y-0 w-px bg-accent/70 shadow-[0_0_6px_-1px_rgb(var(--color-accent-rgb)/0.6)]"
                  : "absolute inset-x-0 h-px bg-accent/70 shadow-[0_0_6px_-1px_rgb(var(--color-accent-rgb)/0.6)]";
                const node =
                  side === "left"
                    ? "lg:left-full lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
                    : side === "right"
                      ? "lg:right-full lg:top-1/2 lg:translate-x-1/2 lg:-translate-y-1/2"
                      : "lg:bottom-full lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-1/2";

                return (
                  <div key={domain.name} className={`relative ${cell}`}>
                    {hasLive ? (
                      <div
                        aria-hidden="true"
                        className={`hidden lg:block lg:absolute lg:overflow-hidden ${connectorPosition} ${ductSize}`}
                      >
                        <span className={isVerticalConnector ? `${railClass} left-0` : `${railClass} top-0`} />
                        <span className={isVerticalConnector ? `${railClass} right-0` : `${railClass} bottom-0`} />
                        <ParticleField count={40} />
                      </div>
                    ) : (
                      <span
                        aria-hidden="true"
                        className={`hidden lg:block lg:absolute ${connector} bg-line-strong`}
                      />
                    )}
                    <span
                      aria-hidden="true"
                      className={`hidden lg:block lg:absolute lg:h-1.5 lg:w-1.5 lg:rounded-full ${node} ${
                        hasLive ? "bg-accent" : "bg-line-strong"
                      }`}
                    />

                    <div
                      className={`hover-card relative flex h-full flex-col justify-center gap-2 rounded-xl border p-3 text-center transition ${
                        hasLive ? "border-accent bg-ink-elevated" : "border-line-strong bg-ink"
                      }`}
                    >
                      {hasLive ? (
                        <>
                          <div className="absolute inset-0 overflow-hidden rounded-xl">
                            <ParticleField count={30} />
                          </div>
                          {/* On the border itself, not just inside it — this
                              box no longer clips its own children, so the
                              patch can actually sit on top of the border
                              pixel instead of stopping short of it. */}
                          <span
                            aria-hidden="true"
                            className={`absolute bg-ink-elevated ${
                              side === "left"
                                ? "-right-px top-1/2 h-11 w-[3px] -translate-y-1/2"
                                : side === "right"
                                  ? "-left-px top-1/2 h-11 w-[3px] -translate-y-1/2"
                                  : "-top-px left-1/2 h-[3px] w-11 -translate-x-1/2"
                            }`}
                          />
                        </>
                      ) : null}
                      <h5
                        className={`relative text-[11px] font-semibold uppercase leading-tight tracking-[0.08em] ${
                          hasLive ? "text-accent" : "text-foreground"
                        }`}
                      >
                        {domain.name}
                      </h5>
                      <ul className="relative flex flex-col gap-1">
                        {domain.exams.map((exam) => (
                          <li
                            key={exam.name}
                            className={`text-[11px] leading-snug ${
                              exam.live ? "font-medium text-accent" : "text-foreground-muted/80"
                            }`}
                          >
                            {exam.live ? (
                              <span
                                aria-hidden="true"
                                className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle shadow-[0_0_6px_2px_rgb(var(--color-accent-rgb)/0.6)]"
                              />
                            ) : null}
                            {exam.name}
                          </li>
                        ))}
                      </ul>
                      {hasLive ? (
                        <span className="relative mt-auto inline-flex items-center justify-center self-center rounded-full border border-accent/50 bg-ink px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
                          live
                        </span>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-6 text-center text-xs text-foreground-muted">
              One engine. Domain packs are configuration, not separate applications.
            </p>
          </div>

        </div>

        {/* Beat 3 — carotid demo video slot. The interactive worksheet/engine
            walkthrough that lived here was removed in favour of a recorded
            demo of the real product; drop it in below. */}

        {/* The section's two closing arguments, given equal weight. They were
            previously one bare paragraph and one boxed one, which read as an
            afterthought and a callout rather than a pair. */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2.5 rounded-xl border border-line-strong bg-ink-card p-5 sm:p-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Why vascular first
            </h3>
            <p className="text-sm leading-relaxed text-foreground-muted">
              Vascular is Lumen&apos;s first engine precisely because it is the specialty that
              breaks rigid reporting software: many exam types, facility-specific protocols,
              complex measurements, derived calculations, diagnostic criteria, imaging, and
              highly structured reports. An engine that survives vascular is an engine that
              generalizes.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 rounded-xl border border-line-strong bg-ink-card p-5 sm:p-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Whose criteria
            </h3>
            <p className="text-sm leading-relaxed text-foreground-muted">
              Diagnostic criteria belong to the lab, not to Lumen. Another facility loads its own
              criteria and the same engine grades the same velocities differently &mdash; and the
              reading physician still signs every report.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
