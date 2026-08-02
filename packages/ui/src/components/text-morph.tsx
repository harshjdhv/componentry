"use client";

import { cn } from "@workspace/ui/lib/utils";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

export interface TextMorphProps {
  /** Words or phrases displayed by the morph sequence. */
  words?: string[];
  /** Time each word rests before the next morph begins, in milliseconds. */
  interval?: number;
  /** Duration of the fluid morph itself, in milliseconds. */
  morphDuration?: number;
  /** Maximum blur used to blend the outgoing and incoming silhouettes. */
  blur?: number;
  /** Alpha contrast applied by the SVG threshold filter. */
  threshold?: number;
  /** Optional supporting copy rendered beneath the morphing text. */
  subtext?: string;
  /** CSS font-size value for the morphing text. */
  fontSize?: string;
  /** CSS font-family value. Inherits from the surrounding page by default. */
  fontFamily?: string;
  /** CSS font-weight value for the morphing text. */
  fontWeight?: CSSProperties["fontWeight"];
  /** Horizontal alignment of the text and subtext. */
  align?: "left" | "center" | "right";
  /** Smoothly interpolate the stage width between differently sized words. */
  animateWidth?: boolean;
  /** Automatically continue cycling through the supplied words. */
  loop?: boolean;
  /** Pause the next cycle while the component is hovered or focused. */
  pauseOnHover?: boolean;
  /** Additional classes applied to the root wrapper. */
  className?: string;
  /** Additional classes applied to the morphing text stage. */
  textClassName?: string;
  /** Additional classes applied to the supporting text. */
  subtextClassName?: string;
  /** Called immediately before a morph begins. */
  onMorphStart?: (nextWord: string, nextIndex: number) => void;
  /** Called after a morph resolves into a crisp resting word. */
  onMorphComplete?: (word: string, index: number) => void;
}

const DEFAULT_WORDS = ["IMAGINE", "REFINE", "RELEASE"];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function clamp(value: number, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value));
}

function smoothstep(value: number) {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
}

function setLayerStyles(
  element: HTMLSpanElement,
  opacity: number,
  blur: number,
  scale: number,
) {
  element.style.opacity = opacity.toFixed(4);
  element.style.filter = blur > 0.01 ? `blur(${blur.toFixed(2)}px)` : "none";
  element.style.transform = `scale(${scale.toFixed(4)})`;
}

export function TextMorph({
  words = DEFAULT_WORDS,
  interval = 2600,
  morphDuration = 680,
  blur = 12,
  threshold = 18,
  subtext,
  fontSize = "clamp(3rem, 14vw, 9rem)",
  fontFamily = "inherit",
  fontWeight = 700,
  align = "center",
  animateWidth = true,
  loop = true,
  pauseOnHover = true,
  className,
  textClassName,
  subtextClassName,
  onMorphStart,
  onMorphComplete,
}: TextMorphProps) {
  const values = useMemo(() => {
    const filtered = words.filter((word) => word.trim().length > 0);
    return filtered.length > 0 ? filtered : DEFAULT_WORDS;
  }, [words]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const currentLayerRef = useRef<HTMLSpanElement>(null);
  const nextLayerRef = useRef<HTMLSpanElement>(null);
  const stageRef = useRef<HTMLSpanElement>(null);
  const holdTimerRef = useRef<number | undefined>(undefined);
  const frameRef = useRef<number | undefined>(undefined);
  const morphingRef = useRef(false);
  const reducedMotion = usePrefersReducedMotion();
  const reactId = useId().replace(/:/g, "");
  const filterId = `text-morph-threshold-${reactId}`;

  const safeIndex = currentIndex % values.length;
  const nextIndex = (safeIndex + 1) % values.length;
  const currentWord = values[safeIndex]!;
  const nextWord = values[nextIndex]!;
  const thresholdOffset = -Math.max(1, threshold) * 0.46;

  const measureStage = useCallback(
    (target: "current" | "next", immediate = false) => {
      const stage = stageRef.current;
      const layer =
        target === "current" ? currentLayerRef.current : nextLayerRef.current;
      if (!stage || !layer) return;

      // Read the untransformed glyph width. The incoming layer rests at a
      // fractional scale, which must not leak into the layout target.
      const previousTransform = layer.style.transform;
      layer.style.transform = "none";
      const width = layer.getBoundingClientRect().width;
      layer.style.transform = previousTransform;
      if (immediate || !animateWidth || reducedMotion) {
        const previousTransition = stage.style.transition;
        stage.style.transition = "none";
        stage.style.width = `${width}px`;
        void stage.offsetWidth;
        stage.style.transition = previousTransition;
        return;
      }

      stage.style.width = `${width}px`;
    },
    [animateWidth, reducedMotion],
  );

  useLayoutEffect(() => {
    const currentLayer = currentLayerRef.current;
    const nextLayer = nextLayerRef.current;
    const stage = stageRef.current;
    if (!currentLayer || !nextLayer || !stage) return;

    setLayerStyles(currentLayer, 1, 0, 1);
    setLayerStyles(nextLayer, 0, reducedMotion ? 0 : blur, 0.992);
    currentLayer.style.willChange = "auto";
    nextLayer.style.willChange = "auto";
    stage.style.filter = "none";
    stage.style.transition = animateWidth
      ? `width ${Math.max(160, morphDuration)}ms cubic-bezier(0.22, 1, 0.36, 1)`
      : "none";
    measureStage("current", true);
  }, [
    animateWidth,
    blur,
    currentIndex,
    measureStage,
    morphDuration,
    reducedMotion,
    values,
  ]);

  useEffect(() => {
    const currentLayer = currentLayerRef.current;
    const nextLayer = nextLayerRef.current;
    if (!currentLayer || !nextLayer) return;

    const observer = new ResizeObserver(() => {
      if (!morphingRef.current) measureStage("current", true);
    });
    observer.observe(currentLayer);
    observer.observe(nextLayer);
    return () => observer.disconnect();
  }, [measureStage]);

  const beginMorph = useCallback(() => {
    const currentLayer = currentLayerRef.current;
    const nextLayer = nextLayerRef.current;
    const stage = stageRef.current;
    if (
      !currentLayer ||
      !nextLayer ||
      !stage ||
      morphingRef.current ||
      values.length < 2
    ) {
      return;
    }

    morphingRef.current = true;
    currentLayer.style.willChange = "opacity, filter, transform";
    nextLayer.style.willChange = "opacity, filter, transform";
    stage.style.filter = reducedMotion ? "none" : `url(#${filterId})`;
    measureStage("next");
    onMorphStart?.(nextWord, nextIndex);

    const startedAt = performance.now();
    const resolvedDuration = reducedMotion ? 140 : Math.max(240, morphDuration);

    const renderFrame = (now: number) => {
      const progress = clamp((now - startedAt) / resolvedDuration);
      const eased = smoothstep(progress);

      if (reducedMotion) {
        setLayerStyles(currentLayer, 1 - eased, 0, 1);
        setLayerStyles(nextLayer, eased, 0, 1);
      } else {
        // The incoming layer starts early and the outgoing layer lingers. Their
        // overlap gives the threshold filter enough shared alpha to feel fluid.
        const incoming = smoothstep(clamp(progress / 0.82));
        const outgoing = smoothstep(clamp((progress - 0.18) / 0.82));

        setLayerStyles(
          currentLayer,
          Math.pow(1 - outgoing, 0.55),
          blur * outgoing,
          1 - outgoing * 0.012,
        );
        setLayerStyles(
          nextLayer,
          Math.pow(incoming, 0.55),
          blur * (1 - incoming),
          0.988 + incoming * 0.012,
        );
      }

      if (progress < 1) {
        frameRef.current = window.requestAnimationFrame(renderFrame);
        return;
      }

      stage.style.filter = "none";
      currentLayer.style.willChange = "auto";
      nextLayer.style.willChange = "auto";
      morphingRef.current = false;
      setCurrentIndex(nextIndex);
      onMorphComplete?.(nextWord, nextIndex);
    };

    frameRef.current = window.requestAnimationFrame(renderFrame);
  }, [
    blur,
    filterId,
    measureStage,
    morphDuration,
    nextIndex,
    nextWord,
    onMorphComplete,
    onMorphStart,
    reducedMotion,
    values.length,
  ]);

  useEffect(() => {
    if (!loop || paused || values.length < 2) return;

    holdTimerRef.current = window.setTimeout(
      beginMorph,
      Math.max(400, interval),
    );

    return () => {
      if (holdTimerRef.current !== undefined) {
        window.clearTimeout(holdTimerRef.current);
      }
    };
  }, [beginMorph, currentIndex, interval, loop, paused, values.length]);

  useEffect(
    () => () => {
      if (holdTimerRef.current !== undefined) {
        window.clearTimeout(holdTimerRef.current);
      }
      if (frameRef.current !== undefined) {
        window.cancelAnimationFrame(frameRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    if (currentIndex < values.length) return;
    setCurrentIndex(0);
  }, [currentIndex, values.length]);

  const alignmentClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  } as const;
  const layerPositionClasses = {
    left: "left-0",
    center: "inset-x-0 mx-auto",
    right: "right-0",
  } as const;
  const layerTransformOrigins = {
    left: "left center",
    center: "center center",
    right: "right center",
  } as const;

  return (
    <span
      className={cn(
        "relative inline-flex max-w-full flex-col",
        alignmentClasses[align],
        className,
      )}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      onFocusCapture={() => pauseOnHover && setPaused(true)}
      onBlurCapture={(event) => {
        if (
          pauseOnHover &&
          !event.currentTarget.contains(event.relatedTarget)
        ) {
          setPaused(false);
        }
      }}
      aria-label={[currentWord, subtext].filter(Boolean).join(" — ")}
      aria-live="off"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none absolute size-0 overflow-hidden"
      >
        <defs>
          <filter
            id={filterId}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            colorInterpolationFilters="sRGB"
          >
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${Math.max(1, threshold)} ${thresholdOffset}`}
              result="thresholded"
            />
            <feComposite in="SourceGraphic" in2="thresholded" operator="atop" />
          </filter>
        </defs>
      </svg>

      <span
        ref={stageRef}
        aria-hidden="true"
        className={cn(
          "relative inline-block min-w-0 max-w-full shrink-0 select-none leading-[0.88] tracking-[-0.065em]",
          textClassName,
        )}
        style={{
          fontSize,
          fontFamily,
          fontWeight,
          height: "0.88em",
          textRendering: "geometricPrecision",
        }}
      >
        <span
          ref={currentLayerRef}
          className={cn(
            "absolute top-0 block w-max whitespace-pre",
            layerPositionClasses[align],
          )}
          style={{ transformOrigin: layerTransformOrigins[align] }}
        >
          {currentWord}
        </span>
        <span
          ref={nextLayerRef}
          className={cn(
            "absolute top-0 block w-max whitespace-pre",
            layerPositionClasses[align],
          )}
          style={{ transformOrigin: layerTransformOrigins[align] }}
        >
          {nextWord}
        </span>
      </span>

      {subtext && (
        <span
          aria-hidden="true"
          className={cn(
            "mt-6 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-current/45",
            subtextClassName,
          )}
          style={{ fontFamily }}
        >
          {subtext}
        </span>
      )}
    </span>
  );
}

export default TextMorph;
