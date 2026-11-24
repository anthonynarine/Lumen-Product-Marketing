import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CTABanner } from "@/components/layout/CTABanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { ReportingEngine } from "./ReportingEngine";
import { ClinicalContent } from "./ClinicalContent";

export const metadata: Metadata = {
  title: "Product",
  description:
    "A complete vascular lab, ready on day one: built-in diagnostic criteria based on current society recommendations and published literature, protocols built on IAC standards, interpretation macros, and an AI assistant that answers from your lab's own approved rules.",
};

const clinicianAudiences = [
  "Technologists should understand what the system expects.",
  "Physicians should be able to review information quickly.",
  "Administrators should be able to configure workflows without rewriting software.",
  "Hospital IT teams should understand how identity, data access, interfaces, and infrastructure are controlled.",
  "Patients should benefit from more consistent clinical information moving through the system.",
];

const capabilities = [
  {
    title: "Structured clinical reporting",
    description:
      "Every exam is captured as structured data from the start, not free text reconstructed after the fact.",
  },
  {
    title: "Exam-specific worksheets",
    description: "Each exam type defines its own worksheet, matched to how that study is actually performed.",
  },
  {
    title: "Measurement-driven workflows",
    description: "Forms, calculations, and conclusions are all driven by the measurements a technologist records.",
  },
  {
    title: "Automated calculations",
    description: "Ratios and derived clinical values are computed automatically from recorded measurements.",
  },
  {
    title: "Configurable diagnostic criteria",
    description: "Diagnostic thresholds are configuration, not code — they can be reviewed and updated by protocol.",
  },
  {
    title: "Facility-specific protocols",
    description: "Multi-site organizations can override defaults per facility without duplicating the exam.",
  },
  {
    title: "Physician review and sign-off",
    description: "A defined role matrix governs who can sign, finalize, unfinalize, and addend a report.",
  },
];

const audiences = [
  {
    title: "A new practice",
    description:
      "Open the doors with criteria, protocols, and macros already in place, and start reporting without an IT project. Lumen runs on its own from the first exam; images and hospital connections can come later.",
  },
  {
    title: "An enterprise health system",
    description:
      "Load the criteria and protocols each facility has already approved, layer facility-specific macros on top, and connect to the EMR, interface engine, and PACS already in place — without forcing every site onto one set of rules.",
  },
];

export default function ProductPage() {
  return (
    <>
      <PageHero
        eyebrow="Product"
        title="A complete vascular lab, ready on day one"
        description="Lumen ships with what a vascular lab needs to start reporting: default diagnostic criteria based on current society recommendations and published literature, protocols built on IAC Vascular Testing standards, and interpretation macros — all running on a structured reporting engine, with an AI assistant that answers from your lab's own approved rules. Keep the defaults, or make every one of them yours."
      />

      <section className="border-b border-line bg-ink py-16 sm:py-24">
        <ClinicalContent />
      </section>

      <section className="border-b border-line bg-ink-elevated py-16 sm:py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="Core capabilities"
            title="Everything a diagnostic report actually needs"
            description="Not a generic form builder — a reporting engine shaped around how structured clinical exams are performed, reviewed, and signed."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

      <section className="border-b border-line bg-ink py-20 sm:py-28" id="reporting-engine">
        <ReportingEngine />
      </section>

      <section className="border-b border-line bg-ink-elevated py-16 sm:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Building for clinicians first"
            title="Because adoption is part of correctness"
            description="Healthcare software can be technically sophisticated and still fail if clinicians hate using it. Lumen is being designed around the people who actually perform, interpret, and manage diagnostic examinations."
          />
          <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {clinicianAudiences.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-foreground-muted">
                <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-b border-line bg-ink py-16 sm:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Who it's for"
            title="From a new practice to a multi-site health system"
            description="The same Lumen at both ends. What changes is how much of it a facility keeps as shipped, and how much it connects to."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {audiences.map((audience) => (
              <div
                key={audience.title}
                className="flex flex-col gap-3 rounded-2xl border border-line-strong bg-ink-card p-6 sm:p-8"
              >
                <h3 className="text-xl font-semibold text-foreground">{audience.title}</h3>
                <p className="text-base leading-relaxed text-foreground-muted">{audience.description}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-foreground-muted">
            See how Lumen connects at each stage on the{" "}
            <Link href="/interoperability" className="text-button underline-offset-4 hover:underline">
              integration levels
            </Link>{" "}
            page.
          </p>
        </Container>
      </section>

      <CTABanner
        title="See the reporting engine on a live worksheet"
        description="Walk through a full exam, from worksheet to signed report, with your own facility's criteria in mind."
      />
    </>
  );
}
