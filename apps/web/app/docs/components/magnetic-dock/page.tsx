import type React from "react"
import type { Metadata } from "next"
import {
    MagneticDock,
    DockIconHome,
    DockIconSearch,
    DockIconFolder,
    DockIconMail,
    DockIconMusic,
    DockIconSettings,
    DockIconTrash,
} from "@workspace/ui/components/magnetic-dock"
import { InstallCommand } from "@/components/install-command"
import { CodeBlock } from "@/components/code-block"
import { ComponentLayout, Section } from "@/components/component-layout"

export const metadata: Metadata = {
    title: "Magnetic Dock Component",
    description: "A macOS-style magnetic dock with smooth scaling animations, spring physics, tooltips, badges, and premium micro-interactions. Free React component by Harsh Jadhav.",
    alternates: {
        canonical: "https://componentry.fun/docs/components/magnetic-dock",
    },
}

const basicCode = `import {
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

<MagneticDock items={items} />`

const solidCode = `<MagneticDock items={items} variant="solid" />`

const customScaleCode = `<MagneticDock
  items={items}
  iconSize={48}
  maxScale={2}
  magneticDistance={200}
/>`

const defaultItems = [
    { id: "home", label: "Home", icon: <DockIconHome />, isActive: true },
    { id: "search", label: "Search", icon: <DockIconSearch /> },
    { id: "folder", label: "Finder", icon: <DockIconFolder /> },
    { id: "mail", label: "Mail", icon: <DockIconMail />, badge: 3 },
    { id: "music", label: "Music", icon: <DockIconMusic /> },
    { id: "settings", label: "Settings", icon: <DockIconSettings /> },
    { id: "trash", label: "Trash", icon: <DockIconTrash /> },
]

const minimalItems = [
    { id: "home", label: "Home", icon: <DockIconHome /> },
    { id: "search", label: "Search", icon: <DockIconSearch /> },
    { id: "folder", label: "Finder", icon: <DockIconFolder /> },
    { id: "settings", label: "Settings", icon: <DockIconSettings /> },
]

export default function MagneticDockPage(): React.JSX.Element {
    return (
        <ComponentLayout
            title="Magnetic Dock"
            description="A macOS-style magnetic dock with smooth scaling animations powered by spring physics. Features cursor-following magnification, tooltips, notification badges, and active state indicators."
        >
            <Section title="Install">
                <InstallCommand component="magnetic-dock" />
            </Section>

            <Section title="Examples">
                <div className="space-y-12">

                    <div className="space-y-0">
                        <h3 className="text-xl font-medium mb-4">Default (Glass)</h3>
                        <div className="p-8 bg-gradient-to-br from-neutral-100 via-neutral-50 to-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-t-xl rounded-b-none border-b border-border flex items-center justify-center min-h-[250px]">
                            <MagneticDock items={defaultItems} />
                        </div>
                        <CodeBlock code={basicCode} lang="tsx" className="rounded-t-none" />
                    </div>

                    <div className="space-y-0">
                        <h3 className="text-xl font-medium mb-4">Solid Variant</h3>
                        <div className="p-8 bg-gradient-to-br from-neutral-100 via-neutral-50 to-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-t-xl rounded-b-none border-b border-border flex items-center justify-center min-h-[250px]">
                            <MagneticDock items={minimalItems} variant="solid" />
                        </div>
                        <CodeBlock code={solidCode} lang="tsx" className="rounded-t-none" />
                    </div>

                    <div className="space-y-0">
                        <h3 className="text-xl font-medium mb-4">Large Scale Effect</h3>
                        <div className="p-8 bg-gradient-to-br from-neutral-100 via-neutral-50 to-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-t-xl rounded-b-none border-b border-border flex items-center justify-center min-h-[280px]">
                            <MagneticDock
                                items={minimalItems}
                                iconSize={48}
                                maxScale={2}
                                magneticDistance={200}
                            />
                        </div>
                        <CodeBlock code={customScaleCode} lang="tsx" className="rounded-t-none" />
                    </div>

                </div>
            </Section>

            <Section title="Features">
                <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-medium text-sm">Magnetic Scaling</div>
                        <div className="text-sm text-muted-foreground">
                            Icons smoothly scale based on cursor proximity using spring physics
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-medium text-sm">Spring Physics</div>
                        <div className="text-sm text-muted-foreground">
                            Framer Motion springs create natural, fluid animations with proper physics
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-medium text-sm">Floating Effect</div>
                        <div className="text-sm text-muted-foreground">
                            Icons rise up when magnified, creating a 3D lifting effect
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-medium text-sm">Tooltips</div>
                        <div className="text-sm text-muted-foreground">
                            Animated tooltips appear on hover with smooth enter/exit transitions
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-medium text-sm">Badge Support</div>
                        <div className="text-sm text-muted-foreground">
                            Notification badges with animated appearance and 99+ overflow handling
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-medium text-sm">Active States</div>
                        <div className="text-sm text-muted-foreground">
                            Visual indicator dot for currently active items
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-medium text-sm">Glass Morphism</div>
                        <div className="text-sm text-muted-foreground">
                            Frosted glass effect with backdrop blur and subtle reflections
                        </div>
                    </div>
                </div>
            </Section>

            <Section title="Props">
                <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">items</div>
                        <div className="text-sm text-muted-foreground">
                            Array of dock items with id, label, icon, onClick, isActive, and badge (required)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">iconSize</div>
                        <div className="text-sm text-muted-foreground">
                            Base size of icons in pixels (default: 56)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">maxScale</div>
                        <div className="text-sm text-muted-foreground">
                            Maximum scale factor when hovering directly over an icon (default: 1.5)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">magneticDistance</div>
                        <div className="text-sm text-muted-foreground">
                            Pixel distance for magnetic effect falloff (default: 150)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">showLabels</div>
                        <div className="text-sm text-muted-foreground">
                            Show tooltip labels on hover (default: true)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">position</div>
                        <div className="text-sm text-muted-foreground">
                            Dock orientation: &quot;bottom&quot;, &quot;top&quot;, &quot;left&quot;, or &quot;right&quot; (default: &quot;bottom&quot;)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">variant</div>
                        <div className="text-sm text-muted-foreground">
                            Background style: &quot;glass&quot;, &quot;solid&quot;, or &quot;transparent&quot; (default: &quot;glass&quot;)
                        </div>
                    </div>
                </div>
            </Section>

            <Section title="Item Properties">
                <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">id</div>
                        <div className="text-sm text-muted-foreground">
                            Unique identifier for the item (required)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">label</div>
                        <div className="text-sm text-muted-foreground">
                            Display label shown in tooltip (required)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">icon</div>
                        <div className="text-sm text-muted-foreground">
                            React node for the icon (required)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">onClick</div>
                        <div className="text-sm text-muted-foreground">
                            Click handler function
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">isActive</div>
                        <div className="text-sm text-muted-foreground">
                            Whether the item is currently active (shows indicator dot)
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">badge</div>
                        <div className="text-sm text-muted-foreground">
                            Notification badge count (displays 99+ for values over 99)
                        </div>
                    </div>
                </div>
            </Section>

            <Section title="Included Icons">
                <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">DockIconHome</div>
                        <div className="text-sm text-muted-foreground">Home/house icon</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">DockIconSearch</div>
                        <div className="text-sm text-muted-foreground">Magnifying glass search icon</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">DockIconFolder</div>
                        <div className="text-sm text-muted-foreground">Folder/finder icon</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">DockIconMail</div>
                        <div className="text-sm text-muted-foreground">Envelope mail icon</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">DockIconMusic</div>
                        <div className="text-sm text-muted-foreground">Music note icon</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">DockIconSettings</div>
                        <div className="text-sm text-muted-foreground">Gear/cog settings icon</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
                        <div className="font-mono text-sm">DockIconTrash</div>
                        <div className="text-sm text-muted-foreground">Trash/delete icon</div>
                    </div>
                </div>
            </Section>
        </ComponentLayout>
    )
}
