"use client";

import Link from "next/link";
import { FadeIn, SlideIn, Stagger, StaggerChild, TextReveal } from "./animate";

export type RelocatingPageData = {
  heroEyebrow: string;
  heroHeadlineLine1: string;
  heroHeadlineLine2: string;
  heroBody: string;
  heroCtaLabel: string;
  heroStats: { number: string; label: string }[];
  trustedByEyebrow: string;
  trustedByHeadline: string;
  trustedByBody: string;
  employers: string[];
  processEyebrow: string;
  processHeadline: string;
  processSteps: { number: string; title: string; description: string }[];
  whyEyebrow: string;
  whyHeadline: string;
  whyItems: { title: string; description: string }[];
  faqEyebrow: string;
  faqHeadline: string;
  faq: { question: string; answer: string }[];
  neighborhoodsEyebrow: string;
  neighborhoodsHeadline: string;
  neighborhoodsBody: string;
  neighborhoodsCtaLabel: string;
  neighborhoodsQuizEyebrow: string;
  neighborhoodsQuizHeadline: string;
  neighborhoodsQuizBody: string;
  neighborhoodsQuizCtaLabel: string;
  finalCtaHeadline: string;
  finalCtaBody: string;
  finalCtaLabel: string;
};

interface Props {
  data: RelocatingPageData;
  originCities: { name: string; slug: string }[];
}

export function RelocatingClient({ data, originCities }: Props) {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 sm:pt-32 pb-20 lg:pt-44 lg:pb-32">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7">
              <FadeIn>
                <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-6">
                  {data.heroEyebrow}
                </p>
              </FadeIn>
              <TextReveal>
                <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-charcoal">
                  {data.heroHeadlineLine1}
                  <br />
                  <span className="italic">{data.heroHeadlineLine2}</span>
                </h1>
              </TextReveal>
              <FadeIn delay={0.4}>
                <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8] mt-8 max-w-lg">
                  {data.heroBody}
                </p>
              </FadeIn>
              <FadeIn delay={0.6}>
                <div className="mt-10">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 text-[13px] tracking-wide font-medium text-forest border-b border-forest pb-0.5 hover:border-forest-light hover:text-forest-light transition-all duration-300"
                  >
                    {data.heroCtaLabel}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:translate-x-1 transition-transform duration-300">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* Proof points */}
            <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <FadeIn delay={0.5}>
                <div className="bg-forest p-8 lg:p-10 space-y-6">
                  {data.heroStats.map((stat, i) => (
                    <div
                      key={`${stat.number}-${i}`}
                      className={i < data.heroStats.length - 1 ? "border-b border-white/15 pb-6" : ""}
                    >
                      <p className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] text-white">
                        {stat.number}
                      </p>
                      <p className="text-[11px] tracking-[0.2em] uppercase text-white/50 mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Moving From */}
      <section className="border-y border-neutral-100">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 py-10 lg:py-14">
          <FadeIn>
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 shrink-0">
                Moving from
              </p>
              <div className="flex flex-wrap items-center gap-x-0 gap-y-3">
                {originCities.map((city, i) => (
                  <span key={city.slug} className="flex items-center">
                    <Link
                      href={`/relocating-from/${city.slug}`}
                      className="text-[16px] sm:text-[15px] text-charcoal hover:text-forest transition-colors duration-300"
                    >
                      {city.name}
                    </Link>
                    {i < originCities.length - 1 && (
                      <span className="w-[1px] h-4 bg-neutral-200 mx-5" />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <FadeIn className="lg:col-span-4">
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
                {data.trustedByEyebrow}
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-6">
                {data.trustedByHeadline}
              </h2>
              <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8]">
                {data.trustedByBody}
              </p>
            </FadeIn>
            <div className="lg:col-span-7 lg:col-start-6">
              <Stagger className="grid grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-8 gap-y-6" staggerDelay={0.05}>
                {data.employers.map((name) => (
                  <StaggerChild key={name}>
                    <div className="py-4 border-b border-neutral-100">
                      <p className="text-[16px] sm:text-[15px] text-charcoal font-medium">
                        {name}
                      </p>
                    </div>
                  </StaggerChild>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 lg:py-32 bg-cream">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-4">
              {data.processEyebrow}
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-charcoal max-w-xl mb-16 lg:mb-24">
              {data.processHeadline}
            </h2>
          </FadeIn>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8" staggerDelay={0.1}>
            {data.processSteps.map((step) => (
              <StaggerChild key={step.number} className="flex">
                <article className="flex flex-col h-full w-full bg-white border border-neutral-200 p-8 lg:p-10">
                  <span className="text-[11px] tracking-[0.25em] text-neutral-300 font-medium mb-6">
                    {step.number}
                  </span>
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl lg:text-2xl text-charcoal mb-4 min-h-[2lh]">
                    {step.title}
                  </h3>
                  <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-relaxed">
                    {step.description}
                  </p>
                </article>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Why Nicole */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <FadeIn>
                <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-4">
                  {data.whyEyebrow}
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.15] tracking-[-0.02em] text-charcoal">
                  {data.whyHeadline}
                </h2>
              </FadeIn>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6" staggerDelay={0.1}>
                {data.whyItems.map((item) => (
                  <StaggerChild key={item.title} className="flex">
                    <article className="flex flex-col h-full w-full bg-white border border-neutral-200 p-7 lg:p-8">
                      <h3 className="text-base font-medium text-charcoal mb-3 min-h-[2lh]">
                        {item.title}
                      </h3>
                      <p className="text-[15px] text-neutral-500 leading-relaxed">
                        {item.description}
                      </p>
                    </article>
                  </StaggerChild>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-32 bg-cream">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
              {data.faqEyebrow}
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-charcoal max-w-xl mb-16 lg:mb-24">
              {data.faqHeadline}
            </h2>
          </FadeIn>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6" staggerDelay={0.08}>
            {data.faq.map((item) => (
              <StaggerChild key={item.question} className="flex">
                <article className="flex flex-col h-full w-full bg-white border border-neutral-200 p-7 lg:p-8">
                  <h3 className="font-medium text-charcoal mb-3 min-h-[2lh]">{item.question}</h3>
                  <p className="text-[15px] text-neutral-500 leading-[1.8]">{item.answer}</p>
                </article>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Neighborhoods + Quiz */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <SlideIn direction="left" className="lg:col-span-6">
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
                {data.neighborhoodsEyebrow}
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-4">
                {data.neighborhoodsHeadline}
              </h2>
              <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8] mb-8">
                {data.neighborhoodsBody}
              </p>
              <Link
                href="/neighborhoods"
                className="group inline-flex items-center gap-2 text-[13px] tracking-wide font-medium text-forest border-b border-forest pb-0.5 hover:border-forest-light hover:text-forest-light transition-all duration-300"
              >
                {data.neighborhoodsCtaLabel}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:translate-x-1 transition-transform duration-300">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </SlideIn>

            <SlideIn direction="right" className="lg:col-span-5 lg:col-start-8">
              <div className="bg-cream border border-neutral-200 p-10 lg:p-12">
                <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-4">
                  {data.neighborhoodsQuizEyebrow}
                </p>
                <h3 className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.2] text-charcoal mb-3">
                  {data.neighborhoodsQuizHeadline}
                </h3>
                <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.7] mb-8">
                  {data.neighborhoodsQuizBody}
                </p>
                <Link
                  href="/quiz"
                  className="inline-block bg-forest text-white px-8 py-3.5 text-[13px] tracking-wide font-medium hover:bg-forest-light transition-colors duration-300"
                >
                  {data.neighborhoodsQuizCtaLabel}
                </Link>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-32 bg-forest">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-[-0.02em] text-white mb-4">
                {data.finalCtaHeadline}
              </h2>
              <p className="text-[16px] sm:text-[15px] text-white/70 mb-10">
                {data.finalCtaBody}
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-[13px] tracking-wide font-medium text-white border-b border-white/60 pb-0.5 hover:border-white transition-all duration-300"
              >
                {data.finalCtaLabel}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:translate-x-1 transition-transform duration-300">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
