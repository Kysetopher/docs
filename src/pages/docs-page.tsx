import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { DOC_RECORD_LIST } from "@/lib/records/docs-records";

const DOC_CARD_BG_CLASSES = [
  "bg-indigo-950/40",
  "bg-cyan-950/40",
  "bg-emerald-950/40",
  "bg-amber-950/40",
  "bg-rose-400/20",
  "bg-violet-950/40",
];

export function DocsPage() {
  return (
    <div className="min-h-screen bg-muted/40 px-6 py-10 text-foreground lg:py-14">
      <div className="mx-auto space-y-8">
        <header className="space-y-3 text-center">
          <div className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wide">
            <p className="text-primary">fate.energy</p>
            <p>docs</p>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DOC_RECORD_LIST.map((doc, index) => (
            <Link
              key={doc.id}
              to={doc.href}
              className="
                group relative block h-full overflow-visible rounded-2xl border-none p-5 pt-7 shadow-lg backdrop-blur
                transition hover:-translate-y-0.5 hover:shadow-[0_20px_80px_-45px_rgba(0,0,0,0.95)]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
              "
            >
              <div
                className={`absolute inset-0 -z-10 rounded-2xl ${
                  DOC_CARD_BG_CLASSES[index % DOC_CARD_BG_CLASSES.length]
                }`}
              />

              {doc.cardIcon ? (
                <div className="absolute left-6 -top-6 flex items-center justify-center rounded-full bg-transparent p-3">
                  <div className="text-muted-foreground transition group-hover:text-primary">
                    <Icon icon={doc.cardIcon} className="h-6 w-6" />
                  </div>
                </div>
              ) : null}

              <div>
                <h2 className="text-lg font-semibold transition group-hover:text-primary">
                  {doc.cardTitle}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{doc.cardDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
