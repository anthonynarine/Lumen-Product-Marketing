import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { PulseWaveform } from "@/components/ui/PulseWaveform";

const examTypes = [
  "Carotid",
  "Renal",
  "Lower-extremity arterial",
  "Venous",
  "Mesenteric",
  "Dialysis access",
];

const measurementExamples = ["PSV", "EDV", "ICA/CCA ratio", "Waveform pattern", "Plaque characteristics"];

export function VascularFirstSection() {
  return (
    <section className="border-b border-line bg-ink-elevated py-20 sm:py-28" id="vascular">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Where Lumen begins"
          title="Vascular ultrasound, done thoroughly"
          description="Lumen's first fully built specialty is vascular ultrasound — structured worksheets, facility-approved criteria, and automated calculations across the exam types that make up a vascular lab's daily volume."
        />

        <div className="flex flex-wrap gap-2">
          {examTypes.map((exam) => (
            <Badge key={exam}>{exam}</Badge>
          ))}
        </div>

        <div className="rounded-xl border border-line-strong bg-ink-card p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
            Representative measurements
          </p>
          <PulseWaveform tone="accent" className="my-5 opacity-70" />
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {measurementExamples.map((measurement) => (
              <span key={measurement} className="text-sm font-medium text-foreground">
                {measurement}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
