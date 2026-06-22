import type { DocRecord, DocSpace } from "@/lib/records/doc-types";
import type { DocSection } from "@/components/docs/DocumentationPage";
import { REFERENCES } from "@/lib/records/references";
import {
  TalentAgencyMarketAnalysisBody,
  TalentAgencyCustomerExperiencePageFrame,
  TalentAgencySectionIntro,
  TalentAgencySectorNeedCard,
  TalentAgencyProductsServicesBody,
  SUPER_CATEGORY_ORDER,
  TARGET_SECTOR_NEEDS,
  type TalentAgencyReferenceMap,
} from "@/components/docs/talent-agency/TalentAgencyBlocks";

const spaceId = "talent-agency";

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

const talentAgencyRefs = REFERENCES as TalentAgencyReferenceMap;

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const marketAnalysisSections: DocRecord["sections"] = [
  {
    id: "market-analysis",
    title: "Market Analysis",
    summary: "What AI will absorb, what stays premium, and where the agency should position.",
    content: (
      <div className="space-y-5">
        <TalentAgencySectionIntro
          kicker="Category framing"
          title="The agency should sell trained human presence, not commodity modeling."
          summary="Generative AI is excellent at producing images, but it cannot fully replace the live credibility, presence, and social context that premium clients buy in the room."
        />
        <TalentAgencyMarketAnalysisBody refs={talentAgencyRefs} />
      </div>
    ),
  },
];

const productsServicesSections: DocRecord["sections"] = [
  {
    id: "products-services",
    title: "Products & Services",
    summary: "What the umbrella brand sells and how the service families fit together.",
    content: (
      <div className="space-y-5">
        <TalentAgencyProductsServicesBody />
      </div>
    ),
  },
  {
    id: "customer-experience",
    title: "Customer Experience",
    summary: "How a client browses and selects a rep.",
    content: (
      <TalentAgencyCustomerExperiencePageFrame mode="embedded" />
    ),
  },
];

const conceptSystemSections: DocRecord["sections"] = [
  {
    id: "concept-stack",
    title: "Concept Stack",
    summary: "How the idea fits together as one system instead of a list of adjacent services.",
    content: (
      <div className="grid gap-4 lg:grid-cols-3">
        {[
          {
            title: "Live Presence",
            body: "The talent is physically present in the room, at the booth, on stage, or inside the event flow.",
          },
          {
            title: "Continuity Layer",
            body: "The persona stays coherent across content, social, and branded digital presence after the moment ends.",
          },
          {
            title: "Positioning Layer",
            body: "The brand turns that presence into a recognizable premium signal rather than generic staffing.",
          },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-border/60 bg-background/40 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">{item.title}</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "what-it-is-not",
    title: "What It Is Not",
    summary: "The adjacent categories this space borrows from without collapsing into them.",
    content: (
      <div className="overflow-hidden rounded-2xl border border-border/60">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-muted/30 text-left text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Adjacent mode</th>
              <th className="px-4 py-3 font-medium">How it fits</th>
              <th className="px-4 py-3 font-medium">What Talent Agency adds</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 bg-background">
            <tr>
              <td className="px-4 py-3 font-medium text-foreground">Modeling</td>
              <td className="px-4 py-3 text-muted-foreground">A delivery format for visible human presence.</td>
              <td className="px-4 py-3 text-muted-foreground">Turns the appearance into a broader credibility system.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-foreground">Staffing</td>
              <td className="px-4 py-3 text-muted-foreground">A placement method for live, temporary work.</td>
              <td className="px-4 py-3 text-muted-foreground">Frames the placement as premium representation, not labor fill.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-foreground">Creator management</td>
              <td className="px-4 py-3 text-muted-foreground">The continuity layer for content and audience presence.</td>
              <td className="px-4 py-3 text-muted-foreground">Keeps the persona coherent across moments and channels.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-foreground">Brand strategy</td>
              <td className="px-4 py-3 text-muted-foreground">The positioning and narrative layer above the service.</td>
              <td className="px-4 py-3 text-muted-foreground">Connects strategy to a visible human delivery model.</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: "language-map",
    title: "Language Map",
    summary: "The terms that make the concept readable without overexplaining it.",
    content: (
      <div className="grid gap-4 md:grid-cols-2">
        {[
          ["Trained presence", "Prepared talent that can represent a brand with consistency, tone, and room awareness."],
          ["Brand autonomy", "A talent identity that can carry itself across client work and self-directed presence."],
          ["Field performance", "How well the talent performs in the actual physical setting where the brand is seen."],
          ["Digital continuity", "The managed online layer that keeps the persona legible after the live moment."],
        ].map(([title, body]) => (
          <div key={title} className="rounded-2xl border border-border/60 bg-muted/20 p-5">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    ),
  },
];

const marketContextRows = [
  {
    buyer: "Premium hospitality",
    trigger: "Launches, VIP rooms, client hosting, branded service moments",
    need: "Polished human presence that matches the venue and the brand tier",
  },
  {
    buyer: "Frontier tech",
    trigger: "Product demos, conference booths, investor events, partner meetings",
    need: "A person who can translate complex ideas into trust and momentum",
  },
  {
    buyer: "Experiential marketing",
    trigger: "Brand activations, roadshows, live campaigns, sampling programs",
    need: "A visible face that makes the campaign feel real and premium",
  },
  {
    buyer: "Field-heavy sectors",
    trigger: "Site visits, training days, compliance-heavy moments, client walkthroughs",
    need: "Reliable representation with situational awareness and sector fluency",
  },
];

const marketSignalCards = [
  {
    title: "AI lowers content costs",
    body: "The cost of producing images and generic assets is falling, which pushes the premium value upward toward real presence and trust.",
  },
  {
    title: "Live moments still matter",
    body: "Product launches, events, trade shows, and VIP experiences still depend on the credibility of people in the room.",
  },
  {
    title: "Persona coherence matters more",
    body: "Brands want the same identity to survive across the venue, the camera, the feed, and the follow-up content.",
  },
  {
    title: "Sector context changes the service",
    body: "The agency value changes depending on whether the buyer needs elegance, technical translation, or operational discipline.",
  },
];

const marketScenarioCards = [
  {
    title: "Buyer context",
    before: "A brand needs live presence for a premium hospitality launch.",
    after: "The room gets trained talent, coordinated presentation, and a persona that matches the venue.",
  },
  {
    title: "Frontier-tech demo",
    before: "The company has a hard-to-explain product and a crowded conference floor.",
    after: "A credible face translates the product, handles the room, and makes the demo feel legible.",
  },
  {
    title: "Brand activation",
    before: "The campaign has good assets but no human anchor.",
    after: "The activation gets a face, a tone, and a repeatable presence people remember.",
  },
  {
    title: "Field deployment",
    before: "The client needs people who can operate inside a structured environment without friction.",
    after: "The talent arrives trained, briefed, and aligned to the sector’s expectations.",
  },
];

const researchGaps = [
  "More case studies that show the service in the wild.",
  "A stronger buyer map showing who pays first and why.",
  "A clearer sense of pricing bands or package structure.",
  "More comparisons to adjacent categories so the concept is easy to place.",
];

const visualSystemSections: DocRecord["sections"] = [
  {
    id: "scene-library",
    title: "Scene Library",
    summary: "Concrete situations that show what the concept looks like in practice.",
    content: (
      <div className="grid gap-4 xl:grid-cols-2">
        {marketScenarioCards.map((item) => (
          <div key={item.title} className="overflow-hidden rounded-2xl border border-border/60 bg-background/40 shadow-sm">
            <div className="border-b border-border/60 bg-muted/20 px-5 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">{item.title}</p>
            </div>
            <div className="grid gap-4 p-5 md:grid-cols-2">
              <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Before</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.before}</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-cyan-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-cyan-950">After</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.after}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

const improvedMarketResearchSections: DocRecord["sections"] = [
  {
    id: "market-signals",
    title: "Market Signals",
    summary: "The conditions that make the concept legible right now.",
    content: (
      <div className="grid gap-4 md:grid-cols-2">
        {marketSignalCards.map((item) => (
          <div key={item.title} className="rounded-2xl border border-border/60 bg-background/40 p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "buyer-contexts",
    title: "Buyer Contexts",
    summary: "Where the idea gets purchased or requested.",
    content: (
      <div className="overflow-hidden rounded-2xl border border-border/60">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-muted/30 text-left text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Buyer</th>
              <th className="px-4 py-3 font-medium">Trigger</th>
              <th className="px-4 py-3 font-medium">Need</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 bg-background">
            {marketContextRows.map((row) => (
              <tr key={row.buyer}>
                <td className="px-4 py-3 font-medium text-foreground">{row.buyer}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.trigger}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.need}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: "market-gaps",
    title: "Research Gaps",
    summary: "What is still missing from the evidence layer.",
    content: (
      <div className="grid gap-4 md:grid-cols-2">
        {researchGaps.map((item) => (
          <div key={item} className="rounded-2xl border border-amber-400/20 bg-amber-500/5 p-5">
            <p className="text-sm leading-6 text-muted-foreground">{item}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "market-moments",
    title: "Market Moments",
    summary: "The situations where the concept is most visible.",
    content: (
      <div className="grid gap-4 lg:grid-cols-2">
        {marketScenarioCards.map((item) => (
          <div key={item.title} className="rounded-2xl border border-border/60 bg-muted/20 p-5">
            <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.before}</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.after}</p>
          </div>
        ))}
      </div>
    ),
  },
];

const upskillServicesSections: DocRecord["sections"] = [
  {
    id: "sector-readiness",
    title: "Sector Readiness",
    summary: "Train talent for one target sector at a time.",
    children: [
      {
        id: "sector-readiness-overview",
        title: "What it covers",
        summary: "Buyer language, service expectations, risks, and sector context.",
        content: (
          <div className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>Focus on the language and behavior the client expects in that sector.</p>
            <p>Keep the training grounded in the actual roles the network will be asked to fill.</p>
          </div>
        ),
      },
      {
        id: "sector-readiness-modules",
        title: "Core modules",
        summary: "Primer, scenarios, and standards.",
        content: (
          <div className="space-y-3 text-sm leading-6 text-muted-foreground">
            <ul className="list-disc space-y-2 pl-5">
              <li>Sector primer</li>
              <li>Terminology guide</li>
              <li>Buyer and risk map</li>
              <li>Scenario rehearsal</li>
              <li>Certification gate</li>
            </ul>
          </div>
        ),
      },
      {
        id: "sector-readiness-output",
        title: "Output",
        summary: "Sector-qualified talent who can step into live work with confidence.",
        content: (
          <div className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>The output is a talent profile that is ready for a specific sector brief, not a generic placement.</p>
          </div>
        ),
      },
    ],
  },
  {
    id: "brand-autonomy",
    title: "Brand Autonomy",
    summary: "Help talent own their image, voice, and client-facing presence.",
    children: [
      {
        id: "brand-autonomy-overview",
        title: "What it covers",
        summary: "Identity, profile, content voice, and self-directed presentation.",
        content: (
          <div className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>This is about becoming legible and independent, not staying tied to one agency workflow.</p>
            <p>The focus is consistency across profile, voice, and public presence.</p>
          </div>
        ),
      },
      {
        id: "brand-autonomy-modules",
        title: "Core modules",
        summary: "Positioning, profile, and client communication.",
        content: (
          <div className="space-y-3 text-sm leading-6 text-muted-foreground">
            <ul className="list-disc space-y-2 pl-5">
              <li>Personal positioning</li>
              <li>Profile and portfolio setup</li>
              <li>Content voice and posting rhythm</li>
              <li>Direct outreach and response etiquette</li>
              <li>Boundary setting</li>
            </ul>
          </div>
        ),
      },
      {
        id: "brand-autonomy-output",
        title: "Output",
        summary: "A talent brand that can operate with or without an agency layer.",
        content: (
          <div className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>The output is a more autonomous talent identity that can work independently and stay coherent over time.</p>
          </div>
        ),
      },
    ],
  },
  {
    id: "field-performance",
    title: "Field Performance",
    summary: "Rehearse live scenarios and certify talent for face-to-face work.",
    children: [
      {
        id: "field-performance-overview",
        title: "What it covers",
        summary: "Booths, demos, events, and live handoffs.",
        content: (
          <div className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>Build comfort with the actual situations talent will face in the field.</p>
            <p>Keep the training focused on presence, delivery, and professional reliability.</p>
          </div>
        ),
      },
      {
        id: "field-performance-modules",
        title: "Core modules",
        summary: "Rehearsal, standards, and live-readiness checks.",
        content: (
          <div className="space-y-3 text-sm leading-6 text-muted-foreground">
            <ul className="list-disc space-y-2 pl-5">
              <li>Booth presence</li>
              <li>Demo delivery</li>
              <li>Event etiquette</li>
              <li>Client handoff</li>
              <li>Pass/fail readiness review</li>
            </ul>
          </div>
        ),
      },
      {
        id: "field-performance-output",
        title: "Output",
        summary: "Talent that is certified to represent the brand in person.",
        content: (
          <div className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>The output is live-ready talent with a clear standard for on-site performance.</p>
          </div>
        ),
      },
    ],
  },
];

const targetSectorGroups = SUPER_CATEGORY_ORDER.map((superCategory) => ({
  superCategory,
  sectors: TARGET_SECTOR_NEEDS.filter((item) => item.superCategory === superCategory),
})).filter((group) => group.sectors.length > 0);

const targetSectorsSections: DocSection[] = targetSectorGroups.map((group) => ({
  id: slugify(group.superCategory),
  title: group.superCategory,
  summary: `${group.superCategory} sectors and the kinds of talent services they need.`,
  children: group.sectors.map((item) => ({
    id: `${slugify(group.superCategory)}-${slugify(item.sector)}`,
    title: item.sector,
    summary: item.whyItDiffers,
    content: <TalentAgencySectorNeedCard item={item} />,
  })),
}));

export const talentAgencyMarketAnalysisDoc = createDoc(
  "market-analysis",
  "Market Analysis",
  "What AI will absorb and what still needs a person in the room.",
  "Market Analysis",
  "Where generative AI is strong, where it stops, and why human presence still matters.",
  "mdi:chart-line",
  marketAnalysisSections,
);

export const talentAgencyProductsServicesDoc = createDoc(
  "products-services",
  "Products & Services",
  "The umbrella brand's service families and delivery model.",
  "Products & Services",
  "A clear overview of what the company sells and how clients buy it.",
  "mdi:bullseye-arrow",
  productsServicesSections,
);

export const talentAgencyMarketResearchDoc = createDoc(
  "market-research",
  "Market Research",
  "Research signals, buyer contexts, and market moments that make the concept feel real.",
  "Market Research",
  "The market map, demand signals, and usage contexts behind the concept.",
  "mdi:magnify",
  improvedMarketResearchSections,
);

export const talentAgencyConceptDoc = createDoc(
  "concept-system",
  "Concept System",
  "How the layered model fits together and how it relates to adjacent categories.",
  "Concept System",
  "A visual map of the idea, the stack, and the terms that make it legible.",
  "mdi:shape-plus",
  conceptSystemSections,
);

export const talentAgencyScenesDoc = createDoc(
  "scenes-and-examples",
  "Scenes & Examples",
  "Before/after scenarios that make the concept easier to picture.",
  "Scenes & Examples",
  "Concrete situations that show how the service behaves in the real world.",
  "mdi:panorama",
  visualSystemSections,
);

export const talentAgencyUpskillServicesDoc = createDoc(
  "upskill-services",
  "Talent Upskill",
  "A kit of training materials for turning talent into sector-ready talent.",
  "Talent Upskill",
  "The training kit we use to prepare the talent network for specific target sectors.",
  "mdi:school-outline",
  upskillServicesSections,
);

export const talentAgencyTargetSectorsDoc = createDoc(
  "target-sectors",
  "Target Sectors",
  "The sectors to prioritize and the kinds of services they need.",
  "Target Sectors",
  "A working map of which sectors to focus on, organized into five top-level categories with sector-level children.",
  "mdi:shape-outline",
  targetSectorsSections,
);

export const talentAgencySpace: DocSpace = {
  id: spaceId,
  title: "Talent Agency",
  description:
    "A documentation space for trained on-site talent, premium brand presence, and the market logic behind human credibility.",
  href: `/spaces/${spaceId}`,
  cardIcon: "mdi:account-group-outline",
  docs: [
    talentAgencyConceptDoc,
    talentAgencyMarketAnalysisDoc,
    talentAgencyMarketResearchDoc,
    talentAgencyScenesDoc,
    talentAgencyProductsServicesDoc,
    talentAgencyUpskillServicesDoc,
    talentAgencyTargetSectorsDoc,
  ],
};
