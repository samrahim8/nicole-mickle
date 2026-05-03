import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { originCities } from "@/lib/relocating-from";
import { neighborhoods } from "@/lib/neighborhoods";
import { RelocatingFromClient } from "@/components/relocating-from-client";

export function generateStaticParams() {
  return originCities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = originCities.find((c) => c.slug === slug);
  if (!city) return {};
  return {
    title: `Moving to Orlando from ${city.name} - Relocation Guide`,
    description: `Everything you need to know about relocating from ${city.name} to Orlando. Cost of living comparison, best neighborhoods, tax savings, and expert guidance from a 30-year local specialist.`,
    alternates: { canonical: `/relocating-from/${city.slug}` },
  };
}

export default async function RelocatingFromPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = originCities.find((c) => c.slug === slug);
  if (!city) notFound();

  const recommended = city.topNeighborhoods
    .map((s) => neighborhoods.find((n) => n.slug === s))
    .filter((n): n is NonNullable<typeof n> => Boolean(n));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.commonQuestions.map((q) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: { "@type": "Answer", text: q.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <RelocatingFromClient city={city} recommended={recommended} />
    </>
  );
}
