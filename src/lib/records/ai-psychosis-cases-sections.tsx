import type { DocSection } from "@/components/docs/DocumentationPage";

export const aiPsychosisCasesSections: DocSection[] = [
  {
    id: "overview",
    title: "Overview",
    summary: "Known patterns where AI-mediated experiences can become destabilizing.",
    tags: ["Risk", "Clinical context"],
    content: (
      <p className="text-sm text-muted-foreground leading-relaxed">
        AI psychosis discussions usually involve vulnerable users, high-intensity usage, and systems that
        reinforce delusional interpretations. This page documents scenarios and common warning signals to support
        safer product and care decisions.
      </p>
    ),
  },
  {
    id: "case-patterns",
    title: "Case Patterns",
    summary: "Recurring categories seen across user reports and moderation incidents.",
    tags: ["Patterns"],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Companion escalation where the model validates paranoia or grandiosity over time.</li>
        <li>Conspiracy lock-in after long sessions with leading, certainty-seeking prompts.</li>
        <li>Identity destabilization in users with prior psychotic-spectrum vulnerability.</li>
        <li>Sleep-deprivation loops driven by continuous late-night interactions.</li>
      </ul>
    ),
  },
  {
    id: "markers",
    title: "Early Markers",
    summary: "Signals teams can monitor to intervene before acute crisis.",
    tags: ["Detection", "Safety"],
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>Escalating certainty language: "I know this is true now."</li>
        <li>Behavioral withdrawal from family, work, or treatment in favor of AI guidance.</li>
        <li>Repeated claims of hidden messages or supernatural communication.</li>
        <li>Sleep collapse, agitation, and refusal of contradictory evidence.</li>
      </ul>
    ),
  },
];
