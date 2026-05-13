"use client";

import Image from "next/image";
import { FadeIn, SlideIn, TextReveal, Stagger, StaggerChild } from "./animate";

export type AboutMilestone = {
  period: string;
  title: string;
  description: string;
};

export type AboutData = {
  heroEyebrow: string;
  heroHeadlineLine1: string;
  heroHeadlineLine2: string;
  heroParagraphs: string[];
  heroImage: { src: string; alt: string };
  journeyEyebrow: string;
  journeyHeadline: string;
  milestones: AboutMilestone[];
  credentialsEyebrow: string;
  credentialsHeadline: string;
  credentialItems: string[];
  discretionEyebrow: string;
  discretionHeadline: string;
  discretionParagraphs: string[];
};

export function AboutClient({ data }: { data: AboutData }) {
  return (
    <>
      {/* Hero - Editorial split */}
      <section className="pt-20 sm:pt-32 pb-16 lg:pt-44 lg:pb-24">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="lg:col-span-5 relative pl-8 lg:pl-10">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-forest" />
              <FadeIn>
                <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-6">
                  {data.heroEyebrow}
                </p>
              </FadeIn>
              <TextReveal delay={0.1}>
                <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-charcoal">
                  {data.heroHeadlineLine1}
                </h1>
              </TextReveal>
              <TextReveal delay={0.2}>
                <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-charcoal italic">
                  {data.heroHeadlineLine2}
                </h1>
              </TextReveal>

              <FadeIn delay={0.5} className="mt-10">
                {data.heroParagraphs.map((p, i) => (
                  <p
                    key={i}
                    className={`text-[16px] sm:text-[15px] text-neutral-500 leading-[1.75]${
                      i < data.heroParagraphs.length - 1 ? " mb-6" : ""
                    }`}
                  >
                    {p}
                  </p>
                ))}
              </FadeIn>
            </div>

            {/* Photo */}
            <SlideIn direction="right" delay={0.3} className="lg:col-span-6 lg:col-start-7">
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src={data.heroImage.src}
                  alt={data.heroImage.alt}
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Journey - Timeline style - Deep forest green */}
      <section className="py-20 lg:py-44 bg-forest">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.3em] uppercase text-white/50 mb-4">
              {data.journeyEyebrow}
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-white max-w-lg mb-16 lg:mb-24">
              {data.journeyHeadline}
            </h2>
          </FadeIn>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8" staggerDelay={0.1}>
            {data.milestones.map((m) => (
              <StaggerChild key={`${m.period}-${m.title}`} className="flex">
                <article className="flex flex-col h-full w-full bg-white/5 border border-white/10 p-8 lg:p-10">
                  <span className="text-[11px] tracking-[0.25em] uppercase text-white/40 font-medium mb-5">
                    {m.period}
                  </span>
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl lg:text-2xl text-white mb-4 min-h-[2lh]">
                    {m.title}
                  </h3>
                  <p className="text-[15px] text-white/70 leading-[1.8]">
                    {m.description}
                  </p>
                </article>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20 lg:py-44">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <FadeIn>
                <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-4">
                  {data.credentialsEyebrow}
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.15] tracking-[-0.02em] text-charcoal">
                  {data.credentialsHeadline}
                </h2>
              </FadeIn>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4" staggerDelay={0.05}>
                {data.credentialItems.map((cred) => (
                  <StaggerChild key={cred} className="flex">
                    <div className="flex items-start gap-3 bg-white border border-neutral-200 px-5 py-4 w-full h-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-forest shrink-0 mt-[7px]" />
                      <span className="text-[14px] text-charcoal leading-relaxed">{cred}</span>
                    </div>
                  </StaggerChild>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* Discretion */}
      <section className="py-20 lg:py-44 border-t border-neutral-100">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <FadeIn className="lg:col-span-4 relative pl-8 lg:pl-10">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-forest" />
              <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-4">
                {data.discretionEyebrow}
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.15] tracking-[-0.02em] text-charcoal">
                {data.discretionHeadline}
              </h2>
            </FadeIn>
            <div className="lg:col-span-7 lg:col-start-6">
              <FadeIn delay={0.1}>
                {data.discretionParagraphs.map((p, i) => (
                  <p
                    key={i}
                    className={`text-[16px] sm:text-[15px] text-neutral-500 leading-[1.85]${
                      i < data.discretionParagraphs.length - 1 ? " mb-6" : ""
                    }`}
                  >
                    {p}
                  </p>
                ))}
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
