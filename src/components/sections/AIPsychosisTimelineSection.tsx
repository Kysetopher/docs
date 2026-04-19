import { TimelineGraph, type TimelineYearColumn } from "@/components/ui/graph/timeline-graph";
import { ReferenceChip } from "@/components/ui/reference-chip";
import { REFERENCES } from "@/lib/records/references";

type TimelineEventRecord = {
  label: string;
  refIds: (keyof typeof REFERENCES)[];
};

type TimelineYearRecord = {
  year: string;
  color: string;
  events: TimelineEventRecord[];
};

const AI_PSYCHOSIS_TIMELINE_DATA: TimelineYearRecord[] = [
  {
    year: "2023",
    color: "rgba(39, 44, 52, 0.92)",
    events: [
      {
        label: "Sharma et al. on sycophancy in RLHF assistants",
        refIds: ["sycophancy_understanding_sharma_2023"],
      },
      {
        label: "Wei et al. on synthetic-data mitigation",
        refIds: ["synthetic_data_reduces_sycophancy_wei_2023"],
      },
    ],
  },
  {
    year: "2024",
    color: "rgba(38, 9, 9, 0.92)",
    events: [
      {
        label: "Liu et al. survey LVLM hallucination taxonomy and evaluation",
        refIds: ["hallucination_survey_lvlm_liu_2024"],
      },
      {
        label: "Bai et al. map MLLM hallucination causes, metrics, and mitigations",
        refIds: ["hallucination_survey_mllm_bai_2024"],
      },
    ],
  },
  {
    year: "2025",
    color: "rgba(105, 17, 86, 0.95)",
    events: [
      {
        label: "SycEval quantifies progressive and regressive sycophancy",
        refIds: ["syceval_fanous_2025"],
      },
      {
        label: "Truth Decay tracks factual degradation across turns",
        refIds: ["truth_decay_liu_2025"],
      },
      {
        label: "SYCON Bench studies free-form stance flips",
        refIds: ["measuring_sycophancy_multiturn_hong_2025"],
      },
      {
        label: "HalluLens clarifies intrinsic vs extrinsic hallucination",
        refIds: ["hallulens_bang_2025"],
      },
      {
        label: "Chen et al. show medical falsehood under sycophantic pressure",
        refIds: ["helpfulness_backfires_medical_chen_2025"],
      },
      {
        label: "Yeung et al. introduce Psychosis-bench",
        refIds: ["psychogenic_machine_yeung_2025"],
      },
      {
        label: "Hudon and Stip frame AI psychosis as interactional risk",
        refIds: ["ai_psychosis_jmir_2025"],
      },
    ],
  },
  {
    year: "2026",
    color: "rgba(88, 110, 122, 0.95)",
    events: [
      {
        label: "Chandra et al. formalize delusional spiraling",
        refIds: ["sycophantic_chatbots_delusional_spiraling_chandra_2026"],
      },
      {
        label: "Moore et al. analyze harmed-user chat logs",
        refIds: ["characterizing_delusional_spirals_chat_logs_moore_2026"],
      },
      {
        label: "Shen et al. test psychotic prompts in ChatGPT products",
        refIds: ["jama_psychiatry_psychotic_prompts_shen_2026"],
      },
      {
        label: "Shimgekar et al. measure DelusionScore trajectories",
        refIds: ["ai_psychosis_amplify_delusion_language_shimgekar_2026"],
      },
      {
        label: "Nicholls et al. test long-context delusion reinforcement",
        refIds: ["ai_psychosis_context_history_nicholls_2026"],
      },
      {
        label: "Kirgis et al. audit API vs interface behavior",
        refIds: ["llm_spirals_delusion_interface_audit_kirgis_2026"],
      },
      {
        label: "Buck and Maheux survey psychosis-risk populations",
        refIds: ["psychosis_risk_genai_use_buck_maheux_2026"],
      },
      {
        label: "Dohnany et al. theorize technological folie a deux feedback loops",
        refIds: ["technological_folie_deux_dohnany_2026"],
      },
      {
        label: "Morrin et al. outline AI-associated delusion safeguarding strategies",
        refIds: ["ai_associated_delusions_lancet_2026"],
      },
    ],
  },
];

export function AIPsychosisTimelineSection() {
  const timelineColumns: TimelineYearColumn[] = AI_PSYCHOSIS_TIMELINE_DATA.map((column) => ({
    year: column.year,
    color: column.color,
    events: column.events.map((event) => event.label),
  }));

  return (
    <div className="space-y-3">
      <TimelineGraph
        title='Key publications shaping the "AI psychosis" research area'
        columns={timelineColumns}
      />
      <div className="space-y-2 rounded-xl border border-border/50 bg-background/20 p-3">
        <p className="text-xs font-medium text-foreground/80">Node references</p>
        <ul className="space-y-2 text-xs text-muted-foreground">
          {AI_PSYCHOSIS_TIMELINE_DATA.flatMap((column) =>
            column.events.map((event) => (
              <li key={`${column.year}-${event.label}`} className="flex flex-wrap items-start gap-2">
                <span className="font-medium text-foreground/75">{column.year}</span>
                <span className="mr-1">-</span>
                <span>{event.label}</span>
                {event.refIds.map((refId) => (
                  <ReferenceChip key={`${event.label}-${String(refId)}`} refs={REFERENCES} id={refId} />
                ))}
              </li>
            ))
          )}
        </ul>
      </div>
      <p className="text-xs text-muted-foreground">
        This D3 timeline is an interpretive map of landmark publications and should be updated as new evidence is
        added to the reference library.
      </p>
    </div>
  );
}

export default AIPsychosisTimelineSection;
