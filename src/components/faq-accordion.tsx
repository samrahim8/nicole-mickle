export interface FaqEntry {
  question: string;
  answer: string;
}

/**
 * Native <details> accordion used for every FAQ block on the site (blog posts,
 * neighborhood guides, new construction). Keyboard- and screen-reader-accessible
 * without JS.
 *
 * The copy rendered here must stay word-for-word identical to the FAQPage
 * JSON-LD emitted alongside it, or the structured data is invalid. Both should
 * read from the same source array.
 */
export function FaqAccordion({ items }: { items: FaqEntry[] }) {
  if (items.length === 0) return null;

  return (
    <div className="divide-y divide-neutral-200 border-y border-neutral-200">
      {items.map((item, i) => (
        <details key={i} className="group py-5">
          <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
            <h3 className="font-[family-name:var(--font-playfair)] text-[1.2rem] leading-snug text-charcoal">
              {item.question}
            </h3>
            <span
              aria-hidden="true"
              className="mt-1 shrink-0 text-forest transition-transform duration-300 group-open:rotate-45"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <p className="mt-3 text-[16px] leading-relaxed text-neutral-600 whitespace-pre-line">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

/** Builds the FAQPage JSON-LD from the same array the accordion renders. */
export function buildFaqSchema(items: FaqEntry[]) {
  if (items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
