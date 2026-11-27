"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BookOpen,
  CircleArrowOutUpRight,
  CircleDashed,
  Cog,
  CornerDownLeft,
  FileText,
  Github,
  Search,
} from "lucide-react"

import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
  CommandSeparator,
} from "@workspace/ui/components/command"
import { Kbd, KbdGroup } from "@workspace/ui/components/kbd"
import { docsConfig } from "@/config/docs"

interface CommandMenuItem {
  value: string
  label: string
  title: string
  subtitle?: string
  icon: React.ReactNode
  href?: string
  theme?: "light" | "dark" | "system"
}

interface CommandMenuGroup {
  value: string
  items: CommandMenuItem[]
}

const navGroups = docsConfig.nav
const gettingStartedGroup = navGroups.find((group) => group.title === "Getting Started")
const componentGroups = navGroups.filter((group) => group.title !== "Getting Started")
const allComponentItems = componentGroups
  .flatMap((group) => group.items)
  .sort((a, b) => a.title.localeCompare(b.title))

function createItem(
  group: string,
  item: Omit<CommandMenuItem, "label" | "value"> & { value?: string },
): CommandMenuItem {
  return {
    ...item,
    value: item.value ?? `${group.toLowerCase()}-${item.title.toLowerCase().replaceAll(" ", "-")}`,
    label: [item.title, item.subtitle, group].filter(Boolean).join(" "),
  }
}

const commandGroups: CommandMenuGroup[] = [
  {
    value: "Pages",
    items: [
      createItem("Pages", { title: "Home", href: "/", icon: <ArrowRight /> }),
      createItem("Pages", {
        title: "Documentation",
        href: "/docs/introduction",
        icon: <ArrowRight />,
      }),
      ...(gettingStartedGroup?.items.map((item) =>
        createItem("Pages", {
          title: item.title,
          href: item.href,
          icon: <ArrowRight />,
        }),
      ) ?? []),
    ],
  },
  {
    value: "Get started",
    items: [
      createItem("Get started", {
        title: "Terms of Service",
        href: "/docs/terms",
        icon: <BookOpen />,
      }),
      createItem("Get started", {
        title: "Privacy Policy",
        href: "/docs/privacy",
        icon: <BookOpen />,
      }),
      createItem("Get started", {
        title: "Visit Founder",
        href: "https://harshjdhv.com",
        icon: <CircleArrowOutUpRight />,
      }),
    ],
  },
  {
    value: "Socials",
    items: [
      createItem("Socials", {
        title: "GitHub",
        href: "https://github.com/harshjdhv/componentry",
        icon: <Github />,
      }),
      createItem("Socials", {
        title: "X",
        href: "https://x.com/harshjdhv",
        icon: <span className="text-[13px] leading-none">𝕏</span>,
      }),
    ],
  },
  ...(allComponentItems.length > 0
    ? [
        {
          value: "Components",
          items: allComponentItems.map((item) =>
            createItem("Components", {
              title: item.title,
              href: item.href,
              icon: <CircleDashed />,
            }),
          ),
        },
      ]
    : []),
  {
    value: "Settings",
    items: [
      createItem("Settings", {
        title: "Use Light Theme",
        theme: "light",
        icon: <Cog />,
      }),
      createItem("Settings", {
        title: "Use Dark Theme",
        theme: "dark",
        icon: <Cog />,
      }),
      createItem("Settings", {
        title: "Use System Theme",
        theme: "system",
        icon: <Cog />,
      }),
    ],
  },
  {
    value: "Resources",
    items: [
      createItem("Resources", {
        title: "llms.txt",
        subtitle: "AI Context",
        href: "/llms.txt",
        icon: <FileText />,
      }),
    ],
  },
]

export function CommandMenu({ trigger }: { trigger?: React.ReactElement }) {
  const router = useRouter()
  const { setTheme } = useTheme()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((currentOpen) => !currentOpen)
      }
    }

    document.addEventListener("keydown", handleShortcut)
    return () => document.removeEventListener("keydown", handleShortcut)
  }, [])

  const handleItemClick = React.useCallback(
    (item: CommandMenuItem) => {
      setOpen(false)

      if (item.theme) {
        setTheme(item.theme)
        return
      }

      if (!item.href) return

      if (item.href.startsWith("http") || item.href === "/llms.txt") {
        window.open(item.href, "_blank", "noopener,noreferrer")
        return
      }

      router.push(item.href)
    },
    [router, setTheme],
  )

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      {trigger ? (
        <CommandDialogTrigger render={trigger} />
      ) : (
        <CommandDialogTrigger
          render={
            <button
              type="button"
              data-slot="command-menu-trigger"
              className="group/button inline-flex size-8 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-[min(var(--radius-lg),10px)] border-none text-sm font-medium text-foreground/80 outline-none transition-[background-color,color,scale,box-shadow] select-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.98] sm:w-auto sm:px-1.5 dark:hover:bg-muted/50"
              aria-label="Open search"
            >
              <Search className="size-4" />
              <span className="hidden items-center gap-1 sm:flex" aria-hidden="true">
                <kbd className="pointer-events-none inline-flex size-5 select-none items-center justify-center rounded-sm bg-black/5 px-1 font-sans text-sm/none font-normal tracking-tight text-foreground/70 shadow-[inset_0_0_1px] shadow-black/10 dark:bg-white/10 dark:shadow-white/20">
                  ⌘
                </kbd>
                <kbd className="pointer-events-none inline-flex size-5 select-none items-center justify-center rounded-sm bg-black/5 px-1 font-sans text-sm/none font-normal tracking-tight text-foreground/70 shadow-[inset_0_0_1px] shadow-black/10 dark:bg-white/10 dark:shadow-white/20">
                  K
                </kbd>
              </span>
            </button>
          }
        />
      )}

      <CommandDialogPopup>
        <Command items={commandGroups}>
          <CommandInput placeholder="Search pages and components..." aria-label="Search documentation" />
          <CommandPanel>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList>
              {(group: CommandMenuGroup) => (
                <React.Fragment key={group.value}>
                  <CommandGroup items={group.items}>
                    <CommandGroupLabel>{group.value}</CommandGroupLabel>
                    <CommandCollection>
                      {(item: CommandMenuItem) => (
                        <CommandItem
                          key={item.value}
                          onClick={() => handleItemClick(item)}
                          value={item.value}
                          className="gap-2"
                        >
                          <span className="flex size-4 shrink-0 items-center justify-center text-muted-foreground/72 [&_svg]:size-4">
                            {item.icon}
                          </span>
                          <span className="flex-1">{item.title}</span>
                        </CommandItem>
                      )}
                    </CommandCollection>
                  </CommandGroup>
                  <CommandSeparator />
                </React.Fragment>
              )}
            </CommandList>
          </CommandPanel>
          <CommandFooter>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <KbdGroup>
                  <Kbd>
                    <ArrowUp />
                  </Kbd>
                  <Kbd>
                    <ArrowDown />
                  </Kbd>
                </KbdGroup>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-2">
                <Kbd>
                  <CornerDownLeft />
                </Kbd>
                <span>Open</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Kbd>Esc</Kbd>
              <span>Close</span>
            </div>
          </CommandFooter>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  )
}
