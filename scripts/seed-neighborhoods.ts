/**
 * Seeds one Sanity "Neighborhood Guide" document per neighborhood with the
 * live copy from src/lib/neighborhoods.ts + neighborhood-page-content.ts, and
 * uploads each guide's photos from /public so Studio shows the real images.
 *
 * Safe to re-run: by default it only creates guides that don't exist yet, so
 * it never overwrites edits made in Studio. --force replaces them all with the
 * code copy.
 *
 * Usage:
 *   npx tsx scripts/seed-neighborhoods.ts [--dry] [--force] [--only <slug>]
 */
import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";
import { createReadStream, existsSync } from "node:fs";
import { basename, join } from "node:path";
import { argv, exit } from "node:process";

import { neighborhoods } from "../src/lib/neighborhoods";
import { neighborhoodPageContent } from "../src/lib/neighborhood-page-content";

loadEnv({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN");
  exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2025-04-01", token, useCdn: false });

const args = argv.slice(2);
const dry = args.includes("--dry");
const force = args.includes("--force");
const only = args.includes("--only") ? args[args.indexOf("--only") + 1] : null;

const key = (prefix: string, i: number) => `${prefix}${i}`;

async function uploadImage(publicPath: string | undefined) {
  if (!publicPath || publicPath === "placeholder") return undefined;
  const file = join("public", publicPath);
  if (!existsSync(file)) {
    console.warn(`  ! missing ${file}, skipped`);
    return undefined;
  }
  if (dry) return { _type: "reference", _ref: "dry-run" };
  const asset = await client.assets.upload("image", createReadStream(file), {
    filename: basename(file),
  });
  return { _type: "reference", _ref: asset._id };
}

async function main() {
  const targets = neighborhoods.filter((n) => !only || n.slug === only);
  for (const n of targets) {
    const _id = `neighborhood-${n.slug}`;
    if (!force) {
      const existing = await client.getDocument(_id);
      if (existing) {
        console.log(`= ${n.slug} exists, skipped (use --force to replace)`);
        continue;
      }
    }
    console.log(`→ ${n.slug}`);
    const c = neighborhoodPageContent[n.slug];

    const hero = await uploadImage(n.image);
    const gallery = [];
    for (const [i, g] of (n.gallery ?? []).entries()) {
      const ref = await uploadImage(g.src);
      if (ref) gallery.push({ _type: "image", _key: key("g", i), asset: ref, alt: g.alt });
    }

    const doc = {
      _id,
      _type: "neighborhoodPage",
      slug: n.slug,
      name: n.name,
      tagline: n.tagline,
      description: n.description,
      priceRange: n.priceRange,
      searchUrl: n.searchUrl,
      lifestyleTags: n.lifestyleTags,
      highlights: n.highlights,
      lifestyle: n.lifestyle,
      bestFor: n.bestFor,
      notIdealFor: n.notIdealFor,
      commute: n.commute,
      priceSegments: n.priceSegments.map((p, i) => ({ _key: key("p", i), ...p })),
      newConstruction: n.newConstruction,
      schools: n.schools,
      dining: n.dining,
      localTips: n.localTips,
      h1Lead: c?.h1Lead,
      h1Display: c?.h1Display,
      intro: c?.intro,
      faq: c?.faq.map((f, i) => ({ _key: key("f", i), ...f })),
      relatedLinks: c?.relatedLinks.map((l, i) => ({ _key: key("r", i), ...l })),
      heroImage: hero ? { _type: "image", asset: hero } : undefined,
      gallery: gallery.length ? gallery : undefined,
    };

    if (dry) {
      console.log(`  (dry) would write ${_id} with ${Object.keys(doc).length} fields, hero=${Boolean(hero)}, gallery=${gallery.length}`);
      continue;
    }
    await client.createOrReplace(doc);
  }
  console.log("done");
}

main().catch((err) => {
  console.error(err);
  exit(1);
});
