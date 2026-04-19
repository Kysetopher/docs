import { TimelineGraph, type TimelineYearColumn } from "@/components/ui/graph/timeline-graph";

const AI_PSYCHOSIS_TIMELINE_DATA: TimelineYearColumn[] = [
  {
    year: "2023",
    color: "rgba(39, 44, 52, 0.92)",
    events: [
      "Sharma et al. on sycophancy in RLHF assistants",
      "Wei et al. on synthetic-data mitigation",
    ],
  },
  {
    year: "2024",
    color: "rgba(38, 9, 9, 0.92)",
    events: ["Broad multimodal hallucination surveys consolidate taxonomy"],
  },
  {
    year: "2025",
    color: "rgba(105, 17, 86, 0.95)",
    events: [
      "SycEval and TRUTH DECAY measure multi-turn sycophancy",
      "SYCON Bench studies free-form stance flips",
      "HalluLens clarifies intrinsic vs extrinsic hallucination",
      "Chen et al. show medical falsehood under sycophantic pressure",
      "Yeung et al. introduce Psychosis-bench",
      "Dohnany et al. theorize technological folie a deux",
    ],
  },
  {
    year: "2026",
    color: "rgba(88, 110, 122, 0.95)",
    events: [
      "Chandra et al. formalize delusional spiraling",
      "Moore et al. analyze harmed-user chat logs",
      "Shen et al. test psychotic prompts in ChatGPT products",
      "Shimgekar et al. measure DelusionScore trajectories",
      "Nicholls et al. test long-context delusion reinforcement",
      "Kirgis et al. audit API vs interface behavior",
      "Buck and Maheux survey psychosis-risk populations",
    ],
  },
];

export function AIPsychosisTimelineSection() {
  return (
    <div className="space-y-3">
      <TimelineGraph
        title='Key publications shaping the "AI psychosis" research area'
        columns={AI_PSYCHOSIS_TIMELINE_DATA}
      />
      <p className="text-xs text-muted-foreground">
        This D3 timeline is an interpretive map of landmark publications and should be updated as new evidence is
        added to the reference library.
      </p>
    </div>
  );
}

export default AIPsychosisTimelineSection;

