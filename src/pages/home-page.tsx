import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { DocsShell } from "@/components/docs/DocsShell";
import { DOC_SPACES } from "@/lib/records/spaces";

const SPACE_CARD_BG_CLASSES = [
  "bg-indigo-950/40",
  "bg-cyan-950/40",
  "bg-emerald-950/40",
  "bg-amber-950/40",
  "bg-rose-400/20",
  "bg-violet-950/40",
];

export function HomePage() {
  return (
    <DocsShell>
      <div className="h-full overflow-y-auto bg-muted/40 px-6 py-10 text-foreground lg:py-14">
        <div className="mx-auto max-w-7xl space-y-10">
          <section className="rounded-3xl border bg-card/80 p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Documentation Home
            </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Choose a documentation space
          </h1>
          <p className="mt-4 max-w-3xl text-base text-muted-foreground">
            Each space groups its own docs. Click a space card to open the page that lists all docs inside it.
          </p>
        </section>

          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {DOC_SPACES.map((space, index) => (
            <Link
              key={space.id}
              to={space.href}
              className="
                group relative block overflow-hidden rounded-3xl border bg-card p-6 shadow-sm
                transition hover:-translate-y-1 hover:shadow-xl
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
              "
            >
              <div
                className={`absolute inset-0 -z-10 rounded-3xl ${
                  SPACE_CARD_BG_CLASSES[index % SPACE_CARD_BG_CLASSES.length]
                }`}
              />

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  {space.cardIcon ? (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border/40 bg-background/60 text-muted-foreground transition group-hover:text-primary">
                      <Icon icon={space.cardIcon} className="h-6 w-6" />
                    </div>
                  ) : null}

                  <div>
                    <h2 className="text-xl font-semibold transition group-hover:text-primary">
                      {space.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">{space.description}</p>
                  </div>
                </div>

                <span className="rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {space.docs.length} docs
                </span>
              </div>

              <div className="mt-8 flex items-center justify-between text-sm text-muted-foreground">
                <span>Open space</span>
                <span className="transition group-hover:translate-x-0.5 group-hover:text-primary">→</span>
              </div>
            </Link>
            ))}
          </section>
        </div>
      </div>
    </DocsShell>
  );
}
