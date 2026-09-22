'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Check, Copy, Download, FileText, Globe, Link2, Share2, Sparkles, X } from 'lucide-react';
import { downloadFile, exportChatAsMarkdown, exportChatAsPlainText, triggerPrintChat } from '@/lib/export-utils';

export function ShareModal() {
  const { activeModal, setActiveModal, currentSession, theme } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMd, setCopiedMd] = useState(false);

  const isOpen = activeModal === 'share' || activeModal === 'export';
  if (!isOpen || !currentSession) return null;

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/share/${currentSession.id}`
    : `https://zenix.ai/share/${currentSession.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleExportMarkdown = () => {
    const md = exportChatAsMarkdown(currentSession);
    downloadFile(md, `${currentSession.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`, 'text/markdown');
  };

  const handleExportText = () => {
    const txt = exportChatAsPlainText(currentSession);
    downloadFile(txt, `${currentSession.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.txt`, 'text/plain');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-2xl p-4 animate-in fade-in duration-200">
      <div className={`relative flex flex-col w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden transition-colors ${
        theme === 'light'
          ? 'bg-white border-amber-200 text-stone-900 shadow-amber-500/10'
          : 'bg-black border-zinc-800 text-white shadow-black'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between border-b px-6 py-4 ${
          theme === 'light'
            ? 'border-amber-200/80 bg-amber-50/70'
            : 'border-zinc-800 bg-zinc-950'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`flex h-8 w-8 items-center justify-center rounded-xl border ${
              theme === 'light'
                ? 'bg-amber-100 border-amber-300 text-amber-800'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300'
            }`}>
              <Share2 className="h-4 w-4" />
            </div>
            <div>
              <h2 className={`text-sm font-bold ${theme === 'light' ? 'text-stone-900' : 'text-white'}`}>Share & Export Conversation</h2>
              <p className={`text-[11px] truncate max-w-[280px] ${theme === 'light' ? 'text-stone-500' : 'text-zinc-400'}`}>
                {currentSession.title}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className={`rounded-full p-2 transition-colors ${
              theme === 'light'
                ? 'text-stone-500 hover:bg-amber-100 hover:text-stone-900'
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Public Link Generator */}
          <div>
            <label className={`text-xs font-semibold mb-1.5 flex items-center gap-1.5 ${theme === 'light' ? 'text-stone-800' : 'text-zinc-300'}`}>
              <Globe className={`h-3.5 w-3.5 ${theme === 'light' ? 'text-amber-600' : 'text-zinc-400'}`} />
              <span>Public Share Link</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className={`flex-1 rounded-xl border px-3 py-2 text-xs font-mono focus:outline-none ${
                  theme === 'light'
                    ? 'bg-amber-50/40 border-amber-200 text-stone-900'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-300'
                }`}
              />
              <button
                onClick={handleCopyLink}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-md active:scale-95 ${
                  theme === 'light'
                    ? 'gold-gradient text-white shadow-amber-500/20 hover:brightness-105'
                    : 'bg-white hover:bg-zinc-200 text-black shadow-zinc-900/50'
                }`}
              >
                {copiedLink ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className={`text-[11px] mt-1 ${theme === 'light' ? 'text-stone-500' : 'text-zinc-500'}`}>
              Anyone with this link can view this conversation and run artifacts.
            </p>
          </div>

          <hr className={theme === 'light' ? 'border-amber-200/80' : 'border-zinc-800'} />

          {/* Export Options Grid */}
          <div>
            <label className={`text-xs font-semibold mb-2.5 block ${theme === 'light' ? 'text-stone-800' : 'text-zinc-300'}`}>
              Download Conversation
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={handleExportMarkdown}
                className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all text-center group ${
                  theme === 'light'
                    ? 'bg-stone-50 border-amber-200 hover:border-amber-400 hover:bg-amber-50'
                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                }`}
              >
                <FileText className={`h-6 w-6 mb-1.5 group-hover:scale-110 transition-transform ${theme === 'light' ? 'text-amber-600' : 'text-zinc-300'}`} />
                <span className={`text-xs font-bold ${theme === 'light' ? 'text-stone-900' : 'text-white'}`}>Markdown</span>
                <span className={`text-[10px] ${theme === 'light' ? 'text-stone-500' : 'text-zinc-500'}`}>.md format</span>
              </button>

              <button
                onClick={handleExportText}
                className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all text-center group ${
                  theme === 'light'
                    ? 'bg-stone-50 border-amber-200 hover:border-amber-400 hover:bg-amber-50'
                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                }`}
              >
                <Download className={`h-6 w-6 mb-1.5 group-hover:scale-110 transition-transform ${theme === 'light' ? 'text-amber-600' : 'text-zinc-300'}`} />
                <span className={`text-xs font-bold ${theme === 'light' ? 'text-stone-900' : 'text-white'}`}>Plain Text</span>
                <span className={`text-[10px] ${theme === 'light' ? 'text-stone-500' : 'text-zinc-500'}`}>.txt format</span>
              </button>

              <button
                onClick={triggerPrintChat}
                className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all text-center group ${
                  theme === 'light'
                    ? 'bg-stone-50 border-amber-200 hover:border-amber-400 hover:bg-amber-50'
                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                }`}
              >
                <Sparkles className={`h-6 w-6 mb-1.5 group-hover:scale-110 transition-transform ${theme === 'light' ? 'text-amber-600' : 'text-zinc-300'}`} />
                <span className={`text-xs font-bold ${theme === 'light' ? 'text-stone-900' : 'text-white'}`}>PDF / Print</span>
                <span className={`text-[10px] ${theme === 'light' ? 'text-stone-500' : 'text-zinc-500'}`}>Save as PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
