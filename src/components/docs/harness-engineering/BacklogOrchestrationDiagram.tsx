import { ArrowMarkers, Arrow, Box, SectionLabel, DiagramFigure } from "./primitives";

const ID = "bod";

export function BacklogOrchestrationDiagram() {
  return (
    <DiagramFigure
      viewBox="0 0 820 340"
      ariaLabel="Multiple collaborators define project goals and file issues in a shared backlog. The harness autonomously triages, builds on isolated branches, runs CI/CD verification, and prompts for human PR approval."
      caption={
        <>
          Instead of prompting changes in conflicting isolated chats, multiple developers define goals and bugs in a shared backlog.
          The harness deterministically schedules tasks, dispatches autonomous background subagents to build and verify on isolated branches, and submits PRs for team review.
        </>
      }
      legend={[
        { tone: "amber", label: "Collaborator intent & specs" },
        { tone: "emerald", label: "Harness scheduler, CI/CD gates & receipts" },
        { tone: "muted", label: "Shared backlog, git branch & documentation" },
      ]}
    >
      <ArrowMarkers idPrefix={ID} />

      <SectionLabel x={110} y={22}>1. Team Intent</SectionLabel>
      <SectionLabel x={350} y={22}>2. Shared Control Plane</SectionLabel>
      <SectionLabel x={640} y={22}>3. Autonomous Background Loop</SectionLabel>

      <line x1={205} y1={34} x2={205} y2={315} className="stroke-border" strokeWidth={1} strokeDasharray="2 4" />
      <line x1={490} y1={34} x2={490} y2={315} className="stroke-border" strokeWidth={1} strokeDasharray="2 4" />

      {/* Column 1: Team Members */}
      <Box x={20} y={55} w={165} h={46} label="Collaborator A" sublabel="defines feature spec / goals" tone="amber" />
      <Box x={20} y={135} w={165} h={46} label="Collaborator B" sublabel="files bug / task reproduction" tone="amber" />
      <Box x={20} y={230} w={165} h={52} label="Team PR Review" sublabel="inspects test receipt & diff" tone="emerald" />

      {/* Arrows Col 1 -> Col 2 */}
      <Arrow idPrefix={ID} tone="amber" d="M185,78 L235,110" />
      <Arrow idPrefix={ID} tone="amber" d="M185,158 L235,125" />

      {/* Column 2: Shared Backlog & Harness Scheduler */}
      <Box x={235} y={85} w={225} h={55} label="Shared Backlog / Issue Tracker" sublabel="single source of truth for priority" tone="muted" />
      <Arrow idPrefix={ID} tone="emerald" d="M347,140 L347,180" />
      <Box x={235} y={180} w={225} h={58} label="Harness Triage & Scheduler" sublabel="dependency checking & task lock" tone="emerald" emphasize />

      {/* Arrow Col 2 -> Col 3 */}
      <Arrow idPrefix={ID} tone="emerald" d="M460,209 L530,95" />

      {/* Column 3: Autonomous Background Loop */}
      <Box x={530} y={55} w={245} h={52} label="Isolated Branch Worker" sublabel="spawns scoped subagent on task branch" tone="amber" />
      <Arrow idPrefix={ID} tone="neutral" d="M652,107 L652,135" />
      
      <Box x={530} y={135} w={245} h={52} label="Automated CI/CD & Receipt" sublabel="runs unit tests, lints & build stamp" tone="emerald" />
      <Arrow idPrefix={ID} tone="emerald" d="M652,187 L652,215" />

      <Box x={530} y={215} w={245} h={52} label="Open Pull Request" sublabel="attaches diff + verification proof" tone="muted" />

      {/* PR to Team Review */}
      <Arrow idPrefix={ID} tone="emerald" d="M530,241 L185,256" />

      {/* Auto-Sync Feedback Loop */}
      <path
        d="M102,282 L102,305 L720,305 L720,267"
        fill="none"
        className="stroke-emerald-600"
        strokeWidth={1.4}
        strokeDasharray="4 3"
      />
      <text x={410} y={322} textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-400 text-[9px] font-medium">
        On PR Merge: Harness auto-closes issue, updates documentation & syncs project goals
      </text>
    </DiagramFigure>
  );
}

export default BacklogOrchestrationDiagram;
