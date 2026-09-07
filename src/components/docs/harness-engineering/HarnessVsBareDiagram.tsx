import { ArrowMarkers, Arrow, Box, EdgeLabel, SectionLabel, DiagramFigure } from "./primitives";

const ID = "hvb";

export function HarnessVsBareDiagram() {
  return (
    <DiagramFigure
      viewBox="0 0 680 400"
      ariaLabel="Comparison of a request path with no harness versus a request path with a harness. Without a harness the model acts on the system directly. With a harness, the model's call passes through a gate that can allow or deny it before it reaches the system."
      caption={
        <>
          The same request, with and without a harness. A harness inserts one thing a bare model call doesn't have: a
          decision point between the model proposing an action and anything actually executing it. A denial means the
          call never reaches a real system at all.
        </>
      }
      legend={[
        { tone: "amber", label: "Probabilistic — the model proposes" },
        { tone: "emerald", label: "Deterministic — a mechanism decides" },
        { tone: "rose", label: "Unchecked or refused" },
      ]}
    >
      <ArrowMarkers idPrefix={ID} />

      <SectionLabel x={150} y={26}>No harness</SectionLabel>
      <SectionLabel x={490} y={26}>With a harness</SectionLabel>

      <line x1={340} y1={40} x2={340} y2={360} className="stroke-border" strokeWidth={1} strokeDasharray="2 4" />

      {/* Left column: bare model */}
      <Box x={90} y={48} w={120} h={40} label="Request" tone="neutral" />
      <Arrow idPrefix={ID} tone="neutral" d="M150,88 L150,124" />
      <Box x={90} y={128} w={120} h={44} label="Model" tone="neutral" />
      <Arrow idPrefix={ID} tone="rose" strokeWidth={2} d="M150,172 L150,296" />
      <EdgeLabel x={166} y={236} tone="rose" anchor="start">acts on the system</EdgeLabel>
      <EdgeLabel x={166} y={248} tone="rose" anchor="start">unconditionally</EdgeLabel>
      <Box x={90} y={300} w={120} h={44} label="System" sublabel="fs · db · api" tone="muted" />

      {/* Right column: harnessed model */}
      <Box x={420} y={48} w={140} h={40} label="Request" tone="neutral" />
      <Arrow idPrefix={ID} tone="neutral" d="M490,88 L490,120" />
      <Box x={420} y={124} w={140} h={44} label="Model" sublabel="proposes" tone="amber" />
      <Arrow idPrefix={ID} tone="amber" dashed d="M490,168 L490,204" />
      <EdgeLabel x={508} y={190} tone="amber" anchor="start">proposed call</EdgeLabel>
      <Box x={420} y={208} w={140} h={44} label="Gate" sublabel="decides" tone="emerald" emphasize />

      <Arrow idPrefix={ID} tone="emerald" d="M470,252 L400,298" />
      <EdgeLabel x={408} y={280} tone="emerald" anchor="start">allow</EdgeLabel>
      <Arrow idPrefix={ID} tone="rose" d="M510,252 L535,298" />
      <EdgeLabel x={520} y={280} tone="rose" anchor="start">deny</EdgeLabel>

      <Box x={345} y={300} w={110} h={46} label="Allow" sublabel="reaches the system" tone="emerald" />
      <Box x={475} y={300} w={110} h={46} label="Deny" sublabel="nothing executes" tone="rose" />
    </DiagramFigure>
  );
}

export default HarnessVsBareDiagram;
