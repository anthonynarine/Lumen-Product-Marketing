"use client";

import { useState } from "react";

type ConnectionItem = {
  id: string;
  title: string;
  detail: string;
  code: string;
  description: string;
};

const inbound: ConnectionItem[] = [
  {
    id: "inbound-emrs",
    title: "EMRs",
    detail: "Order in from the chart — Epic and peers",
    code: "FHIR ServiceRequest / ORM",
    description:
      "A doctor places the order in the EMR, the same way they always have. Lumen picks it up automatically, so no one has to re-type the patient or exam details.",
  },
  {
    id: "inbound-modality",
    title: "Modality",
    detail: "Stills and cine land on the same accession",
    code: "DICOM",
    description:
      "Images and video from the ultrasound machine attach to the right exam by themselves. Nothing has to be filed or matched up by hand.",
  },
];

const core: ConnectionItem = {
  id: "core",
  title: "Lumen",
  detail: "Reporting and imaging core",
  code: "Owns the packet",
  description:
    "Lumen sits at the center of the exam. Every order comes in here, and everything that leaves — the signed report, the stored study, the billing charge — goes back out from here.",
};

const outbound: ConnectionItem[] = [
  {
    id: "outbound-emrs",
    title: "EMRs",
    detail: "Structured report and result delivery",
    code: "ORU / FHIR",
    description:
      "Once a report is signed, it's sent straight back to the EMR — into the same chart the order came from.",
  },
  {
    id: "outbound-pacs",
    title: "PACS",
    detail: "Study stored under the original accession",
    code: "DICOM C-STORE",
    description:
      "The ultrasound images are stored in PACS under the same exam ID as the report, so the two are always easy to find together.",
  },
  {
    id: "outbound-interface",
    title: "Interface engines",
    detail: "Routing and message transformation",
    code: "HL7 / ORU",
    description:
      "Messages travel through the routing system the hospital already has in place — no separate connection to build or maintain.",
  },
  {
    id: "outbound-billing",
    title: "Billing systems",
    detail: "Structured revenue-cycle handoff",
    code: "charge ticket",
    description:
      "Billing codes are pulled straight from the signed report and handed off automatically — nothing gets re-typed for billing.",
  },
];

const defaultSummary =
  "Lumen is not another island in the stack. It sits on the same wires the hospital already runs. It accepts an order. It returns a signed report and a stored study. It never invents a second patient context.";

export function ConnectionMap() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const all = [...inbound, core, ...outbound];
  const selected = all.find((item) => item.id === selectedId) ?? null;

  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr_1.3fr]">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
            Inbound
          </span>
          <div className="flex flex-col gap-4">
            {inbound.map((item) => (
              <ConnectionCard
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
            onClick={() => setSelectedId(core.id)}
            aria-pressed={selectedId === core.id}
            className={`flex flex-1 cursor-pointer flex-col justify-between gap-10 rounded-2xl border bg-gradient-to-b from-accent-soft to-ink-card p-8 text-left transition ${
              selectedId === core.id
                ? "border-accent shadow-[0_0_80px_-10px_rgb(var(--color-accent-rgb)/0.75)]"
                : "border-accent/70 shadow-[0_0_60px_-15px_rgb(var(--color-accent-rgb)/0.5)] hover:border-accent"
            }`}
          >
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Core</span>
              <h3 className="text-2xl font-semibold text-foreground">Lumen</h3>
              <p className="text-sm leading-relaxed text-foreground-muted">{core.detail}</p>
            </div>
            <p className="font-mono text-xs uppercase tracking-wide text-foreground-muted/70">
              Owns the packet
            </p>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
            Outbound
          </span>
          <div className="flex flex-col gap-4">
            {outbound.map((item) => (
              <ConnectionCard
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
          <span className="text-xl font-semibold text-foreground">Lumen</span>
          <span className="font-mono text-xs text-foreground-muted/70">owns the packet</span>
        </div>
        <p className="text-base leading-relaxed text-foreground-muted">
          {selected ? selected.description : defaultSummary}
        </p>
      </div>
    </div>
  );
}

function ConnectionCard({
  item,
  isActive,
  onSelect,
  connectorSide,
}: {
  item: ConnectionItem;
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
      <p className="mt-3 font-mono text-xs text-foreground-muted/70">{item.code}</p>
    </button>
  );
}
