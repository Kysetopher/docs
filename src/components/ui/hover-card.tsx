// src/components/ui/hover-card.tsx
// Vite + React + Radix HoverCard, styled like shadcn.
// No tailwind required — uses plain CSS + CSS variables.
// If you already use Tailwind, you can still use this (it won’t conflict).

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { Icon } from "@iconify/react";

// -------- utils (no deps) --------
function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

// -------- exports (shadcn-like API) --------
export const HoverCard = HoverCardPrimitive.Root;

export const HoverCardTrigger = HoverCardPrimitive.Trigger;

export const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> & {
    /** Optional: show a small "external" icon on links inside content */
    showLinkIcon?: boolean;
  }
>(({ className, align = "center", sideOffset = 8, ...props }, ref) => (
  <HoverCardPrimitive.Portal>
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn("fe-hc-content", className)}
      {...props}
    />
  </HoverCardPrimitive.Portal>
));
HoverCardContent.displayName = "HoverCardContent";

// Optional helper: a nice little "open link" pill with Iconify
export function HoverCardLink({
  href,
  children = "Open source",
  className,
  icon = "mdi:open-in-new",
}: {
  href: string;
  children?: React.ReactNode;
  className?: string;
  icon?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn("fe-hc-link", className)}
    >
      <span>{children}</span>
      <Icon icon={icon} className="fe-hc-link-icon" />
    </a>
  );
}