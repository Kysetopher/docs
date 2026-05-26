import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReferenceList } from "./ReferenceList";
import type { BusinessPlanCardSpec, BusinessPlanReferenceMap } from "./types";

type BusinessPlanValueCardProps<T extends string> = {
  spec: BusinessPlanCardSpec;
  refs?: BusinessPlanReferenceMap<T>;
  className?: string;
};

function StatBlock<T extends string>({
  label,
  body,
  references,
  refs,
}: {
  label: string;
  body: ReactNode;
  references?: string[];
  refs?: BusinessPlanReferenceMap<T>;
}) {
  return (
    <div className="border border-border/40 bg-background/20 p-4 text-sm text-foreground/85">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-medium">{label}</span>
        {refs && references?.length ? <ReferenceList refs={refs} ids={references as T[]} /> : null}
      </div>
      <div className="mt-2 space-y-1 text-muted-foreground">{body}</div>
    </div>
  );
}

export function BusinessPlanValueCard<T extends string>({
  spec,
  refs,
  className,
}: BusinessPlanValueCardProps<T>) {
  return (
    <Card className={`rounded-none bg-background/40 backdrop-blur ${className ?? ""}`}>
      <CardHeader className="flex flex-row items-start justify-between border-b border-border/40 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold">{spec.title}</CardTitle>
          {spec.eyebrow ? (
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{spec.eyebrow}</p>
          ) : null}
        </div>

        {spec.value !== undefined ? (
          <div className="text-right">
            <p className="text-xl font-semibold text-foreground">{spec.value}</p>
            {spec.valueLabel ? <p className="text-xs text-muted-foreground">{spec.valueLabel}</p> : null}
          </div>
        ) : null}
      </CardHeader>

      <CardContent className="space-y-4 p-0 text-muted-foreground">
        {spec.bullets?.length ? (
          <ul className="list-disc space-y-2 px-8 pt-4">
            {spec.bullets.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : null}

        {spec.stats?.length ? (
          <div className="space-y-3 px-0">
            {spec.stats.map((stat) => (
              <StatBlock
                key={stat.label}
                label={stat.label}
                body={stat.body}
                references={stat.references}
                refs={refs}
              />
            ))}
          </div>
        ) : null}

        {spec.footer ? <div className="px-4 pb-4 text-sm text-foreground/80">{spec.footer}</div> : null}
      </CardContent>
    </Card>
  );
}

export default BusinessPlanValueCard;

