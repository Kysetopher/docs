import { ReferenceChip } from "@/components/ui/reference-chip";
import type { BusinessPlanReferenceMap } from "./types";

type ReferenceListProps<T extends string> = {
  refs: BusinessPlanReferenceMap<T>;
  ids: readonly T[];
  className?: string;
};

export function ReferenceList<T extends string>({
  refs,
  ids,
  className,
}: ReferenceListProps<T>) {
  if (!ids.length) return null;

  const unique = Array.from(new Set(ids));

  return (
    <span className={`inline-flex flex-wrap items-center gap-2 align-middle ${className ?? ""}`}>
      {unique.map((id) => (
        <ReferenceChip key={String(id)} refs={refs} id={id} />
      ))}
    </span>
  );
}

export default ReferenceList;

