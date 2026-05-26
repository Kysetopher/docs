import type { ReactNode } from "react";
import type { ReferenceRecord } from "@/components/ui/reference-chip";

export type BusinessPlanReferenceId<T extends string = string> = T;

export type BusinessPlanReferenceMap<T extends string = string> = Record<
  T,
  ReferenceRecord
>;

export type BusinessPlanStatBlock = {
  label: string;
  body: ReactNode;
  references?: string[];
};

export type BusinessPlanCardSpec = {
  title: string;
  eyebrow?: string;
  value?: ReactNode;
  valueLabel?: ReactNode;
  bullets?: ReactNode[];
  stats?: BusinessPlanStatBlock[];
  footer?: ReactNode;
};

export type BusinessPlanCostRow = {
  category: ReactNode;
  notes: ReactNode;
  estimate: ReactNode;
};

export type BusinessPlanPhase = {
  title: string;
  body: ReactNode;
};

