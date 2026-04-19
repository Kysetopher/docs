import type { DocSection, DocumentationHeader } from "@/components/docs/DocumentationPage";
import { aiPsychosisCasesSections } from "@/lib/records/ai-psychosis-cases-sections";
import { aiPsychosisProgramsFiguresSections } from "@/lib/records/ai-psychosis-programs-figures-sections";
import { aiPsychosisResearchSections } from "@/lib/records/ai-psychosis-research-sections";
import { aiPsychosisStagesSections } from "@/lib/records/ai-psychosis-stages-sections";
import { medicalRecognitionSections } from "@/lib/records/medical-recognition-sections";

export type DocRecord = {
  id: string;
  href: string;
  header: DocumentationHeader;
  cardTitle: string;
  cardDescription: string;
  cardIcon?: string;
  sections: DocSection[];
};

export const DOC_RECORDS: Record<string, DocRecord> = {
  "research-on-ai-psychosis": {
    id: "research-on-ai-psychosis",
    href: "/docs/research-on-ai-psychosis",
    cardTitle: "Research on AI Psychosis",
    cardDescription: "Core research questions, methods, and evidence gaps.",
    cardIcon: "mdi:flask-outline",
    header: {
      title: "Research on AI Psychosis",
      description: "A focused research agenda to move AI psychosis work from anecdote to reproducible evidence.",
      icon: "mdi:flask-outline",
    },
    sections: aiPsychosisResearchSections,
  },
  "current-programs-and-figures-in-ai-psychosis": {
    id: "current-programs-and-figures-in-ai-psychosis",
    href: "/docs/current-programs-and-figures-in-ai-psychosis",
    cardTitle: "Current Programs and Figures in AI Psychosis",
    cardDescription: "Active program models and the stakeholder landscape.",
    cardIcon: "mdi:account-group-outline",
    header: {
      title: "Current Programs and Figures in AI Psychosis",
      description: "A living landscape of active program types and the key figures driving this field.",
      icon: "mdi:account-group-outline",
    },
    sections: aiPsychosisProgramsFiguresSections,
  },
  "cases-of-ai-psychosis": {
    id: "cases-of-ai-psychosis",
    href: "/docs/cases-of-ai-psychosis",
    cardTitle: "Cases of AI Psychosis",
    cardDescription: "Documented patterns, markers, and practical warning signs.",
    cardIcon: "mdi:file-document-alert-outline",
    header: {
      title: "Cases of AI Psychosis",
      description: "Reference scenarios and early warning signals for AI-mediated psychotic risk.",
      icon: "mdi:file-document-alert-outline",
    },
    sections: aiPsychosisCasesSections,
  },
  "petitioning-for-medical-recognition": {
    id: "petitioning-for-medical-recognition",
    href: "/docs/petitioning-for-medical-recognition",
    cardTitle: "Petitioning for Medical Recognition",
    cardDescription: "Policy framing, evidence packaging, and stakeholder strategy.",
    cardIcon: "mdi:file-sign",
    header: {
      title: "Petitioning for Medical Recognition",
      description: "A practical framework for proposing formal medical recognition pathways.",
      icon: "mdi:file-sign",
    },
    sections: medicalRecognitionSections,
  },
  "stages-of-ai-psychosis": {
    id: "stages-of-ai-psychosis",
    href: "/docs/stages-of-ai-psychosis",
    cardTitle: "Stages of AI Psychosis",
    cardDescription: "A staged progression model from priming through crisis.",
    cardIcon: "mdi:stairs",
    header: {
      title: "Stages of AI Psychosis",
      description: "A structured progression model to support triage and intervention timing.",
      icon: "mdi:stairs",
    },
    sections: aiPsychosisStagesSections,
  },
};

export const DOC_RECORD_LIST = Object.values(DOC_RECORDS);
