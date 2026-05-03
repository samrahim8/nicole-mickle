"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FadeIn, SlideIn, TextReveal, Stagger, StaggerChild } from "./animate";
import type { Neighborhood } from "@/lib/neighborhoods";

const NeighborhoodExplorer = dynamic(
  () => import("./neighborhood-explorer").then((m) => m.NeighborhoodExplorer),
  {
    ssr: false,
    loading: () => (
      <div className="grid lg:grid-cols-12 gap-0 border border-neutral-200">
        <div className="lg:col-span-7 h-[400px] lg:h-[600px] bg-neutral-50" />
        <div className="lg:col-span-5 h-[600px] hidden lg:block bg-cream" />
      </div>
    ),
  }
);

interface Props {
  credentials: string[];
  audiences: {
    title: string;
    description: string;
    href: string;
    cta: string;
    number: string;
  }[];
  neighborhoods: Neighborhood[];
  testimonials: {
    text: string;
    author: string;
    context: string;
  }[];
  mediaLogos: string[];
}

export function HomeClient({
  credentials,
  audiences,
  neighborhoods,
  testimonials,
  mediaLogos,
}: Props) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Defer mounting the Mapbox-powered NeighborhoodExplorer until the user
  // scrolls near it. Saves ~400 KB of JS and tile fetches on initial load.
  const explorerRef = useRef<HTMLDivElement>(null);
  const [explorerVisible, setExplorerVisible] = useState(false);
  useEffect(() => {
    if (!explorerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setExplorerVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(explorerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
      >
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/45" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative max-w-[90rem] mx-auto px-6 lg:px-12 w-full text-center"
        >
          <TextReveal delay={0.3}>
            <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,7vw,7rem)] leading-[1.1] tracking-[-0.03em] text-white font-normal">
              Orlando&apos;s relocation
            </h1>
          </TextReveal>
          <TextReveal delay={0.4}>
            <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,7vw,7rem)] leading-[1.1] tracking-[-0.03em] text-white font-normal">
              &amp; new construction
            </h1>
          </TextReveal>
          <TextReveal delay={0.5}>
            <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,7vw,7rem)] leading-[1.1] tracking-[-0.03em] text-white font-normal italic">
              specialist
            </h1>
          </TextReveal>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-10"
          >
            <p className="text-[16px] sm:text-[15px] text-white/70 leading-[1.8] max-w-lg mx-auto">
              Find your neighborhood before you pack a single box.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-10 flex justify-center gap-6 items-center"
          >
            <Link
              href="/contact"
              className="group text-[13px] tracking-wide font-medium text-white flex items-center gap-2 border-b border-white/60 pb-0.5 hover:border-white transition-all duration-300"
            >
              Let&apos;s talk
              <svg
                width="14" height="14" viewBox="0 0 16 16" fill="none"
                stroke="currentColor" strokeWidth="1.5"
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
            <span className="text-white/30">|</span>
            <a
              href="https://iorlandorealestate.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] tracking-wide text-white/50 hover:text-white transition-colors duration-300"
            >
              Search homes
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-white/40"
          />
        </motion.div>
      </section>

      {/* ── Positioning ── */}
      <section className="border-y border-neutral-100">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 py-5">
          <FadeIn>
            <p className="text-center text-[11px] tracking-[0.35em] uppercase text-neutral-400">
              Orlando relocation &amp; new construction, done thoughtfully
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Nicole + Intro ── */}
      <section className="py-20 lg:py-44">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              <div className="lg:col-span-5">
                <div className="aspect-[4/5] bg-neutral-100 relative overflow-hidden">
                  <Image
                    src="/images/nicole.jpg"
                    alt="Nicole Mickle"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-6">
                  About Nicole
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-8">
                  Three decades of Orlando,
                  <span className="italic"> from the inside out</span>
                </h2>
                <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8] mb-4">
                  A Central Florida native with 30 years in the industry.
                  Mortgage broker, nationwide closing company owner, and licensed
                  realtor. Nicole understands every stage of the transaction
                  from the inside out.
                </p>
                <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8] mb-8">
                  Founder of Florida Homes and Living. Specializing in
                  relocation and new construction throughout Central Florida.
                </p>

                {/* Social proof */}
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-neutral-100">
                  <div>
                    <p className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal">5.0</p>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-neutral-400 mt-1">Google Rating</p>
                  </div>
                  <div className="w-[1px] h-10 bg-neutral-100" />
                  <div>
                    <p className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal">30</p>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-neutral-400 mt-1">Years Experience</p>
                  </div>
                </div>

                <Link
                  href="/about"
                  className="group text-[13px] tracking-wide text-forest flex items-center gap-2 border-b border-forest pb-0.5 hover:border-forest-light hover:text-forest-light transition-all duration-300 w-fit"
                >
                  More about Nicole
                  <svg
                    width="14" height="14" viewBox="0 0 16 16" fill="none"
                    stroke="currentColor" strokeWidth="1.5"
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Audience Paths ── */}
      <section className="py-20 lg:py-44 border-t border-neutral-100">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center mb-20 lg:mb-28">
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.15] tracking-[-0.02em] text-charcoal">
                Three ways I can help
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-0">
            {audiences.map((item, i) => (
              <SlideIn
                key={item.number}
                delay={i * 0.06}
                direction={i % 2 === 0 ? "left" : "right"}
              >
                <Link
                  href={item.href}
                  className="group block border-t border-neutral-100 py-10 lg:py-14"
                >
                  <div className="grid lg:grid-cols-12 gap-4 lg:gap-6 items-baseline">
                    <span className="lg:col-span-1 text-[11px] tracking-[0.2em] text-neutral-300">
                      {item.number}
                    </span>
                    <h3 className="lg:col-span-4 font-[family-name:var(--font-playfair)] text-[clamp(1.25rem,2.5vw,2rem)] leading-[1.2] text-charcoal group-hover:text-forest transition-colors duration-500">
                      {item.title}
                    </h3>
                    <p className="lg:col-span-5 text-[16px] sm:text-[15px] text-neutral-500 leading-[1.7]">
                      {item.description}
                    </p>
                    <div className="lg:col-span-2 flex lg:justify-end">
                      <span className="text-[12px] tracking-wide text-neutral-400 group-hover:text-forest transition-colors duration-300 flex items-center gap-2">
                        {item.cta}
                        <svg
                          width="12" height="12" viewBox="0 0 16 16" fill="none"
                          stroke="currentColor" strokeWidth="1.5"
                          className="group-hover:translate-x-2 transition-transform duration-500"
                        >
                          <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </SlideIn>
            ))}
            <div className="border-t border-neutral-100" />
          </div>
        </div>
      </section>

      {/* ── Neighborhoods Explorer ── */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-16">
              <div>
                <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
                  Neighborhoods
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.15] tracking-[-0.02em] text-charcoal">
                  Orlando isn&apos;t one place.
                  <span className="italic"> It&apos;s many.</span>
                </h2>
              </div>
              <Link
                href="/neighborhoods"
                className="text-[12px] tracking-wide text-neutral-400 hover:text-charcoal transition-colors duration-300 flex items-center gap-2 shrink-0"
              >
                View all neighborhoods
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div ref={explorerRef} className="min-h-[400px] lg:min-h-[600px]">
              {explorerVisible ? (
                <NeighborhoodExplorer
                  neighborhoods={neighborhoods.map((n) => ({
                    slug: n.slug,
                    name: n.name,
                    tagline: n.tagline,
                    priceRange: n.priceRange,
                    lifestyleTags: n.lifestyleTags,
                  }))}
                />
              ) : (
                <div className="grid lg:grid-cols-12 gap-0 border border-neutral-200 h-[400px] lg:h-[600px]">
                  <div className="lg:col-span-7 bg-neutral-50" />
                  <div className="lg:col-span-5 hidden lg:block bg-cream" />
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Testimonials – editorial spread ── */}
      <section className="py-20 lg:py-44">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-16 lg:mb-24">
              What Clients Say
            </p>
          </FadeIn>

          {/* Featured quote – large, asymmetric */}
          <FadeIn>
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="hidden lg:block lg:col-span-1">
                <span className="font-[family-name:var(--font-playfair)] text-[8rem] leading-none text-forest/10 select-none">
                  &ldquo;
                </span>
              </div>
              <div className="lg:col-span-8 lg:mt-6">
                <blockquote>
                  <p className="font-[family-name:var(--font-playfair)] text-[clamp(1.25rem,2.5vw,2.25rem)] leading-[1.4] tracking-[-0.01em] text-charcoal font-normal">
                    {testimonials[0].text}
                  </p>
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-forest/20" />
                  <div>
                    <p className="text-[13px] font-medium text-charcoal">
                      {testimonials[0].author}
                    </p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      {testimonials[0].context}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Secondary quotes – uniform card grid, equal heights, footer bottom-aligned */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-20 lg:mt-28 pt-16 lg:pt-20 border-t border-neutral-100">
            {testimonials.slice(1).map((t, i) => (
              <FadeIn
                key={t.author}
                delay={(i % 3) * 0.1}
                className={`flex ${i === 3 ? "lg:col-start-2" : ""}`}
              >
                <article className="flex flex-col h-full w-full bg-white border border-neutral-200 p-8 lg:p-10">
                  <blockquote className="flex flex-col h-full">
                    <p className="text-[16px] sm:text-[15px] text-neutral-600 leading-[1.8] mb-6">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <footer className="mt-auto pt-6 flex items-center gap-4">
                      <div className="w-6 h-[1px] bg-forest/30 shrink-0" />
                      <div>
                        <p className="text-[13px] font-medium text-charcoal leading-tight">
                          {t.author}
                        </p>
                        <p className="text-[11px] text-neutral-400 mt-1 leading-tight">
                          {t.context}
                        </p>
                      </div>
                    </footer>
                  </blockquote>
                </article>
              </FadeIn>
            ))}
          </div>

          {/* Google rating badge */}
          <FadeIn>
            <div className="mt-16 pt-12 border-t border-neutral-100 text-center">
              <a
                href="https://www.google.com/search?q=Nicole+Mickle+Orlando+realtor+reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-[0.2em] uppercase text-neutral-300 hover:text-forest transition-colors duration-300"
              >
                5.0 Google Rating
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Quiz CTA ── */}
      <section className="py-20 lg:py-44 bg-forest">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-[10px] tracking-[0.35em] uppercase text-white/40 mb-6">
                Not Sure Where to Start?
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,4vw,3rem)] leading-[1.15] tracking-[-0.02em] text-white mb-4">
                Find your Orlando neighborhood
              </h2>
              <p className="text-[16px] sm:text-[15px] text-white/60 leading-[1.8] mb-10">
                Five questions. Two minutes. Personalized recommendations based
                on your lifestyle, budget, and priorities.
              </p>
              <Link
                href="/quiz"
                className="group inline-flex items-center gap-3 text-[13px] tracking-wide font-medium text-forest bg-white px-8 py-4 hover:bg-white/90 transition-all duration-300"
              >
                Take the quiz
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

      {/* ── Featured In + Awards ── */}
      <FadeIn>
        <section className="border-t border-neutral-100 py-10">
          <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-300 shrink-0">
                As Seen In
              </p>
              <div className="h-[1px] bg-neutral-100 flex-1 hidden md:block" />
              <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
                {mediaLogos.map((logo) => (
                  <span
                    key={logo}
                    className="text-[12px] text-neutral-300 tracking-wide"
                  >
                    {logo}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-300 shrink-0">
                Recognition
              </p>
              <div className="h-[1px] bg-neutral-100 flex-1 hidden md:block" />
              <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
                <span className="text-[12px] text-neutral-300 tracking-wide">
                  Top 125 RE Instagram Influencers (Feedspot, 2019)
                </span>
                <span className="text-[12px] text-neutral-300 tracking-wide">
                  Social Media Marketer of the Year (Orlando Real Producers, 2019)
                </span>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
