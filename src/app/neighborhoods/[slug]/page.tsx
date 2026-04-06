import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { neighborhoods } from "@/lib/neighborhoods";

export function generateStaticParams() {
  return neighborhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const n = neighborhoods.find((nb) => nb.slug === slug);
  if (!n) return {};
  return {
    title: `${n.name} Neighborhood Guide - Living in ${n.name}, Orlando`,
    description: `Everything you need to know about living in ${n.name}, Orlando. Price points from ${n.priceRange}, schools, dining, new construction, and lifestyle details from a 30-year local expert.`,
  };
}

export default async function NeighborhoodPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const n = neighborhoods.find((nb) => nb.slug === slug);
  if (!n) notFound();

  const neighborhoodSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: n.name,
    description: n.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: n.name,
      addressRegion: "FL",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(neighborhoodSchema) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-36 lg:pb-24">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <Link
            href="/neighborhoods"
            className="text-[12px] tracking-wide text-neutral-400 hover:text-charcoal transition-colors duration-300 mb-8 inline-flex items-center gap-2 py-2"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M13 8H3M7 4l-4 4 4 4" />
            </svg>
            All Neighborhoods
          </Link>
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-4">
                Neighborhood Guide
              </p>
              <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-charcoal mb-3">
                {n.name}
              </h1>
              <p className="text-[15px] text-neutral-500 mb-6">{n.tagline}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {n.lifestyleTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-[0.15em] uppercase text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <div className="space-y-3 text-[13px]">
                <div className="flex justify-between border-b border-neutral-100 pb-3">
                  <span className="text-neutral-400">Price Range</span>
                  <span className="text-charcoal">{n.priceRange}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-100 pb-3">
                  <span className="text-neutral-400">To Downtown</span>
                  <span className="text-charcoal">{n.commute.downtown}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-100 pb-3">
                  <span className="text-neutral-400">To Airport</span>
                  <span className="text-charcoal">{n.commute.airport}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">To Disney</span>
                  <span className="text-charcoal">{n.commute.disney}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle */}
      <section className="pb-32 lg:pb-44">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7">
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
                The Lifestyle
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-8">
                What it&apos;s like to live in {n.name}
              </h2>
              <p className="text-[15px] text-neutral-500 leading-[1.85]">
                {n.lifestyle}
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <div className="mb-10">
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#1B3A2D] mb-4">
                  Best For
                </p>
                <ul className="space-y-3">
                  {n.bestFor.map((item) => (
                    <li key={item} className="flex gap-3 text-[13px] text-neutral-500 leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-[#1B3A2D] shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-4">
                  Consider Elsewhere If
                </p>
                <ul className="space-y-3">
                  {n.notIdealFor.map((item) => (
                    <li key={item} className="flex gap-3 text-[13px] text-neutral-400 leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-neutral-300 shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Points */}
      <section className="py-20 lg:py-44 bg-neutral-50">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
            Price Points
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-16 lg:mb-24">
            What {n.name} costs
          </h2>
          <div className="grid md:grid-cols-3 gap-[1px] bg-neutral-200">
            {n.priceSegments.map((seg) => (
              <div key={seg.label} className="bg-white p-8 lg:p-10">
                <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-2">
                  {seg.label}
                </p>
                <p className="font-[family-name:var(--font-playfair)] text-xl text-charcoal mb-4">
                  {seg.range}
                </p>
                <p className="text-[13px] text-neutral-500 leading-relaxed">
                  {seg.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Construction */}
      <section className="py-20 lg:py-44">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7">
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
                New Construction
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-8">
                Building new in {n.name}
              </h2>
              <p className="text-[15px] text-neutral-500 leading-[1.85]">
                {n.newConstruction.summary}
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              {n.newConstruction.builders.length > 0 && (
                <div className="mb-10">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-4">
                    Active Builders
                  </p>
                  <ul className="space-y-2">
                    {n.newConstruction.builders.map((b) => (
                      <li key={b} className="text-[13px] text-neutral-500 border-b border-neutral-100 pb-2">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {n.newConstruction.communities.length > 0 && (
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-4">
                    Communities
                  </p>
                  <ul className="space-y-2">
                    {n.newConstruction.communities.map((c) => (
                      <li key={c} className="text-[13px] text-neutral-500 border-b border-neutral-100 pb-2">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {n.newConstruction.builders.length === 0 && (
                <p className="text-[13px] text-neutral-400 italic">
                  No active new construction. All purchases in {n.name} are resale.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Schools & Dining — dark section */}
      <section className="py-20 lg:py-44 bg-[#1B3A2D] text-white">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <p className="text-[10px] tracking-[0.35em] uppercase text-white/40 mb-5">
                Schools
              </p>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl text-white mb-8">
                Education in {n.name}
              </h3>
              <ul className="space-y-3">
                {n.schools.map((s) => (
                  <li key={s} className="text-[14px] text-white/60 border-b border-white/10 pb-3">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.35em] uppercase text-white/40 mb-5">
                Dining
              </p>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl text-white mb-8">
                Where to eat
              </h3>
              <ul className="space-y-3">
                {n.dining.map((d) => (
                  <li key={d} className="text-[14px] text-white/60 border-b border-white/10 pb-3">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Local Tips */}
      <section className="py-20 lg:py-44">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
              From Someone Who Knows
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-12">
              Nicole&apos;s {n.name} tips
            </h2>
            <div className="space-y-8">
              {n.localTips.map((tip, i) => (
                <div key={tip} className="flex gap-6 items-start">
                  <span className="text-[11px] tracking-[0.15em] text-[#1B3A2D]/40 font-medium shrink-0 mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[15px] text-neutral-500 leading-[1.8] border-b border-neutral-100 pb-8">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lead Magnet CTA */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-4">
              Free Download
            </p>
            <h3 className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.2] text-charcoal mb-3">
              The Complete {n.name} Guide
            </h3>
            <p className="text-[14px] text-neutral-500 mb-8">
              Schools, price points, new construction, commute times, and local
              recommendations. Everything in one PDF.
            </p>
            <button
              className="group inline-flex items-center gap-2 text-[13px] tracking-wide font-medium text-[#1B3A2D] border-b border-[#1B3A2D] pb-0.5 hover:border-[#234B39] hover:text-[#234B39] transition-all duration-300"
            >
              Download the guide
              <svg
                width="14" height="14" viewBox="0 0 16 16" fill="none"
                stroke="currentColor" strokeWidth="1.5"
                className="group-hover:translate-y-0.5 transition-transform duration-300"
              >
                <path d="M8 3v10M4 9l4 4 4-4" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-44 bg-[#1B3A2D]">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-[-0.02em] text-white mb-4">
            Interested in {n.name}?
          </h2>
          <p className="text-[15px] text-white/70 max-w-xl mx-auto mb-10">
            I can tell you what it&apos;s really like to live here, what the market
            looks like right now, and whether it&apos;s the right fit for your lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-[13px] tracking-wide font-medium text-white border-b border-white/60 pb-0.5 hover:border-white transition-all duration-300"
            >
              Ask about {n.name}
              <svg
                width="14" height="14" viewBox="0 0 16 16" fill="none"
                stroke="currentColor" strokeWidth="1.5"
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
            <span className="text-white/20 hidden sm:block">|</span>
            <a
              href="https://iorlandorealestate.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] tracking-wide text-white/50 hover:text-white transition-colors duration-300"
            >
              Search {n.name} homes
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
