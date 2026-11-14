import React from "react"
import { SplitFlapDisplayPlayground } from "@/components/docs/previews/split-flap-display-playground"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { LiveCodeBlock } from "@/components/live-code-block"
import { readComponentSource } from "@/lib/source-code"

const basicUsageCode = `import { SplitFlapDisplay } from "@/components/ui/split-flap-display"

<SplitFlapDisplay
  text="HELLO WORLD"
  columns={14}
  size="lg"
/>`

export async function SplitFlapDisplayDocs() {
  const sourceCode = (await readComponentSource("split-flap-display")) || "// Unable to load source code"

  return (
    <DocsPageLayout
      title="Split Flap Display"
      description="A premium split-flap display component inspired by vintage airport departure boards and retro mechanical displays. Features realistic flip animations, staggered character reveals, and configurable indicator strips."
      preview={<SplitFlapDisplayPlayground />}
      previewCode=""
      installPackageName="split-flap-display"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/split-flap-display.tsx"
      usageCode={<LiveCodeBlock defaultCode={basicUsageCode} />}
      fullWidthPreview={true}
      unstyledPreview={true}
      props={[
        {
          name: "text",
          type: "string",
          description: "Simple text to display in a single row.",
        },
        {
          name: "rows",
          type: "SplitFlapRow[]",
          description: "Array of { label, value } objects for a multi-row dashboard board.",
        },
        {
          name: "columns",
          type: "number",
          default: "14",
          description: "Total number of character cells per row.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          description: "Size variant for the cells.",
        },
        {
          name: "accentColor",
          type: "string",
          default: '"#22c55e"',
          description: "Color of the side indicator strips.",
        },
        {
          name: "showIndicators",
          type: "boolean",
          default: "true",
          description: "Whether to show the colored indicator strips on each row.",
        },
        {
          name: "staggerDelay",
          type: "number",
          default: "30",
          description: "Delay in ms between each character starting its flip animation.",
        },
        {
          name: "flipSpeed",
          type: "number",
          default: "35",
          description: "Speed in ms per character flip step.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes for the outer container.",
        },
      ]}
    />
  )
}
