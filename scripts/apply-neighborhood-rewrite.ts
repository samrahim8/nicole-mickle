/**
 * Pushes the July 2026 neighborhood rewrite into Sanity.
 *
 * WHY THIS IS REQUIRED: buildMetadata() gives a CMS `pageSeo` override
 * precedence over the code default. Back in June we seeded a pageSeo doc for all
 * 41 code-driven pages with their then-current titles. So changing SEO_TITLES in
 * code does NOTHING for these pages on its own — the stale seeded title silently
 * wins. Same story for /new-construction, whose hero H1 comes from the
 * newConstructionPage singleton, not the code fallback.
 *
 * Unlike seed-page-seo.ts (createIfNotExists, never clobbers), this script
 * deliberately OVERWRITES metaTitle/metaDescription on the 13 target paths,
 * because replacing those exact values is the point. It touches no other field
 * and no other document.
 *
 * Usage: npx tsx scripts/apply-neighborhood-rewrite.ts [--dry]
 */
import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";

import { neighborhoodPageContent } from "../src/lib/neighborhood-page-content";

loadEnv({ path: ".env.local" });

const DRY = process.argv.includes("--dry");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-04-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const NEW_CONSTRUCTION_TITLE = "New Construction Homes in Orlando, FL | Nicole Mickle";
const NEW_CONSTRUCTION_DESCRIPTION =
  "New construction homes in Orlando, FL with 30-year expert Nicole Mickle. Pick the right builder, negotiate upgrades and incentives, and avoid mistakes.";

type Target = {
  id: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
};

const targets: Target[] = [
  ...Object.entries(neighborhoodPageContent).map(([slug, content]) => ({
    id: `pageSeo-neighborhoods-${slug}`,
    path: `/neighborhoods/${slug}`,
    metaTitle: content.seoTitle,
    metaDescription: content.metaDescription,
  })),
  {
    id: "pageSeo-new-construction",
    path: "/new-construction",
    metaTitle: NEW_CONSTRUCTION_TITLE,
    metaDescription: NEW_CONSTRUCTION_DESCRIPTION,
  },
];

async function main() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    throw new Error("SANITY_API_WRITE_TOKEN is missing from .env.local");
  }

  console.log(
    `${DRY ? "[dry run] " : ""}Applying ${targets.length} page SEO updates\n`,
  );

  for (const t of targets) {
    const existing = await client.getDocument(t.id);
    const before = existing?.metaTitle ?? "(no doc yet)";

    if (before === t.metaTitle) {
      console.log(`  = ${t.path}\n      already "${t.metaTitle}"`);
      continue;
    }

    console.log(`  ~ ${t.path}\n      from "${before}"\n      to   "${t.metaTitle}"`);

    if (DRY) continue;

    await client
      .transaction()
      .createIfNotExists({ _id: t.id, _type: "pageSeo", path: t.path })
      .patch(t.id, (p) =>
        p.set({
          path: t.path,
          metaTitle: t.metaTitle,
          metaDescription: t.metaDescription,
        }),
      )
      .commit();
  }

  // The /new-construction H1 lives on the singleton, so the code fallback alone
  // will not change what renders on prod.
  const ncPage = await client.getDocument("newConstructionPage");
  const currentLine1 = ncPage?.heroHeadlineLine1;
  if (currentLine1 === "New Construction Homes") {
    console.log(`\n  = /new-construction H1 already "New Construction Homes in Orlando"`);
  } else {
    console.log(
      `\n  ~ /new-construction H1\n      from "${currentLine1} ${ncPage?.heroHeadlineLine2 ?? ""}"\n      to   "New Construction Homes in Orlando"`,
    );
    if (!DRY) {
      await client
        .patch("newConstructionPage")
        .set({ heroHeadlineLine1: "New Construction Homes", heroHeadlineLine2: "in Orlando" })
        .commit();
    }
  }

  console.log(`\n${DRY ? "Dry run complete. Re-run without --dry to apply." : "Done."}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
