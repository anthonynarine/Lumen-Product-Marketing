"use client";

import { useState } from "react";

// Status rule (docs/Lumen_Homepage.md, "Rules for future edits"): anything not running
// in the Lumen codebase today carries planned: true and renders a "Planned" tag. Statuses
// mirror the /architecture page data (HL7 and DICOM pipelines). Do not drop a tag
// without checking the code.

type Capability = {
  label: string;
  planned?: boolean;
};

type Level = {
  id: string;
  number: number;
  name: string;
  fitsWhen: string;
  summary: string;
  includes: Capability[];
  notNeeded: string[];
};

const levels: Level[] = [
  {
    id: "standalone",
    number: 1,
    name: "Standalone reporting",
    fitsWhen: "A lab that needs structured reports now, with no integration project first.",
    summary:
      "The technologist enters the patient, records measurements and findings, and the physician signs. The report is stored in Lumen. Nothing outside Lumen has to be connected for any of it to work.",
    includes: [
      { label: "Manual patient entry" },
      { label: "Measurements and structured findings" },
      { label: "Physician review and signing" },
      { label: "Signed report storage" },
    ],
    notNeeded: ["A PACS", "An HL7 interface", "An imaging gateway", "Lumen Media"],
  },
  {
    id: "imaging",
    number: 2,
    name: "Reporting + imaging",
    fitsWhen: "A lab that wants stills and cine on the same exam as the report.",
    summary:
      "Everything in Level 1, plus images. A small gateway at the facility receives stills and cine from the ultrasound machine, keeps its own copy, and delivers them to Lumen Media over a mutually authenticated connection. Nothing is deleted locally until Lumen confirms it arrived.",
    includes: [
      { label: "Stills and cine attached to the exam" },
      { label: "Signed-in upload of images from the browser" },
      { label: "Facility gateway delivering over mutual TLS", planned: true },
      { label: "Local buffering with confirmed delivery", planned: true },
      { label: "Automatic retries and failure alerts", planned: true },
      { label: "Configurable local retention after delivery (proposed: 7 days)", planned: true },
    ],
    notNeeded: ["A PACS", "An HL7 interface"],
  },
  {
    id: "enterprise",
    number: 3,
    name: "Enterprise integration",
    fitsWhen: "A hospital with an EMR, an interface engine, and a PACS already in place.",
    summary:
      "Lumen joins the hospital's existing workflow instead of replacing it. Patients and orders arrive over HL7, images stay in the hospital's own PACS, and the finalized report goes back out over HL7 to the chart the order came from. The goal is that the people doing the work notice as little change as possible.",
    includes: [
      { label: "Patient and order messages in over HL7" },
      { label: "Finalized reports out over HL7", planned: true },
      { label: "DICOM workflows with the hospital's existing PACS", planned: true },
      { label: "Workflows matched to the hospital's current reporting system", planned: true },
    ],
    notNeeded: ["Moving the hospital's images into Lumen Media"],
  },
];

export function IntegrationLevels() {
  const [selectedId, setSelectedId] = useState(levels[0].id);
  const selected = levels.find((level) => level.id === selectedId) ?? levels[0];

  return (
    <div className="flex flex-col gap-6">
      <div role="tablist" aria-label="Integration levels" className="grid gap-4 md:grid-cols-3">
        {levels.map((level) => {
          const isActive = level.id === selectedId;
          return (
            <button
              key={level.id}
              type="button"
              role="tab"
              id={`level-tab-${level.id}`}
              aria-selected={isActive}
              aria-controls="level-panel"
              onClick={() => setSelectedId(level.id)}
              className={`hover-card flex cursor-pointer flex-col gap-3 rounded-xl border p-5 text-left transition ${
                isActive ? "border-accent bg-accent-soft" : "border-line-strong bg-ink-card"
              }`}
            >
              <span className="font-mono text-xs uppercase tracking-wide text-accent">
                Level {level.number}
              </span>
              <h3 className="text-lg font-semibold text-foreground">{level.name}</h3>
              <p className="text-sm leading-relaxed text-foreground-muted">{level.fitsWhen}</p>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="level-panel"
        aria-labelledby={`level-tab-${selected.id}`}
        className="grid gap-8 rounded-2xl border border-line-strong bg-ink-card p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr]"
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Level {selected.number}
            </span>
            <h3 className="text-2xl font-semibold text-foreground">{selected.name}</h3>
          </div>
          <p className="text-base leading-relaxed text-foreground-muted">{selected.summary}</p>
          <ul className="flex flex-col gap-2.5">
            {selected.includes.map((capability) => (
              <li key={capability.label} className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-foreground">{capability.label}</span>
                {capability.planned ? (
                  <span className="rounded-full border border-line-strong px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide text-foreground-muted">
                    Planned
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 self-start rounded-xl border border-line bg-ink-elevated p-5">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
            Not required
          </span>
          <ul className="flex flex-col gap-2">
            {selected.notNeeded.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-foreground-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-foreground-muted">
        All three levels are designed to be supported in Lumen&apos;s first production release. Items
        marked Planned are designed but not yet built.
      </p>
    </div>
  );
}
