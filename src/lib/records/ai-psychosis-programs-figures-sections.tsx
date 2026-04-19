import type { DocSection } from "@/components/docs/DocumentationPage";
import { GraphPlaceholderSection } from "@/components/sections/GraphPlaceholderSection";
import { StakeholderGapGrid } from "@/components/sections/StakeholderGapGrid";
import { DOC_TAGS } from "@/lib/records/tag-records";

export const aiPsychosisProgramsFiguresSections: DocSection[] = [
  {
    id: "overview",
    title: "Landscape Overview",
    summary: "The field is active but structurally fragmented across clinical, technical, platform, and policy silos.",
    tags: [DOC_TAGS.landscape, DOC_TAGS.fieldStatus],
    content: (
      <p className="text-sm text-muted-foreground leading-relaxed">
        No single group currently owns the integration layer between model behavior data, clinical interpretation,
        trust-and-safety incident streams, and policy codification. The opportunity is to build the connective
        standards and infrastructure across these silos.
      </p>
    ),
  },
  {
    id: "clinical-leadership",
    title: "Clinical and Psychiatry Leadership",
    summary: "Where classification legitimacy and care integration are most likely to emerge.",
    tags: [DOC_TAGS.clinical, DOC_TAGS.clinicalEvidence],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Digital psychiatry leaders and early psychosis networks are natural intake points for AI-linked cases.</li>
        <li>Current gap: limited standardized AI-mechanism language inside clinical workflow and documentation.</li>
        <li>Priority: integrate digital phenomenology into structured intake, triage, and follow-up templates.</li>
      </ul>
    ),
  },
  {
    id: "ai-labs-and-alignment",
    title: "AI Labs and Alignment Teams",
    summary: "Strong mechanism research capacity, with limited direct clinical coupling.",
    tags: [DOC_TAGS.aiLabs, DOC_TAGS.mechanisms, DOC_TAGS.sycophancy],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Labs can instrument reinforcement dynamics and evaluate model behavior at large scale.</li>
        <li>Current gap: limited external access to high-resolution safety trajectories and user outcomes.</li>
        <li>Priority: shared protocol interfaces with clinicians for interpretable risk escalation signals.</li>
      </ul>
    ),
  },
  {
    id: "trust-safety-and-platform-risk",
    title: "Trust and Safety and Platform Risk",
    summary: "Highest-signal incident visibility, but mostly private and operationally constrained.",
    tags: [DOC_TAGS.trustAndSafety, DOC_TAGS.chatLogEvidence, DOC_TAGS.implicitRisk],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Platform teams observe delusion-adjacent loops in production and enforce escalation policy.</li>
        <li>Current gap: weak long-term outcome coupling after moderation or intervention actions.</li>
        <li>Priority: interoperable incident schema that supports privacy-preserving cross-system analysis.</li>
      </ul>
    ),
  },
  {
    id: "policy-and-standards-actors",
    title: "Policy and Standards Actors",
    summary: "Entities that determine codification, incentives, and eventual care-system scale.",
    tags: [DOC_TAGS.policy, DOC_TAGS.governance],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Standards bodies and public-health institutions can convert fragmented evidence into durable guidance.</li>
        <li>Current gap: insufficient harmonized evidence packages for formal pathway adoption.</li>
        <li>Priority: shared vocabulary, minimum reporting standards, and versioned risk definitions.</li>
      </ul>
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
        description="Recommended visual: network graph with nodes for stakeholders and edges for data, referral, and governance flows."
      />
    ),
  },
];

