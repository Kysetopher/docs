import { useEffect, useMemo, useState } from "react";
import SimpleBar from "simplebar-react";
import { useNavigate } from "react-router-dom";
import CollapsibleSidebarLayout from "@/components/core/CollapsibleSidebarLayout";
import { Hierarchy, type TreeNode } from "@/components/ui/hierarchy";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";
import type { DocTag } from "@/lib/records/tag-records";
import { Collapsible } from "@/components/ui/collapsible";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";
import { type ReactNode } from "react";

export type DocSection = {
  id: string;
  title: string;
  summary?: ReactNode;
  tags?: DocTag[];
  content?: ReactNode;
  children?: DocSection[];
};

function buildHierarchy(sections: DocSection[]): TreeNode[] {
  return sections.map((section) => ({
    id: section.id,
    label: section.title,
    meta: { sectionId: section.id, tags: section.tags },
    children: section.children ? buildHierarchy(section.children) : undefined,
    defaultExpanded: true,
  }));
}

function flattenSections(sections: DocSection[]): DocSection[] {
  return sections.flatMap((section) => [
    section,
    ...(section.children ? flattenSections(section.children) : []),
  ]);
}

function SectionContent({
  section,
  depth = 0,
}: {
  section: DocSection;
  depth?: number;
}) {
  const [open, setOpen] = useState(depth <= 0);

  return (
    <section
      id={section.id}
      className="scroll-mt-24 pb-1"
      aria-labelledby={`${section.id}-title`}
    >
      {/* HEADER ROW (chevron + title + summary + tags) */}
      <header>
        <div className="flex items-start gap-3">
          {/* IMPORTANT: this is JUST the trigger button (so nothing can push the title) */}
          <Button
            type="button"
            variant="ghost"
            className="h-6 w-6 p-0 shrink-0"
            aria-expanded={open}
            aria-controls={`${section.id}-content`}
            aria-label={`Toggle ${section.title}`}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon
              icon="mdi:chevron-down"
              className="h-4 w-4"
              style={{
                transition: "transform 200ms ease",
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </Button>

          {/* Title + summary same line, title never shrinks */}
          <div className="flex min-w-0 flex-1 items-baseline gap-6">
            <p
              id={`${section.id}-title`}
              className="shrink-0 text-sm font-medium uppercase tracking-wide text-primary/80"
            >
              {section.title}
            </p>

            {section.summary ? (
              <div className="min-w-0 flex-1 text-left text-sm text-muted-foreground leading-relaxed">
                {section.summary}
              </div>
            ) : null}
          </div>

          {section.tags && section.tags.length > 0 ? (
          <div className="ml-auto flex shrink-0 flex-wrap items-center justify-end gap-2 pt-0.5">
            {section.tags.map((tag) => (
              <Tag key={tag.id} tag={tag} />
            ))}
          </div>
        ) : null}
        </div>
      </header>

      {/* COLLAPSIBLE CONTENT (animation + hierarchy lives here) */}
      <Collapsible
        id={`${section.id}-content`}
        open={open}
        onOpenChange={setOpen}
        className="pl-9" // line up under text after chevron
        // hide Collapsible's own internal trigger button
        triggerClassName="hidden"
        // keep the content full width (and NOT affecting the header row)
        contentClassName="block"
        mountNoAnimate
      >
        <div className="space-y-4 pt-2">
          {section.content}

          {section.children && section.children.length > 0 ? (
            <div className=" border-l border-border/60 pl-4">
              {section.children.map((child) => (
                <SectionContent
                  key={child.id}
                  section={child}
                  depth={depth + 1}
                />
              ))}
            </div>
          ) : null}
        </div>
      </Collapsible>
    </section>
  );
}

export type DocumentationHeader = {
  title: string;
  description?: string;
  icon?: string;
  bannerImageUrl?: string;
  bannerImageAlt?: string;
};

export type DocumentationPageProps = {
  sections: DocSection[];
  header?: DocumentationHeader;
};

export function DocumentationPage({
  sections,
  header = {
    title: "Product Implementation Planning",
    description:
      "A living reference for the astrology companion app. Update the documentation below to refresh the navigation automatically.",
  },
}: DocumentationPageProps) {
  const [selectedId, setSelectedId] = useState<string>(sections[0]?.id ?? "");
  const navigate = useNavigate();

  const hierarchyNodes = useMemo(() => buildHierarchy(sections), [sections]);
  const allSections = useMemo(() => flattenSections(sections), [sections]);

  useEffect(() => {
    if (allSections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setSelectedId(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    allSections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [allSections]);

  const handleSelect = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setSelectedId(sectionId);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${sectionId}`);
    }
  };

  const renderHierarchyLabel = (node: TreeNode) => {
    const meta = (node.meta as { sectionId?: string; tags?: DocTag[] }) || {};
    const tags = meta.tags ?? [];

    return (
      <button
        type="button"
        onClick={() => meta.sectionId && handleSelect(meta.sectionId)}
        className={cn(
          "group flex w-full items-center gap-2 rounded-sm py-1 text-left text-sm",
          meta.sectionId === selectedId ? "text-primary" : "text-muted-foreground"
        )}
      >
        <span className="truncate">{node.label}</span>
        {tags.length > 0 ? (
          <span className="ml-auto flex shrink-0 items-center gap-1.5">
            {tags.map((tag) => (
              <Tag key={tag.id} tag={tag} compact iconOnly borderless />
            ))}
          </span>
        ) : null}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-muted/40 text-foreground">
      <CollapsibleSidebarLayout
        sidebar={
          <div className="space-y-4 ">
            <Button
              type="button"
              variant="outline"
              className="w-full border-0 border-b justify-start rounded-none"
              onClick={() => navigate("/docs")}
            >
              <Icon icon="mdi:arrow-left" className="mr-2 h-4 w-4" />
              Documentation Site Map
            </Button>

            <Hierarchy
              nodes={hierarchyNodes}
              selectedId={selectedId}
              renderLabel={(node) => renderHierarchyLabel(node)}
              className="space-y-1  pl-4"
            />
          </div>
        }
      >
        <main className="flex h-full flex-col overflow-hidden">
          <SimpleBar className="flex-1" style={{ maxHeight: "100%" }}>
            <div className="mx-auto  space-y-10 px-6 py-10 lg:py-12">
              {header.bannerImageUrl ? (
                <div className="overflow-hidden rounded-2xl border border-border/50 bg-background/30">
                  <img
                    src={header.bannerImageUrl}
                    alt={header.bannerImageAlt ?? `${header.title} banner`}
                    className="h-48 w-full object-cover sm:h-56 lg:h-64"
                    loading="lazy"
                  />
                </div>
              ) : null}

              <header className="space-y-3">
                <div className="flex items-center  gap-2 text-sm font-semibold uppercase tracking-wide "> {header.title}
                  </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                
                </h1>
                {header.description ? (
                  <p className="text-lg text-muted-foreground">
                    {header.description}
                  </p>
                ) : null}
              </header>

              <div className="space-y-2">
                {sections.map((section) => (
                  <SectionContent key={section.id} section={section} />
                ))}
              </div>
            </div>
          </SimpleBar>
        </main>
      </CollapsibleSidebarLayout>
    </div>
  );
}

export default DocumentationPage;
