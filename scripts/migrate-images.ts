/**
 * Downloads WordPress images and uploads them to Sanity.
 * - Featured images → coverImage on each post
 * - Inline images → replaces [Image: ...] placeholders in body
 *
 * Usage:
 *   npx tsx scripts/migrate-images.ts /path/to/export.xml
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { JSDOM } from "jsdom";
import * as dotenv from "dotenv";
import https from "https";
import http from "http";

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

// ── Download helper ──

function downloadBuffer(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const driver = url.startsWith("https") ? https : http;
    const request = (finalUrl: string) => {
      driver.get(finalUrl, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        // Follow redirects
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          request(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${finalUrl}`));
          return;
        }
        const chunks: Buffer[] = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => resolve(Buffer.concat(chunks)));
        res.on("error", reject);
      }).on("error", reject);
    };
    request(url);
  });
}

async function uploadToSanity(imageUrl: string, filename: string): Promise<string | null> {
  try {
    const buffer = await downloadBuffer(imageUrl);
    const ext = filename.split(".").pop()?.toLowerCase() || "jpg";
    const contentType =
      ext === "png" ? "image/png" :
      ext === "gif" ? "image/gif" :
      ext === "webp" ? "image/webp" :
      "image/jpeg";

    const asset = await client.assets.upload("image", buffer, {
      filename,
      contentType,
    });
    return asset._id;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`    SKIP image: ${msg} (${imageUrl})`);
    return null;
  }
}

// ── XML helpers ──

function cdata(el: Element, tag: string, ns?: string): string {
  const child = ns
    ? el.getElementsByTagNameNS(ns, tag)[0]
    : el.getElementsByTagName(tag)[0];
  return child?.textContent?.trim() || "";
}

// ── Main ──

async function migrate(xmlPath: string) {
  console.log(`Reading ${xmlPath}...`);
  const xml = readFileSync(xmlPath, "utf-8");
  const dom = new JSDOM(xml, { contentType: "text/xml" });
  const doc = dom.window.document;

  const WP_NS = "http://wordpress.org/export/1.2/";
  const CONTENT_NS = "http://purl.org/rss/1.0/modules/content/";

  // Build attachment map: wp:post_id → url
  const attachments = new Map<string, string>();
  const items = Array.from(doc.getElementsByTagName("item"));
  for (const item of items) {
    const postType = cdata(item, "post_type", WP_NS);
    if (postType === "attachment") {
      const id = cdata(item, "post_id", WP_NS);
      const urlEl = item.getElementsByTagNameNS(WP_NS, "attachment_url")[0];
      if (urlEl?.textContent) {
        attachments.set(id, urlEl.textContent.trim());
      }
    }
  }

  // Build map of inline images from post content: wpPostId → [imageUrls]
  const posts = items.filter((item) => {
    const postType = cdata(item, "post_type", WP_NS);
    const status = cdata(item, "status", WP_NS);
    return postType === "post" && status === "publish";
  });

  console.log(`Processing ${posts.length} posts...\n`);

  let featuredCount = 0;
  let inlineCount = 0;

  for (let i = 0; i < posts.length; i++) {
    const item = posts[i];
    const wpId = cdata(item, "post_id", WP_NS);
    const title = cdata(item, "title") || "(Untitled)";
    const sanityId = `wp-${wpId}`;

    console.log(`[${i + 1}/${posts.length}] ${title}`);

    // 1. Featured image
    let thumbUrl: string | null = null;
    for (const meta of Array.from(item.getElementsByTagNameNS(WP_NS, "postmeta"))) {
      const key = meta.getElementsByTagNameNS(WP_NS, "meta_key")[0]?.textContent;
      if (key === "_thumbnail_id") {
        const thumbId = meta.getElementsByTagNameNS(WP_NS, "meta_value")[0]?.textContent;
        if (thumbId) thumbUrl = attachments.get(thumbId) || null;
        break;
      }
    }

    if (thumbUrl) {
      const filename = thumbUrl.split("/").pop() || "cover.jpg";
      console.log(`  Featured: ${filename}`);
      const assetId = await uploadToSanity(thumbUrl, filename);
      if (assetId) {
        await client
          .patch(sanityId)
          .set({
            coverImage: {
              _type: "image",
              asset: { _type: "reference", _ref: assetId },
              alt: title,
            },
          })
          .commit();
        featuredCount++;
      }
    }

    // 2. Inline images -- find [Image: ...] blocks and replace with real image blocks
    const post = await client.fetch(`*[_id == $id][0]{ body }`, { id: sanityId });
    if (!post?.body) continue;

    const content = item.getElementsByTagNameNS(CONTENT_NS, "encoded")[0]?.textContent || "";

    // Extract all image URLs from original HTML
    const htmlDom = new JSDOM(`<div>${content}</div>`);
    const imgEls = Array.from(htmlDom.window.document.querySelectorAll("img"));
    const imgMap = new Map<string, string>(); // alt/src → url
    for (const img of imgEls) {
      const src = img.getAttribute("src");
      const alt = img.getAttribute("alt") || "";
      if (src) {
        imgMap.set(alt || src, src);
        imgMap.set(src, src);
      }
    }

    let updated = false;
    const newBody = [];
    for (const block of post.body) {
      if (
        block._type === "block" &&
        block.children?.length === 1 &&
        block.children[0].text?.startsWith("[Image: ")
      ) {
        const placeholder = block.children[0].text;
        const inner = placeholder.slice(8, -1); // strip [Image: and ]

        // Try to find matching URL
        const imgUrl = imgMap.get(inner) || imgMap.get(inner);
        if (imgUrl) {
          const filename = imgUrl.split("/").pop() || "inline.jpg";
          const assetId = await uploadToSanity(imgUrl, filename);
          if (assetId) {
            newBody.push({
              _type: "image",
              _key: block._key,
              asset: { _type: "reference", _ref: assetId },
              alt: inner.startsWith("http") ? "" : inner,
            });
            updated = true;
            inlineCount++;
            console.log(`  Inline: ${filename}`);
            continue;
          }
        }
      }
      newBody.push(block);
    }

    if (updated) {
      await client.patch(sanityId).set({ body: newBody }).commit();
    }
  }

  console.log(`\nDone. Featured images: ${featuredCount}, Inline images: ${inlineCount}`);
}

const xmlPath = process.argv[2];
if (!xmlPath) {
  console.error("Usage: npx tsx scripts/migrate-images.ts <path-to-xml>");
  process.exit(1);
}

migrate(xmlPath).catch((err) => {
  console.error(err);
  process.exit(1);
});
