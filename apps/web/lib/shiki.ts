import {
  createHighlighter,
  type Highlighter,
  type BundledLanguage,
  type BundledTheme,
} from "shiki";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

// Singleton pattern - cache the highlighter instance
let highlighterPromise: Promise<Highlighter> | null = null;

// Pre-load only the languages we actually use
const LANGS: BundledLanguage[] = ["tsx", "typescript", "bash", "json"];
const THEMES: BundledTheme[] = ["min-light", "min-dark", "dark-plus"];

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
      // Pure-JS regex engine instead of Oniguruma WASM: the WASM instance is
      // process-wide and can get corrupted in a long-running dev server, after
      // which every highlight throws until restart. Output is identical for
      // every component source here.
      engine: createJavaScriptRegexEngine(),
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
  options: {
    lightTheme?: BundledTheme;
    darkTheme?: BundledTheme;
  } = {},
): Promise<string> {
  const lightTheme = options.lightTheme ?? "min-light";
  const darkTheme = options.darkTheme ?? "min-dark";
  const cacheKey = `v7:${lang}:${lightTheme}:${darkTheme}:${code}`;

  const cached = htmlCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  let html: string;
  try {
    html = render(await getHighlighter(), code, lang, lightTheme, darkTheme);
  } catch (error) {
    // Rebuild the highlighter once; if it still fails, show plain code rather
    // than failing the whole page.
    highlighterPromise = null;
    try {
      html = render(await getHighlighter(), code, lang, lightTheme, darkTheme);
    } catch {
      console.warn(`[shiki] highlighting ${lang} failed, rendering plain code:`, (error as Error).message?.slice(0, 120));
      return plainCodeHtml(code);
    }
  }

  // Cache the result (limit cache size to prevent memory issues)
  if (htmlCache.size > 500) {
    // Clear oldest entries (simple LRU approximation)
    const firstKey = htmlCache.keys().next().value;
    if (firstKey) htmlCache.delete(firstKey);
  }
  htmlCache.set(cacheKey, html);

  return html;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Same structure as Shiki's output (pre > code > span.line), without colours. */
function plainCodeHtml(code: string): string {
  const lines = code
    .trim()
    .split("\n")
    .map((line, i) => `<span class="line" data-line="${i + 1}">${escapeHtml(line) || "\u00A0"}</span>`)
    .join("\n");
  return `<pre class="shiki" tabindex="0"><code class="grid counter-reset-line">${lines}</code></pre>`;
}

function render(
  highlighter: Highlighter,
  code: string,
  lang: BundledLanguage,
  lightTheme: BundledTheme,
  darkTheme: BundledTheme,
): string {
  return highlighter.codeToHtml(code.trim(), {
    lang,
    themes: {
      light: lightTheme,
      dark: darkTheme,
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
          // Empty lines collapse to 0 height in CSS grid — keep a gap after imports etc.
          const isEmpty =
            !node.children?.length ||
            node.children.every(
              (child) =>
                child.type === "text" &&
                (!(child as { value?: string }).value ||
                  (child as { value?: string }).value === "\n"),
            );
          if (isEmpty) {
            node.children = [
              {
                type: "element",
                tagName: "span",
                properties: {},
                children: [{ type: "text", value: "\u00A0" }],
              },
            ];
          }
        },
      },
    ],
  });
}
