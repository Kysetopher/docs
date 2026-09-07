import { ArrowMarkers, Arrow, Box, SectionLabel, DiagramFigure } from "./primitives";

const ID = "gvg";

export function GuardrailsVsGatesDiagram() {
  return (
    <DiagramFigure
      viewBox="0 0 820 220"
      ariaLabel="A guardrail is read by the model but the action executes whether or not the model follows it. A gate is a mandatory chokepoint: the only way through is by being allowed or denied."
      caption={
        <>
          A guardrail sits inside the model's own context — reading it is optional in practice, and the action reaches
          the same place whether the model follows it or not. A gate sits outside the model's reasoning: it is the
          only path through, and it is the one thing that decides allow or deny.
        </>
      }
      legend={[
        { tone: "amber", label: "The model's own reasoning" },
        { tone: "emerald", label: "Enforced, mandatory decision" },
        { tone: "rose", label: "Executes unchecked, or is denied" },
      ]}
    >
      <ArrowMarkers idPrefix={ID} />

      <SectionLabel x={225} y={24}>Guardrail — advisory</SectionLabel>
      <SectionLabel x={645} y={24}>Gate — enforced</SectionLabel>
      <line x1={470} y1={34} x2={470} y2={200} className="stroke-border" strokeWidth={1} strokeDasharray="2 4" />

      {/* Left: guardrail can be routed around */}
      <Box x={30} y={110} w={100} h={44} label="Model" tone="amber" />
      <Box x={170} y={70} w={130} h={50} label="Project rules" sublabel="advisory only" tone="neutral" dashed />
      <Box x={330} y={110} w={120} h={44} label="Action executes" sublabel="either way" tone="rose" />

      <Arrow idPrefix={ID} tone="neutral" d="M130,132 L330,132" />
      <Arrow idPrefix={ID} tone="amber" dashed d="M130,120 L170,95" />
      <Arrow idPrefix={ID} tone="amber" dashed d="M300,95 L330,120" />
      <text x={225} y={192} textAnchor="middle" className="fill-muted-foreground text-[9.5px]">
        both paths reach the same action
      </text>

      {/* Right: gate is the only way through */}
      <Box x={500} y={110} w={100} h={44} label="Model" tone="amber" />
      <Box x={630} y={95} w={110} h={60} label="Gate" sublabel="mandatory" tone="emerald" emphasize />
      <Box x={750} y={60} w={70} h={36} label="Allow" tone="emerald" />
      <Box x={750} y={140} w={70} h={36} label="Deny" tone="rose" />

      <Arrow idPrefix={ID} tone="neutral" d="M600,132 L626,125" />
      <Arrow idPrefix={ID} tone="emerald" d="M740,108 L748,80" />
      <Arrow idPrefix={ID} tone="rose" d="M740,148 L748,156" />
      <text x={645} y={192} textAnchor="middle" className="fill-muted-foreground text-[9.5px]">
        one path, and it forks only at the gate
      </text>
    </DiagramFigure>
  );
}

export default GuardrailsVsGatesDiagram;
