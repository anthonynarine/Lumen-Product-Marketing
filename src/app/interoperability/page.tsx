import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CTABanner } from "@/components/layout/CTABanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { ConnectionMap } from "./ConnectionMap";
import { IntegrationLevels } from "./IntegrationLevels";

export const metadata: Metadata = {
  title: "Interoperability",
  description:
    "Lumen is designed to meet each facility where it is: standalone reporting, reporting with imaging, or full enterprise integration with HL7 and PACS. One product, configured per facility.",
};

const principles = [
  {
    title: "Reporting never waits on a connection",
    description:
      "Lumen is designed so a physician can still review and sign when the imaging gateway or the HL7 interface is down. Work that needs to go out waits in a queue and is delivered once the connection is back. A broken wire should delay a message, not stop a report.",
  },
  {
    title: "One product, a profile per facility",
    description:
      "Every facility runs the same Lumen. What changes is its integration profile: which level it is at, which systems it connects to, and how. Moving from Level 1 to Level 2, or Level 2 to Level 3, is a configuration change, not a migration to a different product.",
  },
];

export default function InteroperabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Interoperability"
        title="Start where the facility is"
        description="A standalone vascular lab, a lab that wants its images on the report, and a hospital running an EMR, an interface engine, and a PACS need different things from Lumen. They get the same product, configured to the level of integration each one is ready for."
      />

      <section className="border-b border-line bg-ink-elevated py-16 sm:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Integration levels"
            title="Three levels, one Lumen"
            description="Each level adds connections on top of the one before. None of them requires the next."
          />

          <IntegrationLevels />
        </Container>
      </section>

      <section className="border-b border-line bg-ink py-16 sm:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="How it holds together"
            title="Integrations are optional. Reporting is not."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="flex flex-col gap-3 rounded-2xl border border-line-strong bg-ink-card p-6 sm:p-8"
              >
                <h3 className="text-xl font-semibold text-foreground">{principle.title}</h3>
                <p className="text-base leading-relaxed text-foreground-muted">{principle.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-ink-elevated py-16 sm:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Level 3 in detail"
            title="Where Lumen meets the rest of the stack"
            description="The full enterprise picture Lumen is designed to support. Two directions. Orders and images in. Signed report, stored study, and charges out — on the wires the hospital already runs."
          />

          <ConnectionMap />
        </Container>
      </section>

      <CTABanner
        title="Tell us which level your facility is at"
        description="Bring your EMR, PACS, or interface engine details — or tell us you have none yet — and we'll walk through where Lumen fits."
      />
    </>
  );
}
