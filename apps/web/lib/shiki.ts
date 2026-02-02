import {
  createHighlighter,
  type Highlighter,
  type BundledLanguage,
  type BundledTheme,
} from "shiki";

// Singleton pattern - cache the highlighter instance
let highlighterPromise: Promise<Highlighter> | null = null;

// Pre-load only the languages we actually use
const LANGS: BundledLanguage[] = ["tsx", "typescript", "bash", "json"];
const THEMES: BundledTheme[] = ["github-light", "github-dark"];

/**
 * Get or create a cached Shiki highlighter instance.
 * This is a CRITICAL performance optimization - creating a highlighter
 * is expensive (~200-500ms), so we only do it once.
 */
export async function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: THEMES,
      langs: LANGS,
    });
  }
  return highlighterPromise;
}

/**
 * Shared HTML cache for code blocks.
 * In development, this provides instant re-renders.
 * In production, this works alongside Next.js page caching.
 */
const htmlCache = new Map<string, string>();

/**
 * Highlight code with caching.
 * Uses a content-addressable cache key to avoid redundant highlighting.
 */
export async function highlightCode(
  code: string,
  lang: BundledLanguage = "tsx",
): Promise<string> {
  const cacheKey = `${lang}:${code}`;

  const cached = htmlCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const highlighter = await getHighlighter();

  const html = highlighter.codeToHtml(code.trim(), {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    transformers: [
      {
        name: "line-numbers",
        code(node) {
          if (!node.properties.class) node.properties.class = "";
          node.properties.class += " grid counter-reset-line";
        },
        line(node, line) {
          node.properties["data-line"] = line;
        },
      },
    ],
  });

  // Cache the result (limit cache size to prevent memory issues)
  if (htmlCache.size > 500) {
    // Clear oldest entries (simple LRU approximation)
    const firstKey = htmlCache.keys().next().value;
    if (firstKey) htmlCache.delete(firstKey);
  }
  htmlCache.set(cacheKey, html);

  return html;
}
