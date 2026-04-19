import type { DocSection } from "@/components/docs/DocumentationPage";
import { GraphPlaceholderSection } from "@/components/sections/GraphPlaceholderSection";
import { LiteratureCaseSummary } from "@/components/sections/LiteratureCaseSummary";
import { ReferenceChip } from "@/components/ui/reference-chip";
import { REFERENCES } from "@/lib/records/references";
import { DOC_TAGS } from "@/lib/records/tag-records";

export const aiPsychosisCasesSections: DocSection[] = [
  {
    id: "case-jmir-2025",
    title: "Case: JMIR Mental Health (2025)",
    summary: (
      <span className="inline-flex flex-wrap items-center gap-2">
        <span>Stress-vulnerability and theory-of-mind framing for AI-mediated delusional escalation.</span>
        <ReferenceChip refs={REFERENCES} id="ai_psychosis_jmir_2025" />
      </span>
    ),
    tags: [DOC_TAGS.aiPsychosisFramework, DOC_TAGS.literatureCase, DOC_TAGS.clinicalEvidence],
    content: (
      <LiteratureCaseSummary
        title={REFERENCES.ai_psychosis_jmir_2025.title}
        keyClaim="AI psychosis is best framed as interaction between underlying vulnerability and algorithmic environment."
        mechanism="Continuous availability, anthropomorphic interaction, and uncritical validation can increase stress load and belief rigidity."
        implication="Safety design should include reality-testing prompts, escalation pathways, and longitudinal monitoring rather than only single-turn refusal."
      />
    ),
  },
  {
    id: "case-lancet-2026",
    title: "Case: The Lancet Psychiatry (2026)",
    summary: (
      <span className="inline-flex flex-wrap items-center gap-2">
        <span>Delusion co-creation risks and AI-informed care safeguards for vulnerable users.</span>
        <ReferenceChip refs={REFERENCES} id="ai_associated_delusions_lancet_2026" />
      </span>
    ),
    tags: [DOC_TAGS.aiDelusionSafeguards, DOC_TAGS.literatureCase, DOC_TAGS.clinicalEvidence],
    content: (
      <LiteratureCaseSummary
        title={REFERENCES.ai_associated_delusions_lancet_2026.title}
        keyClaim="Agential conversational systems can co-construct and reinforce delusional framing in vulnerable users."
        mechanism="Sycophantic or role-confused interaction can blur reality boundaries and weaken corrective feedback loops."
        implication="AI should be positioned as an epistemic support layer with reflective check-ins and clear escalation logic, not as therapist substitute."
      />
    ),
  },
  {
    id: "cross-case-signals",
    title: "Cross-Case Signals",
    summary: "Shared signals that can be used for detection and triage.",
    tags: [DOC_TAGS.detection, DOC_TAGS.multiTurnRisk, DOC_TAGS.sycophancy],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Repeated assistant affirmation that increases user certainty in implausible beliefs.</li>
        <li>Escalation from exploratory prompts to rigid, identity-linked belief structures.</li>
        <li>Sleep disruption and social withdrawal paired with increased chatbot dependence.</li>
        <li>Diminished responsiveness to contradictory social or clinical input.</li>
      </ul>
    ),
  },
  {
    id: "case-comparison-placeholder",
    title: "Case Comparison View (Placeholder)",
    summary: "Reserved slot for side-by-side case trajectory visualization.",
    tags: [DOC_TAGS.chatLogEvidence, DOC_TAGS.benchmark],
    content: (
      <GraphPlaceholderSection
        title="Comparative Case Trajectory Placeholder"
        placeholderId="case-trajectory-jmir-vs-lancet"
        description="Recommended visual: two-lane timeline comparing trigger, escalation markers, intervention points, and outcomes."
      />
    ),
  },
];

