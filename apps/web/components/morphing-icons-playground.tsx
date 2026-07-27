"use client";

import { ArrowRightLeft, Pause, Play, Search, Shuffle } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  getMorphingIcon,
  MorphingIcon,
  morphingIcons,
  type MorphingIconName,
} from "@workspace/ui/components/morphing-icon";
import { Footer } from "@/components/footer";
import {
  LandingContent,
  LandingGuideLines,
  LandingGutter,
} from "@/components/landing/landing-frame";
import {
  PlaygroundInput,
  PlaygroundSlider,
} from "@/components/playground-primitives";
import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";

type ActiveSelector = "from" | "to";

function SelectorCard({
  kind,
  value,
  active,
  onActivate,
}: {
  kind: ActiveSelector;
  value: MorphingIconName;
  active: boolean;
  onActivate: () => void;
}) {
  const icon = getMorphingIcon(value);

  return (
    <button
      type="button"
      onClick={onActivate}
      aria-pressed={active}
      aria-label={`Assign palette choices to the ${kind} state. Currently ${icon.label}.`}
      className={cn(
        "relative flex min-h-14 min-w-0 flex-1 items-center gap-2 rounded-md bg-background/70 p-2 text-left ring-1 transition-[background-color,box-shadow,transform] duration-200 hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 active:scale-[0.99]",
        active
          ? "bg-muted ring-foreground/25 shadow-[0_0_0_3px_rgba(0,0,0,0.035)] dark:shadow-[0_0_0_3px_rgba(255,255,255,0.035)]"
          : "ring-foreground/10 hover:ring-foreground/16",
      )}
    >
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded bg-muted text-foreground ring-1 ring-foreground/[0.06] transition-[background-color,color,box-shadow] duration-200",
          active &&
            "bg-zinc-950 text-white ring-zinc-950 dark:bg-white dark:text-zinc-950 dark:ring-white",
        )}
      >
        <MorphingIcon icon={value} size={20} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
          {kind} state
        </span>
        <span className="mt-0.5 block truncate text-[12px] font-medium">
          {icon.label}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 rounded-full bg-foreground opacity-0 transition-opacity",
          active && "opacity-100",
        )}
      />
    </button>
  );
}

function ActionButton({
  children,
  onClick,
  pressed,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  pressed?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      disabled={disabled}
      className={cn(
        "inline-flex h-9 items-center justify-center gap-2 rounded-md bg-background px-3 text-[12px] font-medium text-foreground ring-1 ring-foreground/10 transition-[background-color,box-shadow,transform] duration-200 hover:bg-muted hover:ring-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25 active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-background disabled:active:scale-100",
        pressed &&
          "bg-zinc-950 text-white ring-zinc-950 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:ring-white dark:hover:bg-zinc-200",
      )}
    >
      {children}
    </button>
  );
}

export function MorphingIconsPlayground() {
  const reduceMotion = useReducedMotion() ?? false;
  const [from, setFrom] = useState<MorphingIconName>("menu");
  const [to, setTo] = useState<MorphingIconName>("cross");
  const [activeSelector, setActiveSelector] = useState<ActiveSelector>("from");
  const [showingTo, setShowingTo] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [pausedForInteraction, setPausedForInteraction] = useState(false);
  const [speed, setSpeed] = useState(0.28);
  const [query, setQuery] = useState("");

  const visibleName = showingTo ? to : from;
  const visibleIcon = getMorphingIcon(visibleName);
  const isAutoplaying = autoplay && !reduceMotion && !pausedForInteraction;

  const filteredIcons = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return morphingIcons;

    return morphingIcons.filter(
      (icon) =>
        icon.label.toLowerCase().includes(normalizedQuery) ||
        icon.name.includes(normalizedQuery) ||
        icon.category.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  const toggle = useCallback(() => {
    setShowingTo((current) => !current);
  }, []);

  useEffect(() => {
    if (!isAutoplaying) return;
    const interval = window.setInterval(
      toggle,
      Math.max(speed * 1.8, 0.7) * 1000,
    );
    return () => window.clearInterval(interval);
  }, [isAutoplaying, speed, toggle]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) setAutoplay(false);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const updateSelection = useCallback(
    (selector: ActiveSelector, name: MorphingIconName) => {
      if (selector === "from") {
        setFrom(name);
        setShowingTo(false);
      } else {
        setTo(name);
        setShowingTo(true);
      }
    },
    [],
  );

  const swap = () => {
    setFrom(to);
    setTo(from);
    setShowingTo((current) => !current);
    setActiveSelector((current) => (current === "from" ? "to" : "from"));
  };

  const randomise = () => {
    const first = Math.floor(Math.random() * morphingIcons.length);
    let second = Math.floor(Math.random() * (morphingIcons.length - 1));
    if (second >= first) second += 1;
    setFrom(morphingIcons[first]!.name);
    setTo(morphingIcons[second]!.name);
    setShowingTo(false);
    setAutoplay(false);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white text-foreground selection:bg-zinc-200 dark:bg-background dark:selection:bg-zinc-800">
      <LandingGuideLines />
      <SiteHeader landingGutter />

      <main className="relative z-10 pt-14 pb-14">
        <LandingGutter>
          <LandingContent className="max-w-6xl">
            <header className="flex flex-col gap-3 border-x border-b border-border/45 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-baseline gap-3">
                <h1 className="text-[26px] font-medium leading-tight tracking-[-0.04em] text-zinc-950 dark:text-white sm:text-[30px]">
                  Morphing Icons
                </h1>
                <span className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-400 sm:inline dark:text-zinc-600">
                  Playground
                </span>
              </div>
              <div className="flex max-w-xl flex-wrap items-center gap-x-4 gap-y-2 sm:justify-end">
                <p className="text-pretty text-[13px] leading-5 text-zinc-500 dark:text-zinc-400">
                  Pair three-stroke icons and preview the transition.
                </p>
                <Link
                  href="/docs/components/morphing-icon"
                  className="inline-flex text-[12px] font-medium whitespace-nowrap text-zinc-950 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25 dark:text-white dark:decoration-zinc-700 dark:hover:decoration-white"
                >
                  Docs
                </Link>
              </div>
            </header>
          </LandingContent>
        </LandingGutter>

        <LandingGutter>
          <LandingContent className="max-w-6xl">
            <section
              aria-label="Morphing icon playground"
              className="border-x border-b border-border/45 bg-white p-2 dark:bg-background"
            >
              <div className="grid overflow-hidden rounded-lg border border-border/60 bg-white dark:bg-[#121212] lg:grid-cols-[minmax(0,1fr)_22rem]">
                <div className="flex min-w-0 flex-col">
                  <div className="grid grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)] items-stretch gap-2 border-b border-border/60 bg-white p-2 dark:bg-[#121212]">
                    <SelectorCard
                      kind="from"
                      value={from}
                      active={activeSelector === "from"}
                      onActivate={() => setActiveSelector("from")}
                    />
                    <button
                      type="button"
                      onClick={swap}
                      aria-label="Swap from and to icons"
                      className="flex items-center justify-center rounded-md text-muted-foreground ring-1 ring-foreground/10 transition-[background-color,color,transform] duration-200 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25 active:scale-[0.96]"
                    >
                      <ArrowRightLeft className="size-3.5" aria-hidden="true" />
                    </button>
                    <SelectorCard
                      kind="to"
                      value={to}
                      active={activeSelector === "to"}
                      onActivate={() => setActiveSelector("to")}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={toggle}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse") {
                        setPausedForInteraction(true);
                      }
                    }}
                    onPointerLeave={(event) => {
                      if (event.pointerType === "mouse") {
                        setPausedForInteraction(false);
                      }
                    }}
                    onFocus={() => setPausedForInteraction(true)}
                    onBlur={() => setPausedForInteraction(false)}
                    className="group relative flex min-h-[17rem] flex-1 touch-manipulation items-center justify-center overflow-hidden bg-[#f7f7f7] text-zinc-950 transition-colors duration-200 hover:bg-[#f4f4f4] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground/25 dark:bg-[#171717] dark:text-white dark:hover:bg-[#191919] sm:min-h-[19rem] lg:min-h-[20rem]"
                    aria-label={`Showing ${visibleIcon.label}. Activate to morph to ${
                      showingTo
                        ? getMorphingIcon(from).label
                        : getMorphingIcon(to).label
                    }`}
                  >
                    <div className="flex size-36 items-center justify-center sm:size-40">
                      <MorphingIcon
                        icon={visibleName}
                        size={104}
                        duration={speed}
                        className="size-24 sm:size-28"
                      />
                    </div>

                    <span className="absolute bottom-4 left-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      {visibleIcon.label}
                    </span>
                    <span className="absolute right-4 bottom-4 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 dark:text-zinc-500">
                      Click to morph
                    </span>
                  </button>

                  <div className="grid gap-3 border-t border-border/60 bg-white p-2 dark:bg-[#121212] sm:grid-cols-[auto_minmax(12rem,1fr)] sm:items-end">
                    <div className="flex gap-2">
                      <ActionButton onClick={randomise}>
                        <Shuffle className="size-3.5" aria-hidden="true" />
                        Randomise
                      </ActionButton>
                      <ActionButton
                        onClick={() => setAutoplay((current) => !current)}
                        pressed={autoplay && !reduceMotion}
                        disabled={reduceMotion}
                      >
                        {autoplay && !reduceMotion ? (
                          <Pause className="size-3.5" aria-hidden="true" />
                        ) : (
                          <Play className="size-3.5" aria-hidden="true" />
                        )}
                        {autoplay && !reduceMotion ? "Pause" : "Autoplay"}
                      </ActionButton>
                    </div>
                    <PlaygroundSlider
                      label="Morph duration"
                      min={0.12}
                      max={0.8}
                      step={0.04}
                      value={speed}
                      unit="s"
                      onChange={setSpeed}
                    />
                    {reduceMotion && (
                      <p className="text-xs leading-5 text-muted-foreground sm:col-span-2">
                        Reduced motion is enabled. Transitions are immediate and
                        autoplay remains paused.
                      </p>
                    )}
                  </div>
                </div>

                <aside
                  aria-label="Icon palette"
                  className="flex min-h-0 flex-col border-t border-border/60 bg-white dark:bg-[#121212] lg:border-t-0 lg:border-l"
                >
                  <div className="border-b border-border/60 p-2">
                    <div className="mb-1.5 flex items-center justify-between px-0.5">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-600">
                          Icon palette
                        </p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          Assigning to {activeSelector}
                        </p>
                      </div>
                      <span className="font-mono text-[9px] tabular-nums text-zinc-400 dark:text-zinc-600">
                        {filteredIcons.length}/{morphingIcons.length}
                      </span>
                    </div>
                    <label className="relative block">
                      <span className="sr-only">Search icons</span>
                      <Search
                        aria-hidden="true"
                        className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground"
                      />
                      <PlaygroundInput
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search icons"
                        className="h-8 pl-9 text-xs"
                      />
                    </label>
                  </div>

                  <div className="flex-1">
                    {filteredIcons.length > 0 ? (
                      <div className="grid grid-cols-6 gap-px bg-border/70 p-px">
                        {filteredIcons.map((icon) => {
                          const selected =
                            (activeSelector === "from" ? from : to) ===
                            icon.name;
                          return (
                            <button
                              key={icon.name}
                              type="button"
                              title={`${icon.label} · ${icon.category}`}
                              aria-label={`Assign ${icon.label} to ${activeSelector}`}
                              aria-pressed={selected}
                              onClick={() =>
                                updateSelection(activeSelector, icon.name)
                              }
                              className={cn(
                                "group relative flex aspect-square items-center justify-center bg-white text-foreground transition-[background-color,color,transform] duration-150 hover:z-10 hover:bg-zinc-100 focus-visible:z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground/30 active:scale-[0.96] dark:bg-[#121212] dark:hover:bg-[#1b1b1b]",
                                selected &&
                                  "z-10 bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200",
                              )}
                            >
                              <MorphingIcon
                                icon={icon.name}
                                size={24}
                                className="transition-transform duration-150 group-hover:scale-110"
                              />
                              {selected && (
                                <span className="absolute top-1.5 right-1.5 size-1 rounded-full bg-current opacity-55" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex min-h-40 items-center justify-center px-6 text-center text-xs leading-5 text-muted-foreground">
                        No icons match “{query}”.
                      </div>
                    )}
                  </div>
                </aside>
              </div>
            </section>
          </LandingContent>
        </LandingGutter>
      </main>

      <Footer />
    </div>
  );
}
