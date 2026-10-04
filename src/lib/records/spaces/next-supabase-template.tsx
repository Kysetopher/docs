import type { DocRecord, DocSpace } from "@/lib/records/doc-types";
import {
  CodeBlock,
  GalleryShot,
  InlineCode,
  KeyValueTable,
  Steps,
  TechStack,
  type TechStackGroup,
  ToolTable,
} from "@/components/docs/next-supabase-template/TemplateBlocks";

const spaceId = "next-supabase-template";
const REPO = "Kysetopher/next-supabase-template";
const REPO_URL = `https://github.com/${REPO}`;

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

/** What the user pastes to deploy; it must match the prompt quoted in the template's docs/CLOUDFLARE.md. */
const DEPLOY_PROMPT =
  "Deploy this project to Cloudflare: read docs/CLOUDFLARE.md and follow the Deploy runbook step by step. Stop and wait for me at every USER STEP.";

/** What the user pastes when setup stopped partway; it must match the resume prompt quoted in the template's docs/SETUP.md. */
const RESUME_PROMPT =
  "Continue setting up this project: read docs/SETUP.md, work out from the project's current state which step we're on, tell me, and continue from there. Stop and wait for me at every USER STEP.";

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
      <ToolTable
        rows={[
          {
            icons: ["mdi:account-circle-outline"],
            tool: "A GitHub account",
            notes: <>Sign up at <a className="text-primary underline-offset-2 hover:underline" href="https://github.com/signup" target="_blank" rel="noreferrer">github.com</a>.</>,
          },
          {
            icons: ["simple-icons:github"],
            tool: "GitHub Desktop",
            notes: <>Download from <a className="text-primary underline-offset-2 hover:underline" href="https://desktop.github.com" target="_blank" rel="noreferrer">desktop.github.com</a> and sign in with your GitHub account. It clones the project and handles commits and pushes.</>,
          },
          {
            icons: ["simple-icons:claude", "simple-icons:openai"],
            tool: "An AI agent app",
            notes: (
              <>
                The <a className="text-primary underline-offset-2 hover:underline" href="https://claude.com/download" target="_blank" rel="noreferrer">Claude desktop app</a> (its <strong className="text-foreground">Code</strong> tab is Claude Code) or the 
                <a className="text-primary underline-offset-2 hover:underline" href="https://learn.chatgpt.com/docs/app" target="_blank" rel="noreferrer">ChatGPT desktop app with Codex</a>. Sign in with your Claude or ChatGPT account. The template is set
                up for agents: they read <InlineCode>AGENTS.md</InlineCode> / <InlineCode>CLAUDE.md</InlineCode>, the docs in 
                <InlineCode>docs/</InlineCode> and the project's skills, so they follow its conventions.
              </>
            ),
          },
          {
            icons: ["simple-icons:nodedotjs"],
            tool: "Node.js 24",
            notes: <>Download the version 24 installer from <a className="text-primary underline-offset-2 hover:underline" href="https://nodejs.org" target="_blank" rel="noreferrer">nodejs.org</a>. Quit and reopen your agent app after installing so it finds Node.</>,
          },
          {
            icons: ["simple-icons:googlechrome"],
            tool: "Google Chrome",
            notes: <>From <a className="text-primary underline-offset-2 hover:underline" href="https://www.google.com/chrome" target="_blank" rel="noreferrer">google.com/chrome</a>. Your agent can use it to open and check the running app.</>,
          },
          {
            icons: ["simple-icons:supabase"],
            tool: "A Supabase project",
            notes: <>Free tier is fine for development. Create one at <a className="text-primary underline-offset-2 hover:underline" href="https://supabase.com/dashboard" target="_blank" rel="noreferrer">supabase.com/dashboard</a>.</>,
          },
          {
            icons: ["simple-icons:cloudflare"],
            tool: "A Cloudflare account",
            notes: <>Only when you deploy. Sign up at <a className="text-primary underline-offset-2 hover:underline" href="https://dash.cloudflare.com/sign-up" target="_blank" rel="noreferrer">dash.cloudflare.com</a>; the free Workers plan is enough to start.</>,
          },
        ]}
      />
    ),
  },
  {
    id: "steps",
    title: "Steps",
    summary: "Everything from an empty computer to a live app, in order. Your AI agent does the work; each prompt step stops for the parts only you can do.",
    content: (
      <Steps
        steps={[
          {
            title: "Create your accounts and install the apps",
            body: (
              <ul className="list-disc space-y-1 pl-5">
                <li>Everything in <strong className="text-foreground">Tools</strong> above: GitHub, GitHub Desktop, an AI agent app, Node.js 24, Chrome, Supabase.</li>
                <li>Create a Supabase project (the free plan is fine) and save its database password in a password manager.</li>
                <li>Cloudflare and Stripe can wait until their steps below.</li>
              </ul>
            ),
          },
          {
            title: "Create your repository from the template",
            body: (
              <ul className="list-disc space-y-1 pl-5">
                <li>Open <a className="text-primary underline-offset-2 hover:underline" href={REPO_URL} target="_blank" rel="noreferrer">{REPO}</a> and click <strong className="text-foreground">Use this template → Create a new repository</strong>.</li>
                <li>Give it your project's name. It starts with a clean history and is yours.</li>
              </ul>
            ),
          },
          {
            title: "Clone it with GitHub Desktop",
            body: (
              <ul className="list-disc space-y-1 pl-5">
                <li>On your new repository's page, click <strong className="text-foreground">Code → Open with GitHub Desktop</strong>.</li>
                <li>Choose where to keep it on your computer and click <strong className="text-foreground">Clone</strong>.</li>
              </ul>
            ),
          },
          {
            title: "Open it as a project in your agent app",
            body: (
              <ul className="list-disc space-y-1 pl-5">
                <li><strong className="text-foreground">Claude:</strong> open the <strong className="text-foreground">Code</strong> tab, start a new session and choose the cloned folder.</li>
                <li><strong className="text-foreground">Codex:</strong> in the ChatGPT desktop app, open Codex and add the cloned folder as a project.</li>
              </ul>
            ),
          },
          {
            title: "Set it up — paste this prompt",
            body: (
              <>
                <CodeBlock code={SETUP_PROMPT} language="text" title="prompt" />
                <ul className="list-disc space-y-1 pl-5">
                  <li>The agent installs everything, loads the project's skills, connects Supabase, creates the database tables, applies your app's name and brand color, and checks that everything passes.</li>
                  <li>You type your Supabase keys into the project's <InlineCode>.env.local</InlineCode> file with a text editor (Notepad or TextEdit). <strong className="text-foreground">Never paste keys into the chat.</strong></li>
                  <li>You sign in to Supabase and connect the project (three commands it gives you; the last asks you to confirm with Y).</li>
                  <li>You approve the agent's tools, restart the app when it says so, and sign in to Supabase and Cloudflare. GitHub (with a token for this repository only) and Chrome are optional.</li>
                  <li>You change three settings in the Supabase dashboard and answer a few questions: name, description, brand color.</li>
                  <li>You sign up in the running app with your Supabase account's email and try a password reset.</li>
                </ul>
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
