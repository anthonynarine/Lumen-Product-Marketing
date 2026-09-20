import type { CSSProperties } from "react";
import { Cpu } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

const systems = [
  { label: "EMR", detail: "Structured report delivery" },
  { label: "HL7", detail: "ORU messaging" },
  { label: "DICOM", detail: "Imaging objects & metadata" },
  { label: "PACS", detail: "Designed for future integration" },
  { label: "Interface engines", detail: "Routing and transformation" },
  { label: "Billing systems", detail: "Structured revenue-cycle handoff" },
];

// Fixed row geometry so the harness lines below line up exactly with each
// card's center — must match the `lg:h-16` row height and `lg:gap-3` row
// gap on the system cards.
const ROW_HEIGHT = 64;
const ROW_GAP = 12;
const rowCenter = (index: number) => index * (ROW_HEIGHT + ROW_GAP) + ROW_HEIGHT / 2;
const trunkTop = rowCenter(0);
const trunkBottom = rowCenter(systems.length - 1);
const totalHeight = systems.length * ROW_HEIGHT + (systems.length - 1) * ROW_GAP;

// A quiet gray spark (not the red synapse-flash) travels each wire on a
// shared cycle — the trunk itself stays a plain static line.
const TRAVEL_CYCLE_S = 3.6;
const BRANCH_START_S = 1.3;
const BRANCH_STAGGER_S = 0.15;
const branchDelay = (index: number) => BRANCH_START_S + index * BRANCH_STAGGER_S;

function SolderDot({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      className={`absolute h-2 w-2 rotate-45 rounded-[1px] bg-foreground-muted ring-2 ring-foreground-muted/15 ${className}`}
      style={style}
    />
  );
}

export function InteroperabilitySection() {
  return (
    <section className="border-b border-line bg-ink py-20 sm:py-28" id="interoperability">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Interoperability"
          title="Built to sit inside an existing health-system stack"
          description="Lumen is designed to connect outward, not replace what's already in place — wired into the systems a health system already runs on like a harness into an engine block."
        />

        <div className="rounded-2xl border border-line-strong bg-ink-card p-6 sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-0">
            {/* Lumen core */}
            <div className="relative mx-auto flex w-full max-w-[16rem] shrink-0 flex-col items-center gap-2 rounded-2xl border-2 border-accent/50 bg-ink-card px-6 py-8 text-center lg:mx-0">
              <Cpu aria-hidden="true" className="h-6 w-6 text-accent" />
              <span className="text-sm font-semibold text-foreground">Lumen</span>
              <span className="text-[11px] text-foreground-muted">Reporting &amp; imaging core</span>
              <SolderDot className="right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 lg:block" />
            </div>

            {/* Wiring harness — trunk + one branch per system, hidden below lg since row heights aren't fixed there */}
            <div className="relative hidden shrink-0 lg:block" style={{ width: 64, height: totalHeight }}>
              {/* stub from the Lumen pin to the trunk */}
              <span
                aria-hidden="true"
                className="absolute left-0 h-px w-8 overflow-hidden bg-line-strong"
                style={{ top: totalHeight / 2 }}
              >
                <span
                  className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-foreground-muted shadow-[0_0_8px_2px_rgba(163,167,173,0.5)]"
                  style={{
                    animationName: "synapse-travel",
                    animationDuration: `${TRAVEL_CYCLE_S}s`,
                    animationTimingFunction: "linear",
                    animationIterationCount: "infinite",
                  }}
                />
              </span>
              <SolderDot
                className="left-8 -translate-x-1/2 -translate-y-1/2"
                style={{ top: totalHeight / 2 }}
              />
              {/* vertical trunk */}
              <span
                aria-hidden="true"
                className="absolute left-8 w-px -translate-x-1/2 rounded-full bg-line-strong"
                style={{ top: trunkTop, height: trunkBottom - trunkTop }}
              />
              {/* branch to each system row */}
              {systems.map((system, index) => (
                <span
                  key={system.label}
                  aria-hidden="true"
                  className="absolute left-8 h-px w-8 overflow-hidden bg-line-strong"
                  style={{ top: rowCenter(index) }}
                >
                  <span
                    className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-foreground-muted shadow-[0_0_8px_2px_rgba(163,167,173,0.5)]"
                    style={{
                      animationName: "synapse-travel",
                      animationDuration: `${TRAVEL_CYCLE_S}s`,
                      animationTimingFunction: "linear",
                      animationIterationCount: "infinite",
                      animationDelay: `${branchDelay(index)}s`,
                    }}
                  />
                </span>
              ))}
            </div>

            {/* System cards */}
            <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3 lg:flex lg:flex-col lg:gap-3">
              {systems.map((system) => (
                <div
                  key={system.label}
                  className="relative flex flex-col justify-center gap-1 rounded-lg border border-line-strong bg-ink px-4 py-3 text-center lg:h-16 lg:text-left"
                >
                  <SolderDot className="left-0 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block" />
                  <span className="text-sm font-semibold text-foreground">{system.label}</span>
                  <span className="text-[11px] text-foreground-muted">{system.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
