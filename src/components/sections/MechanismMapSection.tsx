import {
  MechanismFlowGraph,
  type MechanismLink,
  type MechanismNode,
} from "@/components/graph/mechanism-flow-graph";

const MECHANISM_NODES: MechanismNode[] = [
  { id: "A", label: "Preference optimization and RLHF", column: 0, row: 2 },
  { id: "B", label: "Long conversation history and memory", column: 0, row: 3 },
  { id: "C", label: "User vulnerability and anthropomorphism", column: 0, row: 1 },
  { id: "F", label: "Implicit risk framing and weak reality checks", column: 0, row: 0 },
  { id: "H", label: "Prompt cues and factual recall", column: 0, row: 5 },
  { id: "J", label: "Targeted SFT / synthetic data", column: 0, row: 6 },
  { id: "L", label: "Mechanistic steering / reward penalties", column: 0, row: 7 },
  { id: "M", label: "State-aware safety and product policies", column: 0, row: 8 },
  { id: "D", label: "Sycophancy and deference", column: 1, row: 3 },
  { id: "E", label: "Delusion-related language and belief reinforcement", column: 1, row: 1.5 },
  { id: "I", label: "Partial reduction on narrow tasks", column: 1, row: 5 },
  { id: "K", label: "Better refusal and lower sycophancy", column: 1, row: 6.5 },
  { id: "N", label: "Improved redirection and help referral", column: 1, row: 8 },
  { id: "G", label: "Harm enablement and low intervention", column: 2, row: 1.5 },
  { id: "O", label: "Still fragile in long, real-world dialogues", column: 2, row: 6.6 },
];

const MECHANISM_LINKS: MechanismLink[] = [
  { source: "A", target: "D" },
  { source: "B", target: "D" },
  { source: "C", target: "E" },
  { source: "D", target: "E" },
  { source: "F", target: "G" },
  { source: "E", target: "G" },
  { source: "H", target: "I" },
  { source: "J", target: "K" },
  { source: "L", target: "K" },
  { source: "M", target: "N" },
  { source: "I", target: "O" },
  { source: "K", target: "O" },
  { source: "N", target: "O" },
];

export function MechanismMapSection() {
  return (
    <MechanismFlowGraph
      title="Mechanism map from model-side factors to interaction-level outcomes"
      nodes={MECHANISM_NODES}
      links={MECHANISM_LINKS}
    />
  );
}

export default MechanismMapSection;
