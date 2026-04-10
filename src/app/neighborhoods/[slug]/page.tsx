import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { neighborhoods } from "@/lib/neighborhoods";
import { NeighborhoodDetailClient } from "@/components/neighborhood-detail-client";

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
  return {
    title: `${n.name} Neighborhood Guide - Living in ${n.name}, Orlando`,
    description: `Everything you need to know about living in ${n.name}, Orlando. Price points from ${n.priceRange}, schools, dining, new construction, and lifestyle details from a 30-year local expert.`,
  };
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(neighborhoodSchema) }}
      />
      <NeighborhoodDetailClient neighborhood={n} related={related} />
    </>
  );
}
