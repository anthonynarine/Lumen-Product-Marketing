import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CTABanner } from "@/components/layout/CTABanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { ConnectionMap } from "./ConnectionMap";

export const metadata: Metadata = {
  title: "Interoperability",
  description:
    "Lumen is designed to connect with EMRs, HL7, DICOM, PACS, interface engines, and billing systems as part of an existing health-system stack.",
};

export default function InteroperabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Interoperability"
        title="Built to connect, not to replace"
        description="The same principle behind Lumen's reporting workflow applies here: the least friction for both sides. Hospital IT keeps the systems they already run — Epic, PACS, interface engines — and the clinical team keeps a workflow that doesn't change shape just because a message crossed a wire."
      />

      <section className="border-b border-line bg-ink-elevated py-16 sm:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Connection points"
            title="Where Lumen meets the rest of the stack"
            description="Not a hub with six equal boxes. Two directions. Orders and images in. Signed report, stored study, and charges out — on the wires the hospital already runs."
          />

          <ConnectionMap />
        </Container>
      </section>

      <CTABanner
        title="Talk through your existing integration requirements"
        description="Bring your EMR, PACS, or interface engine details and we'll walk through how Lumen connects."
      />
    </>
  );
}
