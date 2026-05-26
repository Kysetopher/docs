import { Icon } from "@iconify/react";
import { Fragment } from "react";
import type { BusinessPlanPhase } from "./types";

type BusinessPlanPhasePathProps = {
  title?: string;
  subtitle?: string;
  phases: BusinessPlanPhase[];
};

export function BusinessPlanPhasePath({
  title = "Phase path",
  subtitle = "A staged route that reads well in docs and planning pages.",
  phases,
}: BusinessPlanPhasePathProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <p className="text-foreground font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
        {phases.map((phase, index) => (
          <Fragment key={phase.title}>
            <div className="rounded-xl border border-border/40 bg-background/20 p-3">
              <p className="text-foreground/90 font-medium">{phase.title}</p>
              <p className="mt-1 text-muted-foreground">{phase.body}</p>
            </div>
            {index < phases.length - 1 ? (
              <div className="hidden items-center justify-center md:flex">
                <Icon icon="mdi:arrow-right" className="text-xl opacity-70" />
              </div>
            ) : null}
          </Fragment>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 pt-1 md:hidden">
        <Icon icon="mdi:arrow-down" className="text-lg opacity-70" />
        <span className="text-xs text-muted-foreground">Continues by phase</span>
        <Icon icon="mdi:arrow-down" className="text-lg opacity-70" />
      </div>
    </div>
  );
}

export default BusinessPlanPhasePath;
