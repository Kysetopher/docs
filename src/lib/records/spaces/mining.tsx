import type { DocRecord, DocSpace } from "@/lib/records/doc-types";

const spaceId = "mining";

function createDoc(
  id: string,
  cardTitle: string,
  cardDescription: string,
  headerTitle: string,
  headerDescription: string,
  cardIcon: string,
  sections: DocRecord["sections"],
): DocRecord {
  return {
    id,
    spaceId,
    href: `/spaces/${spaceId}/${id}`,
    cardTitle,
    cardDescription,
    cardIcon,
    header: {
      title: headerTitle,
      description: headerDescription,
      icon: cardIcon,
    },
    sections,
  };
}

const targetRows = [
  {
    mineral: "Placer gold",
    why: "Best first target for learning sampling, recovery, claims, and small-scale economics.",
    model: "Bulk sample, test, then either operate small scale or option the project.",
  },
  {
    mineral: "Lode gold",
    why: "Good upside if you can identify overlooked structures or historical prospects.",
    model: "Map, sample, and de-risk ground before partnering or selling it forward.",
  },
  {
    mineral: "Gemstones",
    why: "High value per pound if the quality is real and the buyer network is strong.",
    model: "Direct sales, specimen marketing, or small selective mining.",
  },
  {
    mineral: "Industrial minerals",
    why: "Often the most rational land economics when access and permitting are favorable.",
    model: "Lease, quarry, or sell to a nearby customer that already needs feedstock.",
  },
  {
    mineral: "Uranium",
    why: "Strong project-generation potential where the geology and regulation line up.",
    model: "Acquire a de-risked prospect, then sell it to an established developer.",
  },
  {
    mineral: "Lithium pegmatites",
    why: "Interesting if you can verify mineralogy and metallurgy instead of following hype.",
    model: "Exploration only until assays and recovery tests prove the concept.",
  },
];

const startupSteps = [
  "Start with public geology, claim maps, old mine records, and known district data.",
  "Use options, leases, or short agreements before buying land outright.",
  "Take samples early and keep the fieldwork cheap until the target is credible.",
  "Build a clean data room with assays, maps, photos, title notes, and access details.",
  "Sell, option, or joint-venture the project once it looks real to a better-capitalized operator.",
];

const propertyChecklist = [
  "Confirm whether you are buying surface rights only or the mineral estate as well.",
  "Check for existing leases, royalties, liens, access issues, and reclamation liabilities.",
  "Verify water, zoning, environmental, and tribal or community constraints before spending heavily.",
  "Treat permits, road access, and processing distance as part of the deposit value.",
];

const deepSeaChecklist = [
  "Do not treat seabed mining like ordinary private land ownership.",
  "Assume the business needs ships, robotics, compliance systems, and large outside capital.",
  "Consider service roles first: data processing, autonomy, telemetry, monitoring, or compliance tooling.",
];

const miningPlaybookSections: DocRecord["sections"] = [
  {
    id: "starting-point",
    title: "Starting Point",
    summary: "The right way to enter the mining game is to generate projects, not to build a mine on day one.",
    content: (
      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Mindset</p>
          <h3 className="mt-2 text-xl font-semibold text-foreground">Be a project generator first.</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            The lowest-risk path for a newcomer is to find promising ground, de-risk it, and package the evidence
            well enough that a better-capitalized operator wants in.
          </p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Sequence</p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
            {startupSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    ),
  },
  {
    id: "best-targets",
    title: "Best Targets",
    summary: "The minerals that make the most sense for a beginner depend on value, simplicity, and how fast you can de-risk them.",
    content: (
      <div className="overflow-hidden rounded-2xl border border-border/60">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-muted/30 text-left text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Mineral</th>
              <th className="px-4 py-3 font-medium">Why it works</th>
              <th className="px-4 py-3 font-medium">Starter model</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 bg-background">
            {targetRows.map((row) => (
              <tr key={row.mineral}>
                <td className="px-4 py-3 font-medium text-foreground">{row.mineral}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.why}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.model}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: "property-rules",
    title: "Property Rules",
    summary: "Buying land is not the same as owning the right to extract minerals from it.",
    content: (
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-background/60 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Before you buy</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
            {propertyChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-amber-400/20 bg-amber-500/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Good habit</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Use options and leases whenever possible. They let you control the project long enough to test it without
            locking up all your capital in the wrong ground.
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            A clean title, legal access, and workable permitting can matter as much as the ore body itself.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "deep-sea-mining",
    title: "Deep-Sea Mining",
    summary: "Treat seabed mining as a separate industry, not as a simple extension of land-based prospecting.",
    content: (
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-border/60 bg-background/60 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Reality check</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
            {deepSeaChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Practical angle</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            If you want a way into the sector, start with software and systems around the operation instead of trying
            to own the whole fleet.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {["Seafloor data", "Autonomy", "Telemetry", "Compliance"].map((item) => (
              <div key={item} className="rounded-xl border border-border/50 bg-background/70 px-3 py-2 text-sm text-foreground">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const miningPlaybookDoc = createDoc(
  "mining-playbook",
  "Mining Playbook",
  "A newcomer-friendly guide to prospecting, project generation, and property screening.",
  "Mining Playbook",
  "A practical space for prospecting strategy, target selection, property control, and deep-sea mining context.",
  "mdi:pickaxe",
  miningPlaybookSections,
);

export const miningSpace: DocSpace = {
  id: spaceId,
  title: "Mining",
  description: "A mining space for prospecting strategy, mineral targets, property control, and project generation.",
  href: `/spaces/${spaceId}`,
  cardIcon: "mdi:pickaxe",
  docs: [miningPlaybookDoc],
};
