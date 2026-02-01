"use client";

import * as React from "react";
import { ArrowUpRight, X } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CollectionSurferPreviewProps {
  src: string;
  title: string;
  className?: string;
}

export function CollectionSurferPreview({
  src,
  title,
  className,
}: CollectionSurferPreviewProps) {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  // Lock body scroll when fullscreen
  React.useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFullscreen]);

  return (
    <>
      {/* Placeholder to prevent layout shift when going fullscreen */}
      {isFullscreen && (
        <div className="w-full aspect-video" aria-hidden="true" />
      )}

      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 30,
        }}
        className={cn(
          "bg-neutral-950 overflow-hidden",
          isFullscreen
            ? "fixed inset-0 z-[100] rounded-none"
            : "relative w-full aspect-video",
          className,
        )}
      >
        <Button
          variant={isFullscreen ? "outline" : "secondary"}
          size={isFullscreen ? "icon" : "sm"}
          className={cn(
            "absolute z-50 transition-all duration-300",
            isFullscreen
              ? "top-4 right-4 rounded-full bg-black/50 hover:bg-black text-white border-white/20"
              : "bottom-4 right-4",
          )}
          onClick={() => setIsFullscreen(!isFullscreen)}
        >
          {isFullscreen ? (
            <>
              <X className="w-4 h-4" />
              <span className="sr-only">Exit fullscreen</span>
            </>
          ) : (
            <>
              Open Fullscreen <ArrowUpRight className="ml-2 w-4 h-4" />
            </>
          )}
        </Button>

        <iframe src={src} className="w-full h-full border-0" title={title} />
      </motion.div>
    </>
  );
}
