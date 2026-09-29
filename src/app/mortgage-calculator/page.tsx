import type { Metadata } from "next";
import Link from "next/link";

import { FadeIn } from "@/components/animate";
import { MortgageCalculator } from "@/components/mortgage-calculator";
import { buildMetadata, DEFAULT_OG_IMAGE } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Orlando Mortgage Calculator: Estimate Your Monthly Payment",
    description:
      "Estimate your monthly payment on an Orlando-area home, including property tax, insurance, HOA fees and PMI. A free calculator from Nicole Mickle.",
    path: "/mortgage-calculator",
    ogImage: DEFAULT_OG_IMAGE,
  });
}

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Orlando Mortgage Calculator",
  url: "https://nicolemickle.com/mortgage-calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  provider: { "@id": "https://nicolemickle.com/#business" },
};

export default function MortgageCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="pt-32 pb-24 lg:pt-44 lg:pb-32">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-6">
              Tools
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.1] tracking-[-0.02em] text-charcoal mb-5 max-w-3xl">
              Mortgage calculator
            </h1>
            <p className="text-[clamp(1.05rem,1.5vw,1.25rem)] text-neutral-500 leading-[1.6] mb-12 max-w-2xl">
              See what a home could cost each month once tax, insurance, HOA and
              mortgage insurance are in the picture. Adjust anything and the
              payment updates as you type.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <MortgageCalculator />
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-16 max-w-3xl text-[16px] leading-[1.75] text-neutral-700 space-y-5">
              <h2 className="font-[family-name:var(--font-playfair)] text-[1.75rem] tracking-[-0.015em] text-charcoal">
                Costs people forget in Central Florida
              </h2>
              <p>
                Homeowners insurance is usually higher here than in most of the
                country, and many newer communities add a CDD fee or HOA dues on
                top of the mortgage. Those two lines can move a monthly payment
                more than a quarter point on the rate, so it is worth getting
                real quotes for the specific home.
              </p>
              <p>
                Want the numbers for a specific neighborhood or builder?{" "}
                <Link
                  href="/contact"
                  className="text-forest underline underline-offset-[3px] decoration-forest/30 hover:decoration-forest transition-colors"
                >
                  Send Nicole a note
                </Link>{" "}
                and she will walk through it with you.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
