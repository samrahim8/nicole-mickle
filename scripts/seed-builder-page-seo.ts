/**
 * Seeds the `pageSeo` collection for the six builder pages (the hub plus Del
 * Webb, Pulte, Toll Brothers, Lennar and Mattamy) so their titles and meta
 * descriptions are visible and editable in Studio → Page SEO, like every other
 * code-driven page.
 *
 * Titles/descriptions are read straight from src/lib/builders.ts so the seed can
 * never drift from what the pages actually render.
 *
 * Uses createIfNotExists, so re-running NEVER clobbers a later Studio edit. To
 * force-reset a doc to the seed value, delete it in Studio first.
 *
 * Usage: npx tsx scripts/seed-builder-page-seo.ts [--dry]
 */
import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";

import { builderPages, buildersHub } from "../src/lib/builders";

loadEnv({ path: ".env.local" });

const DRY = process.argv.includes("--dry");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-04-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const SEEDS = [
  {
    id: "pageSeo-new-construction-builders",
    path: "/new-construction/builders",
    metaTitle: buildersHub.seoTitle,
    metaDescription: buildersHub.metaDescription,
  },
  ...builderPages.map((b) => ({
    id: `pageSeo-new-construction-builders-${b.slug}`,
    path: `/new-construction/builders/${b.slug}`,
    metaTitle: b.seoTitle,
    metaDescription: b.metaDescription,
  })),
];

async function run() {
  let created = 0;
  let existing = 0;
  for (const s of SEEDS) {
    if (DRY) {
      console.log(`[dry] ${s.id}  ${s.path}  ${s.metaTitle.length} chars`);
      created++;
      continue;
    }
    const res = await client.createIfNotExists({
      _id: s.id,
      _type: "pageSeo",
      path: s.path,
      metaTitle: s.metaTitle,
      metaDescription: s.metaDescription,
    });
    if (res._createdAt === res._updatedAt) {
      created++;
      console.log(`new  ${s.path}`);
    } else {
      existing++;
      console.log(`keep ${s.path} (already exists, left untouched)`);
    }
  }
  console.log(
    `\n${DRY ? "[dry] would create" : "created"}: ${created} | left untouched: ${existing} | total: ${SEEDS.length}`,
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
