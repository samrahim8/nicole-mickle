"use client";

import Link from "next/link";
import Image from "next/image";
import { FadeIn, SlideIn, TextReveal, Stagger, StaggerChild } from "./animate";

const milestones = [
  {
    period: "2014 \u2013 2026",
    title: "Relocation & New Construction",
    description:
      "Focused on relocation and new construction throughout Central Florida. Also founded Florida Homes and Living, a lifestyle blog covering interior design, travel, and Florida living.",
  },
  {
    period: "2012 \u2013 2014",
    title: "Real Estate Sales",
    description:
      "Started at Reliance Realty as a transaction coordinator for an RE attorney/broker, then became a listing agent negotiating short sales. Developed hedge fund and investor relationships, closing 200+ short sales in two years. Pivoted to Instagram and social media marketing, building a global relocation network.",
  },
  {
    period: "1996 \u2013 2019",
    title: "APAT Settlement Services",
    description:
      "Built and ran a nationwide mobile title closing company for 23 years, coordinating closings for mortgage brokers, title companies, and real estate brokerages across the country, including London, England and Puerto Rico.",
  },
  {
    period: "1996 \u2013 2005",
    title: "Mortgage & Closings",
    description:
      "Senior Mortgage Broker at PMC Lending, handling refinancing and conventional loans with a specialty in bankruptcy. Founded Statewide Closers, a mobile notary closing company that grew to cover all Florida counties and eventually expanded nationwide as APAT Settlement Services.",
  },
];

const credentials = [
  "Licensed Realtor, Central Florida",
  "B.S. in Economics, Florida A&M University",
  "Relocation & New Construction Specialist",
  "Former Senior Mortgage Broker",
  "23 Years in Title & Closings Nationwide",
  "Founder, Florida Homes and Living",
  "Top 125 RE Instagram Influencers (Feedspot, 2019)",
  "Social Media Marketer of the Year (Orlando Real Producers, 2019)",
  "Central Florida Native",
];

export function AboutClient() {
  return (
    <>
      {/* Hero - Editorial split */}
      <section className="pt-20 sm:pt-32 pb-16 lg:pt-44 lg:pb-24">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="lg:col-span-5 relative pl-8 lg:pl-10">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-forest" />
              <FadeIn>
                <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-6">
                  About
                </p>
              </FadeIn>
              <TextReveal delay={0.1}>
                <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-charcoal">
                  Three decades
                </h1>
              </TextReveal>
              <TextReveal delay={0.2}>
                <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-charcoal italic">
                  of Orlando
                </h1>
              </TextReveal>

              <FadeIn delay={0.5} className="mt-10">
                <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.75] mb-6">
                  I grew up in Central Florida. I&apos;ve been in the real estate
                  industry since 1996, as a mortgage broker, a nationwide closing
                  company owner, a transaction coordinator, and now a realtor. I
                  didn&apos;t just learn this business from a textbook. I learned
                  it from the inside out.
                </p>
                <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.75] mb-6">
                  For 23 years I ran APAT Real Estate Settlement Services,
                  coordinating closings nationwide. That background gave me a
                  deep understanding of the transaction process from every angle.
                  Today I specialize in relocation and new construction
                  throughout Central Florida.
                </p>
                <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.75]">
                  My Economics degree from Florida A&amp;M gave me an analytical
                  foundation, but what really drives the work is a genuine love
                  for researching communities and understanding their history,
                  how they&apos;ve evolved, and what makes each one distinct.
                  That curiosity is the nerdy backend behind every neighborhood
                  guide on this site.
                </p>
              </FadeIn>
            </div>

            {/* Photo */}
            <SlideIn direction="right" delay={0.3} className="lg:col-span-6 lg:col-start-7">
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src="/images/nicole.jpg"
                  alt="Nicole Mickle"
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Journey - Timeline style - Deep forest green */}
      <section className="py-20 lg:py-44 bg-forest">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.3em] uppercase text-white/50 mb-4">
              The Path Here
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-white max-w-lg mb-16 lg:mb-24">
              From the closing table forward
            </h2>
          </FadeIn>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8" staggerDelay={0.1}>
            {milestones.map((m) => (
              <StaggerChild key={m.title} className="flex">
                <article className="flex flex-col h-full w-full bg-white/5 border border-white/10 p-8 lg:p-10">
                  <span className="text-[11px] tracking-[0.25em] uppercase text-white/40 font-medium mb-5">
                    {m.period}
                  </span>
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl lg:text-2xl text-white mb-4">
                    {m.title}
                  </h3>
                  <p className="text-[15px] text-white/70 leading-[1.8]">
                    {m.description}
                  </p>
                </article>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20 lg:py-44">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <FadeIn>
                <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-4">
                  Credentials
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.15] tracking-[-0.02em] text-charcoal">
                  Professional background
                </h2>
              </FadeIn>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4" staggerDelay={0.05}>
                {credentials.map((cred) => (
                  <StaggerChild key={cred} className="flex">
                    <div className="flex items-start gap-3 bg-white border border-neutral-200 px-5 py-4 w-full h-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-forest shrink-0 mt-[7px]" />
                      <span className="text-[14px] text-charcoal leading-relaxed">{cred}</span>
                    </div>
                  </StaggerChild>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* Discretion */}
      <section className="py-20 lg:py-44 border-t border-neutral-100">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <FadeIn className="lg:col-span-4 relative pl-8 lg:pl-10">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-forest" />
              <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-4">
                Discretion
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.15] tracking-[-0.02em] text-charcoal">
                Trusted with high-profile moves
              </h2>
            </FadeIn>
            <div className="lg:col-span-7 lg:col-start-6">
              <FadeIn delay={0.1}>
                <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.85] mb-6">
                  A portion of my clients are public figures, athletes,
                  entertainers, and executives whose moves require a higher
                  level of privacy. That work stays quiet by design.
                </p>
                <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.85]">
                  Past clients have included Olympic and professional
                  athletes who&apos;ve trusted me with discreet relocations.
                  Whether you&apos;re a first-time buyer or someone who
                  needs the transaction handled with more care than most,
                  the process looks the same: research-driven, honest, and
                  on your terms.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
