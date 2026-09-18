import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PulseWaveform } from "@/components/ui/PulseWaveform";
import { ctaLinks } from "@/lib/constants";

export function FinalCTASection() {
  return (
    <section className="relative overflow-hidden bg-ink-elevated py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="hero-glow ambient-drift pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_120%,rgb(var(--color-accent-rgb)/0.18),transparent_55%)]"
      />
      <Container className="relative flex flex-col items-center gap-8 text-center">
        <PulseWaveform tone="button" className="max-w-md opacity-40" />
        <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
          Vascular is where Lumen begins.
          <br />
          It is not where Lumen ends.
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-foreground-muted">
          See how one configurable reporting engine connects imaging, AI-guided knowledge, and
          downstream workflow for your clinical environment.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={ctaLinks.demo.href} variant="primary">
            {ctaLinks.demo.label}
          </Button>
          <Button href={ctaLinks.contact.href} variant="secondary">
            {ctaLinks.contact.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
