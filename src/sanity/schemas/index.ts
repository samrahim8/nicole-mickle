import type { SchemaTypeDefinition } from "sanity";

import { author } from "./author";
import { category } from "./category";
import { post } from "./post";
import { portableText } from "./blocks/portableText";

export const schemaTypes: SchemaTypeDefinition[] = [
  post,
  author,
  category,
  portableText,
];
