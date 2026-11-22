import { FluxField } from "@workspace/ui/components/flux-field";

import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const usageCode = `import { FluxField } from "@/components/ui/flux-field"

<div className="relative h-[520px] w-full overflow-hidden">
  <FluxField className="absolute inset-0" />
</div>`;

const slowCode = `import { FluxField } from "@/components/ui/flux-field"

<FluxField speed={0.5} />`;

const fastCode = `import { FluxField } from "@/components/ui/flux-field"

<FluxField speed={1.8} />`;

export async function FluxFieldDocs() {
  const sourceCode =
    (await readComponentSource("flux-field")) || "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Flux Field"
      description="The flux lines of a magnetic dipole drawn as fine glowing contours between two drifting poles."
      preview={
        <div className="relative h-[420px] w-full overflow-hidden rounded-lg">
          <FluxField className="absolute inset-0" />
        </div>
      }
      previewCode={usageCode}
      installPackageName="flux-field"
      installSourceCode={sourceCode}
      usageCode={usageCode}
      installationNote="The component renders a WebGL canvas that fills its container, so give the parent an explicit height. If WebGL is unavailable it renders nothing rather than throwing."
      examples={[
        {
          title: "Slow",
          code: slowCode,
          preview: (
            <div className="relative h-[240px] w-full overflow-hidden rounded-lg">
              <FluxField className="absolute inset-0" speed={0.5} />
            </div>
          ),
        },
        {
          title: "Fast",
          code: fastCode,
          preview: (
            <div className="relative h-[240px] w-full overflow-hidden rounded-lg">
              <FluxField className="absolute inset-0" speed={1.8} />
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
