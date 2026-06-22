import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostCard } from "@/components/post-card";
import { BlogPagination } from "@/components/blog-pagination";
import { sanityClient } from "@/sanity/client";
import {
  categoryBySlugQuery,
  categorySlugsQuery,
  postsByCategoryQuery,
} from "@/sanity/queries";
import type { CategoryDetail, PostListItem } from "@/sanity/types";

// Revalidate every 60 seconds; render unknown categories on demand.
export const revalidate = 60;
export const dynamicParams = true;

const PAGE_SIZE = 12;
const SITE_URL = "https://nicolemickle.com";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateStaticParams() {
  if (!sanityClient) return [];
  const slugs = await sanityClient.fetch<string[]>(categorySlugsQuery);
  return (slugs ?? []).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!sanityClient) return {};
  const category = await sanityClient.fetch<CategoryDetail | null>(
    categoryBySlugQuery,
    { slug },
  );
  if (!category) return {};

  const title = `${category.title} – Orlando Real Estate Journal`;
  const description =
    category.description ??
    `${category.title} articles and guides from Nicole Mickle, an Orlando real estate specialist with 30 years of local expertise.`;

  return {
    title,
    description,
    alternates: { canonical: `/blog/category/${slug}` },
    openGraph: { title: `${category.title} | Nicole Mickle`, description },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  if (!sanityClient) notFound();

  const category = await sanityClient.fetch<CategoryDetail | null>(
    categoryBySlugQuery,
    { slug },
  );
  if (!category || category.postCount === 0) notFound();

  const page = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1);
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const posts = await sanityClient.fetch<PostListItem[]>(postsByCategoryQuery, {
    categoryId: category._id,
    start,
    end,
  });

  const totalPages = Math.max(1, Math.ceil(category.postCount / PAGE_SIZE));
  const basePath = `/blog/category/${slug}`;

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.title} | Nicole Mickle`,
    description: category.description ?? undefined,
    url: `${SITE_URL}${basePath}`,
    isPartOf: { "@type": "Blog", name: "Nicole Mickle Journal", url: `${SITE_URL}/blog` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Journal", item: `${SITE_URL}/blog` },
      {
        "@type": "ListItem",
        position: 2,
        name: category.title,
        item: `${SITE_URL}${basePath}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-12 lg:pt-36 lg:pb-16">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <Link
              href="/blog"
              className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 hover:text-forest transition-colors inline-flex items-center gap-2 mb-6"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M13 8H3M7 4l-4 4 4 4" />
              </svg>
              Journal
            </Link>
            <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3.25rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-6">
              {category.title}
            </h1>
            {category.description ? (
              <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-relaxed max-w-lg mx-auto">
                {category.description}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          {posts.length === 0 ? (
            <p className="text-center text-[15px] text-neutral-500 py-24">
              No posts in this category yet.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 sm:gap-y-16">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}

          <BlogPagination page={page} totalPages={totalPages} basePath={basePath} />
        </div>
      </section>
    </>
  );
}
