import { renderOG, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "About Nicole Mickle";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OG() {
  return renderOG({
    eyebrow: "About",
    title: "Three decades",
    italicTail: "of Orlando",
    subtitle: "From mortgage broker to closing company owner to realtor.",
  });
}
