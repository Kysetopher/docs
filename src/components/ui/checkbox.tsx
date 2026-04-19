import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Icon } from "@iconify/react";

/**
 * Minimal `cn` helper (shadcn-style) without extra deps.
 * If you already have clsx/twMerge/cn in your project, replace this with yours.
 */
function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

export type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  /**
   * Iconify icon name for the checked state.
   * Examples:
   * - "radix-icons:check"
   * - "mdi:check"
   * - "lucide:check"
   */
  checkedIcon?: string;
  /**
   * Iconify icon name for the indeterminate state.
   * Examples:
   * - "radix-icons:minus"
   * - "mdi:minus"
   */
  indeterminateIcon?: string;
};

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      className,
      checkedIcon = "radix-icons:check",
      indeterminateIcon = "radix-icons:minus",
      ...props
    },
    ref
  ) => {
    // Radix uses checked: boolean | "indeterminate"
    const state = props.checked;

    return (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          "peer h-4 w-4 rounded-none shrink-0 border",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "hover:border-accent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
          "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn("flex items-center justify-center text-current")}
        >
          {state === "indeterminate" ? (
            <Icon icon={indeterminateIcon} className="h-3.5 w-3.5" />
          ) : (
            <Icon icon={checkedIcon} className="h-3.5 w-3.5" />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };