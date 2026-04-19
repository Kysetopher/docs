import type { DocSection } from "@/components/docs/DocumentationPage";
import { DOC_TAGS } from "@/lib/records/tag-records";

export const aiPsychosisResearchSections: DocSection[] = [
  {
    id: "overview",
    title: "Overview",
    summary: "From taxonomy to instrumentation: a path to an operational field.",
    tags: [DOC_TAGS.research, DOC_TAGS.clinicalContext],
    content: (
      <p className="text-sm text-muted-foreground leading-relaxed">
        The highest leverage move is not proving the phrase "AI psychosis" in abstract terms. The leverage is
        building standards and infrastructure that make cases classifiable, detectable, and referable across
        platforms, clinics, and policy systems.
      </p>
    ),
  },
  {
    id: "wedge",
    title: "Strategic Wedge",
    summary: "What to build first so the category can become real and fundable.",
    tags: [DOC_TAGS.positioning],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Case definition layer: separate AI-induced from AI-reinforced trajectories with explicit severity tiers.</li>
        <li>Detection layer: define conversation and behavior markers with measurable thresholds.</li>
        <li>Referral and response layer: codify platform-to-clinician and family escalation pathways.</li>
        <li>Data network layer: build incident reporting and longitudinal outcome tracking.</li>
      </ul>
    ),
  },
  {
    id: "proposed-framework",
    title: "Proposed Framework",
    summary: "Draft model for immediate pilot use and iteration.",
    tags: [DOC_TAGS.framework],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Working title: AI-Induced Delusional Reinforcement Model (AIDRM).</li>
        <li>Target scope: 5 to 7 symptom-pattern archetypes with clear inclusion and exclusion criteria.</li>
        <li>Severity structure: 3-tier model (emerging, escalating, acute) with defined intervention triggers.</li>
        <li>Pathways: 2 to 3 response routes (product intervention, clinical referral, crisis escalation).</li>
      </ul>
    ),
  },
  {
    id: "instrumentation-signals",
    title: "Instrumentation Signals",
    summary: "Concrete markers for classification, triage, and monitoring.",
    tags: [DOC_TAGS.metrics],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Rapid belief convergence after repeated assistant affirmation.</li>
        <li>Model-affirmation loops with escalating certainty and reduced challenge tolerance.</li>
        <li>Identity destabilization language and hidden-message interpretation patterns.</li>
        <li>Persistence and rigidity markers despite corrective social or clinical input.</li>
        <li>Functional impact markers: sleep collapse, social withdrawal, and care refusal.</li>
      </ul>
    ),
  },
  {
    id: "evidence-assembly",
    title: "Evidence Assembly Plan",
    summary: "How to move from conceptual model to high-trust evidence.",
    tags: [DOC_TAGS.execution],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Attach framework classes to real transcripts where permissible, and synthetic analogs where not.</li>
        <li>Run dual annotation: technical raters plus clinical raters to calibrate category agreement.</li>
        <li>Track outcomes over time rather than one-off incident snapshots.</li>
        <li>Version the schema and publish revisions so evidence and definitions can co-evolve.</li>
      </ul>
    ),
  },
  {
    id: "reality-check",
    title: "Reality Check",
    summary: "Current constraints that explain why the field is still open.",
    tags: [DOC_TAGS.fieldStatus],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>This is a pre-paradigm area with no dominant owner and no standard vocabulary.</li>
        <li>No billing codes and limited reimbursement pathways currently constrain deployment scale.</li>
        <li>That constraint is also the opportunity: the standards layer is still available to build.</li>
      </ul>
    ),
  },
];
