import { ArrowMarkers, Arrow, Box, SectionLabel, DiagramFigure } from "./primitives";

const ID = "lp";

export function LeastPrivilegeDiagram() {
  return (
    <DiagramFigure
      viewBox="0 0 700 320"
      ariaLabel="One generalist agent with access to every tool versus several scoped specialist agents, each connected to exactly one narrow capability."
      caption={
        <>
          One generalist agent means one identity that can reach everything — every arrow is a path a mistake or a
          compromise could travel. Scoped specialists shrink each arrow to exactly the capability the task needs, and
          no more.
        </>
      }
      legend={[
        { tone: "rose", label: "Broad, unscoped access" },
        { tone: "emerald", label: "Least-privilege, scoped access" },
      ]}
    >
      <ArrowMarkers idPrefix={ID} />

      <SectionLabel x={165} y={22}>One generalist</SectionLabel>
      <SectionLabel x={520} y={22}>Scoped specialists</SectionLabel>
      <line x1={335} y1={34} x2={335} y2={300} className="stroke-border" strokeWidth={1} strokeDasharray="2 4" />

      {/* Left: generalist fanning out to everything */}
      <Box x={95} y={46} w={140} h={48} label="Generalist agent" sublabel="every tool, no limits" tone="rose" />
      <Arrow idPrefix={ID} tone="rose" strokeWidth={1.1} d="M130,94 L52,214" />
      <Arrow idPrefix={ID} tone="rose" strokeWidth={1.1} d="M152,94 L127,214" />
      <Arrow idPrefix={ID} tone="rose" strokeWidth={1.1} d="M178,94 L202,214" />
      <Arrow idPrefix={ID} tone="rose" strokeWidth={1.1} d="M200,94 L277,214" />
      <Box x={20} y={218} w={64} h={38} label="fs" tone="muted" />
      <Box x={95} y={218} w={64} h={38} label="db" tone="muted" />
      <Box x={170} y={218} w={64} h={38} label="api" tone="muted" />
      <Box x={245} y={218} w={64} h={38} label="prod cfg" tone="muted" />

      {/* Right: three narrow specialists */}
      <Box x={365} y={44} w={155} h={46} label="Security auditor" sublabel="read-only" tone="emerald" />
      <Arrow idPrefix={ID} tone="emerald" d="M520,67 L566,67" />
      <Box x={570} y={44} w={110} h={46} label="fs (read)" tone="muted" />

      <Box x={365} y={124} w={155} h={46} label="Test runner" sublabel="cannot edit" tone="emerald" />
      <Arrow idPrefix={ID} tone="emerald" d="M520,147 L566,147" />
      <Box x={570} y={124} w={110} h={46} label="Run tests" tone="muted" />

      <Box x={365} y={204} w={155} h={46} label="Reviewer" sublabel="no self-approve" tone="emerald" />
      <Arrow idPrefix={ID} tone="emerald" d="M520,227 L566,227" />
      <Box x={570} y={204} w={110} h={46} label="Review PR" tone="muted" />
    </DiagramFigure>
  );
}

export default LeastPrivilegeDiagram;
