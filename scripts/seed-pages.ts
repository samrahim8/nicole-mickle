/**
 * Seeds Sanity singleton page documents with the current hardcoded content.
 * Idempotent — uses createOrReplace on fixed document IDs.
 *
 * Run once after migrating a page from hardcoded → Sanity-driven, so Nicole
 * has a populated doc to edit instead of starting from blank fields.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=xxx npx tsx scripts/seed-pages.ts [--only aboutPage]
 */
import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";
import { argv, exit } from "node:process";

import { aboutFallback } from "../src/lib/about-fallback";

loadEnv({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
  exit(1);
}
if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN");
  exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-04-01",
  token,
  useCdn: false,
});

const args = argv.slice(2);
const only = args.includes("--only") ? args[args.indexOf("--only") + 1] : null;

async function seedAboutPage() {
  console.log("→ aboutPage");
  const doc = {
    _id: "aboutPage",
    _type: "aboutPage",
    heroEyebrow: aboutFallback.heroEyebrow,
    heroHeadlineLine1: aboutFallback.heroHeadlineLine1,
    heroHeadlineLine2: aboutFallback.heroHeadlineLine2,
    heroParagraphs: aboutFallback.heroParagraphs,
    // Skip heroImage — Nicole will upload her own portrait in Studio. Page
    // falls back to /images/nicole.jpg until then.
    journeyEyebrow: aboutFallback.journeyEyebrow,
    journeyHeadline: aboutFallback.journeyHeadline,
    milestones: aboutFallback.milestones.map((m, i) => ({
      _key: `milestone-${i}`,
      ...m,
    })),
    credentialsEyebrow: aboutFallback.credentialsEyebrow,
    credentialsHeadline: aboutFallback.credentialsHeadline,
    credentialItems: aboutFallback.credentialItems,
    discretionEyebrow: aboutFallback.discretionEyebrow,
    discretionHeadline: aboutFallback.discretionHeadline,
    discretionParagraphs: aboutFallback.discretionParagraphs,
  };
  await client.createOrReplace(doc);
  console.log("  ✓ wrote aboutPage");
}

const seeders: Record<string, () => Promise<void>> = {
  aboutPage: seedAboutPage,
};

async function main() {
  const keys = only ? [only] : Object.keys(seeders);
  for (const k of keys) {
    const fn = seeders[k];
    if (!fn) {
      console.warn(`Unknown seeder: ${k}`);
      continue;
    }
    await fn();
  }
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  exit(1);
});
