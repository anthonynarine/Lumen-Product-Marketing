import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { PulseWaveform } from "@/components/ui/PulseWaveform";
import { ctaLinks } from "@/lib/constants";

const pipelineStages = [
  "Order",
  "Exam",
  "Imaging",
  "Measurements",
  "Calculations",
  "Interpretation",
  "Report",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-ink">
      <div
        aria-hidden="true"
        className="hero-glow ambient-drift pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_15%_-10%,rgb(var(--color-accent-rgb)/0.16),transparent_45%),radial-gradient(circle_at_85%_10%,rgb(var(--color-button-rgb)/0.14),transparent_40%)]"
      />
      <PulseWaveform
        tone="accent"
        className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 opacity-[0.15] lg:block"
      />
      <Container className="relative grid gap-14 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-32">
        <div className="flex flex-col gap-8">
          <Badge>Vascular ultrasound reporting, built to expand</Badge>

          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
            Clinical reporting. Imaging.
            <br />
            AI-guided knowledge.
            <br />
            <span className="text-accent">One connected workflow.</span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-foreground-muted">
            Lumen connects structured reporting, DICOM imaging, clinical criteria, physician
            interpretation, interoperability, and billing preparation in one configurable
            platform.
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-line-strong bg-ink-card px-3 py-1.5 text-xs font-medium text-foreground-muted">
              Solo physician practice
            </span>
            <span aria-hidden="true" className="text-line-strong">
              &rarr;
            </span>
            <span className="rounded-full border border-line-strong bg-ink-card px-3 py-1.5 text-xs font-medium text-foreground-muted">
              Multi-facility enterprise health system
            </span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={ctaLinks.demo.href} variant="secondary">
              {ctaLinks.demo.label}
            </Button>
            <Button href={ctaLinks.explore.href} variant="secondary">
              {ctaLinks.explore.label}
            </Button>
          </div>

          <p className="text-sm text-foreground-muted">
            Vascular is where Lumen begins. It is not where Lumen ends.
          </p>
        </div>

        <div className="relative">
          <div className="rounded-2xl border border-line-strong bg-ink-card/80 p-6 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                Diagnostic pipeline
              </p>
              <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-button">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-button opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-button" />
                </span>
                Live
              </span>
            </div>
            <ol className="flex flex-col gap-0">
              {pipelineStages.map((stage, index) => (
                <li key={stage} className="relative flex items-center gap-4 pb-6 last:pb-0">
                  {index < pipelineStages.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute left-[13px] top-7 h-full w-px overflow-hidden bg-gradient-to-b from-accent/60 to-line"
                    >
                      <span
                        className="pulse-dot-vertical absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_8px_2px_rgb(var(--color-accent-rgb)/0.6)]"
                        style={{ animationDelay: `${index * 0.3}s` }}
                      />
                    </span>
                  ) : null}
                  <span
                    aria-hidden="true"
                    className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-ink text-[11px] font-semibold text-accent"
                  >
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-foreground">{stage}</span>
                </li>
              ))}
            </ol>
            <p className="mt-2 border-t border-line pt-4 text-xs text-foreground-muted">
              Every stage is structured data — reusable across exam types and specialties.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
