import { ArrowMarkers, Arrow, Box, EdgeLabel, SectionLabel, DiagramFigure } from "./primitives";

const ID = "fed";

export function FederatedContextDiagram() {
  return (
    <DiagramFigure
      viewBox="0 0 720 340"
      ariaLabel="Centralizing every system's data into one knowledge graph versus a federated layer where each system keeps its own truth and meaning is derived on read."
      caption={
        <>
          Centralizing copies every system's data into one store, and the copy starts drifting the moment it lands. A
          federated layer holds only the meaning — names and relationships — and derives the data on read, so each
          system stays the one source of truth for itself.
        </>
      }
      legend={[
        { tone: "rose", label: "Copied in — drifts from its source" },
        { tone: "emerald", label: "Derived on read — no copy" },
      ]}
    >
      <ArrowMarkers idPrefix={ID} />

      <SectionLabel x={180} y={22}>Centralized</SectionLabel>
      <SectionLabel x={545} y={22}>Federated</SectionLabel>
      <line x1={350} y1={34} x2={350} y2={320} className="stroke-border" strokeWidth={1} strokeDasharray="2 4" />

      {/* Left: hub and spoke, everything copied into one graph */}
      <Box x={20} y={40} w={95} h={38} label="Repo" tone="muted" />
      <Box x={175} y={40} w={95} h={38} label="Tickets" tone="muted" />
      <Box x={20} y={250} w={95} h={38} label="Docs" tone="muted" />
      <Box x={175} y={250} w={95} h={38} label="DB" tone="muted" />
      <Box x={120} y={140} w={120} h={50} label="Knowledge graph" sublabel="one copy of everything" tone="rose" emphasize />

      <Arrow idPrefix={ID} tone="rose" d="M67,78 L145,140" />
      <Arrow idPrefix={ID} tone="rose" d="M222,78 L205,140" />
      <Arrow idPrefix={ID} tone="rose" d="M67,250 L145,190" />
      <Arrow idPrefix={ID} tone="rose" d="M222,250 L205,190" />
      <EdgeLabel x={95} y={112} tone="rose" anchor="start">copied in</EdgeLabel>

      <text x={180} y={315} textAnchor="middle" className="fill-muted-foreground text-[9.5px]">
        a rename in one system breaks the copy everywhere else
      </text>

      {/* Right: federated layer, systems keep their own truth */}
      <Box x={380} y={54} w={320} h={44} label="Semantic layer" sublabel="names · relationships · meaning" tone="emerald" emphasize />

      <Box x={385} y={250} w={70} h={40} label="Repo" tone="muted" />
      <Box x={470} y={250} w={70} h={40} label="Tickets" tone="muted" />
      <Box x={555} y={250} w={70} h={40} label="Docs" tone="muted" />
      <Box x={640} y={250} w={70} h={40} label="DB" tone="muted" />

      <Arrow idPrefix={ID} tone="emerald" dashed d="M420,250 L420,102" />
      <Arrow idPrefix={ID} tone="emerald" dashed d="M505,250 L505,102" />
      <Arrow idPrefix={ID} tone="emerald" dashed d="M590,250 L590,102" />
      <Arrow idPrefix={ID} tone="emerald" dashed d="M675,250 L675,102" />
      <EdgeLabel x={545} y={185} tone="emerald">derive on read</EdgeLabel>

      <text x={545} y={315} textAnchor="middle" className="fill-muted-foreground text-[9.5px]">
        each system keeps its own truth; nothing is copied
      </text>
    </DiagramFigure>
  );
}

export default FederatedContextDiagram;
