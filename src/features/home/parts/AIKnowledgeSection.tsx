"use client";

import { useEffect, useRef, useState } from "react";
import { FileCheck2, Repeat, ShieldCheck, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

const knowledgeTopics = [
  "Protocols",
  "Procedures",
  "Diagnostic criteria",
  "Measurement technique",
  "Reporting standards",
  "Accreditation requirements",
  "Workflow policy",
];

const guarantees: { icon: LucideIcon; title: string; detail: string }[] = [
  {
    icon: ShieldCheck,
    title: "No invented answers",
    detail:
      "If an answer isn't in approved documentation, Lumen says so — it does not fill the gap with a guess.",
  },
  {
    icon: Repeat,
    title: "Deterministic by design",
    detail:
      "The same question returns the same answer, every time. Nothing is freshly generated per ask.",
  },
  {
    icon: FileCheck2,
    title: "Always sourced",
    detail:
      "Every response names the document and version it came from, and whether it overrides a system default.",
  },
];

type Exchange = {
  id: string;
  question: string;
  retrieval: string[];
  answer: string;
  source: string;
};

const exchanges: (Exchange & { answerWords: string[] })[] = [
  {
    id: "ica-stenosis",
    question: "What criteria are we using for a >70% internal carotid artery stenosis?",
    retrieval: ["Vascular Lab Criteria, v3", "System default velocity criteria"],
    answer:
      "This facility classifies a >70% ICA stenosis using a modified velocity criteria set: PSV greater than 230 cm/s, with ICA/CCA ratio and plaque estimate as supporting criteria.",
    source: "Facility protocol — Vascular Lab Criteria, v3 (overrides system default)",
  },
  {
    id: "renal-stent",
    question: "What's our protocol for a renal artery study in a patient with a prior stent?",
    retrieval: ["Renal Artery Studies — Post-Intervention", "In-stent restenosis thresholds"],
    answer:
      "The in-stent renal artery protocol specifies the required sampling sites, the expected velocity ranges after stent placement, and the thresholds used to flag in-stent restenosis.",
    source: "Facility protocol — Renal Artery Studies, Post-Intervention section",
  },
].map((exchange) => ({ ...exchange, answerWords: exchange.answer.split(" ") }));

// One exchange plays as: the question types in, retrieval runs against the
// approved documents, the answer reveals word by word, then the source line
// settles. Held long enough to read before the next exchange starts.
const TYPE_MS = 24;
const ASK_SETTLE_MS = 420;
const RETRIEVE_MS = 1250;
const WORD_MS = 40;
const ANSWER_SETTLE_MS = 500;
const EXCHANGE_HOLD_MS = 1800;
const LOOP_HOLD_MS = 5200;

// "idle" is the pre-animation (and reduced-motion) state: the full transcript
// is already on screen, so the copy is readable without any JS or motion.
type Phase = "idle" | "asking" | "retrieving" | "answering" | "settled";

type ExchangeStatus = "pending" | "running" | "complete";

export function AIKnowledgeSection() {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const startedRef = useRef(false);

  const [isRunning, setIsRunning] = useState(false);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [typed, setTyped] = useState(0);
  const [revealed, setRevealed] = useState(0);

  const exchange = exchanges[index];

  const restart = () => {
    startedRef.current = true;
    setIndex(0);
    setTyped(0);
    setRevealed(0);
    setPhase("asking");
    setIsRunning(true);
  };

  // Start on first scroll into view, pause when it scrolls away, and skip the
  // whole thing for reduced-motion users (who keep the static transcript).
  useEffect(() => {
    const node = panelRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsRunning(false);
          return;
        }
        if (!startedRef.current) {
          startedRef.current = true;
          setIndex(0);
          setTyped(0);
          setRevealed(0);
          setPhase("asking");
        }
        setIsRunning(true);
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    if (phase === "asking") {
      if (typed < exchange.question.length) {
        const timer = setTimeout(() => setTyped((count) => count + 1), TYPE_MS);
        return () => clearTimeout(timer);
      }
      const timer = setTimeout(() => setPhase("retrieving"), ASK_SETTLE_MS);
      return () => clearTimeout(timer);
    }

    if (phase === "retrieving") {
      const timer = setTimeout(() => setPhase("answering"), RETRIEVE_MS);
      return () => clearTimeout(timer);
    }

    if (phase === "answering") {
      if (revealed < exchange.answerWords.length) {
        const timer = setTimeout(() => setRevealed((count) => count + 1), WORD_MS);
        return () => clearTimeout(timer);
      }
      const timer = setTimeout(() => setPhase("settled"), ANSWER_SETTLE_MS);
      return () => clearTimeout(timer);
    }

    if (phase === "settled") {
      const isLast = index === exchanges.length - 1;
      const timer = setTimeout(
        () => {
          setIndex(isLast ? 0 : index + 1);
          setTyped(0);
          setRevealed(0);
          setPhase("asking");
        },
        isLast ? LOOP_HOLD_MS : EXCHANGE_HOLD_MS,
      );
      return () => clearTimeout(timer);
    }
  }, [isRunning, phase, typed, revealed, index, exchange]);

  const statusFor = (position: number): ExchangeStatus => {
    if (phase === "idle") return "complete";
    if (position < index) return "complete";
    if (position === index) return "running";
    return "pending";
  };

  return (
    <section className="border-b border-line bg-ink py-20 sm:py-28" id="ai">
      <Container className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="AI clinical knowledge"
            title="Ask for the approved answer, not a guess"
            description="Lumen's AI layer retrieves and explains approved institutional protocols, procedures, and diagnostic criteria in natural language. It does not speculate: answers are drawn only from documentation your facility has approved, each one names the source it came from, and the same question returns the same answer every time. Facility-specific criteria stay clearly distinguished from system defaults — and nothing here replaces clinical judgment."
          />
          <ul className="flex flex-wrap gap-2">
            {knowledgeTopics.map((topic) => (
              <li
                key={topic}
                className="hover-card rounded-full border border-line-strong bg-ink-card px-3 py-1.5 text-xs font-medium text-foreground-muted hover:text-foreground"
              >
                {topic}
              </li>
            ))}
          </ul>

          <ul className="flex flex-col gap-3 border-t border-line pt-6">
            {guarantees.map(({ icon: Icon, title, detail }) => (
              <li key={title} className="flex gap-3">
                <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <p className="text-sm leading-relaxed text-foreground-muted">
                  <span className="font-semibold text-foreground">{title}.</span> {detail}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div ref={panelRef} className="rounded-2xl border border-line-strong bg-ink-card p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Synthetic example &middot; not real patient data
            </p>
            <button
              type="button"
              onClick={restart}
              className="rounded-full border border-line-strong px-3 py-1 text-[11px] font-medium text-foreground-muted transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              Replay
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {exchanges.map((item, position) => {
              const status = statusFor(position);
              const isRunningItem = status === "running";
              const isComplete = status === "complete";

              const visibleQuestion = isComplete
                ? item.question
                : isRunningItem
                  ? item.question.slice(0, typed)
                  : "";
              const showCaret = isRunningItem && phase === "asking";
              const isRetrieving = isRunningItem && phase === "retrieving";
              const revealedWords = isComplete
                ? item.answerWords.length
                : isRunningItem && (phase === "answering" || phase === "settled")
                  ? revealed
                  : 0;
              const answerDone = revealedWords >= item.answerWords.length;

              return (
                <div key={item.id} className="flex flex-col gap-4">
                  {/* Question — the full text is rendered invisibly underneath so
                      the bubble never resizes as the question types in. */}
                  <div
                    className={`ml-auto max-w-[85%] rounded-2xl rounded-tr-sm border border-line bg-hover px-4 py-3 text-sm text-foreground transition-opacity duration-300 ${
                      status === "pending" ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <span className="relative block">
                      <span aria-hidden="true" className="invisible">
                        {item.question}
                      </span>
                      <span className="absolute inset-0">
                        {visibleQuestion}
                        {showCaret ? (
                          <span
                            aria-hidden="true"
                            className="caret-blink ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-accent"
                          />
                        ) : null}
                      </span>
                    </span>
                  </div>

                  {/* Answer — same trick: every word is always laid out, and only
                      its opacity changes, so the retrieval step can overlay the
                      bubble without shifting anything below it. */}
                  <div
                    className={`relative mr-auto max-w-[90%] rounded-2xl rounded-tl-sm border border-accent/30 bg-accent-soft px-4 py-4 text-sm leading-relaxed text-foreground transition-opacity duration-300 ${
                      status === "pending" ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <p>
                      {item.answerWords.map((word, wordIndex) => (
                        <span
                          key={`${item.id}-${wordIndex}`}
                          className={`transition-opacity duration-200 ${
                            wordIndex < revealedWords ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          {word}{" "}
                        </span>
                      ))}
                    </p>
                    <p
                      className={`mt-3 border-t border-accent/20 pt-3 text-xs text-foreground-muted transition-opacity duration-500 ${
                        answerDone ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      Source: {item.source}
                      <span className="mt-1 block text-[11px] text-foreground-muted/80">
                        Retrieved verbatim from approved documentation &mdash; not generated.
                      </span>
                    </p>

                    {isRetrieving ? (
                      <div className="absolute inset-0 flex flex-col justify-center gap-2 px-4 py-4">
                        <span className="flex items-center gap-2 text-xs font-medium text-foreground-muted">
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_2px_rgb(var(--color-accent-rgb)/0.5)] pulse-dot-vertical"
                          />
                          Matching against approved documentation
                        </span>
                        <span className="flex flex-wrap gap-2">
                          {item.retrieval.map((document, documentIndex) => (
                            <span
                              key={document}
                              className="rounded-full border border-line-strong bg-ink-card px-2.5 py-1 text-[11px] text-foreground-muted"
                              style={{
                                animationName: "soft-pop",
                                animationDuration: "280ms",
                                animationTimingFunction: "ease-out",
                                animationFillMode: "both",
                                animationDelay: `${documentIndex * 180}ms`,
                              }}
                            >
                              {document}
                            </span>
                          ))}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
