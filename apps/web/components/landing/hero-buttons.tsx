"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@workspace/ui/components/coss-button";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import posthog from "posthog-js";

const components = ["magnetic-dock", "text-morph", "hover-transition"];

export function HeroButtons() {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => setCanAnimate(visible && !document.hidden && !query.matches);
    const observer = new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? false; update(); });
    if (root.current) observer.observe(root.current);
    query.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); query.removeEventListener("change", update); document.removeEventListener("visibilitychange", update); };
  }, []);
  useEffect(() => {
    if (!canAnimate || held || status !== "idle") return;
    const timer = setInterval(() => setIndex(value => (value + 1) % components.length), 4500);
    return () => clearInterval(timer);
  }, [canAnimate, held, status]);
  useEffect(() => {
    if (status === "idle") return;
    const timer = setTimeout(() => setStatus("idle"), 2000);
    return () => clearTimeout(timer);
  }, [status]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`npx shadcn@latest add @componentry/${components[index]}`);
      setStatus("copied");
      posthog.capture("component_install_command_copied");
    } catch { setStatus("error"); }
  };
  return (
    <div ref={root} className="flex w-full min-w-0 flex-wrap items-center justify-start gap-2 sm:justify-center">
      <Button render={<Link href="/docs" />} onClick={() => posthog.capture("components_browse_started")} className="h-10 gap-1.5 rounded-[10px] px-4 text-sm before:rounded-[9px] sm:h-10">
        Browse components <ArrowUpRight aria-hidden="true" className="size-4" />
      </Button>
      <Button
        variant="ghost"
        onClick={copy}
        onMouseEnter={() => setHeld(true)}
        onMouseLeave={() => setHeld(false)}
        onFocus={() => setHeld(true)}
        onBlur={() => setHeld(false)}
        aria-label={`Copy install command for ${components[index]}`}
        className="hidden h-10 max-w-full gap-3 sm:inline-flex rounded-[10px] border-0 bg-zinc-100 text-zinc-900 shadow-none before:hidden hover:bg-zinc-200 dark:bg-white/[0.065] dark:text-zinc-300 dark:hover:bg-white/[0.085] px-3 font-mono text-sm font-medium sm:h-10 sm:text-sm"
      >
        <span aria-hidden="true" className="inline-flex min-w-0 items-center overflow-x-auto whitespace-pre">
          <span className="shrink-0">npx shadcn<span className="hidden sm:inline">@latest</span> add @componentry/</span>
          <span className="relative inline-grid w-[16ch] shrink-0 overflow-hidden text-left">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span key={index} initial={{ opacity: 0, y: canAnimate ? 6 : 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: canAnimate ? -6 : 0 }} transition={{ duration: canAnimate ? 0.2 : 0 }}>
                {components[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </span>
        {status === "copied" ? <Check aria-hidden="true" className="size-3.5" /> : <Copy aria-hidden="true" className="size-3.5" />}
      </Button>
      <span role="status" className="sr-only">{status === "copied" ? "Install command copied" : status === "error" ? "Could not copy the command. Please try again." : ""}</span>
    </div>
  );
}
