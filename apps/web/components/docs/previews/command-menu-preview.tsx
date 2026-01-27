"use client"

import { CommandMenu } from "@workspace/ui/components/command-menu"
import { FileText, Settings, User, Hash, Home, BookOpen } from "lucide-react"

const demoGroups = [
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

export function CommandMenuDemo() {
    return (
        <div className="w-full h-full flex items-center justify-center p-8">
            <CommandMenu
                groups={demoGroups}
                placeholder="Search..."
                brandName="Demo App"
            />
        </div>
    )
}

const customGroups = [
    {
        title: "Documentation",
        items: [
            { id: "intro", title: "Introduction", icon: <FileText className="h-4 w-4" />, onSelect: () => console.log("Intro") },
            { id: "api", title: "API Reference", icon: <Hash className="h-4 w-4" />, onSelect: () => console.log("API") },
            { id: "examples", title: "Examples", icon: <BookOpen className="h-4 w-4" />, onSelect: () => console.log("Examples") },
        ],
    },
]

export function CommandMenuCustomDemo() {
    return (
        <div className="w-full h-full flex items-center justify-center p-8">
            <CommandMenu
                groups={customGroups}
                placeholder="Search documentation..."
                triggerLabel="Docs..."
                shortcutKey="J"
                brandName="Docs"
            />
        </div>
    )
}
