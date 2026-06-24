/**
 * Idempotent: gives the Nicole Mickle author doc a headshot + corrected bio so
 * the blog author box renders with a photo. The author doc had no image and a
 * bio reading "nearly 30 years" (site copy is standardized to "30 years").
 *
 * Usage: npx tsx scripts/set-author-profile.ts [--dry]
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });

const DRY = process.argv.includes("--dry");
const AUTHOR_ID = "author-nicole-mickle";
const HEADSHOT = "public/images/nicole.jpg";
const BIO =
  "Orlando relocation and new construction specialist with 30 years in the industry. B.S. in Economics from Florida A&M University.";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-04-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function main() {
  const author = await client.fetch<{
    _id: string;
    bio?: string;
    image?: { asset?: { _ref?: string } };
  }>(`*[_id == $id][0]{ _id, bio, image }`, { id: AUTHOR_ID });
  if (!author) throw new Error(`Author ${AUTHOR_ID} not found`);

  const hasImage = Boolean(author.image?.asset?._ref);
  console.log(`current bio:   ${JSON.stringify(author.bio)}`);
  console.log(`current image: ${hasImage ? "set" : "MISSING"}`);

  if (DRY) {
    console.log(`\n[dry] would set bio + ${hasImage ? "keep" : "upload"} headshot.`);
    return;
  }

  const patch: Record<string, unknown> = { bio: BIO };

  if (!hasImage) {
    const file = readFileSync(resolve(HEADSHOT));
    const asset = await client.assets.upload("image", file, {
      filename: "nicole-mickle.jpg",
    });
    patch.image = {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      // Hotspot on her face (upper-center of the vertical portrait) so square
      // and portrait crops frame the headshot, not the torso.
      hotspot: { x: 0.42, y: 0.2, height: 0.5, width: 0.6 },
      crop: { top: 0, bottom: 0, left: 0, right: 0 },
    };
    console.log(`uploaded headshot: ${asset._id}`);
  }

  await client.patch(AUTHOR_ID).set(patch).commit();
  console.log(`\nPatched ${AUTHOR_ID} (bio${!hasImage ? " + image" : ""}).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
