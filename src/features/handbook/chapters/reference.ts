import type { Chapter } from "../types";

export const referenceChapters: Chapter[] = [
  {
    slug: "glossary",
    title: "Glossary",
    group: "Reference",
    summary:
      "The terms used throughout this handbook, defined the way Lumen uses them — including the ones that mean different things in different companies.",
    body: [
      {
        kind: "lede",
        text: "Several of these words are used loosely elsewhere. These are the meanings they carry in this handbook.",
      },
      { kind: "h", text: "Security and access" },
      {
        kind: "pair",
        items: [
          { term: "Authentication", detail: "Proving identity. Answering who you are." },
          {
            term: "Authorization",
            detail: "Determining what an authenticated identity may do. A separate decision, made by a separate system.",
          },
          {
            term: "Tenant",
            detail: "A logically isolated customer boundary. In Lumen, the organization.",
          },
          {
            term: "Facility",
            detail: "A subordinate operational scope inside an organization — typically a clinical site.",
          },
          {
            term: "Membership",
            detail:
              "The record binding an external identity to an organization, a clinical role, and an optional facility scope.",
          },
          {
            term: "Capability",
            detail: "An explicit permission granted to an automated workflow or tool, bounded in advance.",
          },
          { term: "Mutual TLS", detail: "Transport security where both sides authenticate with certificates, not just the server." },
        ],
      },
      { kind: "h", text: "Architecture" },
      {
        kind: "pair",
        items: [
          {
            term: "Selector",
            detail: "The read-layer component responsible for authorized, tenant-scoped retrieval.",
          },
          {
            term: "Service",
            detail: "The write-layer component responsible for mutations and the invariants that govern them.",
          },
          {
            term: "Audit trail",
            detail: "The durable, immutable record of important actions and state changes.",
          },
          {
            term: "Observability",
            detail: "The operational signals used to understand whether the system is healthy and behaving as expected.",
          },
          { term: "Finding", detail: "A normalized condition that warrants investigation." },
        ],
      },
      { kind: "h", text: "Healthcare and interoperability" },
      {
        kind: "pair",
        items: [
          {
            term: "PHI / ePHI",
            detail:
              "Protected health information, and its electronic form. The category of data HIPAA's Security Rule governs.",
          },
          {
            term: "Covered entity",
            detail:
              "A health plan, clearinghouse, or provider transmitting health information electronically in covered transactions.",
          },
          {
            term: "Business associate",
            detail:
              "An organization handling PHI on a covered entity's behalf. A clinical software vendor is one, governed by a business associate agreement.",
          },
          {
            term: "DICOM",
            detail: "The standard for medical imaging objects and their associated metadata and workflows.",
          },
          { term: "HL7 v2", detail: "The long-established messaging standard most hospital interfaces still speak." },
          {
            term: "MLLP",
            detail: "Minimal Lower Layer Protocol, commonly used to carry HL7 v2 messages over a persistent TCP connection.",
          },
          { term: "FHIR", detail: "The REST-oriented interoperability standard for healthcare data exchange." },
          {
            term: "ORU",
            detail: "The HL7 v2 message type that carries an observation result — how a finished report reaches the EHR.",
          },
          {
            term: "VNA",
            detail: "Vendor Neutral Archive. Imaging storage independent of any one imaging vendor's system.",
          },
        ],
      },
    ],
  },
];
