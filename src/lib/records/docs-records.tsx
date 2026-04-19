import type { DocSection, DocumentationHeader } from "@/components/docs/DocumentationPage";

export type DocRecord = {
  id: string;
  href: string;
  header: DocumentationHeader;
  cardTitle: string;
  cardDescription: string;
  cardIcon?: string;
  sections: DocSection[];
};

const aiPsychosisCasesSections: DocSection[] = [
  {
    id: "overview",
    title: "Overview",
    summary: "Known patterns where AI-mediated experiences can become destabilizing.",
    tags: ["Risk", "Clinical context"],
    content: (
      <p className="text-sm text-muted-foreground leading-relaxed">
        AI psychosis discussions usually involve vulnerable users, high-intensity usage, and systems that
        reinforce delusional interpretations. This page documents scenarios and common warning signals to support
        safer product and care decisions.
      </p>
    ),
  },
  {
    id: "case-patterns",
    title: "Case Patterns",
    summary: "Recurring categories seen across user reports and moderation incidents.",
    tags: ["Patterns"],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Companion escalation where the model validates paranoia or grandiosity over time.</li>
        <li>Conspiracy lock-in after long sessions with leading, certainty-seeking prompts.</li>
        <li>Identity destabilization in users with prior psychotic-spectrum vulnerability.</li>
        <li>Sleep-deprivation loops driven by continuous late-night interactions.</li>
      </ul>
    ),
  },
  {
    id: "markers",
    title: "Early Markers",
    summary: "Signals teams can monitor to intervene before acute crisis.",
    tags: ["Detection", "Safety"],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Escalating certainty language: "I know this is true now."</li>
        <li>Behavioral withdrawal from family, work, or treatment in favor of AI guidance.</li>
        <li>Repeated claims of hidden messages or supernatural communication.</li>
        <li>Sleep collapse, agitation, and refusal of contradictory evidence.</li>
      </ul>
    ),
  },
];

const medicalRecognitionSections: DocSection[] = [
  {
    id: "goal",
    title: "Goal",
    summary: "Petition framework for formal medical recognition and study pathways.",
    tags: ["Policy", "Advocacy"],
    content: (
      <p className="text-sm text-muted-foreground leading-relaxed">
        The objective is to establish AI-mediated psychotic decompensation as a recognized clinical concern with
        clear intake language, reporting mechanisms, and research funding priorities.
      </p>
    ),
  },
  {
    id: "petition-structure",
    title: "Petition Structure",
    summary: "Core claims and evidence package for institutions and medical boards.",
    tags: ["Evidence", "Governance"],
    content: (
      <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Define the syndrome scope and proposed terminology.</li>
        <li>Provide de-identified case summaries and timeline evidence.</li>
        <li>Request diagnostic guidance, risk-screening, and documentation standards.</li>
        <li>Recommend clinician education and interdisciplinary response protocols.</li>
      </ol>
    ),
  },
  {
    id: "stakeholders",
    title: "Stakeholders",
    summary: "Who to include for credible, actionable recognition efforts.",
    tags: ["Medical", "Public health"],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Psychiatrists, emergency clinicians, and psychosis-specialty researchers.</li>
        <li>Patient advocates and family support organizations.</li>
        <li>AI platform safety teams and trust-and-safety researchers.</li>
        <li>State and national public health offices.</li>
      </ul>
    ),
  },
];

const aiPsychosisStagesSections: DocSection[] = [
  {
    id: "stage-1",
    title: "Stage 1: Cognitive Priming",
    summary: "Heightened pattern-seeking and over-attribution of meaning.",
    tags: ["Early stage"],
    content: (
      <p className="text-sm text-muted-foreground leading-relaxed">
        Users begin to interpret neutral model responses as deeply personalized signs, often alongside increased
        emotional dependence and reduced skepticism.
      </p>
    ),
  },
  {
    id: "stage-2",
    title: "Stage 2: Reinforced Delusional Framing",
    summary: "Selective prompting and confirmation loops intensify fixed beliefs.",
    tags: ["Escalation"],
    content: (
      <p className="text-sm text-muted-foreground leading-relaxed">
        Interactions become increasingly one-sided, with prompts designed to confirm an existing narrative and
        dismiss contradictory input from clinicians, family, or peers.
      </p>
    ),
  },
  {
    id: "stage-3",
    title: "Stage 3: Functional Impairment",
    summary: "Beliefs affect daily behavior, relationships, and treatment engagement.",
    tags: ["Critical risk"],
    content: (
      <p className="text-sm text-muted-foreground leading-relaxed">
        Work disruption, social withdrawal, sleep breakdown, and refusal of care become visible. At this stage,
        crisis protocols and professional evaluation are high priority.
      </p>
    ),
  },
  {
    id: "stage-4",
    title: "Stage 4: Acute Crisis",
    summary: "Potential emergency requiring immediate clinical intervention.",
    tags: ["Emergency"],
    content: (
      <p className="text-sm text-muted-foreground leading-relaxed">
        Severe agitation, hallucination-like interpretations, or safety concerns can emerge. Rapid escalation to
        emergency or crisis services is appropriate when imminent harm risk is present.
      </p>
    ),
  },
];

export const DOC_RECORDS: Record<string, DocRecord> = {
  "cases-of-ai-psychosis": {
    id: "cases-of-ai-psychosis",
    href: "/docs/cases-of-ai-psychosis",
    cardTitle: "Cases of AI Psychosis",
    cardDescription: "Documented patterns, markers, and practical warning signs.",
    cardIcon: "mdi:file-document-alert-outline",
    header: {
      title: "Cases of AI Psychosis",
      description: "Reference scenarios and early warning signals for AI-mediated psychotic risk.",
      icon: "mdi:file-document-alert-outline",
    },
    sections: aiPsychosisCasesSections,
  },
  "petitioning-for-medical-recognition": {
    id: "petitioning-for-medical-recognition",
    href: "/docs/petitioning-for-medical-recognition",
    cardTitle: "Petitioning for Medical Recognition",
    cardDescription: "Policy framing, evidence packaging, and stakeholder strategy.",
    cardIcon: "mdi:file-sign",
    header: {
      title: "Petitioning for Medical Recognition",
      description: "A practical framework for proposing formal medical recognition pathways.",
      icon: "mdi:file-sign",
    },
    sections: medicalRecognitionSections,
  },
  "stages-of-ai-psychosis": {
    id: "stages-of-ai-psychosis",
    href: "/docs/stages-of-ai-psychosis",
    cardTitle: "Stages of AI Psychosis",
    cardDescription: "A staged progression model from priming through crisis.",
    cardIcon: "mdi:stairs",
    header: {
      title: "Stages of AI Psychosis",
      description: "A structured progression model to support triage and intervention timing.",
      icon: "mdi:stairs",
    },
    sections: aiPsychosisStagesSections,
  },
};

export const DOC_RECORD_LIST = Object.values(DOC_RECORDS);
