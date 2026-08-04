import { DocsPageLayout } from "@/components/docs-page-layout";
import { LiveCodeBlock } from "@/components/live-code-block";
import {
  TextMorphPersonalizePanel,
  TextMorphPlayground,
} from "@/components/docs/previews/text-morph-playground";
import { readComponentSource } from "@/lib/source-code";

const basicUsageCode = `import { TextMorph } from "@/components/ui/text-morph"

<TextMorph
  words={["IMAGINE", "REFINE", "RELEASE"]}
  className="text-4xl font-bold tracking-tight md:text-5xl"
/>`;

export async function TextMorphDocs() {
  const sourceCode =
    (await readComponentSource("text-morph")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Text Morph"
      description="A fluid text primitive that blends one value into the next while preserving its visual center and inheriting the surrounding typography."
      preview={<TextMorphPlayground />}
      personalizeContent={<TextMorphPersonalizePanel />}
      previewCode={basicUsageCode}
      installPackageName="text-morph"
      installDependencies="clsx tailwind-merge"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/text-morph.tsx"
      usageCode={<LiveCodeBlock defaultCode={basicUsageCode} />}
      fullWidthPreview
      props={[
        {
          name: "words",
          type: "string[]",
          default: '["IMAGINE", "REFINE", "RELEASE"]',
          description:
            "Text, numbers, prices, or short phrases displayed by the morph sequence.",
        },
        {
          name: "interval",
          type: "number",
          default: "2600",
          description:
            "Time each value rests before the next morph begins, in milliseconds.",
        },
        {
          name: "morphDuration",
          type: "number",
          default: "680",
          description: "Duration of the fluid morph in milliseconds.",
        },
        {
          name: "className",
          type: "string",
          description:
            "Additional classes for layout or typography. All visual text properties inherit naturally.",
        },
      ]}
    />
  );
}
