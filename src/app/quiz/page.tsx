import type { Metadata } from "next";
import { QuizClient } from "@/components/quiz-client";

export const metadata: Metadata = {
  title: "Find Your Orlando Neighborhood",
  description:
    "Take a 2-minute quiz to find the Orlando neighborhood that fits your lifestyle, budget, and priorities. Personalized recommendations from a 30-year local expert.",
};

export default function QuizPage() {
  return <QuizClient />;
}
