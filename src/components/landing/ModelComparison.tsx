'use client';

import React from 'react';
import { AI_MODELS } from '@/lib/constants';
import { Check, Cpu, Sparkles, Zap } from 'lucide-react';
import { useApp } from '@/lib/store';

export function ModelComparison() {
  const { createNewChat, theme } = useApp();

  return (
    <section className="py-24 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-semibold mb-3 ${
          theme === 'light'
            ? 'border-amber-300/80 bg-amber-100 text-amber-900 shadow-sm'
            : 'border-zinc-800 bg-zinc-950 text-zinc-300 shadow-black'
        }`}>
          <Cpu className={`h-3.5 w-3.5 ${theme === 'light' ? 'text-amber-600' : 'text-zinc-400'}`} />
          <span>Frontier Multi-Model Suite</span>
        </div>
        <h2 className={`text-3xl sm:text-5xl font-black tracking-tight ${
          theme === 'light' ? 'text-stone-900' : 'text-white'
        }`}>
          Benchmark & Performance Matrix
        </h2>
        <p className={`text-xs sm:text-sm max-w-xl mx-auto mt-3 ${
          theme === 'light' ? 'text-stone-600' : 'text-zinc-400'
        }`}>
          Seamlessly switch between top frontier open-weights and proprietary models based on your exact workload.
        </p>
      </div>

      <div className={`overflow-x-auto rounded-3xl border p-4 shadow-2xl transition-colors ${
        theme === 'light'
          ? 'border-amber-200/80 bg-white shadow-amber-500/5'
          : 'border-zinc-800 bg-zinc-950 shadow-black'
      }`}>
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className={`border-b text-xs font-bold uppercase tracking-wider ${
              theme === 'light' ? 'border-amber-200 text-stone-500' : 'border-zinc-800 text-zinc-400'
            }`}>
              <th className="p-4">Model Engine</th>
              <th className="p-4">Provider</th>
              <th className="p-4">Context Window</th>
              <th className="p-4">Throughput</th>
              <th className="p-4">Reasoning</th>
              <th className="p-4">Coding Score</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className={`divide-y font-medium ${
            theme === 'light' ? 'divide-amber-100' : 'divide-zinc-900'
          }`}>
            {AI_MODELS.map((m) => (
              <tr key={m.id} className={`transition-colors ${
                theme === 'light' ? 'hover:bg-amber-50/70' : 'hover:bg-zinc-900/60'
              }`}>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-xl border font-bold text-xs ${
                      theme === 'light'
                        ? 'bg-amber-100 border-amber-300/80 text-amber-900'
                        : 'bg-zinc-900 border-zinc-800 text-white'
                    }`}>
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <span className={`font-bold block ${theme === 'light' ? 'text-stone-900' : 'text-white'}`}>{m.name}</span>
                      <span className={`text-[11px] ${theme === 'light' ? 'text-stone-500' : 'text-zinc-500'}`}>{m.badge}</span>
                    </div>
                  </div>
                </td>
                <td className={`p-4 font-mono ${theme === 'light' ? 'text-stone-600' : 'text-zinc-400'}`}>{m.provider}</td>
                <td className={`p-4 font-mono font-bold ${theme === 'light' ? 'text-amber-800' : 'text-emerald-400'}`}>{m.contextWindow}</td>
                <td className={`p-4 font-mono ${theme === 'light' ? 'text-stone-600' : 'text-zinc-400'}`}>{m.speed}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className={`h-1.5 w-16 rounded-full overflow-hidden ${
                      theme === 'light' ? 'bg-stone-200' : 'bg-zinc-800'
                    }`}>
                      <div
                        className={`h-full rounded-full ${theme === 'light' ? 'gold-gradient' : 'bg-white'}`}
                        style={{ width: `${m.reasoningScore}%` }}
                      />
                    </div>
                    <span className={`font-mono ${theme === 'light' ? 'text-stone-700' : 'text-zinc-300'}`}>{m.reasoningScore}%</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className={`h-1.5 w-16 rounded-full overflow-hidden ${
                      theme === 'light' ? 'bg-stone-200' : 'bg-zinc-800'
                    }`}>
                      <div
                        className={`h-full rounded-full ${theme === 'light' ? 'gold-gradient' : 'bg-zinc-300'}`}
                        style={{ width: `${m.codingScore}%` }}
                      />
                    </div>
                    <span className={`font-mono ${theme === 'light' ? 'text-stone-700' : 'text-zinc-300'}`}>{m.codingScore}%</span>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => createNewChat(`Test code and reasoning benchmark with ${m.name}`)}
                    className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition-all active:scale-95 shadow-sm ${
                      theme === 'light'
                        ? 'border-amber-300/80 bg-amber-50 text-amber-900 hover:bg-amber-100 hover:border-amber-400'
                        : 'border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-white'
                    }`}
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
