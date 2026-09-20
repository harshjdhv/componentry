import React from "react"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"
import { LiveCodeBlock } from "@/components/live-code-block"
import { Download } from "lucide-react"

import {
  SignaturePlayground,
  SignaturePersonalizePanel,
} from "@/components/docs/previews/signature-playground"

const defaultCode = `import { Signature } from "@/components/ui/signature"

<Signature text="Componentry" />`

export async function SignatureDocs() {
  const sourceCode = (await readComponentSource("signature")) || "// Unable to load source code"

  const installationNote = (
    <div className="flex flex-col gap-2 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-900 dark:text-orange-200 text-sm mb-4">
      <p>
        <strong>Font Requirement:</strong> To enable the hand-written effect accurately, you must download the
        required font file and place it in your project&apos;s <code className="bg-orange-500/20 px-1 py-0.5 rounded">public</code> directory.
      </p>
      <a
        href="/LastoriaBoldRegular.otf"
        download="LastoriaBoldRegular.otf"
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-orange-500/20 hover:bg-orange-500/30 font-medium w-fit transition-colors mt-1"
      >
        <Download className="w-4 h-4" />
        Download LastoriaBoldRegular.otf
      </a>
    </div>
  );

  return (
    <DocsPageLayout
      title="Signature"
      description="An animated SVG signature effect using Opentype.js and Framer Motion to draw out text as if hand-written."
      
      preview={<SignaturePlayground />}
      personalizeContent={<SignaturePersonalizePanel />}
      previewCode=""
      
      installPackageName="signature"
      installDependencies="framer-motion opentype.js"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/signature.tsx"
      
      installationNote={installationNote}
      usageCode={<LiveCodeBlock defaultCode={defaultCode} />}
      
      props={[
        {
          name: "fontUrl",
          type: "string",
          description: "URL of a font file to load instead of the default Lastoria font paths.",
        },
        {
          name: "text",
          type: "string",
          default: '"Signature"',
          description: "Text to generate signature for.",
        },
        {
          name: "color",
          type: "string",
          default: '"currentColor"',
          description: "Color of the signature path.",
        },
        {
          name: "fontSize",
          type: "number",
          default: "32",
          description: "Font size of the signature.",
        },
        {
          name: "duration",
          type: "number",
          default: "1.5",
          description: "Drawing duration per character in seconds. Characters start 0.2 seconds apart.",
        },
        {
          name: "delay",
          type: "number",
          default: "0",
          description: "Delay before animation starts in seconds.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
        },
        {
          name: "inView",
          type: "boolean",
          default: "false",
          description: "Only animate when in view.",
        },
        {
          name: "once",
          type: "boolean",
          default: "true",
          description: "Animate only on the first viewport entry when inView is enabled.",
        },
      ]}
    />
  )
}
