import { renderOG, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Relocating to Orlando with Nicole Mickle";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OG() {
  return renderOG({
    eyebrow: "Relocation",
    title: "You're choosing a",
    italicTail: "lifestyle",
    subtitle: "30 years matching families to the Orlando neighborhoods that fit their lives.",
  });
}
