import { DocumentChunk, KnowledgeDoc } from '@/types';

// Simple lightweight vector embedding simulator (TF-IDF + character trigram embedding space)
// to calculate real cosine similarity metrics for RAG demonstration and live document search.
export function generateTrigramVector(text: string, dimensions = 128): number[] {
  const clean = text.toLowerCase().replace(/[^a-z0-9 ]/g, ' ');
  const vector = new Array(dimensions).fill(0);
  
  for (let i = 0; i < clean.length - 2; i++) {
    const trigram = clean.slice(i, i + 3);
    let hash = 0;
    for (let j = 0; j < trigram.length; j++) {
      hash = (hash << 5) - hash + trigram.charCodeAt(j);
      hash |= 0;
    }
    const idx = Math.abs(hash) % dimensions;
    vector[idx] += 1;
  }
  
  // Normalize vector to unit length
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  if (magnitude === 0) return vector;
  return vector.map(v => v / magnitude);
}

export function calculateCosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length || vecA.length === 0) return 0;
  let dotProduct = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
  }
  return Math.max(0, Math.min(1, dotProduct));
}

export function searchKnowledgeBase(
  query: string,
  docs: KnowledgeDoc[],
  topK = 3,
  minThreshold = 0.15
): DocumentChunk[] {
  const queryVec = generateTrigramVector(query);
  const scoredChunks: { chunk: DocumentChunk; score: number }[] = [];

  for (const doc of docs) {
    for (const chunk of doc.chunks) {
      const chunkVec = chunk.vectorSummary && chunk.vectorSummary.length > 0 
        ? chunk.vectorSummary 
        : generateTrigramVector(chunk.text);
      
      const score = calculateCosineSimilarity(queryVec, chunkVec);
      
      // Keyword overlap boost
      const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 3);
      const textLower = chunk.text.toLowerCase();
      let keywordHits = 0;
      for (const word of queryWords) {
        if (textLower.includes(word)) {
          keywordHits += 1;
        }
      }
      const boostedScore = Math.min(0.99, score + (keywordHits * 0.1));

      if (boostedScore >= minThreshold) {
        scoredChunks.push({
          chunk: {
            ...chunk,
            similarityScore: Math.round(boostedScore * 100) / 100,
          },
          score: boostedScore,
        });
      }
    }
  }

  scoredChunks.sort((a, b) => b.score - a.score);
  return scoredChunks.slice(0, topK).map(sc => sc.chunk);
}

export function chunkDocumentText(docId: string, docTitle: string, fullText: string, chunkSize = 250): DocumentChunk[] {
  const paragraphs = fullText.split(/\n\n+/).filter(p => p.trim().length > 0);
  const chunks: DocumentChunk[] = [];
  let currentChunk = '';
  let chunkIdx = 0;

  for (const para of paragraphs) {
    if ((currentChunk + ' ' + para).length > chunkSize && currentChunk.length > 0) {
      chunks.push({
        id: `${docId}-chunk-${chunkIdx}`,
        docId,
        docTitle,
        chunkIndex: chunkIdx,
        text: currentChunk.trim(),
        vectorSummary: generateTrigramVector(currentChunk),
      });
      chunkIdx++;
      currentChunk = para;
    } else {
      currentChunk = currentChunk ? `${currentChunk}\n\n${para}` : para;
    }
  }

  if (currentChunk.trim().length > 0) {
    chunks.push({
      id: `${docId}-chunk-${chunkIdx}`,
      docId,
      docTitle,
      chunkIndex: chunkIdx,
      text: currentChunk.trim(),
      vectorSummary: generateTrigramVector(currentChunk),
    });
  }

  return chunks;
}
