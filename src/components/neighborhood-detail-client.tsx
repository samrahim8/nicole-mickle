"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FadeIn, SlideIn, TextReveal, Stagger, StaggerChild } from "./animate";
import type { Neighborhood } from "@/lib/neighborhoods";

gsap.registerPlugin(ScrollTrigger);

function splitOnDash(text: string): { name: string; detail: string } | null {
  const idx = text.indexOf(" – ");
  if (idx === -1) return null;
  return { name: text.slice(0, idx), detail: text.slice(idx + 3) };
}

interface Props {
  neighborhood: Neighborhood;
  related: Neighborhood[];
}

export function NeighborhoodDetailClient({ neighborhood: n, related }: Props) {
  const pullQuote = n.lifestyle.split(/(?<=\.)\s/)[0];
  const remainingLifestyle = n.lifestyle.slice(pullQuote.length).trim();

  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const statsBandRef = useRef<HTMLDivElement>(null);
  const pullQuoteRef = useRef<HTMLParagraphElement>(null);
  const sectionHeadlinesRef = useRef<(HTMLElement | null)[]>([]);
  const darkSectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero image – slow parallax (moves at 80% scroll speed)
      if (heroImageRef.current) {
        gsap.to(heroImageRef.current, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: heroImageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Stats band – numbers slide up with stagger
      if (statsBandRef.current) {
        const statItems = statsBandRef.current.querySelectorAll("[data-stat]");
        gsap.from(statItems, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsBandRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      // Pull quote – word-by-word reveal scrubbed to scroll
      if (pullQuoteRef.current) {
        const words = pullQuoteRef.current.querySelectorAll("[data-word]");
        gsap.set(words, { opacity: 0.15, y: 8 });
        gsap.to(words, {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: pullQuoteRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 0.8,
          },
        });
      }

      // Section headlines – subtle scale from 1.02 to 1.0
      sectionHeadlinesRef.current.forEach((el) => {
        if (!el) return;
        gsap.from(el, {
          scale: 1.03,
          ease: "power2.out",
          duration: 1.2,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });

      // Dark sections – background parallax feel
      darkSectionsRef.current.forEach((el) => {
        if (!el) return;
        const inner = el.querySelector("[data-parallax-inner]");
        if (inner) {
          gsap.from(inner, {
            y: 40,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "top 20%",
              scrub: true,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* Hero */}
      <section className="pt-32 lg:pt-36 pb-0">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <Link
              href="/neighborhoods"
              className="text-[12px] tracking-wide text-neutral-400 hover:text-charcoal transition-colors duration-300 mb-12 lg:mb-16 inline-flex items-center gap-2 py-2"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13 8H3M7 4l-4 4 4 4" />
              </svg>
              All Neighborhoods
            </Link>
          </FadeIn>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-6">
              <TextReveal>
                <h1
                  ref={(el) => { sectionHeadlinesRef.current[0] = el; }}
                  className="font-[family-name:var(--font-playfair)] text-[clamp(3rem,7vw,6rem)] leading-[0.95] tracking-[-0.03em] text-charcoal"
                >
                  {n.name}
                </h1>
              </TextReveal>
              <FadeIn delay={0.3}>
                <p className="text-[clamp(1.05rem,1.8vw,1.25rem)] text-neutral-500 max-w-xl mb-6 mt-5">
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
              </FadeIn>
            </div>

            {/* Neighborhood image */}
            <SlideIn direction="right" className="lg:col-span-5 lg:col-start-7">
              <div ref={heroImageRef} className="overflow-hidden">
                {n.image && n.image !== "placeholder" ? (
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={n.image}
                      alt={n.name}
                      fill
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-forest flex items-center justify-center">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/10">
                      <path d="M3 21h18v-9L12 3 3 12v9z" />
                      <path d="M9 21v-6h6v6" />
                    </svg>
                  </div>
                )}
              </div>
            </SlideIn>
          </div>
        </div>

        {/* Stats band */}
        <div className="bg-cream py-10 lg:py-14 mt-12 lg:mt-16">
          <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
            <div ref={statsBandRef} className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
              <div data-stat>
                <p className="font-[family-name:var(--font-playfair)] text-[17px] text-charcoal">{n.priceRange}</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mt-1">Price Range</p>
              </div>
              <div data-stat>
                <p className="font-[family-name:var(--font-playfair)] text-[17px] text-charcoal">{n.commute.downtown}</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mt-1">Downtown</p>
              </div>
              <div data-stat>
                <p className="font-[family-name:var(--font-playfair)] text-[17px] text-charcoal">{n.commute.airport}</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mt-1">Airport</p>
              </div>
              <div data-stat>
                <p className="font-[family-name:var(--font-playfair)] text-[17px] text-charcoal">{n.commute.disney}</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mt-1">Disney</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      {n.gallery && n.gallery.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
            <FadeIn>
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-10">
                Around {n.name}
              </p>
            </FadeIn>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              {n.gallery.map((img, i) => (
                <FadeIn key={img.src} delay={i * 0.1}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 22vw, 50vw"
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lifestyle + Fit Check */}
      <section className="bg-linen">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          {/* Pull quote band */}
          <div className="py-16 lg:py-24 border-b border-warm-200/40">
            <div className="border-l-[3px] border-forest pl-8 lg:pl-10 max-w-4xl">
              <p
                ref={pullQuoteRef}
                className="font-[family-name:var(--font-playfair)] italic text-[clamp(1.35rem,2.5vw,2.15rem)] leading-[1.45] text-charcoal"
              >
                {`\u201C${pullQuote}\u201D`.split(/(\s+)/).map((segment, i) =>
                  /\s+/.test(segment) ? (
                    <span key={i}>{segment}</span>
                  ) : (
                    <span key={i} data-word className="inline-block">
                      {segment}
                    </span>
                  )
                )}
              </p>
            </div>
          </div>

          {/* Body + fit card */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 py-16 lg:py-24">
            <SlideIn direction="left" className="lg:col-span-6">
              <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-5">The Lifestyle</p>
              {remainingLifestyle && (
                <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.9]">
                  {remainingLifestyle}
                </p>
              )}
            </SlideIn>

            <FadeIn className="lg:col-span-5 lg:col-start-8">
              <div className="border border-warm-200/60 bg-white p-8 lg:p-10">
                <div className="mb-8 pb-8 border-b border-neutral-100">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-forest mb-4">
                    Best For
                  </p>
                  <ul className="space-y-3">
                    {n.bestFor.map((item) => (
                      <li key={item} className="flex gap-3 text-[13px] text-neutral-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-forest shrink-0 mt-[7px]" />
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
                      <li key={item} className="flex gap-3 text-[13px] text-neutral-400 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 shrink-0 mt-[7px]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Price Points */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-14 lg:mb-20">
              <div className="lg:col-span-5">
                <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-3">
                  Price Points
                </p>
                <p
                  ref={(el) => { sectionHeadlinesRef.current[1] = el; }}
                  className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] text-charcoal"
                >
                  {n.priceRange}
                </p>
              </div>
              <div className="lg:col-span-5 lg:col-start-8">
                <p className="text-[13px] text-neutral-400 leading-relaxed">
                  What it costs to live in {n.name}, from entry-level to premium.
                </p>
              </div>
            </div>
          </FadeIn>
          <Stagger className="grid md:grid-cols-3 gap-[1px] bg-neutral-200">
            {n.priceSegments.map((seg, i) => (
              <StaggerChild key={seg.label} className="bg-white p-8 lg:p-10">
                <p className="text-neutral-300 text-[13px] tracking-wide mb-2">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-500 mb-2">{seg.label}</p>
                <p className="font-[family-name:var(--font-playfair)] text-[clamp(1.15rem,1.8vw,1.5rem)] text-charcoal mb-4">
                  {seg.range}
                </p>
                <p className="text-[13px] text-neutral-500 leading-relaxed">
                  {seg.description}
                </p>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* New Construction */}
      <section className="py-20 lg:py-32 border-t border-neutral-100">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-8">
              New Construction
            </p>
            {n.newConstruction.builders.length > 0 ? (
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
                <div className="lg:col-span-7">
                  <h2
                    ref={(el) => { sectionHeadlinesRef.current[2] = el; }}
                    className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-6"
                  >
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
                        <li key={c} className="text-[13px] text-neutral-500 border-b border-neutral-200 py-3 last:border-b-0">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="max-w-3xl">
                <div className="border-l-[3px] border-forest/20 pl-6">
                  <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.85]">
                    {n.newConstruction.summary}
                  </p>
                </div>
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* Schools & Dining */}
      <section
        ref={(el) => { darkSectionsRef.current[0] = el; }}
        className="py-20 lg:py-32 bg-forest text-white relative overflow-hidden"
      >
        <div data-parallax-inner className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            <SlideIn direction="left">
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
                        <p className="text-[16px] sm:text-[15px] text-white/80 font-medium">{parts.name}</p>
                        <p className="text-[13px] sm:text-[12px] text-white/40 mt-0.5">{parts.detail}</p>
                      </li>
                    );
                  }
                  if (parenMatch) {
                    return (
                      <li key={s} className="border-b border-white/10 py-4 first:pt-0">
                        <p className="text-[16px] sm:text-[15px] text-white/80 font-medium">{parenMatch[1]}</p>
                        <p className="text-[13px] sm:text-[12px] text-white/40 mt-0.5">{parenMatch[2]}</p>
                      </li>
                    );
                  }
                  return (
                    <li key={s} className="text-[16px] sm:text-[15px] text-white/60 border-b border-white/10 py-4 first:pt-0">
                      {s}
                    </li>
                  );
                })}
              </ul>
            </SlideIn>

            <SlideIn direction="right">
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
                        <p className="text-[16px] sm:text-[15px] text-white/80 font-medium">{parts.name}</p>
                        <p className="text-[13px] sm:text-[12px] text-white/40 mt-0.5">{parts.detail}</p>
                      </li>
                    );
                  }
                  return (
                    <li key={d} className="text-[16px] sm:text-[15px] text-white/60 border-b border-white/10 py-4 first:pt-0">
                      {d}
                    </li>
                  );
                })}
              </ul>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Nicole's Local Tips */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <FadeIn className="lg:col-span-4">
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
                Local Tips
              </p>
              <h2
                ref={(el) => { sectionHeadlinesRef.current[3] = el; }}
                className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-6"
              >
                Nicole&apos;s {n.name} notes
              </h2>
              <div className="border-t border-neutral-100 pt-4">
                <p className="text-[13px] font-medium text-charcoal">Nicole Mickle</p>
                <p className="text-[11px] text-neutral-400">30 years in Orlando</p>
              </div>
            </FadeIn>

            <div className="lg:col-span-7 lg:col-start-6">
              <Stagger className="border border-neutral-200 bg-cream divide-y divide-warm-200">
                {n.localTips.map((tip, i) => (
                  <StaggerChild key={tip} className="p-8 lg:p-10">
                    <p className="text-[clamp(1.25rem,2vw,1.75rem)] font-[family-name:var(--font-playfair)] text-forest/10 leading-none mb-3">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8]">
                      {tip}
                    </p>
                  </StaggerChild>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* Related Neighborhoods */}
      <section className="border-t border-neutral-100 py-16 lg:py-24">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-8">
              Other neighborhoods to consider
            </p>
          </FadeIn>
          <Stagger className="grid md:grid-cols-3 gap-[1px] bg-neutral-200">
            {related.map((nb) => (
              <StaggerChild key={nb.slug}>
                <Link
                  href={`/neighborhoods/${nb.slug}`}
                  className="group block bg-white p-8 lg:p-10 hover:bg-neutral-50 transition-colors duration-300"
                >
                  <h3 className="font-[family-name:var(--font-playfair)] text-lg text-charcoal group-hover:text-forest transition-colors duration-300 mb-2">
                    {nb.name}
                  </h3>
                  <p className="text-[13px] text-neutral-400 leading-relaxed mb-4">
                    {nb.tagline}
                  </p>
                  <span className="text-[11px] tracking-[0.15em] uppercase text-forest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View guide
                  </span>
                </Link>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Final CTA */}
      <section
        ref={(el) => { darkSectionsRef.current[1] = el; }}
        className="py-20 lg:py-32 bg-forest overflow-hidden"
      >
        <div data-parallax-inner className="max-w-[90rem] mx-auto px-6 lg:px-12 text-center">
          <FadeIn>
            <div className="w-12 h-[1px] bg-white/20 mx-auto mb-8" />
            <h2
              ref={(el) => { sectionHeadlinesRef.current[4] = el; }}
              className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] tracking-[-0.02em] text-white mb-4"
            >
              Interested in {n.name}?
            </h2>
            <p className="text-[16px] sm:text-[15px] text-white/70 max-w-xl mx-auto mb-10">
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
                href={n.searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] tracking-wide text-white/50 hover:text-white transition-colors duration-300"
              >
                Search {n.name} homes
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
