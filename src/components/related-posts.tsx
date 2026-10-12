import Link from "next/link";

import { PostCard } from "@/components/post-card";
import { sanityClient } from "@/sanity/client";
import { pageRelatedPostsQuery } from "@/sanity/queries";
import type { PostListItem } from "@/sanity/types";

type RelatedPostsProps = {
  /** Phrases that should appear in a post's title or excerpt. */
  terms: string[];
  /** Phrases that push a post higher in the ranking. */
  boost?: string[];
  eyebrow?: string;
  heading: string;
  limit?: number;
};

// Server component: pulls the best-matching journal posts for the page it sits
// on. Renders nothing when there are no matches, so it is safe on every page.
export async function RelatedPosts({
  terms,
  boost = [],
  eyebrow = "From the journal",
  heading,
  limit = 3,
}: RelatedPostsProps) {
  if (!sanityClient || terms.length === 0) return null;

  let posts: PostListItem[] = [];
  try {
    posts = await sanityClient.fetch<PostListItem[]>(pageRelatedPostsQuery, {
      terms,
      boost: boost.length > 0 ? boost : terms,
      limit,
    });
  } catch {
    return null;
  }
  if (!posts?.length) return null;

  return (
    <section className="py-20 lg:py-28 border-t border-neutral-100" aria-labelledby="related-posts-heading">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-4">
              {eyebrow}
            </p>
            <h2
              id="related-posts-heading"
              className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-charcoal"
            >
              {heading}
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-[13px] tracking-wide font-medium text-forest border-b border-forest pb-0.5 self-start sm:self-auto hover:text-forest-light hover:border-forest-light transition-colors"
          >
            All journal posts
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 sm:gap-y-12">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
