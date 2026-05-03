import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { sanityClient } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { postsCountQuery, postsListQuery } from "@/sanity/queries";
import type { PostListItem } from "@/sanity/types";
import { formatPostDate } from "@/lib/format";

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

  const [posts, total] = sanityClient
    ? await Promise.all([
        sanityClient.fetch<PostListItem[]>(postsListQuery, { start, end }),
        sanityClient.fetch<number>(postsCountQuery),
      ])
    : [[] as PostListItem[], 0];

  const totalPages = Math.max(1, Math.ceil((total ?? 0) / PAGE_SIZE));
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

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

          {totalPages > 1 ? (
            <nav
              aria-label="Pagination"
              className="mt-24 flex items-center justify-between border-t border-neutral-200 pt-8"
            >
              <PaginationLink
                page={page - 1}
                disabled={!hasPrev}
                direction="prev"
              />
              <span className="text-[12px] tracking-[0.2em] uppercase text-neutral-400">
                Page {page} of {totalPages}
              </span>
              <PaginationLink
                page={page + 1}
                disabled={!hasNext}
                direction="next"
              />
            </nav>
          ) : null}
        </div>
      </section>
    </>
  );
}

function PostCard({ post }: { post: PostListItem }) {
  const href = `/blog/${post.slug}`;
  const category = post.categories?.[0];
  const coverSrc = post.coverImage?.asset
    ? urlFor(post.coverImage).width(900).height(600).fit("crop").auto("format").url()
    : null;

  return (
    <article className="bg-white border border-neutral-200/70 shadow-[0_1px_2px_rgba(0,0,0,0.03)] overflow-hidden sm:bg-transparent sm:border-0 sm:shadow-none sm:overflow-visible">
      <Link href={href} className="group block">
        <div className="aspect-[4/3] bg-neutral-100 overflow-hidden relative sm:mb-5">
          {coverSrc ? (
            <Image
              src={coverSrc}
              alt={post.coverImage?.alt ?? post.title}
              fill
              sizes="(min-width: 1024px) 28rem, (min-width: 640px) 45vw, 90vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 bg-forest flex items-center justify-center text-white/30">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M4 5h16v14H4zM4 15l4-4 5 5 3-3 4 4" />
              </svg>
            </div>
          )}
        </div>
        <div className="p-5 sm:p-0">
          <div className="flex items-center gap-3 mb-3">
            {category ? (
              <span className="text-[10px] tracking-[0.2em] uppercase text-forest">
                {category.title}
              </span>
            ) : null}
            <time className="text-[11px] tracking-wide text-neutral-400">
              {formatPostDate(post.publishedAt)}
            </time>
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-[1.5rem] leading-[1.25] tracking-[-0.015em] text-charcoal mb-3 group-hover:text-neutral-600 transition-colors duration-300 min-h-[2lh]">
            {post.title}
          </h2>
          {post.excerpt ? (
            <p className="text-[16px] sm:text-[15px] leading-relaxed text-neutral-500 line-clamp-3">
              {post.excerpt}
            </p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}

function PaginationLink({
  page,
  disabled,
  direction,
}: {
  page: number;
  disabled: boolean;
  direction: "prev" | "next";
}) {
  const label = direction === "prev" ? "Previous" : "Next";
  if (disabled) {
    return (
      <span className="text-[12px] tracking-[0.2em] uppercase text-neutral-300 cursor-not-allowed">
        {label}
      </span>
    );
  }
  const href = page === 1 ? "/blog" : `/blog?page=${page}`;
  return (
    <Link
      href={href}
      className="text-[12px] tracking-[0.2em] uppercase text-charcoal hover:text-forest transition-colors"
    >
      {label}
    </Link>
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
