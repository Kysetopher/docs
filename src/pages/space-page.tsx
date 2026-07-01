import { Icon } from "@iconify/react";
import { Link, Navigate, useParams } from "react-router-dom";
import { DocsShell } from "@/components/docs/DocsShell";
import { getDocBanner } from "@/lib/records/doc-banners";
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
            <div className="relative opacity-85">
              {getSpaceBanner(space.id)}
              <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/35 to-card" />
              <header className="relative z-10 flex flex-col justify-between gap-3 px-8 py-16 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  {space.cardIcon ? <Icon icon={space.cardIcon} className="h-8 w-8 text-primary" /> : null}
                  <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{space.title}</h1>
                </div>
                <p className="max-w-3xl text-base text-muted-foreground">{space.description}</p>
              </header>
            </div>
          </section>

          <section className="grid gap-2 p-2 sm:grid-cols-2 xl:grid-cols-3">
            {space.docs.map((doc) => (
              <Link key={doc.id} to={doc.href} className="group relative isolate block h-full border p-5">
                <div className="absolute left-5 top-0 z-[1] h-1 w-16 -translate-y-1/2 bg-background" />
                <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background to-background/18" />
                <div className="absolute inset-0 opacity-95">{getDocBanner(doc.id) ?? getSpaceBanner(space.id)}</div>

                {doc.cardIcon ? (
                  <div className="absolute left-6 -top-6 z-10">
                    <div className="rounded-full p-1">
                      <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl">
                        <Icon icon={doc.cardIcon} className="h-5 w-5" />
                      </div>
                    </div>
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
