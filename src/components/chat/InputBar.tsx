'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/lib/store';
import {
  ArrowUp,
  BrainCircuit,
  FileText,
  Globe,
  Image as ImageIcon,
  Mic,
  Paperclip,
  Sparkles,
  Square,
  X,
} from 'lucide-react';
import { Attachment } from '@/types';

export function InputBar() {
  const {
    theme,
    sendMessage,
    stopGeneration,
    isStreaming,
    webSearchEnabled,
    setWebSearchEnabled,
    deepThinkingEnabled,
    setDeepThinkingEnabled,
    setActiveModal,
  } = useApp();

  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const isLight = theme === 'light';

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if ((!input.trim() && attachments.length === 0) || isStreaming) return;
    const currentInput = input;
    const currentAtts = [...attachments];
    setInput('');
    setAttachments([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    sendMessage(currentInput, currentAtts.length > 0 ? currentAtts : undefined);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'file' | 'image') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isImg = file.type.startsWith('image/');
      const newAtt: Attachment = {
        id: `att-${Date.now()}-${i}`,
        name: file.name,
        type: isImg ? 'image' : file.name.endsWith('.csv') ? 'csv' : file.name.endsWith('.pdf') ? 'pdf' : 'txt',
        size: file.size,
        previewUrl: isImg ? URL.createObjectURL(file) : undefined,
      };
      setAttachments((prev) => [...prev, newAtt]);
    }
    e.target.value = '';
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div
      className={`p-4 shrink-0 transition-colors ${
        isLight
          ? 'bg-gradient-to-t from-[#ffffff] via-[#ffffff]/90 to-transparent'
          : 'bg-gradient-to-t from-[#000000] via-[#000000]/90 to-transparent'
      }`}
    >
      <div
        className={`max-w-3xl mx-auto flex flex-col rounded-2xl border backdrop-blur-2xl shadow-2xl p-2.5 transition-all ${
          isLight
            ? 'bg-[#ffffff] border-amber-500/30 shadow-amber-500/10 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20'
            : 'bg-[#080808] border-white/[0.12] shadow-black focus-within:border-white/30 focus-within:ring-1 focus-within:ring-white/10'
        }`}
      >
        {/* Attachment chips */}
        {attachments.length > 0 && (
          <div
            className={`flex flex-wrap gap-2 px-2 pt-1 pb-2 border-b mb-2 ${
              isLight ? 'border-amber-500/20' : 'border-white/[0.08]'
            }`}
          >
            {attachments.map((att) => (
              <div
                key={att.id}
                className={`flex items-center gap-2 rounded-xl px-2.5 py-1 text-xs border ${
                  isLight
                    ? 'bg-amber-50 text-amber-900 border-amber-300'
                    : 'bg-[#151515] text-zinc-200 border-white/10'
                }`}
              >
                {att.type === 'image' ? (
                  <ImageIcon className={`h-3.5 w-3.5 ${isLight ? 'text-amber-600' : 'text-zinc-300'}`} />
                ) : (
                  <FileText className={`h-3.5 w-3.5 ${isLight ? 'text-amber-600' : 'text-zinc-300'}`} />
                )}
                <span className="max-w-[140px] truncate font-medium">{att.name}</span>
                <span className={`text-[10px] font-mono ${isLight ? 'text-amber-700/70' : 'text-zinc-500'}`}>
                  {(att.size / 1024).toFixed(0)}KB
                </span>
                <button
                  onClick={() => removeAttachment(att.id)}
                  className={`rounded-full p-0.5 ${
                    isLight ? 'hover:bg-amber-200 text-amber-800' : 'hover:bg-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Text Input Area */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Zenix anything, code in Tanglish/English, synthesize documents, or research web..."
          rows={1}
          className={`w-full bg-transparent px-3 py-1.5 text-sm focus:outline-none resize-none leading-relaxed min-h-[44px] ${
            isLight
              ? 'text-zinc-900 placeholder-zinc-400'
              : 'text-white placeholder-zinc-500'
          }`}
        />

        {/* Toolbar & Buttons */}
        <div className="flex items-center justify-between pt-2 px-1">
          {/* Left Buttons: Attachments, Voice, Prompts */}
          <div className="flex items-center gap-1">
            {/* File upload hidden input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.docx,.txt,.csv,.json,.ts,.js,.py,.html"
              className="hidden"
              onChange={(e) => handleFileUpload(e, 'file')}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`rounded-xl p-2 transition-colors ${
                isLight
                  ? 'text-zinc-500 hover:bg-amber-50 hover:text-amber-800'
                  : 'text-zinc-400 hover:bg-[#151515] hover:text-white'
              }`}
              title="Upload Documents (PDF, DOCX, TXT, CSV)"
            >
              <Paperclip className="h-4 w-4" />
            </button>

            {/* Image upload hidden input */}
            <input
              ref={imageInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, 'image')}
            />
            <button
              onClick={() => imageInputRef.current?.click()}
              className={`rounded-xl p-2 transition-colors ${
                isLight
                  ? 'text-zinc-500 hover:bg-amber-50 hover:text-amber-800'
                  : 'text-zinc-400 hover:bg-[#151515] hover:text-white'
              }`}
              title="Upload Image for OCR & Vision analysis"
            >
              <ImageIcon className="h-4 w-4" />
            </button>

            {/* Voice Assistant Modal Button */}
            <button
              onClick={() => setActiveModal('voice')}
              className={`rounded-xl p-2 transition-colors ${
                isLight
                  ? 'text-zinc-500 hover:bg-amber-50 hover:text-amber-800'
                  : 'text-zinc-400 hover:bg-[#151515] hover:text-white'
              }`}
              title="Launch Neural Voice Mode"
            >
              <Mic className="h-4 w-4" />
            </button>

            {/* Web Search Toggle in input bar */}
            <button
              onClick={() => setWebSearchEnabled((prev) => !prev)}
              className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1 text-xs transition-all ${
                webSearchEnabled
                  ? isLight
                    ? 'bg-amber-100 text-amber-900 border border-amber-400 font-semibold'
                    : 'bg-white/15 text-white border border-white/25'
                  : isLight
                  ? 'text-zinc-500 hover:bg-amber-50 hover:text-zinc-900'
                  : 'text-zinc-400 hover:bg-[#151515] hover:text-white'
              }`}
              title="Toggle Live Web Citations"
            >
              <Globe className="h-3.5 w-3.5" />
              <span className="text-[11px] hidden sm:inline">Search</span>
            </button>

            {/* Prompt library button */}
            <button
              onClick={() => setActiveModal('prompts')}
              className={`rounded-xl p-2 transition-colors ${
                isLight
                  ? 'text-zinc-500 hover:bg-amber-50 hover:text-amber-800'
                  : 'text-zinc-400 hover:bg-[#151515] hover:text-white'
              }`}
              title="Open Prompt Library"
            >
              <Sparkles className="h-4 w-4" />
            </button>
          </div>

          {/* Right Button: Send or Stop */}
          <div className="flex items-center gap-2">
            {isStreaming ? (
              <button
                onClick={stopGeneration}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/30 transition-all active:scale-95"
                title="Stop generation"
              >
                <Square className="h-3.5 w-3.5 fill-current" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!input.trim() && attachments.length === 0}
                className={`flex h-8 w-8 items-center justify-center rounded-xl font-bold transition-all shadow-md active:scale-95 ${
                  input.trim() || attachments.length > 0
                    ? isLight
                      ? 'bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-600 text-white shadow-amber-500/30 hover:opacity-90'
                      : 'bg-white text-black font-extrabold shadow-white/20 hover:bg-zinc-200'
                    : isLight
                    ? 'bg-amber-100 text-amber-300 cursor-not-allowed'
                    : 'bg-[#151515] text-zinc-600 cursor-not-allowed'
                }`}
                title="Send message"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="text-center mt-2">
        <p className={`text-[10px] font-mono ${isLight ? 'text-zinc-500' : 'text-zinc-500'}`}>
          Zenix AI combines multi-model intelligence with Tanglish support, live citations & instant artifacts.
        </p>
      </div>
    </div>
  );
}

