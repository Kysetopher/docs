import { DocsShell } from "@/components/docs/DocsShell";
import { getSplashGalleryItems } from "@/lib/splash/registry";

export function SplashesPage() {
  const splashes = getSplashGalleryItems();

  return (
    <DocsShell>
      <div className="h-full overflow-y-auto">

          <section className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {splashes.map(({ id, label, Component }) => (
              <article
                key={id}
                className="group relative isolate overflow-hidden"
              >
                <div className="relative aspect-[4/3] min-h-[16rem]">
                  <Component />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-background/0" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_40%)] opacity-80" />
                </div>

                <div className="relative border-t border-border/40 bg-background/70 p-4 backdrop-blur-sm">
                  <h2 className="text-sm font-medium tracking-wide">{label}</h2>
                  <p className="mt-1 text-xs uppercase tracking-[0.24em] text-muted-foreground">{id}</p>
                </div>
              </article>
            ))}
          </section>
      </div>
    </DocsShell>
  );
}
