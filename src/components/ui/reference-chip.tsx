import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Tag } from "@/components/ui/tag";
import type { DocTag } from "@/lib/records/tag-records";
import { Icon } from "@iconify/react";
import React from "react";

export type ReferenceRecord = {
  id: string;
  authors: string;
  year?: string;
  title: string;
  source?: string;
  note?: string;
  href?: string;
  tags?: readonly DocTag[];
  photo?: {
    src: string;
    alt?: string;
  };
  correspondingAuthor?: string;
  correspondingAuthorEmail?: string;
  affiliations?: readonly string[];
  doi?: string;
  pmid?: string;
  painPoints?: readonly string[];
  sellingStrategy?: string;
};

export type ReferenceMap = Record<string, ReferenceRecord>;

function getShortAuthor(authors: string) {
  // Assumes format: "Last, F. M." or just "Company Name"
  return authors.split(",")[0].trim();
}

export function ReferenceChip<TMap extends ReferenceMap>({
  refs,
  id,
  openDelay = 120,
  closeDelay = 80,
  align = "end",
  side = "top",
  className,
}: {
  refs: TMap;
  id: keyof TMap;
  openDelay?: number;
  closeDelay?: number;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}) {
  const r = refs[String(id)];
  if (!r) return null;

  const shortAuthor = getShortAuthor(r.authors);

  return (
    <HoverCard openDelay={openDelay} closeDelay={closeDelay}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          className={
            className ??
            "inline-flex items-center rounded-full border border-border/40 bg-background/20 px-2 py-0.5 text-[11px] leading-none text-foreground/80 backdrop-blur transition-all duration-150 hover:-translate-y-px hover:scale-[1.02] hover:bg-background/30 hover:text-foreground active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          }
          aria-label={`Reference: ${r.authors}${r.year ? ` (${r.year})` : ""}`}
        >
          {shortAuthor}
          {r.year ? (
            <span className="ml-1 text-muted-foreground">{r.year}</span>
          ) : null}
        </button>
      </HoverCardTrigger>

      <HoverCardContent
        align={align}
        side={side}
        className="max-w-[800px] bg-background/80 pb-4 rounded-2xl border border-border/40 shadow-xl backdrop-blur-xl z-50"
      >
        <div className="flex items-start justify-between gap-3 p-4 border-b">
          {/* LEFT: TITLE */}
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold leading-relaxed text-foreground break-words uppercase tracking-tight">
              {r.title}
            </div>
          </div>

          {/* RIGHT: TAGS + LINK ICON */}
          <div className="flex shrink-0 items-center gap-1.5">
            {r.tags?.map((tag) => (
              <Tag key={tag.id} tag={tag} compact iconOnly borderless />
            ))}

            {r.href && (
              <a
                href={r.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center hover:text-primary justify-center rounded-md p-1 transition"
              >
                <Icon icon="mdi:open-in-new" className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* MAIN: LEFT TEXT + RIGHT IMAGE */}
        <div className="flex gap-4 items-stretch">
          {/* LEFT CONTENT */}
          <div className="flex-1 p-4 space-y-4 text-xs text-muted-foreground leading-relaxed">
            {/* COMPANY INFO / NOTE */}
            {r.note && (
              <div className="text-sm text-foreground/90 bg-white/5 p-3 rounded-lg border border-white/5">
                {r.note}
              </div>
            )}

            {/* PAIN POINTS */}
            {r.painPoints && r.painPoints.length > 0 && (
              <div className="space-y-2">
                <span className="font-bold text-[10px] uppercase tracking-widest text-foreground/50 block">
                  Core Pain Points
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {r.painPoints.map((point) => (
                    <span 
                      key={point} 
                      className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-semibold"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* SELLING STRATEGY */}
            {r.sellingStrategy && (
              <div className="space-y-2">
                <span className="font-bold text-[10px] uppercase tracking-widest text-primary/50 block">
                  Sales Playbook
                </span>
                <div className="rounded-lg bg-primary/10 p-3 border border-primary/20 text-foreground italic leading-normal">
                  {r.sellingStrategy}
                </div>
              </div>
            )}

            {/* TECHNICAL REFS (DOI/PMID) - ONLY IF THEY EXIST */}
            {(r.doi || r.pmid) && (
              <div className="pt-2 border-t border-border/40 opacity-60">
                {r.doi && <div><span className="font-medium">DOI:</span> {r.doi}</div>}
                {r.pmid && <div><span className="font-medium">PMID:</span> {r.pmid}</div>}
              </div>
            )}
          </div>

          {/* RIGHT IMAGE - Flush to edges */}
          {r.photo?.src && (
            <div className="w-64 shrink-0 overflow-hidden border-l border-border/40">
              <img
                src={r.photo.src}
                alt={r.photo.alt ?? `${r.title} image`}
                className="h-full w-full object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-500"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
