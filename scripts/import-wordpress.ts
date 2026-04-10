/**
 * WordPress → Sanity migration script.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=xxx npx tsx scripts/import-wordpress.ts ./nicolemickle.WordPress.xml
 *
 * Flags:
 *   --dry            Parse + transform but don't write to Sanity
 *   --limit N        Only process the first N posts (useful for smoke testing)
 *   --force          Re-import posts even if a doc with the same legacyWordpressId already exists
 *
 * What it does:
 *   1. Parses the WXR (WordPress eXtended RSS) XML export
 *   2. Filters to published posts (post_type=post, status=publish)
 *   3. For each post:
 *      - Downloads every <img> it references
 *      - Uploads each image to Sanity as an asset (deduped by URL)
 *      - Converts the WordPress HTML body → Sanity Portable Text
 *      - Builds a `post` document with slug, excerpt, publishedAt, categories, author
 *      - Flags probable junk (sold listings, single property listings, social-media tip
 *        posts) as drafts instead of published
 *   4. Writes everything to Sanity in batched transactions
 *   5. Prints a summary report at the end
 */
import { createClient } from "@sanity/client";
import { htmlToBlocks } from "@sanity/block-tools";
import { Schema } from "@sanity/schema";
import { XMLParser } from "fast-xml-parser";
import { JSDOM } from "jsdom";
import { config as loadEnv } from "dotenv";
import { readFileSync } from "node:fs";
import { basename } from "node:path";
import { argv, exit } from "node:process";

loadEnv({ path: ".env.local" });

type Cli = {
  filePath: string;
  dry: boolean;
  limit: number | null;
  force: boolean;
};

function parseCli(): Cli {
  const args = argv.slice(2);
  const positional = args.filter((a) => !a.startsWith("--"));
  if (positional.length === 0) {
    console.error(
      "Usage: npx tsx scripts/import-wordpress.ts <path-to-wxr.xml> [--dry] [--limit N] [--force]",
    );
    exit(1);
  }
  const limitArg = args.find((a) => a.startsWith("--limit"));
  const limit = limitArg
    ? Number.parseInt(limitArg.split("=")[1] ?? args[args.indexOf(limitArg) + 1] ?? "0", 10) || null
    : null;
  return {
    filePath: positional[0],
    dry: args.includes("--dry"),
    limit,
    force: args.includes("--force"),
  };
}

const cli = parseCli();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in environment.");
  exit(1);
}
if (!cli.dry && !token) {
  console.error(
    "Missing SANITY_API_WRITE_TOKEN. Generate an Editor token at https://www.sanity.io/manage",
  );
  exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-04-01",
  token,
  useCdn: false,
});

// ---------------------------------------------------------------------------
// Curation rules
// ---------------------------------------------------------------------------
//
// These patterns identify posts that should be imported as drafts rather than
// published, so Nicole can triage them inside Studio without them showing up
// on the live blog on day one.
const JUNK_TITLE_PATTERNS = [
  /^SOLD:/i,
  /^For Sale:/i,
  /\b\d+\s+[A-Z][a-z]+\s+(St|Ave|Rd|Dr|Ln|Blvd|Way|Ct|Pl|Circle|Crossing)\b/, // single-property listings
  /Instagram\s+Stories\s+for\s+Real\s+Estate/i,
  /How\s+to\s+Get\s+More\s+Seller\s+Leads/i,
  /Social\s+Media\s+Captions/i,
];

function shouldDraft(title: string): boolean {
  return JUNK_TITLE_PATTERNS.some((r) => r.test(title));
}

// ---------------------------------------------------------------------------
// WXR parsing
// ---------------------------------------------------------------------------
type WpItem = {
  title: string;
  link?: string;
  pubDate?: string;
  "dc:creator"?: string;
  "content:encoded"?: string;
  "excerpt:encoded"?: string;
  "wp:post_id"?: number | string;
  "wp:post_date"?: string;
  "wp:post_date_gmt"?: string;
  "wp:post_name"?: string;
  "wp:post_type"?: string;
  "wp:status"?: string;
  category?: Category | Category[];
};

type Category = {
  "#text": string;
  "@_domain"?: string;
  "@_nicename"?: string;
};

type NormalizedPost = {
  wpId: number;
  title: string;
  slug: string;
  excerpt: string;
  html: string;
  publishedAt: string;
  author: string;
  categories: { title: string; slug: string }[];
  link: string;
};

function parseWxr(xml: string): NormalizedPost[] {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    cdataPropName: "__cdata",
    processEntities: true,
    trimValues: true,
  });
  const parsed = parser.parse(xml);
  const channel = parsed?.rss?.channel;
  if (!channel) {
    throw new Error("Could not find <channel> in WXR export.");
  }
  const rawItems: WpItem[] = Array.isArray(channel.item) ? channel.item : [channel.item];

  const posts: NormalizedPost[] = [];
  for (const item of rawItems) {
    if (!item) continue;
    // CDATA-wrapped fields come back as { __cdata: 'post' }, not bare strings,
    // so everything has to go through getText() before comparison.
    if (getText(item["wp:post_type"]) !== "post") continue;
    if (getText(item["wp:status"]) !== "publish") continue;

    const title = decodeEntities(getText(item.title));
    const html = getText(item["content:encoded"]);
    if (!title || !html) continue;

    const excerpt = decodeEntities(getText(item["excerpt:encoded"])).trim();
    const slug = (getText(item["wp:post_name"]) || slugify(title)).toLowerCase();
    const publishedAt = normalizeDate(
      getText(item["wp:post_date_gmt"]) || getText(item["wp:post_date"]) || getText(item.pubDate),
    );
    const author = decodeEntities(getText(item["dc:creator"]) || "Nicole Mickle");
    const rawCats = item.category
      ? Array.isArray(item.category)
        ? item.category
        : [item.category]
      : [];
    const categories = rawCats
      .filter((c) => c["@_domain"] === "category")
      .map((c) => ({
        title: decodeEntities(getText(c)),
        slug: (c["@_nicename"] ?? slugify(getText(c))).toLowerCase(),
      }))
      .filter((c) => c.title && c.slug);

    posts.push({
      wpId: Number(item["wp:post_id"]) || 0,
      title,
      slug,
      excerpt,
      html,
      publishedAt,
      author,
      categories,
      link: getText(item.link),
    });
  }
  return posts;
}

function getText(node: unknown): string {
  if (node == null) return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (typeof node === "object") {
    const obj = node as Record<string, unknown>;
    if (typeof obj.__cdata === "string") return obj.__cdata;
    if (typeof obj["#text"] === "string") return obj["#text"] as string;
  }
  return "";
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "\u2019")
    .replace(/&#8216;/g, "\u2018")
    .replace(/&#8220;/g, "\u201C")
    .replace(/&#8221;/g, "\u201D")
    .replace(/&#8211;/g, "\u2013")
    .replace(/&#8212;/g, "\u2014");
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeDate(raw: string): string {
  if (!raw) return new Date().toISOString();
  // WordPress post_date is "2024-05-10 14:30:00" which is not ISO 8601.
  const iso = raw.includes("T") ? raw : raw.replace(" ", "T") + "Z";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return new Date().toISOString();
  return d.toISOString();
}

// ---------------------------------------------------------------------------
// Image handling
// ---------------------------------------------------------------------------
const imageCache = new Map<string, string>(); // srcUrl -> sanity asset _id

async function uploadImage(src: string): Promise<string | null> {
  if (imageCache.has(src)) return imageCache.get(src)!;
  try {
    const res = await fetch(src);
    if (!res.ok) {
      console.warn(`  ! Failed to fetch image ${src} (${res.status})`);
      return null;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const filename = basename(new URL(src).pathname) || "image";
    if (cli.dry) {
      imageCache.set(src, "dry-asset-id");
      return "dry-asset-id";
    }
    const asset = await client.assets.upload("image", buf, { filename });
    imageCache.set(src, asset._id);
    return asset._id;
  } catch (err) {
    console.warn(`  ! Error uploading ${src}:`, (err as Error).message);
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
    if (assetId) {
      // Marker swapped by htmlToBlocks below via the blockContentType → image resolver
      img.setAttribute("data-sanity-asset", assetId);
    }
  }
  return dom.window.document.body.innerHTML;
}

// ---------------------------------------------------------------------------
// HTML → Portable Text
// ---------------------------------------------------------------------------
// @sanity/block-tools needs a *compiled* Sanity schema, not a plain object,
// so we hand it one assembled via @sanity/schema. Keep this mirrored with
// src/sanity/schemas/blocks/portableText.ts so marks/styles round-trip.
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
          if (!assetId || assetId === "dry-asset-id") return undefined;
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
// Cover image: use the first <img> from the body if WP has no featured image.
// ---------------------------------------------------------------------------
function extractFirstImgSrc(html: string): string | null {
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : null;
}

// ---------------------------------------------------------------------------
// Sanity doc construction
// ---------------------------------------------------------------------------
async function ensureAuthor(name: string): Promise<string> {
  const slug = slugify(name);
  const id = `author-${slug}`;
  if (cli.dry) return id;
  await client.createIfNotExists({
    _id: id,
    _type: "author",
    name,
    slug: { _type: "slug", current: slug },
  });
  return id;
}

async function ensureCategory(title: string, slug: string): Promise<string> {
  const id = `category-${slug}`;
  if (cli.dry) return id;
  await client.createIfNotExists({
    _id: id,
    _type: "category",
    title,
    slug: { _type: "slug", current: slug },
  });
  return id;
}

async function findExistingByWpId(wpId: number): Promise<string | null> {
  if (cli.dry) return null;
  const existing = await client.fetch<{ _id: string } | null>(
    '*[_type == "post" && legacyWordpressId == $wpId][0]{_id}',
    { wpId },
  );
  return existing?._id ?? null;
}

type ImportResult = "created" | "updated" | "skipped" | "failed";

async function importPost(post: NormalizedPost): Promise<ImportResult> {
  const asDraft = shouldDraft(post.title);
  console.log(`${asDraft ? "○" : "●"} ${post.title}`);

  const existingId = await findExistingByWpId(post.wpId);
  if (existingId && !cli.force) {
    console.log("  skipped (already imported, use --force to re-import)");
    return "skipped";
  }

  const htmlWithImages = await replaceImagesInHtml(post.html);
  const body = htmlToPortableText(htmlWithImages);

  let coverImage: unknown = undefined;
  const firstImgSrc = extractFirstImgSrc(post.html);
  if (firstImgSrc) {
    const assetId = await uploadImage(firstImgSrc);
    if (assetId && assetId !== "dry-asset-id") {
      coverImage = {
        _type: "image",
        asset: { _type: "reference", _ref: assetId },
        alt: post.title,
      };
    }
  }

  const authorId = await ensureAuthor(post.author);
  const categoryRefs: { _type: "reference"; _ref: string; _key: string }[] = [];
  for (const c of post.categories) {
    const id = await ensureCategory(c.title, c.slug);
    categoryRefs.push({ _type: "reference", _ref: id, _key: id });
  }

  const docId = existingId ?? `post-${post.wpId}`;
  const doc = {
    _id: cli.force && existingId ? existingId : docId,
    _type: "post",
    title: post.title,
    slug: { _type: "slug", current: post.slug },
    excerpt: post.excerpt || undefined,
    publishedAt: post.publishedAt,
    body,
    coverImage,
    author: { _type: "reference", _ref: authorId },
    categories: categoryRefs,
    legacyWordpressId: post.wpId,
    legacyWordpressUrl: post.link || undefined,
  };

  if (cli.dry) {
    console.log(`  [dry] would ${existingId ? "update" : "create"} ${doc._id} (${asDraft ? "draft" : "published"})`);
    return existingId ? "updated" : "created";
  }

  try {
    // Draft documents live under the `drafts.` id prefix in Sanity.
    const finalId = asDraft ? `drafts.${doc._id}` : doc._id;
    await client.createOrReplace({ ...doc, _id: finalId });
    console.log(`  ${existingId ? "updated" : "created"} ${finalId}`);
    return existingId ? "updated" : "created";
  } catch (err) {
    console.warn("  ! failed:", (err as Error).message);
    return "failed";
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log(`Reading ${cli.filePath}...`);
  const xml = readFileSync(cli.filePath, "utf8");
  const all = parseWxr(xml);
  const posts = cli.limit ? all.slice(0, cli.limit) : all;
  console.log(
    `Found ${all.length} published posts${cli.limit ? ` (processing first ${posts.length})` : ""}.`,
  );
  if (cli.dry) console.log("DRY RUN — no writes will be made.\n");

  const counts: Record<ImportResult, number> = {
    created: 0,
    updated: 0,
    skipped: 0,
    failed: 0,
  };
  let drafted = 0;
  let i = 0;
  for (const post of posts) {
    i++;
    console.log(`[${i}/${posts.length}]`);
    if (shouldDraft(post.title)) drafted++;
    const result = await importPost(post);
    counts[result]++;
  }

  console.log("\n—— Summary ——");
  console.log(`Created:  ${counts.created}`);
  console.log(`Updated:  ${counts.updated}`);
  console.log(`Skipped:  ${counts.skipped}`);
  console.log(`Failed:   ${counts.failed}`);
  console.log(`Drafted:  ${drafted} (curation rules: sold listings, social-media tips)`);
  console.log(`Images uploaded: ${imageCache.size}`);
}

main().catch((err) => {
  console.error(err);
  exit(1);
});
