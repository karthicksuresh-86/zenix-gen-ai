'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import {
  Check,
  Code2,
  Copy,
  Download,
  Eye,
  Maximize2,
  Minimize2,
  Play,
  RotateCcw,
  Sparkles,
  X,
} from 'lucide-react';
import { downloadFile } from '@/lib/export-utils';

export function ArtifactPanel() {
  const { theme, activeArtifact, isArtifactPanelOpen, setIsArtifactPanelOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  if (!isArtifactPanelOpen || !activeArtifact) return null;

  const isLight = theme === 'light';

  const handleCopy = () => {
    navigator.clipboard.writeText(activeArtifact.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = activeArtifact.type === 'svg' ? 'svg' : activeArtifact.type === 'html' ? 'html' : 'tsx';
    const mime = activeArtifact.type === 'svg' ? 'image/svg+xml' : 'text/html';
    downloadFile(activeArtifact.code, `${activeArtifact.title.toLowerCase().replace(/\s+/g, '-')}.${ext}`, mime);
  };

  const handleReload = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div
      className={`flex flex-col border-l transition-all duration-300 z-30 ${
        isLight
          ? 'bg-[#ffffff] border-amber-500/30 text-zinc-900 shadow-xl shadow-amber-500/10'
          : 'bg-[#060606] border-white/[0.1] text-white'
      } ${
        isFullscreen
          ? 'fixed inset-0 z-50 w-screen h-screen'
          : 'w-full lg:w-[480px] xl:w-[540px] 2xl:w-[600px] h-full shrink-0'
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between border-b px-4 py-3 ${
          isLight ? 'border-amber-500/20 bg-[#faf8f5]' : 'border-white/[0.08] bg-[#090909]'
        }`}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
              isLight
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-white/10 text-white border-white/20'
            }`}
          >
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="truncate">
            <h3 className={`font-semibold text-sm truncate ${isLight ? 'text-zinc-950' : 'text-white'}`}>
              {activeArtifact.title}
            </h3>
            <p className={`text-[11px] truncate ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
              Artifact • {activeArtifact.language.toUpperCase()} • Live Sandbox
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleReload}
            title="Reload sandbox preview"
            className={`rounded-lg p-1.5 transition-colors ${
              isLight ? 'text-zinc-500 hover:bg-amber-100 hover:text-zinc-900' : 'text-zinc-400 hover:bg-[#151515] hover:text-white'
            }`}
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={handleCopy}
            title="Copy code"
            className={`rounded-lg p-1.5 transition-colors ${
              isLight ? 'text-zinc-500 hover:bg-amber-100 hover:text-zinc-900' : 'text-zinc-400 hover:bg-[#151515] hover:text-white'
            }`}
          >
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
          </button>
          <button
            onClick={handleDownload}
            title="Download source file"
            className={`rounded-lg p-1.5 transition-colors ${
              isLight ? 'text-zinc-500 hover:bg-amber-100 hover:text-zinc-900' : 'text-zinc-400 hover:bg-[#151515] hover:text-white'
            }`}
          >
            <Download className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            className={`rounded-lg p-1.5 transition-colors ${
              isLight ? 'text-zinc-500 hover:bg-amber-100 hover:text-zinc-900' : 'text-zinc-400 hover:bg-[#151515] hover:text-white'
            }`}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsArtifactPanelOpen(false)}
            title="Close Artifact Panel"
            className={`rounded-lg p-1.5 transition-colors ml-1 ${
              isLight ? 'text-zinc-500 hover:bg-amber-100 hover:text-zinc-900' : 'text-zinc-400 hover:bg-[#151515] hover:text-white'
            }`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div
        className={`flex items-center justify-between border-b px-4 py-1.5 ${
          isLight ? 'border-amber-500/20 bg-[#faf8f5]' : 'border-white/[0.08] bg-[#050505]'
        }`}
      >
        <div
          className={`flex items-center gap-1 p-1 rounded-lg border ${
            isLight ? 'bg-white border-amber-500/20' : 'bg-[#0a0a0a] border-white/10'
          }`}
        >
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === 'preview'
                ? isLight
                  ? 'bg-amber-600 text-white shadow-sm font-semibold'
                  : 'bg-white text-black shadow-sm font-semibold'
                : isLight
                ? 'text-zinc-600 hover:text-zinc-950'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Interactive Preview</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === 'code'
                ? isLight
                  ? 'bg-amber-600 text-white shadow-sm font-semibold'
                  : 'bg-white text-black shadow-sm font-semibold'
                : isLight
                ? 'text-zinc-600 hover:text-zinc-950'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>Source Code</span>
          </button>
        </div>

        <span
          className={`text-[11px] font-mono flex items-center gap-1.5 ${
            isLight ? 'text-amber-700' : 'text-emerald-400'
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full animate-pulse ${
              isLight ? 'bg-amber-500' : 'bg-emerald-400'
            }`}
          />
          Live Frame
        </span>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 overflow-hidden relative ${isLight ? 'bg-[#f4f2ee]' : 'bg-[#000000]'}`}>
        {activeTab === 'preview' ? (
          <div className="h-full w-full p-2 flex flex-col">
            <iframe
              key={iframeKey}
              srcDoc={activeArtifact.code}
              title={activeArtifact.title}
              sandbox="allow-scripts allow-modals allow-forms allow-same-origin"
              className={`h-full w-full rounded-xl border bg-white shadow-inner ${
                isLight ? 'border-amber-500/25' : 'border-white/10'
              }`}
            />
          </div>
        ) : (
          <div
            className={`h-full w-full overflow-auto p-4 font-mono text-xs ${
              isLight ? 'bg-white text-zinc-900' : 'bg-[#080808] text-zinc-200'
            }`}
          >
            <table className="w-full border-collapse">
              <tbody>
                {activeArtifact.code.split('\n').map((line, idx) => (
                  <tr key={idx} className={isLight ? 'hover:bg-amber-50/60' : 'hover:bg-white/[0.04]'}>
                    <td
                      className={`w-10 select-none pr-4 text-right font-mono text-[11px] ${
                        isLight ? 'text-amber-700/60' : 'text-zinc-600'
                      }`}
                    >
                      {idx + 1}
                    </td>
                    <td className="whitespace-pre font-mono leading-relaxed">
                      {line || ' '}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div
        className={`border-t px-4 py-2 text-[11px] flex items-center justify-between ${
          isLight ? 'border-amber-500/20 bg-[#faf8f5] text-zinc-500' : 'border-white/[0.08] bg-[#050505] text-zinc-500'
        }`}
      >
        <span>Zenix Sandbox Engine v2.4</span>
        <span>Ready for deployment</span>
      </div>
    </div>
  );
}

