import { neighborhoods } from "@/lib/neighborhoods";
import { HomeClient, type HomePageData } from "@/components/home-client";
import { sanityFetch } from "@/sanity/live";
import { homePageQuery } from "@/sanity/queries";
import { homeFallback } from "@/lib/home-fallback";

export const revalidate = 60;

type SanityHome = Partial<HomePageData> & {
  seoTitle: string | null;
  seoDescription: string | null;
};

async function getPage(): Promise<HomePageData> {
  try {
    const { data: raw } = await sanityFetch({ query: homePageQuery });
    const doc = raw as SanityHome | null;
    if (!doc) return homeFallback;
    const fb = homeFallback;
    return {
      heroHeadlineLine1: doc.heroHeadlineLine1 ?? fb.heroHeadlineLine1,
      heroHeadlineLine2: doc.heroHeadlineLine2 ?? fb.heroHeadlineLine2,
      heroHeadlineLine3: doc.heroHeadlineLine3 ?? fb.heroHeadlineLine3,
      heroTagline: doc.heroTagline ?? fb.heroTagline,
      heroPrimaryCtaLabel: doc.heroPrimaryCtaLabel ?? fb.heroPrimaryCtaLabel,
      heroSecondaryCtaLabel: doc.heroSecondaryCtaLabel ?? fb.heroSecondaryCtaLabel,
      positioningText: doc.positioningText ?? fb.positioningText,
      aboutEyebrow: doc.aboutEyebrow ?? fb.aboutEyebrow,
      aboutHeadlineLine1: doc.aboutHeadlineLine1 ?? fb.aboutHeadlineLine1,
      aboutHeadlineLine2: doc.aboutHeadlineLine2 ?? fb.aboutHeadlineLine2,
      aboutParagraphs: doc.aboutParagraphs?.length ? doc.aboutParagraphs : fb.aboutParagraphs,
      aboutCtaLabel: doc.aboutCtaLabel ?? fb.aboutCtaLabel,
      aboutStats: doc.aboutStats?.length ? doc.aboutStats : fb.aboutStats,
      audiencesHeadline: doc.audiencesHeadline ?? fb.audiencesHeadline,
      audiences: doc.audiences?.length ? doc.audiences : fb.audiences,
      neighborhoodsEyebrow: doc.neighborhoodsEyebrow ?? fb.neighborhoodsEyebrow,
      neighborhoodsHeadlineLine1: doc.neighborhoodsHeadlineLine1 ?? fb.neighborhoodsHeadlineLine1,
      neighborhoodsHeadlineLine2: doc.neighborhoodsHeadlineLine2 ?? fb.neighborhoodsHeadlineLine2,
      neighborhoodsViewAllLabel: doc.neighborhoodsViewAllLabel ?? fb.neighborhoodsViewAllLabel,
      testimonialsEyebrow: doc.testimonialsEyebrow ?? fb.testimonialsEyebrow,
      testimonials: doc.testimonials?.length ? doc.testimonials : fb.testimonials,
      quizCtaEyebrow: doc.quizCtaEyebrow ?? fb.quizCtaEyebrow,
      quizCtaHeadline: doc.quizCtaHeadline ?? fb.quizCtaHeadline,
      quizCtaBody: doc.quizCtaBody ?? fb.quizCtaBody,
      quizCtaLabel: doc.quizCtaLabel ?? fb.quizCtaLabel,
      asSeenInLabel: doc.asSeenInLabel ?? fb.asSeenInLabel,
      mediaLogos: doc.mediaLogos?.length ? doc.mediaLogos : fb.mediaLogos,
      recognitionLabel: doc.recognitionLabel ?? fb.recognitionLabel,
      recognitionItems: doc.recognitionItems?.length ? doc.recognitionItems : fb.recognitionItems,
    };
  } catch {
    return homeFallback;
  }
}

export default async function Home() {
  const data = await getPage();
  return <HomeClient data={data} neighborhoods={neighborhoods} />;
}
