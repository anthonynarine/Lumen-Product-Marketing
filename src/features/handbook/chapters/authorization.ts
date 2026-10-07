import type { Chapter } from "../types";

export const authorizationChapters: Chapter[] = [
  {
    slug: "trust-boundaries",
    title: "The four trust boundaries",
    group: "Identity and authorization",
    summary:
      "The device, the identity platform, Lumen's own authorization layer, and external hospital systems are four separate trust domains. Each one is trusted for exactly one thing.",
    body: [
      {
        kind: "lede",
        text: "A trust boundary is a line where you stop believing what you are told and start verifying it yourself. Lumen has four, and being explicit about them is what keeps a mistake in one place from becoming an exposure somewhere else.",
      },
      { kind: "h", text: "Boundary A — the user's device" },
      {
        kind: "p",
        text: "The browser is untrusted. Not suspicious, not malicious by assumption — simply not authoritative. A client may request an organization, a facility, an exam, or an action, but it cannot prove entitlement to any of them, so the request is treated as a question rather than an instruction.",
      },
      {
        kind: "p",
        text: "Concretely, none of the following are ever accepted as authoritative because the client sent them:",
      },
      {
        kind: "list",
        items: [
          "The organization the request claims to belong to",
          "The facility the request claims to be working within",
          "The user's role, or any administrator, physician, or signing flag",
          "Ownership claims over an exam, report, or image",
          "Uploader identity on a media object",
          "Any claim of authority made by or on behalf of an automated agent",
        ],
      },
      {
        kind: "p",
        text: "Every one of those is resolved or re-verified on the server against Lumen's own records. Hiding a button in the interface is a usability decision, never a security control.",
      },
      { kind: "h", text: "Boundary B — Gait" },
      {
        kind: "p",
        text: "Gait answers one question: who is making this request, and is this authentication trustworthy? It provides Lumen the minimum identity material needed to resolve local authorization — a stable external subject identifier, a session identifier, issuance and expiry, issuer and audience, and authentication assurance information where applicable.",
      },
      {
        kind: "p",
        text: "What Gait deliberately does not provide is Lumen's business roles or tenant membership. Those are not identity facts; they are clinical authorization facts, and they belong to the system that owns the clinical data.",
      },
      { kind: "h", text: "Boundary C — Lumen authorization" },
      {
        kind: "p",
        text: "Lumen answers a different question: given this authenticated identity, which tenant, facility, resources, and clinical actions are permitted? It resolves the external identity against its own membership records and its own business rules, and it reaches that conclusion independently of anything the client or the identity platform asserted.",
      },
      { kind: "h", text: "Boundary D — external hospital systems" },
      {
        kind: "p",
        text: "Epic, Oracle Health, MEDITECH, PACS archives, VNAs, and interface engines are separate trust domains, each with its own operator, its own failure modes, and its own idea of correctness. Every integration has to define its own terms before it carries a single message.",
      },
      {
        kind: "list",
        items: [
          "Authentication mechanism and transport security",
          "The expected message contract and allowed message types",
          "Facility and system identity on both sides",
          "Retry rules and duplicate handling",
          "Failure handling and reconciliation",
          "Its own audit trail",
        ],
      },
      {
        kind: "note",
        title: "The practical test",
        text: "For any value flowing through the system, ask which boundary it crossed and who verified it there. If the answer is that it was simply passed along, it is not yet a control.",
      },
    ],
  },
  {
    slug: "identity-and-authorization",
    title: "Identity is one system. Authorization is another.",
    group: "Identity and authorization",
    summary:
      "Gait proves who you are and protects the identity plane. Lumen independently decides what that identity may do. Neither one can quietly assume the other's job.",
    body: [
      {
        kind: "lede",
        text: "The most consequential decision in Lumen's architecture is also the least visible: authentication and clinical authorization are owned by different systems, and neither can substitute for the other.",
      },
      { kind: "h", text: "What Gait owns" },
      {
        kind: "list",
        items: [
          "User authentication and token issuance",
          "Refresh-token lifecycle and session identity",
          "Session revocation and replay detection",
          "Authentication enforcement and security events",
          "Security observability across the identity plane",
          "Human approval boundaries for consequential security changes",
        ],
      },
      {
        kind: "p",
        text: "Gait is a dedicated identity and security platform built specifically to protect Lumen, with its own monitoring and its own operational boundaries. What it does not do is decide whether a particular physician may sign a carotid report, or whether a technologist may work at a second site. Those are clinical questions and they are Lumen's to answer.",
      },
      { kind: "h", text: "How a trusted identity reaches Lumen" },
      {
        kind: "steps",
        items: [
          "The user authenticates with Gait, which issues an access token representing a verified session.",
          "The client sends a request to Lumen over HTTPS with that token attached.",
          "Lumen validates the issuer, audience, signature, expiry, and session claims. A token that fails any of these is rejected before any data is touched.",
          "Lumen resolves the external identity against its own membership records, producing organization, facility scope, role, and membership status.",
          "Lumen authorizes the specific resource and action being requested — and only then reads or writes.",
        ],
      },
      {
        kind: "p",
        text: "Transport between the two is standard HTTPS with TLS, with mutual TLS available where a deployment wants stronger service-to-service trust. Nothing here is a bespoke protocol; custom cryptography is a liability, not a differentiator.",
      },
      { kind: "h", text: "The invariant worth memorizing" },
      {
        kind: "quote",
        text: "A valid token means this identity is authenticated. It does not mean this identity may access a particular organization, facility, exam, image, or action.",
      },
      {
        kind: "p",
        text: "This is why a compromised session does not become a data breach by itself. Whoever holds it still has to be an active member of the organization that owns the record, still has to be scoped to the right facility, still has to hold a role permitting the action, and still has to be acting on a resource whose state allows it.",
      },
      {
        kind: "note",
        title: "Why not merge them",
        text: "A single system that both authenticates users and holds clinical permissions is simpler to build and considerably worse to be wrong in. Every bug in it becomes both an identity bug and an authorization bug at the same time. The separation costs some complexity and buys independent failure.",
      },
    ],
  },
  {
    slug: "how-a-request-is-authorized",
    title: "How one request actually gets authorized",
    group: "Identity and authorization",
    summary:
      "Authorization is not a single yes-or-no decision. A request narrows through identity, membership, tenant, facility, role, and resource state before it reaches data.",
    body: [
      {
        kind: "lede",
        text: "It is tempting to picture authorization as one check. In Lumen it is six, evaluated in order, each capable of ending the request on its own.",
      },
      { kind: "h", text: "The six dimensions" },
      {
        kind: "pair",
        items: [
          {
            term: "Identity",
            detail: "Is this request authenticated by a trusted issuer, with a valid, unexpired, unrevoked session?",
          },
          {
            term: "Membership",
            detail:
              "Is this external identity an active member of the organization in question? An inactive, suspended, or removed membership authorizes nothing, however valid the session.",
          },
          {
            term: "Tenant",
            detail: "Does the requested resource belong to that same organization? If not, it is not visible at all.",
          },
          {
            term: "Facility",
            detail:
              "Where facility scoping applies, is this member permitted to operate within that facility? This is checked on its own, never inferred from role.",
          },
          {
            term: "Role",
            detail:
              "Does the member's clinical role permit this class of action? Owner, administrator, physician, and technologist do not have interchangeable authority.",
          },
          {
            term: "Resource state",
            detail:
              "Does the resource's current workflow state allow this action right now? A role that normally permits an edit still cannot edit a finalized report.",
          },
        ],
      },
      { kind: "h", text: "Why the order matters" },
      {
        kind: "p",
        text: "Each dimension narrows the set of things that could possibly be touched, and it does so before the next one runs. By the time a role check happens, the only resources under consideration already belong to the caller's organization and facility. This is what makes cross-tenant access structurally impossible rather than merely forbidden: the query that would have found another organization's record was never allowed to be that broad.",
      },
      {
        kind: "p",
        text: "It also changes what a cross-tenant request looks like from the outside. Asking for another organization's exam does not produce an access-denied response that confirms the exam exists. It produces nothing, because within the caller's scope there is nothing there.",
      },
      { kind: "h", text: "What none of these checks depend on" },
      {
        kind: "list",
        items: [
          "Anything the browser claimed about itself",
          "Whether the user interface offered the action",
          "Whether a previous request in the same session was permitted",
          "Whether another layer of the system already checked something similar",
        ],
      },
      {
        kind: "note",
        title: "The same funnel applies to automation",
        text: "Background jobs, scheduled work, and integration workers run through tenant scoping exactly as a user request does. Automation is a different caller, not a privileged one.",
      },
    ],
  },
];
