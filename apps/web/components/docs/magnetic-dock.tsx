import React from "react";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";
import {
  MagneticDockDefaultPreview,
  MagneticDockSolidPreview,
  MagneticDockLargeScalePreview,
} from "@/components/docs/previews/magnetic-dock-preview";

const basicUsageCode = `import {
  MagneticDock,
  DockIconHome,
  DockIconSearch,
  DockIconFolder,
  DockIconMail,
  DockIconMusic,
  DockIconSettings,
  DockIconTrash,
} from "@/components/ui/magnetic-dock"

const items = [
  { id: "home", label: "Home", icon: <DockIconHome />, isActive: true },
  { id: "search", label: "Search", icon: <DockIconSearch /> },
  { id: "folder", label: "Finder", icon: <DockIconFolder /> },
  { id: "mail", label: "Mail", icon: <DockIconMail />, badge: 3 },
  { id: "music", label: "Music", icon: <DockIconMusic /> },
  { id: "settings", label: "Settings", icon: <DockIconSettings /> },
  { id: "trash", label: "Trash", icon: <DockIconTrash /> },
]

<MagneticDock items={items} />`;

const solidCode = `import { MagneticDock } from "@/components/ui/magnetic-dock"

<MagneticDock items={items} variant="solid" />`;

const customScaleCode = `import { MagneticDock } from "@/components/ui/magnetic-dock"

<MagneticDock
  items={items}
  iconSize={48}
  maxScale={2}
  magneticDistance={200}
/>`;

export async function MagneticDockDocs() {
  const sourceCode =
    (await readComponentSource("magnetic-dock")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Magnetic Dock"
      description="A macOS-style magnetic dock with smooth scaling animations powered by spring physics. Features cursor-following magnification, tooltips, notification badges, and active state indicators."
      preview={<MagneticDockDefaultPreview />}
      previewCode={basicUsageCode}
      fullWidthPreview={true}
      installPackageName="magnetic-dock"
      installDependencies="framer-motion"
      installSourceCode={sourceCode}
      usageCode={basicUsageCode}
      examples={[
        {
          title: "Solid Variant",
          preview: <MagneticDockSolidPreview />,
          code: solidCode,
          fullWidth: true,
        },
        {
          title: "Large Scale Effect",
          preview: <MagneticDockLargeScalePreview />,
          code: customScaleCode,
          fullWidth: true,
        },
      ]}
      props={[
        {
          name: "items",
          type: "DockItem[]",
          description:
            "Array of dock items with id, label, icon, onClick, isActive, and badge. (Required)",
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
