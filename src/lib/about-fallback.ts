import type { AboutData } from "@/components/about-client";

/**
 * Hardcoded About-page content used as a fallback when Sanity has no
 * `aboutPage` document yet (or returns null on transient failure). This
 * is the exact copy that was rendering before the CMS migration, so the
 * page is guaranteed not to go blank.
 *
 * Once Nicole publishes the seeded document in Studio, this is never
 * shown — Sanity becomes the source of truth.
 */
export const aboutFallback: AboutData = {
  heroEyebrow: "About",
  heroHeadlineLine1: "Three decades",
  heroHeadlineLine2: "of Orlando",
  heroParagraphs: [
    "I grew up in Central Florida. I've been in the real estate industry since 1996, as a mortgage broker, a nationwide closing company owner, a transaction coordinator, and now a realtor. I didn't just learn this business from a textbook. I learned it from the inside out.",
    "For 23 years I ran APAT Real Estate Settlement Services, coordinating closings nationwide. That background gave me a deep understanding of the transaction process from every angle. Today I specialize in relocation and new construction throughout Central Florida.",
    "My Economics degree from Florida A&M gave me an analytical foundation, but what really drives the work is a genuine love for researching communities and understanding their history, how they've evolved, and what makes each one distinct. That curiosity is the nerdy backend behind every neighborhood guide on this site.",
  ],
  heroImage: { src: "/images/nicole.jpg", alt: "Nicole Mickle" },
  journeyEyebrow: "The Path Here",
  journeyHeadline: "From the closing table forward",
  milestones: [
    {
      period: "2014 to 2026",
      title: "Relocation & New Construction",
      description:
        "Focused on relocation and new construction throughout Central Florida. Also founded Florida Homes and Living, a lifestyle blog covering interior design, travel, and Florida living.",
    },
    {
      period: "2012 to 2014",
      title: "Real Estate Sales",
      description:
        "Started at Reliance Realty as a transaction coordinator for an RE attorney/broker, then became a listing agent negotiating short sales. Developed hedge fund and investor relationships, closing 200+ short sales in two years. Pivoted to Instagram and social media marketing, building a global relocation network.",
    },
    {
      period: "1996 to 2019",
      title: "APAT Settlement Services",
      description:
        "Built and ran a nationwide mobile title closing company for 23 years, coordinating closings for mortgage brokers, title companies, and real estate brokerages across the country, including London, England and Puerto Rico.",
    },
    {
      period: "1996 to 2005",
      title: "Mortgage & Closings",
      description:
        "Senior Mortgage Broker at PMC Lending, handling refinancing and conventional loans with a specialty in bankruptcy. Founded Statewide Closers, a mobile notary closing company that grew to cover all Florida counties and eventually expanded nationwide as APAT Settlement Services.",
    },
  ],
  credentialsEyebrow: "Credentials",
  credentialsHeadline: "Professional background",
  credentialItems: [
    "Licensed Realtor, Central Florida",
    "B.S. in Economics, Florida A&M University",
    "Relocation & New Construction Specialist",
    "Former Senior Mortgage Broker",
    "23 Years in Title & Closings Nationwide",
    "Founder, Florida Homes and Living",
    "Top 125 RE Instagram Influencers (Feedspot, 2019)",
    "Social Media Marketer of the Year (Orlando Real Producers, 2019)",
    "Central Florida Native",
  ],
  discretionEyebrow: "Discretion",
  discretionHeadline: "Trusted with high-profile moves",
  discretionParagraphs: [
    "A portion of my clients are public figures, athletes, entertainers, and executives whose moves require a higher level of privacy. That work stays quiet by design.",
    "Past clients have included Olympic and professional athletes who've trusted me with discreet relocations. Whether you're a first-time buyer or someone who needs the transaction handled with more care than most, the process looks the same: research-driven, honest, and on your terms.",
  ],
};
