import type { Metadata } from "next";
import {
  RelocatingClient,
  type RelocatingPageData,
} from "@/components/relocating-client";
import { sanityClient } from "@/sanity/client";
import { relocatingPageQuery } from "@/sanity/queries";
import { relocatingFallback } from "@/lib/relocating-fallback";

export const revalidate = 60;

// Origin-city links stay in code — each has a paired /relocating-from/<slug>
// page in src/lib/relocating-from.ts.
const originCities = [
  { name: "New York", slug: "new-york" },
  { name: "Illinois", slug: "illinois" },
  { name: "Massachusetts", slug: "massachusetts" },
  { name: "Washington, D.C.", slug: "washington-dc" },
  { name: "Georgia", slug: "georgia" },
  { name: "California", slug: "california" },
];

type SanityRelocating = Partial<RelocatingPageData> & {
  seoTitle: string | null;
  seoDescription: string | null;
};

async function getPage(): Promise<{
  data: RelocatingPageData;
  seo: { title?: string; description?: string };
}> {
  if (!sanityClient) return { data: relocatingFallback, seo: {} };
  try {
    const doc = await sanityClient.fetch<SanityRelocating | null>(
      relocatingPageQuery,
    );
    if (!doc) return { data: relocatingFallback, seo: {} };
    const fb = relocatingFallback;
    const data: RelocatingPageData = {
      heroEyebrow: doc.heroEyebrow ?? fb.heroEyebrow,
      heroHeadlineLine1: doc.heroHeadlineLine1 ?? fb.heroHeadlineLine1,
      heroHeadlineLine2: doc.heroHeadlineLine2 ?? fb.heroHeadlineLine2,
      heroBody: doc.heroBody ?? fb.heroBody,
      heroCtaLabel: doc.heroCtaLabel ?? fb.heroCtaLabel,
      heroStats: doc.heroStats?.length ? doc.heroStats : fb.heroStats,
      trustedByEyebrow: doc.trustedByEyebrow ?? fb.trustedByEyebrow,
      trustedByHeadline: doc.trustedByHeadline ?? fb.trustedByHeadline,
      trustedByBody: doc.trustedByBody ?? fb.trustedByBody,
      employers: doc.employers?.length ? doc.employers : fb.employers,
      processEyebrow: doc.processEyebrow ?? fb.processEyebrow,
      processHeadline: doc.processHeadline ?? fb.processHeadline,
      processSteps: doc.processSteps?.length ? doc.processSteps : fb.processSteps,
      whyEyebrow: doc.whyEyebrow ?? fb.whyEyebrow,
      whyHeadline: doc.whyHeadline ?? fb.whyHeadline,
      whyItems: doc.whyItems?.length ? doc.whyItems : fb.whyItems,
      faqEyebrow: doc.faqEyebrow ?? fb.faqEyebrow,
      faqHeadline: doc.faqHeadline ?? fb.faqHeadline,
      faq: doc.faq?.length ? doc.faq : fb.faq,
      neighborhoodsEyebrow: doc.neighborhoodsEyebrow ?? fb.neighborhoodsEyebrow,
      neighborhoodsHeadline: doc.neighborhoodsHeadline ?? fb.neighborhoodsHeadline,
      neighborhoodsBody: doc.neighborhoodsBody ?? fb.neighborhoodsBody,
      neighborhoodsCtaLabel: doc.neighborhoodsCtaLabel ?? fb.neighborhoodsCtaLabel,
      neighborhoodsQuizEyebrow:
        doc.neighborhoodsQuizEyebrow ?? fb.neighborhoodsQuizEyebrow,
      neighborhoodsQuizHeadline:
        doc.neighborhoodsQuizHeadline ?? fb.neighborhoodsQuizHeadline,
      neighborhoodsQuizBody: doc.neighborhoodsQuizBody ?? fb.neighborhoodsQuizBody,
      neighborhoodsQuizCtaLabel:
        doc.neighborhoodsQuizCtaLabel ?? fb.neighborhoodsQuizCtaLabel,
      finalCtaHeadline: doc.finalCtaHeadline ?? fb.finalCtaHeadline,
      finalCtaBody: doc.finalCtaBody ?? fb.finalCtaBody,
      finalCtaLabel: doc.finalCtaLabel ?? fb.finalCtaLabel,
    };
    return {
      data,
      seo: {
        title: doc.seoTitle ?? undefined,
        description: doc.seoDescription ?? undefined,
      },
    };
  } catch {
    return { data: relocatingFallback, seo: {} };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage();
  return {
    title: seo.title || "Relocating to Orlando",
    description:
      seo.description ||
      "Moving to Orlando? Nicole Mickle specializes in relocation with 30 years of local expertise. From neighborhoods to schools to commutes, get expert guidance.",
    alternates: { canonical: "/relocating" },
  };
}

export default async function RelocatingPage() {
  const { data } = await getPage();
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <RelocatingClient data={data} originCities={originCities} />
    </>
  );
}
