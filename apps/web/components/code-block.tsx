import { codeToHtml } from "shiki"

interface CodeBlockProps {
  code: string
  lang?: string
  className?: string
}

export async function CodeBlock({ code, lang = "tsx", className }: CodeBlockProps) {
  const html = await codeToHtml(code.trim(), {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    transformers: [
      {
        name: "line-numbers",
        code(node) {
          if (!node.properties.class) node.properties.class = ""
          node.properties.class += " grid counter-reset-line"
        },
        line(node, line) {
          node.properties["data-line"] = line
        },
      },
    ],
  })

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
          width: 1rem;
          margin-right: 1rem;
          text-align: right;
          color: #a1a1aa;
          user-select: none;
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
        className={`rounded-lg overflow-hidden text-sm [&_pre]:p-4 [&_pre]:overflow-x-auto bg-zinc-100 dark:bg-zinc-900 ${className || ""}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  )
}
