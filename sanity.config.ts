import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool, defineDocuments, defineLocations } from "sanity/presentation";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemas";
import {
  studioStructure,
  singletonActions,
  singletonNewDocumentOptions,
} from "./src/sanity/structure";

// In the Studio (vs. on the deployed site), point Presentation at whatever
// origin is hosting the page-renderer. Local development uses
// http://localhost:3000; on production Studio at nicolemickle.com/studio,
// the SAME origin is the live site, so previewUrl can just be relative.
const SITE_ORIGIN =
  typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

export default defineConfig({
  name: "nicole-mickle",
  title: "Nicole Mickle",
  basePath: "/studio",
  projectId: projectId || "placeholder",
  dataset: dataset || "production",
  plugins: [
    presentationTool({
      previewUrl: {
        origin: SITE_ORIGIN,
        preview: "/",
        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable",
        },
      },
      resolve: {
        // Each singleton's edit screen offers a "Preview" button that opens
        // the matching live URL with the editor overlay enabled.
        locations: {
          homePage: defineLocations({
            locations: [{ title: "Homepage", href: "/" }],
            message: "This is the homepage.",
          }),
          aboutPage: defineLocations({
            locations: [{ title: "About", href: "/about" }],
          }),
          relocatingPage: defineLocations({
            locations: [{ title: "Relocating", href: "/relocating" }],
          }),
          newConstructionPage: defineLocations({
            locations: [{ title: "New Construction", href: "/new-construction" }],
          }),
          quizPage: defineLocations({
            locations: [{ title: "Quiz", href: "/quiz" }],
          }),
          contactPage: defineLocations({
            locations: [{ title: "Contact", href: "/contact" }],
          }),
        },
        // For blog posts, map every published post to its /blog/<slug> route.
        mainDocuments: defineDocuments([
          {
            route: "/blog/:slug",
            filter: `_type == "post" && slug.current == $slug`,
          },
        ]),
      },
    }),
    structureTool({ structure: studioStructure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
    templates: singletonNewDocumentOptions,
  },
  document: {
    actions: singletonActions,
  },
});
