import type { DocRecord, DocSpace } from "@/lib/records/doc-types";
import {
  HarnessVsBareDiagram,
  AuthorityDiagram,
  LeastPrivilegeDiagram,
  FederatedContextDiagram,
  RequestLifecycleDiagram,
  ComponentsArchitectureDiagram,
  GuardrailsVsGatesDiagram,
  SubagentIsolationDiagram,
  BacklogOrchestrationDiagram,
} from "@/components/docs/harness-engineering";

const spaceId = "harness-engineering";

function createDoc(
  id: string,
  cardTitle: string,
  cardDescription: string,
  headerTitle: string,
  headerDescription: string,
  cardIcon: string,
  sections: DocRecord["sections"],
): DocRecord {
  return {
    id,
    spaceId,
    href: `/spaces/${spaceId}/${id}`,
    cardTitle,
    cardDescription,
    cardIcon,
    header: {
      title: headerTitle,
      description: headerDescription,
      icon: cardIcon,
    },
    sections,
  };
}

function Badge({ kind }: { kind: "deterministic" | "probabilistic" }) {
  const isDeterministic = kind === "deterministic";
  return (
    <span
      className={
        "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide " +
        (isDeterministic
          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          : "bg-amber-500/10 text-amber-600 dark:text-amber-400")
      }
    >
      {isDeterministic ? "Deterministic" : "Probabilistic"}
    </span>
  );
}

/* ---------------------------------------------------------------------- */
/* Overview                                                                */
/* ---------------------------------------------------------------------- */

const overviewSections: DocRecord["sections"] = [
  {
    id: "definition",
    title: "Definition",
    summary: "A harness is the engineered scaffolding around a model that a raw prompt doesn't have.",
    content: (
      <div className="rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm">
        <p className="text-sm leading-6 text-muted-foreground">
          The term borrows from the older idea of a <span className="font-medium text-foreground">test harness</span>{" "}
          in software engineering: a scaffold that holds a component in place under controlled, repeatable conditions
          so its behavior can be checked instead of trusted. An{" "}
          <span className="font-medium text-foreground">agent harness</span> applies the same idea to a language
          model. The model contributes judgment and language; the harness contributes everything that makes that
          judgment safe and repeatable to act on — routing, memory, tool access, permission boundaries, and
          verification of what actually happened.
        </p>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Coding assistants like Claude Code, Codex, and Cursor are themselves harnesses in this sense: a model on its
          own cannot read a repo, run a shell command, or open a pull request. The harness is what turns those
          actions into things the model can safely trigger and a human can safely review.
        </p>
      </div>
    ),
  },
  {
    id: "the-diagnosis",
    title: "The Diagnosis",
    summary: "Reliability is a property of the system around the model, not the model itself.",
    content: (
      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Claim</p>
          <h3 className="mt-2 text-xl font-semibold text-foreground">
            The model is usually capable of the right answer.
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            What decides whether you get it is everything around the call: whether the constraint from four turns ago
            is still in context, whether the tool reached the file that was meant, whether anything checked the
            result before it shipped. A model that "knows" the right answer in one turn can still act on the wrong
            one in the next, because nothing carried the constraint forward or checked the output.
          </p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">A familiar texture</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
            <li>The agent forgets a constraint it was given four turns ago.</li>
            <li>It edits the file that looked right instead of the one that was.</li>
            <li>It reports a test passed that it never ran.</li>
            <li>It touches production config because nothing stopped it.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "the-pattern",
    title: "The Pattern",
    summary: "Every failure above is a missing mechanism, not a missing capability.",
    content: (
      <div className="space-y-4">
        <div className="rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm">
          <p className="text-sm leading-6 text-muted-foreground">
            The model could have done the right thing in each case above. Nothing required it to, and nothing
            detected that it hadn't. A <span className="font-medium text-foreground">harness</span> is the set of
            mechanisms that closes that loop — and because mechanisms are engineering rather than persuasion, they
            transfer: from team to team, from codebase to codebase, and from one model generation to the next.
          </p>
        </div>
        <HarnessVsBareDiagram />
      </div>
    ),
  },
  {
    id: "cost-as-an-engineering-problem",
    title: "Cost As An Engineering Problem",
    summary: "Cost becomes a design constraint once agents run unattended and at scale.",
    content: (
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-background/60 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Where it bites</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            One person driving one assistant is cheap enough to ignore. A fleet of agents running unattended is not:
            every retry, every re-read of a file the agent already had, every wide search it should never have run
            adds up in tokens, latency, and risk at the same time.
          </p>
        </div>
        <div className="rounded-2xl border border-amber-400/20 bg-amber-500/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">What controls it</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Routing by difficulty, scoping what each agent may read, and stopping a run the moment a gate refuses it
            are the same mechanisms that produce reliability, pointed at cost instead. Reliability and cost control
            are not separate concerns — they come from the same design.
          </p>
        </div>
      </div>
    ),
  },
];

/* ---------------------------------------------------------------------- */
/* Core principles                                                        */
/* ---------------------------------------------------------------------- */

const corePrinciplesSections: DocRecord["sections"] = [
  {
    id: "deterministic-authority",
    title: "Deterministic Steps Hold Authority",
    summary: "Learned state ranks. It never permits.",
    content: (
      <div className="space-y-4">
        <div className="rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm">
          <p className="text-sm leading-6 text-muted-foreground">
            A harness splits every step into one of two kinds. Probabilistic steps — the model reasoning, planning, or
            proposing a tool call — may only <span className="font-medium text-foreground">suggest</span>. Deterministic
            steps — routing, gates, verification — are the only ones allowed to{" "}
            <span className="font-medium text-foreground">decide</span>. An agent may propose the migration; it is
            never the thing that decides the migration is safe.
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            This is why instructions written into a system prompt or a project file are advisory rather than a
            control: the model reads them and mostly complies, but "mostly" is not a guarantee. A rule only becomes a
            guarantee once something outside the model's own reasoning enforces it — typically a hook or middleware
            that intercepts the actual tool call and can refuse it outright, regardless of what the model intended.
          </p>
        </div>
        <AuthorityDiagram />
      </div>
    ),
  },
  {
    id: "least-privilege-agents",
    title: "Least-Privilege Agents",
    summary: "Narrow scope is a reliability property, not just a security one.",
    content: (
      <div className="space-y-6">
        <div className="rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm">
          <p className="text-sm leading-6 text-muted-foreground">
            Rather than one generalist agent with access to everything, a harness tends to be organized as a library
            of scoped specialists: a security auditor that can only read, a test runner that cannot edit source, a
            reviewer that cannot approve its own work. This borrows directly from the principle of least privilege in
            security engineering, applied to agents instead of user accounts — each one gets exactly the tools and
            context its task needs, and no more.
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            The same scoping shows up as reusable procedures ("skills" or playbooks) that a specialist loads only when
            the task calls for it, and as bridges — often built on protocols like MCP — that expose an organization's
            own systems (issue trackers, wikis, databases) as first-class callable tools instead of content pasted
            into a prompt by hand.
          </p>
        </div>

        <LeastPrivilegeDiagram />

        {/* Subagent Workspace Isolation Models */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Subagent Workspace Isolation Modes
          </h4>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/60 bg-background/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                1. Read-Only Sandbox
              </p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Equipped strictly with inspection tools (<code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">view_file</code>,{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">grep_search</code>, web queries).
                Write tools and modifying shell execution are stripped at spawn time.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                2. Isolated Scratch / Branch
              </p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Spawns into an ephemeral scratch workdir or detached git branch. Mutations, temp artifacts, and test logs
                remain isolated until explicitly approved and merged back by the orchestrator.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                3. Bounded Spawn & Depth Limits
              </p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Hard caps prevent uncontrolled recursive subagent spawning (e.g., max spawn depth = 1, max concurrent subagents = 3).
                Subagents communicate strictly via structured message envelopes back to the parent.
              </p>
            </div>
          </div>
        </div>

        <SubagentIsolationDiagram />
      </div>
    ),
  },
  {
    id: "federated-context",
    title: "Federated Over Centralized Context",
    summary: "Shared understanding works best when each system keeps its own truth.",
    content: (
      <div className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-background/60 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Why one graph fails</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Centralizing everything an organization knows into one knowledge graph is the obvious move, and it
              tends not to hold: every system's data has to be reshaped to fit the store, the copy starts drifting
              from its source the day after it lands, and one team's rename quietly breaks everyone downstream.
            </p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">What survives</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              A federated layer: each system keeps its own source of truth, a shared layer holds only the semantics —
              names, relationships, meaning — and the actual data is derived on read rather than copied on write.
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              A related property worth designing for is runtime portability: agents, gates, doctrine, and tool
              bridges live once as versioned definitions and render into whichever assistant is in use. Adopting a
              new model or assistant then becomes adding a render target, not rewriting the harness.
            </p>
          </div>
        </div>
        <FederatedContextDiagram />
      </div>
    ),
  },
];

/* ---------------------------------------------------------------------- */
/* Request lifecycle / pipeline                                           */
/* ---------------------------------------------------------------------- */

type PipelineStep = {
  name: string;
  kind: "deterministic" | "probabilistic";
  detail: string;
};

const pipelineSteps: PipelineStep[] = [
  { name: "Session start", kind: "deterministic", detail: "Backstop status, ship debt, and pending work surface before anyone asks for anything." },
  { name: "Request", kind: "probabilistic", detail: "Someone asks the assistant for something." },
  { name: "Intake", kind: "deterministic", detail: "Deterministic triage, auto-context, and memory recall." },
  { name: "Routing", kind: "deterministic", detail: "Mechanical, standard, hard, or frontier — the tier is picked before the first mutation." },
  { name: "Plan", kind: "deterministic", detail: "The change reaches its plan before the first mutation." },
  { name: "Agents, skills, rules", kind: "probabilistic", detail: "Scoped specialists load the procedures they need. All of it proposes; none of it decides." },
  { name: "Proposed call", kind: "probabilistic", detail: "The model asks to use a tool." },
  { name: "Gates", kind: "deterministic", detail: "Enforcement runs before execution. First deny wins." },
  { name: "Refused → nothing executed", kind: "deterministic", detail: "A denied call never runs at all. The underlying systems never see it." },
  { name: "Tools (fs / db / api)", kind: "deterministic", detail: "Only what the gate allowed ever reaches a real system." },
  { name: "Post-execution", kind: "deterministic", detail: "Standards are checked on the way out." },
  { name: "Verification", kind: "deterministic", detail: "A receipt keyed to the exact tree, not to the model's own account of what happened." },
  { name: "Fabrication guard", kind: "deterministic", detail: "A success report with no work behind it is caught." },
  { name: "Ship", kind: "deterministic", detail: "No fresh receipt, no push." },
  { name: "Backstop", kind: "deterministic", detail: "The full test suite runs after the push, as a slower net behind the fast one." },
  { name: "Done", kind: "deterministic", detail: "Completion needs the stamp." },
];

const requestLifecycleSections: DocRecord["sections"] = [
  {
    id: "the-pipeline",
    title: "The Pipeline",
    summary: "How one request moves through the harness, from top to bottom.",
    content: (
      <div className="space-y-4">
        <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
          <p className="text-sm leading-6 text-muted-foreground">
            Deterministic steps hold authority; probabilistic steps may only propose. The gate decides before
            anything executes, so a refused call never runs at all. Only the allowed branch reaches a real system —
            and then a receipt.
          </p>
        </div>
        <RequestLifecycleDiagram />
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Step-by-step reference</p>
        <ol className="space-y-2">
          {pipelineSteps.map((step, index) => (
            <li
              key={step.name}
              className="flex items-start gap-3 rounded-xl border border-border/50 bg-background/60 p-3"
            >
              <span className="mt-0.5 shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs font-mono text-muted-foreground">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-foreground">{step.name}</p>
                  <Badge kind={step.kind} />
                </div>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    ),
  },
];

/* ---------------------------------------------------------------------- */
/* Components of a harness                                                */
/* ---------------------------------------------------------------------- */

type Component = {
  name: string;
  icon: string;
  body: string;
};

const components: Component[] = [
  {
    name: "Routing & triage",
    icon: "mdi:routes",
    body: "Classify an incoming request by risk and difficulty before doing any real work, and send it down a matching path — a quick mechanical fix does not need the same scrutiny as a change to a payments flow.",
  },
  {
    name: "Context & memory",
    icon: "mdi:memory",
    body: "Recall the relevant history and state automatically at the start of a session, so a constraint given several turns ago doesn't silently fall out of context.",
  },
  {
    name: "Specialist agents & skills",
    icon: "mdi:account-group-outline",
    body: "Narrow, scoped subagents and versioned procedure files loaded on demand, instead of one generalist agent holding every capability and every risk at once.",
  },
  {
    name: "Tool bridges",
    icon: "mdi:bridge",
    body: "Connectors — often MCP servers — that expose real systems (repos, trackers, wikis, databases, lab equipment) as callable tools with typed inputs, instead of their contents being pasted into a prompt by hand.",
  },
  {
    name: "Enforcement gates",
    icon: "mdi:gate",
    body: "Pre-execution hooks that intercept a proposed tool call and can deny it outright, deterministically, before it ever reaches a real system. The first deny wins.",
  },
  {
    name: "Verification & fabrication guards",
    icon: "mdi:check-decagram-outline",
    body: "Post-execution checks that confirm a claimed result against real evidence — a receipt keyed to a git tree hash, a test actually rerun — rather than trusting the model's own report of what it did.",
  },
  {
    name: "Backstops",
    icon: "mdi:shield-sync-outline",
    body: "A slower, broader safety net — a full test suite, a canary, monitoring — that runs after the fast path has already shipped, to catch what a lightweight gate would miss.",
  },
  {
    name: "Observability & audit trails",
    icon: "mdi:file-search-outline",
    body: "A record of what was proposed, what was denied, and why — needed for debugging a run after the fact and for satisfying security or compliance review.",
  },
];

const componentsSections: DocRecord["sections"] = [
  {
    id: "the-building-blocks",
    title: "The Building Blocks",
    summary: "The pieces that recur across most production agent harnesses, independent of any one vendor.",
    content: (
      <div className="space-y-4">
        <ComponentsArchitectureDiagram />
        <div className="grid gap-4 sm:grid-cols-2">
          {components.map((component) => (
            <div key={component.name} className="rounded-2xl border border-border/60 bg-background/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">{component.name}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{component.body}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "policy-manifests-and-gates",
    title: "Policy Manifests & Hard Gate Rules",
    summary: "How deterministic tool permissions, path allowances, and command blocklists are codified.",
    content: (
      <div className="space-y-4">
        <div className="rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm">
          <p className="text-sm leading-6 text-muted-foreground">
            Hard restrictions cannot rely on natural language instructions. Instead, they are defined in version-controlled
            policy manifests evaluated by the harness middleware prior to every tool execution.
          </p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-muted/30 p-5 font-mono text-xs">
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Example: Specialist Subagent Security Policy (<code className="text-foreground">security-auditor-policy.yaml</code>)
          </p>
          <pre className="mt-3 overflow-x-auto text-[11px] leading-5 text-foreground/90">
{`agent:
  name: "codebase-researcher"
  workspace_mode: "isolated_scratch"   # cannot pollute main git tree
  spawn_depth_limit: 1                 # cannot recursively spawn new subagents

tool_permissions:
  allow_tools:
    - "view_file"
    - "grep_search"
    - "find_by_name"
  deny_tools:                          # hard-blocked at harness gate
    - "write_to_file"
    - "run_command"
    - "replace_file_content"

path_boundaries:
  allowed_roots:
    - "./src"
    - "./docs"
  blocked_patterns:                   # immediate deny if matched in args
    - "**/.env*"
    - "**/secrets/**"
    - "**/*.pem"

circuit_breakers:
  max_turns: 15                       # hard kill on step 16
  max_wall_clock_seconds: 120         # hard timeout
  max_token_budget: 80000             # hard spend cap
  loop_detection_window: 4            # kills if 4 repetitive tool calls observed`}
          </pre>
        </div>
      </div>
    ),
  },
  {
    id: "how-they-combine",
    title: "How They Combine",
    summary: "No single component makes a harness reliable — the combination does.",
    content: (
      <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
        <p className="text-sm leading-6 text-muted-foreground">
          Routing and context reduce how often the model is asked to do the wrong-sized thing with the wrong
          information. Scoped agents and tool bridges reduce how much any single failure can reach. Gates stop a bad
          call before it executes. Verification and backstops catch what the gates didn't. Observability is what lets
          a team find and close the next gap. Remove any one layer and the others still help — remove all of them and
          reliability is left entirely up to the model's own judgment in that turn.
        </p>
      </div>
    ),
  },
];

/* ---------------------------------------------------------------------- */
/* Related concepts & vocabulary                                          */
/* ---------------------------------------------------------------------- */

type RelatedConcept = {
  term: string;
  body: string;
};

const relatedConcepts: RelatedConcept[] = [
  {
    term: "Test harness",
    body: "The original software-engineering term: a scaffold of drivers and stubs that runs a unit of code under controlled, repeatable conditions and checks its output. An agent harness is this idea generalized from testing code to operating a model.",
  },
  {
    term: "Agent harness",
    body: "The scaffolding — routing, memory, tools, gates, verification — that surrounds a model in production use. Coding assistants, autonomous research tools, and customer-support bots are all, structurally, harnesses around a model.",
  },
  {
    term: "Eval harness",
    body: "A controlled environment used to benchmark a model or agent: fixed tasks, fixed scoring, no ability for the subject to change the rules of its own grading. Shares the same core idea of a controlled scaffold, aimed at measurement rather than production reliability.",
  },
  {
    term: "Guardrails vs. gates",
    body: "A guardrail is usually a soft constraint — a prompted instruction, a classifier that flags but doesn't block. A gate is a hard constraint enforced outside the model's own reasoning, with the power to refuse a call outright. Harness engineering leans on gates for anything that must actually hold.",
  },
  {
    term: "Sandboxing",
    body: "Running an agent's actions inside an isolated environment — a container, a scratch branch, a restricted filesystem — so that even an unblocked mistake has a limited, recoverable blast radius. A complementary containment strategy to gating.",
  },
  {
    term: "Human-in-the-loop escalation",
    body: "The case where a gate's correct behavior is not to auto-deny but to pause and hand the decision to a person — typically for actions that are irreversible, high-blast-radius, or outside what any automated check can confidently judge.",
  },
];

const relatedConceptsSections: DocRecord["sections"] = [
  {
    id: "guardrails-vs-gates",
    title: "Guardrails vs. Gates vs. Sandboxes",
    summary: "The distinction most often collapsed by mistake — and the one that matters most.",
    content: (
      <div className="space-y-6">
        <GuardrailsVsGatesDiagram />

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm">
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Mechanism Comparison Matrix
          </h4>
          <table className="w-full text-left text-xs leading-5">
            <thead>
              <tr className="border-b border-border/60 text-foreground font-semibold">
                <th className="pb-2 pr-4">Mechanism</th>
                <th className="pb-2 pr-4">Location</th>
                <th className="pb-2 pr-4">Enforcement Type</th>
                <th className="pb-2 pr-4">Bypassability</th>
                <th className="pb-2">Failure Mode</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-muted-foreground">
              <tr>
                <td className="py-2.5 pr-4 font-medium text-amber-600 dark:text-amber-400">Prompted Guardrail</td>
                <td className="py-2.5 pr-4">Inside model context</td>
                <td className="py-2.5 pr-4">Probabilistic (advisory)</td>
                <td className="py-2.5 pr-4 text-rose-500 font-medium">Bypassable (prompt injection, forgetting)</td>
                <td className="py-2.5">Action executes unchecked</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium text-emerald-600 dark:text-emerald-400">Enforcement Gate</td>
                <td className="py-2.5 pr-4">External harness middleware</td>
                <td className="py-2.5 pr-4">Deterministic (hard chokepoint)</td>
                <td className="py-2.5 pr-4 text-emerald-600 dark:text-emerald-400 font-medium">Non-bypassable (first deny wins)</td>
                <td className="py-2.5">Call aborted before execution</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium text-sky-600 dark:text-sky-400">Execution Sandbox</td>
                <td className="py-2.5 pr-4">OS / filesystem boundary</td>
                <td className="py-2.5 pr-4">Deterministic containment</td>
                <td className="py-2.5 pr-4 text-emerald-600 dark:text-emerald-400 font-medium">Contained environment</td>
                <td className="py-2.5">Blast radius limited to scratch branch</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Human-in-the-Loop Escalation Rules */}
        <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Human-in-the-Loop (HITL) Escalation Tiers
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3 text-xs leading-5">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
              <p className="font-semibold text-emerald-600 dark:text-emerald-400">Auto-Allow</p>
              <p className="mt-1 text-muted-foreground">Idempotent reads, local scratch edits, unit test execution within timeout bounds.</p>
            </div>
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
              <p className="font-semibold text-amber-600 dark:text-amber-400">Interactive Prompt (HITL)</p>
              <p className="mt-1 text-muted-foreground">Package installation, file deletions outside scratch, git push to remote, schema migrations.</p>
            </div>
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-3">
              <p className="font-semibold text-rose-600 dark:text-rose-400">Hard Deny (Immediate Abort)</p>
              <p className="mt-1 text-muted-foreground">Production credentials access, raw shell destruction (`rm -rf /`), out-of-bounds network exfiltration.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "vocabulary",
    title: "Vocabulary",
    summary: "Terms that sit next to harness engineering and are easy to conflate with it.",
    content: (
      <div className="space-y-3">
        {relatedConcepts.map((concept) => (
          <div key={concept.term} className="rounded-2xl border border-border/60 bg-background/60 p-5">
            <p className="font-medium text-foreground">{concept.term}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{concept.body}</p>
          </div>
        ))}
      </div>
    ),
  },
];

/* ---------------------------------------------------------------------- */
/* Multi-Developer Collaboration (Backlog-Driven Orchestration)           */
/* ---------------------------------------------------------------------- */

const collaborationSections: DocRecord["sections"] = [
  {
    id: "the-coordination-friction",
    title: "The Concurrent Working Problem",
    summary: "Why multiple developers struggle to work on the same codebase simultaneously through prompts.",
    content: (
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-600 dark:text-rose-400">
            The Anti-Pattern: Conflicting Chat Prompts
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
            <li>Two engineers running uncoordinated chat assistants on the same repo create immediate merge collisions and dirty working trees.</li>
            <li>Context is trapped in private chat transcripts — neither developer (nor their agent) knows what the other just instructed or changed.</li>
            <li>Constraints given by one developer in turn A are overwritten or violated by the other developer's prompt in turn B.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
            The Solution: Backlog as the Control Plane
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
            <li>Instead of micro-managing and prompting code changes turn-by-turn, both developers interact with a shared project management system / issue tracker.</li>
            <li>The backlog serves as the single source of truth for features, bug reports, and acceptance criteria.</li>
            <li>The harness autonomously pulls tasks from the queue, implements them in isolated branches, and submits PRs with verification receipts.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "orchestration-flow",
    title: "Backlog-Driven Orchestration Architecture",
    summary: "How team members define the project together while the harness builds in the background.",
    content: (
      <div className="space-y-4">
        <BacklogOrchestrationDiagram />
      </div>
    ),
  },
  {
    id: "autonomous-lifecycle",
    title: "The Autonomous Background Execution Loop",
    summary: "From ticket intake to PR review, test receipts, and documentation synchronization.",
    content: (
      <div className="space-y-4">
        <div className="rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm">
          <p className="text-sm leading-6 text-muted-foreground">
            When teams adopt a harness-driven workflow, their role shifts from <span className="font-medium text-foreground">writing and prompting</span> to{" "}
            <span className="font-medium text-foreground">defining specifications and reviewing verifiable proofs</span>.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border/60 bg-background/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              1. Task Triage & Locking
            </p>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              The harness continuously evaluates the issue tracker, ranks dependencies, and acquires a task lock. It spawns a scoped specialist agent on a clean, isolated scratch branch.
            </p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-background/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              2. CI/CD & Receipt Generation
            </p>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              The agent builds the change, runs automated test suites, and collects deterministic receipts. A pull request is generated containing the code diff and verification log.
            </p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-background/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              3. Continuous Reconciliation
            </p>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Once human collaborators approve and merge the PR, the harness closes the bug ticket, updates the documentation, and adjusts overarching project goals.
            </p>
          </div>
        </div>
      </div>
    ),
  },
];

/* ---------------------------------------------------------------------- */
/* Docs + space                                                           */
/* ---------------------------------------------------------------------- */

const overviewDoc = createDoc(
  "overview",
  "What Is Harness Engineering",
  "The definition, the diagnosis, and the pattern behind why a harness closes gaps a model can't close on its own.",
  "What Is Harness Engineering",
  "Reliability is a property of the system around the model, not the model itself — what a harness is, and why it's engineering rather than prompting.",
  "mdi:shield-search",
  overviewSections,
);

const corePrinciplesDoc = createDoc(
  "core-principles",
  "Core Principles",
  "Deterministic authority, least-privilege agents, and federated context over one centralized graph.",
  "Core Principles",
  "The recurring design principles behind a reliable harness, independent of any particular implementation.",
  "mdi:view-grid-outline",
  corePrinciplesSections,
);

const requestLifecycleDoc = createDoc(
  "request-lifecycle",
  "The Request Lifecycle",
  "How one request moves through a harness, step by step, from session start to done.",
  "The Request Lifecycle",
  "Deterministic steps hold authority; probabilistic steps may only propose. The gate decides before anything executes.",
  "mdi:sitemap-outline",
  requestLifecycleSections,
);

const componentsDoc = createDoc(
  "components",
  "Components Of A Harness",
  "The recurring building blocks — routing, memory, scoped agents, tool bridges, gates, verification, backstops.",
  "Components Of A Harness",
  "The pieces that show up across most production agent harnesses, and how they combine into one reliability system.",
  "mdi:puzzle-outline",
  componentsSections,
);

const collaborationDoc = createDoc(
  "multi-developer-collaboration",
  "Multi-Developer Collaboration",
  "How teams define projects in a shared backlog while the harness autonomously builds in the background.",
  "Backlog-Driven Multi-Developer Orchestration",
  "Instead of conflicting chat prompts, collaborators define tasks and bugs in a shared backlog — the harness continuously triages, builds, verifies, and syncs.",
  "mdi:account-multiple-outline",
  collaborationSections,
);

const relatedConceptsDoc = createDoc(
  "related-concepts",
  "Related Concepts & Vocabulary",
  "Test harnesses, eval harnesses, guardrails vs. gates, sandboxing, and human-in-the-loop escalation.",
  "Related Concepts & Vocabulary",
  "Terms adjacent to harness engineering, and how they differ from it.",
  "mdi:book-open-variant-outline",
  relatedConceptsSections,
);

export const harnessEngineeringSpace: DocSpace = {
  id: spaceId,
  title: "Harness Engineering",
  description:
    "A reference guide to harness engineering: the discipline of engineering reliability into AI agent systems through routing, scoped agents, enforcement gates, and verification — rather than relying on prompting alone.",
  href: `/spaces/${spaceId}`,
  cardIcon: "mdi:shield-check-outline",
  docs: [
    overviewDoc,
    corePrinciplesDoc,
    requestLifecycleDoc,
    componentsDoc,
    collaborationDoc,
    relatedConceptsDoc,
  ],
};

