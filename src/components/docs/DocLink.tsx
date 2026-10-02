import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { getDocRecord } from "@/lib/records/spaces";

type DocLinkProps = {
  /** Space the target doc lives in. */
  spaceId: string;
  /** Target doc's id within that space. */
  docId: string;
  /** Optional section id inside the target doc — the link scrolls to it. */
  sectionId?: string;
  /** Overrides the target doc's card title. */
  label?: string;
  /** Overrides the target doc's card description. Pass null to hide it. */
  description?: string | null;
  /** "card" is a block reference; "inline" sits inside a sentence. */
  variant?: "card" | "inline";
  className?: string;
};

/**
 * A reference to another doc, resolved from the space registry so the title,
 * icon and URL always match the doc itself — rename or move a doc and every
 * reference follows. A target that doesn't exist renders a red "missing doc"
 * label instead, so a broken reference is obvious while authoring.
 */
export function DocLink({
  spaceId,
  docId,
  sectionId,
  label,
  description,
  variant = "card",
  className = "",
}: DocLinkProps) {
  const doc = getDocRecord(spaceId, docId);

  if (!doc) {
    return (
      <span className="rounded border border-destructive/40 px-1.5 py-0.5 font-mono text-xs text-destructive">
        missing doc: {spaceId}/{docId}
      </span>
    );
  }

  const section = sectionId ? findSection(doc.sections, sectionId) : undefined;
  const href = sectionId ? `${doc.href}#${sectionId}` : doc.href;
  const title = label ?? (section ? `${doc.cardTitle} → ${section.title}` : doc.cardTitle);
  const body = description === null ? null : description ?? doc.cardDescription;

  if (variant === "inline") {
    return (
      <Link
        to={href}
        className={`inline-flex items-baseline gap-1 font-medium text-primary underline-offset-2 hover:underline ${className}`}
      >
        {doc.cardIcon ? <Icon icon={doc.cardIcon} className="h-3.5 w-3.5 self-center" aria-hidden /> : null}
        {title}
      </Link>
    );
  }

  return (
    <Link
      to={href}
      className={`group flex items-center gap-4 rounded-2xl border border-border/60 bg-background/60 p-4 shadow-sm transition hover:border-primary/50 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${className}`}
    >
      {doc.cardIcon ? (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-muted/30 text-muted-foreground transition group-hover:text-primary">
          <Icon icon={doc.cardIcon} className="h-5 w-5" />
        </div>
      ) : null}
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">See also</p>
        <p className="truncate font-semibold text-foreground transition group-hover:text-primary">{title}</p>
        {body ? <p className="mt-0.5 text-sm leading-6 text-muted-foreground">{body}</p> : null}
      </div>
      <Icon
        icon="mdi:arrow-right"
        className="h-5 w-5 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary"
      />
    </Link>
  );
}

type SectionLike = { id: string; title: string; children?: SectionLike[] };

function findSection(sections: SectionLike[], id: string): SectionLike | undefined {
  for (const section of sections) {
    if (section.id === id) return section;
    const nested = section.children ? findSection(section.children, id) : undefined;
    if (nested) return nested;
  }
  return undefined;
}
