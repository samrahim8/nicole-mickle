import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { originCities } from "@/lib/relocating-from";
import { neighborhoods } from "@/lib/neighborhoods";

export function generateStaticParams() {
  return originCities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = originCities.find((c) => c.slug === slug);
  if (!city) return {};
  return {
    title: `Moving to Orlando from ${city.name} - Relocation Guide`,
    description: `Everything you need to know about relocating from ${city.name} to Orlando. Cost of living comparison, best neighborhoods, tax savings, and expert guidance from a 30-year local specialist.`,
  };
}

export default async function RelocatingFromPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = originCities.find((c) => c.slug === slug);
  if (!city) notFound();

  const recommended = city.topNeighborhoods
    .map((s) => neighborhoods.find((n) => n.slug === s))
    .filter(Boolean);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.commonQuestions.map((q) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: { "@type": "Answer", text: q.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-44 lg:pb-24">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <Link
            href="/relocating"
            className="text-[12px] tracking-wide text-neutral-400 hover:text-charcoal transition-colors duration-300 mb-8 inline-flex items-center gap-2 py-2"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M13 8H3M7 4l-4 4 4 4" />
            </svg>
            Relocating to Orlando
          </Link>
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-4">
                Relocation Guide
              </p>
              <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-charcoal">
                Moving to Orlando
                <br />
                <span className="italic">from {city.name}</span>
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-relaxed">
                {city.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost + Weather comparison */}
      <section className="py-20 lg:py-44 bg-neutral-50">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
                Cost of Living
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-charcoal mb-6">
                {city.name} vs. Orlando
              </h2>
              <p className="text-[16px] sm:text-[14px] text-neutral-500 leading-[1.8]">
                {city.costComparison}
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
                Weather
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-charcoal mb-6">
                What to expect
              </h2>
              <p className="text-[16px] sm:text-[14px] text-neutral-500 leading-[1.8]">
                {city.weatherComparison}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Orlando */}
      <section className="py-20 lg:py-44">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
                Why Orlando
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-charcoal">
                Why {city.name} residents choose Orlando
              </h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <div className="space-y-6">
                {city.whyOrlando.map((reason, i) => (
                  <div key={reason} className="flex gap-5 items-start border-b border-neutral-100 pb-6">
                    <span className="text-[11px] tracking-[0.15em] text-[#1B3A2D]/40 font-medium shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-relaxed">
                      {reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Neighborhoods */}
      <section className="py-20 lg:py-44 bg-[#1B3A2D] text-white">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/40 mb-5">
            Recommended For You
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.15] tracking-[-0.02em] text-white mb-16 lg:mb-24">
            Best neighborhoods for
            <span className="italic"> {city.name} transplants</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-[1px] bg-white/10">
            {recommended.map((n) => (
              <Link
                key={n!.slug}
                href={`/neighborhoods/${n!.slug}`}
                className="group block bg-[#1B3A2D] p-8 lg:p-10 hover:bg-[#234B39] transition-colors duration-500"
              >
                <h3 className="font-[family-name:var(--font-playfair)] text-xl text-white mb-3">
                  {n!.name}
                </h3>
                <p className="text-[15px] sm:text-[13px] text-white/50 leading-relaxed mb-4">
                  {n!.tagline}
                </p>
                <div className="flex flex-wrap gap-x-4 text-[10px] tracking-[0.15em] uppercase text-white/30 mb-4">
                  {n!.lifestyleTags.slice(0, 3).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-[12px] text-white/40">{n!.priceRange}</span>
                  <svg
                    width="14" height="14" viewBox="0 0 16 16" fill="none"
                    stroke="currentColor" strokeWidth="1.5"
                    className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-44 bg-neutral-50">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
            Common Questions
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-charcoal max-w-xl mb-16 lg:mb-24">
            Moving from {city.name} to Orlando
          </h2>
          <div className="space-y-0">
            {city.commonQuestions.map((faq) => (
              <div key={faq.q} className="border-t border-neutral-200 py-8 lg:py-10">
                <h3 className="font-medium text-charcoal mb-3">{faq.q}</h3>
                <p className="text-[16px] sm:text-[14px] text-neutral-500 leading-[1.8] max-w-3xl">
                  {faq.a}
                </p>
              </div>
            ))}
            <div className="border-t border-neutral-200" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-44">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-4">
              Moving from {city.name}?
            </h2>
            <p className="text-[16px] sm:text-[15px] text-neutral-500 mb-10">
              I&apos;ve helped dozens of {city.name} families make the move to Orlando.
              Let&apos;s find the right neighborhood for your lifestyle and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-[15px] sm:text-[13px] tracking-wide font-medium text-[#1B3A2D] border-b border-[#1B3A2D] pb-0.5 hover:border-[#234B39] hover:text-[#234B39] transition-all duration-300"
              >
                Schedule a consultation
                <svg
                  width="14" height="14" viewBox="0 0 16 16" fill="none"
                  stroke="currentColor" strokeWidth="1.5"
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
              <span className="text-neutral-200 hidden sm:block">|</span>
              <Link
                href="/quiz"
                className="text-[15px] sm:text-[13px] tracking-wide text-neutral-400 hover:text-charcoal transition-colors duration-300"
              >
                Take the neighborhood quiz
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
