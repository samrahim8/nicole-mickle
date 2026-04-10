export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-04-01";

// Write token is only used on the server (migration script, webhooks).
// Never expose this to the client.
export const writeToken = process.env.SANITY_API_WRITE_TOKEN;
