import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/image";
import type { LandListingCard } from "@/sanity/types";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const STATUS_LABEL: Record<LandListingCard["status"], string> = {
  available: "Available",
  pending: "Under contract",
  sold: "Sold",
};

export function formatAcres(acres?: number | null): string | null {
  if (!acres) return null;
  return `${acres.toLocaleString("en-US", { maximumFractionDigits: 2 })} acres`;
}

export function LandCard({ listing }: { listing: LandListingCard }) {
  const src = listing.photos?.asset
    ? urlFor(listing.photos).width(1200).height(760).fit("crop").auto("format").url()
    : null;
  const acres = formatAcres(listing.acreage);

  return (
    <Link href={`/land/${listing.slug}`} className="group block">
      <div className="relative aspect-[1.58/1] bg-neutral-100 overflow-hidden mb-4">
        {src ? (
          <Image
            src={src}
            alt={listing.photos?.alt || listing.title}
            fill
            sizes="(min-width: 1024px) 28rem, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            unoptimized
          />
        ) : null}
        <span
          className={`absolute left-3 top-3 px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase ${
            listing.status === "available"
              ? "bg-forest text-white"
              : "bg-white text-neutral-600"
          }`}
        >
          {STATUS_LABEL[listing.status]}
        </span>
      </div>
      <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 mb-2">
        {[listing.community, listing.city].filter(Boolean).join(", ")}
      </p>
      <h3 className="font-[family-name:var(--font-playfair)] text-[1.3rem] leading-[1.3] text-charcoal group-hover:text-neutral-600 transition-colors">
        {listing.title}
      </h3>
      <p className="mt-2 text-[15px] text-neutral-600">
        {[listing.price ? usd.format(listing.price) : null, acres]
          .filter(Boolean)
          .join("  /  ")}
      </p>
    </Link>
  );
}

export { usd };
