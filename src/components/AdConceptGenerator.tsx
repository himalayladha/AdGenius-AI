'use client';

import { useState, useEffect, useCallback } from 'react';
import { Sparkles, ChevronDown, ChevronUp, Lightbulb, Zap, GitBranch, Trophy, FlaskConical, Scaling, Wand2 } from 'lucide-react';
import { AdConcept, AdConceptInput } from '@/lib/templates';
import { generateAllConcepts } from '@/app/actions';
import AdConceptCard from './AdConceptCard';

const LOADING_MESSAGES = [
  "Brewing up creative concepts...",
  "Mining for marketing gold...",
  "Assembling awesome ad ideas...",
  "Warming up the AI brain...",
  "Unleashing structured creativity...",
  "Consulting the marketing muses...",
  "Applying the 6 creativity templates...",
  "Analyzing award-winning patterns...",
];

const BRAND_TONES = ['Premium', 'Playful', 'Bold', 'Minimalist', 'Luxurious', 'Aspirational', 'Witty', 'Authoritative'];
const POST_FORMATS = ['Image Post', 'Carousel Post', 'Video Post', 'Reel / Short Video', 'Story', 'Long Video (YouTube)', 'Print Ad', 'Billboard'];
const CAMPAIGN_TYPES = ['Awareness', 'Conversion', 'Lead Generation', 'Retention', 'Brand Building'];

const TEMPLATE_ICONS: Record<string, React.ElementType> = {
  pictorial_analogy: Lightbulb,
  extreme_situation: Zap,
  consequences: GitBranch,
  competition: Trophy,
  interactive_experiment: FlaskConical,
  dimensionality_alteration: Scaling,
};

function TypewriterLoader() {
  const [msgIdx, setMsgIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const current = LOADING_MESSAGES[msgIdx];
    if (charIdx < current.length) {
      const t = setTimeout(() => {
        setTyped((p) => p + current[charIdx]);
        setCharIdx((p) => p + 1);
      }, 40);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setCharIdx(0);
        setTyped('');
        setMsgIdx((p) => (p + 1) % LOADING_MESSAGES.length);
      }, 2200);
      return () => clearTimeout(t);
    }
  }, [charIdx, msgIdx]);

  return (
    <div className="flex flex-col items-center gap-6 py-16">
      {/* Orbital spinner */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-2 border-yellow-500/20" />
        <div className="absolute inset-0 rounded-full border-t-2 border-yellow-500 spinner" />
        <div className="absolute inset-2 rounded-full border-2 border-amber-400/20" />
        <div className="absolute inset-2 rounded-full border-b-2 border-amber-400 spinner" style={{ animationDuration: '1.2s', animationDirection: 'reverse' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Wand2 size={20} className="text-yellow-400 pulse-glow" />
        </div>
      </div>

      <div className="text-center">
        <p className="text-lg font-medium text-yellow-300 min-h-[28px] font-[var(--font-space-grotesk)]">
          {typed}
          <span className="typewriter-cursor" />
        </p>
        <p className="text-sm text-theme-text-30 mt-2">Generating 6 template concepts in parallel</p>
      </div>

      {/* Template progress indicators */}
      <div className="flex gap-2 mt-2">
        {Object.values(TEMPLATE_ICONS).map((Icon, i) => (
          <div
            key={i}
            className="w-9 h-9 rounded-lg glass flex items-center justify-center pulse-glow"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <Icon size={16} className="text-theme-text-40" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SkeletonCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="concept-card" style={{ animationDelay: `${i * 0.08}s` }}>
          <div className="skeleton h-4 w-24 mb-4" />
          <div className="skeleton h-6 w-40 mb-6" />
          <div className="skeleton h-3 w-full mb-2" />
          <div className="skeleton h-3 w-5/6 mb-2" />
          <div className="skeleton h-3 w-4/6 mb-6" />
          <div className="skeleton h-3 w-full mb-2" />
          <div className="skeleton h-3 w-3/4 mb-6" />
          <div className="skeleton h-8 w-28" />
        </div>
      ))}
    </div>
  );
}

export default function AdConceptGenerator() {
  const [formData, setFormData] = useState<AdConceptInput>({
    productName: '',
    keyBenefit: '',
    brandTone: '',
    postFormat: '',
    targetAudience: '',
    competitors: '',
    campaignType: '',
  });
  const [concepts, setConcepts] = useState<AdConcept[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const isFormValid =
    formData.productName.trim().length >= 2 &&
    formData.keyBenefit.trim().length >= 10 &&
    formData.brandTone &&
    formData.postFormat;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isLoading) return;

    setIsLoading(true);
    setError(null);
    setConcepts(null);

    try {
      const results = await generateAllConcepts(formData);
      setConcepts(results);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      if (msg.includes('API_KEY') || msg.includes('API key')) {
        setError('Invalid or missing GOOGLE_GENAI_API_KEY. Please check your .env.local file.');
      } else {
        setError(`Generation failed: ${msg}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = useCallback((updated: AdConcept) => {
    setConcepts((prev) =>
      prev ? prev.map((c) => (c.templateKey === updated.templateKey ? updated : c)) : prev
    );
  }, []);

  const handleChange = (field: keyof AdConceptInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="relative z-10">
      {/* ─── Form Card ─────────────────────────────── */}
      <div className="glass rounded-2xl p-6 sm:p-8 gradient-border">
        <div className="mb-6">
          <span className="section-tag">
            <Sparkles size={11} />
            Input
          </span>
          <h2 className="text-xl font-bold mt-3 font-[var(--font-space-grotesk)]">
            Describe Your Product
          </h2>
          <p className="text-sm text-theme-text-40 mt-1">
            The AI will apply each of the 6 creativity templates to generate unique ad concepts.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1: Product name + Brand tone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label" htmlFor="productName">
                Product / Service Name <span className="text-red-400">*</span>
              </label>
              <input
                id="productName"
                className="input-field"
                type="text"
                placeholder="e.g. AirPods Pro, Duolingo, Tesla Model S"
                value={formData.productName}
                onChange={(e) => handleChange('productName', e.target.value)}
                minLength={2}
                required
              />
            </div>
            <div>
              <label className="form-label" htmlFor="brandTone">
                Brand Tone <span className="text-red-400">*</span>
              </label>
              <select
                id="brandTone"
                className="input-field"
                value={formData.brandTone}
                onChange={(e) => handleChange('brandTone', e.target.value)}
                required
              >
                <option value="">Select tone...</option>
                {BRAND_TONES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Key benefit */}
          <div>
            <label className="form-label" htmlFor="keyBenefit">
              Key Benefit / USP <span className="text-red-400">*</span>
            </label>
            <textarea
              id="keyBenefit"
              className="input-field resize-none"
              rows={3}
              placeholder="e.g. Active Noise Cancellation so powerful you can't hear anything except your music, even in busy environments"
              value={formData.keyBenefit}
              onChange={(e) => handleChange('keyBenefit', e.target.value)}
              minLength={10}
              required
            />
          </div>

          {/* Row 3: Post format */}
          <div>
            <label className="form-label" htmlFor="postFormat">
              Post Format <span className="text-red-400">*</span>
            </label>
            <select
              id="postFormat"
              className="input-field"
              value={formData.postFormat}
              onChange={(e) => handleChange('postFormat', e.target.value)}
              required
            >
              <option value="">Select format...</option>
              {POST_FORMATS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Advanced options */}
          <div>
            <button
              type="button"
              onClick={() => setAdvancedOpen((o) => !o)}
              className="flex items-center gap-2 text-sm text-theme-text-40 hover:text-theme-text-70 transition-colors"
            >
              {advancedOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              Advanced Options
              <span className="text-xs text-theme-text-25">(optional)</span>
            </button>

            <div className={`collapsible-content ${advancedOpen ? 'open' : 'closed'}`}>
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="form-label" htmlFor="targetAudience">Target Audience</label>
                  <input
                    id="targetAudience"
                    className="input-field"
                    type="text"
                    placeholder="e.g. Gen Z, urban professionals"
                    value={formData.targetAudience}
                    onChange={(e) => handleChange('targetAudience', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="competitors">Key Competitors</label>
                  <input
                    id="competitors"
                    className="input-field"
                    type="text"
                    placeholder="e.g. Bose, Sony"
                    value={formData.competitors}
                    onChange={(e) => handleChange('competitors', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="campaignType">Campaign Type</label>
                  <select
                    id="campaignType"
                    className="input-field"
                    value={formData.campaignType}
                    onChange={(e) => handleChange('campaignType', e.target.value)}
                  >
                    <option value="">Select type...</option>
                    {CAMPAIGN_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-theme-text-25">
              Generates 6 concepts · ~10–20s
            </p>
            <button
              id="generate-button"
              type="submit"
              className="btn-primary"
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="spinner w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Generate Ad Concepts
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ─── Error ─────────────────────────────────── */}
      {error && (
        <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-red-300 text-sm fade-in-up">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* ─── Loading state ──────────────────────────── */}
      {isLoading && (
        <div className="mt-8 fade-in-up">
          <TypewriterLoader />
          <SkeletonCards />
        </div>
      )}

      {/* ─── Results ───────────────────────────────── */}
      {concepts && !isLoading && (
        <div className="mt-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="section-tag">
              <Sparkles size={11} />
              Results
            </span>
            <p className="text-sm text-theme-text-40">
              {concepts.length} concepts generated using the Goldenberg–Mazursky–Solomon templates
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {concepts.map((concept, i) => (
              <div
                key={concept.templateKey}
                className={`fade-in-up fade-in-up-delay-${i + 1}`}
              >
                <AdConceptCard
                  concept={concept}
                  formData={formData}
                  onRegenerate={handleRegenerate}
                  icon={TEMPLATE_ICONS[concept.templateKey]}
                />
              </div>
            ))}
          </div>

          {/* Citation */}
          <p className="mt-8 text-center text-xs text-theme-text-20">
            Templates based on: Goldenberg, J., Mazursky, D., & Solomon, S. (1999).{' '}
            <em>The fundamental templates of quality ads.</em> Marketing Science, 18(3), 333–351.
          </p>
        </div>
      )}
    </div>
  );
}
