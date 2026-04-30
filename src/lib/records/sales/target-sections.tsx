import { ReferenceChip } from "@/components/ui/reference-chip";
import { DOC_TAGS } from "@/lib/records/tag-records";
import { IndonesiaHero } from "@/components/sales/sectors/IndonesiaHero";
import { EuropeHero } from "@/components/sales/sectors/EuropeHero";
import { StrategyHero } from "@/components/sales/sectors/StrategyHero";
import { SingaporeHero, ThailandMalaysiaHero, JapanKoreaHero, AustraliaHero } from "@/components/sales/sectors/RegionalHeros";
import { SectorHeader } from "@/components/sales/sectors/SectorHeader";

const institutionalImg = { src: "/assets/sales/institutional_premium.png" };
const hospitalityImg = { src: "/assets/sales/hospitality_premium.png" };
const eventsImg = { src: "/assets/sales/events_premium.png" };
const constructionImg = { src: "/assets/sales/construction_premium.png" };
const manufacturingImg = { src: "/assets/sales/manufacturing_premium.png" };

export const SALES_REFERENCES = {
  // --- SINGAPORE ---
  govtech: { id: "govtech", authors: "GovTech", title: "GovTech Singapore", note: "Massive raw input fragmentation. Signals are lost in agency-level silos.", photo: institutionalImg, href: "https://www.tech.gov.sg/", tags: [DOC_TAGS.government, DOC_TAGS.execution], painPoints: ["Signal Invisibility", "Legacy Silos"], sellingStrategy: "Sell 'Cross-Agency Execution Context'. Position as the control layer that normalizes raw inputs into actionable policy signals." },
  sndgo: { id: "sndgo", authors: "SNDGO", title: "Smart Nation Office", note: "Directing the digital operational layer of Singapore.", photo: institutionalImg, href: "https://www.smartnation.gov.sg/", tags: [DOC_TAGS.government, DOC_TAGS.policy], painPoints: ["Execution Gaps", "Governance Complexity"], sellingStrategy: "Focus on 'Intentional Signals'. Use agents to ensure policy intent is preserved across the entire digital implementation layer." },
  naic: { id: "naic", authors: "National AI", title: "National AI Centre", note: "Defining the generative control layer for Singapore's industry.", photo: institutionalImg, href: "https://www.aisingapore.org/", tags: [DOC_TAGS.research, DOC_TAGS.aiLabs] },
  astar: { id: "astar", authors: "A*STAR", title: "A*STAR Singapore", note: "Raw research inputs are siloed. Knowledge formalization is invisible.", photo: institutionalImg, href: "https://www.a-star.edu.sg/", tags: [DOC_TAGS.research, DOC_TAGS.government] },
  dsta: { id: "dsta", authors: "DSTA", title: "DSTA Singapore", note: "Mission-critical signals require absolute precision and air-gapped context.", photo: institutionalImg, href: "https://www.dsta.gov.sg/", tags: [DOC_TAGS.defence, DOC_TAGS.execution] },
  smrt: { id: "smrt", authors: "SMRT", title: "SMRT Corporation", note: "Managing multi-modal transport with legacy infrastructure drag.", photo: institutionalImg, href: "https://www.smrt.com.sg/", tags: [DOC_TAGS.infrastructure, DOC_TAGS.execution], painPoints: ["Maintenance Silos", "Response Latency"], sellingStrategy: "Deploy 'Real-time Maintenance Signal Layer' to normalize sensor data across lines." },
  psa: { id: "psa", authors: "PSA", title: "PSA International", note: "Global port orchestration with fragmented logistics standards.", photo: institutionalImg, href: "https://globalpsa.com/", tags: [DOC_TAGS.infrastructure, DOC_TAGS.enterprise], painPoints: ["Visibility Gaps", "Terminal Silos"], sellingStrategy: "Sell 'Sea-to-Land Operational Context'. Normalize cargo signals into a single port-wide execution dataset." },
  st_engg: { id: "st_engg", authors: "ST Engg", title: "ST Engineering", note: "Multi-sector conglomerate with complex global manufacturing drag.", photo: manufacturingImg, href: "https://www.stengg.com/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.innovation], painPoints: ["Cross-Divisional Silos", "Legacy Workflows"], sellingStrategy: "Create a 'Unified Engineering Dataset'. Position as the control layer across Aerospace and Electronics." },
  
  dyson: { id: "dyson", authors: "Dyson", title: "Dyson Global", note: "Fragmented R&D channels create high-cost drag. Signals are manual.", photo: { src: "/assets/sales/dyson_premium.png" }, href: "https://www.dyson.com.sg/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.innovation], painPoints: ["High-Cost Data Drag", "Manual Signal Analysis"], sellingStrategy: "Implement a 'Control Layer' for R&D. Normalize global manufacturing inputs into a central dataset to drive execution." },
  micron: { id: "micron", authors: "Micron Tech", note: "Yield signals are lost in the cleanroom floor noise. Costs are rising.", photo: manufacturingImg, href: "https://www.micron.com/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.semiconductors] },
  wohhup: { id: "wohhup", authors: "Woh Hup", title: "Woh Hup Singapore", note: "Sub-contractor inputs are non-normalized. Real site progress is invisible.", photo: constructionImg, href: "https://www.wohhup.com/", tags: [DOC_TAGS.construction, DOC_TAGS.execution], painPoints: ["Invisible Site Signals", "High-Cost Fragmentation"], sellingStrategy: "Consolidate toolsets into a single operational layer. Surface crucial site information to the executive teams in real-time." },

  google_sg: { id: "google_sg", authors: "Google SG", title: "Google Singapore", note: "Managing hyper-scale cloud across fragmented SEA markets.", photo: institutionalImg, href: "https://www.google.com.sg/", tags: [DOC_TAGS.enterprise, DOC_TAGS.innovation], painPoints: ["Compliance Overhead", "Regional Data Latency"] },
  meta_sg: { id: "meta_sg", authors: "Meta SG", title: "Meta Singapore", note: "Coordinating regional policy across diverse linguistic landscapes.", photo: institutionalImg, href: "https://www.meta.com/", tags: [DOC_TAGS.enterprise, DOC_TAGS.scale], painPoints: ["Linguistic Silos", "Moderation Latency"] },
  amazon_sg: { id: "amazon_sg", authors: "Amazon SG", title: "Amazon Singapore", note: "Last-mile delivery complexity in dense urban environments.", photo: institutionalImg, href: "https://www.amazon.sg/", tags: [DOC_TAGS.marketplace, DOC_TAGS.scale], painPoints: ["Inventory Silos", "Fleet Coordination"] },

  mbs: { id: "mbs", authors: "MBS", title: "Marina Bay Sands", note: "VIP intent signals are lost in massive guest flow noise. Experience is fragmented.", photo: { src: "/assets/sales/mbs_premium.png" }, href: "https://www.marinabaysands.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark], painPoints: ["Signal Fragmentation", "VIP Experience Leakage"], sellingStrategy: "Create a 'Central Execution Dataset' for high-ticket guests. Reduce hallucinations in service delivery with live domain context." },
  raffles: { id: "raffles", authors: "Raffles", title: "Raffles Hotel", note: "Invisible 'heritage' signals are trapped in manual butler memory. High-cost drag.", photo: hospitalityImg, href: "https://www.raffles.com/singapore/", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark], painPoints: ["Manual Knowledge Silos", "High-Cost Service Memory"], sellingStrategy: "Digitize 'Intuition'. Normalize butler knowledge into a control layer that surfaces intentional service signals." },
  capella_sg: { id: "capella_sg", authors: "Capella", title: "Capella Singapore", note: "Ultra-luxury guest signals are manual. Context is fragile.", photo: hospitalityImg, href: "https://www.capellahotels.com/en/capella-singapore", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark] },
  fullerton: { id: "fullerton", authors: "Fullerton", title: "The Fullerton Hotel", note: "Historic heritage signals are non-normalized. Ops drag.", photo: hospitalityImg, href: "https://www.fullertonhotels.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark] },
  pan_pacific: { id: "pan_pacific", authors: "Pan Pacific", title: "Pan Pacific Group", note: "Multi-property signal noise. Real-time context is invisible.", photo: hospitalityImg, href: "https://www.panpacific.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.enterprise] },

  warehouse_hotel: { id: "warehouse_hotel", authors: "Warehouse", title: "The Warehouse Hotel", note: "Heritage site with manual navigation for non-standardized room layouts.", photo: hospitalityImg, href: "https://www.thewarehousehotel.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark], painPoints: ["Layout Complexity", "Local Sourcing Drag"] },
  duxton_reserve: { id: "duxton_reserve", authors: "Duxton", title: "Duxton Reserve", note: "Bespoke social-led hospitality with high local-partnership coordination.", photo: hospitalityImg, href: "https://duxtonreserve.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.culture], painPoints: ["Partnership Noise", "Guest Preference Silos"] },
  mondrian_sg: { id: "mondrian_sg", authors: "Mondrian SG", title: "Mondrian Singapore", note: "High-density social hub with manual crowd control for rooftop venues.", photo: hospitalityImg, href: "https://book.ennismore.com/hotels/mondrian/singapore-duxton", tags: [DOC_TAGS.hospitality, DOC_TAGS.enterprise], painPoints: ["Venue Bottlenecks", "Social Signal Chaos"] },
  clan_hotel: { id: "clan_hotel", authors: "The Clan", title: "The Clan Hotel", note: "Bespoke 'Clan Keeper' service with manual task synchronization.", photo: hospitalityImg, href: "https://www.theclanhotel.com.sg/", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark], painPoints: ["Service Orchestration", "Concierge Silos"] },

  sia: { id: "sia", authors: "SIA", title: "Singapore Airlines", note: "Premium cabin signals are lost in massive legacy data noise. High-cost drag.", photo: { src: "/assets/sales/sia_premium.png" }, href: "https://www.singaporeair.com/", tags: [DOC_TAGS.aviation, DOC_TAGS.enterprise], painPoints: ["Legacy Data Noise", "High-Cost Premium Drag"], sellingStrategy: "Deploy a 'Premium Control Layer' to normalize cabin signals into actionable service context." },
  changi_airport: { id: "changi_airport", authors: "Changi", title: "Changi Airport Group", note: "Passenger flow signals are non-normalized. Real-time ops are invisible.", photo: hospitalityImg, href: "https://www.changiairport.com/", tags: [DOC_TAGS.infrastructure, DOC_TAGS.landmark] },

  // --- INDONESIA ---
  brin: { id: "brin", authors: "BRIN", title: "BRIN Indonesia", note: "Institutional signals are non-normalized across 80+ research institutes.", photo: institutionalImg, href: "https://www.brin.go.id/", tags: [DOC_TAGS.research, DOC_TAGS.government] },
  goto: { id: "goto", authors: "GoTo", title: "GoTo Indonesia", note: "Massive ecosystem merger with overlapping tech stacks.", photo: institutionalImg, href: "https://www.gotocompany.com/", tags: [DOC_TAGS.marketplace, DOC_TAGS.scale], painPoints: ["Data Orchestration", "Logistics Coordination"], sellingStrategy: "Normalize overlapping service signals into a single 'Ecosystem Control Layer'." },
  bukalapak: { id: "bukalapak", authors: "Bukalapak", title: "Bukalapak", note: "Serving 10M+ MSMEs in remote areas with fragmented digital footprints.", photo: institutionalImg, href: "https://www.bukalapak.com/", tags: [DOC_TAGS.marketplace, DOC_TAGS.scale], painPoints: ["Supply Chain Transparency", "Settlement Fragmentation"] },
  
  bobobox: { id: "bobobox", authors: "Bobobox", title: "Bobobox", note: "Tech pod signals are manual. Ops context is fragmented across locations.", photo: { src: "/assets/sales/bobobox_premium.png" }, href: "https://bobobox.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.scale], painPoints: ["Manual Upsell Noise", "Siloed Ops Inputs"], sellingStrategy: "Deploy an 'Adaptive Operational Layer' to consolidate tech-pod signals into automated revenue execution." },
  artotel: { id: "artotel", authors: "ARTOTEL", title: "ARTOTEL Group", note: "Multi-brand noise makes guest signals invisible. High-cost brand drag.", photo: hospitalityImg, href: "https://artotelgroup.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.enterprise] },
  nihi_sumba: { id: "nihi_sumba", authors: "Nihi", title: "Nihi Sumba", note: "Ultra-luxury remote resort with high-cost supply chain needs.", photo: hospitalityImg, href: "https://www.nihi.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark], painPoints: ["Remote Coordination", "Supply Chain Drag"] },
  plataran: { id: "plataran", authors: "Plataran", title: "Plataran Group", note: "Multi-site heritage hospitality across Indonesia.", photo: hospitalityImg, href: "https://www.plataran.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark], painPoints: ["Operational Consistency", "Guest Profiling"] },
  
  fivelements: { id: "fivelements", authors: "Fivelements", title: "Fivelements Retreat", note: "Eco-wellness retreat with manual monitoring of eco-infrastructure.", photo: hospitalityImg, href: "https://fivelementsretreat.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark], painPoints: ["Eco-Ops Fragmentation", "Siloed Wellness Data"] },
  potato_head: { id: "potato_head", authors: "Potato Head", title: "Desa Potato Head", note: "Creative village with manual tracking for zero-waste metrics.", photo: eventsImg, href: "https://seminyak.potatohead.co/", tags: [DOC_TAGS.hospitality, DOC_TAGS.culture], painPoints: ["Sustainability Data Drag", "F&B/Hotel Silos"] },
  yoga_barn: { id: "yoga_barn", authors: "Yoga Barn", title: "The Yoga Barn", note: "High-volume wellness hub with manual class and therapist scheduling.", photo: eventsImg, href: "https://www.theyogabarn.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.culture], painPoints: ["Scheduling Chaos", "Manual Guest Checkout"] },
  bisma_eight: { id: "bisma_eight", authors: "Bisma Eight", title: "Bisma Eight Ubud", note: "Boutique Ubud hotel with high-touch, non-normalized guest requests.", photo: hospitalityImg, href: "https://bisma-eight.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark], painPoints: ["Request Latency", "Personalization Silos"] },
  visesa_ubud: { id: "visesa_ubud", authors: "Visesa", title: "Desa Visesa Ubud", note: "Traditional cultural resort with high labor costs for manual agricultural ops.", photo: hospitalityImg, href: "https://www.visesaubud.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.culture], painPoints: ["Agro-Ops Drag", "Labor Intensity"] },

  bambu_indah: { id: "bambu_indah", authors: "Bambu Indah", title: "Bambu Indah (Ubud)", note: "Ubud retreat signals are manual. Ops are invisible.", photo: hospitalityImg, href: "https://bambuindah.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark] },
  aman: { id: "aman", authors: "Aman", title: "Aman Resorts", note: "High-ticket guest signals are trapped in manual, unrecorded memory.", photo: hospitalityImg, href: "https://www.aman.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark], painPoints: ["Fragile Memory Silos", "Invisible VIP Intent"] },
  ayana: { id: "ayana", authors: "Ayana", title: "Ayana Estate", note: "Massive estate signals are non-normalized.", photo: hospitalityImg, href: "https://www.ayana.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark] },
  alila: { id: "alila", authors: "Alila", title: "Alila Resorts", note: "Eco-luxury signals are manual.", photo: hospitalityImg, href: "https://www.alilahotels.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark] },

  garuda: { id: "garuda", authors: "Garuda", title: "Garuda Indonesia", note: "National carrier signals are trapped in legacy silos.", photo: hospitalityImg, href: "https://www.garuda-indonesia.com/", tags: [DOC_TAGS.aviation, DOC_TAGS.enterprise] },
  traveloka: { id: "traveloka", authors: "Traveloka", title: "Traveloka", note: "Marketplace noise makes intent signals invisible.", photo: hospitalityImg, href: "https://www.traveloka.com/", tags: [DOC_TAGS.marketplace, DOC_TAGS.scale], painPoints: ["Dynamic Pricing Noise", "Inventory Sync"] },

  // --- THAILAND & MALAYSIA ---
  kamalaya: { id: "kamalaya", authors: "Kamalaya", title: "Kamalaya Koh Samui", note: "Wellness pioneer with manual sync between medical and kitchen ops.", photo: hospitalityImg, href: "https://kamalaya.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark], painPoints: ["Medical/Kitchen Silos", "Guest Wellness Drag"] },
  chiva_som: { id: "chiva_som", authors: "Chiva-Som", title: "Chiva-Som Hua Hin", note: "High-intensity wellness schedules trapped in legacy CRM.", photo: hospitalityImg, href: "https://www.chivasom.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark], painPoints: ["Schedule Fragmentation", "Service Response Latency"] },
  six_senses_th: { id: "six_senses_th", authors: "Six Senses", title: "Six Senses Samui", note: "Large site footprint requiring manual intervention for logistics.", photo: hospitalityImg, href: "https://www.sixsenses.com/en/resorts/samui", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark], painPoints: ["Logistics Friction", "Site Noise Monitoring"] },
  standard_bkk: { id: "standard_bkk", authors: "The Standard", title: "The Standard Bangkok", note: "Vertical village facing elevator bottlenecks and guest friction.", photo: hospitalityImg, href: "https://www.standardhotels.com/bangkok/properties/bangkok", tags: [DOC_TAGS.hospitality, DOC_TAGS.culture], painPoints: ["Flow Bottlenecks", "Public/Guest Friction"] },

  minor_hotels: { id: "minor_hotels", authors: "Minor", title: "Minor Hotels", note: "Global brand noise. Real-time ops signals are invisible.", photo: hospitalityImg, href: "https://www.minorhotels.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.enterprise] },
  dusit: { id: "dusit", authors: "Dusit", title: "Dusit Thani", note: "Thai hospitality signals are manual.", photo: hospitalityImg, href: "https://www.dusit.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark] },
  banyan_tree: { id: "banyan_tree", authors: "Banyan Tree", title: "Banyan Tree", note: "Sanctuary signals are trapped in manual memory.", photo: hospitalityImg, href: "https://www.banyantree.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark] },
  airasia: { id: "airasia", authors: "AirAsia", title: "AirAsia Group", note: "LCC operational signals are fragmented across regions.", photo: hospitalityImg, href: "https://www.airasia.com/", tags: [DOC_TAGS.aviation, DOC_TAGS.scale] },
  agoda: { id: "agoda", authors: "Agoda", title: "Agoda", note: "Inventory signals are non-normalized.", photo: hospitalityImg, href: "https://www.agoda.com/", tags: [DOC_TAGS.marketplace, DOC_TAGS.scale] },

  // --- JAPAN & KOREA ---
  riken_aip: { id: "riken_aip", authors: "RIKEN", title: "RIKEN AIP", note: "Implicit research signals are invisible. Veteran knowledge is manual.", photo: institutionalImg, href: "https://aip.riken.jp/", tags: [DOC_TAGS.research, DOC_TAGS.aiLabs] },
  obayashi: { id: "obayashi", authors: "Obayashi", note: "Paper-based site signals create massive data gaps.", photo: constructionImg, href: "https://www.obayashi.co.jp/en/", tags: [DOC_TAGS.construction, DOC_TAGS.industrial] },
  
  toyota: { id: "toyota", authors: "Toyota", title: "Toyota Global", note: "Extreme Just-in-Time supply chain complexity.", photo: manufacturingImg, href: "https://www.toyota-global.com/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.automotive], painPoints: ["Supply Chain Transparency", "EV Transition Drag"], sellingStrategy: "Normalize global factory floor signals into a central 'JIT Control Layer'." },
  sony: { id: "sony", authors: "Sony", title: "Sony Global", note: "Highly diversified conglomerate with autonomous division silos.", photo: manufacturingImg, href: "https://www.sony.com/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.innovation], painPoints: ["Division Synergy", "R&D Data Sharing"] },
  rakuten: { id: "rakuten", authors: "Rakuten", title: "Rakuten Group", note: "Massive ecosystem requiring complex cross-platform orchestration.", photo: manufacturingImg, href: "https://www.rakuten.co.jp/", tags: [DOC_TAGS.marketplace, DOC_TAGS.scale], painPoints: ["Ecosystem Latency", "Merchant Fragmentation"] },
  panasonic: { id: "panasonic", authors: "Panasonic", title: "Panasonic", note: "Transitioning to high-growth B2B and EV manufacturing.", photo: manufacturingImg, href: "https://www.panasonic.com/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.innovation], painPoints: ["Industrial Integration", "Talent Management"] },
  honda: { id: "honda", authors: "Honda", title: "Honda", note: "Shifting to software-defined mobility services.", photo: manufacturingImg, href: "https://www.honda.com/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.automotive], painPoints: ["Software Development Silos", "Dealer Modernization"] },

  samsung: { id: "samsung", authors: "Samsung", title: "Samsung Electronics", note: "Massive global supply chain with extreme precision requirements.", photo: manufacturingImg, href: "https://www.samsung.com/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.semiconductors], painPoints: ["Fab Efficiency", "Global Inventory Sync"], sellingStrategy: "Deploy 'Yield Optimization Layer' to normalize global fab signals." },
  hyundai: { id: "hyundai", authors: "Hyundai", title: "Hyundai Motor", note: "Transitioning to smart mobility and robotics.", photo: manufacturingImg, href: "https://www.hyundai.com/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.automotive], painPoints: ["Autonomous Data Silos", "Line Flexibility"] },
  lg_corp: { id: "lg_corp", authors: "LG", title: "LG Corporation", note: "Multi-industry conglomerate with complex inter-affiliate ops.", photo: manufacturingImg, href: "https://www.lgcorp.com/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.innovation], painPoints: ["Affiliate Synergy", "Sustainability Monitoring"] },
  sk_hynix: { id: "sk_hynix", authors: "SK Hynix", title: "SK Hynix", note: "High-intensity chip manufacturing with yield sensitivity.", photo: manufacturingImg, href: "https://www.skhynix.com/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.semiconductors], painPoints: ["Yield Silos", "Shortage Response"] },
  posco: { id: "posco", authors: "POSCO", title: "POSCO", note: "Heavy industrial steel transitioning to 'Smart Factories'.", photo: manufacturingImg, href: "https://www.posco.com/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.industrial], painPoints: ["Smart Factory Integration", "Carbon Footprint Tracking"] },

  hoshino: { id: "hoshino", authors: "Hoshino", title: "Hoshino Resorts", note: "Omotenashi signals are manual and non-normalized.", photo: hospitalityImg, href: "https://www.hoshinoresorts.com/en/", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark] },
  apa_hotels: { id: "apa_hotels", authors: "APA", title: "APA Hotels", note: "Mass-market signals are fragmented.", photo: hospitalityImg, href: "https://www.apahotel.com/en/", tags: [DOC_TAGS.hospitality, DOC_TAGS.scale] },
  shilla: { id: "shilla", authors: "Shilla", title: "Hotel Shilla", note: "Luxury Korean hospitality signals are manual.", photo: hospitalityImg, href: "https://www.hotelshilla.net/", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark] },

  // --- AUSTRALIA ---
  cba: { id: "cba", authors: "CBA", title: "Commonwealth Bank", note: "Managing legacy core banking under intense scrutiny.", photo: institutionalImg, href: "https://www.commbank.com.au/", tags: [DOC_TAGS.enterprise, DOC_TAGS.government], painPoints: ["Real-time Fraud Silos", "Regulatory Automation"] },
  anz: { id: "anz", authors: "ANZ", title: "ANZ Bank", note: "Large-scale cross-border banking across Asia-Pacific.", photo: institutionalImg, href: "https://www.anz.com.au/", tags: [DOC_TAGS.enterprise, DOC_TAGS.scale], painPoints: ["Regional Fragmentation", "Processing Latency"] },
  westpac: { id: "westpac", authors: "Westpac", title: "Westpac Bank", note: "Significant legacy technical debt and compliance costs.", photo: institutionalImg, href: "https://www.westpac.com.au/", tags: [DOC_TAGS.enterprise, DOC_TAGS.government], painPoints: ["IT Simplification", "Mortgage Speed"] },
  telstra: { id: "telstra", authors: "Telstra", title: "Telstra", note: "National telecom with massive legacy copper/fiber mix.", photo: institutionalImg, href: "https://www.telstra.com.au/", tags: [DOC_TAGS.infrastructure, DOC_TAGS.scale], painPoints: ["Orchestration Latency", "Customer Churn Signals"] },
  woolworths: { id: "woolworths", authors: "Woolworths", title: "Woolworths Group", note: "Massive retail supply chain across 3,000+ locations.", photo: hospitalityImg, href: "https://www.woolworthsgroup.com.au/", tags: [DOC_TAGS.marketplace, DOC_TAGS.scale], painPoints: ["Waste Reduction", "Scheduling Optimization"] },
  crown: { id: "crown", authors: "Crown", title: "Crown Resorts", note: "Casino and resort signals are lost in massive guest noise.", photo: hospitalityImg, href: "https://www.crownresorts.com.au/", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark] },
  meriton: { id: "meriton", authors: "Meriton", title: "Meriton Suites", note: "Apartment hotel signals are manual.", photo: hospitalityImg, href: "https://www.meritonsuites.com.au/", tags: [DOC_TAGS.hospitality, DOC_TAGS.scale] },
  qantas: { id: "qantas", authors: "Qantas", title: "Qantas Airways", note: "National carrier signals are trapped in legacy silos.", photo: { src: "/assets/sales/qantas_premium.png" }, href: "https://www.qantas.com/", tags: [DOC_TAGS.aviation, DOC_TAGS.enterprise] },
  southern_ocean: { id: "southern_ocean", authors: "Southern Ocean", title: "Southern Ocean Lodge", note: "Ultra-luxury remote tourism with high environmental sensitivity.", photo: hospitalityImg, href: "https://southernoceanlodge.com.au/", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark], painPoints: ["Sustainability Reporting", "Remote Staffing"] },
  wolgan_valley: { id: "wolgan_valley", authors: "One&Only", title: "Wolgan Valley", note: "Remote luxury lodge with complex manual wildlife-itinerary logistics.", photo: hospitalityImg, href: "https://www.oneandonlyresorts.com/wolgan-valley", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark], painPoints: ["Itinerary Chaos", "Supply Chain Drag"] },
  saffire_freycinet: { id: "saffire_freycinet", authors: "Saffire", title: "Saffire Freycinet", note: "Isolated property with manual monitoring of energy and water self-sufficiency.", photo: hospitalityImg, href: "https://www.saffire-freycinet.com.au/", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark], painPoints: ["Self-Sufficiency Drag", "Visitor Quota Noise"] },

  // --- EUROPE / UK ---
  lvmh: { id: "lvmh", authors: "LVMH", title: "LVMH Group", note: "House of 75+ brands with high autonomy but shared logistics.", photo: hospitalityImg, href: "https://www.lvmh.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.enterprise], painPoints: ["Multi-brand Visibility", "Premium Consistency"], sellingStrategy: "Deploy a 'Global Logistics Control Layer' to normalize Maison-level signals." },
  kering: { id: "kering", authors: "Kering", title: "Kering Group", note: "Luxury group focusing on sustainability-led digital transformation.", photo: hospitalityImg, href: "https://www.kering.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.enterprise], painPoints: ["Sourcing Traceability", "Digital Silos"] },
  hermes: { id: "hermes", authors: "Hermès", title: "Hermès", note: "Maintaining artisanal production quality at global scale.", photo: hospitalityImg, href: "https://www.hermes.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark], painPoints: ["Artisanal Scaling", "Scarcity Orchestration"] },
  siemens: { id: "siemens", authors: "Siemens", title: "Siemens Global", note: "Massive legacy installed base shifting to 'Digital Industries'.", photo: manufacturingImg, href: "https://www.siemens.com/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.industrial], painPoints: ["IoT Synchronization", "Service Coordination"] },
  sap: { id: "sap", authors: "SAP", title: "SAP Global", note: "Transitioning a massive legacy on-premise base to cloud.", photo: manufacturingImg, href: "https://www.sap.com/", tags: [DOC_TAGS.enterprise, DOC_TAGS.innovation], painPoints: ["Migration Complexity", "Partner Coordination"] },
  airbus: { id: "airbus", authors: "Airbus", title: "Airbus", note: "Extremely complex aerospace supply chain with high oversight.", photo: manufacturingImg, href: "https://www.airbus.com/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.aviation], painPoints: ["Ramp-up Coordination", "Engineering Silos"] },
  volkswagen: { id: "volkswagen", authors: "Volkswagen", title: "Volkswagen Group", note: "Massive scale with complex legacy production transitions to EVs.", photo: manufacturingImg, href: "https://www.volkswagenag.com/", tags: [DOC_TAGS.manufacturing, DOC_TAGS.automotive], painPoints: ["Software Speed", "Emissions Compliance"] },

  mama_shelter: { id: "mama_shelter", authors: "Mama Shelter", title: "Mama Shelter", note: "Social hub with manual management of integrated co-working and lobby culture.", photo: eventsImg, href: "https://mamashelter.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.culture], painPoints: ["Lobby Friction", "Co-working Silos"] },
  twenty_five_hours: { id: "twenty_five_hours", authors: "25hours", title: "25hours Hotels", note: "Lifestyle brand with manual localized minibar and social venue sourcing.", photo: eventsImg, href: "https://www.25hours-hotels.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.culture], painPoints: ["Sourcing Drag", "Social Signal Noise"] },

  locke: { id: "locke", authors: "Locke", title: "Locke Living", note: "Multi-city aparthotel noise. Real-time guest signals are invisible.", photo: hospitalityImg, href: "https://lockeliving.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.enterprise] },
  hoxton: { id: "hoxton", authors: "Hoxton", title: "The Hoxton", note: "Brand standard signals are fragmented.", photo: hospitalityImg, href: "https://thehoxton.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.landmark] },
  selina: { id: "selina", authors: "Selina", title: "Selina", note: "High-cost operational drag across massive, fragmented global locations.", photo: hospitalityImg, href: "https://selina.com", tags: [DOC_TAGS.hospitality, DOC_TAGS.scale] },
  accor: { id: "accor", authors: "Accor", title: "Accor Group", note: "Global multi-brand noise. Guest signals are non-normalized.", photo: hospitalityImg, href: "https://group.accor.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.enterprise] },
  ihg: { id: "ihg", authors: "IHG", title: "IHG Hotels & Resorts", note: "Massive franchise noise. Real-time ops signals are invisible.", photo: hospitalityImg, href: "https://www.ihgplc.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.enterprise] },
  soho_house: { id: "soho_house", authors: "Soho House", title: "Soho House", note: "Member intent signals are lost in manual community noise.", photo: hospitalityImg, href: "https://www.sohohouse.com/", tags: [DOC_TAGS.hospitality, DOC_TAGS.culture] },
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
      infraInstitutional: ["govtech", "sndgo", "naic", "astar", "dsta", "smrt", "psa"],
      infraManufacturing: ["st_engg", "dyson", "micron", "google_sg", "meta_sg"],
      infraConstruction: ["wohhup"],
      serviceHotelsSpas: ["mbs", "raffles", "capella_sg", "fullerton", "pan_pacific", "warehouse_hotel", "duxton_reserve", "mondrian_sg", "clan_hotel"],
      serviceTravel: ["sia", "changi_airport", "amazon_sg"]
    })
  },
  {
    id: "indonesia",
    title: "Indonesia",
    content: <IndonesiaHero />,
    children: CountrySections({
      country: "indonesia",
      infraInstitutional: ["brin", "goto", "bukalapak"],
      serviceHotelsSpas: ["bobobox", "artotel", "nihi_sumba", "plataran", "fivelements", "potato_head", "yoga_barn", "bisma_eight", "visesa_ubud", "bambu_indah", "ayana", "alila", "aman"],
      serviceTravel: ["garuda"],
      serviceMarketplaces: ["traveloka"]
    })
  },
  {
    id: "thailand-malaysia",
    title: "Thailand & Malaysia",
    content: <ThailandMalaysiaHero />,
    children: CountrySections({
      country: "thailand-malaysia",
      serviceHotelsSpas: ["minor_hotels", "dusit", "banyan_tree", "kamalaya", "chiva_som", "six_senses_th", "standard_bkk"],
      serviceTravel: ["airasia"],
      serviceMarketplaces: ["agoda"]
    })
  },
  {
    id: "japan-korea",
    title: "Japan & Korea",
    content: <JapanKoreaHero />,
    children: CountrySections({
      country: "japan-korea",
      infraInstitutional: ["riken_aip"],
      infraManufacturing: ["toyota", "sony", "panasonic", "honda", "samsung", "hyundai", "lg_corp", "sk_hynix", "posco"],
      infraConstruction: ["obayashi"],
      serviceHotelsSpas: ["hoshino", "apa_hotels", "shilla", "rakuten"]
    })
  },
  {
    id: "australia",
    title: "Australia",
    content: <AustraliaHero />,
    children: CountrySections({
      country: "australia",
      infraInstitutional: ["cba", "anz", "westpac", "telstra"],
      serviceHotelsSpas: ["crown", "meriton", "southern_ocean", "wolgan_valley", "saffire_freycinet", "woolworths"],
      serviceTravel: ["qantas"]
    })
  },
  {
    id: "europe-uk",
    title: "Europe & UK",
    content: <EuropeHero />,
    children: CountrySections({
      country: "europe-uk",
      infraManufacturing: ["siemens", "sap", "airbus", "volkswagen"],
      serviceHotelsSpas: ["lvmh", "kering", "hermes", "locke", "hoxton", "selina", "accor", "ihg", "soho_house", "mama_shelter", "twenty_five_hours"],
    })
  },
];
