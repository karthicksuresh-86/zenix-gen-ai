'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Check, Copy, Download, FileText, Globe, Link2, Share2, Sparkles, X } from 'lucide-react';
import { downloadFile, exportChatAsMarkdown, exportChatAsPlainText, triggerPrintChat } from '@/lib/export-utils';

export function ShareModal() {
  const { activeModal, setActiveModal, currentSession } = useApp();
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
      <div className="relative flex flex-col w-full max-w-lg rounded-3xl border border-slate-800 bg-[#0a0e17] shadow-2xl glass-card overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Share2 className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Share & Export Conversation</h2>
              <p className="text-[11px] text-slate-400 truncate max-w-[280px]">
                {currentSession.title}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Public Link Generator */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-blue-400" />
              <span>Public Share Link</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs font-mono text-slate-300 focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors shadow-md shadow-blue-500/20"
              >
                {copiedLink ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Anyone with this link can view this conversation and run artifacts.
            </p>
          </div>

          <hr className="border-slate-800/80" />

          {/* Export Options Grid */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-2.5 block">
              Download Conversation
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={handleExportMarkdown}
                className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 hover:bg-slate-800 transition-all text-center group"
              >
                <FileText className="h-6 w-6 text-purple-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-white">Markdown</span>
                <span className="text-[10px] text-slate-500">.md format</span>
              </button>

              <button
                onClick={handleExportText}
                className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 hover:bg-slate-800 transition-all text-center group"
              >
                <Download className="h-6 w-6 text-blue-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-white">Plain Text</span>
                <span className="text-[10px] text-slate-500">.txt format</span>
              </button>

              <button
                onClick={triggerPrintChat}
                className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-800 transition-all text-center group"
              >
                <Sparkles className="h-6 w-6 text-emerald-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-white">PDF / Print</span>
                <span className="text-[10px] text-slate-500">Save as PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
