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
  const { activeArtifact, isArtifactPanelOpen, setIsArtifactPanelOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  if (!isArtifactPanelOpen || !activeArtifact) return null;

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
      className={`flex flex-col border-l border-slate-800 bg-[#0a0e17]/95 backdrop-blur-2xl transition-all duration-300 z-30 ${
        isFullscreen
          ? 'fixed inset-0 z-50 w-screen h-screen'
          : 'w-full lg:w-[480px] xl:w-[540px] 2xl:w-[600px] h-full shrink-0'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 px-4 py-3 bg-slate-900/60">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="truncate">
            <h3 className="font-semibold text-white text-sm truncate">
              {activeArtifact.title}
            </h3>
            <p className="text-[11px] text-slate-400 truncate">
              Artifact • {activeArtifact.language.toUpperCase()} • Live Sandbox
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleReload}
            title="Reload sandbox preview"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={handleCopy}
            title="Copy code"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
          </button>
          <button
            onClick={handleDownload}
            title="Download source file"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Download className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsArtifactPanelOpen(false)}
            title="Close Artifact Panel"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors ml-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-950/70 px-4 py-1.5">
        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800/60">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === 'preview'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Interactive Preview</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === 'code'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>Source Code</span>
          </button>
        </div>

        <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Isolated Frame
        </span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative bg-[#07090e]">
        {activeTab === 'preview' ? (
          <div className="h-full w-full bg-[#05070a] p-2 flex flex-col">
            <iframe
              key={iframeKey}
              srcDoc={activeArtifact.code}
              title={activeArtifact.title}
              sandbox="allow-scripts allow-modals allow-forms allow-same-origin"
              className="h-full w-full rounded-xl border border-slate-800/80 bg-white"
            />
          </div>
        ) : (
          <div className="h-full w-full overflow-auto p-4 font-mono text-xs text-slate-200 bg-[#0d1117]">
            <table className="w-full border-collapse">
              <tbody>
                {activeArtifact.code.split('\n').map((line, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30">
                    <td className="w-10 select-none pr-4 text-right text-slate-600 font-mono text-[11px]">
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
      <div className="border-t border-slate-800/80 bg-slate-950/80 px-4 py-2 text-[11px] text-slate-500 flex items-center justify-between">
        <span>Zenix Sandbox Engine v2.4</span>
        <span>Ready for deployment</span>
      </div>
    </div>
  );
}
