import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";
import { MacKeyboard, MacKey } from "@workspace/ui/components/mac-keyboard";
import { Command, Download } from "lucide-react";

export async function MacKeyboardDocs() {
  const sourceCode =
    (await readComponentSource("mac-keyboard")) ||
    "// Unable to load source code";

  const usageCode = `import { MacKeyboard } from "@/components/ui/mac-keyboard";

export default function KeyboardDemo() {
  return (
    <div className="flex w-full items-center justify-center p-10 bg-neutral-100 dark:bg-neutral-900">
      <MacKeyboard />
    </div>
  );
}`;

  const installationNote = (
    <div className="flex flex-col gap-2 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-900 dark:text-orange-200 text-sm mb-4">
      <p>
        <strong>Audio Requirement:</strong> To enable the typing sound effects, you should download the
        required audio file and place it in your project&apos;s <code className="bg-orange-500/20 px-1 py-0.5 rounded">public/audio</code> directory.
      </p>
      <a
        href="/audio/key-press.wav"
        download="key-press.wav"
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-orange-500/20 hover:bg-orange-500/30 font-medium w-fit transition-colors mt-1"
      >
        <Download className="w-4 h-4" />
        Download key-press.wav
      </a>
    </div>
  );

  const specificKeysVariantCode = `import { MacKeyboard, MacKey } from "@/components/ui/mac-keyboard";
import { Command } from "lucide-react";

export default function KeyboardShortcutDemo() {
  return (
    <div className="flex w-full min-h-[400px] items-center justify-center p-10 bg-neutral-100 dark:bg-neutral-900 rounded-xl">
      <MacKeyboard
        className="h-24 w-fit flex-row sm:scale-100"
        style={{ minWidth: 0 }}
      >
        <MacKey
          width={1.5}
          keyCode="MetaLeft"
          className="items-end pr-2 pb-2 text-sm"
          label={<span className="font-bold">command</span>}
        >
          <Command className="absolute top-3 left-3 h-5 w-5" />
        </MacKey>
        <MacKey width={1} keyCode="KeyK" label="K" className="text-xl" />
      </MacKeyboard>
    </div>
  );
}`;

  const specificKeysVariant = {
    title: "Isolated Keys",
    code: specificKeysVariantCode,
    preview: (
      <div className="flex w-full min-h-[400px] items-center justify-center overflow-hidden py-10">
        <MacKeyboard
          className="h-24 w-fit flex-row sm:scale-100"
          style={{ minWidth: 0 }}
        >
          <MacKey
            width={1.5}
            keyCode="MetaLeft"
            className="items-end pr-2 pb-2 text-sm"
            label={<span className="font-bold">command</span>}
          >
            <Command className="absolute top-3 left-3 h-5 w-5" />
          </MacKey>
          <MacKey width={1} keyCode="KeyK" label="K" className="text-xl" />
        </MacKeyboard>
      </div>
    )
  };

  return (
    <DocsPageLayout
      title="Mac Keyboard"
      description="Interactive Mac keyboard replica with real-time keystroke tracking and authentic layout geometry. Features active states for physical key presses and optional sound feedback (requires /audio/key-press.wav)."
      preview={
        <div className="flex w-full min-h-[400px] items-center justify-center overflow-hidden py-10">
          <MacKeyboard className="scale-[0.4] sm:scale-[0.6] md:scale-[0.75] lg:scale-[0.7] origin-center" />
        </div>
      }
      previewCode={`<MacKeyboard soundSrc="/audio/key-press.wav" />`}
      installPackageName="mac-keyboard"
      installDependencies="lucide-react"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/mac-keyboard.tsx"
      usageNote={installationNote}
      props={[
        { name: "soundSrc", type: "string", default: '"/audio/key-press.wav"', description: "URL of a key-click audio asset. Supply your own file or an empty string to disable sound." },
        { name: "children", type: "React.ReactNode", description: "Optional custom MacKey children instead of the full keyboard layout." },
        { name: "className", type: "string", description: "Additional container styles." },
      ]}
      usageCode={usageCode}
      examples={[specificKeysVariant]}
      fullWidthPreview={true}
    />
  );
}
