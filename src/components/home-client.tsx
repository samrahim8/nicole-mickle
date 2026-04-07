"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FadeIn, SlideIn, TextReveal, Stagger, StaggerChild } from "./animate";
import type { Neighborhood } from "@/lib/neighborhoods";

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

  return (
    <>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
      >
        <motion.div
          style={{ opacity: heroOpacity }}
          className="max-w-[90rem] mx-auto px-6 lg:px-12 w-full text-center"
        >
          <TextReveal delay={0.3}>
            <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,7vw,7rem)] leading-[1.1] tracking-[-0.03em] text-charcoal font-normal">
              Orlando&apos;s relocation
            </h1>
          </TextReveal>
          <TextReveal delay={0.4}>
            <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,7vw,7rem)] leading-[1.1] tracking-[-0.03em] text-charcoal font-normal">
              &amp; new construction
            </h1>
          </TextReveal>
          <TextReveal delay={0.5}>
            <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,7vw,7rem)] leading-[1.1] tracking-[-0.03em] text-charcoal font-normal italic">
              specialist
            </h1>
          </TextReveal>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-10"
          >
            <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8] max-w-lg mx-auto">
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
              className="group text-[15px] sm:text-[13px] tracking-wide font-medium text-[#1B3A2D] flex items-center gap-2 border-b border-[#1B3A2D] pb-0.5 hover:border-[#234B39] hover:text-[#234B39] transition-all duration-300"
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
            <span className="text-neutral-200">|</span>
            <a
              href="https://iorlandorealestate.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] sm:text-[13px] tracking-wide text-neutral-400 hover:text-charcoal transition-colors duration-300"
            >
              Search homes
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator — rotated text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-neutral-300"
          />
        </motion.div>
      </section>

      {/* ── Positioning ── */}
      <section className="border-y border-neutral-100">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 py-5">
          <FadeIn>
            <p className="text-center text-[11px] tracking-[0.35em] uppercase text-neutral-400">
              Simplifying the real estate process
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
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-6">
                  About Nicole
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-8">
                  The most trusted name in Orlando real estate
                </h2>
                <p className="text-[16px] sm:text-[14px] text-neutral-500 leading-[1.8] mb-4">
                  A Central Florida native with nearly 30 years in the industry.
                  Mortgage broker, nationwide closing company owner, and now a
                  realtor with Olympus Executive Realty. Nicole understands every
                  stage of the transaction from the inside out.
                </p>
                <p className="text-[16px] sm:text-[14px] text-neutral-500 leading-[1.8] mb-8">
                  Certified International Property Specialist. Founder of
                  Florida Homes and Living. Specializing in relocation and new
                  construction throughout Central Florida.
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
                  className="group text-[15px] sm:text-[13px] tracking-wide text-[#1B3A2D] flex items-center gap-2 border-b border-[#1B3A2D] pb-0.5 hover:border-[#234B39] hover:text-[#234B39] transition-all duration-300 w-fit"
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
                Every move starts with
                <br />a different question
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
                    <h3 className="lg:col-span-4 font-[family-name:var(--font-playfair)] text-[clamp(1.25rem,2.5vw,2rem)] leading-[1.2] text-charcoal group-hover:text-[#1B3A2D] transition-colors duration-500">
                      {item.title}
                    </h3>
                    <p className="lg:col-span-5 text-[16px] sm:text-[14px] text-neutral-500 leading-[1.7]">
                      {item.description}
                    </p>
                    <div className="lg:col-span-2 flex lg:justify-end">
                      <span className="text-[12px] tracking-wide text-neutral-400 group-hover:text-[#1B3A2D] transition-colors duration-300 flex items-center gap-2">
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

      {/* ── Neighborhoods — deep forest green ── */}
      <section className="py-20 lg:py-44 bg-[#1B3A2D] text-white">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 lg:mb-24">
              <div>
                <p className="text-[10px] tracking-[0.35em] uppercase text-white/40 mb-5">
                  Neighborhoods
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.15] tracking-[-0.02em]">
                  Orlando isn&apos;t one place.
                  <span className="italic"> It&apos;s many.</span>
                </h2>
              </div>
              <Link
                href="/neighborhoods"
                className="text-[12px] tracking-wide text-white/50 hover:text-white transition-colors duration-300 flex items-center gap-2 shrink-0"
              >
                View all
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </div>
          </FadeIn>

          {/* Image-first editorial grid */}
          <Stagger
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
            staggerDelay={0.05}
          >
            {neighborhoods.map((n) => (
              <StaggerChild key={n.slug}>
                <Link
                  href={`/neighborhoods/${n.slug}`}
                  className="group block relative overflow-hidden"
                >
                  <div className="relative bg-[#234B39] aspect-[3/4]">
                    {/* Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white/15">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" className="mx-auto">
                          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                          
                        </svg>
                      </div>
                    </div>

                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A2D] via-[#1B3A2D]/20 to-transparent" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2">
                        {n.lifestyleTags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[8px] tracking-[0.2em] uppercase text-white/35"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-[family-name:var(--font-playfair)] text-white text-lg mb-1">
                        {n.name}
                      </h3>
                      <p className="text-[12px] text-white/40 group-hover:text-white/60 transition-colors duration-500">
                        {n.tagline}
                      </p>
                    </div>
                  </div>
                </Link>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Testimonials — editorial spread ── */}
      <section className="py-20 lg:py-44">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-16 lg:mb-24">
              What Clients Say
            </p>
          </FadeIn>

          {/* Featured quote — large, asymmetric */}
          <FadeIn>
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="hidden lg:block lg:col-span-1">
                <span className="font-[family-name:var(--font-playfair)] text-[8rem] leading-none text-[#1B3A2D]/10 select-none">
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
                  <div className="w-8 h-[1px] bg-[#1B3A2D]/20" />
                  <div>
                    <p className="text-[15px] sm:text-[13px] font-medium text-charcoal">
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

          {/* Secondary quotes — 3-column grid */}
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16 mt-20 lg:mt-28 pt-16 lg:pt-20 border-t border-neutral-100">
            {testimonials.slice(1, 4).map((t, i) => (
              <FadeIn key={t.author} delay={i * 0.1}>
                <blockquote>
                  <p className="text-[16px] sm:text-[14px] text-neutral-500 leading-[1.8] mb-6">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <footer className="flex items-center gap-4">
                    <div className="w-6 h-[1px] bg-[#1B3A2D]/20" />
                    <div>
                      <p className="text-[15px] sm:text-[13px] font-medium text-charcoal">
                        {t.author}
                      </p>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        {t.context}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </FadeIn>
            ))}
          </div>

          {/* More reviews row */}
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16 mt-12 pt-12 border-t border-neutral-100">
            {testimonials.slice(4).map((t, i) => (
              <FadeIn key={t.author} delay={i * 0.1}>
                <blockquote>
                  <p className="text-[16px] sm:text-[14px] text-neutral-500 leading-[1.8] mb-6">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <footer className="flex items-center gap-4">
                    <div className="w-6 h-[1px] bg-[#1B3A2D]/20" />
                    <div>
                      <p className="text-[15px] sm:text-[13px] font-medium text-charcoal">
                        {t.author}
                      </p>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        {t.context}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </FadeIn>
            ))}
          </div>

          {/* Google rating badge */}
          <FadeIn>
            <div className="mt-16 pt-12 border-t border-neutral-100 text-center">
              <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-300">
                5.0 Google Rating &middot; 21 Reviews
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Quiz CTA ── */}
      <section className="py-20 lg:py-44 bg-[#1B3A2D]">
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
                className="group inline-flex items-center gap-3 text-[15px] sm:text-[13px] tracking-wide font-medium text-[#1B3A2D] bg-white px-8 py-4 hover:bg-white/90 transition-all duration-300"
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
                  Top 125 RE Instagram Influencers (Feedspot)
                </span>
                <span className="text-[12px] text-neutral-300 tracking-wide">
                  Social Media Marketer of the Year (Orlando Real Producers)
                </span>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
