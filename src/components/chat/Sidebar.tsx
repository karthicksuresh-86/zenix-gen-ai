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
  Moon,
  Pin,
  Plus,
  Search,
  Settings,
  Sparkles,
  Sun,
  Trash2,
  User,
  Zap,
} from 'lucide-react';

export function Sidebar() {
  const {
    theme,
    toggleTheme,
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

  const isLight = theme === 'light';

  const filteredSessions = sessions.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedSessions = filteredSessions.filter((s) => s.pinned);
  const unpinnedSessions = filteredSessions.filter((s) => !s.pinned);

  const tokenPercent = Math.min(100, Math.round((userProfile.tokensUsedThisMonth / userProfile.tokenLimit) * 100));

  if (isCollapsed) {
    return (
      <div
        className={`flex flex-col items-center justify-between h-full w-16 border-r py-4 shrink-0 transition-all z-20 ${
          isLight
            ? 'border-amber-500/20 bg-[#faf8f5]'
            : 'border-white/[0.08] bg-[#000000]'
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => setCurrentView('landing')}
            className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold text-white shadow-lg transition-transform hover:scale-105 ${
              isLight
                ? 'bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-500 shadow-amber-500/20'
                : 'bg-white text-black font-black shadow-white/10'
            }`}
            title="Zenix AI Home"
          >
            Z
          </button>

          <button
            onClick={() => createNewChat()}
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
              isLight
                ? 'bg-amber-100 text-amber-900 border-amber-400 hover:bg-amber-600 hover:text-white'
                : 'bg-white/10 text-white border-white/20 hover:bg-white hover:text-black'
            }`}
            title="New Chat"
          >
            <Plus className="h-5 w-5" />
          </button>

          <button
            onClick={() => setActiveModal('knowledge')}
            className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
              isLight
                ? 'bg-white text-zinc-700 border border-amber-500/20 hover:text-amber-600'
                : 'bg-[#0a0a0a] text-zinc-400 border border-white/[0.08] hover:text-white'
            }`}
            title="RAG Knowledge Base"
          >
            <Database className="h-4 w-4" />
          </button>

          <button
            onClick={() => setActiveModal('prompts')}
            className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
              isLight
                ? 'bg-white text-zinc-700 border border-amber-500/20 hover:text-amber-600'
                : 'bg-[#0a0a0a] text-zinc-400 border border-white/[0.08] hover:text-white'
            }`}
            title="Prompt Library"
          >
            <Sparkles className="h-4 w-4" />
          </button>

          <button
            onClick={() => setActiveModal('memory')}
            className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
              isLight
                ? 'bg-white text-zinc-700 border border-amber-500/20 hover:text-amber-600'
                : 'bg-[#0a0a0a] text-zinc-400 border border-white/[0.08] hover:text-white'
            }`}
            title="Memory Vault"
          >
            <Brain className="h-4 w-4" />
          </button>

          <button
            onClick={toggleTheme}
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
              isLight
                ? 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
                : 'bg-[#0a0a0a] text-zinc-300 border-white/[0.1] hover:text-white'
            }`}
            title={isLight ? 'Switch to Plain Black' : 'Switch to Bright Gold'}
          >
            {isLight ? <Sun className="h-4 w-4 text-amber-600" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => setIsCollapsed(false)}
            className={`rounded-lg p-1.5 transition-colors ${
              isLight ? 'text-zinc-500 hover:bg-amber-100 hover:text-zinc-950' : 'text-zinc-500 hover:bg-zinc-900 hover:text-white'
            }`}
            title="Expand Sidebar"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => setActiveModal('auth')}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
              isLight
                ? 'bg-amber-200 text-amber-950 ring-1 ring-amber-400'
                : 'bg-zinc-800 text-white ring-1 ring-white/20'
            }`}
            title="User Profile"
          >
            <User className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col justify-between h-full w-72 lg:w-80 border-r p-4 shrink-0 select-none transition-all z-20 ${
        isLight
          ? 'border-amber-500/20 bg-[#faf8f5] text-zinc-900'
          : 'border-white/[0.08] bg-[#000000] text-white'
      }`}
    >
      {/* Top Brand & Actions */}
      <div className="flex flex-col space-y-4">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-1">
          <div
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-xl font-extrabold text-base shadow-lg transition-transform group-hover:scale-105 ${
                isLight
                  ? 'bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-500 text-white shadow-amber-500/25'
                  : 'bg-white text-black font-black shadow-white/10'
              }`}
            >
              Z
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`font-extrabold tracking-wide text-base ${
                    isLight ? 'text-zinc-950' : 'text-white'
                  }`}
                >
                  Zenix AI
                </span>
                <span
                  className={`rounded px-1.5 py-0.2 text-[9px] font-bold border ${
                    isLight
                      ? 'bg-amber-500/15 text-amber-800 border-amber-500/30'
                      : 'bg-white/10 text-white border-white/20'
                  }`}
                >
                  PRO
                </span>
              </div>
              <p className={`text-[10px] font-medium ${isLight ? 'text-amber-800/80' : 'text-zinc-500'}`}>
                Neural Intelligence Suite
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCollapsed(true)}
            className={`rounded-lg p-1.5 transition-colors ${
              isLight
                ? 'text-zinc-500 hover:bg-amber-100 hover:text-zinc-900'
                : 'text-zinc-500 hover:bg-[#121212] hover:text-white'
            }`}
            title="Collapse Sidebar"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        {/* New Chat Button */}
        <button
          onClick={() => createNewChat()}
          className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-xs font-bold shadow-lg transition-all duration-200 active:scale-[0.98] ${
            isLight
              ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-white shadow-amber-500/25 hover:opacity-95'
              : 'bg-white text-black font-extrabold shadow-white/10 hover:bg-zinc-200'
          }`}
        >
          <Plus className="h-4 w-4" />
          <span>Start New Chat</span>
        </button>

        {/* Search Chats */}
        <div className="relative">
          <Search className={`absolute left-3 top-2.5 h-3.5 w-3.5 ${isLight ? 'text-amber-600/60' : 'text-zinc-500'}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className={`w-full rounded-xl pl-8 pr-3 py-2 text-xs transition-all focus:outline-none ${
              isLight
                ? 'bg-white border border-amber-500/25 text-zinc-900 placeholder-zinc-400 focus:border-amber-500'
                : 'bg-[#080808] border border-white/[0.08] text-white placeholder-zinc-600 focus:border-white/30'
            }`}
          />
        </div>

        {/* Navigation Quick Access Tools */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => setActiveModal('knowledge')}
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs border transition-all ${
              isLight
                ? 'bg-white border-amber-500/20 text-zinc-800 hover:border-amber-500/50 hover:bg-amber-50'
                : 'bg-[#080808] border-white/[0.08] text-zinc-300 hover:border-white/20 hover:bg-[#121212] hover:text-white'
            }`}
          >
            <Database className={`h-3.5 w-3.5 ${isLight ? 'text-amber-600' : 'text-zinc-300'}`} />
            <span className="truncate font-medium">RAG System</span>
          </button>

          <button
            onClick={() => setActiveModal('prompts')}
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs border transition-all ${
              isLight
                ? 'bg-white border-amber-500/20 text-zinc-800 hover:border-amber-500/50 hover:bg-amber-50'
                : 'bg-[#080808] border-white/[0.08] text-zinc-300 hover:border-white/20 hover:bg-[#121212] hover:text-white'
            }`}
          >
            <Sparkles className={`h-3.5 w-3.5 ${isLight ? 'text-amber-600' : 'text-zinc-300'}`} />
            <span className="truncate font-medium">Prompts</span>
          </button>

          <button
            onClick={() => setActiveModal('memory')}
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs border transition-all ${
              isLight
                ? 'bg-white border-amber-500/20 text-zinc-800 hover:border-amber-500/50 hover:bg-amber-50'
                : 'bg-[#080808] border-white/[0.08] text-zinc-300 hover:border-white/20 hover:bg-[#121212] hover:text-white'
            }`}
          >
            <Brain className={`h-3.5 w-3.5 ${isLight ? 'text-amber-600' : 'text-zinc-300'}`} />
            <span className="truncate font-medium">Memory Vault</span>
          </button>

          <button
            onClick={() => setActiveModal('admin')}
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs border transition-all ${
              isLight
                ? 'bg-white border-amber-500/20 text-zinc-800 hover:border-amber-500/50 hover:bg-amber-50'
                : 'bg-[#080808] border-white/[0.08] text-zinc-300 hover:border-white/20 hover:bg-[#121212] hover:text-white'
            }`}
          >
            <Activity className={`h-3.5 w-3.5 ${isLight ? 'text-amber-600' : 'text-zinc-300'}`} />
            <span className="truncate font-medium">Telemetry</span>
          </button>
        </div>
      </div>

      {/* Middle: Sessions List */}
      <div className="flex-1 overflow-y-auto py-3 space-y-4 pr-1 my-2">
        {/* Pinned Chats */}
        {pinnedSessions.length > 0 && (
          <div>
            <div
              className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider px-2 mb-1.5 ${
                isLight ? 'text-amber-800' : 'text-zinc-500'
              }`}
            >
              <Pin className="h-3 w-3 text-amber-500" />
              <span>Pinned Conversations</span>
            </div>
            <div className="space-y-1">
              {pinnedSessions.map((s) => (
                <SessionRow
                  key={s.id}
                  session={s}
                  isLight={isLight}
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
          <div
            className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider px-2 mb-1.5 ${
              isLight ? 'text-zinc-500' : 'text-zinc-500'
            }`}
          >
            <MessageSquare className="h-3 w-3" />
            <span>Recent Chats</span>
          </div>
          <div className="space-y-1">
            {unpinnedSessions.map((s) => (
              <SessionRow
                key={s.id}
                session={s}
                isLight={isLight}
                isActive={s.id === currentSessionId}
                onSelect={() => selectSession(s.id)}
                onDelete={() => deleteSession(s.id)}
                onPin={() => pinSession(s.id)}
              />
            ))}
            {unpinnedSessions.length === 0 && pinnedSessions.length === 0 && (
              <div className={`px-3 py-6 text-center text-xs ${isLight ? 'text-zinc-400' : 'text-zinc-600'}`}>
                No matching conversations.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom User Card & Usage Meter */}
      <div className={`border-t pt-3 space-y-3 ${isLight ? 'border-amber-500/20' : 'border-white/[0.08]'}`}>
        {/* Usage Bar */}
        <div
          className={`rounded-xl border p-2.5 text-xs ${
            isLight
              ? 'bg-white border-amber-500/20'
              : 'bg-[#080808] border-white/[0.08]'
          }`}
        >
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className={`font-medium ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>Monthly Quota</span>
            <span className={`font-mono font-bold ${isLight ? 'text-amber-700' : 'text-white'}`}>{tokenPercent}%</span>
          </div>
          <div className={`h-1.5 w-full rounded-full overflow-hidden ${isLight ? 'bg-amber-100' : 'bg-[#181818]'}`}>
            <div
              className={`h-full rounded-full transition-all ${
                isLight
                  ? 'bg-gradient-to-r from-amber-600 to-yellow-500'
                  : 'bg-white'
              }`}
              style={{ width: `${tokenPercent}%` }}
            />
          </div>
          <div className={`flex items-center justify-between text-[10px] mt-1.5 font-mono ${isLight ? 'text-zinc-500' : 'text-zinc-500'}`}>
            <span>{(userProfile.tokensUsedThisMonth / 1000).toFixed(0)}k used</span>
            <span>{(userProfile.tokenLimit / 1000).toFixed(0)}k limit</span>
          </div>
        </div>

        {/* User Card */}
        <div
          onClick={() => setActiveModal('auth')}
          className={`flex items-center justify-between rounded-2xl border p-2.5 cursor-pointer transition-all ${
            isLight
              ? 'bg-white border-amber-500/25 hover:border-amber-500 hover:shadow-sm'
              : 'bg-[#080808] border-white/[0.08] hover:border-white/20'
          }`}
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-bold text-xs ${
                isLight
                  ? 'bg-gradient-to-tr from-amber-600 to-yellow-500 text-white'
                  : 'bg-white text-black'
              }`}
            >
              {userProfile.name.charAt(0)}
            </div>
            <div className="truncate">
              <span className={`font-semibold text-xs block truncate ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                {userProfile.name}
              </span>
              <span className={`text-[10px] truncate block ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                {userProfile.email}
              </span>
            </div>
          </div>

          <Settings className={`h-4 w-4 transition-colors shrink-0 ${isLight ? 'text-amber-700 hover:text-amber-900' : 'text-zinc-400 hover:text-white'}`} />
        </div>
      </div>
    </div>
  );
}

function SessionRow({
  session,
  isLight,
  isActive,
  onSelect,
  onDelete,
  onPin,
}: {
  session: any;
  isLight: boolean;
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
          ? isLight
            ? 'bg-amber-100/70 border-amber-400 text-amber-950 font-semibold shadow-sm'
            : 'bg-white/10 border-white/25 text-white font-medium shadow-sm'
          : isLight
          ? 'border-transparent text-zinc-700 hover:bg-amber-50/80 hover:text-zinc-950'
          : 'border-transparent text-zinc-400 hover:bg-[#101010] hover:text-white'
      }`}
    >
      <div className="flex items-center gap-2 truncate pr-2">
        <MessageSquare
          className={`h-3.5 w-3.5 shrink-0 ${
            isActive
              ? isLight ? 'text-amber-700' : 'text-white'
              : isLight ? 'text-amber-600/60 group-hover:text-amber-800' : 'text-zinc-600 group-hover:text-zinc-300'
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
          className={`p-1 hover:text-amber-500 ${
            session.pinned ? 'text-amber-500' : isLight ? 'text-zinc-400' : 'text-zinc-600'
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
          className="p-1 text-zinc-500 hover:text-rose-500"
          title="Delete Chat"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

