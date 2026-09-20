import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

const imagingCapabilities = [
  "Still image storage",
  "Cine clip storage",
  "DICOM object handling",
  "Study and series metadata",
  "Image-to-exam linkage",
  "DICOM ingestion and retrieval",
  "In-app viewing",
  "Designed for future PACS interoperability",
];

export function ImagingSection() {
  return (
    <section className="border-b border-line bg-ink-elevated py-20 sm:py-28" id="imaging">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Imaging and DICOM"
            title="The report and the images belong to the same study"
            description="Lumen doesn't treat imaging as an attachment. Stills, cine clips, and DICOM objects are captured, stored, and linked directly to the exam they document — so the report a physician signs and the images behind it are always the same record."
          />
          <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {imagingCapabilities.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-foreground-muted">
                <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-line-strong bg-ink-card p-2">
          <div className="rounded-xl border border-line bg-ink p-6">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                Study 04821 &middot; Carotid
              </span>
              <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent">
                Linked
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="flex aspect-square items-center justify-center rounded-lg border border-line bg-ink-elevated text-[10px] font-medium text-foreground-muted"
                >
                  {index < 4 ? `IMG ${index + 1}` : "CINE"}
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-1.5 border-t border-line pt-4 text-xs text-foreground-muted">
              <p>Series: 2 &middot; Instances: 6 &middot; Modality: US</p>
              <p>Linked exam segments: Right ICA, Left ICA, Bulb</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
