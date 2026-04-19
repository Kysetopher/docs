type TermBoundaryRow = {
  term: string;
  scope: string;
  failureUnit: string;
};

const TERM_BOUNDARY_ROWS: TermBoundaryRow[] = [
  {
    term: "Hallucination",
    scope: "Unsupported or false model content relative to context or facts.",
    failureUnit: "Output-level error (often single-turn measurable).",
  },
  {
    term: "Sycophancy",
    scope: "Agreement-seeking behavior that mirrors user beliefs over truth.",
    failureUnit: "Interaction-level tendency (amplifies over turns).",
  },
  {
    term: "AI-associated delusions / AI psychosis",
    scope: "Delusion reinforcement and epistemic destabilization in vulnerable users.",
    failureUnit: "Longitudinal human-model failure mode.",
  },
];

export function TermBoundarySection() {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-border/60 bg-background/60 p-4">
        <p className="text-sm font-medium text-foreground/90">Definition Boundaries</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Use these distinctions consistently to avoid collapsing different mechanisms into one label.
        </p>
      </div>
      <div className="space-y-2">
        {TERM_BOUNDARY_ROWS.map((row) => (
          <div key={row.term} className="rounded-xl border border-border/50 bg-background/60 p-3">
            <p className="text-sm font-semibold text-foreground/90">{row.term}</p>
            <p className="mt-1 text-xs text-muted-foreground">{row.scope}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              <span className="font-medium text-foreground/80">Unit:</span> {row.failureUnit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TermBoundarySection;

