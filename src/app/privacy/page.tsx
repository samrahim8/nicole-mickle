import type { Metadata } from "next";
import { FadeIn } from "@/components/animate";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Nicole Mickle Real Estate collects, uses, and protects information shared through nicolemickle.com.",
  robots: { index: true, follow: false },
};

export default function PrivacyPage() {
  return (
    <article className="pt-32 pb-32 lg:pt-44 lg:pb-44">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 mb-6">
            Legal
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-charcoal mb-4">
            Privacy Policy
          </h1>
          <p className="text-[13px] text-neutral-400 mb-16">
            Last updated: April 30, 2026
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="prose-content space-y-10 text-[16px] text-neutral-700 leading-[1.8]">
            <section>
              <p>
                This Privacy Policy describes how Nicole Mickle, a licensed
                real estate agent with Olympus Executive Realty
                (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;),
                collects, uses, and protects information shared through{" "}
                <span className="text-charcoal">nicolemickle.com</span>. By
                using this website, you agree to the practices described
                below.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-4 mt-12">
                Information We Collect
              </h2>
              <p className="mb-4">
                We collect information you voluntarily provide through forms
                on this site, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name, email address, and phone number</li>
                <li>
                  Information about your real estate interests, timeline, and
                  preferences
                </li>
                <li>
                  Messages and inquiries you submit through the contact form
                </li>
                <li>
                  Quiz responses about neighborhood preferences, budget, and
                  lifestyle priorities
                </li>
              </ul>
              <p className="mt-4">
                We also collect limited technical information automatically,
                including pages visited, referral source, browser type, and
                approximate location, through privacy-respecting analytics.
                We do not use third-party advertising trackers.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-4 mt-12">
                How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To respond to your inquiries and follow up on leads</li>
                <li>
                  To send you neighborhood guides, market information, or
                  other materials you request
                </li>
                <li>
                  To improve the website and the relevance of the content we
                  provide
                </li>
                <li>To comply with legal and regulatory obligations</li>
              </ul>
              <p className="mt-4">
                We do not sell, rent, or share your personal information with
                third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-4 mt-12">
                Service Providers
              </h2>
              <p>
                We use trusted third-party services to operate this website,
                including hosting, analytics, and form processing. These
                providers may process information on our behalf but are
                contractually limited to the purposes for which we engage
                them.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-4 mt-12">
                Cookies
              </h2>
              <p>
                This site uses essential cookies to function correctly and
                first-party analytics cookies to understand site usage. You
                can disable cookies through your browser settings, though
                some features may not work as intended.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-4 mt-12">
                Your Choices
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  You can request access to, correction of, or deletion of
                  the personal information we hold about you
                </li>
                <li>
                  You can opt out of email communications at any time by
                  replying to any message we send you
                </li>
                <li>
                  Florida residents have specific rights under applicable
                  state privacy law, including the right to know what
                  personal information we hold and to request its deletion
                </li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, contact us using the
                information below.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-4 mt-12">
                Data Security
              </h2>
              <p>
                We use reasonable technical and organizational measures to
                protect your information. No method of transmission over the
                internet is fully secure, however, and we cannot guarantee
                absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-4 mt-12">
                Children
              </h2>
              <p>
                This website is not directed to children under 13, and we do
                not knowingly collect personal information from children.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-charcoal mb-4 mt-12">
                Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. The
                date at the top of this page reflects the most recent
                update. Continued use of the website after a change
                constitutes acceptance of the revised policy.
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
