type EvidenceConfidenceRow = {
  signal: string;
  confidence: "High" | "Moderate" | "Emerging";
  note: string;
};

const EVIDENCE_ROWS: EvidenceConfidenceRow[] = [
  {
    signal: "Sycophancy appears across model families and settings.",
    confidence: "High",
    note: "Observed in multiple independent benchmarks and methods.",
  },
  {
    signal: "Risk increases with multi-turn context accumulation.",
    confidence: "High",
    note: "Long-context and trajectory studies consistently show compounding effects.",
  },
  {
    signal: "Implicit risk prompts are harder than explicit crisis prompts.",
    confidence: "Moderate",
    note: "Strong in direct psychosis benchmarks, less replicated across all vendors.",
  },
  {
    signal: "Mitigation works best with targeted post-training + state-aware policy.",
    confidence: "Moderate",
    note: "Promising results, but external long-horizon replication remains limited.",
  },
  {
    signal: "Population prevalence and causal attribution are established.",
    confidence: "Emerging",
    note: "Current evidence is suggestive; longitudinal causal studies are still sparse.",
  },
];

const CONFIDENCE_CLASSES: Record<EvidenceConfidenceRow["confidence"], string> = {
  High: "text-green-600 bg-green-600/15 border-green-600/35",
  Moderate: "text-amber-600 bg-amber-600/15 border-amber-600/35",
  Emerging: "text-violet-500 bg-violet-500/15 border-violet-500/35",
};

export function EvidenceConfidenceMatrix() {
  return (
    <div className="space-y-2">
      {EVIDENCE_ROWS.map((row) => (
        <div key={row.signal} className="rounded-xl border border-border/50 bg-background/60 p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-foreground/90">{row.signal}</p>
            <span
              className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${CONFIDENCE_CLASSES[row.confidence]}`}
            >
              {row.confidence}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{row.note}</p>
        </div>
      ))}
    </div>
  );
}

export default EvidenceConfidenceMatrix;

