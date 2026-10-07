import type { Chapter } from "../types";

export const startHereChapters: Chapter[] = [
  {
    slug: "five-sentences",
    title: "The whole model in five sentences",
    group: "Start here",
    summary:
      "The shortest accurate description of how Lumen protects clinical data. If you read one chapter, read this one.",
    body: [
      {
        kind: "lede",
        text: "Most security documents take thirty pages to say something that fits in five sentences. Here are the five. Every other chapter in this handbook is an expansion of one of them.",
      },
      {
        kind: "steps",
        items: [
          "Gait proves who you are. Lumen decides what you are allowed to do. These are two separate systems that do not substitute for each other.",
          "Organization is Lumen's hard tenant boundary. Facility is a scope that lives inside an organization, never across organizations.",
          "Authentication never equals clinical access. Every request still has to clear membership, tenant scope, facility scope, role, and the resource's own workflow state.",
          "Reads are scoped before they run and writes are authorized before they execute. The client is never trusted to declare its own authority.",
          "Automation can observe, investigate, and recommend. A human approves anything consequential.",
        ],
      },
      {
        kind: "h",
        text: "Why this is phrased as separations rather than features",
      },
      {
        kind: "p",
        text: "A security model built as a list of features invites a dangerous question: which feature is protecting this particular request? A model built as a set of separations answers a better one: what would have to fail, simultaneously and independently, for this request to reach data it shouldn't?",
      },
      {
        kind: "p",
        text: "In Lumen the answer is never one thing. An attacker holding a perfectly valid session still has no organization membership. A member of the right organization still has no facility scope. A user with the right facility scope still has a role that may not permit the action. A role that normally permits the action still cannot touch a finalized report. Each of those is enforced by a different part of the system, on the server, on every request.",
      },
      {
        kind: "note",
        title: "What this handbook is",
        text: "A public, plain-language version of Lumen's internal security and tenancy architecture reference. It describes how the platform is designed and enforced. It is not a certification, an audit report, or an attestation, and it does not claim any of those.",
      },
    ],
  },
  {
    slug: "how-lumen-is-layered",
    title: "How Lumen is layered",
    group: "Start here",
    summary:
      "Identity, clinical authorization, media storage, and hospital integrations are four separate boundaries. None of them trusts the others to have already checked.",
    body: [
      {
        kind: "lede",
        text: "Lumen is a multi-tenant clinical reporting platform. Its security model is deliberately layered rather than centralized, because a centralized model has a single place to be wrong.",
      },
      {
        kind: "h",
        text: "Four boundaries, four different questions",
      },
      {
        kind: "pair",
        items: [
          {
            term: "Gait — identity",
            detail:
              "A separate identity and security platform built specifically to protect Lumen. It authenticates users, issues and revokes sessions, and runs its own security observability. It answers exactly one question: is this person who they say they are, and is this session trustworthy?",
          },
          {
            term: "Lumen — clinical authorization",
            detail:
              "Lumen accepts a trusted identity from Gait and then independently resolves it into organization membership, facility scope, role, and workflow permissions. Lumen does not delegate this to Gait, and Gait does not get a vote in it.",
          },
          {
            term: "Lumen Media — imaging storage",
            detail:
              "Images and cine loops live in private object storage behind their own service. Every retrieval is tenant- and facility-authorized before a download URL is ever generated.",
          },
          {
            term: "Integration services — hospital systems",
            detail:
              "Epic, Oracle Health, MEDITECH, PACS, VNAs, and interface engines are separate trust domains. Each sits behind its own boundary, with its own authentication, message contract, and audit trail.",
          },
        ],
      },
      {
        kind: "h",
        text: "The guiding principle",
      },
      {
        kind: "quote",
        text: "No single layer is trusted to do everything.",
      },
      {
        kind: "p",
        text: "Identity security and clinical authorization are different problems with different failure modes, so they are owned by different systems. A compromise of the identity plane does not hand over clinical data, because the identity plane never held the authority to release it. A bug in a clinical view does not widen the tenant boundary, because the tenant boundary is enforced underneath the view, in the layer that actually talks to the database.",
      },
      {
        kind: "h",
        text: "What each layer owns",
      },
      {
        kind: "table",
        head: ["Layer", "Owns"],
        rows: [
          [
            "Gait",
            "Authentication, token issuance, refresh lifecycle, session revocation, replay detection, security events and observability",
          ],
          [
            "Lumen",
            "Tenant isolation, facility boundaries, clinical roles, workflow authorization, exam state, reporting truth, clinical auditability",
          ],
          [
            "Lumen Media",
            "Private media storage, authorized retrieval, uploader identity binding, image metadata and lifecycle",
          ],
          [
            "Integration services",
            "Connections to external hospital systems, message contracts, delivery guarantees, reconciliation",
          ],
        ],
      },
      {
        kind: "note",
        title: "A deliberate omission",
        text: "Gait is not the source of truth for Lumen's clinical roles or tenant membership, and it is not designed to become one. Whether a physician may sign a carotid report, or whether a technologist may work at a second site, is a Lumen decision made against Lumen's own records.",
      },
    ],
  },
];
