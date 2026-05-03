import { renderOG, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Find your Orlando neighborhood";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OG() {
  return renderOG({
    eyebrow: "Neighborhood Quiz",
    title: "Find your Orlando",
    italicTail: "neighborhood",
    subtitle: "Five questions. Two minutes. Personalized recommendations.",
  });
}
