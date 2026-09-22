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
  Scale,
  Share2,
  Shield,
  Sparkles,
  Target,
  Terminal,
  Zap,
} from 'lucide-react';
import { ModelId, ModeId } from '@/types';

export function ChatHeader() {
  const {
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

  return (
    <div className="flex flex-col border-b border-slate-800/80 bg-[#07090e]/95 backdrop-blur-xl px-4 py-2.5 z-10 shrink-0">
      <div className="flex items-center justify-between gap-2">
        {/* Left: Model Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
            className="flex items-center gap-2 rounded-xl bg-slate-900/90 border border-slate-800/80 px-3 py-1.5 text-xs text-white hover:border-slate-700 hover:bg-slate-800 transition-all shadow-sm"
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-500/20 text-blue-400">
              <Sparkles className="h-3 w-3" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold">{currentModel.name}</span>
              <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[9px] text-slate-400 font-mono">
                {currentModel.provider}
              </span>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          {/* Dropdown Menu */}
          {isModelDropdownOpen && (
            <div className="absolute left-0 top-full mt-2 w-80 rounded-2xl border border-slate-800 bg-[#0a0e17] p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
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
                        ? 'bg-blue-600/15 text-white border border-blue-500/30'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{m.name}</span>
                        <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] text-slate-400 font-mono">
                          {m.provider}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {m.tagline}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-emerald-400 shrink-0 ml-2">
                      {m.contextWindow}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Center: Mode Chips */}
        <div className="hidden md:flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800/60 overflow-x-auto">
          {AI_MODES.map((mode) => {
            const isActive = mode.id === activeModeId;
            return (
              <button
                key={mode.id}
                onClick={() => setActiveModeId(mode.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
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
          {/* Web Search Toggle */}
          <button
            onClick={() => setWebSearchEnabled((prev) => !prev)}
            className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium border transition-all ${
              webSearchEnabled
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-sm shadow-purple-500/10'
                : 'bg-slate-900/60 text-slate-400 border-slate-800/80 hover:text-white hover:bg-slate-800'
            }`}
            title="Enable Live Web Search Citations (Perplexity-style)"
          >
            <Globe className={`h-3.5 w-3.5 ${webSearchEnabled ? 'text-purple-400' : ''}`} />
            <span className="hidden sm:inline">Web Search</span>
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                webSearchEnabled ? 'bg-purple-400 animate-pulse' : 'bg-slate-600'
              }`}
            />
          </button>

          {/* Deep Reasoning Toggle */}
          <button
            onClick={() => setDeepThinkingEnabled((prev) => !prev)}
            className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium border transition-all ${
              deepThinkingEnabled
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                : 'bg-slate-900/60 text-slate-400 border-slate-800/80 hover:text-white hover:bg-slate-800'
            }`}
            title="Deep Thinking & Multi-step Logic Pipeline"
          >
            <BrainCircuit className={`h-3.5 w-3.5 ${deepThinkingEnabled ? 'text-cyan-400' : ''}`} />
            <span className="hidden sm:inline">Deep Think</span>
          </button>

          {/* Artifacts Split Panel Toggle */}
          {activeArtifact && (
            <button
              onClick={() => setIsArtifactPanelOpen(!isArtifactPanelOpen)}
              className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium border transition-all ${
                isArtifactPanelOpen
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30'
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
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 px-2.5 py-1.5 text-xs font-medium text-blue-300 hover:text-white hover:bg-blue-600/30 transition-colors"
            title="Configure Gemini API Key & Preferences"
          >
            <KeyRound className="h-3.5 w-3.5 text-blue-400" />
            <span className="hidden sm:inline">API Key</span>
          </button>

          {/* Share / Export */}
          <button
            onClick={() => setActiveModal('share')}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900/80 border border-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
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
