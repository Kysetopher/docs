import type { DocRecord, DocSpace } from "@/lib/records/doc-types";
import { REFERENCES } from "@/lib/records/references";
import {
  TalentAgencyBrandBody,
  TalentAgencyMarketAnalysisBody,
  TalentAgencyResearchBody,
  TalentAgencySectionIntro,
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

const brandPositioningSections: DocRecord["sections"] = [
  {
    id: "brand-positioning",
    title: "Brand Positioning",
    summary: "How the service should be described to prospective clients.",
    content: (
      <div className="space-y-5">
        <TalentAgencySectionIntro
          kicker="Messaging"
          title="Make the category sound premium, trained, and reliable."
          summary="The buyer should understand that the agency supplies credible human presence for frontier tech, hospitality, launches, and branded content moments."
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

export const talentAgencyMarketAnalysisDoc = createDoc(
  "market-analysis",
  "Market Analysis",
  "What AI will absorb and what still needs a person in the room.",
  "Market Analysis",
  "Where generative AI is strong, where it stops, and why human presence still matters.",
  "mdi:chart-line",
  marketAnalysisSections,
);

export const talentAgencyBrandPositioningDoc = createDoc(
  "brand-positioning",
  "Brand Positioning",
  "How to communicate the service clearly to prospective clients.",
  "Brand Positioning",
  "A concise explanation of what the agency sells and how buyers should understand it.",
  "mdi:bullseye-arrow",
  brandPositioningSections,
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

export const talentAgencySpace: DocSpace = {
  id: spaceId,
  title: "Talent Agency",
  description:
    "A Fate-style documentation space for trained on-site talent, premium brand presence, and the market logic behind human credibility.",
  href: `/spaces/${spaceId}`,
  cardIcon: "mdi:account-group-outline",
  docs: [talentAgencyMarketAnalysisDoc, talentAgencyBrandPositioningDoc, talentAgencyMarketResearchDoc],
};

