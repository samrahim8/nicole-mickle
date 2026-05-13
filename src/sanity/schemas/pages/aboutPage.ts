import { defineField, defineType } from "sanity";

/**
 * About page singleton. Mirrors the structure rendered by
 * src/components/about-client.tsx. Singleton enforcement happens in
 * src/sanity/structure.ts (no "create new" button in Studio).
 */
export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "journey", title: "Career timeline" },
    { name: "credentials", title: "Credentials" },
    { name: "discretion", title: "Discretion section" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // -------- Hero --------
    defineField({
      name: "heroEyebrow",
      title: "Small label above headline",
      description: 'Shown in all caps. Currently "About".',
      type: "string",
      group: "hero",
      initialValue: "About",
      validation: (r) => r.required().max(40),
    }),
    defineField({
      name: "heroHeadlineLine1",
      title: "Headline — line 1",
      description: 'Top line of the big headline. Currently "Three decades".',
      type: "string",
      group: "hero",
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: "heroHeadlineLine2",
      title: "Headline — line 2 (italic)",
      description: 'Shown in italic below line 1. Currently "of Orlando".',
      type: "string",
      group: "hero",
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: "heroParagraphs",
      title: "Hero paragraphs",
      description:
        "Each item is one paragraph. Drag to reorder. Aim for 2–4 short paragraphs.",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      group: "hero",
      validation: (r) => r.min(1).max(6),
    }),
    defineField({
      name: "heroImage",
      title: "Portrait photo",
      description:
        "Vertical portrait. Will display in a 3:4 aspect frame. Alt text required.",
      type: "image",
      group: "hero",
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

    // -------- Journey --------
    defineField({
      name: "journeyEyebrow",
      title: "Small label above headline",
      type: "string",
      group: "journey",
      initialValue: "The Path Here",
      validation: (r) => r.max(40),
    }),
    defineField({
      name: "journeyHeadline",
      title: "Section headline",
      description: 'Currently "From the closing table forward".',
      type: "string",
      group: "journey",
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: "milestones",
      title: "Career milestones",
      description: "Drag to reorder. Each shows on the forest-green journey section.",
      type: "array",
      group: "journey",
      of: [
        {
          type: "object",
          name: "milestone",
          fields: [
            {
              name: "period",
              type: "string",
              title: "Period",
              description: 'e.g. "1996 to 2005"',
              validation: (r) => r.required().max(40),
            },
            {
              name: "title",
              type: "string",
              title: "Title",
              validation: (r) => r.required().max(80),
            },
            {
              name: "description",
              type: "text",
              rows: 4,
              title: "Description",
              validation: (r) => r.required().max(500),
            },
          ],
          preview: {
            select: { title: "title", subtitle: "period" },
          },
        },
      ],
      validation: (r) => r.min(1).max(10),
    }),

    // -------- Credentials --------
    defineField({
      name: "credentialsEyebrow",
      title: "Small label above headline",
      type: "string",
      group: "credentials",
      initialValue: "Credentials",
      validation: (r) => r.max(40),
    }),
    defineField({
      name: "credentialsHeadline",
      title: "Section headline",
      type: "string",
      group: "credentials",
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: "credentialItems",
      title: "Credentials list",
      description:
        "Each item is one credential. Shown as a 3-column grid with bullet markers.",
      type: "array",
      of: [{ type: "string", validation: (r) => r.max(140) }],
      group: "credentials",
      validation: (r) => r.min(1).max(20),
    }),

    // -------- Discretion --------
    defineField({
      name: "discretionEyebrow",
      title: "Small label above headline",
      type: "string",
      group: "discretion",
      initialValue: "Discretion",
      validation: (r) => r.max(40),
    }),
    defineField({
      name: "discretionHeadline",
      title: "Section headline",
      type: "string",
      group: "discretion",
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: "discretionParagraphs",
      title: "Section paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      group: "discretion",
      validation: (r) => r.min(1).max(6),
    }),

    // -------- SEO --------
    defineField({
      name: "seoTitle",
      title: "Browser tab / search result title",
      description: "If empty, falls back to a sensible default. Aim for 50–60 characters.",
      type: "string",
      group: "seo",
      validation: (r) => r.max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "Search result description",
      description:
        "1–2 sentences shown beneath the title on Google. Aim for 140–160 characters.",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (r) => r.max(200),
    }),
  ],
  preview: {
    prepare: () => ({ title: "About Page" }),
  },
});
