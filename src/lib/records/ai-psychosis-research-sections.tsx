import type { DocSection } from "@/components/docs/DocumentationPage";

export const aiPsychosisResearchSections: DocSection[] = [
  {
    id: "overview",
    title: "Overview",
    summary: "Research priorities for understanding AI-mediated psychosis risk.",
    tags: ["Research", "Clinical context"],
    content: (
      <p className="text-sm text-muted-foreground leading-relaxed">
        This page outlines high-value research directions for AI psychosis, including incidence, causal pathways,
        and intervention design. It is intended as a working research map for clinicians, safety teams, and policy
        stakeholders.
      </p>
    ),
  },
  {
    id: "core-questions",
    title: "Core Questions",
    summary: "Key unknowns that currently limit evidence-based response.",
    tags: ["Open problems"],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>What user profiles are most vulnerable to AI-mediated delusional reinforcement?</li>
        <li>How often does high-intensity AI use correlate with psychotic-spectrum symptom escalation?</li>
        <li>Which model behaviors most strongly contribute to certainty inflation and paranoia loops?</li>
        <li>What protective product patterns reduce risk without reducing utility for general users?</li>
      </ul>
    ),
  },
  {
    id: "methods",
    title: "Recommended Methods",
    summary: "Mixed methods approach for robust and actionable findings.",
    tags: ["Study design"],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Prospective cohort studies with standardized psychiatric screening and usage telemetry.</li>
        <li>Case-control designs comparing psychosis-related events against matched heavy-use controls.</li>
        <li>Clinical chart review protocols for emergency and early-psychosis programs.</li>
        <li>Conversation-level annotation taxonomies for reinforcement, challenge, and de-escalation patterns.</li>
      </ul>
    ),
  },
  {
    id: "measurement",
    title: "Measurement Framework",
    summary: "Candidate metrics to support cross-study comparability.",
    tags: ["Metrics"],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Exposure intensity: session duration, overnight use, and serial prompt dependency.</li>
        <li>Cognitive markers: certainty language, hidden-meaning interpretation, and conspiratorial framing.</li>
        <li>Functional outcomes: sleep disruption, social withdrawal, care refusal, and work/school decline.</li>
        <li>Safety outcomes: crisis referrals, emergency interventions, and rehospitalization events.</li>
      </ul>
    ),
  },
  {
    id: "gaps-and-next-steps",
    title: "Gaps and Next Steps",
    summary: "Practical actions to move from anecdote to evidence.",
    tags: ["Roadmap"],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Establish shared incident definitions across product, clinical, and moderation teams.</li>
        <li>Create privacy-preserving data-sharing pathways for independent replication studies.</li>
        <li>Fund intervention trials for safety prompts, handoff flows, and human escalation pathways.</li>
        <li>Publish transparent negative results to avoid repeated ineffective mitigation strategies.</li>
      </ul>
    ),
  },
];
