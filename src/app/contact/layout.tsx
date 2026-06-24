import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Nicole Mickle. Email, phone, and a contact form for relocation, new construction, or general Orlando real estate questions.",
  path: "/contact",
});

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Nicole Mickle Real Estate",
  url: "https://nicolemickle.com/contact",
  description:
    "Contact Nicole Mickle Real Estate in Windermere, Florida for home buying, selling, relocation, and new construction real estate services in the Orlando and Central Florida area.",
  mainEntity: {
    "@type": "Organization",
    name: "Nicole Mickle Real Estate",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+1-407-353-0826",
        email: "nicole@nicolemickle.com",
        contactType: "customer service",
        areaServed: "Central Florida",
        availableLanguage: "English",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "13790 Bridgewater Crossings Blvd. Ste 1080",
      addressLocality: "Windermere",
      addressRegion: "FL",
      postalCode: "34786",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "28.4957",
      longitude: "-81.5343",
    },
    sameAs: [
      "https://www.instagram.com/iorlandorealestate/",
      "https://www.facebook.com/NicoleMickleFL/",
      "https://www.linkedin.com/in/orlandorealestate/",
      "https://www.youtube.com/@nicolemickle3735/shorts",
      "https://www.tiktok.com/@iorlandorealestate",
    ],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      {children}
    </>
  );
}
