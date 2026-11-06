import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

/*
 * Download links for the tools the guide installs, for the reader's OS.
 * The OS is detected from the browser and can be switched; the choice is
 * remembered in this browser only.
 */

export type Os = "windows" | "mac";

const OS_LABEL: Record<Os, string> = { windows: "Windows", mac: "Mac" };
const STORAGE_KEY = "nst-guide-os";

function detectOs(): Os {
  if (typeof navigator === "undefined") return "windows";
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const platform = `${nav.userAgentData?.platform ?? ""} ${navigator.platform ?? ""} ${navigator.userAgent}`;
  return /mac|iphone|ipad/i.test(platform) ? "mac" : "windows";
}

function initialOs(): Os {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "windows" || saved === "mac") return saved;
  } catch {
    /* storage blocked: fall back to detection */
  }
  return detectOs();
}

// One choice shared by every download on the page (the Tools table and the
// steps are separate sections, so there's no common parent to hold it).
let currentOs: Os | null = null;
const listeners = new Set<() => void>();

function getOs(): Os {
  currentOs ??= initialOs();
  return currentOs;
}

function setOs(next: Os) {
  currentOs = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* not remembered; fine */
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useOs() {
  const os = useSyncExternalStore(subscribe, getOs, () => "windows" as Os);
  return { os, setOs };
}

/** The Windows / Mac switch. */
export function OsSwitch() {
  const { os, setOs } = useOs();
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs text-muted-foreground">Downloads for</span>
      <div role="radiogroup" aria-label="Your computer" className="inline-flex rounded-lg border border-border bg-muted/40 p-0.5">
        {(Object.keys(OS_LABEL) as Os[]).map((value) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={os === value}
            onClick={() => setOs(value)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition",
              os === value ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon icon={value === "mac" ? "simple-icons:apple" : "simple-icons:windows"} className="h-3.5 w-3.5" aria-hidden />
            {OS_LABEL[value]}
          </button>
        ))}
      </div>
    </div>
  );
}

/** A download or sign-up button. `primary` for the one most people want. */
export function LinkButton({
  href,
  children,
  icon = "mdi:download",
  primary,
  small,
}: {
  href: string;
  children: ReactNode;
  icon?: string;
  primary?: boolean;
  small?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border font-medium no-underline transition",
        small ? "px-2 py-1 text-[11px]" : "px-3 py-1.5 text-xs",
        primary
          ? "border-foreground bg-foreground text-background hover:opacity-90"
          : "border-border bg-background text-foreground hover:bg-muted",
      )}
    >
      <Icon icon={icon} className="h-3.5 w-3.5" aria-hidden />
      {children}
    </a>
  );
}

/* ---------------------------------------------------------------------- */
/* Node.js 24: the installer's file name carries the version, so look up   */
/* the newest v24 from nodejs.org (it allows cross-site reads) and keep a  */
/* known-good version for when that fails.                                 */
/* ---------------------------------------------------------------------- */

const NODE_FALLBACK = "v24.22.2";
let nodeVersionPromise: Promise<string> | null = null;

function latestNode24(): Promise<string> {
  nodeVersionPromise ??= fetch("https://nodejs.org/dist/index.json")
    .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
    .then((releases: { version: string }[]) => releases.find((r) => r.version.startsWith("v24."))?.version ?? NODE_FALLBACK)
    .catch(() => NODE_FALLBACK);
  return nodeVersionPromise;
}

function useNode24() {
  const [version, setVersion] = useState(NODE_FALLBACK);
  useEffect(() => {
    let live = true;
    latestNode24().then((v) => live && setVersion(v));
    return () => {
      live = false;
    };
  }, []);
  return version;
}

export function NodeDownload() {
  const { os } = useOs();
  const version = useNode24();
  const base = `https://nodejs.org/dist/${version}/node-${version}`;
  return (
    <span className="flex flex-wrap items-center gap-2">
      {os === "windows" ? (
        <>
          <LinkButton primary href={`${base}-x64.msi`}>Node.js {version.slice(1)} for Windows (.msi)</LinkButton>
          <LinkButton small href={`${base}-arm64.msi`}>ARM PC</LinkButton>
        </>
      ) : (
        <LinkButton primary href={`${base}.pkg`}>Node.js {version.slice(1)} for Mac (.pkg)</LinkButton>
      )}
    </span>
  );
}

const GH_DESKTOP = "https://central.github.com/deployments/desktop/desktop/latest";

export function GitHubDesktopDownload() {
  const { os } = useOs();
  return (
    <span className="flex flex-wrap items-center gap-2">
      {os === "windows" ? (
        <LinkButton primary href={`${GH_DESKTOP}/win32`}>GitHub Desktop for Windows (.exe)</LinkButton>
      ) : (
        <>
          <LinkButton primary href={`${GH_DESKTOP}/darwin-arm64`}>GitHub Desktop for Mac (Apple chip)</LinkButton>
          <LinkButton small href={`${GH_DESKTOP}/darwin`}>Intel Mac</LinkButton>
        </>
      )}
    </span>
  );
}

export function VsCodeDownload({ small }: { small?: boolean }) {
  const { os } = useOs();
  return os === "windows" ? (
    <LinkButton small={small} icon="simple-icons:visualstudiocode" href="https://update.code.visualstudio.com/latest/win32-x64-user/stable">
      VS Code for Windows
    </LinkButton>
  ) : (
    <LinkButton small={small} icon="simple-icons:visualstudiocode" href="https://update.code.visualstudio.com/latest/darwin-universal-dmg/stable">
      VS Code for Mac (.dmg)
    </LinkButton>
  );
}

/** Short OS-specific install notes. */
export function ForOs({ windows, mac }: { windows: ReactNode; mac: ReactNode }) {
  const { os } = useOs();
  return <>{os === "mac" ? mac : windows}</>;
}

/** The big "make my copy" button: GitHub's new-repository page with the template already chosen. */
export function UseTemplateButton({ owner, repo }: { owner: string; repo: string }) {
  return (
    <div className="my-2 flex flex-wrap items-center gap-2">
      <a
        href={`https://github.com/new?template_owner=${owner}&template_name=${repo}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white no-underline shadow-sm transition hover:bg-emerald-700"
      >
        <Icon icon="simple-icons:github" className="h-4 w-4" aria-hidden />
        Use this template
      </a>
      <a
        href={`https://github.com/${owner}/${repo}`}
        target="_blank"
        rel="noreferrer"
        className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
      >
        or view the template on GitHub
      </a>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Open in Claude: Claude Desktop's documented claude://code/new link       */
/* (support.claude.com/en/articles/14729294) starts a Code session with the */
/* prompt filled in and, if given, the folder (Claude asks to confirm it).  */
/* No link opens the browser pane, so the prompt asks the agent to open     */
/* this guide there first; the project's SessionStart hook asks it too.     */
/* ---------------------------------------------------------------------- */

const FOLDER_KEY = "nst-guide-folder";

/** The folder the reader cloned into, shared by every Open in Claude button and remembered in this browser. */
let currentFolder: string | null = null;
const folderListeners = new Set<() => void>();

function getFolder() {
  if (currentFolder === null) {
    try {
      currentFolder = window.localStorage.getItem(FOLDER_KEY) ?? "";
    } catch {
      currentFolder = "";
    }
  }
  return currentFolder;
}

function setFolder(next: string) {
  currentFolder = next;
  try {
    window.localStorage.setItem(FOLDER_KEY, next);
  } catch {
    /* not remembered; fine */
  }
  folderListeners.forEach((listener) => listener());
}

function subscribeFolder(listener: () => void) {
  folderListeners.add(listener);
  return () => folderListeners.delete(listener);
}

export function claudeCodeLink(prompt: string, folder?: string) {
  const params = new URLSearchParams({ q: prompt });
  const path = folder?.trim().replace(/^["']|["']$/g, "");
  if (path) params.set("folder", path);
  // URLSearchParams writes spaces as "+"; the documented examples use %20.
  return `claude://code/new?${params.toString().replace(/\+/g, "%20")}`;
}

/**
 * Where the reader cloned the project, and a button that opens a Claude Code
 * session there with `prompt` ready to send.
 */
export function OpenInClaude({ prompt, compact }: { prompt: string; compact?: boolean }) {
  const { os } = useOs();
  const folder = useSyncExternalStore(subscribeFolder, getFolder, () => "");
  const example = os === "mac" ? "/Users/you/Documents/GitHub/my-app" : "C:\\Users\\you\\Documents\\GitHub\\my-app";
  if (compact) {
    // Just the button, using the folder typed into step 4 (if any).
    return (
      <a
        href={claudeCodeLink(prompt, folder)}
        className="inline-flex items-center gap-2 rounded-lg bg-[#d97757] px-3 py-1.5 text-xs font-semibold text-white no-underline shadow-sm transition hover:opacity-90"
      >
        <Icon icon="simple-icons:claude" className="h-3.5 w-3.5" aria-hidden />
        Open in Claude
      </a>
    );
  }
  return (
    <div className="my-2 space-y-3 rounded-xl border border-border/70 bg-muted/20 p-3">
      <label className="block space-y-1">
        <span className="text-xs font-medium text-foreground">Where you cloned it (optional)</span>
        <input
          value={folder}
          onChange={(event) => setFolder(event.target.value)}
          placeholder={example}
          spellCheck={false}
          className="w-full rounded-md border border-border bg-background px-2 py-1.5 font-mono text-xs text-foreground outline-none focus:ring-2 focus:ring-primary/30"
        />
        <span className="block text-[11px] text-muted-foreground">
          In GitHub Desktop, right-click your repository in the <strong className="text-foreground">Current Repository</strong> list →{" "}
          <strong className="text-foreground">Copy Repo Path</strong>, and paste it here. Leave it empty to choose the folder in Claude instead.
        </span>
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={claudeCodeLink(prompt, folder)}
          className="inline-flex items-center gap-2 rounded-lg bg-[#d97757] px-4 py-2 text-sm font-semibold text-white no-underline shadow-sm transition hover:opacity-90"
        >
          <Icon icon="simple-icons:claude" className="h-4 w-4" aria-hidden />
          Open in Claude
        </a>
        <span className="min-w-0 flex-1 text-[11px] leading-4 text-muted-foreground">
          Opens a new Claude Code session with the setup prompt ready.{" "}
          {folder.trim() ? "Claude asks you to confirm the folder, then " : "Choose the cloned folder when Claude asks, then "}press Enter.
        </span>
      </div>
      <p className="text-[11px] text-muted-foreground">
        Nothing happened? Install the{" "}
        <a className="underline underline-offset-2" href="https://claude.com/download" target="_blank" rel="noreferrer">
          Claude desktop app
        </a>{" "}
        and sign in, then click again. Or start a Code session yourself and paste the prompt from the next step.
      </p>
    </div>
  );
}
