import { RainGlass } from "@workspace/ui/components/rain-glass";

import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const usageCode = `import { RainGlass } from "@/components/ui/rain-glass"

<div className="relative h-[520px] w-full overflow-hidden">
  <RainGlass className="absolute inset-0" />
</div>`;

const slowCode = `import { RainGlass } from "@/components/ui/rain-glass"

<RainGlass speed={0.5} />`;

const fastCode = `import { RainGlass } from "@/components/ui/rain-glass"

<RainGlass speed={1.8} />`;

export async function RainGlassDocs() {
  const sourceCode =
    (await readComponentSource("rain-glass")) || "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Rain Glass"
      description="Rain on a window: every droplet refracts a blurred field of coloured light lying behind the glass."
      preview={
        <div className="relative h-[420px] w-full overflow-hidden rounded-lg">
          <RainGlass className="absolute inset-0" />
        </div>
      }
      previewCode={usageCode}
      installPackageName="rain-glass"
      installSourceCode={sourceCode}
      usageCode={usageCode}
      installationNote="The component renders a WebGL canvas that fills its container, so give the parent an explicit height. If WebGL is unavailable it renders nothing rather than throwing."
      examples={[
        {
          title: "Slow",
          code: slowCode,
          preview: (
            <div className="relative h-[240px] w-full overflow-hidden rounded-lg">
              <RainGlass className="absolute inset-0" speed={0.5} />
            </div>
          ),
        },
        {
          title: "Fast",
          code: fastCode,
          preview: (
            <div className="relative h-[240px] w-full overflow-hidden rounded-lg">
              <RainGlass className="absolute inset-0" speed={1.8} />
            </div>
          ),
        },
      ]}
      props={[
        {
          name: "speed",
          type: "number",
          default: "1",
          description: "Animation speed multiplier.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional styles. The canvas fills its parent, so set a height there.",
        },
      ]}
    />
  );
}
