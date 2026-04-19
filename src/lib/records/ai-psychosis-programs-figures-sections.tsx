import type { DocSection } from "@/components/docs/DocumentationPage";
import { DOC_TAGS } from "@/lib/records/tag-records";

export const aiPsychosisProgramsFiguresSections: DocSection[] = [
  {
    id: "overview",
    title: "Overview",
    summary: "A field map of who has leverage, what they hold, and what is missing.",
    tags: [DOC_TAGS.landscape],
    content: (
      <p className="text-sm text-muted-foreground leading-relaxed">
        The AI psychosis space is still pre-paradigm: no dominant player, no shared terminology, and no clear
        operational owner of the clinical and technical intersection. This page tracks the current actor landscape
        and the cross-silo gaps that create the opportunity.
      </p>
    ),
  },
  {
    id: "clinical-psychiatry-leaders",
    title: "Clinical and Psychiatry Leaders",
    summary: "Where AI psychosis can become clinically legible and fundable.",
    tags: [DOC_TAGS.clinical],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>John Torous (Harvard / Beth Israel): mainstream bridge from digital psychiatry to AI-linked harm signals.</li>
        <li>Nina Vasan (Stanford Brainstorm): systems-level psychiatry and implementation framing.</li>
        <li>Thomas Insel: measurable, infrastructure-oriented mental health models and early detection emphasis.</li>
        <li>OnTrackNY: mature early-psychosis care network and potential intake path for AI-related symptom cases.</li>
        <li>Reality check: no major clinical leader explicitly owns an "AI psychosis" program yet.</li>
      </ul>
    ),
  },
  {
    id: "ai-safety-and-alignment",
    title: "AI Safety and Alignment Researchers",
    summary: "Strong on reinforcement mechanisms, weaker on psychiatric framing.",
    tags: [DOC_TAGS.aiLabs, DOC_TAGS.mechanisms],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Anthropic: alignment and model behavior research relevant to harmful reinforcement dynamics.</li>
        <li>OpenAI: trust and safety and evaluation work with conversation-level failure trajectories.</li>
        <li>Jan Leike and adjacent alignment researchers: control and reinforcement behavior under optimization pressure.</li>
        <li>Alignment Research Center: dangerous model behavior focus, with limited psychosis-specific clinical depth.</li>
        <li>Gap: mechanism expertise exists, but clinical operationalization is not yet integrated.</li>
      </ul>
    ),
  },
  {
    id: "trust-safety-platform-risk",
    title: "Trust and Safety and Platform Risk Teams",
    summary: "Highest-velocity incident exposure, but largely private datasets.",
    tags: [DOC_TAGS.trustAndSafety],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Google DeepMind safety and red-teaming functions.</li>
        <li>Meta integrity and safety organizations.</li>
        <li>TikTok content and behavioral risk teams.</li>
        <li>These groups see live delusional loops, design escalation policy, and deploy suppression or redirection.</li>
        <li>Critical limitation: the highest-signal case data is operationally sensitive and not public.</li>
      </ul>
    ),
  },
  {
    id: "public-health-policy",
    title: "Public Health and Policy Actors",
    summary: "Institutions that determine whether this becomes a recognized category.",
    tags: [DOC_TAGS.policy],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>World Health Organization: digital mental health framing and global norm influence.</li>
        <li>National Institute of Mental Health: funding priorities and research direction-setting.</li>
        <li>American Psychiatric Association: DSM pathways and diagnostic gatekeeping.</li>
        <li>Working assumption: without DSM or ICD pathway traction, the field remains informal and underfunded.</li>
      </ul>
    ),
  },
  {
    id: "independent-early-signal-researchers",
    title: "Independent and Early-Signal Researchers",
    summary: "Closest to the thesis, but fragmented and not yet operationalized.",
    tags: [DOC_TAGS.earlySignals],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Research threads include LLM sycophancy, hallucination reinforcement, and parasocial chatbot dependency.</li>
        <li>Frequent institutional homes include Stanford, MIT Media Lab, and the Oxford Internet Institute.</li>
        <li>Current state: fragmented outputs, limited clinical integration, and weak implementation pathways.</li>
      </ul>
    ),
  },
  {
    id: "system-gap-map",
    title: "System Gap Map",
    summary: "The field is split across four silos with no integration owner.",
    tags: [DOC_TAGS.gapAnalysis],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>AI labs have behavioral data, but lack clinical interpretation infrastructure.</li>
        <li>Clinicians have diagnostic frameworks, but lack AI-specific mechanism models.</li>
        <li>Trust and safety teams have incident visibility, but not long-term outcomes.</li>
        <li>Policy institutions have authority, but insufficient harmonized evidence.</li>
        <li>No persistent cross-silo integration layer currently owns this interface.</li>
      </ul>
    ),
  },
];
