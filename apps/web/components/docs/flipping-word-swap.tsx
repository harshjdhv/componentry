import { DocsPageLayout } from "@/components/docs-page-layout";
import {
  FlippingWordSwapPersonalizePanel,
  FlippingWordSwapPlayground,
} from "@/components/docs/previews/flipping-word-swap-playground";
import { LiveCodeBlock } from "@/components/live-code-block";
import { readComponentSource } from "@/lib/source-code";

const defaultCode = `import { FlippingWordSwap } from "@/components/ui/flipping-word-swap"

<div className="flex min-h-[400px] items-center justify-center bg-white dark:bg-black">
  <FlippingWordSwap
    word1="Create"
    word2="Refine"
    duration={400}
    stagger={44}
    className="text-zinc-950 dark:text-zinc-100"
    toClassName="text-violet-700 dark:text-violet-500"
    style={{
      fontSize: 88,
      fontWeight: 600,
      letterSpacing: "-0.025em",
    }}
  />
</div>`;

export async function FlippingWordSwapDocs() {
  const sourceCode =
    (await readComponentSource("flipping-word-swap")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Flipping Word Swap"
      description="A clean character-by-character word swap that flips the next word smoothly into place on hover, focus, or tap."
      preview={<FlippingWordSwapPlayground />}
      personalizeContent={<FlippingWordSwapPersonalizePanel />}
      previewCode={defaultCode}
      installPackageName="flipping-word-swap"
      installDependencies="gsap clsx tailwind-merge"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/flipping-word-swap.tsx"
      usageCode={<LiveCodeBlock defaultCode={defaultCode} />}
      fullWidthPreview
      props={[
        {
          name: "word1",
          type: "string",
          description: "The word displayed at rest.",
        },
        {
          name: "word2",
          type: "string",
          description: "The word revealed during interaction.",
        },
        {
          name: "duration",
          type: "number",
          default: "400",
          description: "Duration of each character flip in milliseconds.",
        },
        {
          name: "stagger",
          type: "number",
          default: "44",
          description:
            "Delay between neighboring character flips in milliseconds.",
        },
        {
          name: "className",
          type: "string",
          description:
            "Additional classes for layout and inherited typography.",
        },
        {
          name: "toClassName",
          type: "string",
          description: "Additional classes applied only to the revealed word.",
        },
        {
          name: "style",
          type: "CSSProperties",
          description:
            "Inline styles applied to the container for dynamic typography and color controls.",
        },
        {
          name: "toStyle",
          type: "CSSProperties",
          description: "Inline styles applied only to the revealed word.",
        },
      ]}
    />
  );
}
