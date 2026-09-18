import { type ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: ReactNode;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="border-b border-line bg-ink py-16 sm:py-24">
      <Container className="flex flex-col gap-5">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </span>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg">
          {description}
        </p>
      </Container>
    </section>
  );
}
