import type { Metadata } from "next";
import { RelocatingClient } from "@/components/relocating-client";

export const metadata: Metadata = {
  title: "Relocating to Orlando",
  description:
    "Moving to Orlando? Nicole Mickle specializes in relocation with 30 years of local expertise. From neighborhoods to schools to commutes, get expert guidance.",
};

const steps = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "We start with a conversation about your lifestyle, budget, commute needs, school preferences, and timeline.",
  },
  {
    number: "02",
    title: "Neighborhood Strategy",
    description:
      "Based on what matters to you, I narrow down the neighborhoods that actually fit your life. Schools, commute, weekend rituals, the small details that turn a house into the right place to live.",
  },
  {
    number: "03",
    title: "Virtual & In-Person Tours",
    description:
      "Before you fly down, we can tour homes virtually. When you visit, I curate an efficient itinerary so you see the right homes in the right areas that connect with you.",
  },
  {
    number: "04",
    title: "Offer & Close",
    description:
      "From negotiation to inspection to closing, I manage every detail. My mortgage lending background means I spot financing issues before they become problems.",
  },
];

const reasons = [
  {
    title: "30 years of Orlando knowledge",
    description:
      "I've spent years observing how each neighborhood in this city evolves, its growth, character, and direction, so I can help you align not just with a home, but with a community that truly fits.",
  },
  {
    title: "Mortgage lending background",
    description:
      "With a foundation in mortgage lending, I bring added insight into the financial side of your purchase. I ensure you're connected with the right professionals and that every step of the process is aligned for a smooth, predictable closing.",
  },
  {
    title: "Relocation is my specialty",
    description:
      "This isn't a side service. Helping people move to Orlando is the core of my practice. I know the questions to ask and the fears to address.",
  },
  {
    title: "Honest, not salesy",
    description:
      "I provide candid insight on both the neighborhood and the value of a home, ensuring every decision is aligned with your goals. My focus is on guiding you to the right choice, not just closing a deal.",
  },
];

const originCities = [
  { name: "New York", slug: "new-york" },
  { name: "Illinois", slug: "illinois" },
  { name: "Massachusetts", slug: "massachusetts" },
  { name: "Washington, D.C.", slug: "washington-dc" },
  { name: "Georgia", slug: "georgia" },
  { name: "California", slug: "california" },
];

const employers = [
  "Lockheed Martin",
  "Walt Disney Company",
  "AdventHealth",
  "Orlando Health",
  "Deloitte",
  "Marriott",
  "Darden Restaurants",
  "Coca-Cola",
  "PepsiCo",
  "Frito-Lay",
  "Walgreens",
  "Orlando Utilities Commission (OUC)",
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What's the best neighborhood in Orlando for families?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on your priorities. Winter Park and Baldwin Park offer walkability and top-rated schools. Lake Nona is newer with excellent amenities. Windermere has larger lots and a quieter pace. Nicole matches neighborhoods to your lifestyle, commute, school preferences, and budget rather than giving a one-size-fits-all answer.",
      },
    },
    {
      "@type": "Question",
      name: "How far in advance should I start working with a realtor before relocating?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ideally three to six months before your move date. That gives time for a discovery call, neighborhood research, virtual tours, and at least one in-person visit before writing offers. If your timeline is shorter, Nicole can adjust and has helped clients close in as little as 30 days when needed.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to visit Orlando before buying a home?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Strongly recommended but not always required. Nicole offers detailed video tours, neighborhood drive-throughs, and FaceTime walkthroughs so you can evaluate homes remotely. Many relocation clients narrow their list virtually, then fly in for a focused weekend of final showings before making an offer.",
      },
    },
    {
      "@type": "Question",
      name: "What are the top rated schools in the Orlando area?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Orange County, Seminole County and Osceola County have highly rated public school districts with multiple A-rated schools. Winter Garden, Winter Park, Windermere, and Lake Nona are especially known for top-rated public schools. Private and charter options including and not limited to Bishop Moore, Trinity Prep, The Geneva School, Lake Highland Prep, Windermere Prep and Foundation Academy are also strong. I help match your family to the right school zone based on your priorities.",
      },
    },
  ],
};

export default function RelocatingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <RelocatingClient
        steps={steps}
        reasons={reasons}
        originCities={originCities}
        employers={employers}
      />
    </>
  );
}
