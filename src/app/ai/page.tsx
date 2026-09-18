import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CTABanner } from "@/components/layout/CTABanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "AI Knowledge",
  description:
    "Lumen's AI layer retrieves and explains approved facility protocols, procedures, and diagnostic criteria in natural language — it does not invent policy.",
};

const topics = [
  "Protocols",
  "Procedures",
  "Diagnostic criteria",
  "Measurement technique",
  "Reporting standards",
  "Accreditation requirements",
  "Workflow policy",
];

export default function AIPage() {
  return (
    <>
      <PageHero
        eyebrow="AI clinical knowledge"
        title="Approved knowledge, in natural language"
        description="Lumen allows clinicians to ask questions about approved institutional protocols, procedures, diagnostic criteria, and reporting standards — and get an answer grounded in a visible, approved source."
      />

      <section className="border-b border-line bg-ink-elevated py-16 sm:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="What it can discuss"
            title="Grounded answers, not generated policy"
            description="The system retrieves and explains approved clinical knowledge. It distinguishes facility-specific criteria from system defaults and keeps the approved source material visible — it never replaces clinical judgment."
          />
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-line-strong bg-ink-card px-4 py-2 text-sm font-medium text-foreground-muted"
              >
                {topic}
              </span>
            ))}
          </div>

          <div className="rounded-2xl border border-line-strong bg-ink-card p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Synthetic example &middot; not real patient data
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground">
              &ldquo;What is our protocol for a renal artery study in a patient with a prior
              renal artery stent?&rdquo;
            </p>
            <p className="mt-3 rounded-xl border border-accent/30 bg-accent-soft p-4 text-sm leading-relaxed text-foreground">
              Retrieving the in-stent renal artery protocol: sampling sites, expected velocity
              ranges post-stent, and the criteria used to flag in-stent restenosis.
              <span className="mt-3 block border-t border-accent/20 pt-3 text-xs text-foreground-muted">
                Source: Facility protocol &mdash; Renal Artery Studies, Post-Intervention section
              </span>
            </p>
          </div>

          <p className="max-w-2xl text-base leading-relaxed text-foreground sm:text-lg">
            &ldquo;AI should make clinical knowledge easier to access. It should never quietly
            become the authority.&rdquo;
          </p>
        </Container>
      </section>

      <CTABanner
        title="Ask Lumen a real facility protocol question"
        description="Bring one of your own facility's approved protocols to a demo and see how it's retrieved."
      />
    </>
  );
}
