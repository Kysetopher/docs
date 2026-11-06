import { Icon } from "@iconify/react";
import type { DocRecord, DocSpace } from "@/lib/records/doc-types";
import {
  CodeBlock,
  GalleryShot,
  InlineCode,
  KeyValueTable,
  TechStack,
  type TechStackGroup,
  ToolTable,
} from "@/components/docs/next-supabase-template/TemplateBlocks";
import { GuidedSteps } from "@/components/docs/next-supabase-template/SetupProgress";
import {
  ForOs,
  GitHubDesktopDownload,
  LinkButton,
  NodeDownload,
  OpenInClaude,
  OsSwitch,
  UseTemplateButton,
  VsCodeDownload,
} from "@/components/docs/next-supabase-template/InstallLinks";

const spaceId = "next-supabase-template";
const REPO_OWNER = "Kysetopher";
const REPO_NAME = "next-supabase-template";

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

/* ====================================================================== */
/* Getting started                                                        */
/* ====================================================================== */

const TECH_STACK: TechStackGroup[] = [
  {
    title: "Framework",
    icon: "simple-icons:nextdotjs",
    items: [
      { name: "Next.js", version: "16.3", use: "App Router, Server Components and Server Actions; src/middleware.ts refreshes the session on every request; instrumentation.ts checks env vars at startup." },
      { name: "React", version: "19.2", use: "UI library; ref-as-prop components, useFormStatus for pending buttons." },
      { name: "TypeScript", version: "5.9", use: "Strict mode everywhere; generated database types in src/lib/supabase/types.ts." },
      { name: "Node.js", version: "24", use: "Runtime, pinned in .nvmrc." },
    ],
  },
  {
    title: "Styling And UI",
    icon: "simple-icons:tailwindcss",
    items: [
      { name: "Tailwind CSS", version: "4.3", use: "Utility styling through @tailwindcss/postcss; one dark theme defined as semantic tokens in globals.css." },
      { name: "tw-animate-css", version: "1.4", use: "Enter/exit animations for menus, dialogs and popovers." },
      { name: "Radix UI primitives", version: "1.x–2.x", use: "Accessible building blocks: dialog, dropdown, context menu, popover, select, tabs, tooltip, hover card, accordion, collapsible, radio group, slider, checkbox, navigation menu, scroll area, separator, slot." },
      { name: "Own component library", version: "—", use: "src/components/ui plus calendar and billing modules, shadcn-inspired but owned in the repo." },
      { name: "class-variance-authority, clsx, tailwind-merge", version: "0.7 / 2.1 / 3.7", use: "Variant classes and the cn() helper." },
      { name: "@iconify/react", version: "6.0", use: "Icons." },
      { name: "simplebar-react", version: "3.3", use: "Consistent custom scrollbars." },
      { name: "framer-motion", version: "14.0", use: "Scroll reveals and motion components." },
    ],
  },
  {
    title: "Component Dependencies",
    icon: "mdi:puzzle-outline",
    items: [
      { name: "react-day-picker", version: "10.0", use: "Calendar and date pickers." },
      { name: "date-fns", version: "4.4", use: "Date math and formatting for pickers and the event calendar." },
      { name: "@tanstack/react-table", version: "9.2", use: "Data table: sorting and spreadsheet-style cell selection." },
      { name: "cmdk", version: "1.1", use: "Command palette." },
      { name: "country-flag-icons", version: "1.6", use: "Flags in the phone input." },
    ],
  },
  {
    title: "Data And Auth",
    icon: "simple-icons:supabase",
    items: [
      { name: "Supabase (hosted)", version: "—", use: "Postgres, Auth and Storage. Separate development and production projects; no local database." },
      { name: "@supabase/ssr", version: "0.12", use: "Server-side, cookie-based sessions. There is no browser Supabase client." },
      { name: "@supabase/supabase-js", version: "2.117", use: "Request-scoped client (publishable key + RLS) and a narrow service client." },
      { name: "Supabase CLI", version: "2.119", use: "Versioned migrations in supabase/migrations, db push, generated types." },
      { name: "Postgres Row Level Security", version: "—", use: "Every table: one policy per allowed operation on auth.uid(), narrow grants, cascade from auth.users." },
      { name: "pg_cron", version: "—", use: "Nightly pruning of the auth rate-limit tables." },
    ],
  },
  {
    title: "Payments (Optional)",
    icon: "simple-icons:stripe",
    items: [
      { name: "stripe", version: "23.0", use: "Server SDK: customers, subscriptions, PaymentIntents, Customer Portal, webhook signature checks." },
      { name: "@stripe/stripe-js + @stripe/react-stripe-js", version: "10.0 / 7.0", use: "Embedded checkout form (Payment Element) themed from the app's tokens." },
    ],
  },
  {
    title: "Quality And Delivery",
    icon: "simple-icons:githubactions",
    items: [
      { name: "ESLint", version: "9.39", use: "eslint-config-next rules." },
      { name: "Playwright", version: "1.63", use: "Smoke tests against a production build, with no database behind them." },
      { name: "GitHub Actions", version: "—", use: "CI on every push and pull request: typecheck, lint, build, smoke tests, and the Cloudflare Workers build." },
      { name: "Security headers", version: "—", use: "Frame-blocking, nosniff, referrer policy and HSTS, set in next.config.ts and repeated for static files in public/_headers." },
    ],
  },
  {
    title: "Hosting",
    icon: "simple-icons:cloudflare",
    items: [
      { name: "Hosting", version: "—", use: "Cloudflare Workers via OpenNext; deploys with Workers Builds." },
      { name: "@opennextjs/cloudflare", version: "1.20", use: "Turns the Next.js build into a Worker; initOpenNextCloudflareForDev gives next dev the Cloudflare bindings." },
      { name: "Wrangler", version: "4.147", use: "Cloudflare's CLI: deploys from wrangler.jsonc in Workers Builds, and lets agents read logs, deployments and secret names." },
      { name: "Workers rate limiting", version: "—", use: "Burst limits for auth and billing as rate-limit bindings in wrangler.jsonc." },
    ],
  },
];

/** What the user pastes into their AI agent; it must match the prompt quoted in the template's docs/SETUP.md. */
const SETUP_PROMPT =
  "Set up this project for me: read docs/SETUP.md and follow it step by step. Stop and wait for me at every USER STEP.";

/** The same prompt for the Open in Claude button. A link can't open Claude's browser pane, so the agent opens this guide there first. */
const CLAUDE_SETUP_PROMPT = `First open the live setup guide in the browser pane beside this chat (run npm run -s setup:url and open the link it prints). Then: ${SETUP_PROMPT}`;

/** What the user pastes to deploy; it must match the prompt quoted in the template's docs/CLOUDFLARE.md. */
const DEPLOY_PROMPT =
  "Deploy this project to Cloudflare: read docs/CLOUDFLARE.md and follow the Deploy runbook step by step. Stop and wait for me at every USER STEP.";

/** What the user pastes when setup stopped partway; it must match the resume prompt quoted in the template's docs/SETUP.md. */
const RESUME_PROMPT =
  "Continue setting up this project: read docs/SETUP.md, run npm run setup:status to see what's already done, and open the live setup guide beside this chat. Tell me which step we're on, then carry on from there. Stop and wait for me at every USER STEP.";

/** What the user pastes to send real email; it must match the prompt quoted in the template's docs/EMAIL.md. */
const EMAIL_PROMPT =
  "Set up real email sending for this project: read docs/EMAIL.md and follow the runbook step by step. Stop and wait for me at every USER STEP.";

/** What the user pastes to turn on payments; it must match the prompt quoted in the template's docs/STRIPE.md. */
const PAYMENTS_PROMPT =
  'Turn on Stripe payments for this project: read docs/STRIPE.md and follow the "Turn on payments" runbook step by step. Stop and wait for me at every USER STEP.';

/** Everyday building prompts. Each names the project skill that does the work; edit the part in angle brackets. */
const BUILD_PROMPTS = [
  {
    title: "Add a page",
    prompt: "Use the new-page skill to add a signed-in page called <name> that <what it shows or does>.",
  },
  {
    title: "Store new data",
    prompt: "Use the new-table skill to add a database table for <what you want to store>, then show it on <which page>.",
  },
  {
    title: "Add or change a component",
    prompt: "Use the new-component skill to <add / change> a component that <what it does>, and add it to the /components gallery.",
  },
];

const gettingStartedSections: DocRecord["sections"] = [
  {
    id: "overview",
    title: "Tech Stack",
    summary: "Everything the template is built on, with the versions it ships with.",
    content: <TechStack groups={TECH_STACK} />,
  },
  {
    id: "prerequisites",
    title: "Tools",
    summary: "The accounts and apps the steps use. Step 1 has you set them up.",
    content: (
      <div className="space-y-4">
        <OsSwitch />
        <ToolTable
          rows={[
            {
              icons: ["mdi:account-circle-outline"],
              tool: "A GitHub account",
              notes: (
                <span className="space-y-2">
                  <span className="block">Where your copy of the project lives. Free.</span>
                  <LinkButton primary icon="simple-icons:github" href="https://github.com/signup">Sign up at github.com</LinkButton>
                </span>
              ),
            },
            {
              icons: ["simple-icons:github"],
              tool: "GitHub Desktop",
              notes: (
                <span className="space-y-2">
                  <span className="block">Copies the project to your computer and saves your changes back to GitHub. Sign in with your GitHub account when it opens.</span>
                  <GitHubDesktopDownload />
                  <span className="block text-xs">
                    <ForOs
                      windows="Run the installer; it opens by itself when done."
                      mac="Open the downloaded .zip, then drag GitHub Desktop into Applications."
                    />
                  </span>
                </span>
              ),
            },
            {
              icons: ["simple-icons:claude", "simple-icons:openai"],
              tool: "An AI agent app",
              notes: (
                <span className="space-y-2">
                  <span className="block">
                    Either one. Claude's <strong className="text-foreground">Code</strong> tab is Claude Code; ChatGPT's is Codex. Sign in with your Claude or ChatGPT account. The template is set up for
                    agents: they read <InlineCode>AGENTS.md</InlineCode> / <InlineCode>CLAUDE.md</InlineCode>, the docs in <InlineCode>docs/</InlineCode> and the project's skills.
                  </span>
                  <span className="flex flex-wrap gap-2">
                    <LinkButton primary icon="simple-icons:claude" href="https://claude.com/download">Claude desktop app</LinkButton>
                    <LinkButton icon="simple-icons:openai" href="https://chatgpt.com/download">ChatGPT desktop app (Codex)</LinkButton>
                  </span>
                </span>
              ),
            },
            {
              icons: ["simple-icons:nodedotjs"],
              tool: "Node.js 24",
              notes: (
                <span className="space-y-2">
                  <span className="block">Runs the app and its tools. Install with the default options, then <strong className="text-foreground">quit and reopen your agent app</strong> so it finds Node.</span>
                  <NodeDownload />
                </span>
              ),
            },
            {
              icons: ["simple-icons:visualstudiocode"],
              tool: "VS Code",
              notes: (
                <span className="space-y-2">
                  <span className="block">
                    Recommended. Microsoft's free code editor, the most widely used one and the industry standard, so most guides, tutorials and teammates assume it. Here
                    you'll use it to type your keys into <InlineCode>.env.local</InlineCode> and to look around the project. It shows hidden files, which Finder and Explorer don't.
                  </span>
                  <VsCodeDownload />
                </span>
              ),
            },
            {
              icons: ["simple-icons:googlechrome"],
              tool: "Google Chrome",
              notes: (
                <span className="space-y-2">
                  <span className="block">Optional: the Claude and ChatGPT apps have a browser built in. Useful for testing the app yourself.</span>
                  <LinkButton icon="simple-icons:googlechrome" href="https://www.google.com/chrome/">Download Chrome</LinkButton>
                </span>
              ),
            },
            {
              icons: ["simple-icons:supabase"],
              tool: "A Supabase project",
              notes: (
                <span className="space-y-2">
                  <span className="block">Your database and sign-in. The free plan is fine. Save the database password it asks for in a password manager.</span>
                  <LinkButton primary icon="simple-icons:supabase" href="https://supabase.com/dashboard/new">Create a Supabase project</LinkButton>
                </span>
              ),
            },
            {
              icons: ["simple-icons:cloudflare"],
              tool: "A Cloudflare account",
              notes: (
                <span className="space-y-2">
                  <span className="block">Only when you deploy. The free Workers plan is enough to start.</span>
                  <LinkButton icon="simple-icons:cloudflare" href="https://dash.cloudflare.com/sign-up">Sign up at Cloudflare</LinkButton>
                </span>
              ),
            },
          ]}
        />
      </div>
    ),
  },
  {
    id: "steps",
    title: "Steps",
    summary: "Everything from an empty computer to a live app, in order. Your AI agent does the work; each prompt step stops for the parts only you can do. While it sets the project up, the agent opens this page beside the chat and ticks steps off as it goes.",
    content: (
      <GuidedSteps
        setupIndex={4}
        steps={[
          {
            title: "Create your accounts and install the apps",
            body: (
              <ul className="list-disc space-y-1 pl-5">
                <li>Everything in <strong className="text-foreground">Tools</strong> above, with the download buttons for your computer: GitHub, GitHub Desktop, an AI agent app, Node.js 24, Supabase.</li>
                <li>Create a Supabase project (the free plan is fine) and save its database password in a password manager.</li>
                <li>Cloudflare and Stripe can wait until their steps below.</li>
              </ul>
            ),
          },
          {
            title: "Create your repository from the template",
            body: (
              <>
                <UseTemplateButton owner={REPO_OWNER} repo={REPO_NAME} />
                <ul className="list-disc space-y-1 pl-5">
                  <li>The button opens GitHub's <strong className="text-foreground">Create a new repository</strong> page with this template already picked (sign in first if asked).</li>
                  <li>Type your project's name, choose <strong className="text-foreground">Private</strong> or Public, and click <strong className="text-foreground">Create repository</strong>. It starts with a clean history and is yours.</li>
                  <li>Don't fork it or download the ZIP: a fork stays tied to the template, and a ZIP has no GitHub connection.</li>
                </ul>
              </>
            ),
          },
          {
            title: "Clone it with GitHub Desktop",
            body: (
              <ul className="list-disc space-y-1 pl-5">
                <li>On your new repository's page, click the green <strong className="text-foreground">Code</strong> button → <strong className="text-foreground">Open with GitHub Desktop</strong>.</li>
                <li className="list-none -ml-5 py-1"><GitHubDesktopDownload /></li>
                <li>Choose where to keep it on your computer and click <strong className="text-foreground">Clone</strong>.</li>
              </ul>
            ),
          },
          {
            title: "Open it in your agent app",
            body: (
              <>
                <p>
                  <strong className="text-foreground">Claude:</strong> one click opens the project in Claude's Code tab with the setup prompt ready. This guide then opens beside the chat and follows along.
                </p>
                <OpenInClaude prompt={CLAUDE_SETUP_PROMPT} />
                <ul className="list-disc space-y-1 pl-5">
                  <li><strong className="text-foreground">Claude, by hand:</strong> open the <strong className="text-foreground">Code</strong> tab, start a new session, choose the cloned folder and paste the prompt from the next step.</li>
                  <li><strong className="text-foreground">Codex:</strong> in the ChatGPT desktop app, open Codex, add the cloned folder as a project and paste the prompt from the next step.</li>
                </ul>
              </>
            ),
          },
          {
            title: "Set it up — paste this prompt",
            body: (
              <>
                <p className="text-xs">
                  Used <strong className="text-foreground">Open in Claude</strong>? The prompt is already in the chat; just press Enter.
                </p>
                <CodeBlock code={SETUP_PROMPT} language="text" title="prompt" />
                <p>
                  The agent works through the 12 steps below and does most of it. About 30 minutes in all; it stops and tells you exactly what to do at the steps marked{" "}
                  <strong className="text-foreground">You + agent</strong>. <strong className="text-foreground">Never paste keys into the chat.</strong>
                </p>
                <div className="space-y-2 rounded-xl border border-border/70 bg-muted/20 p-3">
                  <p className="flex items-center gap-2 font-medium text-foreground">
                    <Icon icon="mdi:restore" className="h-4 w-4 text-primary" aria-hidden />
                    Picking up where you left off?
                  </p>
                  <p className="text-xs">
                    Closed the chat, restarted your computer or coming back another day? Open the project in your agent app, start a <strong className="text-foreground">new</strong> chat and
                    paste this instead. The agent checks what's already done, reopens this guide and carries on from the first unfinished step.
                  </p>
                  <CodeBlock code={RESUME_PROMPT} language="text" title="pick-up prompt" />
                  <OpenInClaude compact prompt={RESUME_PROMPT} />
                </div>
              </>
            ),
          },
          {
            title: "Turn on payments (optional) — paste this prompt",
            body: (
              <>
                <CodeBlock code={PAYMENTS_PROMPT} language="text" title="prompt" />
                <ul className="list-disc space-y-1 pl-5">
                  <li>You create a Stripe account and open a sandbox (Stripe's test environment).</li>
                  <li>You create your products and prices in Stripe, and type their ids and your keys into <InlineCode>.env.local</InlineCode>.</li>
                  <li>You install the Stripe CLI and keep its webhook listener running while you test.</li>
                  <li>You turn on the Customer Portal, then buy something with Stripe's test card.</li>
                </ul>
              </>
            ),
          },
          {
            title: "Send real email (before launch) — paste this prompt",
            body: (
              <>
                <CodeBlock code={EMAIL_PROMPT} language="text" title="prompt" />
                <ul className="list-disc space-y-1 pl-5">
                  <li>Everything works without this on Supabase's free plan, but its built-in email only reaches your own Supabase team. Do it before real users sign up.</li>
                  <li>You need a domain you own, with its DNS on Cloudflare.</li>
                  <li>You create a Resend account, add a sending address on your domain, add its verification records in Cloudflare DNS, and paste Resend's key into Supabase's email settings.</li>
                  <li>You send yourself a test password reset.</li>
                </ul>
              </>
            ),
          },
          {
            title: "Deploy to Cloudflare — paste this prompt",
            body: (
              <>
                <CodeBlock code={DEPLOY_PROMPT} language="text" title="prompt" />
                <ul className="list-disc space-y-1 pl-5">
                  <li>You create a Cloudflare account (the free Workers plan is enough to start).</li>
                  <li>You connect your repository in Workers Builds (Workers &amp; Pages → Create application → Import a repository); Cloudflare builds and deploys from GitHub.</li>
                  <li>You add the secret keys as encrypted Secrets in the Cloudflare dashboard, attach your custom domain, and add the domain's redirect URLs in Supabase.</li>
                  <li>With payments on, you add a Stripe webhook for the domain.</li>
                </ul>
              </>
            ),
          },
          {
            title: "Keep building — one prompt per change",
            body: (
              <>
                {BUILD_PROMPTS.map((item) => (
                  <CodeBlock key={item.title} code={item.prompt} language="text" title={item.title} />
                ))}
                <ul className="list-disc space-y-1 pl-5">
                  <li>Edit the part in angle brackets. The skills hold the project's rules, so the agent follows them without you spelling them out.</li>
                  <li>Save and publish your work in GitHub Desktop: <strong className="text-foreground">Commit</strong>, then <strong className="text-foreground">Push origin</strong>.</li>
                </ul>
              </>
            ),
          },
        ]}
      />
    ),
  },
  {
    id: "commands",
    title: "Common Commands",
    summary: "What your agent runs, for reference. Run them in a terminal in the project folder if you ever want to yourself.",
    content: (
      <KeyValueTable
        head={["Command", "Does"]}
        rows={[
          [<InlineCode>npm run dev</InlineCode>, "Runs the app at http://localhost:3000."],
          [<InlineCode>npm run check:env</InlineCode>, "Checks .env.local the way the app does at startup, without showing any keys."],
          [<InlineCode>npm run typecheck</InlineCode>, "Checks the code's types."],
          [<InlineCode>npm run lint</InlineCode>, "Checks code style and common mistakes."],
          [<InlineCode>npm run test:e2e</InlineCode>, "Builds the app and runs the smoke tests (no database needed)."],
          [<InlineCode>npm run db:new &lt;name&gt;</InlineCode>, "Creates a new database migration file."],
          [<InlineCode>npm run db:push</InlineCode>, "Applies new migrations to the linked Supabase project."],
          [<InlineCode>npm run db:types</InlineCode>, "Regenerates the database types from the linked project."],
          [<InlineCode>npm run skills:sync</InlineCode>, "Copies the project's skills to the folder Codex reads."],
          [<InlineCode>npm run setup:status</InlineCode>, "Shows how far setup has got, with a link to this page showing your progress."],
        ]}
      />
    ),
  },
  {
    id: "pick-back-up",
    title: "Pick Back Up",
    summary: "Closed the chat, restarted the app, or something failed? Pick up where you left off with one prompt.",
    content: (
      <div className="space-y-4">
        <p>Open the project in your agent app again, start a new chat and paste this. The agent checks what's already done and carries on from the first unfinished step.</p>
        <CodeBlock code={RESUME_PROMPT} language="text" title="prompt" />
        <p>Common problems, and what to do:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong className="text-foreground">No reset email:</strong> Supabase's built-in email only reaches your own Supabase account's address and sends a couple an hour. Check spam, use that address, and wait a bit.</li>
          <li><strong className="text-foreground">"Opened in a different browser":</strong> emailed links only work in the browser that asked for them. Request a new one from that browser.</li>
          <li><strong className="text-foreground">Supabase project paused:</strong> free projects pause when unused. Open the Supabase dashboard and click <strong className="text-foreground">Restore</strong>.</li>
          <li><strong className="text-foreground">Connecting the database fails with a login error:</strong> sign in to Supabase again (the agent gives you the command), then retry.</li>
          <li><strong className="text-foreground">The agent's tools stopped working:</strong> approve or sign in to them again when it asks.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "project-layout",
    title: "Project Structure",
    summary: "Where things live.",
    content: (
      <CodeBlock
        language="text"
        title="repository"
        code={`src/
  middleware.ts            session refresh + optimistic redirects
  instrumentation.ts       env check at startup
  app/(auth)/              login, signup, check-email, forgot/reset password
  app/(protected)/         dashboard, account, components gallery, checkout
  app/auth/                PKCE callback routes
  app/api/webhooks/        Stripe webhook
  components/ui/           the component library
  components/calendar/     month / week / day event calendar
  components/billing/      checkout form, payment method card, billing buttons
  components/gallery/      the /components gallery
  components/core/         app chrome (sidebar, header, footer, error state)
  hooks/                   client hooks
  lib/actions/             server actions (auth, account, billing)
  lib/auth/                email limits, fresh-sign-in check
  lib/billing/             Stripe client, customers, subscriptions, payments, products
  lib/calendar/            calendar event type and helpers
  lib/supabase/            server/service clients, dal, db, generated types
  lib/rate-limit/          burst limiter (Workers rate-limit bindings), client IP
  lib/env.ts               typed env access, checked at startup
  lib/site.ts              the app's name and description
  lib/url-messages.ts      fixed ?error= / ?message= codes
public/_headers            security + cache headers for static files on Workers
supabase/
  migrations/              versioned schema (auth limits, profiles + avatars, billing)
  templates/               auth email templates
  config.toml              Supabase CLI config (no local database); records the auth settings
scripts/check-env.mjs      npm run check:env — validates .env.local without printing it
e2e/                       Playwright smoke tests
wrangler.jsonc             Cloudflare Workers config: name, vars, rate limits, env.dev — CLOUDFLARE.md
open-next.config.ts        OpenNext build config (defaults)
cloudflare-bindings.d.ts   types for the bindings in wrangler.jsonc
docs/                      all documentation — start at DOCS.md
.claude/skills/            agent skills for Claude Code — SKILLS.md
.agents/skills/            the same skills for Codex and other agents (npm run skills:sync)
skills-lock.json           pinned versions of installed skill sets (Supabase, Cloudflare)
.github/workflows/ci.yml   typecheck, lint, build, smoke tests, Cloudflare Workers build`}
      />
    ),
  },
];

/* ====================================================================== */
/* Component library                                                      */
/* ====================================================================== */

const GROUP_SHOT_NOTES: Partial<Record<string, string>> = {
  motion: "These components animate continuously, so the capture shows a single frame — run the gallery to see them move.",
  overlays: "Overlays are shown closed — open them in the live gallery.",
  billing: "The checkout form and one-click button need a live Stripe session, so only the card and portal button are shown.",
};

/** The groups of the template's /components gallery, in its order. Each shows one screenshot. */
const GALLERY_GROUPS = [
  { id: "actions", title: "Actions", summary: "Buttons and compact action menus." },
  { id: "forms", title: "Forms", summary: "Text fields, choice controls, pickers and multi-step form helpers." },
  { id: "overlays", title: "Overlays", summary: "Dialogs, menus, popovers, tooltips and toasts." },
  { id: "data-display", title: "Data Display", summary: "Surfaces, tables, lists, status indicators and embeds." },
  { id: "navigation", title: "Navigation", summary: "Menus, links, tabs and disclosure controls." },
  { id: "layout", title: "Layout", summary: "Headings, dividers, scroll containers and scrolling cards." },
  { id: "motion", title: "Motion", summary: "Scroll-triggered reveals and animated text effects." },
  { id: "calendar", title: "Calendar", summary: "Month, week and day event calendar with an upcoming-events sidebar." },
  { id: "billing", title: "Billing", summary: "Stripe payment method card and billing buttons." },
];

const componentLibrarySections: DocRecord["sections"] = GALLERY_GROUPS.map((group) => ({
  ...group,
  content: <GalleryShot id={group.id} title={group.title} note={GROUP_SHOT_NOTES[group.id]} />,
}));

const gettingStartedDoc = createDoc(
  "getting-started",
  "Getting Started",
  "Get the code, then let your AI agent set the project up from one prompt.",
  "Getting Started",
  "From an empty folder to a running app with working auth: get the code, then paste one prompt into your AI coding agent.",
  "mdi:rocket-launch-outline",
  gettingStartedSections,
);

const componentLibraryDoc = createDoc(
  "component-library",
  "Component Library",
  "A gallery of every component that ships with the template, by group.",
  "Component Library",
  "Screenshots of the template's /components gallery, one per group.",
  "mdi:shape-outline",
  componentLibrarySections,
);

export const nextSupabaseTemplateSpace: DocSpace = {
  id: spaceId,
  title: "Next + Supabase Template",
  description: "Setup guide and component library for the Next.js + Supabase starter template.",
  href: `/spaces/${spaceId}`,
  cardIcon: "mdi:application-brackets-outline",
  docs: [gettingStartedDoc, componentLibraryDoc],
};
