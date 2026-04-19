import type { ReactNode } from "react";

type LiteratureCaseSummaryProps = {
  title: string;
  keyClaim: string;
  mechanism: string;
  implication: string;
  extra?: ReactNode;
};

export function LiteratureCaseSummary({
  title,
  keyClaim,
  mechanism,
  implication,
  extra,
}: LiteratureCaseSummaryProps) {
  return (
    <div className="space-y-3 rounded-2xl border border-border/60 bg-background/60 p-4 text-sm text-muted-foreground">
      <p className="text-sm font-semibold text-foreground/90">{title}</p>
      <p>
        <span className="font-medium text-foreground/80">Key claim:</span> {keyClaim}
      </p>
      <p>
        <span className="font-medium text-foreground/80">Mechanism focus:</span> {mechanism}
      </p>
      <p>
        <span className="font-medium text-foreground/80">Operational implication:</span> {implication}
      </p>
      {extra}
    </div>
  );
}

export default LiteratureCaseSummary;

