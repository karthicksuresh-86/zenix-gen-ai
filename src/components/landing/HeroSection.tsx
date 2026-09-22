'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { ArrowRight, Bot, Code2, Globe, Sparkles, Terminal, Zap } from 'lucide-react';
import { ParticlesCanvas } from '../ui/ParticlesCanvas';

export function HeroSection() {
  const { setCurrentView, createNewChat } = useApp();
  const [heroPrompt, setHeroPrompt] = useState('');

  const handleStartWithPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroPrompt.trim()) {
      createNewChat(heroPrompt);
    } else {
      setCurrentView('chat');
    }
  };

  const sampleTags = [
    { label: 'DeepSeek Coder', prompt: 'Build a distributed cache system in TypeScript with Redis' },
    { label: 'Web Citations', prompt: 'Summarize latest breakthroughs in open-source frontier AI with sources' },
    { label: 'Interactive Artifact', prompt: 'Create an interactive glassmorphic dashboard component in HTML' },
    { label: 'RAG Knowledge', prompt: 'How does dense-sparse vector indexing optimize query retrieval?' },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 pt-20 pb-16 text-center overflow-hidden">
      {/* Dynamic Interactive Particles */}
      <ParticlesCanvas />

      {/* Futuristic Background Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-gradient-to-tr from-blue-600/20 via-purple-600/25 to-cyan-500/20 blur-[140px] -z-10" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-indigo-600/15 blur-[120px] -z-10" />

      {/* Floating Announcement Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/40 px-4 py-1.5 text-xs font-semibold text-blue-300 backdrop-blur-xl shadow-lg shadow-blue-500/10 mb-8 animate-in fade-in zoom-in-95 duration-500">
        <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-ping" />
        <span>Introducing Zenix AI v2.4</span>
        <span className="text-slate-500">•</span>
        <span className="text-slate-300 font-normal">Next-Gen Multi-Model Intelligence</span>
      </div>

      {/* Main Headline */}
      <h1 className="max-w-4xl text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.1] mb-6">
        Think Faster. <br />
        <span className="text-gradient">Create Smarter.</span>
      </h1>

      {/* Subheadline */}
      <p className="max-w-2xl text-sm sm:text-lg text-slate-300 mb-10 leading-relaxed font-normal">
        One intelligent assistant combining the clean interface of <strong className="text-white">Claude AI</strong>, 
        coding mastery of <strong className="text-white">DeepSeek</strong>, verified citations of <strong className="text-white">Perplexity</strong>, 
        and high-speed <strong className="text-white">RAG knowledge retrieval</strong>.
      </p>

      {/* Interactive Hero Input Sandbox */}
      <div className="w-full max-w-2xl relative z-10 mb-8">
        <form
          onSubmit={handleStartWithPrompt}
          className="flex flex-col sm:flex-row items-center gap-2 rounded-2xl border border-slate-700/80 bg-slate-900/80 p-2 backdrop-blur-2xl shadow-2xl focus-within:border-blue-500/60 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all"
        >
          <div className="flex items-center gap-2.5 flex-1 px-3 w-full">
            <Sparkles className="h-5 w-5 text-blue-400 shrink-0" />
            <input
              type="text"
              value={heroPrompt}
              onChange={(e) => setHeroPrompt(e.target.value)}
              placeholder="Ask anything or request code, documents, research..."
              className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 hover:from-blue-500 to-indigo-600 hover:to-indigo-500 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 active:scale-95 shrink-0"
          >
            <span>Start Chat</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Quick sample prompt chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          <span className="text-[11px] text-slate-400">Try:</span>
          {sampleTags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => {
                setHeroPrompt(tag.prompt);
                createNewChat(tag.prompt);
              }}
              className="rounded-lg bg-slate-900/70 border border-slate-800 px-2.5 py-1 text-xs text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white transition-all shadow-sm"
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-4 z-10">
        <button
          onClick={() => setCurrentView('chat')}
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-500/20 hover:scale-105 transition-all duration-200"
        >
          <Zap className="h-4 w-4 fill-current" />
          <span>Launch Zenix Workspace</span>
        </button>

        <a
          href="#features"
          className="flex items-center gap-2 rounded-2xl bg-slate-900/80 border border-slate-800 px-8 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-all"
        >
          <span>Explore Capabilities</span>
        </a>
      </div>
    </div>
  );
}
