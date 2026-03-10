"use client";

import * as React from "react";

type LayoutMode = "split" | "classic";

function getSavedLayout(): LayoutMode {
  if (typeof window === "undefined") {
    return "classic";
  }

  try {
    const raw = window.localStorage.getItem("doc-layout-storage");
    if (!raw) {
      return "classic";
    }

    const parsed = JSON.parse(raw) as {
      state?: { layout?: LayoutMode };
    };
    const layout = parsed?.state?.layout;
    return layout === "split" ? "split" : "classic";
  } catch {
    return "classic";
  }
}

function SplitSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row w-full h-full min-h-screen lg:h-screen bg-[#f3f4f6] dark:bg-[#080808] overflow-hidden">
      <div className="w-full lg:basis-1/2 lg:max-w-1/2 h-full flex flex-col relative z-20 bg-[#f3f4f6] dark:bg-[#080808]">
        <div className="absolute top-0 left-0 right-0 z-30 h-16 bg-[#f3f4f6]/80 dark:bg-[#080808]/80 pointer-events-none backdrop-blur-md hidden lg:block border-none" style={{ maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 z-30 h-16 bg-[#f3f4f6]/80 dark:bg-[#080808]/80 pointer-events-none backdrop-blur-md border-none" style={{ maskImage: 'linear-gradient(to top, black 20%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)' }} />
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="px-8 lg:px-16 pt-32 lg:pt-48 pb-40 space-y-20 max-w-3xl mx-auto w-full animate-pulse">
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="h-12 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                <div className="h-6 w-full bg-zinc-200 dark:bg-zinc-800/50 rounded-lg" />
                <div className="h-6 w-2/3 bg-zinc-200 dark:bg-zinc-800/50 rounded-lg" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-8 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
              <div className="h-16 w-full bg-zinc-200 dark:bg-zinc-800/30 rounded-xl" />
            </div>
            <div className="space-y-6">
              <div className="h-8 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
              <div className="h-48 w-full bg-zinc-200 dark:bg-zinc-800/30 rounded-xl border border-zinc-200 dark:border-zinc-800" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 lg:basis-1/2 lg:max-w-1/2 lg:h-full lg:sticky lg:top-0 order-first lg:order-last bg-[#f3f4f6] dark:bg-[#080808] flex flex-col z-10">
        <div className="relative w-full h-[400px] lg:h-full p-4 lg:pt-3 lg:pb-3 lg:pr-3 lg:pl-1.5 overflow-hidden">
          <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800/20 rounded-xl border border-zinc-200 dark:border-zinc-800 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function ClassicSkeleton() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white dark:bg-[#111] text-foreground transition-colors duration-300">
      <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-[#111]/60 border-b border-border/40">
        <div className="flex items-center h-14 px-4 sm:px-6 lg:px-8 max-w-[95rem] mx-auto w-full">
          <div className="h-7 w-36 rounded-md bg-zinc-200 dark:bg-zinc-800/70 animate-pulse" />
          <div className="ml-auto h-8 w-28 rounded-md bg-zinc-200 dark:bg-zinc-800/70 animate-pulse" />
        </div>
      </header>

      <div className="flex-1 w-full max-w-[95rem] mx-auto flex">
        <aside className="hidden xl:block w-64 shrink-0 border-r border-zinc-200/70 dark:border-zinc-800/70 px-6 py-10">
          <div className="space-y-3 animate-pulse">
            <div className="h-4 w-28 rounded bg-zinc-200 dark:bg-zinc-800/70" />
            <div className="h-4 w-36 rounded bg-zinc-200 dark:bg-zinc-800/70" />
            <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800/70" />
            <div className="h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-800/70" />
          </div>
        </aside>

        <main className="flex-1 w-full min-w-0 px-6 sm:px-12 lg:px-16 xl:px-24 py-16 space-y-16 pb-40 dark:bg-[#141414]">
          <div className="space-y-5 animate-pulse">
            <div className="h-12 w-2/3 rounded-lg bg-zinc-200 dark:bg-zinc-800/70" />
            <div className="h-6 w-3/4 rounded-lg bg-zinc-200 dark:bg-zinc-800/50" />
            <div className="h-6 w-1/2 rounded-lg bg-zinc-200 dark:bg-zinc-800/50" />
          </div>

          <div className="space-y-8 animate-pulse">
            <div className="h-10 w-48 rounded-lg bg-zinc-200 dark:bg-zinc-800/60" />
            <div className="h-56 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-800/30" />
            <div className="h-40 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-800/30" />
          </div>
        </main>

        <aside className="hidden 2xl:block w-72 shrink-0 border-l border-zinc-200/70 dark:border-zinc-800/70 px-6 py-10">
          <div className="space-y-3 animate-pulse">
            <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800/70" />
            <div className="h-4 w-40 rounded bg-zinc-200 dark:bg-zinc-800/70" />
            <div className="h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-800/70" />
            <div className="h-4 w-28 rounded bg-zinc-200 dark:bg-zinc-800/70" />
          </div>
        </aside>
      </div>
    </div>
  );
}

export function DocsPageSkeleton() {
  const [layout, setLayout] = React.useState<LayoutMode>(() => getSavedLayout());

  React.useEffect(() => {
    setLayout(getSavedLayout());
  }, []);

  return layout === "split" ? <SplitSkeleton /> : <ClassicSkeleton />;
}
