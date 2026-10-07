import type { Chapter } from "../types";

export const clinicalChapters: Chapter[] = [
  {
    slug: "clinical-safety-boundary",
    title: "What automation may and may not do",
    group: "Clinical safety and data",
    summary:
      "Lumen's AI layer explains approved protocols and criteria, flags inconsistencies, and drafts. It does not change signed interpretations, move patient images, or finalize reports.",
    body: [
      {
        kind: "lede",
        text: "A clinical platform that lets software make clinical decisions has a different risk profile than one that lets software help a clinician make them. Lumen is the second kind, and the boundary is architectural rather than a matter of prompt wording.",
      },
      { kind: "h", text: "What AI and automation are permitted to do" },
      {
        kind: "list",
        items: [
          "Explain protocols and summarize approved standards",
          "Retrieve interpretation criteria the organization has adopted",
          "Identify inconsistent or implausible data for a human to look at",
          "Detect workflow anomalies",
          "Recommend technical repairs and propose configuration changes",
          "Produce drafts for review",
        ],
      },
      { kind: "h", text: "What they are not permitted to do" },
      {
        kind: "list",
        items: [
          "Change a signed clinical interpretation",
          "Alter diagnostic criteria in production",
          "Silently reassign a patient's images",
          "Finalize a report on a clinician's behalf",
          "Override tenant, facility, or role authorization",
          "Deploy an unapproved change",
        ],
      },
      { kind: "h", text: "The knowledge layer says when it does not know" },
      {
        kind: "p",
        text: "Lumen's clinical knowledge assistant answers from an approved corpus of protocols and criteria. It is designed to retrieve and explain what an organization has adopted rather than to generate clinical guidance, and to say so plainly when a question falls outside what it has. An assistant that confidently invents a threshold is worse than no assistant, because it is wrong in a way that reads as authoritative.",
      },
      {
        kind: "note",
        title: "Authorization applies to the assistant too",
        text: "The knowledge layer is not a side door into clinical data. It operates within the same tenant and facility scope as any other caller, and being automated grants it nothing.",
      },
    ],
  },
  {
    slug: "automation-and-human-approval",
    title: "Intelligence does not grant authority",
    group: "Clinical safety and data",
    summary:
      "Automated investigation can analyze, reproduce, and propose. Deterministic controls and an explicit human approval decide whether anything actually changes.",
    body: [
      {
        kind: "lede",
        text: "Gait runs automated investigation agents that watch for anomalies, reproduce suspected issues, and propose fixes. The interesting part of that design is not what the agents can do — it is what they structurally cannot.",
      },
      { kind: "h", text: "The core principle" },
      {
        kind: "quote",
        text: "An agent may conclude that a fix is appropriate. That conclusion does not authorize the fix.",
      },
      {
        kind: "p",
        text: "Reasoning and authority are separate things. A system that treats a confident conclusion as permission to act has no meaningful ceiling on its behavior, because its ceiling is only as good as its judgment on any given day.",
      },
      { kind: "h", text: "Deterministic controls sit underneath" },
      {
        kind: "p",
        text: "The agent layer operates behind non-negotiable mechanical constraints that do not reason and cannot be argued with:",
      },
      {
        kind: "list",
        items: [
          "Explicit capability grants for each workflow",
          "Environment and deployment-target restrictions",
          "Repository and path restrictions",
          "Binding to a specific immutable commit",
          "Approval validity checks",
          "Risk ceilings and kill switches",
          "Audit logging of every action taken",
        ],
      },
      { kind: "h", text: "How a finding becomes a change" },
      {
        kind: "steps",
        items: [
          "Deterministic enforcement and observability surface an anomaly as a structured finding.",
          "A coordinator routes it to investigators — identity, application security, tenancy, integration — who produce diagnoses rather than actions.",
          "A reproduction step attempts to confirm the issue in a controlled environment.",
          "A repair proposal is produced with its risk explanation, tests, and rollback plan.",
          "An independent validator verifies the proposal against the exact source that would be deployed.",
          "A human approves, or does not. This is the authority boundary.",
          "A constrained executor deploys exactly what was validated and approved — it does not choose what to deploy.",
          "Post-deployment verification feeds back into observability.",
        ],
      },
      { kind: "h", text: "Two observatories, deliberately not merged" },
      {
        kind: "p",
        text: "Gait's observatory watches security posture. Lumen's watches clinical software operations — workflow integrity, data integrity, and integration health. They are kept separate because they answer different questions and have different escalation paths. A single ambiguous agent system watching both tends to be tuned for whichever one is noisier.",
      },
      {
        kind: "note",
        title: "Why this belongs in a security handbook",
        text: "Automation that can modify production is part of the attack surface. A compromised or simply mistaken agent is only as dangerous as the authority it holds, which is why the authority is capped mechanically rather than behaviorally.",
      },
    ],
  },
  {
    slug: "audit-and-observability",
    title: "The audit trail, and what it is not",
    group: "Clinical safety and data",
    summary:
      "Audit answers what happened to a patient's record and who did it. Observability answers whether the platform is healthy. They are related systems with different jobs.",
    body: [
      {
        kind: "lede",
        text: "These two get conflated constantly, usually into a single log pipeline that satisfies neither requirement. They answer different questions for different people on different timescales.",
      },
      { kind: "h", text: "Audit answers: what happened, who did it, to what, and when" },
      {
        kind: "p",
        text: "The audit trail is a durable, immutable clinical record. It exists for accountability and reconstruction, and it is read months later by someone asking a specific question about a specific patient or user. Events include:",
      },
      {
        kind: "split",
        left: {
          title: "Clinical actions",
          items: [
            "Exam created or edited",
            "Measurement changed",
            "Report finalized or unfinalized",
            "Addendum created",
            "Image associated or reassigned",
            "Permission denied",
          ],
        },
        right: {
          title: "Administrative actions",
          items: [
            "Member invited or invitation accepted",
            "Role granted or changed",
            "Membership suspended or removed",
            "Facility created or reassigned",
            "Criteria or protocol changed",
            "Integration message sent or failed",
          ],
        },
      },
      { kind: "h", text: "Observability answers: is the platform behaving normally" },
      {
        kind: "p",
        text: "Observability is operational. It is read now, by an engineer, to determine whether something is wrong. Signals include a sudden spike in failed interface messages, unusual cross-facility authorization denials, repeated failed finalization attempts, media retrieval failures, abnormal report-generation latency, stuck workflows, unexpected reconciliation volume, and elevated authentication failures arriving from the identity plane.",
      },
      { kind: "h", text: "Why keeping them separate matters" },
      {
        kind: "p",
        text: "Audit records must be durable, tamper-evident, and complete; volume is not a reason to drop one. Operational telemetry is high-volume, sampled, and expires. Running clinical accountability through a pipeline designed to shed load under pressure means the records you most need are the ones most likely to be missing.",
      },
      {
        kind: "note",
        title: "What audit records deliberately do not contain",
        text: "Audit events carry the identifiers needed to reconstruct an action, not the clinical content of the record itself. Logs and object storage keys are likewise written so that patient information does not end up somewhere it was never meant to be — a property covered by automated tests rather than by convention.",
      },
    ],
  },
];
