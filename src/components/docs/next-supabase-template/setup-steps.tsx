import type { ReactNode } from "react";
import { CodeBlock, InlineCode } from "@/components/docs/next-supabase-template/TemplateBlocks";
import { NodeDownload, OsSwitch, VsCodeDownload } from "@/components/docs/next-supabase-template/InstallLinks";
import {
  MockButton,
  MockDashboard,
  MockEnvFile,
  MockField,
  MockHeading,
  MockTerminal,
  MockToggle,
  Note,
  Tag,
  type NavItem,
} from "@/components/docs/next-supabase-template/SetupFigures";

/**
 * The agent-run steps of the template's docs/SETUP.md, in order. Titles must
 * match its `## N.` headings (the setup script and the agent refer to steps by
 * number and these titles). `details` is what someone following along sees
 * when they open a step: what the agent does, what they do, and where things
 * are, drawn.
 */
export type SetupStep = {
  title: string;
  /** One line shown under the title while the step is current and needs the user. */
  you?: string;
  /** Who acts: the agent alone, or the user too. */
  who: "agent" | "you";
  /** A rough duration, shown in the collapsed row. */
  time?: string;
  details: ReactNode;
};

const strong = "font-semibold text-foreground";
const link = "text-primary underline underline-offset-2";

function Part({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{title}</p>
      <div className="space-y-2 text-sm leading-6 text-muted-foreground">{children}</div>
    </div>
  );
}

function Ol({ children }: { children: ReactNode }) {
  return <ol className="list-decimal space-y-1.5 pl-5 marker:text-muted-foreground">{children}</ol>;
}

function Ul({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-1 pl-5">{children}</ul>;
}

/** The left navigation of a Supabase project, with the item(s) to click marked. */
function supabaseNav(active: string[]): NavItem[] {
  const items: NavItem[] = [
    { label: "Project overview", icon: "mdi:home-outline" },
    { label: "Table Editor", icon: "mdi:table" },
    { label: "SQL Editor", icon: "mdi:code-tags" },
    { label: "Database", icon: "mdi:database-outline" },
    { label: "Extensions", indent: true },
    { label: "Authentication", icon: "mdi:account-lock-outline" },
    { label: "Sign In / Providers", indent: true },
    { label: "URL Configuration", indent: true },
    { label: "Storage", icon: "mdi:folder-outline" },
    { label: "Integrations", icon: "mdi:puzzle-outline" },
    { label: "Project Settings", icon: "mdi:cog-outline" },
    { label: "API Keys", indent: true },
  ];
  return items
    .filter((item) => !item.indent || active.includes(item.label))
    .map((item) => ({ ...item, active: active.includes(item.label) }));
}

const SUPABASE_URL_EXAMPLE = "https://abcdefghijklmnop.supabase.co";

export const SETUP_STEPS: SetupStep[] = [
  {
    title: "Check the tools",
    who: "agent",
    time: "seconds",
    details: (
      <>
        <Part title="The agent">
          <p>Checks that Node.js 24 or newer is installed and that it's working in the project folder.</p>
        </Part>
        <Part title="You — only if Node is missing">
          <Ol>
            <li>
              Download the installer for your computer and run it with the default options.
              <span className="mt-2 flex flex-wrap items-center gap-3">
                <NodeDownload />
                <OsSwitch />
              </span>
            </li>
            <li><strong className={strong}>Quit the agent app completely</strong> and open it again. Apps only see new programs after a restart.</li>
            <li>Tell the agent you're done. It checks again.</li>
          </Ol>
        </Part>
      </>
    ),
  },
  {
    title: "Install dependencies",
    who: "agent",
    time: "1–3 min",
    details: (
      <Part title="The agent">
        <p>Runs <InlineCode>npm install</InlineCode>, which downloads the libraries the app is built on into <InlineCode>node_modules/</InlineCode>. Nothing for you to do; warnings scrolling past are normal.</p>
      </Part>
    ),
  },
  {
    title: "Agent skills",
    who: "agent",
    time: "seconds",
    details: (
      <Part title="The agent">
        <p>Confirms the project's skills are in place: written instructions it follows for common jobs (adding a table, a page, a component) plus Supabase's and Cloudflare's official ones. They ship inside the repository, so usually nothing is downloaded. It tells you in one line which are loaded.</p>
      </Part>
    ),
  },
  {
    title: "Environment variables",
    who: "you",
    time: "5 min",
    you: "You type your Supabase keys into .env.local — never into the chat.",
    details: (
      <>
        <Part title="The agent">
          <p>Creates <InlineCode>.env.local</InlineCode> in your project folder from the example file. This file holds your keys. It stays on your computer and is never committed.</p>
        </Part>
        <Part title="You">
          <Ol>
            <li>Open your project at <a className={link} href="https://supabase.com/dashboard" target="_blank" rel="noreferrer">supabase.com/dashboard</a>. No project yet? Click <strong className={strong}>New project</strong>, pick a name, the region closest to your users and a strong database password. Save the password in a password manager (the app doesn't use it, but you'll want it later).</li>
            <li>
              Open <InlineCode>.env.local</InlineCode> from your project folder in a text editor. <strong className={strong}>VS Code</strong> is the easiest: free, shows hidden files,
              and lets you see the whole project. Open it, choose <strong className={strong}>File → Open Folder…</strong>, pick the project folder and click{" "}
              <InlineCode>.env.local</InlineCode> in the file list on the left. It also works in <strong className={strong}>Notepad</strong> on Windows (right-click → Open with → Notepad) or{" "}
              <strong className={strong}>TextEdit</strong> on a Mac.
              <span className="mt-2 flex flex-wrap items-center gap-3">
                <VsCodeDownload small />
              </span>
            </li>
            <li>Copy three values from Supabase into it, one per line, after the <InlineCode>=</InlineCode> with no spaces or quotes. The pictures below show where each one is.</li>
            <li>Save the file and tell the agent "done". <strong className={strong}>Don't paste the keys into the chat.</strong></li>
          </Ol>
          <Note tone="tip" title="Can't see .env.local?">
            <p>VS Code always shows it. In Finder and Explorer, files starting with a dot are hidden by default. Mac Finder: press <strong className={strong}>Cmd + Shift + .</strong> to show them. Windows Explorer: <strong className={strong}>View → Show → Hidden items</strong>. Or ask the agent to open the folder for you.</p>
          </Note>
        </Part>

        <MockDashboard
          app="Supabase"
          appIcon="simple-icons:supabase"
          url="supabase.com/dashboard/project/abcdefghijklmnop"
          crumbs={["your-project"]}
          topButton={{ label: "Connect", tone: "blue" }}
          nav={supabaseNav([])}
          caption={
            <>
              <Tag>1</Tag> <strong className={strong}>SUPABASE_URL</strong>: click <strong className={strong}>Connect</strong> at the top of your project and copy the project URL. It looks like <InlineCode>{SUPABASE_URL_EXAMPLE}</InlineCode>. (Also under <strong className={strong}>Integrations → Data API</strong>.)
            </>
          }
        >
          <MockHeading sub="Connect to your project">Connect</MockHeading>
          <MockField label="Project URL" value={SUPABASE_URL_EXAMPLE} action="Copy" tag="1 · SUPABASE_URL" tone="blue" />
        </MockDashboard>

        <MockDashboard
          app="Supabase"
          appIcon="simple-icons:supabase"
          url="supabase.com/dashboard/project/abcdefghijklmnop/settings/api-keys"
          crumbs={["your-project", "Settings", "API Keys"]}
          nav={supabaseNav(["Project Settings", "API Keys"])}
          caption={
            <>
              <Tag tone="emerald">2</Tag> <strong className={strong}>SUPABASE_PUBLISHABLE_KEY</strong> and <Tag tone="rose">3</Tag> <strong className={strong}>SUPABASE_SECRET_KEY</strong>: <strong className={strong}>Project Settings → API Keys</strong>. Copy the publishable key, then click <strong className={strong}>Reveal</strong> on the secret key and copy it. Use the new keys on this tab, not the "Legacy" anon / service_role ones.
            </>
          }
        >
          <MockHeading sub="Publishable and secret API keys">API Keys</MockHeading>
          <MockField label="Publishable key" value="sb_publishable_••••••••••••••••" action="Copy" tag="2 · SUPABASE_PUBLISHABLE_KEY" tone="emerald" hint="Safe to use in the app; your database rules still apply." />
          <MockField label="Secret keys" value="sb_secret_••••••••••••••••••••" action="Reveal" tag="3 · SUPABASE_SECRET_KEY" tone="rose" hint="Full access — bypasses every rule. Never share it." />
        </MockDashboard>

        <MockEnvFile
          name=".env.local"
          caption="What the file looks like when you're done. Leave every other line as it is."
          lines={[
            { key: "SUPABASE_URL", value: SUPABASE_URL_EXAMPLE, tag: "1", tone: "blue" },
            { key: "SUPABASE_PUBLISHABLE_KEY", value: "sb_publishable_…", tag: "2", tone: "emerald" },
            { key: "SUPABASE_SECRET_KEY", value: "sb_secret_…", tag: "3", tone: "rose" },
            { key: "SITE_URL", value: "http://localhost:3000", note: "leave as is" },
          ]}
        />

        <Note tone="warn" title="The secret key is a master key">
          <p>Anyone with it can read and change everything in your database. It goes only in <InlineCode>.env.local</InlineCode> now, and later into Cloudflare's encrypted Secrets when you deploy — never in the chat, an email or a commit.</p>
        </Note>

        <Part title="Then">
          <p>The agent runs <InlineCode>npm run check:env</InlineCode>. It checks the file without showing any keys and names any line that's wrong (a missing value, a stray space or quote, a legacy key). Fix that line, save, and tell the agent to check again until it says <InlineCode>Environment OK.</InlineCode></p>
        </Part>
      </>
    ),
  },
  {
    title: "Connect Supabase and create the database tables",
    who: "you",
    time: "3 min",
    you: "You run three commands the agent gives you.",
    details: (
      <>
        <Part title="The agent">
          <p>Reads your project's ID (the <InlineCode>abcdefghijklmnop</InlineCode> part of <InlineCode>SUPABASE_URL</InlineCode>) and gives you three commands with it filled in. They're yours to run because they open your browser and ask you to confirm.</p>
        </Part>
        <Part title="You">
          <Ol>
            <li>Open a terminal in the project folder: the agent app's terminal if it has one; otherwise on Windows right-click the folder → <strong className={strong}>Open in Terminal</strong>, on a Mac open <strong className={strong}>Terminal</strong> and type <InlineCode>cd </InlineCode> then drag the folder in.</li>
            <li>Paste the commands one at a time and wait for each to finish.</li>
          </Ol>
        </Part>
        <MockTerminal
          caption="What each command does and what it asks you. Your project ID replaces abcdefghijklmnop."
          lines={[
            { cmd: "npx supabase login", out: "Opening the browser to log in…", you: "Your browser opens. Sign in to Supabase and approve. If it shows a code, paste it back into the terminal." },
            { cmd: "npx supabase link --project-ref abcdefghijklmnop", out: "Finished supabase link.", you: "Connects this folder to your project. No password needed." },
            { cmd: "npm run db:push", out: "Do you want to push these migrations to the remote database?\n • …_auth_limits.sql\n • …_profiles.sql\n • …_billing.sql\n [Y/n]", you: "Type Y and press Enter. This creates the app's tables." },
          ]}
        />
        <Part title="Then">
          <p>The agent regenerates the database types to confirm the tables exist (<InlineCode>profiles</InlineCode>, the sign-in limits and billing tables).</p>
        </Part>
        <Note tone="tip" title="If it fails">
          <Ul>
            <li><strong className={strong}>Login or permission error:</strong> run <InlineCode>npx supabase login</InlineCode> again, then retry.</li>
            <li><strong className={strong}>Project paused:</strong> open the dashboard and click <strong className={strong}>Restore</strong>, wait a minute, retry.</li>
            <li>Anything else: copy the error text into the chat. It never contains your keys.</li>
          </Ul>
        </Note>
      </>
    ),
  },
  {
    title: "Connect the agent's tools (MCP)",
    who: "you",
    time: "5 min",
    you: "Claude: restart, approve the tools and sign in. Codex: install the Supabase and Cloudflare plugins.",
    details: (
      <>
        <Part title="What this adds">
          <p>Lets the agent look at your <strong className={strong}>development</strong> database (read-only), search Cloudflare's docs and read your deploy logs. Every sign-in happens in your browser; you never hand over a token.</p>
        </Part>
        <Part title="Claude (desktop Code tab or CLI)">
          <Ol>
            <li>The agent fills your project ID into <InlineCode>.mcp.json</InlineCode>, then asks you to restart.</li>
            <li><strong className={strong}>Quit Claude completely</strong>, reopen it and open this same conversation from the sidebar (CLI: <InlineCode>claude --continue</InlineCode>).</li>
            <li>When it asks whether to use this project's MCP servers, approve <InlineCode>supabase</InlineCode>, <InlineCode>cloudflare-docs</InlineCode>, <InlineCode>cloudflare-observability</InlineCode> and <InlineCode>cloudflare-builds</InlineCode>.</li>
            <li>Type <InlineCode>/mcp</InlineCode>, choose <InlineCode>supabase</InlineCode> and finish the sign-in in your browser. Do the same for the two Cloudflare ones (no Cloudflare account yet? Skip them until you deploy).</li>
            <li>If <InlineCode>/mcp</InlineCode> also lists Supabase or Cloudflare connectors from your claude.ai account, turn those off for this project. They can reach more than the development project.</li>
          </Ol>
        </Part>
        <Part title="Codex (ChatGPT desktop app)">
          <Ol>
            <li>Open <strong className={strong}>Plugins</strong> (CLI: <InlineCode>/plugins</InlineCode>), find <strong className={strong}>Supabase</strong> and install it. When it signs in, pick the organization with your development project.</li>
            <li>Install <strong className={strong}>Cloudflare</strong> the same way.</li>
          </Ol>
        </Part>
        <Part title="Optional extras">
          <Ul>
            <li><strong className={strong}>GitHub</strong> (default no), so the agent can read issues, pull requests and CI. Claude: install the GitHub CLI (Windows <InlineCode>winget install --id GitHub.cli</InlineCode>, Mac <InlineCode>brew install gh</InlineCode>), restart the app, then <InlineCode>gh auth login --web</InlineCode>. Codex: the GitHub plugin.</li>
            <li><strong className={strong}>Browser:</strong> built in to the Claude and ChatGPT desktop apps. This page opening beside the chat already counts.</li>
          </Ul>
        </Part>
        <Part title="Then">
          <p>The agent lists your database tables to prove the connection works, and the chips in <strong className={strong}>Integrations</strong> above turn green.</p>
        </Part>
      </>
    ),
  },
  {
    title: "Supabase dashboard settings",
    who: "you",
    time: "3 min",
    you: "You change three settings in the Supabase dashboard.",
    details: (
      <>
        <Part title="Why">
          <p>So anyone can sign up straight away on Supabase's free built-in email, and so sign-in links come back to your app. Email confirmation comes back on when you connect real email before launch.</p>
        </Part>
        <MockDashboard
          app="Supabase"
          appIcon="simple-icons:supabase"
          url="supabase.com/dashboard/project/…/auth/providers"
          crumbs={["your-project", "Authentication", "Sign In / Providers"]}
          nav={supabaseNav(["Authentication", "Sign In / Providers"])}
          caption={
            <>
              <Tag>A</Tag> <strong className={strong}>Authentication → Sign In / Providers</strong>: under User Signups turn <strong className={strong}>Confirm email</strong> off. Then open the <strong className={strong}>Email</strong> provider, turn <strong className={strong}>Secure email change</strong> and <strong className={strong}>Secure password change</strong> on, and <strong className={strong}>Save</strong>.
            </>
          }
        >
          <MockHeading sub="User Signups">Sign In / Providers</MockHeading>
          <MockToggle label="Confirm email" on={false} tone="rose" note="Off for now — turned back on with real email" />
          <MockHeading sub="Email provider">Email</MockHeading>
          <MockToggle label="Secure email change" on tone="emerald" />
          <MockToggle label="Secure password change" on tone="emerald" />
          <MockButton tone="blue">Save</MockButton>
        </MockDashboard>

        <MockDashboard
          app="Supabase"
          appIcon="simple-icons:supabase"
          url="supabase.com/dashboard/project/…/auth/url-configuration"
          crumbs={["your-project", "Authentication", "URL Configuration"]}
          nav={supabaseNav(["Authentication", "URL Configuration"])}
          caption={
            <>
              <Tag>B</Tag> <strong className={strong}>Authentication → URL Configuration</strong>: set the Site URL, then <strong className={strong}>Add URL</strong> three times for the redirect URLs, and save.
            </>
          }
        >
          <MockField label="Site URL" value="http://localhost:3000" tag="Site URL" />
          <MockHeading>Redirect URLs</MockHeading>
          <MockField label="" value="http://localhost:3000/auth/callback" tag="1" tone="emerald" />
          <MockField label="" value="http://localhost:3000/auth/email-change" tag="2" tone="emerald" />
          <MockField label="" value="http://localhost:3000/auth/recovery" tag="3" tone="emerald" />
        </MockDashboard>
        <CodeBlock language="text" title="Site URL" code="http://localhost:3000" />
        <CodeBlock
          language="text"
          title="Redirect URLs — add each one separately"
          code={"http://localhost:3000/auth/callback\nhttp://localhost:3000/auth/email-change\nhttp://localhost:3000/auth/recovery"}
        />

        <MockDashboard
          app="Supabase"
          appIcon="simple-icons:supabase"
          url="supabase.com/dashboard/project/…/database/extensions"
          crumbs={["your-project", "Database", "Extensions"]}
          nav={supabaseNav(["Database", "Extensions"])}
          caption={
            <>
              <Tag>C</Tag> <strong className={strong}>Database → Extensions</strong>: search <InlineCode>pg_cron</InlineCode> and check it's on. The setup already turned it on; this only checks.
            </>
          }
        >
          <MockField label="Search extensions" value="pg_cron" />
          <MockToggle label="pg_cron" on tone="emerald" note="Job scheduler — clears old sign-in limits nightly" />
        </MockDashboard>

        <Note tone="info">
          <p>Leave the email templates as they are. When you deploy, your live address gets its own Site URL and redirect URLs. The deploy steps walk you through it.</p>
        </Note>
      </>
    ),
  },
  {
    title: "Make it yours",
    who: "you",
    time: "2 min",
    you: "You pick the app's name, description and brand color.",
    details: (
      <>
        <Part title="You answer, one at a time">
          <Ol>
            <li><strong className={strong}>The app's name</strong> and a one-sentence description. They show in the browser tab, the sidebar and search results.</li>
            <li><strong className={strong}>A brand color</strong>: a hex code like <InlineCode>#2f7cf6</InlineCode>, or just "teal". The agent builds the matching shades and picks white or black text for contrast.</li>
            <li><strong className={strong}>An icon</strong> (optional): if you have a <InlineCode>favicon.ico</InlineCode>, tell the agent where it is.</li>
          </Ol>
        </Part>
        <Part title="The agent">
          <p>Updates the app's name, colors and description in the code and in the project's docs. You'll see it in the app at step 11.</p>
        </Part>
      </>
    ),
  },
  {
    title: "Payments (optional)",
    who: "you",
    time: "a yes or no",
    you: "You choose whether to turn on Stripe now.",
    details: (
      <Part title="You decide">
        <p>The default is <strong className={strong}>no</strong>: billing stays switched off and you can turn it on any time later with the <strong className={strong}>Turn on payments</strong> prompt further down this page. If you say yes, the agent walks you through Stripe's test mode now (about 20 minutes) before carrying on.</p>
      </Part>
    ),
  },
  {
    title: "Check everything",
    who: "agent",
    time: "2–5 min",
    details: (
      <Part title="The agent">
        <p>Runs the type check, the linter and the smoke tests (it builds the app and opens each page in a test browser) and fixes anything that fails. Nothing for you to do.</p>
      </Part>
    ),
  },
  {
    title: "Try it",
    who: "you",
    time: "5 min",
    you: "You sign up in the running app and try a password reset.",
    details: (
      <>
        <Part title="The agent">
          <p>Starts the app on your computer at <InlineCode>http://localhost:3000</InlineCode>.</p>
        </Part>
        <Part title="You">
          <Ol>
            <li>Open <a className={link} href="http://localhost:3000" target="_blank" rel="noreferrer">localhost:3000</a> and click <strong className={strong}>Create account</strong>. Use <strong className={strong}>the same email as your Supabase account</strong> and any password of 8+ characters. You land straight on the dashboard.</li>
            <li>Open <strong className={strong}>Components</strong> in the sidebar to browse the UI library.</li>
            <li>Log out (<strong className={strong}>Account → Log out</strong>), click <strong className={strong}>Forgot password?</strong> and enter the same email.</li>
            <li>Open the email's link <strong className={strong}>in the same browser</strong>. It signs you in to the account page, where you set a new password.</li>
          </Ol>
        </Part>
        <Note tone="tip" title="Why your Supabase email?">
          <p>Until you connect real email, Supabase's built-in sender only delivers to members of your Supabase team, and only a couple of emails an hour. No email after a few minutes? Check spam, then wait.</p>
        </Note>
      </>
    ),
  },
  {
    title: "Save the work",
    who: "you",
    time: "1 min",
    you: "You choose whether to commit.",
    details: (
      <>
        <Part title="The agent">
          <p>Asks before saving. If you agree, it makes a commit (a saved snapshot) called "Set up project". Your keys in <InlineCode>.env.local</InlineCode> are never included.</p>
        </Part>
        <Part title="You">
          <Ol>
            <li>Open <strong className={strong}>GitHub Desktop</strong>. The commit shows under <strong className={strong}>History</strong>.</li>
            <li>Click <strong className={strong}>Push origin</strong> to send it to your repository on GitHub.</li>
          </Ol>
        </Part>
      </>
    ),
  },
];
