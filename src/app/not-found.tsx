import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-6">
        <p className="font-[family-name:var(--font-playfair)] text-[8rem] leading-none text-neutral-100 mb-4">
          404
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-4">
          Page not found
        </h1>
        <p className="text-[15px] text-neutral-500 mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex justify-center gap-6 items-center">
          <Link
            href="/"
            className="group text-[13px] tracking-wide font-medium text-forest flex items-center gap-2 border-b border-forest pb-0.5 hover:border-forest-light hover:text-forest-light transition-all duration-300"
          >
            Go home
            <svg
              width="14" height="14" viewBox="0 0 16 16" fill="none"
              stroke="currentColor" strokeWidth="1.5"
              className="group-hover:translate-x-1 transition-transform duration-300"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
          <span className="text-neutral-200">|</span>
          <Link
            href="/contact"
            className="text-[13px] tracking-wide text-neutral-400 hover:text-charcoal transition-colors duration-300"
          >
            Contact Nicole
          </Link>
        </div>
      </div>
    </section>
  );
}
