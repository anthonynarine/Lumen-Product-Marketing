import type { Chapter } from "../types";

export const proofChapters: Chapter[] = [
  {
    slug: "evidence-and-testing",
    title: "How the controls are proven",
    group: "Proof",
    summary:
      "Security teams eventually stop asking what you claim and start asking how you prove it. Every major boundary here has a corresponding automated test that attacks it.",
    body: [
      {
        kind: "lede",
        text: "A control that is described but not exercised is a hope. The point of writing invariants down precisely is that each one becomes something a test can attempt to violate.",
      },
      { kind: "h", text: "Control and evidence" },
      {
        kind: "table",
        head: ["Control", "Evidence"],
        rows: [
          ["Cross-tenant access denied", "Automated tests driving every operation with a wrong-organization actor"],
          ["Facility restriction enforced", "Multi-facility authorization tests, including the finalization opening"],
          ["Signed report immutable", "Workflow-lock tests covering edit, sign, finalize, unfinalize, and addendum"],
          ["Media access tenant-scoped", "Media authorization tests run against a real database engine"],
          ["Token failures handled correctly", "Authentication contract tests across the identity boundary"],
          ["Ownership cannot reach zero", "Concurrency tests that race membership removal under real locking"],
          ["Automation cannot deploy itself", "Capability, approval, and deployment boundary tests"],
          ["Audit emitted on finalization", "Audit event assertions on every state transition"],
          ["Patient data stays out of logs and keys", "Adversarial tests using synthetic data only"],
        ],
      },
      { kind: "h", text: "The classes of test that matter" },
      {
        kind: "list",
        items: [
          "Authentication contract tests",
          "Tenant isolation tests",
          "Facility isolation tests",
          "Role permission tests",
          "Workflow-state authorization tests",
          "Media authorization tests",
          "Concurrency tests against a real database, not an in-memory substitute",
          "Integration contract tests",
          "Audit event tests",
          "Automation authority-boundary tests",
        ],
      },
      { kind: "h", text: "Adversarial rather than confirmatory" },
      {
        kind: "p",
        text: "The tenant isolation suite is written from the attacker's side. It takes an actor from the wrong organization and points them at every clinical and administrative operation in turn, asserting not only the response code but the absence of side effects — because an operation that returns a refusal while still having written something is a worse failure than an honest error.",
      },
      {
        kind: "p",
        text: "That posture has earned its keep. Running it has surfaced real defects, including a set of handlers returning a server error instead of a not-found on cross-organization access, which would have confirmed the existence of records the caller had no business knowing about.",
      },
      { kind: "h", text: "Architecture that cannot quietly erode" },
      {
        kind: "p",
        text: "Two guardrails run in the build itself rather than in review. A static analysis test fails the build if clinical data is queried outside the authorized read and write layers. A startup check refuses to run a production configuration with tenant enforcement disabled. Both exist because the realistic way a boundary disappears is not a deliberate decision — it is an ordinary change, made quickly, that nobody connected to the boundary.",
      },
      {
        kind: "note",
        title: "Concurrency is tested against the real thing",
        text: "Race conditions in membership and invitation handling were found by reproducing them against a real PostgreSQL server, not by reasoning about them. Lock ordering, double-accept, and simultaneous-reinvite cases are covered by tests that actually run concurrently.",
      },
    ],
  },
  {
    slug: "deployment-and-network",
    title: "Where the software actually runs",
    group: "Proof",
    summary:
      "Application and database services run inside a private network with no public addresses. Public traffic terminates at controlled HTTPS ingress, never at internal services.",
    body: [
      {
        kind: "lede",
        text: "Application-level authorization is the interesting part of this handbook, but it only matters if the network underneath it is not offering a way around.",
      },
      { kind: "h", text: "The deployment shape" },
      {
        kind: "p",
        text: "Public traffic reaches a load balancer over HTTPS and goes no further on its own. Application services, databases, caches, media storage, and integration services run inside private network boundaries. Hospital connectivity arrives over private links rather than the open internet.",
      },
      { kind: "h", text: "The rules that shape it" },
      {
        kind: "list",
        items: [
          "Application servers do not need public addresses, and do not have them.",
          "The database is not reachable from the internet.",
          "Only required ports are open, and network rules express service-to-service intent rather than broad ranges.",
          "Secrets live in a managed secret store, not in configuration files or images.",
          "Logs are centralized.",
          "Encryption is enabled in transit and at rest, including between application services and their databases.",
          "Production access to the private network goes through controlled operational pathways, never directly at the database or internal services.",
        ],
      },
      { kind: "h", text: "Configuration guardrails" },
      {
        kind: "p",
        text: "Several properties that are easy to assume are instead checked at startup. A production configuration with debug behavior enabled, or with tenant header enforcement switched off, fails to start rather than running in a weakened state. A misconfiguration that refuses to boot is a considerably better outcome than one that boots and serves.",
      },
      {
        kind: "note",
        title: "Honest scope",
        text: "This chapter describes the deployment architecture Lumen is designed for. Production infrastructure evidence — the specific controls, monitoring, and contingency arrangements in any given deployment — is part of a deployment review with the hosting organization, not something a public page can attest to.",
      },
    ],
  },
];
