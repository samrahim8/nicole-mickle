import { renderOG, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Orlando neighborhood guides";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OG() {
  return renderOG({
    eyebrow: "Neighborhoods",
    title: "Orlando isn't one place.",
    italicTail: "It's many.",
    subtitle: "17 neighborhood guides from a 30-year local.",
  });
}
