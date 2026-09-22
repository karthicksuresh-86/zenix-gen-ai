import { Citation } from '@/types';

// Clean HTML tags and entities
function cleanHtml(raw: string): string {
  return raw
    .replace(/<[^>]*>?/gm, '')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .trim();
}

export interface DeepSearchData {
  summary: string;
  fullExtract: string;
  articleTitle: string;
  citations: Citation[];
  topGitHubRepos?: Array<{ name: string; url: string; stars: number; desc: string }>;
  topHNDiscussions?: Array<{ title: string; url: string; points: number }>;
}

// Timeout helper to guarantee ultra-fast response
function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 2800): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(id));
}

// Clean user search keywords
export function cleanSearchQuery(query: string): string {
  return query
    .replace(/\b(explaim|expln|xplain)\b/gi, 'explain')
    .replace(/\b(wat|wht)\b/gi, 'what')
    .replace(/\b(diffrnce|diff)\b/gi, 'difference')
    .replace(/^(can you |please |tell me about |give me an explanation of |explain |what is |how does |difference between )/gi, '')
    .replace(/\b(in detail|briefly|overview|concepts|keta question ku|solunga|in tamil|in tanglish)\b/gi, '')
    .replace(/[?.,!]/g, '')
    .trim() || query;
}

// Multi-Source Live Search Engine
export async function performDeepWebSearch(query: string): Promise<DeepSearchData> {
  const cleanQ = cleanSearchQuery(query);
  const citations: Citation[] = [];
  let summary = '';
  let fullExtract = '';
  let articleTitle = '';
  const topGitHubRepos: Array<{ name: string; url: string; stars: number; desc: string }> = [];
  const topHNDiscussions: Array<{ title: string; url: string; points: number }> = [];

  // Launch parallel multi-source requests simultaneously
  const results = await Promise.allSettled([
    // 1. Wikipedia Search & Extract API
    (async () => {
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
        cleanQ
      )}&utf8=&format=json&origin=*`;
      const res = await fetchWithTimeout(searchUrl);
      if (res.ok) {
        const data = await res.json();
        const searchItems = data.query?.search || [];
        if (searchItems.length > 0) {
          articleTitle = searchItems[0].title;
          const extractUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=true&titles=${encodeURIComponent(
            articleTitle
          )}&format=json&origin=*`;
          const extractRes = await fetchWithTimeout(extractUrl);
          if (extractRes.ok) {
            const extractData = await extractRes.json();
            const pages = extractData.query?.pages || {};
            const firstPage = Object.values(pages)[0] as any;
            if (firstPage && firstPage.extract) {
              fullExtract = firstPage.extract;
            }
          }

          searchItems.slice(0, 3).forEach((item: any) => {
            citations.push({
              id: `wiki-${item.pageid}`,
              title: item.title,
              url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/ /g, '_'))}`,
              domain: 'wikipedia.org',
              snippet: cleanHtml(item.snippet),
              publishDate: item.timestamp ? new Date(item.timestamp).toISOString().split('T')[0] : '2025',
              favicon: 'https://www.google.com/s2/favicons?domain=wikipedia.org&sz=32',
              relevanceScore: 0.99,
            });
          });
        }
      }
    })(),

    // 2. DuckDuckGo Instant Answers & Deep Topics API
    (async () => {
      const ddgUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(cleanQ)}&format=json&no_html=1&skip_disambig=1`;
      const res = await fetchWithTimeout(ddgUrl);
      if (res.ok) {
        const data = await res.json();
        if (data.AbstractText) {
          summary = data.AbstractText;
          if (data.AbstractURL) {
            citations.unshift({
              id: `ddg-main`,
              title: data.Heading || cleanQ,
              url: data.AbstractURL,
              domain: new URL(data.AbstractURL).hostname,
              snippet: data.AbstractText,
              favicon: `https://www.google.com/s2/favicons?domain=${new URL(data.AbstractURL).hostname}&sz=32`,
              relevanceScore: 0.98,
            });
          }
        }
        if (data.RelatedTopics && Array.isArray(data.RelatedTopics)) {
          data.RelatedTopics.slice(0, 3).forEach((topic: any) => {
            if (topic.Text && topic.FirstURL) {
              try {
                const domain = new URL(topic.FirstURL).hostname;
                citations.push({
                  id: `ddg-${topic.FirstURL}`,
                  title: topic.Text.split(' - ')[0] || cleanQ,
                  url: topic.FirstURL,
                  domain,
                  snippet: topic.Text,
                  favicon: `https://www.google.com/s2/favicons?domain=${domain}&sz=32`,
                  relevanceScore: 0.92,
                });
              } catch {}
            }
          });
        }
      }
    })(),

    // 3. GitHub API (Live Repositories & Starred Codebases)
    (async () => {
      const ghUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(
        cleanQ
      )}&sort=stars&order=desc&per_page=3`;
      const res = await fetchWithTimeout(ghUrl, {
        headers: { Accept: 'application/vnd.github.v3+json', 'User-Agent': 'Zenix-Search-Engine' },
      });
      if (res.ok) {
        const data = await res.json();
        const repos = data.items || [];
        repos.forEach((repo: any) => {
          topGitHubRepos.push({
            name: repo.full_name,
            url: repo.html_url,
            stars: repo.stargazers_count,
            desc: repo.description || 'Open source codebase repository.',
          });
          citations.push({
            id: `gh-${repo.id}`,
            title: `GitHub: ${repo.full_name} (${(repo.stargazers_count / 1000).toFixed(1)}k ⭐)`,
            url: repo.html_url,
            domain: 'github.com',
            snippet: `${repo.description || 'Open source project'}. Language: ${repo.language || 'Code'}. Stars: ${repo.stargazers_count.toLocaleString()}`,
            publishDate: repo.updated_at ? new Date(repo.updated_at).toISOString().split('T')[0] : '2025',
            favicon: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
            relevanceScore: 0.95,
          });
        });
      }
    })(),

    // 4. Hacker News Algolia API (Developer Discussions & Insights)
    (async () => {
      const hnUrl = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(
        cleanQ
      )}&tags=story&hitsPerPage=3`;
      const res = await fetchWithTimeout(hnUrl);
      if (res.ok) {
        const data = await res.json();
        const hits = data.hits || [];
        hits.forEach((hit: any) => {
          if (hit.title && (hit.url || hit.story_id)) {
            const itemUrl = hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`;
            let domain = 'news.ycombinator.com';
            try {
              if (hit.url) domain = new URL(hit.url).hostname;
            } catch {}

            topHNDiscussions.push({
              title: hit.title,
              url: itemUrl,
              points: hit.points || 0,
            });

            citations.push({
              id: `hn-${hit.objectID}`,
              title: hit.title,
              url: itemUrl,
              domain,
              snippet: `Hacker News community discussion with ${hit.points || 0} points and ${hit.num_comments || 0} comments.`,
              publishDate: hit.created_at ? new Date(hit.created_at).toISOString().split('T')[0] : '2025',
              favicon: 'https://www.google.com/s2/favicons?domain=news.ycombinator.com&sz=32',
              relevanceScore: 0.9,
            });
          }
        });
      }
    })(),

    // 5. StackExchange API (StackOverflow Developer Q&A)
    (async () => {
      const soUrl = `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=relevance&q=${encodeURIComponent(
        cleanQ
      )}&site=stackoverflow&pagesize=2`;
      const res = await fetchWithTimeout(soUrl);
      if (res.ok) {
        const data = await res.json();
        const questions = data.items || [];
        questions.forEach((q: any) => {
          citations.push({
            id: `so-${q.question_id}`,
            title: cleanHtml(q.title),
            url: q.link,
            domain: 'stackoverflow.com',
            snippet: `StackOverflow accepted solution with ${q.score || 0} votes. Tags: ${(q.tags || []).join(', ')}`,
            publishDate: q.creation_date ? new Date(q.creation_date * 1000).toISOString().split('T')[0] : '2025',
            favicon: 'https://www.google.com/s2/favicons?domain=stackoverflow.com&sz=32',
            relevanceScore: 0.93,
          });
        });
      }
    })(),
  ]);

  // Deduplicate citations by URL and limit to top authoritative results
  const uniqueCitations: Citation[] = [];
  const seenUrls = new Set<string>();

  for (const cit of citations) {
    if (!cit.url || seenUrls.has(cit.url)) continue;
    seenUrls.add(cit.url);
    uniqueCitations.push(cit);
  }

  // Sort by relevance score
  uniqueCitations.sort((a, b) => (b.relevanceScore ?? 0) - (a.relevanceScore ?? 0));

  return {
    summary,
    fullExtract,
    articleTitle,
    citations: uniqueCitations.slice(0, 8),
    topGitHubRepos: topGitHubRepos.length > 0 ? topGitHubRepos : undefined,
    topHNDiscussions: topHNDiscussions.length > 0 ? topHNDiscussions : undefined,
  };
}

// Synchronous fallback helper for fast initial render
export function performWebSearch(query: string): Citation[] {
  const cleanQ = cleanSearchQuery(query);
  const qLower = cleanQ.toLowerCase();

  return [
    {
      id: `live-1`,
      title: `${cleanQ.charAt(0).toUpperCase() + cleanQ.slice(1)} — Documentation & Reference`,
      url: `https://developer.mozilla.org/search?q=${encodeURIComponent(cleanQ)}`,
      domain: 'developer.mozilla.org',
      snippet: `Official developer specifications, guides, and architectural references for ${cleanQ}.`,
      publishDate: new Date().toISOString().split('T')[0],
      favicon: 'https://www.google.com/s2/favicons?domain=mozilla.org&sz=32',
      relevanceScore: 0.98,
    },
    {
      id: `live-2`,
      title: `${cleanQ} on GitHub (Popular Repositories & Implementations)`,
      url: `https://github.com/topics/${encodeURIComponent(qLower.replace(/ /g, '-'))}`,
      domain: 'github.com',
      snippet: `Explore open-source implementations, starred libraries, and tools built around ${cleanQ}.`,
      publishDate: new Date().toISOString().split('T')[0],
      favicon: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
      relevanceScore: 0.95,
    },
    {
      id: `live-3`,
      title: `${cleanQ} — Wikipedia In-Depth Encyclopedia`,
      url: `https://en.wikipedia.org/wiki/${encodeURIComponent(cleanQ.replace(/ /g, '_'))}`,
      domain: 'wikipedia.org',
      snippet: `Historical background, foundational concepts, architecture, and widespread applications of ${cleanQ}.`,
      publishDate: new Date().toISOString().split('T')[0],
      favicon: 'https://www.google.com/s2/favicons?domain=wikipedia.org&sz=32',
      relevanceScore: 0.92,
    },
  ];
}
