"use client";

import Link from "next/link";
import Image from "next/image";
import { FadeIn, SlideIn, TextReveal, Stagger, StaggerChild } from "./animate";
import { neighborhoods } from "@/lib/neighborhoods";

export type NewConstructionPageData = {
  heroEyebrow: string;
  heroHeadlineLine1: string;
  heroHeadlineLine2: string;
  heroBody: string;
  heroPrimaryCtaLabel: string;
  heroSecondaryCtaLabel: string;
  heroStats: { number: string; label: string }[];
  photoBand: { src: string; alt: string }[];
  whyAgentEyebrow: string;
  whyAgentHeadline: string;
  whyAgentItems: { title: string; description: string }[];
  processEyebrow: string;
  processHeadline: string;
  processSteps: { number: string; title: string; description: string }[];
  buildersEyebrow: string;
  buildersHeadline: string;
  builders: string[];
  areasEyebrow: string;
  areasHeadline: string;
  infillEyebrow: string;
  infillBody: string;
  faqEyebrow: string;
  faqHeadline: string;
  faq: { question: string; answer: string }[];
  ctaHeadline: string;
  ctaBody: string;
  ctaButtonLabel: string;
  ctaSideEyebrow: string;
  ctaSideHeadline: string;
  ctaSideBody: string;
  ctaSideButtonLabel: string;
};

const activeAreas = neighborhoods.filter((n) => n.newConstruction.builders.length > 0);

export function NewConstructionClient({ data }: { data: NewConstructionPageData }) {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 sm:pt-32 pb-20 lg:pt-44 lg:pb-32">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-end">
            <div className="lg:col-span-7">
              <FadeIn>
                <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-6">
                  {data.heroEyebrow}
                </p>
              </FadeIn>
              <TextReveal>
                <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-charcoal">
                  {data.heroHeadlineLine1}
                </h1>
              </TextReveal>
              <TextReveal delay={0.1}>
                <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-charcoal italic">
                  {data.heroHeadlineLine2}
                </h1>
              </TextReveal>
              <FadeIn delay={0.4}>
                <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8] max-w-lg mt-8 mb-10">
                  {data.heroBody}
                </p>
                <div className="flex gap-6 items-center">
                  <Link
                    href="/contact"
                    className="group text-[13px] tracking-wide font-medium text-forest flex items-center gap-2 border-b border-forest pb-0.5 hover:border-forest-light hover:text-forest-light transition-all duration-300"
                  >
                    {data.heroPrimaryCtaLabel}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:translate-x-1 transition-transform duration-300">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </Link>
                  <span className="text-neutral-200 hidden sm:block">|</span>
                  <a
                    href="https://iorlandorealestate.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] tracking-wide text-neutral-400 hover:text-charcoal transition-colors duration-300"
                  >
                    {data.heroSecondaryCtaLabel}
                  </a>
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

      {/* Photo band */}
      <section className="py-0">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-1">
          {data.photoBand.map((photo, i) => (
            <FadeIn key={photo.src} delay={i * 0.1}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={photo.src} alt={photo.alt} fill sizes="33vw" className="object-cover" />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Why Use an Agent */}
      <section className="py-20 lg:py-32 bg-forest text-white">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4">
              <FadeIn>
                <p className="text-[10px] tracking-[0.35em] uppercase text-white/40 mb-5">
                  {data.whyAgentEyebrow}
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-white">
                  {data.whyAgentHeadline}
                </h2>
              </FadeIn>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6" staggerDelay={0.1}>
                {data.whyAgentItems.map((item) => (
                  <StaggerChild key={item.title} className="flex">
                    <article className="flex flex-col h-full w-full bg-white/5 border border-white/10 p-7 lg:p-8">
                      <h3 className="text-base font-medium text-white mb-3 min-h-[2lh]">
                        {item.title}
                      </h3>
                      <p className="text-[15px] text-white/70 leading-[1.8]">
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

      {/* Process */}
      <section className="py-20 lg:py-32">
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
                  <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8]">
                    {step.description}
                  </p>
                </article>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Builders + Communities */}
      <section className="py-20 lg:py-32 bg-cream">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-20">
            <div className="lg:col-span-5">
              <SlideIn direction="left">
                <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
                  {data.buildersEyebrow}
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-charcoal mb-10">
                  {data.buildersHeadline}
                </h2>
                <Stagger className="space-y-0" staggerDelay={0.06}>
                  {data.builders.map((b, i) => (
                    <StaggerChild key={b}>
                      <div className="flex gap-5 items-center border-t border-warm-200/60 py-4">
                        <span className="text-[11px] tracking-[0.15em] text-neutral-300">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[16px] sm:text-[15px] font-medium text-charcoal">{b}</span>
                      </div>
                    </StaggerChild>
                  ))}
                  <div className="border-t border-warm-200/60" />
                </Stagger>
              </SlideIn>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <SlideIn direction="right" delay={0.15}>
                <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
                  {data.areasEyebrow}
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-charcoal mb-10">
                  {data.areasHeadline}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeAreas.map((n) => (
                    <Link
                      key={n.slug}
                      href={`/new-construction/${n.slug}`}
                      className="group block border border-warm-200/60 p-5 hover:border-forest/30 hover:bg-white transition-all duration-500"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-[family-name:var(--font-playfair)] text-base text-charcoal">
                          {n.name}
                        </h3>
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-300 group-hover:text-forest shrink-0 mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                          <path d="M4 12L12 4M12 4H6M12 4v6" />
                        </svg>
                      </div>
                      <p className="text-[12px] text-neutral-400">
                        {n.newConstruction.builders.length} builders &middot; {n.priceRange}
                      </p>
                    </Link>
                  ))}
                </div>

                <div className="mt-10 border-l-[3px] border-forest/30 pl-6 py-2">
                  <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-3">
                    {data.infillEyebrow}
                  </p>
                  <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8] max-w-2xl">
                    {data.infillBody}
                  </p>
                </div>
              </SlideIn>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-32 bg-linen">
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

      {/* CTA */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <SlideIn direction="left" className="lg:col-span-6">
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-4">
                {data.ctaHeadline}
              </h2>
              <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8] mb-8">
                {data.ctaBody}
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-[13px] tracking-wide font-medium text-forest border-b border-forest pb-0.5 hover:border-forest-light hover:text-forest-light transition-all duration-300"
              >
                {data.ctaButtonLabel}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:translate-x-1 transition-transform duration-300">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </SlideIn>

            <SlideIn direction="right" className="lg:col-span-5 lg:col-start-8">
              <div className="bg-cream border border-neutral-200 p-10 lg:p-12">
                <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-4">
                  {data.ctaSideEyebrow}
                </p>
                <h3 className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.2] text-charcoal mb-3">
                  {data.ctaSideHeadline}
                </h3>
                <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.7] mb-8">
                  {data.ctaSideBody}
                </p>
                <Link
                  href="/neighborhoods"
                  className="inline-block bg-forest text-white px-8 py-3.5 text-[13px] tracking-wide font-medium hover:bg-forest-light transition-colors duration-300"
                >
                  {data.ctaSideButtonLabel}
                </Link>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>
    </>
  );
}
