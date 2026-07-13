import AdConceptGenerator from "@/components/AdConceptGenerator";
import { Sparkles, BookOpen, Award } from "lucide-react";

const TEMPLATE_PILLS = [
  { name: "Pictorial Analogy", color: "from-violet-500 to-purple-700" },
  { name: "Extreme Situation", color: "from-orange-500 to-red-600" },
  { name: "Consequences", color: "from-emerald-500 to-teal-600" },
  { name: "Competition", color: "from-amber-400 to-yellow-600" },
  { name: "Interactive Experiment", color: "from-cyan-500 to-blue-600" },
  { name: "Dimensionality Alteration", color: "from-pink-500 to-rose-600" },
];

export default function Home() {
  return (
    <>
      {/* Animated mesh background */}
      <div className="bg-mesh" aria-hidden="true" />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* ─── Header ─────────────────────────────── */}
        <header className="sticky top-0 z-50 border-b border-white/[0.06] backdrop-blur-xl bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold font-[var(--font-space-grotesk)] gradient-text">
                AdGenius AI
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-white/30">
              <Award size={12} />
              Based on Goldenberg, Mazursky & Solomon (1999)
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

          <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Powered by the six fundamental creativity templates proven to appear in{" "}
            <strong className="text-white/70">89% of award-winning ads</strong> — from the seminal
            Marketing Science research by Goldenberg, Mazursky & Solomon.
          </p>

          {/* Template pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {TEMPLATE_PILLS.map((t) => (
              <span
                key={t.name}
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${t.color} text-white/90 shadow-sm`}
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
        <footer className="border-t border-white/[0.05] py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/20">
              © 2025 AdGenius AI
            </p>
            <p className="text-xs text-white/20 text-center">
              Templates: Goldenberg, J., Mazursky, D., & Solomon, S. (1999).{" "}
              <em>Marketing Science</em>, 18(3), 333–351.
            </p>
            <p className="text-xs text-white/20">
              Powered by Google Gemini
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
