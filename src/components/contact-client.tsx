"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn, TextReveal } from "@/components/animate";

export type ContactPageData = {
  heroEyebrow: string;
  heroHeadlineLine1: string;
  heroHeadlineLine2: string;
  heroBody: string;
  interestOptions: string[];
  submitLabel: string;
  successHeading: string;
  successBody: string;
  phoneNumber: string;
  phoneDisplay: string;
  email: string;
  officeName: string;
  locationEyebrow: string;
  locationHeadline: string;
  locationBody: string;
};

export function ContactClient({ data }: { data: ContactPageData }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const interests = formData.getAll("interest").join(", ");
    const payload = {
      formType: "Contact",
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      interest: interests,
      message: formData.get("message"),
    };
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !body.ok) throw new Error(body.error || "Submission failed");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const telHref = `tel:+1${data.phoneNumber.replace(/\D/g, "")}`;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-44 lg:pb-24">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <FadeIn>
              <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-6">
                {data.heroEyebrow}
              </p>
            </FadeIn>
            <TextReveal delay={0.1}>
              <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-charcoal">
                {data.heroHeadlineLine1}
              </h1>
            </TextReveal>
            <TextReveal delay={0.2}>
              <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-charcoal italic">
                {data.heroHeadlineLine2}
              </h1>
            </TextReveal>
            <FadeIn delay={0.5}>
              <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-relaxed max-w-lg mt-8">
                {data.heroBody}
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
                    {data.successHeading}
                  </h3>
                  <p className="text-[16px] sm:text-[15px] text-neutral-500">
                    {data.successBody}
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-8"
                  aria-describedby={error ? "contact-form-error" : undefined}
                >
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="firstName" className="block text-[11px] tracking-[0.15em] uppercase text-neutral-400 mb-3">
                        First Name
                      </label>
                      <input type="text" id="firstName" name="firstName" required className="w-full px-0 py-3 border-0 border-b border-neutral-200 bg-transparent text-[16px] md:text-[16px] sm:text-[15px] text-charcoal placeholder:text-neutral-300 focus:outline-none focus:border-forest transition-colors duration-300" placeholder="First name" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-[11px] tracking-[0.15em] uppercase text-neutral-400 mb-3">
                        Last Name
                      </label>
                      <input type="text" id="lastName" name="lastName" required className="w-full px-0 py-3 border-0 border-b border-neutral-200 bg-transparent text-[16px] md:text-[16px] sm:text-[15px] text-charcoal placeholder:text-neutral-300 focus:outline-none focus:border-forest transition-colors duration-300" placeholder="Last name" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[11px] tracking-[0.15em] uppercase text-neutral-400 mb-3">
                      Email
                    </label>
                    <input type="email" id="email" name="email" required className="w-full px-0 py-3 border-0 border-b border-neutral-200 bg-transparent text-[16px] md:text-[16px] sm:text-[15px] text-charcoal placeholder:text-neutral-300 focus:outline-none focus:border-forest transition-colors duration-300" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-[11px] tracking-[0.15em] uppercase text-neutral-400 mb-3">
                      Phone (optional)
                    </label>
                    <input type="tel" id="phone" name="phone" className="w-full px-0 py-3 border-0 border-b border-neutral-200 bg-transparent text-[16px] md:text-[16px] sm:text-[15px] text-charcoal placeholder:text-neutral-300 focus:outline-none focus:border-forest transition-colors duration-300" placeholder="(555) 555-5555" />
                  </div>
                  <div>
                    <p className="block text-[11px] tracking-[0.15em] uppercase text-neutral-400 mb-4">
                      I&apos;m interested in <span className="text-neutral-300 normal-case tracking-normal">(select all that apply)</span>
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {data.interestOptions.map((opt) => (
                        <label key={opt} className="flex items-center gap-3 cursor-pointer group py-2">
                          <input type="checkbox" name="interest" value={opt} className="w-4 h-4 accent-forest border-neutral-300 cursor-pointer" />
                          <span className="text-[16px] sm:text-[15px] text-charcoal group-hover:text-forest transition-colors duration-300">
                            {opt}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-[11px] tracking-[0.15em] uppercase text-neutral-400 mb-3">
                      Tell me about your situation
                    </label>
                    <textarea id="message" name="message" rows={4} className="w-full px-0 py-3 border-0 border-b border-neutral-200 bg-transparent text-[16px] md:text-[16px] sm:text-[15px] text-charcoal placeholder:text-neutral-300 focus:outline-none focus:border-forest transition-colors duration-300 resize-none" placeholder="Where are you moving from? What's your timeline?" />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group inline-flex items-center gap-2 text-[13px] tracking-wide font-medium text-forest border-b border-forest pb-0.5 hover:border-forest-light hover:text-forest-light transition-all duration-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Sending…" : data.submitLabel}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:translate-x-1 transition-transform duration-300">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </button>
                  {error && (
                    <p id="contact-form-error" role="alert" className="text-[14px] text-red-600 mt-2">{error}</p>
                  )}
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
                  <a href={telHref} className="text-lg text-charcoal hover:text-neutral-500 transition-colors duration-300">
                    {data.phoneDisplay}
                  </a>
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.15em] uppercase text-neutral-400 mb-3">
                    Email
                  </p>
                  <a href={`mailto:${data.email}`} className="text-lg text-charcoal hover:text-neutral-500 transition-colors duration-300">
                    {data.email}
                  </a>
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.15em] uppercase text-neutral-400 mb-3">
                    Office
                  </p>
                  <p className="text-lg text-charcoal">{data.officeName}</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 lg:py-44 bg-forest">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-[11px] tracking-[0.3em] uppercase text-white/50 mb-4">
                {data.locationEyebrow}
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-[-0.02em] text-white mb-4">
                {data.locationHeadline}
              </h2>
              <p className="text-[16px] sm:text-[15px] text-white/70">
                {data.locationBody}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
