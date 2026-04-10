/**
 * Sanity Studio mounted at /studio.
 *
 * This route is client-rendered and opts out of static generation and
 * Next.js metadata handling so Studio can manage its own head and state.
 */
"use client";

import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
