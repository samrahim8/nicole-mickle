import { defineField, defineType } from "sanity";

/**
 * Per-URL SEO override. A collection (one document per route) that lets the
 * SEO team manage title / meta description / Open Graph for ANY page from the
 * Studio, without a developer. This is the self-serve answer to "can you add
 * the option to manage Open Graph fields for pages?".
 *
 * Precedence at render time (src/lib/seo.ts buildMetadata):
 *   this override  >  code defaults (SEO_TITLES / page fallback)  >  built-in.
 *
 * Mainly used for the code-driven pages that have no singleton (home, the 17
 * neighborhood guides, 17 new-construction pages, 6 relocating-from pages).
 * The singleton pages (About, Relocating, New Construction, Quiz, Contact)
 * also have their own "SEO" group; an override here still wins if one exists.
 */
export const pageSeo = defineType({
  name: "pageSeo",
  title: "Page SEO",
  type: "document",
  fields: [
    defineField({
      name: "path",
      title: "Page URL path",
      description:
        'The path of the page to control, starting with "/". Examples: "/" for the homepage, "/neighborhoods/lake-nona", "/relocating-from/new-york". Must match the live URL exactly.',
      type: "string",
      validation: (rule) =>
        rule.required().custom(async (path, context) => {
          if (!path) return "Path is required";
          if (!path.startsWith("/")) return 'Path must start with "/"';
          if (/\s/.test(path)) return "Path cannot contain spaces";
          // Enforce one override per path (ignoring the draft/published pair).
          const { document, getClient } = context;
          const client = getClient({ apiVersion: "2025-04-01" });
          const id = (document?._id ?? "").replace(/^drafts\./, "");
          const count = await client.fetch<number>(
            `count(*[_type == "pageSeo" && path == $path && !(_id in [$id, $draft])])`,
            { path, id, draft: `drafts.${id}` },
          );
          return count > 0 ? "Another Page SEO entry already uses this path" : true;
        }),
    }),
    defineField({
      name: "metaTitle",
      title: "Title tag",
      description:
        "The clickable title in Google and the browser tab. Aim for 50-60 characters. This replaces the default title for this page exactly as written (no site name is appended).",
      type: "string",
      validation: (rule) =>
        rule.max(60).warning("Titles over 60 characters get truncated in search results."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      description:
        "The grey summary text under the title in Google. Aim for 120-160 characters.",
      type: "text",
      rows: 3,
      validation: (rule) =>
        rule
          .max(160)
          .warning("Descriptions over 160 characters get truncated in search results."),
    }),
    defineField({
      name: "ogTitle",
      title: "Social share title (Open Graph)",
      description:
        "Title shown when the page is shared on Facebook, LinkedIn, iMessage, etc. Leave blank to reuse the Title tag above.",
      type: "string",
    }),
    defineField({
      name: "ogDescription",
      title: "Social share description (Open Graph)",
      description: "Leave blank to reuse the Meta description above.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ogImage",
      title: "Social share image (Open Graph)",
      description:
        "Image shown when the page is shared. 1200x630px works best. Leave blank to use the site's auto-generated branded image.",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: (rule) =>
            rule.required().warning("Add alt text for accessibility and SEO."),
        },
      ],
    }),
    defineField({
      name: "noindex",
      title: "Hide from search engines (noindex)",
      description:
        "Turn on to ask Google not to index this page. Leave off for normal pages.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "path", subtitle: "metaTitle" },
    prepare: ({ title, subtitle }) => ({
      title: title || "(no path set)",
      subtitle: subtitle || "No title override",
    }),
  },
});
