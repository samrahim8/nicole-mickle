import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { formatAcres, STATUS_LABEL, usd } from "@/components/land-card";
import { buildMetadata } from "@/lib/seo";
import { sanityClient } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { landListingBySlugQuery, landListingSlugsQuery } from "@/sanity/queries";
import type { LandListingDetail } from "@/sanity/types";

export const revalidate = 60;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

async function getListing(slug: string) {
  if (!sanityClient) return null;
  return sanityClient.fetch<LandListingDetail | null>(landListingBySlugQuery, {
    slug,
  });
}

export async function generateStaticParams() {
  if (!sanityClient) return [];
  const slugs = await sanityClient.fetch<string[]>(landListingSlugsQuery);
  return (slugs ?? []).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const l = await getListing(slug);
  if (!l) return {};
  const acres = formatAcres(l.acreage);
  const cover = l.photos?.[0]
    ? urlFor(l.photos[0]).width(1200).height(630).fit("crop").auto("format").url()
    : undefined;
  return buildMetadata({
    title: `${l.title} | ${l.city}, FL`,
    description:
      l.summary?.slice(0, 155) ||
      `${[acres, l.city + ", FL"].filter(Boolean).join(" in ")} land for sale with Nicole Mickle.`,
    path: `/land/${l.slug}`,
    ogImage: cover,
  });
}

export default async function LandDetailPage({ params }: Props) {
  const { slug } = await params;
  const l = await getListing(slug);
  if (!l) notFound();

  const acres = formatAcres(l.acreage);
  const facts = [
    { label: "Status", value: STATUS_LABEL[l.status] },
    { label: "Price", value: l.price ? usd.format(l.price) : null },
    { label: "Size", value: acres },
    { label: "Location", value: [l.community, l.city, l.county && `${l.county} County`].filter(Boolean).join(", ") },
    { label: "Address", value: l.address },
    { label: "Builder", value: l.builderRequirement },
  ].filter((f) => f.value);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: l.title,
    description: l.summary ?? undefined,
    image: (l.photos ?? []).map((p) =>
      urlFor(p).width(1600).fit("max").auto("format").url(),
    ),
    offers: l.price
      ? {
          "@type": "Offer",
          price: l.price,
          priceCurrency: "USD",
          availability:
            l.status === "available"
              ? "https://schema.org/InStock"
              : "https://schema.org/SoldOut",
          seller: { "@id": "https://nicolemickle.com/#business" },
        }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <article className="pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <Link
            href="/land"
            className="text-[12px] tracking-wide text-neutral-400 hover:text-charcoal transition-colors duration-300 mb-8 inline-flex items-center gap-2 py-2"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M13 8H3M7 4l-4 4 4 4" />
            </svg>
            All land
          </Link>

          <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.1] tracking-[-0.02em] text-charcoal mb-10 max-w-4xl">
            {l.title}
          </h1>

          {l.photos && l.photos.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 mb-14">
              {l.photos.map((p, i) => (
                <div
                  key={i}
                  className={`relative bg-neutral-100 overflow-hidden ${
                    i === 0 ? "sm:col-span-2 aspect-[1.91/1]" : "aspect-[1.5/1]"
                  }`}
                >
                  <Image
                    src={urlFor(p).width(i === 0 ? 2000 : 1200).fit("max").auto("format").url()}
                    alt={p.alt || l.title}
                    fill
                    sizes={i === 0 ? "(min-width: 1024px) 80rem, 100vw" : "(min-width: 640px) 50vw, 100vw"}
                    className="object-cover"
                    loading={i === 0 ? "eager" : "lazy"}
                    unoptimized
                  />
                </div>
              ))}
            </div>
          ) : null}

          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div>
              {l.summary ? (
                <p className="text-[17px] leading-[1.75] text-neutral-700 whitespace-pre-line mb-10">
                  {l.summary}
                </p>
              ) : null}
              {l.features && l.features.length > 0 ? (
                <>
                  <h2 className="font-[family-name:var(--font-playfair)] text-[1.5rem] tracking-[-0.015em] text-charcoal mb-4">
                    Highlights
                  </h2>
                  <ul className="grid gap-2 sm:grid-cols-2 text-[16px] text-neutral-700">
                    {l.features.map((f, i) => (
                      <li key={i} className="flex gap-3">
                        <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-forest" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>

            <aside className="self-start border border-neutral-200 bg-[#F4F3EF] p-6 sm:p-8">
              <dl className="space-y-4">
                {facts.map((f) => (
                  <div key={f.label} className="flex justify-between gap-6 text-[15px]">
                    <dt className="text-neutral-500">{f.label}</dt>
                    <dd className="text-charcoal text-right">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/contact"
                className="mt-7 inline-flex w-full items-center justify-center bg-forest px-8 py-4 text-[12px] tracking-[0.2em] uppercase text-white hover:bg-forest-light transition-colors"
              >
                Ask Nicole about this lot
              </Link>
              {l.listingUrl ? (
                <a
                  href={l.listingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex w-full items-center justify-center border border-neutral-300 px-8 py-4 text-[12px] tracking-[0.2em] uppercase text-charcoal hover:border-forest transition-colors"
                >
                  View full listing
                </a>
              ) : null}
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
