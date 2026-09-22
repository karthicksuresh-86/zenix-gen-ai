'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Brain, Plus, Trash2, X, Check, ShieldCheck, ToggleLeft, ToggleRight } from 'lucide-react';
import { UserMemory } from '@/types';

export function MemoryVaultModal() {
  const { activeModal, setActiveModal, userMemories, addUserMemory, deleteUserMemory, toggleUserMemory } = useApp();
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<UserMemory['category']>('coding');

  const isOpen = activeModal === 'memory';
  if (!isOpen) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;
    addUserMemory(newContent.trim(), newCategory);
    setNewContent('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-2xl p-4 animate-in fade-in duration-200">
      <div className="relative flex flex-col w-full max-w-2xl h-[620px] rounded-3xl border border-slate-800 bg-[#0a0e17] shadow-2xl glass-card overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Zenix Long-Term Memory Vault
                <span className="rounded-full bg-cyan-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-cyan-300 border border-cyan-500/30">
                  {userMemories.filter((m) => m.isActive).length} Active Memories
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Personalized facts, preferred coding styles, and architectural preferences remembered across chats.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Add Memory Form */}
        <form onSubmit={handleAdd} className="border-b border-slate-800 bg-slate-950/70 p-5 space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="e.g. Always generate React code using Tailwind CSS and Lucide icons..."
              className="flex-1 rounded-xl bg-slate-900 border border-slate-800 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              required
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as any)}
              className="rounded-xl bg-slate-900 border border-slate-800 px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="coding">Coding</option>
              <option value="work">Work</option>
              <option value="preference">Preference</option>
              <option value="personal">Personal</option>
              <option value="custom">Custom</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-cyan-600 text-xs font-semibold text-white hover:bg-cyan-500 transition-all flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
            >
              <Plus className="h-4 w-4" />
              <span>Remember</span>
            </button>
          </div>
        </form>

        {/* Memory List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {userMemories.map((mem) => (
            <div
              key={mem.id}
              className={`flex items-center justify-between rounded-2xl border p-4 transition-all ${
                mem.isActive
                  ? 'bg-slate-900/80 border-slate-800 text-slate-200'
                  : 'bg-slate-950/40 border-slate-900 text-slate-500'
              }`}
            >
              <div className="flex items-start gap-3 flex-1 pr-4">
                <span
                  className={`mt-0.5 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    mem.category === 'coding'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : mem.category === 'work'
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}
                >
                  {mem.category}
                </span>
                <p className="text-xs leading-relaxed">{mem.content}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleUserMemory(mem.id)}
                  title={mem.isActive ? 'Disable Memory' : 'Enable Memory'}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {mem.isActive ? (
                    <ToggleRight className="h-6 w-6 text-cyan-400" />
                  ) : (
                    <ToggleLeft className="h-6 w-6 text-slate-600" />
                  )}
                </button>
                <button
                  onClick={() => deleteUserMemory(mem.id)}
                  title="Delete Memory"
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-800 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          {userMemories.length === 0 && (
            <div className="flex flex-col items-center justify-center h-48 text-slate-500 text-xs">
              <Brain className="h-8 w-8 text-slate-600 mb-2" />
              No memories recorded yet. Add your first memory above.
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="border-t border-slate-800/80 bg-slate-950/80 px-6 py-3 text-[11px] text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            Zero training on user memories. Encrypted client-side.
          </span>
          <span>Zenix Memory Engine v2</span>
        </div>
      </div>
    </div>
  );
}
