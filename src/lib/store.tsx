'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import {
  Artifact,
  Attachment,
  ChatSession,
  KnowledgeDoc,
  Message,
  ModelId,
  ModeId,
  PromptTemplate,
  ThemeMode,
  UserMemory,
  UserProfile,
} from '@/types';
import {
  AI_MODELS,
  AI_MODES,
  DEFAULT_PROMPT_LIBRARY,
  INITIAL_KNOWLEDGE_DOCS,
  INITIAL_USER_MEMORIES,
} from './constants';
import { generateSmartAIResponse } from './ai-engine';

type ModalType = 
  | 'auth'
  | 'knowledge'
  | 'memory'
  | 'prompts'
  | 'admin'
  | 'voice'
  | 'share'
  | 'export'
  | 'document'
  | null;

interface AppContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  currentView: 'landing' | 'chat';
  setCurrentView: (view: 'landing' | 'chat') => void;
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  currentSessionId: string | null;
  activeModelId: ModelId;
  setActiveModelId: (id: ModelId) => void;
  activeModeId: ModeId;
  setActiveModeId: (id: ModeId) => void;
  webSearchEnabled: boolean;
  setWebSearchEnabled: (enabled: boolean | ((prev: boolean) => boolean)) => void;
  deepThinkingEnabled: boolean;
  setDeepThinkingEnabled: (enabled: boolean | ((prev: boolean) => boolean)) => void;
  isStreaming: boolean;
  activeArtifact: Artifact | null;
  setActiveArtifact: (art: Artifact | null) => void;
  isArtifactPanelOpen: boolean;
  setIsArtifactPanelOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  knowledgeDocs: KnowledgeDoc[];
  userMemories: UserMemory[];
  promptLibrary: PromptTemplate[];
  userProfile: UserProfile;
  activeModal: ModalType;
  setActiveModal: (modal: ModalType) => void;
  
  // Actions
  createNewChat: (initialPrompt?: string, mode?: ModeId, model?: ModelId) => void;
  selectSession: (id: string) => void;
  deleteSession: (id: string) => void;
  pinSession: (id: string) => void;
  sendMessage: (prompt: string, attachments?: Attachment[]) => Promise<void>;
  stopGeneration: () => void;
  regenerateMessage: (messageId: string) => void;
  likeMessage: (messageId: string, isLike: boolean) => void;
  addKnowledgeDoc: (doc: KnowledgeDoc) => void;
  deleteKnowledgeDoc: (id: string) => void;
  addUserMemory: (content: string, category: UserMemory['category']) => void;
  deleteUserMemory: (id: string) => void;
  toggleUserMemory: (id: string) => void;
  addPromptTemplate: (tpl: PromptTemplate) => void;
  deletePromptTemplate: (id: string) => void;
  updateUserProfile: (data: Partial<UserProfile>) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const DEFAULT_USER: UserProfile = {
  id: 'usr-zenix-demo',
  name: 'Alex Vance',
  email: 'alex.vance@zenix.ai',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  plan: 'pro',
  tokensUsedThisMonth: 142850,
  tokenLimit: 1000000,
  memoryEnabled: true,
  webSearchDefault: false,
  preferredModel: 'claude-3-5-sonnet',
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('dark');
  const [currentView, setCurrentView] = useState<'landing' | 'chat'>('landing');
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [activeModelId, setActiveModelId] = useState<ModelId>('claude-3-5-sonnet');
  const [activeModeId, setActiveModeId] = useState<ModeId>('balanced');
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [deepThinkingEnabled, setDeepThinkingEnabled] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null);
  const [isArtifactPanelOpen, setIsArtifactPanelOpen] = useState(false);
  const [knowledgeDocs, setKnowledgeDocs] = useState<KnowledgeDoc[]>(INITIAL_KNOWLEDGE_DOCS);
  const [userMemories, setUserMemories] = useState<UserMemory[]>(INITIAL_USER_MEMORIES);
  const [promptLibrary, setPromptLibrary] = useState<PromptTemplate[]>(DEFAULT_PROMPT_LIBRARY);
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_USER);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const abortControllerRef = useRef<boolean>(false);

  // Sync theme with DOM and localStorage
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('zenix_theme') as ThemeMode;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setThemeState(savedTheme);
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(savedTheme);
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      }
    } catch {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('zenix_theme', newTheme);
    } catch {}
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };


  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedSessions = localStorage.getItem('zenix_sessions');
      if (savedSessions) {
        const parsed = JSON.parse(savedSessions);
        setSessions(parsed);
        if (parsed.length > 0) {
          setCurrentSessionId(parsed[0].id);
        }
      } else {
        // Initialize default welcome chat
        const welcomeSession: ChatSession = {
          id: 'welcome-session',
          title: 'Welcome to Zenix AI',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          pinned: true,
          modelId: 'claude-3-5-sonnet',
          modeId: 'balanced',
          messages: [
            {
              id: 'msg-welcome-1',
              role: 'assistant',
              content: `Hello Alex! I am **Zenix AI**, your unified intelligent assistant powered by multi-model reasoning, live web search citations, document intelligence, and instant interactive artifacts.

### 🚀 What would you like to explore today?
* **DeepSeek Coding:** Generate full-stack React components with live preview in the Artifacts side panel.
* **Perplexity Web Search:** Research breaking technology news and get verifiable source citations.
* **RAG Knowledge System:** Query internal whitepapers and vector databases in real-time.
* **Document & Image AI:** Upload PDFs, charts, or diagrams for deep analysis.
* **Voice Assistant:** Speak naturally using high-accuracy voice mode.

Feel free to choose a model, switch modes, or ask anything!`,
              timestamp: Date.now() - 60000,
              modelId: 'claude-3-5-sonnet',
              modeId: 'balanced',
              tokenCount: 165,
            },
          ],
        };
        setSessions([welcomeSession]);
        setCurrentSessionId(welcomeSession.id);
      }

      const savedMemories = localStorage.getItem('zenix_memories');
      if (savedMemories) setUserMemories(JSON.parse(savedMemories));

      const savedDocs = localStorage.getItem('zenix_knowledge');
      if (savedDocs) setKnowledgeDocs(JSON.parse(savedDocs));

      const savedPrompts = localStorage.getItem('zenix_prompts');
      if (savedPrompts) setPromptLibrary(JSON.parse(savedPrompts));
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }
  }, []);

  // Save sessions on change
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('zenix_sessions', JSON.stringify(sessions));
    }
  }, [sessions]);

  // Save memories on change
  useEffect(() => {
    localStorage.setItem('zenix_memories', JSON.stringify(userMemories));
  }, [userMemories]);

  // Save knowledge on change
  useEffect(() => {
    localStorage.setItem('zenix_knowledge', JSON.stringify(knowledgeDocs));
  }, [knowledgeDocs]);

  // Save custom prompts on change
  useEffect(() => {
    localStorage.setItem('zenix_prompts', JSON.stringify(promptLibrary));
  }, [promptLibrary]);

  const currentSession = sessions.find((s) => s.id === currentSessionId) || null;

  const createNewChat = (initialPrompt?: string, mode?: ModeId, model?: ModelId) => {
    const newId = `session-${Date.now()}`;
    const selectedMode = mode || activeModeId;
    const selectedModel = model || activeModelId;

    const newSession: ChatSession = {
      id: newId,
      title: initialPrompt ? (initialPrompt.length > 30 ? initialPrompt.slice(0, 30) + '...' : initialPrompt) : 'New Conversation',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      pinned: false,
      modelId: selectedModel,
      modeId: selectedMode,
      messages: [],
    };

    setSessions((prev) => [newSession, ...prev]);
    setCurrentSessionId(newId);
    setCurrentView('chat');
    setActiveArtifact(null);
    setIsArtifactPanelOpen(false);

    if (initialPrompt) {
      setTimeout(() => {
        sendMessageToSession(newId, initialPrompt, selectedModel, selectedMode);
      }, 50);
    }
  };

  const selectSession = (id: string) => {
    setCurrentSessionId(id);
    const s = sessions.find((item) => item.id === id);
    if (s) {
      setActiveModelId(s.modelId);
      setActiveModeId(s.modeId);
      // Auto-open last artifact if present
      const lastMsgWithArtifact = [...s.messages].reverse().find((m) => m.artifacts && m.artifacts.length > 0);
      if (lastMsgWithArtifact && lastMsgWithArtifact.artifacts && lastMsgWithArtifact.artifacts[0]) {
        setActiveArtifact(lastMsgWithArtifact.artifacts[0]);
      } else {
        setActiveArtifact(null);
        setIsArtifactPanelOpen(false);
      }
    }
  };

  const deleteSession = (id: string) => {
    setSessions((prev) => {
      const filtered = prev.filter((s) => s.id !== id);
      if (currentSessionId === id) {
        setCurrentSessionId(filtered.length > 0 ? filtered[0].id : null);
      }
      return filtered;
    });
  };

  const pinSession = (id: string) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, pinned: !s.pinned } : s))
    );
  };

  const stopGeneration = () => {
    abortControllerRef.current = true;
    setIsStreaming(false);
  };

  const sendMessageToSession = async (
    targetSessionId: string,
    prompt: string,
    model: ModelId,
    mode: ModeId,
    attachments?: Attachment[]
  ) => {
    const userMsgId = `msg-usr-${Date.now()}`;
    const userMessage: Message = {
      id: userMsgId,
      role: 'user',
      content: prompt,
      timestamp: Date.now(),
      attachments,
    };

    const assistantMsgId = `msg-ast-${Date.now() + 1}`;
    const initialAssistantMsg: Message = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      modelId: model,
      modeId: mode,
      isStreaming: true,
    };

    // Update session state with user message and placeholder assistant message
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === targetSessionId) {
          const isFirst = s.messages.length === 0;
          const updatedTitle = isFirst
            ? prompt.length > 32
              ? prompt.slice(0, 32) + '...'
              : prompt
            : s.title;
          return {
            ...s,
            title: updatedTitle,
            updatedAt: Date.now(),
            messages: [...s.messages, userMessage, initialAssistantMsg],
          };
        }
        return s;
      })
    );

    setIsStreaming(true);
    abortControllerRef.current = false;

    // Generate response
    const aiResult = await generateSmartAIResponse({
      prompt,
      messages: currentSession ? currentSession.messages : [],
      modelId: model,
      modeId: mode,
      webSearchEnabled,
      deepThinkingEnabled,
      attachments,
      userMemories: userMemories.filter((m) => m.isActive),
      customApiKey: userProfile.customApiKey,
    });

    // Simulate realistic token-by-token streaming
    const fullText = aiResult.content;
    const words = fullText.split(' ');
    let displayedText = '';
    const stepSize = Math.max(1, Math.floor(words.length / 40));

    for (let i = 0; i < words.length; i += stepSize) {
      if (abortControllerRef.current) break;
      const chunk = words.slice(i, i + stepSize).join(' ');
      displayedText = displayedText ? `${displayedText} ${chunk}` : chunk;

      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === targetSessionId) {
            return {
              ...s,
              messages: s.messages.map((m) =>
                m.id === assistantMsgId
                  ? {
                      ...m,
                      content: displayedText,
                      citations: aiResult.citations,
                      thoughtProcess: aiResult.thoughtProcess,
                    }
                  : m
              ),
            };
          }
          return s;
        })
      );

      // Streaming delay simulation
      await new Promise((r) => setTimeout(r, 22));
    }

    // Finalize assistant message with artifacts and completed state
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === targetSessionId) {
          return {
            ...s,
            messages: s.messages.map((m) =>
              m.id === assistantMsgId
                ? {
                    ...m,
                    content: fullText,
                    citations: aiResult.citations,
                    artifacts: aiResult.artifacts,
                    thoughtProcess: aiResult.thoughtProcess,
                    tokenCount: aiResult.tokenCount,
                    isStreaming: false,
                  }
                : m
            ),
          };
        }
        return s;
      })
    );

    // Auto-open artifact panel if artifact was produced
    if (aiResult.artifacts && aiResult.artifacts.length > 0) {
      setActiveArtifact(aiResult.artifacts[0]);
      setIsArtifactPanelOpen(true);
    }

    // Update tokens used in user profile
    setUserProfile((prev) => ({
      ...prev,
      tokensUsedThisMonth: prev.tokensUsedThisMonth + (aiResult.tokenCount || 50),
    }));

    setIsStreaming(false);
  };

  const sendMessage = async (prompt: string, attachments?: Attachment[]) => {
    if (!prompt.trim() && (!attachments || attachments.length === 0)) return;
    if (isStreaming) return;

    let targetId = currentSessionId;
    if (!targetId || !sessions.some((s) => s.id === targetId)) {
      const newId = `session-${Date.now()}`;
      const newSession: ChatSession = {
        id: newId,
        title: prompt.slice(0, 30),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        modelId: activeModelId,
        modeId: activeModeId,
        messages: [],
      };
      setSessions((prev) => [newSession, ...prev]);
      setCurrentSessionId(newId);
      targetId = newId;
    }

    await sendMessageToSession(targetId, prompt, activeModelId, activeModeId, attachments);
  };

  const regenerateMessage = (messageId: string) => {
    if (!currentSession || isStreaming) return;
    const msgIndex = currentSession.messages.findIndex((m) => m.id === messageId);
    if (msgIndex === -1) return;

    // Find the preceding user prompt
    const userPromptMsg = currentSession.messages
      .slice(0, msgIndex)
      .reverse()
      .find((m) => m.role === 'user');

    if (userPromptMsg) {
      // Remove current message and downstream
      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === currentSession.id) {
            return {
              ...s,
              messages: s.messages.slice(0, msgIndex),
            };
          }
          return s;
        })
      );
      sendMessage(userPromptMsg.content, userPromptMsg.attachments);
    }
  };

  const likeMessage = (messageId: string, isLike: boolean) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === currentSessionId) {
          return {
            ...s,
            messages: s.messages.map((m) =>
              m.id === messageId
                ? { ...m, likes: m.likes === isLike ? null : isLike }
                : m
            ),
          };
        }
        return s;
      })
    );
  };

  const addKnowledgeDoc = (doc: KnowledgeDoc) => {
    setKnowledgeDocs((prev) => [doc, ...prev]);
  };

  const deleteKnowledgeDoc = (id: string) => {
    setKnowledgeDocs((prev) => prev.filter((d) => d.id !== id));
  };

  const addUserMemory = (content: string, category: UserMemory['category']) => {
    const newMem: UserMemory = {
      id: `mem-${Date.now()}`,
      content,
      category,
      createdAt: Date.now(),
      isActive: true,
    };
    setUserMemories((prev) => [newMem, ...prev]);
  };

  const deleteUserMemory = (id: string) => {
    setUserMemories((prev) => prev.filter((m) => m.id !== id));
  };

  const toggleUserMemory = (id: string) => {
    setUserMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isActive: !m.isActive } : m))
    );
  };

  const addPromptTemplate = (tpl: PromptTemplate) => {
    setPromptLibrary((prev) => [tpl, ...prev]);
  };

  const deletePromptTemplate = (id: string) => {
    setPromptLibrary((prev) => prev.filter((p) => p.id !== id));
  };

  const updateUserProfile = (data: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...data }));
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        currentView,
        setCurrentView,
        sessions,
        currentSession,
        currentSessionId,
        activeModelId,
        setActiveModelId,
        activeModeId,
        setActiveModeId,
        webSearchEnabled,
        setWebSearchEnabled,
        deepThinkingEnabled,
        setDeepThinkingEnabled,
        isStreaming,
        activeArtifact,
        setActiveArtifact,
        isArtifactPanelOpen,
        setIsArtifactPanelOpen,
        knowledgeDocs,
        userMemories,
        promptLibrary,
        userProfile,
        activeModal,
        setActiveModal,
        createNewChat,
        selectSession,
        deleteSession,
        pinSession,
        sendMessage,
        stopGeneration,
        regenerateMessage,
        likeMessage,
        addKnowledgeDoc,
        deleteKnowledgeDoc,
        addUserMemory,
        deleteUserMemory,
        toggleUserMemory,
        addPromptTemplate,
        deletePromptTemplate,
        updateUserProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
