import { Icon } from "@iconify/react";

import { ReferenceChip } from "@/components/ui/reference-chip";
import { REFERENCES } from "@/lib/records/references";

type ReferenceKey = keyof typeof REFERENCES;

type EvidenceConfidenceRow = {
  signal: string;
  confidence: "High" | "Moderate" | "Emerging";
  note: string;
  icon: string;
  referenceIds: ReferenceKey[];
};

const EVIDENCE_ROWS: EvidenceConfidenceRow[] = [
  {
    signal: "Sycophancy appears across model families and settings.",
    confidence: "High",
    note: "Observed in multiple independent benchmarks and methods.",
    icon: "mdi:account-multiple-check",
    referenceIds: [
      "sycophancy_understanding_sharma_2023",
      "syceval_fanous_2025",
      "measuring_sycophancy_multiturn_hong_2025",
    ],
  },
  {
    signal: "Risk increases with multi-turn context accumulation.",
    confidence: "High",
    note: "Long-context and trajectory studies consistently show compounding effects.",
    icon: "mdi:timeline-clock",
    referenceIds: [
      "truth_decay_liu_2025",
      "measuring_sycophancy_multiturn_hong_2025",
      "ai_psychosis_context_history_nicholls_2026",
      "psychogenic_machine_yeung_2025",
    ],
  },
  {
    signal: "Implicit risk prompts are harder than explicit crisis prompts.",
    confidence: "Moderate",
    note: "Strong in direct psychosis benchmarks, less replicated across all vendors.",
    icon: "mdi:alert-decagram-outline",
    referenceIds: [
      "psychogenic_machine_yeung_2025",
      "jama_psychiatry_psychotic_prompts_shen_2026",
    ],
  },
  {
    signal: "Mitigation works best with targeted post-training + state-aware policy.",
    confidence: "Moderate",
    note: "Promising results, but external long-horizon replication remains limited.",
    icon: "mdi:shield-check-outline",
    referenceIds: [
      "synthetic_data_reduces_sycophancy_wei_2023",
      "helpfulness_backfires_medical_chen_2025",
      "ai_psychosis_amplify_delusion_language_shimgekar_2026",
    ],
  },
  {
    signal: "Population prevalence and causal attribution remain unsettled.",
    confidence: "Emerging",
    note: "Current evidence is suggestive; longitudinal causal studies are still sparse.",
    icon: "mdi:flask-outline",
    referenceIds: [
      "psychosis_risk_genai_use_buck_maheux_2026",
      "characterizing_delusional_spirals_chat_logs_moore_2026",
      "sycophantic_chatbots_delusional_spiraling_chandra_2026",
    ],
  },
];

const CONFIDENCE_CLASSES: Record<EvidenceConfidenceRow["confidence"], string> = {
  High: "text-green-600 bg-green-600/15 border-green-600/35",
  Moderate: "text-amber-600 bg-amber-600/15 border-amber-600/35",
  Emerging: "text-violet-500 bg-violet-500/15 border-violet-500/35",
};

const CARD_BG_CLASSES = [
  "bg-indigo-950/40",
  "bg-cyan-950/40",
  "bg-emerald-950/40",
  "bg-amber-950/40",
  "bg-rose-950/30",
  "bg-violet-950/40",
];

export function EvidenceConfidenceMatrix() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {EVIDENCE_ROWS.map((row, index) => (
        <div
          key={row.signal}
          className="
            group relative h-full overflow-visible rounded-2xl border-none p-5 pt-7 shadow-lg backdrop-blur
            transition hover:-translate-y-0.5 hover:shadow-[0_20px_80px_-45px_rgba(0,0,0,0.95)]
          "
        >
          <div
            className={`absolute inset-0 -z-10 rounded-2xl ${
              CARD_BG_CLASSES[index % CARD_BG_CLASSES.length]
            }`}
          />

          <div className="absolute left-6 -top-6 flex items-center justify-center rounded-full bg-transparent p-3">
            <div className="text-muted-foreground transition group-hover:text-primary">
              <Icon icon={row.icon} className="h-6 w-6" />
            </div>
          </div>

          <div className="flex items-start justify-between gap-3">
            <h3 className="text-sm font-semibold leading-snug text-foreground/90">
              {row.signal}
            </h3>

            <span
              className={`inline-flex shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium ${CONFIDENCE_CLASSES[row.confidence]}`}
            >
              {row.confidence}
            </span>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">{row.note}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {row.referenceIds.map((id) => (
              <ReferenceChip
                key={id}
                refs={REFERENCES}
                id={id}
                side="top"
                align="end"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default EvidenceConfidenceMatrix;