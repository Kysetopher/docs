import type { ReactNode } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReferenceChip } from "@/components/ui/reference-chip";
import { Button } from "@/components/ui/button";
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

export function TalentAgencyProductsServicesBody() {
  const productFamilies: BusinessPlanCardSpec[] = [
    {
      title: "Live Human Presence",
      eyebrow: "Physical service",
      bullets: [
        "Event hosts, brand ambassadors, demo staff, and launch presence",
        "Client-facing representation in rooms, stages, booths, and site visits",
        "Sector-specific talent placed into live moments",
      ],
      footer: "The client buys a person who can show up and represent the brand live.",
    },
    {
      title: "Branded Digital Presence",
      eyebrow: "Synthetic service",
      bullets: [
        "Licensed LoRA or profile-based brand presence",
        "Scheduled social posting and content generation",
        "Digital continuity when the talent is not physically present",
      ],
      footer:
        "This extends a talent profile into a managed brand asset online.",
    },
  ];

  return (
    <div className="space-y-5">
      <Card className="rounded-none border-border/40 bg-background/40 backdrop-blur">
        <CardHeader className="border-b border-border/40 pb-4">
          <CardTitle className="text-lg font-semibold">External Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-4 text-sm leading-6 text-muted-foreground">
          <p>Live human presence and branded digital presence.</p>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        {productFamilies.map((card) => (
          <BusinessPlanValueCard key={card.title} spec={card} className="border-border/40" />
        ))}
      </div>
    </div>
  );
}

export function TalentAgencyCustomerExperienceSurface() {
  return (
    <div className="relative min-h-[88vh] overflow-hidden bg-black text-white">
      <img
        src="/talent-agency/customer-experience-collage.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.55)_100%)]" />
      <div className="absolute inset-0 flex items-end p-6 sm:p-8 lg:p-12">
        <p className="max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Your personalized brand representative
        </p>
      </div>
    </div>
  );
}

type TalentAgencyCustomerExperienceFrameProps = {
  mode: "embedded" | "expanded";
};

export function TalentAgencyCustomerExperiencePageFrame({ mode }: TalentAgencyCustomerExperienceFrameProps) {
  const overlayButton =
    mode === "expanded" ? (
      <Button
        asChild
        variant="outline"
        size="icon"
        className="rounded-none border-white/15 bg-white/5 text-white hover:bg-white/10"
      >
        <Link to="/spaces/talent-agency" aria-label="Back to space">
          <Icon icon="mdi:arrow-left" className="h-4 w-4" />
        </Link>
      </Button>
    ) : (
      <Button
        asChild
        variant="outline"
        size="icon"
        className="rounded-none border-white/15 bg-white/5 text-white hover:bg-white/10"
      >
        <Link to="/spaces/talent-agency/customer-experience" aria-label="Expand customer experience">
          <Icon icon="mdi:open-in-new" className="h-4 w-4" />
        </Link>
      </Button>
    );

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-foreground">
      <div className="absolute right-6 top-6 z-10 lg:right-10 lg:top-8">{overlayButton}</div>
      <TalentAgencyCustomerExperienceSurface />
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

const UPSKILL_PACKAGES = [
  {
    title: "Sector readiness",
    description: "Train talent on the buyer, language, risks, and service expectations for one target sector at a time.",
  },
  {
    title: "Brand autonomy",
    description: "Help talent own their image, profile, voice, and client-facing presence without depending on an agency for every move.",
  },
  {
    title: "Field performance",
    description: "Rehearse live scenarios, set standards, and certify talent for booths, demos, events, and other face-to-face moments.",
  },
] as const;

const UPSKILL_SERVICE_PHASES: BusinessPlanPhase[] = [
  {
    title: "Baseline",
    body: "Teach the common service floor: presentation, punctuality, professionalism, and client-safe behavior.",
  },
  {
    title: "Sector overlay",
    body: "Add the terminology, risks, and buyer expectations that are specific to one target sector.",
  },
  {
    title: "Scenario practice",
    body: "Rehearse the actual situations talent will face in the field, on stage, at a booth, or inside a client briefing.",
  },
  {
    title: "Certified deployment",
    body: "Only place talent into live work once they can demonstrate the required service standard.",
  },
];

export function TalentAgencyUpskillServicesBody() {
  return (
    <div className="space-y-5">
      <Card className="rounded-none border-border/40 bg-background/40 backdrop-blur">
        <CardHeader className="border-b border-border/40 pb-4">
          <CardTitle className="text-lg font-semibold">What the kit is</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-4 text-sm leading-6 text-muted-foreground">
          <p>Training packages for sector readiness, brand autonomy, and field performance.</p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {UPSKILL_PACKAGES.map((item) => (
          <Card key={item.title} className="rounded-none border-border/40 bg-background/30 backdrop-blur">
            <CardHeader className="border-b border-border/40 pb-4">
              <CardTitle className="text-base font-semibold">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 text-sm leading-6 text-muted-foreground">
              <p>{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-none border-border/40 bg-background/30 backdrop-blur">
        <CardHeader className="border-b border-border/40 pb-4">
          <CardTitle className="text-lg font-semibold">How it works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4 text-sm text-muted-foreground">
          <div className="rounded-xl border border-border/40 bg-background/20 p-4">
            <BusinessPlanPhasePath
              title="Training path"
              subtitle="A simple progression from general readiness to sector-specific deployment."
              phases={UPSKILL_SERVICE_PHASES}
            />
          </div>
          <ul className="list-disc space-y-2 pl-5 leading-6">
            <li>Train against one sector at a time.</li>
            <li>Use roleplay and rehearsal to turn knowledge into repeatable behavior.</li>
            <li>Certify talent before live deployment.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export type SectorServiceNeed = {
  superCategory: string;
  sector: string;
  serviceNeed: string;
  talentType: string;
  whyItDiffers: string;
};

export const SUPER_CATEGORY_ORDER = [
  "Consumer Trust & Brand",
  "Digital Intelligence & AI Infrastructure",
  "Frontier Science & Advanced Hardware",
  "Built Environment & Industrial Delivery",
  "Energy & Climate Infrastructure",
] as const;

export const TARGET_SECTOR_NEEDS: SectorServiceNeed[] = [
  {
    superCategory: "Consumer Trust & Brand",
    sector: "Nutrition",
    serviceNeed: "Product educators, sampling support, recipe/content talent, and credible spokespersons.",
    talentType: "Consumer-facing brand trainers",
    whyItDiffers: "Needs trust, product explanation, and lifestyle-friendly presentation rather than pure glamour.",
  },
  {
    superCategory: "Consumer Trust & Brand",
    sector: "Lifestyle",
    serviceNeed: "Ambassadors, hosts, community builders, and social content talent.",
    talentType: "Brand and event presence",
    whyItDiffers: "Usually sells aspiration and audience connection, so the service is more community and media oriented.",
  },
  {
    superCategory: "Digital Intelligence & AI Infrastructure",
    sector: "AI Automation and Infrastructure",
    serviceNeed: "Technical evangelists, solution explainers, demo support, and workshop facilitators.",
    talentType: "Tech-facing presenters",
    whyItDiffers: "The buyer needs someone who can translate product complexity into business value.",
  },
  {
    superCategory: "Digital Intelligence & AI Infrastructure",
    sector: "Data Science",
    serviceNeed: "Analyst communicators, training facilitators, conference speakers, and research explainers.",
    talentType: "Technical educators",
    whyItDiffers: "The service has to sound credible to technical teams while still being understandable to business buyers.",
  },
  {
    superCategory: "Digital Intelligence & AI Infrastructure",
    sector: "Search Engine Technology",
    serviceNeed: "Product demo hosts, technical writers, search specialists, and launch support staff.",
    talentType: "Product and platform communicators",
    whyItDiffers: "Search companies need clear explanation of relevance, ranking, retrieval, and product performance.",
  },
  {
    superCategory: "Frontier Science & Advanced Hardware",
    sector: "Biotech and Medical products",
    serviceNeed: "Scientifically literate presenters, field trainers, conference support, and compliance-aware brand staff.",
    talentType: "Trust-heavy specialists",
    whyItDiffers: "This sector needs stronger accuracy, terminology control, and careful boundaries around claims.",
  },
  {
    superCategory: "Frontier Science & Advanced Hardware",
    sector: "Superconductor technology",
    serviceNeed: "Investor-facing explainers, lab-event support, technical demos, and frontier-tech storytellers.",
    talentType: "Deep-tech translators",
    whyItDiffers: "The category is highly technical, so the service is mostly about simplifying advanced science without diluting it.",
  },
  {
    superCategory: "Frontier Science & Advanced Hardware",
    sector: "Quantum and Photonic Computing",
    serviceNeed: "Research communicators, conference hosts, partnership support, and expert-facing presentation staff.",
    talentType: "Specialist technical talent",
    whyItDiffers: "The audience is often researchers, investors, or enterprise buyers who expect precision and sophistication.",
  },
  {
    superCategory: "Built Environment & Industrial Delivery",
    sector: "Construction & Civil Engineering",
    serviceNeed: "Site coordinators, safety briefers, project support, and client presentation staff.",
    talentType: "Field-ready operators",
    whyItDiffers: "This is more operational and site-based, so reliability and safety awareness matter more than aesthetic presentation alone.",
  },
  {
    superCategory: "Consumer Trust & Brand",
    sector: "Beauty products",
    serviceNeed: "Makeup artists, product educators, retail demo staff, and social-first content talent.",
    talentType: "Visual brand specialists",
    whyItDiffers: "Beauty relies heavily on demonstration, style, and repeatable consumer-facing product education.",
  },
  {
    superCategory: "Energy & Climate Infrastructure",
    sector: "Solar",
    serviceNeed: "Customer educators, technical sales support, installer trainers, and site survey support.",
    talentType: "Clean-tech field support",
    whyItDiffers: "Solar is part sales, part technical installation, so the service must bridge both buyer education and implementation.",
  },
  {
    superCategory: "Energy & Climate Infrastructure",
    sector: "Geothermal",
    serviceNeed: "Technical communicators, policy-aware sales support, field-event staff, and stakeholder education.",
    talentType: "Infrastructure translators",
    whyItDiffers: "Geothermal often needs more explanation around geology, permitting, and long-term infrastructure planning.",
  },
  {
    superCategory: "Energy & Climate Infrastructure",
    sector: "Mining",
    serviceNeed: "Site safety trainers, operational coordinators, stakeholder communicators, and technical support staff.",
    talentType: "Industrial field operators",
    whyItDiffers: "Mining is heavily operational and safety-sensitive, so the service needs stronger site discipline, logistics awareness, and compliance fluency.",
  },
  {
    superCategory: "Energy & Climate Infrastructure",
    sector: "Oil & Gas",
    serviceNeed: "Technical communicators, field support, conference staff, and stakeholder engagement talent.",
    talentType: "Industrial and policy-facing talent",
    whyItDiffers: "This sector often needs a mix of operational credibility, safety awareness, and public-facing professionalism.",
  },
  {
    superCategory: "Built Environment & Industrial Delivery",
    sector: "Metals & Materials",
    serviceNeed: "Factory-facing training support, trade show talent, technical explainers, and account support staff.",
    talentType: "Industrial presenters",
    whyItDiffers: "The work is grounded in specs, production, and supply-chain reliability, so it needs practical rather than aspirational positioning.",
  },
  {
    superCategory: "Built Environment & Industrial Delivery",
    sector: "Semiconductor Manufacturing",
    serviceNeed: "Cleanroom-aware training support, recruiting/event talent, technical explainers, and employer-brand staff.",
    talentType: "Precision manufacturing support",
    whyItDiffers: "Semiconductor operations are high-precision and process-driven, so talent must understand discipline, accuracy, and process language.",
  },
  {
    superCategory: "Built Environment & Industrial Delivery",
    sector: "Aerospace & Aviation Manufacturing",
    serviceNeed: "Technical recruiters, demo support, client briefers, and conference staff.",
    talentType: "High-compliance industrial talent",
    whyItDiffers: "Aerospace needs more trust, process control, and technical literacy than most standard consumer sectors.",
  },
  {
    superCategory: "Built Environment & Industrial Delivery",
    sector: "Logistics & Supply Chain",
    serviceNeed: "Operations trainers, fulfillment communicators, customer success support, and event staff.",
    talentType: "Workflow coordinators",
    whyItDiffers: "The buyer cares about reliability, flow, and visibility across complex handoffs rather than brand gloss.",
  },
  {
    superCategory: "Energy & Climate Infrastructure",
    sector: "Agriculture & Agri-tech",
    serviceNeed: "Field educators, grower support, technical sales staff, and demo/event talent.",
    talentType: "Field-adjacent educators",
    whyItDiffers: "Agriculture is both operational and educational, so talent needs practical credibility and strong communication.",
  },
  {
    superCategory: "Consumer Trust & Brand",
    sector: "Retail & E-commerce",
    serviceNeed: "Brand ambassadors, livestream hosts, demo talent, and customer experience support.",
    talentType: "Commerce-facing presenters",
    whyItDiffers: "Retail and ecommerce rely on conversion, product storytelling, and trust at the point of sale.",
  },
  {
    superCategory: "Frontier Science & Advanced Hardware",
    sector: "Medtech",
    serviceNeed: "Clinical trainers, conference support, regulated product explainers, and stakeholder educators.",
    talentType: "Clinical-commercial hybrids",
    whyItDiffers: "Medtech blends medical accuracy with product education, so the service needs extra discipline and precision.",
  },
] as const;

export function TalentAgencyTargetSectorsBody() {
  return (
    <div className="space-y-5">
      <Card className="rounded-none border-border/40 bg-background/40 backdrop-blur">
        <CardHeader className="border-b border-border/40 pb-4">
          <CardTitle className="text-lg font-semibold">Why the sectors differ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-4 text-sm leading-6 text-muted-foreground">
          <p>
            These sectors do not buy the same service. Some need polished consumer-facing talent, some need technical
            explainers, and others need field-ready operators who can work inside regulated or highly structured
            environments.
          </p>
          <p>
            This doc is a working map for deciding what kind of training, scripts, and live support each sector
            actually needs.
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-none border-border/40 bg-cyan-500/5 backdrop-blur">
        <CardHeader className="border-b border-border/40 pb-4">
          <CardTitle className="text-lg font-semibold text-cyan-950">Practical takeaway</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-4 text-sm leading-6 text-muted-foreground">
          <p>
            The core difference across these sectors is whether the talent is being used to sell trust, explain
            complexity, support operations, or deliver premium brand presence.
          </p>
          <p>
            That means the upskill kit should not be one generic template. It should branch by sector so training
            matches the actual service the client is buying.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export function TalentAgencySectorNeedCard({ item }: { item: SectorServiceNeed }) {
  return (
    <Card className="rounded-none border-border/40 bg-background/40 backdrop-blur">
      <CardHeader className="border-b border-border/40 pb-4">
        <CardTitle className="text-base font-semibold">{item.sector}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-4 text-sm leading-6 text-muted-foreground">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground/70">Best-fit service</p>
          <p className="text-foreground/90">{item.serviceNeed}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground/70">Talent type</p>
          <p className="text-foreground/90">{item.talentType}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground/70">Why it differs</p>
          <p className="text-foreground/90">{item.whyItDiffers}</p>
        </div>
      </CardContent>
    </Card>
  );
}







