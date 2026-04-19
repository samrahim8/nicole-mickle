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
      "We start with a conversation about your lifestyle, budget, commute needs, school preferences, and timeline. I ask the questions most agents don't think of.",
  },
  {
    number: "02",
    title: "Neighborhood Strategy",
    description:
      "Based on what matters to you, I narrow down the neighborhoods that actually fit your life. Not just price. Not just proximity. The full picture.",
  },
  {
    number: "03",
    title: "Virtual & In-Person Tours",
    description:
      "Before you fly down, we can tour homes virtually. When you visit, I curate an efficient itinerary so you see the right homes in the right areas.",
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
      "I've watched every neighborhood in this city evolve. I know which areas are appreciating, which are overbuilt, and which are genuinely great places to live.",
  },
  {
    title: "Mortgage lending background",
    description:
      "Before real estate, I worked in mortgage lending. I understand financing at a level most agents don't, and I help you avoid costly surprises.",
  },
  {
    title: "Relocation is my specialty",
    description:
      "This isn't a side service. Helping people move to Orlando is the core of my practice. I know the questions to ask and the fears to address.",
  },
  {
    title: "Honest, not salesy",
    description:
      "I'll tell you if a neighborhood isn't right for you. I'll tell you if a home is overpriced. My job is to help you make a great decision, not close a deal.",
  },
];

const originCities = [
  { name: "New York", slug: "new-york" },
  { name: "Chicago", slug: "chicago" },
  { name: "Boston", slug: "boston" },
  { name: "Washington, D.C.", slug: "washington-dc" },
  { name: "Atlanta", slug: "atlanta" },
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
      name: "What's the cost of living like compared to other major cities?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Orlando is significantly more affordable than cities like New York, San Francisco, or Boston. There is no state income tax in Florida, which makes a real difference in take-home pay. Housing costs vary widely by neighborhood, but you can find quality homes in excellent school districts at price points that would be impossible in many Northeast or West Coast metros.",
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
