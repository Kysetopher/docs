import type { DocRecord, DocSpace } from "@/lib/records/doc-types";
import { aiPsychosisCasesSections } from "@/lib/records/ai-psychosis-cases-sections";
import { aiPsychosisProgramsFiguresSections } from "@/lib/records/ai-psychosis-programs-figures-sections";
import { aiPsychosisResearchSections } from "@/lib/records/ai-psychosis-research-sections";
import { aiPsychosisStagesSections } from "@/lib/records/ai-psychosis-stages-sections";
import { medicalRecognitionSections } from "@/lib/records/medical-recognition-sections";

const spaceId = "ai-support-group";

function createDoc(
  id: string,
  cardTitle: string,
  cardDescription: string,
  headerTitle: string,
  headerDescription: string,
  cardIcon: string,
  sections: DocRecord["sections"]
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

export const aiSupportGroupDocs: DocRecord[] = [
  createDoc(
    "research-on-ai-psychosis",
    "Research on AI Psychosis",
    "Core research questions, methods, and evidence gaps.",
    "Research on AI Psychosis",
    "A focused research agenda to move AI psychosis work from anecdote to reproducible evidence.",
    "mdi:flask-outline",
    aiPsychosisResearchSections
  ),
  createDoc(
    "current-programs-and-figures-in-ai-psychosis",
    "Current Programs and Figures in AI Psychosis",
    "Active program models and the stakeholder landscape.",
    "Current Programs and Figures in AI Psychosis",
    "A living landscape of active program types and the key figures driving this field.",
    "mdi:account-group-outline",
    aiPsychosisProgramsFiguresSections
  ),
  createDoc(
    "cases-of-ai-psychosis",
    "Cases of AI Psychosis",
    "Documented patterns, markers, and practical warning signs.",
    "Cases of AI Psychosis",
    "Reference scenarios and early warning signals for AI-mediated psychotic risk.",
    "mdi:file-document-alert-outline",
    aiPsychosisCasesSections
  ),
  createDoc(
    "petitioning-for-medical-recognition",
    "Petitioning for Medical Recognition",
    "Policy framing, evidence packaging, and stakeholder strategy.",
    "Petitioning for Medical Recognition",
    "A practical framework for proposing formal medical recognition pathways.",
    "mdi:file-sign",
    medicalRecognitionSections
  ),
  createDoc(
    "stages-of-ai-psychosis",
    "Stages of AI Psychosis",
    "A staged progression model from priming through crisis.",
    "Stages of AI Psychosis",
    "A structured progression model to support triage and intervention timing.",
    "mdi:stairs",
    aiPsychosisStagesSections
  ),
];

export const aiSupportGroupSpace: DocSpace = {
  id: spaceId,
  title: "AI Support Group",
  description: "Current AI psychosis documentation, now organized as one dedicated space.",
  href: `/spaces/${spaceId}`,
  cardIcon: "mdi:folder-multiple-outline",
  docs: aiSupportGroupDocs,
};
