import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Tag } from "@/components/ui/tag";
import type { DocTag } from "@/lib/records/tag-records";
import { Icon } from "@iconify/react";
export type ReferenceRecord = {
  id: string;
  authors: string;
  year?: string;
  title: string;
  source?: string;
  note?: string;
  href?: string;
  tags?: readonly DocTag[];
  metadata?: Record<string, string>;
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
  align = "center",
  side = "bottom",
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
  const domain = r.href ? new URL(r.href).hostname : '';
  const faviconUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64` : null;

  return (
    <HoverCard openDelay={openDelay} closeDelay={closeDelay}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          className={
            className ??
            "inline-flex items-center rounded-full border border-border/40 bg-background/20 pl-1.5 pr-3 py-1 text-[12px] font-medium leading-none text-foreground/80 backdrop-blur transition-all duration-150 hover:-translate-y-px hover:scale-[1.02] hover:bg-background/30 hover:text-foreground active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 gap-2 shadow-sm"
          }
          aria-label={`Reference: ${r.authors}${r.year ? ` (${r.year})` : ""}`}
        >
          {faviconUrl && (
            <img src={faviconUrl} alt="" className="w-4 h-4 rounded-sm grayscale-[0.2] group-hover:grayscale-0 shadow-sm" />
          )}
          <span className="truncate max-w-[150px]">{shortAuthor}</span>
          {r.year ? (
            <span className="text-muted-foreground ml-0.5">{r.year}</span>
          ) : null}
        </button>
      </HoverCardTrigger>

      <HoverCardContent
        align={align}
        side={side}
        className="max-w-[450px] bg-slate-950/95 pb-4 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl z-50 overflow-hidden"
      >
        <div className="flex items-start justify-between gap-3 p-5 border-b border-white/10 bg-white/5">
          {/* LEFT: TITLE */}
          <div className="flex items-center gap-4 min-w-0 flex-1">
            {faviconUrl && (
              <img src={faviconUrl} className="w-10 h-10 rounded-xl shadow-inner bg-white/10 p-1.5" />
            )}
            <div className="min-w-0 flex-1">
              <div className="text-base font-bold leading-tight text-white uppercase tracking-tight">
                {r.title}
              </div>
            </div>
          </div>

          {/* RIGHT: TAGS + LINK ICON */}
          <div className="flex shrink-0 items-center gap-2">
            {r.tags?.map((tag) => (
              <Tag key={tag.id} tag={tag} compact iconOnly borderless className="scale-110" />
            ))}

            {r.href && (
              <a
                href={r.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center hover:text-primary justify-center rounded-lg p-1.5 bg-white/5 border border-white/10 transition"
              >
                <Icon icon="mdi:open-in-new" className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* MAIN: LEFT TEXT + RIGHT IMAGE */}
        <div className="flex flex-col md:flex-row gap-0 items-stretch">
          {/* LEFT CONTENT */}
          <div className="flex-1 p-5 space-y-6">
            {/* COMPANY INFO / NOTE */}
            {r.note && (
              <div className="text-xs text-white/90 bg-white/5 p-4 rounded-xl border border-white/10 leading-relaxed italic shadow-inner">
                "{r.note}"
              </div>
            )}

            {r.metadata && Object.keys(r.metadata).length > 0 && (
              <div className="space-y-3">
                <span className="font-bold text-[10px] uppercase tracking-[0.2em] text-white/40 block">
                  Qualification Metadata
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(r.metadata).map(([key, value]) => (
                    <div key={key} className="flex flex-col gap-0.5 rounded-lg border border-white/10 bg-white/5 p-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                        {key}
                      </span>
                      <span className="text-[11px] font-medium leading-tight text-white/90">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PAIN POINTS */}
            {r.painPoints && r.painPoints.length > 0 && (
              <div className="space-y-3">
                <span className="font-bold text-[10px] uppercase tracking-[0.2em] text-white/40 block">
                  Core Pain Points
                </span>
                <div className="flex flex-wrap gap-2">
                  {r.painPoints.map((point) => (
                    <span 
                      key={point} 
                      className="px-3 py-1 rounded-md bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-bold uppercase tracking-wider"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* SELLING STRATEGY */}
            {r.sellingStrategy && (
              <div className="space-y-3">
                <span className="font-bold text-[10px] uppercase tracking-[0.2em] text-primary/40 block">
                  Sales Playbook
                </span>
                <div className="rounded-xl bg-primary/10 p-4 border border-primary/20 text-primary/90 text-xs italic leading-relaxed shadow-inner">
                  {r.sellingStrategy}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT IMAGE */}
          {r.photo?.src && (
            <div className="w-full md:w-48 shrink-0 h-64 md:h-auto overflow-hidden border-t md:border-t-0 md:border-l border-white/10">
              <img
                src={r.photo.src}
                alt={r.photo.alt ?? `${r.title} image`}
                className="h-full w-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
