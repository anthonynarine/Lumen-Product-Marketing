import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Claims here must match the Lumen app (lumen_reports/report_template/ and
// reports/models/macro.py on main). As of 2026-11-23: built-in criteria profiles exist
// for carotid, LE venous (DVT), LE arterial, and aorto-iliac, all still marked
// draft_requires_human_verification ("In clinical review" below). A 2026-11-23 source
// audit confirmed carotid matches IAC Nov 2023 exactly and DVT largely follows SRU 2018 +
// ACR; LE arterial and aorto-iliac are lab-defined with citation gaps, so they are only
// "informed by" literature here. Don't strengthen these claims until the app is fixed. Custom macros with an
// approval flow are built; built-in macros are not ("Planned"). Remove a tag only after
// checking the code.

type Tag = "In clinical review" | "Planned";

type Row = {
  title: string;
  shipsWith: string;
  shipsWithTag?: Tag;
  yoursToAdd: string;
};

const rows: Row[] = [
  {
    title: "Diagnostic criteria",
    shipsWith:
      "Default criteria for four exams. Carotid follows the IAC Vascular Testing 2023 recommended criteria; lower-extremity DVT follows the SRU 2018 consensus and the ACR–AIUM–SPR–SRU practice parameter; lower-extremity arterial and aorto-iliac defaults are informed by published literature. Every rule records where it came from.",
    shipsWithTag: "In clinical review",
    yoursToAdd:
      "Your lab's own validated criteria, assigned per facility and per protocol. Each version is pinned to the exams read against it, so a report always shows which criteria were in force.",
  },
  {
    title: "Protocols",
    shipsWith:
      "Exam protocols built on the IAC Vascular Testing Standards' minimum requirements, so the steps a technologist follows start from the accreditation baseline.",
    shipsWithTag: "In clinical review",
    yoursToAdd:
      "Custom and extended protocols for how your lab actually scans, layered on the baseline per facility.",
  },
  {
    title: "Interpretation macros",
    shipsWith: "A built-in macro set for each exam and disease type.",
    shipsWithTag: "Planned",
    yoursToAdd:
      "Organization-wide and facility-specific macros, scoped by exam. Macro text lands in real reports, so anything a physician didn't write goes through physician approval first.",
  },
];

export function ClinicalContent() {
  return (
    <Container className="flex flex-col gap-10">
      <SectionHeading
        eyebrow="Lab in a box"
        title="Ships with the clinical content. Yours to change."
        description="Most reporting systems hand a new lab an empty form builder. Lumen ships with the criteria, protocols, and macros a vascular lab runs on, and lets each facility keep them, adjust them, or replace them."
      />

      <div className="overflow-hidden rounded-2xl border border-line-strong">
        <div className="hidden grid-cols-[1fr_1.6fr_1.6fr] gap-6 border-b border-line-strong bg-ink-elevated px-6 py-4 md:grid">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Ships with Lumen</span>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
            Yours to add
          </span>
        </div>
        {rows.map((row, index) => (
          <div
            key={row.title}
            className={`grid gap-4 bg-ink-card px-6 py-6 md:grid-cols-[1fr_1.6fr_1.6fr] md:gap-6 ${
              index > 0 ? "border-t border-line-strong" : ""
            }`}
          >
            <h3 className="text-base font-semibold text-foreground">{row.title}</h3>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent md:hidden">
                Ships with Lumen
              </span>
              <p className="text-sm leading-relaxed text-foreground-muted">{row.shipsWith}</p>
              {row.shipsWithTag ? (
                <span className="self-start rounded-full border border-line-strong px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide text-foreground-muted">
                  {row.shipsWithTag}
                </span>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted md:hidden">
                Yours to add
              </span>
              <p className="text-sm leading-relaxed text-foreground-muted">{row.yoursToAdd}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-accent/60 bg-accent-soft p-6 sm:p-8">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">With AI</span>
        <h3 className="text-xl font-semibold text-foreground">An assistant that knows your lab&apos;s rules</h3>
        <p className="text-base leading-relaxed text-foreground-muted">
          Ask which criteria apply to a finding at this facility, or what the protocol is for a given study, and
          Lumen answers from the criteria and protocols your lab has approved — with the source shown alongside. It
          retrieves and explains. Interpretation stays with the physician.
        </p>
      </div>

      <p className="text-sm leading-relaxed text-foreground-muted">
        Built-in criteria and protocols are in clinical review and are verified by a clinician before production use.
        Items marked Planned are designed but not yet built. IAC requires each lab to adopt its own written criteria,
        so Lumen&apos;s defaults are a starting point for that decision, not a substitute for it. Using Lumen does not
        itself confer IAC accreditation.
      </p>
    </Container>
  );
}
