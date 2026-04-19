import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CollapsibleSidebarLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  sidebarWidth?: string;
}

export default function CollapsibleSidebarLayout({
  sidebar,
  children,
  sidebarWidth = "w-[300px]",
}: CollapsibleSidebarLayoutProps) {
  const [collapsed, setCollapsed] = useState(
    () => (typeof window !== "undefined" ? window.innerWidth < 1024 : true)
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    let previousWidth = window.innerWidth;

    const checkScreenSize = () => {
      const currentWidth = window.innerWidth;
      const wasLargeScreen = previousWidth >= 1024;
      const isLargeScreen = currentWidth >= 1024;

      if (wasLargeScreen !== isLargeScreen) {
        setCollapsed(currentWidth < 1024);
      }
      previousWidth = currentWidth;
    };

    setCollapsed(window.innerWidth < 1024);

    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div className="flex w-full h-screen min-h-0">
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      <div
        className={cn(
          "fixed lg:relative lg:bottom-0 z-10 left-0 lg:flex h-full bg-card text-card-foreground transition-transform duration-300 ease-in-out box-border min-w-0",
          `${sidebarWidth} border-r border-border`,
            collapsed
              ? "-translate-x-full lg:absolute  lg:border-0"
              : "translate-x-0"
        )}
      >
        {!collapsed && (
          <div className="h-full w-full flex flex-col min-h-0 overflow-hidden">
            {sidebar}
          </div>
        )}

        <Button
          variant="ghost"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "absolute h-full right-0 z-10 rounded-none border-0 border-l transition-all",
            collapsed
              ? "p-2 pt-[30px] -right-6 opacity-10 hover:opacity-50 hover:bg-transparent"
              : "w-5 h-full -right-5 opacity-10 p-0 hover:opacity-50 hover:bg-transparent hover:border-l-[2px] border-border"
          )}
        >
          {collapsed ? (
            <Icon icon="mdi:chevron-double-right" className="h-4 w-4" />
          ) : (
            <Icon icon="mdi:chevron-double-left" className="absolute h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="flex-1 min-w-0 min-h-0 overflow-hidden h-full">
        {children}
      </div>
    </div>
  );
}
