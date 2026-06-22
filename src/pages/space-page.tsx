import { Icon } from "@iconify/react";
import { Link, Navigate, useParams } from "react-router-dom";
import { DocsShell } from "@/components/docs/DocsShell";
import { getSpaceBanner } from "@/lib/records/space-banners";
import { getSpaceById } from "@/lib/records/spaces";

const DOC_CARD_BG_CLASSES = [
  "bg-indigo-950/40",
  "bg-cyan-950/40",
  "bg-emerald-950/40",
  "bg-amber-950/40",
  "bg-rose-400/20",
  "bg-violet-950/40",
];

export function SpacePage() {
  const { spaceId } = useParams<{ spaceId: string }>();
  const space = spaceId ? getSpaceById(spaceId) : undefined;

  if (!space) {
    return <Navigate to="/" replace />;
  }

  return (
    <DocsShell>
      <div className="h-full overflow-y-auto">
        <div className=" space-y-8">
          <section className="overflow-hidden">
            <div className="relative h-56 opacity-85">
              {getSpaceBanner(space.id)}
              <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/35 to-card" />
            </div>

            <header className="relative z-10 flex flex-col justify-between gap-3 px-8 py-8 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                {space.cardIcon ? <Icon icon={space.cardIcon} className="h-8 w-8 text-primary" /> : null}
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{space.title}</h1>
              </div>
              <p className="max-w-3xl text-base text-muted-foreground">{space.description}</p>
            </header>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {space.docs.map((doc, index) => (
              <Link
                key={doc.id}
                to={doc.href}
                className="
                  group relative block h-full overflow-hidden rounded-2xl border bg-card p-5 shadow-sm
                  transition hover:-translate-y-0.5 hover:shadow-lg
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
                "
              >
                <div
                  className={`absolute inset-0 -z-10 rounded-2xl ${
                    DOC_CARD_BG_CLASSES[index % DOC_CARD_BG_CLASSES.length]
                  }`}
                />

                {doc.cardIcon ? (
                  <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full border border-border/40 bg-background/60 text-muted-foreground transition group-hover:text-primary">
                    <Icon icon={doc.cardIcon} className="h-5 w-5" />
                  </div>
                ) : null}

                <h2 className="text-lg font-semibold transition group-hover:text-primary">
                  {doc.cardTitle}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{doc.cardDescription}</p>
              </Link>
            ))}
          </section>
        </div>
      </div>
    </DocsShell>
  );
}
