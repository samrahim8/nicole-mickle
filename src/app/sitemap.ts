import type { MetadataRoute } from "next";

import { neighborhoods } from "@/lib/neighborhoods";
import { originCities } from "@/lib/relocating-from";
import { sanityClient } from "@/sanity/client";

const SITE_URL = "https://nicolemickle.com";

// Sanity posts change frequently; refresh the sitemap every 10 minutes.
export const revalidate = 600;

type BlogSitemapEntry = {
  slug: string;
  publishedAt: string;
  _updatedAt?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/relocating`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/new-construction`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/neighborhoods`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/quiz`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const neighborhoodRoutes: MetadataRoute.Sitemap = neighborhoods.map((n) => ({
    url: `${SITE_URL}/neighborhoods/${n.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const newConstructionRoutes: MetadataRoute.Sitemap = neighborhoods
    .filter((n) => n.newConstruction.builders.length > 0)
    .map((n) => ({
      url: `${SITE_URL}/new-construction/${n.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const relocatingRoutes: MetadataRoute.Sitemap = originCities.map((r) => ({
    url: `${SITE_URL}/relocating-from/${r.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Fetch blog posts from Sanity. Fail gracefully – if Sanity is unreachable
  // we still ship a sitemap with everything else so the build never breaks.
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    if (!sanityClient) throw new Error("Sanity not configured");
    const posts = await sanityClient.fetch<BlogSitemapEntry[]>(
      `*[_type == "post" && defined(slug.current) && defined(publishedAt)]{
        "slug": slug.current,
        publishedAt,
        _updatedAt
      }`,
    );
    blogRoutes = (posts ?? []).map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post._updatedAt ?? post.publishedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch (err) {
    console.warn("Sitemap: failed to fetch posts from Sanity", err);
  }

  return [
    ...staticRoutes,
    ...neighborhoodRoutes,
    ...newConstructionRoutes,
    ...relocatingRoutes,
    ...blogRoutes,
  ];
}
