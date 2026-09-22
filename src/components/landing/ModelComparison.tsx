'use client';

import React from 'react';
import { AI_MODELS } from '@/lib/constants';
import { Check, Cpu, Sparkles, Zap } from 'lucide-react';
import { useApp } from '@/lib/store';

export function ModelComparison() {
  const { createNewChat } = useApp();

  return (
    <section className="py-24 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/30 px-4 py-1 text-xs font-semibold text-cyan-300 mb-3">
          <Cpu className="h-3.5 w-3.5" />
          <span>Frontier Multi-Model Suite</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Benchmark & Performance Matrix
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-3">
          Seamlessly switch between top frontier open-weights and proprietary models based on your exact workload.
        </p>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/60 p-4 shadow-2xl glass-card">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
              <th className="p-4">Model Engine</th>
              <th className="p-4">Provider</th>
              <th className="p-4">Context Window</th>
              <th className="p-4">Throughput</th>
              <th className="p-4">Reasoning</th>
              <th className="p-4">Coding Score</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {AI_MODELS.map((m) => (
              <tr key={m.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-xs">
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-bold text-white block">{m.name}</span>
                      <span className="text-[11px] text-slate-400">{m.badge}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-slate-300 font-mono">{m.provider}</td>
                <td className="p-4 font-mono text-emerald-400 font-bold">{m.contextWindow}</td>
                <td className="p-4 font-mono text-slate-300">{m.speed}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${m.reasoningScore}%` }}
                      />
                    </div>
                    <span className="font-mono text-slate-200">{m.reasoningScore}%</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${m.codingScore}%` }}
                      />
                    </div>
                    <span className="font-mono text-emerald-300">{m.codingScore}%</span>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => createNewChat(undefined, undefined, m.id)}
                    className="rounded-xl bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-600 transition-colors shadow-sm"
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
