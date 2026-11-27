"use client"

import { createContext, useContext } from "react"

/**
 * DOM slot under the docs preview box where a playground renders its inline
 * props row. `undefined` outside DocsInsetPreview (the playground keeps its
 * floating bar there); `null` while the slot is mounting.
 */
export const PropsRowSlotContext = createContext<HTMLElement | null | undefined>(undefined)

export function usePropsRowSlot() {
  return useContext(PropsRowSlotContext)
}
