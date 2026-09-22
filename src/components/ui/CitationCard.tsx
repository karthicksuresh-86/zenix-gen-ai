'use client';

import React, { useState } from 'react';
import { Citation } from '@/types';
import { ExternalLink, Globe } from 'lucide-react';

interface CitationPillProps {
  citations: Citation[];
}

export function CitationPills({ citations }: CitationPillProps) {
  const [activeCitation, setActiveCitation] = useState<Citation | null>(null);

  if (!citations || citations.length === 0) return null;

  return (
    <div className="my-3">
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
        <Globe className="h-3.5 w-3.5 text-purple-400" />
        <span>Sources & Citations ({citations.length})</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {citations.map((c, idx) => (
          <div key={c.id || idx} className="relative group">
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActiveCitation(c)}
              onMouseLeave={() => setActiveCitation(null)}
              className="flex items-center gap-2 rounded-lg bg-slate-900/90 border border-slate-800/80 px-2.5 py-1.5 text-xs text-slate-300 hover:border-purple-500/50 hover:bg-slate-800/90 hover:text-white transition-all shadow-sm"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-purple-500/20 text-[10px] font-bold text-purple-300 border border-purple-500/30">
                {idx + 1}
              </span>
              <span className="max-w-[130px] truncate font-medium text-slate-200">
                {c.title}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {c.domain}
              </span>
              <ExternalLink className="h-3 w-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            {/* Hover popup preview card */}
            <div className="pointer-events-none absolute bottom-full left-0 z-50 mb-2 hidden w-72 rounded-xl border border-slate-700 bg-slate-900/95 p-3.5 text-xs text-slate-300 shadow-2xl backdrop-blur-xl group-hover:block transition-all animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                <span className="font-semibold text-purple-300 truncate max-w-[180px]">
                  {c.domain}
                </span>
                {c.publishDate && (
                  <span className="text-[10px] text-slate-500">
                    {c.publishDate}
                  </span>
                )}
              </div>
              <p className="font-medium text-white mb-1.5 leading-snug line-clamp-2">
                {c.title}
              </p>
              <p className="text-slate-400 text-[11px] leading-relaxed line-clamp-3">
                {c.snippet}
              </p>
              <div className="mt-2 text-[10px] text-purple-400 flex items-center gap-1">
                <span>Click to open source page</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
