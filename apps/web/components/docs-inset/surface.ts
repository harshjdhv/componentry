/** Hairline colour for dividers on the docs surfaces (rows, tab rule). */
export const docsLine = "border-black/[0.05] dark:border-white/[0.05]"

/**
 * Two-layer docs surface, no outlines: a muted outer shell holding an inner
 * panel in the page colour, separated by fill alone (radii stay concentric: 14 = 10 + 4).
 */
export const docsShell = "rounded-[14px] bg-zinc-100/80 p-1 dark:bg-white/[0.03]"

export const docsPanel = "rounded-[10px] bg-white dark:bg-[#111111]"
