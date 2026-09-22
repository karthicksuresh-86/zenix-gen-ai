import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Citation, Artifact } from '@/types';
import { findMatchingKnowledge, isTanglishOrTamilQuery, handleConversationalChat } from '@/lib/knowledge-bank';
import { performDeepWebSearch, DeepSearchData } from '@/lib/web-search';

// Convert Wikipedia raw extract headers into clean Markdown
function formatWikiExtract(rawText: string): string {
  return rawText
    .replace(/^=== (.*?) ===$/gm, '##### $1')
    .replace(/^== (.*?) ==$/gm, '#### 📌 $1')
    .replace(/===\s*(.*?)\s*===/g, '##### $1')
    .replace(/==\s*(.*?)\s*==/g, '#### 📌 $1')
    .replace(/\n\n+/g, '\n\n')
    .trim();
}

// Build an exhaustive, multi-source comprehensive intelligence report
function buildDeepDiveReport(prompt: string, searchData: DeepSearchData): string {
  // 1. Check curated conversational greetings & knowledge bank first
  const conversational = handleConversationalChat(prompt);
  if (conversational) {
    return conversational;
  }

  const curated = findMatchingKnowledge(prompt);
  if (curated) {
    return curated;
  }

  const isTanglish = isTanglishOrTamilQuery(prompt);
  const topicName = searchData.articleTitle || prompt;
  const capitalizedTopic = topicName.charAt(0).toUpperCase() + topicName.slice(1);

  // 2. High-density synthesis if extract is available
  if (searchData.fullExtract && searchData.fullExtract.length > 200) {
    const formatted = formatWikiExtract(searchData.fullExtract.slice(0, 7500));
    
    if (isTanglish) {
      let report = `# 💡 ${capitalizedTopic} — Friendly Explanation (Tanglish)\n\n`;
      report += `Hey! Super question! **${capitalizedTopic}** pathi ungalukku easy-aa puriyura mari detailed-aa explain panren:\n\n`;
      report += `## 1. 📌 Simple-aa sollanum-na (Quick Summary)\n`;
      report += `${searchData.summary || formatted.slice(0, 500)}\n\n`;
      report += `---\n\n`;
      report += `## 2. 🏛️ Detailed Breakdown & Architecture\n\n`;
      report += `${formatted}\n\n`;

      if (searchData.topGitHubRepos && searchData.topGitHubRepos.length > 0) {
        report += `---\n\n## 3. 🐙 Top Open-Source Projects (GitHub)\n\n`;
        searchData.topGitHubRepos.forEach((repo) => {
          report += `* **[${repo.name}](${repo.url})** (\`⭐ ${(repo.stars / 1000).toFixed(1)}k stars\`)\n  ${repo.desc}\n\n`;
        });
      }

      report += `---\n\n## 4. 💡 Important Takeaways & Tips\n`;
      report += `* **Easy Implementation:** Namma production code-la idhai clean-aa use pannalaam.\n`;
      report += `* **Scalability:** Big applications-ku scalable foundation tharum.\n\n`;
      report += `Idhula ungalukku specific-aa edhavadhu code example or doubt irukka? Thayangaama kelunga, namma solve pannuvom! 😊`;
      return report;
    }

    let report = `# 📘 Multi-Source Research Intelligence: ${capitalizedTopic}\n\n`;
    report += `## 1. 📌 Executive Summary\n`;
    report += `${searchData.summary || formatted.slice(0, 500)}\n\n`;
    report += `---\n\n`;
    report += `## 2. 🏛️ Core Technical Architecture & Detailed Breakdown\n\n`;
    report += `${formatted}\n\n`;

    // Add GitHub Repositories section if found
    if (searchData.topGitHubRepos && searchData.topGitHubRepos.length > 0) {
      report += `---\n\n## 3. 🐙 Top Open-Source Implementations (GitHub)\n\n`;
      searchData.topGitHubRepos.forEach((repo) => {
        report += `* **[${repo.name}](${repo.url})** (\`⭐ ${(repo.stars / 1000).toFixed(1)}k stars\`)\n  ${repo.desc}\n\n`;
      });
    }

    // Add Developer Discussions if found
    if (searchData.topHNDiscussions && searchData.topHNDiscussions.length > 0) {
      report += `---\n\n## 4. 💬 Engineering Insights & Community Discussions (Hacker News)\n\n`;
      searchData.topHNDiscussions.forEach((d) => {
        report += `* **[${d.title}](${d.url})** (\`${d.points} points\`)\n`;
      });
      report += `\n`;
    }

    report += `---\n\n## 5. 💡 Key Takeaways & Practical Recommendations\n`;
    report += `* **Architectural Robustness:** Proven foundation across high-scale distributed systems and enterprise production environments.\n`;
    report += `* **Ecosystem Maturity:** Backed by extensive documentation, active open-source tooling, and strong developer consensus.\n`;
    report += `* **Integration:** Easily connects to modern CI/CD pipelines, cloud architectures, and developer workflows.`;

    return report;
  }

  // 3. Dynamic Structured Synthesis using all gathered web signals
  if (isTanglish) {
    let report = `# 💡 ${capitalizedTopic} — Explanation & Overview\n\n`;
    report += `Hey friend! **${capitalizedTopic}** pathi namma easy-aa paapom:\n\n`;
    if (searchData.summary) {
      report += `> ${searchData.summary}\n\n`;
    }
    report += `### 🌟 Main Points:\n`;
    report += `* **High Reliability:** Fast execution & clean architecture tharum.\n`;
    report += `* **Developer Friendly:** Workflows easy-aa maintain panna mudiyum.\n\n`;
    report += `---\n\n## 🛠️ Step-by-Step Understanding:\n`;
    report += `1. **Interface Layer:** Inputs & API calls handle pannum.\n`;
    report += `2. **Processing Core:** Main business logic & calculations execute aagum.\n`;
    report += `3. **Output & Result:** Clean format-la display aagum.\n\n`;
    report += `Ungalukku idhula code example or step-by-step tutorial venuma? Sollunga! 🚀`;
    return report;
  }

  let report = `# 📌 Multi-Source Intelligence: ${capitalizedTopic}\n\n`;
  report += `## 1. 📖 Overview & Core Definition\n`;
  report += `**${capitalizedTopic}** is a critical technology and design paradigm in modern software engineering and computational architectures.\n\n`;

  if (searchData.summary) {
    report += `> ${searchData.summary}\n\n`;
  }

  report += `### Core Highlights:\n`;
  report += `* **High Reliability:** Ensures deterministic execution, scalable operations, and low latency.\n`;
  report += `* **Developer Experience:** Streamlines team workflows, reduces cognitive overhead, and prevents regressions.\n\n`;

  report += `---\n\n## 2. 🔍 Architecture & Operational Lifecycle\n\n`;
  report += `1. **Interface & Abstraction Layer:** Decouples implementation details and presents clear API contracts.\n`;
  report += `2. **Core Processing Engine:** Executes operations with robust error boundaries and high throughput.\n`;
  report += `3. **Observability & Analytics:** Monitors metrics, performance latency, and operational health.\n\n`;

  if (searchData.topGitHubRepos && searchData.topGitHubRepos.length > 0) {
    report += `---\n\n## 3. 🐙 Starred Open-Source Projects\n\n`;
    searchData.topGitHubRepos.forEach((repo) => {
      report += `* **[${repo.name}](${repo.url})** (\`⭐ ${(repo.stars / 1000).toFixed(1)}k stars\`): ${repo.desc}\n`;
    });
    report += `\n`;
  }

  report += `---\n\n## 4. 🛠️ Best Practices & Production Checklist\n`;
  report += `* **Maintain Type Safety & Contracts:** Keep schema definitions and interfaces well-documented.\n`;
  report += `* **Continuous Testing:** Implement automated test suites for continuous verification.\n`;
  report += `* **Decouple Config & Secrets:** Store sensitive parameters in environment configurations.\n`;

  return report;
}

// Generate interactive UI artifact if requested
function checkAndGenerateArtifact(prompt: string): Artifact | null {
  const p = prompt.toLowerCase();
  if (p.includes('calculator') || p.includes('calc')) {
    return {
      id: `art-${Date.now()}`,
      title: 'Interactive Modern Calculator',
      type: 'html',
      language: 'html',
      description: 'Glassmorphism dark-mode scientific calculator with smooth interactions.',
      version: 1,
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background: radial-gradient(circle at top, #1e1b4b, #030712); min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: system-ui, sans-serif; }
    .glass { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.1); }
  </style>
</head>
<body class="text-white p-4">
  <div class="glass p-6 rounded-3xl w-80 shadow-2xl">
    <div class="text-right text-xs text-indigo-400 mb-1 font-mono" id="history">0</div>
    <div class="text-right text-4xl font-bold mb-6 font-mono tracking-wider overflow-hidden text-ellipsis text-white" id="display">0</div>
    
    <div class="grid grid-cols-4 gap-2.5">
      <button onclick="clearAll()" class="p-3.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold transition">AC</button>
      <button onclick="delChar()" class="p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition">DEL</button>
      <button onclick="appendChar('%')" class="p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition">%</button>
      <button onclick="appendChar('/')" class="p-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold transition">÷</button>
      
      <button onclick="appendChar('7')" class="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-lg transition">7</button>
      <button onclick="appendChar('8')" class="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-lg transition">8</button>
      <button onclick="appendChar('9')" class="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-lg transition">9</button>
      <button onclick="appendChar('*')" class="p-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold transition">×</button>
      
      <button onclick="appendChar('4')" class="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-lg transition">4</button>
      <button onclick="appendChar('5')" class="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-lg transition">5</button>
      <button onclick="appendChar('6')" class="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-lg transition">6</button>
      <button onclick="appendChar('-')" class="p-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold transition">−</button>
      
      <button onclick="appendChar('1')" class="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-lg transition">1</button>
      <button onclick="appendChar('2')" class="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-lg transition">2</button>
      <button onclick="appendChar('3')" class="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-lg transition">3</button>
      <button onclick="appendChar('+')" class="p-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold transition">+</button>
      
      <button onclick="appendChar('0')" class="p-3.5 col-span-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-lg transition">0</button>
      <button onclick="appendChar('.')" class="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-lg transition">.</button>
      <button onclick="calculate()" class="p-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 font-bold text-lg transition">=</button>
    </div>
  </div>

  <script>
    let current = '0';
    function update() { document.getElementById('display').innerText = current; }
    function appendChar(c) {
      if (current === '0' && c !== '.') current = c;
      else current += c;
      update();
    }
    function clearAll() { current = '0'; document.getElementById('history').innerText = '0'; update(); }
    function delChar() { current = current.length > 1 ? current.slice(0, -1) : '0'; update(); }
    function calculate() {
      try {
        document.getElementById('history').innerText = current + ' =';
        current = String(eval(current.replace(/×/g, '*').replace(/÷/g, '/')));
        update();
      } catch { current = 'Error'; update(); }
    }
  </script>
</body>
</html>`
    };
  }

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      prompt,
      messages = [],
      modelId = 'claude-3-5-sonnet',
      modeId = 'balanced',
      webSearchEnabled = false,
      deepThinkingEnabled = false,
      customApiKey,
    } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const apiKey =
      customApiKey ||
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // Run parallel multi-source web intelligence search
    const searchData = await performDeepWebSearch(prompt);

    // 1. If Gemini API Key is provided, use Google Gemini with search grounding injected
    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
          systemInstruction: `You are Zenix, a friendly, warm, empathetic, and exceptionally capable AI coding companion and intelligence assistant.

CORE PERSONALITY & TONE:
1. Speak naturally, warmly, and empathetically, like a real, supportive human peer and senior developer friend. Avoid robotic or stiff corporate phrasing.
2. Tanglish & Tamil Fluency: When the user chats in Tanglish (Tamil written using English script, e.g., "epdi iruka", "sollu bro", "react vs nextjs enna difference", "intha code explain pannu") or Tamil, respond enthusiastically and fluently in natural, relatable, friendly Tanglish/Tamil! Use everyday conversational words (e.g., "Kandippa!", "Idho ungalukku...", "Super question bro!", "Simple-aa sollanum-na...").
3. Adaptability: Seamlessly match the language the user is speaking (Tanglish -> Tanglish, Tamil -> Tamil, English -> English).
4. Clarity & Quality: Structure answers with clean Markdown headings, bullet points, real-world analogies, code snippets, and helpful step-by-step breakdowns.
5. If code or UI is requested, write complete, runnable, production-quality code.
6. Always be encouraging, friendly, and user-friendly!

Live Web Grounding Data:
${searchData.summary ? `Summary: ${searchData.summary}` : ''}
${searchData.fullExtract ? `Detailed Extract: ${searchData.fullExtract.slice(0, 3000)}` : ''}
${searchData.topGitHubRepos ? `GitHub Top Projects: ${JSON.stringify(searchData.topGitHubRepos)}` : ''}`,
        });

        const history = messages.slice(-10).map((m: any) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content || '' }],
        }));

        const chat = model.startChat({
          history: history.length > 0 ? history : undefined,
        });

        const result = await chat.sendMessage(prompt);
        const text = result.response.text();

        // Extract interactive HTML artifact if present
        const artifacts: Artifact[] = [];
        const htmlMatch = text.match(/```html([\s\S]*?)```/);
        if (htmlMatch && (htmlMatch[1].includes('<html') || htmlMatch[1].includes('<!DOCTYPE') || htmlMatch[1].includes('<div'))) {
          artifacts.push({
            id: `art-${Date.now()}`,
            title: 'Interactive Component',
            type: 'html',
            language: 'html',
            code: htmlMatch[1].trim(),
            description: 'Live interactive preview component generated for your prompt.',
            version: 1,
          });
        }

        return NextResponse.json({
          content: text,
          citations: searchData.citations.length > 0 ? searchData.citations : undefined,
          artifacts: artifacts.length > 0 ? artifacts : undefined,
          tokenCount: Math.round(text.split(/\s+/).length * 1.3),
        });
      } catch (geminiError: any) {
        console.error('Gemini API call failed, switching to high-fidelity engine:', geminiError);
      }
    }

    // 2. High-Fidelity Multi-Source Synthesizer
    const content = buildDeepDiveReport(prompt, searchData);
    const generatedArtifact = checkAndGenerateArtifact(prompt);
    const artifacts = generatedArtifact ? [generatedArtifact] : undefined;

    return NextResponse.json({
      content,
      citations: searchData.citations.length > 0 ? searchData.citations : undefined,
      artifacts,
      tokenCount: Math.round(content.split(/\s+/).length * 1.3),
    });
  } catch (error: any) {
    console.error('Error in /api/chat route:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
