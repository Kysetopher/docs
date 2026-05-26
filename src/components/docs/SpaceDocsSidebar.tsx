import { useMemo } from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";
import { Hierarchy, type TreeNode } from "@/components/ui/hierarchy";
import { DOC_SPACES } from "@/lib/records/spaces";

function buildSidebarNodes(currentPath: string): TreeNode[] {
  return [
    {
      id: "home",
      label: (
        <Link to="/" className="block w-full truncate">
          Home
        </Link>
      ),
    },
    ...DOC_SPACES.map((space) => {
      const isActiveSpace =
        currentPath === space.href || space.docs.some((doc) => currentPath === doc.href);

      return {
        id: space.id,
        label: (
          <Link to={space.href} className="flex min-w-0 items-center gap-2 truncate text-left">
            {space.cardIcon ? <Icon icon={space.cardIcon} className="h-4 w-4 shrink-0" /> : null}
            <span className="truncate">{space.title}</span>
            <span className="shrink-0 text-xs text-muted-foreground">({space.docs.length})</span>
          </Link>
        ),
        expanded: isActiveSpace,
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
    <Hierarchy
      nodes={nodes}
      selectedId={selectedId}
      className="space-y-1 pl-2"
    />
  );
}
