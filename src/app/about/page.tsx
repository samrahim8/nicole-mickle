import type { Metadata } from "next";
import { AboutClient, type AboutData } from "@/components/about-client";
import { sanityClient } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { aboutPageQuery } from "@/sanity/queries";
import { aboutFallback } from "@/lib/about-fallback";

// Revalidate the page on a 60s interval. Nicole's edits in Studio go live within
// a minute without a full rebuild.
export const revalidate = 60;

type SanityAbout = {
  heroEyebrow: string | null;
  heroHeadlineLine1: string | null;
  heroHeadlineLine2: string | null;
  heroParagraphs: string[] | null;
  heroImage: { asset?: unknown; alt?: string } | null;
  journeyEyebrow: string | null;
  journeyHeadline: string | null;
  milestones: { period: string; title: string; description: string }[] | null;
  credentialsEyebrow: string | null;
  credentialsHeadline: string | null;
  credentialItems: string[] | null;
  discretionEyebrow: string | null;
  discretionHeadline: string | null;
  discretionParagraphs: string[] | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

async function getAboutPage(): Promise<{
  data: AboutData;
  seo: { title?: string; description?: string };
}> {
  if (!sanityClient) return { data: aboutFallback, seo: {} };
  try {
    const doc = await sanityClient.fetch<SanityAbout | null>(aboutPageQuery);
    if (!doc) return { data: aboutFallback, seo: {} };

    const heroImageSrc = doc.heroImage?.asset
      ? urlFor(doc.heroImage as Parameters<typeof urlFor>[0])
          .width(1200)
          .fit("max")
          .url()
      : aboutFallback.heroImage.src;

    const data: AboutData = {
      heroEyebrow: doc.heroEyebrow ?? aboutFallback.heroEyebrow,
      heroHeadlineLine1: doc.heroHeadlineLine1 ?? aboutFallback.heroHeadlineLine1,
      heroHeadlineLine2: doc.heroHeadlineLine2 ?? aboutFallback.heroHeadlineLine2,
      heroParagraphs: doc.heroParagraphs?.length
        ? doc.heroParagraphs
        : aboutFallback.heroParagraphs,
      heroImage: {
        src: heroImageSrc,
        alt: doc.heroImage?.alt || aboutFallback.heroImage.alt,
      },
      journeyEyebrow: doc.journeyEyebrow ?? aboutFallback.journeyEyebrow,
      journeyHeadline: doc.journeyHeadline ?? aboutFallback.journeyHeadline,
      milestones: doc.milestones?.length ? doc.milestones : aboutFallback.milestones,
      credentialsEyebrow: doc.credentialsEyebrow ?? aboutFallback.credentialsEyebrow,
      credentialsHeadline:
        doc.credentialsHeadline ?? aboutFallback.credentialsHeadline,
      credentialItems: doc.credentialItems?.length
        ? doc.credentialItems
        : aboutFallback.credentialItems,
      discretionEyebrow: doc.discretionEyebrow ?? aboutFallback.discretionEyebrow,
      discretionHeadline:
        doc.discretionHeadline ?? aboutFallback.discretionHeadline,
      discretionParagraphs: doc.discretionParagraphs?.length
        ? doc.discretionParagraphs
        : aboutFallback.discretionParagraphs,
    };
    return {
      data,
      seo: {
        title: doc.seoTitle ?? undefined,
        description: doc.seoDescription ?? undefined,
      },
    };
  } catch {
    // Sanity hiccup — fail open with the hardcoded copy.
    return { data: aboutFallback, seo: {} };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getAboutPage();
  return {
    title: seo.title || "About Nicole",
    description:
      seo.description ||
      "30 years of Orlando real estate experience. Learn about Nicole Mickle's background in relocation, new construction, and mortgage lending.",
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPage() {
  const { data } = await getAboutPage();
  return <AboutClient data={data} />;
}
