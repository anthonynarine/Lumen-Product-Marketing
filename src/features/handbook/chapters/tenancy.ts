import type { Chapter } from "../types";

export const tenancyChapters: Chapter[] = [
  {
    slug: "organization-and-facility",
    title: "Organization, facility, and membership",
    group: "Tenancy",
    summary:
      "Organization is the hard tenant boundary. Facility is a scope inside it. Membership is the record that binds an external identity to authority in either one.",
    body: [
      {
        kind: "lede",
        text: "A health system with eleven sites is one customer with eleven sites, not eleven customers. Lumen models that with two distinct concepts that are often collapsed into one — and collapsing them is how multi-tenant platforms end up leaking.",
      },
      { kind: "h", text: "Organization is the hard boundary" },
      {
        kind: "p",
        text: "Every tenant-owned resource in Lumen belongs to exactly one organization. Not optionally, not by convention — structurally. That includes exams, reports, facilities, protocols, interpretation criteria profiles, media references, audit events, and integration configuration.",
      },
      {
        kind: "p",
        text: "The organization boundary never opens. There is no role, no workflow state, no administrative action, and no automation that causes data to become visible across it. When a customer asks what stops another customer from seeing their patients, this is the answer, and it is a single answer rather than a list of mitigations.",
      },
      { kind: "h", text: "Facility is subordinate scope" },
      {
        kind: "p",
        text: "An organization may contain one facility or many. Facility exists so a health system can run on one platform while keeping operational configuration and staff scope separated where clinical practice requires it.",
      },
      {
        kind: "p",
        text: "Things that are commonly facility-specific:",
      },
      {
        kind: "list",
        items: [
          "Exam protocols and worksheet configuration",
          "Interpretation criteria",
          "Report branding",
          "Workflow options",
          "Modality endpoints and local integration routes",
          "Which clinicians work there",
        ],
      },
      {
        kind: "p",
        text: "Unlike the organization boundary, the facility boundary is a workflow rule, and workflow rules can have deliberate openings. An in-progress exam is confined to the facility where it is being performed. Once a report is finalized it becomes visible across the organization, because that is how shared-chart access works in a real multi-site health system — a physician at another site reviewing a patient's prior study is the normal case, not an exception.",
      },
      {
        kind: "note",
        title: "The distinction in one line",
        text: "The facility boundary is a workflow rule that opens on finalization. The organization boundary never opens, regardless of status, role, or workflow.",
      },
      { kind: "h", text: "Membership binds identity to authority" },
      {
        kind: "p",
        text: "A membership record is the bridge between an externally authenticated identity and any authority inside Lumen. It is what turns a verified person into a specific someone inside a specific customer, and it answers four questions on every request:",
      },
      {
        kind: "list",
        items: [
          "Does this identity belong to this organization at all?",
          "Is the membership currently active?",
          "Is the member scoped to one facility or to the whole organization?",
          "Which clinical role does the member hold?",
        ],
      },
      {
        kind: "p",
        text: "Membership is also the reason an account can be shut off decisively. Suspending a membership removes clinical authority immediately, independent of whatever sessions or tokens exist on the identity side.",
      },
      { kind: "h", text: "How people join" },
      {
        kind: "p",
        text: "Creating a new organization is self-service; whoever creates it becomes its owner. Joining an existing organization is never self-service — it is invite-only, because letting a user select their own tenant is the same thing as letting the client declare its own authority. Only an existing owner can grant the owner role, an organization can never reach zero active owners, and every membership action — invitation, acceptance, role change, suspension, removal — writes an immutable audit record.",
      },
    ],
  },
  {
    slug: "tenant-isolation-invariants",
    title: "The isolation rules we treat as non-negotiable",
    group: "Tenancy",
    summary:
      "Twelve properties that hold regardless of role, workload, or which part of the system is asking. These are the statements a security review can hold us to.",
    body: [
      {
        kind: "lede",
        text: "An invariant is a property that is supposed to be true at every moment, not most of the time. These are written down precisely so they can be tested, and so a change that would break one is visible as a change rather than a surprise.",
      },
      {
        kind: "steps",
        items: [
          "Every tenant-owned clinical resource belongs to exactly one organization.",
          "Tenant-owned resources are never queried globally in a request path without an explicit tenant scope.",
          "A client-provided organization, facility, or role is never sufficient authorization on its own.",
          "Cross-organization resource access returns no data — not an error that confirms the resource exists.",
          "Facility restrictions are applied independently of role. One never substitutes for the other.",
          "An inactive membership authorizes nothing.",
          "A valid external identity with no Lumen membership authorizes nothing.",
          "Role checks never replace tenant checks.",
          "Tenant checks never replace resource-state checks.",
          "Background jobs and integration workers are tenant-scoped the same as any request.",
          "Media access is tenant- and facility-authorized before a retrieval URL is ever generated.",
          "Audit records retain enough context to reconstruct who acted, on which tenant and resource, and when.",
        ],
      },
      { kind: "h", text: "Why a list like this is useful" },
      {
        kind: "p",
        text: "Security claims tend to be written as adjectives — secure, isolated, hardened — which cannot be verified or falsified. Each line above is a statement that is either true or not, and each one corresponds to something that can be attacked in a test with a wrong-organization actor and asserted on.",
      },
      {
        kind: "p",
        text: "Several of them exist because the opposite is a common and comfortable mistake. Fetching a record and then checking whether the caller should have it reads almost identically to fetching only records the caller may have — right up until a code path forgets the second half. Lumen scopes the query rather than filtering the result, so there is no second half to forget.",
      },
      {
        kind: "note",
        title: "Defense in depth, not a single wall",
        text: "These invariants are enforced in application code, and the database is additionally configured so that tenant-scoped tables carry their own row-level restriction underneath. The database layer is a backstop, never a substitute for the application layer doing its job correctly.",
      },
    ],
  },
  {
    slug: "reads-and-writes",
    title: "Why reads and writes are guarded differently",
    group: "Tenancy",
    summary:
      "Reads are protected by scoping the query before it runs. Writes are protected by a service layer that verifies actor, tenant, role, and state before it mutates anything.",
    body: [
      {
        kind: "lede",
        text: "Reading the wrong record and writing the wrong record are different failures, so they get different defenses. Conflating them into one generic permission check is how systems end up with a hole on one side or the other.",
      },
      { kind: "h", text: "Reads: scope the question, not the answer" },
      {
        kind: "p",
        text: "A read never begins with “find exam 123.” It begins, conceptually, with “within this authenticated member's organization and facility scope, find exam 123.” The scope is part of the question. If the record belongs to another organization, the query simply does not match it, and the caller receives the same response they would receive for an identifier that never existed.",
      },
      {
        kind: "p",
        text: "This is deliberately stricter than filtering results after the fact. Post-filtering means the data was already retrieved, and it means a single forgotten filter is an exposure. Pre-scoping means the unsafe version of the query cannot be written by accident.",
      },
      { kind: "h", text: "Writes: a fixed sequence, every time" },
      {
        kind: "p",
        text: "Mutations go through a service layer that follows the same order of operations regardless of what is being written:",
      },
      {
        kind: "steps",
        items: [
          "Resolve the trusted actor context — who is really making this change.",
          "Load the target resource inside tenant scope, so a cross-tenant target is never even found.",
          "Verify the actor's role permits this class of action.",
          "Verify the resource's workflow state permits it right now.",
          "Execute the mutation atomically, so a partial write cannot leave the record in an invalid state.",
          "Emit audit and observability events.",
          "Return a result that reveals nothing beyond what the caller was entitled to see.",
        ],
      },
      { kind: "h", text: "What the request-handling layer does not do" },
      {
        kind: "p",
        text: "Views authenticate, parse the request, call into these layers, and serialize the response. They are explicitly not the place where tenant isolation or workflow rules live. If an authorization rule existed only in a view, then every new endpoint would be a fresh opportunity to omit it — and endpoints get added far more often than the layers underneath them.",
      },
      {
        kind: "note",
        title: "Enforced, not just documented",
        text: "This separation is checked automatically. A static analysis test fails the build if clinical models are queried directly outside the read and write layers, which means the architecture cannot quietly erode through ordinary day-to-day changes.",
      },
    ],
  },
];
