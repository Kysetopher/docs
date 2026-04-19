export type DocTagColor =
  | "red"
  | "sky"
  | "violet"
  | "fuchsia"
  | "teal"
  | "indigo"
  | "cyan"
  | "green"
  | "lime"
  | "orange"
  | "rose"
  | "emerald"
  | "amber"
  | "blue"
  | "slate"
  | "cyan-dark"
  | "emerald-dark"
  | "orange-dark"
  | "indigo-dark"
  | "blue-bright"
  | "sky-dark"
  | "yellow-dark"
  | "slate-mid";

export type DocTag = {
  id: string;
  label: string;
  icon: string;
  description: string;
  color: DocTagColor;
};

export const DOC_TAGS = {
  risk: {
    id: "risk",
    label: "Risk",
    icon: "mdi:alert-outline",
    description: "Potential harm indicators and destabilization signals.",
    color: "red",
  },
  clinicalContext: {
    id: "clinical-context",
    label: "Clinical context",
    icon: "mdi:stethoscope",
    description: "Clinical framing and psychiatric interpretation context.",
    color: "sky",
  },
  referenced: {
    id: "referenced",
    label: "Referenced",
    icon: "mdi:book-open-variant",
    description: "Sections anchored to published sources.",
    color: "violet",
  },
  aiPsychosisFramework: {
    id: "ai-psychosis-framework",
    label: "AI psychosis framework",
    icon: "mdi:head-cog-outline",
    description: "Framework-level model for AI-associated psychosis pathways.",
    color: "fuchsia",
  },
  aiDelusionSafeguards: {
    id: "ai-delusion-safeguards",
    label: "AI delusion safeguards",
    icon: "mdi:shield-check-outline",
    description: "Safeguards and containment strategies for delusion co-creation risk.",
    color: "teal",
  },
  literatureCase: {
    id: "literature-case",
    label: "Literature case",
    icon: "mdi:file-document-outline",
    description: "Published case framing from peer-reviewed literature.",
    color: "indigo",
  },
  detection: {
    id: "detection",
    label: "Detection",
    icon: "mdi:magnify",
    description: "Signals and methods for early identification.",
    color: "cyan",
  },
  safety: {
    id: "safety",
    label: "Safety",
    icon: "mdi:shield-outline",
    description: "Safety mitigations and protective response practices.",
    color: "green",
  },
  earlyStage: {
    id: "early-stage",
    label: "Early stage",
    icon: "mdi:sprout-outline",
    description: "Initial phase patterns and precursor dynamics.",
    color: "lime",
  },
  escalation: {
    id: "escalation",
    label: "Escalation",
    icon: "mdi:trending-up",
    description: "Progressive intensification of risk and symptoms.",
    color: "orange",
  },
  criticalRisk: {
    id: "critical-risk",
    label: "Critical risk",
    icon: "mdi:alert-decagram-outline",
    description: "High-risk phase requiring urgent intervention.",
    color: "red",
  },
  emergency: {
    id: "emergency",
    label: "Emergency",
    icon: "mdi:ambulance",
    description: "Immediate-response situations with acute safety concern.",
    color: "rose",
  },
  policy: {
    id: "policy",
    label: "Policy",
    icon: "mdi:scale-balance",
    description: "Regulatory, institutional, and standards-level considerations.",
    color: "emerald",
  },
  advocacy: {
    id: "advocacy",
    label: "Advocacy",
    icon: "mdi:bullhorn-outline",
    description: "Stakeholder mobilization and recognition efforts.",
    color: "amber",
  },
  evidence: {
    id: "evidence",
    label: "Evidence",
    icon: "mdi:clipboard-text-search-outline",
    description: "Data quality, rigor, and substantiation requirements.",
    color: "blue",
  },
  governance: {
    id: "governance",
    label: "Governance",
    icon: "mdi:domain",
    description: "Institutional oversight, accountability, and protocols.",
    color: "slate",
  },
  medical: {
    id: "medical",
    label: "Medical",
    icon: "mdi:medical-bag",
    description: "Clinical care delivery and treatment system roles.",
    color: "cyan-dark",
  },
  publicHealth: {
    id: "public-health",
    label: "Public health",
    icon: "mdi:earth",
    description: "Population-level health priorities and intervention planning.",
    color: "emerald-dark",
  },
  research: {
    id: "research",
    label: "Research",
    icon: "mdi:flask-outline",
    description: "Empirical investigation, validation, and discovery.",
    color: "violet",
  },
  positioning: {
    id: "positioning",
    label: "Positioning",
    icon: "mdi:compass-outline",
    description: "Strategic framing of scope, leverage, and direction.",
    color: "orange-dark",
  },
  framework: {
    id: "framework",
    label: "Framework",
    icon: "mdi:vector-polyline",
    description: "Structured conceptual model for classification and action.",
    color: "indigo-dark",
  },
  metrics: {
    id: "metrics",
    label: "Metrics",
    icon: "mdi:chart-line",
    description: "Operational indicators for measurement and monitoring.",
    color: "blue-bright",
  },
  execution: {
    id: "execution",
    label: "Execution",
    icon: "mdi:rocket-launch-outline",
    description: "Implementation plan and operational rollout steps.",
    color: "sky-dark",
  },
  fieldStatus: {
    id: "field-status",
    label: "Field status",
    icon: "mdi:radar",
    description: "Current maturity level and ecosystem readiness.",
    color: "violet",
  },
  landscape: {
    id: "landscape",
    label: "Landscape",
    icon: "mdi:map-outline",
    description: "Stakeholder map and ecosystem composition.",
    color: "blue",
  },
  clinical: {
    id: "clinical",
    label: "Clinical",
    icon: "mdi:hospital-box-outline",
    description: "Clinical actor roles and care pathway relevance.",
    color: "cyan",
  },
  aiLabs: {
    id: "ai-labs",
    label: "AI labs",
    icon: "mdi:robot-outline",
    description: "Model builders and safety research organizations.",
    color: "indigo",
  },
  mechanisms: {
    id: "mechanisms",
    label: "Mechanisms",
    icon: "mdi:cogs",
    description: "Underlying causal and reinforcement processes.",
    color: "violet",
  },
  trustAndSafety: {
    id: "trust-and-safety",
    label: "Trust and safety",
    icon: "mdi:shield-account-outline",
    description: "Platform risk teams and real-time incident controls.",
    color: "emerald",
  },
  earlySignals: {
    id: "early-signals",
    label: "Early signals",
    icon: "mdi:signal-distance-variant",
    description: "Weak signals and emerging risk indicators.",
    color: "yellow-dark",
  },
  gapAnalysis: {
    id: "gap-analysis",
    label: "Gap analysis",
    icon: "mdi:chart-timeline-variant",
    description: "Cross-silo capability gaps and missing interfaces.",
    color: "slate-mid",
  },
} as const satisfies Record<string, DocTag>;



