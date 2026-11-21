import { defineField, defineType, type Rule } from "sanity";

/**
 * One document per neighborhood guide (/neighborhoods/<slug>). The 17 guides
 * are a fixed set: each slug is a real route and is listed in code
 * (src/lib/neighborhoods.ts), so Studio hides create/duplicate/delete for this
 * type. Every field falls back to the code copy when left empty, so clearing a
 * field never blanks the page.
 *
 * Seeded with the live copy and photos by scripts/seed-neighborhoods.ts.
 */

const stringList = (max = 200) => ({
  type: "array" as const,
  of: [{ type: "string" as const, validation: (r: Rule) => r.max(max) }],
});

export const neighborhoodPage = defineType({
  name: "neighborhoodPage",
  title: "Neighborhood Guide",
  type: "document",
  groups: [
    { name: "hero", title: "Top of page", default: true },
    { name: "lifestyle", title: "Lifestyle" },
    { name: "prices", title: "Prices" },
    { name: "newConstruction", title: "New construction" },
    { name: "local", title: "Schools, dining, tips" },
    { name: "faq", title: "FAQ + links" },
    { name: "photos", title: "Photos" },
  ],
  fields: [
    defineField({
      name: "slug",
      title: "Page address",
      description: "Fixed. This guide lives at nicolemickle.com/neighborhoods/<this>.",
      type: "string",
      readOnly: true,
      group: "hero",
    }),
    defineField({ name: "name", title: "Neighborhood name", type: "string", group: "hero", validation: (r) => r.required().max(40) }),
    defineField({
      name: "h1Lead",
      title: "Small line above the name",
      description: 'For example "Homes for Sale in". Leave empty to show just the name.',
      type: "string",
      group: "hero",
      validation: (r) => r.max(60),
    }),
    defineField({
      name: "h1Display",
      title: "Big headline",
      description: 'For example "Clermont, FL". Leave empty to use the neighborhood name.',
      type: "string",
      group: "hero",
      validation: (r) => r.max(60),
    }),
    defineField({ name: "tagline", title: "Tagline", description: "One line under the headline. Also shows on the neighborhood cards.", type: "string", group: "hero", validation: (r) => r.max(120) }),
    defineField({ name: "description", title: "Short description", description: "The paragraph at the top of the page.", type: "text", rows: 5, group: "hero", validation: (r) => r.max(900) }),
    defineField({ name: "intro", title: "Intro paragraph", description: "Shown just below the top section. Leave empty to hide it.", type: "text", rows: 6, group: "hero", validation: (r) => r.max(1200) }),
    defineField({ name: "priceRange", title: "Price range", description: 'For example "$450K - $3M+".', type: "string", group: "hero", validation: (r) => r.max(40) }),
    defineField({ name: "searchUrl", title: '"Search homes" button link', type: "url", group: "hero", validation: (r) => r.uri({ scheme: ["https", "http"] }) }),
    defineField({ name: "lifestyleTags", title: "Lifestyle tags", description: "Short labels like Walkable or Lakefront. Neighborhoods that share tags are suggested to each other.", group: "hero", ...stringList(30) }),
    defineField({ name: "highlights", title: "Highlights", group: "hero", ...stringList() }),

    defineField({ name: "lifestyle", title: "Lifestyle", description: "The first sentence becomes the large pull quote.", type: "text", rows: 8, group: "lifestyle", validation: (r) => r.max(1500) }),
    defineField({ name: "bestFor", title: "Best for", group: "lifestyle", ...stringList() }),
    defineField({ name: "notIdealFor", title: "Not ideal for", group: "lifestyle", ...stringList() }),
    defineField({
      name: "commute",
      title: "Drive times",
      type: "object",
      group: "lifestyle",
      fields: [
        { name: "downtown", title: "To downtown Orlando", type: "string" },
        { name: "airport", title: "To the airport", type: "string" },
        { name: "disney", title: "To Disney", type: "string" },
      ],
    }),

    defineField({
      name: "priceSegments",
      title: "Price tiers",
      type: "array",
      group: "prices",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Tier name", type: "string", validation: (r: Rule) => r.required().max(30) },
            { name: "range", title: "Price range", type: "string", validation: (r: Rule) => r.required().max(40) },
            { name: "description", title: "Description", type: "text", rows: 3, validation: (r: Rule) => r.max(400) },
          ],
          preview: { select: { title: "label", subtitle: "range" } },
        },
      ],
    }),

    defineField({
      name: "newConstruction",
      title: "New construction",
      type: "object",
      group: "newConstruction",
      fields: [
        { name: "summary", title: "Summary", type: "text", rows: 5 },
        { name: "builders", title: "Builders", type: "array", of: [{ type: "string" }] },
        { name: "communities", title: "Communities", type: "array", of: [{ type: "string" }] },
      ],
    }),

    defineField({ name: "schools", title: "Schools", group: "local", ...stringList() }),
    defineField({ name: "dining", title: "Dining", description: 'Write "Restaurant – what it is" to show the name in bold.', group: "local", ...stringList() }),
    defineField({ name: "localTips", title: "Local tips", group: "local", ...stringList(400) }),

    defineField({
      name: "faq",
      title: "FAQ",
      description: "Questions and answers near the bottom of the page. Leave empty to hide the FAQ.",
      type: "array",
      group: "faq",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", title: "Question", type: "string", validation: (r: Rule) => r.required().max(200) },
            { name: "answer", title: "Answer", type: "text", rows: 4, validation: (r: Rule) => r.required().max(1500) },
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        },
      ],
    }),
    defineField({
      name: "relatedLinks",
      title: "Other neighborhoods to consider",
      description: "Up to 3 links at the bottom of the page. Leave empty to pick similar neighborhoods automatically.",
      type: "array",
      group: "faq",
      of: [
        {
          type: "object",
          fields: [
            { name: "href", title: "Link", description: "For example /neighborhoods/winter-garden", type: "string", validation: (r: Rule) => r.required() },
            { name: "label", title: "Link text", type: "string", validation: (r: Rule) => r.required().max(80) },
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
      validation: (r) => r.max(3),
    }),

    defineField({
      name: "heroImage",
      title: "Main photo",
      description: "Top of the guide and the neighborhood card.",
      type: "image",
      group: "photos",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Extra photos",
      type: "array",
      group: "photos",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Describe the photo", type: "string", validation: (r: Rule) => r.max(200) }],
        },
      ],
    }),
  ],
  orderings: [{ title: "Name", name: "nameAsc", by: [{ field: "name", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "tagline", media: "heroImage" } },
});
