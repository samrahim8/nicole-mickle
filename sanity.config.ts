import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemas";
import {
  studioStructure,
  singletonActions,
  singletonNewDocumentOptions,
} from "./src/sanity/structure";

export default defineConfig({
  name: "nicole-mickle",
  title: "Nicole Mickle",
  basePath: "/studio",
  projectId: projectId || "placeholder",
  dataset: dataset || "production",
  plugins: [
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
