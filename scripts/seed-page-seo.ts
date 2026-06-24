/**
 * Seeds the `pageSeo` collection with the SEO contractor's current title
 * rewrites for the code-driven pages (home + 17 neighborhood guides + 17
 * new-construction pages + 6 relocating-from pages = 41). This makes every one
 * visible and editable in Studio (Page SEO), which is the self-serve answer to
 * "can you let us manage titles / Open Graph ourselves?".
 *
 * Uses createIfNotExists so re-running NEVER clobbers a later edit made in the
 * Studio. To force-reset a doc to the seed value, delete it in Studio first.
 *
 * Usage: npx tsx scripts/seed-page-seo.ts [--dry]
 */
import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });

const DRY = process.argv.includes("--dry");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-04-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const SEEDS: { id: string; path: string; metaTitle: string }[] = [
  { id: "pageSeo-home", path: "/", metaTitle: "Nicole Mickle | Orlando Relocation & New Construction" },
  { id: "pageSeo-neighborhoods-lake-nona", path: "/neighborhoods/lake-nona", metaTitle: "Lake Nona Guide: Living in Orlando's Top Community" },
  { id: "pageSeo-neighborhoods-windermere", path: "/neighborhoods/windermere", metaTitle: "Windermere Guide: Living Near Orlando's Best Lakes" },
  { id: "pageSeo-neighborhoods-winter-park", path: "/neighborhoods/winter-park", metaTitle: "Winter Park Guide: Living in Orlando’s Classic Suburb" },
  { id: "pageSeo-neighborhoods-dr-phillips", path: "/neighborhoods/dr-phillips", metaTitle: "Dr. Phillips Guide: Living in Orlando’s Restaurant Row" },
  { id: "pageSeo-neighborhoods-horizon-west", path: "/neighborhoods/horizon-west", metaTitle: "Horizon West Guide: Living Near Orlando’s Best Areas" },
  { id: "pageSeo-neighborhoods-celebration", path: "/neighborhoods/celebration", metaTitle: "Celebration Guide: Living in Orlando’s Storybook Town" },
  { id: "pageSeo-neighborhoods-apopka", path: "/neighborhoods/apopka", metaTitle: "Apopka Guide: Living Near Orlando’s Natural Beauty" },
  { id: "pageSeo-new-construction-montverde", path: "/new-construction/montverde", metaTitle: "New Construction in Montverde: Builders & Pricing" },
  { id: "pageSeo-new-construction-apopka", path: "/new-construction/apopka", metaTitle: "New Construction in Apopka: Builders & Pricing" },
  { id: "pageSeo-neighborhoods-ocoee", path: "/neighborhoods/ocoee", metaTitle: "Ocoee Guide: Living Near Orlando’s West Side" },
  { id: "pageSeo-new-construction-windermere", path: "/new-construction/windermere", metaTitle: "New Construction in Windermere: Builders & Pricing" },
  { id: "pageSeo-neighborhoods-winter-garden", path: "/neighborhoods/winter-garden", metaTitle: "Winter Garden Guide: Living Near Orlando’s Best" },
  { id: "pageSeo-neighborhoods-sanford", path: "/neighborhoods/sanford", metaTitle: "Sanford Guide: Living in Orlando’s Historic City" },
  { id: "pageSeo-new-construction-dr-phillips", path: "/new-construction/dr-phillips", metaTitle: "New Construction in Dr. Phillips: Builders & Pricing" },
  { id: "pageSeo-new-construction-oakland", path: "/new-construction/oakland", metaTitle: "New Construction in Oakland: Builders & Communities" },
  { id: "pageSeo-relocating-from-washington-dc", path: "/relocating-from/washington-dc", metaTitle: "Moving to Orlando From Washington, D.C.: Full Guide" },
  { id: "pageSeo-new-construction-lake-nona", path: "/new-construction/lake-nona", metaTitle: "New Construction in Lake Nona: Builders & Communities" },
  { id: "pageSeo-new-construction-horizon-west", path: "/new-construction/horizon-west", metaTitle: "New Construction in Horizon West: Builders & Pricing" },
  { id: "pageSeo-relocating-from-illinois", path: "/relocating-from/illinois", metaTitle: "Moving to Orlando From Illinois: Relocation Guide" },
  { id: "pageSeo-new-construction-ocoee", path: "/new-construction/ocoee", metaTitle: "New Construction in Ocoee: Builders & Pricing" },
  { id: "pageSeo-new-construction-celebration", path: "/new-construction/celebration", metaTitle: "New Construction in Celebration: Builders & Pricing" },
  { id: "pageSeo-new-construction-minneola", path: "/new-construction/minneola", metaTitle: "New Construction in Minneola: Builders & Pricing" },
  { id: "pageSeo-neighborhoods-baldwin-park", path: "/neighborhoods/baldwin-park", metaTitle: "Baldwin Park Guide: Living Near Downtown Orlando" },
  { id: "pageSeo-new-construction-lake-mary", path: "/new-construction/lake-mary", metaTitle: "New Construction in Lake Mary: Builders & Pricing" },
  { id: "pageSeo-neighborhoods-clermont", path: "/neighborhoods/clermont", metaTitle: "Clermont Guide: Living Near Orlando’s Rolling Hills" },
  { id: "pageSeo-relocating-from-new-york", path: "/relocating-from/new-york", metaTitle: "Moving to Orlando From New York: Relocation Guide" },
  { id: "pageSeo-new-construction-baldwin-park", path: "/new-construction/baldwin-park", metaTitle: "New Construction in Baldwin Park: Builders & Pricing" },
  { id: "pageSeo-neighborhoods-groveland", path: "/neighborhoods/groveland", metaTitle: "Groveland Guide: Living Near Orlando’s Quiet Side" },
  { id: "pageSeo-relocating-from-massachusetts", path: "/relocating-from/massachusetts", metaTitle: "Moving to Orlando From Massachusetts: Relocation Guide" },
  { id: "pageSeo-neighborhoods-oakland", path: "/neighborhoods/oakland", metaTitle: "Oakland Guide: Living Near Orlando’s Small-Town Charm" },
  { id: "pageSeo-new-construction-clermont", path: "/new-construction/clermont", metaTitle: "New Construction in Clermont: Builders & Pricing Guide" },
  { id: "pageSeo-new-construction-winter-park", path: "/new-construction/winter-park", metaTitle: "New Construction in Winter Park: Builders & Pricing" },
  { id: "pageSeo-neighborhoods-lake-mary", path: "/neighborhoods/lake-mary", metaTitle: "Lake Mary Guide: Living Near Orlando’s Best Suburbs" },
  { id: "pageSeo-new-construction-sanford", path: "/new-construction/sanford", metaTitle: "New Construction in Sanford: Builders & Pricing Guide" },
  { id: "pageSeo-new-construction-winter-garden", path: "/new-construction/winter-garden", metaTitle: "New Construction in Winter Garden: Builders & Pricing" },
  { id: "pageSeo-new-construction-groveland", path: "/new-construction/groveland", metaTitle: "New Construction in Groveland: Builders & Pricing" },
  { id: "pageSeo-relocating-from-california", path: "/relocating-from/california", metaTitle: "Moving to Orlando From California: Relocation Guide" },
  { id: "pageSeo-relocating-from-georgia", path: "/relocating-from/georgia", metaTitle: "Moving to Orlando From Georgia: Relocation Guide" },
  { id: "pageSeo-neighborhoods-montverde", path: "/neighborhoods/montverde", metaTitle: "Montverde Guide: Living Near Orlando’s Quiet Side" },
  { id: "pageSeo-neighborhoods-minneola", path: "/neighborhoods/minneola", metaTitle: "Minneola Guide: Living Near Orlando’s Growth Hub" },
];

async function run() {
  let created = 0;
  let existing = 0;
  for (const s of SEEDS) {
    if (DRY) {
      console.log(`[dry] ${s.id}  ${s.path}`);
      created++;
      continue;
    }
    const res = await client.createIfNotExists({
      _id: s.id,
      _type: "pageSeo",
      path: s.path,
      metaTitle: s.metaTitle,
    });
    // createIfNotExists returns the existing doc unchanged if it was already
    // there; compare metaTitle to tell created vs left-alone for the report.
    if (res.metaTitle === s.metaTitle && res._createdAt === res._updatedAt) {
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
