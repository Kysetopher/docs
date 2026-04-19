import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import type { DocTag } from "@/lib/records/tag-records";
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

export function Tag({
  tag,
  className,
  compact = false,
  iconOnly = false,
  borderless = false,
}: TagProps) {
  return (
    <HoverCard openDelay={120} closeDelay={90}>
      <HoverCardTrigger asChild>
        <span
          className={cn(
            "inline-flex items-center rounded-full font-medium",
            iconOnly
              ? compact
                ? "h-5 w-5 justify-center"
                : "h-6 w-6 justify-center"
              : compact
              ? "h-5 gap-1 px-2 py-0.5 text-[10px]"
              : "h-6 gap-1.5 px-2 py-0.5 text-xs",
            borderless ? "border-0 bg-transparent px-0 py-0" : "border",
            className
          )}
          style={{
            borderColor: borderless ? "transparent" : `${tag.color}55`,
            color: tag.color,
            backgroundColor: borderless ? "transparent" : `${tag.color}1A`,
          }}
        >
          <Icon icon={tag.icon} className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} />
          {!iconOnly ? <span>{tag.label}</span> : null}
        </span>
      </HoverCardTrigger>
      <HoverCardContent
        align="center"
        side="top"
        className="max-w-xs rounded-md border bg-popover px-3 py-2 text-xs leading-relaxed text-popover-foreground shadow-md"
      >
        {tag.description}
      </HoverCardContent>
    </HoverCard>
  );
}

export default Tag;
