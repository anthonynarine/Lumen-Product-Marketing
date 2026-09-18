import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CTABanner } from "@/components/layout/CTABanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Imaging & DICOM",
  description:
    "Still image storage, cine storage, DICOM ingestion, and image-to-exam linkage — the report and the images belong to the same study.",
};

const capabilities = [
  { title: "Still image storage", description: "Captured stills are stored and linked directly to their exam segment." },
  { title: "Cine storage", description: "Cine clips are stored alongside stills as part of the same study record." },
  { title: "DICOM objects", description: "DICOM objects are ingested and retained with their native metadata intact." },
  { title: "Study & series metadata", description: "Study and series-level metadata is preserved for retrieval and review." },
  { title: "Image-to-exam linkage", description: "Every image or clip is linked to the exam and segment it documents." },
  { title: "DICOM ingestion & retrieval", description: "Images move in and out of Lumen in standard DICOM form." },
  { title: "In-app viewing", description: "Stills and cine are viewable directly alongside the structured report." },
  { title: "Future PACS interoperability", description: "Designed to support PACS integration as a future connection point." },
];

export default function ImagingPage() {
  return (
    <>
      <PageHero
        eyebrow="Imaging & DICOM"
        title="The report and the images belong to the same study"
        description="Lumen treats imaging as a first-class part of the exam record — not a separate attachment system bolted onto a report."
      />

      <section className="border-b border-line bg-ink-elevated py-16 sm:py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="Imaging capabilities"
            title="Stills, cine, and DICOM in one linked record"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((capability) => (
              <div key={capability.title} className="hover-card rounded-xl border border-line-strong bg-ink-card p-6">
                <h3 className="text-sm font-semibold text-foreground">{capability.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner
        title="See imaging and reporting linked in one study"
        description="Ask for a walkthrough of how stills, cine, and DICOM objects attach to a live exam record."
      />
    </>
  );
}
