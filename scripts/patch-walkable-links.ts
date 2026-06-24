/**
 * One-off, idempotent content fix for the "Top 9 Walkable Communities in
 * Orlando" post (wp-36140). The WordPress→Sanity import dropped the link on the
 * neighborhood call-to-action buttons (e.g. "Lake Nona Homes") and "Contact
 * Nicole". This re-adds them as Portable Text link annotations, using the exact
 * IDX URLs from the original post (recovered from Wayback, each verified 200).
 *
 * Re-running is safe: if a target span already carries a link mark it is skipped.
 *
 * Usage: npx tsx scripts/patch-walkable-links.ts [--dry]
 */
import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });

const DRY = process.argv.includes("--dry");
const POST_ID = "wp-36140";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-04-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// Exact button text -> { href, external }. External buttons open in a new tab
// (they leave for the IDX site); the contact link stays in-app.
const LINKS: Record<string, { href: string; external: boolean }> = {
  "Lake Nona Homes": { href: "https://www.iorlandorealestate.com/lake-nona/", external: true },
  "Winter Garden Homes": { href: "https://www.iorlandorealestate.com/winter-garden/", external: true },
  "Horizon West Homes": { href: "https://www.iorlandorealestate.com/horizon-west/", external: true },
  "Winter Park Homes": { href: "https://www.iorlandorealestate.com/winter-park/", external: true },
  "Baldwin Park Homes": { href: "https://www.iorlandorealestate.com/baldwin-park/", external: true },
  "Winter Springs Homes": {
    href: "https://www.iorlandorealestate.com/property-search/results/#latlng_29.797470523792995,27.258908567397015,-79.6739308084239,-83.08446919157609/maplvl_8,28.5383,-81.3792/view_map/",
    external: true,
  },
  "Deland Homes": {
    href: "https://www.iorlandorealestate.com/property-search/results/#sortby_m.Price%20DESC/nearby_false,-1/area_/city_Deland/state_FL/",
    external: true,
  },
  "Celebration Homes": { href: "https://www.iorlandorealestate.com/celebration/", external: true },
  "Downtown Orlando Homes": {
    href: "https://www.iorlandorealestate.com/property-search/results/#latlng_28.565244585380057,28.525579212029385,-81.36107459668838,-81.41436425892513/maplvl_14,28.54541436810235,-81.38771942780676/nearby_false,-1/subdiv_/view_map/",
    external: true,
  },
  "Contact Nicole": { href: "/contact", external: false },
};

function blockText(block: any): string {
  return (block.children ?? []).map((c: any) => c.text).join("").trim();
}

async function main() {
  const doc = await client.fetch<{ _id: string; body: any[] }>(
    `*[_id == $id][0]{ _id, body }`,
    { id: POST_ID }
  );
  if (!doc) throw new Error(`Post ${POST_ID} not found`);

  let changed = 0;
  const newBody = doc.body.map((block) => {
    if (block._type !== "block") return block;
    const text = blockText(block);
    const target = LINKS[text];
    if (!target) return block;

    const alreadyLinked = (block.markDefs ?? []).some(
      (m: any) => m._type === "link"
    );
    if (alreadyLinked) {
      console.log(`  = already linked: "${text}"`);
      return block;
    }

    const markKey = `link-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    const markDef = {
      _type: "link",
      _key: markKey,
      href: target.href,
      openInNewTab: target.external,
    };

    const children = (block.children ?? []).map((c: any) => ({
      ...c,
      marks: [...(c.marks ?? []), markKey],
    }));

    changed++;
    console.log(`  + linked "${text}" -> ${target.href}`);
    return {
      ...block,
      markDefs: [...(block.markDefs ?? []), markDef],
      children,
    };
  });

  // Sanity check: every expected button was found.
  const foundTexts = new Set(
    doc.body.filter((b) => b._type === "block").map((b) => blockText(b))
  );
  for (const label of Object.keys(LINKS)) {
    if (!foundTexts.has(label)) console.warn(`  ! NOT FOUND in body: "${label}"`);
  }

  if (DRY) {
    console.log(`\n[dry] would change ${changed} block(s). No write.`);
    return;
  }
  if (changed === 0) {
    console.log("\nNothing to change.");
    return;
  }
  await client.patch(POST_ID).set({ body: newBody }).commit();
  console.log(`\nPatched ${changed} block(s) on ${POST_ID}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
