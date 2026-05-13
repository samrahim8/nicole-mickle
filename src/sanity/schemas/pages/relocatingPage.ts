import { defineField, defineType } from "sanity";

/**
 * Relocating page singleton. Origin-city links stay in code because each one
 * is paired with a dedicated /relocating-from/<slug> page in
 * src/lib/relocating-from.ts — adding a new city requires a new page.
 */
export const relocatingPage = defineType({
  name: "relocatingPage",
  title: "Relocating Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "trustedBy", title: "Trusted by" },
    { name: "process", title: "Process" },
    { name: "why", title: "Why work with me" },
    { name: "faq", title: "FAQ" },
    { name: "neighborhoods", title: "Neighborhoods CTA" },
    { name: "finalCta", title: "Final CTA" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // Hero
    defineField({ name: "heroEyebrow", title: "Small label above headline", type: "string", group: "hero", initialValue: "Relocation", validation: (r) => r.required().max(40) }),
    defineField({ name: "heroHeadlineLine1", title: "Headline — line 1", type: "string", group: "hero", validation: (r) => r.required().max(80) }),
    defineField({ name: "heroHeadlineLine2", title: "Headline — line 2 (italic)", type: "string", group: "hero", validation: (r) => r.required().max(80) }),
    defineField({ name: "heroBody", title: "Hero body", type: "text", rows: 4, group: "hero", validation: (r) => r.required().max(600) }),
    defineField({ name: "heroCtaLabel", title: "Hero CTA label", description: "Links to /contact.", type: "string", group: "hero", initialValue: "Start a conversation", validation: (r) => r.required().max(40) }),
    defineField({
      name: "heroStats",
      title: "Proof points",
      description: "Three stats in the green box.",
      type: "array",
      group: "hero",
      of: [
        {
          type: "object",
          fields: [
            { name: "number", type: "string", validation: (r) => r.required().max(20) },
            { name: "label", type: "string", validation: (r) => r.required().max(60) },
          ],
          preview: { select: { title: "number", subtitle: "label" } },
        },
      ],
      validation: (r) => r.min(2).max(4),
    }),
    // Trusted by
    defineField({ name: "trustedByEyebrow", title: "Trusted-by — eyebrow", type: "string", group: "trustedBy", initialValue: "Trusted By Relocating Professionals", validation: (r) => r.max(80) }),
    defineField({ name: "trustedByHeadline", title: "Trusted-by — headline", type: "string", group: "trustedBy", validation: (r) => r.required().max(80) }),
    defineField({ name: "trustedByBody", title: "Trusted-by — body", type: "text", rows: 3, group: "trustedBy", validation: (r) => r.required().max(500) }),
    defineField({ name: "employers", title: "Employer list", description: "Drag to reorder.", type: "array", of: [{ type: "string", validation: (r) => r.max(80) }], group: "trustedBy", validation: (r) => r.min(1).max(30) }),
    // Process
    defineField({ name: "processEyebrow", title: "Process — eyebrow", type: "string", group: "process", initialValue: "The Process", validation: (r) => r.max(40) }),
    defineField({ name: "processHeadline", title: "Process — headline", type: "string", group: "process", validation: (r) => r.required().max(80) }),
    defineField({
      name: "processSteps",
      title: "Process steps",
      type: "array",
      group: "process",
      of: [
        {
          type: "object",
          fields: [
            { name: "number", type: "string", validation: (r) => r.required().max(4) },
            { name: "title", type: "string", validation: (r) => r.required().max(60) },
            { name: "description", type: "text", rows: 3, validation: (r) => r.required().max(600) },
          ],
          preview: { select: { title: "title", subtitle: "number" } },
        },
      ],
      validation: (r) => r.min(3).max(8),
    }),
    // Why
    defineField({ name: "whyEyebrow", title: "Why — eyebrow", type: "string", group: "why", initialValue: "Why Work With Me", validation: (r) => r.max(40) }),
    defineField({ name: "whyHeadline", title: "Why — headline", type: "string", group: "why", validation: (r) => r.required().max(80) }),
    defineField({
      name: "whyItems",
      title: "Why-work-with-me items",
      type: "array",
      group: "why",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", validation: (r) => r.required().max(80) },
            { name: "description", type: "text", rows: 3, validation: (r) => r.required().max(500) },
          ],
          preview: { select: { title: "title" } },
        },
      ],
      validation: (r) => r.min(2).max(8),
    }),
    // FAQ
    defineField({ name: "faqEyebrow", title: "FAQ — eyebrow", type: "string", group: "faq", initialValue: "Frequently Asked", validation: (r) => r.max(40) }),
    defineField({ name: "faqHeadline", title: "FAQ — headline", type: "string", group: "faq", validation: (r) => r.required().max(80) }),
    defineField({
      name: "faq",
      title: "FAQ items",
      description: "Also fed into Google's FAQ schema.",
      type: "array",
      group: "faq",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string", validation: (r) => r.required().max(200) },
            { name: "answer", type: "text", rows: 4, validation: (r) => r.required().max(1000) },
          ],
          preview: { select: { title: "question" } },
        },
      ],
      validation: (r) => r.min(1).max(15),
    }),
    // Neighborhoods CTA
    defineField({ name: "neighborhoodsEyebrow", title: "Main eyebrow", type: "string", group: "neighborhoods", initialValue: "Explore Neighborhoods", validation: (r) => r.max(60) }),
    defineField({ name: "neighborhoodsHeadline", title: "Main headline", type: "string", group: "neighborhoods", validation: (r) => r.required().max(80) }),
    defineField({ name: "neighborhoodsBody", title: "Main body", type: "text", rows: 3, group: "neighborhoods", validation: (r) => r.required().max(500) }),
    defineField({ name: "neighborhoodsCtaLabel", title: "Main button label", type: "string", group: "neighborhoods", initialValue: "Browse all neighborhoods", validation: (r) => r.required().max(40) }),
    defineField({ name: "neighborhoodsQuizEyebrow", title: "Quiz card eyebrow", type: "string", group: "neighborhoods", initialValue: "Not Sure Where to Start?", validation: (r) => r.max(60) }),
    defineField({ name: "neighborhoodsQuizHeadline", title: "Quiz card headline", type: "string", group: "neighborhoods", validation: (r) => r.required().max(80) }),
    defineField({ name: "neighborhoodsQuizBody", title: "Quiz card body", type: "text", rows: 3, group: "neighborhoods", validation: (r) => r.required().max(400) }),
    defineField({ name: "neighborhoodsQuizCtaLabel", title: "Quiz button label", type: "string", group: "neighborhoods", initialValue: "Start the quiz", validation: (r) => r.required().max(40) }),
    // Final CTA
    defineField({ name: "finalCtaHeadline", title: "Final CTA headline", type: "string", group: "finalCta", validation: (r) => r.required().max(80) }),
    defineField({ name: "finalCtaBody", title: "Final CTA body", type: "text", rows: 3, group: "finalCta", validation: (r) => r.required().max(500) }),
    defineField({ name: "finalCtaLabel", title: "Final CTA button", type: "string", group: "finalCta", initialValue: "Schedule a consultation", validation: (r) => r.required().max(40) }),
    // SEO
    defineField({ name: "seoTitle", title: "Browser tab / search title", type: "string", group: "seo", validation: (r) => r.max(70) }),
    defineField({ name: "seoDescription", title: "Search description", type: "text", rows: 3, group: "seo", validation: (r) => r.max(200) }),
  ],
  preview: { prepare: () => ({ title: "Relocating Page" }) },
});
