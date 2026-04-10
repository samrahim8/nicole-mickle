import { sanityClient } from "@/sanity/client";

const SITE_URL = "https://nicolemickle.com";

export const revalidate = 600;

type RssPost = {
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt: string;
  author?: { name: string } | null;
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(): Promise<Response> {
  const posts = await sanityClient.fetch<RssPost[]>(
    `*[_type == "post" && defined(slug.current) && defined(publishedAt)]
      | order(publishedAt desc) [0...50] {
        title,
        "slug": slug.current,
        excerpt,
        publishedAt,
        "author": author->{ name }
      }`,
  );

  const items = (posts ?? [])
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = new Date(post.publishedAt).toUTCString();
      const author = post.author?.name
        ? `<dc:creator><![CDATA[${post.author.name}]]></dc:creator>`
        : "";
      const description = post.excerpt
        ? `<description><![CDATA[${post.excerpt}]]></description>`
        : "";
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      ${author}
      ${description}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Nicole Mickle — Journal</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Orlando relocation, new construction, and neighborhood insights from Nicole Mickle.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400",
    },
  });
}
