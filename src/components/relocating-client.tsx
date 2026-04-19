"use client";

import Link from "next/link";
import { FadeIn, SlideIn, Stagger, StaggerChild, TextReveal } from "./animate";

interface Props {
  steps: { number: string; title: string; description: string }[];
  reasons: { title: string; description: string }[];
  originCities: { name: string; slug: string }[];
  employers: string[];
}

export function RelocatingClient({ steps, reasons, originCities, employers }: Props) {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-44 lg:pb-32">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7">
              <FadeIn>
                <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-6">
                  Relocation
                </p>
              </FadeIn>
              <TextReveal>
                <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-charcoal">
                  You&apos;re choosing a lifestyle,
                </h1>
              </TextReveal>
              <TextReveal delay={0.1}>
                <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-charcoal italic">
                  not just a house
                </h1>
              </TextReveal>
              <FadeIn delay={0.4}>
                <p className="text-[15px] text-neutral-500 leading-[1.8] mt-8 max-w-lg">
                  Moving to a city you don&apos;t know yet is one of the biggest
                  decisions you&apos;ll make. The neighborhood matters more than the
                  house. The commute matters more than the countertops. After 30
                  years here, I help you get those decisions right the first time.
                </p>
              </FadeIn>
              <FadeIn delay={0.6}>
                <div className="flex items-center gap-8 mt-10">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 text-[13px] tracking-wide font-medium text-forest border-b border-forest pb-0.5 hover:border-forest-light hover:text-forest-light transition-all duration-300"
                  >
                    Start a conversation
                    <svg
                      width="14" height="14" viewBox="0 0 16 16" fill="none"
                      stroke="currentColor" strokeWidth="1.5"
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </Link>
                  <Link
                    href="/quiz"
                    className="text-[13px] tracking-wide text-neutral-400 hover:text-charcoal transition-colors duration-300"
                  >
                    Take the neighborhood quiz
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* Proof points */}
            <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <FadeIn delay={0.5}>
                <div className="space-y-6">
                  <div className="border-b border-neutral-100 pb-6">
                    <p className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] text-charcoal">
                      5.0
                    </p>
                    <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 mt-1">
                      Google Rating, 26 Reviews
                    </p>
                  </div>
                  <div className="border-b border-neutral-100 pb-6">
                    <p className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] text-charcoal">
                      30 years
                    </p>
                    <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 mt-1">
                      In the Orlando market
                    </p>
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] text-charcoal">
                      0% state tax
                    </p>
                    <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 mt-1">
                      No Florida income tax
                    </p>
                  </div>
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
                      className="text-[15px] text-charcoal hover:text-forest transition-colors duration-300"
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
                Trusted By Relocating Professionals
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-6">
                Clients have included employees from
              </h2>
              <p className="text-[15px] text-neutral-500 leading-[1.8]">
                None of these were corporate referral arrangements. Each client
                found me through referrals, research, or recommendation, and
                hired me directly. That&apos;s how I prefer to work.
              </p>
            </FadeIn>
            <div className="lg:col-span-7 lg:col-start-6">
              <Stagger className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6" staggerDelay={0.05}>
                {employers.map((name) => (
                  <StaggerChild key={name}>
                    <div className="py-4 border-b border-neutral-100">
                      <p className="text-[15px] text-charcoal font-medium">
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
              The Process
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-charcoal max-w-xl mb-16 lg:mb-24">
              A clear path from first call to closing day
            </h2>
          </FadeIn>

          <Stagger className="space-y-0" staggerDelay={0.1}>
            {steps.map((step) => (
              <StaggerChild key={step.number}>
                <div className="grid lg:grid-cols-12 gap-6 py-10 lg:py-14 border-t border-warm-200/60">
                  <span className="lg:col-span-1 text-[11px] tracking-[0.2em] text-neutral-300 font-medium">
                    {step.number}
                  </span>
                  <h3 className="lg:col-span-4 font-[family-name:var(--font-playfair)] text-xl lg:text-2xl text-charcoal">
                    {step.title}
                  </h3>
                  <p className="lg:col-span-6 text-[15px] text-neutral-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </StaggerChild>
            ))}
            <div className="border-t border-warm-200/60" />
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
                  Why Work With Me
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.15] tracking-[-0.02em] text-charcoal">
                  The difference 30 years makes
                </h2>
              </FadeIn>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Stagger className="space-y-12" staggerDelay={0.1}>
                {reasons.map((reason) => (
                  <StaggerChild key={reason.title}>
                    <div className="border-l-[3px] border-forest pl-8">
                      <h3 className="text-base font-medium text-charcoal mb-2">
                        {reason.title}
                      </h3>
                      <p className="text-[15px] text-neutral-500 leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
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
              Frequently Asked
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-charcoal max-w-xl mb-16 lg:mb-24">
              Questions from relocating buyers
            </h2>
          </FadeIn>

          <Stagger className="space-y-0" staggerDelay={0.08}>
            <StaggerChild>
              <div className="border-t border-warm-200/60 py-8 lg:py-10">
                <h3 className="font-medium text-charcoal mb-3">
                  What&apos;s the best neighborhood in Orlando for families?
                </h3>
                <p className="text-[15px] text-neutral-500 leading-[1.8] max-w-3xl">
                  It depends on your priorities. Winter Park and Baldwin Park offer walkability and top-rated schools. Lake Nona is newer with excellent amenities. Windermere has larger lots and a quieter pace. I match neighborhoods to your lifestyle, commute, school preferences, and budget rather than giving a one-size-fits-all answer.
                </p>
              </div>
            </StaggerChild>
            <StaggerChild>
              <div className="border-t border-warm-200/60 py-8 lg:py-10">
                <h3 className="font-medium text-charcoal mb-3">
                  How far in advance should I start working with a realtor before relocating?
                </h3>
                <p className="text-[15px] text-neutral-500 leading-[1.8] max-w-3xl">
                  Ideally three to six months before your move date. That gives us time for a discovery call, neighborhood research, virtual tours, and at least one in-person visit before writing offers. If your timeline is shorter, I can adjust. I have helped clients close in as little as 30 days when needed.
                </p>
              </div>
            </StaggerChild>
            <StaggerChild>
              <div className="border-t border-warm-200/60 py-8 lg:py-10">
                <h3 className="font-medium text-charcoal mb-3">
                  Do I need to visit Orlando before buying a home?
                </h3>
                <p className="text-[15px] text-neutral-500 leading-[1.8] max-w-3xl">
                  Strongly recommended but not always required. I offer detailed video tours, neighborhood drive-throughs, and FaceTime walkthroughs so you can evaluate homes remotely. Many of my relocation clients narrow their list virtually, then fly in for a focused weekend of final showings before making an offer.
                </p>
              </div>
            </StaggerChild>
            <StaggerChild>
              <div className="border-t border-warm-200/60 py-8 lg:py-10">
                <h3 className="font-medium text-charcoal mb-3">
                  What&apos;s the cost of living like compared to other major cities?
                </h3>
                <p className="text-[15px] text-neutral-500 leading-[1.8] max-w-3xl">
                  Orlando is significantly more affordable than cities like New York, San Francisco, or Boston. There is no state income tax in Florida, which makes a real difference in take-home pay. Housing costs vary widely by neighborhood, but you can find quality homes in excellent school districts at price points that would be impossible in many Northeast or West Coast metros.
                </p>
              </div>
            </StaggerChild>
            <div className="border-t border-warm-200/60" />
          </Stagger>
        </div>
      </section>

      {/* Neighborhoods + Quiz */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <SlideIn direction="left" className="lg:col-span-6">
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
                Explore Neighborhoods
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-4">
                Orlando isn&apos;t one place. It&apos;s many.
              </h2>
              <p className="text-[15px] text-neutral-500 leading-[1.8] mb-8">
                Every neighborhood has a different personality, pace, and price
                point. My guides break down the lifestyle, schools, dining, and
                market for each one so you can compare before you visit.
              </p>
              <Link
                href="/neighborhoods"
                className="group inline-flex items-center gap-2 text-[13px] tracking-wide font-medium text-forest border-b border-forest pb-0.5 hover:border-forest-light hover:text-forest-light transition-all duration-300"
              >
                Browse all neighborhoods
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
                <p className="text-[15px] text-neutral-500 leading-[1.7] mb-8">
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

      {/* Final CTA */}
      <section className="py-20 lg:py-32 bg-forest">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-[-0.02em] text-white mb-4">
                Thinking about Orlando?
              </h2>
              <p className="text-[15px] text-white/70 mb-10">
                Let&apos;s start with a conversation. No pressure, no pitch. Just
                honest answers about what it&apos;s like to live here.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-[13px] tracking-wide font-medium text-white border-b border-white/60 pb-0.5 hover:border-white transition-all duration-300"
              >
                Schedule a free consultation
                <svg
                  width="14" height="14" viewBox="0 0 16 16" fill="none"
                  stroke="currentColor" strokeWidth="1.5"
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
