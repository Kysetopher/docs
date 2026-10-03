import type { DocRecord, DocSpace } from "@/lib/records/doc-types";
import {
  CodeBlock,
  GalleryShot,
  InlineCode,
  KeyValueTable,
  Panel,
  Steps,
  TechStack,
  type TechStackGroup,
  ToolTable,
} from "@/components/docs/next-supabase-template/TemplateBlocks";
import { DocLink } from "@/components/docs/DocLink";

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
                VS Code's terminal with <strong className="text-foreground">Terminal → New Terminal</strong>. Run every command in the rest
                of this guide there; it already starts in the project folder.
              </p>
            ),
          },
        ]}
      />
    ),
  },
  {
    id: "install-and-configure",
    title: "Install And Configure",
    summary: "Install dependencies and point the app at your Supabase project.",
    content: (
      <Steps
        steps={[
          {
            title: "Install dependencies",
            body: <CodeBlock code="npm install" />,
          },
          {
            title: "Create your local env file",
            body: (
              <>
                <CodeBlock code="cp .env.example .env.local" title="macOS / Linux" />
                <CodeBlock code="Copy-Item .env.example .env.local" title="Windows (PowerShell)" />
              </>
            ),
          },
          {
            title: "Fill in the four variables",
            body: (
              <>
                <KeyValueTable
                  head={["Variable", "Where to find it"]}
                  rows={[
                    [<InlineCode>SUPABASE_URL</InlineCode>, "Supabase Dashboard → Settings → API → Project URL."],
                    [<InlineCode>SUPABASE_PUBLISHABLE_KEY</InlineCode>, "Settings → API Keys → Publishable key. Safe anywhere; RLS enforces access."],
                    [<InlineCode>SUPABASE_SECRET_KEY</InlineCode>, "Settings → API Keys → Secret key. Bypasses RLS — server only, never commit it."],
                    [<InlineCode>SITE_URL</InlineCode>, <>The origin the app is served from, no trailing slash. <InlineCode>http://localhost:3000</InlineCode> in development.</>],
                  ]}
                />
                <p>None are <InlineCode>NEXT_PUBLIC_</InlineCode>: nothing reads them in the browser. The server checks all four at startup and refuses to start with a plain list of anything missing or malformed.</p>
                <p>
                  <InlineCode>.env.example</InlineCode> also lists an optional Stripe group (<InlineCode>STRIPE_*</InlineCode>). Leave it empty to run without billing; to turn billing on, see{" "}
                  <DocLink spaceId={spaceId} docId="getting-started" sectionId="payments" label="Payments (Optional)" variant="inline" />.
                </p>
              </>
            ),
          },
        ]}
      />
    ),
  },
  {
    id: "database",
    title: "Database And Migrations",
    summary: "Schema changes are versioned SQL files in supabase/migrations — never hand-edit a hosted database.",
    content: (
      <div className="space-y-5">
        <KeyValueTable
          head={["Migration", "Creates"]}
          rows={[
            [<InlineCode>*_auth_limits.sql</InlineCode>, "Per-email counters for auth emails, reset-code guesses and password logins, plus nightly pruning with pg_cron."],
            [<InlineCode>*_profiles_and_avatars.sql</InlineCode>, "A profiles table created on signup, with RLS and narrow grants, and a private per-user avatars storage bucket. The pattern to copy for every new table."],
            [<InlineCode>*_billing.sql</InlineCode>, "billing_customers, subscriptions and payments for optional Stripe billing. Users read their own rows; only the service role (the webhook) writes. Harmless with billing off."],
          ]}
        />

        <Panel eyebrow="Hosted project" title="Apply to your Supabase project">
          <p>Find the project ref in the dashboard URL (<InlineCode>supabase.com/dashboard/project/&lt;ref&gt;</InlineCode>).</p>
          <CodeBlock code={`npx supabase login\nnpx supabase link --project-ref <ref>\nnpm run db:push`} />
        </Panel>

        <KeyValueTable
          head={["Script", "Does"]}
          rows={[
            [<InlineCode>npm run db:new &lt;name&gt;</InlineCode>, "Creates a new empty migration file."],
            [<InlineCode>npm run db:types</InlineCode>, "Regenerates src/lib/supabase/types.ts from your linked Supabase project. Run it after db:push."],
            [<InlineCode>npm run db:push</InlineCode>, "Applies pending migrations to the linked hosted project."],
          ]}
        />
      </div>
    ),
  },
  {
    id: "supabase-settings",
    title: "Supabase Dashboard Settings",
    summary: "A hosted project needs these once. Local development gets them from supabase/config.toml.",
    content: (
      <Steps
        steps={[
          {
            title: "Authentication → Providers → Email",
            body: <p>Turn on <strong className="text-foreground">Confirm email</strong>, <strong className="text-foreground">Secure email change</strong> and <strong className="text-foreground">Secure password change</strong>.</p>,
          },
          {
            title: "Authentication → Email Templates → Reset Password",
            body: (
              <>
                <p>The reset page asks for a 6-digit code, so the email must show the code instead of a link. Paste the contents of <InlineCode>supabase/templates/recovery.html</InlineCode>, or at least:</p>
                <CodeBlock code={`<p>Your code is <strong>{{ .Token }}</strong></p>`} language="html" />
              </>
            ),
          },
          {
            title: "Authentication → URL Configuration",
            body: (
              <p>
                Set <strong className="text-foreground">Site URL</strong> to your <InlineCode>SITE_URL</InlineCode>, and add <InlineCode>&lt;SITE_URL&gt;/auth/callback</InlineCode> and <InlineCode>&lt;SITE_URL&gt;/auth/email-change</InlineCode> to <strong className="text-foreground">Redirect URLs</strong>. Without them, confirmation and email-change links never complete.
              </p>
            ),
          },
          {
            title: "Production email",
            body: <p>Supabase's built-in mailer is rate-limited and meant for development. Before launch, configure a transactional provider (Resend, Postmark, SES…) under Authentication → SMTP Settings.</p>,
          },
        ]}
      />
    ),
  },
  {
    id: "payments",
    title: "Payments (Optional)",
    summary: "Stripe subscriptions and one-time purchases. Skip this section to run without billing.",
    content: (
      <div className="space-y-5">
        <p className="text-sm leading-6 text-muted-foreground">
          Billing is off unless all three of <InlineCode>STRIPE_SECRET_KEY</InlineCode>, <InlineCode>STRIPE_PUBLISHABLE_KEY</InlineCode> and <InlineCode>STRIPE_WEBHOOK_SECRET</InlineCode> are set. With none set the app runs normally: <InlineCode>/checkout</InlineCode> 404s, the account page has no Billing section and the webhook answers 503. Code checks <InlineCode>isBillingEnabled()</InlineCode> from <InlineCode>src/lib/env.ts</InlineCode>. Use Stripe test mode until launch.
        </p>
        <Steps
          steps={[
            {
              title: "Define your products",
              body: (
                <>
                  <p>
                    In the Stripe Dashboard, create each product and its price under <strong className="text-foreground">Product catalog</strong>: a recurring price for a subscription, a one-time price for a single purchase. Then list them in <InlineCode>src/lib/billing/products.ts</InlineCode>, which ships empty:
                  </p>
                  <CodeBlock
                    language="ts"
                    title="src/lib/billing/products.ts"
                    code={`const CATALOG = {
  pro: { name: "Pro", description: "Billed monthly.", mode: "subscription", priceEnvVar: "STRIPE_PRICE_PRO" },
  lifetime: { name: "Lifetime", description: "One payment.", mode: "payment", priceEnvVar: "STRIPE_PRICE_LIFETIME" },
} satisfies Record<string, ProductConfig>;`}
                  />
                  <p>
                    The key (<InlineCode>pro</InlineCode>) is what URLs use (<InlineCode>/checkout?product=pro</InlineCode>) and is stored on rows, so keep it stable. Each product names its own <InlineCode>STRIPE_PRICE_&lt;NAME&gt;</InlineCode> env var; the amount always comes from the Stripe Price.
                  </p>
                </>
              ),
            },
            {
              title: "Set the Stripe env vars",
              body: (
                <>
                  <KeyValueTable
                    head={["Variable", "Where to find it"]}
                    rows={[
                      [<InlineCode>STRIPE_SECRET_KEY</InlineCode>, <>Developers → API keys → Secret key (<InlineCode>sk_test_…</InlineCode>). Server only.</>],
                      [<InlineCode>STRIPE_PUBLISHABLE_KEY</InlineCode>, <>Same page (<InlineCode>pk_test_…</InlineCode>), same mode as the secret key. Passed to the checkout form at request time, not through <InlineCode>NEXT_PUBLIC_</InlineCode>.</>],
                      [<InlineCode>STRIPE_WEBHOOK_SECRET</InlineCode>, <>The webhook endpoint's signing secret (<InlineCode>whsec_…</InlineCode>), from the steps below.</>],
                      [<InlineCode>STRIPE_PRICE_&lt;NAME&gt;</InlineCode>, <>One per product in the catalog (<InlineCode>price_…</InlineCode>).</>],
                    ]}
                  />
                  <p>Set all three keys or none. A partial set, a wrong prefix, mixed test and live keys, or a missing product price stops the server at startup with a list of what's wrong.</p>
                </>
              ),
            },
            {
              title: "Apply the billing migration",
              body: (
                <>
                  <p>
                    <InlineCode>*_billing.sql</InlineCode> creates <InlineCode>billing_customers</InlineCode>, <InlineCode>subscriptions</InlineCode> and <InlineCode>payments</InlineCode>. It's applied with the other migrations; if your project was pushed before it existed, push again:
                  </p>
                  <CodeBlock code="npm run db:push" />
                </>
              ),
            },
            {
              title: "Developers → Webhooks → Add endpoint",
              body: (
                <>
                  <p>
                    Set the endpoint URL to <InlineCode>&lt;SITE_URL&gt;/api/webhooks/stripe</InlineCode> and subscribe it to exactly these events. Copy its signing secret into <InlineCode>STRIPE_WEBHOOK_SECRET</InlineCode> for that deployment.
                  </p>
                  <CodeBlock
                    language="text"
                    title="events"
                    code={`customer.subscription.created
customer.subscription.updated
customer.subscription.deleted
payment_intent.succeeded
charge.refunded
charge.dispute.created
charge.dispute.closed`}
                  />
                  <p>The webhook is the only writer of subscription and payment rows; the browser's payment confirmation and the success page record nothing.</p>
                </>
              ),
            },
            {
              title: "Forward webhooks locally",
              body: (
                <>
                  <p>
                    Install the{" "}
                    <a className="text-primary underline-offset-2 hover:underline" href="https://docs.stripe.com/stripe-cli" target="_blank" rel="noreferrer">
                      Stripe CLI
                    </a>
                    , then sign in:
                  </p>
                  <CodeBlock code="stripe login" />
                  <p>Forward events to the dev server:</p>
                  <CodeBlock code="stripe listen --forward-to localhost:3000/api/webhooks/stripe" />
                  <p>
                    It prints a <InlineCode>whsec_…</InlineCode> secret. Put it in <InlineCode>STRIPE_WEBHOOK_SECRET</InlineCode> in <InlineCode>.env.local</InlineCode> and restart <InlineCode>npm run dev</InlineCode>.
                  </p>
                </>
              ),
            },
            {
              title: "Settings → Billing → Customer portal",
              body: (
                <p>
                  Turn on updating payment methods, invoice history and cancellation (and plan switching, if you want it). <strong className="text-foreground">Manage billing</strong> on <InlineCode>/account</InlineCode> opens the portal.
                </p>
              ),
            },
          ]}
        />
        <p className="text-sm leading-6 text-muted-foreground">
          To try it, sign in, open <InlineCode>/checkout?product=&lt;key&gt;</InlineCode> and pay with Stripe's test card <InlineCode>4242 4242 4242 4242</InlineCode> (any future expiry, any CVC). The template's <InlineCode>docs/STRIPE.md</InlineCode> covers the flows, safety rules and fulfilment hooks.
        </p>
      </div>
    ),
  },
  {
    id: "run-and-check",
    title: "Run And Check",
    summary: "Start the dev server, then run the same checks CI runs.",
    content: (
      <div className="space-y-5">
        <CodeBlock code="npm run dev" />
        <p className="text-sm leading-6 text-muted-foreground">
          Open <InlineCode>http://localhost:3000</InlineCode>, create an account, confirm the email, and you land on <InlineCode>/dashboard</InlineCode>. The <InlineCode>/components</InlineCode> page (signed in) shows every UI component live — the{" "}
          <DocLink spaceId={spaceId} docId="component-library" variant="inline" /> doc has screenshots of it.
        </p>
        <KeyValueTable
          head={["Command", "Checks"]}
          rows={[
            [<InlineCode>npm run typecheck</InlineCode>, "TypeScript, strict."],
            [<InlineCode>npm run lint</InlineCode>, "ESLint with the Next.js rules."],
            [<InlineCode>npm run build</InlineCode>, "Production build."],
            [<InlineCode>npm run test:e2e</InlineCode>, "Playwright smoke tests — pages render, protected routes redirect, URL error codes are safe, security headers are sent, and billing stays gated when disabled. No Supabase or Stripe needed. First run: npx playwright install chromium."],
          ]}
        />
        <p className="text-sm leading-6 text-muted-foreground">
          <InlineCode>.github/workflows/ci.yml</InlineCode> runs all four on every push to <InlineCode>main</InlineCode> and every pull request.
        </p>
      </div>
    ),
  },
  {
    id: "make-it-yours",
    title: "Make It Yours",
    summary: "The handful of places a new project changes. Nothing else in the template hard-codes a name or color.",
    content: (
      <KeyValueTable
        head={["File", "Change"]}
        rows={[
          [<InlineCode>src/lib/site.ts</InlineCode>, "App name and description, used in titles, headers and footers."],
          [<InlineCode>src/app/globals.css</InlineCode>, <>Color tokens in <InlineCode>:root</InlineCode>. <InlineCode>--primary</InlineCode> is the one brand color.</>],
          [<InlineCode>src/app/favicon.ico</InlineCode>, "Replace with your icon."],
          [<InlineCode>src/app/(protected)/</InlineCode>, <>New pages here are protected automatically. Public pages go in <InlineCode>PUBLIC_ROUTES</InlineCode> in <InlineCode>src/proxy.ts</InlineCode>.</>],
          [<InlineCode>src/components/core/sidebar.tsx</InlineCode>, "Add a link for each new protected page."],
          ["New tables", <>Copy the shape of <InlineCode>profiles</InlineCode>: RLS on, one policy per allowed operation on <InlineCode>(select auth.uid())</InlineCode>, narrow grants, <InlineCode>on delete cascade</InlineCode> from <InlineCode>auth.users</InlineCode>. Then <InlineCode>npm run db:types</InlineCode>.</>],
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
  config.toml              local Supabase stack, preconfigured for the auth flows
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
  "Clone or download the template, connect Supabase, apply migrations, and run it.",
  "Getting Started",
  "From an empty folder to a running app with working auth: get the code, configure env vars, apply migrations, and deploy.",
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
