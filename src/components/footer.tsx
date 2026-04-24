import Link from "next/link";

export function Footer() {
  return (
    <footer data-site-footer>
      {/* CTA – white, separated from dark footer */}
      <section className="py-28 lg:py-36 border-t border-neutral-100">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-charcoal font-normal mb-6">
              Ready to make
              <span className="italic"> Orlando home?</span>
            </h2>
            <p className="text-[15px] text-neutral-500 leading-relaxed mb-10 max-w-md mx-auto">
              Whether you&apos;re relocating from across the country or exploring
              new construction, let&apos;s find the right place for you.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 text-[13px] tracking-wide font-medium text-forest border-b border-forest pb-0.5 hover:border-forest-light hover:text-forest-light transition-all duration-300"
            >
              Schedule a conversation
              <svg
                width="14" height="14" viewBox="0 0 16 16" fill="none"
                stroke="currentColor" strokeWidth="1.5"
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer links – forest green */}
      <div className="bg-forest">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="font-[family-name:var(--font-playfair)] text-lg text-white tracking-[-0.01em] mb-3">
                Nicole Mickle
              </p>
              <p className="text-[13px] text-white/50 leading-relaxed max-w-xs mb-6">
                Orlando relocation &amp; new construction specialist.
                30 years of industry expertise.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/iorlandorealestate/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/30 hover:text-white transition-colors duration-300 p-2 -m-2"
                  aria-label="Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/NicoleMickleFL/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/30 hover:text-white transition-colors duration-300 p-2 -m-2"
                  aria-label="Facebook"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/orlandorealestate/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/30 hover:text-white transition-colors duration-300 p-2 -m-2"
                  aria-label="LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCkzLaH9JCWK5epROI2ZyvtA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/30 hover:text-white transition-colors duration-300 p-2 -m-2"
                  aria-label="YouTube"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="md:col-span-3 md:col-start-7">
              <p className="text-[10px] tracking-[0.25em] uppercase text-white/30 mb-4">
                Explore
              </p>
              <div className="space-y-2.5">
                {[
                  { href: "/relocating", label: "Relocating" },
                  { href: "/new-construction", label: "New Construction" },
                  { href: "/neighborhoods", label: "Neighborhoods" },
                  { href: "/about", label: "About" },
                  { href: "/quiz", label: "Neighborhood Quiz" },
                  { href: "/blog", label: "Blog" },
                  { href: "/contact", label: "Contact" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-[13px] text-white/50 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="md:col-span-3">
              <p className="text-[10px] tracking-[0.25em] uppercase text-white/30 mb-4">
                Contact
              </p>
              <div className="space-y-2.5 text-[13px] text-white/50">
                <a href="tel:+14073530826" className="block hover:text-white transition-colors duration-300">
                  (407) 353-0826
                </a>
                <a href="mailto:nicole@nicolemickle.com" className="block hover:text-white transition-colors duration-300">
                  nicole@nicolemickle.com
                </a>
                <p className="text-white/50">
                  13790 Bridgewater Crossings Blvd. Ste 1080
                  <br />
                  Windermere, FL 34786
                </p>
                <a
                  href="https://iorlandorealestate.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-white transition-colors duration-300"
                >
                  Search Homes
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-14 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[11px] text-white/30">
              &copy; {new Date().getFullYear()} Nicole Mickle Real Estate
            </p>
            <a
              href="https://iorlandorealestate.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-white/30 hover:text-white/60 transition-colors duration-300"
            >
              iorlandorealestate.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
