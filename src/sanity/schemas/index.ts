import type { SchemaTypeDefinition } from "sanity";

import { author } from "./author";
import { category } from "./category";
import { post } from "./post";
import { portableText } from "./blocks/portableText";
import { aboutPage } from "./pages/aboutPage";
import { contactPage } from "./pages/contactPage";
import { newConstructionPage } from "./pages/newConstructionPage";
import { quizPage } from "./pages/quizPage";

export const schemaTypes: SchemaTypeDefinition[] = [
  post,
  author,
  category,
  portableText,
  aboutPage,
  contactPage,
  newConstructionPage,
  quizPage,
];
