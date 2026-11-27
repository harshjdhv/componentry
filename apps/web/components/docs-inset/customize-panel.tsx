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
 * Segmented track with the same fill and height as a DialKit row, so tracks and
 * sliders read as one set of controls. Built on the coss Tabs, so the white
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
        className={cn(
          "h-8 max-w-full justify-start overflow-x-auto rounded-lg bg-[#e8e8ea] p-[3px] text-zinc-500 [scrollbar-width:none] dark:bg-[#1c1c1d] dark:text-zinc-400 [&::-webkit-scrollbar]:hidden",
          // The sliding indicator: solid white in both themes, like a raised thumb.
          "[&>[data-slot=tab-indicator]]:bg-white [&>[data-slot=tab-indicator]]:shadow-[0_1px_2px_rgb(0_0_0/0.08)] dark:[&>[data-slot=tab-indicator]]:bg-white dark:[&>[data-slot=tab-indicator]]:shadow-[0_1px_2px_rgb(0_0_0/0.4)]"
        )}
      >
        {options.map((option) => (
          <TabsTab
            key={option.value}
            value={option.value}
            className={cn(
              "h-[26px] grow-0 px-2.5 text-[13px] text-zinc-500 transition-colors duration-200 ease-out hover:text-zinc-900 sm:h-[26px] sm:text-[13px] dark:text-zinc-400 dark:hover:text-zinc-100",
              "data-active:text-zinc-900 dark:data-active:text-zinc-900",
              option.swatch && "pl-1.5"
            )}
          >
            {option.swatch && (
              <span
                aria-hidden
                style={{ "--swatch": option.swatch } as CSSProperties}
                className="size-3.5 shrink-0 rounded-[4px] [background:var(--swatch)] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.12)]"
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
