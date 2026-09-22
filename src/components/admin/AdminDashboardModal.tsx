'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import {
  Activity,
  BarChart3,
  CheckCircle2,
  Cpu,
  DollarSign,
  Layers,
  Lock,
  Server,
  Shield,
  Sparkles,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { AI_MODELS } from '@/lib/constants';

export function AdminDashboardModal() {
  const { activeModal, setActiveModal, userProfile } = useApp();
  const [activeTab, setActiveTab] = useState<'analytics' | 'models' | 'system'>('analytics');
  const [systemPrompt, setSystemPrompt] = useState(
    'You are Zenix AI, an elite autonomous AI assistant built with multi-model intelligence, low-latency streaming token delivery, and grounded truth citations.'
  );
  const [savedPrompt, setSavedPrompt] = useState(false);

  const isOpen = activeModal === 'admin';
  if (!isOpen) return null;

  const handleSaveSystemPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedPrompt(true);
    setTimeout(() => setSavedPrompt(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-2xl p-4 animate-in fade-in duration-200">
      <div className="relative flex flex-col w-full max-w-5xl h-[720px] rounded-3xl border border-slate-800 bg-[#0a0e17] shadow-2xl glass-card overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Zenix Admin & Telemetry Console
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-300 border border-emerald-500/30">
                  Cluster Health: 99.98%
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Live monitoring, token consumption, inference cost curves, and cluster orchestration.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-950/60 px-6 py-2">
          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800/60">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'analytics'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Telemetry & Usage
            </button>
            <button
              onClick={() => setActiveTab('models')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'models'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Model Endpoints & Health
            </button>
            <button
              onClick={() => setActiveTab('system')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'system'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Global System Prompts
            </button>
          </div>

          <span className="text-xs text-slate-400 font-mono">
            Node: us-east-4a (AWS + GCP Cluster)
          </span>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Metric Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                    <span>Active Users (DAU)</span>
                    <Users className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-black text-white">48,290</div>
                  <div className="text-[11px] text-emerald-400 mt-1 font-medium">↑ +14.2% this week</div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                    <span>AI Requests Today</span>
                    <Zap className="h-4 w-4 text-yellow-400" />
                  </div>
                  <div className="text-2xl font-black text-white">1,842,910</div>
                  <div className="text-[11px] text-emerald-400 mt-1 font-medium">↑ +8.7% avg load</div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                    <span>Tokens Processed</span>
                    <Cpu className="h-4 w-4 text-purple-400" />
                  </div>
                  <div className="text-2xl font-black text-white">348.6M</div>
                  <div className="text-[11px] text-slate-400 mt-1 font-medium">78 t/s avg throughput</div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                    <span>Inference Cost Today</span>
                    <DollarSign className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-white">$142.80</div>
                  <div className="text-[11px] text-emerald-400 mt-1 font-medium">↓ -32% with caching</div>
                </div>
              </div>

              {/* Chart Visualizer */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-indigo-400" />
                    Hourly Request Throughput & P99 Latency
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">Last 24 Hours</span>
                </div>

                <div className="h-40 flex items-end gap-2 pt-6">
                  {[35, 42, 60, 85, 95, 78, 92, 100, 88, 70, 65, 82, 90, 75, 80, 96, 68, 74, 89, 94, 76, 85, 91, 88].map(
                    (val, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                        <div
                          className="w-full rounded-t bg-gradient-to-t from-indigo-600 to-purple-400 hover:from-indigo-500 hover:to-cyan-400 transition-all cursor-pointer relative"
                          style={{ height: `${val}%` }}
                        >
                          <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded text-[9px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {val * 120} reqs • {Math.round(40 - val * 0.2)}ms
                          </div>
                        </div>
                        <span className="text-[9px] text-slate-600 font-mono">
                          {idx % 4 === 0 ? `${idx}h` : ''}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'models' && (
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Active AI Model Clusters & Endpoints
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {AI_MODELS.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{m.name}</span>
                          <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400 font-mono">
                            {m.provider}
                          </span>
                        </div>
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Healthy (99.9%)
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mb-3">{m.tagline}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-t border-slate-800/80 pt-3 text-[11px]">
                      <div>
                        <span className="text-slate-500 block">Context</span>
                        <span className="font-bold text-slate-200">{m.contextWindow}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Speed</span>
                        <span className="font-bold text-slate-200">{m.speed}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Reasoning</span>
                        <span className="font-bold text-emerald-400">{m.reasoningScore}/100</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <form onSubmit={handleSaveSystemPrompt} className="space-y-4 max-w-2xl">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Shield className="h-4 w-4 text-indigo-400" />
                Global System Prompt Instructions
              </h3>
              <p className="text-xs text-slate-400">
                This prompt acts as the foundational alignment guide across all conversational modes and models.
              </p>
              <textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                rows={8}
                className="w-full rounded-2xl bg-slate-900 border border-slate-800 p-4 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none font-mono leading-relaxed"
              />

              <div className="flex items-center justify-between">
                {savedPrompt && (
                  <span className="text-xs text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Global prompt updated across all nodes!
                  </span>
                )}
                <div className="ml-auto">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 text-xs font-semibold text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/25"
                  >
                    Save System Prompt
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
