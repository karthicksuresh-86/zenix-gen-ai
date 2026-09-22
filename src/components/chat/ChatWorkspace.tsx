'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { Sidebar } from './Sidebar';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { InputBar } from './InputBar';
import { ArtifactPanel } from './ArtifactPanel';
import { KnowledgeBaseModal } from '../rag/KnowledgeBaseModal';
import { MemoryVaultModal } from '../memory/MemoryVaultModal';
import { PromptLibraryModal } from '../prompts/PromptLibraryModal';
import { AdminDashboardModal } from '../admin/AdminDashboardModal';
import { AuthModal } from '../auth/AuthModal';
import { ShareModal } from './ShareModal';
import { VoiceModeModal } from './VoiceModeModal';

export function ChatWorkspace() {
  const { theme } = useApp();
  const isLight = theme === 'light';

  return (
    <div
      className={`flex h-screen w-screen overflow-hidden transition-colors ${
        isLight ? 'bg-[#ffffff] text-zinc-900' : 'bg-[#000000] text-white'
      }`}
    >
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Chat Center Column */}
      <div
        className={`flex flex-col flex-1 h-full min-w-0 relative transition-colors ${
          isLight ? 'bg-[#ffffff]' : 'bg-[#000000]'
        }`}
      >
        <ChatHeader />
        <MessageList />
        <InputBar />
      </div>

      {/* Claude-Style Artifacts Side Panel */}
      <ArtifactPanel />

      {/* Feature Modals */}
      <KnowledgeBaseModal />
      <MemoryVaultModal />
      <PromptLibraryModal />
      <AdminDashboardModal />
      <AuthModal />
      <ShareModal />
      <VoiceModeModal />
    </div>
  );
}

