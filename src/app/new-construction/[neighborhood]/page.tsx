import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { neighborhoods } from "@/lib/neighborhoods";
import { NewConstructionNeighborhoodClient } from "@/components/new-construction-neighborhood-client";

const withNewConstruction = neighborhoods.filter(
  (n) => n.newConstruction.builders.length > 0
);

export function generateStaticParams() {
  return withNewConstruction.map((n) => ({ neighborhood: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ neighborhood: string }>;
}): Promise<Metadata> {
  const { neighborhood } = await params;
  const n = neighborhoods.find((nb) => nb.slug === neighborhood);
  if (!n || n.newConstruction.builders.length === 0) return {};
  return {
    title: `New Construction in ${n.name} - Builders, Communities & Pricing`,
    description: `New construction homes in ${n.name}, Orlando. Active builders include ${n.newConstruction.builders.slice(0, 3).join(", ")}. Price range: ${n.priceRange}. Expert guidance from Nicole Mickle.`,
    alternates: { canonical: `/new-construction/${n.slug}` },
  };
}

export default async function NewConstructionNeighborhoodPage({
  params,
}: {
  params: Promise<{ neighborhood: string }>;
}) {
  const { neighborhood } = await params;
  const n = neighborhoods.find((nb) => nb.slug === neighborhood);
  if (!n || n.newConstruction.builders.length === 0) notFound();

  return <NewConstructionNeighborhoodClient neighborhood={n} />;
}
