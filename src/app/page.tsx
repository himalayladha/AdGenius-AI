import AdConceptGenerator from "@/components/AdConceptGenerator";
import ThemeToggle from "@/components/ThemeToggle";
import { Sparkles, BookOpen, Award } from "lucide-react";

const TEMPLATE_PILLS = [
  { name: "Pictorial Analogy", styles: "bg-yellow-400/10 dark:bg-yellow-400/5 border-yellow-500/20 text-yellow-700 dark:text-yellow-300" },
  { name: "Extreme Situation", styles: "bg-amber-400/10 dark:bg-amber-400/5 border-amber-400/20 text-amber-700 dark:text-amber-300" },
  { name: "Consequences", styles: "bg-yellow-500/10 dark:bg-yellow-500/5 border-yellow-500/20 text-yellow-800 dark:text-yellow-400" },
  { name: "Competition", styles: "bg-amber-500/10 dark:bg-amber-500/5 border-amber-500/20 text-amber-800 dark:text-amber-400" },
  { name: "Interactive Experiment", styles: "bg-yellow-400/10 dark:bg-yellow-400/5 border-yellow-500/20 text-yellow-700 dark:text-yellow-300" },
  { name: "Dimensionality Alteration", styles: "bg-amber-400/10 dark:bg-amber-400/5 border-amber-500/20 text-amber-700 dark:text-amber-300" },
];

export default function Home() {
  return (
    <>
      {/* Animated mesh background */}
      <div className="bg-mesh" aria-hidden="true" />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* ─── Header ─────────────────────────────── */}
        <header className="sticky top-0 z-50 border-b border-theme-border-08 bg-[rgb(var(--surface))]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center">
                <Sparkles size={16} className="text-black font-bold" />
              </div>
              <span className="text-lg font-bold font-[var(--font-space-grotesk)] gradient-text">
                AdGenius AI
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-xs text-theme-text-30">
                <Award size={12} />
                Based on Goldenberg, Mazursky & Solomon (1999)
              </div>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* ─── Hero ───────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-10 text-center">
          <div className="inline-flex items-center gap-2 section-tag mb-6">
            <BookOpen size={11} />
            Research-Backed Ad Generation
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-space-grotesk)] leading-tight tracking-tight mb-5">
            Generate{" "}
            <span className="gradient-text">Award-Winning</span>
            <br />
            Ad Concepts with AI
          </h1>

          <p className="text-theme-text-50 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Powered by the six fundamental creativity templates proven to appear in{" "}
            <strong className="text-theme-text-70">89% of award-winning ads</strong> — from the seminal
            Marketing Science research by Goldenberg, Mazursky & Solomon.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {TEMPLATE_PILLS.map((t) => (
              <span
                key={t.name}
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${t.styles} shadow-sm`}
              >
                {t.name}
              </span>
            ))}
          </div>
        </section>

        {/* ─── Main Content ────────────────────────── */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 pb-20 w-full">
          <AdConceptGenerator />
        </main>

        {/* ─── Footer ─────────────────────────────── */}
        <footer className="border-t border-theme-border-06 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-theme-text-20">
              © 2025 AdGenius AI
            </p>
            <p className="text-xs text-theme-text-20 text-center">
              Templates: Goldenberg, J., Mazursky, D., & Solomon, S. (1999).{" "}
              <em>Marketing Science</em>, 18(3), 333–351.
            </p>
            <p className="text-xs text-theme-text-20">
              Powered by Google Gemini
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
