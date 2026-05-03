import type { Metadata } from "next";
import { FadeIn } from "@/components/animate";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing use of nicolemickle.com, the website of Nicole Mickle Real Estate.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: false },
};

export default function TermsPage() {
  return (
    <article className="pt-32 pb-32 lg:pt-44 lg:pb-44">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-6">
            Legal
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-charcoal mb-4">
            Terms of Use
          </h1>
          <p className="text-[13px] text-neutral-400 mb-16">
            Last updated: April 30, 2026
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="prose-content space-y-10 text-[16px] text-neutral-700 leading-[1.8]">
            <section>
              <p>
                These Terms of Use govern your use of{" "}
                <span className="text-charcoal">nicolemickle.com</span>{" "}
                (the &ldquo;Site&rdquo;), operated by Nicole Mickle, a
                licensed Florida real estate agent affiliated with Olympus
                Executive Realty. By accessing or using the Site, you agree
                to be bound by these terms.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-4 mt-12">
                Informational Use
              </h2>
              <p>
                Content on this Site is provided for general informational
                purposes only. It is not intended as legal, financial, tax,
                or specific real estate advice. Market data, neighborhood
                descriptions, price ranges, and builder information are
                summaries based on publicly available sources and personal
                experience and may change without notice. Always verify
                current details with the relevant builder, municipality, or
                MLS before making decisions.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-4 mt-12">
                No Agency Relationship
              </h2>
              <p>
                Use of this Site does not create an agency, fiduciary, or
                client relationship between you and Nicole Mickle or Olympus
                Executive Realty. A formal representation relationship is
                only established through a signed buyer or seller
                representation agreement that meets current real estate
                regulatory requirements.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-4 mt-12">
                Property Listings &amp; Third-Party Content
              </h2>
              <p>
                Any property listings, builder information, or third-party
                content referenced on this Site are believed to be accurate
                at the time of posting but are not guaranteed. All
                properties are subject to prior sale, change, or withdrawal.
                Square footage, lot dimensions, school zones, HOA fees,
                taxes, and other details should be independently verified.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-4 mt-12">
                Equal Housing Opportunity
              </h2>
              <p>
                Nicole Mickle and Olympus Executive Realty support the
                principles of the Fair Housing Act and the Equal Credit
                Opportunity Act. We do not discriminate on the basis of
                race, color, religion, sex, handicap, familial status,
                national origin, sexual orientation, or any other category
                protected by federal, state, or local law.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-4 mt-12">
                Intellectual Property
              </h2>
              <p>
                The text, photography, design, and layout of this Site are
                the property of Nicole Mickle Real Estate or used with
                permission. You may not reproduce, distribute, or create
                derivative works from any content on the Site without prior
                written consent. Brokerage, association, and trademark
                logos are the property of their respective owners.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-4 mt-12">
                External Links
              </h2>
              <p>
                The Site may link to third-party websites for convenience.
                We do not control these sites and are not responsible for
                their content, privacy practices, or availability.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-4 mt-12">
                Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, Nicole Mickle and
                Olympus Executive Realty are not liable for any indirect,
                incidental, or consequential damages arising from your use
                of, or inability to use, this Site or any information found
                on it.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-4 mt-12">
                Governing Law
              </h2>
              <p>
                These Terms of Use are governed by the laws of the State of
                Florida, without regard to its conflict of laws principles.
                Any disputes will be resolved in the state or federal courts
                located in Orange County, Florida.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-4 mt-12">
                Changes
              </h2>
              <p>
                We may revise these Terms from time to time. The date at
                the top of this page reflects the most recent update.
                Continued use of the Site after a change constitutes
                acceptance of the revised Terms.
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
