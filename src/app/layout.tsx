import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/lib/store';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Zenix AI — Think Faster. Create Smarter.',
  description: 'Ultra-fast, minimal, Claude-style AI assistant with DeepSeek coding, Perplexity web citations, RAG knowledge intelligence, voice mode, and live interactive artifacts.',
  keywords: ['AI Assistant', 'Claude AI', 'DeepSeek', 'Perplexity Citations', 'RAG', 'Vector Search', 'Artifacts', 'Next.js'],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-[#07090e] text-slate-100 selection:bg-blue-500/30 selection:text-blue-200">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
