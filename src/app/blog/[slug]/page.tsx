import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AuthorBox } from "@/components/author-box";
import { PostBody } from "@/components/portable-text";
import { sanityClient } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import {
  postBySlugQuery,
  postSlugsQuery,
  relatedPostsQuery,
} from "@/sanity/queries";
import type { PostDetail, PostListItem } from "@/sanity/types";
import { formatPostDate } from "@/lib/format";

// Revalidate posts every 60 seconds. Any missing slugs are rendered on-demand.
export const revalidate = 60;
export const dynamicParams = true;

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  if (!sanityClient) return [];
  const slugs = await sanityClient.fetch<string[]>(postSlugsQuery);
  return (slugs ?? []).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!sanityClient) return {};
  const post = await sanityClient.fetch<PostDetail | null>(postBySlugQuery, {
    slug,
  });
  if (!post) return {};

  // When an SEO meta title is set it is a complete, length-tuned title, so emit
  // it absolutely and skip the "| Nicole Mickle Real Estate" template suffix
  // (that suffix is what pushed post titles past the length limit). Posts with no
  // meta title fall back to the headline plus the template as before.
  const metaTitle = post.seo?.metaTitle;
  const titleField = metaTitle ? { absolute: metaTitle } : post.title;
  const ogTitle = metaTitle ?? post.title;
  const description = post.seo?.metaDescription ?? post.excerpt ?? undefined;
  const ogSource = post.seo?.ogImage ?? post.coverImage ?? null;
  const ogImage = ogSource
    ? urlFor(ogSource).width(1200).height(630).fit("crop").auto("format").url()
    : undefined;

  return {
    title: titleField,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: ogTitle,
      description,
      url: `/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  if (!sanityClient) notFound();
  const post = await sanityClient.fetch<PostDetail | null>(postBySlugQuery, {
    slug,
  });

  if (!post) notFound();

  const categoryIds = (post.categories ?? []).map((c) => c._id);
  const related =
    categoryIds.length > 0
      ? await sanityClient!.fetch<PostListItem[]>(relatedPostsQuery, {
          currentId: post._id,
          categoryIds,
        })
      : [];

  const coverSrc = post.coverImage?.asset
    ? urlFor(post.coverImage).width(2000).fit("max").auto("format").url()
    : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedAt,
    author: post.author
      ? { "@type": "Person", name: post.author.name }
      : { "@type": "Person", name: "Nicole Mickle" },
    image: coverSrc ? [coverSrc] : undefined,
    description: post.excerpt ?? undefined,
    mainEntityOfPage: `https://nicolemickle.com/blog/${post.slug}`,
  };

  const faqItems = (post.faq ?? []).filter((f) => f.question && f.answer);
  const faqSchema =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <article className="pt-32 lg:pt-36">
        {/* Header */}
        <header className="max-w-[90rem] mx-auto px-6 lg:px-12 mb-12 lg:mb-16">
          <div className="max-w-[52rem] mx-auto">
            <Link
              href="/blog"
              className="text-[12px] tracking-wide text-neutral-400 hover:text-charcoal transition-colors duration-300 mb-8 inline-flex items-center gap-2 py-2"
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
              All posts
            </Link>

            <div className="flex items-center gap-3 mb-6">
              {post.categories?.[0] ? (
                <Link
                  href={`/blog/category/${post.categories[0].slug}`}
                  className="text-[10px] tracking-[0.2em] uppercase text-forest hover:underline"
                >
                  {post.categories[0].title}
                </Link>
              ) : null}
              <time
                dateTime={post.publishedAt}
                className="text-[11px] tracking-wide text-neutral-400"
              >
                {formatPostDate(post.publishedAt)}
              </time>
            </div>

            <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.1] tracking-[-0.02em] text-charcoal mb-6">
              {post.title}
            </h1>

            {post.excerpt ? (
              <p className="text-[clamp(1.05rem,1.5vw,1.25rem)] text-neutral-500 leading-[1.6] mb-8">
                {post.excerpt}
              </p>
            ) : null}

            {post.author ? (
              <div className="flex items-center gap-3 pt-6 border-t border-neutral-100">
                {post.author.image?.asset ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-neutral-100">
                    <Image
                      src={urlFor(post.author.image).width(80).height(80).fit("crop").auto("format").url()}
                      alt={post.author.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ) : null}
                <div>
                  <p className="text-[13px] text-charcoal">{post.author.name}</p>
                  {post.author.role ? (
                    <p className="text-[11px] text-neutral-400">
                      {post.author.role}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </header>

        {/* Hero cover image */}
        {coverSrc ? (
          <div className="max-w-[90rem] mx-auto px-6 lg:px-12 mb-14 lg:mb-20">
            <figure className="max-w-5xl mx-auto">
              <div className="relative w-full aspect-[16/9] bg-neutral-100 overflow-hidden">
                <Image
                  src={coverSrc}
                  alt={post.coverImage?.alt ?? post.title}
                  fill
                  sizes="(min-width: 1024px) 64rem, 100vw"
                  className="object-cover"
                  loading="eager"
                  fetchPriority="high"
                  unoptimized
                />
              </div>
            </figure>
          </div>
        ) : null}

        {/* Body */}
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 pb-24 lg:pb-32">
          <div className="max-w-[52rem] mx-auto">
            {post.body ? <PostBody value={post.body} /> : null}

            {faqItems.length > 0 ? (
              <section className="mt-16 pt-12 border-t border-neutral-200">
                <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-3">
                  Frequently Asked
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.6rem,3vw,2.25rem)] leading-tight tracking-[-0.015em] text-charcoal mb-8">
                  Questions, answered
                </h2>
                <div className="divide-y divide-neutral-200 border-y border-neutral-200">
                  {faqItems.map((item, i) => (
                    <details key={i} className="group py-5">
                      <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                        <h3 className="font-[family-name:var(--font-playfair)] text-[1.2rem] leading-snug text-charcoal">
                          {item.question}
                        </h3>
                        <span
                          aria-hidden="true"
                          className="mt-1 shrink-0 text-forest transition-transform duration-300 group-open:rotate-45"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </span>
                      </summary>
                      <p className="mt-3 text-[16px] leading-relaxed text-neutral-600 whitespace-pre-line">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}

            {post.author ? <AuthorBox author={post.author} /> : null}
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 ? (
        <section className="border-t border-neutral-200 py-20 lg:py-32">
          <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
            <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-10">
              Keep reading
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 sm:gap-y-12">
              {related.map((r) => {
                const src = r.coverImage?.asset
                  ? urlFor(r.coverImage)
                      .width(800)
                      .height(500)
                      .fit("crop")
                      .auto("format")
                      .url()
                  : null;
                return (
                  <Link
                    key={r._id}
                    href={`/blog/${r.slug}`}
                    className="group block bg-white border border-neutral-200/70 shadow-[0_1px_2px_rgba(0,0,0,0.03)] overflow-hidden sm:bg-transparent sm:border-0 sm:shadow-none sm:overflow-visible"
                  >
                    <div className="aspect-[4/3] bg-neutral-100 overflow-hidden relative sm:mb-4">
                      {src ? (
                        <Image
                          src={src}
                          alt={r.coverImage?.alt ?? r.title}
                          fill
                          sizes="(min-width: 1024px) 28rem, 45vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          unoptimized
                        />
                      ) : null}
                    </div>
                    <div className="p-5 sm:p-0">
                      <time className="text-[11px] tracking-wide text-neutral-400 block mb-2">
                        {formatPostDate(r.publishedAt)}
                      </time>
                      <h3 className="font-[family-name:var(--font-playfair)] text-[1.25rem] leading-[1.3] text-charcoal group-hover:text-neutral-600 transition-colors">
                        {r.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
