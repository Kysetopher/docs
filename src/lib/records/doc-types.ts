import type { DocumentationHeader, DocSection } from "@/components/docs/DocumentationPage";

export type DocRecord = {
  id: string;
  spaceId: string;
  href: string;
  header: DocumentationHeader;
  cardTitle: string;
  cardDescription: string;
  cardIcon?: string;
  sections: DocSection[];
};

export type DocSpace = {
  id: string;
  title: string;
  description: string;
  href: string;
  cardIcon?: string;
  docs: DocRecord[];
};
