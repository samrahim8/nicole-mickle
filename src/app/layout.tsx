import type { Metadata } from "next";
import { Bodoni_Moda, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SiteChrome } from "@/components/site-chrome";

const bodoni = Bodoni_Moda({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nicolemickle.com"),
  title: {
    default: "Nicole Mickle | Orlando Real Estate - Relocation & New Construction Specialist",
    template: "%s | Nicole Mickle Real Estate",
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [
        { url: "/blog/rss.xml", title: "Nicole Mickle – Journal" },
      ],
    },
  },
  description:
    "Orlando's trusted relocation and new construction specialist with 30 years of experience. Expert guidance for moving to Orlando, new builds, and finding your perfect neighborhood.",
  keywords: [
    "Orlando realtor",
    "Orlando relocation",
    "Orlando new construction",
    "moving to Orlando",
    "Orlando real estate agent",
    "Orlando neighborhoods",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nicolemickle.com",
    siteName: "Nicole Mickle Real Estate",
    title: "Nicole Mickle | Orlando's Relocation & New Construction Specialist",
    description:
      "Orlando's relocation and new construction specialist. 30 years of market expertise. Find your neighborhood before you pack a single box.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nicole Mickle | Orlando Real Estate",
    description:
      "Orlando's relocation and new construction specialist with 30 years of experience.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["RealEstateAgent", "LocalBusiness"],
  name: "Nicole Mickle",
  description:
    "Orlando relocation and new construction real estate specialist with 30 years of industry experience.",
  url: "https://nicolemickle.com",
  telephone: "+1-407-353-0826",
  email: "nicole@nicolemickle.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "13790 Bridgewater Crossings Blvd. Ste 1080",
    addressLocality: "Windermere",
    addressRegion: "FL",
    postalCode: "34786",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "City",
    name: "Orlando",
    containedInPlace: {
      "@type": "State",
      name: "Florida",
    },
  },
  knowsAbout: [
    "Relocation",
    "New Construction",
    "Orlando Real Estate",
    "Mortgage Lending",
  ],
  worksFor: {
    "@type": "RealEstateOrganization",
    name: "Olympus Executive Realty",
    address: {
      "@type": "PostalAddress",
      streetAddress: "13790 Bridgewater Crossings Blvd. Ste 1080",
      addressLocality: "Windermere",
      addressRegion: "FL",
      postalCode: "34786",
      addressCountry: "US",
    },
  },
  sameAs: [
    "https://www.instagram.com/iorlandorealestate/",
    "https://www.facebook.com/NicoleMickleFL/",
    "https://www.linkedin.com/in/orlandorealestate/",
    "https://www.youtube.com/channel/UCkzLaH9JCWK5epROI2ZyvtA",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SiteChrome navbar={<Navbar />} footer={<Footer />}>
          {children}
        </SiteChrome>
        <Analytics />
      </body>
    </html>
  );
}
