export type Role = 'user' | 'assistant' | 'system';

export type ModelId = 
  | 'llama-3-70b'
  | 'deepseek-coder-v2'
  | 'qwen-2-5-72b'
  | 'mistral-large'
  | 'claude-3-5-sonnet';

export type ModeId = 
  | 'creative'
  | 'balanced'
  | 'precise'
  | 'coding'
  | 'research'
  | 'document';

export interface Citation {
  id: string;
  title: string;
  url: string;
  domain: string;
  snippet: string;
  publishDate?: string;
  favicon?: string;
  relevanceScore?: number;
}

export interface Artifact {
  id: string;
  title: string;
  type: 'html' | 'react' | 'svg' | 'code' | 'markdown';
  language: string;
  code: string;
  description?: string;
  version?: number;
}

export interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'docx' | 'txt' | 'csv' | 'code';
  size: number;
  url?: string;
  extractedText?: string;
  previewUrl?: string;
}

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
  modelId?: ModelId;
  modeId?: ModeId;
  citations?: Citation[];
  artifacts?: Artifact[];
  attachments?: Attachment[];
  likes?: boolean | null; // true for like, false for dislike, null for none
  isStreaming?: boolean;
  tokenCount?: number;
  thoughtProcess?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
  pinned?: boolean;
  modelId: ModelId;
  modeId: ModeId;
  tokenStats?: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
  };
}

export interface AIModel {
  id: ModelId;
  name: string;
  provider: string;
  tagline: string;
  badge: string;
  contextWindow: string;
  speed: string;
  reasoningScore: number;
  codingScore: number;
  iconName: string;
  accentColor: string;
}

export interface AIMode {
  id: ModeId;
  name: string;
  description: string;
  iconName: string;
  badgeColor: string;
  temperature: number;
  systemPromptAddon: string;
}

export interface UserMemory {
  id: string;
  content: string;
  category: 'preference' | 'work' | 'personal' | 'coding' | 'custom';
  createdAt: number;
  isActive: boolean;
}

export interface PromptTemplate {
  id: string;
  title: string;
  category: 'Coding' | 'Marketing' | 'Writing' | 'Business' | 'Education' | 'Productivity';
  description: string;
  prompt: string;
  tags: string[];
  iconName: string;
}

export interface DocumentChunk {
  id: string;
  docId: string;
  docTitle: string;
  chunkIndex: number;
  text: string;
  vectorSummary?: number[];
  similarityScore?: number;
}

export interface KnowledgeDoc {
  id: string;
  title: string;
  type: string;
  size: number;
  uploadedAt: number;
  chunkCount: number;
  chunks: DocumentChunk[];
  tags: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  plan: 'free' | 'pro' | 'enterprise';
  tokensUsedThisMonth: number;
  tokenLimit: number;
  customApiKey?: string;
  preferredLanguage?: string;
  preferredModel?: ModelId;
  memoryEnabled: boolean;
  webSearchDefault: boolean;
}

export interface TelemetryMetric {
  date: string;
  requests: number;
  tokens: number;
  latencyMs: number;
  costUsd: number;
}
