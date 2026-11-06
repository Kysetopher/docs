import type { ReactNode } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

/*
 * Simplified drawings of the dashboards and files the setup steps send people
 * to. They're schematic on purpose: they show *where* to click and *which*
 * value goes where, without real keys and without going stale every time a
 * dashboard restyles. The highlighted parts are what the step is about.
 */

/** A marker that ties a highlighted field to the line it fills in. */
export function Tag({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "amber" | "rose" | "emerald" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-1.5 py-0.5 font-mono text-[10px] font-semibold",
        tone === "blue" && "bg-blue-600 text-white",
        tone === "amber" && "bg-amber-500 text-black",
        tone === "rose" && "bg-rose-600 text-white",
        tone === "emerald" && "bg-emerald-600 text-white",
      )}
    >
      {children}
    </span>
  );
}

const ring = {
  blue: "ring-2 ring-blue-600 ring-offset-1",
  amber: "ring-2 ring-amber-500 ring-offset-1",
  rose: "ring-2 ring-rose-600 ring-offset-1",
  emerald: "ring-2 ring-emerald-600 ring-offset-1",
} as const;

type Tone = keyof typeof ring;

export type NavItem = { label: string; icon?: string; active?: boolean; indent?: boolean };

/**
 * A browser window with a dashboard inside: address bar, optional top-bar
 * button, left navigation (the path to click is marked) and the page body.
 */
export function MockDashboard({
  app,
  appIcon,
  url,
  crumbs,
  topButton,
  nav,
  children,
  caption,
}: {
  app: string;
  appIcon: string;
  url: string;
  crumbs?: string[];
  topButton?: { label: string; tone?: Tone };
  nav?: NavItem[];
  children: ReactNode;
  caption?: ReactNode;
}) {
  return (
    <figure className="my-3 space-y-2">
      <div className="overflow-hidden rounded-xl border border-border bg-background text-[11px] text-foreground shadow-sm">
        <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-3 py-1.5">
          <span className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-rose-400" />
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="min-w-0 flex-1 truncate rounded bg-background px-2 py-0.5 font-mono text-[10px] text-muted-foreground">{url}</span>
        </div>
        <div className="flex items-center gap-2 border-b border-border px-3 py-1.5">
          <Icon icon={appIcon} className="h-3.5 w-3.5" aria-hidden />
          <span className="font-semibold">{app}</span>
          {crumbs?.map((crumb) => (
            <span key={crumb} className="flex items-center gap-2 text-muted-foreground">
              <span>/</span>
              <span>{crumb}</span>
            </span>
          ))}
          {topButton ? (
            <span className={cn("ml-auto rounded-md border border-border px-2 py-0.5 font-medium", ring[topButton.tone ?? "blue"])}>
              {topButton.label}
            </span>
          ) : null}
        </div>
        <div className="flex">
          {nav ? (
            <ul className="hidden w-36 shrink-0 space-y-0.5 border-r border-border bg-muted/20 p-2 sm:block">
              {nav.map((item) => (
                <li
                  key={item.label}
                  className={cn(
                    "flex items-center gap-1.5 rounded px-1.5 py-1",
                    item.indent && "ml-3",
                    item.active ? "bg-blue-600/10 font-semibold text-blue-700 ring-1 ring-blue-600/40" : "text-muted-foreground",
                  )}
                >
                  {item.icon ? <Icon icon={item.icon} className="h-3 w-3 shrink-0" aria-hidden /> : null}
                  <span className="truncate">{item.label}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="min-w-0 flex-1 space-y-2.5 p-3">{children}</div>
        </div>
      </div>
      {caption ? <figcaption className="text-xs text-muted-foreground">{caption}</figcaption> : null}
    </figure>
  );
}

/** A labelled value in a dashboard, optionally highlighted and tagged with what it fills in. */
export function MockField({
  label,
  value,
  hint,
  action,
  tag,
  tone = "blue",
}: {
  label: string;
  value: string;
  hint?: string;
  action?: string;
  tag?: string;
  tone?: Tone;
}) {
  return (
    <div className="space-y-1">
      {label ? (
        <div className="flex items-center gap-2">
          <span className="font-medium">{label}</span>
          {tag ? <Tag tone={tone}>{tag}</Tag> : null}
        </div>
      ) : null}
      <div className={cn("flex items-center gap-2 rounded-md border border-border bg-muted/30 px-2 py-1", tag && ring[tone])}>
        {!label && tag ? <Tag tone={tone}>{tag}</Tag> : null}
        <span className="min-w-0 flex-1 truncate font-mono text-[10px] text-muted-foreground">{value}</span>
        {action ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded border border-border bg-background px-1.5 py-0.5 text-[10px]">
            <Icon icon={action === "Reveal" ? "mdi:eye-outline" : "mdi:content-copy"} className="h-3 w-3" aria-hidden />
            {action}
          </span>
        ) : null}
      </div>
      {hint ? <p className="text-[10px] text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

/** An on/off setting, with the position it should end up in highlighted. */
export function MockToggle({ label, on, tone = "blue", note }: { label: string; on: boolean; tone?: Tone; note?: string }) {
  return (
    <div className={cn("flex items-center gap-3 rounded-md border border-border px-2 py-1.5", ring[tone])}>
      <div className="min-w-0 flex-1">
        <p className="font-medium">{label}</p>
        {note ? <p className="text-[10px] text-muted-foreground">{note}</p> : null}
      </div>
      <span className={cn("flex h-4 w-7 shrink-0 items-center rounded-full p-0.5", on ? "justify-end bg-emerald-600" : "justify-start bg-zinc-400")}>
        <span className="h-3 w-3 rounded-full bg-white" />
      </span>
      <span className={cn("w-6 text-[10px] font-semibold", on ? "text-emerald-700" : "text-zinc-500")}>{on ? "ON" : "OFF"}</span>
    </div>
  );
}

/** A small heading inside a mock page. */
export function MockHeading({ children, sub }: { children: ReactNode; sub?: string }) {
  return (
    <div>
      <p className="text-xs font-semibold">{children}</p>
      {sub ? <p className="text-[10px] text-muted-foreground">{sub}</p> : null}
    </div>
  );
}

/** A mock button, highlighted when it's the one to press. */
export function MockButton({ children, tone }: { children: ReactNode; tone?: Tone }) {
  return (
    <span className={cn("inline-flex rounded-md bg-foreground px-2 py-0.5 text-[10px] font-medium text-background", tone && ring[tone])}>
      {children}
    </span>
  );
}

/** A text file open in an editor, each filled-in line tagged to match the dashboard drawings. */
export function MockEnvFile({
  name,
  lines,
  caption,
}: {
  name: string;
  lines: { key: string; value: string; tag?: string; tone?: Tone; note?: string }[];
  caption?: ReactNode;
}) {
  return (
    <figure className="my-3 space-y-2">
      <div className="overflow-hidden rounded-xl border border-border bg-zinc-950 text-zinc-100 shadow-sm">
        <div className="flex items-center gap-2 border-b border-zinc-800 px-3 py-1.5 text-[10px] text-zinc-400">
          <Icon icon="mdi:file-document-edit-outline" className="h-3.5 w-3.5" aria-hidden />
          <span className="font-mono">{name}</span>
          <span className="ml-auto">VS Code / Notepad / TextEdit</span>
        </div>
        <div className="space-y-1 p-3 font-mono text-[11px]">
          {lines.map((line) => (
            <div key={line.key} className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span>
                <span className="text-sky-300">{line.key}</span>
                <span className="text-zinc-500">=</span>
                <span className={cn(line.tag ? "text-zinc-100" : "text-zinc-400")}>{line.value}</span>
              </span>
              {line.tag ? <Tag tone={line.tone}>{line.tag}</Tag> : null}
              {line.note ? <span className="font-sans text-[10px] text-zinc-500">{line.note}</span> : null}
            </div>
          ))}
        </div>
      </div>
      {caption ? <figcaption className="text-xs text-muted-foreground">{caption}</figcaption> : null}
    </figure>
  );
}

/** A terminal with the commands to run and what comes back. */
export function MockTerminal({ title = "Terminal", lines, caption }: { title?: string; lines: { cmd?: string; out?: string; you?: string }[]; caption?: ReactNode }) {
  return (
    <figure className="my-3 space-y-2">
      <div className="overflow-hidden rounded-xl border border-border bg-zinc-950 text-zinc-100 shadow-sm">
        <div className="flex items-center gap-2 border-b border-zinc-800 px-3 py-1.5 text-[10px] text-zinc-400">
          <Icon icon="mdi:console" className="h-3.5 w-3.5" aria-hidden />
          <span>{title}</span>
        </div>
        <div className="space-y-1 p-3 font-mono text-[11px] leading-relaxed">
          {lines.map((line, index) => (
            <div key={index}>
              {line.cmd ? (
                <p>
                  <span className="text-emerald-400">&gt; </span>
                  {line.cmd}
                </p>
              ) : null}
              {line.out ? <p className="whitespace-pre-wrap text-zinc-400">{line.out}</p> : null}
              {line.you ? (
                <p className="font-sans text-[10px] text-amber-300">
                  <Icon icon="mdi:hand-pointing-right" className="mr-1 inline h-3 w-3 align-[-2px]" aria-hidden />
                  {line.you}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      {caption ? <figcaption className="text-xs text-muted-foreground">{caption}</figcaption> : null}
    </figure>
  );
}

/** A short boxed note: a warning, a tip, or what to expect. */
export function Note({ tone = "info", title, children }: { tone?: "info" | "warn" | "tip"; title?: string; children: ReactNode }) {
  const icon = tone === "warn" ? "mdi:alert-outline" : tone === "tip" ? "mdi:lightbulb-on-outline" : "mdi:information-outline";
  return (
    <div
      className={cn(
        "my-2 flex gap-2 rounded-lg border px-3 py-2 text-xs leading-5",
        tone === "warn" && "border-rose-600/30 bg-rose-600/5",
        tone === "tip" && "border-amber-500/30 bg-amber-500/5",
        tone === "info" && "border-blue-600/25 bg-blue-600/5",
      )}
    >
      <Icon
        icon={icon}
        className={cn(
          "mt-0.5 h-4 w-4 shrink-0",
          tone === "warn" && "text-rose-600",
          tone === "tip" && "text-amber-600",
          tone === "info" && "text-blue-600",
        )}
        aria-hidden
      />
      <div className="min-w-0 space-y-1 text-muted-foreground">
        {title ? <p className="font-semibold text-foreground">{title}</p> : null}
        {children}
      </div>
    </div>
  );
}
