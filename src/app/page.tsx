'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { LandingPage } from '@/components/landing/LandingPage';
import { ChatWorkspace } from '@/components/chat/ChatWorkspace';

export default function Home() {
  const { currentView } = useApp();

  if (currentView === 'landing') {
    return <LandingPage />;
  }

  return <ChatWorkspace />;
}
