import type { DocRecord, DocSpace } from "@/lib/records/doc-types";
import type { DocSection } from "@/components/docs/DocumentationPage";
import { REFERENCES } from "@/lib/records/references";
import {
  TalentAgencyBrandBody,
  TalentAgencyMarketAnalysisBody,
  TalentAgencyResearchBody,
  TalentAgencySectionIntro,
  TalentAgencySectorNeedCard,
  TalentAgencyUpskillServicesBody,
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

const marketProductSections: DocRecord["sections"] = [
  {
    id: "market-product",
    title: "Market Product",
    summary: "How the service should be described to prospective clients and sectors.",
    content: (
      <div className="space-y-5">
        <TalentAgencySectionIntro
          kicker="Messaging"
          title="Make the offer sound like a flexible market product, not a generic staffing line."
          summary="The buyer should understand that the agency supplies trained human presence with different service shapes for brand, technical, and industrial sectors."
        />
        <TalentAgencyBrandBody />
      </div>
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
    id: "upskill-services",
    title: "Upskill Services",
    summary: "A training kit for turning general talent into sector-ready talent.",
    content: (
      <div className="space-y-5">
        <TalentAgencySectionIntro
          kicker="Training system"
          title="Build the kit around repeatable sector readiness, not one-off onboarding."
          summary="The agency needs a practical training kit that can teach presentation, product fluency, and sector-specific behavior without rebuilding the process every time."
        />
        <TalentAgencyUpskillServicesBody />
      </div>
    ),
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

export const talentAgencyMarketProductDoc = createDoc(
  "market-product",
  "Market Product",
  "How to communicate the service clearly to prospective clients and sectors.",
  "Market Product",
  "A concise explanation of the agency's product and how buyers should understand it.",
  "mdi:bullseye-arrow",
  marketProductSections,
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
  "Upskill Services",
  "A kit of training materials for turning talent into sector-ready talent.",
  "Upskill Services",
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
    talentAgencyMarketProductDoc,
    talentAgencyUpskillServicesDoc,
    talentAgencyTargetSectorsDoc,
    talentAgencyMarketResearchDoc,
  ],
};
