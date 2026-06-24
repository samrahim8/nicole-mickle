import type { Metadata } from "next";

import { getPageSeo } from "./page-seo";

/** Site-wide branded OG image (the app/opengraph-image route). Used as the
 *  default share image for pages that have no section-specific image. */
export const DEFAULT_OG_IMAGE = "/opengraph-image";

/**
 * Per-URL title overrides supplied by the SEO contractor (the "Title too long"
 * fixes). These are the COMPLETE title tags, deliberately written without the
 * "| Nicole Mickle Real Estate" brand suffix so they stay under ~60 characters.
 * When a path appears here, buildMetadata() emits it as an absolute title that
 * bypasses the root title.template.
 *
 * Blog post titles are NOT here — those live on each post's `seo.metaTitle`
 * field in Sanity so Nicole's team can edit them without a developer.
 */
export const SEO_TITLES: Record<string, string> = {
  "/": "Nicole Mickle | Orlando Relocation & New Construction",
  "/neighborhoods/lake-nona": "Lake Nona Guide: Living in Orlando's Top Community",
  "/neighborhoods/windermere": "Windermere Guide: Living Near Orlando's Best Lakes",
  "/neighborhoods/winter-park": "Winter Park Guide: Living in Orlando’s Classic Suburb",
  "/neighborhoods/dr-phillips": "Dr. Phillips Guide: Living in Orlando’s Restaurant Row",
  "/neighborhoods/horizon-west": "Horizon West Guide: Living Near Orlando’s Best Areas",
  "/neighborhoods/celebration": "Celebration Guide: Living in Orlando’s Storybook Town",
  "/neighborhoods/apopka": "Apopka Guide: Living Near Orlando’s Natural Beauty",
  "/new-construction/montverde": "New Construction in Montverde: Builders & Pricing",
  "/new-construction/apopka": "New Construction in Apopka: Builders & Pricing",
  "/neighborhoods/ocoee": "Ocoee Guide: Living Near Orlando’s West Side",
  "/new-construction/windermere": "New Construction in Windermere: Builders & Pricing",
  "/neighborhoods/winter-garden": "Winter Garden Guide: Living Near Orlando’s Best",
  "/neighborhoods/sanford": "Sanford Guide: Living in Orlando’s Historic City",
  "/new-construction/dr-phillips": "New Construction in Dr. Phillips: Builders & Pricing",
  "/new-construction/oakland": "New Construction in Oakland: Builders & Communities",
  "/relocating-from/washington-dc": "Moving to Orlando From Washington, D.C.: Full Guide",
  "/new-construction/lake-nona": "New Construction in Lake Nona: Builders & Communities",
  "/new-construction/horizon-west": "New Construction in Horizon West: Builders & Pricing",
  "/relocating-from/illinois": "Moving to Orlando From Illinois: Relocation Guide",
  "/new-construction/ocoee": "New Construction in Ocoee: Builders & Pricing",
  "/new-construction/celebration": "New Construction in Celebration: Builders & Pricing",
  "/new-construction/minneola": "New Construction in Minneola: Builders & Pricing",
  "/neighborhoods/baldwin-park": "Baldwin Park Guide: Living Near Downtown Orlando",
  "/new-construction/lake-mary": "New Construction in Lake Mary: Builders & Pricing",
  "/neighborhoods/clermont": "Clermont Guide: Living Near Orlando’s Rolling Hills",
  "/relocating-from/new-york": "Moving to Orlando From New York: Relocation Guide",
  "/new-construction/baldwin-park": "New Construction in Baldwin Park: Builders & Pricing",
  "/neighborhoods/groveland": "Groveland Guide: Living Near Orlando’s Quiet Side",
  "/relocating-from/massachusetts": "Moving to Orlando From Massachusetts: Relocation Guide",
  "/neighborhoods/oakland": "Oakland Guide: Living Near Orlando’s Small-Town Charm",
  "/new-construction/clermont": "New Construction in Clermont: Builders & Pricing Guide",
  "/new-construction/winter-park": "New Construction in Winter Park: Builders & Pricing",
  "/neighborhoods/lake-mary": "Lake Mary Guide: Living Near Orlando’s Best Suburbs",
  "/new-construction/sanford": "New Construction in Sanford: Builders & Pricing Guide",
  "/new-construction/winter-garden": "New Construction in Winter Garden: Builders & Pricing",
  "/new-construction/groveland": "New Construction in Groveland: Builders & Pricing",
  "/relocating-from/california": "Moving to Orlando From California: Relocation Guide",
  "/relocating-from/georgia": "Moving to Orlando From Georgia: Relocation Guide",
  "/neighborhoods/montverde": "Montverde Guide: Living Near Orlando’s Quiet Side",
  "/neighborhoods/minneola": "Minneola Guide: Living Near Orlando’s Growth Hub",
};

type BuildMetadataInput = {
  /** The page's natural title. Gets the "| Nicole Mickle Real Estate" template
   *  suffix unless a SEO_TITLES override exists for `path`. */
  title: string;
  description: string;
  /** Canonical path, e.g. "/about" or "/neighborhoods/lake-nona". Drives the
   *  canonical URL, the og:url, and the SEO_TITLES lookup. */
  path: string;
  ogType?: "website" | "article";
  /** Absolute URL of a page-specific OG image (e.g. a blog cover). When omitted,
   *  the site-wide app/opengraph-image.tsx is used automatically. */
  ogImage?: string;
  publishedTime?: string;
};

/**
 * Single source of truth for page metadata. Guarantees every page emits a
 * complete, page-specific Open Graph + Twitter card (title, description, url,
 * type) plus a canonical, instead of inheriting the homepage's defaults.
 *
 * Precedence for every field: CMS `pageSeo` override (editable in Studio) >
 * code default (SEO_TITLES map / the title+description passed in) > built-in.
 * A "complete" title (a CMS metaTitle or a SEO_TITLES entry) is emitted as an
 * absolute title so the "| Nicole Mickle Real Estate" template is not appended.
 */
export async function buildMetadata({
  title,
  description,
  path,
  ogType = "website",
  ogImage,
  publishedTime,
}: BuildMetadataInput): Promise<Metadata> {
  const override = await getPageSeo(path);

  const completeTitle = override?.metaTitle ?? SEO_TITLES[path];
  const displayTitle = completeTitle ?? title;
  const finalDescription = override?.metaDescription ?? description;
  const ogTitle = override?.ogTitle ?? displayTitle;
  const ogDescription = override?.ogDescription ?? finalDescription;
  const resolvedOgImage = override?.ogImageUrl ?? ogImage;

  const meta: Metadata = {
    title: completeTitle ? { absolute: completeTitle } : title,
    description: finalDescription,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: path,
      type: ogType,
      ...(publishedTime ? { publishedTime } : {}),
      ...(resolvedOgImage
        ? { images: [{ url: resolvedOgImage, width: 1200, height: 630 }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      ...(resolvedOgImage ? { images: [resolvedOgImage] } : {}),
    },
  };

  if (override?.noindex) meta.robots = { index: false, follow: true };

  return meta;
}
