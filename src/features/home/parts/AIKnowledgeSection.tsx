import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

const knowledgeTopics = [
  "Protocols",
  "Procedures",
  "Diagnostic criteria",
  "Measurement technique",
  "Reporting standards",
  "Accreditation requirements",
  "Workflow policy",
];

export function AIKnowledgeSection() {
  return (
    <section className="border-b border-line bg-ink-elevated py-20 sm:py-28" id="ai">
      <Container className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="AI clinical knowledge"
            title="Ask for the approved answer, not a guess"
            description="Lumen's AI layer retrieves and explains approved institutional protocols, procedures, and diagnostic criteria in natural language. It surfaces the applicable source and distinguishes facility-specific criteria from system defaults — it does not invent policy or replace clinical judgment."
          />
          <ul className="flex flex-wrap gap-2">
            {knowledgeTopics.map((topic) => (
              <li
                key={topic}
                className="hover-card rounded-full border border-line-strong bg-ink-card px-3 py-1.5 text-xs font-medium text-foreground-muted hover:text-foreground"
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-line-strong bg-ink-card p-5 sm:p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
            Synthetic example &middot; not real patient data
          </p>

          <div className="flex flex-col gap-4">
            <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm border border-line bg-hover px-4 py-3 text-sm text-foreground">
              What criteria are we using for 70&ndash;99% internal carotid artery stenosis at
              this facility?
            </div>

            <div className="mr-auto max-w-[90%] rounded-2xl rounded-tl-sm border border-accent/30 bg-accent-soft px-4 py-4 text-sm leading-relaxed text-foreground">
              <p>
                This facility uses a modified velocity criteria set for 70&ndash;99% ICA
                stenosis, requiring PSV &gt; 230 cm/s with supporting ICA/CCA ratio and plaque
                estimate.
              </p>
              <p className="mt-3 border-t border-accent/20 pt-3 text-xs text-foreground-muted">
                Source: Facility protocol &mdash; Vascular Lab Criteria, v3 (overrides system
                default)
              </p>
            </div>

            <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm border border-line bg-hover px-4 py-3 text-sm text-foreground">
              What&apos;s our protocol for a renal artery study in a patient with a prior renal
              artery stent?
            </div>

            <div className="mr-auto max-w-[90%] rounded-2xl rounded-tl-sm border border-accent/30 bg-accent-soft px-4 py-4 text-sm leading-relaxed text-foreground">
              <p>
                Retrieving the in-stent renal artery protocol: sampling sites, expected velocity
                ranges post-stent, and the criteria used to flag in-stent restenosis.
              </p>
              <p className="mt-3 border-t border-accent/20 pt-3 text-xs text-foreground-muted">
                Source: Facility protocol &mdash; Renal Artery Studies, Post-Intervention section
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
