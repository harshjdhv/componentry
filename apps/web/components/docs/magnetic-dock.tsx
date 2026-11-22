import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";
import { LiveCodeBlock } from "@/components/live-code-block";
import { MagneticDockPlayground } from "@/components/docs/previews/magnetic-dock-playground";

const basicUsageCode = `import { MagneticDock } from "@/components/ui/magnetic-dock"
import { MACOS_APP_ICONS } from "@/components/ui/magnetic-dock-icons"

const items = [
  { id: "finder", label: "Finder", src: MACOS_APP_ICONS.finder, isActive: true },
  { id: "safari", label: "Safari", src: MACOS_APP_ICONS.safari },
  { id: "messages", label: "Messages", src: MACOS_APP_ICONS.messages, badge: 2 },
  { id: "mail", label: "Mail", src: MACOS_APP_ICONS.mail, badge: 5 },
  { id: "music", label: "Music", src: MACOS_APP_ICONS.music },
  { id: "photos", label: "Photos", src: MACOS_APP_ICONS.photos },
  { id: "trash", label: "Trash", src: MACOS_APP_ICONS.trash },
]

export default function Demo() {
  return <MagneticDock items={items} />
}`;

export async function MagneticDockDocs() {
  const sourceCode =
    (await readComponentSource("magnetic-dock")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Magnetic Dock"
      description="A macOS-style magnetic dock with smooth scaling animations powered by spring physics. Features cursor-following magnification, tooltips, notification badges, active state indicators, and a bundled set of real macOS app icons."
      preview={<MagneticDockPlayground />}
      previewCode={basicUsageCode}
      fullWidthPreview={true}
      installPackageName="magnetic-dock"
      installDependencies="framer-motion"
      installSourceCode={sourceCode}
      usageCode={<LiveCodeBlock defaultCode={basicUsageCode} />}
      props={[
        {
          name: "items",
          type: "DockItem[]",
          description:
            "Array of dock items with id, label, icon, src, onClick, isActive, badge, and fullBleed. (Required). Use `src` with a real app icon image — the bundled `MACOS_APP_ICONS` (from `magnetic-dock-icons`) are embedded as data URIs, or pass any image URL.",
        },
        {
          name: "iconSize",
          type: "number",
          default: "56",
          description: "Base size of icons in pixels.",
        },
        {
          name: "maxScale",
          type: "number",
          default: "1.5",
          description:
            "Maximum scale factor when hovering directly over an icon.",
        },
        {
          name: "magneticDistance",
          type: "number",
          default: "150",
          description: "Pixel distance for magnetic effect falloff.",
        },
        {
          name: "showLabels",
          type: "boolean",
          default: "true",
          description: "Show tooltip labels on hover.",
        },
        {
          name: "position",
          type: '"bottom" | "top" | "left" | "right"',
          default: '"bottom"',
          description: "Dock orientation.",
        },
        {
          name: "variant",
          type: '"glass" | "solid" | "transparent"',
          default: '"glass"',
          description: "Background style variant.",
        },
      ]}
    />
  );
}
