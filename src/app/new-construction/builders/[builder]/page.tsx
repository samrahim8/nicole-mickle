import { RelatedPosts } from "@/components/related-posts";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BuilderDetailClient } from "@/components/builder-detail-client";
import { buildFaqSchema } from "@/components/faq-accordion";
import { builderPages, getBuilderPage } from "@/lib/builders";
import { buildMetadata } from "@/lib/seo";

// Needed so CMS pageSeo edits reach production without a redeploy.
export const revalidate = 60;

const SITE = "https://nicolemickle.com";
const HUB_PATH = "/new-construction/builders";

export function generateStaticParams() {
  return builderPages.map((b) => ({ builder: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ builder: string }>;
}): Promise<Metadata> {
  const { builder } = await params;
  const page = getBuilderPage(builder);
  if (!page) return {};
  return buildMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    path: `${HUB_PATH}/${page.slug}`,
  });
}

export default async function BuilderPage({
  params,
}: {
  params: Promise<{ builder: string }>;
}) {
  const { builder } = await params;
  const page = getBuilderPage(builder);
  if (!page) notFound();

  const url = `${SITE}${HUB_PATH}/${page.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "New Construction",
        item: `${SITE}/new-construction`,
      },
      { "@type": "ListItem", position: 3, name: "Builders", item: `${SITE}${HUB_PATH}` },
      { "@type": "ListItem", position: 4, name: page.name, item: url },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `New construction buyer representation: ${page.name}`,
    areaServed: "Orlando, FL",
    provider: {
      "@type": "RealEstateAgent",
      name: "Nicole Mickle Real Estate",
      telephone: "+1-407-353-0826",
      url,
    },
  };

  const faqSchema = buildFaqSchema(page.faq);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
      <BuilderDetailClient builder={page} />
      <RelatedPosts
        terms={[page.name]}
        boost={["new construction", "builder", "builders"]}
        heading={`Reading on ${page.name} and new construction`}
      />
    </>
  );
}
