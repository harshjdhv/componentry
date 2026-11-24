"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"

/*
 * Type and card system follow paneloui.com's feature section:
 * heading Inter 42/46 · 500 · -1.4px, ink lead + muted continuation;
 * cards 16px radius, 6px padding, hairline ring, 10px-radius preview;
 * captions Inter 15/22 with a medium ink lead.
 */

const card =
  "flex min-w-0 flex-col rounded-2xl bg-white p-1.5 shadow-[0_0_0_1px_rgb(10_10_10/0.055)] dark:bg-[#141414] dark:shadow-[0_0_0_1px_rgb(255_255_255/0.07)]"

const preview =
  "relative flex min-h-[300px] overflow-hidden rounded-[10px] bg-[#fafafa] p-6 dark:bg-[#0f0f0f]"

const inset =
  "rounded-xl bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_4px_12px_-6px_rgb(0_0_0/0.08)] dark:bg-[#171717] dark:shadow-[0_0_0_1px_rgb(255_255_255/0.07)]"

function Caption({ lead, children }: { lead: string; children: React.ReactNode }) {
  return (
    <p className={cn("px-[18px] pt-4 pb-5 text-pretty text-[15px] leading-[22px] text-neutral-500 dark:text-neutral-400")}>
      <span className="font-medium text-neutral-950 dark:text-neutral-50">{lead}</span> {children}
    </p>
  )
}

function Code({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-[13px] leading-[18px] text-neutral-950 dark:text-neutral-50">{children}</code>
}

/* ── 1. Source file ─────────────────────────────────────────────────────── */

function SourcePreview() {
  const t = "text-neutral-950 dark:text-neutral-100"
  const m = "text-neutral-400 dark:text-neutral-500"
  return (
    <pre className={cn("w-full self-start overflow-x-auto font-mono text-[12px] leading-6 [scrollbar-width:none] sm:text-[13px] [&::-webkit-scrollbar]:hidden", m)}>
      <span className={t}>components/ui/magnetic-dock.tsx</span>
      {"\n\n"}
      <span className={t}>export function</span> MagneticDock({"{"}
      {"\n  "}items,
      {"\n  "}magnification <span className={t}>= 60</span>,
      {"\n  "}distance <span className={t}>= 140</span>,
      {"\n  "}variant <span className={t}>= &quot;glass&quot;</span>,
      {"\n"}{"}"}: MagneticDockProps) {"{"}
      {"\n  "}<span className={t}>const</span> mouseX = useMotionValue(Infinity)
      {"\n  "}…
      {"\n"}{"}"}
    </pre>
  )
}

/* ── 2. Playground ──────────────────────────────────────────────────────── */

const PALETTES = [
  { name: "Ice", colors: ["#0f2550", "#4f8ef0", "#e2f0ff"] },
  { name: "Ember", colors: ["#4a1716", "#d4615a", "#ffd2c4"] },
  { name: "Toxic", colors: ["#10260c", "#3f9a1f", "#d6ff8a"] },
  { name: "Mono", colors: ["#262626", "#737373", "#e5e5e5"] },
] as const

function PlaygroundPreview() {
  const [active, setActive] = React.useState(0)
  const [glow, setGlow] = React.useState(0.4)
  const palette = PALETTES[active]!

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <div
        aria-hidden
        className="size-24 rounded-[28px] transition-[background,box-shadow] duration-300 ease-out"
        style={{
          background: `linear-gradient(135deg, ${palette.colors.join(", ")})`,
          boxShadow: `0 0 ${Math.round(glow * 48)}px ${Math.round(glow * 8)}px ${palette.colors[1]}66`,
        }}
      />

      <div className={cn(inset, "w-full max-w-[300px] p-3")}>
        <div role="radiogroup" aria-label="Palette" className="flex gap-2">
          {PALETTES.map((p, i) => (
            <button
              key={p.name}
              type="button"
              role="radio"
              aria-checked={i === active}
              aria-label={p.name}
              onClick={() => setActive(i)}
              className="size-7 rounded-lg shadow-[inset_0_0_0_1px_rgb(0_0_0/0.1)] transition-[scale,box-shadow] duration-150 ease-out active:scale-[0.96] aria-checked:ring-1 aria-checked:ring-neutral-950/30 aria-checked:ring-offset-2 aria-checked:ring-offset-white dark:aria-checked:ring-white/40 dark:aria-checked:ring-offset-[#171717]"
              style={{ background: `linear-gradient(135deg, ${p.colors.join(", ")})` }}
            />
          ))}
        </div>
        <label className="mt-3 flex items-center gap-3 text-[12px] text-neutral-500">
          glow
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={glow}
            onChange={(e) => setGlow(Number(e.target.value))}
            className="h-1 flex-1 accent-neutral-900 dark:accent-neutral-100"
          />
          <span className="w-8 text-right font-mono tabular-nums text-neutral-950 dark:text-neutral-100">
            {glow.toFixed(2)}
          </span>
        </label>
      </div>

      <pre className="font-mono text-[12px] leading-5 text-neutral-400 dark:text-neutral-500">
        {"<HeatmapLogo "}
        <span className="text-neutral-950 dark:text-neutral-100">glow={`{${Number(glow.toFixed(2))}}`}</span>
        {" />"}
      </pre>
    </div>
  )
}

/* ── 3. MCP prompt ──────────────────────────────────────────────────────── */

function McpPreview() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className={cn(inset, "w-full max-w-[340px] p-4")}>
        <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-neutral-100 px-3 py-2 text-[13.5px] leading-5 text-neutral-900 dark:bg-white/[0.07] dark:text-neutral-100">
          Add the magnetic dock component
        </div>
        <div className="mt-3 space-y-1.5 font-mono text-[12px] leading-5 text-neutral-500 dark:text-neutral-400">
          <p>
            <span className="text-neutral-400 dark:text-neutral-600">›</span> shadcn · add_items
          </p>
          <p className="flex items-center gap-1.5 text-neutral-950 dark:text-neutral-100">
            <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden />
            @componentry/magnetic-dock
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── 4. CLI ─────────────────────────────────────────────────────────────── */

const COMMAND = "npx shadcn@latest add @componentry/magnetic-dock"

function CliPreview() {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(id)
  }, [copied])

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <div className={cn(inset, "flex w-full max-w-[460px] items-center gap-2 py-2.5 pr-2 pl-4 font-mono text-[13px]")}>
        <span className="text-neutral-400">$</span>
        <span className="min-w-0 flex-1 truncate text-neutral-950 dark:text-neutral-100">{COMMAND}</span>
        <button
          type="button"
          aria-label={copied ? "Copied" : "Copy command"}
          onClick={() => {
            // Only confirm when the copy actually landed (clipboard can be blocked).
            navigator.clipboard?.writeText(COMMAND).then(() => setCopied(true), () => {})
          }}
          className="relative grid size-7 place-items-center rounded-md text-neutral-400 transition-[color,scale] duration-150 ease-out hover:text-neutral-900 active:scale-[0.96] dark:hover:text-neutral-100"
        >
          {/* Cross-fade icons with scale + blur instead of swapping them. */}
          <Copy
            className={cn(
              "col-start-1 row-start-1 size-3.5 transition-[opacity,scale,filter] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
              copied && "scale-[0.25] opacity-0 blur-[4px]"
            )}
          />
          <Check
            className={cn(
              "col-start-1 row-start-1 size-3.5 text-emerald-600 transition-[opacity,scale,filter] duration-200 ease-[cubic-bezier(0.2,0,0,1)] dark:text-emerald-400",
              !copied && "scale-[0.25] opacity-0 blur-[4px]"
            )}
          />
        </button>
      </div>
      <pre className="w-full max-w-[460px] pl-4 font-mono text-[13px] leading-6 text-neutral-400 dark:text-neutral-500">
        <span className="text-neutral-950 dark:text-neutral-100">+</span> components/ui/magnetic-dock.tsx{"\n"}
        <span className="text-neutral-950 dark:text-neutral-100">+</span> components/ui/magnetic-dock-icons.ts{"\n"}
        <span className="text-neutral-950 dark:text-neutral-100">+</span> framer-motion
      </pre>
    </div>
  )
}

/* ── Section ────────────────────────────────────────────────────────────── */

export function Features() {
  return (
    <section aria-labelledby="features-heading" className="pt-24 pb-24 md:pt-32">
      <h2
        id="features-heading"
        className={cn(
          "max-w-[720px] text-balance text-[32px] font-medium leading-[36px] tracking-[-0.033em] sm:text-[42px] sm:leading-[46px]"
        )}
      >
        <span className="text-neutral-950 dark:text-neutral-50">Yours to own, not just install.</span>{" "}
        <span className="text-neutral-500 dark:text-neutral-400">
          Every component lands in your repo as source you can read, tune and ship.
        </span>
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-3 lg:grid-cols-12">
        <article className={cn(card, "lg:col-span-7")}>
          <div className={cn(preview, "items-start justify-start")}>
            <SourcePreview />
          </div>
          <Caption lead="Source, not a package.">
            Each component is a file in your project, so there is no wrapper API between you and the motion.
          </Caption>
        </article>

        <article className={cn(card, "lg:col-span-5")}>
          <div className={cn(preview, "items-center justify-center")}>
            <PlaygroundPreview />
          </div>
          <Caption lead="Tune it, then copy it.">
            Playgrounds turn colors and timing into props, and the code follows every change you make.
          </Caption>
        </article>

        <article className={cn(card, "lg:col-span-5")}>
          <div className={cn(preview, "items-center justify-center")}>
            <McpPreview />
          </div>
          <Caption lead="Ask your editor.">
            With the shadcn MCP server, your AI editor can find and add any component by name.
          </Caption>
        </article>

        <article className={cn(card, "lg:col-span-7")}>
          <div className={cn(preview, "items-center justify-center")}>
            <CliPreview />
          </div>
          <Caption lead="One command.">
            The registry writes the files and installs what they need. Works in any project set up for{" "}
            <Code>shadcn</Code>.
          </Caption>
        </article>
      </div>
    </section>
  )
}
