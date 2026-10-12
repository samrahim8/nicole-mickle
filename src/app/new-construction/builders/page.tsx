import { RelatedPosts } from "@/components/related-posts";
import type { Metadata } from "next";

import { BuildersHubClient } from "@/components/builders-hub-client";
import { buildFaqSchema } from "@/components/faq-accordion";
import { buildersHub, builderPages, hubBuilderNames } from "@/lib/builders";
import { buildMetadata } from "@/lib/seo";

// Needed so CMS pageSeo edits reach production without a redeploy.
export const revalidate = 60;

const SITE = "https://nicolemickle.com";
const PATH = "/new-construction/builders";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: buildersHub.seoTitle,
    description: buildersHub.metaDescription,
    path: PATH,
  });
}

export default function BuildersHubPage() {
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
      { "@type": "ListItem", position: 3, name: "Builders", item: `${SITE}${PATH}` },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "New construction buyer representation",
    areaServed: "Orlando, FL",
    provider: {
      "@type": "RealEstateAgent",
      name: "Nicole Mickle Real Estate",
      telephone: "+1-407-353-0826",
      url: `${SITE}${PATH}`,
    },
  };

  // Every builder on the page, in listed order. Builders that have their own
  // page carry its URL; the rest are names only until those pages ship.
  const builderUrls = new Map(
    builderPages.map((b) => [b.name, `${SITE}${PATH}/${b.slug}`]),
  );
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Orlando New Construction Home Builders",
    itemListElement: hubBuilderNames.map((name, i) => {
      const url = builderUrls.get(name);
      return {
        "@type": "ListItem",
        position: i + 1,
        name,
        ...(url ? { url } : {}),
      };
    }),
  };

  const faqSchema = buildFaqSchema(buildersHub.faq);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
      <BuildersHubClient />
      <RelatedPosts
        terms={["builders", "home builders", "new construction"]}
        boost={["home builders", "builders"]}
        heading="Builder reviews and new construction reading"
      />
    </>
  );
}
