import { Icon } from "@iconify/react";

type TermBoundaryRow = {
  term: string;
  scope: string;
  failureUnit: string;
  icon: string;
};

const TERM_BOUNDARY_ROWS: TermBoundaryRow[] = [
  {
    term: "Hallucination",
    scope: "Unsupported or false model content relative to context or facts.",
    failureUnit: "Output-level error (often single-turn measurable).",
    icon: "mdi:alert-circle-outline",
  },
  {
    term: "Sycophancy",
    scope: "Agreement-seeking behavior that mirrors user beliefs over truth.",
    failureUnit: "Interaction-level tendency (amplifies over turns).",
    icon: "mdi:account-voice",
  },
  {
    term: "AI-associated delusions / AI psychosis",
    scope: "Delusion reinforcement and epistemic destabilization in vulnerable users.",
    failureUnit: "Longitudinal human-model failure mode.",
    icon: "mdi:brain",
  },
];

const TERM_CARD_BG_CLASSES = [
  "bg-indigo-950/40",
  "bg-cyan-950/40",
  "bg-rose-950/30",
  "bg-emerald-950/40",
  "bg-violet-950/40",
  "bg-amber-950/30",
];

export function TermBoundarySection() {
  return (
    <div className="py-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {TERM_BOUNDARY_ROWS.map((row, index) => (
          <div
            key={row.term}
            className="
              group relative h-full overflow-visible rounded-2xl border-none p-5 pt-7 shadow-lg backdrop-blur
              transition hover:-translate-y-0.5 hover:shadow-[0_20px_80px_-45px_rgba(0,0,0,0.95)]
            "
          >
            <div
              className={`absolute inset-0 -z-10 rounded-2xl ${
                TERM_CARD_BG_CLASSES[index % TERM_CARD_BG_CLASSES.length]
              }`}
            />

            <div className="absolute left-6 -top-6 flex items-center justify-center rounded-full bg-transparent p-3">
              <div className="text-muted-foreground transition group-hover:text-primary">
                <Icon icon={row.icon} className="h-6 w-6" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground transition group-hover:text-primary">
                {row.term}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">{row.scope}</p>

              <p className="mt-3 text-xs text-muted-foreground">
                <span className="font-medium text-foreground/80">Unit:</span> {row.failureUnit}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TermBoundarySection;