import { defineField, defineType } from "sanity";

export const landListing = defineType({
  name: "landListing",
  title: "Land Listing",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Listing title",
      type: "string",
      description: "Example: 1.2 acre homesite in Windermere.",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "Under contract", value: "pending" },
          { title: "Sold", value: "sold" },
        ],
        layout: "radio",
      },
      initialValue: "available",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (USD)",
      type: "number",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "acreage",
      title: "Acreage",
      type: "number",
      description: "In acres, for example 1.25.",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "county",
      title: "County",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Street address or parcel",
      type: "string",
      description:
        "Optional. Leave empty if you would rather not show an exact location publicly.",
    }),
    defineField({
      name: "community",
      title: "Community or subdivision",
      type: "string",
    }),
    defineField({
      name: "summary",
      title: "Description",
      type: "text",
      rows: 6,
      validation: (rule) => rule.max(2000),
    }),
    defineField({
      name: "features",
      title: "Highlights",
      type: "array",
      description:
        "Short bullet points. Examples: Lakefront, Cleared and ready to build, Public water and sewer, No HOA.",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "builderRequirement",
      title: "Builder requirements",
      type: "string",
      description:
        "Optional. Example: Bring your own builder, or Approved builder list applies.",
    }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt text",
              validation: (rule) =>
                rule
                  .required()
                  .warning("Add alt text for accessibility and SEO."),
            },
          ],
        },
      ],
    }),
    defineField({
      name: "listingUrl",
      title: "Full listing link",
      type: "url",
      description:
        "Optional. Link to the full MLS or IDX listing on iorlandorealestate.com.",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "listedAt",
      title: "Listed on",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: "Newest",
      name: "listedDesc",
      by: [{ field: "listedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      status: "status",
      city: "city",
      media: "photos.0",
    },
    prepare({ title, status, city, media }) {
      const label =
        status === "sold" ? "Sold" : status === "pending" ? "Under contract" : "Available";
      return { title, subtitle: [label, city].filter(Boolean).join(" · "), media };
    },
  },
});
