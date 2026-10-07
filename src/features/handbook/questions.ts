import type { HandbookQuestion } from "./types";

export type QuestionGroup = {
  topic: string;
  questions: HandbookQuestion[];
};

/**
 * The question-first index. Each entry answers directly in a couple of
 * sentences, then points at the chapter that covers it properly. Phrased the
 * way a visitor would actually ask, not the way the architecture is organized.
 */
export const questionGroups: QuestionGroup[] = [
  {
    topic: "HIPAA",
    questions: [
      {
        question: "What is HIPAA, and what is it not?",
        answer:
          "HIPAA is a federal law made up of several rules — Privacy, Security, Breach Notification, and Enforcement — that governs how protected health information is used, disclosed, and safeguarded. It is not a certification: no government body certifies software as HIPAA compliant. It is also not a one-time event, not a list of required technologies, and not something a vendor can hold on a customer's behalf.",
        chapterSlug: "what-hipaa-is-and-is-not",
      },
      {
        question: "Is Lumen HIPAA compliant?",
        answer:
          "Lumen is built with HIPAA-aligned technical safeguards and designed to support HIPAA-compliant deployment. It does not claim HIPAA certification, because no such certification exists. Compliance is a shared program between a covered entity and its business associates, and the useful question is which safeguards the architecture actually implements and how they are proven.",
        chapterSlug: "hipaa-technical-safeguards",
      },
      {
        question: "Which HIPAA technical safeguards does the architecture address?",
        answer:
          "All five subsections of the Security Rule's technical safeguards: access control, audit controls, integrity, person or entity authentication, and transmission security. The chapter takes them in order and is explicit about which responsibilities — risk analysis, workforce training, physical safeguards, business associate agreements, contingency planning — remain with the deploying organization.",
        chapterSlug: "hipaa-technical-safeguards",
      },
      {
        question: "What does “addressable” mean in the Security Rule?",
        answer:
          "Not optional. An addressable specification must be assessed, and then either implemented, replaced with a documented equivalent, or documented as unreasonable for that environment. Silently skipping it is not one of the permitted outcomes.",
        chapterSlug: "what-hipaa-is-and-is-not",
      },
    ],
  },
  {
    topic: "Tenant isolation",
    questions: [
      {
        question: "How do you prevent one customer from seeing another customer's data?",
        answer:
          "Organization is a mandatory, server-side tenant boundary. Reads are scoped to the caller's organization before the query runs, writes are authorized before they execute, and the browser cannot declare its own organization. A request for another organization's record returns nothing — not an error that confirms it exists.",
        chapterSlug: "organization-and-facility",
      },
      {
        question: "What about multiple hospitals or sites inside one health system?",
        answer:
          "One organization can contain many facilities. Facility scope is enforced independently, underneath the organization boundary, so a health system runs on one platform while each site keeps its own staff scope and workflow configuration. Finalized reports become visible organization-wide; the organization boundary itself never opens.",
        chapterSlug: "organization-and-facility",
      },
      {
        question: "What exactly do you guarantee about isolation?",
        answer:
          "Twelve written invariants, each one stated precisely enough to be tested and to be held to — from every clinical record belonging to exactly one organization, to background jobs being tenant-scoped like any other caller.",
        chapterSlug: "tenant-isolation-invariants",
      },
      {
        question: "Could a bug in one endpoint expose another tenant's data?",
        answer:
          "The tenant boundary does not live in individual endpoints. Reads are scoped in a shared read layer and writes are authorized in a shared write layer, and a static analysis test fails the build if clinical data is queried outside them. A new endpoint cannot forget a control it never had to remember.",
        chapterSlug: "reads-and-writes",
      },
    ],
  },
  {
    topic: "Identity and access",
    questions: [
      {
        question: "How do you handle authentication?",
        answer:
          "Gait — a dedicated identity and security platform built specifically to protect Lumen — authenticates users and manages session security. Lumen validates that trusted identity and then performs its own independent tenant and clinical authorization. A login never grants access by itself.",
        chapterSlug: "identity-and-authorization",
      },
      {
        question: "What happens if someone steals a valid session token?",
        answer:
          "They hold a verified identity and nothing else. They still need an active membership in the organization that owns the record, the right facility scope, a role permitting the action, and a resource whose workflow state allows it. Sessions are also revocable on the identity side, independently of Lumen.",
        chapterSlug: "how-a-request-is-authorized",
      },
      {
        question: "Can the browser tell the server which organization or role it has?",
        answer:
          "It can say so; it is never believed. Organization, facility, role, ownership, and uploader identity are all resolved or re-verified server-side against Lumen's own records. Hiding a button in the interface is a usability decision, never a security control.",
        chapterSlug: "trust-boundaries",
      },
      {
        question: "What stops a suspended employee from still getting in?",
        answer:
          "Membership status is checked on every request. Suspending a membership removes clinical authority immediately, regardless of what sessions or tokens exist on the identity side, and the change is written to an immutable audit record.",
        chapterSlug: "organization-and-facility",
      },
    ],
  },
  {
    topic: "Clinical data and AI",
    questions: [
      {
        question: "Can AI change production or clinical data on its own?",
        answer:
          "No. Lumen's AI layer explains and retrieves approved protocols and criteria, and says so when it does not know. It cannot change a signed interpretation, reassign a patient's images, finalize a report on a clinician's behalf, or override tenant and role authorization.",
        chapterSlug: "clinical-safety-boundary",
      },
      {
        question: "You use automated security agents. Who approves what they do?",
        answer:
          "A human, for anything consequential. Agents investigate, reproduce, and propose; deterministic controls — capability grants, environment restrictions, immutable commit binding, risk ceilings, kill switches — cap what any of it can reach. Intelligence does not grant authority.",
        chapterSlug: "automation-and-human-approval",
      },
      {
        question: "Can a finalized report be edited?",
        answer:
          "Not silently, and not by anyone. A finalized report is locked as a property of the record rather than a permission on the user. Changes go through an addendum, which is a new attributed, audited record alongside the original.",
        chapterSlug: "hipaa-technical-safeguards",
      },
      {
        question: "What is logged, and can you reconstruct who did what?",
        answer:
          "Clinically meaningful actions write immutable audit events carrying who acted, in which organization and facility, on which resource, and when. Audit is kept separate from operational observability, because a pipeline designed to shed load under pressure is the wrong place for clinical accountability.",
        chapterSlug: "audit-and-observability",
      },
    ],
  },
  {
    topic: "Imaging and integrations",
    questions: [
      {
        question: "How are patient images protected?",
        answer:
          "Media lives in private object storage behind its own service, which performs its own tenant and facility authorization. A retrieval URL is only generated after that check passes, is time-limited, and object keys are generated by the platform rather than taken from a client-supplied filename.",
        chapterSlug: "media-security",
      },
      {
        question: "What happens if an image is assigned to the wrong patient?",
        answer:
          "It goes through a controlled reconciliation workflow — trusted identity resolution, a required reason, explicit authorization, preserved provenance, downstream reconciliation, and an immutable audit trail. Never a freeform field somebody edits.",
        chapterSlug: "imaging-integrity",
      },
      {
        question: "How does Lumen connect to Epic, Oracle Health, or MEDITECH?",
        answer:
          "Through a dedicated integration service, separate from the clinical application, built as one standards-based core with per-vendor and per-site profiles rather than a distinct system per EHR. Each integration defines its own authentication, message contract, retry and duplicate handling, and audit trail before it carries anything.",
        chapterSlug: "hospital-integrations",
      },
    ],
  },
  {
    topic: "Infrastructure and proof",
    questions: [
      {
        question: "Where does patient data actually live?",
        answer:
          "Application and database services run inside a private network with no public addresses. Public traffic terminates at an HTTPS load balancer, never at internal services or the database, and production access to the private network goes through controlled operational pathways.",
        chapterSlug: "deployment-and-network",
      },
      {
        question: "How do you prove any of this, rather than just claim it?",
        answer:
          "Every major boundary has automated tests that attack it. The tenant isolation suite drives each clinical and administrative operation with a wrong-organization actor and asserts side effects as well as status codes; concurrency cases are reproduced against a real database rather than reasoned about.",
        chapterSlug: "evidence-and-testing",
      },
      {
        question: "What keeps the architecture from eroding over time?",
        answer:
          "Two guardrails that run in the build. A static analysis test fails if clinical data is queried outside the authorized read and write layers, and a startup check refuses to run a production configuration with tenant enforcement disabled.",
        chapterSlug: "evidence-and-testing",
      },
    ],
  },
];

export const allQuestions: HandbookQuestion[] = questionGroups.flatMap((group) => group.questions);
