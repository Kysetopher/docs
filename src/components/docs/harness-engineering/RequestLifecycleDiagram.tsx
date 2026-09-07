import { ArrowMarkers, Arrow, Box, EdgeLabel, DiagramFigure, type Tone } from "./primitives";

const ID = "lifecycle";
const SPINE_X = 130;
const SPINE_W = 200;
const CX = SPINE_X + SPINE_W / 2;
const GAP = 34;

type StepDef = { label: string; sublabel?: string; tone: Tone; dashed?: boolean; h: number };
type Step = StepDef & { y: number };

function place(defs: StepDef[], startY: number): Step[] {
  let y = startY;
  return defs.map((d) => {
    const step: Step = { ...d, y };
    y += d.h + GAP;
    return step;
  });
}

const before = place(
  [
    { label: "Session start", sublabel: "ship debt & backstop surface", tone: "emerald", h: 40 },
    { label: "Request", tone: "amber", h: 40 },
    { label: "Intake", sublabel: "triage · context · memory", tone: "emerald", h: 40 },
    { label: "Routing", sublabel: "mechanical → frontier", tone: "emerald", h: 40 },
    { label: "Plan", sublabel: "set before the first mutation", tone: "emerald", h: 40 },
    { label: "Proposed call", sublabel: "agents, skills, rules propose", tone: "amber", dashed: true, h: 44 },
  ],
  16,
);

const lastBefore = before[before.length - 1];
const gateY = lastBefore.y + lastBefore.h + GAP;
const gateH = 52;
const refusedY = gateY + gateH + 24;
const refusedX = SPINE_X + SPINE_W + 66;
const refusedW = 150;

const after = place(
  [
    { label: "Tools", sublabel: "fs · db · api", tone: "muted", h: 44 },
    { label: "Verification", sublabel: "receipt keyed to the tree", tone: "emerald", h: 44 },
    { label: "Fabrication guard", sublabel: "empty success is caught", tone: "emerald", h: 44 },
    { label: "Ship", tone: "emerald", h: 40 },
    { label: "Backstop", sublabel: "full suite, after the push", tone: "emerald", h: 44 },
    { label: "Done", sublabel: "needs the stamp", tone: "neutral", h: 40 },
  ],
  gateY + gateH + GAP,
);

const totalHeight = after[after.length - 1].y + after[after.length - 1].h + 20;
const totalWidth = Math.max(580, refusedX + refusedW + 20);

export function RequestLifecycleDiagram() {
  return (
    <DiagramFigure
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      ariaLabel="The harness request lifecycle from session start to done. A gate sits between the proposed call and everything that follows: it either allows the call to continue to tools, verification, fabrication guard, ship, and backstop, or refuses it so nothing executes."
      caption={
        <>
          The spine runs top to bottom. Every step above the gate only prepares a proposal; the gate is the single
          point where a call is allowed to continue down the spine or refused sideways into a dead end where nothing
          executes at all.
        </>
      }
      legend={[
        { tone: "amber", label: "Probabilistic — proposes" },
        { tone: "emerald", label: "Deterministic — decides, allows, or verifies" },
        { tone: "rose", label: "Refused — short-circuits, nothing runs" },
        { tone: "muted", label: "A real external system" },
      ]}
    >
      <ArrowMarkers idPrefix={ID} />

      {before.map((step, i) => {
        const next = before[i + 1];
        return (
          <g key={step.label}>
            <Box
              x={SPINE_X}
              y={step.y}
              w={SPINE_W}
              h={step.h}
              label={step.label}
              sublabel={step.sublabel}
              tone={step.tone}
              dashed={step.dashed}
            />
            {next ? (
              <Arrow
                idPrefix={ID}
                tone={next.label === "Proposed call" ? "amber" : "neutral"}
                dashed={next.label === "Proposed call"}
                d={`M${CX},${step.y + step.h} L${CX},${next.y}`}
              />
            ) : null}
          </g>
        );
      })}

      <Arrow idPrefix={ID} tone="amber" dashed d={`M${CX},${lastBefore.y + lastBefore.h} L${CX},${gateY}`} />

      <Box x={SPINE_X} y={gateY} w={SPINE_W} h={gateH} label="Gate" sublabel="first deny wins" tone="emerald" emphasize />

      <Arrow
        idPrefix={ID}
        tone="rose"
        d={`M${SPINE_X + SPINE_W},${gateY + gateH - 14} L${refusedX},${refusedY + 10}`}
      />
      <EdgeLabel x={SPINE_X + SPINE_W + 8} y={gateY + gateH + 16} tone="rose" anchor="start">
        deny
      </EdgeLabel>
      <Box x={refusedX} y={refusedY} w={refusedW} h={48} label="Refused" sublabel="nothing executes" tone="rose" />

      <Arrow idPrefix={ID} tone="emerald" d={`M${CX},${gateY + gateH} L${CX},${after[0].y}`} />
      <EdgeLabel x={CX + 8} y={gateY + gateH + (after[0].y - gateY - gateH) / 2 + 4} tone="emerald" anchor="start">
        allow
      </EdgeLabel>

      {after.map((step, i) => {
        const next = after[i + 1];
        return (
          <g key={step.label}>
            <Box x={SPINE_X} y={step.y} w={SPINE_W} h={step.h} label={step.label} sublabel={step.sublabel} tone={step.tone} />
            {next ? <Arrow idPrefix={ID} tone="emerald" d={`M${CX},${step.y + step.h} L${CX},${next.y}`} /> : null}
          </g>
        );
      })}
    </DiagramFigure>
  );
}

export default RequestLifecycleDiagram;
