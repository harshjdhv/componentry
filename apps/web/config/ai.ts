export const AI_ASSISTANTS = [
    {
        name: 'ChatGPT',
        id: 'chatgpt',
        url: (prompt: string) => `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`
    },
    {
        name: 'Claude',
        id: 'claude',
        url: (prompt: string) => `https://claude.ai/new?q=${encodeURIComponent(prompt)}`
    },
    {
        name: 'Scira',
        id: 'scira',
        url: (prompt: string) => `https://scira.app/?q=${encodeURIComponent(prompt)}`
    }
]
