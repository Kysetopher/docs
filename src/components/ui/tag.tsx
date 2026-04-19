import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import type { DocTag, DocTagColor } from "@/lib/records/tag-records";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

type TagProps = {
  tag: DocTag;
  className?: string;
  compact?: boolean;
  iconOnly?: boolean;
  borderless?: boolean;
};

const TAG_COLOR_CLASSES: Record<
  DocTagColor,
  {
    solid: string;
    ghost: string;
    panel: string;
  }
> = {
  red: {
    solid: "text-red-500 border-red-500/35 bg-red-500/15 hover:bg-red-500/20",
    ghost: "text-red-500 hover:bg-red-500/10",
    panel: "border-red-500/35 bg-red-500/10 text-red-100",
  },
  sky: {
    solid: "text-sky-500 border-sky-500/35 bg-sky-500/15 hover:bg-sky-500/20",
    ghost: "text-sky-500 hover:bg-sky-500/10",
    panel: "border-sky-500/35 bg-sky-500/10 text-sky-100",
  },
  violet: {
    solid: "text-violet-500 border-violet-500/35 bg-violet-500/15 hover:bg-violet-500/20",
    ghost: "text-violet-500 hover:bg-violet-500/10",
    panel: "border-violet-500/35 bg-violet-500/10 text-violet-100",
  },
  fuchsia: {
    solid: "text-fuchsia-500 border-fuchsia-500/35 bg-fuchsia-500/15 hover:bg-fuchsia-500/20",
    ghost: "text-fuchsia-500 hover:bg-fuchsia-500/10",
    panel: "border-fuchsia-500/35 bg-fuchsia-500/10 text-fuchsia-100",
  },
  teal: {
    solid: "text-teal-600 border-teal-600/35 bg-teal-600/15 hover:bg-teal-600/20",
    ghost: "text-teal-600 hover:bg-teal-600/10",
    panel: "border-teal-500/35 bg-teal-500/10 text-teal-100",
  },
  indigo: {
    solid: "text-indigo-500 border-indigo-500/35 bg-indigo-500/15 hover:bg-indigo-500/20",
    ghost: "text-indigo-500 hover:bg-indigo-500/10",
    panel: "border-indigo-500/35 bg-indigo-500/10 text-indigo-100",
  },
  cyan: {
    solid: "text-cyan-600 border-cyan-600/35 bg-cyan-600/15 hover:bg-cyan-600/20",
    ghost: "text-cyan-600 hover:bg-cyan-600/10",
    panel: "border-cyan-500/35 bg-cyan-500/10 text-cyan-100",
  },
  green: {
    solid: "text-green-600 border-green-600/35 bg-green-600/15 hover:bg-green-600/20",
    ghost: "text-green-600 hover:bg-green-600/10",
    panel: "border-green-500/35 bg-green-500/10 text-green-100",
  },
  lime: {
    solid: "text-lime-600 border-lime-600/35 bg-lime-600/15 hover:bg-lime-600/20",
    ghost: "text-lime-600 hover:bg-lime-600/10",
    panel: "border-lime-500/35 bg-lime-500/10 text-lime-100",
  },
  orange: {
    solid: "text-orange-600 border-orange-600/35 bg-orange-600/15 hover:bg-orange-600/20",
    ghost: "text-orange-600 hover:bg-orange-600/10",
    panel: "border-orange-500/35 bg-orange-500/10 text-orange-100",
  },
  rose: {
    solid: "text-rose-600 border-rose-600/35 bg-rose-600/15 hover:bg-rose-600/20",
    ghost: "text-rose-600 hover:bg-rose-600/10",
    panel: "border-rose-500/35 bg-rose-500/10 text-rose-100",
  },
  emerald: {
    solid: "text-emerald-600 border-emerald-600/35 bg-emerald-600/15 hover:bg-emerald-600/20",
    ghost: "text-emerald-600 hover:bg-emerald-600/10",
    panel: "border-emerald-500/35 bg-emerald-500/10 text-emerald-100",
  },
  amber: {
    solid: "text-amber-600 border-amber-600/35 bg-amber-600/15 hover:bg-amber-600/20",
    ghost: "text-amber-600 hover:bg-amber-600/10",
    panel: "border-amber-500/35 bg-amber-500/10 text-amber-100",
  },
  blue: {
    solid: "text-blue-600 border-blue-600/35 bg-blue-600/15 hover:bg-blue-600/20",
    ghost: "text-blue-600 hover:bg-blue-600/10",
    panel: "border-blue-500/35 bg-blue-500/10 text-blue-100",
  },
  slate: {
    solid: "text-slate-600 border-slate-600/35 bg-slate-600/15 hover:bg-slate-600/20",
    ghost: "text-slate-600 hover:bg-slate-600/10",
    panel: "border-slate-500/35 bg-slate-500/10 text-slate-100",
  },
  "cyan-dark": {
    solid: "text-cyan-700 border-cyan-700/35 bg-cyan-700/15 hover:bg-cyan-700/20",
    ghost: "text-cyan-700 hover:bg-cyan-700/10",
    panel: "border-cyan-600/35 bg-cyan-600/10 text-cyan-100",
  },
  "emerald-dark": {
    solid: "text-emerald-700 border-emerald-700/35 bg-emerald-700/15 hover:bg-emerald-700/20",
    ghost: "text-emerald-700 hover:bg-emerald-700/10",
    panel: "border-emerald-600/35 bg-emerald-600/10 text-emerald-100",
  },
  "orange-dark": {
    solid: "text-orange-700 border-orange-700/35 bg-orange-700/15 hover:bg-orange-700/20",
    ghost: "text-orange-700 hover:bg-orange-700/10",
    panel: "border-orange-600/35 bg-orange-600/10 text-orange-100",
  },
  "indigo-dark": {
    solid: "text-indigo-700 border-indigo-700/35 bg-indigo-700/15 hover:bg-indigo-700/20",
    ghost: "text-indigo-700 hover:bg-indigo-700/10",
    panel: "border-indigo-600/35 bg-indigo-600/10 text-indigo-100",
  },
  "blue-bright": {
    solid: "text-blue-500 border-blue-500/35 bg-blue-500/15 hover:bg-blue-500/20",
    ghost: "text-blue-500 hover:bg-blue-500/10",
    panel: "border-blue-500/35 bg-blue-500/10 text-blue-100",
  },
  "sky-dark": {
    solid: "text-sky-700 border-sky-700/35 bg-sky-700/15 hover:bg-sky-700/20",
    ghost: "text-sky-700 hover:bg-sky-700/10",
    panel: "border-sky-600/35 bg-sky-600/10 text-sky-100",
  },
  "yellow-dark": {
    solid: "text-yellow-600 border-yellow-600/35 bg-yellow-600/15 hover:bg-yellow-600/20",
    ghost: "text-yellow-600 hover:bg-yellow-600/10",
    panel: "border-yellow-500/35 bg-yellow-500/10 text-yellow-100",
  },
  "slate-mid": {
    solid: "text-slate-500 border-slate-500/35 bg-slate-500/15 hover:bg-slate-500/20",
    ghost: "text-slate-500 hover:bg-slate-500/10",
    panel: "border-slate-400/35 bg-slate-400/10 text-slate-100",
  },
};

export function Tag({
  tag,
  className,
  compact = false,
  iconOnly = false,
  borderless = false,
}: TagProps) {
  const isCompact = compact || iconOnly;
  const palette = TAG_COLOR_CLASSES[tag.color] ?? TAG_COLOR_CLASSES.slate;

  return (
    <HoverCard openDelay={120} closeDelay={90}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          aria-label={`${tag.label}: ${tag.description}`}
          className={cn(
            "inline-flex items-center rounded-full font-medium leading-none backdrop-blur transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
            iconOnly
              ? compact
                ? "h-5 w-5 justify-center text-[10px]"
                : "h-6 w-6 justify-center text-[11px]"
              : isCompact
              ? "h-5 gap-1 px-2 py-0.5 text-[10px]"
              : "h-6 gap-1.5 px-2 py-0.5 text-[11px]",
            borderless
              ? `border-0 bg-transparent hover:-translate-y-px ${palette.ghost}`
              : `border hover:-translate-y-px ${palette.solid}`,
            className
          )}
        >
          <Icon icon={tag.icon} className={isCompact ? "h-3 w-3" : "h-3.5 w-3.5"} />
          {!iconOnly ? <span>{tag.label}</span> : null}
        </button>
      </HoverCardTrigger>
      <HoverCardContent
        align="center"
        side="top"
        className={cn(
          "max-w-xs rounded-2xl border px-3 py-2 text-xs leading-relaxed shadow-xl backdrop-blur",
          palette.panel
        )}
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 font-semibold">
            <Icon icon={tag.icon} className="h-3.5 w-3.5" />
            <span>{tag.label}</span>
          </div>
          <p className="text-[11px] leading-relaxed text-foreground/80">
            {tag.description}
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default Tag;
