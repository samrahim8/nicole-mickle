import type { Metadata } from "next";
import { FadeIn } from "@/components/animate";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Accessibility Statement",
    description:
      "Nicole Mickle Real Estate is committed to making nicolemickle.com accessible to everyone, including people with disabilities.",
    path: "/accessibility",
  }),
  robots: { index: true, follow: false },
};

export default function AccessibilityPage() {
  return (
    <article className="pt-32 pb-32 lg:pt-44 lg:pb-44">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-6">
            Legal
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-charcoal mb-4">
            Accessibility Statement
          </h1>
          <p className="text-[13px] text-neutral-400 mb-16">
            Last updated: May 6, 2026
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="prose-content space-y-10 text-[16px] text-neutral-700 leading-[1.8]">
            <section>
              <p>
                Nicole Mickle, a licensed real estate agent with Olympus
                Executive Realty, is committed to making{" "}
                <span className="text-charcoal">nicolemickle.com</span>{" "}
                accessible to the widest possible audience, including people
                with disabilities. We believe every prospective buyer, seller,
                and homeowner should be able to learn about Central Florida
                real estate without barriers.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-4 mt-12">
                Our Standard
              </h2>
              <p>
                We work to conform with the Web Content Accessibility
                Guidelines (WCAG) 2.1, Level AA, published by the World Wide
                Web Consortium (W3C). These guidelines explain how to make web
                content more accessible to people with a wide range of
                disabilities, including visual, auditory, physical, speech,
                cognitive, and neurological disabilities.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-4 mt-12">
                What We&rsquo;ve Done
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Built the site with semantic HTML and proper heading
                  structure so screen readers can navigate it cleanly
                </li>
                <li>
                  Designed for sufficient color contrast between text and
                  backgrounds
                </li>
                <li>
                  Provided descriptive alternative text for meaningful images
                </li>
                <li>Made all interactive elements operable with a keyboard</li>
                <li>
                  Labeled form fields and provided clear error messages on the
                  contact form and neighborhood quiz
                </li>
                <li>
                  Ensured the site is responsive and usable across mobile,
                  tablet, and desktop devices
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-4 mt-12">
                Ongoing Effort
              </h2>
              <p>
                Accessibility is not a one-time project. We test the site
                regularly, review new pages and features against WCAG 2.1 AA,
                and update content as standards and tooling evolve. Some
                third-party content, such as embedded maps or links to
                external listing platforms, may not be fully under our control,
                but we choose providers that take accessibility seriously
                wherever we can.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-4 mt-12">
                Report a Barrier
              </h2>
              <p className="mb-4">
                If you encounter a page, feature, or document on
                nicolemickle.com that is difficult to use because of a
                disability, please tell us. We take every report seriously and
                aim to respond within five business days. Where useful, please
                include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The page URL where you experienced the issue</li>
                <li>A short description of the problem</li>
                <li>The browser, device, and any assistive technology you were using</li>
              </ul>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-4 mt-12">
                Alternative Access
              </h2>
              <p>
                If any information on this website is not accessible to you,
                we are happy to provide it in another format. Call or email
                using the contact information below and we will work with you
                directly to share neighborhood information, listing details,
                or anything else you need.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-4 mt-12">
                Contact
              </h2>
              <p className="mb-2">
                Nicole Mickle
                <br />
                Olympus Executive Realty
                <br />
                13790 Bridgewater Crossings Blvd. Ste 1080
                <br />
                Windermere, FL 34786
              </p>
              <p>
                <a
                  href="mailto:nicole@nicolemickle.com"
                  className="text-forest hover:text-forest-light border-b border-forest hover:border-forest-light transition-colors duration-300"
                >
                  nicole@nicolemickle.com
                </a>
                <br />
                <a
                  href="tel:+14073530826"
                  className="text-charcoal hover:text-neutral-500 transition-colors duration-300"
                >
                  (407) 353-0826
                </a>
              </p>
            </section>
          </div>
        </FadeIn>
      </div>
    </article>
  );
}
