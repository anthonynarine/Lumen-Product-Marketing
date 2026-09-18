# Lumen Homepage — Canonical Copy & Narrative

This document preserves the marketing narrative behind the homepage independent of its
implementation in `src/features/home/`. If the two ever drift, treat this document as the
source of truth for intent, and fix whichever one is wrong.

## Positioning

**Lumen is a configurable clinical diagnostic platform** that connects:

> Clinical Order → Exam Workflow → Structured Measurements → Imaging / DICOM → Automated
> Calculations → Clinical Interpretation → Physician Review → Final Report → Billing
> Preparation → EMR / PACS / Downstream Systems

Lumen starts with vascular ultrasound but is designed to expand into cardiac imaging and other
structured diagnostic specialties. It is not a form builder. It is a reusable clinical
reporting and diagnostic workflow engine.

**The clinical rules change. The reporting engine does not.**

## Core message

Primary headline:

> Clinical reporting. Imaging. AI-guided knowledge. One connected diagnostic workflow.

Supporting line:

> Lumen connects structured reporting, DICOM imaging, clinical criteria, physician
> interpretation, interoperability, and billing preparation in one configurable platform.

Scope statement (used in the hero and closing sections):

> Vascular is where Lumen begins. It is not where Lumen ends.

## Section-by-section narrative

### 1. Hero — `HeroSection.tsx`

Answers, in order: what Lumen is, who it's for, why it's different. Leads with the core
message above, paired with a visual of the ten-stage diagnostic pipeline (Order through Final
Report), and two calls to action: **Request a Demo** and **Explore the Platform**.

### 2. Workflow — `WorkflowSection.tsx`

The full pipeline as one connected sequence, not a bullet list:

> Order → Exam → Imaging → Measurements → Calculations → Interpretation → Physician Review →
> Final Report → Billing Preparation → EMR / PACS

The point of this section is continuity: every stage feeds the next, and nothing is a
disconnected tool bolted onto the others.

### 3. Reporting Engine — `ReportingEngineSection.tsx`

Explains that each exam type is a *configuration* of one engine, not a separate build. An
exam definition declares:

- Measurements
- Protocols
- Criteria
- Calculations
- Facility-specific rules
- Output requirements

This is why Lumen can support additional specialties (starting with cardiac — see Section 10)
without rebuilding the application underneath them.

### 4. Vascular First — `VascularFirstSection.tsx`

Lumen's first fully built specialty. Exam types: carotid, renal, lower-extremity arterial,
venous, mesenteric, dialysis access. Representative measurements: PSV, EDV, ICA/CCA ratio,
waveform pattern, plaque characteristics. Kept light on technical detail — this section
establishes credibility, not a clinical reference.

### 5. Imaging and DICOM — `ImagingSection.tsx`

A major section by design. Core idea:

> The report and the images belong to the same study.

Covers: still image storage, cine storage, DICOM object handling, study/series metadata,
image-to-exam linkage, DICOM ingestion and retrieval, in-app viewing, and design for future
PACS interoperability (explicitly labeled as future-facing, not shipped).

### 6. AI Clinical Knowledge — `AIKnowledgeSection.tsx`

The most visually distinct section — a mock Lumen conversation using **synthetic content
only**, explicitly labeled as such in the UI. Canonical example exchanges:

> **Technologist:** What criteria are we using for 70–99% internal carotid artery stenosis at
> this facility?
>
> **Lumen:** Retrieves the applicable facility-specific criteria, explains the relevant
> measurements, identifies the approved source, and distinguishes local criteria from system
> defaults when appropriate.

> **Technologist:** What is our protocol for a renal artery study in a patient with a prior
> renal artery stent?

Framing rule (non-negotiable): Lumen is presented as **retrieving and explaining approved
clinical knowledge**, never as inventing policy or replacing clinical judgment. The approved
source is always shown alongside the answer.

### 7. Billing Preparation — `BillingSection.tsx`

Because Lumen already understands the performed exam, measurements, findings, and diagnosis
information in the final report, it can help prepare structured information for revenue-cycle
review: completeness checks, CPT-related preparation, ICD-related preparation, missing
documentation flags, structured billing handoff.

Framing rule (non-negotiable): Lumen prepares structured information for **human review**. It
does not claim autonomous billing or coding.

### 8. Interoperability — `InteroperabilitySection.tsx`

Lumen is designed to connect with EMRs, HL7, DICOM, PACS, interface engines, and billing
systems, shown as a systems diagram with Lumen at the center — connecting outward, not
replacing what a health system already runs.

### 9. Healthcare Security — `SecuritySection.tsx`

Presents Lumen as designed for enterprise healthcare environments: centralized identity,
organization isolation, facility scoping, authorization policy, auditability, secure image
handling, tenant-aware data access, protected service communication.

Approved HIPAA language (use verbatim — do not strengthen):

> Built with HIPAA-aligned technical safeguards and designed to support HIPAA-compliant
> deployment.

Never say: "HIPAA certified," "HIPAA compliant" (as a completed claim), or anything implying
third-party certification.

### 10. Beyond Vascular — `ExpansionSection.tsx`

Cardiac imaging as the next specialty on the same engine: chamber measurements, Doppler
values, ventricular function, valve measurements, calculated cardiac metrics, physician
interpretation, image and cine review.

Framing rule (non-negotiable): these are **planned expansion**, phrased as "designed to
support" or "planned expansion" — never presented as already production-ready.

### 11. Final CTA — `FinalCTASection.tsx`

Closes on the scope statement:

> Vascular is where Lumen begins. It is not where Lumen ends.

With two calls to action: **Request a Demo** and **Contact Lumen**.

## Visual direction

Modern, clinical, premium, calm, technically credible, enterprise-ready. Deep neutral
(near-black) backgrounds with light-card contrast sections, a single red accent used sparingly
(blood-flow association, never decorative gradients), strong typography, and workflow/DICOM
motifs in place of generic stock healthcare photography or cartoon medical graphics.

## Guardrails for anyone editing this copy

1. Never claim a capability that isn't in this document or in `PROJECT.md`.
2. Future-facing items (PACS integration, cardiac imaging) are always labeled "designed to
   support" or "planned expansion" — never described as shipped.
3. HIPAA language stays exactly as written in Section 9 above.
4. AI and billing sections both carry an explicit non-negotiable framing rule — see Sections 6
   and 7. Do not soften or remove those lines when revising copy.
5. All example data (patient scenarios, AI conversations, imaging mockups) is synthetic. Never
   substitute real facility or patient data, even as a demo convenience.
