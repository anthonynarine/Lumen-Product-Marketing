import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CTABanner } from "@/components/layout/CTABanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Lumen separates identity from clinical authorization, and tenant boundaries from facility scope — built with HIPAA-aligned technical safeguards to scale from a solo physician's practice to a multi-facility enterprise health system.",
};

const fiveSentences = [
  {
    title: "Identity and authorization are separate systems.",
    description:
      "Proving who you are never automatically grants clinical access — that's a second, independent decision.",
  },
  {
    title: "Organization is the hard tenant boundary; Facility is a scope inside it.",
    description: "A health system can run many sites on one platform without any site seeing another's data.",
  },
  {
    title: "Authentication never equals access.",
    description:
      "Every request still requires active membership, tenant scope, role, and workflow-state checks — a valid login proves nothing on its own.",
  },
  {
    title: "The client is never trusted to declare its own authority.",
    description:
      "Reads are scoped before they run and writes are authorized before they execute — not checked after the fact.",
  },
  {
    title: "Automation can observe and recommend. Humans approve anything consequential.",
    description:
      "Nothing changes a signed report, a patient's image assignment, or a production system without an explicit human decision.",
  },
];

const authorizationFunnel = [
  {
    step: "Gait",
    description: "Authenticates the user and issues a session. Proves who you are — nothing more.",
  },
  {
    step: "Organization membership",
    description:
      "Lumen resolves that identity against its own membership records, independent of Gait. No active membership, no access.",
  },
  {
    step: "Facility scope",
    description: "If the organization runs multiple sites, membership is checked against the specific facility too.",
  },
  {
    step: "Role and workflow state",
    description: "The member's role must permit the action, and the resource's current state must allow it.",
  },
  {
    step: "Data",
    description: "Only after all four checks pass does a read or write actually reach clinical data.",
  },
];

const identityLayers = [
  {
    title: "Identity — Gait",
    description:
      "Gait is a separate identity and security platform, built specifically to protect Lumen. It authenticates every user, issues and revokes sessions, and owns its own security monitoring. A valid identity proves who you are — nothing more.",
    href: "https://gait.netlify.app/",
    linkLabel: "Visit Gait",
  },
  {
    title: "Authorization",
    description:
      "Lumen independently resolves that identity into organization membership, facility scope, role, and workflow permissions before any clinical data moves.",
  },
  {
    title: "Media storage",
    description:
      "Imaging and media storage is owned separately. Every retrieval is tenant- and facility-authorized before a download URL is ever issued.",
  },
  {
    title: "Hospital integrations",
    description:
      "Epic, Oracle Health, MEDITECH, PACS, and interface engines are separate trust domains, each isolated behind its own boundary and message contract.",
  },
];

const tenantInvariants = [
  {
    title: "One organization, always",
    description: "Every clinical record — exams, reports, media, audit events — belongs to exactly one organization.",
  },
  {
    title: "The client doesn't get a vote",
    description: "A client-provided organization, facility, or role is never sufficient authorization on its own.",
  },
  {
    title: "Cross-tenant access returns nothing",
    description: "A request for another organization's data returns no data — not an error that confirms it exists.",
  },
  {
    title: "Facility is checked independently",
    description: "Facility restrictions are enforced on their own, separately from role — one doesn't substitute for the other.",
  },
  {
    title: "Inactive membership authorizes nothing",
    description: "A suspended or removed member is denied even with an otherwise valid, authenticated session.",
  },
  {
    title: "Workflow state still applies",
    description: "A finalized report is locked regardless of role — signing, editing, and addending each have their own rules.",
  },
  {
    title: "Automation is scoped too",
    description: "Background jobs and integration workers are tenant-scoped the same as any request — no shortcuts for automation.",
  },
  {
    title: "Media checked before it's issued",
    description: "Image and media access is tenant- and facility-authorized before a retrieval URL is ever generated.",
  },
];

const dataProtectionFeatures = [
  {
    title: "Individual accounts, role-based permissions",
    description:
      "Every user signs in with their own credentials — never a shared login. What someone can do is scoped to their role and their organization: for example, a technologist can sign a report, but only a physician can finalize it — and that boundary is enforced per facility, not just per account.",
  },
  {
    title: "Data isolation enforced twice",
    description:
      "Each customer organization's data is walled off both in the application and, independently, at the database itself. That second, database-level boundary means a bug in application logic still can't expose one organization's data to another.",
  },
  {
    title: "Tamper-evident audit trail",
    description:
      "Every action on a report — signing, finalizing, an addendum, a change in who has access — is permanently recorded. Once written, an entry can't be edited or deleted.",
  },
  {
    title: "Finalized reports are locked",
    description:
      "Once a report is finalized, it's locked. Any change after that point requires an explicit, logged addendum rather than silently overwriting clinical history.",
  },
  {
    title: "Encrypted in transit",
    description:
      "All traffic is encrypted end to end — between the browser and Lumen, and between Lumen's own services and its database — using TLS/HTTPS throughout.",
  },
  {
    title: "De-identified file storage",
    description:
      "Uploaded ultrasound images are stored under randomly generated identifiers, never their original filenames — so patient-identifying details don't end up sitting in a storage path or a log file.",
  },
];

const securityQA = [
  {
    question: "How do you handle authentication?",
    answer:
      "Gait — a dedicated identity and security platform built specifically to protect Lumen — authenticates users and manages session security. Lumen validates that trusted identity, then performs its own independent tenant and clinical authorization — a login never grants access by itself.",
  },
  {
    question: "How do you prevent one customer from seeing another customer's data?",
    answer:
      "Organization is a mandatory, server-side tenant boundary. Reads are scoped to the caller's organization before they run, writes are authorized before they execute, and the browser cannot declare its own organization to gain access.",
  },
  {
    question: "What about multiple hospitals or sites in one health system?",
    answer:
      "One organization can contain multiple facilities. Facility scope is enforced independently, underneath the organization boundary — so a health system can run on one platform while keeping each site's staff and workflow configuration separate.",
  },
  {
    question: "Can AI change production or clinical data on its own?",
    answer:
      "No. Lumen's AI layer explains and retrieves approved protocols and criteria — it never invents them, and it says so when it doesn't know. It cannot change a signed interpretation, reassign a patient's images, or finalize a report on a clinician's behalf.",
  },
  {
    question: "Do you use automated security monitoring?",
    answer:
      "Yes — Gait includes automated investigation agents that watch for anomalies, reproduce suspected issues, and propose fixes. Intelligence doesn't grant itself authority, though: every proposed fix is independently validated and still requires explicit human approval before anything is deployed.",
  },
  {
    question: "Where does patient data actually live?",
    answer:
      "Lumen runs in AWS behind a load balancer, with application and database services deployed inside a private network — neither has a public IP. Public traffic terminates at the load balancer over HTTPS; production access to the private network itself goes through a VPN, never directly at the database or internal services.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Healthcare security"
        title="Security that's layered, not centralized"
        description="No single layer is trusted to do everything. Identity, tenancy, clinical authorization, and data access are independently enforced, so Lumen scales from a solo physician's practice to a multi-facility enterprise health system without widening what any one part of the system can see."
      />

      <section className="border-b border-line bg-ink-elevated py-16 sm:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="The short version"
            title="Five sentences that describe the whole model"
          />
          <div className="overflow-hidden rounded-xl border border-line-strong">
            {fiveSentences.map((item, index) => (
              <div
                key={item.title}
                className={`flex gap-4 px-5 py-4 sm:px-6 ${index > 0 ? "border-t border-line" : ""}`}
              >
                <span className="font-mono text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-foreground-muted">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-ink py-16 sm:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="How a request actually gets checked"
            title="Five gates, in order — not one decision"
            description="A request doesn't go straight from login to data. It narrows through identity, membership, facility, and role/state, in that order, before anything is read or written."
          />
          <div className="flex flex-col gap-0">
            {authorizationFunnel.map((item, index) => (
              <div key={item.step} className="relative flex gap-5 pb-8 last:pb-0">
                {index < authorizationFunnel.length - 1 ? (
                  <span aria-hidden="true" className="absolute left-4 top-8 h-full w-px bg-line-strong" />
                ) : null}
                <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-ink-elevated text-xs font-semibold text-accent">
                  {index + 1}
                </span>
                <div className="flex flex-col gap-1 pt-1">
                  <h3 className="text-sm font-semibold text-foreground">{item.step}</h3>
                  <p className="text-sm leading-relaxed text-foreground-muted">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-ink-elevated py-16 sm:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="How the layers divide responsibility"
            title="No single layer is trusted to do everything"
            description="Identity, authorization, media, and hospital integrations are four separate boundaries. Each one answers a different question, and none of them trust the others to have already checked."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {identityLayers.map((layer) => (
              <div key={layer.title} className="hover-card rounded-xl border border-line-strong bg-ink-card p-6">
                <h3 className="text-sm font-semibold text-foreground">{layer.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{layer.description}</p>
                {layer.href ? (
                  <a
                    href={layer.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-sm text-button underline-offset-4 hover:underline"
                  >
                    {layer.linkLabel} &rarr;
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-ink py-16 sm:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Tenant isolation"
            title="Invariants we treat as non-negotiable"
            description="These hold regardless of role, workload, or which part of the system is asking."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tenantInvariants.map((invariant) => (
              <div key={invariant.title} className="hover-card rounded-xl border border-line-strong bg-ink-card p-6">
                <h3 className="text-sm font-semibold text-foreground">{invariant.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{invariant.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-ink-elevated py-16 sm:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Data protection"
            title="Safeguards built into how patient data is handled"
            description="Engineered with healthcare data in mind: access, isolation, auditability, and storage are each enforced in code, independent of one another."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dataProtectionFeatures.map((feature) => (
              <div key={feature.title} className="hover-card rounded-xl border border-line-strong bg-ink-card p-6">
                <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-ink py-16 sm:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Security review"
            title="Straight answers to the questions security teams actually ask"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {securityQA.map((item) => (
              <div key={item.question} className="rounded-xl border border-line-strong bg-ink-card p-6">
                <h3 className="text-sm font-semibold text-foreground">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{item.answer}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-line-strong bg-ink-card p-6 sm:p-8">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              A note on HIPAA
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground-muted">
              Lumen's architecture is built with HIPAA safeguards in mind. This site does not
              claim HIPAA certification, a signed Business Associate Agreement, or a completed
              third-party audit, and it does not process, store, or transmit protected health
              information (PHI). Any screenshots or examples shown across this site use synthetic
              data only.
            </p>
          </div>
        </Container>
      </section>

      <CTABanner
        title="Review Lumen's security architecture in detail"
        description="Request a walkthrough of tenancy, facility scoping, and authorization policy with your security team."
      />
    </>
  );
}
