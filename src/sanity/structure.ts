import type { StructureResolver } from "sanity/structure";

/**
 * Custom Studio sidebar. Surfaces each singleton page document as a single
 * clickable entry (no "create new" / no document list), and groups them
 * under "Pages" for Nicole's clarity.
 *
 * Blog-side document types (post, author, category) keep their default
 * list behaviour because there are many of each.
 */
const SINGLETONS: { id: string; type: string; title: string }[] = [
  { id: "aboutPage", type: "aboutPage", title: "About" },
  { id: "contactPage", type: "contactPage", title: "Contact" },
  { id: "newConstructionPage", type: "newConstructionPage", title: "New Construction" },
  { id: "quizPage", type: "quizPage", title: "Quiz" },
  { id: "relocatingPage", type: "relocatingPage", title: "Relocating" },
];

const SINGLETON_TYPES = new Set(SINGLETONS.map((s) => s.type));

export const studioStructure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Pages")
        .icon(() => "📄")
        .child(
          S.list()
            .title("Pages")
            .items(
              SINGLETONS.map((singleton) =>
                S.listItem()
                  .title(singleton.title)
                  .id(singleton.id)
                  .child(
                    S.document()
                      .schemaType(singleton.type)
                      .documentId(singleton.id)
                      .title(singleton.title),
                  ),
              ),
            ),
        ),
      S.divider(),
      S.listItem()
        .title("Blog")
        .icon(() => "📝")
        .child(
          S.list()
            .title("Blog")
            .items([
              S.documentTypeListItem("post").title("Posts"),
              S.documentTypeListItem("author").title("Authors"),
              S.documentTypeListItem("category").title("Categories"),
            ]),
        ),
      // Hide everything else (singletons appear only via the curated entries above).
      ...S.documentTypeListItems().filter(
        (item) =>
          !SINGLETON_TYPES.has(item.getId() ?? "") &&
          !["post", "author", "category"].includes(item.getId() ?? ""),
      ),
    ]);

/**
 * Block the singleton document types from showing the default
 * "create" / "duplicate" / "delete" actions. Wired in sanity.config.ts.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function singletonActions(prev: any[], context: { schemaType: string }): any[] {
  if (SINGLETON_TYPES.has(context.schemaType)) {
    return prev.filter(
      (a) =>
        a?.action !== "duplicate" &&
        a?.action !== "delete" &&
        a?.action !== "unpublish",
    );
  }
  return prev;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function singletonNewDocumentOptions(prev: any[]): any[] {
  return prev.filter((tpl) => !SINGLETON_TYPES.has(tpl?.templateId ?? ""));
}
