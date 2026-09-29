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
    defineArrayMember({
      type: "object",
      name: "comparisonTable",
      title: "Comparison table",
      description:
        "Side-by-side table, for example Windermere vs. Lake Nona or price tiers. Scrolls sideways on phones with the first column pinned.",
      fields: [
        {
          name: "caption",
          type: "string",
          title: "Table title",
          description:
            "Shown above the table and read aloud by screen readers. Example: Windermere vs. Lake Nona at a glance.",
          validation: (rule) =>
            rule.required().warning("Add a title so the table has context."),
        },
        {
          name: "headers",
          type: "array",
          title: "Column headings",
          description:
            "One per column, left to right. The first heading labels the row names (for example, Category).",
          of: [{ type: "string" }],
          validation: (rule) => rule.required().min(2).max(6),
        },
        {
          name: "rows",
          type: "array",
          title: "Rows",
          description:
            "Each row needs one cell per column heading, in the same order. The first cell is the row label.",
          of: [
            {
              type: "object",
              name: "tableRow",
              fields: [
                {
                  name: "cells",
                  type: "array",
                  title: "Cells",
                  of: [{ type: "string" }],
                },
              ],
              preview: {
                select: { cells: "cells" },
                prepare({ cells }: { cells?: string[] }) {
                  return { title: (cells ?? []).join("  |  ") };
                },
              },
            },
          ],
          validation: (rule) =>
            rule.required().min(1).custom((rows, context) => {
              const headers = (
                context.parent as { headers?: string[] } | undefined
              )?.headers;
              if (!headers || !Array.isArray(rows)) return true;
              const bad = (rows as { cells?: string[] }[]).findIndex(
                (r) => (r.cells?.length ?? 0) !== headers.length,
              );
              return bad === -1
                ? true
                : `Row ${bad + 1} has a different number of cells than there are column headings (${headers.length}).`;
            }),
        },
        {
          name: "note",
          type: "string",
          title: "Footnote",
          description: "Optional. Example: Prices as of September 2026.",
        },
      ],
      preview: {
        select: { title: "caption", headers: "headers" },
        prepare({
          title,
          headers,
        }: {
          title?: string;
          headers?: string[];
        }) {
          return {
            title: title || "Comparison table",
            subtitle: (headers ?? []).join(" | "),
          };
        },
      },
    }),
    defineArrayMember({
      type: "object",
      name: "mortgageCalculator",
      title: "Mortgage calculator",
      description:
        "Drops the interactive mortgage calculator into the post. Optionally pre-fill a home price.",
      fields: [
        {
          name: "homePrice",
          type: "number",
          title: "Starting home price",
          description: "Optional. Defaults to $500,000.",
          validation: (rule) => rule.min(50000).max(10000000),
        },
      ],
      preview: {
        select: { price: "homePrice" },
        prepare({ price }: { price?: number }) {
          return {
            title: "Mortgage calculator",
            subtitle: price ? `Starts at $${price.toLocaleString()}` : undefined,
          };
        },
      },
    }),
  ],
});
