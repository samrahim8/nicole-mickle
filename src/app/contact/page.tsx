"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn, TextReveal } from "@/components/animate";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const interests = data.getAll("interest").join(", ");
    const payload = {
      formType: "Contact",
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      phone: data.get("phone"),
      interest: interests,
      message: data.get("message"),
    };
    const url = process.env.NEXT_PUBLIC_SHEETS_URL;
    if (url) {
      try {
        await fetch(url, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(payload),
        });
      } catch {
        /* Sheets endpoint runs in no-cors so we can't read the response */
      }
    }
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-44 lg:pb-24">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <FadeIn>
              <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-6">
                Contact
              </p>
            </FadeIn>
            <TextReveal delay={0.1}>
              <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-charcoal">
                Let&apos;s start a
              </h1>
            </TextReveal>
            <TextReveal delay={0.2}>
              <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-charcoal italic">
                conversation
              </h1>
            </TextReveal>
            <FadeIn delay={0.5}>
              <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-relaxed max-w-lg mt-8">
                Whether you&apos;re just starting to think about Orlando or you&apos;re
                ready to make a move. No pressure, no pitch.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="pb-32 lg:pb-44">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-20">
            {/* Form */}
            <FadeIn delay={0.3} className="lg:col-span-7">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-12 bg-cream border border-neutral-200 text-center"
                >
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-3">
                    Thank you
                  </h3>
                  <p className="text-[16px] sm:text-[15px] text-neutral-500">
                    I&apos;ll be in touch within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-[11px] tracking-[0.15em] uppercase text-neutral-400 mb-3"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full px-0 py-3 border-0 border-b border-neutral-200 bg-transparent text-[16px] md:text-[16px] sm:text-[15px] text-charcoal placeholder:text-neutral-300 focus:outline-none focus:border-forest transition-colors duration-300"
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-[11px] tracking-[0.15em] uppercase text-neutral-400 mb-3"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full px-0 py-3 border-0 border-b border-neutral-200 bg-transparent text-[16px] md:text-[16px] sm:text-[15px] text-charcoal placeholder:text-neutral-300 focus:outline-none focus:border-forest transition-colors duration-300"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[11px] tracking-[0.15em] uppercase text-neutral-400 mb-3"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-0 py-3 border-0 border-b border-neutral-200 bg-transparent text-[16px] md:text-[16px] sm:text-[15px] text-charcoal placeholder:text-neutral-300 focus:outline-none focus:border-forest transition-colors duration-300"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-[11px] tracking-[0.15em] uppercase text-neutral-400 mb-3"
                    >
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-0 py-3 border-0 border-b border-neutral-200 bg-transparent text-[16px] md:text-[16px] sm:text-[15px] text-charcoal placeholder:text-neutral-300 focus:outline-none focus:border-forest transition-colors duration-300"
                      placeholder="(555) 555-5555"
                    />
                  </div>
                  <div>
                    <p className="block text-[11px] tracking-[0.15em] uppercase text-neutral-400 mb-4">
                      I&apos;m interested in <span className="text-neutral-300 normal-case tracking-normal">(select all that apply)</span>
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        { value: "Relocating to Orlando", label: "Relocating to Orlando" },
                        { value: "New Construction", label: "New Construction" },
                        { value: "Buying a Home", label: "Buying a Home" },
                        { value: "Selling a Home", label: "Selling a Home" },
                        { value: "Something Else", label: "Something Else" },
                      ].map((opt) => (
                        <label
                          key={opt.value}
                          className="flex items-center gap-3 cursor-pointer group py-2"
                        >
                          <input
                            type="checkbox"
                            name="interest"
                            value={opt.value}
                            className="w-4 h-4 accent-forest border-neutral-300 cursor-pointer"
                          />
                          <span className="text-[16px] sm:text-[15px] text-charcoal group-hover:text-forest transition-colors duration-300">
                            {opt.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[11px] tracking-[0.15em] uppercase text-neutral-400 mb-3"
                    >
                      Tell me about your situation
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-0 py-3 border-0 border-b border-neutral-200 bg-transparent text-[16px] md:text-[16px] sm:text-[15px] text-charcoal placeholder:text-neutral-300 focus:outline-none focus:border-forest transition-colors duration-300 resize-none"
                      placeholder="Where are you moving from? What's your timeline?"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group inline-flex items-center gap-2 text-[13px] tracking-wide font-medium text-forest border-b border-forest pb-0.5 hover:border-forest-light hover:text-forest-light transition-all duration-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Sending…" : "Send message"}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </button>
                </form>
              )}
            </FadeIn>

            {/* Contact Info */}
            <FadeIn delay={0.5} className="lg:col-span-4 lg:col-start-9">
              <div className="space-y-10 lg:sticky lg:top-32">
                <div>
                  <p className="text-[11px] tracking-[0.15em] uppercase text-neutral-400 mb-3">
                    Phone
                  </p>
                  <a
                    href="tel:+14073530826"
                    className="text-lg text-charcoal hover:text-neutral-500 transition-colors duration-300"
                  >
                    (407) 353-0826
                  </a>
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.15em] uppercase text-neutral-400 mb-3">
                    Email
                  </p>
                  <a
                    href="mailto:nicole@nicolemickle.com"
                    className="text-lg text-charcoal hover:text-neutral-500 transition-colors duration-300"
                  >
                    nicole@nicolemickle.com
                  </a>
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.15em] uppercase text-neutral-400 mb-3">
                    Office
                  </p>
                  <p className="text-lg text-charcoal">
                    13790 Bridgewater Crossings Blvd. Ste 1080
                    <br />
                    Windermere, FL 34786
                  </p>
                </div>
                <div className="pt-6 border-t border-neutral-100">
                  <p className="text-[11px] tracking-[0.15em] uppercase text-neutral-400 mb-3">
                    Search Homes
                  </p>
                  <a
                    href="https://iorlandorealestate.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-500 hover:text-charcoal text-[16px] sm:text-[15px] transition-colors duration-300 flex items-center gap-2"
                  >
                    iorlandorealestate.com
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Map / Location - Deep forest green */}
      <section className="py-20 lg:py-44 bg-forest">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-[11px] tracking-[0.3em] uppercase text-white/50 mb-4">
                Based In
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-[-0.02em] text-white mb-4">
                Windermere, Florida
              </h2>
              <p className="text-[16px] sm:text-[15px] text-white/70">
                Serving all of Central Florida including Orange, Seminole,
                Osceola, and Lake counties.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
