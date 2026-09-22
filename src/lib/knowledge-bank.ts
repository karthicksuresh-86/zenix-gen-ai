// Conversational & Tanglish Knowledge Engine

export interface TopicKnowledge {
  keywords: string[];
  title: string;
  generateResponse: (prompt: string, isTanglishOrTamil: boolean) => string;
}

// Check if input is Tanglish or Tamil
export function isTanglishOrTamilQuery(prompt: string): boolean {
  const p = prompt.toLowerCase().trim();
  if (/[^\x00-\x7F]/.test(prompt)) return true; // Tamil unicode script

  const tanglishPatterns = [
    /\b(epdi|enna|sollu|solunga|panra|iruka|irukeenga|keta|pesu|pesura|kuda|yen|edhu|engae|inga|anga|varuthu|vanthuchu|purila|theriyala)\b/i,
    /\b(nalla|sandhosham|nandri|vanakkam|bro|machan|thala|nanba|friend|da|pa|ya|la|ma|dhan|thambi|anna)\b/i,
    /\b(saptingala|thungitiya|velai|padikira|kathuko|solli|kodu|doubt|doubtu|purinjitha|solren|pannu|podu|ezhuthu)\b/i,
    /\b(kooda|enakku|ungalku|ungaloda|ennoda|namma|romba|semma|mass|vera|level|super|katru|pesalam)\b/i,
    /\b(tanglish|tamil|thamizh)\b/i,
  ];

  return tanglishPatterns.some(pattern => pattern.test(p));
}

// Friendly Tanglish conversational greetings and small talk handler
export function handleConversationalChat(prompt: string): string | null {
  const p = prompt.toLowerCase().trim();
  const isTanglish = isTanglishOrTamilQuery(prompt);

  // 1. Greetings & "How are you"
  if (
    /^(hi|hello|hey|hola|vanakkam|namaste|hlo|helo)[\s!.]*$/i.test(p) ||
    p.includes('epdi iruka') ||
    p.includes('epdi irukinga') ||
    p.includes('how are you') ||
    p.includes('nalla irukiya') ||
    p.includes('sollu bro') ||
    p.includes('enna panra') ||
    p.includes('enna panringa')
  ) {
    if (isTanglish || p.includes('epdi') || p.includes('enna') || p.includes('vanakkam')) {
      return `### Hey! Vanakkam! 👋

Naan romba nallaa, super-aa iruken! Neenga epdi irukeenga? 

Naan ungaloda **Zenix AI friend**. Enkooda neenga normal people kooda pesura maariye jolly-aa, friendly-aa pesalam:

* 💻 **Coding & Tech Doubts** (React, Next.js, Python, Git, JavaScript, APIs...)
* 🚀 **Projects & App Development** ideas and complete code
* 📚 **Studies & Exam preparation**
* 💬 **General casual chat & brainstorming**

Enna topic pathi pesa poreenga? Ungalukku enna help venum sollunga, namma jolly-aa discuss pannuvom! 😊`;
    }

    return `### Hello! 👋 Welcome to Zenix AI!

I am doing great and excited to chat with you! How are you doing today?

I'm your friendly AI assistant and coding mentor. We can talk naturally about:
* 💻 **Coding, Architecture & Debugging**
* 🚀 **Full-Stack Project Development**
* 💡 **Brainstorming & Technical Deep Dives**
* 💬 **Any everyday questions & learning**

What would you like to explore or build today? Let me know! 😊`;
  }

  // 2. Who are you / Identity
  if (
    p.includes('who are you') ||
    p.includes('un name enna') ||
    p.includes('unoda name') ||
    p.includes('ne yar') ||
    p.includes('ne yaaru') ||
    p.includes('about yourself') ||
    p.includes('zenix pathi')
  ) {
    if (isTanglish) {
      return `### Naan thaan ungaloda Zenix AI! 🚀

Naan oru **Smart, Friendly, Full-Stack AI Assistant & Coding Mentor**.

**Enkooda neenga enna ellam pannalam:**
1. **Friendly-aa Tanglish or English-la chat pannalam:** Neenga epdi pesuringalo athe mari friendly-aa, user-friendly-aa explain pannuven.
2. **Code & Project help:** React, Next.js, Python, Tailwind, Backend APIs, Git nu edhuva irundhalum complete code & guidance tharuven.
3. **Complex concepts-ah simple-aa puriya veppen:** Real-world examples & analogies vachu easy-aa explain pannuven.

Ungalukku ippo enna kethukanum sollunga? Let's start! 🔥`;
    }

    return `### I am Zenix AI! 🚀

Your high-performance, intelligent, and friendly AI coding assistant & mentor.

**What I can do for you:**
* **Friendly natural conversations** in English, Tanglish, and Tamil.
* **Full-stack code generation** (React, Next.js, TypeScript, Tailwind, Python, APIs).
* **Live Interactive UI Artifacts** & real-time problem solving.
* **Deep research and clear step-by-step explanations**.

How can I help you today?`;
  }

  // 3. Asking for help / doubts
  if (
    p.includes('help pannu') ||
    p.includes('oru doubt') ||
    p.includes('doubt iruku') ||
    p.includes('doubt keka') ||
    p.includes('help me') ||
    p.includes('can you help') ||
    p.includes('guide pannu') ||
    p.includes('teach pannu')
  ) {
    if (isTanglish) {
      return `### Kandippa bro/friend! Enna doubt sollunga! 🙌

Edhava irundhalum thayangama kelunga:
* Coding error or bug fix
* Concept explanation (Git, React, Next.js, Python, Database...)
* New project ideas or career advice

Ungaloda question-ai type pannunga, namma easy-aa solve pannalam!`;
    }

    return `### Absolutely! I'm here to help you. 🙌

Feel free to ask any question:
* Debugging or writing code
* Explaining complex concepts with clear examples
* Designing software architectures or databases

What's on your mind? Share your question and let's get it solved!`;
  }

  // 4. Gratitude & compliment
  if (
    p.includes('thank') ||
    p.includes('nandri') ||
    p.includes('super bro') ||
    p.includes('mass') ||
    p.includes('vera level') ||
    p.includes('semma') ||
    p.includes('awesome') ||
    p.includes('great work')
  ) {
    if (isTanglish) {
      return `### Romba sandhosham! Magizhchi! ❤️🔥

Ungalukku help pannadhu romba happy! Innum edhavadhu doubts or help venumna eppo venalum kelunga, namma serndhu build pannuvom! 🚀`;
    }

    return `### You're very welcome! ❤️

Glad I could help! If you have any more questions or want to dive deeper into anything, just let me know. Happy building! 🚀`;
  }

  // 5. Casual everyday questions (eating, daily life)
  if (
    p.includes('saptingala') ||
    p.includes('sapacha') ||
    p.includes('dinner') ||
    p.includes('lunch') ||
    p.includes('breakfast')
  ) {
    if (isTanglish) {
      return `Haha, naan AI aache! Enakku ungaloda chat data & internet knowledge thaan sapadu! ⚡😄

Neenga sapteengala? Enna spl inaikku? Nalla saaptu refreshment eduthutu vanga, namma jolly-aa learn & code pannalam! 🚀`;
    }
  }

  return null;
}

export const TOPIC_KNOWLEDGE_BASE: TopicKnowledge[] = [
  // 1. Git & GitHub
  {
    keywords: ['git', 'github', 'version control', 'vcs', 'git vs github', 'commit', 'branch', 'pull request', 'merge conflict'],
    title: 'Git and GitHub: Comprehensive Version Control Guide',
    generateResponse: (prompt, isTanglish) => {
      if (isTanglish) {
        return `# 📌 Git & GitHub — Super Simple & Friendly Guide (Tanglish)

Hey! Git & GitHub pathi ungalukku romba easy-aa, real-life examples vachu explain panren!

---

## 1. 🔍 Git na enna? (What is Git?)
* **Git** ungaloda computer-la run aagura oru **Version Control System (VCS)**.
* Idhu ungaloda files & code-la neenga panra ovvoru maatrangalayum (changes) **Time Machine** mari record panni vachukkum.
* **Real-life Example:** Namma oru Game vilayadumpothu **Save Point / Checkpoint** poduvom la? Adhey mari Git-la \`git commit\` panni save point vachukalaam. Edhavadhu code crash aana, instant-aa pazhaya save point-ku thirumba poidalaam!
* **Offline-la work aagum:** Internet thevaiye illa.

---

## 2. 🌐 GitHub na enna? (What is GitHub?)
* **GitHub** ungaloda Git repositories-ai online-la store panra oru **Cloud Platform**.
* **Real-life Example:** Git ungaloda camera-la photo edukura mari na, **GitHub** andha photos-ah upload panra Google Drive / Instagram mari!
* Idhula ungaloda code-ai backup panni, world-wide irukura matha developers kooda serndhu work (collaboration) pannalam.

---

## 3. 📊 Git vs GitHub — Quick Comparison

| Feature | Git | GitHub |
| :--- | :--- | :--- |
| **Enna idhu?** | Local Software Tool | Online Cloud Platform |
| **Enga run aagum?** | Ungal Laptop / PC-la | Online Servers (Cloud) |
| **Internet thevaiya?** | ❌ Illai (100% Offline) | ✅ Aamaam (Sync panna thevai) |
| **Main work** | Code changes track panna | Code share panna & team work |
| **Owner** | Open Source (Linus Torvalds) | Microsoft |

---

## 4. 🛠️ Daily Use Panra Important Git Commands

\`\`\`bash
# 1. Pudhu Git Repo start panna
git init

# 2. Files-ah stage panna (ready for save)
git add .

# 3. Changes-ah Save Point (Commit) panna
git commit -m "feat: login page created"

# 4. GitHub remote link add panna
git remote add origin https://github.com/username/repo.git

# 5. GitHub-ku code-ah send panna (Push)
git push -u origin main

# 6. GitHub-la irundhu code download panna
git clone https://github.com/username/repo.git
\`\`\`

---

## 5. 💡 Summary Tips:
* **Git** = Ungal laptop-la code history maintain panra tool.
* **GitHub** = Andha code-ai cloud-la safe-aa store panni share panra website.

Idhula ungalukku edhavadhu specific command or error pathi doubt irukka? Thayangaama kelunga! 😊`;
      }

      return `# 📌 Comprehensive Guide: Git & GitHub

---

## 1. 📖 Overview & Core Definition

* **Git** is a free and open-source **Distributed Version Control System (DVCS)** designed to track changes in source code during software development. It runs locally on your computer.
* **GitHub** is a **Cloud-based platform** that hosts Git repositories. It provides collaboration tools, code review mechanisms, CI/CD automation, and project management.

> **💡 Real-World Analogy:**  
> If **Git** is your digital camera that captures snapshots of your work locally, **GitHub** is **Google Drive / Cloud** where you upload, share, and collaborate on those photos with your team.

---

## 2. 🔍 Understanding Git (The Engine)

Created by **Linus Torvalds** in 2005, Git solves the problem of tracking file revisions, preventing accidental code overwrites, and managing concurrent development.

### The 3 Local Zones of Git:
1. **Working Directory:** The local folder where you are actively modifying files.
2. **Staging Area (Index):** A preview zone where you pick and stage files to be included in the next commit (\`git add\`).
3. **Local Repository (.git):** The database where Git permanently stores file snapshots and history (\`git commit\`).
{{ ... }}
---

## 3. 🌐 Understanding GitHub (The Platform)

GitHub supercharges Git by providing a central cloud repository and rich collaboration tools:
1. **Pull Requests (PR):** Propose code changes, request peer reviews, and discuss line-by-line modifications before merging.
2. **GitHub Actions:** Built-in CI/CD (Continuous Integration / Continuous Deployment) to run tests and deploy code automatically on push.
3. **Forks & Collaboration:** Fork any public repository, make improvements, and submit pull requests.

---

## 4. 🛠️ Essential Git & GitHub Workflow

\`\`\`bash
# 1. Initialize local repository
git init

# 2. Stage and commit files
git add .
git commit -m "feat: initial project setup"

# 3. Connect to GitHub and push
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
\`\`\``;
    }
  },

  // 2. React vs Next.js
  {
    keywords: ['react', 'nextjs', 'next.js', 'react vs nextjs', 'server components', 'ssr', 'csr', 'app router'],
    title: 'React vs Next.js: Architecture, Differences & Guide',
    generateResponse: (prompt, isTanglish) => {
      if (isTanglish) {
        return `# ⚛️ React vs Next.js — Super Clear Tanglish Guide

Namma web development-la romba popular aana rendu tech stack **React** and **Next.js**. Rendum enna difference nu paapom!

---

## 1. 📌 Simple Analogy
* **React** nu solrathu oru **Car Engine** mari (Core UI Library).
* **Next.js** nu solrathu andha engine kooda AC, GPS, Safety features, automatic gear ellaam sernthu varra **Complete Luxury Car** mari (Full-Stack Framework)!

---

## 2. 📊 Main Differences

| Feature | React | Next.js |
| :--- | :--- | :--- |
| **Type** | UI Library | Full-Stack React Framework |
| **Rendering** | Client-Side (Browser-la load aagum) | Server-Side Rendering (SSR) & Static (SSG) |
| **Speed & SEO** | SEO konjam slow (Google bot empty page paarkum) | ⚡ Super Fast & Best SEO (Pre-rendered HTML) |
| **Routing** | Extra package thevai (\`react-router-dom\`) | Built-in File-based Routing (\`app/\` folder) |
| **Backend API** | Separate backend thevai (Node.js/Express) | Built-in API Routes (\`app/api/...\`) |

---

## 3. 💡 Endha Project-ku edhai choose pannanum?
* **React:** Internal dashboards, simple single-page apps (SPA), tools with private login.
* **Next.js:** E-commerce websites, blogs, SaaS landing pages, production apps requiring top SEO & performance.

Ungaloda next project-ku code example venuma? Sollunga, write panni tharen! 😊`;
      }

      return `# ⚛️ React vs Next.js: Architecture, Differences & Guide

---

## 1. 📌 Core Definitions
* **React:** A JavaScript **library** developed by Meta for building component-based User Interfaces. It runs primarily on the client (Client-Side Rendering).
* **Next.js:** A full-stack React **framework** developed by Vercel that brings Server-Side Rendering (SSR), Static Site Generation (SSG), React Server Components (RSC), App Router, and built-in API routes.

> **Analogy:** If **React** is the high-performance car engine, **Next.js** is the complete luxury car with GPS navigation, climate control, and turbocharger pre-installed.

---

## 2. 📊 Comparison Matrix

| Dimension | React (Pure SPA) | Next.js (Fullstack Framework) |
| :--- | :--- | :--- |
| **Type** | UI Library | Full-Stack Framework |
| **Rendering** | Client-Side (CSR) | SSR, SSG, ISR, RSC (App Router) |
| **Routing** | Requires external library (\`react-router-dom\`) | Built-in file-system based routing (\`app/\` or \`pages/\`) |
| **SEO** | Harder (Empty HTML initially sent to crawlers) | Excellent (HTML rendered on server beforehand) |
| **Backend / APIs** | Requires separate backend (Express, Django) | Built-in API routes & Server Actions |`;
    }
  },

  // 3. Python vs JavaScript
  {
    keywords: ['python', 'javascript', 'js vs python', 'python vs javascript', 'learn python', 'learn javascript'],
    title: 'Python vs JavaScript: Full Guide',
    generateResponse: (prompt, isTanglish) => {
      if (isTanglish) {
        return `# 🐍 Python vs 🌐 JavaScript — Which One to Learn? (Tanglish)

Rendumey world-la top most popular programming languages! Ungaloda goal-ku edhu best nu paapom:

---

## 1. 🚀 Quick Decision Guide:
* **JavaScript / TypeScript** padiunga if ungalukku **Web Development (Frontend, Full-Stack, React, Next.js, Mobile Apps)** panna aasai irundha!
* **Python** padiunga if ungalukku **AI, Machine Learning, Data Science, Cyber Security, Automation** panna aasai irundha!

---

## 2. 📊 Comparison

| Feature | Python | JavaScript |
| :--- | :--- | :--- |
| **Syntax** | Romba simple & English mari irukkum | Curly brackets \`{}\` & modern syntax |
| **Primary Domain** | AI, ML, Data Science, Scripting | Web Browsers, Frontend & Backend (Node.js) |
| **Speed** | Moderate (Interpreted) | ⚡ Very Fast (V8 Engine) |
| **Popular Frameworks** | Django, FastAPI, PyTorch, TensorFlow | React, Next.js, Express, Vue |

Python or JavaScript-la code start panna roadmap venuma? Sollunga, step-by-step guide tharen! 🚀`;
      }

      return `# 🐍 Python vs JavaScript: Full Guide & Comparison

---

## 1. 🎯 Overview & Use Cases
* **JavaScript:** The undisputed language of the web. Essential for Frontend (React, Vue), Backend (Node.js), and Cross-Platform Apps (React Native).
* **Python:** The undisputed king of AI, Machine Learning, Data Engineering, and Backend Automation. Clean, readable syntax with massive scientific ecosystem.`;
    }
  },

  // 4. Docker & Containers
  {
    keywords: ['docker', 'container', 'kubernetes', 'docker vs vm', 'dockerfile', 'docker compose'],
    title: 'Docker and Containers: Complete Guide',
    generateResponse: (prompt, isTanglish) => {
      if (isTanglish) {
        return `# 🐳 Docker — Super Simple Tanglish Explanation

---

## 1. 📌 Docker na enna? Why we need it?
Namma developers face panra common problem:  
> *"En laptop-la code nalla work aaguthu bro, aana server / unga computer-la error varudhu!"* 😅

Indha problem-ah fix panna vandhadhu thaan **Docker**!

* Docker ungaloda **Code + Node.js/Python version + Libraries + Settings** ellathayum oru box (Container) kulla pack pannidum.
* Andha Container-ai endha computer or cloud server-la run pannalum **100% same-aa error illama work aagum**!

---

## 2. 🛠️ Important Docker Commands:
\`\`\`bash
# Docker image build panna
docker build -t my-app .

# Container run panna
docker run -p 3000:3000 my-app

# Running containers check panna
docker ps
\`\`\`

Docker setup panna ungal project-ku Dockerfile venuma? Sollunga, ready panni tharen! 🚀`;
      }

      return `# 🐳 Docker & Containers: The Complete Guide

Docker packages application code, runtime, system tools, libraries, and configurations together into lightweight containers so the app runs consistently across any environment.`;
    }
  },

  // 5. REST vs GraphQL vs gRPC
  {
    keywords: ['rest api', 'graphql', 'grpc', 'api design', 'rest vs graphql'],
    title: 'API Architectures: REST vs GraphQL vs gRPC',
    generateResponse: (prompt, isTanglish) => {
      return `# 🔌 API Architectures: REST vs GraphQL vs gRPC

---

## 1. 📌 Definitions & Principles
* **REST (Representational State Transfer):** Resource-oriented API paradigm using standard HTTP verbs (\`GET\`, \`POST\`, \`PUT\`, \`DELETE\`). Stateless, cacheable, and universally supported.
* **GraphQL:** Query language for APIs created by Meta where the client requests **exactly** the fields it needs, preventing over-fetching and under-fetching.
* **gRPC:** High-performance, open-source universal RPC framework developed by Google using **Protocol Buffers (Protobuf)** and HTTP/2 for ultra-fast microservice communication.

---

## 2. 📊 Architectural Comparison

| Parameter | REST | GraphQL | gRPC |
| :--- | :--- | :--- | :--- |
| **Data Format** | JSON / XML | JSON | Binary (Protocol Buffers) |
| **Over-fetching** | Common | ❌ Eliminated | ❌ Eliminated |
| **Speed / Overhead** | Moderate (Text JSON) | Moderate | ⚡ Ultra-fast (Binary HTTP/2) |
| **Browser Support** | Universal | Universal | Limited (requires gRPC-web proxy) |
| **Best Use Case** | Public SaaS APIs, CRUD | Complex dashboards with nested relations | Internal Microservices communication |`;
    }
  }
];

export function findMatchingKnowledge(prompt: string): string | null {
  const p = prompt.toLowerCase().trim();
  const isTamil = /[^\x00-\x7F]/.test(prompt) || 
    p.includes('tamil') || 
    p.includes('tanglish') || 
    p.includes('enna') || 
    p.includes('solunga') || 
    p.includes('epdi') || 
    p.includes('keta') || 
    p.includes('crta');

  // Check against topic knowledge base
  for (const topic of TOPIC_KNOWLEDGE_BASE) {
    const hasMatch = topic.keywords.some(kw => {
      if (kw.includes(' ')) {
        return p.includes(kw);
      }
      const regex = new RegExp(`\\b${kw}\\b`, 'i');
      return regex.test(p);
    });

    if (hasMatch) {
      return topic.generateResponse(prompt, isTamil);
    }
  }

  return null;
}
