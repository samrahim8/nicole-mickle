"use client";

import Link from "next/link";
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
      "The builder's contract is written to protect the builder. I review every line, negotiate closing cost credits, upgrade packages, and lot premiums. Having your own agent costs you nothing — the builder pays the commission either way.",
  },
  {
    number: "04",
    title: "Build & Close",
    description:
      "I monitor the build timeline, attend key inspections, and make sure everything is right before you sign. When timelines shift — and they do — I keep you informed and hold the builder accountable.",
  },
];

const builders = [
  "Toll Brothers", "Taylor Morrison", "Meritage Homes", "Pulte Homes",
  "Lennar", "Ashton Woods", "M/I Homes", "Dream Finders Homes",
];

const activeAreas = neighborhoods
  .filter((n) => n.newConstruction.builders.length > 0)
  .slice(0, 6);

export function NewConstructionClient() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-36 lg:pb-24">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="lg:col-span-6">
              <FadeIn>
                <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-6">
                  New Construction
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,5vw,4rem)] leading-[1.15] tracking-[-0.02em] text-charcoal">
                  Building new <span className="italic">in Orlando</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.4}>
                <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8] max-w-lg mt-8 mb-10">
                  From choosing the right builder and community to negotiating
                  upgrades and monitoring the build, I guide you through every step
                  of the new construction process.
                </p>
                <div className="flex gap-6 items-center">
                  <Link
                    href="/contact"
                    className="group text-[15px] sm:text-[13px] tracking-wide font-medium text-[#1B3A2D] flex items-center gap-2 border-b border-[#1B3A2D] pb-0.5 hover:border-[#234B39] hover:text-[#234B39] transition-all duration-300"
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
                    className="text-[15px] sm:text-[13px] tracking-wide text-neutral-400 hover:text-charcoal transition-colors duration-300"
                  >
                    Search homes
                  </a>
                </div>
              </FadeIn>
            </div>

            {/* Photo placeholder */}
            <FadeIn delay={0.3} className="lg:col-span-5 lg:col-start-8 hidden lg:block">
              <div className="aspect-[4/5] bg-[#1B3A2D] flex items-center justify-center">
                <div className="text-center text-white/15">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="mx-auto mb-3">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 lg:py-44">
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
      <section className="py-20 lg:py-44 bg-neutral-50">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-20">
            <div className="lg:col-span-5">
              <SlideIn direction="left">
                <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
                  Builders I Work With
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-charcoal mb-10">
                  Orlando&apos;s top national builders
                </h2>
                <div className="space-y-0">
                  {builders.map((b, i) => (
                    <div key={b} className="flex gap-5 items-center border-t border-neutral-200 py-4">
                      <span className="text-[11px] tracking-[0.15em] text-neutral-300">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[15px] text-neutral-600">{b}</span>
                    </div>
                  ))}
                  <div className="border-t border-neutral-200" />
                </div>
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
                <div className="grid sm:grid-cols-2 gap-4">
                  {activeAreas.map((n) => (
                    <Link
                      key={n.slug}
                      href={`/new-construction/${n.slug}`}
                      className="group block border border-neutral-200 p-5 hover:border-[#1B3A2D]/30 hover:bg-white transition-all duration-500"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-[family-name:var(--font-playfair)] text-base text-charcoal">
                          {n.name}
                        </h3>
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-300 group-hover:text-[#1B3A2D] shrink-0 mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                          <path d="M4 12L12 4M12 4H6M12 4v6" />
                        </svg>
                      </div>
                      <p className="text-[12px] text-neutral-400">
                        {n.newConstruction.builders.length} builders &middot; {n.priceRange}
                      </p>
                    </Link>
                  ))}
                </div>
              </SlideIn>
            </div>
          </div>
        </div>
      </section>

      {/* What the builder won't tell you */}
      <section className="py-20 lg:py-44">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <FadeIn>
                <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
                  Buyer&apos;s Guide
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-charcoal">
                  What the builder won&apos;t tell you
                </h2>
              </FadeIn>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Stagger className="space-y-8" staggerDelay={0.08}>
                <StaggerChild>
                  <div className="border-l-2 border-[#1B3A2D]/20 pl-8">
                    <h3 className="text-base font-medium text-charcoal mb-2">You need your own representation</h3>
                    <p className="text-[16px] sm:text-[14px] text-neutral-500 leading-[1.8]">The sales agent at the model home is employed by the builder. They&apos;re trained to sell the builder&apos;s inventory at the builder&apos;s price with the builder&apos;s preferred lender. Your own agent reviews the contract, negotiates on your behalf, and costs you nothing.</p>
                  </div>
                </StaggerChild>
                <StaggerChild>
                  <div className="border-l-2 border-[#1B3A2D]/20 pl-8">
                    <h3 className="text-base font-medium text-charcoal mb-2">Not all upgrades add value</h3>
                    <p className="text-[16px] sm:text-[14px] text-neutral-500 leading-[1.8]">Structural upgrades (electrical, plumbing rough-ins, expanded garages) are worth the cost because they&apos;re nearly impossible to add later. Cosmetic upgrades like premium paint or lighting fixtures are often cheaper to do yourself after closing.</p>
                  </div>
                </StaggerChild>
                <StaggerChild>
                  <div className="border-l-2 border-[#1B3A2D]/20 pl-8">
                    <h3 className="text-base font-medium text-charcoal mb-2">The base price isn&apos;t the only number</h3>
                    <p className="text-[16px] sm:text-[14px] text-neutral-500 leading-[1.8]">Builders rarely lower the base price, but there&apos;s often room to negotiate closing cost credits, upgrade packages, and rate buydowns. The best leverage comes during pre-construction and community closeout phases.</p>
                  </div>
                </StaggerChild>
                <StaggerChild>
                  <div className="border-l-2 border-[#1B3A2D]/20 pl-8">
                    <h3 className="text-base font-medium text-charcoal mb-2">Timelines will shift</h3>
                    <p className="text-[16px] sm:text-[14px] text-neutral-500 leading-[1.8]">Most production homes take 6-12 months from contract to close. Permitting, weather, and supply chain issues cause delays. Having an agent who monitors the build schedule and holds the builder accountable makes a real difference.</p>
                  </div>
                </StaggerChild>
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-44 bg-neutral-50">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">Frequently Asked</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-charcoal max-w-xl mb-16 lg:mb-24">New construction questions answered</h2>
          </FadeIn>
          <Stagger className="space-y-0" staggerDelay={0.08}>
            <StaggerChild><div className="border-t border-neutral-200 py-8 lg:py-10"><h3 className="font-medium text-charcoal mb-3">Do I need my own realtor when buying new construction?</h3><p className="text-[16px] sm:text-[14px] text-neutral-500 leading-[1.8] max-w-3xl">Yes. The sales agent at the model home represents the builder, not you. Having your own agent costs you nothing as a buyer — the builder pays the commission either way. Your agent reviews the contract, negotiates incentives, monitors the build timeline, and protects your interests throughout the process.</p></div></StaggerChild>
            <StaggerChild><div className="border-t border-neutral-200 py-8 lg:py-10"><h3 className="font-medium text-charcoal mb-3">How long does it take to build a new home in Orlando?</h3><p className="text-[16px] sm:text-[14px] text-neutral-500 leading-[1.8] max-w-3xl">Most production homes from national builders take six to twelve months from contract to closing. Timelines can shift due to permitting, weather, or supply chain factors. I monitor the build schedule and keep you informed at every stage.</p></div></StaggerChild>
            <StaggerChild><div className="border-t border-neutral-200 py-8 lg:py-10"><h3 className="font-medium text-charcoal mb-3">What upgrades are worth the investment?</h3><p className="text-[16px] sm:text-[14px] text-neutral-500 leading-[1.8] max-w-3xl">Structural upgrades like additional electrical outlets, plumbing rough-ins, and expanded garages are nearly impossible to add later and tend to be worth the cost. Kitchen and bathroom finishes also add value. Cosmetic upgrades like premium paint or lighting fixtures are often cheaper to do yourself after closing.</p></div></StaggerChild>
            <StaggerChild><div className="border-t border-neutral-200 py-8 lg:py-10"><h3 className="font-medium text-charcoal mb-3">Can I negotiate the price on a new construction home?</h3><p className="text-[16px] sm:text-[14px] text-neutral-500 leading-[1.8] max-w-3xl">Builders rarely lower the base price because it affects comparable sales for the rest of the community. However, there is often room to negotiate closing cost credits, upgrade packages, lot premiums, and rate buydowns through the builder&apos;s preferred lender.</p></div></StaggerChild>
            <div className="border-t border-neutral-200" />
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-44">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-4">Considering new construction?</h2>
              <p className="text-[16px] sm:text-[15px] text-neutral-500 mb-10">I know which builders deliver quality, which upgrades add value, and how to negotiate the best deal.</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/contact" className="group inline-flex items-center gap-2 text-[15px] sm:text-[13px] tracking-wide font-medium text-[#1B3A2D] border-b border-[#1B3A2D] pb-0.5 hover:border-[#234B39] hover:text-[#234B39] transition-all duration-300">
                  Discuss your build
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:translate-x-1 transition-transform duration-300"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                </Link>
                <span className="text-neutral-200 hidden sm:block">|</span>
                <a href="https://iorlandorealestate.com" target="_blank" rel="noopener noreferrer" className="text-[15px] sm:text-[13px] tracking-wide text-neutral-400 hover:text-charcoal transition-colors duration-300">Search new construction homes</a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
