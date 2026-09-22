'use client';

import React from 'react';
import { CodeBlock } from './CodeBlock';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  // Split content by code blocks: ```lang ... ```
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="text-slate-100 text-[14.5px] leading-relaxed space-y-3 font-normal">
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const firstLineEnd = part.indexOf('\n');
          let language = 'typescript';
          let code = '';

          if (firstLineEnd !== -1) {
            language = part.slice(3, firstLineEnd).trim() || 'typescript';
            code = part.slice(firstLineEnd + 1, -3);
          } else {
            code = part.slice(3, -3);
          }

          return (
            <CodeBlock
              key={index}
              language={language}
              code={code}
            />
          );
        }

        // Render standard markdown text blocks
        return <TextBlock key={index} text={part} />;
      })}
    </div>
  );
}

function TextBlock({ text }: { text: string }) {
  if (!text.trim()) return null;

  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let tableBuffer: string[] = [];
  let inTable = false;

  const flushTable = () => {
    if (tableBuffer.length > 0) {
      elements.push(
        <div key={`table-${elements.length}`} className="my-3 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50">
          <table className="w-full text-left text-xs">
            <tbody>
              {tableBuffer.map((rowText, rIdx) => {
                const cols = rowText.split('|').map((c) => c.trim()).filter((c) => c.length > 0);
                if (rowText.includes('---')) return null; // separator row

                const isHeader = rIdx === 0;
                return (
                  <tr
                    key={rIdx}
                    className={isHeader ? 'bg-slate-800/80 font-semibold text-slate-200 border-b border-slate-800' : 'border-b border-slate-800/40 hover:bg-slate-800/30 text-slate-300'}
                  >
                    {cols.map((col, cIdx) => (
                      <td key={cIdx} className="p-3 font-medium">
                        {renderInlineFormatting(col)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      tableBuffer = [];
      inTable = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Table detection
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      inTable = true;
      tableBuffer.push(line.trim());
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Headers
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-base font-bold text-white pt-2 pb-1 tracking-tight flex items-center gap-2">
          {renderInlineFormatting(line.slice(4))}
        </h3>
      );
    } else if (line.startsWith('#### ')) {
      elements.push(
        <h4 key={i} className="text-sm font-semibold text-blue-300 pt-2 pb-0.5 tracking-tight">
          {renderInlineFormatting(line.slice(5))}
        </h4>
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-lg font-extrabold text-white pt-3 pb-1 border-b border-slate-800/60 tracking-tight">
          {renderInlineFormatting(line.slice(3))}
        </h2>
      );
    } else if (line.startsWith('# ')) {
      elements.push(
        <h1 key={i} className="text-xl font-black text-white pt-3 pb-1 tracking-tight">
          {renderInlineFormatting(line.slice(2))}
        </h1>
      );
    } else if (line.startsWith('> ')) {
      // Blockquote
      elements.push(
        <blockquote key={i} className="my-2 border-l-2 border-blue-500 bg-blue-500/5 px-4 py-2 text-slate-300 italic rounded-r-lg">
          {renderInlineFormatting(line.slice(2))}
        </blockquote>
      );
    } else if (line.startsWith('* ') || line.startsWith('- ')) {
      // Bullet list item
      elements.push(
        <li key={i} className="ml-4 list-disc text-slate-200 pl-1 my-1 leading-relaxed">
          {renderInlineFormatting(line.slice(2))}
        </li>
      );
    } else if (/^\d+\.\s/.test(line)) {
      // Numbered list item
      const numMatch = line.match(/^\d+\.\s/);
      const prefix = numMatch ? numMatch[0] : '1. ';
      elements.push(
        <li key={i} className="ml-5 list-decimal text-slate-200 pl-1 my-1 leading-relaxed">
          {renderInlineFormatting(line.slice(prefix.length))}
        </li>
      );
    } else if (line.trim() === '---') {
      elements.push(<hr key={i} className="my-4 border-slate-800" />);
    } else if (line.trim().length > 0) {
      elements.push(
        <p key={i} className="text-slate-200 leading-relaxed my-1">
          {renderInlineFormatting(line)}
        </p>
      );
    }
  }

  if (inTable) {
    flushTable();
  }

  return <div className="space-y-1">{elements}</div>;
}

function renderInlineFormatting(text: string): React.ReactNode {
  // Regex for inline code: `code`
  // bold: **text**
  // italic: *text*
  // citations: [1], [2]
  const inlineParts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[\d+\])/g);

  return inlineParts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="rounded-md bg-slate-800/80 px-1.5 py-0.5 font-mono text-[12.5px] font-medium text-cyan-300 border border-slate-700/50"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (/^\[\d+\]$/.test(part)) {
      const citNum = part.slice(1, -1);
      return (
        <span
          key={i}
          className="inline-flex items-center justify-center h-4 min-w-4 px-1 rounded bg-purple-500/20 text-[10px] font-bold text-purple-300 border border-purple-500/30 mx-0.5 cursor-pointer hover:bg-purple-500/40 transition-colors"
          title={`Source citation #${citNum}`}
        >
          {citNum}
        </span>
      );
    }
    return part;
  });
}
