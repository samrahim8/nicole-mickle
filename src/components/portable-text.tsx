import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";

import { urlFor } from "@/sanity/image";
import type { SanityImageWithAlt } from "@/sanity/types";

type PortableTextImage = SanityImageWithAlt & {
  caption?: string;
};

type PullQuoteValue = {
  quote: string;
  attribution?: string;
};

type LinkValue = {
  href: string;
  openInNewTab?: boolean;
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[17px] leading-[1.75] text-neutral-700 mb-6">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3vw,2.25rem)] tracking-[-0.02em] text-charcoal mt-14 mb-5 leading-[1.2]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-[family-name:var(--font-playfair)] text-[clamp(1.4rem,2.2vw,1.75rem)] tracking-[-0.015em] text-charcoal mt-10 mb-4 leading-[1.25]">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-[family-name:var(--font-playfair)] text-[1.25rem] tracking-[-0.01em] text-charcoal mt-8 mb-3">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 pl-6 border-l-2 border-[#1B3A2D] text-[19px] leading-[1.7] font-[family-name:var(--font-playfair)] italic text-neutral-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 pl-5 space-y-2 text-[17px] leading-[1.75] text-neutral-700 list-disc marker:text-neutral-400">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 pl-5 space-y-2 text-[17px] leading-[1.75] text-neutral-700 list-decimal marker:text-neutral-400">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-charcoal">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const link = value as LinkValue | undefined;
      if (!link?.href) return <>{children}</>;
      const isExternal =
        /^https?:\/\//.test(link.href) && !link.href.includes("nicolemickle.com");
      if (isExternal || link.openInNewTab) {
        return (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1B3A2D] underline underline-offset-[3px] decoration-[#1B3A2D]/30 hover:decoration-[#1B3A2D] transition-colors"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={link.href}
          className="text-[#1B3A2D] underline underline-offset-[3px] decoration-[#1B3A2D]/30 hover:decoration-[#1B3A2D] transition-colors"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const image = value as PortableTextImage | undefined;
      if (!image?.asset) return null;
      const src = urlFor(image).width(1600).fit("max").auto("format").url();
      return (
        <figure className="my-10">
          <div className="relative w-full aspect-[16/10] bg-neutral-100">
            <Image
              src={src}
              alt={image.alt ?? ""}
              fill
              sizes="(min-width: 1024px) 48rem, 100vw"
              className="object-cover"
            />
          </div>
          {image.caption ? (
            <figcaption className="mt-3 text-[13px] text-neutral-500 leading-relaxed">
              {image.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
    pullQuote: ({ value }) => {
      const quote = value as PullQuoteValue | undefined;
      if (!quote?.quote) return null;
      return (
        <figure className="my-14 text-center max-w-2xl mx-auto">
          <blockquote className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,2.5vw,1.875rem)] leading-[1.4] tracking-[-0.015em] text-charcoal italic">
            &ldquo;{quote.quote}&rdquo;
          </blockquote>
          {quote.attribution ? (
            <figcaption className="mt-5 text-[11px] tracking-[0.25em] uppercase text-neutral-400">
              {quote.attribution}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

export function PostBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
