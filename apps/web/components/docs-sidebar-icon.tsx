"use client"

import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

// Solid rounded square, rx=4 (original mark was ~8 — squared off to match the UI).
// The sidebar panel is knocked out with evenodd fill, so no background-color coupling.
const OUTER =
  "M7 3H17C19.2091 3 21 4.7909 21 7V17C21 19.2091 19.2091 21 17 21H7C4.7909 21 3 19.2091 3 17V7C3 4.7909 4.7909 3 7 3Z"

const PANEL_CLOSED =
  "M10 5.5 C10 4.793 10 4.439 9.780 4.220 C9.560 4 9.207 4 8.5 4 H8.5 C6.379 4 5.318 4 4.659 4.659 C4 5.318 4 6.379 4 8.5 V15.5 C4 17.621 4 18.682 4.659 19.341 C5.318 20 6.379 20 8.5 20 H8.5 C9.207 20 9.561 20 9.780 19.780 C10 19.561 10 19.207 10 18.5 V5.5 Z"

const PANEL_OPEN =
  "M14 6 C14 5.057 14 4.586 13.707 4.293 C13.414 4 12.943 4 12 4 H10 C7.172 4 5.757 4 4.879 4.879 C4 5.757 4 7.172 4 10 V14 C4 16.828 4 18.243 4.879 19.121 C5.757 20 7.172 20 10 20 H12 C12.943 20 13.414 20 13.707 19.707 C14 19.414 14 18.943 14 18 V6 Z"

interface DocsSidebarIconProps {
  isOpen: boolean
  className?: string
}

export function DocsSidebarIcon({ isOpen, className }: DocsSidebarIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-5 shrink-0", className)}
      aria-hidden
    >
      <motion.path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        initial={false}
        animate={{ d: `${OUTER} ${isOpen ? PANEL_OPEN : PANEL_CLOSED}` }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      />
    </svg>
  )
}
