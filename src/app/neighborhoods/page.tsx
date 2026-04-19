import type { Metadata } from "next";
import Link from "next/link";
import { neighborhoods } from "@/lib/neighborhoods";
import { NeighborhoodExplorer } from "@/components/neighborhood-explorer";

export const metadata: Metadata = {
  title: "Orlando Neighborhoods",
  description:
    "Explore Orlando's best neighborhoods with Nicole Mickle. From Winter Park to Lake Nona, find the community that fits your lifestyle.",
};

export default function NeighborhoodsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 lg:pt-36 lg:pb-16">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-6">
              Neighborhoods
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3.25rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-6">
              Find the Orlando neighborhood that fits your life
            </h1>
            <p className="text-[15px] text-neutral-500 leading-relaxed max-w-lg mx-auto">
              Each neighborhood has its own character, pace, and personality.
              After 30 years here, I know which ones match which lifestyles.
            </p>
          </div>
        </div>
      </section>

      {/* Map + Cards Explorer */}
      <section className="pb-16 lg:pb-20">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <NeighborhoodExplorer
            neighborhoods={neighborhoods.map((n) => ({
              slug: n.slug,
              name: n.name,
              tagline: n.tagline,
              priceRange: n.priceRange,
              lifestyleTags: n.lifestyleTags,
            }))}
          />
        </div>
      </section>

      {/* Grid */}
      <section className="pb-32 lg:pb-44">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-neutral-200">
            {neighborhoods.map((n) => (
              <Link
                key={n.slug}
                href={`/neighborhoods/${n.slug}`}
                className="group block bg-white p-8 lg:p-10 hover:bg-neutral-50 transition-colors duration-500"
              >
                <div className="aspect-[4/3] bg-forest relative mb-6 flex items-center justify-center group-hover:bg-forest-light transition-colors duration-500">
                  <div className="text-center text-white/30">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-1">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                      
                    </svg>
                    <p className="text-[10px] tracking-[0.15em] uppercase">{n.name}</p>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h2 className="font-[family-name:var(--font-playfair)] text-lg text-charcoal group-hover:text-neutral-600 transition-colors duration-300">
                    {n.name}
                  </h2>
                  <svg
                    width="14" height="14" viewBox="0 0 16 16" fill="none"
                    stroke="currentColor" strokeWidth="1.5"
                    className="text-neutral-300 group-hover:text-charcoal group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0 mt-1.5"
                  >
                    <path d="M4 12L12 4M12 4H6M12 4v6" />
                  </svg>
                </div>
                <p className="text-[13px] text-neutral-500 leading-relaxed mb-4">{n.tagline}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
                  {n.lifestyleTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] tracking-[0.15em] uppercase text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="pt-4 border-t border-neutral-100">
                  <span className="text-[12px] text-neutral-400">{n.priceRange}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Deep forest green */}
      <section className="py-20 lg:py-44 bg-forest">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-[-0.02em] text-white mb-4">
            Not sure which neighborhood is right?
          </h2>
          <p className="text-[15px] text-white/70 max-w-xl mx-auto mb-10">
            Tell me about your lifestyle, commute, and priorities and I&apos;ll point
            you in the right direction.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 text-[13px] tracking-wide font-medium text-white border-b border-white/60 pb-0.5 hover:border-white transition-all duration-300"
          >
            Ask me about neighborhoods
            <svg
              width="14" height="14" viewBox="0 0 16 16" fill="none"
              stroke="currentColor" strokeWidth="1.5"
              className="group-hover:translate-x-1 transition-transform duration-300"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
