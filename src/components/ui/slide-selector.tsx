import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export type SlideSelectorItem = {
  value: string
  label: React.ReactNode
}

export type SlideSelectorProps = {
  items: SlideSelectorItem[]
  selectedValue?: string
  onSelect: (value: string) => void
  orientation?: "horizontal" | "vertical" 

  variant?: "pill" | "square"
  heightClassName?: string // e.g. "h-10"
  widthClassName?: string  // e.g. "w-12" (only used for square)
  className?: string
}

export function SlideSelector({
  items,
  selectedValue,
  onSelect,
  orientation,
  variant = "square",
  heightClassName,
  widthClassName,
  className,
}: SlideSelectorProps) {
  const isHorizontal = orientation === "horizontal"

  const buttonBase =
    variant === "pill"
      ? cn("px-4", heightClassName ?? "h-10", "rounded-full")
      : cn(
          "aspect-square",
          heightClassName ?? "h-10",
          widthClassName ?? "w-10",
          "rounded-md"
        )

  return (
    <ScrollArea className={cn(isHorizontal ? "w-full" : "w-full h-full", className)}>
      <div
        className={cn(
          "p-2",
          isHorizontal ? "flex  py-3 flex-row gap-2" : "flex px-3 flex-col gap-2"
        )}
      >
        {items.map((item) => (
          <Button
            key={item.value}
            type="button"
            variant={selectedValue === item.value ? "default" : "ghost"}
            className={cn("shrink-0", buttonBase)}
            onClick={() => onSelect(item.value)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      {isHorizontal ? <ScrollBar orientation="horizontal" /> : <ScrollBar orientation="vertical" />}
    </ScrollArea>
  )
}
