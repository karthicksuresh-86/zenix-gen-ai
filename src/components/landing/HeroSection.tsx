'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { ArrowRight, Bot, Code2, Globe, Sparkles, Terminal, Zap } from 'lucide-react';
import { ParticlesCanvas } from '../ui/ParticlesCanvas';

export function HeroSection() {
  const { setCurrentView, createNewChat, theme } = useApp();
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
      {theme === 'light' ? (
        <>
          <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-gradient-to-tr from-amber-300/20 via-yellow-400/20 to-amber-200/20 blur-[140px] -z-10" />
          <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-amber-400/10 blur-[120px] -z-10" />
        </>
      ) : (
        <>
          <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-zinc-800/30 blur-[140px] -z-10" />
          <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-zinc-900/30 blur-[120px] -z-10" />
        </>
      )}

      {/* Floating Announcement Badge */}
      <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold backdrop-blur-xl shadow-lg mb-8 animate-in fade-in zoom-in-95 duration-500 ${
        theme === 'light'
          ? 'border-amber-300/80 bg-amber-100/70 text-amber-900 shadow-amber-500/10'
          : 'border-zinc-800 bg-zinc-950 text-zinc-300 shadow-black'
      }`}>
        <span className={`flex h-2 w-2 rounded-full animate-ping ${theme === 'light' ? 'bg-amber-500' : 'bg-white'}`} />
        <span>Introducing Zenix AI v2.4</span>
        <span className={theme === 'light' ? 'text-amber-400' : 'text-zinc-600'}>•</span>
        <span className={`font-normal ${theme === 'light' ? 'text-amber-800' : 'text-zinc-400'}`}>Next-Gen Multi-Model Intelligence</span>
      </div>

      {/* Main Headline */}
      <h1 className={`max-w-4xl text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6 ${
        theme === 'light' ? 'text-stone-900' : 'text-white'
      }`}>
        Think Faster. <br />
        <span className={theme === 'light' ? 'gold-gradient-text' : 'bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent'}>
          Create Smarter.
        </span>
      </h1>

      {/* Subheadline */}
      <p className={`max-w-2xl text-sm sm:text-lg mb-10 leading-relaxed font-normal ${
        theme === 'light' ? 'text-stone-600' : 'text-zinc-400'
      }`}>
        One intelligent assistant combining the clean interface of <strong className={theme === 'light' ? 'text-amber-900 font-bold' : 'text-white'}>Claude AI</strong>, 
        coding mastery of <strong className={theme === 'light' ? 'text-amber-900 font-bold' : 'text-white'}>DeepSeek</strong>, verified citations of <strong className={theme === 'light' ? 'text-amber-900 font-bold' : 'text-white'}>Perplexity</strong>, 
        and high-speed <strong className={theme === 'light' ? 'text-amber-900 font-bold' : 'text-white'}>RAG knowledge retrieval</strong>.
      </p>

      {/* Interactive Hero Input Sandbox */}
      <div className="w-full max-w-2xl relative z-10 mb-8">
        <form
          onSubmit={handleStartWithPrompt}
          className={`flex flex-col sm:flex-row items-center gap-2 rounded-2xl border p-2 backdrop-blur-2xl shadow-2xl transition-all ${
            theme === 'light'
              ? 'border-amber-300/80 bg-white/90 shadow-amber-500/10 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20'
              : 'border-zinc-800 bg-zinc-950/90 shadow-black focus-within:border-zinc-600 focus-within:ring-2 focus-within:ring-zinc-700/20'
          }`}
        >
          <div className="flex items-center gap-2.5 flex-1 px-3 w-full">
            <Sparkles className={`h-5 w-5 shrink-0 ${theme === 'light' ? 'text-amber-600' : 'text-zinc-400'}`} />
            <input
              type="text"
              value={heroPrompt}
              onChange={(e) => setHeroPrompt(e.target.value)}
              placeholder="Ask anything or request code, documents, research..."
              className={`w-full bg-transparent text-sm focus:outline-none ${
                theme === 'light'
                  ? 'text-stone-900 placeholder-stone-400'
                  : 'text-white placeholder-zinc-500'
              }`}
            />
          </div>

          <button
            type="submit"
            className={`w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-xs font-bold transition-all duration-200 active:scale-95 shrink-0 shadow-md ${
              theme === 'light'
                ? 'gold-gradient text-white shadow-amber-500/20 hover:brightness-105'
                : 'bg-white hover:bg-zinc-200 text-black shadow-zinc-900/50'
            }`}
          >
            <span>Start Chat</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Quick sample prompt chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          <span className={`text-[11px] ${theme === 'light' ? 'text-stone-500' : 'text-zinc-500'}`}>Try:</span>
          {sampleTags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => {
                setHeroPrompt(tag.prompt);
                createNewChat(tag.prompt);
              }}
              className={`rounded-lg border px-2.5 py-1 text-xs transition-all shadow-sm ${
                theme === 'light'
                  ? 'bg-amber-50/80 border-amber-200/80 text-amber-900 hover:border-amber-400 hover:bg-amber-100/90'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white'
              }`}
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
          className={`flex items-center gap-2 rounded-2xl px-8 py-3.5 text-sm font-bold transition-all duration-200 shadow-xl hover:scale-105 ${
            theme === 'light'
              ? 'gold-gradient text-white shadow-amber-500/25'
              : 'bg-white text-black hover:bg-zinc-200 shadow-zinc-900/50'
          }`}
        >
          <Zap className="h-4 w-4 fill-current" />
          <span>Launch Zenix Workspace</span>
        </button>

        <a
          href="#features"
          className={`flex items-center gap-2 rounded-2xl border px-8 py-3.5 text-sm font-semibold transition-all ${
            theme === 'light'
              ? 'bg-white/80 border-amber-200/80 text-stone-800 hover:bg-amber-50 hover:text-amber-900 shadow-sm'
              : 'bg-zinc-950 border-zinc-800 text-zinc-200 hover:bg-zinc-900 hover:text-white'
          }`}
        >
          <span>Explore Capabilities</span>
        </a>
      </div>
    </div>
  );
}
