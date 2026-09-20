import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ParticleField } from "@/components/ui/ParticleField";
import { ctaLinks } from "@/lib/constants";

function LiveDot({ className = "" }: { className?: string }) {
  return (
    <span className={`relative flex h-1.5 w-1.5 ${className}`} aria-hidden="true">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_rgb(var(--color-accent-rgb)/0.5)]" />
    </span>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-ink">
      <ParticleField />
      <div aria-hidden="true" className="hero-bloom-r" />
      <div aria-hidden="true" className="hero-bloom-l" />
      <div aria-hidden="true" className="hero-grid" />

      <Container className="relative flex min-h-[calc(100vh-4rem)] items-center py-20 sm:py-28 lg:py-32">
        <div className="flex max-w-3xl flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line-strong bg-hover px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-foreground-muted">
            <LiveDot />
            Vascular ultrasound reporting, built to expand
          </span>

          <h1 className="hero-title text-foreground">
            Clinical reporting.
            <br />
            Imaging.
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
            <Button href={ctaLinks.demo.href} variant="accent">
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
      </Container>
    </section>
  );
}
