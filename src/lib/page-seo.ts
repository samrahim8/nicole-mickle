import { cache } from "react";

import { sanityClient } from "@/sanity/client";
import { urlFor } from "@/sanity/image";

/**
 * Resolved SEO override for a single route, read from the `pageSeo` collection
 * in Sanity. Lets the SEO team manage title / description / Open Graph for any
 * page from the Studio. Consumed by buildMetadata() in src/lib/seo.ts.
 */
export type ResolvedPageSeo = {
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImageUrl?: string;
  noindex?: boolean;
};

const pageSeoByPathQuery = `*[_type == "pageSeo" && path == $path][0]{
  metaTitle, metaDescription, ogTitle, ogDescription, noindex, ogImage
}`;

// cache() dedupes the fetch within a single request. Failures (or missing
// Sanity config) resolve to null so metadata always falls back to code defaults.
export const getPageSeo = cache(
  async (path: string): Promise<ResolvedPageSeo | null> => {
    if (!sanityClient) return null;
    try {
      const doc = await sanityClient.fetch<{
        metaTitle?: string | null;
        metaDescription?: string | null;
        ogTitle?: string | null;
        ogDescription?: string | null;
        noindex?: boolean | null;
        ogImage?: { asset?: unknown } | null;
      } | null>(pageSeoByPathQuery, { path });
      if (!doc) return null;
      const ogImageUrl = doc.ogImage?.asset
        ? urlFor(doc.ogImage as Parameters<typeof urlFor>[0])
            .width(1200)
            .height(630)
            .fit("crop")
            .auto("format")
            .url()
        : undefined;
      return {
        metaTitle: doc.metaTitle ?? undefined,
        metaDescription: doc.metaDescription ?? undefined,
        ogTitle: doc.ogTitle ?? undefined,
        ogDescription: doc.ogDescription ?? undefined,
        ogImageUrl,
        noindex: doc.noindex ?? undefined,
      };
    } catch {
      return null;
    }
  },
);
