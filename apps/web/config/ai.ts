/**
 * Chat assistants offered under "Ask AI" on docs pages. Each opens with a prompt
 * pointing at the current page; `url` builds the deep link from that prompt.
 */
export const AI_ASSISTANTS = [
  {
    name: "ChatGPT",
    id: "chatgpt",
    url: (prompt: string) => `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
  },
  {
    name: "Claude",
    id: "claude",
    url: (prompt: string) => `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
  },
  {
    name: "Cursor",
    id: "cursor",
    url: (prompt: string) => `https://cursor.com/link/prompt?text=${encodeURIComponent(prompt)}`,
  },
  {
    name: "Perplexity",
    id: "perplexity",
    url: (prompt: string) => `https://www.perplexity.ai/search?q=${encodeURIComponent(prompt)}`,
  },
  {
    name: "Gemini",
    id: "gemini",
    url: (prompt: string) => `https://gemini.google.com/app?q=${encodeURIComponent(prompt)}`,
  },
  {
    name: "Le Chat",
    id: "mistral",
    url: (prompt: string) => `https://chat.mistral.ai/chat?q=${encodeURIComponent(prompt)}`,
  },
  {
    name: "Scira",
    id: "scira",
    url: (prompt: string) => `https://scira.ai/?q=${encodeURIComponent(prompt)}`,
  },
] as const
