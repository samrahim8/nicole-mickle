import { renderOG, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";
import { neighborhoods } from "@/lib/neighborhoods";

export const runtime = "edge";
export const alt = "Orlando neighborhood guide";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OG({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const n = neighborhoods.find((nb) => nb.slug === slug);
  if (!n) {
    return renderOG({
      eyebrow: "Neighborhood Guide",
      title: "Orlando neighborhoods",
    });
  }
  return renderOG({
    eyebrow: "Neighborhood Guide",
    title: n.name,
    subtitle: n.tagline,
  });
}
