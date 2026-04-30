import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/ui/tag";
import type { DocTag } from "@/lib/records/tag-records";

export type ReferenceRecord = {
  id: string;
  title: string;
  description?: string;
  href?: string;
  tags?: readonly DocTag[];
  image?: {
    src: string;
    alt?: string;
  };
  subtitle?: string;
  metadata?: Record<string, string>;
};

export function ReferenceCard({
  record,
  className,
}: {
  record: ReferenceRecord;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-background/40 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-background/60 hover:shadow-xl",
        className
      )}
    >
      {/* IMAGE SECTION */}
      {record.image && (
        <div className="aspect-[16/9] w-full overflow-hidden border-b border-border/20 bg-muted/20">
          <img
            src={record.image.src}
            alt={record.image.alt ?? record.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      {/* CONTENT SECTION */}
      <div className="flex flex-1 flex-col p-4">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
              {record.title}
            </h3>
            {record.subtitle && (
              <p className="truncate text-xs font-medium text-muted-foreground/80">
                {record.subtitle}
              </p>
            )}
          </div>
          {record.href && (
            <a
              href={record.href}
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-background/50 text-muted-foreground transition hover:bg-primary/10 hover:text-primary"
              aria-label={`Visit ${record.title}`}
            >
              <Icon icon="mdi:open-in-new" className="h-4 w-4" />
            </a>
          )}
        </div>

        {/* DESCRIPTION */}
        {record.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {record.description}
          </p>
        )}

        {/* TAGS & METADATA */}
        <div className="mt-auto pt-4 flex flex-col gap-3">
          {record.metadata && Object.keys(record.metadata).length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(record.metadata).map(([key, value]) => (
                <div key={key} className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">
                    {key}
                  </span>
                  <span className="truncate text-[11px] font-medium text-foreground/90">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {record.tags && record.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {record.tags.map((tag) => (
                <Tag key={tag.id} tag={tag} compact borderless className="bg-primary/5 text-primary/80 border-primary/10" />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* HOVER ACCENT LINE */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
    </div>
  );
}
