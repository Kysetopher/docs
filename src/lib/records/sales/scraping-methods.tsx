import type { DocRecord } from "@/lib/records/doc-types";

const spaceId = "sales";
const docId = "scraping-methods";

export const scrapingMethodsSections: DocRecord["sections"] = [
  {
    id: "positioning",
    title: "Positioning",
    summary: "Use public, business-visible signals to find prospects faster.",
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
        <p>
          This page is about compliant lead sourcing, not pulling private data. The goal is to find businesses that
          already advertise themselves publicly and then move into a clean outreach workflow.
        </p>
        <p>
          A useful rule: if the data is not meant to be public, do not scrape it. Prefer business pages, websites,
          directories, marketplace listings, and official contact channels.
        </p>
      </div>
    ),
  },
  {
    id: "public-signals",
    title: "Public Signals",
    summary: "Where to look first when building lead lists.",
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Facebook business pages with public category, address, phone, or contact button details.</li>
        <li>Google Maps listings, local directories, and review sites.</li>
        <li>Company websites with forms, contact pages, and embedded booking widgets.</li>
        <li>Instagram bios, LinkedIn company pages, and public marketplace profiles.</li>
        <li>Posts, comments, and public replies that show who is active and currently engaged.</li>
      </ul>
    ),
  },
  {
    id: "whatsapp-rules",
    title: "WhatsApp Rules",
    summary: "Do not treat WhatsApp as a guaranteed field you can extract.",
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
        <p>
          Facebook scraping does not reliably give you WhatsApp numbers. Sometimes a business voluntarily publishes a
          WhatsApp contact button or link on its page, but that is a public business signal, not a guaranteed export.
        </p>
        <p>
          Do not try to infer, bypass, or harvest private personal numbers. If WhatsApp is part of the sales motion,
          use only contacts the business has intentionally exposed.
        </p>
      </div>
    ),
  },
  {
    id: "outreach",
    title: "Outreach",
    summary: "Move from list building into a measurable follow-up system.",
    content: (
      <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Capture the public source and the specific business signal that made the lead relevant.</li>
        <li>Qualify the lead by service area, business type, and whether they already have an obvious web presence.</li>
        <li>Use the channel the business actually publishes, then keep the message short and specific.</li>
        <li>Track replies, objections, and booked calls so the system improves instead of just growing noisy.</li>
      </ol>
    ),
  },
];

export const scrapingMethodsDoc: DocRecord = {
  id: docId,
  spaceId,
  href: `/spaces/${spaceId}/${docId}`,
  cardTitle: "Scraping Methods",
  cardDescription: "Public lead sources, WhatsApp limits, and compliant outreach rules.",
  cardIcon: "mdi:database-search-outline",
  header: {
    title: "Scraping Methods",
    description: "A compliant guide to finding public business signals without drifting into private-data collection.",
    icon: "mdi:database-search-outline",
  },
  sections: scrapingMethodsSections,
};
