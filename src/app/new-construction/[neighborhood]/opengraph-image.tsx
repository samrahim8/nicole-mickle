import { renderOG, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";
import { neighborhoods } from "@/lib/neighborhoods";

export const runtime = "edge";
export const alt = "New construction in Orlando";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OG({
  params,
}: {
  params: Promise<{ neighborhood: string }>;
}) {
  const { neighborhood } = await params;
  const n = neighborhoods.find((nb) => nb.slug === neighborhood);
  if (!n || n.newConstruction.builders.length === 0) {
    return renderOG({
      eyebrow: "New Construction",
      title: "Orlando new construction",
    });
  }
  return renderOG({
    eyebrow: "New Construction",
    title: `Building in`,
    italicTail: n.name,
    subtitle: `Active builders include ${n.newConstruction.builders.slice(0, 3).join(", ")}.`,
  });
}
