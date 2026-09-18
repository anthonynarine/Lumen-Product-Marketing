"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

type EngineCapability = {
  id: string;
  title: string;
  detail: string;
  tag: string;
  description: string;
};

const configured: EngineCapability[] = [
  {
    id: "measurements",
    title: "Measurements",
    detail: "Define the exact fields an exam captures, segment by segment.",
    tag: "segment-level fields",
    description:
      "Every exam type declares its own measurement fields, segment by segment, so a worksheet only ever asks for what that exam actually needs.",
  },
  {
    id: "protocols",
    title: "Protocols",
    detail: "The steps a technologist follows for a given exam type.",
    tag: "IAC-based, customizable",
    description:
      "Protocols encode the steps a technologist follows for a given exam type. They're fully customizable, with IAC guidelines as the base.",
  },
  {
    id: "criteria",
    title: "Criteria",
    detail: "The diagnostic thresholds a facility has approved.",
    tag: "IAC-based, facility-approved",
    description:
      "Diagnostic thresholds attach per facility, following IAC criteria guidelines — so findings are always read against the standard that facility signed off on.",
  },
];

const core: EngineCapability = {
  id: "core",
  title: "Reporting engine",
  detail: "Configured per exam. Consistent across every specialty.",
  tag: "one engine, many exams",
  description:
    "One reporting engine. Six configurable parts — measurements, protocols, criteria, calculations, facility rules, and output — assembled per exam type, not rebuilt from scratch.",
};

const automated: EngineCapability[] = [
  {
    id: "calculations",
    title: "Calculations",
    detail: "Ratios and clinical values derived from measurements.",
    tag: "derived automatically",
    description:
      "Ratios and clinical values are derived automatically from recorded measurements — no separate spreadsheet, no manual math.",
  },
  {
    id: "facility-rules",
    title: "Facility-specific rules",
    detail: "Override defaults per site without forking the exam definition.",
    tag: "per-site overrides",
    description:
      "A facility can override defaults for its own site without forking the exam definition — the rest of the engine stays shared.",
  },
  {
    id: "output",
    title: "Output requirements",
    detail: "What a finalized report includes and how it's delivered.",
    tag: "report shape & delivery",
    description:
      "What a finalized report includes, and how it's delivered downstream, is shaped per exam type — without changing how the engine itself works.",
  },
];

export function ReportingEngine() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const all = [...configured, core, ...automated];
  const selected = all.find((item) => item.id === selectedId) ?? null;

  return (
    <Container className="flex flex-col gap-10">
      <SectionHeading
        eyebrow="The reporting engine"
        title="Clinical rules change. The engine does not."
        description="Every exam type Lumen supports is a configuration on top of one reporting engine — not a separate application. That's what lets Lumen add specialties without rebuilding the platform underneath them."
      />

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr_1.3fr]">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
            Configured
          </span>
          <div className="flex flex-col gap-4">
            {configured.map((item) => (
              <EngineCard
                key={item.id}
                item={item}
                isActive={selectedId === item.id}
                onSelect={() => setSelectedId(item.id)}
                connectorSide="right"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span aria-hidden="true" className="invisible text-xs font-semibold uppercase tracking-[0.2em]">
            Core
          </span>
          <button
            type="button"
            onClick={() => setSelectedId(null)}
            aria-pressed={selectedId === null}
            className={`flex flex-1 cursor-pointer flex-col justify-between gap-10 rounded-2xl border bg-gradient-to-b from-accent-soft to-ink-card p-8 text-left transition ${
              selectedId === null
                ? "border-accent shadow-[0_0_45px_-18px_rgb(var(--color-accent-rgb)/0.4)]"
                : "border-accent/60 shadow-[0_0_30px_-18px_rgb(var(--color-accent-rgb)/0.25)] hover:border-accent"
            }`}
          >
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Core</span>
              <h3 className="text-2xl font-semibold text-foreground">{core.title}</h3>
              <p className="text-sm leading-relaxed text-foreground-muted">{core.detail}</p>
            </div>
            <p className="font-mono text-xs uppercase tracking-wide text-foreground-muted/70">
              {core.tag}
            </p>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
            Automated
          </span>
          <div className="flex flex-col gap-4">
            {automated.map((item) => (
              <EngineCard
                key={item.id}
                item={item}
                isActive={selectedId === item.id}
                onSelect={() => setSelectedId(item.id)}
                connectorSide="left"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 rounded-2xl border border-line-strong bg-ink-card p-8 sm:flex-row sm:items-center sm:gap-10">
        <div className="flex shrink-0 flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Core</span>
          <span className="text-xl font-semibold text-foreground">{core.title}</span>
          <span className="font-mono text-xs text-foreground-muted/70">{core.tag}</span>
        </div>
        <p className="text-base leading-relaxed text-foreground-muted">
          {selected ? selected.description : core.description}
        </p>
      </div>
    </Container>
  );
}

function EngineCard({
  item,
  isActive,
  onSelect,
  connectorSide,
}: {
  item: EngineCapability;
  isActive: boolean;
  onSelect: () => void;
  connectorSide: "left" | "right";
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      className={`hover-card relative w-full cursor-pointer rounded-xl border p-5 text-left transition ${
        isActive ? "border-accent bg-accent-soft" : "border-line-strong bg-ink-card"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute top-1/2 hidden h-px w-6 -translate-y-1/2 overflow-hidden lg:block ${
          connectorSide === "right"
            ? "right-0 translate-x-full bg-gradient-to-r from-line-strong to-accent/60"
            : "left-0 -translate-x-full bg-gradient-to-l from-line-strong to-accent/60"
        }`}
      >
        <span className="pulse-dot-horizontal absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_8px_2px_rgb(var(--color-accent-rgb)/0.6)]" />
      </span>
      <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">{item.detail}</p>
      <p className="mt-3 font-mono text-xs text-foreground-muted/70">{item.tag}</p>
    </button>
  );
}
