import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export type ReferenceRecord = {
  id: string;
  authors: string;
  year?: string;
  title: string;
  source?: string;
  note?: string;
  href?: string;
  tag?: string;
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
            "inline-flex items-center rounded-full border border-border/40 bg-background/20 px-2 py-0.5 text-[11px] leading-none text-foreground/80 backdrop-blur hover:bg-background/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
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
        className="w-[360px] rounded-2xl border border-border/40 bg-background/95 p-4 shadow-xl backdrop-blur"
      >
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-foreground/90">
                {r.authors}
                {r.year ? (
                  <span className="text-muted-foreground"> ({r.year})</span>
                ) : null}
              </div>

              <div className="mt-1 text-sm leading-relaxed text-foreground/85">
                {r.title}
              </div>

              {r.source && (
                <div className="mt-1 text-xs text-muted-foreground">
                  {r.source}
                </div>
              )}
            </div>

            {r.tag && (
              <div className="shrink-0 rounded-full border border-border/40 bg-background/60 px-2 py-0.5 text-[11px] text-muted-foreground">
                {r.tag}
              </div>
            )}
          </div>

          {r.note && (
            <div className="text-xs leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground/70">
                Supports:
              </span>{" "}
              {r.note}
            </div>
          )}

          {(r.correspondingAuthor || r.correspondingAuthorEmail) && (
            <div className="text-xs leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground/70">
                Corresponding author:
              </span>{" "}
              {r.correspondingAuthor ?? "Not listed"}
              {r.correspondingAuthorEmail ? (
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
              ) : null}
            </div>
          )}

          {(r.doi || r.pmid) && (
            <div className="text-xs leading-relaxed text-muted-foreground">
              {r.doi ? (
                <div>
                  <span className="font-medium text-foreground/70">DOI:</span>{" "}
                  {r.doi}
                </div>
              ) : null}
              {r.pmid ? (
                <div>
                  <span className="font-medium text-foreground/70">PMID:</span>{" "}
                  {r.pmid}
                </div>
              ) : null}
            </div>
          )}

          {r.affiliations && r.affiliations.length > 0 && (
            <div className="space-y-1 text-xs leading-relaxed text-muted-foreground">
              <div className="font-medium text-foreground/70">Affiliations:</div>
              <ul className="list-disc pl-4 space-y-1">
                {r.affiliations.map((affiliation) => (
                  <li key={affiliation}>{affiliation}</li>
                ))}
              </ul>
            </div>
          )}

          {r.href && (
            <div className="pt-1">
              <a
                href={r.href}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-accent underline underline-offset-4"
              >
                Open source
              </a>
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
