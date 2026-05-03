"use client";

import Link from "next/link";
import { FadeIn, SlideIn, TextReveal, Stagger, StaggerChild } from "./animate";
import type { Neighborhood } from "@/lib/neighborhoods";

interface Props {
  neighborhood: Neighborhood;
}

export function NewConstructionNeighborhoodClient({ neighborhood: n }: Props) {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-44 lg:pb-32">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <Link
              href="/new-construction"
              className="text-[12px] tracking-wide text-neutral-400 hover:text-charcoal transition-colors duration-300 mb-10 lg:mb-14 inline-flex items-center gap-2 py-2"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13 8H3M7 4l-4 4 4 4" />
              </svg>
              New Construction
            </Link>
          </FadeIn>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-end">
            <div className="lg:col-span-7">
              <FadeIn>
                <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-4">
                  New Construction Guide
                </p>
              </FadeIn>
              <TextReveal>
                <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-charcoal">
                  Building new
                </h1>
              </TextReveal>
              <TextReveal delay={0.1}>
                <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-charcoal italic">
                  in {n.name}
                </h1>
              </TextReveal>
            </div>
            <FadeIn delay={0.3} className="lg:col-span-5">
              <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8]">
                {n.newConstruction.summary}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Builders */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-20 items-start">
            <SlideIn direction="left" className="lg:col-span-4">
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
                Active Builders
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-charcoal">
                Who&apos;s building in {n.name}
              </h2>
            </SlideIn>
            <FadeIn delay={0.15} className="lg:col-span-7 lg:col-start-6">
              <div className="flex flex-wrap gap-3">
                {n.newConstruction.builders.map((b) => (
                  <span
                    key={b}
                    className="px-5 py-2.5 text-[14px] font-medium text-charcoal bg-white border border-warm-200/80 rounded-full"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Communities */}
      {n.newConstruction.communities.length > 0 && (
        <section className="py-20 lg:py-28">
          <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
            <FadeIn>
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
                Communities
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-charcoal mb-12 lg:mb-16">
                Where to look in {n.name}
              </h2>
            </FadeIn>
            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-warm-200/60" staggerDelay={0.04}>
              {n.newConstruction.communities.map((c, i) => (
                <StaggerChild key={c} className="bg-white p-6 lg:p-8">
                  <span className="text-[11px] tracking-[0.15em] text-neutral-300 block mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[16px] sm:text-[15px] font-medium text-charcoal">{c}</span>
                </StaggerChild>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* Price Points */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
              Price Points
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-16 lg:mb-24">
              What new construction costs in {n.name}
            </h2>
          </FadeIn>
          <Stagger className="grid md:grid-cols-3 gap-[1px] bg-neutral-200">
            {n.priceSegments.map((seg, i) => (
              <StaggerChild key={seg.label} className="flex bg-neutral-200">
                <article className="flex flex-col h-full w-full bg-white p-8 lg:p-10">
                  <p className="text-neutral-300 text-[13px] tracking-wide mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-500 mb-2">
                    {seg.label}
                  </p>
                  <p className="font-[family-name:var(--font-playfair)] text-[clamp(1.15rem,1.8vw,1.5rem)] text-charcoal mb-4 min-h-[2lh]">
                    {seg.range}
                  </p>
                  <p className="text-[13px] text-neutral-500 leading-relaxed line-clamp-3">
                    {seg.description}
                  </p>
                </article>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Why Use an Agent */}
      <section className="py-20 lg:py-32 bg-forest text-white">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <FadeIn className="lg:col-span-4">
              <p className="text-[10px] tracking-[0.35em] uppercase text-white/40 mb-5">
                Your Advantage
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-white">
                The value of your own representation
              </h2>
            </FadeIn>
            <div className="lg:col-span-7 lg:col-start-6">
              <SlideIn direction="right">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
                  <article className="flex flex-col h-full bg-white/5 border border-white/10 p-7 lg:p-8">
                    <h3 className="text-base font-medium text-white mb-3 min-h-[2lh]">Builder pricing includes buyer representation</h3>
                    <p className="text-[15px] text-white/70 leading-[1.8]">
                      Builder pricing is designed to include buyer representation. The difference is whether you choose to have an experienced advocate protecting your interests and guiding your decisions throughout the process.
                    </p>
                  </article>
                  <article className="flex flex-col h-full bg-white/5 border border-white/10 p-7 lg:p-8">
                    <h3 className="text-base font-medium text-white mb-3 min-h-[2lh]">No surprises on compensation</h3>
                    <p className="text-[15px] text-white/70 leading-[1.8]">
                      Buyer agent compensation is negotiated and documented in writing upfront, per current real estate rules. With most builders, that compensation is structured into the standard transaction. We confirm the terms before you sign anything.
                    </p>
                  </article>
                  <article className="flex flex-col h-full bg-white/5 border border-white/10 p-7 lg:p-8 md:col-span-2">
                    <h3 className="text-base font-medium text-white mb-3 min-h-[2lh]">I know what&apos;s negotiable</h3>
                    <p className="text-[15px] text-white/70 leading-[1.8]">
                      Closing cost credits, upgrade packages, lot premiums, rate buydowns. I track which builders are running incentives in {n.name} right now.
                    </p>
                  </article>
                </div>
              </SlideIn>
            </div>
          </div>
        </div>
      </section>

      {/* About the Area + Commute */}
      <section className="py-20 lg:py-32 bg-linen">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <SlideIn direction="left" className="lg:col-span-6">
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
                About the Area
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-charcoal mb-6">
                Living in {n.name}
              </h2>
              <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8] mb-8">
                {n.lifestyle}
              </p>
              <Link
                href={`/neighborhoods/${n.slug}`}
                className="group inline-flex items-center gap-2 text-[13px] tracking-wide font-medium text-forest border-b border-forest pb-0.5 hover:border-forest-light hover:text-forest-light transition-all duration-300"
              >
                Full {n.name} neighborhood guide
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:translate-x-1 transition-transform duration-300">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </SlideIn>

            <FadeIn className="lg:col-span-5 lg:col-start-8">
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
                Commute Times
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-charcoal mb-8">
                Getting around
              </h2>
              <div className="space-y-0">
                <div className="flex justify-between border-t border-warm-200/60 py-4 text-[16px] sm:text-[15px]">
                  <span className="text-neutral-500">Downtown Orlando</span>
                  <span className="text-charcoal font-medium">{n.commute.downtown}</span>
                </div>
                <div className="flex justify-between border-t border-warm-200/60 py-4 text-[16px] sm:text-[15px]">
                  <span className="text-neutral-500">Orlando Airport (MCO)</span>
                  <span className="text-charcoal font-medium">{n.commute.airport}</span>
                </div>
                <div className="flex justify-between border-t border-warm-200/60 py-4 text-[16px] sm:text-[15px]">
                  <span className="text-neutral-500">Disney / Attractions</span>
                  <span className="text-charcoal font-medium">{n.commute.disney}</span>
                </div>
                <div className="border-t border-warm-200/60" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <SlideIn direction="left" className="lg:col-span-6">
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-4">
                Building in {n.name}?
              </h2>
              <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8] mb-8">
                I know which builders deliver quality, which upgrades add value,
                and how to negotiate the best deal in {n.name}. Let&apos;s talk
                about your build.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-[13px] tracking-wide font-medium text-forest border-b border-forest pb-0.5 hover:border-forest-light hover:text-forest-light transition-all duration-300"
              >
                Discuss your build
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:translate-x-1 transition-transform duration-300">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </SlideIn>

            <SlideIn direction="right" className="lg:col-span-5 lg:col-start-8">
              <div className="bg-cream border border-neutral-200 p-10 lg:p-12">
                <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-4">
                  Not Sure Where to Build?
                </p>
                <h3 className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.2] text-charcoal mb-3">
                  Take the neighborhood quiz
                </h3>
                <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.7] mb-8">
                  Five questions. Two minutes. Find the right area for your
                  lifestyle, budget, and priorities.
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
