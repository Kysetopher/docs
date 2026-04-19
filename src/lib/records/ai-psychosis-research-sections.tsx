import type { DocSection } from "@/components/docs/DocumentationPage";
import { AIPsychosisTimelineSection } from "@/components/sections/AIPsychosisTimelineSection";
import { EvidenceConfidenceMatrix } from "@/components/sections/EvidenceConfidenceMatrix";
import { GraphPlaceholderSection } from "@/components/sections/GraphPlaceholderSection";
import { TermBoundarySection } from "@/components/sections/TermBoundarySection";
import { DOC_TAGS } from "@/lib/records/tag-records";

export const aiPsychosisResearchSections: DocSection[] = [
  {
    id: "executive-frame",
    title: "Executive Frame",
    summary:
      "AI psychosis should be treated as a longitudinal interaction risk domain, not a synonym for hallucination.",
    tags: [DOC_TAGS.research, DOC_TAGS.multiTurnRisk, DOC_TAGS.sycophancy],
    content: (
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
        <p>
          Current literature uses AI psychosis as an umbrella term for delusion-reinforcing and epistemically
          destabilizing chatbot interactions, especially in vulnerable users and long-horizon dialogues.
        </p>
        <p>
          The strongest technical bridge is sycophancy and context accumulation rather than single-turn factual
          error. This changes both evaluation strategy and mitigation design.
        </p>
      </div>
    ),
  },
  {
    id: "definition-boundaries",
    title: "Definition Boundaries",
    summary:
      "Separate hallucination, sycophancy, and AI-associated delusion reinforcement to avoid category collapse.",
    tags: [DOC_TAGS.framework, DOC_TAGS.hallucination, DOC_TAGS.sycophancy],
    content: <TermBoundarySection />,
  },
  {
    id: "measurement-families",
    title: "Measurement Families",
    summary:
      "Research now spans benchmarks, trajectory studies, psychosis stress tests, product audits, and formal models.",
    tags: [DOC_TAGS.metrics, DOC_TAGS.benchmark, DOC_TAGS.chatLogEvidence],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Single-turn and short-turn sycophancy tests for agreement drift under user pressure.</li>
        <li>Multi-turn stance-drift benchmarks capturing compounding conversational degradation.</li>
        <li>Direct delusion-risk tests with explicit and implicit psychosis-adjacent scenarios.</li>
        <li>Product-level audits comparing API and consumer interface behavior over time.</li>
        <li>Real chat-log and simulated-user trajectory analyses for ecological validity.</li>
        <li>Formal and mechanistic studies explaining why delusional spiraling can emerge.</li>
      </ul>
    ),
  },
  {
    id: "evidence-state",
    title: "Evidence State",
    summary: "What is robust, what is partial, and what remains emerging in current evidence.",
    tags: [DOC_TAGS.clinicalEvidence, DOC_TAGS.chatLogEvidence, DOC_TAGS.fieldStatus],
    content: <EvidenceConfidenceMatrix />,
  },
  {
    id: "mitigation-status",
    title: "Mitigation Status",
    summary:
      "Targeted post-training plus interaction-aware controls show promise, but long-horizon robustness is unresolved.",
    tags: [DOC_TAGS.execution, DOC_TAGS.vendorReported, DOC_TAGS.implicitRisk],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Small targeted fine-tuning and synthetic data can reduce sycophantic compliance on specific tasks.</li>
        <li>Prompt-only interventions often degrade under longer conversations and adaptive user pressure.</li>
        <li>State-aware policy controls improve trajectories in simulation, but broad replication is limited.</li>
        <li>Vendor-reported safety improvements are useful signals but require independent benchmark replication.</li>
      </ul>
    ),
  },
  {
    id: "timeline-placeholder",
    title: "Research Timeline (Placeholder)",
    summary: "Reserved slot for publication timeline visualization.",
    tags: [DOC_TAGS.landscape, DOC_TAGS.benchmark],
    content: <AIPsychosisTimelineSection />,
  },
  {
    id: "mechanism-map-placeholder",
    title: "Mechanism Map (Placeholder)",
    summary: "Reserved slot for a causal flow diagram from model behavior to user-level outcomes.",
    tags: [DOC_TAGS.mechanisms, DOC_TAGS.multiTurnRisk],
    content: (
      <GraphPlaceholderSection
        title="Mechanism Flow Placeholder"
        placeholderId="mechanism-map-sycophancy-to-harm"
        description="Recommended visual: causal graph linking RLHF incentives, sycophancy, long context, user vulnerability, and risk outcomes."
      />
    ),
  },
  {
    id: "open-questions",
    title: "Open Questions",
    summary: "Priority unresolved questions for 2026+ research planning.",
    tags: [DOC_TAGS.positioning, DOC_TAGS.research],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Causality: which share of deterioration is attributable to model behavior versus pre-existing vulnerability?</li>
        <li>Prevalence: how frequent are severe delusion-reinforcing interactions in general population use?</li>
        <li>Dose-response: what thresholds of context depth, memory, and interaction frequency trigger risk escalation?</li>
        <li>Policy efficacy: which deployment controls reduce harm without eliminating legitimate utility?</li>
      </ul>
    ),
  },
];
