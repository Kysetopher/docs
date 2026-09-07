import { ArrowMarkers, Arrow, Box, EdgeLabel, DiagramFigure } from "./primitives";

const ID = "auth";

export function AuthorityDiagram() {
  return (
    <DiagramFigure
      viewBox="0 0 620 220"
      ariaLabel="The model proposes a call, and only a gate decides whether it executes or is refused. The model itself never holds the deciding vote."
      caption={
        <>
          The model may propose the migration; it is never the thing that decides the migration is safe. Only the
          gate's outcome — allow or deny — is authoritative.
        </>
      }
      legend={[
        { tone: "amber", label: "Proposes (probabilistic)" },
        { tone: "emerald", label: "Decides / executes (deterministic)" },
        { tone: "rose", label: "Refused (deterministic)" },
      ]}
    >
      <ArrowMarkers idPrefix={ID} />

      <Box x={30} y={78} w={150} h={54} label="Model" sublabel="proposes a call" tone="amber" />
      <Arrow idPrefix={ID} tone="amber" dashed d="M180,105 L246,105" />
      <EdgeLabel x={213} y={95} tone="amber">proposed call</EdgeLabel>
      <Box x={250} y={78} w={150} h={54} label="Gate" sublabel="the only decider" tone="emerald" emphasize />

      <Arrow idPrefix={ID} tone="emerald" d="M400,92 L456,54" />
      <EdgeLabel x={410} y={68} tone="emerald" anchor="start">allow</EdgeLabel>
      <Box x={460} y={30} w={140} h={44} label="Executes" sublabel="reaches a real tool" tone="emerald" />

      <Arrow idPrefix={ID} tone="rose" d="M400,118 L456,158" />
      <EdgeLabel x={410} y={148} tone="rose" anchor="start">deny</EdgeLabel>
      <Box x={460} y={140} w={140} h={44} label="Refused" sublabel="nothing runs" tone="rose" />
    </DiagramFigure>
  );
}

export default AuthorityDiagram;
