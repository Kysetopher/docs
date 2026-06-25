import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { DocsShell } from "@/components/docs/DocsShell";
import { getSpaceBanner } from "@/lib/records/space-banners";
import { DOC_SPACES } from "@/lib/records/spaces";

const SPACE_CARD_LAYOUTS = [
  "xl:col-span-2 xl:row-span-2",
  "xl:col-span-2 xl:row-span-1",
  "xl:col-span-1 xl:row-span-1",
  "xl:col-span-1 xl:row-span-1",
];

export function HomePage() {
  return (
    <DocsShell>
      <div className="h-full overflow-y-auto">
        <div className="h-full">
          <section className="grid auto-rows-[minmax(15rem,auto)] gap-0 md:grid-cols-2 xl:grid-cols-4 xl:auto-rows-[minmax(14rem,auto)]">
            {DOC_SPACES.map((space, index) => {
              const layoutClass = SPACE_CARD_LAYOUTS[index % SPACE_CARD_LAYOUTS.length];

              return (
                <Link
                  key={space.id}
                  to={space.href}
                  className={`
                    group relative isolate flex min-h-[15rem] flex-col overflow-hidden border border-border/30
                    bg-card/10 shadow-sm backdrop-blur-[2px] transition hover:z-10 hover:shadow-xl focus-visible:outline-none
                    focus-visible:ring-2 focus-visible:ring-primary/40 ${layoutClass}
                  `}
                >
                  <div className="absolute inset-0 scale-105 opacity-90">{getSpaceBanner(space.id)}</div>
                  <div className="absolute inset-0 bg-gradient-to-br from-background/0 via-background/18 to-card/36" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.10),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_45%)] opacity-75" />

                  {space.cardIcon ? (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <Icon
                        icon="mdi:archive-arrow-up-outline"
                        className="h-44 w-44 text-foreground/6 blur-[0.5px] sm:h-52 sm:w-52 xl:h-60 xl:w-60"
                      />
                    </div>
                  ) : null}

                  <div className="relative z-10 flex items-start gap-4 p-4 sm:p-5">
                    {space.cardIcon ? (
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-border/30 bg-background/30 text-muted-foreground shadow-sm backdrop-blur-sm transition group-hover:text-primary">
                        <Icon icon={space.cardIcon} className="h-5 w-5" />
                      </div>
                    ) : null}

                    <div className="min-w-0">
                      <h2 className="truncate text-xl font-semibold transition group-hover:text-primary">
                        {space.title}
                      </h2>
                    </div>
                  </div>

                  <div className="relative z-10 mt-auto w-full p-4 pt-0 sm:p-5 sm:pt-0">
                    <p className="w-full text-sm leading-6 text-muted-foreground">
                      {space.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </section>
        </div>
      </div>
    </DocsShell>
  );
}
