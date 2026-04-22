import Link from "next/link";
import { neighborhoods } from "@/lib/neighborhoods";
import { HomeClient } from "@/components/home-client";

const credentials = [
  "30 Years of Orlando Real Estate",
  "Relocation Specialist",
  "New Construction Expert",
  "Mortgage Lending Background",
];

const audiences = [
  {
    title: "Relocating to Orlando",
    description:
      "Moving from out of state? I'll navigate neighborhoods, schools, commutes, and lifestyle so you find the right fit before you even visit.",
    href: "/relocating",
    cta: "Plan Your Move",
    number: "01",
  },
  {
    title: "Exploring New Construction",
    description:
      "I attend weekly builder meetings, track building codes, and monitor upgrade options so you make informed decisions from lot selection through closing.",
    href: "/new-construction",
    cta: "Explore Builders",
    number: "02",
  },
  {
    title: "Ready to Make a Move",
    description:
      "Already in Orlando and ready for your next chapter? Whether upsizing, downsizing, or changing neighborhoods, I know this market inside and out.",
    href: "/contact",
    cta: "Let's Talk",
    number: "03",
  },
];

const testimonials = [
  {
    text: "I highly recommend Nicole Mickle for anyone seeking an exceptional realtor. Her professionalism and dedication were evident throughout my entire relocation from New York to Florida. Nicole expertly managed every aspect, from coordinating remote home viewings to overseeing all documentation and paperwork with meticulous attention to detail.",
    author: "J D",
    context: "Relocated from New York",
  },
  {
    text: "Above and beyond doesn't even start to cover it with Nicole! We had the pleasure of working with her for not one, but two long distance moves over the past three years. We cannot speak highly enough about Nicole on both a professional and personal level.",
    author: "Erin Myers",
    context: "Two long-distance relocations",
  },
  {
    text: "Nicole is my real estate agent who has helped me relocate from Bethesda, Maryland to Orlando, Florida. She is a great communicator. Nicole has the best interests of her clients in heart, and she deeply cares about them. I strongly recommend Nicole to all of my relatives, friends, colleagues.",
    author: "Xiaolu Li",
    context: "Relocated from Bethesda, MD. New construction",
  },
  {
    text: "Nicole has been a fantastic help in our search for a home in Orlando. She was incredibly knowledgeable, helpful and understanding of our needs. I highly recommend Nicole for anyone looking to relocate to this area.",
    author: "Henk Pretorius",
    context: "Relocated from South Africa",
  },
  {
    text: "Nicole Mickle's skill set and talents as a realtor are second to none. She made sure that we appropriated the best deal possible. Nicole is not only an incredibly gifted realtor, but an even better individual.",
    author: "Tiffanie Logan",
    context: "Bought and sold within two years",
  },
  {
    text: "Nicole was recommended to me by my accountant. Most importantly, Nicole sold the property for the listed price in less time that I have ever experienced.",
    author: "Norma Harris",
    context: "Sold property remotely",
  },
];

const mediaLogos = [
  "Wall Street Journal",
  "Business Insider",
  "HomeLight",
  "Inman",
  "The Close",
];

export default function Home() {
  return (
    <HomeClient
      credentials={credentials}
      audiences={audiences}
      neighborhoods={neighborhoods}
      testimonials={testimonials}
      mediaLogos={mediaLogos}
    />
  );
}
