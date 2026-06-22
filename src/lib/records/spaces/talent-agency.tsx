import type { DocRecord, DocSpace } from "@/lib/records/doc-types";
import type { DocSection } from "@/components/docs/DocumentationPage";
import { REFERENCES } from "@/lib/records/references";
import {
  TalentAgencyMarketAnalysisBody,
  TalentAgencyCustomerExperiencePageFrame,
  TalentAgencyResearchBody,
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

const marketResearchSections: DocRecord["sections"] = [
  {
    id: "market-research",
    title: "Market Research",
    summary: "Research signals that support the positioning and go-to-market logic.",
    content: (
      <div className="space-y-5">
        <TalentAgencySectionIntro
          kicker="Evidence"
          title="The market is moving toward AI-assisted content, but trust still needs a human."
          summary="The research story is simple: AI accelerates production, while premium presentation still depends on judgment, taste, and live credibility."
        />
        <TalentAgencyResearchBody refs={talentAgencyRefs} />
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
  "Research signals that support the positioning.",
  "Market Research",
  "A compact set of signals that support the category and commercial thesis.",
  "mdi:magnify",
  marketResearchSections,
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
    "A Fate-style documentation space for trained on-site talent, premium brand presence, and the market logic behind human credibility.",
  href: `/spaces/${spaceId}`,
  cardIcon: "mdi:account-group-outline",
  docs: [
    talentAgencyMarketAnalysisDoc,
    talentAgencyProductsServicesDoc,
    talentAgencyUpskillServicesDoc,
    talentAgencyTargetSectorsDoc,
    talentAgencyMarketResearchDoc,
  ],
};
