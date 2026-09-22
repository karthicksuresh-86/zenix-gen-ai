'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/lib/store';
import { Mic, MicOff, Volume2, VolumeX, X, Sparkles, Radio } from 'lucide-react';

export function VoiceModeModal() {
  const { activeModal, setActiveModal, sendMessage, activeModelId, activeModeId } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponseText, setAiResponseText] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const isOpen = activeModal === 'voice';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
        };

        recognition.onend = () => {
          if (isListening) {
            try {
              recognition.start();
            } catch (e) {
              // already started
            }
          }
        };

        recognitionRef.current = recognition;
      }
    }
  }, [isListening]);

  // Start listening when opened
  useEffect(() => {
    if (isOpen) {
      startListening();
      setAiResponseText('Listening... Speak your prompt naturally.');
    } else {
      stopListening();
      stopSpeaking();
    }
  }, [isOpen]);

  const startListening = () => {
    setIsListening(true);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.log('Recognition already active');
      }
    }
  };

  const stopListening = () => {
    setIsListening(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // stopped
      }
    }
  };

  const stopSpeaking = () => {
    setIsSpeaking(false);
    if (synthRef.current) {
      synthRef.current.cancel();
    }
  };

  const speakText = (text: string) => {
    if (isMuted || !synthRef.current) return;
    stopSpeaking();
    const cleanText = text.replace(/[*#`_\[\]]/g, '').slice(0, 300);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    synthRef.current.speak(utterance);
  };

  const handleSendVoiceQuery = async () => {
    if (!transcript.trim()) return;
    const query = transcript;
    setTranscript('');
    stopListening();
    setAiResponseText('Zenix is thinking and processing voice stream...');

    await sendMessage(query);
    const simulatedVoiceAnswer = `I have received your inquiry: "${query}". I have synthesized the key insights and updated your conversation with the complete technical breakdown and interactive artifacts.`;
    setAiResponseText(simulatedVoiceAnswer);
    speakText(simulatedVoiceAnswer);
    startListening();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-3xl animate-in fade-in duration-300 p-4">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-500/20 blur-[130px]" />

      <div className="relative flex flex-col items-center justify-between w-full max-w-xl h-[620px] rounded-3xl border border-slate-800/80 bg-slate-950/90 p-8 shadow-2xl glass-card">
        {/* Header */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Radio className="h-4 w-4 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Zenix Neural Voice</h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {activeModelId} • Ultra-low Latency
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (isSpeaking) stopSpeaking();
                setIsMuted(!isMuted);
              }}
              className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="h-4 w-4 text-rose-400" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setActiveModal(null)}
              className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Futuristic Glowing Voice Orb */}
        <div className="relative flex items-center justify-center my-auto">
          {/* Animated concentric ripples */}
          <div
            className={`absolute h-64 w-64 rounded-full border border-blue-500/20 transition-all duration-700 ${
              isListening || isSpeaking ? 'scale-125 opacity-70 animate-ping' : 'scale-100 opacity-20'
            }`}
          />
          <div
            className={`absolute h-52 w-52 rounded-full border border-purple-500/30 transition-all duration-500 ${
              isListening || isSpeaking ? 'scale-110 opacity-80 animate-pulse' : 'scale-95 opacity-30'
            }`}
          />

          {/* Central Glowing Orb */}
          <div
            className={`flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-tr transition-all duration-500 shadow-2xl cursor-pointer ${
              isSpeaking
                ? 'from-purple-600 to-pink-600 shadow-purple-500/50 scale-110'
                : isListening
                ? 'from-blue-600 via-indigo-600 to-cyan-500 shadow-blue-500/50 scale-105'
                : 'from-slate-800 to-slate-700 shadow-slate-900/50 scale-95'
            }`}
            onClick={isListening ? stopListening : startListening}
          >
            {isListening ? (
              <Mic className="h-12 w-12 text-white animate-bounce" />
            ) : (
              <MicOff className="h-12 w-12 text-slate-400" />
            )}
          </div>
        </div>

        {/* Audio Equalizer bars */}
        <div className="flex items-center justify-center gap-1.5 h-8 my-2">
          {[40, 75, 95, 60, 85, 100, 70, 50, 90, 65, 80, 45].map((height, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-150 ${
                isListening || isSpeaking
                  ? 'bg-gradient-to-t from-blue-500 to-purple-400'
                  : 'bg-slate-800 h-2'
              }`}
              style={{
                height: isListening || isSpeaking ? `${Math.max(6, Math.round(height * Math.random()))}px` : '4px',
              }}
            />
          ))}
        </div>

        {/* Transcript Box */}
        <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            {isListening ? '🎙️ Listening to you...' : isSpeaking ? '🔊 Zenix Speaking...' : 'Voice Ready'}
          </p>
          <p className="text-sm font-medium text-white min-h-[44px] flex items-center justify-center">
            {transcript || aiResponseText || 'Start speaking, Zenix is ready to assist...'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="w-full flex items-center justify-center gap-4 mt-4">
          {transcript.trim() && (
            <button
              onClick={handleSendVoiceQuery}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-purple-500 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              <span>Send Voice Query</span>
            </button>
          )}

          <button
            onClick={isListening ? stopListening : startListening}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
              isListening
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            <span>{isListening ? 'Pause Listening' : 'Resume Mic'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
