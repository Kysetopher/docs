
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Collapsible } from "./collapsible";

export type TreeNode = {
  id: string;
  label: ReactNode;
  children?: TreeNode[];
  icon?: ReactNode;
  actions?: ReactNode;
  defaultExpanded?: boolean;
  expanded?: boolean;
  disabled?: boolean;
  meta?: Record<string, unknown>;
  selected?: boolean;
};

export type HierarchyProps = {
  nodes: TreeNode[];
  onToggle?: (node: TreeNode, expanded: boolean) => void;
  selectedId?: string;
  selectedIds?: string[];
  className?: string;
  renderLabel?: (node: TreeNode, depth: number) => ReactNode;
  showGuides?: boolean; // kept for API parity
};

export function Hierarchy({
  nodes,
  onToggle,
  selectedId,
  selectedIds,
  className,
  renderLabel,
}: HierarchyProps) {
  const commonRow =
    "flex w-full items-center gap-2 min-h-7 p-0 cursor-pointer " +
    "border border-transparent border-r-0 rounded-md rounded-r-none " +
    "data-[selected=true]:bg-blue-500/10 data-[selected=true]:border-blue-500/30 " +
    "aria-selected:bg-blue-500/10 aria-selected:border aria-selected:border-blue-500/30 " +
    "data-[disabled=true]:opacity-50";

  function BranchNode({
    node,
    depth,
  }: {
    node: TreeNode;
    depth: number;
  }) {
    const [open, setOpen] = useState(node.expanded ?? node.defaultExpanded ?? false);

    useEffect(() => {
      if (typeof node.expanded === "boolean") {
        setOpen(node.expanded);
      }
    }, [node.expanded]);

    const baseLabel = renderLabel ? renderLabel(node, depth) : node.label;
    const fallbackSelected =
      (Array.isArray(selectedIds) && selectedIds.includes(node.id)) ||
      (typeof selectedId === "string" && node.id === selectedId);
    const isSelected = node.selected ?? fallbackSelected;

    return (
      <section
        key={node.id}
        className="space-y-1"
        role="treeitem"
        aria-expanded={open}
        aria-selected={isSelected}
        data-disabled={!!node.disabled}
        data-selected={isSelected}
      >
        <div className={commonRow}>
          <button
            type="button"
            className="inline-flex h-5 w-5 flex-none items-center justify-center"
            aria-label={`Toggle ${typeof node.label === "string" ? node.label : node.id}`}
            aria-expanded={open}
            onClick={() => {
              if (node.disabled) return;
              setOpen((next) => {
                const updated = !next;
                onToggle?.(node, updated);
                return updated;
              });
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current/60" aria-hidden="true" />
          </button>

          <div className="flex min-w-0 grow items-center gap-2">
            {node.icon ? <span className="shrink-0">{node.icon}</span> : null}
            <span className="min-w-0 grow">{baseLabel}</span>
          </div>

          {node.actions && <div className="shrink-0">{node.actions}</div>}
        </div>

        <Collapsible
          open={open}
          onOpenChange={(next) => {
            setOpen(next);
            onToggle?.(node, next);
          }}
          className="w-full"
          triggerClassName="hidden"
          contentClassName="pl-6"
          mountNoAnimate
        >
          {node.children && renderTree(node.children, depth + 1)}
        </Collapsible>
      </section>
    );
  }

  const renderTree = useCallback(
    (list: TreeNode[], depth = 0) => {
      return list.map((node) => {
        const hasChildren = !!(node.children && node.children.length > 0);
        const baseLabel = renderLabel ? renderLabel(node, depth) : node.label;

        const fallbackSelected =
          (Array.isArray(selectedIds) && selectedIds.includes(node.id)) ||
          (typeof selectedId === "string" && node.id === selectedId);

        const isSelected = node.selected ?? fallbackSelected;

        // ---------- LEAF ----------
        if (!hasChildren) {
          return (
            <div
              key={node.id}
              className={commonRow}
              role="treeitem"
              aria-selected={isSelected}
              data-disabled={!!node.disabled}
              data-selected={isSelected}
            >
              {/* Dot placeholder with SAME box as chevron box */}
              <span
                aria-hidden="true"
                className="inline-flex h-5 w-5 flex-none items-center justify-center"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current/60" />
              </span>

              <div className="inline-flex min-w-0 grow items-center gap-2">
                {node.icon ? <span className="shrink-0">{node.icon}</span> : null}
                <span className="truncate">{baseLabel}</span>
              </div>

              {node.actions && <div className="shrink-0">{node.actions}</div>}
            </div>
          );
        }

        // ---------- BRANCH ----------
        return <BranchNode key={node.id} node={node} depth={depth} />;
      });
    },
    [onToggle, renderLabel, selectedId, selectedIds]
  );

  return (
    <div className={["w-full", className].filter(Boolean).join(" ")} role="tree">
      {renderTree(nodes, 0)}
    </div>
  );
}
