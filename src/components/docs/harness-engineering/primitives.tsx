import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared building blocks for the hand-authored SVG diagrams in the
 * Harness Engineering docs space. Every diagram uses the same tone
 * vocabulary so the encoding only needs to be learned once:
 *
 *   amber   — probabilistic (the model proposes)
 *   emerald — deterministic (a mechanism decides / allows / verifies)
 *   rose    — the failure mode being warned about (denied, unchecked, unscoped)
 *   muted   — an external system or passive artifact
 *   neutral — plain flow, no particular meaning
 */

export type Tone = "neutral" | "amber" | "emerald" | "rose" | "muted";

const boxToneClasses: Record<Tone, { stroke: string; fill: string; text: string; subtext: string }> = {
  neutral: { stroke: "stroke-foreground/40", fill: "fill-background", text: "fill-foreground", subtext: "fill-muted-foreground" },
  muted: { stroke: "stroke-border", fill: "fill-muted/40", text: "fill-foreground", subtext: "fill-muted-foreground" },
  amber: { stroke: "stroke-amber-500", fill: "fill-amber-500/10", text: "fill-amber-700", subtext: "fill-amber-700/70" },
  emerald: { stroke: "stroke-emerald-500", fill: "fill-emerald-500/10", text: "fill-emerald-700", subtext: "fill-emerald-700/70" },
  rose: { stroke: "stroke-rose-500", fill: "fill-rose-500/10", text: "fill-rose-700", subtext: "fill-rose-700/70" },
};

const ARROW_HEX: Record<Tone, string> = {
  neutral: "#78716c",
  muted: "#a1a1aa",
  amber: "#d97706",
  emerald: "#059669",
  rose: "#e11d48",
};

const arrowStrokeClass: Record<Tone, string> = {
  neutral: "stroke-stone-500",
  muted: "stroke-zinc-400",
  amber: "stroke-amber-600",
  emerald: "stroke-emerald-600",
  rose: "stroke-rose-600",
};

const legendDotClass: Record<Tone, string> = {
  neutral: "bg-stone-500",
  muted: "bg-zinc-400",
  amber: "bg-amber-500",
  emerald: "bg-emerald-500",
  rose: "bg-rose-500",
};

/** One <defs> block of arrowhead markers, one per tone. Include once per <svg>. */
export function ArrowMarkers({ idPrefix }: { idPrefix: string }) {
  return (
    <defs>
      {(Object.keys(ARROW_HEX) as Tone[]).map((tone) => (
        <marker
          key={tone}
          id={`${idPrefix}-${tone}`}
          viewBox="0 0 10 10"
          refX="8.5"
          refY="5"
          markerWidth="6.5"
          markerHeight="6.5"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill={ARROW_HEX[tone]} />
        </marker>
      ))}
    </defs>
  );
}

export function markerUrl(idPrefix: string, tone: Tone) {
  return `url(#${idPrefix}-${tone})`;
}

export function Box({
  x,
  y,
  w,
  h,
  label,
  sublabel,
  tone = "neutral",
  rx = 10,
  dashed = false,
  emphasize = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sublabel?: string;
  tone?: Tone;
  rx?: number;
  dashed?: boolean;
  emphasize?: boolean;
}) {
  const t = boxToneClasses[tone];
  const cx = x + w / 2;
  const cy = y + h / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={rx}
        className={cn(t.stroke, t.fill)}
        strokeWidth={emphasize ? 2 : 1.4}
        strokeDasharray={dashed ? "4 3" : undefined}
      />
      <text
        x={cx}
        y={sublabel ? cy - 3 : cy + 4}
        textAnchor="middle"
        className={cn(t.text, "text-[11px] font-semibold")}
      >
        {label}
      </text>
      {sublabel ? (
        <text x={cx} y={cy + 12} textAnchor="middle" className={cn(t.subtext, "text-[9px]")}>
          {sublabel}
        </text>
      ) : null}
    </g>
  );
}

export function Arrow({
  d,
  tone = "neutral",
  idPrefix,
  dashed = false,
  strokeWidth = 1.5,
}: {
  d: string;
  tone?: Tone;
  idPrefix: string;
  dashed?: boolean;
  strokeWidth?: number;
}) {
  return (
    <path
      d={d}
      fill="none"
      className={arrowStrokeClass[tone]}
      strokeWidth={strokeWidth}
      strokeDasharray={dashed ? "5 4" : undefined}
      markerEnd={markerUrl(idPrefix, tone)}
    />
  );
}

export function EdgeLabel({
  x,
  y,
  children,
  tone = "neutral",
  anchor = "middle",
}: {
  x: number;
  y: number;
  children: ReactNode;
  tone?: Tone;
  anchor?: "start" | "middle" | "end";
}) {
  const cls: Record<Tone, string> = {
    neutral: "fill-muted-foreground",
    muted: "fill-muted-foreground",
    amber: "fill-amber-700",
    emerald: "fill-emerald-700",
    rose: "fill-rose-700",
  };
  return (
    <text x={x} y={y} textAnchor={anchor} className={cn(cls[tone], "text-[9.5px] font-medium")}>
      {children}
    </text>
  );
}

export function SectionLabel({ x, y, children, anchor = "middle" }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end" }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className="fill-muted-foreground text-[10px] font-semibold uppercase tracking-[0.18em]"
    >
      {children}
    </text>
  );
}

export function DiagramFigure({
  viewBox,
  ariaLabel,
  caption,
  children,
  legend,
}: {
  viewBox: string;
  ariaLabel: string;
  caption: ReactNode;
  children: ReactNode;
  legend?: Array<{ tone: Tone; label: string }>;
}) {
  return (
    <figure className="space-y-2.5">
      <div className="overflow-x-auto rounded-2xl border border-border/60 bg-background/60 p-4">
        <svg viewBox={viewBox} role="img" aria-label={ariaLabel} className="h-auto w-full min-w-[420px] text-foreground">
          {children}
        </svg>
      </div>
      {legend ? (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-1 text-[11px] text-muted-foreground">
          {legend.map((item) => (
            <span key={item.label} className="inline-flex items-center gap-1.5">
              <span className={cn("h-2 w-2 rounded-full", legendDotClass[item.tone])} />
              {item.label}
            </span>
          ))}
        </div>
      ) : null}
      <figcaption className="px-1 text-xs leading-6 text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}
