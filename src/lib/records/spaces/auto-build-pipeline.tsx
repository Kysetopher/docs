import type { DocRecord, DocSpace } from "@/lib/records/doc-types";
import type { DocSection } from "@/components/docs/DocumentationPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart } from "@/components/graph/AreaChart";
import {
  BusinessPlanCostTable,
  BusinessPlanValueCard,
  type BusinessPlanCardSpec,
  type BusinessPlanCostRow,
} from "@/components/docs/business-plan";

const spaceId = "auto-build-pipeline";

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

const revenueCard: BusinessPlanCardSpec = {
  title: "Managed Build Retainer",
  eyebrow: "Primary revenue stream",
  value: "Project + retainer",
  valueLabel: "Launch fee plus ongoing ops",
  bullets: [
    "The core sale is a managed website generation engagement tied to a clean lead record.",
    "The operating plan bundles lead intake, site generation, and analytics into one service loop.",
    "Once a site is live, recurring revenue comes from maintenance, iteration, and pipeline support.",
  ],
  stats: [
    {
      label: "What gets billed",
      body: "Lead qualification, website generation, preview support, and post-launch updates.",
    },
    {
      label: "Why it renews",
      body: "The generated site and the analytics layer need ongoing review, cleanup, and iteration.",
    },
  ],
};

const hostingModelCard: BusinessPlanCardSpec = {
  title: "Cloudflare Control Plane",
  eyebrow: "Hosted runtime",
  value: "Pages + Workers + Supabase",
  valueLabel: "Public UI, server API, and durable tracking",
  bullets: [
    "Cloudflare Pages serves the docs and public-facing app shell.",
    "Cloudflare Workers hosts the server-side API used to build and deploy the pipelines.",
    "Supabase keeps the registry state, lead status, and repo linkage durable after each run.",
  ],
  stats: [
    {
      label: "Hosted API",
      body: "Single-lead and batch-lead runs stay on one server-side synthesis path.",
    },
    {
      label: "Tracked state",
      body: "Lead status, repo slug, and enrichment history stay queryable in Supabase.",
    },
  ],
};

const prebuildCostRows: BusinessPlanCostRow[] = [
  {
    category: "Cloudflare Pages",
    notes: "Static hosting for the docs app and published site previews.",
    estimate: "$0",
  },
  {
    category: "Cloudflare Workers",
    notes: "Only needed if Pages Functions or edge logic are added; billed as a Workers plan with a $5/month minimum.",
    estimate: "$5 / month minimum",
  },
  {
    category: "Cloudflare D1",
    notes: "Optional SQL layer for lightweight structured data during beta.",
    estimate: "Free tier available",
  },
  {
    category: "Cloudflare R2",
    notes: "Asset storage for images and previews with free egress.",
    estimate: "Free tier available",
  },
  {
    category: "Domain + DNS",
    notes: "Primary domain registration and the basic DNS layer.",
    estimate: "Annual domain cost",
  },
];

const scalingCostRows: BusinessPlanCostRow[] = [
  {
    category: "Workers usage",
    notes: "Cloudflare Workers are billed once API traffic and edge logic move beyond the free/static path.",
    estimate: "Per request",
  },
  {
    category: "D1 reads / writes",
    notes: "Database costs begin after the free row-read and row-write allowances are exceeded.",
    estimate: "Per million rows",
  },
  {
    category: "R2 storage",
    notes: "Storage, Class A operations, and Class B operations become billable once the free tier is exceeded.",
    estimate: "Per GB-month / per op",
  },
  {
    category: "Lead crawling",
    notes: "Apify and crawl volume scale with the number of sources processed.",
    estimate: "Per lead / per crawl",
  },
  {
    category: "Browser enrichment",
    notes: "Playwright, WHOIS, and deep extraction get more expensive with depth.",
    estimate: "Per crawl",
  },
  {
    category: "AI synthesis",
    notes: "Block mapping, content shaping, and summary generation are token-based.",
    estimate: "Per token",
  },
];

const overviewTraffic: { x: Date; y: number; label: string }[] = [
  { x: new Date(2026, 0, 1), y: 2, label: "Q1" },
  { x: new Date(2026, 1, 1), y: 4, label: "Q2" },
  { x: new Date(2026, 2, 1), y: 7, label: "Q3" },
  { x: new Date(2026, 3, 1), y: 11, label: "Q4" },
  { x: new Date(2026, 4, 1), y: 16, label: "Q5" },
  { x: new Date(2026, 5, 1), y: 24, label: "Q6" },
];

const businessPlanSections: DocSection[] = [
  {
    id: "revenue-stream",
    title: "Revenue Stream",
    summary: "The core money line should be easy to name before anything else.",
    content: <BusinessPlanValueCard spec={revenueCard} />,
  },
  {
    id: "prebuild-costs",
    title: "Prebuild Costs",
    summary: "Fixed costs to reach beta before variable usage starts to matter.",
    content: (
      <div className="space-y-4">
        <Card className="rounded-none border-border/60 bg-background/40 backdrop-blur">
          <CardContent className="p-4 text-sm leading-6 text-muted-foreground">
            This is the fixed prebuild budget: the minimum spend needed to get the docs, hosting, database, and
            operator layer to a usable beta.
          </CardContent>
        </Card>
        <BusinessPlanCostTable
          rows={prebuildCostRows}
          totals={{
            label: "Total fixed prebuild burn",
            notes: "Before variable usage, the base can stay near zero if the site remains static; Workers only add a $5/month floor when functions are used.",
            estimate: "$0 to $5 / month + domain",
          }}
        />
      </div>
    ),
  },
  {
    id: "scaling-costs",
    title: "Scaling Costs",
    summary: "What starts to climb once the system leaves beta and begins taking on more volume.",
    content: (
      <div className="space-y-4">
        <Card className="rounded-none border-border/60 bg-background/40 backdrop-blur">
          <CardContent className="space-y-3 p-4 text-sm leading-6 text-muted-foreground">
            <p className="font-medium text-foreground">Scaling triggers</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Lead crawling rises beyond low-volume testing and starts running in steady batches.</li>
              <li>Cloudflare Workers begin handling real request traffic instead of only static hosting.</li>
              <li>D1 reads, writes, and R2 operations move past the free tier and become measurable usage.</li>
              <li>Playwright enrichment and AI synthesis move from occasional work to repeated usage.</li>
            </ul>
          </CardContent>
        </Card>
        <BusinessPlanCostTable rows={scalingCostRows} />
      </div>
    ),
  },
  {
    id: "projection-graph",
    title: "Projection Graph",
    summary: "A simple output curve for the first six planning periods.",
    content: (
      <Card className="rounded-none border-border/60 bg-background/40 backdrop-blur">
        <CardHeader className="border-b border-border/40 pb-4">
          <CardTitle className="text-lg font-semibold">Planned output curve</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="h-72">
            <AreaChart data={overviewTraffic} height={288} />
          </div>
        </CardContent>
      </Card>
    ),
  },
];

const controlPlaneSections: DocSection[] = [
  {
    id: "hosting-model",
    title: "Hosting Model",
    summary: "Cloudflare hosts the surface area and Supabase stores the state that survives the run.",
    content: <BusinessPlanValueCard spec={hostingModelCard} />,
  },
  {
    id: "build-api",
    title: "Build API",
    summary: "One hosted API should build both single-lead and batch-lead pipelines.",
    content: (
      <Card className="rounded-none border-border/60 bg-background/40 backdrop-blur">
        <CardContent className="space-y-3 p-4 text-sm leading-6 text-muted-foreground">
          <p className="font-medium text-foreground">Server-side synthesis path</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Resolve the lead by <code>leadId</code> or <code>leadKey</code>.
            </li>
            <li>Use the same route for single-lead and batch-lead runs.</li>
            <li>Stream progress while the pipeline builds on the server.</li>
            <li>Write the final project slug and pipeline status back to Supabase.</li>
          </ul>
        </CardContent>
      </Card>
    ),
  },
  {
    id: "registry-tracking",
    title: "Registry Tracking",
    summary: "The database should preserve the handoff between lead, build, and published site.",
    content: (
      <Card className="rounded-none border-border/60 bg-background/40 backdrop-blur">
        <CardContent className="space-y-3 p-4 text-sm leading-6 text-muted-foreground">
          <p className="font-medium text-foreground">Supabase fields that matter</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <code>analytics.clean_leads.lead_key</code> keeps the lead identity stable.
            </li>
            <li>
              <code>pipeline_status</code> marks the run as pending, ready, or processed.
            </li>
            <li>
              <code>repo_slug</code> links the lead to the generated Forge repository.
            </li>
            <li>
              <code>source_payload</code> and <code>enrichment</code> preserve the evidence trail.
            </li>
          </ul>
        </CardContent>
      </Card>
    ),
  },
];

export const autoBuildPipelineBusinessPlanDoc = createDoc(
  "business-plan",
  "Business Plan",
  "The Fate-style overview for the full lead, site, and analytics loop.",
  "Business Plan",
  "The business-plan view of the auto build pipeline, adapted for the current docs space.",
  "mdi:finance",
  businessPlanSections,
);

export const autoBuildPipelineControlPlaneDoc = createDoc(
  "hosting-control-plane",
  "Hosting & Control Plane",
  "Cloudflare hosting, server-side pipeline builds, and Supabase tracking in one view.",
  "Hosting & Control Plane",
  "How the auto build pipeline is hosted, executed, and tracked after each run.",
  "mdi:cloud",
  controlPlaneSections,
);

export const autoBuildPipelineSpace: DocSpace = {
  id: spaceId,
  title: "Auto Build Pipeline",
  description:
    "Lead ingestion, website generation, and analytics feedback in one space that mirrors the bigger operating plan.",
  href: `/spaces/${spaceId}`,
  cardIcon: "mdi:robot-outline",
  docs: [autoBuildPipelineBusinessPlanDoc, autoBuildPipelineControlPlaneDoc],
};
