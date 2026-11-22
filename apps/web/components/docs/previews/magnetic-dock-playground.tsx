"use client"

import { useDialKit } from "dialkit"
import { MagneticDock } from "@workspace/ui/components/magnetic-dock"
import { MACOS_APP_ICONS } from "@workspace/ui/components/magnetic-dock-icons"
import { DocsPlayground, useLiveCode } from "@/components/docs-playground"

const ITEMS = [
  { id: "finder", label: "Finder", src: MACOS_APP_ICONS.finder, isActive: true },
  { id: "safari", label: "Safari", src: MACOS_APP_ICONS.safari },
  { id: "messages", label: "Messages", src: MACOS_APP_ICONS.messages, badge: 2 },
  { id: "mail", label: "Mail", src: MACOS_APP_ICONS.mail, badge: 5 },
  { id: "music", label: "Music", src: MACOS_APP_ICONS.music },
  { id: "photos", label: "Photos", src: MACOS_APP_ICONS.photos },
  { id: "trash", label: "Trash", src: MACOS_APP_ICONS.trash },
]

// Mirrors the two Dock settings macOS itself exposes: Size and Magnification.
const DEFAULTS = { size: 56, magnification: 1.5 }

type Slider = [number, number, number, number]
const controls = {
  size: [DEFAULTS.size, 32, 80, 1] as Slider,
  magnification: [DEFAULTS.magnification, 1, 2.5, 0.05] as Slider,
}

function toCode({ size, magnification }: typeof DEFAULTS) {
  const props = ["items={items}"]
  if (size !== DEFAULTS.size) props.push(`iconSize={${size}}`)
  if (magnification !== DEFAULTS.magnification) {
    props.push(`maxScale={${Number(magnification.toFixed(2))}}`)
  }

  return `import { MagneticDock } from "@/components/ui/magnetic-dock"
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
  return <MagneticDock ${props.join(" ")} />
}`
}

export function MagneticDockPlayground() {
  const values = useDialKit("Magnetic Dock", controls, { id: "magnetic-dock" })
  const config = { ...DEFAULTS, ...values }

  useLiveCode(toCode(config))

  return (
    <DocsPlayground className="flex items-center justify-center px-4">
      <MagneticDock
        items={ITEMS}
        iconSize={config.size}
        maxScale={config.magnification}
        className="max-w-full"
      />
    </DocsPlayground>
  )
}
