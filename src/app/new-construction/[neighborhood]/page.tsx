import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { neighborhoods } from "@/lib/neighborhoods";

const withNewConstruction = neighborhoods.filter(
  (n) => n.newConstruction.builders.length > 0
);

export function generateStaticParams() {
  return withNewConstruction.map((n) => ({ neighborhood: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ neighborhood: string }>;
}): Promise<Metadata> {
  const { neighborhood } = await params;
  const n = neighborhoods.find((nb) => nb.slug === neighborhood);
  if (!n || n.newConstruction.builders.length === 0) return {};
  return {
    title: `New Construction in ${n.name} - Builders, Communities & Pricing`,
    description: `New construction homes in ${n.name}, Orlando. Active builders include ${n.newConstruction.builders.slice(0, 3).join(", ")}. Price range: ${n.priceRange}. Expert guidance from Nicole Mickle.`,
  };
}

export default async function NewConstructionNeighborhoodPage({
  params,
}: {
  params: Promise<{ neighborhood: string }>;
}) {
  const { neighborhood } = await params;
  const n = neighborhoods.find((nb) => nb.slug === neighborhood);
  if (!n || n.newConstruction.builders.length === 0) notFound();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-44 lg:pb-24">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <Link
            href="/new-construction"
            className="text-[12px] tracking-wide text-neutral-400 hover:text-charcoal transition-colors duration-300 mb-8 inline-flex items-center gap-2 py-2"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M13 8H3M7 4l-4 4 4 4" />
            </svg>
            New Construction
          </Link>
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-4">
                New Construction Guide
              </p>
              <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-charcoal">
                New construction
                <br />
                <span className="italic">in {n.name}</span>
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="text-[15px] text-neutral-500 leading-relaxed">
                {n.newConstruction.summary}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image placeholder */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="aspect-[16/9] md:aspect-[21/9] bg-[#1B3A2D] flex items-center justify-center">
            <div className="text-center text-white/20">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" className="mx-auto mb-2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
                
              </svg>
              <p className="text-[11px] tracking-[0.2em] uppercase">New construction in {n.name}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Builders + Communities */}
      <section className="py-20 lg:py-44">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
                Active Builders
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-charcoal mb-8">
                Who&apos;s building in {n.name}
              </h2>
              <div className="space-y-0">
                {n.newConstruction.builders.map((b, i) => (
                  <div key={b} className="flex gap-5 items-center border-t border-neutral-100 py-4">
                    <span className="text-[11px] tracking-[0.15em] text-neutral-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] text-neutral-600">{b}</span>
                  </div>
                ))}
                <div className="border-t border-neutral-100" />
              </div>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
                Communities
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-charcoal mb-8">
                Where to look
              </h2>
              <div className="space-y-0">
                {n.newConstruction.communities.map((c, i) => (
                  <div key={c} className="flex gap-5 items-center border-t border-neutral-100 py-4">
                    <span className="text-[11px] tracking-[0.15em] text-neutral-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] text-neutral-600">{c}</span>
                  </div>
                ))}
                <div className="border-t border-neutral-100" />
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
            What new construction costs in {n.name}
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

      {/* Neighborhood details */}
      <section className="py-20 lg:py-44 bg-[#1B3A2D] text-white">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <p className="text-[10px] tracking-[0.35em] uppercase text-white/40 mb-5">
                About the Area
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-white mb-6">
                Living in {n.name}
              </h2>
              <p className="text-[14px] text-white/60 leading-[1.8]">
                {n.lifestyle}
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.35em] uppercase text-white/40 mb-5">
                Commute Times
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] text-white mb-8">
                Getting around
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-white/10 pb-4 text-[14px]">
                  <span className="text-white/50">To Downtown Orlando</span>
                  <span className="text-white">{n.commute.downtown}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-4 text-[14px]">
                  <span className="text-white/50">To Orlando Airport</span>
                  <span className="text-white">{n.commute.airport}</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-white/50">To Disney / Attractions</span>
                  <span className="text-white">{n.commute.disney}</span>
                </div>
              </div>
              <Link
                href={`/neighborhoods/${n.slug}`}
                className="group inline-flex items-center gap-2 text-[13px] tracking-wide text-white/50 hover:text-white transition-colors duration-300 mt-8"
              >
                Full {n.name} neighborhood guide
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:translate-x-1 transition-transform duration-300">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-44">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-4">
              Building in {n.name}?
            </h2>
            <p className="text-[15px] text-neutral-500 mb-10">
              I know which builders deliver quality, which upgrades add value, and
              how to negotiate the best deal. Let&apos;s talk about your build.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-[13px] tracking-wide font-medium text-[#1B3A2D] border-b border-[#1B3A2D] pb-0.5 hover:border-[#234B39] hover:text-[#234B39] transition-all duration-300"
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
                Search new construction homes
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
