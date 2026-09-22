'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { AI_MODELS, AI_MODES } from '@/lib/constants';
import {
  BrainCircuit,
  ChevronDown,
  Code2,
  Cpu,
  Feather,
  FileText,
  Globe,
  KeyRound,
  Layout,
  Moon,
  Scale,
  Share2,
  Shield,
  Sparkles,
  Sun,
  Target,
  Terminal,
  Zap,
} from 'lucide-react';
import { ModelId, ModeId } from '@/types';

export function ChatHeader() {
  const {
    theme,
    toggleTheme,
    activeModelId,
    setActiveModelId,
    activeModeId,
    setActiveModeId,
    webSearchEnabled,
    setWebSearchEnabled,
    deepThinkingEnabled,
    setDeepThinkingEnabled,
    activeArtifact,
    isArtifactPanelOpen,
    setIsArtifactPanelOpen,
    setActiveModal,
  } = useApp();

  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);

  const currentModel = AI_MODELS.find((m) => m.id === activeModelId) || AI_MODELS[0];
  const currentMode = AI_MODES.find((m) => m.id === activeModeId) || AI_MODES[0];

  const getModeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal':
        return <Terminal className="h-3.5 w-3.5" />;
      case 'Globe':
        return <Globe className="h-3.5 w-3.5" />;
      case 'Feather':
        return <Feather className="h-3.5 w-3.5" />;
      case 'Target':
        return <Target className="h-3.5 w-3.5" />;
      case 'FileText':
        return <FileText className="h-3.5 w-3.5" />;
      default:
        return <Scale className="h-3.5 w-3.5" />;
    }
  };

  const isLight = theme === 'light';

  return (
    <div
      className={`flex flex-col border-b px-4 py-2.5 z-10 shrink-0 transition-colors backdrop-blur-xl ${
        isLight
          ? 'bg-[#ffffff]/95 border-amber-500/20 text-zinc-900 shadow-sm'
          : 'bg-[#000000]/95 border-white/[0.08] text-white'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        {/* Left: Model Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
            className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs transition-all shadow-sm ${
              isLight
                ? 'bg-[#faf8f5] border border-amber-500/30 text-zinc-900 hover:border-amber-500 hover:bg-amber-50/50'
                : 'bg-[#0a0a0a] border border-white/[0.1] text-white hover:border-white/20 hover:bg-[#121212]'
            }`}
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-md ${
                isLight ? 'bg-amber-500/20 text-amber-600' : 'bg-white/10 text-white'
              }`}
            >
              <Sparkles className="h-3 w-3" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold">{currentModel.name}</span>
              <span
                className={`rounded px-1.5 py-0.2 text-[9px] font-mono ${
                  isLight ? 'bg-amber-100 text-amber-800' : 'bg-[#181818] text-zinc-400'
                }`}
              >
                {currentModel.provider}
              </span>
            </div>
            <ChevronDown className={`h-3.5 w-3.5 ${isLight ? 'text-amber-700' : 'text-zinc-400'}`} />
          </button>

          {/* Dropdown Menu */}
          {isModelDropdownOpen && (
            <div
              className={`absolute left-0 top-full mt-2 w-80 rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 ${
                isLight
                  ? 'border border-amber-500/30 bg-white text-zinc-900 shadow-amber-500/10'
                  : 'border border-white/[0.12] bg-[#080808] text-white shadow-black/80'
              }`}
            >
              <div
                className={`px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider ${
                  isLight ? 'text-amber-700' : 'text-zinc-500'
                }`}
              >
                Select Active Intelligence Engine
              </div>
              <div className="space-y-1">
                {AI_MODELS.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      setActiveModelId(m.id);
                      setIsModelDropdownOpen(false);
                    }}
                    className={`flex items-center justify-between rounded-xl p-2.5 cursor-pointer text-xs transition-all ${
                      m.id === activeModelId
                        ? isLight
                          ? 'bg-amber-50 text-amber-900 border border-amber-500/40 font-semibold'
                          : 'bg-white/10 text-white border border-white/20 font-semibold'
                        : isLight
                        ? 'text-zinc-700 hover:bg-amber-50/60 hover:text-zinc-950'
                        : 'text-zinc-400 hover:bg-[#121212] hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{m.name}</span>
                        <span
                          className={`rounded px-1.5 py-0.5 text-[9px] font-mono ${
                            isLight ? 'bg-amber-100 text-amber-800' : 'bg-[#181818] text-zinc-400'
                          }`}
                        >
                          {m.provider}
                        </span>
                      </div>
                      <p
                        className={`text-[11px] line-clamp-1 mt-0.5 ${
                          isLight ? 'text-zinc-600' : 'text-zinc-400'
                        }`}
                      >
                        {m.tagline}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-mono font-semibold shrink-0 ml-2 ${
                        isLight ? 'text-amber-600' : 'text-emerald-400'
                      }`}
                    >
                      {m.contextWindow}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Center: Mode Chips */}
        <div
          className={`hidden md:flex items-center gap-1 p-1 rounded-xl border overflow-x-auto ${
            isLight
              ? 'bg-[#faf8f5] border-amber-500/20'
              : 'bg-[#060606] border-white/[0.08]'
          }`}
        >
          {AI_MODES.map((mode) => {
            const isActive = mode.id === activeModeId;
            return (
              <button
                key={mode.id}
                onClick={() => setActiveModeId(mode.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? isLight
                      ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold shadow-sm'
                      : 'bg-white text-black font-bold shadow-sm'
                    : isLight
                    ? 'text-zinc-600 hover:text-zinc-950 hover:bg-amber-100/50'
                    : 'text-zinc-400 hover:text-white hover:bg-[#121212]'
                }`}
              >
                {getModeIcon(mode.iconName)}
                <span>{mode.name}</span>
              </button>
            );
          })}
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2">
          {/* Theme Switcher Toggle (Plain Black <-> White with Gold) */}
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-semibold border transition-all ${
              isLight
                ? 'bg-amber-50 border-amber-400/50 text-amber-900 hover:bg-amber-100 shadow-sm shadow-amber-500/10'
                : 'bg-[#0a0a0a] border-white/[0.12] text-zinc-300 hover:text-white hover:bg-[#151515]'
            }`}
            title={isLight ? 'Switch to Plain Black Theme' : 'Switch to White & Gold Theme'}
          >
            {isLight ? (
              <>
                <Sun className="h-3.5 w-3.5 text-amber-500 animate-spin-slow" />
                <span className="hidden sm:inline text-amber-800 font-bold">Gold Theme</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5 text-zinc-400" />
                <span className="hidden sm:inline text-zinc-300">Black Theme</span>
              </>
            )}
          </button>

          {/* Web Search Toggle */}
          <button
            onClick={() => setWebSearchEnabled((prev) => !prev)}
            className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium border transition-all ${
              webSearchEnabled
                ? isLight
                  ? 'bg-amber-500/20 text-amber-900 border-amber-500/50 font-semibold'
                  : 'bg-white/15 text-white border-white/30'
                : isLight
                ? 'bg-white text-zinc-600 border-amber-500/20 hover:text-zinc-950 hover:bg-amber-50'
                : 'bg-[#0a0a0a] text-zinc-400 border-white/[0.08] hover:text-white hover:bg-[#121212]'
            }`}
            title="Enable Live Web Search Citations"
          >
            <Globe className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Web Search</span>
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                webSearchEnabled ? (isLight ? 'bg-amber-500 animate-pulse' : 'bg-white animate-pulse') : 'bg-zinc-600'
              }`}
            />
          </button>

          {/* Deep Reasoning Toggle */}
          <button
            onClick={() => setDeepThinkingEnabled((prev) => !prev)}
            className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium border transition-all ${
              deepThinkingEnabled
                ? isLight
                  ? 'bg-amber-500/20 text-amber-900 border-amber-500/50 font-semibold'
                  : 'bg-white/15 text-white border-white/30'
                : isLight
                ? 'bg-white text-zinc-600 border-amber-500/20 hover:text-zinc-950 hover:bg-amber-50'
                : 'bg-[#0a0a0a] text-zinc-400 border-white/[0.08] hover:text-white hover:bg-[#121212]'
            }`}
            title="Deep Thinking & Multi-step Logic Pipeline"
          >
            <BrainCircuit className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Deep Think</span>
          </button>

          {/* Artifacts Split Panel Toggle */}
          {activeArtifact && (
            <button
              onClick={() => setIsArtifactPanelOpen(!isArtifactPanelOpen)}
              className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium border transition-all ${
                isArtifactPanelOpen
                  ? isLight
                    ? 'bg-amber-600 text-white border-amber-700'
                    : 'bg-white text-black border-white'
                  : isLight
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-white/10 text-white border-white/20'
              }`}
              title="Toggle Live Artifacts Preview Panel"
            >
              <Layout className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Artifact</span>
            </button>
          )}

          {/* API Key Modal */}
          <button
            onClick={() => setActiveModal('auth')}
            className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-medium transition-colors ${
              isLight
                ? 'bg-amber-50 border-amber-500/30 text-amber-800 hover:bg-amber-100 hover:text-amber-950'
                : 'bg-[#0a0a0a] border-white/[0.1] text-zinc-300 hover:text-white hover:bg-[#151515]'
            }`}
            title="Configure Gemini API Key & Preferences"
          >
            <KeyRound className={`h-3.5 w-3.5 ${isLight ? 'text-amber-600' : 'text-zinc-300'}`} />
            <span className="hidden sm:inline">API Key</span>
          </button>

          {/* Share / Export */}
          <button
            onClick={() => setActiveModal('share')}
            className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-medium transition-colors ${
              isLight
                ? 'bg-white border-amber-500/20 text-zinc-700 hover:text-zinc-950 hover:bg-amber-50'
                : 'bg-[#0a0a0a] border-white/[0.08] text-zinc-400 hover:text-white hover:bg-[#121212]'
            }`}
            title="Share or Export Chat"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}

