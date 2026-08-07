import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { neighborhoods } from "@/lib/neighborhoods";
import { NeighborhoodDetailClient } from "@/components/neighborhood-detail-client";
import { buildMetadata } from "@/lib/seo";
import { neighborhoodPageContent } from "@/lib/neighborhood-page-content";
import { buildFaqSchema } from "@/components/faq-accordion";

// These pages read a CMS `pageSeo` override for their title/description. Without
// a revalidate window they are baked at build time only, so a Studio edit would
// never reach production without a redeploy — which defeats the self-serve SEO
// layer. 60s matches every other CMS-backed route.
export const revalidate = 60;

export function generateStaticParams() {
  return neighborhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const n = neighborhoods.find((nb) => nb.slug === slug);
  if (!n) return {};
  const content = neighborhoodPageContent[n.slug];
  return buildMetadata({
    title:
      content?.seoTitle ??
      `${n.name} Neighborhood Guide - Living in ${n.name}, Orlando`,
    description:
      content?.metaDescription ??
      `Everything you need to know about living in ${n.name}, Orlando. Price points from ${n.priceRange}, schools, dining, new construction, and lifestyle details from a 30-year local expert.`,
    path: `/neighborhoods/${n.slug}`,
  });
}

export default async function NeighborhoodPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const n = neighborhoods.find((nb) => nb.slug === slug);
  if (!n) notFound();

  const related = neighborhoods
    .filter((nb) => nb.slug !== n.slug)
    .map((nb) => ({
      ...nb,
      score: nb.lifestyleTags.filter((t) => n.lifestyleTags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const content = neighborhoodPageContent[n.slug];

  const neighborhoodSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: n.name,
    description: n.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: n.name,
      addressRegion: "FL",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://nicolemickle.com/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Neighborhoods",
        item: "https://nicolemickle.com/neighborhoods",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: n.name,
        item: `https://nicolemickle.com/neighborhoods/${n.slug}`,
      },
    ],
  };

  // The contractor's sheet also specified a per-page RealEstateAgent node. It is
  // deliberately omitted: the root layout already emits a sitewide
  // RealEstateAgent/LocalBusiness on every page, and a second one here would put
  // two competing business entities on the same page — the exact error the sheet
  // warns about. Breadcrumb + FAQ are the parts that add anything.
  const faqSchema = content ? buildFaqSchema(content.faq) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(neighborhoodSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
      <NeighborhoodDetailClient neighborhood={n} related={related} content={content} />
    </>
  );
}
