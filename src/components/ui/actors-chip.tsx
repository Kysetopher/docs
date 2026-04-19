import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Tag } from "@/components/ui/tag";
import type { ActorMap } from "@/lib/records/ai-psychosis-actors-records";

function shortName(name: string) {
  return name.length > 24 ? `${name.slice(0, 24)}...` : name;
}

function formatLayer(layer: string) {
  return layer
    .split("-")
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" / ");
}

export function ActorsChip<TMap extends ActorMap>({
  actors,
  id,
  openDelay = 120,
  closeDelay = 80,
  align = "start",
  side = "top",
  className,
}: {
  actors: TMap;
  id: keyof TMap;
  openDelay?: number;
  closeDelay?: number;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}) {
  const actor = actors[String(id)];
  if (!actor) return null;

  return (
    <HoverCard openDelay={openDelay} closeDelay={closeDelay}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          className={
            className ??
            "inline-flex items-center rounded-full border border-border/40 bg-background/20 px-2 py-0.5 text-[11px] leading-none text-foreground/80 backdrop-blur transition-all duration-150 hover:-translate-y-px hover:scale-[1.02] hover:bg-background/30 hover:text-foreground active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          }
          aria-label={`Actor: ${actor.name}`}
        >
          {shortName(actor.name)}
        </button>
      </HoverCardTrigger>

      <HoverCardContent
        align={align}
        side={side}
        className="max-w-[800px] rounded-2xl border border-border/40 bg-background/60 shadow-xl backdrop-blur"
      >
        <div className="space-y-3 p-4 text-xs text-muted-foreground">
          <div className="flex items-start justify-between gap-3 border-b border-border/40 pb-3">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground/90">{actor.name}</p>
              <p className="text-xs uppercase tracking-wide text-foreground/70">{formatLayer(actor.layer)}</p>
              {actor.organization ? (
                <p className="text-xs text-muted-foreground">{actor.organization}</p>
              ) : null}
            </div>
            {actor.tags && actor.tags.length > 0 ? (
              <div className="flex shrink-0 flex-wrap items-start justify-end gap-1.5">
                {actor.tags.map((tag) => (
                  <Tag key={tag.id} tag={tag} compact iconOnly borderless />
                ))}
              </div>
            ) : null}
          </div>

          {actor.role ? (
            <p>
              <span className="font-medium text-foreground/70">Role:</span> {actor.role}
            </p>
          ) : null}
          <p>
            <span className="font-medium text-foreground/70">Leverage:</span> {actor.leverage}
          </p>
          <p>
            <span className="font-medium text-foreground/70">Sees:</span> {actor.sees}
          </p>
          <p>
            <span className="font-medium text-foreground/70">Misses:</span> {actor.misses}
          </p>
          {actor.opportunity ? (
            <p>
              <span className="font-medium text-foreground/70">Opportunity:</span> {actor.opportunity}
            </p>
          ) : null}
          {actor.href ? (
            <a
              href={actor.href}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-accent underline underline-offset-4"
            >
              Open website
            </a>
          ) : null}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default ActorsChip;
