import { ArrowMarkers, Arrow, Box, EdgeLabel, DiagramFigure } from "./primitives";

const ID = "arch";

export function ComponentsArchitectureDiagram() {
  return (
    <DiagramFigure
      viewBox="0 0 760 370"
      ariaLabel="Architecture of a harness: context and a loaded skill feed a router and a specialist agent, which proposes a call through a gate to a real system; a return path runs verification, a fabrication guard, and a backstop back toward done; an observability band underneath spans and logs every stage."
      caption={
        <>
          The fast path proposes and executes left to right. The checking path runs right to left underneath it —
          nothing counts as done until verification, the fabrication guard, and the backstop have all had a turn.
          Observability spans and logs every stage in both directions.
        </>
      }
      legend={[
        { tone: "amber", label: "Proposes (probabilistic)" },
        { tone: "emerald", label: "Decides, allows, or verifies (deterministic)" },
        { tone: "rose", label: "Refused" },
        { tone: "muted", label: "External system or passive artifact" },
      ]}
    >
      <ArrowMarkers idPrefix={ID} />

      {/* Satellites feeding the fast path */}
      <Box x={150} y={18} w={150} h={38} label="Context & memory" tone="muted" />
      <Box x={330} y={18} w={110} h={38} label="Skill" tone="muted" />
      <Arrow idPrefix={ID} tone="muted" d="M225,56 L225,92" />
      <Arrow idPrefix={ID} tone="muted" d="M385,56 L385,92" />

      {/* Fast path, left to right */}
      <Box x={20} y={94} w={110} h={50} label="Request" tone="neutral" />
      <Arrow idPrefix={ID} tone="neutral" d="M130,119 L166,119" />
      <Box x={170} y={94} w={110} h={50} label="Router" sublabel="picks the tier" tone="emerald" />
      <Arrow idPrefix={ID} tone="neutral" d="M280,119 L316,119" />
      <Box x={320} y={94} w={130} h={50} label="Specialist agent" sublabel="proposes" tone="amber" />
      <Arrow idPrefix={ID} tone="amber" dashed d="M450,119 L486,119" />
      <EdgeLabel x={468} y={107} tone="amber">proposed call</EdgeLabel>
      <Box x={490} y={94} w={110} h={50} label="Gate" tone="emerald" emphasize />
      <Arrow idPrefix={ID} tone="emerald" d="M600,119 L636,119" />
      <EdgeLabel x={618} y={107} tone="emerald">allow</EdgeLabel>
      <Box x={640} y={94} w={100} h={50} label="System" sublabel="fs · db · api" tone="muted" />

      {/* Deny spur */}
      <Arrow idPrefix={ID} tone="rose" d="M545,144 L545,176" />
      <Box x={480} y={180} w={130} h={30} label="Refused" sublabel="nothing executes" tone="rose" />

      {/* Checking path, right to left */}
      <Arrow idPrefix={ID} tone="emerald" d="M690,144 L690,232" />
      <Box x={640} y={234} w={100} h={50} label="Verification" sublabel="receipt vs. tree" tone="emerald" />
      <Arrow idPrefix={ID} tone="emerald" d="M636,259 L624,259" />
      <Box x={490} y={234} w={130} h={50} label="Fabrication guard" sublabel="empty success caught" tone="emerald" />
      <Arrow idPrefix={ID} tone="emerald" d="M486,259 L454,259" />
      <Box x={320} y={234} w={130} h={50} label="Backstop" sublabel="full suite, after ship" tone="emerald" />
      <Arrow idPrefix={ID} tone="neutral" d="M316,259 L284,259" />
      <Box x={170} y={234} w={110} h={50} label="Done" tone="neutral" />

      {/* Observability band */}
      <Box x={20} y={324} w={720} h={32} label="Observability" sublabel="logs every stage above" tone="muted" rx={6} />
    </DiagramFigure>
  );
}

export default ComponentsArchitectureDiagram;
