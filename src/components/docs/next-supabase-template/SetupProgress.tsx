import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { Steps, type StepState } from "@/components/docs/next-supabase-template/TemplateBlocks";
import { SETUP_STEPS } from "@/components/docs/next-supabase-template/setup-steps";

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

type Chip = { key: string; label: string; icon?: string; optional?: boolean };

/** What the setup script reports as installed; keys must match installed() in the template's checks.mjs. */
const INSTALLED: Chip[] = [
  { key: "node", label: "Node.js 24+" },
  { key: "deps", label: "npm packages" },
  { key: "supabase-cli", label: "Supabase CLI" },
  { key: "wrangler", label: "Wrangler" },
  { key: "playwright", label: "Playwright browser" },
  { key: "skills", label: "Agent skills" },
  { key: "env", label: ".env.local" },
  { key: "linked", label: "Supabase linked" },
];

/** Every integration setup and the runbooks connect; keys must match INTEGRATIONS in the template's checks.mjs. */
const INTEGRATIONS: Chip[] = [
  { key: "supabase-mcp", label: "Supabase tools", icon: "simple-icons:supabase" },
  { key: "cloudflare-mcp", label: "Cloudflare tools", icon: "simple-icons:cloudflare" },
  { key: "browser", label: "Browser", icon: "mdi:web" },
  { key: "github", label: "GitHub", icon: "simple-icons:github", optional: true },
  { key: "stripe", label: "Stripe payments", icon: "simple-icons:stripe", optional: true },
  { key: "email", label: "Email (Resend)", icon: "simple-icons:resend", optional: true },
  { key: "deploy", label: "Deployed", icon: "mdi:rocket-launch-outline", optional: true },
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
      <ChipGroup title="Installed" chips={INSTALLED} have={progress.have} />
      <ChipGroup title="Integrations" chips={INTEGRATIONS} have={progress.have} />
    </div>
  );
}

function ChipGroup({ title, chips, have }: { title: string; chips: Chip[]; have: Set<string> }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{title}</p>
      <div className="flex flex-wrap gap-2">
        {chips.map((item) => {
          const ok = have.has(item.key);
          return (
            <span
              key={item.key}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs",
                ok ? "border-emerald-600/30 bg-emerald-600/10 text-foreground" : "border-border text-muted-foreground",
              )}
            >
              <Dot state={ok ? "done" : "todo"} size="sm" />
              {item.icon ? <Icon icon={item.icon} className="h-3.5 w-3.5" aria-hidden /> : null}
              {item.label}
              {item.optional && !ok ? <span className="opacity-70">(optional)</span> : null}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/**
 * The agent's SETUP.md steps as a collapsible list. Each row opens to what the
 * agent does, what you do and where things are. With live progress, done steps
 * are ticked and the current one opens by itself (and closes as the agent
 * moves on), staying in view.
 */
function SetupChecklist({ progress }: { progress: SetupProgress | null }) {
  const currentRef = useRef<HTMLLIElement>(null);
  const now = progress?.now ?? null;
  const [open, setOpen] = useState<Set<number>>(() => new Set(now ? [now] : []));

  // Follow the agent: open the step it's on, close the rest, keep it in view.
  useEffect(() => {
    if (!now) return;
    setOpen(new Set([now]));
    const id = window.setTimeout(() => currentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    return () => window.clearTimeout(id);
  }, [now]);

  const toggle = (n: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });
  const allOpen = open.size === SETUP_STEPS.length;

  return (
    <div className="my-3 rounded-xl border border-border/60 bg-muted/20">
      <div className="flex items-center justify-between gap-3 border-b border-border/60 px-3 py-2">
        <p className="text-xs text-muted-foreground">
          What happens after you paste the prompt. <span className="hidden sm:inline">Open a step for the details.</span>
        </p>
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(SETUP_STEPS.map((_, i) => i + 1)))}
          className="inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-foreground transition hover:bg-muted"
        >
          <Icon icon={allOpen ? "mdi:unfold-less-horizontal" : "mdi:unfold-more-horizontal"} className="h-4 w-4" aria-hidden />
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>
      <ol className="divide-y divide-border/50">
        {SETUP_STEPS.map((step, index) => {
          const n = index + 1;
          const state: StepState | "todo" = progress?.done.has(n) ? "done" : now === n ? "current" : "todo";
          const isOpen = open.has(n);
          const panelId = `setup-step-${n}`;
          return (
            <li
              key={step.title}
              ref={state === "current" ? currentRef : undefined}
              className={cn("scroll-mt-24", state === "current" && "bg-primary/[0.04]")}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(n)}
                className="flex w-full items-start gap-3 px-3 py-2.5 text-left transition hover:bg-muted/50"
              >
                <span className="mt-0.5">
                  <Dot state={state} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={cn("block text-sm", state === "done" ? "text-muted-foreground" : "font-medium text-foreground")}>
                    <span className="mr-1.5 tabular-nums text-muted-foreground">{n}.</span>
                    {step.title}
                    {state === "current" && step.you ? (
                      <span className="ml-2 rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-medium text-amber-700">Needs you</span>
                    ) : null}
                  </span>
                  {state === "current" && step.you ? <span className="block text-xs text-muted-foreground">{step.you}</span> : null}
                </span>
                <span className="mt-0.5 hidden shrink-0 items-center gap-2 text-[11px] text-muted-foreground sm:flex">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-2 py-0.5",
                      step.who === "you" ? "border-amber-500/40 text-amber-700" : "border-border",
                    )}
                  >
                    <Icon icon={step.who === "you" ? "mdi:account-outline" : "mdi:robot-outline"} className="h-3 w-3" aria-hidden />
                    {step.who === "you" ? "You + agent" : "Agent"}
                  </span>
                  {step.time ? <span className="w-16 text-right tabular-nums">{step.time}</span> : null}
                </span>
                <Icon
                  icon="mdi:chevron-down"
                  className={cn("mt-0.5 h-5 w-5 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180")}
                  aria-hidden
                />
              </button>
              {isOpen ? (
                <div id={panelId} className="space-y-4 px-3 pb-4 pl-11 pr-4">
                  {step.details}
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/**
 * The Getting Started steps. The agent setup step always carries its
 * collapsible checklist. When the page was opened with progress in the URL,
 * it also follows the user's setup: earlier steps ticked, the current setup
 * step open, the next step highlighted once setup is done.
 */
export function GuidedSteps({ steps, setupIndex }: { steps: { title: string; body: ReactNode }[]; setupIndex: number }) {
  const progress = useSetupProgress();

  const guided = steps.map((step, index) => {
    let state: StepState | undefined;
    if (progress) {
      if (index < setupIndex) state = "done";
      else if (index === setupIndex) state = progress.complete ? "done" : "current";
      else if (index === setupIndex + 1 && progress.complete) state = "current";
    }
    const body =
      index === setupIndex ? (
        <>
          {step.body}
          <SetupChecklist progress={progress} />
        </>
      ) : (
        step.body
      );
    return { ...step, body, state };
  });

  return (
    <>
      {progress ? <ProgressCard progress={progress} /> : null}
      <Steps steps={guided} />
    </>
  );
}
