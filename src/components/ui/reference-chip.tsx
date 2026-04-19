import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Tag } from "@/components/ui/tag";
import type { DocTag } from "@/lib/records/tag-records";

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
};

export type ReferenceMap = Record<string, ReferenceRecord>;

function getShortAuthor(authors: string) {
  // Assumes format: "Last, F. M."
  return authors.split(",")[0].trim();
}

export function ReferenceChip<TMap extends ReferenceMap>({
  refs,
  id,
  openDelay = 120,
  closeDelay = 80,
  align = "start",
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
        className="max-w-[800px] bg-accent/60 rounded-2xl border border-border/40 shadow-xl backdrop-blur"
      >

          <div className="flex p-4 border-b justify-between">
            <div className="space-y-1">


              <div className="text-sm leading-relaxed text-foreground/85">
                {r.title}
              </div>

             
            </div>

            {r.tags && r.tags.length > 0 && (
              <div className="flex shrink-0 flex-wrap items-start justify-end gap-1.5">
                {r.tags.map((tag) => (
                  <Tag key={tag.id} tag={tag} compact iconOnly borderless />
                ))}
              </div>
            )}
          </div>

          {/* MAIN: LEFT TEXT + RIGHT IMAGE */}
          <div className="flex gap-4 items-start">
            {/* LEFT */}
            <div className="flex-1 px-4  space-y-2 text-xs text-muted-foreground leading-relaxed">
              <div className="text-sm font-semibold text-foreground/90">
                {r.authors}
                {r.year && (
                  <span className="text-muted-foreground"> ({r.year})</span>
                )}
              </div>
               {r.source && (
                <div className="text-xs text-muted-foreground">
                  {r.source}
                </div>
              )}
              {r.note && (
                <div>
                  <span className="font-medium text-foreground/70">
                    Supports:
                  </span>{" "}
                  {r.note}
                </div>
              )}

              {(r.correspondingAuthor || r.correspondingAuthorEmail) && (
                <div>
                  <span className="font-medium text-foreground/70">
                    Corresponding author:
                  </span>{" "}
                  {r.correspondingAuthor ?? "Not listed"}
                  {r.correspondingAuthorEmail && (
                    <>
                      {" "}
                      (
                      <a
                        href={`mailto:${r.correspondingAuthorEmail}`}
                        className="text-accent underline underline-offset-4"
                      >
                        {r.correspondingAuthorEmail}
                      </a>
                      )
                    </>
                  )}
                </div>
              )}

              {(r.doi || r.pmid) && (
                <div>
                  {r.doi && (
                    <div>
                      <span className="font-medium text-foreground/70">DOI:</span>{" "}
                      {r.doi}
                    </div>
                  )}
                  {r.pmid && (
                    <div>
                      <span className="font-medium text-foreground/70">PMID:</span>{" "}
                      {r.pmid}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* RIGHT IMAGE */}
            {r.photo?.src && (
              <div className="w-60 shrink-0 overflow-hidden">
                <img
                  src={r.photo.src}
                  alt={r.photo.alt ?? `${r.title} image`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
          </div>

          {/* BOTTOM: AFFILIATIONS + LINK */}
          {(r.affiliations?.length || r.href) && (
            <div className="space-y-2 text-xs text-muted-foreground">

              {r.affiliations && r.affiliations.length > 0 && (
                <div>
                  <div className="font-medium text-foreground/70">
                    Affiliations:
                  </div>
                  <ul className="list-disc pl-4 space-y-1">
                    {r.affiliations.map((affiliation) => (
                      <li key={affiliation}>{affiliation}</li>
                    ))}
                  </ul>
                </div>
              )}

              {r.href && (
                <div>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent underline underline-offset-4"
                  >
                    Open source
                  </a>
                </div>
              )}
            </div>
          )}
      </HoverCardContent>
    </HoverCard>
  );
}
