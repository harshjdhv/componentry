import React from "react";
import { TextMorph } from "@workspace/ui/components/text-morph";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { LiveCodeBlock } from "@/components/live-code-block";
import {
  TextMorphInlinePreview,
  TextMorphPersonalizePanel,
  TextMorphPlayground,
  TextMorphThemePreview,
} from "@/components/docs/previews/text-morph-playground";
import { readComponentSource } from "@/lib/source-code";

const basicUsageCode = `import { TextMorph } from "@/components/ui/text-morph"

<TextMorph
  words={["IMAGINE", "REFINE", "RELEASE"]}
  interval={2400}
  morphDuration={680}
  subtext="From idea to impact"
/>`;

const productCode = `import { TextMorph } from "@/components/ui/text-morph"

<TextMorph
  words={["THINKING", "RESEARCHING", "COMPOSING", "READY"]}
  interval={1800}
  morphDuration={560}
  subtext="Assistant status"
  fontSize="clamp(2.25rem, 7vw, 5.5rem)"
  textClassName="tracking-[-0.075em]"
/>`;

const metricsCode = `import { TextMorph } from "@/components/ui/text-morph"

<TextMorph
  words={["1.2K", "8.4K", "25K", "100K"]}
  interval={1800}
  morphDuration={520}
  subtext="Monthly active users"
  fontSize="clamp(4rem, 14vw, 9rem)"
  textClassName="font-mono tabular-nums"
/>`;

const languageCode = `import { TextMorph } from "@/components/ui/text-morph"

<TextMorph
  words={["HELLO", "BONJOUR", "こんにちは", "नमस्ते", "HOLA"]}
  interval={1900}
  morphDuration={620}
  subtext="One idea, many voices"
/>`;

function ShowcaseFrame({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={
        tone === "dark"
          ? "flex h-full min-h-[380px] w-full items-center justify-center overflow-hidden bg-[#0d0e0e] p-8 text-[#f2f1eb]"
          : "flex h-full min-h-[380px] w-full items-center justify-center overflow-hidden bg-[#f1f0eb] p-8 text-[#171817]"
      }
    >
      {children}
    </div>
  );
}

export async function TextMorphDocs() {
  const sourceCode =
    (await readComponentSource("text-morph")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Text Morph"
      description="A fluid typography transition that blends blurred word silhouettes through an SVG alpha threshold, then releases the filter for a perfectly crisp resting state."
      preview={<TextMorphPlayground />}
      personalizeContent={<TextMorphPersonalizePanel />}
      previewCode={basicUsageCode}
      installPackageName="text-morph"
      installDependencies="clsx tailwind-merge"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/text-morph.tsx"
      usageCode={<LiveCodeBlock defaultCode={basicUsageCode} />}
      fullWidthPreview
      examples={[
        {
          title: "Product Signal",
          preview: (
            <ShowcaseFrame>
              <TextMorph
                words={["THINKING", "RESEARCHING", "COMPOSING", "READY"]}
                interval={1800}
                morphDuration={560}
                subtext="Assistant status"
                fontSize="clamp(2.25rem, 7vw, 5.5rem)"
                textClassName="tracking-[-0.075em]"
              />
            </ShowcaseFrame>
          ),
          code: productCode,
          fullWidth: true,
        },
        {
          title: "Product Metrics",
          preview: (
            <ShowcaseFrame tone="light">
              <TextMorph
                words={["1.2K", "8.4K", "25K", "100K"]}
                interval={1800}
                morphDuration={520}
                subtext="Monthly active users"
                fontSize="clamp(4rem, 14vw, 9rem)"
                textClassName="font-mono tabular-nums"
              />
            </ShowcaseFrame>
          ),
          code: metricsCode,
          fullWidth: true,
        },
        {
          title: "Languages",
          preview: (
            <ShowcaseFrame>
              <TextMorph
                words={["HELLO", "BONJOUR", "こんにちは", "नमस्ते", "HOLA"]}
                interval={1900}
                morphDuration={620}
                subtext="One idea, many voices"
              />
            </ShowcaseFrame>
          ),
          code: languageCode,
          fullWidth: true,
        },
        {
          title: "Inline",
          preview: <TextMorphInlinePreview />,
          code: `import { TextMorph } from "@/components/ui/text-morph"

<p className="flex items-baseline gap-2 text-6xl">
  Build for
  <TextMorph
    words={["clarity", "momentum", "people"]}
    fontSize="1em"
    fontWeight={500}
  />
</p>`,
          fullWidth: true,
        },
        {
          title: "Light & Dark",
          preview: <TextMorphThemePreview />,
          code: basicUsageCode,
          fullWidth: true,
        },
      ]}
      props={[
        {
          name: "words",
          type: "string[]",
          default: '["IMAGINE", "REFINE", "RELEASE"]',
          description: "Words or phrases displayed by the morph sequence.",
        },
        {
          name: "interval",
          type: "number",
          default: "2600",
          description:
            "Time each word rests before the next morph begins, in milliseconds.",
        },
        {
          name: "morphDuration",
          type: "number",
          default: "680",
          description: "Duration of the fluid morph in milliseconds.",
        },
        {
          name: "blur",
          type: "number",
          default: "12",
          description: "Maximum blur used to merge the two silhouettes.",
        },
        {
          name: "threshold",
          type: "number",
          default: "18",
          description: "Alpha contrast applied by the SVG threshold filter.",
        },
        {
          name: "subtext",
          type: "string",
          description: "Optional supporting text shown below the morph.",
        },
        {
          name: "fontSize",
          type: "string",
          default: '"clamp(3rem, 14vw, 9rem)"',
          description: "CSS font-size value for the morphing text.",
        },
        {
          name: "fontFamily",
          type: "string",
          default: '"inherit"',
          description:
            "Font family for the morph and subtext. No remote font is loaded.",
        },
        {
          name: "fontWeight",
          type: 'CSSProperties["fontWeight"]',
          default: "700",
          description: "CSS font weight for the morphing text.",
        },
        {
          name: "align",
          type: '"left" | "center" | "right"',
          default: '"center"',
          description: "Horizontal alignment of the text and supporting copy.",
        },
        {
          name: "animateWidth",
          type: "boolean",
          default: "true",
          description:
            "Smoothly interpolate width between differently sized words.",
        },
        {
          name: "loop",
          type: "boolean",
          default: "true",
          description: "Continue cycling through the supplied words.",
        },
        {
          name: "pauseOnHover",
          type: "boolean",
          default: "true",
          description: "Pause the next cycle while hovered or focused.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional classes applied to the root wrapper.",
        },
        {
          name: "textClassName",
          type: "string",
          description: "Additional classes applied to the morphing text stage.",
        },
        {
          name: "subtextClassName",
          type: "string",
          description: "Additional classes applied to the supporting text.",
        },
        {
          name: "onMorphStart",
          type: "(nextWord: string, nextIndex: number) => void",
          description: "Called immediately before a morph begins.",
        },
        {
          name: "onMorphComplete",
          type: "(word: string, index: number) => void",
          description: "Called after the next word becomes crisp and stable.",
        },
      ]}
    />
  );
}
