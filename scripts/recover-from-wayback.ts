/**
 * Wayback Machine → Sanity recovery for blog posts the original WXR import
 * missed (or that pre-dated the export Sam used in April).
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=xxx npx tsx scripts/recover-from-wayback.ts [--dry] [--force] [--only slug,slug2]
 *
 * For each slug in MISSING_SLUGS:
 *   1. Hit the Wayback CDX API for the most recent 200 OK HTML snapshot
 *   2. Fetch the raw archived HTML (`id_` suffix avoids the Wayback toolbar)
 *   3. Extract title, meta description, published date, og:image, body HTML
 *      (Elementor `theme-post-content` widget on the WP build)
 *   4. Rewrite every <img src> to its Wayback `im_` form so the asset can be
 *      pulled (original nicolemickle.com images are gone — BigScoots WP was
 *      decommissioned at launch)
 *   5. Upload images to Sanity, convert HTML → Portable Text, create the post
 *
 * Idempotent on `legacyWaybackUrl`.
 */
import { createClient } from "@sanity/client";
import { htmlToBlocks } from "@sanity/block-tools";
import { Schema } from "@sanity/schema";
import { JSDOM } from "jsdom";
import { config as loadEnv } from "dotenv";
import { basename } from "node:path";
import { argv, exit } from "node:process";

loadEnv({ path: ".env.local" });

// Slugs that exist in Wayback but not in Sanity. Excludes page-style slugs
// (about-nicole-mickle, contact, work-with-me, etc.) which are handled by
// redirects, not content recovery.
const MISSING_SLUGS = [
  "5-tips-to-choose-a-top-notch-realtor-agent-when-buying-or-selling-your-home",
  "6-design-ideas-to-add-luxury-to-your-new-construction-home",
  "best-day-trips-from-orlando",
  "buy-an-orlando-home",
  "condo-for-sale-in-south-pasadena",
  "dining-details-and-tablescapes",
  "everything-you-need-to-know-about-lake-nona-medical",
  "florida-relocation",
  "home-for-sale-clermont",
  "home-for-sale-deland-florida",
  "home-for-sale-in-horizon-west",
  "instagram-tips",
  "lake-nona-events",
  "new-construction-homes-in-orlando",
  "plant-street-market-downtown-winter-garden-fl",
  "real-estate-marketing-strategy",
  "sell-your-florida-home",
  "sell-your-home",
  "the-powder-room",
  "top-10-summer-activities-for-the-orlando-area-teens",
  "ultimate-outdoor-living-in-windermere-florida",
  "what-you-need-to-know-about-back-to-school-shopping-in-orlando",
];

type Cli = { dry: boolean; force: boolean; only: string[] | null };

function parseCli(): Cli {
  const args = argv.slice(2);
  const onlyArg = args.find((a) => a.startsWith("--only"));
  const only = onlyArg
    ? (onlyArg.includes("=") ? onlyArg.split("=")[1] : args[args.indexOf(onlyArg) + 1])
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : null;
  return { dry: args.includes("--dry"), force: args.includes("--force"), only };
}

const cli = parseCli();
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId) { console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID"); exit(1); }
if (!cli.dry && !token) { console.error("Missing SANITY_API_WRITE_TOKEN"); exit(1); }

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-04-01",
  token,
  useCdn: false,
});

// ---------------------------------------------------------------------------
// Wayback fetch — retries with backoff since web.archive.org regularly
// hands back ECONNRESET / 503 under any load.
// ---------------------------------------------------------------------------
async function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

async function fetchWithRetry(url: string, init?: RequestInit, attempts = 5): Promise<Response> {
  let last: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, { redirect: "follow", ...init });
      if (res.ok) return res;
      if (res.status === 404) return res; // don't retry 404s
      last = new Error(`HTTP ${res.status}`);
    } catch (err) {
      last = err;
    }
    await sleep(800 * (i + 1));
  }
  throw last instanceof Error ? last : new Error(String(last));
}

type Snapshot = { timestamp: string; original: string };

async function findLatestSnapshot(slug: string): Promise<Snapshot | null> {
  const target = `nicolemickle.com/${slug}`;
  const url = `https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(target)}&output=json&filter=statuscode:200&filter=mimetype:text/html&from=2018&to=2026`;
  const res = await fetchWithRetry(url);
  if (!res.ok) return null;
  const rows = (await res.json()) as string[][];
  if (rows.length < 2) return null;
  // Header row first, then snapshots in chronological order.
  const last = rows[rows.length - 1];
  return { timestamp: last[1], original: last[2] };
}

async function fetchRawSnapshot(snap: Snapshot): Promise<string> {
  const url = `https://web.archive.org/web/${snap.timestamp}id_/${snap.original}`;
  const res = await fetchWithRetry(url);
  if (!res.ok) throw new Error(`Wayback returned ${res.status} for ${url}`);
  return await res.text();
}

// ---------------------------------------------------------------------------
// HTML extraction
// ---------------------------------------------------------------------------
type Extracted = {
  title: string;
  excerpt: string;
  publishedAt: string;
  bodyHtml: string;
  coverImageSrc: string | null;
};

function extract(html: string, snapTimestamp: string): Extracted | null {
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // Title — h1 is most reliable; fall back to <title> with brand suffix stripped.
  const h1 = doc.querySelector("h1");
  let title = h1?.textContent?.trim() ?? "";
  if (!title) {
    const t = doc.querySelector("title")?.textContent ?? "";
    title = t.replace(/\s*[-–|]\s*Nicole Mickle.*$/i, "").trim();
  }
  if (!title) return null;

  const excerpt =
    doc.querySelector('meta[name="description"]')?.getAttribute("content")?.trim() ?? "";

  const datePublished =
    doc.querySelector('meta[property="article:published_time"]')?.getAttribute("content") ??
    doc.querySelector("time[datetime]")?.getAttribute("datetime") ??
    matchJsonLdDate(html) ??
    new Date().toISOString();

  const coverImageSrc =
    doc.querySelector('meta[property="og:image"]')?.getAttribute("content") ?? null;

  // Find Elementor theme-post-content widget. Body is its first
  // `.elementor-widget-container` child. Strip nested Elementor chrome.
  let bodyEl: Element | null = null;
  const widget = doc.querySelector('[data-widget_type^="theme-post-content"]');
  if (widget) {
    bodyEl = widget.querySelector(".elementor-widget-container");
  }
  // Fallback: a generic `<article>` or `.entry-content`.
  if (!bodyEl) {
    bodyEl = doc.querySelector("article .entry-content, .entry-content, article");
  }
  if (!bodyEl) return null;

  // Rewrite every img src to Wayback im_ form so we can fetch the asset.
  const imgs = bodyEl.querySelectorAll("img");
  for (const img of Array.from(imgs)) {
    const src = img.getAttribute("src") ?? img.getAttribute("data-src");
    if (!src) continue;
    img.setAttribute("src", waybackImageUrl(src, snapTimestamp));
    // Drop srcset/sizes so the importer doesn't try to fetch the originals.
    img.removeAttribute("srcset");
    img.removeAttribute("sizes");
  }

  // Strip nodes that aren't real content: subscription forms, related-post grids,
  // share buttons, ad blocks. (Elementor sprinkles these inside the post body.)
  bodyEl
    .querySelectorAll(
      'form, .jeg_post_share, .jkit-post-related, .jeg_post_meta, [class*="newsletter"], [class*="subscribe"], script, style, noscript',
    )
    .forEach((n) => n.remove());

  return {
    title,
    excerpt,
    publishedAt: normalizeDate(datePublished),
    bodyHtml: bodyEl.innerHTML,
    coverImageSrc: coverImageSrc ? waybackImageUrl(coverImageSrc, snapTimestamp) : null,
  };
}

function matchJsonLdDate(html: string): string | null {
  const m = html.match(/"datePublished"\s*:\s*"([^"]+)"/);
  return m ? m[1] : null;
}

function waybackImageUrl(src: string, timestamp: string): string {
  // If it's already a wayback URL, leave it alone.
  if (src.includes("web.archive.org/web/")) return src;
  // Wayback's `im_` flag returns the raw archived image bytes, picking the
  // closest snapshot to the given timestamp.
  return `https://web.archive.org/web/${timestamp}im_/${src}`;
}

function normalizeDate(raw: string): string {
  if (!raw) return new Date().toISOString();
  const d = new Date(raw.includes("T") ? raw : raw.replace(" ", "T") + "Z");
  return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ---------------------------------------------------------------------------
// Image upload (shared shape with import-wordpress.ts)
// ---------------------------------------------------------------------------
const imageCache = new Map<string, string>();

async function uploadImage(src: string): Promise<string | null> {
  if (imageCache.has(src)) return imageCache.get(src)!;
  try {
    const res = await fetchWithRetry(src, undefined, 3);
    if (!res.ok) {
      console.warn(`  ! image ${res.status}: ${src}`);
      return null;
    }
    const ct = res.headers.get("content-type") ?? "";
    if (!ct.startsWith("image/")) {
      console.warn(`  ! non-image content-type (${ct}): ${src}`);
      return null;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const filename = basename(new URL(src).pathname.replace(/\/$/, "")) || "image";
    if (cli.dry) {
      imageCache.set(src, "dry-asset-id");
      return "dry-asset-id";
    }
    const asset = await client.assets.upload("image", buf, { filename });
    imageCache.set(src, asset._id);
    return asset._id;
  } catch (err) {
    console.warn(`  ! image error: ${(err as Error).message}`);
    return null;
  }
}

async function replaceImagesInHtml(html: string): Promise<string> {
  const dom = new JSDOM(`<!doctype html><body>${html}</body>`);
  const imgs = Array.from(dom.window.document.querySelectorAll("img"));
  for (const img of imgs) {
    const src = img.getAttribute("src");
    if (!src) continue;
    const assetId = await uploadImage(src);
    if (assetId && assetId !== "dry-asset-id") {
      img.setAttribute("data-sanity-asset", assetId);
    } else {
      img.remove();
    }
  }
  return dom.window.document.body.innerHTML;
}

// ---------------------------------------------------------------------------
// HTML → Portable Text — mirrors import-wordpress.ts
// ---------------------------------------------------------------------------
const compiledSchema = Schema.compile({
  name: "importer",
  types: [
    {
      type: "object",
      name: "post",
      fields: [
        {
          name: "body",
          type: "array",
          of: [
            {
              type: "block",
              styles: [
                { title: "Normal", value: "normal" },
                { title: "H2", value: "h2" },
                { title: "H3", value: "h3" },
                { title: "H4", value: "h4" },
                { title: "Quote", value: "blockquote" },
              ],
              lists: [
                { title: "Bullet", value: "bullet" },
                { title: "Numbered", value: "number" },
              ],
              marks: {
                decorators: [
                  { title: "Strong", value: "strong" },
                  { title: "Emphasis", value: "em" },
                ],
                annotations: [
                  {
                    name: "link",
                    type: "object",
                    fields: [
                      { name: "href", type: "url" },
                      { name: "openInNewTab", type: "boolean" },
                    ],
                  },
                ],
              },
            },
            {
              type: "image",
              fields: [
                { name: "alt", type: "string" },
                { name: "caption", type: "string" },
              ],
            },
          ],
        },
      ],
    },
  ],
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blockContentType = (compiledSchema as any)
  .get("post")
  .fields.find((f: { name: string }) => f.name === "body").type;

function htmlToPortableText(html: string): unknown[] {
  return htmlToBlocks(html, blockContentType, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parseHtml: (text: string) => new JSDOM(text).window.document as any,
    rules: [
      {
        deserialize(el, _next, block) {
          const node = el as HTMLElement;
          if (node.tagName?.toLowerCase() !== "img") return undefined;
          const assetId = node.getAttribute("data-sanity-asset");
          if (!assetId) return undefined;
          return block({
            _type: "image",
            asset: { _type: "reference", _ref: assetId },
            alt: node.getAttribute("alt") ?? "",
          });
        },
      },
    ],
  });
}

// ---------------------------------------------------------------------------
// Sanity write
// ---------------------------------------------------------------------------
async function ensureAuthor(): Promise<string> {
  const id = "author-nicole-mickle";
  if (cli.dry) return id;
  await client.createIfNotExists({
    _id: id,
    _type: "author",
    name: "Nicole Mickle",
    slug: { _type: "slug", current: "nicole-mickle" },
  });
  return id;
}

async function findExistingByWayback(url: string): Promise<string | null> {
  if (cli.dry) return null;
  const existing = await client.fetch<{ _id: string } | null>(
    '*[_type == "post" && legacyWaybackUrl == $url][0]{_id}',
    { url },
  );
  return existing?._id ?? null;
}

async function findExistingBySlug(slug: string): Promise<string | null> {
  if (cli.dry) return null;
  const existing = await client.fetch<{ _id: string } | null>(
    '*[_type == "post" && slug.current == $slug][0]{_id}',
    { slug },
  );
  return existing?._id ?? null;
}

type Result = "created" | "updated" | "skipped" | "failed";

async function recoverSlug(slug: string): Promise<Result> {
  console.log(`\n→ ${slug}`);
  const snap = await findLatestSnapshot(slug);
  if (!snap) {
    console.log("  no Wayback snapshot");
    return "failed";
  }
  console.log(`  snapshot ${snap.timestamp}`);

  // Skip if a post with this slug already exists in Sanity (means a previous
  // run created it, or somebody hand-added it). --force overrides.
  const slugExisting = await findExistingBySlug(slug);
  if (slugExisting && !cli.force) {
    console.log(`  skipped: slug already in Sanity (${slugExisting})`);
    return "skipped";
  }

  let raw: string;
  try {
    raw = await fetchRawSnapshot(snap);
  } catch (err) {
    console.log(`  fetch failed: ${(err as Error).message}`);
    return "failed";
  }

  const ex = extract(raw, snap.timestamp);
  if (!ex) {
    console.log("  could not extract content (no h1/body)");
    return "failed";
  }

  console.log(`  title: ${ex.title}`);
  console.log(`  body: ${ex.bodyHtml.length} chars`);

  // Cover image first so it's deterministic if body upload errors out.
  let coverImage: unknown = undefined;
  if (ex.coverImageSrc) {
    const assetId = await uploadImage(ex.coverImageSrc);
    if (assetId && assetId !== "dry-asset-id") {
      coverImage = {
        _type: "image",
        asset: { _type: "reference", _ref: assetId },
        alt: ex.title,
      };
    }
  }

  const htmlWithAssets = await replaceImagesInHtml(ex.bodyHtml);
  const body = htmlToPortableText(htmlWithAssets);

  const authorId = await ensureAuthor();
  const legacyWaybackUrl = `https://nicolemickle.com/${slug}/`;
  const existingId = await findExistingByWayback(legacyWaybackUrl);
  const docId = existingId ?? `post-wayback-${slugify(slug)}`;

  const doc = {
    _id: docId,
    _type: "post",
    title: ex.title,
    slug: { _type: "slug", current: slug },
    excerpt: ex.excerpt || undefined,
    publishedAt: ex.publishedAt,
    body,
    coverImage,
    author: { _type: "reference", _ref: authorId },
    legacyWaybackUrl,
    legacyWaybackTimestamp: snap.timestamp,
  };

  if (cli.dry) {
    console.log(`  [dry] would ${existingId ? "update" : "create"} ${docId}`);
    return existingId ? "updated" : "created";
  }

  try {
    await client.createOrReplace(doc);
    console.log(`  ${existingId ? "updated" : "created"} ${docId}`);
    return existingId ? "updated" : "created";
  } catch (err) {
    console.warn(`  ! write failed: ${(err as Error).message}`);
    return "failed";
  }
}

async function main() {
  const slugs = cli.only ?? MISSING_SLUGS;
  console.log(`Recovering ${slugs.length} slug(s)${cli.dry ? " (DRY)" : ""}`);
  const counts: Record<Result, number> = { created: 0, updated: 0, skipped: 0, failed: 0 };
  const failed: string[] = [];
  for (const slug of slugs) {
    let r: Result;
    try {
      r = await recoverSlug(slug);
    } catch (err) {
      console.warn(`  ! uncaught: ${(err as Error).message}`);
      r = "failed";
    }
    counts[r]++;
    if (r === "failed") failed.push(slug);
    // Gentle pacing — Wayback rate-limits aggressively otherwise.
    await sleep(500);
  }
  console.log("\n—— Summary ——");
  console.log(counts);
  if (failed.length) {
    console.log("Failed slugs:", failed.join(", "));
  }
  console.log(`Images uploaded: ${imageCache.size}`);
}

main().catch((err) => {
  console.error(err);
  exit(1);
});
