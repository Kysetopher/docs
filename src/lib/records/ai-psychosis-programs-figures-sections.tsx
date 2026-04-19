import type { DocSection } from "@/components/docs/DocumentationPage";
import { ActorsChip } from "@/components/ui/actors-chip";
import { GraphPlaceholderSection } from "@/components/sections/GraphPlaceholderSection";
import { StakeholderGapGrid } from "@/components/sections/StakeholderGapGrid";
import {
  AI_PSYCHOSIS_ACTORS,
  AI_PSYCHOSIS_ACTOR_GROUPS,
} from "@/lib/records/ai-psychosis-actors-records";
import { DOC_TAGS } from "@/lib/records/tag-records";

function ActorChipRow({
  ids,
}: {
  ids: readonly (keyof typeof AI_PSYCHOSIS_ACTORS)[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {ids.map((id) => (
        <ActorsChip key={id} actors={AI_PSYCHOSIS_ACTORS} id={id} />
      ))}
    </div>
  );
}

export const aiPsychosisProgramsFiguresSections: DocSection[] = [
  {
    id: "overview",
    title: "Landscape Overview",
    summary:
      "The core problem is coordination: signal exists across systems, but no actor owns cross-silo integration.",
    tags: [DOC_TAGS.landscape, DOC_TAGS.fieldStatus, DOC_TAGS.gapAnalysis],
    content: (
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
        <p>
          The actors already exist. The gap is that they are siloed and rarely labeling this risk domain as
          "AI psychosis" in operational terms.
        </p>
        <p>
          The strategic opportunity is to anchor to actors already seeing real-world signal, then provide
          mechanism-level language that can travel across clinical, platform, technical, and policy systems.
        </p>
      </div>
    ),
  },
  {
    id: "clinical-leadership",
    title: "Clinical and Psychiatry (Highest Signal)",
    summary: "This is where cases surface first, even when teams do not yet use LLM-specific terminology.",
    tags: [DOC_TAGS.clinical, DOC_TAGS.clinicalEvidence, DOC_TAGS.earlySignals],
    content: (
      <div className="space-y-4 text-sm text-muted-foreground">
        <div className="space-y-2">
          <p className="font-medium text-foreground/90">Core programs and institutions</p>
          <ActorChipRow ids={AI_PSYCHOSIS_ACTOR_GROUPS.clinicalPrograms} />
        </div>

        <div className="space-y-2">
          <p className="font-medium text-foreground/90">Key figures</p>
          <ActorChipRow ids={AI_PSYCHOSIS_ACTOR_GROUPS.clinicalFigures} />
        </div>

        <ul className="list-disc space-y-2 pl-5">
          <li>Observed patterns are often framed as delusion formation, paranoia reinforcement, and dissociation.</li>
          <li>Current attribution is usually broad digital exposure, not LLM-specific interaction mechanisms.</li>
          <li>Primary opportunity: deliver mechanism-level vocabulary that fits existing intake and triage workflows.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "ai-labs-and-alignment",
    title: "AI Labs and Alignment (Mechanisms, Not Outcomes)",
    summary: "Labs understand reinforcement dynamics but are structurally weak on clinical validation.",
    tags: [DOC_TAGS.aiLabs, DOC_TAGS.mechanisms, DOC_TAGS.sycophancy],
    content: (
      <div className="space-y-4 text-sm text-muted-foreground">
        <div className="space-y-2">
          <p className="font-medium text-foreground/90">Major actors</p>
          <ActorChipRow ids={AI_PSYCHOSIS_ACTOR_GROUPS.aiLabs} />
        </div>

        <div className="space-y-2">
          <p className="font-medium text-foreground/90">Key figures</p>
          <ActorChipRow ids={AI_PSYCHOSIS_ACTOR_GROUPS.aiFigures} />
        </div>

        <ul className="list-disc space-y-2 pl-5">
          <li>Strengths: large interaction datasets, alignment/failure-mode insight, and sycophancy research.</li>
          <li>Gap: limited linkage to ground-truth clinical outcomes or diagnosis progression.</li>
          <li>Priority: shared protocols for privacy-preserving outcome linkage with clinical partners.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "trust-safety-and-platform-risk",
    title: "Trust and Safety / Platform Risk (Incident Dense)",
    summary: "This layer sees the highest incident volume, but mostly as operational logs rather than trajectories.",
    tags: [DOC_TAGS.trustAndSafety, DOC_TAGS.chatLogEvidence, DOC_TAGS.implicitRisk],
    content: (
      <div className="space-y-4 text-sm text-muted-foreground">
        <ActorChipRow ids={AI_PSYCHOSIS_ACTOR_GROUPS.trustSafety} />

        <ul className="list-disc space-y-2 pl-5">
          <li>They detect escalation loops, belief reinforcement, and user behavioral drift in production.</li>
          <li>Most systems do not track what happens after intervention across care settings.</li>
          <li>Priority: incident schemas that can hand off safely to clinical follow-up systems.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "policy-and-standards-actors",
    title: "Policy and Standards (Legitimation Layer)",
    summary: "These groups formalize terminology and reimbursement pathways after evidence matures.",
    tags: [DOC_TAGS.policy, DOC_TAGS.governance, DOC_TAGS.evidence],
    content: (
      <div className="space-y-4 text-sm text-muted-foreground">
        <ActorChipRow ids={AI_PSYCHOSIS_ACTOR_GROUPS.policyStandards} />

        <ul className="list-disc space-y-2 pl-5">
          <li>Scale adoption depends on codification into standards, guidelines, and classification pathways.</li>
          <li>Critical bottlenecks include DSM/ICD alignment, guideline language, and reimbursement structure.</li>
          <li>Priority: package cross-silo evidence into standards-ready submissions.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "adjacent-bridge-layer",
    title: "Adjacent Bridge Layer (Likely Early Movers)",
    summary: "Bridge-layer researchers and governance actors can often move faster than large institutions.",
    tags: [DOC_TAGS.positioning, DOC_TAGS.research, DOC_TAGS.governance],
    content: (
      <div className="space-y-4 text-sm text-muted-foreground">
        <ActorChipRow ids={AI_PSYCHOSIS_ACTOR_GROUPS.bridgeLayer} />

        <ul className="list-disc space-y-2 pl-5">
          <li>These actors connect technical findings, digital mental health methods, and policy translation.</li>
          <li>They are well-positioned to pilot shared vocabulary and reporting prototypes.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "care-delivery-blind-spot",
    title: "Missing Layer: Care Delivery Operators",
    summary: "Psychiatric hospitals, hotlines, and residential programs are where real trajectories land first.",
    tags: [DOC_TAGS.medical, DOC_TAGS.gapAnalysis, DOC_TAGS.execution],
    content: (
      <div className="space-y-4 text-sm text-muted-foreground">
        <ActorChipRow ids={AI_PSYCHOSIS_ACTOR_GROUPS.careDelivery} />

        <div className="rounded-xl border border-border/50 bg-background/40 p-3 leading-relaxed">
          <p className="font-medium text-foreground/90">Why this layer matters</p>
          <p>
            Care delivery systems are handling frontline reports such as "the chatbot confirmed this belief is real" and
            "the system is communicating with me as a divine entity." They hold the earliest high-fidelity intake data,
            but this data is rarely captured with interoperable AI-risk fields.
          </p>
        </div>

        <ul className="list-disc space-y-2 pl-5">
          <li>This is the most actionable source for real-world trajectory evidence.</li>
          <li>Most organizations are operationally overloaded and not publishing formal analyses.</li>
          <li>Priority: intake templates and referral pathways that preserve clinical utility and privacy.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "capability-gap-grid",
    title: "Capability Gap Grid",
    summary: "A practical map of who has what and what they still lack.",
    tags: [DOC_TAGS.gapAnalysis, DOC_TAGS.execution],
    content: <StakeholderGapGrid />,
  },
  {
    id: "ecosystem-map-placeholder",
    title: "Ecosystem Map (Placeholder)",
    summary: "Reserved slot for actor network and data-flow visualization.",
    tags: [DOC_TAGS.landscape, DOC_TAGS.gapAnalysis],
    content: (
      <GraphPlaceholderSection
        title="Actor and Data-Flow Placeholder"
        placeholderId="ecosystem-map-clinical-labs-platform-policy"
        description="Recommended visual: network graph with nodes for stakeholders and edges for intake signal, incident data, referral handoff, and standards codification."
      />
    ),
  },
];
