/**
 * Sweep every Sanity post's Portable Text body for `link` marks whose href
 * points at the old WordPress root URLs (`https://nicolemickle.com/<slug>` or
 * `/<slug>`) and rewrite them to the canonical `/blog/<slug>` form.
 *
 * Also reports any href that points at a slug that doesn't exist in Sanity
 * (so we can decide between fixing manually or removing).
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=xxx npx tsx scripts/rewrite-internal-links.ts [--dry]
 */
import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";
import { argv, exit } from "node:process";

loadEnv({ path: ".env.local" });

const dry = argv.includes("--dry");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId) { console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID"); exit(1); }
if (!dry && !token) { console.error("Missing SANITY_API_WRITE_TOKEN"); exit(1); }

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-04-01",
  token,
  useCdn: false,
});

// Page-style legacy URLs that should hop to specific new-site routes instead
// of /blog/<slug>. Mirrors the redirect map in src/lib/legacy-redirects.ts.
const PAGE_OVERRIDES: Record<string, string> = {
  "about-nicole-mickle": "/about",
  "work-with-me": "/about",
  "privacy-policy": "/privacy",
  "terms-and-conditions": "/terms",
  "orlando-quiz": "/quiz",
  "florida-relocation": "/relocating",
  "new-construction-homes-in-orlando": "/new-construction",
  "buy-an-orlando-home": "/relocating",
  "sell-your-florida-home": "/blog/sell-your-home",
  "instagram-tips": "/blog",
  news: "/blog",
  deals: "/blog",
  contact: "/contact",
  about: "/about",
  blog: "/blog",
};

type Post = { _id: string; _rev: string; slug?: { current?: string }; body?: unknown[] };

async function main() {
  console.log("Fetching all posts...");
  const posts: Post[] = await client.fetch('*[_type=="post"]{_id,_rev,slug,body}');
  console.log(`Got ${posts.length} posts.`);
  const allSlugs = new Set(posts.map((p) => p.slug?.current).filter(Boolean) as string[]);

  type Fix = { postId: string; rev: string; newBody: unknown[]; changes: number };
  type Missing = { postId: string; slugPath: string };
  const fixes: Fix[] = [];
  const missing: Missing[] = [];

  for (const post of posts) {
    if (!post.body) continue;
    let changed = 0;
    const newBody = JSON.parse(JSON.stringify(post.body)) as unknown[];

    walkPortableText(newBody, (mark) => {
      if (mark._type !== "link" || typeof mark.href !== "string") return;
      const rewritten = rewriteHref(mark.href, allSlugs);
      if (rewritten === null) {
        const slugPath = extractSlug(mark.href);
        if (slugPath) missing.push({ postId: post._id, slugPath });
        return;
      }
      if (rewritten !== mark.href) {
        mark.href = rewritten;
        changed++;
      }
    });

    if (changed > 0) {
      fixes.push({ postId: post._id, rev: post._rev, newBody, changes: changed });
    }
  }

  console.log(`\nPosts needing href rewrites: ${fixes.length}`);
  console.log(`Total href changes: ${fixes.reduce((s, f) => s + f.changes, 0)}`);
  console.log(`Missing-slug hrefs (point at nothing in Sanity): ${missing.length}`);
  if (missing.length) {
    const grouped: Record<string, string[]> = {};
    for (const m of missing) (grouped[m.slugPath] ??= []).push(m.postId);
    console.log("\nMissing slug references:");
    for (const [slug, ids] of Object.entries(grouped).sort()) {
      console.log(`  /${slug} — referenced in ${ids.length} post(s)`);
    }
  }

  if (dry) {
    console.log("\nDRY RUN — no writes.");
    return;
  }

  for (const f of fixes) {
    try {
      await client.patch(f.postId).set({ body: f.newBody }).commit();
      console.log(`  patched ${f.postId} (${f.changes} hrefs)`);
    } catch (err) {
      console.warn(`  ! failed ${f.postId}: ${(err as Error).message}`);
    }
  }
}

function rewriteHref(href: string, allSlugs: Set<string>): string | null {
  // Match absolute nicolemickle.com URLs or root-relative paths.
  const m = href.match(/^(?:https?:\/\/(?:www\.)?nicolemickle\.com)?(\/[^?#]*)?([?#].*)?$/i);
  if (!m) return href; // external link — leave alone
  let path = m[1] ?? "/";
  const tail = m[2] ?? "";

  // Strip trailing slash for matching, normalize.
  path = path.replace(/\/$/, "") || "/";
  if (path === "/" || path === "") return href.startsWith("http") ? "/" + tail : href;

  // Already canonical: /blog/<slug> or any other path the new site owns.
  if (path.startsWith("/blog/") || path.startsWith("/neighborhoods/") || path.startsWith("/relocating-from/")) {
    return href.startsWith("http") ? path + tail : href;
  }

  const seg = path.replace(/^\//, "").split("/")[0];

  // Page overrides
  if (seg in PAGE_OVERRIDES) {
    return PAGE_OVERRIDES[seg] + tail;
  }

  // Bare top-level slug that matches an existing Sanity post → /blog/<slug>
  if (path.split("/").length === 2 && allSlugs.has(seg)) {
    return `/blog/${seg}${tail}`;
  }

  // Unknown — flag as missing.
  return null;
}

function extractSlug(href: string): string | null {
  const m = href.match(/^(?:https?:\/\/(?:www\.)?nicolemickle\.com)?\/([^/?#]+)\/?$/i);
  return m ? m[1] : null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function walkPortableText(body: any, onMark: (markDef: any) => void) {
  if (!Array.isArray(body)) return;
  for (const block of body) {
    if (Array.isArray(block?.markDefs)) {
      for (const md of block.markDefs) onMark(md);
    }
  }
}

main().catch((err) => { console.error(err); exit(1); });
