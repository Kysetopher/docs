import type { DocSection } from "@/components/docs/DocumentationPage";

export const aiPsychosisProgramsFiguresSections: DocSection[] = [
  {
    id: "overview",
    title: "Overview",
    summary: "A living map of active programs and key stakeholders in AI psychosis work.",
    tags: ["Landscape"],
    content: (
      <p className="text-sm text-muted-foreground leading-relaxed">
        AI psychosis response is distributed across clinical systems, trust and safety teams, research groups, and
        policy organizations. This page is designed as a practical landscape view for coordination and gap
        analysis.
      </p>
    ),
  },
  {
    id: "program-types",
    title: "Current Program Types",
    summary: "Program models currently shaping detection, triage, and intervention.",
    tags: ["Programs"],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Platform trust and safety escalation pathways for delusional and crisis-adjacent conversations.</li>
        <li>Early psychosis clinics integrating digital-behavior context into clinical intake.</li>
        <li>Hospital and emergency psychiatry pilots documenting AI-related symptom trajectories.</li>
        <li>Public-interest monitoring initiatives tracking severe harm reports and response quality.</li>
      </ul>
    ),
  },
  {
    id: "operational-needs",
    title: "Operational Needs",
    summary: "Capabilities programs need to become reliable and scalable.",
    tags: ["Implementation"],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Clear case definitions and triage thresholds shared across product and clinical settings.</li>
        <li>Rapid cross-sector referral protocols between AI platforms, families, and care providers.</li>
        <li>Outcome tracking that includes both user safety and false-positive burden.</li>
        <li>Training for moderators, clinicians, and frontline responders on AI-specific delusional framing.</li>
      </ul>
    ),
  },
  {
    id: "figures",
    title: "Key Figure Categories",
    summary: "The stakeholder roles most influential in this field today.",
    tags: ["Figures", "Stakeholders"],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Psychiatrists and clinical psychologists focused on psychosis, digital psychiatry, and crisis care.</li>
        <li>Trust and safety leads responsible for model behavior policies and escalation workflows.</li>
        <li>Responsible AI researchers measuring reinforcement dynamics and mitigation effectiveness.</li>
        <li>Public health and policy leaders shaping standards, reporting norms, and accountability rules.</li>
      </ul>
    ),
  },
  {
    id: "maintenance",
    title: "Maintenance Guidance",
    summary: "How to keep this landscape current and decision-useful.",
    tags: ["Process"],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Review and refresh this page on a fixed cadence (for example monthly or quarterly).</li>
        <li>Track each entry with status, scope, evidence level, and point-of-contact metadata.</li>
        <li>Separate validated programs from exploratory pilots to avoid overclaiming maturity.</li>
        <li>Log major timeline changes with dates to preserve institutional memory.</li>
      </ul>
    ),
  },
];
