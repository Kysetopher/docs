import type { DocSection } from "@/components/docs/DocumentationPage";

export const aiPsychosisStagesSections: DocSection[] = [
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
