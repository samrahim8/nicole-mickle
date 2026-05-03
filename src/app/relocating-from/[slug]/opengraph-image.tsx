import { renderOG, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";
import { originCities } from "@/lib/relocating-from";

export const runtime = "edge";
export const alt = "Moving to Orlando";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OG({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = originCities.find((c) => c.slug === slug);
  if (!city) {
    return renderOG({
      eyebrow: "Relocation",
      title: "Moving to Orlando",
    });
  }
  return renderOG({
    eyebrow: "Relocation Guide",
    title: `Moving to Orlando`,
    italicTail: `from ${city.name}`,
    subtitle: "Cost of living, neighborhoods, taxes, and timeline.",
  });
}
