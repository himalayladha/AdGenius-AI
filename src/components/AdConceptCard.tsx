'use client';

import { useState, useCallback } from 'react';
import { RefreshCw, Copy, Check, Eye, EyeOff } from 'lucide-react';
import { AdConcept, AdConceptInput, TEMPLATES } from '@/lib/templates';
import { regenerateSingleConcept } from '@/app/actions';

type Props = {
  concept: AdConcept;
  formData: AdConceptInput;
  onRegenerate: (updated: AdConcept) => void;
  icon: React.ElementType;
};

const TEMPLATE_GRADIENTS: Record<string, string> = {
  pictorial_analogy: 'from-yellow-300 to-amber-500',
  extreme_situation: 'from-amber-400 to-yellow-600',
  consequences: 'from-yellow-500 to-amber-700',
  competition: 'from-amber-300 to-yellow-500',
  interactive_experiment: 'from-yellow-400 to-amber-600',
  dimensionality_alteration: 'from-amber-500 to-yellow-700',
};

const TEMPLATE_BG_GLOW: Record<string, string> = {
  pictorial_analogy: 'rgba(253,224,71,0.05)',
  extreme_situation: 'rgba(245,158,11,0.05)',
  consequences: 'rgba(234,179,8,0.05)',
  competition: 'rgba(252,211,77,0.05)',
  interactive_experiment: 'rgba(250,204,21,0.05)',
  dimensionality_alteration: 'rgba(217,119,6,0.05)',
};

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`btn-ghost text-xs py-1 px-2 ${copied ? 'copy-flash' : ''}`}
      title={`Copy ${label}`}
      aria-label={`Copy ${label}`}
    >
      {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
      {copied ? 'Copied!' : `Copy ${label}`}
    </button>
  );
}

function Section({ title, content, copyLabel }: { title: string; content: string; copyLabel: string }) {
  return (
    <div className="mb-4">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-1.5">{title}</p>
      <p className="text-sm text-white/75 leading-relaxed">{content}</p>
      <div className="mt-2 flex justify-end">
        <CopyButton text={content} label={copyLabel} />
      </div>
    </div>
  );
}

export default function AdConceptCard({ concept, formData, onRegenerate, icon: Icon }: Props) {
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const template = TEMPLATES.find((t) => t.key === concept.templateKey);
  const gradient = TEMPLATE_GRADIENTS[concept.templateKey] ?? 'from-violet-500 to-purple-700';
  const bgGlow = TEMPLATE_BG_GLOW[concept.templateKey] ?? 'rgba(139,92,246,0.08)';

  const handleRegenerate = useCallback(async () => {
    setIsRegenerating(true);
    try {
      const updated = await regenerateSingleConcept(concept.templateKey, formData);
      onRegenerate(updated);
    } catch (err) {
      console.error('Regeneration failed:', err);
    } finally {
      setIsRegenerating(false);
    }
  }, [concept.templateKey, formData, onRegenerate]);

  const fullText = [
    `Template: ${concept.templateName}`,
    ``,
    `Concept: ${concept.conceptIdea}`,
    ``,
    `Visual Hook: ${concept.visualHook}`,
    ``,
    `Copy Hook: ${concept.copyHook}`,
    ``,
    `Call to Action: ${concept.callToAction}`,
  ].join('\n');

  return (
    <div
      className="concept-card h-full flex flex-col"
      style={{ background: `linear-gradient(145deg, ${bgGlow}, rgba(255,255,255,0.015))` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
            <Icon size={18} className="text-black font-semibold" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Template</p>
            <h3 className="text-sm font-bold text-white leading-tight font-[var(--font-space-grotesk)]">
              {concept.templateName}
            </h3>
          </div>
        </div>
        <button
          onClick={() => setShowDescription((s) => !s)}
          className="btn-ghost py-1 px-2 flex-shrink-0 tooltip"
          aria-label="Show template description"
        >
          {showDescription ? <EyeOff size={12} /> : <Eye size={12} />}
          <span className="tooltip-content">
            {showDescription ? 'Hide template info' : 'Show template info'}
          </span>
        </button>
      </div>

      {/* Template description (toggleable) */}
      {showDescription && template && (
        <div className="mb-4 p-3 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-white/50 leading-relaxed fade-in-up">
          {template.shortDescription}
        </div>
      )}

      <div className="divider" />

      {/* Concept idea */}
      <Section title="💡 Concept Idea" content={concept.conceptIdea} copyLabel="concept" />

      <div className="divider" />

      {/* Visual Hook */}
      <Section title="🎨 Visual Hook" content={concept.visualHook} copyLabel="visual hook" />

      <div className="divider" />

      {/* Copy Hook */}
      <Section title="✍️ Copy Hook" content={concept.copyHook} copyLabel="copy" />

      {/* CTA */}
      {concept.callToAction && (
        <>
          <div className="divider" />
          <div className="mb-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-1.5">📣 Call to Action</p>
            <p className="text-sm font-semibold text-white/90">{concept.callToAction}</p>
          </div>
        </>
      )}

      {/* Footer actions */}
      <div className="mt-auto pt-4 flex items-center justify-between">
        <CopyButton text={fullText} label="all" />
        <button
          onClick={handleRegenerate}
          disabled={isRegenerating}
          className="btn-ghost"
          aria-label="Regenerate this concept"
          id={`regenerate-${concept.templateKey}`}
        >
          <RefreshCw
            size={12}
            className={isRegenerating ? 'spinner' : 'transition-transform group-hover:rotate-180'}
          />
          {isRegenerating ? 'Regenerating...' : 'Regenerate'}
        </button>
      </div>
    </div>
  );
}
