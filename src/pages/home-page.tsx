import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { DocsShell } from "@/components/docs/DocsShell";
import { WaveformSilkSplash } from "@/components/splash/waveform-silk-splash";
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
      <div className="h-full overflow-y-auto bg-muted/40">
        <div className="">
          <section className="h-[200px] relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-56 overflow-hidden opacity-85">
              <WaveformSilkSplash />
              <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/35 to-card" />
            </div>

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
                  <span className="transition group-hover:translate-x-0.5 group-hover:text-primary">-&gt;</span>
                </div>
              </Link>
            ))}
          </section>
        </div>
      </div>
    </DocsShell>
  );
}
