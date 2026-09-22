import React from 'react';
import { useApp } from '@/lib/store';
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
  const { theme } = useApp();

  const features = [
    {
      icon: Layout,
      title: 'Claude-Style Clean UI & Artifacts',
      badge: 'Interactive Sandbox',
      description:
        'Live side-by-side execution for HTML, React components, SVGs, and data visualizers with complete iframe isolation and single-click copy.',
      color: theme === 'light' ? 'from-amber-500 to-amber-600' : 'from-zinc-700 to-zinc-900',
      border: theme === 'light' ? 'hover:border-amber-400/80' : 'hover:border-zinc-700',
    },
    {
      icon: Code2,
      title: 'DeepSeek-Style Coding Mastery',
      badge: '338 Languages',
      description:
        'Full-stack code generation, debugging, AST transformations, SQL query optimization, and automated unit test mocks with edge-case detection.',
      color: theme === 'light' ? 'from-amber-600 to-yellow-600' : 'from-zinc-800 to-zinc-950',
      border: theme === 'light' ? 'hover:border-amber-400/80' : 'hover:border-zinc-700',
    },
    {
      icon: Globe,
      title: 'Perplexity-Style Web Citations',
      badge: 'Verified Truth',
      description:
        'Real-time multi-source web synthesis with interactive citation pills, domain favicons, publish dates, and instant hover source previews.',
      color: theme === 'light' ? 'from-amber-500 to-amber-700' : 'from-zinc-700 to-zinc-900',
      border: theme === 'light' ? 'hover:border-amber-400/80' : 'hover:border-zinc-700',
    },
    {
      icon: Database,
      title: 'Enterprise Vector RAG System',
      badge: 'bge-large-en',
      description:
        'Ingest PDFs, technical manuals, and whitepapers into dense 1024-dimensional semantic stores for sub-10ms similarity searches.',
      color: theme === 'light' ? 'from-yellow-600 to-amber-600' : 'from-zinc-800 to-zinc-950',
      border: theme === 'light' ? 'hover:border-amber-400/80' : 'hover:border-zinc-700',
    },
    {
      icon: Eye,
      title: 'Gemini-Style Multimodal & Vision',
      badge: 'OCR & Vision',
      description:
        'Upload screenshots, architectural charts, and scanned documents for instant OCR extraction, diagram breakdown, and layout analysis.',
      color: theme === 'light' ? 'from-amber-500 to-orange-500' : 'from-zinc-700 to-zinc-900',
      border: theme === 'light' ? 'hover:border-amber-400/80' : 'hover:border-zinc-700',
    },
    {
      icon: Mic,
      title: 'Neural Voice Assistant',
      badge: 'Full Duplex',
      description:
        'Natural speech-to-text recognition and text-to-speech voice playback with animated glowing 3D-like audio waveform visualizers.',
      color: theme === 'light' ? 'from-amber-600 to-amber-800' : 'from-zinc-800 to-zinc-950',
      border: theme === 'light' ? 'hover:border-amber-400/80' : 'hover:border-zinc-700',
    },
  ];

  return (
    <section id="features" className="py-24 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-semibold mb-3 ${
          theme === 'light'
            ? 'border-amber-300/80 bg-amber-100 text-amber-900 shadow-sm'
            : 'border-zinc-800 bg-zinc-950 text-zinc-300 shadow-black'
        }`}>
          <Sparkles className={`h-3.5 w-3.5 ${theme === 'light' ? 'text-amber-600' : 'text-zinc-400'}`} />
          <span>Complete Feature Matrix</span>
        </div>
        <h2 className={`text-3xl sm:text-5xl font-black tracking-tight ${
          theme === 'light' ? 'text-stone-900' : 'text-white'
        }`}>
          Everything You Need in One Assistant
        </h2>
        <p className={`text-xs sm:text-sm max-w-2xl mx-auto mt-3 ${
          theme === 'light' ? 'text-stone-600' : 'text-zinc-400'
        }`}>
          Engineered for developers, researchers, marketers, designers, and high-velocity teams.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, idx) => {
          const Icon = f.icon;
          return (
            <div
              key={idx}
              className={`group relative flex flex-col justify-between rounded-3xl border p-7 transition-all duration-300 hover:scale-[1.02] ${f.border} ${
                theme === 'light'
                  ? 'bg-white border-amber-200/80 shadow-md shadow-amber-500/5 hover:shadow-lg hover:shadow-amber-500/10'
                  : 'bg-zinc-950 border-zinc-900 shadow-black hover:border-zinc-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr ${f.color} text-white shadow-md border ${
                      theme === 'light' ? 'border-amber-300/40' : 'border-zinc-700'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-[10px] font-mono font-semibold ${
                    theme === 'light'
                      ? 'bg-amber-50 border-amber-200 text-amber-900'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                  }`}>
                    {f.badge}
                  </span>
                </div>

                <h3 className={`text-lg font-bold mb-2 transition-colors ${
                  theme === 'light'
                    ? 'text-stone-900 group-hover:text-amber-800'
                    : 'text-white group-hover:text-zinc-200'
                }`}>
                  {f.title}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  theme === 'light' ? 'text-stone-600' : 'text-zinc-400'
                }`}>
                  {f.description}
                </p>
              </div>

              <div className={`mt-6 pt-4 border-t flex items-center gap-1 text-[11px] font-semibold ${
                theme === 'light'
                  ? 'border-amber-100 text-amber-800 group-hover:text-amber-900'
                  : 'border-zinc-900 text-zinc-400 group-hover:text-zinc-300'
              }`}>
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
