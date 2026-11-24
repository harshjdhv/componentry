/** Shared look for the docs' underline tab rows (Preview / Code, CLI / Manual). */
export const underlineListClass =
  "w-full justify-start gap-5 border-b border-black/[0.07] py-0 dark:border-white/[0.07] data-[orientation=horizontal]:py-0 *:data-[slot=tabs-tab]:hover:bg-transparent [&_[data-slot=tab-indicator]]:bg-zinc-900 dark:[&_[data-slot=tab-indicator]]:bg-zinc-100 [&_[data-slot=tab-indicator]]:ease-[cubic-bezier(0.23,1,0.32,1)]"

export const underlineTabClass =
  "h-9 grow-0 rounded-none px-0 text-[14px] font-medium tracking-[-0.01em] text-zinc-500 transition-colors duration-150 ease-out hover:text-zinc-900 data-active:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 dark:data-active:text-zinc-50"
