import { getInstallCommand } from "./install-command"

export interface DocsPageMarkdownInput {
  title: string
  description: string
  installPackageName: string
  installDependencies?: string
  installSourceCode?: string
  installSourceFilename?: string
  usageCode: string
  examples?: { title: string; code: string }[]
  props?: { name: string; type: string; default?: string; description: string }[]
}

export function buildDocsPageMarkdown(props: DocsPageMarkdownInput): string {
  const lines: string[] = []

  lines.push(`# ${props.title}`)
  lines.push("")
  lines.push(props.description)
  lines.push("")

  lines.push("## Installation")
  lines.push("")
  lines.push(`\`\`\`bash`)
  lines.push(getInstallCommand(props.installPackageName))
  lines.push(`\`\`\``)
  if (props.installDependencies) {
    lines.push("")
    lines.push("**Dependencies:** " + props.installDependencies)
  }
  lines.push("")

  if (props.installSourceCode) {
    lines.push("## Source Code")
    lines.push("")
    lines.push("```tsx")
    lines.push(props.installSourceCode)
    lines.push("```")
    lines.push("")
  }

  const usageStr = typeof props.usageCode === "string" ? props.usageCode : ""
  if (usageStr) {
    lines.push("## Usage")
    lines.push("")
    lines.push("```tsx")
    lines.push(usageStr)
    lines.push("```")
    lines.push("")
  }

  if (props.props && props.props.length > 0) {
    lines.push("## API Reference (Props)")
    lines.push("")
    lines.push("| Prop | Type | Default | Description |")
    lines.push("|------|------|---------|-------------|")
    for (const prop of props.props) {
      const name = `\`${prop.name}\``
      const type = `\`${prop.type}\``
      const defaultVal = prop.default ? `\`${prop.default}\`` : "-"
      lines.push(`| ${[name, type, defaultVal, prop.description].map((value) => value.replace(/\|/g, "\\|").replace(/\r?\n/g, " ")).join(" | ")} |`)
    }
    lines.push("")
  }

  if (props.examples && props.examples.length > 0) {
    for (const example of props.examples) {
      if (example.title && example.code) {
        lines.push(`### ${example.title}`)
        lines.push("")
        lines.push("```tsx")
        lines.push(example.code)
        lines.push("```")
        lines.push("")
      }
    }
  }

  lines.push("---")
  lines.push("")
  lines.push(`_Component from [Componentry](https://componentry.dev/docs/components/${props.installPackageName})_`)

  return lines.join("\n")
}
