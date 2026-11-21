import "server-only";

import { defineQuery } from "next-sanity";

import { sanityFetch } from "@/sanity/live";
import { neighborhoods as codeNeighborhoods, type Neighborhood } from "./neighborhoods";
import {
  neighborhoodPageContent,
  type NeighborhoodLink,
  type NeighborhoodPageContent,
} from "./neighborhood-page-content";
import type { FaqEntry } from "@/components/faq-accordion";

/**
 * Neighborhood guides, editable in Sanity (Studio > Neighborhood Guides).
 *
 * The code copy in neighborhoods.ts + neighborhood-page-content.ts is the
 * fallback, field by field: anything Nicole leaves empty in Studio keeps the
 * code value, so a cleared field never blanks a page and the site still
 * renders if Sanity is unreachable. The set of guides (slugs, routes, static
 * params) stays defined in code.
 */

const neighborhoodPagesQuery = defineQuery(`*[_type == "neighborhoodPage" && defined(slug)]{
  slug, name, tagline, description, priceRange, searchUrl, lifestyleTags, highlights,
  lifestyle, bestFor, notIdealFor, commute, schools, dining, localTips,
  priceSegments[]{label, range, description},
  newConstruction{summary, builders, communities},
  h1Lead, h1Display, intro,
  faq[]{question, answer},
  relatedLinks[]{href, label},
  "heroImageUrl": heroImage.asset->url,
  "galleryImages": gallery[]{ "src": asset->url, alt }
}`);

type SanityNeighborhood = {
  slug: string;
  name?: string | null;
  tagline?: string | null;
  description?: string | null;
  priceRange?: string | null;
  searchUrl?: string | null;
  lifestyleTags?: string[] | null;
  highlights?: string[] | null;
  lifestyle?: string | null;
  bestFor?: string[] | null;
  notIdealFor?: string[] | null;
  commute?: Partial<Neighborhood["commute"]> | null;
  schools?: string[] | null;
  dining?: string[] | null;
  localTips?: string[] | null;
  priceSegments?: Neighborhood["priceSegments"] | null;
  newConstruction?: Partial<Neighborhood["newConstruction"]> | null;
  h1Lead?: string | null;
  h1Display?: string | null;
  intro?: string | null;
  faq?: FaqEntry[] | null;
  relatedLinks?: NeighborhoodLink[] | null;
  heroImageUrl?: string | null;
  galleryImages?: { src?: string | null; alt?: string | null }[] | null;
};

function text(value: string | null | undefined, fallback: string): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function list<T>(value: T[] | null | undefined, fallback: T[]): T[] {
  const cleaned = (value ?? []).filter((v) =>
    typeof v === "string" ? v.trim() !== "" : v != null,
  );
  return cleaned.length > 0 ? cleaned : fallback;
}

function sized(url: string, width: number): string {
  return `${url}?w=${width}&auto=format&q=80`;
}

function mergeNeighborhood(code: Neighborhood, s: SanityNeighborhood | undefined): Neighborhood {
  if (!s) return code;
  const gallery = (s.galleryImages ?? [])
    .filter((g): g is { src: string; alt?: string | null } => Boolean(g?.src))
    .map((g) => ({ src: sized(g.src, 1600), alt: text(g.alt, code.name) }));
  return {
    ...code,
    name: text(s.name, code.name),
    tagline: text(s.tagline, code.tagline),
    description: text(s.description, code.description),
    priceRange: text(s.priceRange, code.priceRange),
    searchUrl: text(s.searchUrl, code.searchUrl),
    image: s.heroImageUrl ? sized(s.heroImageUrl, 2000) : code.image,
    gallery: gallery.length > 0 ? gallery : code.gallery,
    lifestyleTags: list(s.lifestyleTags, code.lifestyleTags),
    highlights: list(s.highlights, code.highlights),
    lifestyle: text(s.lifestyle, code.lifestyle),
    bestFor: list(s.bestFor, code.bestFor),
    notIdealFor: list(s.notIdealFor, code.notIdealFor),
    priceSegments: list(
      (s.priceSegments ?? []).filter((p) => p?.label && p?.range),
      code.priceSegments,
    ).map((p) => ({ ...p, description: p.description ?? "" })),
    newConstruction: {
      summary: text(s.newConstruction?.summary, code.newConstruction.summary),
      builders: list(s.newConstruction?.builders, code.newConstruction.builders),
      communities: list(s.newConstruction?.communities, code.newConstruction.communities),
    },
    schools: list(s.schools, code.schools),
    dining: list(s.dining, code.dining),
    commute: {
      downtown: text(s.commute?.downtown, code.commute.downtown),
      airport: text(s.commute?.airport, code.commute.airport),
      disney: text(s.commute?.disney, code.commute.disney),
    },
    localTips: list(s.localTips, code.localTips),
  };
}

function mergeContent(
  slug: string,
  name: string,
  s: SanityNeighborhood | undefined,
): NeighborhoodPageContent | undefined {
  const code = neighborhoodPageContent[slug];
  if (!s) return code;
  const faq = list(
    (s.faq ?? []).filter((f) => f?.question?.trim() && f?.answer?.trim()),
    [],
  );
  const relatedLinks = list(
    (s.relatedLinks ?? []).filter((l) => l?.href?.trim() && l?.label?.trim()),
    [],
  );
  const merged: NeighborhoodPageContent = {
    seoTitle: code?.seoTitle ?? "",
    metaDescription: code?.metaDescription ?? "",
    // Once a Studio doc exists it is the source of truth for these optional
    // sections, so Nicole can also remove an intro or FAQ by clearing it.
    h1Lead: s.h1Lead?.trim() ?? "",
    h1Display: text(s.h1Display, name),
    intro: s.intro?.trim() ?? "",
    relatedLinks,
    faq,
  };
  const hasAny = merged.h1Lead || merged.intro || faq.length > 0 || relatedLinks.length > 0 || s.h1Display?.trim();
  return hasAny || code ? merged : undefined;
}

export type NeighborhoodGuide = {
  neighborhood: Neighborhood;
  content: NeighborhoodPageContent | undefined;
};

/** Every guide, in code order, with Studio edits applied. */
export async function getNeighborhoodGuides(): Promise<NeighborhoodGuide[]> {
  let docs: SanityNeighborhood[] = [];
  try {
    const { data } = await sanityFetch({ query: neighborhoodPagesQuery });
    docs = (data as SanityNeighborhood[] | null) ?? [];
  } catch (err) {
    console.error("[neighborhoods] Sanity fetch failed, using code copy", err);
  }
  const bySlug = new Map(docs.map((d) => [d.slug, d]));
  return codeNeighborhoods.map((code) => {
    const s = bySlug.get(code.slug);
    const neighborhood = mergeNeighborhood(code, s);
    return { neighborhood, content: mergeContent(code.slug, neighborhood.name, s) };
  });
}

export async function getNeighborhoods(): Promise<Neighborhood[]> {
  return (await getNeighborhoodGuides()).map((g) => g.neighborhood);
}
