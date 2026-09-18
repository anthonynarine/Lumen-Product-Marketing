import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { CTABanner } from "@/components/layout/CTABanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "About",
  description:
    "Lumen is clinical infrastructure built by Anthony Narine, Founder & Clinical Software Engineer — 17 years inside vascular diagnostics, now designing and building the platform he wished existed.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the founder"
        title="Clinical software built from inside the workflow"
        description="Lumen was founded by Anthony Narine, a vascular technologist and software engineer with 17 years of experience inside vascular diagnostics. He is designing and engineering Lumen as a modern clinical platform for diagnostic reporting, imaging workflow, protocol management, interoperability, and clinical operations."
      />

      <section className="border-b border-line bg-ink-elevated py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="flex flex-col items-start gap-5">
            <div
              className="ambient-drift relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-accent/40 shadow-[0_0_0_1px_rgb(var(--color-accent-rgb)/0.08),0_20px_40px_-20px_rgb(var(--color-accent-rgb)/0.5)]"
            >
              <Image
                src="/images/anthony-narine.jpg"
                alt="Anthony Narine, Founder & Clinical Software Engineer at Lumen"
                fill
                sizes="96px"
                className="object-cover object-top"
                priority
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Anthony Narine</h2>
              <p className="mt-1 text-sm text-foreground-muted">Founder &amp; Clinical Software Engineer</p>
            </div>
            <p className="text-xs uppercase tracking-[0.15em] text-foreground-muted">
              17 years in vascular diagnostics &middot; Full-stack engineering &middot; Clinical systems
              architecture
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="https://anthonynarine.com"
                target="_blank"
                rel="noreferrer"
                className="text-button underline-offset-4 hover:underline"
              >
                anthonynarine.com
              </a>
              <a
                href="https://github.com/anthonynarine"
                target="_blank"
                rel="noreferrer"
                className="text-button underline-offset-4 hover:underline"
              >
                github.com/anthonynarine
              </a>
              <a
                href="https://www.linkedin.com/in/anthony-narine-9ab567245"
                target="_blank"
                rel="noreferrer"
                className="text-button underline-offset-4 hover:underline"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-xl font-semibold leading-snug text-foreground sm:text-2xl">
              17 years in vascular diagnostics. Now building the clinical infrastructure I wished
              we&apos;d had.
            </p>
            <p className="text-sm leading-relaxed text-foreground-muted">
              After years of performing studies, working through complex protocols, training
              technologists, and using reporting systems that often made clinical workflows harder
              than they needed to be, Anthony began building the infrastructure he wished vascular
              labs already had.
            </p>
            <p className="text-base leading-relaxed text-foreground sm:text-lg">
              &ldquo;I didn&apos;t learn the vascular workflow by interviewing clinicians. I spent
              years inside it. Lumen started with a simple question: what would this software look
              like if it were built by someone who actually had to use it?&rdquo;
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-ink py-16 sm:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Why Lumen exists"
            title="Built to cause the least friction, for both sides of the report"
            description="A technologist and a physician want different things from the same exam. Lumen wasn't shaped by one opinion — Anthony built it by taking questions and friction points directly from coworkers on the technologist side and the physicians reviewing their studies, and designing toward whichever answer reduced friction for both, not just one."
          />
          <p className="max-w-3xl text-sm leading-relaxed text-foreground-muted sm:text-base">
            Lumen takes a different approach. Clinical measurements, protocols, diagnostic
            criteria, workflows, facilities, users, reporting rules, and integrations are modeled
            as explicit parts of the platform, so Lumen can support the realities of an individual
            laboratory while still operating as a larger enterprise system.
          </p>
          <p className="max-w-3xl text-base leading-relaxed text-foreground sm:text-lg">
            &ldquo;After enough years using clinical software, you start seeing the same problems
            repeatedly. The workflow is complicated, but the software doesn&apos;t have to make it
            more complicated.&rdquo;
          </p>
        </Container>
      </section>

      <section className="border-b border-line bg-ink-elevated py-16 sm:py-24">
        <Container className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Building more than a reporting screen"
            title="Clinical infrastructure underneath the workflow"
            description="What clinicians see is only one part of Lumen. Anthony's work spans the full product stack — from the clinical workflow clinicians see to the infrastructure required for healthcare systems to operate securely behind it."
          />
          <p className="max-w-3xl text-sm leading-relaxed text-foreground-muted sm:text-base">
            That shows up across the platform: identity kept separate from clinical authority and
            tenant boundaries enforced structurally (see{" "}
            <Link href="/security" className="text-button underline-offset-4 hover:underline">
              Security
            </Link>
            ), a reporting engine built around explicit clinical state (see{" "}
            <Link href="/product" className="text-button underline-offset-4 hover:underline">
              Product
            </Link>
            ), imaging treated as part of the clinical workflow rather than a separate system (see{" "}
            <Link href="/imaging" className="text-button underline-offset-4 hover:underline">
              Imaging
            </Link>
            ), and integration designed in from the start (see{" "}
            <Link href="/interoperability" className="text-button underline-offset-4 hover:underline">
              Interoperability
            </Link>
            ). Lumen is not built around technology for technology&apos;s sake — every engineering
            decision starts with the clinical workflow.
          </p>
        </Container>
      </section>

      <section className="border-b border-line bg-ink py-16 sm:py-24">
        <Container className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="AI has a narrow job"
            title="Explain clinical truth. Never invent it."
            description="Lumen uses AI differently from many healthcare products. The model is not the source of clinical truth — approved protocols, diagnostic criteria, institutional configuration, and clinical records remain authoritative."
          />
          <p className="max-w-3xl text-sm leading-relaxed text-foreground-muted sm:text-base">
            &ldquo;AI should make clinical knowledge easier to access. It should never quietly
            become the authority.&rdquo;{" "}
            <Link href="/ai" className="text-button underline-offset-4 hover:underline">
              See how Lumen&apos;s AI clinical knowledge layer works
            </Link>
            .
          </p>
        </Container>
      </section>

      <section className="border-b border-line bg-ink-elevated py-16 sm:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Security is part of the architecture"
            title="Not something added before deployment"
            description="Clinical systems protect real patient information and real clinical workflows. Lumen therefore treats security as part of the underlying architecture — identity, tenant isolation, facility boundaries, permissions, auditability, observability, and controlled system changes are designed in from the beginning."
          />
          <p className="max-w-3xl text-sm leading-relaxed text-foreground-muted sm:text-base">
            Lumen also works alongside{" "}
            <a
              href="https://gait.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="text-button underline-offset-4 hover:underline"
            >
              Gait
            </a>
            , a separate identity and security platform built specifically to protect Lumen — it
            monitors authentication and security controls, investigates findings, validates
            repairs, and preserves human authority over production changes.{" "}
            <Link href="/security" className="text-button underline-offset-4 hover:underline">
              Read more about Lumen&apos;s security architecture
            </Link>
            .
          </p>
          <p className="text-base font-semibold text-foreground sm:text-lg">
            Intelligence can recommend. Authority remains explicit.
          </p>
        </Container>
      </section>

      <section className="border-b border-line bg-ink py-16 sm:py-24">
        <Container className="flex flex-col gap-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">The mission</span>
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Build diagnostic software clinicians actually want to use
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-foreground-muted sm:text-lg">
            Lumen begins with vascular diagnostics. The larger goal is to build modern
            infrastructure for diagnostic medicine: systems that understand clinical workflows
            deeply, integrate cleanly with hospital environments, protect patient information, and
            remain adaptable as medicine changes. Anthony is building Lumen from both sides of
            that problem — the exam room and the engineering desk.
          </p>
        </Container>
      </section>

      <CTABanner
        title="Talk with the person building Lumen"
        description="Bring your workflow, your protocols, or just your skepticism — the conversation is with the engineer, not a sales script."
      />
    </>
  );
}
