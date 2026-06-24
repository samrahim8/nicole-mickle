/**
 * Applies the SEO contractor's "Title too long" rewrites to blog posts by
 * setting each post's `seo.metaTitle` in Sanity. These titles are complete and
 * length-tuned (<=60 chars) and intentionally drop the "| Nicole Mickle Real
 * Estate" brand suffix; the blog route emits `seo.metaTitle` as an absolute
 * title so the suffix is not re-appended.
 *
 * Non-blog URLs (home, neighborhoods, new-construction, relocating-from) are
 * handled in code via src/lib/seo.ts SEO_TITLES, not here.
 *
 * Idempotent: a post whose metaTitle already matches is skipped. Posts whose
 * slug is not found are reported and counted (nothing else is touched).
 *
 * Usage: npx tsx scripts/apply-seo-titles.ts [--dry]
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

// slug -> new SEO meta title (from "Title too long (Indexable) - Nicole Mickle").
const TITLES: Record<string, string> = {
  "florida-real-estate-trends": "Florida Real Estate 2026: 4 Big Shifts to Know",
  "884-klondike-st": "884 Klondike St: Modern Living in Winter Garden",
  "winter-springs-florida": "Discover Winter Springs: Small-Town Florida Charm",
  "902-nicole-drive": "902 Nicole Drive: Comfort Meets Sustainability",
  "multigenerational-homes-in-orlando": "Multigenerational Homes in Orlando: Growing Trend",
  "moving-to-windermere": "Moving to Windermere, FL: Complete Relocation Guide",
  "corporate-executives-relocation": "Executive Relocation to Orlando in 3 Weeks or Less",
  "onx-homes": "ONX Homes: Innovation, Sustainability & Durability",
  "minneola-neighborhood-guide": "Why Minneola, FL Is Central Florida’s Best Secret",
  "monthly-mortgage-payment": "Plan Your Monthly Mortgage Before Buying a Home",
  "orlando-historic-neighborhoods": "Orlando Historic Neighborhoods: Charm & Modern Homes",
  "selling-your-orlando-home": "Selling Your Orlando Home: What It's Like Working With Me",
  "questions-to-ask-your-real-estate-agent-when-selling": "Questions to Ask Your Agent Before Selling Your Home",
  "what-is-for-sale-by-owner": "What Is For Sale By Owner? Selling Your Home Solo",
  "how-i-help-healthcare-professionals-relocate-to-orlando": "Orlando Relocation for Physicians & Healthcare Pros",
  "downsizing-tips": "Ready to Downsize? Guide to Buying a Smaller Home",
  "airbnb-business-in-florida": "Grow Your Florida Airbnb Business: Vacation Rental Tips",
  "blog-topics-for-realtors": "10 Blog Topics for Real Estate Agents to Engage Readers",
  "paint-colors-for-staging": "Best Paint Colors for Home Staging: Expert Color Picks",
  "hurricane-season-orlando": "Prepare Your Orlando Home for Hurricane Season",
  "vacation-home-in-florida": "Buy a Vacation Home in Florida: Tips for Beach Buyers",
  "54-56-bougainvillea-dr": "SOLD: Income Duplex at 54-56 Bougainvillea Dr",
  "first-real-estate-client": "How to Get Your First Client as a Real Estate Agent",
  "seller-leads": "Get More Seller Leads: 13 Strategies for Agents",
  "new-build-or-resale": "New Build or Resale: Which Home Choice Is Right Now?",
  "best-kitchen-staging-tips": "9 Kitchen Staging Tips for a Faster, Easier Home Sale",
  "are-new-construction-homes-negotiable": "Are New Construction Homes Negotiable? What to Know",
  "real-estate-quotes": "100+ Real Estate Quotes for Social Media Captions Now",
  "scott-key-dr-winter-garden": "SOLD: 14633 Scott Key Dr in Winter Garden, FL",
  "celebration-florida": "Celebration, FL Guide: Where to Eat, Play & Stay",
  "sanford-florida": "Sanford, FL Guide to the Friendly Historic City",
  "pinterest-for-real-estate-agents": "Pinterest for Real Estate Agents: 2026 Brand Tips",
  "listing-checklist-for-real-estate-agents": "Listing Checklist for Agents: Steps for Better Sales",
  "clermont-florida": "Clermont, FL Guide: Central Florida’s Hidden Gem",
  "charming-towns-close-to-orlando": "Charming Towns Near Orlando for Central FL Getaways",
  "5-ways-to-add-color-to-your-home-exterior": "5 Exterior Color Ideas That Welcome Home Buyers",
  "custom-home-building-checklist": "Custom Home Building Checklist: Build It Right",
  "moving-to-ocala-florida": "Moving to Ocala, FL: Guide to a Smooth Transition",
  "best-things-to-do-lake-nona": "Lake Nona Guide: Where to Eat, Stay & Play",
  "one-level-homes-vs-two-story-homes": "One-Level vs Two-Story Homes: Pros and Cons",
  "1371-cavender-creek-rd": "For Sale: 1371 Cavender Creek Rd in Minneola, FL",
  "vacant-land-in-florida": "Find Vacant Land Value in Florida: Quick Guide",
  "retirement-communities-central-florida": "Best 55+ Retirement Communities in Central Florida",
  "ways-to-invest-in-florida-real-estate": "5 Smart Florida Real Estate Investment Strategies",
  "nobody-tells-you-moving-to-orlando": "What Zillow Won’t Tell You About Moving to Orlando",
  "moving-to-bonita-springs": "Moving to Bonita Springs, FL: Smooth Transition Tips",
  "tips-to-choose-a-top-notch-realtor": "5 Tips to Choose a Top Realtor for Buying or Selling",
  "milk-district-guide": "Milk District Guide: Where to Eat, Play & Stay",
  "how-to-design-your-kitchen-in-a-few-easy-steps": "How to Design Your Kitchen in a Few Easy Steps",
  "winter-garden-vs-horizon-west": "Winter Garden vs Horizon West: Which Is Right?",
  "property-taxes-on-new-construction": "New Construction Property Taxes: Tips for Owners",
  "pros-and-cons-orlando": "Pros and Cons of Living in Orlando, Florida",
  "new-construction-real-estate-agent": "12 Reasons to Use a Buyer Agent for New Builds",
  "winter-garden-florida": "Winter Garden Guide: Where to Eat, Play & Stay",
  "steps-to-buy-a-house-in-florida": "9 Important Steps to Buying a Home in Florida",
  "mistakes-when-buying-real-estate": "12 Things to Avoid When Trying to Buy a House",
  "beaches-close-to-orlando": "Beaches Close to Orlando: Sun-Soaked Escapes Nearby",
  "real-estate-captions": "350 Real Estate Captions to Boost Your Instagram Game",
  "horizon-west-vs-lake-nona": "Horizon West vs Lake Nona: Where Should You Live?",
  "communities-of-orlando": "Top 15 Communities to Call Home in Orlando, FL",
  "benefits-of-buying-new-construction": "Benefits of Buying New Construction Homes Today",
  "moving-to-florida-from-california": "Moving to Florida From California: Transition Guide",
  "central-florida-lakefront-homes": "Central Florida Lakefront Homes: Waterfront Guide",
  "4-tips-to-sell-your-home-without-a-real-estate-agent-in-record-time": "6 Tips to Sell Your Home Without a Real Estate Agent",
  "223-s-ortman-dr-in-orlando": "Lakefront Lot: 223 S. Ortman Dr in Orlando",
  "new-construction-walkthrough": "New Construction Walkthrough Checklist for Buyers",
  "purchasing-new-construction-home": "New Construction Home Tips for Smart Buyers",
  "bathroom-staging-tips": "8 Bathroom Staging Tips to Boost Home Appeal",
  "things-nobody-tells-you-about-moving-to-florida": "Things Nobody Tells You About Moving to Florida",
  "virtual-home-tours-near-orlando": "Virtual Home Tours: Find the Best Orlando Community",
  "moving-to-lakeland-florida": "Moving to Lakeland, FL: Tips for a Smooth Transition",
  "pay-schedule-for-new-construction": "When Do You Pay for a New Construction Home?",
  "moving-to-st-augustine-florida": "Moving to St. Augustine, FL: Smooth Transition Guide",
  "kitchen-renovations": "Kitchen Renovations That Increase ROI and Value",
  "new-construction": "Steps to Buying a New Construction Home in Florida",
  "luxury-design-ideas": "9 Luxury Design Ideas for New Construction Homes",
  "dr-phillips-neighborhood-guide": "Dr. Phillips Guide: Eat, Drink, Play & Stay",
  "horizon-west-community-guide": "Horizon West: Growing Community for Families & Pros",
  "florida-pros-and-cons": "Pros and Cons of Moving to Florida: Quick Guide",
  "ways-to-add-natural-elements-to-your-home-decor": "How to Add Natural Elements to Your Home Decor",
  "moving-to-orlando": "Relocating to Orlando, FL: Smooth Transition Guide",
  "realtor-for-new-construction": "Using a Realtor for New Construction: Expert Guide",
  "closing-costs-on-new-construction": "Who Pays Closing Costs on New Construction Homes Today?",
  "block-construction-vs-wood-frame": "Block Construction vs Wood Frame: Cost & Durability",
  "your-swimming-pool-design-needs-one-of-these-water-features": "Swimming Pool Water Features Your Home Design Needs",
  "things-to-do-windermere-florida": "Windermere, FL Guide: Where to Eat, Play & Stay",
  "best-flooring-for-new-construction": "Best Flooring for New Construction Homes Today",
  "hamlin-village-winter-garden": "Visit Hamlin Village in Winter Garden’s Horizon West",
  "things-to-do-after-you-purchased-your-new-build": "New Build Purchase Tips: What to Do After Closing",
  "instagram-stories-for-real-estate": "Instagram Stories for Agents: Boost Leads & Engagement",
  "buyer-agent-vs-seller-agent": "Buyer Agent vs Seller Agent: Know the Difference",
  "winter-park-guide": "Winter Park, FL Guide: Eat, Drink, Play & Stay",
  "montverde-guide": "Montverde, FL Guide: Quiet Escape From the City",
  "baldwin-park": "Baldwin Park in Orlando: Vibrant Community Guide",
  "how-to-research-home-builder": "Choosing a Home Builder: Key Things to Look For",
  "moving-to-naples-florida": "Moving to Naples, FL: Tips for a Smooth Transition",
  "new-construction-schedule-inspection": "When to Schedule a New Construction Home Inspection",
  "closing-date-on-new-construction": "Who Sets the Closing Date on New Construction?",
  "lawn-grass-in-florida": "Types of Lawn Grass in Florida for Lush Green Lawns",
  "downtown-orlando": "Downtown Orlando Guide: Your Ultimate Local Experience",
  "cash-offer-in-real-estate": "What Is a Cash Offer? Simplifying Your Home Sale",
  "real-estate-investment-in-florida": "9 Best Places for Real Estate Investment in Florida",
  "best-places-to-buy-a-vacation-home-in-florida": "9 Best Places to Buy a Vacation Home in Florida",
  "5-ways-to-add-custom-to-your-kitchen": "5 Ways to Add a Custom Look to Your Kitchen",
  "orlando-gated-communities": "13 Best Gated Communities in Orlando, Florida",
};

type PostRow = { _id: string; metaTitle: string | null };

async function run() {
  const entries = Object.entries(TITLES);
  let updated = 0;
  let skipped = 0;
  const notFound: string[] = [];

  for (const [slug, title] of entries) {
    const rows = await client.fetch<PostRow[]>(
      `*[_type == "post" && slug.current == $slug]{ _id, "metaTitle": seo.metaTitle }`,
      { slug },
    );
    if (rows.length === 0) {
      notFound.push(slug);
      continue;
    }
    for (const row of rows) {
      if (row.metaTitle === title) {
        skipped++;
        continue;
      }
      if (DRY) {
        console.log(`[dry] ${slug}\n      -> ${title}`);
        updated++;
        continue;
      }
      await client
        .patch(row._id)
        .setIfMissing({ seo: {} })
        .set({ "seo.metaTitle": title })
        .commit();
      console.log(`ok   ${slug}\n      -> ${title}`);
      updated++;
    }
  }

  console.log(
    `\n${DRY ? "[dry] would update" : "updated"}: ${updated} | already-correct: ${skipped} | not found: ${notFound.length}`,
  );
  if (notFound.length) {
    console.log("Slugs with no matching post:");
    for (const s of notFound) console.log(`  - ${s}`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
