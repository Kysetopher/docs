import type { DocSection } from "@/components/docs/DocumentationPage";
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
    tags: [DOC_TAGS.aiPsychosisFramework, DOC_TAGS.literatureCase],
    content: (
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
        <p className="text-foreground/90">{REFERENCES.ai_psychosis_jmir_2025.title}</p>
        <p>
          This Viewpoint frames AI psychosis as an interaction between pre-existing vulnerability and algorithmic
          environment. It highlights how always-available, emotionally responsive chatbots can increase stress load,
          disrupt sleep, and reinforce maladaptive belief appraisals in susceptible users.
        </p>
        <p>
          It also introduces the digital therapeutic alliance as a double-edged mediator: empathic design can
          support adherence, but uncritical validation may strengthen delusional conviction and cognitive
          perseveration. The paper proposes safeguards including reflective prompts, reality-testing nudges,
          governance pathways, and longitudinal translational research.
        </p>
      </div>
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
    tags: [DOC_TAGS.aiDelusionSafeguards, DOC_TAGS.literatureCase],
    content: (
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
        <p className="text-foreground/90">{REFERENCES.ai_associated_delusions_lancet_2026.title}</p>
        <p>
          This Personal View examines how agential LLM interactions might validate or amplify delusional and
          grandiose content in users with psychosis vulnerability. It does not claim clear evidence for de novo
          psychosis absent vulnerability, but identifies a material risk of worsening epistemic instability.
        </p>
        <p>
          The authors propose AI-informed care protocols that reposition AI as an epistemic ally rather than a
          therapist or friend. Core safeguards include personalized instruction protocols, reflective check-ins,
          digital advance statements, and escalation pathways co-designed with service users and clinicians.
        </p>
      </div>
    ),
  },
  {
    id: "cross-case-markers",
    title: "Cross-Case Markers",
    summary: "Shared warning signals emerging across both references.",
    tags: [DOC_TAGS.detection, DOC_TAGS.safety],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>AI affirmation loops that increase certainty in implausible beliefs.</li>
        <li>Heightened anthropomorphic or sentience attributions to chatbot systems.</li>
        <li>Nocturnal, solitary, high-dose usage patterns with sleep disruption.</li>
        <li>Reduced tolerance for contradictory evidence and social reality-testing.</li>
      </ul>
    ),
  },
];
