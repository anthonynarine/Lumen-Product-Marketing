"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { pipelineNodes, type PipelineNode } from "@/features/home/pipelineData";

const LAST_INDEX = pipelineNodes.length - 1;
const CLINICAL_START = 1;
const CLINICAL_END = 8;
const WALK_INTERVAL_MS = 1600;

// Ordering EHRs shown on the origin card — the three largest US hospital
// EHR vendors by market share. (Siemens Healthineers is a major imaging/RIS
// vendor, not an EHR, so it's not listed here — Lumen still connects to it
// on the imaging side, just not as an order source.)
const EHR_VENDORS = ["Epic", "Oracle Health", "MEDITECH"];

type StepState = "future" | "past" | "active";

// Same connector-pipe language as the interoperability/reporting-engine
// core diagrams — a flanking card gets a short animated stub reaching
// toward the Lumen core in the middle column.
function ConnectorStub({ side }: { side: "left" | "right" }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute top-1/2 hidden h-px w-6 -translate-y-1/2 overflow-hidden lg:block ${
        side === "right"
          ? "right-0 translate-x-full bg-gradient-to-r from-line-strong to-accent/60"
          : "left-0 -translate-x-full bg-gradient-to-l from-line-strong to-accent/60"
      }`}
    >
      <span className="pulse-dot-horizontal absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_8px_2px_rgb(var(--color-accent-rgb)/0.6)]" />
    </span>
  );
}

// One floor in Lumen's clinical process tower, starting with Order at the
// bottom of the stack. Floors sit flush against each other (no gaps, like a
// real building), lit up as the packet passes each level, with the current
// floor picked out by an elevator-style indicator bar and a glowing light.
function ClinicalFloor({
  node,
  state,
  isFirst,
  onSelect,
}: {
  node: PipelineNode;
  state: StepState;
  isFirst: boolean;
  onSelect: () => void;
}) {
  const Icon = node.icon;
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={state === "active"}
      className={`group flex w-full items-center gap-3 border-l-4 px-5 py-3.5 text-left transition-all duration-300 ${
        isFirst ? "" : "border-t border-t-line"
      } ${
        state === "active"
          ? "border-l-accent bg-accent-soft"
          : state === "past"
            ? "border-l-accent/50 bg-ink-elevated"
            : "border-l-transparent bg-ink hover:bg-ink-elevated/60"
      }`}
    >
      <span
        className={`font-mono text-[10px] tabular-nums transition-colors ${
          state === "future" ? "text-foreground-muted/50" : "text-accent"
        }`}
      >
        {node.code}
      </span>
      <Icon
        aria-hidden="true"
        className={`h-4 w-4 shrink-0 transition-colors ${state === "future" ? "text-foreground-muted" : "text-accent"}`}
      />
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
              ? "bg-accent/60"
              : "bg-line-strong"
        }`}
      />
    </button>
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
            <Button variant="secondary" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="secondary" onClick={handleWalkToggle}>
              {isWalking ? "Pause packet" : "Walk the packet"}
            </Button>
          </div>
        </div>

        {/* Three boxes: the order arrives from the EHR, Lumen runs the clinical process as
            layered floors starting with Order, the record ships downstream. The EHR and
            delivery cards share the same compact card style/size. */}
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr_1fr] lg:items-stretch">
          {/* Order arrives */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Order arrives
            </span>
            <button
              type="button"
              onClick={() => selectNode(0)}
              aria-pressed={activeIndex === 0}
              className={`hover-card relative w-full cursor-pointer rounded-xl border p-5 text-left transition ${
                activeIndex === 0 ? "border-accent bg-accent-soft" : "border-line-strong bg-ink-card"
              }`}
            >
              <ConnectorStub side="right" />
              <div className="flex flex-wrap gap-1.5">
                {EHR_VENDORS.map((vendor) => (
                  <span
                    key={vendor}
                    className="rounded-full border border-line-strong bg-ink px-2.5 py-1 text-[10px] font-medium text-foreground-muted"
                  >
                    {vendor}
                  </span>
                ))}
              </div>
              <h3 className="mt-3 text-sm font-semibold text-foreground">{origin.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">{origin.blurb}</p>
            </button>
          </div>

          {/* Lumen's clinical process — the core, shown as a tower of floors starting with Order */}
          <div className="flex flex-col gap-4">
            <span aria-hidden="true" className="invisible text-xs font-semibold uppercase tracking-[0.2em]">
              Core
            </span>
            <div className="flex flex-col gap-6 rounded-2xl border border-accent bg-gradient-to-b from-accent-soft to-ink-card p-8 shadow-[0_0_45px_-18px_rgb(var(--color-accent-rgb)/0.4)]">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Core</span>
                <h3 className="text-2xl font-semibold text-foreground">Lumen&apos;s clinical process</h3>
              </div>
              <div className="overflow-hidden rounded-xl border border-line-strong">
                {clinicalNodes.map((node, i) => (
                  <ClinicalFloor
                    key={node.id}
                    node={node}
                    state={stateFor(CLINICAL_START + i)}
                    isFirst={i === 0}
                    onSelect={() => selectNode(CLINICAL_START + i)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Delivered downstream — pinned to the bottom, mirroring the packet's
              top-to-bottom flow through the core tower (Order at the top floor,
              Final Report at the bottom, then it ships out). */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Delivered downstream
            </span>
            <div className="flex flex-1 flex-col justify-end gap-4">
              {deliveryNodes.map((node, i) => {
                const state = stateFor(CLINICAL_END + 1 + i);
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => selectNode(CLINICAL_END + 1 + i)}
                    aria-pressed={state === "active"}
                    className={`hover-card relative w-full cursor-pointer rounded-xl border p-5 text-left transition ${
                      state === "active"
                        ? "border-accent bg-accent-soft"
                        : state === "past"
                          ? "border-accent/40 bg-ink-card"
                          : "border-line-strong bg-ink-card"
                    }`}
                  >
                    <ConnectorStub side="left" />
                    <h3 className="text-sm font-semibold text-foreground">{node.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">{node.blurb}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Inspect panel */}
        <div className="grid gap-6 rounded-2xl border border-line-strong bg-ink-card p-6 sm:p-8 lg:grid-cols-2">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {current.who}
            </span>
            <h3 className="text-lg font-semibold text-foreground">
              {current.code} &nbsp; {current.title}
            </h3>
            <p className="font-mono text-xs text-foreground-muted">{current.artifact}</p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-foreground-muted">{current.note}</p>
            <div className="flex flex-wrap gap-2">
              {current.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-line-strong px-3 py-1 text-xs font-medium text-foreground-muted"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
