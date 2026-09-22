'use client';

import React, { useState } from 'react';
import { Check, Copy, Play, Sparkles } from 'lucide-react';
import { useApp } from '@/lib/store';

interface CodeBlockProps {
  language?: string;
  code: string;
}

export function CodeBlock({ language = 'typescript', code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { setActiveArtifact, setIsArtifactPanelOpen } = useApp();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isPreviewable = 
    language.toLowerCase().includes('html') ||
    language.toLowerCase().includes('react') ||
    language.toLowerCase().includes('jsx') ||
    language.toLowerCase().includes('tsx') ||
    language.toLowerCase().includes('svg') ||
    code.includes('<!DOCTYPE html>') ||
    code.includes('<html');

  const handleOpenArtifact = () => {
    setActiveArtifact({
      id: `art-${Date.now()}`,
      title: `${language.toUpperCase()} Artifact Preview`,
      type: language.toLowerCase().includes('svg') ? 'svg' : 'html',
      language,
      code,
      description: 'Extracted from chat response for live interactive preview and testing.',
    });
    setIsArtifactPanelOpen(true);
  };

  const lines = code.trim().split('\n');

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-slate-800 bg-[#0d1117] font-mono text-sm shadow-2xl">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/90 px-4 py-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70 inline-block" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70 inline-block" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70 inline-block" />
          <span className="ml-2 font-semibold uppercase tracking-wider text-slate-300">
            {language}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isPreviewable && (
            <button
              onClick={handleOpenArtifact}
              className="flex items-center gap-1.5 rounded-md bg-blue-500/20 px-2.5 py-1 text-xs font-medium text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 hover:text-white transition-all shadow-sm"
              title="Open in interactive Artifacts side panel"
            >
              <Play className="h-3 w-3 fill-current" />
              <span>Preview Artifact</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code body with line numbers */}
      <div className="overflow-x-auto p-4 text-xs leading-relaxed text-slate-200">
        <table className="border-collapse w-full">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-800/40">
                <td className="w-8 select-none pr-4 text-right text-slate-600 font-mono text-[11px]">
                  {idx + 1}
                </td>
                <td className="whitespace-pre font-mono">
                  {line || ' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
