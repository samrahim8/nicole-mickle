import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/image";
import type { PostListItem } from "@/sanity/types";
import { decodeEntities, formatPostDate } from "@/lib/format";

export function PostCard({ post }: { post: PostListItem }) {
  const href = `/blog/${post.slug}`;
  const category = post.categories?.[0];
  // Cover images are produced at 1200x630 (1.91:1). Request that exact ratio and
  // render it into a 1.91:1 box so the full frame survives — asking Sanity for a
  // different ratio and then object-cover'ing it into a third one crops twice.
  const coverSrc = post.coverImage?.asset
    ? urlFor(post.coverImage).width(1200).height(630).fit("crop").auto("format").url()
    : null;

  return (
    <article className="group bg-white border border-neutral-200/70 shadow-[0_1px_2px_rgba(0,0,0,0.03)] overflow-hidden sm:bg-transparent sm:border-0 sm:shadow-none sm:overflow-visible">
      <Link href={href} aria-label={post.title} className="block">
        <div className="aspect-[1.91/1] bg-neutral-100 overflow-hidden relative sm:mb-5">
          {coverSrc ? (
            <Image
              src={coverSrc}
              alt={post.coverImage?.alt ?? post.title}
              fill
              sizes="(min-width: 1024px) 28rem, (min-width: 640px) 45vw, 90vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              unoptimized
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
      </Link>
      <div className="p-5 sm:p-0">
        <div className="flex items-center gap-3 mb-3">
          {category ? (
            <Link
              href={`/blog/category/${category.slug}`}
              className="text-[10px] tracking-[0.2em] uppercase text-forest hover:underline underline-offset-2"
            >
              {category.title}
            </Link>
          ) : null}
          <time className="text-[11px] tracking-wide text-neutral-400">
            {formatPostDate(post.publishedAt)}
          </time>
        </div>
        <Link href={href} className="block">
          <h2 className="font-[family-name:var(--font-playfair)] text-[1.5rem] leading-[1.25] tracking-[-0.015em] text-charcoal mb-3 group-hover:text-neutral-600 transition-colors duration-300 min-h-[2lh]">
            {decodeEntities(post.title)}
          </h2>
        </Link>
        {post.excerpt ? (
          <p className="text-[16px] sm:text-[15px] leading-relaxed text-neutral-500 line-clamp-3">
            {decodeEntities(post.excerpt)}
          </p>
        ) : null}
      </div>
    </article>
  );
}
