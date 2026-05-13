import type { Metadata } from "next";
import {
  NewConstructionClient,
  type NewConstructionPageData,
} from "@/components/new-construction-client";
import { sanityFetch } from "@/sanity/live";
import { newConstructionPageQuery } from "@/sanity/queries";
import { newConstructionFallback } from "@/lib/new-construction-fallback";
import { urlFor } from "@/sanity/image";

export const revalidate = 60;

type SanityImageRef = { asset?: unknown; alt?: string } | null;
type SanityNewConstruction = Partial<
  Omit<NewConstructionPageData, "photoBand">
> & {
  photoBand: SanityImageRef[] | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

function resolvePhotoBand(
  raw: SanityImageRef[] | null | undefined,
): { src: string; alt: string }[] {
  if (!raw?.length) return newConstructionFallback.photoBand;
  const resolved = raw
    .map((img, i) => {
      if (!img?.asset) return null;
      return {
        src: urlFor(img as Parameters<typeof urlFor>[0]).width(1200).fit("max").url(),
        alt: img.alt || newConstructionFallback.photoBand[i]?.alt || "",
      };
    })
    .filter((x): x is { src: string; alt: string } => x !== null);
  return resolved.length === 3 ? resolved : newConstructionFallback.photoBand;
}

async function getPage(): Promise<{
  data: NewConstructionPageData;
  seo: { title?: string; description?: string };
}> {
  try {
    const { data: raw } = await sanityFetch({ query: newConstructionPageQuery });
    const doc = raw as SanityNewConstruction | null;
    if (!doc) return { data: newConstructionFallback, seo: {} };
    const fb = newConstructionFallback;
    const data: NewConstructionPageData = {
      heroEyebrow: doc.heroEyebrow ?? fb.heroEyebrow,
      heroHeadlineLine1: doc.heroHeadlineLine1 ?? fb.heroHeadlineLine1,
      heroHeadlineLine2: doc.heroHeadlineLine2 ?? fb.heroHeadlineLine2,
      heroBody: doc.heroBody ?? fb.heroBody,
      heroPrimaryCtaLabel: doc.heroPrimaryCtaLabel ?? fb.heroPrimaryCtaLabel,
      heroSecondaryCtaLabel: doc.heroSecondaryCtaLabel ?? fb.heroSecondaryCtaLabel,
      heroStats: doc.heroStats?.length ? doc.heroStats : fb.heroStats,
      photoBand: resolvePhotoBand(doc.photoBand),
      whyAgentEyebrow: doc.whyAgentEyebrow ?? fb.whyAgentEyebrow,
      whyAgentHeadline: doc.whyAgentHeadline ?? fb.whyAgentHeadline,
      whyAgentItems: doc.whyAgentItems?.length ? doc.whyAgentItems : fb.whyAgentItems,
      processEyebrow: doc.processEyebrow ?? fb.processEyebrow,
      processHeadline: doc.processHeadline ?? fb.processHeadline,
      processSteps: doc.processSteps?.length ? doc.processSteps : fb.processSteps,
      buildersEyebrow: doc.buildersEyebrow ?? fb.buildersEyebrow,
      buildersHeadline: doc.buildersHeadline ?? fb.buildersHeadline,
      builders: doc.builders?.length ? doc.builders : fb.builders,
      areasEyebrow: doc.areasEyebrow ?? fb.areasEyebrow,
      areasHeadline: doc.areasHeadline ?? fb.areasHeadline,
      infillEyebrow: doc.infillEyebrow ?? fb.infillEyebrow,
      infillBody: doc.infillBody ?? fb.infillBody,
      faqEyebrow: doc.faqEyebrow ?? fb.faqEyebrow,
      faqHeadline: doc.faqHeadline ?? fb.faqHeadline,
      faq: doc.faq?.length ? doc.faq : fb.faq,
      ctaHeadline: doc.ctaHeadline ?? fb.ctaHeadline,
      ctaBody: doc.ctaBody ?? fb.ctaBody,
      ctaButtonLabel: doc.ctaButtonLabel ?? fb.ctaButtonLabel,
      ctaSideEyebrow: doc.ctaSideEyebrow ?? fb.ctaSideEyebrow,
      ctaSideHeadline: doc.ctaSideHeadline ?? fb.ctaSideHeadline,
      ctaSideBody: doc.ctaSideBody ?? fb.ctaSideBody,
      ctaSideButtonLabel: doc.ctaSideButtonLabel ?? fb.ctaSideButtonLabel,
    };
    return {
      data,
      seo: {
        title: doc.seoTitle ?? undefined,
        description: doc.seoDescription ?? undefined,
      },
    };
  } catch {
    return { data: newConstructionFallback, seo: {} };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage();
  return {
    title: seo.title || "New Construction",
    description:
      seo.description ||
      "Expert guidance on new construction homes in Orlando. Nicole Mickle helps you select builders, negotiate upgrades, and navigate the build process.",
    alternates: { canonical: "/new-construction" },
  };
}

export default async function NewConstructionPage() {
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
      <NewConstructionClient data={data} />
    </>
  );
}
