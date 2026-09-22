'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import {
  KeyRound,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  User,
  X,
} from 'lucide-react';

export function AuthModal() {
  const { activeModal, setActiveModal, userProfile, updateUserProfile, theme } = useApp();
  const [authMode, setAuthMode] = useState<'signin' | 'otp' | 'profile'>('profile');
  const [email, setEmail] = useState(userProfile.email || '');
  const [name, setName] = useState(userProfile.name || '');
  const [otpCode, setOtpCode] = useState('');
  const [apiKey, setApiKey] = useState(userProfile.customApiKey || '');
  const [isSuccess, setIsSuccess] = useState(false);

  React.useEffect(() => {
    if (userProfile.customApiKey !== undefined) {
      setApiKey(userProfile.customApiKey || '');
    }
  }, [userProfile.customApiKey, activeModal]);

  const isOpen = activeModal === 'auth';
  if (!isOpen) return null;

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setAuthMode('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      email,
      name: name || email.split('@')[0],
      plan: 'pro',
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setActiveModal(null);
    }, 1200);
  };

  const handleOAuthLogin = (provider: 'Google' | 'GitHub') => {
    updateUserProfile({
      name: `${provider} User`,
      email: `user@${provider.toLowerCase()}.com`,
      plan: 'pro',
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setActiveModal(null);
    }, 1000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      customApiKey: apiKey,
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setActiveModal(null);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-2xl p-4 animate-in fade-in duration-200">
      <div className={`relative flex flex-col w-full max-w-md rounded-3xl border shadow-2xl overflow-hidden transition-colors ${
        theme === 'light'
          ? 'bg-white border-amber-200 text-stone-900 shadow-amber-500/10'
          : 'bg-black border-zinc-800 text-white shadow-black'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between border-b px-6 py-4 ${
          theme === 'light'
            ? 'border-amber-200/80 bg-amber-50/70'
            : 'border-zinc-800 bg-zinc-950'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`flex h-8 w-8 items-center justify-center rounded-xl border ${
              theme === 'light'
                ? 'bg-amber-100 border-amber-300/80 text-amber-800'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300'
            }`}>
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h2 className={`text-sm font-bold ${theme === 'light' ? 'text-stone-900' : 'text-white'}`}>
                {authMode === 'profile' ? 'Account & Preferences' : 'Sign in to Zenix AI'}
              </h2>
              <p className={`text-[11px] ${theme === 'light' ? 'text-stone-500' : 'text-zinc-400'}`}>Unlock persistent memory & team sync</p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className={`rounded-full p-2 transition-colors ${
              theme === 'light'
                ? 'text-stone-500 hover:bg-amber-100 hover:text-stone-900'
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in-95">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-3">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className={`text-base font-bold mb-1 ${theme === 'light' ? 'text-stone-900' : 'text-white'}`}>Authenticated Successfully</h3>
              <p className={`text-xs ${theme === 'light' ? 'text-stone-500' : 'text-zinc-400'}`}>Loading your personalized Zenix workspace...</p>
            </div>
          ) : authMode === 'signin' ? (
            <div className="space-y-4">
              {/* OAuth buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleOAuthLogin('Google')}
                  className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 text-xs font-semibold transition-all shadow-sm ${
                    theme === 'light'
                      ? 'bg-amber-50/50 border-amber-200 text-stone-900 hover:bg-amber-100/70'
                      : 'bg-zinc-950 border-zinc-800 text-white hover:bg-zinc-900 hover:border-zinc-700'
                  }`}
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.1s.7 5.4 1.9 7.8l3.7-2.9z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z"
                    />
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  onClick={() => handleOAuthLogin('GitHub')}
                  className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 text-xs font-semibold transition-all shadow-sm ${
                    theme === 'light'
                      ? 'bg-amber-50/50 border-amber-200 text-stone-900 hover:bg-amber-100/70'
                      : 'bg-zinc-950 border-zinc-800 text-white hover:bg-zinc-900 hover:border-zinc-700'
                  }`}
                >
                  <svg className={`h-4 w-4 fill-current ${theme === 'light' ? 'text-stone-900' : 'text-white'}`} viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub</span>
                </button>
              </div>

              <div className="flex items-center gap-2 my-2">
                <hr className={`flex-1 ${theme === 'light' ? 'border-amber-200' : 'border-zinc-800'}`} />
                <span className={`text-[10px] uppercase tracking-widest font-mono ${theme === 'light' ? 'text-stone-400' : 'text-zinc-500'}`}>or email login</span>
                <hr className={`flex-1 ${theme === 'light' ? 'border-amber-200' : 'border-zinc-800'}`} />
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <div>
                  <label className={`text-xs mb-1 block ${theme === 'light' ? 'text-stone-600' : 'text-zinc-400'}`}>Work or Personal Email</label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-3 h-4 w-4 ${theme === 'light' ? 'text-stone-400' : 'text-zinc-500'}`} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex.vance@company.com"
                      className={`w-full rounded-xl border pl-9 pr-4 py-2.5 text-xs focus:outline-none ${
                        theme === 'light'
                          ? 'bg-amber-50/40 border-amber-200 text-stone-900 placeholder-stone-400 focus:border-amber-500'
                          : 'bg-zinc-950 border-zinc-800 text-white placeholder-zinc-600 focus:border-zinc-500'
                      }`}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full rounded-xl py-2.5 text-xs font-bold transition-all shadow-md active:scale-95 ${
                    theme === 'light'
                      ? 'gold-gradient text-white shadow-amber-500/20 hover:brightness-105'
                      : 'bg-white hover:bg-zinc-200 text-black shadow-zinc-900/50'
                  }`}
                >
                  Send One-Time Code (OTP)
                </button>
              </form>

              <div className="pt-2 text-center">
                <button
                  onClick={() => setAuthMode('profile')}
                  className={`text-xs hover:underline ${theme === 'light' ? 'text-amber-700' : 'text-zinc-400'}`}
                >
                  Configure BYOK API Keys & Preferences →
                </button>
              </div>
            </div>
          ) : authMode === 'otp' ? (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <p className={`text-xs leading-relaxed ${theme === 'light' ? 'text-stone-600' : 'text-zinc-400'}`}>
                We sent a 6-digit magic login code to <strong className={theme === 'light' ? 'text-stone-900' : 'text-white'}>{email}</strong>.
              </p>
              <div>
                <label className={`text-xs mb-1 block ${theme === 'light' ? 'text-stone-600' : 'text-zinc-400'}`}>6-Digit Code</label>
                <input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="8 4 9 2 0 1"
                  className={`w-full rounded-xl border py-3 text-center text-lg tracking-widest font-mono focus:outline-none ${
                    theme === 'light'
                      ? 'bg-amber-50/40 border-amber-200 text-stone-900 focus:border-amber-500'
                      : 'bg-zinc-950 border-zinc-800 text-white focus:border-zinc-500'
                  }`}
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className={`flex-1 rounded-xl py-2.5 text-xs transition-colors ${
                    theme === 'light'
                      ? 'bg-amber-100/60 text-stone-700 hover:bg-amber-100'
                      : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition-all shadow-md active:scale-95 ${
                    theme === 'light'
                      ? 'gold-gradient text-white shadow-amber-500/20 hover:brightness-105'
                      : 'bg-white hover:bg-zinc-200 text-black shadow-zinc-900/50'
                  }`}
                >
                  Verify & Enter
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSaveProfile} className="space-y-3.5">
              <div>
                <label className={`text-xs mb-1 block ${theme === 'light' ? 'text-stone-600' : 'text-zinc-400'}`}>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full rounded-xl border px-3 py-2 text-xs focus:outline-none ${
                    theme === 'light'
                      ? 'bg-amber-50/40 border-amber-200 text-stone-900 focus:border-amber-500'
                      : 'bg-zinc-950 border-zinc-800 text-white focus:border-zinc-500'
                  }`}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className={`text-xs font-semibold ${theme === 'light' ? 'text-stone-800' : 'text-zinc-300'}`}>Google Gemini / AI API Key</label>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                    className={`text-[11px] hover:underline ${theme === 'light' ? 'text-amber-700' : 'text-zinc-400'}`}
                  >
                    Get Free Key ↗
                  </a>
                </div>
                <div className="relative">
                  <KeyRound className={`absolute left-3 top-2.5 h-4 w-4 ${theme === 'light' ? 'text-stone-400' : 'text-zinc-500'}`} />
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="AIzaSy... (Gemini API Key)"
                    className={`w-full rounded-xl border pl-9 pr-3 py-2 text-xs font-mono focus:outline-none ${
                      theme === 'light'
                        ? 'bg-amber-50/40 border-amber-200 text-stone-900 placeholder-stone-400 focus:border-amber-500'
                        : 'bg-zinc-950 border-zinc-800 text-white placeholder-zinc-600 focus:border-zinc-500'
                    }`}
                  />
                </div>
                <span className={`text-[10px] mt-1.5 block ${theme === 'light' ? 'text-stone-500' : 'text-zinc-500'}`}>
                  Enables live Google Search grounding and real-time generative responses for all questions.
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className={`flex-1 rounded-xl py-2 text-xs transition-colors ${
                    theme === 'light'
                      ? 'bg-amber-100/60 text-stone-700 hover:bg-amber-100'
                      : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all shadow-md active:scale-95 ${
                    theme === 'light'
                      ? 'gold-gradient text-white shadow-amber-500/20 hover:brightness-105'
                      : 'bg-white hover:bg-zinc-200 text-black shadow-zinc-900/50'
                  }`}
                >
                  Save Settings
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
