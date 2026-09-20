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

// Worked examples, including the one that matters most: the question the
// corpus cannot answer. A page that only shows successful retrievals is
// asserting the refusal behaviour rather than demonstrating it.
type Exchange = {
  id: string;
  question: string;
  answer: string;
  source: string;
  // Searched, nothing matched, nothing produced. Deliberately not styled as a
  // result — the visual difference is the point.
  refused?: boolean;
};

const exchanges: Exchange[] = [
  {
    id: "ica-stenosis",
    question: "What criteria are we using for a >70% internal carotid artery stenosis?",
    answer:
      "This facility classifies a >70% ICA stenosis using a modified velocity criteria set: PSV greater than 230 cm/s, with ICA/CCA ratio and plaque estimate as supporting criteria.",
    source: "Facility protocol — Vascular Lab Criteria, v3 (overrides system default)",
  },
  {
    id: "renal-stent",
    question: "What's our protocol for a renal artery study in a patient with a prior stent?",
    answer:
      "The in-stent renal artery protocol specifies the required sampling sites, the expected velocity ranges after stent placement, and the thresholds used to flag in-stent restenosis.",
    source: "Facility protocol — Renal Artery Studies, Post-Intervention section",
  },
  {
    id: "no-approved-source",
    question: "What's our protocol for contrast-enhanced carotid ultrasound?",
    answer:
      "No approved document at this facility covers contrast-enhanced carotid ultrasound. I can't answer this — there is nothing in the approved material to answer it from. Your medical director can approve a protocol, and it will be retrievable here once they do.",
    source: "Searched 2 approved documents — no match",
    refused: true,
  },
];

// Why the behaviour above is possible at all. The last item is the PHI
// boundary, stated narrowly on purpose: the retrieval corpus is documentation
// and is not wired to the patient record. It makes no claim about what a user
// may type into the question box.
const provenance = [
  {
    title: "Your documents",
    detail:
      "The corpus is material your facility has reviewed and approved. Nothing is pre-loaded from the open internet.",
  },
  {
    title: "Versioned",
    detail:
      "“Vascular Lab Criteria, v3” is a real version, not a label. Approve v4 and every answer moves with it.",
  },
  {
    title: "Yours overrides ours",
    detail:
      "Where a facility document and a system default disagree, the facility wins — and the answer says which one applied.",
  },
  {
    title: "Documentation, not patients",
    detail:
      "The knowledge layer retrieves from approved documents. It is not connected to the patient record: no exam values, measurements, or images are part of what it reads.",
  },
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

          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              Synthetic examples &middot; not real patient data
            </p>

            {exchanges.map((exchange) => (
              <div
                key={exchange.id}
                className="rounded-2xl border border-line-strong bg-ink-card p-6 sm:p-8"
              >
                <p className="text-sm leading-relaxed text-foreground">
                  &ldquo;{exchange.question}&rdquo;
                </p>
                <div
                  className={`mt-4 rounded-xl border p-4 text-sm leading-relaxed text-foreground ${
                    exchange.refused
                      ? "border-line-strong bg-ink"
                      : "border-accent/30 bg-accent-soft"
                  }`}
                >
                  {exchange.answer}
                  <span
                    className={`mt-3 block border-t pt-3 text-xs text-foreground-muted ${
                      exchange.refused ? "border-line" : "border-accent/20"
                    }`}
                  >
                    {exchange.refused ? exchange.source : `Source: ${exchange.source}`}
                    <span className="mt-1 block text-[11px] text-foreground-muted/80">
                      {exchange.refused
                        ? "Nothing was generated to fill the gap."
                        : "Retrieved verbatim from approved documentation — not generated."}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line py-16 sm:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Provenance"
            title="Where the knowledge comes from"
            description="The difference between this and a general-purpose chatbot is not the model. It's that every answer is traceable to a document your facility approved, and that the document is the thing you control."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {provenance.map(({ title, detail }) => (
              <div
                key={title}
                className="hover-card flex flex-col gap-2 rounded-xl border border-line-strong bg-ink-card p-5"
              >
                <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-foreground-muted">{detail}</p>
              </div>
            ))}
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
