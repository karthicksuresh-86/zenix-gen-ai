'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Check, ChevronDown, ChevronUp, HelpCircle, Shield, Sparkles, Zap } from 'lucide-react';

export function PricingAndFAQ() {
  const { setCurrentView, setActiveModal, theme } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const plans = [
    {
      name: 'Free Starter',
      price: '$0',
      period: 'forever',
      description: 'Ideal for experimenting with multi-model conversations and coding assistance.',
      features: [
        'Unlimited chat sessions',
        'Standard models (Llama 3, Mistral)',
        'Basic web search citations',
        'Artifacts live preview sandbox',
        '100K monthly token pool',
      ],
      cta: 'Start Free',
      popular: false,
    },
    {
      name: 'Zenix Pro',
      price: '$20',
      period: 'per month',
      description: 'Engineered for developers, creators, and power researchers requiring unlimited depth.',
      features: [
        'Flagship models (Claude 3.5, DeepSeek Coder V2, Qwen 2.5)',
        'Unlimited live web search citations',
        'Enterprise Vector RAG upload (PDF/DOCX/TXT)',
        'Full-duplex Neural Voice mode',
        'Long-term Memory Vault active sync',
        '1,000,000 monthly tokens + BYOK option',
      ],
      cta: 'Upgrade to Pro',
      popular: true,
    },
    {
      name: 'Enterprise Tier',
      price: '$89',
      period: 'per seat / month',
      description: 'Custom self-hosted vector databases, team workspace sharing, and SLA telemetry.',
      features: [
        'Dedicated GPU cluster endpoint',
        'Custom fine-tuned system prompts',
        'Unlimited knowledge base vector storage',
        'Role-based access & SOC2 compliance',
        '24/7 dedicated support engineer',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  const faqs = [
    {
      q: 'How does Zenix AI combine Claude, DeepSeek, and Perplexity capabilities?',
      a: 'Zenix AI operates on a multi-model cognitive router. It pairs Claude-style clean workspace and Artifact execution with DeepSeek-optimized code generation, and grounds real-time answers using Perplexity-style multi-source web retrieval with exact numbered citations.',
    },
    {
      q: 'What is the RAG Knowledge System and how do I use it?',
      a: 'Zenix RAG (Retrieval-Augmented Generation) converts your documents (PDF, DOCX, TXT, CSV) into 1024-dimensional vector embeddings using bge-large-en. When you ask questions, Zenix extracts the most relevant semantic chunks in sub-10ms and injects them into the model context.',
    },
    {
      q: 'Can I bring my own API keys (BYOK)?',
      a: 'Yes! You can configure your custom Anthropic, OpenAI, or Groq API keys in the Account & Preferences modal. Keys are encrypted and stored locally in your browser sandbox.',
    },
    {
      q: 'How does the Artifacts live preview sandbox work?',
      a: 'When Zenix generates an interactive HTML website, React component, or SVG graphic, it automatically opens the Claude-style side panel. Code executes within an isolated iframe sandbox with zero security risk to your main session.',
    },
  ];

  return (
    <section className="py-24 px-4 max-w-6xl mx-auto">
      {/* Pricing Section */}
      <div className="text-center mb-16">
        <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-semibold mb-3 ${
          theme === 'light'
            ? 'border-amber-300/80 bg-amber-100 text-amber-900 shadow-sm'
            : 'border-zinc-800 bg-zinc-950 text-zinc-300 shadow-black'
        }`}>
          <Zap className={`h-3.5 w-3.5 ${theme === 'light' ? 'text-amber-600' : 'text-zinc-400'}`} />
          <span>Transparent Pricing</span>
        </div>
        <h2 className={`text-3xl sm:text-5xl font-black tracking-tight ${
          theme === 'light' ? 'text-stone-900' : 'text-white'
        }`}>
          Choose Your Intelligence Tier
        </h2>
        <p className={`text-xs sm:text-sm max-w-xl mx-auto mt-3 ${
          theme === 'light' ? 'text-stone-600' : 'text-zinc-400'
        }`}>
          Transparent, predictable pricing with zero hidden fees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-28">
        {plans.map((p, idx) => (
          <div
            key={idx}
            className={`relative flex flex-col justify-between rounded-3xl p-8 border transition-all duration-300 ${
              p.popular
                ? theme === 'light'
                  ? 'border-amber-400 bg-white shadow-xl shadow-amber-500/10 scale-105 z-10'
                  : 'border-zinc-600 bg-zinc-950 shadow-2xl shadow-black scale-105 z-10'
                : theme === 'light'
                  ? 'border-amber-200/80 bg-white/80 shadow-md'
                  : 'border-zinc-900 bg-zinc-950'
            }`}
          >
            {p.popular && (
              <span className={`absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold shadow-md ${
                theme === 'light'
                  ? 'gold-gradient text-white shadow-amber-500/20'
                  : 'bg-white text-black shadow-zinc-800'
              }`}>
                MOST POPULAR
              </span>
            )}

            <div>
              <h3 className={`text-lg font-bold mb-1 ${theme === 'light' ? 'text-stone-900' : 'text-white'}`}>{p.name}</h3>
              <p className={`text-xs mb-6 leading-relaxed ${theme === 'light' ? 'text-stone-600' : 'text-zinc-400'}`}>{p.description}</p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className={`text-4xl font-black tracking-tight ${theme === 'light' ? 'text-stone-900' : 'text-white'}`}>{p.price}</span>
                <span className={`text-xs font-medium ${theme === 'light' ? 'text-stone-500' : 'text-zinc-500'}`}>/{p.period}</span>
              </div>

              <div className="space-y-3 mb-8">
                {p.features.map((feat, fIdx) => (
                  <div key={fIdx} className={`flex items-start gap-2.5 text-xs ${
                    theme === 'light' ? 'text-stone-700' : 'text-zinc-300'
                  }`}>
                    <Check className={`h-4 w-4 shrink-0 mt-0.5 ${theme === 'light' ? 'text-amber-600' : 'text-emerald-400'}`} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                if (p.popular) {
                  setActiveModal('auth');
                } else {
                  setCurrentView('chat');
                }
              }}
              className={`w-full py-3 rounded-2xl text-xs font-bold transition-all shadow-md active:scale-95 ${
                p.popular
                  ? theme === 'light'
                    ? 'gold-gradient text-white shadow-amber-500/20 hover:brightness-105'
                    : 'bg-white hover:bg-zinc-200 text-black shadow-zinc-900/50'
                  : theme === 'light'
                    ? 'bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800'
              }`}
            >
              {p.cta}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-semibold mb-3 ${
            theme === 'light'
              ? 'border-amber-300/80 bg-amber-100 text-amber-900 shadow-sm'
              : 'border-zinc-800 bg-zinc-950 text-zinc-300 shadow-black'
          }`}>
            <HelpCircle className={`h-3.5 w-3.5 ${theme === 'light' ? 'text-amber-600' : 'text-zinc-400'}`} />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${
            theme === 'light' ? 'text-stone-900' : 'text-white'
          }`}>
            Everything You Need to Know
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border overflow-hidden transition-all ${
                  theme === 'light'
                    ? 'border-amber-200/80 bg-white shadow-sm'
                    : 'border-zinc-900 bg-zinc-950 shadow-black'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className={`flex items-center justify-between w-full p-5 text-left text-sm font-bold transition-colors ${
                    theme === 'light'
                      ? 'text-stone-900 hover:text-amber-800'
                      : 'text-white hover:text-zinc-300'
                  }`}
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className={`h-4 w-4 shrink-0 ${theme === 'light' ? 'text-amber-600' : 'text-zinc-300'}`} />
                  ) : (
                    <ChevronDown className={`h-4 w-4 shrink-0 ${theme === 'light' ? 'text-stone-400' : 'text-zinc-600'}`} />
                  )}
                </button>
                {isOpen && (
                  <div className={`px-5 pb-5 text-xs sm:text-sm leading-relaxed border-t pt-3 ${
                    theme === 'light'
                      ? 'border-amber-100 text-stone-600'
                      : 'border-zinc-900 text-zinc-400'
                  }`}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
