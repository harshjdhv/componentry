import React from "react"
import { CommandMenuDemo, CommandMenuCustomDemo } from "@/components/docs/previews/command-menu-preview"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"

const basicUsageCode = `import { CommandMenu } from "@/components/ui/command-menu"
import { FileText, Settings, User, Home, BookOpen } from "lucide-react"

const groups = [
  {
    title: "Pages",
    items: [
      { id: "home", title: "Home", icon: <Home className="h-4 w-4" />, onSelect: () => console.log("Home") },
      { id: "about", title: "About", icon: <FileText className="h-4 w-4" />, onSelect: () => console.log("About") },
      { id: "docs", title: "Documentation", icon: <BookOpen className="h-4 w-4" />, onSelect: () => console.log("Docs") },
    ],
  },
  {
    title: "Settings",
    items: [
      { id: "profile", title: "Profile", icon: <User className="h-4 w-4" />, onSelect: () => console.log("Profile") },
      { id: "settings", title: "Settings", icon: <Settings className="h-4 w-4" />, onSelect: () => console.log("Settings") },
    ],
  },
]

<CommandMenu 
  groups={groups}
  placeholder="Search..."
  brandName="My App"
/>`

const customShortcutCode = `import { CommandMenu } from "@/components/ui/command-menu"
import { FileText, Hash, BookOpen } from "lucide-react"

const groups = [
  {
    title: "Documentation",
    items: [
      { id: "intro", title: "Introduction", icon: <FileText className="h-4 w-4" />, onSelect: () => console.log("Intro") },
      { id: "api", title: "API Reference", icon: <Hash className="h-4 w-4" />, onSelect: () => console.log("API") },
      { id: "examples", title: "Examples", icon: <BookOpen className="h-4 w-4" />, onSelect: () => console.log("Examples") },
    ],
  },
]

<CommandMenu 
  groups={groups}
  placeholder="Search documentation..."
  triggerLabel="Docs..."
  shortcutKey="J"
  brandName="Docs"
/>`

const controlledCode = `import { useState } from "react"
import { CommandMenu } from "@/components/ui/command-menu"

function MyComponent() {
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <button onClick={() => setOpen(true)}>Open Menu</button>
      <CommandMenu 
        groups={groups}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  )
}`

export async function CommandMenuDocs() {
  const sourceCode = (await readComponentSource("command-menu")) || "// Unable to load source code"

  return (
    <DocsPageLayout
      title="Command Menu"
      description="A macOS Spotlight-style command menu with animated search, keyboard navigation, and customizable groups. Features backdrop blur, smooth animations, and full keyboard support."
      preview={<CommandMenuDemo />}
      previewCode={basicUsageCode}
      installPackageName="command-menu"
      installDependencies="cmdk framer-motion lucide-react clsx tailwind-merge"
      installSourceCode={sourceCode}
      usageCode={basicUsageCode}
      examples={[
        {
          title: "Custom Shortcut & Labels",
          preview: <CommandMenuCustomDemo />,
          code: customShortcutCode,
        },
        {
          title: "Controlled State",
          preview: (
            <div className="flex items-center justify-center p-8 text-muted-foreground text-sm border border-dashed rounded-lg">
              See code for controlled state implementation
            </div>
          ),
          code: controlledCode,
        }
      ]}
      props={[
        {
          name: "groups",
          type: "array",
          description: "Array of menu groups with title and items. Each item has id, title, icon (optional), and onSelect callback.",
        },
        {
          name: "placeholder",
          type: "string",
          default: '"Search..."',
          description: "Placeholder text for the search input.",
        },
        {
          name: "emptyMessage",
          type: "string",
          default: '"No results found"',
          description: "Message shown when no results are found.",
        },
        {
          name: "brandName",
          type: "string",
          default: '"Command Menu"',
          description: "Brand name displayed in the footer.",
        },
        {
          name: "triggerLabel",
          type: "string",
          default: '"Search..."',
          description: "Label for the trigger button.",
        },
        {
          name: "triggerClassName",
          type: "string",
          description: "Additional CSS classes for the trigger button.",
        },
        {
          name: "shortcutKey",
          type: "string",
          default: '"K"',
          description: "Keyboard shortcut key used with Cmd/Ctrl.",
        },
        {
          name: "open",
          type: "boolean",
          description: "Controlled open state.",
        },
        {
          name: "onOpenChange",
          type: "function",
          description: "Callback when open state changes.",
        },
      ]}
    />
  )
}
