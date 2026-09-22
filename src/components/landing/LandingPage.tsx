'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { HeroSection } from './HeroSection';
import { InteractiveDemo } from './InteractiveDemo';
import { FeatureGrid } from './FeatureGrid';
import { ModelComparison } from './ModelComparison';
import { PricingAndFAQ } from './PricingAndFAQ';
import { ArrowRight, Bot, Database, Sparkles, Terminal, Zap } from 'lucide-react';
import { AuthModal } from '../auth/AuthModal';

export function LandingPage() {
  const { setCurrentView, setActiveModal } = useApp();

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col selection:bg-blue-500/30 selection:text-blue-200">
      {/* Top Floating Glassmorphism Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-slate-800/80 bg-[#07090e]/80 backdrop-blur-2xl px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo & Brand */}
          <div
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 font-black text-white text-base shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
              Z
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-lg tracking-tight">Zenix AI</span>
              <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[9px] font-bold text-blue-400 border border-blue-500/30">
                v2.4
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">
              Capabilities
            </a>
            <button
              onClick={() => setActiveModal('knowledge')}
              className="hover:text-white transition-colors"
            >
              RAG Knowledge
            </button>
            <button
              onClick={() => setActiveModal('prompts')}
              className="hover:text-white transition-colors"
            >
              Prompt Library
            </button>
            <button
              onClick={() => setActiveModal('admin')}
              className="hover:text-white transition-colors"
            >
              Telemetry
            </button>
          </nav>

          {/* Right Action CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveModal('auth')}
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors hidden sm:block"
            >
              Sign In
            </button>
            <button
              onClick={() => setCurrentView('chat')}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all active:scale-95"
            >
              <span>Launch Chat</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Landing Sections */}
      <main className="flex-1 pt-12">
        <HeroSection />
        <InteractiveDemo />
        <FeatureGrid />
        <ModelComparison />
        <PricingAndFAQ />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-12 px-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs">
              Z
            </div>
            <span className="font-bold text-slate-300">Zenix AI Platform</span>
            <span>•</span>
            <span>© 2026 All Rights Reserved</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#features" className="hover:text-slate-300 transition-colors">
              Features
            </a>
            <button
              onClick={() => setActiveModal('knowledge')}
              className="hover:text-slate-300 transition-colors"
            >
              Vector System
            </button>
            <button
              onClick={() => setActiveModal('admin')}
              className="hover:text-slate-300 transition-colors"
            >
              Cluster Status
            </button>
          </div>
        </div>
      </footer>

      {/* Modals when triggered from Landing */}
      <AuthModal />
    </div>
  );
}
