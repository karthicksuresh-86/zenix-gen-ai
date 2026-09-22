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
  const { createNewChat } = useApp();
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
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/30 px-4 py-1 text-xs font-semibold text-purple-300 mb-3">
          <Terminal className="h-3.5 w-3.5" />
          <span>Interactive Capabilities Sandbox</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Experience the Multi-Model Advantage
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2">
          Toggle between code generation, web citations, and vector RAG retrieval in real-time.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl overflow-hidden glass-card">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800/80 px-6 py-4 bg-slate-900/60 gap-3">
          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800/60">
            <button
              onClick={() => setSelectedDemo('coding')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedDemo === 'coding'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>Coding Assistant</span>
            </button>
            <button
              onClick={() => setSelectedDemo('citations')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedDemo === 'citations'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="h-3.5 w-3.5" />
              <span>Web Citations</span>
            </button>
            <button
              onClick={() => setSelectedDemo('rag')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedDemo === 'rag'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>RAG Knowledge</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-slate-800 border border-slate-700 px-3 py-1 text-[11px] font-mono text-emerald-400">
              {current.badge}
            </span>
            <button
              onClick={() => createNewChat(current.prompt)}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1.5 text-xs font-semibold text-white hover:from-blue-500 hover:to-indigo-500 transition-all shadow-md shadow-blue-500/20"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Run in Full Workspace</span>
            </button>
          </div>
        </div>

        {/* User Prompt Bar */}
        <div className="px-6 py-3 border-b border-slate-800/80 bg-slate-900/30 text-xs font-mono text-slate-300 flex items-center gap-2">
          <span className="text-blue-400 font-bold">$ prompt:</span>
          <span>"{current.prompt}"</span>
        </div>

        {/* Output Area */}
        <div className="p-6 bg-[#07090e] font-mono text-xs text-slate-200 overflow-x-auto min-h-[220px]">
          <pre className="whitespace-pre-wrap leading-relaxed text-blue-200/90 font-mono">
            {current.response}
          </pre>
        </div>
      </div>
    </section>
  );
}
