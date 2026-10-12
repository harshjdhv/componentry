"use client"

import * as React from "react"
import { useReducedMotion, useSpring } from "framer-motion"
import { cn } from "@workspace/ui/lib/utils"

export interface LensClockProps {
  /** IANA time zone such as "America/Los_Angeles". Omit to use the viewer's own zone. */
  timeZone?: string
  /** Fixed moment to display. Omit to keep the clock live, read from the viewer's device clock. */
  time?: Date
  /** Force a palette. Omit to follow the surrounding `dark` class. */
  theme?: "light" | "dark"
  className?: string
}

// Geometry in card units (the card is a 100 x 100 viewBox).
const TICK_OUTER = 54
const MINOR_INNER = 50.5
const HOUR_INNER = 42
const LABEL_RADIUS = 61
const HAND_LENGTH = 33
const MINUTE_LENGTH = 48
const SECOND_LENGTH = 52
// How far the dial centre sits behind the card centre, opposite the hand.
const PAN_DISTANCE = 24

const LIGHT_VARS =
  "[--lc-accent:#ff8a00] [--lc-lume:#62c42a] [--lc-card-from:#f6f6f8] [--lc-card-to:#e2e1e6] [--lc-edge:rgba(255,255,255,0.9)] [--lc-tick:#a3a2a8] [--lc-label:#8e8d93] [--lc-spoke:#6f6e76] [--lc-hand:#fbfbfc] [--lc-hand-edge:rgba(0,0,0,0.06)] [--lc-pivot-from:#ffffff] [--lc-pivot-to:#e6e5ea] [--lc-sleeve:#ffffff]"

const DARK_VARS =
  "[--lc-accent:#ff9f0a] [--lc-lume:#6fd136] [--lc-card-from:#262628] [--lc-card-to:#141415] [--lc-edge:rgba(255,255,255,0.07)] [--lc-tick:#76767b] [--lc-label:#808086] [--lc-spoke:#a2a2a8] [--lc-hand:#46464a] [--lc-hand-edge:rgba(255,255,255,0.06)] [--lc-pivot-from:#4a4a4d] [--lc-pivot-to:#2a2a2c] [--lc-sleeve:#38383b]"

// Written out in full so Tailwind can detect every class.
const AUTO_DARK_VARS =
  "dark:[--lc-accent:#ff9f0a] dark:[--lc-lume:#6fd136] dark:[--lc-card-from:#262628] dark:[--lc-card-to:#141415] dark:[--lc-edge:rgba(255,255,255,0.07)] dark:[--lc-tick:#76767b] dark:[--lc-label:#808086] dark:[--lc-spoke:#a2a2a8] dark:[--lc-hand:#46464a] dark:[--lc-hand-edge:rgba(255,255,255,0.06)] dark:[--lc-pivot-from:#4a4a4d] dark:[--lc-pivot-to:#2a2a2c] dark:[--lc-sleeve:#38383b]"

const TIME_FORMAT: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hourCycle: "h23",
}

function createFormatter(timeZone?: string) {
  try {
    return new Intl.DateTimeFormat("en-US", { ...TIME_FORMAT, timeZone })
  } catch {
    // Unknown zone: fall back to the viewer's own.
    return new Intl.DateTimeFormat("en-US", TIME_FORMAT)
  }
}

function readTime(date: Date, formatter: Intl.DateTimeFormat) {
  const parts = formatter.formatToParts(date)
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0)
  return { hours: get("hour") % 24, minutes: get("minute"), seconds: get("second") }
}

type SpringOptions = Parameters<typeof useSpring>[1]

// Springs toward an unwrapped angle so 59 -> 0 keeps moving forward.
function useAngle(target: number | null, reduceMotion: boolean, options: SpringOptions) {
  const angle = useSpring(0, options)
  const unwrapped = React.useRef<number | null>(null)

  React.useEffect(() => {
    if (target === null) return
    const previous = unwrapped.current
    const next =
      previous === null
        ? target
        : previous + ((((target - previous) % 360) + 540) % 360) - 180
    unwrapped.current = next
    if (previous === null || reduceMotion) angle.jump(next)
    else angle.set(next)
  }, [target, reduceMotion, angle])

  return angle
}

function useNow(fixed?: Date) {
  const [now, setNow] = React.useState<Date | null>(null)

  React.useEffect(() => {
    if (fixed) return
    const tick = () => setNow(new Date())
    tick()
    let interval: ReturnType<typeof setInterval> | undefined
    // Align updates with the wall-clock second.
    const timeout = setTimeout(() => {
      tick()
      interval = setInterval(tick, 1000)
    }, 1000 - (Date.now() % 1000))
    return () => {
      clearTimeout(timeout)
      if (interval) clearInterval(interval)
    }
  }, [fixed])

  return fixed ?? now
}

function pad(value: number) {
  return value.toString().padStart(2, "0")
}

export function LensClock({ timeZone, time, theme, className }: LensClockProps) {
  const now = useNow(time)
  const formatter = React.useMemo(() => createFormatter(timeZone), [timeZone])
  const parts = now ? readTime(now, formatter) : null
  const reduceMotion = useReducedMotion() ?? false
  const id = React.useId().replace(/:/g, "")

  const dialRef = React.useRef<SVGGElement>(null)
  const hourRef = React.useRef<SVGGElement>(null)
  const minuteRef = React.useRef<SVGGElement>(null)
  const secondRef = React.useRef<SVGGElement>(null)

  const ready = now !== null
  const live = !time
  const target = parts
    ? ((parts.hours % 12) + parts.minutes / 60 + parts.seconds / 3600) * 30
    : null

  // A fixed `time` springs into place; the live clock is drawn per frame below.
  const hourAngle = useAngle(live ? null : target, reduceMotion, { stiffness: 70, damping: 18 })
  const minuteAngle = useAngle(
    !live && parts ? (parts.minutes + parts.seconds / 60) * 6 : null,
    reduceMotion,
    { stiffness: 90, damping: 18 }
  )
  const secondAngle = useAngle(!live && parts ? parts.seconds * 6 : null, reduceMotion, {
    stiffness: 90,
    damping: 18,
  })

  const draw = React.useCallback((hour: number, minute: number, second: number) => {
    const rad = (hour * Math.PI) / 180
    const cx = 50 - PAN_DISTANCE * Math.sin(rad)
    const cy = 50 + PAN_DISTANCE * Math.cos(rad)
    dialRef.current?.setAttribute("transform", `translate(${cx} ${cy})`)
    hourRef.current?.setAttribute("transform", `rotate(${hour})`)
    minuteRef.current?.setAttribute("transform", `rotate(${minute})`)
    secondRef.current?.setAttribute("transform", `rotate(${second})`)
  }, [])

  React.useEffect(() => {
    if (live) return
    const update = () => draw(hourAngle.get(), minuteAngle.get(), secondAngle.get())
    update()
    const unsubscribe = [
      hourAngle.on("change", update),
      minuteAngle.on("change", update),
      secondAngle.on("change", update),
    ]
    return () => unsubscribe.forEach((fn) => fn())
  }, [live, ready, hourAngle, minuteAngle, secondAngle, draw])

  // Live: the time-zone wall clock is read once a second, and every frame in
  // between adds the device clock's elapsed milliseconds for a smooth sweep.
  const baseSeconds = live && parts ? parts.hours * 3600 + parts.minutes * 60 + parts.seconds : null
  const baseAt = live && now ? Math.floor(now.getTime() / 1000) * 1000 : null

  React.useEffect(() => {
    if (baseSeconds === null || baseAt === null) return
    let frame = 0
    const tick = () => {
      const elapsed = (Date.now() - baseAt) / 1000
      // Reduced motion: step once a second instead of sweeping.
      const t = baseSeconds + (reduceMotion ? Math.floor(elapsed) : elapsed)
      draw((t / 120) % 360, (t / 10) % 360, (t * 6) % 360)
      frame = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(frame)
  }, [baseSeconds, baseAt, reduceMotion, draw])

  const hours = parts?.hours ?? 0
  const minutes = parts?.minutes ?? 0

  const ticks = React.useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => {
        const deg = i * 6
        const rad = (deg * Math.PI) / 180
        const sin = Math.sin(rad)
        const cos = -Math.cos(rad)
        return { i, deg, sin, cos, isHour: i % 5 === 0 }
      }),
    []
  )

  const dial = (
    <>
      {/* Hairline spokes converging on the pivot */}
      {Array.from({ length: 12 }, (_, i) => (
        <line
          key={i}
          x1={0}
          y1={0}
          x2={0}
          y2={-TICK_OUTER + 4}
          transform={`rotate(${i * 30})`}
          stroke={`url(#${id}-spoke)`}
          strokeWidth={0.18}
        />
      ))}

      {ticks.map(({ i, sin, cos, isHour }) => {
        if (!isHour) {
          return (
            <line
              key={i}
              x1={sin * MINOR_INNER}
              y1={cos * MINOR_INNER}
              x2={sin * TICK_OUTER}
              y2={cos * TICK_OUTER}
              stroke="var(--lc-tick)"
              strokeWidth={0.85}
              strokeLinecap="round"
            />
          )
        }
        return (
          <g key={i} filter={`url(#${id}-lift)`}>
            <line
              x1={sin * HOUR_INNER}
              y1={cos * HOUR_INNER}
              x2={sin * TICK_OUTER}
              y2={cos * TICK_OUTER}
              stroke="var(--lc-sleeve)"
              strokeWidth={2.5}
              strokeLinecap="round"
            />
            <line
              x1={sin * (HOUR_INNER + 0.7)}
              y1={cos * (HOUR_INNER + 0.7)}
              x2={sin * (TICK_OUTER - 0.7)}
              y2={cos * (TICK_OUTER - 0.7)}
              stroke="var(--lc-lume)"
              strokeWidth={1.05}
              strokeLinecap="round"
            />
          </g>
        )
      })}

      {Array.from({ length: 12 }, (_, i) => {
        const hour = i === 0 ? 12 : i
        const deg = i * 30
        const rad = (deg * Math.PI) / 180
        // Tangential labels that stay readable: tops point out on the upper
        // half of the dial and in on the lower half.
        const rotation = deg > 90 && deg < 270 ? deg - 180 : deg
        return (
          <text
            key={hour}
            x={Math.sin(rad) * LABEL_RADIUS}
            y={-Math.cos(rad) * LABEL_RADIUS}
            transform={`rotate(${rotation} ${Math.sin(rad) * LABEL_RADIUS} ${-Math.cos(rad) * LABEL_RADIUS})`}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={5.4}
            fill="var(--lc-label)"
            className="font-mono"
          >
            {hour}
          </text>
        )
      })}

      {/* Hour hand */}
      <g ref={hourRef}>
        <g filter={`url(#${id}-hand-shadow)`}>
          <path
            d={`M -1.35 2 L -0.95 ${-HAND_LENGTH + 2.4} Q 0 ${-HAND_LENGTH - 0.6} 0.95 ${-HAND_LENGTH + 2.4} L 1.35 2 Z`}
            fill="var(--lc-hand)"
            stroke="var(--lc-hand-edge)"
            strokeWidth={0.2}
          />
        </g>
        <line
          x1={0}
          y1={-12}
          x2={0}
          y2={-HAND_LENGTH + 6}
          stroke="var(--lc-lume)"
          strokeWidth={1}
          strokeLinecap="round"
        />
      </g>

      {/* Minute hand */}
      <g ref={minuteRef}>
        <g filter={`url(#${id}-hand-shadow)`}>
          <path
            d={`M -0.95 2 L -0.6 ${-MINUTE_LENGTH + 1.6} Q 0 ${-MINUTE_LENGTH - 0.4} 0.6 ${-MINUTE_LENGTH + 1.6} L 0.95 2 Z`}
            fill="var(--lc-hand)"
            stroke="var(--lc-hand-edge)"
            strokeWidth={0.2}
          />
        </g>
        <line
          x1={0}
          y1={-16}
          x2={0}
          y2={-MINUTE_LENGTH + 4}
          stroke="var(--lc-lume)"
          strokeWidth={0.6}
          strokeLinecap="round"
        />
      </g>

      <circle
        r={3.9}
        fill={`url(#${id}-pivot)`}
        filter={`url(#${id}-hand-shadow)`}
      />

      {/* Seconds hand, with a short counterweight tail */}
      <g ref={secondRef}>
        <line
          x1={0}
          y1={9}
          x2={0}
          y2={-SECOND_LENGTH}
          stroke="var(--lc-accent)"
          strokeWidth={0.4}
          strokeLinecap="round"
        />
        <circle r={1.3} fill="var(--lc-accent)" />
      </g>
    </>
  )

  const timeLabel = now
    ? `${pad(hours)}:${pad(minutes)}`
    : undefined

  return (
    <div
      role="img"
      aria-label={timeLabel ? `Clock showing ${timeLabel}` : "Clock"}
      className={cn(
        LIGHT_VARS,
        theme === "dark" ? DARK_VARS : theme === "light" ? "" : AUTO_DARK_VARS,
        "@container relative isolate aspect-square w-72 select-none overflow-hidden rounded-[22%]",
        "bg-[linear-gradient(160deg,var(--lc-card-from),var(--lc-card-to))]",
        "shadow-[inset_0_1px_0_var(--lc-edge),inset_0_0_0_1px_var(--lc-edge)]",
        className
      )}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 size-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`${id}-spoke`} gradientUnits="userSpaceOnUse" cx={0} cy={0} r={TICK_OUTER}>
            <stop offset="0" stopColor="var(--lc-spoke)" stopOpacity={0.16} />
            <stop offset="0.75" stopColor="var(--lc-spoke)" stopOpacity={0.03} />
            <stop offset="1" stopColor="var(--lc-spoke)" stopOpacity={0} />
          </radialGradient>
          <radialGradient id={`${id}-pivot`} cx="0.35" cy="0.3" r="0.8">
            <stop offset="0" stopColor="var(--lc-pivot-from)" />
            <stop offset="1" stopColor="var(--lc-pivot-to)" />
          </radialGradient>
          <filter id={`${id}-hand-shadow`} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx={0.5} dy={1.1} stdDeviation={0.9} floodColor="#000" floodOpacity={0.18} />
          </filter>
          {/* User-space region: straight 12/3/6/9 ticks have a zero-area bounding box */}
          <filter id={`${id}-lift`} filterUnits="userSpaceOnUse" x={-70} y={-70} width={140} height={140}>
            <feDropShadow dx={0.2} dy={0.45} stdDeviation={0.35} floodColor="#000" floodOpacity={0.14} />
          </filter>
          <filter id={`${id}-defocus`} x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation={1.3} />
          </filter>
          {/* Shallow depth of field: sharp in the middle, soft toward the corners */}
          <radialGradient id={`${id}-focus`} gradientUnits="userSpaceOnUse" cx={50} cy={50} r={71}>
            <stop offset="0.55" stopColor="#fff" />
            <stop offset="0.82" stopColor="#000" />
          </radialGradient>
          <radialGradient id={`${id}-blur`} gradientUnits="userSpaceOnUse" cx={50} cy={50} r={71}>
            <stop offset="0.55" stopColor="#000" />
            <stop offset="0.82" stopColor="#fff" stopOpacity={0.75} />
          </radialGradient>
          <mask id={`${id}-focus-mask`} maskUnits="userSpaceOnUse" x={0} y={0} width={100} height={100}>
            <rect width={100} height={100} fill={`url(#${id}-focus)`} />
          </mask>
          <mask id={`${id}-blur-mask`} maskUnits="userSpaceOnUse" x={0} y={0} width={100} height={100}>
            <rect width={100} height={100} fill={`url(#${id}-blur)`} />
          </mask>
        </defs>

        {now && (
          <>
            <g mask={`url(#${id}-focus-mask)`}>
              <g id={`${id}-dial`} ref={dialRef}>
                {dial}
              </g>
            </g>
            <g mask={`url(#${id}-blur-mask)`} filter={`url(#${id}-defocus)`}>
              <use href={`#${id}-dial`} />
            </g>
          </>
        )}
      </svg>

    </div>
  )
}
