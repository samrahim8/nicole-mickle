"use client";

import Link from "next/link";
import Image from "next/image";
import { FadeIn, SlideIn, TextReveal, Stagger, StaggerChild } from "./animate";

const milestones = [
  {
    period: "1996 \u2013 2005",
    title: "Mortgage & Closings",
    description:
      "Started as a Senior Mortgage Broker at PMC Lending, handling refinancing and underwriting for FHA and conventional loans. Simultaneously founded Statewide Closers, a mobile notary closing company that grew to cover all Florida counties.",
  },
  {
    period: "1996 \u2013 2019",
    title: "APAT Settlement Services",
    description:
      "Built and ran a nationwide mobile title closing company for 23 years, coordinating closings for mortgage brokers, title companies, and real estate brokerages across the country \u2014 including London, England and Puerto Rico.",
  },
  {
    period: "2012 \u2013 2020",
    title: "Real Estate Sales",
    description:
      "Transitioned to residential real estate, working with Reliance Realty, Olde Town Brokers, and Mainframe Real Estate. Specialized in listings, short sales, investor transactions, and built a global network through Instagram and social media.",
  },
  {
    period: "2020 \u2013 Present",
    title: "Relocation & New Construction",
    description:
      "Now with Olympus Executive Realty, focused on relocation and new construction throughout Central Florida. Also founded Florida Homes and Living, a lifestyle blog covering interior design, travel, and Florida living.",
  },
];

const credentials = [
  "Realtor at Olympus Executive Realty",
  "B.S. in Economics, Florida A&M University",
  "Certified International Property Specialist",
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
      <section className="pt-32 pb-16 lg:pt-44 lg:pb-24">
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
                <p className="text-[15px] text-neutral-500 leading-[1.75] mb-6">
                  I grew up in Central Florida. I&apos;ve been in the real estate
                  industry since 1996 -- as a mortgage broker, a nationwide closing
                  company owner, a transaction coordinator, and now a realtor. I
                  didn&apos;t just learn this business from a textbook. I learned
                  it from the inside out.
                </p>
                <p className="text-[15px] text-neutral-500 leading-[1.75] mb-6">
                  For 23 years I ran APAT Real Estate Settlement Services,
                  coordinating closings nationwide. That background gave me an
                  understanding of the transaction process that most agents simply
                  don&apos;t have. Today I&apos;m with Olympus Executive Realty,
                  specializing in relocation and new construction throughout
                  Central Florida.
                </p>
                <p className="text-[15px] text-neutral-500 leading-[1.75]">
                  My Economics degree from Florida A&amp;M gave me an analytical
                  foundation, but what really drives the work is a genuine love
                  for researching communities -- understanding their history, how
                  they&apos;ve evolved, and what makes each one distinct. That
                  curiosity is the nerdy backend behind every neighborhood guide
                  on this site.
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
              Built on experience, not shortcuts
            </h2>
          </FadeIn>

          <Stagger className="space-y-0" staggerDelay={0.1}>
            {milestones.map((m) => (
              <StaggerChild key={m.title}>
                <div className="grid lg:grid-cols-12 gap-6 py-10 lg:py-14 border-t border-white/15">
                  <span className="lg:col-span-2 text-[11px] tracking-[0.2em] uppercase text-white/40 font-medium">
                    {m.period}
                  </span>
                  <h3 className="lg:col-span-3 font-[family-name:var(--font-playfair)] text-xl lg:text-2xl text-white">
                    {m.title}
                  </h3>
                  <p className="lg:col-span-6 text-[15px] text-white/70 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </StaggerChild>
            ))}
            <div className="border-t border-white/15" />
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
              <Stagger className="space-y-4" staggerDelay={0.06}>
                {credentials.map((cred) => (
                  <StaggerChild key={cred}>
                    <div className="flex items-center gap-4 py-4 border-b border-neutral-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 shrink-0" />
                      <span className="text-[15px] text-neutral-600">{cred}</span>
                    </div>
                  </StaggerChild>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-44 bg-cream">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-4">
                Let&apos;s work together
              </h2>
              <p className="text-[15px] text-neutral-500 mb-10">
                Whether you&apos;re moving to Orlando or building your next home,
                I&apos;d love to help you get it right.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-[13px] tracking-wide font-medium text-forest border-b border-forest pb-0.5 hover:border-forest-light hover:text-forest-light transition-all duration-300"
              >
                Get in touch
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
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
