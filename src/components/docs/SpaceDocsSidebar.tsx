import { useMemo } from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";
import { Hierarchy, type TreeNode } from "@/components/ui/hierarchy";
import { DOC_SPACES } from "@/lib/records/spaces";

type NavMeta = {
  href: string;
};

function buildSidebarNodes(currentPath: string): TreeNode[] {
  return [
    {
      id: "home",
      label: (
        <Link to="/" className="block w-full truncate">
          Home
        </Link>
      ),
      meta: { href: "/" } satisfies NavMeta,
    },
    ...DOC_SPACES.map((space) => {
      const isActiveSpace =
        currentPath === space.href || space.docs.some((doc) => currentPath === doc.href);

      return {
        id: space.id,
        label: (
          <span className="flex min-w-0 items-center gap-2">
            {space.cardIcon ? <Icon icon={space.cardIcon} className="h-4 w-4 shrink-0" /> : null}
            <span className="truncate">{space.title}</span>
            <span className="shrink-0 text-xs text-muted-foreground">({space.docs.length})</span>
          </span>
        ),
        meta: { href: space.href } satisfies NavMeta,
        defaultExpanded: isActiveSpace,
        actions: (
          <Link
            to={space.href}
            aria-label={`Open ${space.title}`}
            className="inline-flex h-6 items-center justify-center rounded-md px-2 text-xs font-medium text-muted-foreground transition hover:text-primary"
          >
            Open
          </Link>
        ),
        children: space.docs.map(
          (doc) =>
            ({
              id: `${space.id}/${doc.id}`,
              label: (
                <Link to={doc.href} className="block w-full truncate">
                  {doc.cardTitle}
                </Link>
              ),
              icon: doc.cardIcon ? <Icon icon={doc.cardIcon} className="h-4 w-4" /> : undefined,
              meta: { href: doc.href } satisfies NavMeta,
            }) satisfies TreeNode
        ),
      } satisfies TreeNode;
    }),
  ];
}

export function SpaceDocsSidebar() {
  const location = useLocation();
  const nodes = useMemo(() => buildSidebarNodes(location.pathname), [location.pathname]);
  const selectedId = useMemo(() => {
    if (location.pathname === "/") return "home";

    for (const space of DOC_SPACES) {
      if (location.pathname === space.href) return space.id;

      for (const doc of space.docs) {
        if (location.pathname === doc.href) return `${space.id}/${doc.id}`;
      }
    }

    return undefined;
  }, [location.pathname]);

  return (
    <div className="space-y-5 p-4">
      <div className="space-y-1">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          Documentation Tree
        </p>
        <p className="text-sm text-muted-foreground">
          Browse spaces, then drill into the docs inside each one.
        </p>
      </div>

      <Hierarchy
        nodes={nodes}
        selectedId={selectedId}
        className="space-y-1 pl-2"
      />
    </div>
  );
}
