import type { Metadata } from "next";
import { QuizClient, type QuizPageData } from "@/components/quiz-client";
import { sanityFetch } from "@/sanity/live";
import { quizPageQuery } from "@/sanity/queries";
import { quizFallback } from "@/lib/quiz-fallback";

export const revalidate = 60;

type SanityQuiz = Partial<QuizPageData> & {
  seoTitle: string | null;
  seoDescription: string | null;
};

async function getQuizPage(): Promise<{
  data: QuizPageData;
  seo: { title?: string; description?: string };
}> {
  try {
    const { data: raw } = await sanityFetch({ query: quizPageQuery });
    const doc = raw as SanityQuiz | null;
    if (!doc) return { data: quizFallback, seo: {} };
    const data: QuizPageData = {
      introEyebrow: doc.introEyebrow ?? quizFallback.introEyebrow,
      introHeadingLine1: doc.introHeadingLine1 ?? quizFallback.introHeadingLine1,
      introHeadingLine2: doc.introHeadingLine2 ?? quizFallback.introHeadingLine2,
      introBody: doc.introBody ?? quizFallback.introBody,
      startButtonLabel: doc.startButtonLabel ?? quizFallback.startButtonLabel,
      resultsEyebrow: doc.resultsEyebrow ?? quizFallback.resultsEyebrow,
      resultsHeading: doc.resultsHeading ?? quizFallback.resultsHeading,
      resultsBody: doc.resultsBody ?? quizFallback.resultsBody,
      emailHeading: doc.emailHeading ?? quizFallback.emailHeading,
      emailBody: doc.emailBody ?? quizFallback.emailBody,
      emailPlaceholder: doc.emailPlaceholder ?? quizFallback.emailPlaceholder,
      successHeading: doc.successHeading ?? quizFallback.successHeading,
      successBody: doc.successBody ?? quizFallback.successBody,
    };
    return {
      data,
      seo: {
        title: doc.seoTitle ?? undefined,
        description: doc.seoDescription ?? undefined,
      },
    };
  } catch {
    return { data: quizFallback, seo: {} };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getQuizPage();
  return {
    title: seo.title || "Find Your Orlando Neighborhood",
    description:
      seo.description ||
      "Take a 2-minute quiz to find the Orlando neighborhood that fits your lifestyle, budget, and priorities. Personalized recommendations from a 30-year local expert.",
    alternates: { canonical: "/quiz" },
  };
}

export default async function QuizPage() {
  const { data } = await getQuizPage();
  return <QuizClient data={data} />;
}
