/**
 * WordPress XML → Sanity CMS migration for Nicole Mickle blog.
 *
 * Usage:
 *   npx tsx scripts/migrate-wordpress.ts /path/to/export.xml
 *
 * Requires SANITY_API_WRITE_TOKEN in .env.local
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { JSDOM } from "jsdom";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN!;

if (!projectId || !token) {
  console.error("Missing SANITY env vars. Check .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-04-01",
  token,
  useCdn: false,
});

// ── XML parsing helpers ──

function cdata(el: Element | null, tag: string, ns?: string): string {
  if (!el) return "";
  const child = ns
    ? el.getElementsByTagNameNS(ns, tag)[0]
    : el.getElementsByTagName(tag)[0];
  return child?.textContent?.trim() || "";
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/&amp;/g, "and")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

// ── HTML → Portable Text conversion ──

interface PortableTextBlock {
  _type: string;
  _key: string;
  [key: string]: unknown;
}

let keyCounter = 0;
function makeKey(): string {
  return `k${Date.now().toString(36)}${(keyCounter++).toString(36)}`;
}

function htmlToPortableText(html: string): PortableTextBlock[] {
  if (!html) return [];

  // Strip WordPress comments and shortcodes
  const cleaned = html
    .replace(/<!--.*?-->/gs, "")
    .replace(/\[caption[^\]]*\].*?\[\/caption\]/gs, "")
    .replace(/\[.*?\]/g, "");

  const dom = new JSDOM(`<div>${cleaned}</div>`);
  const root = dom.window.document.querySelector("div")!;
  const blocks: PortableTextBlock[] = [];

  function textSpan(text: string, marks: string[] = []) {
    return { _type: "span", _key: makeKey(), text, marks };
  }

  function processInline(node: Node): { _type: string; _key: string; text: string; marks: string[] }[] {
    if (node.nodeType === 3) {
      const text = node.textContent || "";
      if (!text.trim()) return text ? [textSpan(text)] : [];
      return [textSpan(text)];
    }

    if (node.nodeType !== 1) return [];
    const el = node as Element;
    const tag = el.tagName.toLowerCase();

    if (tag === "br") return [textSpan("\n")];

    const childSpans: { _type: string; _key: string; text: string; marks: string[] }[] = [];
    for (const child of Array.from(el.childNodes)) {
      childSpans.push(...processInline(child));
    }

    if (tag === "strong" || tag === "b") {
      return childSpans.map((s) => ({ ...s, marks: [...s.marks, "strong"] }));
    }
    if (tag === "em" || tag === "i") {
      return childSpans.map((s) => ({ ...s, marks: [...s.marks, "em"] }));
    }
    if (tag === "a") {
      // Skip links for simplicity in marks, just keep text
      return childSpans;
    }
    if (tag === "span") {
      return childSpans;
    }

    return childSpans;
  }

  function processNode(node: Node) {
    if (node.nodeType === 3) {
      const text = (node.textContent || "").trim();
      if (text) {
        blocks.push({
          _type: "block",
          _key: makeKey(),
          style: "normal",
          markDefs: [],
          children: [textSpan(text)],
        });
      }
      return;
    }

    if (node.nodeType !== 1) return;
    const el = node as Element;
    const tag = el.tagName.toLowerCase();

    // Headings
    if (/^h[1-6]$/.test(tag)) {
      const level = parseInt(tag[1]);
      const style = level <= 1 ? "h2" : level >= 5 ? "h4" : `h${level}`;
      const spans = processInline(el);
      if (spans.length && spans.some((s) => s.text.trim())) {
        blocks.push({
          _type: "block",
          _key: makeKey(),
          style,
          markDefs: [],
          children: spans.length ? spans : [textSpan("")],
        });
      }
      return;
    }

    // Paragraphs
    if (tag === "p") {
      const spans = processInline(el);
      if (spans.length && spans.some((s) => s.text.trim())) {
        blocks.push({
          _type: "block",
          _key: makeKey(),
          style: "normal",
          markDefs: [],
          children: spans,
        });
      }
      return;
    }

    // Blockquote
    if (tag === "blockquote") {
      for (const child of Array.from(el.childNodes)) {
        if (child.nodeType === 1 && (child as Element).tagName.toLowerCase() === "p") {
          const spans = processInline(child);
          if (spans.length) {
            blocks.push({
              _type: "block",
              _key: makeKey(),
              style: "blockquote",
              markDefs: [],
              children: spans,
            });
          }
        }
      }
      return;
    }

    // Lists
    if (tag === "ul" || tag === "ol") {
      const listItem = tag === "ol" ? "number" : "bullet";
      for (const li of Array.from(el.querySelectorAll("li"))) {
        const spans = processInline(li);
        if (spans.length) {
          blocks.push({
            _type: "block",
            _key: makeKey(),
            style: "normal",
            listItem,
            level: 1,
            markDefs: [],
            children: spans,
          });
        }
      }
      return;
    }

    // Images - create image block with external URL reference
    if (tag === "img") {
      const src = el.getAttribute("src");
      const alt = el.getAttribute("alt") || "";
      if (src) {
        blocks.push({
          _type: "block",
          _key: makeKey(),
          style: "normal",
          markDefs: [],
          children: [textSpan(`[Image: ${alt || src}]`)],
        });
      }
      return;
    }

    // Figure
    if (tag === "figure") {
      const img = el.querySelector("img");
      if (img) {
        processNode(img);
      }
      return;
    }

    // Divs and other containers -- recurse
    for (const child of Array.from(el.childNodes)) {
      processNode(child);
    }
  }

  for (const child of Array.from(root.childNodes)) {
    processNode(child);
  }

  return blocks;
}

// ── Main migration ──

async function migrate(xmlPath: string) {
  console.log(`Reading ${xmlPath}...`);
  const xml = readFileSync(xmlPath, "utf-8");
  const dom = new JSDOM(xml, { contentType: "text/xml" });
  const doc = dom.window.document;

  const WP_NS = "http://wordpress.org/export/1.2/";
  const CONTENT_NS = "http://purl.org/rss/1.0/modules/content/";

  // Step 1: Collect categories
  const items = Array.from(doc.getElementsByTagName("item"));
  const categorySet = new Map<string, string>(); // slug → title

  for (const item of items) {
    const cats = Array.from(item.getElementsByTagName("category"));
    for (const cat of cats) {
      if (cat.getAttribute("domain") === "category") {
        const title = cat.textContent?.trim() || "";
        const slug = cat.getAttribute("nicename") || slugify(title);
        if (title && title !== "Uncategorized") {
          categorySet.set(slug, title);
        }
      }
    }
  }

  console.log(`Found ${categorySet.size} categories`);

  // Create categories in Sanity
  const categoryIdMap = new Map<string, string>(); // slug → sanity _id
  for (const [slug, title] of categorySet) {
    const id = `category-${slug}`;
    await client.createOrReplace({
      _id: id,
      _type: "category",
      title,
      slug: { _type: "slug", current: slug },
    });
    categoryIdMap.set(slug, id);
    console.log(`  Category: ${title}`);
  }

  // Step 2: Create author
  const authorId = "author-nicole-mickle";
  await client.createOrReplace({
    _id: authorId,
    _type: "author",
    name: "Nicole Mickle",
    slug: { _type: "slug", current: "nicole-mickle" },
    role: "Realtor, Olympus Executive Realty",
    bio: "Orlando relocation and new construction specialist with nearly 30 years in the industry. B.S. in Economics from Florida A&M University.",
  });
  console.log("Author created: Nicole Mickle");

  // Step 3: Import posts
  const posts = items.filter((item) => {
    const postType = cdata(item, "post_type", WP_NS);
    const status = cdata(item, "status", WP_NS);
    return postType === "post" && status === "publish";
  });

  console.log(`\nImporting ${posts.length} posts...\n`);
  let imported = 0;
  let skipped = 0;

  for (const item of posts) {
    const wpId = parseInt(cdata(item, "post_id", WP_NS));
    const title = cdata(item, "title") || "(Untitled)";
    const pubDate = cdata(item, "pubDate");
    const content = item.getElementsByTagNameNS(CONTENT_NS, "encoded")[0]?.textContent || "";
    const link = cdata(item, "link");

    // Get post slug from wp:post_name or generate from title
    const wpSlug = cdata(item, "post_name", WP_NS);
    const slug = wpSlug || slugify(title);

    // Get categories
    const cats = Array.from(item.getElementsByTagName("category"))
      .filter((c) => c.getAttribute("domain") === "category")
      .map((c) => {
        const nicename = c.getAttribute("nicename") || slugify(c.textContent?.trim() || "");
        return categoryIdMap.get(nicename);
      })
      .filter(Boolean);

    // Generate excerpt from content
    const plainText = content.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    const excerpt = plainText.slice(0, 255) + (plainText.length > 255 ? "..." : "");

    // Parse date
    let publishedAt: string;
    try {
      publishedAt = new Date(pubDate).toISOString();
    } catch {
      publishedAt = new Date().toISOString();
    }

    // Convert HTML body to Portable Text
    const body = htmlToPortableText(content);

    if (body.length === 0) {
      console.log(`  SKIP (empty): ${title}`);
      skipped++;
      continue;
    }

    const doc = {
      _id: `wp-${wpId}`,
      _type: "post" as const,
      title,
      slug: { _type: "slug" as const, current: slug },
      excerpt,
      body,
      publishedAt,
      featured: false,
      legacyWordpressId: wpId,
      legacyWordpressUrl: link || undefined,
      author: { _type: "reference" as const, _ref: authorId },
      categories: cats.map((id) => ({
        _type: "reference" as const,
        _ref: id!,
        _key: makeKey(),
      })),
    };

    try {
      await client.createOrReplace(doc);
      imported++;
      console.log(`  ${imported}/${posts.length} ${title}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ERROR: ${title} — ${msg}`);
      skipped++;
    }
  }

  console.log(`\nDone. Imported: ${imported}, Skipped: ${skipped}`);
}

// Run
const xmlPath = process.argv[2];
if (!xmlPath) {
  console.error("Usage: npx tsx scripts/migrate-wordpress.ts <path-to-xml>");
  process.exit(1);
}

migrate(xmlPath).catch((err) => {
  console.error(err);
  process.exit(1);
});
