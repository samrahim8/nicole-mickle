import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";

// Read-only client used by server components and route handlers.
// Uses the CDN for fast, cached reads.
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
