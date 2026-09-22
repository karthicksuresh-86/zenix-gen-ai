'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { HeroSection } from './HeroSection';
import { InteractiveDemo } from './InteractiveDemo';
import { FeatureGrid } from './FeatureGrid';
import { ModelComparison } from './ModelComparison';
import { PricingAndFAQ } from './PricingAndFAQ';
import { ArrowRight, Bot, Database, Moon, Sparkles, Sun, Terminal, Zap } from 'lucide-react';
import { AuthModal } from '../auth/AuthModal';

export function LandingPage() {
  const { setCurrentView, setActiveModal, theme, toggleTheme } = useApp();

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      theme === 'light' 
        ? 'bg-[#faf8f5] text-amber-950 selection:bg-amber-400/30 selection:text-amber-900' 
        : 'bg-black text-slate-100 selection:bg-white/20 selection:text-white'
    }`}>
      {/* Top Floating Glassmorphism Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-40 border-b backdrop-blur-2xl px-6 py-3.5 transition-colors ${
        theme === 'light'
          ? 'border-amber-200/80 bg-[#faf8f5]/85 text-amber-950 shadow-sm'
          : 'border-zinc-800/80 bg-black/85 text-white'
      }`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo & Brand */}
          <div
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl font-black text-base transition-transform group-hover:scale-105 shadow-md ${
              theme === 'light'
                ? 'gold-gradient text-white shadow-amber-500/20'
                : 'bg-gradient-to-tr from-zinc-800 to-zinc-950 text-white border border-zinc-700/80 shadow-black'
            }`}>
              Z
            </div>
            <div className="flex items-center gap-2">
              <span className={`font-extrabold text-lg tracking-tight ${theme === 'light' ? 'text-amber-950' : 'text-white'}`}>Zenix AI</span>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold border ${
                theme === 'light'
                  ? 'bg-amber-100 text-amber-800 border-amber-300/80'
                  : 'bg-zinc-900 text-zinc-300 border-zinc-700'
              }`}>
                v2.4
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className={`hidden md:flex items-center gap-6 text-xs font-semibold ${
            theme === 'light' ? 'text-stone-600' : 'text-zinc-400'
          }`}>
            <a href="#features" className={`transition-colors ${theme === 'light' ? 'hover:text-amber-700' : 'hover:text-white'}`}>
              Capabilities
            </a>
            <button
              onClick={() => setActiveModal('knowledge')}
              className={`transition-colors ${theme === 'light' ? 'hover:text-amber-700' : 'hover:text-white'}`}
            >
              RAG Knowledge
            </button>
            <button
              onClick={() => setActiveModal('prompts')}
              className={`transition-colors ${theme === 'light' ? 'hover:text-amber-700' : 'hover:text-white'}`}
            >
              Prompt Library
            </button>
            <button
              onClick={() => setActiveModal('admin')}
              className={`transition-colors ${theme === 'light' ? 'hover:text-amber-700' : 'hover:text-white'}`}
            >
              Telemetry
            </button>
          </nav>

          {/* Right Action CTA */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={theme === 'light' ? 'Switch to Plain Black Theme' : 'Switch to White & Golden Theme'}
              className={`flex items-center justify-center h-8 w-8 rounded-xl border transition-all ${
                theme === 'light'
                  ? 'border-amber-300/80 bg-amber-50 text-amber-700 hover:bg-amber-100'
                  : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-amber-400" />}
            </button>

            <button
              onClick={() => setActiveModal('auth')}
              className={`text-xs font-semibold px-3 py-2 transition-colors hidden sm:block ${
                theme === 'light' ? 'text-stone-700 hover:text-amber-900' : 'text-zinc-300 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setCurrentView('chat')}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all active:scale-95 shadow-md ${
                theme === 'light'
                  ? 'gold-gradient text-white shadow-amber-500/20 hover:brightness-105'
                  : 'bg-white hover:bg-zinc-200 text-black shadow-zinc-900/50'
              }`}
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
      <footer className={`border-t py-12 px-6 text-xs transition-colors ${
        theme === 'light'
          ? 'border-amber-200/60 bg-white text-stone-500'
          : 'border-zinc-900 bg-black text-zinc-500'
      }`}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className={`flex h-7 w-7 items-center justify-center rounded-lg font-bold text-xs ${
              theme === 'light' ? 'gold-gradient text-white' : 'bg-zinc-800 text-white border border-zinc-700'
            }`}>
              Z
            </div>
            <span className={`font-bold ${theme === 'light' ? 'text-stone-800' : 'text-zinc-300'}`}>Zenix AI Platform</span>
            <span>•</span>
            <span>© 2026 All Rights Reserved</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#features" className={`transition-colors ${theme === 'light' ? 'hover:text-amber-800' : 'hover:text-zinc-300'}`}>
              Features
            </a>
            <button
              onClick={() => setActiveModal('knowledge')}
              className={`transition-colors ${theme === 'light' ? 'hover:text-amber-800' : 'hover:text-zinc-300'}`}
            >
              Vector System
            </button>
            <button
              onClick={() => setActiveModal('admin')}
              className={`transition-colors ${theme === 'light' ? 'hover:text-amber-800' : 'hover:text-zinc-300'}`}
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
