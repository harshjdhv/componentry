"use client"

import type { CSSProperties, ReactNode, Ref } from "react"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTab } from "@workspace/ui/components/tabs"
import { docsPanel, docsShell } from "./surface"

/**
 * The customize panel under the docs preview, in the same two-layer surface as the
 * props table: a "Customize" heading in the muted shell, sections in the panel.
 *
 * Each section is a small title with its control underneath (Variant, Preset,
 * Palette, then the DialKit sliders), all on one left edge. Sections carry
 * `data-panel-row`; the panel stays hidden until one is present.
 *
 * DocsInsetPreview owns it and adds the variant section; a playground in the stage
 * portals its preset section and DialKit rows into the slot.
 */
export function CustomizePanel({
  slotRef,
  children,
}: {
  slotRef: Ref<HTMLDivElement>
  children?: ReactNode
}) {
  return (
    <div className={cn(docsShell, "cy-dial cy-dial-wide mt-3 hidden has-[[data-panel-row]]:block")}>
      <div className="px-3 pt-1.5 pb-2 text-[12.5px] font-medium text-zinc-500 dark:text-zinc-400">
        Customize
      </div>
      <div className={cn(docsPanel, "group/panel flex flex-col gap-4 p-3")}>
        {children}
        <div ref={slotRef} className="contents" />
      </div>
    </div>
  )
}

/**
 * One section: title above, control below.
 *
 * `titleOnlyWithOptions` is for the DialKit block, whose sliders label themselves:
 * its title only shows when a Variant/Preset section sits above it to separate
 * from. On its own, the sliders follow the "Customize" heading directly.
 */
export function PanelRow({
  label,
  titleOnlyWithOptions = false,
  children,
}: {
  label: string
  titleOnlyWithOptions?: boolean
  children: ReactNode
}) {
  return (
    <div data-panel-row data-option-row={titleOnlyWithOptions ? undefined : ""} className="min-w-0">
      <div
        className={cn(
          "mb-2 px-0.5 text-[12.5px] font-medium text-zinc-500 dark:text-zinc-400",
          titleOnlyWithOptions && "hidden group-has-[[data-option-row]]/panel:block"
        )}
      >
        {label}
      </div>
      {children}
    </div>
  )
}

/**
 * Segmented track that is exactly the Preview / Code tabs: same TabsList size,
 * muted track and grey sliding indicator. The DialKit rows use the same fill,
 * height and type (docs-playground.css), so every control in the panel matches. Built on the coss Tabs, so the white
 * indicator slides between options (Base UI measures the active tab). With no
 * matching option (values edited away from every preset) nothing is selected.
 */
function Segmented({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: { value: string; label: string; swatch?: string }[]
  value?: string | null
  onChange?: (value: string) => void
}) {
  return (
    <Tabs
      value={value ?? null}
      onValueChange={(next) => {
        if (next != null) onChange?.(String(next))
      }}
      className="max-w-full"
    >
      <TabsList
        aria-label={label}
        className="max-w-full justify-start overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {options.map((option) => (
          <TabsTab
            key={option.value}
            value={option.value}
            className={cn("grow-0", option.swatch && "pl-[calc(--spacing(2)-1px)]")}
          >
            {option.swatch && (
              <span
                aria-hidden
                style={{ "--swatch": option.swatch } as CSSProperties}
                className="size-4 shrink-0 rounded-[4px] [background:var(--swatch)] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.12)]"
              />
            )}
            {option.label}
          </TabsTab>
        ))}
      </TabsList>
    </Tabs>
  )
}

/** Quick switch between whole preview variants. */
export function VariantRow({
  label = "Variant",
  options,
  value,
  onChange,
}: {
  label?: string
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
}) {
  // "Cyber Variant" next to a "Variant" label reads twice; show just "Cyber".
  const display = (text: string) => text.replace(/\s+variant$/i, "")

  return (
    <PanelRow label={label}>
      <Segmented
        label={label}
        options={options.map((option) => ({ ...option, label: display(option.label) }))}
        value={value}
        onChange={onChange}
      />
    </PanelRow>
  )
}

/** Presets in the same track; color presets get a small chip of their palette. */
export function SwatchRow({
  label,
  presets,
  value,
  onChange,
}: {
  label: string
  presets: { name: string; swatch?: string }[]
  value?: string | null
  onChange?: (name: string) => void
}) {
  return (
    <PanelRow label={label}>
      <Segmented
        label={label}
        options={presets.map(({ name, swatch }) => ({ value: name, label: name, swatch }))}
        value={value}
        onChange={onChange}
      />
    </PanelRow>
  )
}
