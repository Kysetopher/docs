import { useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { Steps, type StepState } from "@/components/docs/next-supabase-template/TemplateBlocks";

/**
 * Live setup progress. The template's setup script (scripts/setup-guide in
 * the template repo) opens this page with the user's progress after the `#`:
 *   #setup=1&of=12&done=1,2,3&now=4&have=node,deps&doing=Checking+the+environment
 * The agent reopens it after each step, so only the hash changes and the page
 * updates in place. Nothing in the hash reaches the server.
 */
export type SetupProgress = {
  of: number;
  done: Set<number>;
  now: number | null;
  have: Set<string>;
  doing: string;
  complete: boolean;
};

/** The agent-run steps of the template's docs/SETUP.md, in order; titles must match its `## N.` headings. */
const SETUP_STEPS: { title: string; you?: string }[] = [
  { title: "Check the tools" },
  { title: "Install dependencies" },
  { title: "Agent skills" },
  { title: "Environment variables", you: "You type your Supabase keys into .env.local — never into the chat." },
  { title: "Connect Supabase and create the database tables", you: "You run three commands the agent gives you." },
  { title: "Connect the agent's tools (MCP)", you: "You restart the app, approve the tools and sign in." },
  { title: "Supabase dashboard settings", you: "You change three settings in the Supabase dashboard." },
  { title: "Make it yours", you: "You pick the app's name, description and brand color." },
  { title: "Payments (optional)", you: "You choose whether to turn on Stripe now." },
  { title: "Check everything" },
  { title: "Try it", you: "You sign up in the running app and try a password reset." },
  { title: "Save the work", you: "You choose whether to commit." },
];

/** What the setup script reports as installed; keys must match installed() in the template's checks.mjs. */
const INSTALLED: { key: string; label: string; optional?: boolean }[] = [
  { key: "node", label: "Node.js 24+" },
  { key: "deps", label: "npm packages" },
  { key: "supabase-cli", label: "Supabase CLI" },
  { key: "wrangler", label: "Wrangler" },
  { key: "playwright", label: "Playwright browser" },
  { key: "skills", label: "Agent skills" },
  { key: "env", label: ".env.local" },
  { key: "linked", label: "Supabase linked" },
  { key: "mcp", label: "Agent tools (MCP)" },
  { key: "stripe", label: "Stripe billing", optional: true },
];

function parseSetupHash(hash: string): SetupProgress | null {
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  if (!params.has("setup")) return null;
  const numbers = (value: string | null) =>
    new Set((value ?? "").split(",").map(Number).filter((n) => Number.isInteger(n) && n > 0));
  const of = Number(params.get("of")) || SETUP_STEPS.length;
  const done = numbers(params.get("done"));
  const now = Number(params.get("now")) || null;
  return {
    of,
    done,
    now,
    have: new Set((params.get("have") ?? "").split(",").filter(Boolean)),
    doing: (params.get("doing") ?? "").slice(0, 120),
    complete: now === null && done.size >= of,
  };
}

function useSetupProgress() {
  const { hash } = useLocation();
  return parseSetupHash(hash);
}

function Dot({ state, size = "md" }: { state: StepState | "todo"; size?: "sm" | "md" }) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border",
        size === "sm" ? "h-4 w-4" : "h-5 w-5",
        state === "done" && "border-emerald-600 bg-emerald-600 text-white",
        state === "current" && "border-primary ring-4 ring-primary/15",
        state === "todo" && "border-border",
      )}
    >
      {state === "done" ? <Icon icon="mdi:check-bold" className="h-3 w-3" aria-hidden /> : null}
      {state === "current" ? <span className="h-2 w-2 rounded-full bg-primary" /> : null}
    </span>
  );
}

function ProgressCard({ progress }: { progress: SetupProgress }) {
  const pct = Math.round((progress.done.size / progress.of) * 100);
  const current = progress.now ? SETUP_STEPS[progress.now - 1] : null;
  return (
    <div className="mb-6 space-y-4 rounded-2xl border border-primary/30 bg-background p-5 shadow-sm">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Your setup</p>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          Live from your project
        </span>
      </div>
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold tabular-nums text-foreground">{pct}%</span>
        <span className="text-sm text-muted-foreground">
          {progress.done.size} of {progress.of} setup steps done
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all duration-500", progress.complete ? "bg-emerald-600" : "bg-primary")}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-sm text-muted-foreground">
        {progress.complete ? (
          <span className="font-medium text-foreground">Setup complete. Pick the next step below whenever you're ready.</span>
        ) : current ? (
          <>
            Now: <span className="font-medium text-foreground">Step {progress.now} — {current.title}</span>
          </>
        ) : null}
      </p>
      {progress.doing && !progress.complete ? (
        <p className="flex items-center gap-2 text-sm text-foreground">
          <Icon icon="mdi:robot-outline" className="h-4 w-4 text-primary" aria-hidden />
          <span>{progress.doing}</span>
        </p>
      ) : null}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Installed</p>
        <div className="flex flex-wrap gap-2">
          {INSTALLED.map((item) => {
            const ok = progress.have.has(item.key);
            return (
              <span
                key={item.key}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs",
                  ok ? "border-emerald-600/30 bg-emerald-600/10 text-foreground" : "border-border text-muted-foreground",
                )}
              >
                <Dot state={ok ? "done" : "todo"} size="sm" />
                {item.label}
                {item.optional && !ok ? <span className="opacity-70">(optional)</span> : null}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** The agent's SETUP.md steps, ticked off as the project gets there. */
function SetupChecklist({ progress }: { progress: SetupProgress }) {
  const currentRef = useRef<HTMLLIElement>(null);

  // Keep the step the agent is on in view as it moves along.
  useEffect(() => {
    currentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [progress.now]);

  return (
    <ol className="my-3 space-y-1 rounded-xl border border-border/60 bg-muted/20 p-3">
      {SETUP_STEPS.map((step, index) => {
        const n = index + 1;
        const state: StepState | "todo" = progress.done.has(n) ? "done" : progress.now === n ? "current" : "todo";
        return (
          <li
            key={step.title}
            ref={state === "current" ? currentRef : undefined}
            className={cn("flex gap-3 rounded-lg px-2 py-1.5", state === "current" && "bg-primary/5")}
          >
            <Dot state={state} />
            <div className="min-w-0 flex-1">
              <p className={cn("text-sm", state === "done" ? "text-muted-foreground" : "font-medium text-foreground")}>
                <span className="mr-1.5 tabular-nums text-muted-foreground">{n}.</span>
                {step.title}
                {state === "current" && step.you ? (
                  <span className="ml-2 rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-medium text-amber-700">Needs you</span>
                ) : null}
              </p>
              {state === "current" && step.you ? <p className="text-xs text-muted-foreground">{step.you}</p> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * The Getting Started steps, following the user's setup when the page was
 * opened with progress in the URL: earlier steps ticked, the agent setup step
 * expanded into its own checklist, the next step highlighted once it's done.
 * Without progress in the URL it's the plain step list.
 */
export function GuidedSteps({ steps, setupIndex }: { steps: { title: string; body: ReactNode }[]; setupIndex: number }) {
  const progress = useSetupProgress();
  if (!progress) return <Steps steps={steps} />;

  const guided = steps.map((step, index) => {
    let state: StepState | undefined;
    if (index < setupIndex) state = "done";
    else if (index === setupIndex) state = progress.complete ? "done" : "current";
    else if (index === setupIndex + 1 && progress.complete) state = "current";
    const body =
      index === setupIndex ? (
        <>
          <SetupChecklist progress={progress} />
          {step.body}
        </>
      ) : (
        step.body
      );
    return { ...step, body, state };
  });

  return (
    <>
      <ProgressCard progress={progress} />
      <Steps steps={guided} />
    </>
  );
}
