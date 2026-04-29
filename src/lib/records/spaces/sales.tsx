import type { DocRecord, DocSpace } from "@/lib/records/doc-types";
import type { DocSection } from "@/components/docs/DocumentationPage";

const spaceId = "sales";

const salesPlaybookSections: DocSection[] = [
  {
    id: "positioning",
    title: "Positioning",
    summary: "What this space is for and how to use it.",
    content: (
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
        <p>
          Use this space as the starter home for sales notes, account plans, qualification criteria, and follow-up
          templates.
        </p>
        <p>
          Replace the placeholder guidance with your actual ICP, pipeline stages, and objection handling rules as the
          sales process evolves.
        </p>
      </div>
    ),
  },
  {
    id: "qualification",
    title: "Qualification",
    summary: "Baseline questions for deciding whether to spend more time.",
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Who owns the problem and what business outcome are they trying to change?</li>
        <li>What triggered the conversation now instead of six months ago?</li>
        <li>What is already in place, and what would make a win obvious?</li>
        <li>What constraints would block a short-term pilot or a broader rollout?</li>
      </ul>
    ),
  },
  {
    id: "discovery",
    title: "Discovery",
    summary: "A simple starting script for first meetings.",
    content: (
      <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Open with the problem statement in the buyer&apos;s language.</li>
        <li>Map the current workflow and where the friction shows up.</li>
        <li>Clarify decision makers, timeline, and procurement path.</li>
        <li>Close with the next concrete artifact or meeting.</li>
      </ol>
    ),
  },
  {
    id: "follow-up",
    title: "Follow-Up",
    summary: "Boilerplate after-call actions and next-step notes.",
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Send a recap with the customer problem, agreed priorities, and open risks.</li>
        <li>Attach the relevant case study, one-pager, or demo link.</li>
        <li>State the next checkpoint explicitly, including owner and date.</li>
        <li>Track anything unresolved so the deal never depends on memory alone.</li>
      </ul>
    ),
  },
];

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

export const salesDocs: DocRecord[] = [
  createDoc(
    "sales-playbook",
    "Sales Playbook",
    "Starter qualification, discovery, and follow-up notes.",
    "Sales Playbook",
    "Boilerplate sales documentation for discovery, qualification, and pipeline hygiene.",
    "mdi:briefcase-outline",
    salesPlaybookSections
  ),
];

export const salesSpace: DocSpace = {
  id: spaceId,
  title: "Sales",
  description: "A boilerplate sales space for playbooks, discovery notes, and follow-up templates.",
  href: `/spaces/${spaceId}`,
  cardIcon: "mdi:chart-line",
  docs: salesDocs,
};
