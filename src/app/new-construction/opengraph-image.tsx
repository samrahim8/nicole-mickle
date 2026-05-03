import { renderOG, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Orlando new construction with Nicole Mickle";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OG() {
  return renderOG({
    eyebrow: "New Construction",
    title: "From contract",
    italicTail: "to closing",
    subtitle: "Builder selection, upgrade strategy, and timeline oversight.",
  });
}
