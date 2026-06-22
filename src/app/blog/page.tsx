import type { Metadata } from "next";
import Link from "next/link";

import { PostCard } from "@/components/post-card";
import { BlogPagination } from "@/components/blog-pagination";
import { sanityClient } from "@/sanity/client";
import {
  categoriesWithPostsQuery,
  postsCountQuery,
  postsListQuery,
} from "@/sanity/queries";
import type { PostCategory, PostListItem } from "@/sanity/types";

// Revalidate the blog index every 60 seconds.
export const revalidate = 60;

const PAGE_SIZE = 12;

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Orlando relocation, new construction, and neighborhood insights from Nicole Mickle – 30 years of local expertise, written for buyers, sellers, and anyone dreaming about life in Central Florida.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Journal | Nicole Mickle",
    description:
      "Orlando relocation, new construction, and neighborhood insights from Nicole Mickle.",
  },
};

type BlogIndexProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function BlogIndexPage({ searchParams }: BlogIndexProps) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1);
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const [posts, total, categories] = sanityClient
    ? await Promise.all([
        sanityClient.fetch<PostListItem[]>(postsListQuery, { start, end }),
        sanityClient.fetch<number>(postsCountQuery),
        sanityClient.fetch<PostCategory[]>(categoriesWithPostsQuery),
      ])
    : [[] as PostListItem[], 0, [] as PostCategory[]];

  const totalPages = Math.max(1, Math.ceil((total ?? 0) / PAGE_SIZE));

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 lg:pt-36 lg:pb-16">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-6">
              Journal
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3.25rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-6">
              Notes from 30 years in Orlando real estate
            </h1>
            <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-relaxed max-w-lg mx-auto">
              Relocation playbooks, neighborhood deep-dives, and new construction
              insights – written for the people I&apos;d actually invite over.
            </p>
          </div>

          {categories.length > 0 ? (
            <CategoryFilterBar categories={categories} />
          ) : null}
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 sm:gap-y-16">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}

          <BlogPagination page={page} totalPages={totalPages} basePath="/blog" />
        </div>
      </section>
    </>
  );
}

function CategoryFilterBar({ categories }: { categories: PostCategory[] }) {
  return (
    <nav
      aria-label="Browse by category"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      <span className="text-[11px] tracking-[0.2em] uppercase text-charcoal border border-charcoal/80 bg-charcoal/[0.04] px-4 py-2">
        All posts
      </span>
      {categories.map((category) => (
        <Link
          key={category._id}
          href={`/blog/category/${category.slug}`}
          className="text-[11px] tracking-[0.2em] uppercase text-neutral-500 border border-neutral-200 px-4 py-2 transition-colors hover:border-forest hover:text-forest"
        >
          {category.title}
        </Link>
      ))}
    </nav>
  );
}

function EmptyState() {
  return (
    <div className="max-w-xl mx-auto text-center py-24">
      <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-4">
        Coming soon
      </p>
      <h2 className="font-[family-name:var(--font-playfair)] text-[1.75rem] leading-tight text-charcoal mb-4">
        The journal is moving in
      </h2>
      <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-relaxed">
        New posts and a full archive are on their way. In the meantime, explore
        the{" "}
        <Link href="/neighborhoods" className="underline underline-offset-[3px]">
          neighborhood guides
        </Link>{" "}
        or{" "}
        <Link href="/contact" className="underline underline-offset-[3px]">
          get in touch
        </Link>
        .
      </p>
    </div>
  );
}
