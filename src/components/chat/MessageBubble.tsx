'use client';

import React, { useState } from 'react';
import { Message } from '@/types';
import { useApp } from '@/lib/store';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { CitationPills } from '@/components/ui/CitationCard';
import {
  BrainCircuit,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  FileText,
  GitFork,
  Image as ImageIcon,
  RotateCcw,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  User,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const { regenerateMessage, likeMessage, createNewChat, isStreaming } = useApp();
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThoughtOpen, setIsThoughtOpen] = useState(false);

  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeech = () => {
    if (typeof window === 'undefined') return;
    const synth = window.speechSynthesis;
    if (!synth) return;

    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }

    const cleanText = message.content.replace(/[*#`_\[\]]/g, '').slice(0, 400);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    synth.speak(utterance);
  };

  const handleForkChat = () => {
    createNewChat(`Branch from: ${message.content.slice(0, 40)}...`);
  };

  if (isUser) {
    return (
      <div className="flex justify-end gap-3 px-4 py-3 group">
        <div className="flex flex-col items-end max-w-2xl">
          {/* Attachments preview if any */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {message.attachments.map((att) => (
                <div
                  key={att.id}
                  className="flex items-center gap-2 rounded-xl bg-slate-800/90 border border-slate-700/80 px-3 py-1.5 text-xs text-slate-200"
                >
                  {att.type === 'image' ? (
                    <ImageIcon className="h-3.5 w-3.5 text-blue-400" />
                  ) : (
                    <FileText className="h-3.5 w-3.5 text-purple-400" />
                  )}
                  <span className="font-medium truncate max-w-[160px]">{att.name}</span>
                </div>
              ))}
            </div>
          )}

          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-white text-[14.5px] leading-relaxed shadow-lg shadow-blue-500/15">
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>

          <span className="text-[10px] text-slate-500 mt-1 font-mono">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-bold text-xs mt-1">
          <User className="h-4 w-4" />
        </div>
      </div>
    );
  }

  // Assistant Bubble
  return (
    <div className="flex justify-start gap-3.5 px-4 py-3 group">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xs shadow-lg shadow-blue-500/20 mt-1">
        <Sparkles className="h-4 w-4" />
      </div>

      <div className="flex flex-col flex-1 max-w-3xl min-w-0">
        {/* Model Tag */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="font-bold text-xs text-white">Zenix AI</span>
          {message.modelId && (
            <span className="rounded bg-slate-800/80 px-1.5 py-0.2 text-[9px] text-slate-400 font-mono border border-slate-700/50">
              {message.modelId}
            </span>
          )}
          {message.modeId && (
            <span className="rounded bg-blue-500/15 px-1.5 py-0.2 text-[9px] text-blue-400 font-mono border border-blue-500/20">
              {message.modeId}
            </span>
          )}
        </div>

        {/* Thought Process Disclosure if present */}
        {message.thoughtProcess && (
          <div className="mb-3 rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-3 text-xs text-cyan-200">
            <button
              onClick={() => setIsThoughtOpen(!isThoughtOpen)}
              className="flex items-center justify-between w-full font-semibold text-cyan-300 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <BrainCircuit className="h-3.5 w-3.5" />
                <span>Deep Thinking Process</span>
              </div>
              {isThoughtOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
            {isThoughtOpen && (
              <pre className="mt-2 text-[11px] font-mono whitespace-pre-wrap leading-relaxed border-t border-cyan-500/20 pt-2 text-cyan-200/90">
                {message.thoughtProcess}
              </pre>
            )}
          </div>
        )}

        {/* Sources & Citations if present */}
        {message.citations && message.citations.length > 0 && (
          <CitationPills citations={message.citations} />
        )}

        {/* Message Markdown Body */}
        <div className="rounded-2xl bg-slate-900/40 border border-slate-800/60 p-4 shadow-sm">
          <MarkdownRenderer content={message.content} />
          {message.isStreaming && (
            <span className="inline-block h-3.5 w-1.5 bg-blue-400 animate-pulse ml-1 align-middle" />
          )}
        </div>

        {/* Action Toolbar */}
        {!message.isStreaming && message.content && (
          <div className="flex items-center gap-1 mt-2 text-slate-400 opacity-90 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 rounded-lg p-1.5 text-xs hover:bg-slate-800 hover:text-white transition-colors"
              title="Copy response"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            </button>

            <button
              onClick={handleSpeech}
              className="flex items-center gap-1 rounded-lg p-1.5 text-xs hover:bg-slate-800 hover:text-white transition-colors"
              title={isSpeaking ? 'Stop Audio' : 'Read aloud with Speech Synthesis'}
            >
              {isSpeaking ? (
                <VolumeX className="h-3.5 w-3.5 text-rose-400" />
              ) : (
                <Volume2 className="h-3.5 w-3.5" />
              )}
            </button>

            <button
              onClick={() => likeMessage(message.id, true)}
              className={`rounded-lg p-1.5 text-xs hover:bg-slate-800 transition-colors ${
                message.likes === true ? 'text-blue-400' : 'hover:text-white'
              }`}
              title="Helpful"
            >
              <ThumbsUp className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={() => likeMessage(message.id, false)}
              className={`rounded-lg p-1.5 text-xs hover:bg-slate-800 transition-colors ${
                message.likes === false ? 'text-rose-400' : 'hover:text-white'
              }`}
              title="Not helpful"
            >
              <ThumbsDown className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={() => regenerateMessage(message.id)}
              disabled={isStreaming}
              className="rounded-lg p-1.5 text-xs hover:bg-slate-800 hover:text-white transition-colors ml-1"
              title="Regenerate answer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={handleForkChat}
              className="rounded-lg p-1.5 text-xs hover:bg-slate-800 hover:text-white transition-colors"
              title="Fork into new branch"
            >
              <GitFork className="h-3.5 w-3.5" />
            </button>

            {message.tokenCount && (
              <span className="text-[10px] text-slate-600 font-mono ml-auto">
                ~{message.tokenCount} tokens
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
