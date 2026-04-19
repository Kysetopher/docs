import type { DocSection } from "@/components/docs/DocumentationPage";
import { DOC_TAGS } from "@/lib/records/tag-records";

export const medicalRecognitionSections: DocSection[] = [
  {
    id: "goal",
    title: "Goal",
    summary: "Petition framework for formal medical recognition and study pathways.",
    tags: [DOC_TAGS.policy, DOC_TAGS.advocacy],
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
    tags: [DOC_TAGS.evidence, DOC_TAGS.governance],
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
    tags: [DOC_TAGS.medical, DOC_TAGS.publicHealth],
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
