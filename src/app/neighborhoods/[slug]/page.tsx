import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { neighborhoods } from "@/lib/neighborhoods";

function splitOnDash(text: string): { name: string; detail: string } | null {
  const idx = text.indexOf(" — ");
  if (idx === -1) return null;
  return { name: text.slice(0, idx), detail: text.slice(idx + 3) };
}

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

  const pullQuote = n.lifestyle.split(/(?<=\.)\s/)[0];
  const remainingLifestyle = n.lifestyle.slice(pullQuote.length).trim();

  const related = neighborhoods
    .filter((nb) => nb.slug !== n.slug)
    .map((nb) => ({
      ...nb,
      score: nb.lifestyleTags.filter((t) => n.lifestyleTags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

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
      <section className="pt-32 lg:pt-36 pb-20 lg:pb-28">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <Link
            href="/neighborhoods"
            className="text-[12px] tracking-wide text-neutral-400 hover:text-charcoal transition-colors duration-300 mb-12 lg:mb-16 inline-flex items-center gap-2 py-2"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M13 8H3M7 4l-4 4 4 4" />
            </svg>
            All Neighborhoods
          </Link>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-end">
            {/* Left — name, tagline, tags */}
            <div className="lg:col-span-8">
              <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(3rem,7vw,6rem)] leading-[0.95] tracking-[-0.03em] text-charcoal mb-5">
                {n.name}
              </h1>
              <p className="text-[clamp(1.05rem,1.8vw,1.25rem)] text-neutral-500 max-w-xl mb-6">
                {n.tagline}
              </p>
              <div className="flex flex-wrap items-center gap-x-0 gap-y-2">
                {n.lifestyleTags.map((tag, i) => (
                  <span key={tag} className="flex items-center">
                    <span className="text-[10px] tracking-[0.15em] uppercase text-neutral-400">
                      {tag}
                    </span>
                    {i < n.lifestyleTags.length - 1 && (
                      <span className="w-[1px] h-3 bg-neutral-200 mx-4" />
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — stats card */}
            <div className="lg:col-span-4">
              <div className="border border-neutral-200 bg-neutral-50 p-8 lg:p-10">
                <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-6">At a Glance</p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  <div>
                    <p className="font-[family-name:var(--font-playfair)] text-[17px] text-charcoal">{n.priceRange}</p>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mt-1">Price Range</p>
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-playfair)] text-[17px] text-charcoal">{n.commute.downtown}</p>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mt-1">Downtown</p>
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-playfair)] text-[17px] text-charcoal">{n.commute.airport}</p>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mt-1">Airport</p>
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-playfair)] text-[17px] text-charcoal">{n.commute.disney}</p>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mt-1">Disney</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle Narrative + Fit Check — contained together */}
      <section className="bg-neutral-50">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          {/* Pull quote card */}
          <div className="py-16 lg:py-24 border-b border-neutral-200/60">
            <div className="border-l-[3px] border-[#1B3A2D] pl-8 lg:pl-10 max-w-4xl">
              <p className="font-[family-name:var(--font-playfair)] italic text-[clamp(1.35rem,2.5vw,2.15rem)] leading-[1.45] text-charcoal">
                &ldquo;{pullQuote}&rdquo;
              </p>
            </div>
          </div>

          {/* Body text + fit check */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 py-16 lg:py-24">
            {/* Lifestyle body */}
            <div className="lg:col-span-6">
              <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-5">The Lifestyle</p>
              {remainingLifestyle && (
                <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.9]">
                  {remainingLifestyle}
                </p>
              )}
            </div>

            {/* Fit check card */}
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="border border-neutral-200 bg-white p-8 lg:p-10">
                <div className="mb-8 pb-8 border-b border-neutral-100">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#1B3A2D] mb-4">
                    Best For
                  </p>
                  <ul className="space-y-3">
                    {n.bestFor.map((item) => (
                      <li key={item} className="flex gap-3 text-[15px] sm:text-[13px] text-neutral-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1B3A2D] shrink-0 mt-[7px]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-4">
                    Not Ideal For
                  </p>
                  <ul className="space-y-3">
                    {n.notIdealFor.map((item) => (
                      <li key={item} className="flex gap-3 text-[15px] sm:text-[13px] text-neutral-400 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 shrink-0 mt-[7px]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Points */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-14 lg:mb-20">
            <div className="lg:col-span-5">
              <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-3">
                Price Points
              </p>
              <p className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] text-charcoal">
                {n.priceRange}
              </p>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="text-[15px] sm:text-[13px] text-neutral-400 leading-relaxed">
                What it costs to live in {n.name}, from entry-level to premium.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-[1px] bg-neutral-200">
            {n.priceSegments.map((seg, i) => (
              <div key={seg.label} className="bg-white p-8 lg:p-10">
                <p className="text-neutral-300 text-[13px] tracking-wide mb-2">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-500 mb-2">{seg.label}</p>
                <p className="font-[family-name:var(--font-playfair)] text-[clamp(1.15rem,1.8vw,1.5rem)] text-charcoal mb-4">
                  {seg.range}
                </p>
                <p className="text-[15px] sm:text-[13px] text-neutral-500 leading-relaxed">
                  {seg.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Construction */}
      <section className="py-20 lg:py-32 border-t border-neutral-100">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-8">
            New Construction
          </p>
          {n.newConstruction.builders.length > 0 ? (
            <div className="border border-neutral-200 bg-neutral-50 p-8 lg:p-12">
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
                <div className="lg:col-span-7">
                  <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-6">
                    Building new in {n.name}
                  </h2>
                  <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.85] mb-8">
                    {n.newConstruction.summary}
                  </p>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-3">Builders</p>
                  <div className="flex flex-wrap gap-2">
                    {n.newConstruction.builders.map((b) => (
                      <span
                        key={b}
                        className="border border-neutral-300 bg-white px-3 py-1.5 text-[12px] tracking-wide text-neutral-500"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
                {n.newConstruction.communities.length > 0 && (
                  <div className="lg:col-span-4 lg:col-start-9 border-t lg:border-t-0 lg:border-l border-neutral-200 pt-8 lg:pt-0 lg:pl-10">
                    <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-4">
                      Active Communities
                    </p>
                    <ul className="space-y-0">
                      {n.newConstruction.communities.map((c) => (
                        <li key={c} className="text-[15px] sm:text-[13px] text-neutral-500 border-b border-neutral-200 py-3 last:border-b-0">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="border border-neutral-200 bg-neutral-50 p-8 lg:p-12 max-w-3xl">
              <div className="border-l-[3px] border-[#1B3A2D]/20 pl-6">
                <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.85]">
                  {n.newConstruction.summary}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Schools & Dining */}
      <section className="py-20 lg:py-32 bg-[#1B3A2D] text-white relative overflow-hidden">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          {/* Ghost text */}
          <p
            aria-hidden="true"
            className="absolute top-8 left-6 lg:left-12 text-[clamp(4rem,10vw,8rem)] font-[family-name:var(--font-playfair)] text-white/[0.03] leading-none select-none pointer-events-none whitespace-nowrap"
          >
            {n.name}
          </p>

          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 relative">
            <div>
              <p className="text-[10px] tracking-[0.35em] uppercase text-white/40 mb-5">
                Schools
              </p>
              <h3 className="font-[family-name:var(--font-playfair)] text-[clamp(1.25rem,2vw,1.75rem)] text-white mb-8">
                Education in {n.name}
              </h3>
              <ul className="space-y-0">
                {n.schools.map((s) => {
                  const parts = splitOnDash(s);
                  const parenMatch = s.match(/^(.+?)\s*(\(.+\))$/);
                  if (parts) {
                    return (
                      <li key={s} className="border-b border-white/10 py-4 first:pt-0">
                        <p className="text-[15px] sm:text-[14px] text-white/80 font-medium">{parts.name}</p>
                        <p className="text-[13px] sm:text-[12px] text-white/40 mt-0.5">{parts.detail}</p>
                      </li>
                    );
                  }
                  if (parenMatch) {
                    return (
                      <li key={s} className="border-b border-white/10 py-4 first:pt-0">
                        <p className="text-[15px] sm:text-[14px] text-white/80 font-medium">{parenMatch[1]}</p>
                        <p className="text-[13px] sm:text-[12px] text-white/40 mt-0.5">{parenMatch[2]}</p>
                      </li>
                    );
                  }
                  return (
                    <li key={s} className="text-[15px] sm:text-[14px] text-white/60 border-b border-white/10 py-4 first:pt-0">
                      {s}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.35em] uppercase text-white/40 mb-5">
                Dining
              </p>
              <h3 className="font-[family-name:var(--font-playfair)] text-[clamp(1.25rem,2vw,1.75rem)] text-white mb-8">
                Where to eat
              </h3>
              <ul className="space-y-0">
                {n.dining.map((d) => {
                  const parts = splitOnDash(d);
                  if (parts) {
                    return (
                      <li key={d} className="border-b border-white/10 py-4 first:pt-0">
                        <p className="text-[15px] sm:text-[14px] text-white/80 font-medium">{parts.name}</p>
                        <p className="text-[13px] sm:text-[12px] text-white/40 mt-0.5">{parts.detail}</p>
                      </li>
                    );
                  }
                  return (
                    <li key={d} className="text-[15px] sm:text-[14px] text-white/60 border-b border-white/10 py-4 first:pt-0">
                      {d}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nicole's Local Tips */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left — heading + attribution */}
            <div className="lg:col-span-4">
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
                Local Tips
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-6">
                Nicole&apos;s {n.name} notes
              </h2>
              <div className="border-t border-neutral-100 pt-4">
                <p className="text-[13px] font-medium text-charcoal">Nicole Mickle</p>
                <p className="text-[11px] text-neutral-400">30 years in Orlando</p>
              </div>
            </div>

            {/* Right — tips card */}
            <div className="lg:col-span-7 lg:col-start-6">
              <div className="border border-neutral-200 bg-neutral-50 divide-y divide-neutral-200">
                {n.localTips.map((tip, i) => (
                  <div key={tip} className="p-8 lg:p-10">
                    <p className="text-[clamp(1.25rem,2vw,1.75rem)] font-[family-name:var(--font-playfair)] text-[#1B3A2D]/10 leading-none mb-3">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8]">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Neighborhoods */}
      <section className="border-t border-neutral-100 py-16 lg:py-24">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-8">
            Other neighborhoods to consider
          </p>
          <div className="grid md:grid-cols-3 gap-[1px] bg-neutral-200">
            {related.map((nb) => (
              <Link
                key={nb.slug}
                href={`/neighborhoods/${nb.slug}`}
                className="group bg-white p-8 lg:p-10 hover:bg-neutral-50 transition-colors duration-300"
              >
                <h3 className="font-[family-name:var(--font-playfair)] text-lg text-charcoal group-hover:text-[#1B3A2D] transition-colors duration-300 mb-2">
                  {nb.name}
                </h3>
                <p className="text-[13px] text-neutral-400 leading-relaxed mb-4">
                  {nb.tagline}
                </p>
                <span className="text-[11px] tracking-[0.15em] uppercase text-[#1B3A2D] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View guide
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Magnet CTA */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="border border-neutral-200 bg-neutral-50 p-10 lg:p-14">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-4">
                  Free Download
                </p>
                <h3 className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.2] text-charcoal mb-3">
                  The Complete {n.name} Guide
                </h3>
                <p className="text-[16px] sm:text-[14px] text-neutral-500">
                  Schools, price points, new construction, commute times, and local
                  recommendations. Everything in one PDF.
                </p>
              </div>
              <div className="lg:col-span-4 lg:col-start-9 lg:text-right">
                <button
                  className="bg-[#1B3A2D] text-white px-8 py-3.5 text-[13px] tracking-wide font-medium hover:bg-[#234B39] transition-colors duration-300"
                >
                  Download the guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-32 bg-[#1B3A2D]">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 text-center">
          <div className="w-12 h-[1px] bg-white/20 mx-auto mb-8" />
          <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] tracking-[-0.02em] text-white mb-4">
            Interested in {n.name}?
          </h2>
          <p className="text-[16px] sm:text-[15px] text-white/70 max-w-xl mx-auto mb-10">
            I can tell you what it&apos;s really like to live here, what the market
            looks like right now, and whether it&apos;s the right fit for your lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-[15px] sm:text-[13px] tracking-wide font-medium text-white border-b border-white/60 pb-0.5 hover:border-white transition-all duration-300"
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
              className="text-[15px] sm:text-[13px] tracking-wide text-white/50 hover:text-white transition-colors duration-300"
            >
              Search {n.name} homes
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
