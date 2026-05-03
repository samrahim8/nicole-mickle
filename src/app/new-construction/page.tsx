import type { Metadata } from "next";
import { NewConstructionClient } from "@/components/new-construction-client";

export const metadata: Metadata = {
  title: "New Construction",
  description:
    "Expert guidance on new construction homes in Orlando. Nicole Mickle helps you select builders, negotiate upgrades, and navigate the build process.",
  alternates: { canonical: "/new-construction" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need my own realtor when buying new construction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "I offer a high level of representation throughout the new construction process, guiding you through the builder's contract, advising on key decisions, and advocating for available incentives such as closing cost contributions, upgrade opportunities, and lot considerations. My compensation is handled directly with the builder, in alignment with customary real estate practices.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to build a new home in Orlando?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most production homes take six to twelve months from contract to closing. Semi-custom and fully custom builds can take twelve to eighteen months or longer depending on complexity. Timelines can shift due to permitting, weather, or supply chain factors. Nicole monitors the build schedule and keeps you informed at every stage.",
      },
    },
    {
      "@type": "Question",
      name: "What upgrades are worth the investment in a new build?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Spend on the things you can't change later. Ceiling height, electrical and plumbing rough-ins, structural options, and the floor plan choices that affect resale belong on the contract. Cosmetic finishes are different. Paint, fixtures, and backsplashes can almost always be done better and cheaper after closing.",
      },
    },
    {
      "@type": "Question",
      name: "Can I negotiate the price on a new construction home?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, to an extent. Negotiability often depends on the builder's inventory levels and overall demand within the community. While builders typically avoid reducing base prices to protect future comparable sales, there is often opportunity to secure value through closing cost contributions, upgrade packages, lot premiums, and interest rate buydowns offered through the builder's preferred lender.",
      },
    },
  ],
};

export default function NewConstructionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <NewConstructionClient />
    </>
  );
}
