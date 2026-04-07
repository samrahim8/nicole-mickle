"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/relocating", label: "Relocating" },
  { href: "/new-construction", label: "New Construction" },
  { href: "/neighborhoods", label: "Neighborhoods" },
  { href: "/about", label: "About" },
  { href: "/quiz", label: "Quiz" },
  { href: "https://nicolemickle.com/blog", label: "Blog", external: true },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      data-site-header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-neutral-100"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className={`max-w-[90rem] mx-auto px-6 lg:px-12 flex items-center justify-between transition-all duration-500 ${
        scrolled ? "h-16" : "h-20"
      }`}>
        <Link href="/" className="font-[family-name:var(--font-playfair)] text-xl tracking-[-0.02em] text-charcoal">
          Nicole Mickle
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) =>
            "external" in link && link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-[15px] sm:text-[13px] tracking-wide text-neutral-400 hover:text-charcoal transition-colors duration-300 after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-0 after:bg-charcoal after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-[15px] sm:text-[13px] tracking-wide text-neutral-400 hover:text-charcoal transition-colors duration-300 after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-0 after:bg-charcoal after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            )
          )}
          <a
            href="https://iorlandorealestate.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] sm:text-[13px] font-medium px-5 py-2.5 bg-[#1B3A2D] text-white hover:bg-[#234B39] transition-all duration-300"
          >
            Start Your Search
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-charcoal"
          aria-label="Toggle menu"
        >
          <div className="w-5 h-4 relative flex flex-col justify-between">
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-full h-[1.5px] bg-charcoal origin-center"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="block w-full h-[1.5px] bg-charcoal"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-full h-[1.5px] bg-charcoal origin-center"
              transition={{ duration: 0.3 }}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-background border-t border-neutral-100"
          >
            <div className="px-6 py-8 space-y-5">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-lg text-neutral-500 hover:text-charcoal transition-colors py-1"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="block text-lg text-neutral-500 hover:text-charcoal transition-colors py-1"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: links.length * 0.05, duration: 0.3 }}
              >
                <a
                  href="https://iorlandorealestate.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-medium px-6 py-3 bg-[#1B3A2D] text-white hover:bg-[#234B39] transition-colors mt-2"
                >
                  Start Your Search
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
