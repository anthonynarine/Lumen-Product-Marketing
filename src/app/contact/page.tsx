import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a demo or get in touch with Lumen to discuss structured clinical reporting, imaging, AI-guided knowledge, and interoperability for your organization.",
};

const contactEmail = "hello@lumenfoundry.net";

const expectations = [
  {
    title: "A working walkthrough",
    description: "See a real exam move through worksheet, imaging, calculation, and sign-off.",
  },
  {
    title: "Your own protocols",
    description: "Bring a facility protocol or diagnostic criteria set to see how it's configured.",
  },
  {
    title: "A direct conversation",
    description: "Talk with the team building the platform, not a scripted sales demo.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your diagnostic workflow"
        description="Whether you're evaluating Lumen for a vascular lab, a multi-facility health system, or a broader diagnostic imaging strategy, we'd like to hear what you're working with."
      />

      <section className="bg-ink-elevated py-16 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-foreground">What to expect</h2>
            <ul className="flex flex-col gap-6">
              {expectations.map((item) => (
                <li key={item.title} className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-foreground">{item.title}</span>
                  <span className="text-sm leading-relaxed text-foreground-muted">
                    {item.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6 rounded-2xl border border-line-strong bg-ink-card p-8">
            <h2 className="text-xl font-semibold text-foreground">Get in touch</h2>
            <p className="text-sm leading-relaxed text-foreground-muted">
              Email us directly and let us know a bit about your organization, the exam types
              you perform today, and what you&apos;re hoping Lumen would connect.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={`mailto:${contactEmail}?subject=Lumen%20Demo%20Request`} variant="primary">
                Request a Demo
              </Button>
              <Button href={`mailto:${contactEmail}`} variant="secondary">
                Email Lumen
              </Button>
            </div>
            <p className="text-xs text-foreground-muted">
              {contactEmail}
            </p>
            <p className="border-t border-line pt-4 text-xs text-foreground-muted">
              Please do not include patient information or protected health information (PHI)
              in any message sent to Lumen through this site.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
