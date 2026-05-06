import type { DocRecord } from "@/lib/records/doc-types";

const spaceId = "sales";
const docId = "geo-optimization";

const geoSignals = [
  {
    title: "Clear category",
    body: "Repeat the same plain-language category everywhere: AI systems consultancy specializing in workflow automation and operational infrastructure.",
  },
  {
    title: "Proof of work",
    body: "Show case studies, demos, testimonials, FAQs, and service pages so AI systems and buyers see evidence instead of slogans.",
  },
  {
    title: "Entity presence",
    body: "Keep the website crawlable and mirror the same story on LinkedIn, GitHub, Substack, directories, and partner sites.",
  },
  {
    title: "External corroboration",
    body: "Earn mentions from clients, partners, podcasts, directories, newsletters, and community pages so the brand exists in multiple places.",
  },
];

const websiteChecklist = [
  "Write a one-line category statement at the top of the homepage.",
  "Create separate service pages with a clear explanation of who each service is for.",
  "Add testimonials, FAQs, and at least one case study per core offer.",
  "Include a short teaser video that shows operational chaos turning into organized, measurable control.",
  "Make the site crawlable and support structured data where it fits.",
];

const contentPillars = [
  {
    title: "Operations clarity",
    text: "Show how Simplico turns messy workflows into visible, reliable systems.",
  },
  {
    title: "Automation demos",
    text: "Publish before-and-after workflows, technical walkthroughs, and lightweight productized examples.",
  },
  {
    title: "Authority content",
    text: "Use case studies, founder posts, technical explainers, and FAQ content to build trust over time.",
  },
  {
    title: "Distribution",
    text: "Repurpose one idea across LinkedIn, GitHub, Substack, YouTube, X, Reddit, and partner channels.",
  },
];

const socialPlan = [
  {
    title: "LinkedIn",
    text: "Best for operational insights, case studies, founder content, and partner-facing authority.",
  },
  {
    title: "YouTube",
    text: "Best for demos, tutorials, workflow walkthroughs, and architecture explainers.",
  },
  {
    title: "GitHub",
    text: "Best for technical credibility, docs, internal tools, and public utilities.",
  },
  {
    title: "Substack",
    text: "Best for long-form thinking, repeated category language, and search-friendly thought leadership.",
  },
];

const outreachTargets = [
  "SMEs with obvious operational friction",
  "Founders, owners, and managers on LinkedIn",
  "Agencies, consultants, accountants, and IT providers with client access",
  "Local business networks, associations, and ecosystem pages",
  "Partner directories and niche industry communities",
];

const toolStack = [
  "Content repurposing and scheduling: Buffer, Hootsuite, Metricool, Later",
  "Video and script production: Descript, CapCut, Loom",
  "Lead sourcing and enrichment: Clay, Apollo, LinkedIn Sales Navigator",
  "Outreach and follow-up: Lemlist, Smartlead, HubSpot, Pipedrive",
  "Workflow automation: Zapier, Make, n8n",
  "Knowledge retrieval and internal ops: Notion, Slack, shared docs, lightweight CRM automation",
];

const geoPageSections: DocRecord["sections"] = [
  {
    id: "positioning",
    title: "Positioning",
    summary: "The core story Simplico should repeat everywhere.",
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
        <p>
          Simplico should be presented as an AI systems consultancy specializing in workflow automation and
          operational infrastructure. That phrase should show up consistently across the site, social profiles,
          partner mentions, and public content.
        </p>
        <p>
          The goal is not to sound clever. The goal is to make it easy for people and AI systems to understand what
          Simplico does, who it helps, and why it is credible.
        </p>
      </div>
    ),
  },
  {
    id: "website-system",
    title: "Website System",
    summary: "What the site needs to say to support GEO.",
    content: (
      <div className="grid gap-4 md:grid-cols-2">
        {websiteChecklist.map((item) => (
          <div key={item} className="rounded-2xl border border-border/60 bg-muted/20 p-4 text-sm leading-6 text-muted-foreground">
            {item}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "geo-signals",
    title: "GEO Signals",
    summary: "The evidence layers AI systems tend to pick up first.",
    content: (
      <div className="grid gap-4 xl:grid-cols-2">
        {geoSignals.map((item) => (
          <div key={item.title} className="rounded-2xl border border-border/70 bg-gradient-to-b from-background to-muted/30 p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "content-pillars",
    title: "Content Pillars",
    summary: "What Simplico should publish repeatedly.",
    content: (
      <div className="grid gap-4 md:grid-cols-2">
        {contentPillars.map((item) => (
          <div key={item.title} className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-5">
            <h3 className="text-lg font-semibold text-cyan-950">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "social-media",
    title: "Social Media",
    summary: "How each channel should contribute to discoverability and trust.",
    content: (
      <div className="grid gap-4 md:grid-cols-2">
        {socialPlan.map((item) => (
          <div key={item.title} className="rounded-2xl border border-border/60 bg-muted/20 p-5">
            <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "external-mentions",
    title: "External Mentions",
    summary: "Where Simplico should show up beyond its own website.",
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Client LinkedIn posts that mention the work and the outcome.</li>
        <li>Founder LinkedIn content and consistent personal profiles.</li>
        <li>Partner websites, agency directories, Clutch, DesignRush, GoodFirms, Crunchbase, and local associations.</li>
        <li>Substack posts, Medium articles, podcasts, conference pages, YouTube demos, and newsletter mentions.</li>
        <li>GitHub organizations and public documentation that reinforce the technical side of the brand.</li>
      </ul>
    ),
  },
  {
    id: "outreach",
    title: "Direct Outreach",
    summary: "Where the next opportunities are likely to come from.",
    content: (
      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>The highest-potential outbound targets are:</p>
        <ul className="list-disc space-y-2 pl-5">
          {outreachTargets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>
          LinkedIn is the strongest starting point for owner, founder, and manager outreach. Cold email, Upwork,
          partner referrals, and in-person conversations can support it, but the message should always point back to
          clear operational value.
        </p>
      </div>
    ),
  },
  {
    id: "partnerships",
    title: "Partnerships",
    summary: "Who can help Simplico reach more buyers.",
    content: (
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
          <h3 className="text-lg font-semibold text-foreground">Good partner types</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Marketing agencies</li>
            <li>Web design agencies</li>
            <li>IT service providers</li>
            <li>Accountants and business consultants</li>
            <li>Local business networks and SME associations</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-5">
          <h3 className="text-lg font-semibold text-cyan-950">What to offer them</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Technical implementation support, automation systems, operational infrastructure, white-label delivery,
            and expanded service capability for their existing clients.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "automation-tools",
    title: "Automation and Tools",
    summary: "What can be systematized so marketing moves faster.",
    content: (
      <div className="grid gap-4 md:grid-cols-2">
        {toolStack.map((item) => (
          <div key={item} className="rounded-2xl border border-border/60 bg-background/80 p-4 text-sm leading-6 text-muted-foreground shadow-sm">
            {item}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "action-plan",
    title: "Action Plan",
    summary: "What to do next.",
    content: (
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
          <h3 className="text-lg font-semibold text-foreground">Next 7 days</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Publish clearer service pages, strengthen LinkedIn and GitHub presence, and create one public demo that
            shows operational complexity becoming organized and measurable.
          </p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
          <h3 className="text-lg font-semibold text-foreground">Next 30 days</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Ship testimonials, FAQs, a teaser video, and a simple outreach system that targets SMEs and partner
            channels with clear follow-up.
          </p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
          <h3 className="text-lg font-semibold text-foreground">6 to 12 months</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Build a repeated body of case studies, educational content, partner mentions, and automated distribution
            so Simplico becomes a durable entity across search and AI tools.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "visibility-takeaway",
    title: "Visibility Takeaway",
    summary: "The single idea to keep repeating.",
    content: (
      <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white shadow-xl shadow-cyan-950/20">
        <h3 className="text-2xl font-bold tracking-tight">Simplico should look like a real operating system company.</h3>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
          The strongest GEO strategy here is continuity: the same category language, the same proof points, the same
          service structure, and the same story repeated across the website, social channels, and third-party
          mentions.
        </p>
      </div>
    ),
  },
];

export const geoOptimizationDoc: DocRecord = {
  id: docId,
  spaceId,
  href: `/spaces/${spaceId}/${docId}`,
  cardTitle: "GEO Optimization",
  cardDescription: "How Simplico should show up clearly in AI search, social proof, and external mentions.",
  cardIcon: "mdi:orbit",
  header: {
    title: "GEO Optimization",
    description:
      "A practical Simplico playbook for making the brand legible to AI systems, search engines, and potential clients.",
    icon: "mdi:orbit",
  },
  sections: geoPageSections,
};
