'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import {
  BookOpen,
  Briefcase,
  Code,
  Layout,
  MessageSquare,
  Plus,
  Search,
  Sparkles,
  TrendingUp,
  X,
  Zap,
} from 'lucide-react';
import { PromptTemplate } from '@/types';

export function PromptLibraryModal() {
  const { activeModal, setActiveModal, promptLibrary, addPromptTemplate, createNewChat, sendMessage } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<PromptTemplate['category']>('Coding');
  const [newDescription, setNewDescription] = useState('');
  const [newPrompt, setNewPrompt] = useState('');

  const isOpen = activeModal === 'prompts';
  if (!isOpen) return null;

  const categories = ['All', 'Coding', 'Marketing', 'Writing', 'Business', 'Education', 'Productivity'];

  const filteredPrompts = promptLibrary.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.prompt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleUsePrompt = (promptText: string) => {
    setActiveModal(null);
    createNewChat(promptText);
  };

  const handleSaveCustomPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrompt.trim()) return;

    const tpl: PromptTemplate = {
      id: `p-custom-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      description: newDescription || 'Custom user prompt template',
      prompt: newPrompt,
      tags: ['Custom', newCategory],
      iconName: 'Sparkles',
    };

    addPromptTemplate(tpl);
    setIsCreating(false);
    setNewTitle('');
    setNewDescription('');
    setNewPrompt('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-2xl p-4 animate-in fade-in duration-200">
      <div className="relative flex flex-col w-full max-w-4xl h-[680px] rounded-3xl border border-slate-800 bg-[#0a0e17] shadow-2xl glass-card overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Zenix Prompt Intelligence Library
                <span className="rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-blue-300 border border-blue-500/30">
                  {promptLibrary.length} Curated Prompts
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                High-leverage prompts across engineering, copywriting, marketing, strategy, and deep research.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCreating(!isCreating)}
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition-all shadow-md shadow-blue-500/20"
            >
              <Plus className="h-4 w-4" />
              <span>{isCreating ? 'View All' : 'Create Custom'}</span>
            </button>
            <button
              onClick={() => setActiveModal(null)}
              className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Search & Categories Bar */}
        {!isCreating && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 border-b border-slate-800 bg-slate-950/60 px-6 py-3">
            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search input */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search prompts..."
                className="w-full rounded-xl bg-slate-900 border border-slate-800 pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {isCreating ? (
            <form onSubmit={handleSaveCustomPrompt} className="max-w-2xl mx-auto space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-400" />
                Add New Prompt Template
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Prompt Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Next.js 15 Server Action Generator"
                    className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Coding">Coding</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Writing">Writing</option>
                    <option value="Business">Business</option>
                    <option value="Education">Education</option>
                    <option value="Productivity">Productivity</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block">Description</label>
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Brief summary of what this prompt accomplishes..."
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block">Prompt Instructions</label>
                <textarea
                  value={newPrompt}
                  onChange={(e) => setNewPrompt(e.target.value)}
                  placeholder="Write the full AI prompt here..."
                  rows={6}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-xs text-white focus:outline-none focus:border-blue-500 resize-none font-mono"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-xs font-semibold text-white hover:bg-blue-500 shadow-lg shadow-blue-500/25"
                >
                  Save Prompt
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPrompts.map((p) => (
                <div
                  key={p.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 hover:border-blue-500/40 hover:bg-slate-900/90 transition-all duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="rounded-md bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-400 border border-blue-500/20 uppercase tracking-wider">
                        {p.category}
                      </span>
                      <div className="flex items-center gap-1">
                        {p.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] text-slate-400 font-mono"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-1.5 group-hover:text-blue-300 transition-colors">
                      {p.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                      {p.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleUsePrompt(p.prompt)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-800/90 border border-slate-700/60 py-2 text-xs font-semibold text-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all shadow-sm"
                  >
                    <Zap className="h-3.5 w-3.5 fill-current" />
                    <span>Use This Prompt</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
