import { NewtonFringe } from "@workspace/ui/components/newton-fringe";

import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const usageCode = `import { NewtonFringe } from "@/components/ui/newton-fringe"

<div className="relative h-[520px] w-full overflow-hidden">
  <NewtonFringe className="absolute inset-0" />
</div>`;

const slowCode = `import { NewtonFringe } from "@/components/ui/newton-fringe"

<NewtonFringe speed={0.5} />`;

const fastCode = `import { NewtonFringe } from "@/components/ui/newton-fringe"

<NewtonFringe speed={1.8} />`;

export async function NewtonFringeDocs() {
  const sourceCode =
    (await readComponentSource("newton-fringe")) || "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Newton Fringe"
      description="Thin-film interference fringes drifting between two contact points — iridescent Newton's rings on near-black."
      preview={
        <div className="relative h-[420px] w-full overflow-hidden rounded-lg">
          <NewtonFringe className="absolute inset-0" />
        </div>
      }
      previewCode={usageCode}
      installPackageName="newton-fringe"
      installSourceCode={sourceCode}
      usageCode={usageCode}
      installationNote="The component renders a WebGL canvas that fills its container, so give the parent an explicit height. If WebGL is unavailable it renders nothing rather than throwing."
      examples={[
        {
          title: "Slow",
          code: slowCode,
          preview: (
            <div className="relative h-[240px] w-full overflow-hidden rounded-lg">
              <NewtonFringe className="absolute inset-0" speed={0.5} />
            </div>
          ),
        },
        {
          title: "Fast",
          code: fastCode,
          preview: (
            <div className="relative h-[240px] w-full overflow-hidden rounded-lg">
              <NewtonFringe className="absolute inset-0" speed={1.8} />
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
