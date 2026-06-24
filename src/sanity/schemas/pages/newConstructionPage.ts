import { defineField, defineType } from "sanity";

/**
 * New Construction page singleton. Mirrors src/components/new-construction-client.tsx.
 *
 * Auto-derived data NOT in this schema (stays in code):
 *   - Active neighborhood cards (computed from src/lib/neighborhoods.ts)
 *   - JSON-LD FAQ schema (built from the `faq` field below)
 */
export const newConstructionPage = defineType({
  name: "newConstructionPage",
  title: "New Construction Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "photos", title: "Photo band" },
    { name: "whyAgent", title: "Why your own agent" },
    { name: "process", title: "Process" },
    { name: "builders", title: "Builders & infill" },
    { name: "faq", title: "FAQ" },
    { name: "cta", title: "Final CTA" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // -------- Hero --------
    defineField({ name: "heroEyebrow", title: "Small label above headline", type: "string", group: "hero", initialValue: "New Construction", validation: (r) => r.required().max(40) }),
    defineField({ name: "heroHeadlineLine1", title: "Headline — line 1", type: "string", group: "hero", validation: (r) => r.required().max(60) }),
    defineField({ name: "heroHeadlineLine2", title: "Headline — line 2 (italic)", type: "string", group: "hero", validation: (r) => r.required().max(60) }),
    defineField({ name: "heroBody", title: "Hero body", type: "text", rows: 4, group: "hero", validation: (r) => r.required().max(500) }),
    defineField({ name: "heroPrimaryCtaLabel", title: "Primary CTA label", description: 'Links to /contact. Currently "Discuss your build".', type: "string", group: "hero", initialValue: "Discuss your build", validation: (r) => r.required().max(40) }),
    defineField({ name: "heroSecondaryCtaLabel", title: "Secondary CTA label", description: 'Links to iorlandorealestate.com. Currently "Search homes".', type: "string", group: "hero", initialValue: "Search homes", validation: (r) => r.max(40) }),
    defineField({
      name: "heroStats",
      title: "Proof points (right column)",
      description: "Three stats shown in the green box. Drag to reorder.",
      type: "array",
      group: "hero",
      of: [
        {
          type: "object",
          fields: [
            { name: "number", type: "string", title: "Big number / value", validation: (r) => r.required().max(20) },
            { name: "label", type: "string", title: "Label (small caps)", validation: (r) => r.required().max(60) },
          ],
          preview: { select: { title: "number", subtitle: "label" } },
        },
      ],
      validation: (r) => r.min(2).max(4),
    }),
    // -------- Photo band --------
    defineField({
      name: "photoBand",
      title: "3-photo band (under the hero)",
      description: "Three landscape photos shown edge-to-edge. Alt text required.",
      type: "array",
      group: "photos",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text", validation: (r) => r.required().warning("Add alt text for accessibility and SEO.") }],
        },
      ],
      validation: (r) => r.min(3).max(3),
    }),
    // -------- Why your own agent --------
    defineField({ name: "whyAgentEyebrow", title: "Small label", type: "string", group: "whyAgent", initialValue: "Why You Need Your Own Agent", validation: (r) => r.max(60) }),
    defineField({ name: "whyAgentHeadline", title: "Section headline", type: "string", group: "whyAgent", validation: (r) => r.required().max(80) }),
    defineField({
      name: "whyAgentItems",
      title: "Why-agent points",
      type: "array",
      group: "whyAgent",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", validation: (r) => r.required().max(80) },
            { name: "description", type: "text", rows: 4, validation: (r) => r.required().max(500) },
          ],
          preview: { select: { title: "title" } },
        },
      ],
      validation: (r) => r.min(2).max(8),
    }),
    // -------- Process --------
    defineField({ name: "processEyebrow", title: "Small label", type: "string", group: "process", initialValue: "How It Works", validation: (r) => r.max(40) }),
    defineField({ name: "processHeadline", title: "Section headline", type: "string", group: "process", validation: (r) => r.required().max(80) }),
    defineField({
      name: "processSteps",
      title: "Process steps",
      type: "array",
      group: "process",
      of: [
        {
          type: "object",
          fields: [
            { name: "number", type: "string", title: "Step number (e.g. 01)", validation: (r) => r.required().max(4) },
            { name: "title", type: "string", validation: (r) => r.required().max(60) },
            { name: "description", type: "text", rows: 4, validation: (r) => r.required().max(600) },
          ],
          preview: { select: { title: "title", subtitle: "number" } },
        },
      ],
      validation: (r) => r.min(3).max(8),
    }),
    // -------- Builders + infill --------
    defineField({ name: "buildersEyebrow", title: "Builders — small label", type: "string", group: "builders", initialValue: "Builder Relationships", validation: (r) => r.max(60) }),
    defineField({ name: "buildersHeadline", title: "Builders — headline", type: "string", group: "builders", validation: (r) => r.required().max(80) }),
    defineField({
      name: "builders",
      title: "Builder list",
      description: "Numbered list. Drag to reorder.",
      type: "array",
      group: "builders",
      of: [{ type: "string", validation: (r) => r.max(80) }],
      validation: (r) => r.min(1).max(30),
    }),
    defineField({ name: "areasEyebrow", title: "Areas — small label", type: "string", group: "builders", initialValue: "Where to Build", validation: (r) => r.max(60) }),
    defineField({ name: "areasHeadline", title: "Areas — headline", type: "string", group: "builders", validation: (r) => r.required().max(80) }),
    defineField({ name: "infillEyebrow", title: "Urban infill — small label", type: "string", group: "builders", initialValue: "Urban Infill & Custom", validation: (r) => r.max(60) }),
    defineField({ name: "infillBody", title: "Urban infill — body", type: "text", rows: 4, group: "builders", validation: (r) => r.required().max(800) }),
    // -------- FAQ --------
    defineField({ name: "faqEyebrow", title: "FAQ — small label", type: "string", group: "faq", initialValue: "Frequently Asked", validation: (r) => r.max(40) }),
    defineField({ name: "faqHeadline", title: "FAQ — headline", type: "string", group: "faq", validation: (r) => r.required().max(80) }),
    defineField({
      name: "faq",
      title: "FAQ items",
      description: "Also fed into Google's FAQ schema for SEO. Keep answers focused — Google penalizes vague answers.",
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
    // -------- CTA --------
    defineField({ name: "ctaHeadline", title: "CTA headline", type: "string", group: "cta", validation: (r) => r.required().max(80) }),
    defineField({ name: "ctaBody", title: "CTA body", type: "text", rows: 4, group: "cta", validation: (r) => r.required().max(500) }),
    defineField({ name: "ctaButtonLabel", title: "CTA button label", type: "string", group: "cta", initialValue: "Schedule a walkthrough", validation: (r) => r.required().max(40) }),
    defineField({ name: "ctaSideEyebrow", title: "Side card eyebrow", type: "string", group: "cta", initialValue: "Explore Communities", validation: (r) => r.max(60) }),
    defineField({ name: "ctaSideHeadline", title: "Side card headline", type: "string", group: "cta", validation: (r) => r.required().max(80) }),
    defineField({ name: "ctaSideBody", title: "Side card body", type: "text", rows: 3, group: "cta", validation: (r) => r.required().max(400) }),
    defineField({ name: "ctaSideButtonLabel", title: "Side card button label", type: "string", group: "cta", initialValue: "View neighborhoods", validation: (r) => r.required().max(40) }),
    // -------- SEO --------
    defineField({ name: "seoTitle", title: "Browser tab / search title", type: "string", group: "seo", validation: (r) => r.max(70) }),
    defineField({ name: "seoDescription", title: "Search description", type: "text", rows: 3, group: "seo", validation: (r) => r.max(200) }),
  ],
  preview: { prepare: () => ({ title: "New Construction Page" }) },
});
