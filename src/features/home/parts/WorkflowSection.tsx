"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { pipelineNodes, type PipelineNode } from "@/features/home/pipelineData";

const LAST_INDEX = pipelineNodes.length - 1;
const CLINICAL_START = 1;
const CLINICAL_END = 8;
const CLINICAL_COUNT = CLINICAL_END - CLINICAL_START + 1;
const WALK_INTERVAL_MS = 1600;

// Ordering EHRs shown on the origin card — the three largest US hospital
// EHR vendors by market share. (Siemens Healthineers is a major imaging/RIS
// vendor, not an EHR, so it's not listed here — Lumen still connects to it
// on the imaging side, just not as an order source.) Epic is the source in
// this walkthrough, so it gets the highlighted pill.
const EHR_VENDORS = ["Epic", "Oracle Health", "MEDITECH"];

// A stand-in accession/MRN pair, held constant across every station — the
// same packet, the same two identifiers, start to finish.
const DEMO_ACCESSION = "ACC-48219";
const DEMO_MRN = "00491822";

type StepState = "future" | "past" | "active";

// A short vertical stub connecting each stacked block to the next — the
// packet's own path from EHR down through the core and out to delivery.
function VerticalConnector() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto h-4 w-px overflow-hidden bg-gradient-to-b from-line-strong to-accent/60"
    >
      <span className="pulse-dot-vertical absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_8px_2px_rgb(var(--color-accent-rgb)/0.6)]" />
    </div>
  );
}

// One station in Lumen's clinical process — a standalone rounded card with
// an icon badge and a status dot, lit up as the packet passes through.
function ClinicalStation({
  node,
  state,
  onSelect,
}: {
  node: PipelineNode;
  state: StepState;
  onSelect: () => void;
}) {
  const Icon = node.icon;
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={state === "active"}
      className={`group flex w-full items-center gap-2.5 rounded-lg border px-3 py-1.5 text-left transition-all duration-300 ${
        state === "active"
          ? "border-accent bg-accent-soft"
          : state === "past"
            ? "border-line-strong bg-ink-elevated"
            : "border-line bg-ink hover:border-line-strong"
      }`}
    >
      <span
        className={`font-mono text-[10px] tabular-nums transition-colors ${
          state === "future" ? "text-foreground-muted/50" : "text-accent"
        }`}
      >
        {node.code}
      </span>
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-colors ${
          state === "future" ? "bg-ink-elevated text-foreground-muted" : "bg-accent-soft text-accent"
        }`}
      >
        <Icon aria-hidden="true" className="h-3 w-3" />
      </span>
      <span
        className={`flex-1 text-sm font-medium transition-colors ${
          state === "future" ? "text-foreground-muted" : "text-foreground"
        }`}
      >
        {node.title}
      </span>
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300 ${
          state === "active"
            ? "bg-accent shadow-[0_0_6px_2px_rgb(var(--color-accent-rgb)/0.6)]"
            : state === "past"
              ? "bg-accent/70"
              : "bg-line-strong"
        }`}
      />
    </button>
  );
}

function InspectField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-line-strong bg-ink p-3">
      <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-foreground-muted/70">
        {label}
      </span>
      <span className="text-sm font-semibold text-foreground">{value}</span>
    </div>
  );
}

export function WorkflowSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isWalking) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev >= LAST_INDEX) {
          setIsWalking(false);
          return prev;
        }
        return prev + 1;
      });
    }, WALK_INTERVAL_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isWalking]);

  const selectNode = (index: number) => {
    setIsWalking(false);
    setActiveIndex(index);
  };

  const handleWalkToggle = () => {
    if (isWalking) {
      setIsWalking(false);
      return;
    }
    if (activeIndex >= LAST_INDEX) {
      setActiveIndex(0);
    }
    setIsWalking(true);
  };

  const handleReset = () => {
    setIsWalking(false);
    setActiveIndex(0);
  };

  const current = pipelineNodes[activeIndex];
  const origin = pipelineNodes[0];
  const clinicalNodes = pipelineNodes.slice(CLINICAL_START, CLINICAL_END + 1);
  const deliveryNodes = pipelineNodes.slice(CLINICAL_END + 1);
  const stationsCleared = Math.min(Math.max(activeIndex - CLINICAL_START + 1, 0), CLINICAL_COUNT);

  const stateFor = (index: number): StepState =>
    activeIndex === index ? "active" : activeIndex > index ? "past" : "future";

  return (
    <section className="border-b border-line bg-ink py-20 sm:py-28" id="workflow">
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-2xl flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              The connected pipeline
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              From an Epic order to storage
            </h2>
            <p className="text-base leading-relaxed text-foreground-muted sm:text-lg">
              One packet. It is born in the EHR, scheduled, captured, measured, signed, then
              written back to Epic and PACS. Nothing forks off the line.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="flex items-center gap-2 rounded-full border border-line-strong px-3 py-1.5 text-xs font-medium text-foreground-muted">
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full ${
                  isWalking ? "pulse-dot-vertical bg-accent shadow-[0_0_6px_2px_rgb(var(--color-accent-rgb)/0.6)]" : "bg-line-strong"
                }`}
              />
              {isWalking ? `Walking · ${current.title}` : "Idle"}
            </span>
            <Button variant="secondary" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="secondary" onClick={handleWalkToggle}>
              {isWalking ? "Pause packet" : "Walk the packet"}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          {/* Left: the packet's own path, top to bottom — order arrives, runs
              through the core, ships downstream. */}
          <div className="flex flex-col gap-3 rounded-2xl border border-line-strong bg-ink-card p-4 sm:p-5">
            {/* Order arrives */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                Order arrives
              </span>
              <button
                type="button"
                onClick={() => selectNode(0)}
                aria-pressed={activeIndex === 0}
                className={`hover-card w-full cursor-pointer rounded-xl border p-3.5 text-left transition ${
                  activeIndex === 0 ? "border-accent bg-accent-soft" : "border-line-strong bg-ink-elevated"
                }`}
              >
                <div className="flex flex-wrap items-center gap-1.5">
                  {EHR_VENDORS.map((vendor, i) => (
                    <span
                      key={vendor}
                      className={
                        i === 0
                          ? "rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold text-accent-foreground"
                          : "rounded-full border border-line-strong bg-ink px-2.5 py-1 text-[10px] font-medium text-foreground-muted"
                      }
                    >
                      {vendor}
                    </span>
                  ))}
                  <span className="text-sm font-semibold text-foreground">{origin.title}</span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{origin.blurb}</p>
              </button>
            </div>

            <VerticalConnector />

            {/* Lumen's clinical process — the core */}
            <div className="flex flex-col gap-3 rounded-2xl border border-accent bg-gradient-to-b from-accent-soft to-ink-card p-4 shadow-[0_0_45px_-18px_rgb(var(--color-accent-rgb)/0.4)] sm:p-5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Lumen&apos;s clinical process
                </span>
                <span className="font-mono text-[10px] text-foreground-muted/70">8 stations, one line</span>
              </div>
              <div className="flex flex-col gap-1">
                {clinicalNodes.map((node, i) => (
                  <ClinicalStation
                    key={node.id}
                    node={node}
                    state={stateFor(CLINICAL_START + i)}
                    onSelect={() => selectNode(CLINICAL_START + i)}
                  />
                ))}
              </div>
            </div>

            <VerticalConnector />

            {/* Delivered downstream */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                Delivered downstream
              </span>
              <div className="grid gap-3 sm:grid-cols-2">
                {deliveryNodes.map((node, i) => {
                  const state = stateFor(CLINICAL_END + 1 + i);
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => selectNode(CLINICAL_END + 1 + i)}
                      aria-pressed={state === "active"}
                      className={`hover-card w-full cursor-pointer rounded-xl border p-3.5 text-left transition ${
                        state === "active"
                          ? "border-accent bg-accent-soft"
                          : state === "past"
                            ? "border-accent/40 bg-ink-elevated"
                            : "border-line-strong bg-ink-elevated"
                      }`}
                    >
                      <h3 className="text-sm font-semibold text-foreground">{node.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{node.blurb}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: live inspect panel for whatever station is selected */}
          <div className="flex flex-col gap-6 rounded-2xl border border-line-strong bg-ink-card p-6 sm:sticky sm:top-24 sm:p-8">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {current.who}
              </span>
              <h3 className="text-2xl font-semibold text-foreground">
                {current.code} &middot; {current.title}
              </h3>
              <p className="text-sm leading-relaxed text-foreground-muted">{current.note}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <InspectField label="Source" value={current.artifact} />
              <InspectField label="System" value={current.system} />
              <InspectField label="Accession" value={DEMO_ACCESSION} />
              <InspectField label="MRN" value={DEMO_MRN} />
            </div>

            <div className="flex flex-wrap gap-2">
              {current.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-line-strong px-3 py-1 font-mono text-xs text-foreground-muted"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs text-foreground-muted">
                <span>Packet integrity</span>
                <span className="font-mono">
                  {stationsCleared} / {CLINICAL_COUNT} stations
                </span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-accent transition-[width] duration-300 ease-out"
                  style={{ width: `${(stationsCleared / CLINICAL_COUNT) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
