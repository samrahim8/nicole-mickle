import { createClient, type SanityClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";

// Read-only client used by server components and route handlers.
// Uses the CDN for fast, cached reads.
// Returns null when Sanity env vars are not configured so the build
// doesn't explode in environments that haven't set them up yet.
export const sanityClient: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;
