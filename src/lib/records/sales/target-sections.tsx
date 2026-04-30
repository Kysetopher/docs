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
  govtech: { id: "govtech", authors: "GovTech", title: "GovTech Singapore", note: "Government Technology Agency of Singapore, leading digital transformation.", photo: { src: institutionalImg }, href: "https://www.tech.gov.sg/", tags: [DOC_TAGS.government, DOC_TAGS.execution], painPoints: ["Talent Shortage", "Legacy Silos", "Interoperability"], sellingStrategy: "Focus on AI as a bridge for skills gaps. Position as the 'glue' for cross-agency data interoperability." },
  sndgo: { id: "sndgo", authors: "SNDGO", title: "Smart Nation Office", note: "Office under the Prime Minister's Office overseeing Smart Nation initiatives.", photo: { src: institutionalImg }, href: "https://www.smartnation.gov.sg/", tags: [DOC_TAGS.government, DOC_TAGS.policy], painPoints: ["Policy vs Execution Gap", "Legacy Tech Debt"], sellingStrategy: "Sell 'Operational Clarity' for policy implementations. Pivot from tech builder to revenue leakage plumber for digital services." },
  naic: { id: "naic", authors: "National AI", title: "National AI Centre", note: "Coordinating AI research and development across Singapore.", photo: { src: institutionalImg }, href: "https://www.aisingapore.org/", tags: [DOC_TAGS.research, DOC_TAGS.aiLabs], painPoints: ["Scaling Industry 4.0", "Data Privacy"], sellingStrategy: "Position as a deployment partner for AI agents in industrial use cases. Focus on secure, localized AI execution." },
  astar: { id: "astar", authors: "A*STAR", title: "A*STAR Singapore", note: "Singapore's lead public sector R&D agency.", photo: { src: institutionalImg }, href: "https://www.a-star.edu.sg/", tags: [DOC_TAGS.research, DOC_TAGS.government], painPoints: ["Technology Fatigue", "Research to Market Gap"], sellingStrategy: "Bridge the 'Research to Market' gap by providing a ready-to-use agentic framework for their spin-offs." },
  dsta: { id: "dsta", authors: "DSTA", title: "DSTA Singapore", note: "Implementing defence science and technology for Singapore's defence.", photo: { src: institutionalImg }, tags: [DOC_TAGS.defence, DOC_TAGS.execution], painPoints: ["Air-gapped Security", "Legacy Systems"], sellingStrategy: "Focus on edge AI and on-prem deployment. Sell 'Operational Reliability' in mission-critical environments." },
  dyson: { id: "dyson", authors: "Dyson", title: "Dyson Global", note: "Global technology company with global HQ in Singapore.", photo: { src: manufacturingImg }, href: "https://www.dyson.com.sg/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.innovation], painPoints: ["R&D Data Silos", "Supply Chain Complexity"], sellingStrategy: "Optimize R&D workflows. Use AI agents to unify disparate data streams from global manufacturing sites." },
  micron: { id: "micron", authors: "Micron", title: "Micron Tech", note: "Global leader in memory solutions with major Singapore fabs.", photo: { src: manufacturingImg }, href: "https://www.micron.com/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.semiconductors], painPoints: ["Yield Optimization", "Technical Talent Gap"], sellingStrategy: "Focus on 'Yield Ops'. Use agents to identify micro-inefficiencies in the cleanroom floor data that humans miss." },
  wohhup: { id: "wohhup", authors: "Woh Hup", title: "Woh Hup Singapore", note: "Singapore's largest privately owned construction specialist.", photo: { src: constructionImg }, href: "https://www.wohhup.com/", tags: [DOC_TAGS.construction, DOC_TAGS.execution], painPoints: ["Manual Site Reports", "Sub-contractor Chaos"], sellingStrategy: "Sell 'Site-to-Boardroom Clarity'. Automate the ingestion of fragmented sub-contractor reports into a unified dashboard." },
  tiongseng: { id: "tiongseng", authors: "Tiong Seng", title: "Tiong Seng Holdings", note: "Leader in pre-cast and sustainable construction.", photo: { src: constructionImg }, href: "https://www.tiongseng.com.sg/", tags: [DOC_TAGS.construction, DOC_TAGS.innovation], painPoints: ["Factory to Site Sync", "Logistics Fragmentation"], sellingStrategy: "Focus on the supply chain. Use AI agents to synchronize pre-cast factory output with real-time site demand." },
  lumchang: { id: "lumchang", authors: "Lum Chang", title: "Lum Chang Holdings", note: "Major player in civil engineering and property development.", photo: { src: constructionImg }, href: "https://www.lumchang.com.sg/", tags: [DOC_TAGS.construction, DOC_TAGS.enterprise], painPoints: ["Legacy IT Debt", "Manual Compliance"], sellingStrategy: "Pitch 'Compliance Automation'. Reduce the man-hours spent on regulatory documentation and safety checks." },
  boustead: { id: "boustead", authors: "Boustead", title: "Boustead Singapore", note: "Global infrastructure-related engineering services.", photo: { src: constructionImg }, href: "https://www.boustead.sg/", tags: [DOC_TAGS.construction, DOC_TAGS.industrial], painPoints: ["Project Visibility", "Global Data Fragmentation"], sellingStrategy: "Sell 'Global Project Control'. Unify data from international projects into a single operational brain." },
  mbs: { id: "mbs", authors: "MBS", title: "Marina Bay Sands", note: "Iconic integrated resort and convention center.", photo: { src: hospitalityImg }, tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark], painPoints: ["Experience Fragmentation", "Guest Flow Optimization"], sellingStrategy: "Optimize 'High-Ticket Guest Experiences'. Use agents to predict and resolve friction in the VIP journey before it happens." },
  rws: { id: "rws", authors: "RWS", title: "Resorts World Sentosa", note: "Integrated resort on Sentosa Island.", photo: { src: hospitalityImg }, tags: [DOC_TAGS.hospitality, DOC_TAGS.entertainment], painPoints: ["Manual Upsell Mess", "Staff Attrition"], sellingStrategy: "Focus on 'Automated Revenue Upsells'. Reduce reliance on front-desk staff for booking experiential add-ons." },
  grab: { id: "grab", authors: "Grab", title: "Grab", note: "Southeast Asia's leading super-app.", photo: { src: institutionalImg }, href: "https://www.grab.com/", tags: [DOC_TAGS.company, DOC_TAGS.scale], painPoints: ["Algorithm Opacity", "Customer Service Load"], sellingStrategy: "Position as 'Internal Ops Optimization'. Use agents to handle internal vendor and merchant friction points." },
  sea: { id: "sea", authors: "Sea Ltd", title: "Sea Limited", note: "Global consumer internet company (Shopee, Garena).", photo: { src: institutionalImg }, href: "https://www.seagroup.com/", tags: [DOC_TAGS.company, DOC_TAGS.scale], painPoints: ["Global Supply Chain Chaos", "Market Fragmentation"], sellingStrategy: "Sell 'Market Entry Clarity'. Use agents to synthesize local market data and optimize logistics across fragmented regions." },
  singapore_gp: { id: "singapore_gp", authors: "F1 GP", title: "Singapore GP (F1)", note: "First night race in Formula One history.", photo: { src: eventsImg }, tags: [DOC_TAGS.events, DOC_TAGS.sports], painPoints: ["Logistics Spikes", "Temporary Staff Training"], sellingStrategy: "Sell 'Rapid Event Scaling'. Use agents to automate the onboarding and operational coordination of 10k+ temporary staff." },
  mbs_expo: { id: "mbs_expo", authors: "MBS Expo", title: "MBS Expo & Convention", note: "Asia's leading MICE venue.", photo: { src: eventsImg }, tags: [DOC_TAGS.events, DOC_TAGS.enterprise], painPoints: ["Venue Yield Optimization", "Fragmented Vendor Ops"], sellingStrategy: "Focus on 'Vendor Orchestration'. Use agents to automate the coordination between 50+ external vendors during major trade shows." },
  suntec: { id: "suntec", authors: "Suntec", title: "Suntec Singapore", note: "World-class convention and exhibition centre.", photo: { src: eventsImg }, tags: [DOC_TAGS.events, DOC_TAGS.enterprise], painPoints: ["Manual Booking Flow", "Inventory Inefficiency"], sellingStrategy: "Pitch 'Dynamic Venue Pricing'. Use agents to optimize room allocation and pricing based on real-time historical demand." },
  artbox: { id: "artbox", authors: "Artbox", title: "Artbox Singapore", note: "Largest creative night market in Singapore.", photo: { src: eventsImg }, tags: [DOC_TAGS.events, DOC_TAGS.culture] },
  airshow: { id: "airshow", authors: "Airshow", title: "Singapore Airshow", note: "Asia's most influential aerospace and defence exhibition.", photo: { src: eventsImg }, tags: [DOC_TAGS.events, DOC_TAGS.industrial] },

  // --- INDONESIA ---
  brin: { id: "brin", authors: "BRIN", title: "BRIN Indonesia", note: "National agency for research and innovation in Indonesia.", photo: { src: institutionalImg }, tags: [DOC_TAGS.research, DOC_TAGS.government], painPoints: ["Research Fragmentation", "Budget Inefficiency"], sellingStrategy: "Position as a 'Research Accelerator'. Use agents to unify data across disparate research institutes." },
  bobobox: { id: "bobobox", authors: "Bobobox", title: "Bobobox", note: "Tech-enabled capsule hotels. ICP: Multi-location, revenue ops problem.", photo: { src: hospitalityImg }, href: "https://bobobox.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.scale], painPoints: ["Manual Upsells", "Siloed Booking Data"], sellingStrategy: "Focus on 'Automated Upsell Orchestration'. Position as the revenue engine that connects their tech pods to experience bookings." },
  travelio: { id: "travelio", authors: "Travelio", title: "Travelio", note: "Property management platform. ICP: Revenue optimization at scale.", photo: { src: hospitalityImg }, href: "https://travelio.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.scale], painPoints: ["Maintenance Chaos", "Dynamic Pricing Mess"], sellingStrategy: "Pitch 'Operational Resilience'. Use agents to automate property maintenance routing and optimize rental yield dynamically." },
  artotel: { id: "artotel", authors: "ARTOTEL", title: "ARTOTEL Group", note: "Lifestyle hotel group with multi-brand fragmentation.", photo: { src: hospitalityImg }, href: "https://artotelgroup.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.enterprise], painPoints: ["Brand Fragmentation", "Manual Reporting"], sellingStrategy: "Sell 'Brand Consistency'. Use agents to unify guest experience and reporting across multiple hotel brands." },
  esb: { id: "esb", authors: "ESB", title: "ESB (Restaurant Infra)", note: "Restaurant infrastructure. ICP: Fragmented POS and ops layer.", photo: { src: manufacturingImg }, href: "https://esb.id", tags: [DOC_TAGS.industrial, DOC_TAGS.scale], painPoints: ["Siloed POS Data", "Inventory Leakage"], sellingStrategy: "Focus on 'Leakage Prevention'. Position as the intelligence layer that sits on top of their POS to automate inventory alerts." },
  bambu_indah: { id: "bambu_indah", authors: "Bambu Indah", title: "Bambu Indah (Ubud)", note: "Eco-luxury resort. ICP: Manual upsell, no unified system.", photo: { src: hospitalityImg }, href: "https://bambuindah.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark], painPoints: ["Manual Experiences", "Staff Overload"], sellingStrategy: "Pitch 'Experience Automation'. Replace manual WhatsApp/Excel booking of tours with an automated agent." },
  sanchaya: { id: "sanchaya", authors: "Sanchaya", title: "The Sanchaya (Bintan)", note: "Ultra-luxury estate. ICP: High-touch manual guest service.", photo: { src: hospitalityImg }, href: "https://thesanchaya.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.enterprise], painPoints: ["VIP Friction", "Siloed Guest Profiles"], sellingStrategy: "Sell 'Anticipatory Service'. Use agents to predict VIP needs by synthesizing data from past stays and current preferences." },
  atlas: { id: "atlas", authors: "Atlas", title: "Atlas Beach Club", note: "Large scale beach club. ICP: Dynamic pricing, multi-channel.", photo: { src: eventsImg }, href: "https://atlasbeachfest.com", tags: [DOC_TAGS.events, DOC_TAGS.entertainment], painPoints: ["Booking Peak Spikes", "Revenue Leakage"], sellingStrategy: "Focus on 'Peak Optimization'. Use agents to manage dynamic pricing and staff allocation during high-traffic events." },
  finns: { id: "finns", authors: "Finns", title: "Finns Bali", note: "Beach club group. ICP: Massive upsell potential, CRM mess.", photo: { src: eventsImg }, href: "https://finnsbali.com", tags: [DOC_TAGS.events, DOC_TAGS.entertainment], painPoints: ["Fragmented CRM", "Manual Upsell Processes"], sellingStrategy: "Sell 'Unified Membership Intelligence'. Connect their fragmented member data to drive automated, personalized upsells." },
  potato_head: { id: "potato_head", authors: "Potato Head", title: "Potato Head Beach Club", note: "Lifestyle brand. ICP: Integrated hospitality + events.", photo: { src: eventsImg }, href: "https://potatohead.co", tags: [DOC_TAGS.events, DOC_TAGS.culture] },
  ismaya: { id: "ismaya", authors: "Ismaya", title: "Ismaya Group", note: "Leading events venues. ICP: Multi-venue revenue leakage.", photo: { src: eventsImg }, href: "https://ismayagroup.com", tags: [DOC_TAGS.events, DOC_TAGS.scale] },
  bali_spirit: { id: "bali_spirit", authors: "Spirit Fest", title: "Bali Spirit Festival", note: "Wellness festival. ICP: Seasonal ops chaos.", photo: { src: eventsImg }, href: "https://balispiritfestival.com", tags: [DOC_TAGS.events, DOC_TAGS.culture] },
  wonderfruit: { id: "wonderfruit", authors: "Wonderfruit", title: "Wonderfruit", note: "Experiential festival. ICP: Ticket + experience fragmentation.", photo: { src: eventsImg }, href: "https://wonderfruit.co", tags: [DOC_TAGS.events, DOC_TAGS.landmark] },

  // --- THAILAND / MALAYSIA ---
  nia_t: { id: "nia_t", authors: "NIA Thailand", title: "Thailand Innovation Agency", note: "Promoting innovation and entrepreneurship in Thailand.", photo: { src: institutionalImg }, tags: [DOC_TAGS.innovation, DOC_TAGS.government], painPoints: ["Startup Ecosystem Silos", "Digital Literacy"], sellingStrategy: "Sell 'Ecosystem Orchestration'. Use agents to connect fragmented startups with corporate and government partners." },
  mdec: { id: "mdec", authors: "MDEC", title: "MDEC Malaysia", note: "Leading the digital economy in Malaysia.", photo: { src: institutionalImg }, href: "https://mdec.my/", tags: [DOC_TAGS.government, DOC_TAGS.execution], painPoints: ["Talent Shortage", "Digital Inequity"], sellingStrategy: "Focus on 'Human-in-the-Loop AI'. Position as the framework that empowers the Malaysian workforce with AI-augmented ops." },

  // --- JAPAN / KOREA ---
  kaist: { id: "kaist", authors: "KAIST", title: "KAIST Korea", note: "Leading research university in South Korea.", photo: { src: institutionalImg }, tags: [DOC_TAGS.research, DOC_TAGS.academic], painPoints: ["Interdisciplinary Silos", "Tech Transfer Speed"], sellingStrategy: "Sell 'Research Acceleration'. Use agents to identify and bridge technical gaps between disparate university labs and industry partners." },
  riken_aip: { id: "riken_aip", authors: "RIKEN AIP", title: "RIKEN AI Japan", note: "Leading AI research center in Japan.", photo: { src: institutionalImg }, tags: [DOC_TAGS.research, DOC_TAGS.aiLabs], painPoints: ["Implicit Knowledge Loss", "Research Silos"], sellingStrategy: "Focus on 'Knowledge Formalization'. Use agents to digitize the 'implicit knowledge' of veteran researchers before retirement." },
  obayashi: { id: "obayashi", authors: "Obayashi", title: "Obayashi Corp", note: "Japanese super general contractor.", photo: { src: constructionImg }, href: "https://www.obayashi.co.jp/en/", tags: [DOC_TAGS.construction, DOC_TAGS.industrial], painPoints: ["Paper-based Legacy", "Site Safety Management"], sellingStrategy: "Pitch 'Digital Twin Orchestration'. Use agents to unify real-time site data with BIM models, removing the need for manual reconciliation." },
  kajima: { id: "kajima", authors: "Kajima", title: "Kajima Corp", note: "Leading construction company with advanced R&D.", photo: { src: constructionImg }, href: "https://www.kajima.co.jp/english/", tags: [DOC_TAGS.construction, DOC_TAGS.industrial], painPoints: ["Labor Shortage", "Sub-contractor Coordination"], sellingStrategy: "Sell 'Automated Site Management'. Position as the digital foreman that coordinates fragmented sub-contractors." },
  toyota: { id: "toyota", authors: "Toyota", title: "Toyota Motors", note: "Global leader in automotive manufacturing.", photo: { src: manufacturingImg }, href: "https://global.toyota/en/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.automotive], painPoints: ["Mismatched Global Data", "Production Halt Risks"], sellingStrategy: "Focus on 'Predictive Resilience'. Use agents to unify global plant data and identify supply chain risks before they halt production." },
  data61: { id: "data61", authors: "Data61", title: "Data61 Australia", note: "CSIRO's data science and innovation arm.", photo: { src: institutionalImg }, href: "https://data61.csiro.au/", tags: [DOC_TAGS.research, DOC_TAGS.aiLabs], painPoints: ["Data Privacy Fears", "Scalable Deployment"], sellingStrategy: "Focus on 'Secure AI Deployment'. Use agents to provide a privacy-first sandbox for Australian government data." },
  lendlease: { id: "lendlease", authors: "Lendlease", title: "Lendlease Global", note: "Global real estate and construction group.", photo: { src: constructionImg }, href: "https://www.lendlease.com/", tags: [DOC_TAGS.construction, DOC_TAGS.realEstate], painPoints: ["Lifecycle Data Gaps", "Global Ops Fragmentation"], sellingStrategy: "Sell 'Full Lifecycle Visibility'. Connect construction data directly to property management via an automated agentic layer." },

  // --- EUROPE / UK ---
  locke: { id: "locke", authors: "Locke", title: "Locke Living", note: "Design-led aparthotels. ICP: Multi-city boutique ops.", photo: { src: hospitalityImg }, href: "https://lockeliving.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.enterprise], painPoints: ["Manual Multi-city Ops", "High Staff Turnover"], sellingStrategy: "Focus on 'Operational Resilience'. Position as the digital concierge that handles the routine ops tasks so their staff can focus on the brand experience." },
  hoxton: { id: "hoxton", authors: "Hoxton", title: "The Hoxton", note: "Boutique hotel group. ICP: Regional ops teams.", photo: { src: hospitalityImg }, href: "https://thehoxton.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark], painPoints: ["Experience Consistency", "Fragmented CRM"], sellingStrategy: "Sell 'Brand Standard Automation'. Use agents to ensure the 'Hoxton experience' is identical across all global locations." },
  secret_cinema: { id: "secret_cinema", authors: "Secret Cinema", title: "Secret Cinema", note: "Immersive events. ICP: Dynamic pricing chaos.", photo: { src: eventsImg }, href: "https://secretcinema.org", tags: [DOC_TAGS.events, DOC_TAGS.entertainment], painPoints: ["Inventory Chaos", "Dynamic Pricing Leakage"], sellingStrategy: "Pitch 'Dynamic Inventory Optimization'. Position as the intelligence layer that balances ticket supply with immersive experiential demand." },
  fever: { id: "fever", authors: "Fever", title: "Fever", note: "Experience platform. ICP: Conversion optimization layer.", photo: { src: eventsImg }, href: "https://feverup.com", tags: [DOC_TAGS.events, DOC_TAGS.scale] },
  dice: { id: "dice", authors: "Dice", title: "Dice", note: "Ticketing & events infra.", photo: { src: eventsImg }, href: "https://dice.fm", tags: [DOC_TAGS.events, DOC_TAGS.industrial] },
  we_are_fstvl: { id: "we_are_fstvl", authors: "FSTVL", title: "We Are FSTVL", note: "Dance music festival. ICP: Seasonal ops chaos.", photo: { src: eventsImg }, href: "https://wearefstvl.com", tags: [DOC_TAGS.events, DOC_TAGS.culture] },
  time_warp: { id: "time_warp", authors: "Time Warp", title: "Time Warp Festival", note: "Techno festival.", photo: { src: eventsImg }, href: "https://time-warp.de", tags: [DOC_TAGS.events, DOC_TAGS.culture] },
  collective: { id: "collective", authors: "Collective", title: "The Collective", note: "Co-living operator. ICP: Long-term guest ops.", photo: { src: constructionImg }, href: "https://thecollective.com", tags: [DOC_TAGS.realEstate, DOC_TAGS.enterprise] },
  habyt: { id: "habyt", authors: "Habyt", title: "Habyt", note: "EU coliving operator. ICP: Massive fragmented ops.", photo: { src: constructionImg }, href: "https://habyt.com", tags: [DOC_TAGS.realEstate, DOC_TAGS.scale] },
  node_living: { id: "node_living", authors: "Node", title: "Node Living", note: "Curated living. ICP: Community-led ops.", photo: { src: constructionImg }, href: "https://nodeliving.com", tags: [DOC_TAGS.realEstate, DOC_TAGS.innovation] },
  outsite: { id: "outsite", authors: "Outsite", title: "Outsite", note: "Remote living spaces.", photo: { src: constructionImg }, href: "https://outsite.co", tags: [DOC_TAGS.realEstate, DOC_TAGS.scale] },
  selina: { id: "selina", authors: "Selina", title: "Selina", note: "Lifestyle hospitality. ICP: Massive relevant ops mess.", photo: { src: hospitalityImg }, href: "https://selina.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.scale] },
  unplugged: { id: "unplugged", authors: "Unplugged", title: "Unplugged (UK)", note: "Off-grid cabins. ICP: Manual ops + CRM mess.", photo: { src: hospitalityImg }, href: "https://unplugged.rest", tags: [DOC_TAGS.hospitality, DOC_TAGS.culture] },
  canopy_stars: { id: "canopy_stars", authors: "Canopy", title: "Canopy & Stars", note: "Outdoor stays. ICP: Manual curation ops.", photo: { src: hospitalityImg }, href: "https://canopyandstars.co.uk", tags: [DOC_TAGS.hospitality, DOC_TAGS.innovation] },
  sawdays: { id: "sawdays", authors: "Sawday's", title: "Sawday's", note: "Boutique stays curator.", photo: { src: hospitalityImg }, href: "https://sawdays.co.uk", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark] },
  coolstays: { id: "coolstays", authors: "Coolstays", title: "Coolstays", note: "Unique stays aggregator.", photo: { src: hospitalityImg }, href: "https://coolstays.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.scale] },
  plum_guide: { id: "plum_guide", authors: "Plum Guide", title: "The Plum Guide", note: "Curated rentals. ICP: High-end manual guest management.", photo: { src: hospitalityImg }, href: "https://plumguide.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.realEstate] },
};

function ReferenceList({ ids }: { ids: (keyof typeof SALES_REFERENCES)[] }) {
  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {ids.map((id) => (
        <ReferenceChip key={id} refs={SALES_REFERENCES} id={id} />
      ))}
    </div>
  );
}

function CountrySections({
  country,
  infraInstitutional = [],
  infraManufacturing = [],
  infraConstruction = [],
  serviceHospitality = [],
  serviceEvents = []
}: {
  country: string,
  infraInstitutional?: (keyof typeof SALES_REFERENCES)[],
  infraManufacturing?: (keyof typeof SALES_REFERENCES)[],
  infraConstruction?: (keyof typeof SALES_REFERENCES)[],
  serviceHospitality?: (keyof typeof SALES_REFERENCES)[],
  serviceEvents?: (keyof typeof SALES_REFERENCES)[]
}) {
  return [
    {
      id: `${country}-infrastructure`,
      title: "Infrastructure",
      content: <SectorHeader title="Infrastructure" subtitle={`Institutional, Manufacturing, and Construction targets for ${country}.`} icon="mdi:office-building" gradientFrom="from-slate-900/40" gradientTo="to-slate-800/40" />,
      children: [
        { id: `${country}-institutional`, title: "Institutional", content: <ReferenceList ids={infraInstitutional} /> },
        { id: `${country}-manufacturing`, title: "Manufacturing", content: <ReferenceList ids={infraManufacturing} /> },
        { id: `${country}-construction`, title: "Construction", content: <ReferenceList ids={infraConstruction} /> },
      ].filter(s => (s.content as any).props.ids.length > 0)
    },
    {
      id: `${country}-service`,
      title: "Service",
      content: <SectorHeader title="Service" subtitle={`Hospitality and Events targets for ${country}.`} icon="mdi:account-group" gradientFrom="from-slate-900/40" gradientTo="to-slate-800/40" />,
      children: [
        { id: `${country}-hospitality`, title: "Hospitality", content: <ReferenceList ids={serviceHospitality} /> },
        { id: `${country}-events`, title: "Events", content: <ReferenceList ids={serviceEvents} /> },
      ].filter(s => (s.content as any).props.ids.length > 0)
    }
  ].filter(s => s.children.length > 0);
}

export const targetSectionsContent = [
  {
    id: "strategy-framework",
    title: "Strategic Framework",
    summary: "Winning positioning and ICP tiering for Innerflect.",
    content: <StrategyHero />,
  },
  {
    id: "singapore",
    title: "Singapore",
    content: <SingaporeHero />,
    children: CountrySections({
      country: "singapore",
      infraInstitutional: ["govtech", "sndgo", "naic", "astar", "dsta"],
      infraManufacturing: ["dyson", "micron"],
      infraConstruction: ["wohhup", "tiongseng", "lumchang", "boustead"],
      serviceHospitality: ["mbs", "rws", "grab", "sea"],
      serviceEvents: ["singapore_gp", "artbox", "airshow"]
    })
  },
  {
    id: "indonesia",
    title: "Indonesia",
    content: <IndonesiaHero />,
    children: CountrySections({
      country: "indonesia",
      infraInstitutional: ["brin", "nic_v"],
      infraManufacturing: ["esb"],
      serviceHospitality: ["bobobox", "travelio", "artotel", "amithya", "awanngroup", "anmon", "ar_hospitality", "bambu_indah", "sanchaya", "lombok_lodge", "revivo", "sarinbuana", "nikoi", "villas_bukit", "seminyak_hideaways", "bingin_hideaway", "gili_beach"],
      serviceEvents: ["atlas", "finns", "potato_head", "ismaya", "bali_spirit", "wonderfruit"]
    })
  },
  {
    id: "thailand-malaysia",
    title: "Thailand & Malaysia",
    content: <ThailandMalaysiaHero />,
    children: CountrySections({
      country: "thailand-malaysia",
      infraInstitutional: ["depa", "nia_t", "mdec"]
    })
  },
  {
    id: "japan-korea",
    title: "Japan & Korea",
    content: <JapanKoreaHero />,
    children: CountrySections({
      country: "japan-korea",
      infraInstitutional: ["riken_aip", "toyota"],
      infraManufacturing: ["toyota"],
      infraConstruction: ["obayashi", "kajima"]
    })
  },
  {
    id: "australia",
    title: "Australia",
    content: <AustraliaHero />,
    children: CountrySections({
      country: "australia",
      infraInstitutional: ["data61", "dstg"],
      infraConstruction: ["lendlease"]
    })
  },
  {
    id: "europe-uk",
    title: "Europe & UK",
    content: <EuropeHero />,
    children: CountrySections({
      country: "europe-uk",
      serviceHospitality: ["locke", "generator", "hoxton", "zoku", "citizenm", "yeotown", "audo", "wildfitness", "blue_marble", "collective", "habyt", "node_living", "outsite", "selina", "unplugged", "canopy_stars", "sawdays", "coolstays", "plum_guide"],
      serviceEvents: ["secret_cinema", "fever", "dice", "we_are_fstvl", "time_warp"]
    })
  },
];
