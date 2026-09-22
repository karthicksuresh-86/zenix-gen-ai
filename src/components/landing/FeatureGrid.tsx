'use client';

import React from 'react';
import {
  BrainCircuit,
  Code2,
  Cpu,
  Database,
  Eye,
  FileText,
  Globe,
  Layout,
  Mic,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';

export function FeatureGrid() {
  const features = [
    {
      icon: Layout,
      title: 'Claude-Style Clean UI & Artifacts',
      badge: 'Interactive Sandbox',
      description:
        'Live side-by-side execution for HTML, React components, SVGs, and data visualizers with complete iframe isolation and single-click copy.',
      color: 'from-blue-500 to-indigo-600',
      border: 'hover:border-blue-500/40',
    },
    {
      icon: Code2,
      title: 'DeepSeek-Style Coding Mastery',
      badge: '338 Languages',
      description:
        'Full-stack code generation, debugging, AST transformations, SQL query optimization, and automated unit test mocks with edge-case detection.',
      color: 'from-emerald-500 to-teal-600',
      border: 'hover:border-emerald-500/40',
    },
    {
      icon: Globe,
      title: 'Perplexity-Style Web Citations',
      badge: 'Verified Truth',
      description:
        'Real-time multi-source web synthesis with interactive citation pills, domain favicons, publish dates, and instant hover source previews.',
      color: 'from-purple-500 to-pink-600',
      border: 'hover:border-purple-500/40',
    },
    {
      icon: Database,
      title: 'Enterprise Vector RAG System',
      badge: 'bge-large-en',
      description:
        'Ingest PDFs, technical manuals, and whitepapers into dense 1024-dimensional semantic stores for sub-10ms similarity searches.',
      color: 'from-cyan-500 to-blue-600',
      border: 'hover:border-cyan-500/40',
    },
    {
      icon: Eye,
      title: 'Gemini-Style Multimodal & Vision',
      badge: 'OCR & Vision',
      description:
        'Upload screenshots, architectural charts, and scanned documents for instant OCR extraction, diagram breakdown, and layout analysis.',
      color: 'from-amber-500 to-orange-600',
      border: 'hover:border-amber-500/40',
    },
    {
      icon: Mic,
      title: 'Neural Voice Assistant',
      badge: 'Full Duplex',
      description:
        'Natural speech-to-text recognition and text-to-speech voice playback with animated glowing 3D-like audio waveform visualizers.',
      color: 'from-rose-500 to-pink-600',
      border: 'hover:border-rose-500/40',
    },
  ];

  return (
    <section id="features" className="py-24 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/30 px-4 py-1 text-xs font-semibold text-blue-300 mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Complete Feature Matrix</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Everything You Need in One Assistant
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto mt-3">
          Engineered for developers, researchers, marketers, designers, and high-velocity teams.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, idx) => {
          const Icon = f.icon;
          return (
            <div
              key={idx}
              className={`group relative flex flex-col justify-between rounded-3xl border border-slate-800/80 bg-slate-900/60 p-7 glass-card transition-all duration-300 hover:scale-[1.02] ${f.border}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr ${f.color} text-white shadow-lg`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-slate-800/90 border border-slate-700/80 px-3 py-1 text-[10px] font-mono font-semibold text-slate-300">
                    {f.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {f.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {f.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-1 text-[11px] font-semibold text-blue-400 group-hover:text-blue-300">
                <span>Enterprise Ready</span>
                <span>• Sub-120ms Latency</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
