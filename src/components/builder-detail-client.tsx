"use client";

import { FadeIn, SlideIn, Stagger, StaggerChild } from "./animate";
import {
  AreaGrid,
  BackLink,
  BuilderCta,
  BuilderFaq,
  BuilderHero,
  RepresentationBand,
} from "./builder-sections";
import type { BuilderPageContent } from "@/lib/builders";

const ALL_BUILDERS = {
  href: "/new-construction/builders",
  label: "All Orlando builders",
};

export function BuilderDetailClient({ builder }: { builder: BuilderPageContent }) {
  return (
    <>
      <section className="pt-32 lg:pt-44">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <BackLink href={ALL_BUILDERS.href} label={ALL_BUILDERS.label} />
        </div>
      </section>

      <BuilderHero
        spacing="compact"
        eyebrow={`Builders · ${builder.name}`}
        h1Lead={builder.h1Lead}
        h1Display={builder.h1Display}
        intro={builder.intro}
        stats={builder.stats}
        secondaryCta={builder.secondaryCta}
      />

      {/* My take */}
      <section className="py-20 lg:py-32 bg-cream">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            <SlideIn direction="left" className="lg:col-span-4">
              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
                My Take
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-6">
                {builder.takeHeadline}
              </h2>
              <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.85]">
                {builder.takeLead}
              </p>
            </SlideIn>

            <div className="lg:col-span-7 lg:col-start-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {builder.takeLists.map((list, li) => (
                <FadeIn key={list.title} delay={li * 0.1}>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-5">
                    {list.title}
                  </p>
                  <Stagger className="space-y-0" staggerDelay={0.04}>
                    {list.items.map((item, i) => (
                      <StaggerChild key={item}>
                        <div className="flex gap-4 border-t border-warm-200/60 py-3.5">
                          <span className="text-[11px] tracking-[0.15em] text-neutral-300 mt-1">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[15px] text-charcoal leading-[1.6]">
                            {item}
                          </span>
                        </div>
                      </StaggerChild>
                    ))}
                    <div className="border-t border-warm-200/60" />
                  </Stagger>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AreaGrid
        eyebrow="Where They Build"
        headline={builder.whereHeadline}
        lead="Builder quality varies by community, not just by brand. Here's where to look, and the neighborhood guides to go deeper."
        areas={builder.areas}
      />

      <RepresentationBand
        eyebrow="Representation"
        headline={builder.representationHeadline}
        cardTitle="I know this builder"
        cardBody={builder.representationBody}
      />

      <BuilderFaq headline={builder.faqHeadline} items={builder.faq} />

      <BuilderCta
        headline={builder.ctaHeadline}
        body="I'll tell you what I know about their communities, their contracts, and where the room is. No pressure, just a straight answer before you sign anything."
        footerLink={ALL_BUILDERS}
      />
    </>
  );
}
