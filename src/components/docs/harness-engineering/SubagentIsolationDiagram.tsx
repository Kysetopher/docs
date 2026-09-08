import { ArrowMarkers, Arrow, Box, SectionLabel, DiagramFigure } from "./primitives";

const ID = "sai";

export function SubagentIsolationDiagram() {
  return (
    <DiagramFigure
      viewBox="0 0 780 320"
      ariaLabel="Parent orchestrator invokes a sandboxed subagent governed by deterministic enforcement gates and hard budget circuit breakers."
      caption={
        <>
          Subagents are bounded execution units: the parent agent delegates a scoped task with explicit token and time budgets.
          All actions proposed by the subagent are trapped by an external deterministic gate before touching any real system.
        </>
      }
      legend={[
        { tone: "amber", label: "Probabilistic agent proposal" },
        { tone: "emerald", label: "Deterministic gate / allowed execution" },
        { tone: "rose", label: "Hard deny / circuit breaker trip" },
        { tone: "muted", label: "Isolated sandbox / underlying resource" },
      ]}
    >
      <ArrowMarkers idPrefix={ID} />

      <SectionLabel x={120} y={22}>1. Parent Orchestrator</SectionLabel>
      <SectionLabel x={370} y={22}>2. Sandboxed Subagent</SectionLabel>
      <SectionLabel x={640} y={22}>3. Hard Gates & Resources</SectionLabel>

      <line x1={240} y1={34} x2={240} y2={300} className="stroke-border" strokeWidth={1} strokeDasharray="2 4" />
      <line x1={500} y1={34} x2={500} y2={300} className="stroke-border" strokeWidth={1} strokeDasharray="2 4" />

      {/* Column 1: Parent */}
      <Box x={35} y={60} w={170} h={52} label="Parent Orchestrator" sublabel="coordinates plan & goals" tone="amber" />
      <Box x={35} y={150} w={170} h={50} label="Hard Budget Bounds" sublabel="max turns, token limit, timeout" tone="emerald" />
      <Box x={35} y={235} w={170} h={50} label="Result Aggregator" sublabel="validates returned summary" tone="muted" />

      {/* Arrows Col 1 -> Col 2 */}
      <Arrow idPrefix={ID} tone="amber" d="M205,86 L285,86" />
      <Arrow idPrefix={ID} tone="emerald" d="M205,175 L285,175" />
      <Arrow idPrefix={ID} tone="neutral" d="M285,260 L205,260" />

      {/* Column 2: Sandboxed Subagent */}
      <rect
        x={280}
        y={48}
        width={180}
        height={245}
        rx={12}
        className="stroke-amber-500/40 fill-amber-500/5"
        strokeWidth={1.2}
        strokeDasharray="4 3"
      />
      <text x={370} y={68} textAnchor="middle" className="fill-amber-600 dark:fill-amber-400 text-[10px] font-semibold uppercase tracking-wider">
        Isolated Sandbox
      </text>

      <Box x={295} y={80} w={150} h={44} label="Specialist Subagent" sublabel="e.g. Codebase Researcher" tone="amber" />
      <Box x={295} y={145} w={150} h={44} label="Ephemeral Workdir" sublabel="isolated scratch / branch" tone="muted" />
      <Box x={295} y={210} w={150} h={44} label="Proposed Tool Call" sublabel="read_file, grep, query" tone="amber" />

      {/* Arrows Col 2 -> Col 3 */}
      <Arrow idPrefix={ID} tone="amber" d="M445,232 L540,150" />

      {/* Column 3: Hard Gate & Enforcement */}
      <Box x={540} y={120} w={105} h={64} label="Deterministic Gate" sublabel="pre-execution check" tone="emerald" emphasize />
      
      {/* Branches from Gate */}
      <Arrow idPrefix={ID} tone="emerald" d="M645,135 L675,85" />
      <Arrow idPrefix={ID} tone="rose" d="M645,165 L675,215" />

      <Box x={675} y={65} w={95} h={42} label="Allowed Call" sublabel="safe fs / API" tone="emerald" />
      <Box x={675} y={195} w={95} h={42} label="Hard Deny" sublabel="blocked / abort" tone="rose" />

      {/* Circuit breaker return indicator */}
      <text x={640} y={290} textAnchor="middle" className="fill-muted-foreground text-[9px]">
        First deny aborts before real systems are touched
      </text>
    </DiagramFigure>
  );
}

export default SubagentIsolationDiagram;
