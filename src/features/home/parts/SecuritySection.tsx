import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

const securityPillars = [
  "Centralized identity",
  "Organization isolation",
  "Facility scoping",
  "Authorization policy",
  "Auditability",
  "Secure image handling",
  "Tenant-aware data access",
  "Protected service communication",
];

export function SecuritySection() {
  return (
    <section className="border-b border-line bg-ink-elevated py-20 sm:py-28" id="security">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Healthcare security"
            title="From a solo practice to a multi-facility enterprise"
            description="Lumen's architecture separates organizations, facilities, and roles at every layer — from identity through data access — so clinical data stays scoped to the tenant and facility it belongs to, whether that's one physician's practice or a multi-site health system."
          />
          <p className="max-w-lg rounded-xl border border-line-strong bg-ink-card p-4 text-sm leading-relaxed text-foreground-muted">
            Built with HIPAA-aligned technical safeguards and designed to support
            HIPAA-compliant deployment across healthcare environments of every size.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-3">
          {securityPillars.map((pillar) => (
            <li
              key={pillar}
              className="flex items-center gap-2 rounded-lg border border-line-strong bg-ink-card px-4 py-3 text-sm text-foreground"
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {pillar}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
