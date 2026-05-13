import type { Metadata } from "next";
import { AboutClient, type AboutData } from "@/components/about-client";
import { urlFor } from "@/sanity/image";
import { sanityFetch } from "@/sanity/live";
import { aboutPageQuery } from "@/sanity/queries";
import { aboutFallback } from "@/lib/about-fallback";

// Revalidate the page on a 60s interval. Nicole's edits in Studio go live within
// a minute without a full rebuild. Inside the Presentation visual editor this
// auto-upgrades to live streaming via sanityFetch.
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
  try {
    const { data: doc } = await sanityFetch({ query: aboutPageQuery });
    const typed = doc as SanityAbout | null;
    if (!typed) return { data: aboutFallback, seo: {} };

    const heroImageSrc = typed.heroImage?.asset
      ? urlFor(typed.heroImage as Parameters<typeof urlFor>[0]).width(1200).fit("max").url()
      : aboutFallback.heroImage.src;

    const data: AboutData = {
      heroEyebrow: typed.heroEyebrow ?? aboutFallback.heroEyebrow,
      heroHeadlineLine1: typed.heroHeadlineLine1 ?? aboutFallback.heroHeadlineLine1,
      heroHeadlineLine2: typed.heroHeadlineLine2 ?? aboutFallback.heroHeadlineLine2,
      heroParagraphs: typed.heroParagraphs?.length
        ? typed.heroParagraphs
        : aboutFallback.heroParagraphs,
      heroImage: {
        src: heroImageSrc,
        alt: typed.heroImage?.alt || aboutFallback.heroImage.alt,
      },
      journeyEyebrow: typed.journeyEyebrow ?? aboutFallback.journeyEyebrow,
      journeyHeadline: typed.journeyHeadline ?? aboutFallback.journeyHeadline,
      milestones: typed.milestones?.length ? typed.milestones : aboutFallback.milestones,
      credentialsEyebrow: typed.credentialsEyebrow ?? aboutFallback.credentialsEyebrow,
      credentialsHeadline:
        typed.credentialsHeadline ?? aboutFallback.credentialsHeadline,
      credentialItems: typed.credentialItems?.length
        ? typed.credentialItems
        : aboutFallback.credentialItems,
      discretionEyebrow: typed.discretionEyebrow ?? aboutFallback.discretionEyebrow,
      discretionHeadline:
        typed.discretionHeadline ?? aboutFallback.discretionHeadline,
      discretionParagraphs: typed.discretionParagraphs?.length
        ? typed.discretionParagraphs
        : aboutFallback.discretionParagraphs,
    };
    return {
      data,
      seo: {
        title: typed.seoTitle ?? undefined,
        description: typed.seoDescription ?? undefined,
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
