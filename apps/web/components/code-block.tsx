import { highlightCode } from "@/lib/shiki";
import { CopyButton } from "./copy-button";
import type { BundledLanguage } from "shiki";

interface CodeBlockProps {
  code: string;
  lang?: string;
  className?: string;
  filename?: string;
}

/**
 * Server Component CodeBlock with cached Shiki highlighting.
 * 
 * PERFORMANCE: Uses a singleton highlighter pattern to avoid the
 * expensive (~200-500ms) cost of creating a new highlighter per render.
 */
export async function CodeBlock({
  code,
  lang = "tsx",
  className,
  filename
}: CodeBlockProps) {
  // Use our cached highlighter for instant highlighting
  const html = await highlightCode(code.trim(), lang as BundledLanguage);

  return (
    <>
      <style>{`
        .shiki {
          counter-reset: line;
        }
        .shiki code {
          display: grid;
        }
        .shiki [data-line]::before {
          counter-increment: line;
          content: counter(line);
          display: inline-block;
          width: 1.5rem;
          margin-right: 1.25rem;
          text-align: right;
          color: #a1a1aa;
          user-select: none;
          font-size: 0.75rem;
        }
        .dark .shiki [data-line]::before {
          color: #52525b;
        }
        .shiki,
        .shiki span {
          background-color: transparent !important;
        }
        .dark .shiki,
        .dark .shiki span {
          color: var(--shiki-dark) !important;
          background-color: transparent !important;
        }
      `}</style>
      <div
        className={`relative rounded-xl text-sm w-full border border-border overflow-hidden bg-zinc-100 dark:bg-zinc-900/50 ${className || ""}`}
      >
        {/* Optional filename header */}
        {filename && (
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-zinc-200/50 dark:bg-zinc-900/80">
            <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <span className="text-xs font-mono text-muted-foreground">{filename}</span>
          </div>
        )}

        <div className="relative group">
          <CopyButton code={code.trim()} />
          <div
            className="[&_pre]:p-4 [&_pre]:overflow-x-auto max-h-[500px] overflow-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </>
  );
}
