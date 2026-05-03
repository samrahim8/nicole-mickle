import { renderOG, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Contact Nicole Mickle";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OG() {
  return renderOG({
    eyebrow: "Contact",
    title: "Let's start a",
    italicTail: "conversation",
    subtitle: "No pressure, no pitch. Just honest answers about Orlando.",
  });
}
