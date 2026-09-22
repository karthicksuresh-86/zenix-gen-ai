export interface TopicKnowledge {
  keywords: string[];
  title: string;
  generateResponse: (prompt: string, isTanglishOrTamil: boolean) => string;
}

export const TOPIC_KNOWLEDGE_BASE: TopicKnowledge[] = [
  // 1. Git & GitHub
  {
    keywords: ['git', 'github', 'version control', 'vcs', 'git vs github', 'commit', 'branch', 'pull request', 'merge conflict'],
    title: 'Git and GitHub: Comprehensive Version Control Guide',
    generateResponse: (prompt, isTamil) => {
      if (isTamil) {
        return `# 📌 Git & GitHub — முழுமையான விளக்கம் (Tamil & English Guide)

**Git** மற்றும் **GitHub** இரண்டுமே Software Development-ல் மிக முக்கியமான கருவிகள்.

---

## 1. 🔍 Git என்றால் என்ன? (What is Git?)
* **Git** என்பது உங்கள் கம்ப்யூட்டரில் இயங்கும் ஒரு **Version Control System (VCS)**.
* இது உங்கள் கோப்புகளில் (Files / Code) செய்யப்படும் ஒவ்வொரு மாற்றத்தையும் (Changes) டிராக் (Track) செய்யும்.
* **Offline-ல் வேலை செய்யும்:** இன்டர்நெட் இல்லாமலே நீங்கள் commit, branch, merge செய்யலாம்.
* **உதாரணம்:** ஒரு Game-ல் நீங்கள் Safe Point சேமிப்பது போல, Git-ல் உங்கள் Code-ஐ ஒவ்வொரு கட்டத்திலும் commit செய்து சேமித்து வைக்கலாம். ஏதாவது தவறு நடந்தால் பழைய நிலைக்குத் திரும்பலாம்.

---

## 2. 🌐 GitHub என்றால் என்ன? (What is GitHub?)
* **GitHub** என்பது Git Repositories-ஐ ஆன்லைனில் சேமிக்கும் ஒரு **Cloud Platform** ஆகும்.
* உங்கள் Code-ஐ இணையத்தில் பேக்கப் எடுக்கவும், உலகம் முழுவதும் உள்ள மற்ற டெவலப்பர்களுடன் இணைந்து பணியாற்றவும் (Collaboration) இது பயன்படுகிறது.
* **முக்கிய அம்சங்கள்:** Pull Requests, Code Reviews, Issue Tracking, GitHub Actions (CI/CD), Open Source Hosting.

---

## 3. 📊 Git vs GitHub — முக்கிய வேறுபாடுகள்

| அம்சம் (Feature) | Git | GitHub |
| :--- | :--- | :--- |
| **வகை** | Local Software Tool | Cloud-based Web Service |
| **இயங்கும் இடம்** | உங்கள் லேப்டாப் / கம்ப்யூட்டர் | ஆன்லைன் சர்வர்கள் (Cloud) |
| **இன்டர்நெட்** | தேவையில்லை (Offline) | தேவை (Online Sync) |
| **பயன்பாடு** | Code மாற்றங்களை டிராக் செய்ய | Code-ஐ பகிர மற்றும் குழுவாக பணியாற்ற |
| **உரிமையாளர்** | Open Source (Linus Torvalds) | Microsoft |

---

## 4. 🛠️ அத்தியாவசிய Git கட்டளைகள் (Essential Commands)

\`\`\`bash
# 1. புதிய Git Repository தொடங்க
git init

# 2. கோப்புகளை Staging Area-விற்கு சேர்க்க
git add .

# 3. மாற்றங்களை Commit செய்ய (Save Point)
git commit -m "feat: initial project setup"

# 4. GitHub Remote Repo-வை இணைக்க
git remote add origin https://github.com/username/repo-name.git

# 5. GitHub-க்கு Code அனுப்ப (Push)
git push -u origin main

# 6. GitHub-லிருந்து Code டவுன்லோட் செய்ய
git clone https://github.com/username/repo-name.git
\`\`\`

---

## 5. 💡 சுருக்கம் (Summary)
* **Git** = உங்கள் கம்ப்யூட்டரில் கோப்புகளின் வரலாற்றை நிர்வகிக்கும் கருவி.
* **GitHub** = அந்த கோப்புகளை இணையத்தில் வைத்து குழுவாக இணைந்து வேலை செய்யும் தளம்.`;
      }

      return `# 📌 Comprehensive Guide: Git & GitHub

---

## 1. 📖 Overview & Core Definition

* **Git** is a free and open-source **Distributed Version Control System (DVCS)** designed to track changes in source code during software development. It runs locally on your computer.
* **GitHub** is a **Cloud-based platform** that hosts Git repositories. It provides collaboration tools, code review mechanisms, CI/CD automation, and project management.

> **💡 Real-World Analogy:**  
> If **Git** is your digital camera that captures timestamps and snapshots of your work locally, **GitHub** is **Instagram / Google Drive** where you upload, share, and collaborate on those photos with your team.

---

## 2. 🔍 Understanding Git (The Engine)

Created by **Linus Torvalds** in 2005 (the creator of Linux), Git solves the problem of tracking file revisions, preventing accidental code overwrites, and managing concurrent development.

### The 3 Local Zones of Git:
1. **Working Directory:** The local folder where you are actively modifying files.
2. **Staging Area (Index):** A preview zone where you pick and stage files to be included in the next commit (\`git add\`).
3. **Local Repository (.git):** The database where Git permanently stores file snapshots and history (\`git commit\`).

\`\`\`
Working Directory  ──( git add . )──>  Staging Area  ──( git commit )──>  Local Repository (.git)
\`\`\`

---

## 3. 🌐 Understanding GitHub (The Platform)

GitHub supercharges Git by providing a central cloud repository and rich collaboration tools:

1. **Pull Requests (PR):** Propose code changes, request peer reviews, and discuss line-by-line modifications before merging into production.
2. **Issues & Project Boards:** Kanban boards and issue trackers for organizing sprints, bugs, and roadmap features.
3. **GitHub Actions:** Built-in CI/CD (Continuous Integration / Continuous Deployment) to run tests and deploy code automatically on push.
4. **Forks & Open Source:** Fork any public repository, make improvements, and submit a pull request back to the author.

---

## 4. 📊 Git vs. GitHub Comparison

| Feature | Git | GitHub |
| :--- | :--- | :--- |
| **Type** | Version Control Tool / CLI Software | Cloud Hosting & Collaboration Platform |
| **Installation** | Installed locally on your machine | Accessed via Web Browser / Desktop App / CLI |
| **Internet Required** | ❌ No (Works 100% offline) | ✅ Yes (Required for syncing and cloud features) |
| **Core Functionality** | Commit history, branching, merging | Pull Requests, Issues, Actions, Team Management |
| **Created By** | Linus Torvalds (2005) | Chris Wanstrath, PJ Hyett, Tom Preston-Werner (Acquired by Microsoft) |
| **Alternative Competitors** | Mercurial, SVN, Perforce | GitLab, Bitbucket, Azure DevOps |

---

## 5. 🛠️ Essential Git & GitHub Workflow & Commands

### Step 1: Initializing and Committing Locally
\`\`\`bash
# Initialize a new Git repository
git init

# Check the status of your files
git status

# Stage all modified and new files
git add .

# Create a permanent commit with a descriptive message
git commit -m "feat: implement user registration and authentication"
\`\`\`

### Step 2: Branching and Switching
\`\`\`bash
# Create and switch to a new feature branch
git checkout -b feature/dark-mode

# Merge branch into main
git checkout main
git merge feature/dark-mode
\`\`\`

### Step 3: Connecting to GitHub & Synchronizing
\`\`\`bash
# Link local repository to a remote GitHub repo
git remote add origin https://github.com/your-username/your-repo.git

# Push changes to GitHub
git push -u origin main

# Clone an existing remote repository
git clone https://github.com/your-username/your-repo.git

# Pull the latest changes from GitHub
git pull origin main
\`\`\`

---

## 6. 💡 Best Practices
1. **Commit Often, Commit Small:** Make focused, atomic commits for single logical changes.
2. **Write Meaningful Commit Messages:** Follow conventional commits (e.g., \`feat:\`, \`fix:\`, \`docs:\`, \`refactor:\`).
3. **Use \`.gitignore\`:** Always ignore sensitive files (e.g., \`.env\`, \`node_modules/\`, \`.DS_Store\`).
4. **Never Commit Secrets / API Keys:** Use environment variables instead.`;
    }
  },

  // 2. React vs Next.js
  {
    keywords: ['react', 'nextjs', 'next.js', 'react vs nextjs', 'server components', 'ssr', 'csr', 'app router'],
    title: 'React vs Next.js: Complete Architectural Analysis',
    generateResponse: (prompt, isTamil) => {
      return `# ⚛️ React vs Next.js: Architecture, Differences & Guide

---

## 1. 📌 Core Definitions
* **React:** A JavaScript **library** developed by Meta for building component-based User Interfaces. It runs primarily on the client (Client-Side Rendering).
* **Next.js:** A full-stack React **framework** developed by Vercel that brings Server-Side Rendering (SSR), Static Site Generation (SSG), React Server Components (RSC), App Router, and built-in API routes.

> **Analogy:** If **React** is the high-performance car engine, **Next.js** is the complete luxury car with GPS navigation, climate control, safety features, and turbocharger pre-installed.

---

## 2. 📊 Comparison Matrix

| Dimension | React (Pure SPA) | Next.js (Fullstack Framework) |
| :--- | :--- | :--- |
| **Type** | UI Library | Full-Stack Framework |
| **Rendering** | Client-Side (CSR) | SSR, SSG, ISR, RSC (App Router) |
| **Routing** | Requires external library (\`react-router-dom\`) | Built-in file-system based routing (\`app/\` or \`pages/\`) |
| **SEO** | Harder (Empty HTML initially sent to crawlers) | Excellent (HTML rendered on server beforehand) |
| **Backend / APIs** | Requires separate backend (Express, Django) | Built-in API routes & Server Actions |
| **Image & Font Optimization** | Manual configuration | Built-in (\`next/image\`, \`next/font\`) |
| **Data Fetching** | \`useEffect\`, React Query, SWR | Async Server Components (\`await fetch()\`), Server Actions |

---

## 3. 🛠️ Code Comparison

### React (Client-Side Data Fetching):
\`\`\`tsx
// React: Requires useState and useEffect
import { useState, useEffect } from 'react';

export function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
\`\`\`

### Next.js (React Server Component):
\`\`\`tsx
// Next.js: Direct async component on the server (Zero bundle size overhead on client)
export default async function UserListPage() {
  const res = await fetch('https://api.example.com/users', { next: { revalidate: 3600 } });
  const users = await res.json();

  return (
    <ul>
      {users.map((u: any) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

---

## 4. 🎯 When to choose which?
* **Choose React (Vite/SPA)** when: Building internal dashboards, authenticated portals, canvas/game apps where SEO does not matter.
* **Choose Next.js** when: Building e-commerce, SaaS, landing pages, blogs, or products requiring fast LCP, top SEO rankings, and seamless fullstack capability.`;
    }
  },

  // 3. Docker & Containers
  {
    keywords: ['docker', 'container', 'dockerfile', 'docker-compose', 'kubernetes', 'containerization', 'image vs container'],
    title: 'Docker & Containerization Masterclass',
    generateResponse: (prompt, isTamil) => {
      return `# 🐳 Docker & Containers Explained

---

## 1. 📌 What is Docker?
**Docker** is an open platform for developing, shipping, and running applications inside **containers**. Containers package your application code, runtime, system tools, libraries, and configurations together so the app runs consistently on any computer (development laptop, staging, or production cloud).

> **Solving the Classic Problem:** *"It works on my machine, why is it breaking on the server?"* — Docker eliminates this issue completely.

---

## 2. 🧱 Key Docker Concepts

1. **Dockerfile:** A text file with instructions to build a Docker Image (recipe).
2. **Docker Image:** A read-only template with instructions for creating a Docker container (blueprint/executable package).
3. **Docker Container:** A runnable, isolated instance of an image.
4. **Docker Hub / Registry:** A repository for storing and sharing Docker images.
5. **Docker Compose:** A tool for defining and running multi-container Docker applications via YAML file.

---

## 3. 🛠️ Example Dockerfile for Node.js / Next.js
\`\`\`dockerfile
# 1. Base Image
FROM node:20-alpine AS base
WORKDIR /app

# 2. Dependencies
COPY package*.json ./
RUN npm ci

# 3. Build Source Code
COPY . .
RUN npm run build

# 4. Expose Port & Run
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

### Common Docker Commands:
\`\`\`bash
# Build an image
docker build -t my-app:v1 .

# Run container on port 3000
docker run -d -p 3000:3000 --name my-running-app my-app:v1

# View running containers
docker ps

# Stop container
docker stop my-running-app
\`\`\``;
    }
  },

  // 4. Python vs JavaScript
  {
    keywords: ['python', 'javascript', 'python vs javascript', 'js vs python', 'programming language'],
    title: 'Python vs JavaScript: In-Depth Comparison',
    generateResponse: (prompt, isTamil) => {
      return `# 🐍 Python vs 🟨 JavaScript: Complete Comparison

---

## 1. 📌 Overview
* **JavaScript:** The undisputed language of the Web. Runs in all modern browsers and on servers via Node.js / Deno / Bun. Powers dynamic interactive frontend UIs and fullstack architectures.
* **Python:** The undisputed language of **Data Science, Artificial Intelligence / Machine Learning, Automation, and Scientific Computing**. Known for readable, clean syntax.

---

## 2. 📊 Comparison Table

| Feature | Python | JavaScript |
| :--- | :--- | :--- |
| **Primary Domains** | AI/ML, Data Analysis, Backend (FastAPI, Django), Scripting | Frontend (React, Vue), Fullstack Web (Node, Next.js), Mobile (React Native) |
| **Typing System** | Dynamically & Strongly typed | Dynamically & Weakly typed (TypeScript adds static typing) |
| **Concurrency** | Asyncio / Multi-threading (GIL limitation) | Single-threaded Event Loop (Asynchronous Non-blocking I/O) |
| **Package Manager** | pip / uv / poetry (PyPI) | npm / pnpm / yarn (npm registry) |
| **Learning Curve** | Extremely beginner-friendly, clean indentation | Easy to start, complex async/prototype quirks |

---

## 3. 🎯 Summary: Which should you learn?
* Learn **JavaScript / TypeScript** if you want to become a **Frontend / Full-Stack Web Developer**.
* Learn **Python** if you want to work in **AI, Machine Learning, Data Science, Cyber Security, or Automation**.`;
    }
  },

  // 5. REST vs GraphQL vs gRPC
  {
    keywords: ['rest api', 'graphql', 'grpc', 'api design', 'rest vs graphql'],
    title: 'API Architectures: REST vs GraphQL vs gRPC',
    generateResponse: (prompt, isTamil) => {
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
