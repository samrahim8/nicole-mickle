import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/image";
import type { PostAuthor } from "@/sanity/types";

type AuthorBoxProps = {
  author: PostAuthor;
};

// Renders at the foot of every blog post. Pulls from the author reference
// (Sanity → author-nicole-mickle), so editing the author doc updates every post.
export function AuthorBox({ author }: AuthorBoxProps) {
  const imgSrc = author.image?.asset
    ? urlFor(author.image)
        .width(240)
        .height(300)
        .fit("crop")
        .auto("format")
        .url()
    : null;

  return (
    <aside className="mt-16 pt-12 border-t border-neutral-200">
      <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-8">
        About the author
      </p>

      <div className="flex flex-col sm:flex-row gap-7 sm:gap-9 sm:items-start">
        {imgSrc ? (
          <div className="relative w-28 h-36 sm:w-32 sm:h-40 shrink-0 overflow-hidden bg-neutral-100">
            <Image
              src={imgSrc}
              alt={author.name}
              fill
              sizes="128px"
              className="object-cover"
              unoptimized
            />
          </div>
        ) : null}

        <div className="flex-1">
          <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.4rem,2.4vw,1.85rem)] leading-tight tracking-[-0.015em] text-charcoal">
            {author.name}
          </h2>
          {author.role ? (
            <p className="text-[12px] tracking-[0.12em] uppercase text-forest mt-1.5">
              {author.role}
            </p>
          ) : null}

          {author.bio ? (
            <p className="text-[16px] leading-relaxed text-neutral-600 mt-4 max-w-2xl">
              {author.bio}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center bg-forest text-white text-[12px] tracking-[0.12em] uppercase px-7 py-3 hover:bg-forest/90 transition-colors"
            >
              Work with Nicole
            </Link>
            <a
              href="https://www.iorlandorealestate.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] tracking-[0.12em] uppercase text-charcoal underline underline-offset-4 decoration-neutral-300 hover:decoration-charcoal transition-colors"
            >
              Search homes
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
