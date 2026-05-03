"use client";

import Link from "next/link";
import { FadeIn, SlideIn, TextReveal, Stagger, StaggerChild } from "./animate";
import type { OriginCity } from "@/lib/relocating-from";
import type { Neighborhood } from "@/lib/neighborhoods";

interface Props {
  city: OriginCity;
  recommended: Neighborhood[];
}

export function RelocatingFromClient({ city, recommended }: Props) {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-44 lg:pb-32">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <Link
              href="/relocating"
              className="text-[12px] tracking-wide text-neutral-400 hover:text-charcoal transition-colors duration-300 mb-10 lg:mb-14 inline-flex items-center gap-2 py-2"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13 8H3M7 4l-4 4 4 4" />
              </svg>
              Relocating to Orlando
            </Link>
          </FadeIn>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-end">
            <div className="lg:col-span-7">
              <FadeIn>
                <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-4">
                  Relocation Guide
                </p>
              </FadeIn>
              <TextReveal>
                <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-charcoal">
                  Moving to Orlando
                </h1>
              </TextReveal>
              <TextReveal delay={0.1}>
                <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-charcoal italic">
                  from {city.name}
                </h1>
              </TextReveal>
            </div>
            <FadeIn delay={0.3} className="lg:col-span-5">
              <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8]">
                {city.description}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Cost + Weather comparison */}
      <section className="py-20 lg:py-32 bg-cream">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            <SlideIn direction="left">
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
                Top Rated Schools
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-charcoal mb-6">
                Orlando Schools
              </h2>
              <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8]">
                {city.schoolComparison}
              </p>
            </SlideIn>
            <SlideIn direction="right">
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
                Weather
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-charcoal mb-6">
                What to expect
              </h2>
              <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8]">
                {city.weatherComparison}
              </p>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Why Orlando */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <FadeIn>
                <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
                  Why Orlando
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-charcoal">
                  Why {city.name} residents choose Orlando
                </h2>
              </FadeIn>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6" staggerDelay={0.08}>
                {city.whyOrlando.map((reason, i) => (
                  <StaggerChild key={reason} className="flex">
                    <article className="flex gap-5 items-start bg-white border border-neutral-200 p-6 lg:p-7 w-full">
                      <span className="text-[11px] tracking-[0.2em] text-forest/50 font-medium shrink-0 mt-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[15px] text-neutral-500 leading-[1.7]">
                        {reason}
                      </p>
                    </article>
                  </StaggerChild>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Neighborhoods */}
      <section className="py-20 lg:py-32 bg-forest text-white">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[10px] tracking-[0.35em] uppercase text-white/40 mb-5">
              Recommended For You
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.15] tracking-[-0.02em] text-white mb-16 lg:mb-24">
              Best neighborhoods for
              <span className="italic"> {city.name} transplants</span>
            </h2>
          </FadeIn>
          <Stagger className="grid md:grid-cols-3 gap-[1px] bg-white/10">
            {recommended.map((n) => (
              <StaggerChild key={n.slug}>
                <Link
                  href={`/neighborhoods/${n.slug}`}
                  className="group block bg-forest p-8 lg:p-10 hover:bg-forest-light transition-colors duration-500"
                >
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl text-white mb-3">
                    {n.name}
                  </h3>
                  <p className="text-[13px] text-white/50 leading-relaxed mb-4">
                    {n.tagline}
                  </p>
                  <div className="flex flex-wrap gap-x-4 text-[10px] tracking-[0.15em] uppercase text-white/30 mb-4">
                    {n.lifestyleTags.slice(0, 3).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="text-[12px] text-white/40">{n.priceRange}</span>
                    <svg
                      width="14" height="14" viewBox="0 0 16 16" fill="none"
                      stroke="currentColor" strokeWidth="1.5"
                      className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </div>
                </Link>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-32 bg-cream">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
              Common Questions
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-charcoal max-w-xl mb-16 lg:mb-24">
              Moving from {city.name} to Orlando
            </h2>
          </FadeIn>
          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6" staggerDelay={0.08}>
            {city.commonQuestions.map((faq) => (
              <StaggerChild key={faq.q} className="flex">
                <article className="flex flex-col h-full w-full bg-white border border-neutral-200 p-7 lg:p-8">
                  <h3 className="font-medium text-charcoal mb-3">{faq.q}</h3>
                  <p className="text-[15px] text-neutral-500 leading-[1.8]">
                    {faq.a}
                  </p>
                </article>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Quiz + CTA */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <SlideIn direction="left" className="lg:col-span-6">
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-4">
                Moving from {city.name}?
              </h2>
              <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8] mb-8">
                I&apos;ve helped dozens of {city.name} families make the move to Orlando.
                Let&apos;s find the right neighborhood for your lifestyle and budget.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-[13px] tracking-wide font-medium text-forest border-b border-forest pb-0.5 hover:border-forest-light hover:text-forest-light transition-all duration-300"
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
            </SlideIn>

            <SlideIn direction="right" className="lg:col-span-5 lg:col-start-8">
              <div className="bg-cream border border-neutral-200 p-10 lg:p-12">
                <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-4">
                  Not Sure Where to Start?
                </p>
                <h3 className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.2] text-charcoal mb-3">
                  Take the neighborhood quiz
                </h3>
                <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.7] mb-8">
                  Five questions. Two minutes. Personalized recommendations
                  based on your lifestyle and budget.
                </p>
                <Link
                  href="/quiz"
                  className="inline-block bg-forest text-white px-8 py-3.5 text-[13px] tracking-wide font-medium hover:bg-forest-light transition-colors duration-300"
                >
                  Start the quiz
                </Link>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>
    </>
  );
}
