import { defineArrayMember, defineType } from "sanity";

// Body content for posts. Keep rich enough for editorial writing,
// plain enough that WordPress-imported HTML maps cleanly.
export const portableText = defineType({
  name: "portableText",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                validation: (rule) =>
                  rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
              },
              {
                name: "openInNewTab",
                type: "boolean",
                title: "Open in new tab",
                initialValue: false,
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      title: "Image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
          description: "Important for accessibility and SEO.",
          // Recommended, not required: a warning still nudges editors but never
          // blocks saving/publishing (so SEO edits aren't held hostage by alt).
          validation: (rule) =>
            rule.required().warning("Add alt text for accessibility and SEO."),
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
      ],
    }),
    defineArrayMember({
      type: "object",
      name: "pullQuote",
      title: "Pull quote",
      fields: [
        { name: "quote", type: "text", rows: 3, title: "Quote" },
        { name: "attribution", type: "string", title: "Attribution" },
      ],
      preview: {
        select: { title: "quote", subtitle: "attribution" },
      },
    }),
  ],
});
