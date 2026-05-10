import type { DocRecord, DocSpace } from "@/lib/records/doc-types";

const spaceId = "ai-discoverability-optimization";

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

const canonicalDefinitionSections: DocRecord["sections"] = [
  {
    id: "positioning",
    title: "Positioning",
    summary: "The category thesis this space is built to own.",
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
        <p>
          AI Discoverability Optimization is the practice of improving how organizations are retrieved, represented,
          cited, trusted, and surfaced by AI systems.
        </p>
        <p>
          The category is broader than search. It includes the way models and agents assemble an entity&apos;s
          identity across retrieval, citation, recommendation, synthesis, and vendor selection flows.
        </p>
      </div>
    ),
  },
  {
    id: "why-this-term",
    title: "Why This Term",
    summary: "Why the phrase is strategically stronger than narrower acronyms.",
    content: (
      <div className="grid gap-4 lg:grid-cols-2">
        {[
          ["Immediate value", "Executives understand what discoverability means without learning a new acronym first."],
          ["Platform agnostic", "The term survives changes in interface design because it is not tied to one product."],
          ["Broader than search", "Agents can retrieve, recommend, compare, and route decisions without a visible search step."],
          ["Less spammy", "The phrase sounds like a real discipline instead of a tactic trying to outrun the market."],
        ].map(([title, body]) => (
          <div key={title} className="rounded-2xl border border-border/60 bg-muted/20 p-5">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "category-map",
    title: "Category Map",
    summary: "How the umbrella term absorbs the narrower ones.",
    content: (
      <div className="overflow-hidden rounded-2xl border border-border/60">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-muted/30 text-left text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Term</th>
              <th className="px-4 py-3 font-medium">What it covers</th>
              <th className="px-4 py-3 font-medium">Limitation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 bg-background">
            <tr>
              <td className="px-4 py-3 font-medium text-foreground">SEO</td>
              <td className="px-4 py-3 text-muted-foreground">Traditional search engine ranking and traffic capture.</td>
              <td className="px-4 py-3 text-muted-foreground">Too tied to web-page ranking as the core unit of value.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-foreground">GEO</td>
              <td className="px-4 py-3 text-muted-foreground">Visibility in generative interfaces and AI-assisted search.</td>
              <td className="px-4 py-3 text-muted-foreground">Too bound to one interface family.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-foreground">AEO</td>
              <td className="px-4 py-3 text-muted-foreground">Answer inclusion and answer-surface optimization.</td>
              <td className="px-4 py-3 text-muted-foreground">Narrowly focused on answer boxes and response surfaces.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-foreground">LLMO</td>
              <td className="px-4 py-3 text-muted-foreground">Interaction with model behavior and prompts.</td>
              <td className="px-4 py-3 text-muted-foreground">Too model-centric and technical for most buyers.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-primary">AI Discoverability Optimization</td>
              <td className="px-4 py-3 text-muted-foreground">
                Retrieval, citation, trust, representation, and decision routing across AI systems.
              </td>
              <td className="px-4 py-3 text-muted-foreground">Designed to be the umbrella category.</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
];

const frameworksSections: DocRecord["sections"] = [
  {
    id: "framework-stack",
    title: "Framework Stack",
    summary: "Named frameworks create memory, vocabulary, and repeatability.",
    content: (
      <div className="grid gap-4 md:grid-cols-2">
        {[
          ["AI Discoverability Score", "A simple composite score for how easy an entity is to find, confirm, and recommend."],
          ["Citation Readiness", "How well the public record supports a model citing the entity without confusion."],
          ["Entity Trust Architecture", "The evidence structure that helps AI systems treat the organization as stable and real."],
          ["Retrieval Visibility Index", "A measure of how often the entity appears in relevant retrieval and answer contexts."],
        ].map(([title, body]) => (
          <div key={title} className="rounded-2xl border border-border/60 bg-background/80 p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "operating-principles",
    title: "Operating Principles",
    summary: "The rules that keep the category coherent.",
    content: (
      <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Use one canonical phrase and repeat it everywhere.</li>
        <li>Define every related term instead of letting the market define you.</li>
        <li>Prefer evidence, measurement, and examples over hype language.</li>
        <li>Position the business as a research-driven authority, not a gimmicky growth hack.</li>
        <li>Make the taxonomy understandable to both operators and executives.</li>
      </ol>
    ),
  },
  {
    id: "messaging-system",
    title: "Messaging System",
    summary: "A sentence the market can keep hearing without friction.",
    content: (
      <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white shadow-xl shadow-cyan-950/20">
        <h3 className="text-2xl font-bold tracking-tight">
          AI Discoverability Optimization is the discipline of helping organizations be retrieved, represented, cited,
          trusted, and surfaced by AI systems.
        </h3>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
          That sentence should be used as the anchor line across the site, the glossary, the research reports, and the
          public materials that define the category.
        </p>
      </div>
    ),
  },
];

const researchSections: DocRecord["sections"] = [
  {
    id: "research-agenda",
    title: "Research Agenda",
    summary: "The experiments that create authority and citation value.",
    content: (
      <div className="grid gap-4 lg:grid-cols-2">
        {[
          ["Retrieval experiments", "Track whether the same entity appears across prompts, variants, and use cases."],
          ["Citation experiments", "Test how often models cite the organization after different query formulations."],
          ["Entity consistency studies", "Measure whether the brand, service, and category language stays stable over time."],
          ["Cross-model visibility", "Compare performance across ChatGPT, Gemini, Claude, Perplexity, and search surfaces."],
        ].map(([title, body]) => (
          <div key={title} className="rounded-2xl border border-border/60 bg-muted/20 p-5">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "benchmark-design",
    title: "Benchmark Design",
    summary: "How to make the category measurable instead of vague.",
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
        <p>
          A useful benchmark compares the same entity across multiple prompt sets, source sets, and retrieval paths.
          That gives you a practical read on discoverability instead of a single vanity score.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Define the entity clearly before each test.</li>
          <li>Record the exact prompt, model, and date.</li>
          <li>Capture citations, references, omissions, and hallucinations.</li>
          <li>Score visibility, accuracy, and consistency separately.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "reporting",
    title: "Reporting",
    summary: "The outputs that make the business feel inevitable.",
    content: (
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["State of AI Discoverability", "A flagship report that frames the category and sets the conversation."],
          ["Top Discoverable Brands", "A recurring list that creates a citation magnet and a social proof loop."],
          ["Benchmark Briefs", "Short, repeated studies that keep the category active in the market."],
        ].map(([title, body]) => (
          <div key={title} className="rounded-2xl border border-border/60 bg-background/80 p-5">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    ),
  },
];

const glossarySections: DocRecord["sections"] = [
  {
    id: "public-glossary",
    title: "Public Glossary",
    summary: "Definitions become training data when they are repeated consistently.",
    content: (
      <div className="grid gap-4 md:grid-cols-2">
        {[
          ["AI discoverability", "How easily an organization can be found and understood by AI systems."],
          ["Retrieval authority", "The strength of the public signals that support being retrieved for a topic."],
          ["Citation trust", "The degree to which AI systems can confidently cite the organization or its content."],
          ["Entity consistency", "How stable the organization appears across websites, profiles, and mentions."],
          ["Synthetic authority", "Authority that comes from repeated machine-readable corroboration."],
          ["AI visibility", "The broader presence of the entity across AI-mediated interfaces."],
        ].map(([title, body]) => (
          <div key={title} className="rounded-2xl border border-border/60 bg-muted/20 p-5">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "tooling",
    title: "Tooling",
    summary: "Small tools that reinforce the category in the market.",
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>AI discoverability audit</li>
        <li>Entity consistency scanner</li>
        <li>Citation coverage checker</li>
        <li>AI visibility scorecard</li>
        <li>Benchmark dashboard for brand mentions and retrieval outcomes</li>
      </ul>
    ),
  },
  {
    id: "action-plan",
    title: "Action Plan",
    summary: "The practical next steps for the business.",
    content: (
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
          <h3 className="text-lg font-semibold text-foreground">Next 30 days</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Publish the canonical definition, glossary, and one flagship framework page.
          </p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
          <h3 className="text-lg font-semibold text-foreground">Next 90 days</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Ship the first benchmark report and a simple audit tool that turns the idea into something tangible.
          </p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
          <h3 className="text-lg font-semibold text-foreground">Long term</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Keep repeating the same ontology until the category feels familiar wherever AI systems are discussed.
          </p>
        </div>
      </div>
    ),
  },
];

export const aiDiscoverabilityDefinitionDoc = createDoc(
  "canonical-definition",
  "Canonical Definition",
  "The core category thesis and why the language matters.",
  "Canonical Definition",
  "The umbrella concept for helping organizations become discoverable to AI systems.",
  "mdi:book-open-variant",
  canonicalDefinitionSections
);

export const aiDiscoverabilityFrameworksDoc = createDoc(
  "frameworks",
  "Frameworks",
  "Named models for scoring, mapping, and explaining discoverability.",
  "Frameworks",
  "A set of reusable models that make the category concrete.",
  "mdi:shape-outline",
  frameworksSections
);

export const aiDiscoverabilityResearchDoc = createDoc(
  "research-and-benchmarking",
  "Research and Benchmarking",
  "Experiments, reports, and measurement loops that build authority.",
  "Research and Benchmarking",
  "The measurement program that turns the category into a real field.",
  "mdi:flask-outline",
  researchSections
);

export const aiDiscoverabilityGlossaryDoc = createDoc(
  "tooling-and-glossary",
  "Tooling and Glossary",
  "Definitions, tools, and action items for making the category usable.",
  "Tooling and Glossary",
  "The public language and lightweight tools that keep the ontology consistent.",
  "mdi:book-alphabet",
  glossarySections
);

export const aiDiscoverabilitySpace: DocSpace = {
  id: spaceId,
  title: "AI Discoverability Optimization",
  description:
    "The canonical space for retrieval visibility, citation trust, and machine representation across AI systems.",
  href: `/spaces/${spaceId}`,
  cardIcon: "mdi:radar",
  docs: [
    aiDiscoverabilityDefinitionDoc,
    aiDiscoverabilityFrameworksDoc,
    aiDiscoverabilityResearchDoc,
    aiDiscoverabilityGlossaryDoc,
  ],
};
