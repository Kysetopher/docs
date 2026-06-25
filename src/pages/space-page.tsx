import { Icon } from "@iconify/react";
import { Link, Navigate, useParams } from "react-router-dom";
import { DocsShell } from "@/components/docs/DocsShell";
import { getSpaceBanner } from "@/lib/records/space-banners";
import { getSpaceById } from "@/lib/records/spaces";

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
            {space.docs.map((doc) => (
              <Link
                key={doc.id}
                to={doc.href}
                className="
                  group relative isolate block h-full overflow-hidden rounded-2xl border bg-card p-5 shadow-sm
                  transition hover:-translate-y-0.5 hover:shadow-lg
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
                "
              >
                <div className="absolute inset-0 scale-105 opacity-95">{getSpaceBanner(space.id)}</div>
                <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-background/45 to-card/88" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_45%)] opacity-70" />

                {doc.cardIcon ? (
                  <div className="relative z-10 mb-6 flex h-11 w-11 items-center justify-center rounded-full border border-border/40 bg-background/70 text-muted-foreground shadow-sm backdrop-blur-sm transition group-hover:text-primary">
                    <Icon icon={doc.cardIcon} className="h-5 w-5" />
                  </div>
                ) : null}

                <h2 className="relative z-10 text-lg font-semibold transition group-hover:text-primary">
                  {doc.cardTitle}
                </h2>
                <p className="relative mt-2 text-sm text-muted-foreground">{doc.cardDescription}</p>
              </Link>
            ))}
          </section>
        </div>
      </div>
    </DocsShell>
  );
}
