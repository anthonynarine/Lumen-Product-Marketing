import type { Chapter } from "../types";

export const hipaaChapters: Chapter[] = [
  {
    slug: "what-hipaa-is-and-is-not",
    title: "What HIPAA is — and what it is not",
    group: "HIPAA",
    summary:
      "HIPAA is a federal law with several distinct rules and a shared-responsibility model. It is not a certification, not a checklist, and not something a software vendor can hold on your behalf.",
    body: [
      {
        kind: "lede",
        text: "HIPAA is the most frequently misdescribed term in healthcare software. Before reading how Lumen is built, it is worth being precise about what the law actually requires — and about the claims no honest vendor can make.",
      },
      { kind: "h", text: "What HIPAA is" },
      {
        kind: "p",
        text: "HIPAA is the Health Insurance Portability and Accountability Act of 1996, extended by the HITECH Act in 2009. It is not one rule but several, each doing a different job.",
      },
      {
        kind: "pair",
        items: [
          {
            term: "The Privacy Rule",
            detail:
              "Governs how protected health information (PHI) may be used and disclosed, in any form — paper, spoken, or electronic — and establishes patients' rights over their own records.",
          },
          {
            term: "The Security Rule",
            detail:
              "Applies specifically to electronic PHI (ePHI) and requires safeguards in three categories: administrative, physical, and technical. Software architecture lives mostly in the third category.",
          },
          {
            term: "The Breach Notification Rule",
            detail:
              "Sets what must happen after an unauthorized disclosure — who must be told, by whom, and how quickly.",
          },
          {
            term: "The Enforcement Rule",
            detail:
              "Establishes investigation and penalty procedures. The Office for Civil Rights at HHS is the enforcing body.",
          },
        ],
      },
      {
        kind: "p",
        text: "Obligations attach to covered entities — health plans, clearinghouses, and providers who transmit health information electronically — and, since HITECH, directly to their business associates. A business associate is any organization handling PHI on a covered entity's behalf, which is the category a clinical software vendor falls into. The relationship is governed by a business associate agreement, a contract that assigns specific responsibilities to each side.",
      },
      {
        kind: "h",
        text: "Required versus addressable — the distinction people get wrong",
      },
      {
        kind: "p",
        text: "The Security Rule marks each implementation specification as either required or addressable. Addressable does not mean optional. It means the organization must assess whether the specification is reasonable and appropriate for its environment, and then do one of three things: implement it, implement an equivalent alternative, or document why neither is reasonable. Skipping it silently is not one of the three.",
      },
      {
        kind: "p",
        text: "The Security Rule is also deliberately technology-neutral. It does not name products, protocols, or key lengths. It describes outcomes and expects organizations to choose mechanisms appropriate to their size, complexity, and risk.",
      },
      { kind: "h", text: "What HIPAA is not" },
      {
        kind: "list",
        items: [
          "It is not a certification. HHS does not certify anyone or anything as HIPAA compliant, and no government body issues a HIPAA seal for software. A vendor describing itself as HIPAA certified is describing a private assessment, not a federal status — and passing one does not prevent an enforcement action.",
          "It is not a one-time event. Compliance is an ongoing program of risk analysis, policy, training, and review. A point-in-time assessment describes a moment, not a state.",
          "It is not something a vendor holds on your behalf. Administrative safeguards such as workforce training, sanction policies, access authorization procedures, and contingency planning belong to the deploying organization, and no architecture can supply them.",
          "It is not a list of required technologies. There is no HIPAA-mandated encryption algorithm, database, or cloud provider.",
          "It is not a prohibition on sharing information. The Privacy Rule expressly permits use and disclosure for treatment, payment, and health care operations. HIPAA sets conditions on disclosure rather than a wall against it.",
          "It does not cover all health data. Information held outside the covered-entity and business-associate relationship — many consumer health apps, and employment records held by an employer — generally falls outside HIPAA entirely.",
          "It is not the ceiling. Stricter state privacy laws still apply on top of it.",
          "It is not the same thing as encryption. Encryption is one addressable specification among many. Encrypting data does not make an organization compliant, and its absence is not automatically a violation.",
        ],
      },
      { kind: "h", text: "Why the distinction matters when evaluating software" },
      {
        kind: "p",
        text: "Because HIPAA is a shared-responsibility program rather than a product certificate, the useful question to ask a vendor is not whether they are HIPAA compliant — a question with no verifiable answer. The useful questions are narrower: which technical safeguards does the architecture implement, how are they enforced, how are they proven, and which responsibilities remain with the deploying organization.",
      },
      {
        kind: "p",
        text: "The rest of this handbook answers the first three for Lumen. The next chapter answers the fourth.",
      },
      {
        kind: "note",
        title: "What Lumen claims, precisely",
        text: "Lumen is built with HIPAA-aligned technical safeguards and designed to support HIPAA-compliant deployment. Lumen does not claim HIPAA certification. This website does not process, store, or transmit protected health information, and every screenshot, patient scenario, and example shown across this site uses synthetic data only.",
      },
    ],
  },
  {
    slug: "hipaa-technical-safeguards",
    title: "The technical safeguards, and who owns what",
    group: "HIPAA",
    summary:
      "The Security Rule's five technical safeguard subsections, what Lumen's architecture does for each, and the responsibilities that stay with the deploying organization.",
    body: [
      {
        kind: "lede",
        text: "The Security Rule's technical safeguards are set out in five subsections. This chapter takes them in order, describes the architectural answer to each, and is explicit about the line between what software can enforce and what an organization has to operate.",
      },
      { kind: "h", text: "Access control" },
      {
        kind: "p",
        text: "The requirement is that only authorized persons and programs reach ePHI. Lumen's answer is the layered authorization funnel described throughout this handbook: an authenticated identity is resolved into an organization membership, narrowed by facility scope, checked against a clinical role, and finally checked against the resource's own workflow state. Each of those is a separate, server-side decision. A valid login clears the first gate and none of the others.",
      },
      {
        kind: "p",
        text: "Identity is unique per user and issued by Gait, never shared between people, and revocable at the session level independently of Lumen.",
      },
      { kind: "h", text: "Audit controls" },
      {
        kind: "p",
        text: "The requirement is a mechanism that records and examines activity in systems containing ePHI. Lumen writes immutable audit events for clinically meaningful actions — exam creation and edits, measurement changes, report finalization and unfinalization, addenda, image association and reassignment, permission denials, membership and role changes, and integration message outcomes. Each event retains enough context to reconstruct who acted, within which organization and facility, on which resource, and when.",
      },
      {
        kind: "p",
        text: "Audit is kept deliberately separate from operational observability. Observability answers whether the platform is healthy; audit answers what happened to a patient's record. Merging the two tends to produce a system that is good at neither.",
      },
      { kind: "h", text: "Integrity" },
      {
        kind: "p",
        text: "The requirement is protection against improper alteration or destruction of ePHI. Lumen's strongest integrity control is workflow state. A finalized report is locked regardless of who is asking — the lock is a property of the resource, not a permission on the user. Changing a finalized report requires an addendum, which is a new, attributed, audited record rather than a silent edit of the original.",
      },
      {
        kind: "p",
        text: "The same principle governs imaging. Images are never quietly moved between patients; correction runs through a controlled reconciliation workflow that preserves provenance and records both the before and after state.",
      },
      { kind: "h", text: "Person or entity authentication" },
      {
        kind: "p",
        text: "The requirement is verifying that a person or system seeking access is who they claim to be. This is Gait's responsibility, held separately from Lumen on purpose. Lumen validates the issuer, audience, signature, expiry, and session claims of every presented identity before doing anything else — and then still performs its own independent authorization, because a verified identity is not an entitlement.",
      },
      { kind: "h", text: "Transmission security" },
      {
        kind: "p",
        text: "The requirement is guarding ePHI against unauthorized access while it moves across a network. Lumen uses HTTPS with TLS for client traffic and for service-to-service communication, including the connection between application services and their databases. Media is delivered from private object storage through individually authorized, time-limited URLs rather than from a public bucket. Hospital integration traffic runs over private connectivity rather than the open internet.",
      },
      { kind: "h", text: "The line: what stays with the deploying organization" },
      {
        kind: "p",
        text: "Technical safeguards are one of three required categories. The other two are largely operational, and no vendor architecture can discharge them on a customer's behalf. Being clear about that division is part of the point.",
      },
      {
        kind: "split",
        left: {
          title: "Lumen's architecture addresses",
          items: [
            "Access control across tenant, facility, role, and workflow state",
            "Unique per-user identity and independent session revocation",
            "Immutable clinical audit events",
            "Record integrity through workflow locking and addenda",
            "Authorized, time-limited media retrieval",
            "Encrypted transport between every component",
            "Automated tests that exercise these boundaries as the code changes",
          ],
        },
        right: {
          title: "The deploying organization owns",
          items: [
            "Its own risk analysis and risk management program",
            "Workforce training, sanction policy, and access authorization procedures",
            "Physical safeguards for facilities, workstations, and devices",
            "Business associate agreements with its vendors",
            "Contingency planning, backup, and disaster recovery for its environment",
            "Incident response and breach notification procedures",
            "Six-year retention of required HIPAA documentation",
          ],
        },
      },
      {
        kind: "note",
        title: "On AI and patient information",
        text: "Lumen's AI layer retrieves and explains approved protocols and interpretation criteria. Treating a general-purpose external language model as an appropriate destination for patient information carries its own vendor, contractual, and risk implications, so Lumen treats the boundary between clinical data and any external model as a deliberate architectural line rather than an afterthought. The clinical safety chapter covers what automation may and may not do.",
      },
    ],
  },
];
