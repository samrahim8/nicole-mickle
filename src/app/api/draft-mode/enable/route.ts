import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { sanityClient } from "@/sanity/client";

/**
 * Route hit by Sanity Presentation when an editor clicks "Preview" or
 * navigates into the visual editing pane. Validates the preview secret,
 * enables Next.js draft mode (sets a signed cookie), and redirects back
 * to the page being previewed.
 */
export const { GET } = sanityClient
  ? defineEnableDraftMode({
      client: sanityClient.withConfig({
        token: process.env.SANITY_API_WRITE_TOKEN,
      }),
    })
  : { GET: async () => new Response("Sanity not configured", { status: 503 }) };
