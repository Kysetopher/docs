type GraphPlaceholderSectionProps = {
  title: string;
  description: string;
  placeholderId: string;
};

export function GraphPlaceholderSection({
  title,
  description,
  placeholderId,
}: GraphPlaceholderSectionProps) {
  return (
    <div className="space-y-3 rounded-2xl border border-dashed border-border/60 bg-muted/20 p-4">
      <div>
        <p className="text-sm font-semibold text-foreground/90">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="rounded-xl border border-border/60 bg-background/60 p-4">
        <p className="text-xs font-medium text-foreground/80">
          Placeholder: {placeholderId}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Replace this block with your final chart, timeline, or visual component.
        </p>
      </div>
    </div>
  );
}

export default GraphPlaceholderSection;

