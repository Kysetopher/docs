import type { DocRecord, DocSpace } from "@/lib/records/doc-types";
import type { DocSection } from "@/components/docs/DocumentationPage";
import { Card, CardContent } from "@/components/ui/card";
import { BusinessPlanProjectionModel } from "@/components/docs/business-plan";
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
  title: 'Vercel Pro beta',
  eyebrow: 'Hosted runtime',
  value: 'Launch on Vercel Pro',
  valueLabel: 'Paid beta hosting with a later Cloudflare migration path',
  bullets: [
    'Use Vercel Pro for the first client-facing beta so the app can launch quickly with a commercial-ready plan.',
    'Keep Supabase as the source of truth for leads, builds, and published output.',
    'Move to Cloudflare only when there is a clear cost or architecture reason to do so.',
  ],
  stats: [
    {
      label: 'Internal prototype',
      body: 'Can stay near  if it remains private, static, and non-commercial.',
    },
    {
      label: 'Paid market test',
      body: 'Reserve /month for Vercel Pro and keep the rest of the stack lean.',
    },
  ],
};

const prebuildCostRows: BusinessPlanCostRow[] = [
  {
    category: 'Vercel Pro',
    notes: 'Commercial beta hosting for the docs app, previews, and control surface.',
    estimate: ' / month',
  },
  {
    category: 'Supabase',
    notes: 'Auth, lead registry, and pipeline state for the beta.',
    estimate: 'Free tier available',
  },
  {
    category: 'Cloudflare R2',
    notes: 'Generated assets and previews can stay in the free tier at early scale.',
    estimate: 'Free tier available',
  },
  {
    category: 'Cloudflare Pages',
    notes: 'Optional later migration target for static hosting.',
    estimate: '',
  },
  {
    category: 'Cloudflare Workers',
    notes: 'Only becomes a paid line item if the app actually moves server logic to Cloudflare.',
    estimate: ' / month minimum',
  },
  {
    category: 'Domain + DNS',
    notes: 'Primary domain registration and routing, regardless of host.',
    estimate: 'Annual domain cost',
  },
];

const scalingCostRows: BusinessPlanCostRow[] = [
  {
    category: 'Cloudflare Workers',
    notes: 'Paid when the beta actually migrates edge/API work off Vercel and into Cloudflare.',
    estimate: 'Per request',
  },
  {
    category: 'D1 reads / writes',
    notes: 'Only relevant if the team introduces D1 instead of keeping the registry in Supabase.',
    estimate: 'Per million rows',
  },
  {
    category: 'R2 storage',
    notes: 'Storage, Class A operations, and Class B operations become billable once the free tier is exceeded.',
    estimate: 'Per GB-month / per op',
  },
  {
    category: 'Lead crawling',
    notes: 'Apify and crawl volume scale with the number of sources processed.',
    estimate: 'Per lead / per crawl',
  },
  {
    category: 'Browser enrichment',
    notes: 'Playwright, WHOIS, and deep extraction get more expensive with depth.',
    estimate: 'Per crawl',
  },
  {
    category: 'AI synthesis',
    notes: 'Block mapping, content shaping, and summary generation are token-based.',
    estimate: 'Per token',
  },
];


const businessPlanSections: DocSection[] = [
  {
    id: 'revenue-stream',
    title: 'Revenue Stream',
    summary: 'The core money line should be easy to name before anything else.',
    content: <BusinessPlanValueCard spec={revenueCard} />,
  },
  {
    id: 'prebuild-costs',
    title: 'Prebuild Costs',
    summary: 'Separate the free prototype path from the paid beta baseline.',
    content: (
      <div className='space-y-4'>
        <Card className='rounded-none border-border/60 bg-background/40 backdrop-blur'>
          <CardContent className='space-y-3 p-4 text-sm leading-6 text-muted-foreground'>
            <p>
              An internal prototype can stay very close to free. Once the product becomes a real client-facing beta,
              the plan should reserve /month for Vercel Pro and keep the rest of the stack on the cheapest
              available tiers.
            </p>
            <p>
              Cloudflare stays in the plan as the later migration path, not as the starting assumption. That keeps the
              beta simple while still leaving room to move when there is a real cost or architecture reason.
            </p>
          </CardContent>
        </Card>
        <BusinessPlanCostTable
          rows={prebuildCostRows}
          totals={{
            label: 'Total fixed beta burn',
            notes: 'Internal prototype: near . Paid beta: budget /month for Vercel Pro, plus domain and any optional usage that exceeds free tiers.',
            estimate: ' / month + domain',
          }}
        />
      </div>
    ),
  },
  {
    id: 'scaling-costs',
    title: 'Scaling Costs',
    summary: 'What starts to climb once the beta grows beyond the launch stack.',
    content: (
      <div className='space-y-4'>
        <Card className='rounded-none border-border/60 bg-background/40 backdrop-blur'>
          <CardContent className='space-y-3 p-4 text-sm leading-6 text-muted-foreground'>
            <p className='font-medium text-foreground'>Scaling triggers</p>
            <ul className='list-disc space-y-2 pl-5'>
              <li>Lead crawling rises beyond low-volume testing and starts running in steady batches.</li>
              <li>Cloudflare only becomes a paid runtime choice if the app actually migrates off Vercel.</li>
              <li>D1, if introduced, should be treated as optional and not as a second source of truth during beta.</li>
              <li>Playwright enrichment and AI synthesis move from occasional work to repeated usage.</li>
            </ul>
          </CardContent>
        </Card>
        <BusinessPlanCostTable rows={scalingCostRows} />
      </div>
    ),
  },
  {
    id: 'projection-graph',
    title: 'Projection Graph',
    summary: 'Tune the revenue model and see the forecast update in real time.',
    content: <BusinessPlanProjectionModel />,
  },
];

const controlPlaneSections: DocSection[] = [
  {
    id: "hosting-model",
    title: "Hosting Model",
    summary: "Launch on Vercel Pro, then move the steady-state surface area to Cloudflare.",
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
