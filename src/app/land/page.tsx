import type { Metadata } from "next";
import Link from "next/link";

import { FadeIn } from "@/components/animate";
import { LandCard } from "@/components/land-card";
import { buildMetadata, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { sanityClient } from "@/sanity/client";
import { landListingsQuery } from "@/sanity/queries";
import type { LandListingCard } from "@/sanity/types";

export const revalidate = 60;

async function getListings(): Promise<LandListingCard[]> {
  if (!sanityClient) return [];
  try {
    return (await sanityClient.fetch<LandListingCard[]>(landListingsQuery)) ?? [];
  } catch {
    return [];
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const listings = await getListings();
  const meta = await buildMetadata({
    title: "Land for Sale in Central Florida",
    description:
      "Homesites and land for sale around Orlando, Windermere, Winter Garden and Clermont. Build your custom home with Nicole Mickle.",
    path: "/land",
    ogImage: DEFAULT_OG_IMAGE,
  });
  // Don't ask Google to index an empty inventory page.
  return listings.length === 0
    ? { ...meta, robots: { index: false, follow: true } }
    : meta;
}

export default async function LandPage() {
  const listings = await getListings();

  return (
    <section className="pt-32 pb-24 lg:pt-44 lg:pb-32">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <FadeIn>
          <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-6">
            Custom Builds
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.1] tracking-[-0.02em] text-charcoal mb-5 max-w-3xl">
            Land for sale in Central Florida
          </h1>
          <p className="text-[clamp(1.05rem,1.5vw,1.25rem)] text-neutral-500 leading-[1.6] mb-14 max-w-2xl">
            Homesites and acreage for buyers who want to build. Nicole can walk
            you through the lot, the builder options and what it will really
            take to get from dirt to move-in.
          </p>
        </FadeIn>

        {listings.length > 0 ? (
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((l) => (
              <LandCard key={l._id} listing={l} />
            ))}
          </div>
        ) : (
          <div className="border border-neutral-200 bg-[#F4F3EF] p-8 sm:p-12 max-w-2xl">
            <h2 className="font-[family-name:var(--font-playfair)] text-[1.75rem] tracking-[-0.015em] text-charcoal mb-3">
              New lots are added as they come up
            </h2>
            <p className="text-[16px] leading-[1.75] text-neutral-700 mb-7">
              Nothing is listed here at the moment, but land often moves before
              it is advertised. Tell Nicole where and how much you want to
              build and she will watch for it.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-forest px-8 py-4 text-[12px] tracking-[0.2em] uppercase text-white hover:bg-forest-light transition-colors"
            >
              Ask about available land
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
