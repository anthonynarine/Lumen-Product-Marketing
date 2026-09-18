"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, FileLock2, ListChecks, Receipt, Stethoscope, Tag, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

// The full arrival sequence for a step: the train travels the horizontal
// segment first, then a single spark drops down the connector and the
// border lights, then the connector settles into its continuous pulse.
const HORIZONTAL_TRAVEL_S = 1;
const VERTICAL_ENTRANCE_S = 0.5;
const CONNECTOR_LOOP_S = 1.2;

// Long enough for the full arrival sequence above to play out, plus a beat
// of the continuous pulse, before Play advances to the next stage.
const WALK_INTERVAL_MS = (HORIZONTAL_TRAVEL_S + VERTICAL_ENTRANCE_S) * 1000 + 900;

// Card width and gap in px, matching the `lg:w-40` / `gap-4` classes on the
// desktop row below — used to place each rail segment exactly between two
// stop centers, so the rail never overhangs past the first or last stop.
const CARD_WIDTH_PX = 160;
const CARD_GAP_PX = 16;
const SEGMENT_WIDTH_PX = CARD_WIDTH_PX + CARD_GAP_PX;
const segmentLeft = (index: number) => index * SEGMENT_WIDTH_PX + CARD_WIDTH_PX / 2;

type BillingStageKind = "bookend" | "gate" | "step";

type BillingStage = {
  code: string;
  kind: BillingStageKind;
  eyebrow: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

const billingStages: BillingStage[] = [
  {
    code: "signed-report",
    kind: "bookend",
    eyebrow: "Signed record",
    icon: FileLock2,
    title: "Signed Report",
    description: "The locked, signed exam — the only source billing prep is allowed to read from.",
  },
  {
    code: "completeness-check",
    kind: "gate",
    eyebrow: "Checkpoint",
    icon: ListChecks,
    title: "Completeness Check",
    description: "Flags exams missing measurements, findings, or sign-off before they move forward.",
  },
  {
    code: "cpt-capture",
    kind: "step",
    eyebrow: "Data capture",
    icon: Tag,
    title: "CPT Capture",
    description: "Procedure-relevant detail already in the exam, surfaced as CPT-ready detail — never re-typed.",
  },
  {
    code: "icd-capture",
    kind: "step",
    eyebrow: "Data capture",
    icon: Stethoscope,
    title: "ICD Capture",
    description: "Diagnosis-relevant findings carried forward from the report in structured form.",
  },
  {
    code: "gap-flag",
    kind: "gate",
    eyebrow: "Checkpoint",
    icon: AlertTriangle,
    title: "Documentation Gap Flag",
    description: "Missing documentation a coder would otherwise chase down manually — caught here instead.",
  },
  {
    code: "structured-handoff",
    kind: "bookend",
    eyebrow: "Deliverable",
    icon: Receipt,
    title: "Structured Handoff",
    description: "A clean, structured package delivered to revenue-cycle review.",
  },
];

const kindBadgeClass: Record<BillingStageKind, string> = {
  bookend: "rounded-full bg-ink-elevated text-foreground-muted",
  gate: "rounded-full bg-accent-soft text-accent ring-2 ring-accent/50",
  step: "rounded-lg bg-ink-elevated text-foreground-muted",
};

// Where a stage sits relative to the current selection: "upcoming" hasn't
// been reached yet, "visited" was passed on the way to the current card,
// "active" is the current card itself.
type StageStatus = "upcoming" | "visited" | "active";

// All kinds share the same resting border — only visited/active state gets
// a red border, checkpoints included. The badge color is what still marks
// a checkpoint as a checkpoint.
const kindCardClass: Record<BillingStageKind, string> = {
  bookend: "border-line-strong bg-ink-card",
  gate: "border-line-strong bg-ink-card",
  step: "border-line-strong bg-ink-card",
};

function BillingStageCard({
  stage,
  status,
  arrivalDelayS,
  onSelect,
}: {
  stage: BillingStage;
  status: StageStatus;
  arrivalDelayS: number;
  onSelect: () => void;
}) {
  const Icon = stage.icon;
  const statusClass =
    status === "active"
      ? "border-accent bg-ink-card"
      : status === "visited"
        ? "border-accent/40 bg-ink-card"
        : kindCardClass[stage.kind];
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={status === "active"}
      style={status === "active" ? { transitionDelay: `${arrivalDelayS}s` } : undefined}
      className={`hover-card w-full cursor-pointer rounded-xl border p-4 text-left transition lg:w-40 lg:shrink-0 ${statusClass}`}
    >
      <div className="flex items-center justify-end">
        <span className={`flex h-8 w-8 items-center justify-center ${kindBadgeClass[stage.kind]}`}>
          <Icon aria-hidden="true" className="h-4 w-4" />
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
          {stage.eyebrow}
        </span>
        <h3 className="text-sm font-semibold text-foreground">{stage.title}</h3>
        <p className="text-xs leading-relaxed text-foreground-muted">{stage.description}</p>
      </div>
    </button>
  );
}

function BillingStop({
  stage,
  status,
  arrivalDelayS,
  onSelect,
}: {
  stage: BillingStage;
  status: StageStatus;
  arrivalDelayS: number;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={status === "active"}
      aria-label={`Highlight ${stage.title}`}
      style={status === "active" ? { transitionDelay: `${arrivalDelayS}s` } : undefined}
      className={`relative z-10 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-ink-elevated transition ${
        status === "active"
          ? "bg-accent shadow-[0_0_8px_2px_rgb(var(--color-accent-rgb)/0.6)]"
          : "bg-line-strong hover:bg-accent/60"
      }`}
    />
  );
}

// The vertical drop from the rail's stop down into its card. A visited or
// active stage keeps this lit, at the same dim tone as the card's resting
// border — only the active stage's stop and spark are bright. On arrival,
// one spark drops down once (after the horizontal train gets there), then
// the connector settles into its continuous pulse for as long as that card
// stays selected, marking it as the current one.
function BillingConnector({ status, arrivalDelayS }: { status: StageStatus; arrivalDelayS: number }) {
  const isLit = status !== "upcoming";
  return (
    <span
      aria-hidden="true"
      className={`relative block h-6 w-px overflow-hidden transition-colors duration-300 ${
        isLit ? "bg-accent/40" : "bg-line-strong"
      }`}
    >
      {status === "active" ? (
        <>
          <span
            className="pulse-dot-vertical absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_8px_2px_rgb(var(--color-accent-rgb)/0.6)]"
            style={{
              animationDuration: `${VERTICAL_ENTRANCE_S}s`,
              animationDelay: `${arrivalDelayS}s`,
              animationIterationCount: 1,
              animationFillMode: "both",
            }}
          />
          <span
            className="pulse-dot-vertical absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_8px_2px_rgb(var(--color-accent-rgb)/0.6)]"
            style={{
              animationDuration: `${CONNECTOR_LOOP_S}s`,
              animationDelay: `${arrivalDelayS + VERTICAL_ENTRANCE_S}s`,
              animationFillMode: "both",
            }}
          />
        </>
      ) : null}
    </span>
  );
}

export function BillingSection() {
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isPlaying) return;

    intervalRef.current = setInterval(() => {
      setSelectedCode((prev) => {
        const currentIndex = billingStages.findIndex((stage) => stage.code === prev);
        const nextIndex = currentIndex + 1;
        if (nextIndex >= billingStages.length - 1) {
          setIsPlaying(false);
        }
        if (nextIndex >= billingStages.length) {
          return prev;
        }
        return billingStages[nextIndex].code;
      });
    }, WALK_INTERVAL_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const selectStage = (code: string) => {
    setIsPlaying(false);
    setSelectedCode(code);
  };

  const activeIndex = billingStages.findIndex((stage) => stage.code === selectedCode);

  // Tracks the index from before the latest selection change, so the train
  // animation can figure out which single segment was just crossed and in
  // which direction — the ref only updates after render, so during the
  // render where activeIndex just changed, this still holds the old value.
  const previousIndexRef = useRef(activeIndex);
  const previousIndex = previousIndexRef.current;
  useEffect(() => {
    previousIndexRef.current = activeIndex;
  }, [activeIndex]);

  const steppedByOne = previousIndex !== -1 && activeIndex !== -1 && Math.abs(activeIndex - previousIndex) === 1;
  const travelSegmentIndex = steppedByOne ? Math.min(activeIndex, previousIndex) : -1;
  const travelDirection: "forward" | "backward" = activeIndex < previousIndex ? "backward" : "forward";
  // The connector's entrance spark starts after the horizontal train arrives
  // (0 on desktop when there's no horizontal leg — first click, a jump, or
  // mobile, which has no rail at all). The card/stop highlight then waits
  // for that spark to actually land, so the animation is what lights the
  // border — it never lights on its own ahead of the motion.
  const desktopArrivalDelayS = steppedByOne ? HORIZONTAL_TRAVEL_S : 0;
  const desktopHighlightDelayS = desktopArrivalDelayS + VERTICAL_ENTRANCE_S;
  const mobileHighlightDelayS = VERTICAL_ENTRANCE_S;

  const handlePlayToggle = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    const currentIndex = billingStages.findIndex((stage) => stage.code === selectedCode);
    if (currentIndex === -1 || currentIndex >= billingStages.length - 1) {
      setSelectedCode(billingStages[0].code);
    }
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setSelectedCode(null);
  };

  return (
    <section className="border-b border-line bg-ink py-20 sm:py-28" id="billing">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Billing preparation"
          title="The exam already has the answers. Billing prep should use them."
          description="Because Lumen already understands the exam performed, the measurements taken, the findings recorded, and the diagnosis information in the final report, it can carry that record through billing prep as one continuous flow — not five disconnected features."
        />

        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
            The billing assembly line
          </span>
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={handleReset} className="px-4 py-1.5 text-xs">
              Reset
            </Button>
            <Button variant="secondary" onClick={handlePlayToggle} className="px-4 py-1.5 text-xs">
              {isPlaying ? "Pause" : "Play"}
            </Button>
          </div>
        </div>

        {/* Desktop: rail segments span exactly between stop centers — nothing overhangs past the
            first or last stop — and each segment lights up once the path has crossed it. */}
        <div className="hidden overflow-x-auto pb-3 pt-2 lg:block">
          <div className="relative w-max">
            {billingStages.slice(0, -1).map((stage, index) => {
              const isLit = activeIndex > index;
              const isTraveling = index === travelSegmentIndex;
              return (
                <span
                  key={stage.code}
                  aria-hidden="true"
                  className={`absolute top-[5px] h-px overflow-hidden transition-colors duration-500 ${
                    isLit ? "bg-accent/40" : "bg-line-strong"
                  }`}
                  style={{ left: segmentLeft(index), width: SEGMENT_WIDTH_PX }}
                >
                  {isTraveling ? (
                    <span
                      key={activeIndex}
                      className="pulse-dot-horizontal absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_8px_2px_rgb(var(--color-accent-rgb)/0.6)]"
                      style={{
                        animationDuration: `${HORIZONTAL_TRAVEL_S}s`,
                        animationIterationCount: 1,
                        animationDirection: travelDirection === "backward" ? "reverse" : "normal",
                      }}
                    />
                  ) : null}
                </span>
              );
            })}
            <div className="relative flex w-max items-start gap-4">
              {billingStages.map((stage, index) => {
                const status: StageStatus =
                  index === activeIndex ? "active" : index < activeIndex ? "visited" : "upcoming";
                return (
                  <div key={stage.code} className="flex w-40 shrink-0 flex-col items-center">
                    <BillingStop
                      stage={stage}
                      status={status}
                      arrivalDelayS={desktopHighlightDelayS}
                      onSelect={() => selectStage(stage.code)}
                    />
                    <BillingConnector status={status} arrivalDelayS={desktopArrivalDelayS} />
                    <BillingStageCard
                      stage={stage}
                      status={status}
                      arrivalDelayS={desktopHighlightDelayS}
                      onSelect={() => selectStage(stage.code)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: vertical flow, one stop and connector above each card */}
        <div className="flex flex-col items-stretch gap-4 lg:hidden">
          {billingStages.map((stage, index) => {
            const status: StageStatus =
              index === activeIndex ? "active" : index < activeIndex ? "visited" : "upcoming";
            return (
              <div key={stage.code} className="flex flex-col items-center">
                <BillingStop
                  stage={stage}
                  status={status}
                  arrivalDelayS={mobileHighlightDelayS}
                  onSelect={() => selectStage(stage.code)}
                />
                <BillingConnector status={status} arrivalDelayS={0} />
                <BillingStageCard
                  stage={stage}
                  status={status}
                  arrivalDelayS={mobileHighlightDelayS}
                  onSelect={() => selectStage(stage.code)}
                />
              </div>
            );
          })}
        </div>

        <p className="max-w-2xl rounded-xl border border-line-strong bg-ink-card p-4 text-sm leading-relaxed text-foreground-muted">
          Lumen prepares structured information for human review. It does not perform autonomous
          billing or coding decisions — the checkpoints above surface gaps, a coder still makes the call.
        </p>
      </Container>
    </section>
  );
}
