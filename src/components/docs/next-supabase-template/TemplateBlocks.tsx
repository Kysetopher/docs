import { useState, type ReactNode } from "react";
import { Icon } from "@iconify/react";
import type { CatalogEntry } from "@/lib/records/template/component-catalog";

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

export function ComponentEntry({ entry }: { entry: CatalogEntry }) {
  return (
    <div className="space-y-4 rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <InlineCode>{entry.importPath}</InlineCode>
        <span className="rounded-md border border-border/60 px-2 py-0.5 text-muted-foreground">
          {entry.client ? "Client component" : "Server-safe"}
        </span>
        {entry.dependsOn?.map((dep) => (
          <span key={dep} className="rounded-md border border-border/60 px-2 py-0.5 font-mono text-muted-foreground">
            {dep}
          </span>
        ))}
      </div>

      <p className="text-sm leading-6 text-muted-foreground">{entry.description}</p>

      <div className="text-sm">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Exports</p>
        <div className="flex flex-wrap gap-1.5">
          {entry.exports.map((name) => (
            <InlineCode key={name}>{name}</InlineCode>
          ))}
        </div>
      </div>

      {entry.props?.length ? (
        <div className="overflow-hidden rounded-xl border border-border/60">
          <table className="w-full border-collapse text-xs">
            <thead className="bg-muted/30 text-left text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">Prop</th>
                <th className="px-3 py-2 font-medium">Type</th>
                <th className="px-3 py-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 bg-background">
              {entry.props.map((prop) => (
                <tr key={prop.name}>
                  <td className="px-3 py-2 align-top font-mono text-foreground">{prop.name}</td>
                  <td className="px-3 py-2 align-top font-mono text-muted-foreground">{prop.type}</td>
                  <td className="px-3 py-2 align-top text-muted-foreground">{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <CodeBlock code={entry.usage} language="tsx" title={entry.file} />
    </div>
  );
}
