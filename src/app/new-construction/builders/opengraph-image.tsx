import { renderOG, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Orlando new construction home builders";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OG() {
  return renderOG({
    eyebrow: "Builders",
    title: "Every Orlando builder",
    italicTail: "worth knowing",
    subtitle: "Custom, semi-custom, and production, by type and by where they build.",
  });
}
