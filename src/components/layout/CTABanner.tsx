import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ctaLinks } from "@/lib/constants";

type CTABannerProps = {
  title: string;
  description: string;
};

export function CTABanner({ title, description }: CTABannerProps) {
  return (
    <section className="bg-ink-elevated py-16 sm:py-24">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-foreground-muted sm:text-base">
          {description}
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
