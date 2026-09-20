import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

const cardiacScope = [
  "Chamber measurements",
  "Doppler values",
  "Ventricular function",
  "Valve measurements",
  "Calculated cardiac metrics",
  "Physician interpretation",
  "Image and cine review",
];

export function ExpansionSection() {
  return (
    <section className="border-b border-line bg-ink py-20 sm:py-28" id="beyond-vascular">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Planned expansion"
          title="Beyond vascular: cardiac imaging"
          description="The same reporting engine that powers vascular ultrasound is designed to support cardiac imaging as a future specialty — new measurements and criteria configured on the existing platform, not a new application."
        />

        <div className="flex flex-wrap gap-2">
          {cardiacScope.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>

        <p className="max-w-2xl text-sm text-foreground-muted">
          Cardiac imaging capabilities are planned expansion and designed to support future
          release &mdash; not part of Lumen&apos;s current production scope.
        </p>
      </Container>
    </section>
  );
}
