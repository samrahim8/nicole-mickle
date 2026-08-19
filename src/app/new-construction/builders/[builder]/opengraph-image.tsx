import { renderOG, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";
import { getBuilderPage } from "@/lib/builders";

export const runtime = "edge";
export const alt = "Orlando new construction builder guide";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OG({
  params,
}: {
  params: Promise<{ builder: string }>;
}) {
  const { builder } = await params;
  const page = getBuilderPage(builder);
  if (!page) {
    return renderOG({
      eyebrow: "Builders",
      title: "Orlando new construction builders",
    });
  }
  return renderOG({
    eyebrow: "Builders",
    title: page.name,
    italicTail: "in Orlando",
    subtitle: "The sales office works for the builder. I work for you.",
  });
}
