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
  const { theme, regenerateMessage, likeMessage, createNewChat, isStreaming } = useApp();
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThoughtOpen, setIsThoughtOpen] = useState(false);

  const isUser = message.role === 'user';
  const isLight = theme === 'light';

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
                  className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs border ${
                    isLight
                      ? 'bg-amber-50 border-amber-300 text-amber-950'
                      : 'bg-[#151515] border-white/10 text-zinc-200'
                  }`}
                >
                  {att.type === 'image' ? (
                    <ImageIcon className={`h-3.5 w-3.5 ${isLight ? 'text-amber-600' : 'text-zinc-300'}`} />
                  ) : (
                    <FileText className={`h-3.5 w-3.5 ${isLight ? 'text-amber-600' : 'text-zinc-300'}`} />
                  )}
                  <span className="font-medium truncate max-w-[160px]">{att.name}</span>
                </div>
              ))}
            </div>
          )}

          <div
            className={`rounded-2xl px-4 py-3 text-[14.5px] leading-relaxed shadow-lg ${
              isLight
                ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-amber-500/20 font-medium'
                : 'bg-[#151515] border border-white/15 text-white font-normal'
            }`}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>

          <span className={`text-[10px] mt-1 font-mono ${isLight ? 'text-zinc-500' : 'text-zinc-500'}`}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-bold text-xs mt-1 ${
            isLight
              ? 'bg-amber-100 text-amber-900 border border-amber-300'
              : 'bg-[#181818] border border-white/10 text-white'
          }`}
        >
          <User className="h-4 w-4" />
        </div>
      </div>
    );
  }

  // Assistant Bubble
  return (
    <div className="flex justify-start gap-3.5 px-4 py-3 group">
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-bold text-xs shadow-lg mt-1 ${
          isLight
            ? 'bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-500 text-white shadow-amber-500/25'
            : 'bg-white text-black font-extrabold shadow-white/10'
        }`}
      >
        <Sparkles className="h-4 w-4" />
      </div>

      <div className="flex flex-col flex-1 max-w-3xl min-w-0">
        {/* Model Tag */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`font-bold text-xs ${isLight ? 'text-zinc-950' : 'text-white'}`}>Zenix AI</span>
          {message.modelId && (
            <span
              className={`rounded px-1.5 py-0.2 text-[9px] font-mono border ${
                isLight
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-[#121212] text-zinc-400 border-white/[0.08]'
              }`}
            >
              {message.modelId}
            </span>
          )}
          {message.modeId && (
            <span
              className={`rounded px-1.5 py-0.2 text-[9px] font-mono border ${
                isLight
                  ? 'bg-amber-100 text-amber-900 border-amber-400'
                  : 'bg-white/10 text-white border-white/20'
              }`}
            >
              {message.modeId}
            </span>
          )}
        </div>

        {/* Thought Process Disclosure if present */}
        {message.thoughtProcess && (
          <div
            className={`mb-3 rounded-xl border p-3 text-xs ${
              isLight
                ? 'bg-amber-50/70 border-amber-300 text-amber-950'
                : 'bg-[#0a0a0a] border-white/10 text-zinc-300'
            }`}
          >
            <button
              onClick={() => setIsThoughtOpen(!isThoughtOpen)}
              className={`flex items-center justify-between w-full font-semibold transition-colors ${
                isLight ? 'text-amber-800 hover:text-amber-950' : 'text-zinc-300 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <BrainCircuit className="h-3.5 w-3.5" />
                <span>Deep Thinking Process</span>
              </div>
              {isThoughtOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
            {isThoughtOpen && (
              <pre
                className={`mt-2 text-[11px] font-mono whitespace-pre-wrap leading-relaxed border-t pt-2 ${
                  isLight ? 'border-amber-200 text-zinc-800' : 'border-white/10 text-zinc-300'
                }`}
              >
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
        <div
          className={`rounded-2xl border p-4 shadow-sm ${
            isLight
              ? 'bg-[#ffffff] border-amber-500/20 text-zinc-900 shadow-amber-500/5'
              : 'bg-[#080808] border-white/[0.08] text-zinc-100'
          }`}
        >
          <MarkdownRenderer content={message.content} />
          {message.isStreaming && (
            <span
              className={`inline-block h-3.5 w-1.5 animate-pulse ml-1 align-middle ${
                isLight ? 'bg-amber-600' : 'bg-white'
              }`}
            />
          )}
        </div>

        {/* Action Toolbar */}
        {!message.isStreaming && message.content && (
          <div className="flex items-center gap-1 mt-2 text-zinc-500 opacity-90 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1 rounded-lg p-1.5 text-xs transition-colors ${
                isLight ? 'hover:bg-amber-100 hover:text-zinc-900' : 'hover:bg-[#151515] hover:text-white'
              }`}
              title="Copy response"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            </button>

            <button
              onClick={handleSpeech}
              className={`flex items-center gap-1 rounded-lg p-1.5 text-xs transition-colors ${
                isLight ? 'hover:bg-amber-100 hover:text-zinc-900' : 'hover:bg-[#151515] hover:text-white'
              }`}
              title={isSpeaking ? 'Stop Audio' : 'Read aloud with Speech Synthesis'}
            >
              {isSpeaking ? (
                <VolumeX className="h-3.5 w-3.5 text-rose-500" />
              ) : (
                <Volume2 className="h-3.5 w-3.5" />
              )}
            </button>

            <button
              onClick={() => likeMessage(message.id, true)}
              className={`rounded-lg p-1.5 text-xs transition-colors ${
                message.likes === true
                  ? isLight ? 'text-amber-600 font-bold' : 'text-white font-bold'
                  : isLight ? 'hover:bg-amber-100 hover:text-zinc-900' : 'hover:bg-[#151515] hover:text-white'
              }`}
              title="Helpful"
            >
              <ThumbsUp className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={() => likeMessage(message.id, false)}
              className={`rounded-lg p-1.5 text-xs transition-colors ${
                message.likes === false
                  ? 'text-rose-500 font-bold'
                  : isLight ? 'hover:bg-amber-100 hover:text-zinc-900' : 'hover:bg-[#151515] hover:text-white'
              }`}
              title="Not helpful"
            >
              <ThumbsDown className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={() => regenerateMessage(message.id)}
              disabled={isStreaming}
              className={`rounded-lg p-1.5 text-xs transition-colors ml-1 ${
                isLight ? 'hover:bg-amber-100 hover:text-zinc-900' : 'hover:bg-[#151515] hover:text-white'
              }`}
              title="Regenerate answer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={handleForkChat}
              className={`rounded-lg p-1.5 text-xs transition-colors ${
                isLight ? 'hover:bg-amber-100 hover:text-zinc-900' : 'hover:bg-[#151515] hover:text-white'
              }`}
              title="Fork into new branch"
            >
              <GitFork className="h-3.5 w-3.5" />
            </button>

            {message.tokenCount && (
              <span className={`text-[10px] font-mono ml-auto ${isLight ? 'text-zinc-400' : 'text-zinc-600'}`}>
                ~{message.tokenCount} tokens
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

