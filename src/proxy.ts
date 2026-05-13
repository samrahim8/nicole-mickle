/**
 * Edge proxy — Next.js 16's renamed middleware.
 *
 * Safety net for old WordPress URLs that weren't in the explicit redirect
 * map (src/lib/legacy-redirects.ts). If a visitor lands on `/<single-segment>`
 * and a Sanity blog post with that exact slug exists, 308 them to
 * `/blog/<slug>`. Otherwise let the request fall through (and likely hit the
 * styled not-found page).
 *
 * Why a proxy instead of more explicit redirects? Wayback's CDX index only
 * captures URLs the crawler reached. Google has indexed some pages that
 * Wayback missed, and so have Pinterest pins / old emails / business cards.
 * This catches those without us having to enumerate them.
 *
 * Slug lookup hits the Sanity API CDN (cached, ~50ms cold, fast warm). Acceptable
 * overhead on the long tail of unmatched URLs; the matcher excludes everything
 * the new site actually owns so warm requests pay nothing.
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const seg = path.replace(/^\/|\/$/g, "");
  // Only act on bare single-segment paths. Multi-segment paths are routed by
  // the app router as normal.
  if (!seg || seg.includes("/")) return NextResponse.next();

  // Slug-shape only (lowercase, digits, hyphen). Anything else is noise.
  if (!/^[a-z0-9][a-z0-9-]{2,}$/.test(seg)) return NextResponse.next();

  // Ask Sanity if a post exists with this exact slug. Uses the public API CDN
  // — no token needed, cached at the edge.
  const groq = encodeURIComponent(
    `count(*[_type=="post" && slug.current==$slug && !(_id in path("drafts.**"))])`,
  );
  // Sanity params are passed as `$<name>=<json>` query strings.
  const slugParam = encodeURIComponent(JSON.stringify(seg));
  const url = `https://${SANITY_PROJECT_ID}.apicdn.sanity.io/v2025-04-01/data/query/${SANITY_DATASET}?query=${groq}&%24slug=${slugParam}`;

  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return NextResponse.next();
    const json = (await res.json()) as { result: number };
    if (json.result > 0) {
      const dest = new URL(`/blog/${seg}`, request.url);
      return NextResponse.redirect(dest, 308);
    }
  } catch {
    // Sanity hiccup — fail open, let the 404 page render.
  }
  return NextResponse.next();
}

export const config = {
  // Run on every path EXCEPT routes the new site owns + Next internals.
  // Anything listed here renders normally without the Sanity round-trip.
  matcher: [
    "/((?!api|_next|studio|about|accessibility|blog|contact|neighborhoods|new-construction|privacy|quiz|relocating|relocating-from|terms|.*\\..*).*)",
  ],
};
