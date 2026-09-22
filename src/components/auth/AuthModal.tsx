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
  const { activeModal, setActiveModal, userProfile, updateUserProfile } = useApp();
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
      <div className="relative flex flex-col w-full max-w-md rounded-3xl border border-slate-800 bg-[#0a0e17] shadow-2xl glass-card overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">
                {authMode === 'profile' ? 'Account & Preferences' : 'Sign in to Zenix AI'}
              </h2>
              <p className="text-[11px] text-slate-400">Unlock persistent memory & team sync</p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
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
              <h3 className="text-base font-bold text-white mb-1">Authenticated Successfully</h3>
              <p className="text-xs text-slate-400">Loading your personalized Zenix workspace...</p>
            </div>
          ) : authMode === 'signin' ? (
            <div className="space-y-4">
              {/* OAuth buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleOAuthLogin('Google')}
                  className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 border border-slate-800 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 hover:border-slate-700 transition-all shadow-sm"
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
                  className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 border border-slate-800 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 hover:border-slate-700 transition-all shadow-sm"
                >
                  <svg className="h-4 w-4 fill-current text-white" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub</span>
                </button>
              </div>

              <div className="flex items-center gap-2 my-2">
                <hr className="flex-1 border-slate-800" />
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">or email login</span>
                <hr className="flex-1 border-slate-800" />
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Work or Personal Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex.vance@company.com"
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-2.5 text-xs font-semibold text-white hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/25 transition-all"
                >
                  Send One-Time Code (OTP)
                </button>
              </form>

              <div className="pt-2 text-center">
                <button
                  onClick={() => setAuthMode('profile')}
                  className="text-xs text-blue-400 hover:underline"
                >
                  Configure BYOK API Keys & Preferences →
                </button>
              </div>
            </div>
          ) : authMode === 'otp' ? (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <p className="text-xs text-slate-400 leading-relaxed">
                We sent a 6-digit magic login code to <strong className="text-white">{email}</strong>.
              </p>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">6-Digit Code</label>
                <input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="8 4 9 2 0 1"
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 py-3 text-center text-lg tracking-widest font-mono text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className="flex-1 rounded-xl bg-slate-800 py-2.5 text-xs text-slate-300 hover:bg-slate-700"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-blue-600 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 shadow-lg shadow-blue-500/25"
                >
                  Verify & Enter
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSaveProfile} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-slate-300 font-semibold">Google Gemini / AI API Key</label>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-blue-400 hover:underline"
                  >
                    Get Free Key ↗
                  </a>
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="AIzaSy... (Gemini API Key)"
                    className="w-full rounded-xl bg-slate-900 border border-slate-800 pl-9 pr-3 py-2 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1.5 block">
                  Enables live Google Search grounding and real-time generative responses for all questions.
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className="flex-1 rounded-xl bg-slate-800 py-2 text-xs text-slate-300 hover:bg-slate-700"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-blue-600 py-2 text-xs font-semibold text-white hover:bg-blue-500 shadow-lg shadow-blue-500/25"
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
