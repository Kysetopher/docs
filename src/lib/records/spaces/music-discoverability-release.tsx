import type { ReactNode } from "react";
import type { DocRecord, DocSpace } from "@/lib/records/doc-types";
import type { DocSection } from "@/components/docs/DocumentationPage";

/*
 * World Music — discoverability and release.
 * Source of truth: Production-studio-harness docs/DISTRIBUTION.md, FREE-DISTRIBUTION.md,
 * DSP-ACCESS.md, PUBLISH.md, ACCOUNTS.md. State as of 2026-11-12; update both together.
 */

const spaceId = "music-discoverability-release";
const AS_OF = "12 Nov 2026";

function createDoc(
  id: string,
  cardTitle: string,
  cardDescription: string,
  headerTitle: string,
  headerDescription: string,
  cardIcon: string,
  sections: DocSection[],
): DocRecord {
  return {
    id,
    spaceId,
    href: `/spaces/${spaceId}/${id}`,
    cardTitle,
    cardDescription,
    cardIcon,
    header: { title: headerTitle, description: headerDescription, icon: cardIcon },
    sections,
  };
}

/* ---------------------------------------------------------------------- */
/* Small building blocks                                                   */
/* ---------------------------------------------------------------------- */

type Status = "done" | "live" | "progress" | "blocked" | "waiting" | "dark" | "todo" | "excluded";

const STATUS_STYLE: Record<Status, { label: string; cls: string }> = {
  done: { label: "Done", cls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25" },
  live: { label: "Live", cls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25" },
  progress: { label: "In progress", cls: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/25" },
  blocked: { label: "Blocked", cls: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/25" },
  waiting: { label: "Waiting on reply", cls: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25" },
  dark: { label: "Dark", cls: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/25" },
  todo: { label: "To do", cls: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/25" },
  excluded: { label: "Excluded (AI)", cls: "bg-zinc-500/10 text-zinc-500 border-zinc-500/25 line-through" },
};

function Badge({ status, label }: { status: Status; label?: string }) {
  const s = STATUS_STYLE[status];
  return (
    <span className={`inline-flex whitespace-nowrap items-center rounded-md border px-2 py-0.5 text-[11px] font-medium ${s.cls}`}>
      {label ?? s.label}
    </span>
  );
}

function Prose({ children }: { children: ReactNode }) {
  return <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">{children}</div>;
}

function Strong({ children }: { children: ReactNode }) {
  return <span className="font-semibold text-foreground">{children}</span>;
}

function Callout({ tone = "info", title, children }: { tone?: "info" | "warn"; title: string; children: ReactNode }) {
  const cls =
    tone === "warn"
      ? "border-amber-500/30 bg-amber-500/5"
      : "border-sky-500/30 bg-sky-500/5";
  return (
    <div className={`rounded-xl border p-4 ${cls}`}>
      <p className="mb-1 text-sm font-semibold text-foreground">{title}</p>
      <div className="text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

type Row = { cells: ReactNode[]; status?: Status; statusLabel?: string };

function Table({ head, rows }: { head: string[]; rows: Row[] }) {
  const withStatus = rows.some((r) => r.status);
  return (
    <div className="overflow-x-auto rounded-xl border border-border/70 bg-card">
      <table className="w-full border-collapse text-left text-xs">
        <thead>
          <tr className="border-b border-border/80 bg-muted/40 font-semibold text-foreground">
            {head.map((h) => (
              <th key={h} className="p-3">{h}</th>
            ))}
            {withStatus && <th className="p-3">Status</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/40 text-muted-foreground">
          {rows.map((r, i) => (
            <tr key={i} className="align-top hover:bg-muted/20">
              {r.cells.map((c, j) => (
                <td key={j} className={`p-3 ${j === 0 ? "font-medium text-foreground" : ""}`}>{c}</td>
              ))}
              {withStatus && <td className="p-3">{r.status && <Badge status={r.status} label={r.statusLabel} />}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-4">
      <div className="text-2xl font-semibold text-foreground">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ol>
  );
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

function Link({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="text-primary underline hover:text-primary/80">
      {children}
    </a>
  );
}

/* ====================================================================== */
/* 1. How we're doing it now                                               */
/* ====================================================================== */

const currentStateSections: DocSection[] = [
  {
    id: "snapshot",
    title: "Snapshot",
    summary: `Where World Music stands on ${AS_OF}.`,
    content: (
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat value="134" label="songs in the catalog (Neon Postgres, source of truth)" />
          <Stat value="105" label="released on 3 albums, with ISRCs + UPCs kept for life" />
          <Stat value="30" label="languages, English to Amharic" />
          <Stat value="0" label="stores we deliver to ourselves yet (KKBOX, Qobuz pending)" />
        </div>
        <Callout tone="warn" title="The stores are going dark">
          DistroKid's membership has ended, so Spotify, Apple Music, YouTube Music and the rest are removing the three
          albums store by store (Deezer had removed all three by 22 Oct 2026). The website keeps playing the whole
          catalogue. The plan is to re-deliver from our own system with the <Strong>same ISRCs and UPCs</Strong>, so
          stream history, playlists and links reattach.
        </Callout>
      </div>
    ),
  },
  {
    id: "the-route",
    title: "The route we chose",
    summary: "We are our own delivery service: our system → direct stores → Merlin → each Merlin store.",
    content: (
      <div className="space-y-4">
        <div className="grid gap-2 text-center text-xs sm:grid-cols-4">
          {[
            ["1. Our system", "Catalog DB, DDEX ERN 4.3.2 packages, royalty ledger (built)"],
            ["2. Direct stores", "KKBOX + Qobuz, plus direct uploads: Audius, Audiomack, own YouTube"],
            ["3. Merlin", "Apply once live on direct stores; licence to ~40 stores, 1.5–3 % fee"],
            ["4. Merlin stores", "Spotify, Apple, YouTube Music, Deezer, Meta… one feed at a time"],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl border border-border/60 bg-card p-3">
              <div className="font-semibold text-foreground">{t}</div>
              <div className="mt-1 text-muted-foreground">{d}</div>
            </div>
          ))}
        </div>
        <Bullets
          items={[
            <><Strong>No intermediary.</Strong> No retail distributor (DistroKid, RouteNote), no delivery partner (LabelGrid, limbo/, Revelator), no SoundOn. Decided 22 Oct 2026.</>,
            <><Strong>Accepted trade-off:</Strong> the big stores stay dark until Merlin is done.</>,
            <><Strong>Goal:</Strong> zero cost. Revenue share only where there is no alternative (Merlin).</>,
            <><Strong>DPID</Strong> issued 22 Oct 2026, so our system signs its own DDEX messages.</>,
          ]}
        />
      </div>
    ),
  },
  {
    id: "delivery-status",
    title: "Release status by platform",
    summary: "Who carries the music today and what's happening with each.",
    content: (
      <Table
        head={["Platform", "Today", "Next step"]}
        rows={[
          { cells: ["Spotify", "DistroKid copy, being removed", "Merlin, then Spotify's 5 test deliveries"], status: "dark", statusLabel: "Going dark" },
          { cells: ["Apple Music + Shazam", "DistroKid copy, being removed", "Merlin (direct application closed)"], status: "dark", statusLabel: "Going dark" },
          { cells: ["YouTube Music", "Auto 'Topic' channel, being removed", "Merlin; own channel for videos now"], status: "dark", statusLabel: "Going dark" },
          { cells: ["Deezer", "All 3 albums removed", "Merlin (AI tracks are tagged and demoted)"], status: "dark" },
          { cells: ["Amazon, TIDAL, iHeart, Pandora", "DistroKid copies, being removed", "Merlin coverage unconfirmed for Amazon / TIDAL"], status: "dark" },
          { cells: ["KKBOX", "Label Ingest Platform applied 22 Oct", "Get their spec, test deliveries, go live"], status: "waiting" },
          { cells: ["Qobuz", "Emailed label@qobuz.com 22 Oct", "Follow up; get label account"], status: "waiting" },
          { cells: ["Audius", "Account exists, uploader script built", "Developer app creation fails at Audius's relay; retry"], status: "blocked" },
          { cells: ["Audiomack", "—", "Direct upload (API needs approval)"], status: "todo" },
          { cells: ["Own YouTube channel", "—", "Upload distinct videos from the editor (Data API)"], status: "todo" },
          { cells: ["RouteNote", "Volume One stuck 'under review'", "Removal requested from support; takedown if it goes live"], status: "waiting" },
          { cells: ["worldmusic.kyser.ai", "Plays all 134 songs", "Keep as canonical home"], status: "live" },
        ]}
      />
    ),
  },
  {
    id: "discoverability-status",
    title: "Discoverability status",
    summary: "The metadata and search layer, which keeps working even while stores are dark.",
    content: (
      <Table
        head={["Layer", "What we have"]}
        rows={[
          { cells: ["MusicBrainz", "Artist, 3 releases, 105 recordings, all ISRCs (via MagicISRC)"], status: "done" },
          { cells: ["Wikidata", "Artist Q141682880, 3 albums, 105 song items via QuickStatements"], status: "done", statusLabel: "Done (store IDs pending)" },
          { cells: ["Site structured data", "schema.org MusicRecording, ISRC, language; sameAs → MusicBrainz + Wikidata on artist, albums and all 105 songs"], status: "done" },
          { cells: ["IndexNow", "Key + script; 145 URLs submitted, re-run after each deploy"], status: "done" },
          { cells: ["Google Search Console", "kyser.ai domain verified; sitemap submitted"], status: "done" },
          { cells: ["og:audio + oEmbed", "/oembed and /embed/<slug> live, so links unfurl with a player"], status: "live" },
          { cells: ["Synced lyrics", "Phonetic drafts for 105 songs need Kyser's corrections first"], status: "progress" },
          { cells: ["Artist profile claims", "Spotify / Apple / Deezer / Pandora: after re-delivery"], status: "todo" },
          { cells: ["SoundExchange", "Not registered; fully AI eligibility untested"], status: "todo" },
          { cells: ["Own radio stream", "Not built"], status: "todo" },
        ]}
      />
    ),
  },
  {
    id: "social-status",
    title: "Social publishing status",
    summary: "Promotion runs from the studio's Publish view. Nothing has been posted through it yet.",
    content: (
      <div className="space-y-3">
        <Table
          head={["Channel", "Setup"]}
          rows={[
            { cells: ["Facebook Page", "Connected 6 Oct (Meta app, dev mode)"], status: "done", statusLabel: "Connected" },
            { cells: ["Threads", "Connected 6 Oct, text only (video needs a public URL)"], status: "done", statusLabel: "Connected" },
            { cells: ["Instagram", "Wired; waits on linking @worldmusic.kyser.ai to the Page"], status: "blocked" },
            { cells: ["X", "Wired; needs an X developer app"], status: "todo" },
            { cells: ["Discord", "Ready; needs a server webhook + invite link"], status: "todo" },
            { cells: ["YouTube", "Planned (Data API, owned channel)"], status: "todo" },
            { cells: ["TikTok", "Planned; TikTok sounds wait for a Merlin-member deal"], status: "todo" },
          ]}
        />
        <Prose>
          <p>
            Every post is prepared by an agent (render, captions, AI disclosure) and published only when Kyser presses
            Post.
          </p>
        </Prose>
      </div>
    ),
  },
  {
    id: "blockers",
    title: "What's blocking us",
    summary: "The few items everything else waits on.",
    content: (
      <Steps
        items={[
          <><Strong>KKBOX and Qobuz replies.</Strong> Merlin requires an active delivery setup with content loaded, so the first live direct store unlocks everything.</>,
          <><Strong>RouteNote removal.</Strong> No other distributor may hold our UPCs when we deliver.</>,
          <><Strong>AI eligibility.</Strong> All 134 songs are fully AI. That rules out ASCAP/BMI/MLC, SoundCloud monetization and Beatport, and means Deezer demotes and TIDAL doesn't pay. Merlin's stance is unknown until we apply.</>,
          <><Strong>Audius relay error</Strong> when creating the developer app.</>,
          <><Strong>Instagram ↔ Page link</Strong> for Reels publishing.</>,
        ]}
      />
    ),
  },
];

/* ====================================================================== */
/* 2. Discoverability playbook                                             */
/* ====================================================================== */

const discoverabilitySections: DocSection[] = [
  {
    id: "principle",
    title: "The principle",
    summary: "Be one clearly identified entity everywhere, with the site as the canonical home.",
    content: (
      <Prose>
        <p>
          Search engines, AI assistants, music players and recommendation systems all match on the same handful of
          identifiers: <Strong>ISRC</Strong> (recording), <Strong>UPC</Strong> (release), <Strong>MusicBrainz</Strong>{" "}
          and <Strong>Wikidata</Strong> IDs (entity), and the store IDs. The more places carry the same IDs linked to
          each other, the more confidently World Music is recognised as one artist with one catalogue, and the more
          surfaces it appears on.
        </p>
        <p>
          Order of work: <Strong>own site → open databases → store profiles → lyrics → content channels</Strong>. The
          first two don't depend on any store and are already mostly done.
        </p>
      </Prose>
    ),
  },
  {
    id: "entity-layer",
    title: "1. Entity layer (own site + open databases)",
    summary: "Mostly done. What's left is store IDs and keeping it in sync.",
    content: (
      <Table
        head={["Action", "Why it helps", "How"]}
        rows={[
          { cells: ["schema.org on every song page", "Feeds Google's Knowledge Graph and AI search answers", "MusicRecording with isrcCode, inLanguage, duration, sameAs"], status: "done" },
          { cells: ["sameAs to MusicBrainz + Wikidata", "Ties the site to the open entity graph", "authority-ids.ts in worldmusic-landing"], status: "done" },
          { cells: ["Add store IDs to Wikidata + sameAs", "Lets assistants link straight to the player", "After each store is live: Spotify / Apple / Deezer track IDs"], status: "todo" },
          { cells: ["ListenBrainz", "Open listening data, recommendation input", "Automatic once MusicBrainz is complete; scrobble the site player"], status: "todo" },
          { cells: ["Rate Your Music", "Enthusiast discovery; labels AI rather than banning", "Add artist + 3 albums by hand"], status: "todo" },
          { cells: ["Google Knowledge Panel", "Owned answer box on searches for the artist", "Claim it once a panel appears"], status: "todo" },
        ]}
      />
    ),
  },
  {
    id: "search-indexing",
    title: "2. Search indexing",
    summary: "Get every page indexed fast and keep it fresh.",
    content: (
      <Bullets
        items={[
          <><Strong>IndexNow on every deploy</Strong> that changes pages (<code>node scripts/indexnow.mjs --submit</code> in worldmusic-landing). Covers Bing, Yandex, Seznam, Naver; Bing feeds several AI assistants.</>,
          <><Strong>Bing Webmaster Tools:</Strong> import the Search Console property for crawl reports.</>,
          <><Strong>Search Console:</Strong> watch coverage for the 105 song pages; fix any "Discovered – not indexed".</>,
          <><Strong>One page per song, per language.</Strong> Title, language and album in the title tag; lyrics as heard once corrected. Long-tail searches in 30 languages are the biggest organic opportunity.</>,
          <><Strong>og:audio + oEmbed</Strong> are live, so links shared in chats and posts unfurl with a player. Keep them in every share.</>,
        ]}
      />
    ),
  },
  {
    id: "lyrics",
    title: "3. Lyrics",
    summary: "Synced lyrics show up in players and are heavily searched — but only after Kyser's corrections.",
    content: (
      <div className="space-y-3">
        <Steps
          items={[
            <>Kyser corrects the phonetic drafts (<code>lyrics.kyser.json</code> is ground truth: syllable for syllable, mixed languages, never adding syllables).</>,
            <>Publish synced lyrics to <Strong>LRCLIB</Strong> by API (open; feeds many players).</>,
            <>Add <Strong>Genius</Strong> and <Strong>Musixmatch</Strong> by hand (free tiers). Musixmatch feeds Spotify, Apple and Instagram lyrics.</>,
            <>Put the lyrics on each song page as well.</>,
          ]}
        />
        <Callout title="Don't rush this one">Wrong lyrics spread to every player that pulls them. Only corrected songs go out.</Callout>
      </div>
    ),
  },
  {
    id: "profiles",
    title: "4. Artist profiles on the stores",
    summary: "Claim each one the day the store is live again.",
    content: (
      <Table
        head={["Profile", "What it unlocks"]}
        rows={[
          { cells: ["Spotify for Artists", "Bio, images, editorial playlist pitching (7+ days before release), Canvas loops, analytics"] },
          { cells: ["Apple Music for Artists + Shazam", "Analytics, profile, Shazam data per city"] },
          { cells: ["Amazon Music for Artists", "Analytics, Alexa voice discovery"] },
          { cells: ["Deezer for Creators", "Profile (AI-tagged tracks are kept out of recommendations)"] },
          { cells: ["Pandora AMP", "Artist audio messages, featured track"] },
          { cells: ["YouTube Official Artist Channel", "Merges the Topic channel with ours; needs YouTube Music delivery first"] },
        ]}
      />
    ),
  },
  {
    id: "content-channels",
    title: "5. Content channels that reach new listeners",
    summary: "Free channels that accept disclosed AI music.",
    content: (
      <Table
        head={["Channel", "Why", "Note"]}
        rows={[
          { cells: ["Short-form video (Reels, TikTok, Shorts)", "Biggest discovery driver", "One 9:16 Reel per song, 2–3 a week, strongest songs first"] },
          { cells: ["Own YouTube channel", "Search + recommendations", "Distinct videos only (the 'inauthentic content' rule)"] },
          { cells: ["Audius + Audiomack", "Open platforms, algorithmic feeds", "Audiomack is strong in Africa — fits a world catalogue"] },
          { cells: ["Own 24/7 radio stream", "Listed on Radio Garden, radio-browser, TuneIn", "Plays only our catalogue, so no licences needed"] },
          { cells: ["Pixabay Music", "Huge reach among video creators", "Curated instrumental subset, AI-labelled"] },
          { cells: ["Roblox audio, itch.io, Unity, Fab", "Game developers and players", "AI must be declared"] },
          { cells: ["Internet Archive / Faircamp", "Permanent open mirror with RSS", "Scriptable"] },
          { cells: ["\"Behind the music\" podcast", "Apple Podcasts discovery", "Talk-led with excerpts; Spotify forbids music-only podcasts"] },
        ]}
      />
    ),
  },
  {
    id: "ai-search",
    title: "6. Showing up in AI answers",
    summary: "Assistants answer from the entity graph and from pages that state facts plainly.",
    content: (
      <Bullets
        items={[
          <>Keep an <Strong>about page</Strong> that states the facts in plain sentences: who makes it, how (fully AI, directed and curated by Kyser), how many songs, which languages.</>,
          <>Use the <Strong>same name, same bio, same links</Strong> on every profile. Inconsistency splits the entity.</>,
          <>Earn <Strong>independent mentions</Strong> (press, blogs, playlists). Wikipedia needs independent coverage and is never self-written.</>,
          <>See the <em>AI Discoverability Optimization</em> space for the general GEO method.</>,
        ]}
      />
    ),
  },
  {
    id: "dont",
    title: "What hurts discoverability",
    summary: "Things that get catalogues demoted or banned.",
    content: (
      <Bullets
        items={[
          <><Strong>Bulk drops.</Strong> Spotify's spam filter and YouTube's rules punish mass uploads. Release in batches of distinct items.</>,
          <><Strong>Undisclosed AI.</Strong> Several platforms ban accounts for it. Disclose everywhere it's asked.</>,
          <><Strong>Changing ISRCs.</Strong> Resets stream history and breaks links. Never change or reuse them.</>,
          <><Strong>Two distributors on the same codes.</Strong> Causes duplicates and takedowns.</>,
          <><Strong>Inconsistent metadata</Strong> (stray "(Radio Edit)", double spaces). Fix in the re-delivery.</>,
        ]}
      />
    ),
  },
];

/* ====================================================================== */
/* 3. Release routes by platform                                           */
/* ====================================================================== */

const platformSections: DocSection[] = [
  {
    id: "big-stores",
    title: "The big stores",
    summary: "None has a direct door for a small label. All come through Merlin, delivered by our own system.",
    content: (
      <Table
        head={["Store", "Direct route?", "Our route", "AI policy"]}
        rows={[
          { cells: ["Spotify", "No public route", "Merlin → 5 test deliveries → live", "DDEX AI credits; spam filter"], status: "dark" },
          { cells: ["Apple Music / iTunes / Shazam", "Closed to new applicants", "Merlin", "AI Transparency Tags required"], status: "dark" },
          { cells: ["YouTube Music", "Content Manager for large owners only", "Merlin; own channel for videos now", "Content ID often refused for AI"], status: "dark" },
          { cells: ["Amazon Music", "No public route", "Merlin coverage unconfirmed; direct deal later", "—"], status: "dark" },
          { cells: ["Deezer", "Distributors only", "Merlin", "Tags fully AI, no recommendations"], status: "dark" },
          { cells: ["TIDAL", "Upload tool, no royalties", "Presence only", "Doesn't pay on 100 % AI"], status: "dark" },
          { cells: ["Pandora", "Aggregators only", "Merlin + SoundExchange for radio", "—"], status: "dark" },
          { cells: ["Meta (IG / FB sounds)", "Rights Manager (apply)", "Merlin", "—"], status: "dark" },
        ]}
      />
    ),
  },
  {
    id: "direct-stores",
    title: "Stores we can reach directly",
    summary: "Our system delivers DDEX here first. Being live here is Merlin's entry requirement.",
    content: (
      <Table
        head={["Platform", "Door", "How we deliver"]}
        rows={[
          { cells: ["KKBOX", "Label Ingest Platform", "DDEX feed from ddex.mjs"], status: "waiting" },
          { cells: ["Qobuz", "Label account (label@qobuz.com)", "DDEX feed from ddex.mjs"], status: "waiting" },
          { cells: ["Audius", "Official SDK upload API", "distribution/audius.mjs"], status: "blocked" },
          { cells: ["Audiomack", "Direct upload; API for approved apps", "Upload, then apply for API"], status: "todo" },
          { cells: ["YouTube (own channel)", "Data API", "From the editor; distinct videos"], status: "todo" },
          { cells: ["Anghami, Tencent, Snapchat", "Via Merlin deals", "Our system after Merlin"], status: "dark" },
        ]}
      />
    ),
  },
  {
    id: "not-open",
    title: "Closed or not worth it",
    summary: "Skip these for a fully AI catalogue.",
    content: (
      <Table
        head={["Platform", "Reason"]}
        rows={[
          { cells: ["SoundCloud (monetization)", "Blocks 100 % GenAI"], status: "excluded" },
          { cells: ["Beatport", "Bans majority-AI tracks (Aug 2026)"], status: "excluded" },
          { cells: ["Discogs", "Wholly AI files not eligible"], status: "excluded" },
          { cells: ["Most stock / sync libraries", "Epidemic, Artlist, Pond5, Envato, Jamendo… ban AI (some suspend accounts)"], status: "excluded" },
          { cells: ["Yandex, VK, Zvuk", "Sanctions risk"] },
          { cells: ["Napster", "Shut down Jan 2026"] },
          { cells: ["Korean stores (Melon, FLO, Genie…)", "Need a Korean distributor; only if volume justifies"] },
          { cells: ["TikTok / CapCut", "Waits for a Merlin-member TikTok deal (SoundOn dropped)"] },
        ]}
      />
    ),
  },
  {
    id: "merlin",
    title: "Merlin, step by step",
    summary: "The licence for ~40 stores. We stay the pipe.",
    content: (
      <Steps
        items={[
          <>Be live on at least one direct store with our own DDEX deliveries (KKBOX or Qobuz).</>,
          <>Have the back office working: sales-report import, royalty ledger matched by ISRC/UPC, updates and takedowns as ERN messages. <em>Built; still to add: DDEX DSR parser, FX rates, payment reconciliation.</em></>,
          <>Apply at <Link href="https://merlinnetwork.org/becoming-a-member/">merlinnetwork.org</Link>, disclosing the AI catalogue up front.</>,
          <>Optionally join A2IM to pay 1.5 % instead of 3 % of Merlin-deal revenue. No joining or yearly fee.</>,
          <>Onboard each store's feed: test deliveries, then live, same UPCs / ISRCs.</>,
        ]}
      />
    ),
  },
  {
    id: "registrations",
    title: "Registrations and identifiers",
    summary: "What to hold to release independently.",
    content: (
      <Table
        head={["What", "Cost", "Why"]}
        rows={[
          { cells: ["DDEX DPID", "Free", "Signs every delivery"], status: "done" },
          { cells: ["ISRC registrant code (usisrc.org)", "~$95 once", "Our own codes for the 29 unreleased songs"], status: "todo" },
          { cells: ["GS1 US prefix or single GTINs", "~$750 + $150/yr, or $30 each", "Our own UPCs for new releases"], status: "todo" },
          { cells: ["SoundExchange", "Free", "US digital radio royalties; fully AI untested"], status: "todo" },
          { cells: ["The MLC / ASCAP / BMI", "—", "Not for the current catalogue (fully AI works earn none)"], status: "excluded", statusLabel: "Not eligible" },
        ]}
      />
    ),
  },
];

/* ====================================================================== */
/* 4. Release checklist                                                    */
/* ====================================================================== */

const checklistSections: DocSection[] = [
  {
    id: "before",
    title: "Before release (−4 to −1 weeks)",
    summary: "Metadata, codes, masters, disclosure.",
    content: (
      <Steps
        items={[
          <>Song and release in the catalog DB: title as Kyser spells it, languages, duration, track order.</>,
          <>Codes: ISRC per recording, UPC per release, from <Strong>our own</Strong> prefixes. Never reuse or change.</>,
          <>Credits: label <Strong>World Music</Strong>, ℗ / © <Strong>{"{year}"} Christopher Ryan Kyser</Strong>, genre <Strong>World</Strong>, explicit <Strong>no</Strong>, Kyser as <Strong>Producer only</Strong>.</>,
          <>AI provenance per track: tool, model version, plan / licence, what a human did. DDEX <code>ContainsAI=All</code>.</>,
          <>Masters (WAV) and cover in R2; cover passes store specs.</>,
          <>Build and validate the DDEX package (<code>ddex.mjs package</code>).</>,
        ]}
      />
    ),
  },
  {
    id: "deliver",
    title: "Deliver",
    summary: "Each upload is Kyser's yes.",
    content: (
      <Steps
        items={[
          <>Send to every live store feed (KKBOX, Qobuz, later Merlin stores); record acks with <code>ddex.mjs mark</code>.</>,
          <>Direct uploads: Audius, Audiomack.</>,
          <>Pitch to Spotify editorial at least 7 days ahead (once Spotify is live).</>,
        ]}
      />
    ),
  },
  {
    id: "discoverability",
    title: "Make it findable (release week)",
    summary: "The discoverability pass for every release.",
    content: (
      <Steps
        items={[
          <>Song pages on worldmusic.kyser.ai, with schema.org and store links; deploy.</>,
          <>Run IndexNow.</>,
          <>MusicBrainz release + recordings + ISRCs; Wikidata items; add both to sameAs.</>,
          <>Store IDs into Wikidata and the site as each store goes live.</>,
          <>Corrected lyrics to LRCLIB, Genius, Musixmatch.</>,
        ]}
      />
    ),
  },
  {
    id: "promote",
    title: "Promote (−7 days to +3 weeks)",
    summary: "The social cadence from the Publish view.",
    content: (
      <Table
        head={["When", "What"]}
        rows={[
          { cells: ["−7 days", "≤ 15 s teaser on X, Stories, Discord"] },
          { cells: ["Release day", "Reel to every platform; full 16:9 video to YouTube + Discord; cover + tracklist on Instagram"] },
          { cells: ["+1 to +3 weeks", "One Reel per song, 2–3 a week, strongest first"] },
          { cells: ["Ongoing", "Back-catalogue Reels in rotation"] },
        ]}
      />
    ),
  },
  {
    id: "rules",
    title: "Rules that always apply",
    summary: "Public and hard to undo.",
    content: (
      <Bullets
        items={[
          <>Posting, delivering, taking down, registering or signing up: only Kyser does it, or confirms each one.</>,
          <>Every post says the music and visuals are AI-generated, and turns on the platform's AI label.</>,
          <>Manifesto lines are used verbatim, never paraphrased.</>,
          <>One delivery path per store per master.</>,
        ]}
      />
    ),
  },
];

/* ====================================================================== */
/* Space                                                                   */
/* ====================================================================== */

export const musicDiscoverabilityReleaseSpace: DocSpace = {
  id: spaceId,
  title: "Music Discoverability & Release",
  description:
    "How World Music gets found and gets onto every platform: where we stand today, the discoverability playbook, release routes per store, and the per-release checklist.",
  href: `/spaces/${spaceId}`,
  cardIcon: "mdi:music-circle-outline",
  docs: [
    createDoc(
      "wm-current-state",
      "How We're Doing It Now",
      `Live status board (${AS_OF}): the route, each platform, the discovery layer, social, blockers.`,
      "Current State: Release & Discoverability",
      `Where World Music's catalogue is, how we release it, and what's blocking us, as of ${AS_OF}.`,
      "mdi:clipboard-pulse-outline",
      currentStateSections,
    ),
    createDoc(
      "wm-discoverability-playbook",
      "Discoverability Playbook",
      "Entity layer, search indexing, lyrics, artist profiles, content channels and AI answers — with what's done and what's next.",
      "Improving Discoverability",
      "Every lever that gets World Music found, ordered by what to do first.",
      "mdi:magnify-scan",
      discoverabilitySections,
    ),
    createDoc(
      "wm-release-platforms",
      "Release Routes by Platform",
      "Big stores, direct stores, closed platforms, Merlin and the registrations we need.",
      "Releasing to Each Platform",
      "How each store or platform can be reached by a small, fully AI label that delivers itself.",
      "mdi:transit-connection-variant",
      platformSections,
    ),
    createDoc(
      "wm-release-checklist",
      "Release Checklist",
      "Metadata, codes, delivery, the discoverability pass and the social cadence for every release.",
      "Per-Release Checklist",
      "The steps for every new release, from catalog entry to the last back-catalogue Reel.",
      "mdi:format-list-checks",
      checklistSections,
    ),
  ],
};
