import { defineField, defineType } from "sanity";

/**
 * Homepage singleton. Mirrors src/components/home-client.tsx. Audience-card
 * `href` values stay in code because they're tied to real routes (/relocating
 * etc.); Nicole only edits the copy. Hero video stays in code (rarely changes
 * and would need new asset uploads).
 */
export const homePage = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "positioning", title: "Positioning banner" },
    { name: "about", title: "About block" },
    { name: "audiences", title: "Three audiences" },
    { name: "neighborhoods", title: "Neighborhoods explorer" },
    { name: "testimonials", title: "Testimonials" },
    { name: "quizCta", title: "Quiz CTA" },
    { name: "press", title: "As Seen In / Recognition" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // Hero
    defineField({ name: "heroHeadlineLine1", title: "Headline — line 1", type: "string", group: "hero", validation: (r) => r.required().max(60) }),
    defineField({ name: "heroHeadlineLine2", title: "Headline — line 2", type: "string", group: "hero", validation: (r) => r.required().max(60) }),
    defineField({ name: "heroHeadlineLine3", title: "Headline — line 3 (italic)", type: "string", group: "hero", validation: (r) => r.required().max(60) }),
    defineField({ name: "heroTagline", title: "Tagline below headline", type: "text", rows: 2, group: "hero", validation: (r) => r.required().max(200) }),
    defineField({ name: "heroPrimaryCtaLabel", title: "Primary CTA label", description: "Links to /contact.", type: "string", group: "hero", initialValue: "Let's talk", validation: (r) => r.required().max(40) }),
    defineField({ name: "heroSecondaryCtaLabel", title: "Secondary CTA label", description: "Links to iorlandorealestate.com.", type: "string", group: "hero", initialValue: "Search homes", validation: (r) => r.max(40) }),
    // Positioning
    defineField({ name: "positioningText", title: "Positioning banner text", description: "One line, shown below the hero in small caps.", type: "string", group: "positioning", validation: (r) => r.required().max(120) }),
    // About
    defineField({ name: "aboutEyebrow", title: "About — eyebrow", type: "string", group: "about", initialValue: "About Nicole", validation: (r) => r.max(40) }),
    defineField({ name: "aboutHeadlineLine1", title: "About headline — line 1", type: "string", group: "about", validation: (r) => r.required().max(80) }),
    defineField({ name: "aboutHeadlineLine2", title: "About headline — line 2 (italic)", type: "string", group: "about", validation: (r) => r.required().max(80) }),
    defineField({ name: "aboutParagraphs", title: "About paragraphs", description: "1–3 short paragraphs.", type: "array", of: [{ type: "text", rows: 3 }], group: "about", validation: (r) => r.min(1).max(4) }),
    defineField({ name: "aboutCtaLabel", title: "About CTA label", description: "Links to /about.", type: "string", group: "about", initialValue: "More about Nicole", validation: (r) => r.required().max(40) }),
    defineField({
      name: "aboutStats",
      title: "Stats next to bio",
      description: "Two small stats shown beneath the bio.",
      type: "array",
      group: "about",
      of: [
        {
          type: "object",
          fields: [
            { name: "number", type: "string", validation: (r) => r.required().max(20) },
            { name: "label", type: "string", validation: (r) => r.required().max(40) },
          ],
          preview: { select: { title: "number", subtitle: "label" } },
        },
      ],
      validation: (r) => r.length(2),
    }),
    // Audiences
    defineField({ name: "audiencesHeadline", title: "Section headline", type: "string", group: "audiences", validation: (r) => r.required().max(80) }),
    defineField({
      name: "audiences",
      title: "Three audience cards",
      description: "Edit copy only. The destination link of each card stays tied to the route in code.",
      type: "array",
      group: "audiences",
      of: [
        {
          type: "object",
          fields: [
            { name: "number", type: "string", validation: (r) => r.required().max(4) },
            { name: "title", type: "string", validation: (r) => r.required().max(80) },
            { name: "description", type: "text", rows: 4, validation: (r) => r.required().max(500) },
            { name: "cta", type: "string", validation: (r) => r.required().max(40) },
            { name: "href", type: "string", description: "Internal route. Don't change unless you've added a new page.", validation: (r) => r.required() },
          ],
          preview: { select: { title: "title", subtitle: "number" } },
        },
      ],
      validation: (r) => r.length(3),
    }),
    // Neighborhoods
    defineField({ name: "neighborhoodsEyebrow", title: "Eyebrow", type: "string", group: "neighborhoods", initialValue: "Neighborhoods", validation: (r) => r.max(40) }),
    defineField({ name: "neighborhoodsHeadlineLine1", title: "Headline — line 1", type: "string", group: "neighborhoods", validation: (r) => r.required().max(80) }),
    defineField({ name: "neighborhoodsHeadlineLine2", title: "Headline — line 2 (italic)", type: "string", group: "neighborhoods", validation: (r) => r.required().max(80) }),
    defineField({ name: "neighborhoodsViewAllLabel", title: "View-all link label", type: "string", group: "neighborhoods", initialValue: "View all neighborhoods", validation: (r) => r.required().max(40) }),
    // Testimonials
    defineField({ name: "testimonialsEyebrow", title: "Eyebrow", type: "string", group: "testimonials", initialValue: "What Clients Say", validation: (r) => r.max(40) }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      description: "The FIRST testimonial is shown as the featured large quote; the rest appear in the grid below.",
      type: "array",
      group: "testimonials",
      of: [
        {
          type: "object",
          fields: [
            { name: "text", type: "text", rows: 5, validation: (r) => r.required().max(2000) },
            { name: "author", type: "string", validation: (r) => r.required().max(80) },
            { name: "context", type: "string", validation: (r) => r.required().max(120) },
          ],
          preview: { select: { title: "author", subtitle: "context" } },
        },
      ],
      validation: (r) => r.min(2).max(20),
    }),
    // Quiz CTA
    defineField({ name: "quizCtaEyebrow", title: "Eyebrow", type: "string", group: "quizCta", initialValue: "Not Sure Where to Start?", validation: (r) => r.max(60) }),
    defineField({ name: "quizCtaHeadline", title: "Headline", type: "string", group: "quizCta", validation: (r) => r.required().max(80) }),
    defineField({ name: "quizCtaBody", title: "Body", type: "text", rows: 3, group: "quizCta", validation: (r) => r.required().max(400) }),
    defineField({ name: "quizCtaLabel", title: "Button label", type: "string", group: "quizCta", initialValue: "Take the quiz", validation: (r) => r.required().max(40) }),
    // Press / recognition
    defineField({ name: "asSeenInLabel", title: "As Seen In label", type: "string", group: "press", initialValue: "As Seen In", validation: (r) => r.max(40) }),
    defineField({ name: "mediaLogos", title: "Media outlet names", description: "Drag to reorder.", type: "array", of: [{ type: "string", validation: (r) => r.max(60) }], group: "press", validation: (r) => r.min(1).max(15) }),
    defineField({ name: "recognitionLabel", title: "Recognition label", type: "string", group: "press", initialValue: "Recognition", validation: (r) => r.max(40) }),
    defineField({ name: "recognitionItems", title: "Recognition / awards", description: "One per award/recognition.", type: "array", of: [{ type: "string", validation: (r) => r.max(160) }], group: "press", validation: (r) => r.min(1).max(10) }),
    // SEO
    defineField({ name: "seoTitle", title: "Browser tab / search title", type: "string", group: "seo", validation: (r) => r.max(70) }),
    defineField({ name: "seoDescription", title: "Search description", type: "text", rows: 3, group: "seo", validation: (r) => r.max(200) }),
  ],
  preview: { prepare: () => ({ title: "Homepage" }) },
});
