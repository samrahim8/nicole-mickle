import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
    { name: "meta", title: "Meta" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description:
        "Shown on the blog index and used as the default meta description. 1–2 sentences.",
      validation: (rule) => rule.max(260),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: (rule) => rule.required(),
        },
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "portableText",
      group: "content",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      group: "meta",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      group: "meta",
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "meta",
      validation: (rule) => rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "featured",
      title: "Feature on blog home",
      type: "boolean",
      group: "meta",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      title: "SEO overrides",
      type: "object",
      group: "seo",
      fields: [
        {
          name: "metaTitle",
          title: "Meta title",
          type: "string",
          description: "Falls back to the post title if empty.",
          validation: (rule) => rule.max(70),
        },
        {
          name: "metaDescription",
          title: "Meta description",
          type: "text",
          rows: 3,
          description: "Falls back to the excerpt if empty.",
          validation: (rule) => rule.max(180),
        },
        {
          name: "ogImage",
          title: "Social share image",
          type: "image",
          description: "Falls back to cover image if empty.",
        },
      ],
    }),
    defineField({
      name: "legacyWordpressId",
      title: "Legacy WordPress ID",
      type: "number",
      group: "meta",
      readOnly: true,
      description:
        "Set automatically by the migration script to prevent duplicate imports. Do not edit.",
      hidden: ({ value }) => !value,
    }),
    defineField({
      name: "legacyWordpressUrl",
      title: "Legacy WordPress URL",
      type: "url",
      group: "meta",
      readOnly: true,
      description:
        "Original WP permalink, kept for reference and redirect auditing.",
      hidden: ({ value }) => !value,
    }),
  ],
  orderings: [
    {
      title: "Published (newest)",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Published (oldest)",
      name: "publishedAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
      date: "publishedAt",
    },
    prepare({ title, media, date }) {
      const formatted = date
        ? new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "Unpublished";
      return { title, media, subtitle: formatted };
    },
  },
});
