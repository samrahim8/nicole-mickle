"use client";

import Link from "next/link";
import Image from "next/image";
import { FadeIn, SlideIn, TextReveal, Stagger, StaggerChild } from "./animate";
import { neighborhoods } from "@/lib/neighborhoods";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We talk about what you want in a home, your budget, your timeline, and which communities fit your lifestyle. I'll tell you which builders I trust and which ones I don't.",
  },
  {
    number: "02",
    title: "Community Tours",
    description:
      "I take you through the model homes and communities that match your criteria. I know the sales teams, the lot availability, and the incentives they're not advertising.",
  },
  {
    number: "03",
    title: "Contract & Negotiation",
    description:
      "I provide strategic guidance as you review the builder's contract, ensuring you have clarity around the terms and how they apply to your purchase. I also advocate for you in securing available incentives, price reductions, including closing cost contributions, upgrade opportunities, and lot considerations. My compensation is arranged directly with the builder, in alignment with customary real estate practices.",
  },
  {
    number: "04",
    title: "Build & Close",
    description:
      "I monitor the build timeline, attend key inspections, and make sure everything is right before you sign. When timelines shift, and they do, I keep you informed and hold the builder accountable.",
  },
];

const builders = [
  "Toll Brothers", "Taylor Morrison", "Meritage Homes", "Pulte Homes",
  "Lennar", "Ashton Woods", "M/I Homes", "Dream Finders Homes",
  "David Weekley", "Khovanian", "Mattamy", "ABD Development", "Del Webb",
];

const whyAgent = [
  {
    title: "Builder pricing includes buyer representation",
    description: "Builder pricing is designed to include buyer representation. The difference is whether you choose to have an experienced advocate protecting your interests and guiding your decisions throughout the process.",
  },
  {
    title: "No surprises on compensation",
    description: "Buyer agent compensation is negotiated and documented in writing upfront, per current real estate rules. With most builders, that compensation is structured into the standard transaction. We confirm the terms before you sign anything, so you always know where you stand.",
  },
  {
    title: "I know what's negotiable",
    description: "Builders rarely lower the base price, but there's often room on closing cost credits, upgrade packages, lot premiums, and rate buydowns. The best leverage comes during pre-construction and community closeout phases.",
  },
  {
    title: "I monitor the build",
    description: "Most production homes take 6-12 months. Permitting, weather, and supply chain issues cause delays. I track the schedule, attend key inspections, and hold the builder accountable when timelines shift.",
  },
];

const activeAreas = neighborhoods
  .filter((n) => n.newConstruction.builders.length > 0);

export function NewConstructionClient() {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 sm:pt-32 pb-20 lg:pt-44 lg:pb-32">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-end">
            <div className="lg:col-span-7">
              <FadeIn>
                <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-6">
                  New Construction
                </p>
              </FadeIn>
              <TextReveal>
                <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-charcoal">
                  Building new
                </h1>
              </TextReveal>
              <TextReveal delay={0.1}>
                <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-charcoal italic">
                  in Orlando
                </h1>
              </TextReveal>
              <FadeIn delay={0.4}>
                <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8] max-w-lg mt-8 mb-10">
                  From choosing the right builder and community to negotiating
                  upgrades and monitoring the build, I guide you through every step
                  of the new construction process.
                </p>
                <div className="flex gap-6 items-center">
                  <Link
                    href="/contact"
                    className="group text-[13px] tracking-wide font-medium text-forest flex items-center gap-2 border-b border-forest pb-0.5 hover:border-forest-light hover:text-forest-light transition-all duration-300"
                  >
                    Discuss your build
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
                    Search homes
                  </a>
                </div>
              </FadeIn>
            </div>

            {/* Proof points */}
            <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <FadeIn delay={0.5}>
                <div className="bg-forest p-8 lg:p-10 space-y-6">
                  <div className="border-b border-white/15 pb-6">
                    <p className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] text-white">
                      200+
                    </p>
                    <p className="text-[11px] tracking-[0.2em] uppercase text-white/50 mt-1">
                      Active communities
                    </p>
                  </div>
                  <div className="border-b border-white/15 pb-6">
                    <p className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] text-white">
                      30+
                    </p>
                    <p className="text-[11px] tracking-[0.2em] uppercase text-white/50 mt-1">
                      Active builders
                    </p>
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] text-white">
                      0% state tax
                    </p>
                    <p className="text-[11px] tracking-[0.2em] uppercase text-white/50 mt-1">
                      No Florida income tax
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Photo band */}
      <section className="py-0">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-1">
          <FadeIn>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src="/images/new-construction/windermere-community.jpg" alt="Windermere community lake dock" fill sizes="33vw" className="object-cover" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src="/images/new-construction/clubhouse.jpg" alt="Community clubhouse" fill sizes="33vw" className="object-cover" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src="/images/new-construction/watermark-entry.jpg" alt="Watermark community entrance" fill sizes="33vw" className="object-cover" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why Use an Agent */}
      <section className="py-20 lg:py-32 bg-forest text-white">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4">
              <FadeIn>
                <p className="text-[10px] tracking-[0.35em] uppercase text-white/40 mb-5">
                  Why You Need Your Own Agent
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-white">
                  The value of your own representation
                </h2>
              </FadeIn>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Stagger className="space-y-10" staggerDelay={0.1}>
                {whyAgent.map((item) => (
                  <StaggerChild key={item.title}>
                    <div className="border-l-[3px] border-white/20 pl-8">
                      <h3 className="text-base font-medium text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[16px] sm:text-[15px] text-white/60 leading-[1.8]">
                        {item.description}
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
      <section className="py-20 lg:py-32">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-4">
              How It Works
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-charcoal max-w-xl mb-16 lg:mb-24">
              From first conversation to move-in day
            </h2>
          </FadeIn>

          <Stagger className="space-y-0" staggerDelay={0.1}>
            {steps.map((step) => (
              <StaggerChild key={step.number}>
                <div className="grid lg:grid-cols-12 gap-6 py-10 lg:py-14 border-t border-neutral-200/60">
                  <span className="lg:col-span-1 text-[11px] tracking-[0.2em] text-neutral-300 font-medium">
                    {step.number}
                  </span>
                  <h3 className="lg:col-span-3 font-[family-name:var(--font-playfair)] text-xl lg:text-2xl text-charcoal">
                    {step.title}
                  </h3>
                  <p className="lg:col-span-7 text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8]">
                    {step.description}
                  </p>
                </div>
              </StaggerChild>
            ))}
            <div className="border-t border-neutral-200/60" />
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
                  Builder Relationships
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-charcoal mb-10">
                  Orlando&apos;s top national builders
                </h2>
                <Stagger className="space-y-0" staggerDelay={0.06}>
                  {builders.map((b, i) => (
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
                  Where to Build
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-charcoal mb-10">
                  Active new construction areas
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
                    Urban Infill &amp; Custom
                  </p>
                  <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8] max-w-2xl">
                    Beyond the big master-planned communities, new builds also pop up inside Orlando&apos;s established city neighborhoods. College Park is the standout, where David Weekley and a handful of smaller custom builders are placing new homes on infill lots throughout the area. These opportunities are limited and rarely listed publicly &ndash; if a walkable in-town address matters to you, ask and I&apos;ll source what&apos;s currently available.
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
              Frequently Asked
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-charcoal max-w-xl mb-16 lg:mb-24">
              New construction questions answered
            </h2>
          </FadeIn>
          <Stagger className="space-y-0" staggerDelay={0.08}>
            <StaggerChild>
              <div className="border-t border-warm-200/60 py-8 lg:py-10">
                <h3 className="font-medium text-charcoal mb-3">Do I need my own realtor when buying new construction?</h3>
                <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8] max-w-3xl">
                  I offer a high level of representation throughout the new construction process, guiding you through the builder&apos;s contract, advising on key decisions, and advocating for available incentives such as closing cost contributions, upgrade opportunities, and lot considerations. My compensation is handled directly with the builder, in alignment with customary real estate practices.
                </p>
              </div>
            </StaggerChild>
            <StaggerChild>
              <div className="border-t border-warm-200/60 py-8 lg:py-10">
                <h3 className="font-medium text-charcoal mb-3">How long does it take to build a new home in Orlando?</h3>
                <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8] max-w-3xl">
                  Most production homes from national builders take six to twelve months from contract to closing. Timelines can shift due to permitting, weather, or supply chain factors. I monitor the build schedule and keep you informed at every stage.
                </p>
              </div>
            </StaggerChild>
            <StaggerChild>
              <div className="border-t border-warm-200/60 py-8 lg:py-10">
                <h3 className="font-medium text-charcoal mb-3">What upgrades are worth the investment?</h3>
                <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8] max-w-3xl">
                  Spend on the things you can&apos;t change later. Ceiling height, electrical and plumbing rough-ins, structural options, and the floor plan choices that affect resale belong on the contract. Cosmetic finishes are different. Paint, fixtures, and backsplashes can almost always be done better and cheaper after closing.
                </p>
              </div>
            </StaggerChild>
            <StaggerChild>
              <div className="border-t border-warm-200/60 py-8 lg:py-10">
                <h3 className="font-medium text-charcoal mb-3">Can I negotiate the price on a new construction home?</h3>
                <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8] max-w-3xl">
                  Yes, to an extent. Negotiability often depends on the builder&apos;s inventory levels and overall demand within the community. While builders typically avoid reducing base prices to protect future comparable sales, there is often opportunity to secure value through closing cost contributions, upgrade packages, lot premiums, and interest rate buydowns offered through the builder&apos;s preferred lender.
                </p>
              </div>
            </StaggerChild>
            <div className="border-t border-warm-200/60" />
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <SlideIn direction="left" className="lg:col-span-6">
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-4">
                Let&apos;s walk a community together
              </h2>
              <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8] mb-8">
                The fastest way to know if new construction is right for you is
                to see it in person. I&apos;ll meet you at the models, walk the
                lots, and tell you what to look for before you sign anything.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-[13px] tracking-wide font-medium text-forest border-b border-forest pb-0.5 hover:border-forest-light hover:text-forest-light transition-all duration-300"
              >
                Schedule a walkthrough
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:translate-x-1 transition-transform duration-300">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </SlideIn>

            <SlideIn direction="right" className="lg:col-span-5 lg:col-start-8">
              <div className="bg-cream border border-neutral-200 p-10 lg:p-12">
                <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-4">
                  Explore Communities
                </p>
                <h3 className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.2] text-charcoal mb-3">
                  Browse by neighborhood
                </h3>
                <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.7] mb-8">
                  See which builders are active, what&apos;s available, and what
                  it costs in each Orlando neighborhood.
                </p>
                <Link
                  href="/neighborhoods"
                  className="inline-block bg-forest text-white px-8 py-3.5 text-[13px] tracking-wide font-medium hover:bg-forest-light transition-colors duration-300"
                >
                  View neighborhoods
                </Link>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>
    </>
  );
}
