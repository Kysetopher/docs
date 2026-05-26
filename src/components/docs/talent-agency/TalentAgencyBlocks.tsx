import type { ReactNode } from "react";
import { Icon } from "@iconify/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReferenceChip } from "@/components/ui/reference-chip";
import { BusinessPlanPhasePath, BusinessPlanValueCard } from "@/components/docs/business-plan";
import type { BusinessPlanPhase, BusinessPlanReferenceMap, BusinessPlanCardSpec } from "@/components/docs/business-plan";

export type TalentAgencyReferenceId =
  | "bls_models_2024"
  | "creatoriq_state_creator_marketing_2024_2025"
  | "adobe_genai_consumers_2024"
  | "adobe_stock_creators_2024";

export type TalentAgencyReferenceMap = BusinessPlanReferenceMap<TalentAgencyReferenceId>;

export const TALENT_AGENCY_REFERENCE_IDS = {
  modelSupply: ["bls_models_2024"] as const,
  aiWorkflow: [
    "creatoriq_state_creator_marketing_2024_2025",
    "adobe_genai_consumers_2024",
    "adobe_stock_creators_2024",
  ] as const,
} as const;

export const TALENT_AGENCY_REFERENCE_COPY = {
  bls_models_2024:
    "The U.S. model occupation is small and declining, which pushes the business toward broader trained presence rather than pure runway-style staffing.",
  creatoriq_state_creator_marketing_2024_2025:
    "Creator workflows are already changing fast under AI pressure, which increases demand for people who can still represent premium brands credibly in person.",
  adobe_genai_consumers_2024:
    "Consumers are already using generative AI for images, but that does not remove the need for live trust and physical-world positioning.",
  adobe_stock_creators_2024:
    "Professional judgment and post-production still matter, which means the agency can position around human presence plus taste and context.",
} satisfies Record<TalentAgencyReferenceId, string>;

type ReferencePillRowProps = {
  refs: TalentAgencyReferenceMap;
  ids: readonly TalentAgencyReferenceId[];
};

function ReferencePillRow({ refs, ids }: ReferencePillRowProps) {
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      {ids.map((id) => (
        <ReferenceChip key={id} refs={refs} id={id} />
      ))}
    </span>
  );
}

type SignalPanelProps = {
  title: string;
  references: readonly TalentAgencyReferenceId[];
  refs: TalentAgencyReferenceMap;
  body: ReactNode;
};

function SignalPanel({ title, references, refs, body }: SignalPanelProps) {
  return (
    <Card className="rounded-none border-border/40 bg-background/30 backdrop-blur">
      <CardContent className="space-y-3 p-4 text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium text-foreground">{title}</p>
          <ReferencePillRow refs={refs} ids={references} />
        </div>
        <div className="leading-6">{body}</div>
      </CardContent>
    </Card>
  );
}

type TalentAgencySectionIntroProps = {
  title: string;
  summary: string;
  kicker?: string;
};

export function TalentAgencySectionIntro({ title, summary, kicker }: TalentAgencySectionIntroProps) {
  return (
    <Card className="rounded-none border-border/40 bg-background/40 backdrop-blur">
      <CardHeader className="space-y-2 border-b border-border/40 pb-4">
        {kicker ? <p className="text-xs uppercase tracking-wide text-muted-foreground">{kicker}</p> : null}
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 text-sm leading-6 text-muted-foreground">
        <p>{summary}</p>
      </CardContent>
    </Card>
  );
}

export function TalentAgencyMarketAnalysisBody({ refs }: { refs: TalentAgencyReferenceMap }) {
  const marketCards: BusinessPlanCardSpec[] = [
    {
      title: "AI will absorb commodity production",
      eyebrow: "Production layer",
      bullets: [
        "Stock photography and generic ecommerce shoots",
        "Low-end catalog work and background filler",
        "Fast-fashion asset generation and digital-only influencer loops",
      ],
      footer:
        "This is the pressure point that keeps the agency away from commodity booking and toward higher-trust human presence.",
    },
    {
      title: "Human presence still carries the premium signal",
      eyebrow: "Value layer",
      bullets: [
        "Attention, aspiration, and proximity",
        "Status transfer and emotional framing",
        "Cultural positioning in live settings",
      ],
      footer:
        "The product is not just a person; it is a credible social signal delivered in the room.",
    },
  ];

  const fitNotes = [
    "Trained on-site talent for frontier technology launches, premium hospitality, events, activations, and branded content moments.",
    "The buyer should feel they are purchasing credible human presence, not a generic model booking.",
  ];

  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-2">
        {marketCards.map((card) => (
          <BusinessPlanValueCard
            key={card.title}
            spec={card}
            className="border-border/40"
          />
        ))}
      </div>

      <SignalPanel
        title="Market signal"
        references={TALENT_AGENCY_REFERENCE_IDS.modelSupply}
        refs={refs}
        body={
          <p className="text-foreground/85">
            The U.S. model occupation is small and declining, so the agency should widen its definition of talent
            around trained presence, not just runway-style modeling.
          </p>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-none border-border/40 bg-background/30 backdrop-blur">
          <CardHeader className="border-b border-border/40 pb-4">
            <CardTitle className="text-lg font-semibold">Positioning frame</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-4 text-sm text-muted-foreground">
            <ul className="list-disc space-y-2 pl-5">
              {fitNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-none border-border/40 bg-cyan-500/5 backdrop-blur">
          <CardHeader className="border-b border-border/40 pb-4">
            <CardTitle className="text-lg font-semibold text-cyan-950">Why this wins</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-4 text-sm text-muted-foreground">
            <p className="leading-6">
              AI can generate an image, but it cannot fully recreate the credibility of a real person standing in the
              right room, with the right social context, for the right buyer.
            </p>
            <p className="leading-6">
              The business should sell presence, trust, and context-sensitive representation.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function TalentAgencyBrandBody() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <Card className="rounded-none border-border/40 bg-background/40 backdrop-blur">
        <CardHeader className="border-b border-border/40 pb-4">
          <CardTitle className="text-lg font-semibold">What we sell</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-4 text-sm text-muted-foreground">
          <p className="leading-6">
            Trained personnel for frontier technology, premium hospitality, launches, conferences, activations, and
            branded content moments.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Technical ambassadors</li>
            <li>Event and convention staff</li>
            <li>Hospitality and luxury presence</li>
            <li>Influencer-grade social talent</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="rounded-none border-border/40 bg-background/30 backdrop-blur">
        <CardHeader className="border-b border-border/40 pb-4">
          <CardTitle className="text-lg font-semibold">How to say it</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-4 text-sm text-muted-foreground">
          <p className="leading-6">
            We provide trained people who can represent advanced products and premium brands with the right mix of
            presentation, social intelligence, and basic technical fluency.
          </p>
          <p className="leading-6 text-foreground/85">
            Buyers should hear “credible human presence” instead of “model booking.”
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export function TalentAgencyResearchBody({ refs }: { refs: TalentAgencyReferenceMap }) {
  const cards = [
    {
      title: "Models are a small, declining occupation",
      referenceIds: ["bls_models_2024"] as const,
      body:
        "The occupation is narrow enough that the agency should treat modeling as one expression of a broader service, not the entire category.",
    },
    {
      title: "AI is already embedded in creator workflows",
      referenceIds: [
        "creatoriq_state_creator_marketing_2024_2025",
        "adobe_genai_consumers_2024",
      ] as const,
      body:
        "Brands and consumers are adopting AI for content creation, which makes live trust and human positioning more valuable, not less.",
    },
    {
      title: "Premium content still needs judgment",
      referenceIds: ["adobe_stock_creators_2024"] as const,
      body:
        "The best content still depends on taste, framing, and situational judgment, which supports a high-end human services layer.",
    },
  ] satisfies Array<{
    title: string;
    referenceIds: readonly TalentAgencyReferenceId[];
    body: string;
  }>;

  const phases: BusinessPlanPhase[] = [
    {
      title: "Hobby",
      body: "Useful for testing the positioning and learning the buyer language.",
    },
    {
      title: "Niche professional",
      body: "Sell trained presence for a few repeatable event and brand contexts.",
    },
    {
      title: "Premium operator",
      body: "Expand into recurring placements, premium hospitality, and launch support.",
    },
    {
      title: "Category layer",
      body: "Position the agency as a trusted human signal platform, not just a booking source.",
    },
  ];

  return (
    <div className="space-y-5">
      <div className="grid gap-4 xl:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.title} className="rounded-none border-border/40 bg-background/40 backdrop-blur">
            <CardHeader className="border-b border-border/40 pb-4">
              <CardTitle className="text-lg font-semibold">{card.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <ReferencePillRow refs={refs} ids={card.referenceIds} />
              </div>
              <p className="text-sm leading-6 text-muted-foreground">{card.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-none border-border/40 bg-background/30 backdrop-blur">
        <CardHeader className="border-b border-border/40 pb-4">
          <CardTitle className="text-lg font-semibold">Research takeaway</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4 text-sm text-muted-foreground">
          <p className="leading-6">
            The agency wins by supplying trained human presence where AI output stops being persuasive.
          </p>
          <div className="rounded-xl border border-border/40 bg-background/20 p-4">
            <div className="flex items-center gap-2 text-foreground">
              <Icon icon="mdi:arrow-right" className="h-4 w-4" />
              <span className="font-medium">Go-to-market path</span>
            </div>
            <div className="mt-4">
              <BusinessPlanPhasePath
                title="Service maturity path"
                subtitle="How the category can expand from one-off staffing into a repeatable premium service line."
                phases={phases}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
