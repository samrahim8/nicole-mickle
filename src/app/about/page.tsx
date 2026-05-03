import type { Metadata } from "next";
import { AboutClient } from "@/components/about-client";

export const metadata: Metadata = {
  title: "About Nicole",
  description:
    "30 years of Orlando real estate experience. Learn about Nicole Mickle's background in relocation, new construction, and mortgage lending.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutClient />;
}
