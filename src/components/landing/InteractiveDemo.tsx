'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import {
  Code2,
  Copy,
  Globe,
  Layout,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
} from 'lucide-react';

export function InteractiveDemo() {
  const { createNewChat, theme } = useApp();
  const [selectedDemo, setSelectedDemo] = useState<'coding' | 'citations' | 'rag'>('coding');

  const demos = {
    coding: {
      prompt: 'Write a modern React rate-limiter with token bucket algorithm',
      response: `// Zenix DeepSeek Engine v2
export class DistributedRateLimiter {
  private capacity: number;
  private fillRate: number;
  private tokens: number;
  private lastRefill: number;

  constructor(capacity = 100, fillRatePerSec = 20) {
    this.capacity = capacity;
    this.fillRate = fillRatePerSec;
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }

  public allowRequest(tokensRequested = 1): boolean {
    this.refill();
    if (this.tokens >= tokensRequested) {
      this.tokens -= tokensRequested;
      return true;
    }
    return false;
  }

  private refill(): void {
    const now = Date.now();
    const elapsedSec = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.capacity, this.tokens + elapsedSec * this.fillRate);
    this.lastRefill = now;
  }
}`,
      language: 'typescript',
      badge: 'DeepSeek Coder V2 (90.2% HumanEval)',
    },
    citations: {
      prompt: 'Summarize latest frontier AI breakthroughs and efficiency curves',
      response: `### 🔍 Verified Multi-Source Research Breakdown
1. **Model Distillation:** Frontier open-weight architectures (Llama 3 & DeepSeek) show 8.2x lower latency per token [1].
2. **Hybrid Retrieval:** Multi-modal RAG paired with cross-encoder rerankers reduces hallucination rates by up to 42% [2].

---
*Sources:*
[1] Anthropic Research: Scalable Inference & Alignment (2024)
[2] Meta AI: Dense-Sparse Vector Topologies in Enterprise Pipelines (2024)`,
      language: 'markdown',
      badge: 'Perplexity Web Retrieval Engine',
    },
    rag: {
      prompt: 'Search Zenix Architecture vector index for sub-10ms latency specs',
      response: `[Cosine Similarity: 98.4% Match with "Zenix Architecture Whitepaper"]
> "Vector embedding pipeline indexes 1024-dimensional semantic arrays via HNSW graph partitioning, enabling high-concurrency vector lookups in 4.2ms."

Recommendation: Ingest PDF or Markdown documents directly into Zenix RAG store for automated semantic indexing.`,
      language: 'markdown',
      badge: 'bge-large-en Vector Store',
    },
  };

  const current = demos[selectedDemo];

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-semibold mb-3 ${
          theme === 'light'
            ? 'border-amber-300/80 bg-amber-100 text-amber-900 shadow-sm'
            : 'border-zinc-800 bg-zinc-950 text-zinc-300 shadow-black'
        }`}>
          <Terminal className={`h-3.5 w-3.5 ${theme === 'light' ? 'text-amber-600' : 'text-zinc-400'}`} />
          <span>Interactive Capabilities Sandbox</span>
        </div>
        <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
          theme === 'light' ? 'text-stone-900' : 'text-white'
        }`}>
          Experience the Multi-Model Advantage
        </h2>
        <p className={`text-xs sm:text-sm max-w-xl mx-auto mt-2 ${
          theme === 'light' ? 'text-stone-600' : 'text-zinc-400'
        }`}>
          Toggle between code generation, web citations, and vector RAG retrieval in real-time.
        </p>
      </div>

      <div className={`rounded-3xl border shadow-2xl overflow-hidden transition-colors ${
        theme === 'light'
          ? 'border-amber-200/80 bg-white shadow-amber-500/5'
          : 'border-zinc-800 bg-zinc-950 shadow-black'
      }`}>
        {/* Top Control Bar */}
        <div className={`flex flex-wrap items-center justify-between border-b px-6 py-4 gap-3 ${
          theme === 'light'
            ? 'border-amber-200/80 bg-amber-50/60'
            : 'border-zinc-800 bg-black/70'
        }`}>
          {/* Mode Switcher */}
          <div className={`flex items-center gap-1.5 p-1 rounded-xl border ${
            theme === 'light'
              ? 'bg-white border-amber-200/80'
              : 'bg-zinc-950 border-zinc-800'
          }`}>
            <button
              onClick={() => setSelectedDemo('coding')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedDemo === 'coding'
                  ? theme === 'light'
                    ? 'gold-gradient text-white shadow-sm'
                    : 'bg-white text-black font-bold shadow-sm'
                  : theme === 'light'
                    ? 'text-stone-600 hover:text-stone-900'
                    : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>Coding Assistant</span>
            </button>
            <button
              onClick={() => setSelectedDemo('citations')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedDemo === 'citations'
                  ? theme === 'light'
                    ? 'gold-gradient text-white shadow-sm'
                    : 'bg-white text-black font-bold shadow-sm'
                  : theme === 'light'
                    ? 'text-stone-600 hover:text-stone-900'
                    : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Globe className="h-3.5 w-3.5" />
              <span>Web Citations</span>
            </button>
            <button
              onClick={() => setSelectedDemo('rag')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedDemo === 'rag'
                  ? theme === 'light'
                    ? 'gold-gradient text-white shadow-sm'
                    : 'bg-white text-black font-bold shadow-sm'
                  : theme === 'light'
                    ? 'text-stone-600 hover:text-stone-900'
                    : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>RAG Knowledge</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className={`rounded-full border px-3 py-1 text-[11px] font-mono font-bold ${
              theme === 'light'
                ? 'bg-amber-100 border-amber-300 text-amber-900'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300'
            }`}>
              {current.badge}
            </span>
            <button
              onClick={() => createNewChat(current.prompt)}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-xs font-bold transition-all shadow-md active:scale-95 ${
                theme === 'light'
                  ? 'gold-gradient text-white shadow-amber-500/20 hover:brightness-105'
                  : 'bg-white hover:bg-zinc-200 text-black shadow-zinc-900/50'
              }`}
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Run in Full Workspace</span>
            </button>
          </div>
        </div>

        {/* User Prompt Bar */}
        <div className={`px-6 py-3 border-b text-xs font-mono flex items-center gap-2 ${
          theme === 'light'
            ? 'border-amber-200/80 bg-stone-50 text-stone-700'
            : 'border-zinc-800 bg-zinc-950 text-zinc-400'
        }`}>
          <span className={`font-bold ${theme === 'light' ? 'text-amber-800' : 'text-zinc-200'}`}>$ prompt:</span>
          <span>"{current.prompt}"</span>
        </div>

        {/* Output Area */}
        <div className={`p-6 font-mono text-xs overflow-x-auto min-h-[220px] ${
          theme === 'light'
            ? 'bg-white text-stone-800'
            : 'bg-black text-zinc-200'
        }`}>
          <pre className={`whitespace-pre-wrap leading-relaxed font-mono ${
            theme === 'light' ? 'text-amber-950/90' : 'text-zinc-300'
          }`}>
            {current.response}
          </pre>
        </div>
      </div>
    </section>
  );
}
