'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Brain, Plus, Trash2, X, Check, ShieldCheck, ToggleLeft, ToggleRight } from 'lucide-react';
import { UserMemory } from '@/types';

export function MemoryVaultModal() {
  const { activeModal, setActiveModal, userMemories, addUserMemory, deleteUserMemory, toggleUserMemory, theme } = useApp();
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
      <div className={`relative flex flex-col w-full max-w-2xl h-[620px] rounded-3xl border shadow-2xl overflow-hidden transition-colors ${
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
          <div className="flex items-center gap-3">
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${
              theme === 'light'
                ? 'bg-amber-100 border-amber-300 text-amber-800'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300'
            }`}>
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <h2 className={`text-base font-bold flex items-center gap-2 ${theme === 'light' ? 'text-stone-900' : 'text-white'}`}>
                Zenix Long-Term Memory Vault
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold border ${
                  theme === 'light'
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : 'bg-zinc-900 text-zinc-300 border-zinc-700'
                }`}>
                  {userMemories.filter((m) => m.isActive).length} Active Memories
                </span>
              </h2>
              <p className={`text-xs ${theme === 'light' ? 'text-stone-500' : 'text-zinc-400'}`}>
                Personalized facts, preferred coding styles, and architectural preferences remembered across chats.
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
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Add Memory Form */}
        <form onSubmit={handleAdd} className={`border-b p-5 space-y-3 ${
          theme === 'light'
            ? 'border-amber-200/80 bg-stone-50/80'
            : 'border-zinc-800 bg-zinc-950'
        }`}>
          <div className="flex gap-2">
            <input
              type="text"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="e.g. Always generate React code using Tailwind CSS and Lucide icons..."
              className={`flex-1 rounded-xl border px-4 py-2.5 text-xs focus:outline-none ${
                theme === 'light'
                  ? 'bg-white border-amber-200 text-stone-900 placeholder-stone-400 focus:border-amber-500'
                  : 'bg-black border-zinc-800 text-white placeholder-zinc-600 focus:border-zinc-500'
              }`}
              required
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as any)}
              className={`rounded-xl border px-3 py-2.5 text-xs focus:outline-none ${
                theme === 'light'
                  ? 'bg-white border-amber-200 text-stone-800 focus:border-amber-500'
                  : 'bg-black border-zinc-800 text-zinc-300 focus:border-zinc-500'
              }`}
            >
              <option value="coding">Coding</option>
              <option value="work">Work</option>
              <option value="preference">Preference</option>
              <option value="personal">Personal</option>
              <option value="custom">Custom</option>
            </select>
            <button
              type="submit"
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md active:scale-95 ${
                theme === 'light'
                  ? 'gold-gradient text-white shadow-amber-500/20 hover:brightness-105'
                  : 'bg-white hover:bg-zinc-200 text-black shadow-zinc-900/50'
              }`}
            >
              <Plus className="h-4 w-4" />
              <span>Remember</span>
            </button>
          </div>
        </form>

        {/* Memory List */}
        <div className={`flex-1 overflow-y-auto p-6 space-y-3 ${
          theme === 'light' ? 'bg-white' : 'bg-black'
        }`}>
          {userMemories.map((mem) => (
            <div
              key={mem.id}
              className={`flex items-center justify-between rounded-2xl border p-4 transition-all ${
                mem.isActive
                  ? theme === 'light'
                    ? 'bg-amber-50/40 border-amber-200 text-stone-800'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-200'
                  : theme === 'light'
                    ? 'bg-stone-50 border-stone-200 text-stone-400'
                    : 'bg-zinc-950/40 border-zinc-900 text-zinc-600'
              }`}
            >
              <div className="flex items-start gap-3 flex-1 pr-4">
                <span
                  className={`mt-0.5 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
                    theme === 'light'
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-zinc-900 text-zinc-300 border-zinc-700'
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
                  className={`transition-colors ${
                    theme === 'light' ? 'text-stone-400 hover:text-amber-800' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {mem.isActive ? (
                    <ToggleRight className={`h-6 w-6 ${theme === 'light' ? 'text-amber-600' : 'text-zinc-200'}`} />
                  ) : (
                    <ToggleLeft className="h-6 w-6 opacity-40" />
                  )}
                </button>
                <button
                  onClick={() => deleteUserMemory(mem.id)}
                  title="Delete Memory"
                  className={`rounded-lg p-1.5 transition-colors ${
                    theme === 'light'
                      ? 'text-stone-400 hover:bg-amber-100 hover:text-rose-600'
                      : 'text-zinc-500 hover:bg-zinc-900 hover:text-rose-400'
                  }`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          {userMemories.length === 0 && (
            <div className={`flex flex-col items-center justify-center h-48 text-xs ${
              theme === 'light' ? 'text-stone-400' : 'text-zinc-600'
            }`}>
              <Brain className="h-8 w-8 mb-2 opacity-50" />
              No memories recorded yet. Add your first memory above.
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className={`border-t px-6 py-3 text-[11px] flex items-center justify-between ${
          theme === 'light'
            ? 'border-amber-200/80 bg-stone-50 text-stone-500'
            : 'border-zinc-900 bg-zinc-950 text-zinc-500'
        }`}>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className={`h-3.5 w-3.5 ${theme === 'light' ? 'text-amber-600' : 'text-emerald-400'}`} />
            Zero training on user memories. Encrypted client-side.
          </span>
          <span>Zenix Memory Engine v2</span>
        </div>
      </div>
    </div>
  );
}
