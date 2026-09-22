'use client';

import React, { useEffect, useRef } from 'react';
import { useApp } from '@/lib/store';
import { MessageBubble } from './MessageBubble';
import {
  Brain,
  Code2,
  FileSearch,
  Globe,
  Layout,
  Sparkles,
  Zap,
} from 'lucide-react';

export function MessageList() {
  const { theme, currentSession, createNewChat, sendMessage } = useApp();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const isLight = theme === 'light';
  const messages = currentSession ? currentSession.messages : [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, messages[messages.length - 1]?.content]);

  const quickStarters = [
    {
      title: 'Friendly Tanglish Chat & Tech Guide',
      description: 'Chat naturally in Tanglish with real-world examples and friendly mentoring.',
      icon: Sparkles,
      color: isLight ? 'from-amber-600 to-yellow-600' : 'from-zinc-100 to-zinc-400 text-black',
      prompt: 'Hi bro! Enakku React vs Next.js enna difference nu super simple-aa Tanglish-la explain pannu!',
    },
    {
      title: 'Build Interactive Dashboard',
      description: 'Create a live luxury metrics widget with controls and preview in Artifacts.',
      icon: Layout,
      color: isLight ? 'from-amber-600 to-yellow-600' : 'from-zinc-200 to-zinc-500 text-black',
      prompt: 'Build an interactive modern luxury dashboard component with live sliders and metric gauges. Make it ready to preview in the Artifacts panel.',
    },
    {
      title: 'Deep Research & Citations',
      description: 'Perform verified multi-source analysis with Perplexity-style web citations.',
      icon: Globe,
      color: isLight ? 'from-amber-600 to-yellow-600' : 'from-zinc-100 to-zinc-400 text-black',
      prompt: 'Synthesize the latest technical benchmarks comparing Open Source AI (Llama 3, DeepSeek) vs proprietary frontier APIs with numbered web citations.',
    },
    {
      title: 'DeepSeek Code Refactoring',
      description: 'Optimize TypeScript algorithm with full type safety and unit tests.',
      icon: Code2,
      color: isLight ? 'from-amber-600 to-yellow-600' : 'from-zinc-200 to-zinc-500 text-black',
      prompt: 'Write an optimized, production-ready distributed rate limiter in TypeScript using Redis token bucket algorithm with unit test cases.',
    },
  ];

  if (!currentSession || messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 p-6 text-center max-w-2xl mx-auto select-none">
        {/* Glowing Logo Badge */}
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-3xl font-black text-2xl shadow-2xl mb-6 animate-orb-float ${
            isLight
              ? 'bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-500 text-white shadow-amber-500/30'
              : 'bg-white text-black shadow-white/20'
          }`}
        >
          Z
        </div>

        <h2
          className={`text-2xl sm:text-3xl font-black tracking-tight mb-2 ${
            isLight ? 'text-zinc-950' : 'text-white'
          }`}
        >
          Think Faster. Create Smarter.
        </h2>
        <p
          className={`text-xs sm:text-sm max-w-lg mb-8 leading-relaxed ${
            isLight ? 'text-zinc-600' : 'text-zinc-400'
          }`}
        >
          Zenix AI is your multi-model cognitive engine combining clean workspace ergonomics, Tanglish mentoring, and live web research.
        </p>

        {/* Quick starter cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full text-left">
          {quickStarters.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => sendMessage(item.prompt)}
                className={`group relative flex flex-col p-4 rounded-2xl border transition-all duration-200 shadow-sm ${
                  isLight
                    ? 'bg-white border-amber-500/25 hover:border-amber-500 hover:shadow-md hover:shadow-amber-500/10'
                    : 'bg-[#080808] border-white/[0.08] hover:border-white/20 hover:bg-[#121212]'
                }`}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr ${item.color} shadow-md`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span
                    className={`font-bold text-xs transition-colors ${
                      isLight
                        ? 'text-zinc-900 group-hover:text-amber-700'
                        : 'text-white group-hover:text-zinc-300'
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
                <p
                  className={`text-[11px] leading-relaxed line-clamp-2 ${
                    isLight ? 'text-zinc-500' : 'text-zinc-400'
                  }`}
                >
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-2 sm:px-6 py-4 space-y-4">
      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} />
      ))}
      <div ref={bottomRef} className="h-4" />
    </div>
  );
}
