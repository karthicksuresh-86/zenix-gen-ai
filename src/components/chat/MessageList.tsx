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
  const { currentSession, createNewChat, sendMessage } = useApp();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const messages = currentSession ? currentSession.messages : [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, messages[messages.length - 1]?.content]);

  const quickStarters = [
    {
      title: 'Build Interactive Dashboard',
      description: 'Create a live glassmorphic metrics widget with slider controls and preview in Artifacts.',
      icon: Layout,
      color: 'from-blue-500 to-indigo-600',
      prompt: 'Build an interactive modern glassmorphic dashboard component with live sliders and metric gauges. Make it ready to preview in the Artifacts panel.',
    },
    {
      title: 'Deep Research & Citations',
      description: 'Perform verified multi-source analysis with Perplexity-style web citations.',
      icon: Globe,
      color: 'from-purple-500 to-pink-600',
      prompt: 'Synthesize the latest technical benchmarks comparing Open Source AI (Llama 3, DeepSeek) vs proprietary frontier APIs with numbered web citations.',
    },
    {
      title: 'DeepSeek Code Refactoring',
      description: 'Optimize TypeScript algorithm with full type safety and unit tests.',
      icon: Code2,
      color: 'from-emerald-500 to-teal-600',
      prompt: 'Write an optimized, production-ready distributed rate limiter in TypeScript using Redis token bucket algorithm with unit test cases.',
    },
    {
      title: 'Query RAG Knowledge Base',
      description: 'Search indexed documents using bge-large-en embeddings.',
      icon: Brain,
      color: 'from-cyan-500 to-blue-600',
      prompt: 'Explain the Zenix AI Platform Architecture Whitepaper and how dense-sparse vector indexing achieves sub-10ms retrieval.',
    },
  ];

  if (!currentSession || messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 p-6 text-center max-w-2xl mx-auto select-none">
        {/* Glowing Logo Badge */}
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 font-black text-white text-2xl shadow-2xl shadow-blue-500/30 mb-6 animate-orb-float">
          Z
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
          Think Faster. Create Smarter.
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mb-8 leading-relaxed">
          Zenix AI is your multi-model cognitive engine combining Claude-style clean workspace, DeepSeek coding intelligence, and live web citations.
        </p>

        {/* Quick starter cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full text-left">
          {quickStarters.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => sendMessage(item.prompt)}
                className="group relative flex flex-col p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90 transition-all duration-200 shadow-sm"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr ${item.color} text-white shadow-md`}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-bold text-xs text-white group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
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
    <div className="flex-1 overflow-y-auto py-4 space-y-2">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      <div ref={bottomRef} className="h-4" />
    </div>
  );
}
