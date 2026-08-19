"use client";

import Link from "next/link";
import { FadeIn, SlideIn, TextReveal, Stagger, StaggerChild } from "./animate";
import { FaqAccordion, type FaqEntry } from "./faq-accordion";
import {
  REPRESENTATION_CARD,
  type BuilderArea,
  type BuilderLink,
  type BuilderStat,
} from "@/lib/builders";

/* Shared building blocks for the builders hub and the individual builder pages.
   Both pages use the same section order (hero + stat card, content, dark
   representation band, FAQ, CTA) so they read as one family. */

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function BackLink({ href, label }: BuilderLink) {
  return (
    <FadeIn>
      <Link
        href={href}
        className="text-[12px] tracking-wide text-neutral-400 hover:text-charcoal transition-colors duration-300 mb-10 lg:mb-14 inline-flex items-center gap-2 py-2"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M13 8H3M7 4l-4 4 4 4" />
        </svg>
        {label}
      </Link>
    </FadeIn>
  );
}

export function BuilderHero({
  eyebrow,
  h1Lead,
  h1Display,
  intro,
  stats,
  secondaryCta,
  /** Compact when a back link already sits above the hero and has cleared the
   *  fixed navbar. */
  spacing = "full",
}: {
  eyebrow: string;
  h1Lead: string;
  h1Display: string;
  intro: string;
  stats: BuilderStat[];
  secondaryCta: BuilderLink;
  spacing?: "full" | "compact";
}) {
  return (
    <section
      className={
        spacing === "full"
          ? "pt-20 sm:pt-32 pb-20 lg:pt-44 lg:pb-32"
          : "pt-2 pb-20 lg:pb-32"
      }
    >
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-end">
          <div className="lg:col-span-7">
            <FadeIn>
              <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-6">
                {eyebrow}
              </p>
            </FadeIn>
            {/* One <h1> per page. The two reveal lines are spans inside it so the
                heading still reads as the full keyword phrase. */}
            <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-charcoal">
              <TextReveal>
                <span className="block">{h1Lead}</span>
              </TextReveal>
              <TextReveal delay={0.1}>
                <span className="block italic">{h1Display}</span>
              </TextReveal>
            </h1>
            <FadeIn delay={0.4}>
              <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8] max-w-xl mt-8 mb-10">
                {intro}
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 items-center">
                <Link
                  href="/contact"
                  className="group text-[13px] tracking-wide font-medium text-forest flex items-center gap-2 border-b border-forest pb-0.5 hover:border-forest-light hover:text-forest-light transition-all duration-300"
                >
                  Discuss your build
                  <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <span className="text-neutral-200 hidden sm:block">|</span>
                {secondaryCta.external ? (
                  <a
                    href={secondaryCta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] tracking-wide text-neutral-400 hover:text-charcoal transition-colors duration-300"
                  >
                    {secondaryCta.label}
                  </a>
                ) : (
                  <Link
                    href={secondaryCta.href}
                    className="text-[13px] tracking-wide text-neutral-400 hover:text-charcoal transition-colors duration-300"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <FadeIn delay={0.5}>
              <div className="bg-forest p-8 lg:p-10 space-y-6">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={i < stats.length - 1 ? "border-b border-white/15 pb-6" : ""}
                  >
                    <p className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] text-white">
                      {stat.value}
                    </p>
                    <p className="text-[11px] tracking-[0.2em] uppercase text-white/50 mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/** "Where they build" / "Who's building where" cards. */
export function AreaGrid({
  eyebrow,
  headline,
  lead,
  areas,
}: {
  eyebrow: string;
  headline: string;
  lead: string;
  areas: BuilderArea[];
}) {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <FadeIn>
          <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
            {eyebrow}
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-5">
            {headline}
          </h2>
          <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8] max-w-2xl mb-14 lg:mb-20">
            {lead}
          </p>
        </FadeIn>
        <Stagger
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-warm-200/60"
          staggerDelay={0.08}
        >
          {areas.map((area) => (
            <StaggerChild key={area.name} className="flex bg-warm-200/60">
              <article className="flex flex-col h-full w-full bg-white p-8 lg:p-10">
                <h3 className="font-[family-name:var(--font-playfair)] text-xl text-charcoal mb-3">
                  {area.name}
                </h3>
                <p className="text-[15px] text-neutral-500 leading-[1.8] mb-6">
                  {area.body}
                </p>
                <div className="mt-auto flex flex-col items-start gap-2">
                  {area.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-[13px] tracking-wide font-medium text-forest hover:text-forest-light transition-colors duration-300"
                    >
                      {link.label}
                      <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  ))}
                </div>
              </article>
            </StaggerChild>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/** The one dark forest band each page is allowed. */
export function RepresentationBand({
  eyebrow,
  headline,
  cardTitle,
  cardBody,
}: {
  eyebrow: string;
  headline: string;
  cardTitle: string;
  cardBody: string;
}) {
  return (
    <section className="py-20 lg:py-32 bg-forest text-white">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <FadeIn className="lg:col-span-4">
            <p className="text-[10px] tracking-[0.35em] uppercase text-white/40 mb-5">
              {eyebrow}
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-white">
              {headline}
            </h2>
          </FadeIn>
          <div className="lg:col-span-7 lg:col-start-6">
            <SlideIn direction="right">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
                <article className="flex flex-col h-full bg-white/5 border border-white/10 p-7 lg:p-8">
                  <h3 className="text-base font-medium text-white mb-3 min-h-[2lh]">
                    {cardTitle}
                  </h3>
                  <p className="text-[15px] text-white/70 leading-[1.8]">{cardBody}</p>
                </article>
                <article className="flex flex-col h-full bg-white/5 border border-white/10 p-7 lg:p-8">
                  <h3 className="text-base font-medium text-white mb-3 min-h-[2lh]">
                    {REPRESENTATION_CARD.title}
                  </h3>
                  <p className="text-[15px] text-white/70 leading-[1.8]">
                    {REPRESENTATION_CARD.bodyBefore}
                    <Link
                      href={REPRESENTATION_CARD.link.href}
                      className="text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors duration-300"
                    >
                      {REPRESENTATION_CARD.link.label}
                    </Link>
                    {REPRESENTATION_CARD.bodyAfter}
                  </p>
                </article>
              </div>
            </SlideIn>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BuilderFaq({
  headline,
  items,
}: {
  headline: string;
  items: FaqEntry[];
}) {
  return (
    <section className="py-20 lg:py-32 bg-linen">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
          <FadeIn className="lg:col-span-4">
            <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
              Frequently Asked
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-charcoal">
              {headline}
            </h2>
          </FadeIn>
          <div className="lg:col-span-7 lg:col-start-6">
            <FaqAccordion items={items} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function BuilderCta({
  headline,
  body,
  footerLink,
}: {
  headline: string;
  body: string;
  footerLink?: BuilderLink;
}) {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <SlideIn direction="left" className="max-w-2xl">
          <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
            Next Step
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-4">
            {headline}
          </h2>
          <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8] mb-8">
            {body}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-forest text-white px-8 py-3.5 text-[13px] tracking-wide font-medium hover:bg-forest-light transition-colors duration-300"
          >
            Start the conversation
          </Link>
          {footerLink ? (
            <p className="mt-10 pt-8 border-t border-warm-200/60">
              <Link
                href={footerLink.href}
                className="group inline-flex items-center gap-2 text-[13px] tracking-wide text-neutral-400 hover:text-charcoal transition-colors duration-300"
              >
                {footerLink.label}
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </p>
          ) : null}
        </SlideIn>
      </div>
    </section>
  );
}
