import { defineLive } from "next-sanity/live";
import { sanityClient } from "./client";

/**
 * Live-content pipeline used by every page fetch when draft mode is on.
 * Outside draft mode it behaves like a normal CDN fetch; inside draft mode
 * (entered via /api/draft-mode/enable from Sanity Presentation) it streams
 * unpublished content + stega-encoded source maps so the visual editor can
 * highlight which field each rendered string came from.
 *
 * Falls back to a noop sanityFetch when the project hasn't been wired up
 * (no projectId / no client) so static pages still render.
 */
export const { sanityFetch, SanityLive } = sanityClient
  ? defineLive({
      client: sanityClient.withConfig({
        // Bump apiVersion for live edits (per Sanity's recommendation).
        apiVersion: "vX",
        // Stega embeds invisible source-map markers in the response so the
        // Presentation visual editor can map rendered text back to the
        // Sanity field it came from. Studio is mounted at /studio.
        stega: {
          studioUrl: "/studio",
        },
      }),
      serverToken: process.env.SANITY_API_WRITE_TOKEN,
      browserToken: process.env.NEXT_PUBLIC_SANITY_VIEWER_TOKEN,
    })
  : {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sanityFetch: (async () => ({ data: null, sourceMap: null, tags: [] })) as any,
      SanityLive: () => null,
    };
