import Link from "next/link";

type BlogPaginationProps = {
  page: number;
  totalPages: number;
  /** Base path without query string, e.g. "/blog" or "/blog/category/relocation". */
  basePath: string;
};

export function BlogPagination({ page, totalPages, basePath }: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const hrefForPage = (p: number) => (p === 1 ? basePath : `${basePath}?page=${p}`);

  return (
    <nav
      aria-label="Pagination"
      className="mt-24 flex items-center justify-between border-t border-neutral-200 pt-8"
    >
      <PaginationLink href={hrefForPage(page - 1)} disabled={page <= 1} direction="prev" />
      <span className="text-[12px] tracking-[0.2em] uppercase text-neutral-400">
        Page {page} of {totalPages}
      </span>
      <PaginationLink
        href={hrefForPage(page + 1)}
        disabled={page >= totalPages}
        direction="next"
      />
    </nav>
  );
}

function PaginationLink({
  href,
  disabled,
  direction,
}: {
  href: string;
  disabled: boolean;
  direction: "prev" | "next";
}) {
  const label = direction === "prev" ? "Previous" : "Next";
  if (disabled) {
    return (
      <span className="text-[12px] tracking-[0.2em] uppercase text-neutral-300 cursor-not-allowed">
        {label}
      </span>
    );
  }
  return (
    <Link
      href={href}
      className="text-[12px] tracking-[0.2em] uppercase text-charcoal hover:text-forest transition-colors"
    >
      {label}
    </Link>
  );
}
