import { ReferenceChip } from "@/components/ui/reference-chip";
import { DOC_TAGS } from "@/lib/records/tag-records";

const institutionalImg = "/assets/sales/institutional.png";
const hospitalityImg = "/assets/sales/hospitality.png";
const eventsImg = "/assets/sales/events.png";
const constructionImg = "/assets/sales/construction.png";
const manufacturingImg = "/assets/sales/manufacturing.png";

const SALES_REFERENCES = {
  // INSTITUTIONS
  govtech: { id: "govtech", authors: "GovTech", title: "GovTech Singapore", note: "Government Technology Agency of Singapore, leading digital transformation and Smart Nation engineering.", photo: { src: institutionalImg }, href: "https://www.tech.gov.sg/", tags: [DOC_TAGS.government, DOC_TAGS.execution] },
  sndgo: { id: "sndgo", authors: "SNDGO", title: "Smart Nation Office", note: "Office under the Prime Minister's Office overseeing Smart Nation initiatives and digital government policy.", photo: { src: institutionalImg }, href: "https://www.smartnation.gov.sg/", tags: [DOC_TAGS.government, DOC_TAGS.policy] },
  depa: { id: "depa", authors: "DEPA", title: "DEPA Thailand", note: "Promoting digital economy, startup growth, and smart city development in Thailand.", photo: { src: institutionalImg }, href: "https://www.depa.or.th/en/home", tags: [DOC_TAGS.government, DOC_TAGS.innovation] },
  naic: { id: "naic", authors: "NAIC", title: "National AI Centre", note: "Coordinating AI research and development across Singapore, focused on trust and industrial application.", photo: { src: institutionalImg }, href: "https://www.aisingapore.org/", tags: [DOC_TAGS.research, DOC_TAGS.aiLabs] },
  mdec: { id: "mdec", authors: "MDEC", title: "MDEC Malaysia", note: "Leading the digital economy in Malaysia through digital transformation and talent development.", photo: { src: institutionalImg }, href: "https://mdec.my/", tags: [DOC_TAGS.government, DOC_TAGS.execution] },
  astar: { id: "astar", authors: "A*STAR", title: "A*STAR Singapore", note: "Singapore's lead public sector R&D agency, bridging the gap between academia and industry.", photo: { src: institutionalImg }, href: "https://www.a-star.edu.sg/", tags: [DOC_TAGS.research, DOC_TAGS.government] },
  data61: { id: "data61", authors: "Data61", title: "Data61 Australia", note: "Australia's largest data science and innovation arm, part of the national science agency CSIRO.", photo: { src: institutionalImg }, href: "https://data61.csiro.au/", tags: [DOC_TAGS.research, DOC_TAGS.aiLabs] },
  grab: { id: "grab", authors: "Grab", title: "Grab", note: "Southeast Asia's leading super-app providing transportation, delivery, and financial services.", photo: { src: institutionalImg }, href: "https://www.grab.com/", tags: [DOC_TAGS.company, DOC_TAGS.scale] },
  sea: { id: "sea", authors: "Sea Ltd", title: "Sea Limited", note: "Leading global consumer internet company including Shopee, Garena, and SeaMoney.", photo: { src: institutionalImg }, href: "https://www.seagroup.com/", tags: [DOC_TAGS.company, DOC_TAGS.scale] },
  goto: { id: "goto", authors: "GoTo", title: "GoTo Group", note: "Indonesia's largest digital ecosystem, combining on-demand, e-commerce, and financial services.", photo: { src: institutionalImg }, href: "https://www.gotocompany.com/", tags: [DOC_TAGS.company, DOC_TAGS.scale] },
  brin: { id: "brin", authors: "BRIN", title: "BRIN Indonesia", note: "National agency for research and innovation in Indonesia.", photo: { src: institutionalImg }, tags: [DOC_TAGS.research, DOC_TAGS.government] },
  nic_v: { id: "nic_v", authors: "NIC Vietnam", title: "Vietnam Innovation Center", note: "NIC - Facilitating innovation and startup ecosystem in Vietnam.", photo: { src: institutionalImg }, tags: [DOC_TAGS.innovation, DOC_TAGS.execution] },
  nia_t: { id: "nia_t", authors: "NIA Thailand", title: "Thailand Innovation Agency", note: "Promoting innovation and entrepreneurship in Thailand.", photo: { src: institutionalImg }, tags: [DOC_TAGS.innovation, DOC_TAGS.government] },
  riken_aip: { id: "riken_aip", authors: "RIKEN AIP", title: "RIKEN AI Japan", note: "Leading AI research center in Japan.", photo: { src: institutionalImg }, tags: [DOC_TAGS.research, DOC_TAGS.aiLabs] },
  aist: { id: "aist", authors: "AIST", title: "AIST Japan", note: "AIST - Large scale public research organization in Japan.", photo: { src: institutionalImg }, tags: [DOC_TAGS.research, DOC_TAGS.industrial] },
  jst: { id: "jst", authors: "JST", title: "JST Japan", note: "Promoting science and technology in Japan.", photo: { src: institutionalImg }, tags: [DOC_TAGS.research, DOC_TAGS.government] },
  kaist: { id: "kaist", authors: "KAIST", title: "KAIST Korea", note: "KAIST - Leading research university in South Korea.", photo: { src: institutionalImg }, tags: [DOC_TAGS.research, DOC_TAGS.academic] },
  dstg: { id: "dstg", authors: "DSTG", title: "DSTG Australia", note: "DSTG - Leading agency for defence science and technology in Australia.", photo: { src: institutionalImg }, tags: [DOC_TAGS.defence, DOC_TAGS.research] },
  dsta: { id: "dsta", authors: "DSTA", title: "DSTA Singapore", note: "DSTA - Implementing defence science and technology for Singapore's defence.", photo: { src: institutionalImg }, tags: [DOC_TAGS.defence, DOC_TAGS.execution] },
  atla: { id: "atla", authors: "ATLA", title: "ATLA Japan", note: "ATLA - Managing R&D and acquisition for Japan's Ministry of Defense.", photo: { src: institutionalImg }, tags: [DOC_TAGS.defence, DOC_TAGS.government] },

  // HOSPITALITY
  mbs: { id: "mbs", authors: "MBS", title: "Marina Bay Sands", note: "Iconic integrated resort with world-class hotel, casino, and convention center.", photo: { src: hospitalityImg }, tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark] },
  rws: { id: "rws", authors: "RWS", title: "Resorts World Sentosa", note: "Integrated resort on Sentosa Island, home to Universal Studios Singapore.", photo: { src: hospitalityImg }, tags: [DOC_TAGS.hospitality, DOC_TAGS.entertainment] },
  hyatt: { id: "hyatt", authors: "Hyatt", title: "Hyatt Hotels", note: "Leading global hospitality company with a portfolio of 20+ premier brands.", photo: { src: hospitalityImg }, tags: [DOC_TAGS.hospitality, DOC_TAGS.enterprise] },
  marriott: { id: "marriott", authors: "Marriott", title: "Marriott International", note: "The world's largest hotel chain with 30 brands and 7,000+ properties.", photo: { src: hospitalityImg }, tags: [DOC_TAGS.hospitality, DOC_TAGS.enterprise] },

  // EVENTS
  singapore_gp: { id: "singapore_gp", authors: "F1 GP", title: "Singapore GP (F1)", note: "The first night race in Formula One history, held on the Marina Bay Street Circuit.", photo: { src: eventsImg }, tags: [DOC_TAGS.events, DOC_TAGS.sports] },
  artbox: { id: "artbox", authors: "Artbox", title: "Artbox Singapore", note: "The largest creative night market in Singapore, featuring local and regional talent.", photo: { src: eventsImg }, tags: [DOC_TAGS.events, DOC_TAGS.culture] },
  airshow: { id: "airshow", authors: "Airshow", title: "Singapore Airshow", note: "Asia's most influential international aerospace and defence exhibition.", photo: { src: eventsImg }, tags: [DOC_TAGS.events, DOC_TAGS.industrial] },

  // CONSTRUCTION
  obayashi: { id: "obayashi", authors: "Obayashi", title: "Obayashi Corp", note: "One of the five major Japanese 'super general contractors', specializing in large-scale infrastructure and architectural projects worldwide.", photo: { src: constructionImg }, href: "https://www.obayashi.co.jp/en/", tags: [DOC_TAGS.construction, DOC_TAGS.industrial] },
  kajima: { id: "kajima", authors: "Kajima", title: "Kajima Corp", note: "Leading construction company in Japan known for its advanced R&D, structural engineering, and earthquake-resistant technology.", photo: { src: constructionImg }, href: "https://www.kajima.co.jp/english/", tags: [DOC_TAGS.construction, DOC_TAGS.industrial] },
  wohhup: { id: "wohhup", authors: "Woh Hup", title: "Woh Hup Singapore", note: "Singapore's largest privately owned construction and civil engineering specialist, responsible for many of the city-state's iconic landmarks.", photo: { src: constructionImg }, href: "https://www.wohhup.com/", tags: [DOC_TAGS.construction, DOC_TAGS.execution] },
  lendlease: { id: "lendlease", authors: "Lendlease", title: "Lendlease Global", note: "Global real estate group specializing in large-scale urban regeneration, sustainable development, and complex construction management.", photo: { src: constructionImg }, href: "https://www.lendlease.com/", tags: [DOC_TAGS.construction, DOC_TAGS.realEstate] },

  // MANUFACTURING
  dyson: { id: "dyson", authors: "Dyson", title: "Dyson Global", note: "Global technology company specializing in home appliances, robotics, and battery technology, with its global headquarters in Singapore.", photo: { src: manufacturingImg }, href: "https://www.dyson.com.sg/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.innovation] },
  micron: { id: "micron", authors: "Micron", title: "Micron Tech", note: "Global leader in memory and storage solutions with major NAND and DRAM fabrication facilities located in Singapore.", photo: { src: manufacturingImg }, href: "https://www.micron.com/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.semiconductors] },
  toyota: { id: "toyota", authors: "Toyota", title: "Toyota Motors", note: "Global automotive manufacturer and leader in lean manufacturing, electric vehicle technology, and autonomous driving research.", photo: { src: manufacturingImg }, href: "https://global.toyota/en/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.automotive] },
  tsmc: { id: "tsmc", authors: "TSMC", title: "TSMC Foundry", note: "The world's largest dedicated independent semiconductor foundry, producing the most advanced chips for global tech leaders.", photo: { src: manufacturingImg }, href: "https://www.tsmc.com/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.semiconductors] },
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

export const targetSectionsContent = [
  {
    id: "institutional-infrastructure",
    title: "Institutional Infrastructure",
    summary: "Government agencies, research institutes, and regional tech giants.",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Key targets across the APAC region including primary government agencies, research arms, and major digital economy platforms.
        </p>
        <ReferenceList ids={["govtech", "sndgo", "depa", "naic", "mdec", "astar", "data61", "grab", "sea", "goto", "brin", "nic_v", "nia_t", "riken_aip", "aist", "jst", "kaist", "dstg", "dsta", "atla"]} />
      </div>
    ),
  },
  {
    id: "hospitality",
    title: "Hospitality",
    summary: "Integrated resorts, global hotel chains, and leisure giants.",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Luxury hospitality and integrated resorts with complex infrastructure needs.
        </p>
        <ReferenceList ids={["mbs", "rws", "hyatt", "marriott"]} />
      </div>
    ),
  },
  {
    id: "events",
    title: "Events",
    summary: "Major international summits, sports events, and cultural festivals.",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          High-profile events and exhibitions requiring rapid-deployment technical solutions.
        </p>
        <ReferenceList ids={["singapore_gp", "artbox", "airshow"]} />
      </div>
    ),
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    summary: "Major contractors and global manufacturing leaders.",
    children: [
      {
        id: "construction",
        title: "Construction",
        summary: "Major contractors and engineering firms in APAC.",
        content: (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Regional and global leaders in civil engineering and urban development.
            </p>
            <ReferenceList ids={["obayashi", "kajima", "wohhup", "lendlease"]} />
          </div>
        ),
      },
      {
        id: "manufacturing",
        title: "Manufacturing",
        summary: "Semiconductors, automotive, and high-tech manufacturing.",
        content: (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              High-precision manufacturing and global supply chain leaders.
            </p>
            <ReferenceList ids={["dyson", "micron", "toyota", "tsmc"]} />
          </div>
        ),
      },
    ],
  },
];
