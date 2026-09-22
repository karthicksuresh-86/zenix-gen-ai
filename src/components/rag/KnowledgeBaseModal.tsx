'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import {
  BrainCircuit,
  Database,
  FileText,
  Plus,
  Search,
  Sparkles,
  Trash2,
  UploadCloud,
  X,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { chunkDocumentText, searchKnowledgeBase } from '@/lib/rag-engine';
import { KnowledgeDoc } from '@/types';

export function KnowledgeBaseModal() {
  const { activeModal, setActiveModal, knowledgeDocs, addKnowledgeDoc, deleteKnowledgeDoc, createNewChat } = useApp();
  const [activeTab, setActiveTab] = useState<'docs' | 'vectorSearch' | 'pipeline'>('docs');
  const [testQuery, setTestQuery] = useState('How does vector indexing and latency work?');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<KnowledgeDoc | null>(knowledgeDocs[0] || null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadContent, setUploadContent] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const isOpen = activeModal === 'knowledge';
  if (!isOpen) return null;

  const handleTestSearch = () => {
    if (!testQuery.trim()) return;
    const results = searchKnowledgeBase(testQuery, knowledgeDocs, 4, 0.05);
    setSearchResults(results);
  };

  const handleCreateDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim() || !uploadContent.trim()) return;

    const docId = `doc-${Date.now()}`;
    const chunks = chunkDocumentText(docId, uploadTitle, uploadContent, 200);

    const newDoc: KnowledgeDoc = {
      id: docId,
      title: uploadTitle,
      type: 'TXT',
      size: uploadContent.length * 2,
      uploadedAt: Date.now(),
      chunkCount: chunks.length,
      chunks,
      tags: ['Custom', 'User Upload'],
    };

    addKnowledgeDoc(newDoc);
    setSelectedDoc(newDoc);
    setUploadTitle('');
    setUploadContent('');
    setIsUploading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-2xl p-4 animate-in fade-in duration-200">
      <div className="relative flex flex-col w-full max-w-4xl h-[700px] rounded-3xl border border-slate-800 bg-[#0a0e17] shadow-2xl glass-card overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Zenix RAG & Vector Knowledge System
                <span className="rounded-full bg-purple-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-purple-300 border border-purple-500/30">
                  bge-large-en (1024d)
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Retrieval-Augmented Generation pipeline across enterprise documents & embeddings
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-950/60 px-6 py-2">
          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800/60">
            <button
              onClick={() => setActiveTab('docs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'docs'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Document Index ({knowledgeDocs.length})
            </button>
            <button
              onClick={() => setActiveTab('vectorSearch')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'vectorSearch'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Vector Cosine Tester
            </button>
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'pipeline'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Pipeline Architecture
            </button>
          </div>

          <button
            onClick={() => setIsUploading(!isUploading)}
            className="flex items-center gap-1.5 rounded-lg bg-purple-600/20 border border-purple-500/30 px-3 py-1.5 text-xs font-medium text-purple-300 hover:bg-purple-600/30 hover:text-white transition-all"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Custom Document</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-hidden p-6">
          {activeTab === 'docs' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
              {/* Document List */}
              <div className="md:col-span-1 border border-slate-800/80 rounded-2xl bg-slate-900/40 p-3 overflow-y-auto space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2 py-1">
                  Active Knowledge Files
                </div>
                {knowledgeDocs.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className={`group relative rounded-xl p-3 cursor-pointer border transition-all ${
                      selectedDoc?.id === doc.id
                        ? 'bg-purple-500/10 border-purple-500/40 text-white'
                        : 'bg-slate-900/70 border-slate-800/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-purple-400 shrink-0" />
                        <span className="text-xs font-bold truncate max-w-[150px]">
                          {doc.title}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteKnowledgeDoc(doc.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-opacity"
                        title="Delete Document"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                      <span>{doc.chunks.length} chunks</span>
                      <span>{(doc.size / 1024).toFixed(0)} KB</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Document Chunks View */}
              <div className="md:col-span-2 border border-slate-800/80 rounded-2xl bg-slate-900/40 p-4 flex flex-col h-full overflow-hidden">
                {isUploading ? (
                  <form onSubmit={handleCreateDocument} className="flex flex-col h-full space-y-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <UploadCloud className="h-4 w-4 text-purple-400" />
                      Add Knowledge Document to Vector Store
                    </h3>
                    <div>
                      <label className="text-xs text-slate-400 mb-1 block">Document Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Next.js 15 Caching Rules & Architecture"
                        value={uploadTitle}
                        onChange={(e) => setUploadTitle(e.target.value)}
                        className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                        required
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <label className="text-xs text-slate-400 mb-1 block">Document Content (Will be automatically chunked & vectorized)</label>
                      <textarea
                        placeholder="Paste technical whitepapers, documentation, API guides, or custom notes..."
                        value={uploadContent}
                        onChange={(e) => setUploadContent(e.target.value)}
                        className="w-full flex-1 rounded-xl bg-slate-900 border border-slate-800 p-3 text-xs text-white focus:outline-none focus:border-purple-500 resize-none font-mono"
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsUploading(false)}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 hover:bg-slate-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-purple-600 text-xs font-semibold text-white hover:bg-purple-500 shadow-lg shadow-purple-500/25"
                      >
                        Chunk & Index Document
                      </button>
                    </div>
                  </form>
                ) : selectedDoc ? (
                  <div className="flex flex-col h-full overflow-hidden">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
                      <div>
                        <h3 className="text-sm font-bold text-white">{selectedDoc.title}</h3>
                        <p className="text-[11px] text-slate-400">
                          {selectedDoc.chunkCount} Semantic Chunks • Embedded with bge-large-en
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setActiveModal(null);
                          createNewChat(`Summarize and extract key insights from "${selectedDoc.title}"`, 'document');
                        }}
                        className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-purple-500 transition-colors shadow-sm"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Query in Chat</span>
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                      {selectedDoc.chunks.map((chunk, idx) => (
                        <div
                          key={chunk.id || idx}
                          className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 text-xs text-slate-300 leading-relaxed hover:border-purple-500/30 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-mono text-[10px] text-purple-400 font-bold">
                              CHUNK #{idx + 1}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              Vector Hash: {chunk.id.slice(0, 10)}
                            </span>
                          </div>
                          <p>{chunk.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-500 text-xs">
                    Select a document to inspect indexed chunks.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'vectorSearch' && (
            <div className="flex flex-col h-full space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={testQuery}
                    onChange={(e) => setTestQuery(e.target.value)}
                    placeholder="Enter natural language query to test vector similarity..."
                    className="w-full rounded-xl bg-slate-900 border border-slate-800 pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <button
                  onClick={handleTestSearch}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 text-xs font-semibold text-white hover:bg-purple-500 shadow-lg shadow-purple-500/25 flex items-center gap-1.5"
                >
                  <BrainCircuit className="h-4 w-4" />
                  <span>Execute Vector Search</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3">
                {searchResults.length > 0 ? (
                  searchResults.map((res, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-purple-500/30 bg-purple-950/10 p-4 text-xs text-slate-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-purple-300">
                          {res.docTitle}
                        </span>
                        <span className="rounded-md bg-purple-500/20 px-2 py-0.5 text-[10px] font-bold text-purple-300 border border-purple-500/30">
                          Cosine Similarity: {(res.similarityScore * 100).toFixed(1)}%
                        </span>
                      </div>
                      <p className="text-slate-300 leading-relaxed font-normal">
                        {res.text}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 border border-dashed border-slate-800 rounded-2xl text-slate-500 text-xs">
                    <BrainCircuit className="h-8 w-8 text-purple-500/40 mb-2" />
                    Click "Execute Vector Search" to test similarity calculations against indexed knowledge base.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'pipeline' && (
            <div className="flex flex-col h-full space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-center">
                  <div className="flex h-8 w-8 mx-auto items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 mb-2">
                    <FileText className="h-4 w-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1">1. User Query</h4>
                  <p className="text-[10px] text-slate-400">Natural language input with context intent</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-center">
                  <div className="flex h-8 w-8 mx-auto items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 mb-2">
                    <Layers className="h-4 w-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1">2. Embeddings</h4>
                  <p className="text-[10px] text-slate-400">bge-large-en 1024d neural vectors</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-center">
                  <div className="flex h-8 w-8 mx-auto items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 mb-2">
                    <Database className="h-4 w-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1">3. Vector DB</h4>
                  <p className="text-[10px] text-slate-400">Qdrant / Pinecone HNSW graph</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-center">
                  <div className="flex h-8 w-8 mx-auto items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 mb-2">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1">4. Reranking</h4>
                  <p className="text-[10px] text-slate-400">Cross-encoder top-K filtering</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-center">
                  <div className="flex h-8 w-8 mx-auto items-center justify-center rounded-lg bg-pink-500/20 text-pink-400 mb-2">
                    <BrainCircuit className="h-4 w-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1">5. LLM Synthesis</h4>
                  <p className="text-[10px] text-slate-400">Streaming answer with exact citations</p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-xs space-y-2 text-slate-300 leading-relaxed">
                <h4 className="font-bold text-white text-sm">Enterprise RAG Pipeline Guarantee</h4>
                <p>
                  Instead of polluting the primary model prompt with billions of raw text tokens, Zenix AI routes requests through an ultra-fast semantic indexing pipeline. Documents are parsed, split into 256-token semantically coherent chunks, and indexed into dense-sparse vector stores.
                </p>
                <p className="text-purple-300 font-medium">
                  Result: Zero token-limit bottlenecks, verifiable truth citations, and sub-15ms response latency.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
