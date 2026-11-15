"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion"

// Componentry mark geometry from /public/logo-new.svg, scaled 0.5 into a 222×231 box.
const SPINE =
  "M457 376 H595 Q619 376 619 400 V505 C619 541 605 564 577 579 C564 586 552 591 544 596 C536 601 532 604 532 607 C532 610 536 613 544 618 C552 623 564 628 577 635 C605 650 619 673 619 709 V814 Q619 838 595 838 H457 Q409 838 409 790 V424 Q409 376 457 376 Z"

type PieceDef = {
  id: string
  left: number
  top: number
  w: number
  h: number
  viewBox: string
  shape: (p: React.SVGProps<SVGPathElement & SVGRectElement>) => React.ReactNode
  scatter: { x: number; y: number; rotate: number }
}

export const PIECES: PieceDef[] = [
  {
    id: "spine",
    left: 0,
    top: 0,
    w: 105,
    h: 231,
    viewBox: "409 376 210 462",
    shape: (p) => <path d={SPINE} {...p} />,
    scatter: { x: -96, y: 34, rotate: -14 },
  },
  {
    id: "head",
    left: 117,
    top: 0,
    w: 105,
    h: 108,
    viewBox: "643 376 210 216",
    shape: (p) => <rect x={643} y={376} width={210} height={216} rx={24} {...p} />,
    scatter: { x: 92, y: -52, rotate: 17 },
  },
  {
    id: "foot",
    left: 117,
    top: 123,
    w: 105,
    h: 108,
    viewBox: "643 622 210 216",
    shape: (p) => <rect x={643} y={622} width={210} height={216} rx={24} {...p} />,
    scatter: { x: 78, y: 48, rotate: -9 },
  },
]

const SNAP_DISTANCE = 32
const snapSpring = { type: "spring" as const, stiffness: 520, damping: 34 }

function Piece({
  def,
  placed,
  onPlace,
  constraints,
  spread,
}: {
  def: PieceDef
  spread: number | null
  placed: boolean
  onPlace: (id: string) => void
  constraints: React.RefObject<HTMLDivElement | null>
}) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useMotionValue(0)

  // Entrance: the mark falls apart, scaled to how much room the stage has.
  useEffect(() => {
    if (spread === null) return
    const t = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 140, damping: 16, delay: 0.25 }
    animate(x, def.scatter.x * spread, t)
    animate(y, def.scatter.y * spread, t)
    animate(rotate, def.scatter.rotate, t)
  }, [def, reduce, spread, x, y, rotate])

  function goHome() {
    const t = reduce ? { duration: 0 } : snapSpring
    animate(x, 0, t)
    animate(y, 0, t)
    animate(rotate, 0, t)
    onPlace(def.id)
  }

  return (
    <motion.div
      aria-hidden
      drag={!placed}
      dragMomentum={false}
      dragConstraints={constraints}
      dragElastic={0.1}
      onDragEnd={() => {
        if (Math.hypot(x.get(), y.get()) <= SNAP_DISTANCE) goHome()
      }}
      whileDrag={{ scale: 1.04 }}
      style={{ x, y, rotate, left: def.left, top: def.top, width: def.w, height: def.h }}
      className={placed ? "absolute" : "absolute cursor-grab touch-none active:cursor-grabbing"}
    >
      <svg viewBox={def.viewBox} className="size-full overflow-visible">
        {def.shape({ className: "fill-zinc-950 dark:fill-zinc-50" })}
      </svg>
    </motion.div>
  )
}

export function AssemblyLogo({
  placed,
  onPlace,
}: {
  placed: Record<string, boolean>
  onPlace: (id: string) => void
}) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [spread, setSpread] = useState<number | null>(null)

  useLayoutEffect(() => {
    // Room on each side of the 222px mark, against ~130px the widest scatter needs.
    const room = ((stageRef.current?.offsetWidth ?? 460) - 222) / 2
    setSpread(Math.min(1, Math.max(0.4, room / 130)))
  }, [])

  return (
    <div ref={stageRef} className="relative flex h-[360px] w-full max-w-[460px] items-center justify-center">
      <div className="relative h-[231px] w-[222px]">
        {/* where the pieces belong */}
        {PIECES.map((def) => (
          <svg
            key={`ghost-${def.id}`}
            viewBox={def.viewBox}
            aria-hidden
            className="absolute overflow-visible transition-opacity duration-300 ease-out"
            style={{ left: def.left, top: def.top, width: def.w, height: def.h, opacity: placed[def.id] ? 0 : 1 }}
          >
            {def.shape({
              className: "fill-none stroke-zinc-300 dark:stroke-zinc-700",
              strokeWidth: 1.25,
              strokeDasharray: "4 4",
              vectorEffect: "non-scaling-stroke",
            })}
          </svg>
        ))}
        {PIECES.map((def) => (
          <Piece
            key={def.id}
            def={def}
            constraints={stageRef}
            placed={!!placed[def.id]}
            spread={spread}
            onPlace={onPlace}
          />
        ))}
      </div>
    </div>
  )
}
