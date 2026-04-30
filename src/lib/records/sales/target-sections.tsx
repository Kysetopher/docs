import { ReferenceChip } from "@/components/ui/reference-chip";
import { DOC_TAGS } from "@/lib/records/tag-records";
import { IndonesiaHero } from "@/components/sales/sectors/IndonesiaHero";
import { EuropeHero } from "@/components/sales/sectors/EuropeHero";
import { StrategyHero } from "@/components/sales/sectors/StrategyHero";
import { SingaporeHero, ThailandMalaysiaHero, JapanKoreaHero, AustraliaHero } from "@/components/sales/sectors/RegionalHeros";
import { SectorHeader } from "@/components/sales/sectors/SectorHeader";

const institutionalImg = "/assets/sales/institutional.png";
const hospitalityImg = "/assets/sales/hospitality.png";
const eventsImg = "/assets/sales/events.png";
const constructionImg = "/assets/sales/construction.png";
const manufacturingImg = "/assets/sales/manufacturing.png";

const SALES_REFERENCES = {
  // --- SINGAPORE ---
  govtech: { id: "govtech", authors: "GovTech", title: "GovTech Singapore", note: "Massive raw input fragmentation. Signals are lost in agency-level silos.", photo: { src: institutionalImg }, href: "https://www.tech.gov.sg/", tags: [DOC_TAGS.government, DOC_TAGS.execution], painPoints: ["Signal Invisibility", "Legacy Silos"], sellingStrategy: "Sell 'Cross-Agency Execution Context'. Position as the control layer that normalizes raw inputs into actionable policy signals." },
  sndgo: { id: "sndgo", authors: "SNDGO", title: "Smart Nation Office", note: "Directing the digital operational layer of Singapore.", photo: { src: institutionalImg }, href: "https://www.smartnation.gov.sg/", tags: [DOC_TAGS.government, DOC_TAGS.policy], painPoints: ["Execution Gaps", "Governance Complexity"], sellingStrategy: "Focus on 'Intentional Signals'. Use agents to ensure policy intent is preserved across the entire digital implementation layer." },
  naic: { id: "naic", authors: "National AI", title: "National AI Centre", note: "Defining the generative control layer for Singapore's industry.", photo: { src: institutionalImg }, href: "https://www.aisingapore.org/", tags: [DOC_TAGS.research, DOC_TAGS.aiLabs] },
  astar: { id: "astar", authors: "A*STAR", title: "A*STAR Singapore", note: "Raw research inputs are siloed. Knowledge formalization is invisible.", photo: { src: institutionalImg }, href: "https://www.a-star.edu.sg/", tags: [DOC_TAGS.research, DOC_TAGS.government] },
  dsta: { id: "dsta", authors: "DSTA", title: "DSTA Singapore", note: "Mission-critical signals require absolute precision and air-gapped context.", photo: { src: institutionalImg }, href: "https://www.dsta.gov.sg/", tags: [DOC_TAGS.defence, DOC_TAGS.execution] },
  
  dyson: { id: "dyson", authors: "Dyson", title: "Dyson Global", note: "Fragmented R&D channels create high-cost drag. Signals are manual.", photo: { src: manufacturingImg }, href: "https://www.dyson.com.sg/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.innovation], painPoints: ["High-Cost Data Drag", "Manual Signal Analysis"], sellingStrategy: "Implement a 'Control Layer' for R&D. Normalize global manufacturing inputs into a central dataset to drive execution." },
  micron: { id: "micron", authors: "Micron Tech", note: "Yield signals are lost in the cleanroom floor noise. Costs are rising.", photo: { src: manufacturingImg }, href: "https://www.micron.com/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.semiconductors] },
  wohhup: { id: "wohhup", authors: "Woh Hup", title: "Woh Hup Singapore", note: "Sub-contractor inputs are non-normalized. Real site progress is invisible.", photo: { src: constructionImg }, href: "https://www.wohhup.com/", tags: [DOC_TAGS.construction, DOC_TAGS.execution], painPoints: ["Invisible Site Signals", "High-Cost Fragmentation"], sellingStrategy: "Consolidate toolsets into a single operational layer. Surface crucial site information to the executive teams in real-time." },

  // Hotels & Spas (SG)
  mbs: { id: "mbs", authors: "MBS", title: "Marina Bay Sands", note: "VIP intent signals are lost in massive guest flow noise. Experience is fragmented.", photo: { src: hospitalityImg }, href: "https://www.marinabaysands.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark], painPoints: ["Signal Fragmentation", "VIP Experience Leakage"], sellingStrategy: "Create a 'Central Execution Dataset' for high-ticket guests. Reduce hallucinations in service delivery with live domain context." },
  raffles: { id: "raffles", authors: "Raffles", title: "Raffles Hotel", note: "Invisible 'heritage' signals are trapped in manual butler memory. High-cost drag.", photo: { src: hospitalityImg }, href: "https://www.raffles.com/singapore/", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark], painPoints: ["Manual Knowledge Silos", "High-Cost Service Memory"], sellingStrategy: "Digitize 'Intuition'. Normalize butler knowledge into a control layer that surfaces intentional service signals." },

  // --- INDONESIA ---
  brin: { id: "brin", authors: "BRIN Indonesia", note: "Institutional signals are non-normalized across 80+ disparate research institutes.", photo: { src: institutionalImg }, href: "https://www.brin.go.id/", tags: [DOC_TAGS.research, DOC_TAGS.government] },
  
  // Hotels & Spas (ID)
  bobobox: { id: "bobobox", authors: "Bobobox", title: "Bobobox", note: "Tech pod signals are manual. Ops context is fragmented across locations.", photo: { src: hospitalityImg }, href: "https://bobobox.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.scale], painPoints: ["Manual Upsell Noise", "Siloed Ops Inputs"], sellingStrategy: "Deploy an 'Adaptive Operational Layer' to consolidate tech-pod signals into automated revenue execution." },
  artotel: { id: "artotel", authors: "ARTOTEL", title: "ARTOTEL Group", note: "Multi-brand noise makes guest signals invisible. High-cost brand drag.", photo: { src: hospitalityImg }, href: "https://artotelgroup.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.enterprise] },
  bambu_indah: { id: "bambu_indah", authors: "Bambu Indah", title: "Bambu Indah (Ubud)", note: "Ubud retreat signals are manual (WhatsApp/Excel). Ops are invisible.", photo: { src: hospitalityImg }, href: "https://bambuindah.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark], painPoints: ["WhatsApp Signal Noise", "Invisible Retreat Ops"], sellingStrategy: "Normalize raw retreat inputs. Consolidate fragmented guest requests into a central execution context." },
  aman: { id: "aman", authors: "Aman", title: "Aman Resorts", note: "High-ticket guest signals are trapped in manual, unrecorded memory. Fragile.", photo: { src: hospitalityImg }, href: "https://www.aman.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark], painPoints: ["Fragile Memory Silos", "Invisible VIP Intent"], sellingStrategy: "Sell 'Operational Memory'. Create a global control layer that normalizes VIP signals across all Aman sites." },
  yoga_barn: { id: "yoga_barn", authors: "Yoga Barn", title: "The Yoga Barn", note: "Festival signals are chaotic and non-normalized. High-cost operational drag.", photo: { src: hospitalityImg }, href: "https://www.theyogabarn.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.culture], painPoints: ["Festival Signal Chaos", "Manual Logistics Drag"], sellingStrategy: "Create an 'Event Pipeline'. Normalize raw logistics inputs into a single composable operational layer." },

  // --- EUROPE / UK ---
  locke: { id: "locke", authors: "Locke", title: "Locke Living", note: "Multi-city aparthotel noise. Real-time guest signals are invisible.", photo: { src: hospitalityImg }, href: "https://lockeliving.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.enterprise], painPoints: ["Invisible Multi-city Signals", "High-Cost Ops Noise"], sellingStrategy: "Deploy a 'Control Layer' to normalize multi-city raw inputs into a central dataset." },
  hoxton: { id: "hoxton", authors: "Hoxton", title: "The Hoxton", note: "Brand standard signals are fragmented. CRM context is non-normalized.", photo: { src: hospitalityImg }, href: "https://thehoxton.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark], painPoints: ["Fragmented Brand Signals", "CRM Hallucinations"], sellingStrategy: "Consolidate CRM and guest tools into a single operational layer with live domain context." },
  selina: { id: "selina", authors: "Selina", title: "Selina", note: "High-cost operational drag across massive, fragmented global locations.", photo: { src: hospitalityImg }, href: "https://selina.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.scale] },

  // --- JAPAN / KOREA ---
  riken_aip: { id: "riken_aip", authors: "RIKEN AIP", note: "Implicit research signals are invisible. Veteran knowledge is manual.", photo: { src: institutionalImg }, href: "https://aip.riken.jp/", tags: [DOC_TAGS.research, DOC_TAGS.aiLabs] },
  obayashi: { id: "obayashi", authors: "Obayashi", note: "Paper-based site signals create massive data gaps. Real progress is invisible.", photo: { src: constructionImg }, href: "https://www.obayashi.co.jp/en/", tags: [DOC_TAGS.construction, DOC_TAGS.industrial] },
};

function ReferenceList({ label, ids }: { label: string; ids: (keyof typeof SALES_REFERENCES)[] }) {
  if (!ids || ids.length === 0) return null;
  return (
    <div className="flex items-start gap-4 py-1">
      <div className="w-32 shrink-0 pt-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
        {label}
      </div>
      <div className="flex flex-wrap gap-2 flex-1">
        {ids.map((id) => (
          <ReferenceChip key={id} refs={SALES_REFERENCES} id={id} />
        ))}
      </div>
    </div>
  );
}

function CountrySections({
  country,
  infraInstitutional = [],
  infraManufacturing = [],
  infraConstruction = [],
  serviceHotelsSpas = [],
  serviceMarketplaces = [],
  serviceTravel = [],
  serviceEvents = []
}: {
  country: string,
  infraInstitutional?: (keyof typeof SALES_REFERENCES)[],
  infraManufacturing?: (keyof typeof SALES_REFERENCES)[],
  infraConstruction?: (keyof typeof SALES_REFERENCES)[],
  serviceHotelsSpas?: (keyof typeof SALES_REFERENCES)[],
  serviceMarketplaces?: (keyof typeof SALES_REFERENCES)[],
  serviceTravel?: (keyof typeof SALES_REFERENCES)[],
  serviceEvents?: (keyof typeof SALES_REFERENCES)[]
}) {
  return [
    {
      id: `${country}-infrastructure`,
      title: "Infrastructure",
      content: <SectorHeader title="Infrastructure" subtitle={`Auditing and mapping the highest-cost drag for ${country} infrastructure targets.`} icon="mdi:office-building" gradientFrom="from-slate-900/40" gradientTo="to-slate-800/40" minHeight="min-h-[180px]" />,
      children: [
        { id: `${country}-institutional`, title: "Institutional", content: <ReferenceList label="Institutional" ids={infraInstitutional} /> },
        { id: `${country}-manufacturing`, title: "Manufacturing", content: <ReferenceList label="Manufacturing" ids={infraManufacturing} /> },
        { id: `${country}-construction`, title: "Construction", content: <ReferenceList label="Construction" ids={infraConstruction} /> },
      ].filter(s => s.content !== null)
    },
    {
      id: `${country}-service`,
      title: "Service",
      content: <SectorHeader title="Service" subtitle={`Deploying control layers to normalize raw inputs for ${country} service targets.`} icon="mdi:account-group" gradientFrom="from-slate-900/40" gradientTo="to-slate-800/40" minHeight="min-h-[180px]" />,
      children: [
        { id: `${country}-hotels`, title: "Hotels & Spas", content: <ReferenceList label="Hotels & Spas" ids={serviceHotelsSpas} /> },
        { id: `${country}-travel`, title: "Travel", content: <ReferenceList label="Travel" ids={serviceTravel} /> },
        { id: `${country}-marketplaces`, title: "Marketplaces", content: <ReferenceList label="Marketplaces" ids={serviceMarketplaces} /> },
        { id: `${country}-events`, title: "Events", content: <ReferenceList label="Events" ids={serviceEvents} /> },
      ].filter(s => s.content !== null)
    }
  ].filter(s => s.children.length > 0);
}

export const targetSectionsContent = [
  {
    id: "strategy-framework",
    title: "Strategic Framework",
    summary: "Winning positioning and ICP tiering for Innerflect.",
    content: <StrategyHero isOpen={true} />,
  },
  {
    id: "singapore",
    title: "Singapore",
    content: <SingaporeHero isOpen={true} />,
    children: CountrySections({
      country: "singapore",
      infraInstitutional: ["govtech", "sndgo", "naic", "astar", "dsta"],
      infraManufacturing: ["dyson", "micron"],
      infraConstruction: ["wohhup"],
      serviceHotelsSpas: ["mbs", "raffles"],
    })
  },
  {
    id: "indonesia",
    title: "Indonesia",
    content: <IndonesiaHero />,
    children: CountrySections({
      country: "indonesia",
      infraInstitutional: ["brin"],
      serviceHotelsSpas: ["bobobox", "artotel", "bambu_indah", "sanchaya", "yoga_barn", "aman"],
    })
  },
  {
    id: "japan-korea",
    title: "Japan & Korea",
    content: <JapanKoreaHero />,
    children: CountrySections({
      country: "japan-korea",
      infraInstitutional: ["riken_aip"],
      infraConstruction: ["obayashi"],
    })
  },
  {
    id: "europe-uk",
    title: "Europe & UK",
    content: <EuropeHero />,
    children: CountrySections({
      country: "europe-uk",
      serviceHotelsSpas: ["locke", "hoxton", "selina"],
    })
  },
];
