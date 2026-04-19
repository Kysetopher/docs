type StakeholderGap = {
  layer: string;
  has: string;
  missing: string;
};

const STAKEHOLDER_GAPS: StakeholderGap[] = [
  {
    layer: "AI labs",
    has: "Conversation and behavior data at scale.",
    missing: "Clinical interpretation and longitudinal psychiatric outcome linkage.",
  },
  {
    layer: "Clinicians",
    has: "Diagnostic frameworks and treatment pathways.",
    missing: "Reliable AI-mechanism instrumentation and platform telemetry access.",
  },
  {
    layer: "Trust and safety teams",
    has: "High-volume real-time incident visibility.",
    missing: "Cross-platform standards and follow-up outcome tracking.",
  },
  {
    layer: "Policy and standards bodies",
    has: "Authority to codify definitions and incentives.",
    missing: "Harmonized evidence with stable operational terminology.",
  },
];

export function StakeholderGapGrid() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/60">
      <div className="grid grid-cols-1 border-b border-border/50 bg-muted/30 p-3 text-xs font-semibold text-foreground/80 md:grid-cols-3">
        <p>Layer</p>
        <p>Has</p>
        <p>Missing</p>
      </div>
      {STAKEHOLDER_GAPS.map((row) => (
        <div
          key={row.layer}
          className="grid grid-cols-1 border-b border-border/40 p-3 text-xs text-muted-foreground last:border-b-0 md:grid-cols-3"
        >
          <p className="font-medium text-foreground/90">{row.layer}</p>
          <p>{row.has}</p>
          <p>{row.missing}</p>
        </div>
      ))}
    </div>
  );
}

export default StakeholderGapGrid;

