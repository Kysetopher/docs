import type { ReactNode } from "react";

interface ProgressBarProps {
  label?: string;
  value: number;
  max: number;
  delta?: string;
  className?: string;
  children?: ReactNode;

  // NEW
  showHandle?: boolean;
  handleAriaLabel?: string;
}

export function ProgressBar({
  label,
  value,
  max,
  delta,
  className = "",
  children,
  showHandle = false,
  handleAriaLabel,
}: ProgressBarProps) {
  const safeMax = max > 0 ? max : 1;
  const ratio = Math.min(Math.max(value / safeMax, 0), 1);
  const percentage = ratio * 100;

  const isPositiveDelta = delta?.trim().startsWith("+");

  return (
    <div
      className={`relative w-full overflow-hidden rounded bg-muted h-8 ${className}`.trim()}
      role="progressbar"
      aria-label={handleAriaLabel ?? label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      {/* Fill */}
      <div
        className="h-full bg-gradient-to-r from-primary via-primary to-primary/90 transition-all"
        style={{ width: `${percentage}%` }}
      />

      {/* Handle "|" */}
      {showHandle ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 z-10"
          style={{
            left: `${percentage}%`,
            transform: "translateX(-50%)",
          }}
        >
          {/* the bar */}
          <div className="h-full w-[4px] bg-foreground" />
         
        </div>
      ) : null}

      {/* Content overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3 text-[11px] font-semibold text-foreground">
        {children ? (
          children
        ) : (
          <>
            <span className="truncate">
              {label}: {value.toLocaleString()}
            </span>

            <div className="ml-2 flex items-center gap-2">
              <span className="text-xs text-muted-foreground tabular-nums">
                {Math.round(percentage)}%
              </span>
              {delta && (
                <span
                  className={`text-[10px] ${
                    isPositiveDelta ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {delta}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}