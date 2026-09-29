import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";

import { MortgageCalculator } from "@/components/mortgage-calculator";
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

type ComparisonTableValue = {
  caption?: string;
  headers?: string[];
  rows?: { _key?: string; cells?: string[] }[];
  note?: string;
};

function ComparisonTable({ value }: { value: ComparisonTableValue }) {
  const headers = value.headers ?? [];
  const rows = (value.rows ?? []).filter((r) => (r.cells?.length ?? 0) > 0);
  if (headers.length === 0 || rows.length === 0) return null;

  return (
    <figure className="my-12">
      {value.caption ? (
        <figcaption className="font-[family-name:var(--font-playfair)] text-[1.25rem] leading-snug tracking-[-0.01em] text-charcoal mb-4">
          {value.caption}
        </figcaption>
      ) : null}
      {/* Sideways scroll on narrow screens; first column stays pinned so the row
          label is always visible. tabIndex lets keyboard users scroll it. */}
      <div
        className="overflow-x-auto border border-neutral-200 bg-white"
        tabIndex={0}
        role="region"
        aria-label={value.caption ? `${value.caption}, scrollable table` : "Scrollable table"}
      >
        <table className="w-full min-w-[34rem] border-collapse text-left text-[15px] leading-[1.5]">
          <thead>
            <tr className="bg-forest text-white">
              {headers.map((h, i) => (
                <th
                  key={i}
                  scope="col"
                  className={`px-4 py-3.5 text-[11px] font-semibold tracking-[0.15em] uppercase align-bottom ${
                    i === 0 ? "sticky left-0 z-10 bg-forest" : ""
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr
                key={row._key ?? r}
                className="border-t border-neutral-200 odd:bg-white even:bg-[#F7F6F2]"
              >
                {headers.map((_, c) =>
                  c === 0 ? (
                    <th
                      key={c}
                      scope="row"
                      className={`sticky left-0 z-10 px-4 py-3.5 font-semibold text-charcoal align-top ${
                        r % 2 === 0 ? "bg-white" : "bg-[#F7F6F2]"
                      }`}
                    >
                      {row.cells?.[c] ?? ""}
                    </th>
                  ) : (
                    <td key={c} className="px-4 py-3.5 text-neutral-700 align-top">
                      {row.cells?.[c] ?? ""}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {value.note ? (
        <p className="mt-3 text-[13px] text-neutral-500 leading-relaxed">
          {value.note}
        </p>
      ) : null}
    </figure>
  );
}

const components: PortableTextComponents = {
  // Imported WordPress posts have hard line breaks (\n) baked in from the old
  // ~70-char hard-wrapped source. The default renderer turns each into a <br>,
  // which forces the prose to break early and leaves a large empty right margin
  // in our wide reading column. Rendering them as collapsing whitespace instead
  // lets paragraphs reflow naturally to fill the column.
  hardBreak: false,
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
      <blockquote className="my-10 pl-6 border-l-2 border-forest text-[19px] leading-[1.7] font-[family-name:var(--font-playfair)] italic text-neutral-700">
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
            className="text-forest underline underline-offset-[3px] decoration-forest/30 hover:decoration-forest transition-colors"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={link.href}
          className="text-forest underline underline-offset-[3px] decoration-forest/30 hover:decoration-forest transition-colors"
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
              unoptimized
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
    comparisonTable: ({ value }) => (
      <ComparisonTable value={value as ComparisonTableValue} />
    ),
    mortgageCalculator: ({ value }) => (
      <MortgageCalculator
        embedded
        initialPrice={(value as { homePrice?: number })?.homePrice}
      />
    ),
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
