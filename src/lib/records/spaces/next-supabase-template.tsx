import type { DocRecord, DocSpace } from "@/lib/records/doc-types";
import {
  CodeBlock,
  GalleryShot,
  InlineCode,
  Panel,
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
      { name: "Next.js", version: "16.3", use: "App Router, Server Components and Server Actions; src/proxy.ts refreshes the session on every request; instrumentation.ts checks env vars at startup." },
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
      { name: "GitHub Actions", version: "—", use: "CI on every push and pull request: typecheck, lint, build, smoke tests." },
      { name: "Security headers", version: "—", use: "Frame-blocking, nosniff, referrer policy and HSTS set in next.config.ts." },
      { name: "Hosting", version: "—", use: "Any Node host for Next.js 16; Vercel works as-is, Cloudflare Workers via OpenNext." },
    ],
  },
];

/** What the user pastes into their AI agent; it must match the prompt quoted in the template's docs/SETUP.md. */
const SETUP_PROMPT =
  "Set up this project for me: read docs/SETUP.md and follow it step by step. Stop and wait for me at every USER STEP.";

const gettingStartedSections: DocRecord["sections"] = [
  {
    id: "overview",
    title: "Tech Stack",
    summary: "Everything the template is built on, with the versions it ships with.",
    content: <TechStack groups={TECH_STACK} />,
  },
  {
    id: "prerequisites",
    title: "Prerequisites",
    summary: "What to install before you start.",
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
            icons: ["mdi:microsoft-visual-studio-code"],
            tool: "Visual Studio Code",
            notes: <>Download from <a className="text-primary underline-offset-2 hover:underline" href="https://code.visualstudio.com" target="_blank" rel="noreferrer">code.visualstudio.com</a>. You edit the project and run every command in this guide from its built-in terminal.</>,
          },
          {
            icons: ["simple-icons:claude", "simple-icons:openai"],
            tool: "An AI coding agent",
            notes: (
              <>
                <a className="text-primary underline-offset-2 hover:underline" href="https://claude.com/claude-code" target="_blank" rel="noreferrer">Claude Code</a>, <a className="text-primary underline-offset-2 hover:underline" href="https://github.com/openai/codex" target="_blank" rel="noreferrer">OpenAI Codex</a>, or another coding agent. Run it from VS Code's
                terminal in the project folder. The template is set up for agents: they read <InlineCode>AGENTS.md</InlineCode> / 
                <InlineCode>CLAUDE.md</InlineCode>, the docs in <InlineCode>docs/</InlineCode>, and the skills in 
                <InlineCode>.claude/skills/</InlineCode>, so they follow the project's conventions.
              </>
            ),
          },
          {
            icons: ["simple-icons:nodedotjs"],
            tool: "Node.js 24",
            notes: <>Download the version 24 installer from <a className="text-primary underline-offset-2 hover:underline" href="https://nodejs.org" target="_blank" rel="noreferrer">nodejs.org</a>. Restart VS Code after installing so its terminal finds it.</>,
          },
          {
            icons: ["simple-icons:supabase"],
            tool: "A Supabase project",
            notes: <>Free tier is fine for development. Create one at <a className="text-primary underline-offset-2 hover:underline" href="https://supabase.com/dashboard" target="_blank" rel="noreferrer">supabase.com/dashboard</a>.</>,
          },
        ]}
      />
    ),
  },
  {
    id: "get-the-code",
    title: "Get The Code",
    summary: "Create your own copy of the template on GitHub, clone it with GitHub Desktop, and open it in VS Code.",
    content: (
      <Steps
        steps={[
          {
            title: "Create your repository from the template",
            body: (
              <p>
                Open{" "}
                <a className="text-primary underline-offset-2 hover:underline" href={REPO_URL} target="_blank" rel="noreferrer">
                  {REPO}
                </a>{" "}
                and click <strong className="text-foreground">Use this template → Create a new repository</strong>. Give it your
                project's name. It starts with a clean history and is yours.
              </p>
            ),
          },
          {
            title: "Clone it with GitHub Desktop",
            body: (
              <p>
                On your new repository's page, click <strong className="text-foreground">Code → Open with GitHub Desktop</strong>.
                GitHub Desktop opens; choose where to keep the project on your computer and click <strong className="text-foreground">Clone</strong>.
              </p>
            ),
          },
          {
            title: "Open it in Visual Studio Code",
            body: (
              <p>
                In GitHub Desktop, choose <strong className="text-foreground">Repository → Open in Visual Studio Code</strong>. Then open
                VS Code's terminal with <strong className="text-foreground">Terminal → New Terminal</strong>. That's where you'll start your AI
                agent next; it already starts in the project folder.
              </p>
            ),
          },
        ]}
      />
    ),
  },
  {
    id: "set-up-with-ai",
    title: "Set Up With Your AI Agent",
    summary: "One prompt sets the whole project up. Your agent does the work and stops whenever it needs you.",
    content: (
      <Steps
        steps={[
          {
            title: "Start your AI agent in the project",
            body: (
              <>
                <p>In VS Code's terminal (it's already in the project folder), start your agent — for Claude Code:</p>
                <CodeBlock code="claude" title="Claude Code" />
                <p>or for OpenAI Codex:</p>
                <CodeBlock code="codex" title="OpenAI Codex" />
              </>
            ),
          },
          {
            title: "Paste this prompt",
            body: (
              <>
                <CodeBlock code={SETUP_PROMPT} language="text" title="prompt" />
                <p>
                  The agent follows <InlineCode>docs/SETUP.md</InlineCode> in the repository: it installs everything, connects your Supabase
                  project, creates the database tables, applies your app's name and brand color, checks that everything passes,
                  and walks you through your first sign-up.
                </p>
              </>
            ),
          },
          {
            title: "Do the steps it hands you",
            body: (
              <>
                <p>A few things only you can do. The agent stops and tells you exactly what to click or run:</p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Create a Supabase project, then type its keys into the <InlineCode>.env.local</InlineCode> file in VS Code. <strong className="text-foreground">Never paste keys into the chat</strong> — the agent checks the file without reading them out.</li>
                  <li>Sign in to Supabase and connect the project (three commands it gives you, which ask for your database password).</li>
                  <li>Change four settings in the Supabase dashboard.</li>
                  <li>Answer a few questions: your app's name, its description and its brand color, and whether to turn on payments now.</li>
                  <li>Sign up in the running app to try it.</li>
                </ul>
              </>
            ),
          },
        ]}
      />
    ),
  },
  {
    id: "deploy",
    title: "Deploy",
    summary: "Any Node host that runs Next.js 16 works. Notes for the common ones.",
    content: (
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel eyebrow="Vercel" title="Import the repository">
          <p>Add the four env vars in Project Settings → Environment Variables, with <InlineCode>SITE_URL</InlineCode> set to the production origin, then add that origin's two <InlineCode>/auth/*</InlineCode> URLs to Supabase's Redirect URLs. Using billing? Add the Stripe vars too, with a webhook endpoint on the production origin. Commercial projects need a paid Vercel plan.</p>
          <p>Using Cloudflare for DNS? Keep the records <strong className="text-foreground">DNS only</strong> (grey cloud). Proxying through Cloudflare in front of Vercel stacks two CDNs and firewalls.</p>
        </Panel>
        <Panel eyebrow="Cloudflare Workers" title="Via OpenNext">
          <p>
            <InlineCode>@opennextjs/cloudflare</InlineCode> doesn't support Next 16's <InlineCode>proxy.ts</InlineCode> yet: rename <InlineCode>src/proxy.ts</InlineCode> to <InlineCode>src/middleware.ts</InlineCode> and the exported function to <InlineCode>middleware</InlineCode>. Keep it inside <InlineCode>src/</InlineCode>, next to <InlineCode>app/</InlineCode>.
          </p>
          <p>Use separate Supabase projects for development and production, and apply migrations to production only with <InlineCode>npm run db:push</InlineCode>.</p>
        </Panel>
      </div>
    ),
  },
  {
    id: "project-layout",
    title: "Project Layout",
    summary: "Where things live.",
    content: (
      <CodeBlock
        language="text"
        title="repository"
        code={`src/
  proxy.ts                 session refresh + optimistic redirects
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
  lib/rate-limit/          burst limiter, client IP
  lib/env.ts               typed env access, checked at startup
  lib/site.ts              the app's name and description
  lib/url-messages.ts      fixed ?error= / ?message= codes
supabase/
  migrations/              versioned schema (auth limits, profiles + avatars, billing)
  templates/               auth email templates
  config.toml              Supabase CLI config (no local database); records the auth settings
scripts/check-env.mjs      npm run check:env — validates .env.local without printing it
e2e/                       Playwright smoke tests
docs/                      all documentation — start at DOCS.md
.claude/skills/            agent skills — SKILLS.md
.github/workflows/ci.yml   typecheck, lint, build, smoke tests`}
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
