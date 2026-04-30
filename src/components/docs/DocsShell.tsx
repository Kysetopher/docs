import { type ReactNode } from "react";
import CollapsibleSidebarLayout from "@/components/core/CollapsibleSidebarLayout";
import { SpaceDocsSidebar } from "@/components/docs/SpaceDocsSidebar";

type DocsShellProps = {
  children: ReactNode;
};

export function DocsShell({ children }: DocsShellProps) {
  return (
    <CollapsibleSidebarLayout sidebar={<SpaceDocsSidebar />}>
      {children}
    </CollapsibleSidebarLayout>
  );
}
