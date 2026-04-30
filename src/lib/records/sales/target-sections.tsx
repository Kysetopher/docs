import { ReferenceChip } from "@/components/ui/reference-chip";
import { DOC_TAGS } from "@/lib/records/tag-records";
import { IndonesiaHero } from "@/components/sales/sectors/IndonesiaHero";
import { EuropeHero } from "@/components/sales/sectors/EuropeHero";
import { StrategyHero } from "@/components/sales/sectors/StrategyHero";

const institutionalImg = "/assets/sales/institutional.png";
const hospitalityImg = "/assets/sales/hospitality.png";
const eventsImg = "/assets/sales/events.png";
const constructionImg = "/assets/sales/construction.png";
const manufacturingImg = "/assets/sales/manufacturing.png";

const SALES_REFERENCES = {
  // --- SINGAPORE ---
  govtech: { id: "govtech", authors: "GovTech", title: "GovTech Singapore", note: "Government Technology Agency of Singapore, leading digital transformation.", photo: { src: institutionalImg }, href: "https://www.tech.gov.sg/", tags: [DOC_TAGS.government, DOC_TAGS.execution] },
  sndgo: { id: "sndgo", authors: "SNDGO", title: "Smart Nation Office", note: "Office under the Prime Minister's Office overseeing Smart Nation initiatives.", photo: { src: institutionalImg }, href: "https://www.smartnation.gov.sg/", tags: [DOC_TAGS.government, DOC_TAGS.policy] },
  naic: { id: "naic", authors: "NAIC", title: "National AI Centre", note: "Coordinating AI research and development across Singapore.", photo: { src: institutionalImg }, href: "https://www.aisingapore.org/", tags: [DOC_TAGS.research, DOC_TAGS.aiLabs] },
  astar: { id: "astar", authors: "A*STAR", title: "A*STAR Singapore", note: "Singapore's lead public sector R&D agency.", photo: { src: institutionalImg }, href: "https://www.a-star.edu.sg/", tags: [DOC_TAGS.research, DOC_TAGS.government] },
  dsta: { id: "dsta", authors: "DSTA", title: "DSTA Singapore", note: "Implementing defence science and technology for Singapore's defence.", photo: { src: institutionalImg }, tags: [DOC_TAGS.defence, DOC_TAGS.execution] },
  dyson: { id: "dyson", authors: "Dyson", title: "Dyson Global", note: "Global technology company with global HQ in Singapore.", photo: { src: manufacturingImg }, href: "https://www.dyson.com.sg/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.innovation] },
  micron: { id: "micron", authors: "Micron", title: "Micron Tech", note: "Global leader in memory solutions with major Singapore fabs.", photo: { src: manufacturingImg }, href: "https://www.micron.com/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.semiconductors] },
  wohhup: { id: "wohhup", authors: "Woh Hup", title: "Woh Hup Singapore", note: "Singapore's largest privately owned construction specialist.", photo: { src: constructionImg }, href: "https://www.wohhup.com/", tags: [DOC_TAGS.construction, DOC_TAGS.execution] },
  mbs: { id: "mbs", authors: "MBS", title: "Marina Bay Sands", note: "Iconic integrated resort and convention center.", photo: { src: hospitalityImg }, tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark] },
  rws: { id: "rws", authors: "RWS", title: "Resorts World Sentosa", note: "Integrated resort on Sentosa Island.", photo: { src: hospitalityImg }, tags: [DOC_TAGS.hospitality, DOC_TAGS.entertainment] },
  grab: { id: "grab", authors: "Grab", title: "Grab", note: "Southeast Asia's leading super-app.", photo: { src: institutionalImg }, href: "https://www.grab.com/", tags: [DOC_TAGS.company, DOC_TAGS.scale] },
  sea: { id: "sea", authors: "Sea Ltd", title: "Sea Limited", note: "Global consumer internet company (Shopee, Garena).", photo: { src: institutionalImg }, href: "https://www.seagroup.com/", tags: [DOC_TAGS.company, DOC_TAGS.scale] },
  singapore_gp: { id: "singapore_gp", authors: "F1 GP", title: "Singapore GP (F1)", note: "First night race in Formula One history.", photo: { src: eventsImg }, tags: [DOC_TAGS.events, DOC_TAGS.sports] },
  artbox: { id: "artbox", authors: "Artbox", title: "Artbox Singapore", note: "Largest creative night market in Singapore.", photo: { src: eventsImg }, tags: [DOC_TAGS.events, DOC_TAGS.culture] },
  airshow: { id: "airshow", authors: "Airshow", title: "Singapore Airshow", note: "Asia's most influential aerospace and defence exhibition.", photo: { src: eventsImg }, tags: [DOC_TAGS.events, DOC_TAGS.industrial] },

  // --- INDONESIA ---
  brin: { id: "brin", authors: "BRIN", title: "BRIN Indonesia", note: "National agency for research and innovation in Indonesia.", photo: { src: institutionalImg }, tags: [DOC_TAGS.research, DOC_TAGS.government] },
  nic_v: { id: "nic_v", authors: "NIC Vietnam", title: "Vietnam Innovation Center", note: "Facilitating innovation and startup ecosystem in Vietnam.", photo: { src: institutionalImg }, tags: [DOC_TAGS.innovation, DOC_TAGS.execution] }, // (Keeping Vietnam under Indo/Other for now)
  bobobox: { id: "bobobox", authors: "Bobobox", title: "Bobobox", note: "Tech-enabled capsule hotels. ICP: Multi-location, revenue ops problem.", photo: { src: hospitalityImg }, href: "https://bobobox.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.scale] },
  travelio: { id: "travelio", authors: "Travelio", title: "Travelio", note: "Property management platform. ICP: Revenue optimization at scale.", photo: { src: hospitalityImg }, href: "https://travelio.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.scale] },
  artotel: { id: "artotel", authors: "ARTOTEL", title: "ARTOTEL Group", note: "Lifestyle hotel group with multi-brand fragmentation.", photo: { src: hospitalityImg }, href: "https://artotelgroup.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.enterprise] },
  esb: { id: "esb", authors: "ESB", title: "ESB (Restaurant Infra)", note: "Restaurant infrastructure. ICP: Fragmented POS and ops layer.", photo: { src: manufacturingImg }, href: "https://esb.id", tags: [DOC_TAGS.industrial, DOC_TAGS.scale] },
  qraved: { id: "qraved", authors: "Qraved", title: "Qraved", note: "Food and experience platform. ICP: Multi-channel conversion optimization.", photo: { src: eventsImg }, href: "https://qraved.com", tags: [DOC_TAGS.events, DOC_TAGS.scale] },
  amithya: { id: "amithya", authors: "Amithya", title: "Amithya Hotels", note: "Hotel management group. ICP: Multi-location ops mess.", photo: { src: hospitalityImg }, href: "https://amithyahotels.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.enterprise] },
  awanngroup: { id: "awanngroup", authors: "AWANN", title: "AWANNGROUP", note: "Hospitality investment & dev. ICP: Portfolio-wide fragmentation.", photo: { src: hospitalityImg }, href: "https://awanngroup.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.realEstate] },
  anmon: { id: "anmon", authors: "ANMON", title: "ANMON Resort", note: "Eco desert resort. ICP: Experiential upsell focus.", photo: { src: hospitalityImg }, href: "https://theanmon.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark] },
  ar_hospitality: { id: "ar_hospitality", authors: "AR Hosp", title: "AR Hospitality", note: "Hospitality operator. ICP: Operational optimization for mid-size chains.", photo: { src: hospitalityImg }, href: "https://arhospitality.id", tags: [DOC_TAGS.hospitality, DOC_TAGS.enterprise] },
  bambu_indah: { id: "bambu_indah", authors: "Bambu Indah", title: "Bambu Indah (Ubud)", note: "Eco-luxury resort. ICP: Manual upsell, no unified system.", photo: { src: hospitalityImg }, href: "https://bambuindah.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark] },
  sanchaya: { id: "sanchaya", authors: "Sanchaya", title: "The Sanchaya (Bintan)", note: "Ultra-luxury estate. ICP: High-touch manual guest service.", photo: { src: hospitalityImg }, href: "https://thesanchaya.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.enterprise] },
  lombok_lodge: { id: "lombok_lodge", authors: "Lombok Lodge", title: "The Lombok Lodge", note: "Luxury lodge in Lombok. ICP: Reliance on experiences.", photo: { src: hospitalityImg }, href: "https://lomboklodge.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.execution] },
  revivo: { id: "revivo", authors: "Revivo", title: "Revivo Wellness Resort", note: "Wellness resort. ICP: Complex retreat schedules, manual chaos.", photo: { src: hospitalityImg }, href: "https://revivo.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.clinicalContext] },
  sarinbuana: { id: "sarinbuana", authors: "Sarinbuana", title: "Sarinbuana Eco Lodge", note: "Eco-lodge. ICP: High experience-led revenue potential.", photo: { src: hospitalityImg }, href: "https://sarinbuana.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.innovation] },
  nikoi: { id: "nikoi", authors: "Nikoi", title: "Nikoi Island", note: "Private island resort. ICP: Fragmented island-wide ops.", photo: { src: hospitalityImg }, href: "https://nikoi.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark] },
  villas_bukit: { id: "villas_bukit", authors: "Villas Bukit", title: "Villas Bukit Lipah", note: "Boutique villa operator. ICP: Manual ops.", photo: { src: hospitalityImg }, href: "https://villabukitlipah.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.realEstate] },
  seminyak_hideaways: { id: "seminyak_hideaways", authors: "Hideaways", title: "The Seminyak Hideaways", note: "Villa management. ICP: Fragmented PMS.", photo: { src: hospitalityImg }, href: "https://seminyakhideaways.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.realEstate] },
  bingin_hideaway: { id: "bingin_hideaway", authors: "Bingin", title: "Bingin Beach Hideaway", note: "Coastal boutique stay. ICP: Manual guest intake.", photo: { src: hospitalityImg }, href: "https://binginbeachhideaway.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.culture] },
  gili_beach: { id: "gili_beach", authors: "Gili Beach", title: "Gili Beach Houses", note: "Beachfront houses. ICP: Remote ops, manual booking mess.", photo: { src: hospitalityImg }, href: "https://gilibeachhouses.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.realEstate] },
  atlas: { id: "atlas", authors: "Atlas", title: "Atlas Beach Club", note: "Large scale beach club. ICP: Dynamic pricing, multi-channel.", photo: { src: eventsImg }, href: "https://atlasbeachfest.com", tags: [DOC_TAGS.events, DOC_TAGS.entertainment] },
  finns: { id: "finns", authors: "Finns", title: "Finns Bali", note: "Beach club group. ICP: Massive upsell potential, CRM mess.", photo: { src: eventsImg }, href: "https://finnsbali.com", tags: [DOC_TAGS.events, DOC_TAGS.entertainment] },
  potato_head: { id: "potato_head", authors: "Potato Head", title: "Potato Head Beach Club", note: "Lifestyle brand. ICP: Integrated hospitality + events.", photo: { src: eventsImg }, href: "https://potatohead.co", tags: [DOC_TAGS.events, DOC_TAGS.culture] },
  ismaya: { id: "ismaya", authors: "Ismaya", title: "Ismaya Group", note: "Leading events venues. ICP: Multi-venue revenue leakage.", photo: { src: eventsImg }, href: "https://ismayagroup.com", tags: [DOC_TAGS.events, DOC_TAGS.scale] },
  bali_spirit: { id: "bali_spirit", authors: "Spirit Fest", title: "Bali Spirit Festival", note: "Wellness festival. ICP: Seasonal ops chaos.", photo: { src: eventsImg }, href: "https://balispiritfestival.com", tags: [DOC_TAGS.events, DOC_TAGS.culture] },
  wonderfruit: { id: "wonderfruit", authors: "Wonderfruit", title: "Wonderfruit", note: "Experiential festival. ICP: Ticket + experience fragmentation.", photo: { src: eventsImg }, href: "https://wonderfruit.co", tags: [DOC_TAGS.events, DOC_TAGS.landmark] },

  // --- THAILAND / MALAYSIA ---
  depa: { id: "depa", authors: "DEPA", title: "DEPA Thailand", note: "Promoting digital economy in Thailand.", photo: { src: institutionalImg }, href: "https://www.depa.or.th/en/home", tags: [DOC_TAGS.government, DOC_TAGS.innovation] },
  nia_t: { id: "nia_t", authors: "NIA Thailand", title: "Thailand Innovation Agency", note: "Promoting innovation and entrepreneurship in Thailand.", photo: { src: institutionalImg }, tags: [DOC_TAGS.innovation, DOC_TAGS.government] },
  mdec: { id: "mdec", authors: "MDEC", title: "MDEC Malaysia", note: "Leading the digital economy in Malaysia.", photo: { src: institutionalImg }, href: "https://mdec.my/", tags: [DOC_TAGS.government, DOC_TAGS.execution] },

  // --- JAPAN / KOREA ---
  riken_aip: { id: "riken_aip", authors: "RIKEN AIP", title: "RIKEN AI Japan", note: "Leading AI research center in Japan.", photo: { src: institutionalImg }, tags: [DOC_TAGS.research, DOC_TAGS.aiLabs] },
  aist: { id: "aist", authors: "AIST", title: "AIST Japan", note: "Large scale public research organization in Japan.", photo: { src: institutionalImg }, tags: [DOC_TAGS.research, DOC_TAGS.industrial] },
  jst: { id: "jst", authors: "JST", title: "JST Japan", note: "Promoting science and technology in Japan.", photo: { src: institutionalImg }, tags: [DOC_TAGS.research, DOC_TAGS.government] },
  atla: { id: "atla", authors: "ATLA", title: "ATLA Japan", note: "Managing R&D for Japan's Ministry of Defense.", photo: { src: institutionalImg }, tags: [DOC_TAGS.defence, DOC_TAGS.government] },
  kaist: { id: "kaist", authors: "KAIST", title: "KAIST Korea", note: "Leading research university in South Korea.", photo: { src: institutionalImg }, tags: [DOC_TAGS.research, DOC_TAGS.academic] },
  obayashi: { id: "obayashi", authors: "Obayashi", title: "Obayashi Corp", note: "Japanese super general contractor.", photo: { src: constructionImg }, href: "https://www.obayashi.co.jp/en/", tags: [DOC_TAGS.construction, DOC_TAGS.industrial] },
  kajima: { id: "kajima", authors: "Kajima", title: "Kajima Corp", note: "Leading construction company with advanced R&D.", photo: { src: constructionImg }, href: "https://www.kajima.co.jp/english/", tags: [DOC_TAGS.construction, DOC_TAGS.industrial] },
  toyota: { id: "toyota", authors: "Toyota", title: "Toyota Motors", note: "Global leader in automotive manufacturing.", photo: { src: manufacturingImg }, href: "https://global.toyota/en/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.automotive] },
  tsmc: { id: "tsmc", authors: "TSMC", title: "TSMC Foundry", note: "World's largest semiconductor foundry.", photo: { src: manufacturingImg }, href: "https://www.tsmc.com/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.semiconductors] },

  // --- AUSTRALIA ---
  data61: { id: "data61", authors: "Data61", title: "Data61 Australia", note: "CSIRO's data science and innovation arm.", photo: { src: institutionalImg }, href: "https://data61.csiro.au/", tags: [DOC_TAGS.research, DOC_TAGS.aiLabs] },
  dstg: { id: "dstg", authors: "DSTG", title: "DSTG Australia", note: "Defence science and technology agency.", photo: { src: institutionalImg }, tags: [DOC_TAGS.defence, DOC_TAGS.research] },
  lendlease: { id: "lendlease", authors: "Lendlease", title: "Lendlease Global", note: "Global real estate and construction group.", photo: { src: constructionImg }, href: "https://www.lendlease.com/", tags: [DOC_TAGS.construction, DOC_TAGS.realEstate] },

  // --- EUROPE / UK ---
  locke: { id: "locke", authors: "Locke", title: "Locke Living", note: "Design-led aparthotels. ICP: Multi-city boutique ops.", photo: { src: hospitalityImg }, href: "https://lockeliving.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.enterprise] },
  generator: { id: "generator", authors: "Generator", title: "Generator Hostels", note: "Boutique hostel chain.", photo: { src: hospitalityImg }, href: "https://staygenerator.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.scale] },
  hoxton: { id: "hoxton", authors: "Hoxton", title: "The Hoxton", note: "Boutique hotel group. ICP: Regional ops teams.", photo: { src: hospitalityImg }, href: "https://thehoxton.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark] },
  zoku: { id: "zoku", authors: "Zoku", title: "Zoku", note: "Hybrid hotels. ICP: Manual ops + CRM mess.", photo: { src: hospitalityImg }, href: "https://livezoku.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.innovation] },
  citizenm: { id: "citizenm", authors: "citizenM", title: "citizenM", note: "Digital-first hotel chain.", photo: { src: hospitalityImg }, href: "https://citizenm.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.scale] },
  yeotown: { id: "yeotown", authors: "Yeotown", title: "Yeotown (UK)", note: "Luxury wellness retreat. ICP: High-ticket manual ops.", photo: { src: hospitalityImg }, href: "https://yeotown.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.clinicalContext] },
  original_travel: { id: "original_travel", authors: "Original", title: "Original Travel", note: "Custom travel ops. ICP: Manual curation mess.", photo: { src: eventsImg }, href: "https://originaltravel.co.uk", tags: [DOC_TAGS.events, DOC_TAGS.execution] },
  audo: { id: "audo", authors: "The Audo", title: "The Audo", note: "Hybrid hospitality. ICP: Minimalist team, manual ops.", photo: { src: hospitalityImg }, href: "https://theaudo.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.culture] },
  wildfitness: { id: "wildfitness", authors: "Wildfitness", title: "Wildfitness", note: "Retreat operator. ICP: Multi-location retreats.", photo: { src: hospitalityImg }, href: "https://wildfitness.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.culture] },
  blue_marble: { id: "blue_marble", authors: "Blue Marble", title: "Blue Marble Private", note: "Ultra-luxe travel ops. ICP: Extreme high-ticket.", photo: { src: eventsImg }, href: "https://bluemarbleprivate.com", tags: [DOC_TAGS.events, DOC_TAGS.enterprise] },
  secret_cinema: { id: "secret_cinema", authors: "Secret Cinema", title: "Secret Cinema", note: "Immersive events. ICP: Dynamic pricing chaos.", photo: { src: eventsImg }, href: "https://secretcinema.org", tags: [DOC_TAGS.events, DOC_TAGS.entertainment] },
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
  infraInstitutional = [],
  infraManufacturing = [],
  infraConstruction = [],
  serviceHospitality = [],
  serviceEvents = []
}: {
  infraInstitutional?: (keyof typeof SALES_REFERENCES)[],
  infraManufacturing?: (keyof typeof SALES_REFERENCES)[],
  infraConstruction?: (keyof typeof SALES_REFERENCES)[],
  serviceHospitality?: (keyof typeof SALES_REFERENCES)[],
  serviceEvents?: (keyof typeof SALES_REFERENCES)[]
}) {
  return [
    {
      id: "infrastructure",
      title: "Infrastructure",
      children: [
        { id: "institutional", title: "Institutional", content: <ReferenceList ids={infraInstitutional} /> },
        { id: "manufacturing", title: "Manufacturing", content: <ReferenceList ids={infraManufacturing} /> },
        { id: "construction", title: "Construction", content: <ReferenceList ids={infraConstruction} /> },
      ].filter(s => (s.content as any).props.ids.length > 0)
    },
    {
      id: "service",
      title: "Service",
      children: [
        { id: "hospitality", title: "Hospitality", content: <ReferenceList ids={serviceHospitality} /> },
        { id: "events", title: "Events", content: <ReferenceList ids={serviceEvents} /> },
      ].filter(s => (s.content as any).props.ids.length > 0)
    }
  ].filter(s => s.children.length > 0);
}

export const targetSectionsContent = [
  {
    id: "strategy-framework",
    title: "Strategic Framework",
    summary: "Winning positioning and ICP tiering for Innerflect.",
    content: (
      <div className="space-y-6">
        <StrategyHero />
      </div>
    ),
  },
  {
    id: "singapore",
    title: "Singapore",
    children: CountrySections({
      infraInstitutional: ["govtech", "sndgo", "naic", "astar", "dsta"],
      infraManufacturing: ["dyson", "micron"],
      infraConstruction: ["wohhup"],
      serviceHospitality: ["mbs", "rws", "grab", "sea"],
      serviceEvents: ["singapore_gp", "artbox", "airshow"]
    })
  },
  {
    id: "indonesia",
    title: "Indonesia",
    content: <IndonesiaHero />,
    children: CountrySections({
      infraInstitutional: ["brin", "nic_v"],
      infraManufacturing: ["esb"],
      serviceHospitality: ["bobobox", "travelio", "artotel", "amithya", "awanngroup", "anmon", "ar_hospitality", "bambu_indah", "sanchaya", "lombok_lodge", "revivo", "sarinbuana", "nikoi", "villas_bukit", "seminyak_hideaways", "bingin_hideaway", "gili_beach"],
      serviceEvents: ["atlas", "finns", "potato_head", "ismaya", "bali_spirit", "wonderfruit"]
    })
  },
  {
    id: "thailand-malaysia",
    title: "Thailand & Malaysia",
    children: CountrySections({
      infraInstitutional: ["depa", "nia_t", "mdec"]
    })
  },
  {
    id: "japan-korea",
    title: "Japan & Korea",
    children: CountrySections({
      infraInstitutional: ["riken_aip", "aist", "jst", "atla", "kaist"],
      infraManufacturing: ["toyota", "tsmc"],
      infraConstruction: ["obayashi", "kajima"]
    })
  },
  {
    id: "australia",
    title: "Australia",
    children: CountrySections({
      infraInstitutional: ["data61", "dstg"],
      infraConstruction: ["lendlease"]
    })
  },
  {
    id: "europe-uk",
    title: "Europe & UK",
    content: <EuropeHero />,
    children: CountrySections({
      serviceHospitality: ["locke", "generator", "hoxton", "zoku", "citizenm", "yeotown", "audo", "wildfitness", "blue_marble", "collective", "habyt", "node_living", "outsite", "selina", "unplugged", "canopy_stars", "sawdays", "coolstays", "plum_guide"],
      serviceEvents: ["secret_cinema", "fever", "dice", "we_are_fstvl", "time_warp"]
    })
  },
];
