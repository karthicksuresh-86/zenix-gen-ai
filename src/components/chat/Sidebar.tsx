'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import {
  Activity,
  Brain,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Database,
  MessageSquare,
  MessageSquarePlus,
  Pin,
  Plus,
  Search,
  Settings,
  Sparkles,
  Trash2,
  User,
  Zap,
} from 'lucide-react';

export function Sidebar() {
  const {
    sessions,
    currentSessionId,
    selectSession,
    deleteSession,
    pinSession,
    createNewChat,
    setActiveModal,
    userProfile,
    setCurrentView,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filteredSessions = sessions.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedSessions = filteredSessions.filter((s) => s.pinned);
  const unpinnedSessions = filteredSessions.filter((s) => !s.pinned);

  const tokenPercent = Math.min(100, Math.round((userProfile.tokensUsedThisMonth / userProfile.tokenLimit) * 100));

  if (isCollapsed) {
    return (
      <div className="flex flex-col items-center justify-between h-full w-16 border-r border-slate-800/80 bg-[#07090e]/95 py-4 shrink-0 transition-all z-20">
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => setCurrentView('landing')}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 font-bold text-white shadow-lg shadow-blue-500/25 hover:scale-105 transition-transform"
            title="Zenix AI Home"
          >
            Z
          </button>

          <button
            onClick={() => createNewChat()}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white transition-all"
            title="New Chat"
          >
            <Plus className="h-5 w-5" />
          </button>

          <button
            onClick={() => setActiveModal('knowledge')}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-purple-400 transition-all"
            title="RAG Knowledge Base"
          >
            <Database className="h-4 w-4" />
          </button>

          <button
            onClick={() => setActiveModal('prompts')}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-blue-400 transition-all"
            title="Prompt Library"
          >
            <Sparkles className="h-4 w-4" />
          </button>

          <button
            onClick={() => setActiveModal('memory')}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-cyan-400 transition-all"
            title="Memory Vault"
          >
            <Brain className="h-4 w-4" />
          </button>

          <button
            onClick={() => setActiveModal('admin')}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-indigo-400 transition-all"
            title="Admin Dashboard"
          >
            <Activity className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => setIsCollapsed(false)}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-800 hover:text-white transition-colors"
            title="Expand Sidebar"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => setActiveModal('auth')}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:ring-2 hover:ring-blue-500 transition-all"
            title="User Profile"
          >
            <User className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between h-full w-72 lg:w-80 border-r border-slate-800/80 bg-[#07090e]/95 backdrop-blur-2xl p-4 shrink-0 select-none transition-all z-20">
      {/* Top Brand & Actions */}
      <div className="flex flex-col space-y-4">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-1">
          <div
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 font-extrabold text-white text-base shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              Z
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white tracking-wide text-base">Zenix AI</span>
                <span className="rounded bg-blue-500/20 px-1.5 py-0.2 text-[9px] font-bold text-blue-400 border border-blue-500/30">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Neural Intelligence Suite</p>
            </div>
          </div>

          <button
            onClick={() => setIsCollapsed(true)}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-800 hover:text-white transition-colors"
            title="Collapse Sidebar"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        {/* New Chat Button */}
        <button
          onClick={() => createNewChat()}
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 hover:from-blue-500 to-indigo-600 hover:to-indigo-500 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-200 active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          <span>Start New Chat</span>
        </button>

        {/* Search Chats */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full rounded-xl bg-slate-900/80 border border-slate-800/80 pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
          />
        </div>

        {/* Navigation Quick Access Tools */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => setActiveModal('knowledge')}
            className="flex items-center gap-2 rounded-xl bg-slate-900/60 border border-slate-800/60 px-3 py-2 text-xs text-slate-300 hover:bg-purple-950/30 hover:border-purple-500/40 hover:text-purple-300 transition-all"
          >
            <Database className="h-3.5 w-3.5 text-purple-400" />
            <span className="truncate font-medium">RAG System</span>
          </button>

          <button
            onClick={() => setActiveModal('prompts')}
            className="flex items-center gap-2 rounded-xl bg-slate-900/60 border border-slate-800/60 px-3 py-2 text-xs text-slate-300 hover:bg-blue-950/30 hover:border-blue-500/40 hover:text-blue-300 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span className="truncate font-medium">Prompts</span>
          </button>

          <button
            onClick={() => setActiveModal('memory')}
            className="flex items-center gap-2 rounded-xl bg-slate-900/60 border border-slate-800/60 px-3 py-2 text-xs text-slate-300 hover:bg-cyan-950/30 hover:border-cyan-500/40 hover:text-cyan-300 transition-all"
          >
            <Brain className="h-3.5 w-3.5 text-cyan-400" />
            <span className="truncate font-medium">Memory Vault</span>
          </button>

          <button
            onClick={() => setActiveModal('admin')}
            className="flex items-center gap-2 rounded-xl bg-slate-900/60 border border-slate-800/60 px-3 py-2 text-xs text-slate-300 hover:bg-indigo-950/30 hover:border-indigo-500/40 hover:text-indigo-300 transition-all"
          >
            <Activity className="h-3.5 w-3.5 text-indigo-400" />
            <span className="truncate font-medium">Telemetry</span>
          </button>
        </div>
      </div>

      {/* Middle: Sessions List */}
      <div className="flex-1 overflow-y-auto py-3 space-y-4 pr-1 my-2">
        {/* Pinned Chats */}
        {pinnedSessions.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-2 mb-1.5">
              <Pin className="h-3 w-3 text-amber-400" />
              <span>Pinned Conversations</span>
            </div>
            <div className="space-y-1">
              {pinnedSessions.map((s) => (
                <SessionRow
                  key={s.id}
                  session={s}
                  isActive={s.id === currentSessionId}
                  onSelect={() => selectSession(s.id)}
                  onDelete={() => deleteSession(s.id)}
                  onPin={() => pinSession(s.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Recent Chats */}
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-2 mb-1.5">
            <MessageSquare className="h-3 w-3" />
            <span>Recent Chats</span>
          </div>
          <div className="space-y-1">
            {unpinnedSessions.map((s) => (
              <SessionRow
                key={s.id}
                session={s}
                isActive={s.id === currentSessionId}
                onSelect={() => selectSession(s.id)}
                onDelete={() => deleteSession(s.id)}
                onPin={() => pinSession(s.id)}
              />
            ))}
            {unpinnedSessions.length === 0 && pinnedSessions.length === 0 && (
              <div className="px-3 py-6 text-center text-xs text-slate-500">
                No matching conversations.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom User Card & Usage Meter */}
      <div className="border-t border-slate-800/80 pt-3 space-y-3">
        {/* Usage Bar */}
        <div className="rounded-xl bg-slate-900/60 border border-slate-800/60 p-2.5 text-xs">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
            <span className="font-medium">Monthly Token Quota</span>
            <span className="font-mono text-blue-400">{tokenPercent}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
              style={{ width: `${tokenPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1.5 font-mono">
            <span>{(userProfile.tokensUsedThisMonth / 1000).toFixed(0)}k used</span>
            <span>{(userProfile.tokenLimit / 1000).toFixed(0)}k limit</span>
          </div>
        </div>

        {/* User Card */}
        <div
          onClick={() => setActiveModal('auth')}
          className="flex items-center justify-between rounded-2xl bg-slate-900/80 border border-slate-800/80 p-2.5 hover:border-slate-700 cursor-pointer transition-all"
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 font-bold text-white text-xs">
              {userProfile.name.charAt(0)}
            </div>
            <div className="truncate">
              <span className="font-semibold text-white text-xs block truncate">
                {userProfile.name}
              </span>
              <span className="text-[10px] text-slate-400 truncate block">
                {userProfile.email}
              </span>
            </div>
          </div>

          <Settings className="h-4 w-4 text-slate-500 hover:text-white transition-colors shrink-0" />
        </div>
      </div>
    </div>
  );
}

function SessionRow({
  session,
  isActive,
  onSelect,
  onDelete,
  onPin,
}: {
  session: any;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onPin: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`group relative flex items-center justify-between rounded-xl px-3 py-2 text-xs cursor-pointer border transition-all ${
        isActive
          ? 'bg-blue-600/15 border-blue-500/40 text-white font-medium shadow-sm'
          : 'border-transparent text-slate-300 hover:bg-slate-900 hover:text-white'
      }`}
    >
      <div className="flex items-center gap-2 truncate pr-2">
        <MessageSquare
          className={`h-3.5 w-3.5 shrink-0 ${
            isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'
          }`}
        />
        <span className="truncate">{session.title}</span>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPin();
          }}
          className={`p-1 hover:text-white ${
            session.pinned ? 'text-amber-400' : 'text-slate-500'
          }`}
          title={session.pinned ? 'Unpin' : 'Pin'}
        >
          <Pin className="h-3 w-3" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1 text-slate-500 hover:text-rose-400"
          title="Delete Chat"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
