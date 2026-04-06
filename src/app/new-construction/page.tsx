import type { Metadata } from "next";
import { NewConstructionClient } from "@/components/new-construction-client";

export const metadata: Metadata = {
  title: "New Construction",
  description:
    "Expert guidance on new construction homes in Orlando. Nicole Mickle helps you select builders, negotiate upgrades, and navigate the build process.",
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
        text: "Yes. The sales agent at the model home represents the builder, not you. Having your own agent costs you nothing as a buyer. The builder pays the commission either way. Your agent reviews the contract, negotiates incentives, monitors the build timeline, and protects your interests throughout the process.",
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
        text: "Structural upgrades like additional electrical outlets, plumbing rough-ins, and expanded garages are nearly impossible to add later and tend to be worth the cost. Kitchen and bathroom finishes also add value. Cosmetic upgrades like premium paint or lighting fixtures are often cheaper to do yourself after closing. Nicole helps you evaluate each upgrade for actual return on investment.",
      },
    },
    {
      "@type": "Question",
      name: "Can I negotiate the price on a new construction home?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Builders rarely lower the base price because it affects comparable sales for the rest of the community. However, there is often room to negotiate closing cost credits, upgrade packages, lot premiums, and rate buydowns through the builder's preferred lender. The best leverage usually comes during pre-construction phases or when builders need to close out remaining inventory.",
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
