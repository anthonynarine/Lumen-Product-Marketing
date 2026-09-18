import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CTABanner } from "@/components/layout/CTABanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { ReportingEngine } from "./ReportingEngine";

export const metadata: Metadata = {
  title: "Product",
  description:
    "A configurable clinical reporting engine: structured worksheets, measurement-driven workflows, automated calculations, and facility-specific diagnostic criteria.",
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

export default function ProductPage() {
  return (
    <>
      <PageHero
        eyebrow="Product"
        title="A reporting factory built for structured clinical data"
        description="Lumen replaces free-text, form-builder-style reporting with a configurable engine purpose-built for diagnostic workflow — from the first measurement to a signed, finalized report."
      />

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

      <CTABanner
        title="See the reporting engine on a live worksheet"
        description="Walk through a full exam, from worksheet to signed report, with your own facility's criteria in mind."
      />
    </>
  );
}
