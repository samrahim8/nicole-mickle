"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { neighborhoods, type Neighborhood } from "@/lib/neighborhoods";

// ── Question Data ──

interface Option {
  label: string;
  value: string;
}

interface Question {
  id: string;
  label: string;
  heading: string;
  subtext: string;
  options: Option[];
}

const questions: Question[] = [
  {
    id: "reason",
    label: "01",
    heading: "What brings you to Orlando?",
    subtext: "This helps us understand where you are in your journey.",
    options: [
      { label: "Relocating from out of state", value: "relocation" },
      { label: "Looking to build new", value: "new-construction" },
      { label: "Already here, ready for a change", value: "local" },
      { label: "Just exploring for now", value: "exploring" },
    ],
  },
  {
    id: "lifestyle",
    label: "02",
    heading: "What matters most in a neighborhood?",
    subtext: "Pick the one that resonates most. We'll fine-tune from there.",
    options: [
      { label: "Walkability and culture", value: "walkable" },
      { label: "Space and privacy", value: "space" },
      { label: "New everything — home, schools, amenities", value: "new" },
      { label: "Great dining and convenience", value: "dining" },
      { label: "Community and connection", value: "community" },
    ],
  },
  {
    id: "budget",
    label: "03",
    heading: "What's your budget range?",
    subtext: "No judgment. Every price point has excellent options in Orlando.",
    options: [
      { label: "Under $500K", value: "under-500" },
      { label: "$500K - $800K", value: "500-800" },
      { label: "$800K - $1.2M", value: "800-1200" },
      { label: "$1.2M and above", value: "1200-plus" },
    ],
  },
  {
    id: "construction",
    label: "04",
    heading: "New construction or established?",
    subtext: "This significantly narrows your neighborhood options.",
    options: [
      { label: "Must be new construction", value: "must-new" },
      { label: "Prefer new, open to resale", value: "prefer-new" },
      { label: "Open to either", value: "either" },
      { label: "Prefer character and established neighborhoods", value: "established" },
    ],
  },
  {
    id: "commute",
    label: "05",
    heading: "Where do you need to get to?",
    subtext: "Or select remote if commute isn't a factor.",
    options: [
      { label: "Downtown Orlando", value: "downtown" },
      { label: "The attractions corridor (Disney, Universal)", value: "attractions" },
      { label: "Orlando International Airport", value: "airport" },
      { label: "I work remotely — flexibility is key", value: "remote" },
    ],
  },
];

// ── Scoring Logic ──

type Answers = Record<string, string>;

function scoreNeighborhoods(answers: Answers): Neighborhood[] {
  const scores = new Map<string, number>();
  neighborhoods.forEach((n) => scores.set(n.slug, 0));

  function add(slug: string, points: number) {
    scores.set(slug, (scores.get(slug) || 0) + points);
  }

  const lifestyle = answers.lifestyle;
  if (lifestyle === "walkable") { add("winter-park", 3); add("baldwin-park", 3); add("celebration", 2); }
  else if (lifestyle === "space") { add("windermere", 3); add("winter-garden", 2); add("horizon-west", 2); }
  else if (lifestyle === "new") { add("lake-nona", 3); add("horizon-west", 3); add("winter-garden", 2); }
  else if (lifestyle === "dining") { add("dr-phillips", 3); add("winter-park", 2); add("baldwin-park", 2); }
  else if (lifestyle === "community") { add("celebration", 3); add("baldwin-park", 3); add("lake-nona", 2); add("winter-garden", 2); }

  const budget = answers.budget;
  if (budget === "under-500") { add("horizon-west", 2); add("celebration", 2); add("dr-phillips", 2); add("baldwin-park", 1); }
  else if (budget === "500-800") { add("lake-nona", 2); add("winter-garden", 2); add("dr-phillips", 2); add("horizon-west", 2); add("celebration", 1); }
  else if (budget === "800-1200") { add("winter-park", 2); add("lake-nona", 2); add("windermere", 2); add("winter-garden", 2); }
  else if (budget === "1200-plus") { add("windermere", 3); add("winter-park", 3); add("lake-nona", 2); }

  const construction = answers.construction;
  if (construction === "must-new") { add("horizon-west", 3); add("lake-nona", 3); add("winter-garden", 2); add("winter-park", -2); add("baldwin-park", -3); }
  else if (construction === "prefer-new") { add("horizon-west", 2); add("lake-nona", 2); add("winter-garden", 1); }
  else if (construction === "established") { add("winter-park", 3); add("baldwin-park", 3); add("windermere", 2); add("horizon-west", -1); }

  const commute = answers.commute;
  if (commute === "downtown") { add("baldwin-park", 3); add("winter-park", 2); add("dr-phillips", 1); }
  else if (commute === "attractions") { add("dr-phillips", 3); add("celebration", 3); add("windermere", 2); add("horizon-west", 2); }
  else if (commute === "airport") { add("lake-nona", 3); add("baldwin-park", 2); add("dr-phillips", 1); }
  else if (commute === "remote") { add("winter-garden", 2); add("windermere", 2); add("celebration", 1); add("winter-park", 1); }

  if (answers.reason === "new-construction") { add("horizon-west", 2); add("lake-nona", 2); add("winter-garden", 1); }

  const sorted = [...scores.entries()].sort((a, b) => b[1] - a[1]);
  return sorted.slice(0, 3).map(([slug]) => neighborhoods.find((n) => n.slug === slug)!).filter(Boolean);
}

// ── Slide Animation ──

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -80 : 80, opacity: 0 }),
};

// ── Component ──

export function QuizClient() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Answers>({});
  const [direction, setDirection] = useState(1);
  const [results, setResults] = useState<Neighborhood[] | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = useCallback(
    (questionId: string, value: string) => {
      const newAnswers = { ...answers, [questionId]: value };
      setAnswers(newAnswers);
      setDirection(1);
      setTimeout(() => {
        if (step < questions.length - 1) {
          setStep((s) => s + 1);
        } else {
          setResults(scoreNeighborhoods(newAnswers));
          setStep(questions.length);
        }
      }, 400);
    },
    [answers, step]
  );

  const goBack = useCallback(() => {
    if (step > 0) { setDirection(-1); setStep((s) => s - 1); }
    else if (step === 0) { setDirection(-1); setStep(-1); }
  }, [step]);

  const progress = step >= 0 ? ((step + 1) / (questions.length + 1)) * 100 : 0;
  const showResults = step === questions.length && results;

  return (
    <div className={`min-h-[100svh] flex flex-col ${showResults ? "bg-[#1B3A2D] text-white" : "bg-[#FAFAF9] text-charcoal"} transition-colors duration-700`}>
      {/* Progress bar */}
      {step >= 0 && (
        <div className={`fixed top-[3px] left-0 right-0 h-[2px] z-[9999] ${showResults ? "bg-white/10" : "bg-neutral-200"}`}>
          <motion.div
            className={showResults ? "h-full bg-white/60" : "h-full bg-[#1B3A2D]/60"}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      )}

      {/* Nav */}
      <div className="fixed top-[3px] left-0 right-0 z-[9999] px-6 lg:px-12">
        <div className="max-w-[90rem] mx-auto flex items-center justify-between h-16 lg:h-20">
          <Link
            href="/"
            className={`font-[family-name:var(--font-playfair)] text-xl tracking-[-0.02em] ${showResults ? "text-white" : "text-charcoal"}`}
          >
            Nicole Mickle
          </Link>
          {step >= 0 && step < questions.length && (
            <button
              onClick={goBack}
              className="text-[12px] tracking-wide text-neutral-400 hover:text-charcoal transition-colors duration-300 flex items-center gap-2 py-3 -my-3"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13 8H3M7 4l-4 4 4 4" />
              </svg>
              Back
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 lg:px-12">
        <AnimatePresence mode="wait" custom={direction}>
          {/* Intro */}
          {step === -1 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl mx-auto text-center"
            >
              <p className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-8">
                Neighborhood Quiz
              </p>
              <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-charcoal mb-6">
                Find your Orlando
                <br />
                <span className="italic">neighborhood</span>
              </h1>
              <p className="text-[16px] sm:text-[15px] text-neutral-500 leading-[1.8] max-w-md mx-auto mb-12">
                Five questions. Two minutes. Personalized neighborhood
                recommendations based on your lifestyle, budget, and priorities.
              </p>
              <button
                onClick={() => { setDirection(1); setStep(0); }}
                className="group inline-flex items-center gap-3 text-[15px] sm:text-[13px] tracking-wide font-medium text-white bg-[#1B3A2D] px-8 py-4 hover:bg-[#234B39] transition-all duration-300"
              >
                Start the quiz
                <svg
                  width="14" height="14" viewBox="0 0 16 16" fill="none"
                  stroke="currentColor" strokeWidth="1.5"
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </button>
            </motion.div>
          )}

          {/* Questions */}
          {step >= 0 && step < questions.length && (
            <motion.div
              key={questions[step].id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl mx-auto w-full"
            >
              <div className="text-center mb-12">
                <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-300 mb-6">
                  {questions[step].label} / {String(questions.length).padStart(2, "0")}
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,4vw,2.75rem)] leading-[1.15] tracking-[-0.02em] text-charcoal mb-4">
                  {questions[step].heading}
                </h2>
                <p className="text-[16px] sm:text-[14px] text-neutral-400">
                  {questions[step].subtext}
                </p>
              </div>

              <div className="space-y-3">
                {questions[step].options.map((option, i) => {
                  const isSelected = answers[questions[step].id] === option.value;
                  return (
                    <motion.button
                      key={option.value}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.4 }}
                      onClick={() => handleSelect(questions[step].id, option.value)}
                      className={`w-full text-left px-6 py-5 border transition-all duration-300 flex items-center justify-between group ${
                        isSelected
                          ? "border-[#1B3A2D] bg-[#1B3A2D]/5"
                          : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                      }`}
                    >
                      <span className={`text-[15px] transition-colors duration-300 ${
                        isSelected ? "text-[#1B3A2D]" : "text-neutral-600 group-hover:text-charcoal"
                      }`}>
                        {option.label}
                      </span>
                      <svg
                        width="14" height="14" viewBox="0 0 16 16" fill="none"
                        stroke="currentColor" strokeWidth="1.5"
                        className={`transition-all duration-300 ${
                          isSelected
                            ? "text-[#1B3A2D] opacity-100 translate-x-0"
                            : "text-neutral-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                        }`}
                      >
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Results — stays dark green for contrast */}
          {showResults && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl mx-auto w-full py-20 lg:py-32"
            >
              <div className="text-center mb-16">
                <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-6">
                  Your Results
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,4vw,3rem)] leading-[1.15] tracking-[-0.02em] text-white mb-4">
                  Your top Orlando neighborhoods
                </h2>
                <p className="text-[16px] sm:text-[14px] text-white/50 max-w-md mx-auto">
                  Based on your answers, these neighborhoods are your best fit.
                  Explore the full guides or download your personalized report.
                </p>
              </div>

              <div className="space-y-4 mb-16">
                {results.map((n, i) => (
                  <motion.div
                    key={n.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                  >
                    <Link
                      href={`/neighborhoods/${n.slug}`}
                      className="group block border border-white/10 p-6 lg:p-8 hover:border-white/25 hover:bg-white/5 transition-all duration-500"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-baseline gap-4">
                          <span className="text-[11px] tracking-[0.2em] text-white/30">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h3 className="font-[family-name:var(--font-playfair)] text-xl text-white">
                            {n.name}
                          </h3>
                        </div>
                        <svg
                          width="14" height="14" viewBox="0 0 16 16" fill="none"
                          stroke="currentColor" strokeWidth="1.5"
                          className="text-white/20 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0 mt-1.5"
                        >
                          <path d="M4 12L12 4M12 4H6M12 4v6" />
                        </svg>
                      </div>
                      <p className="text-[15px] sm:text-[13px] text-white/50 leading-relaxed mb-4">
                        {n.tagline}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-white/30">
                        <span>{n.priceRange}</span>
                        <span>To downtown: {n.commute.downtown}</span>
                        {n.newConstruction.builders.length > 0 && (
                          <span>New construction available</span>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Email capture */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="border-t border-white/10 pt-12"
              >
                {submitted ? (
                  <div className="text-center">
                    <h3 className="font-[family-name:var(--font-playfair)] text-xl text-white mb-3">
                      Check your inbox
                    </h3>
                    <p className="text-[16px] sm:text-[14px] text-white/50">
                      Your personalized neighborhood guide is on its way.
                    </p>
                  </div>
                ) : (
                  <div className="max-w-md mx-auto text-center">
                    <h3 className="font-[family-name:var(--font-playfair)] text-xl text-white mb-3">
                      Get your personalized guide
                    </h3>
                    <p className="text-[16px] sm:text-[14px] text-white/50 mb-8">
                      Detailed neighborhood breakdowns, price points, schools, and
                      Nicole&apos;s personal recommendations — delivered to your inbox.
                    </p>
                    <form
                      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                      className="flex flex-col sm:flex-row gap-3"
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="your@email.com"
                        className="flex-1 px-4 py-3.5 bg-white/5 border border-white/15 text-[16px] sm:text-[14px] text-white placeholder:text-white/25 focus:outline-none focus:border-white/40 transition-colors duration-300"
                      />
                      <button
                        type="submit"
                        className="px-6 py-3.5 bg-white text-[#1B3A2D] text-[15px] sm:text-[13px] font-medium tracking-wide hover:bg-white/90 transition-colors duration-300 shrink-0"
                      >
                        Send guide
                      </button>
                    </form>
                  </div>
                )}
              </motion.div>

              <div className="text-center mt-12">
                <Link
                  href="/"
                  className="text-[12px] tracking-wide text-white/30 hover:text-white/60 transition-colors duration-300"
                >
                  Back to nicolemickle.com
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
