import { useState, type ReactNode } from "react";
import { Icon } from "@iconify/react";
import { Collapsible } from "@/components/ui/collapsible";

export function CodeBlock({ code, language = "bash", title }: { code: string; language?: string; title?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="my-3 overflow-hidden rounded-xl border border-border/80 bg-zinc-950 text-zinc-100 shadow-inner">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2 text-[11px] text-zinc-400">
        <span className="font-mono">{title ?? language}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 transition hover:bg-zinc-800 hover:text-zinc-100"
          aria-label="Copy code"
        >
          <Icon icon={copied ? "mdi:check" : "mdi:content-copy"} className="h-3.5 w-3.5" />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed">{code}</pre>
    </div>
  );
}

export function InlineCode({ children }: { children: ReactNode }) {
  return <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px] text-foreground">{children}</code>;
}

export function Panel({ eyebrow, title, children }: { eyebrow?: string; title?: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">{eyebrow}</p>
      ) : null}
      {title ? <h3 className="mt-2 text-lg font-semibold text-foreground">{title}</h3> : null}
      <div className="mt-3 space-y-3 text-sm leading-6 text-muted-foreground">{children}</div>
    </div>
  );
}

export function Steps({ steps }: { steps: { title: string; body: ReactNode }[] }) {
  return (
    <ol className="space-y-4">
      {steps.map((step, index) => (
        <li key={step.title} className="flex gap-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border/60 bg-muted/40 text-xs font-semibold text-foreground">
            {index + 1}
          </span>
          <div className="min-w-0 flex-1 space-y-2 text-sm leading-6 text-muted-foreground">
            <p className="font-medium text-foreground">{step.title}</p>
            {step.body}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function KeyValueTable({ head, rows }: { head: [string, string]; rows: [ReactNode, ReactNode][] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-muted/30 text-left text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">{head[0]}</th>
            <th className="px-4 py-3 font-medium">{head[1]}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60 bg-background">
          {rows.map(([key, value], index) => (
            <tr key={index}>
              <td className="whitespace-nowrap px-4 py-3 align-top font-medium text-foreground">{key}</td>
              <td className="px-4 py-3 text-muted-foreground">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** A screenshot of one gallery section, captured from the template's /components page. */
export function GalleryShot({ id, title, note }: { id: string; title: string; note?: string }) {
  const src = `${import.meta.env.BASE_URL}template/components/${id}.png`;
  return (
    <figure className="space-y-2">
      <a href={src} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-2xl border border-border/60 bg-black">
        <img src={src} alt={`${title} components from the template gallery`} loading="lazy" className="w-full" />
      </a>
      <figcaption className="text-xs text-muted-foreground">
        {note ?? "Captured from the template's /components gallery."} Click to open full size.
      </figcaption>
    </figure>
  );
}

/** A tool to install, with its icon(s). Several icons = any of these works. */
export type ToolRow = { icons: string[]; tool: ReactNode; notes: ReactNode };

export function ToolTable({ rows }: { rows: ToolRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-muted/30 text-left text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">Tool</th>
            <th className="px-4 py-3 font-medium">Notes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60 bg-background">
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="px-4 py-3 align-top font-medium text-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex shrink-0 items-center gap-1 text-foreground">
                    {row.icons.map((icon) => (
                      <Icon key={icon} icon={icon} className="h-5 w-5" aria-hidden />
                    ))}
                  </span>
                  <span className="whitespace-nowrap">{row.tool}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type TechStackGroup = {
  title: string;
  icon: string;
  items: { name: string; version: string; use: string }[];
};

/** The template's stack, in one collapsible: grouped tables of package, version and what it's used for. */
export function TechStack({ groups }: { groups: TechStackGroup[] }) {
  return (
    <Collapsible
      className="overflow-hidden rounded-2xl border border-border/60 bg-background/60"
      triggerClassName="flex h-auto w-full items-center justify-start gap-2 rounded-none px-4 py-3 text-left text-sm font-semibold text-foreground"
      label="Detailed tech stack"
      triggerLabel="Toggle tech stack"
    >
      <div className="space-y-5 border-t border-border/60 p-4">
        {groups.map((group) => (
          <div key={group.title} className="space-y-2">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <Icon icon={group.icon} className="h-4 w-4" aria-hidden />
              {group.title}
            </p>
            <div className="overflow-hidden rounded-xl border border-border/60">
              <table className="w-full border-collapse text-sm">
                <tbody className="divide-y divide-border/60 bg-background">
                  {group.items.map((item) => (
                    <tr key={item.name}>
                      <td className="w-1/4 px-3 py-2 align-top font-medium text-foreground">{item.name}</td>
                      <td className="w-24 whitespace-nowrap px-3 py-2 align-top font-mono text-xs text-muted-foreground">{item.version}</td>
                      <td className="px-3 py-2 align-top text-muted-foreground">{item.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </Collapsible>
  );
}
