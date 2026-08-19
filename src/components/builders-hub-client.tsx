"use client";

import Link from "next/link";
import { FadeIn, SlideIn, Stagger, StaggerChild } from "./animate";
import {
  AreaGrid,
  BuilderCta,
  BuilderFaq,
  BuilderHero,
  RepresentationBand,
} from "./builder-sections";
import { buildersHub } from "@/lib/builders";

export function BuildersHubClient() {
  const hub = buildersHub;

  return (
    <>
      <BuilderHero
        eyebrow="Builders"
        h1Lead={hub.h1Lead}
        h1Display={hub.h1Display}
        intro={hub.intro}
        stats={hub.stats}
        secondaryCta={{
          href: "https://iorlandorealestate.com",
          label: "Search homes",
          external: true,
        }}
      />

      {/* Builders by type */}
      <section className="py-20 lg:py-32 bg-cream">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-5">
              {hub.typesEyebrow}
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-5">
              {hub.typesHeadline}
            </h2>
            <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8] max-w-2xl mb-14 lg:mb-20">
              {hub.typesLead}
            </p>
          </FadeIn>

          {/* Production carries 17 of the 26 builders, so it gets half the row
              and splits into two columns. Even thirds left a dead field of
              whitespace under the two shorter lists. */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {hub.types.map((group, gi) => {
              const wide = group.builders.length > 8;
              return (
              <SlideIn
                key={group.title}
                direction="left"
                delay={gi * 0.1}
                className={wide ? "lg:col-span-6" : "lg:col-span-3"}
              >
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-3">
                  {group.title}
                </h3>
                <p className="text-[15px] text-neutral-500 leading-[1.8] mb-8">
                  {group.description}
                </p>
                <Stagger
                  className={wide ? "sm:columns-2 sm:gap-x-10" : "space-y-0"}
                  staggerDelay={0.04}
                >
                  {group.builders.map((builder, i) => (
                    <StaggerChild key={builder.name} className="break-inside-avoid">
                      <div className="flex gap-5 items-center border-t border-warm-200/60 py-3.5">
                        <span className="text-[11px] tracking-[0.15em] text-neutral-300">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {builder.href ? (
                          <Link
                            href={builder.href}
                            className="group inline-flex items-center gap-2 text-[16px] sm:text-[15px] font-medium text-forest hover:text-forest-light transition-colors duration-300"
                          >
                            {builder.name}
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 16 16"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              aria-hidden="true"
                              className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                            >
                              <path d="M4 12L12 4M12 4H6M12 4v6" />
                            </svg>
                          </Link>
                        ) : (
                          <span className="text-[16px] sm:text-[15px] font-medium text-charcoal">
                            {builder.name}
                          </span>
                        )}
                      </div>
                    </StaggerChild>
                  ))}
                  <div className="border-t border-warm-200/60" />
                </Stagger>
              </SlideIn>
              );
            })}
          </div>
        </div>
      </section>

      <AreaGrid
        eyebrow={hub.submarketsEyebrow}
        headline={hub.submarketsHeadline}
        lead={hub.submarketsLead}
        areas={hub.submarkets}
      />

      <RepresentationBand
        eyebrow={hub.whyEyebrow}
        headline={hub.whyHeadline}
        cardTitle={hub.whyCard.title}
        cardBody={hub.whyCard.body}
      />

      <BuilderFaq headline={hub.faqHeadline} items={hub.faq} />

      <BuilderCta headline={hub.ctaHeadline} body={hub.ctaBody} />
    </>
  );
}
