import type React from "react"
import {
  FlightStatusCard,
  FlightStatusCardLight,
  FlightStatusCardAdaptive,
} from "@workspace/ui/components/flight-status-card"

export default function FlightStatusCardPage(): React.JSX.Element {
  return (
    <div className="space-y-16">
      <header className="grid md:grid-cols-[120px_1fr] gap-8">
        <div>
          <span className="text-6xl font-light text-muted-foreground/50">
            002
          </span>
        </div>
        <div className="space-y-4">
          <h1
            className="text-5xl md:text-6xl tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Flight Status Card
          </h1>
          <p className="text-muted-foreground max-w-md">
            A detailed flight status widget with dot-matrix airport codes,
            progress tracking, and ETA information. Pixel-perfect recreation of
            a premium travel app design.
          </p>
        </div>
      </header>

      <div className="grid md:grid-cols-[120px_1fr] gap-8">
        <div className="text-xs uppercase tracking-widest text-muted-foreground pt-1">
          Dark Mode
        </div>
        <div className="space-y-6">
          <div className="p-8 bg-neutral-900 rounded-xl flex items-center justify-center">
            <FlightStatusCard />
          </div>
          <p className="text-xs text-muted-foreground">
            The default dark theme with glowing green LED-style display and
            halftone background pattern.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-[120px_1fr] gap-8">
        <div className="text-xs uppercase tracking-widest text-muted-foreground pt-1">
          Light Mode
        </div>
        <div className="space-y-6">
          <div className="p-8 bg-neutral-100 rounded-xl flex items-center justify-center">
            <FlightStatusCardLight />
          </div>
          <p className="text-xs text-muted-foreground">
            Light theme variant with softer green tones suitable for daytime
            viewing.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-[120px_1fr] gap-8">
        <div className="text-xs uppercase tracking-widest text-muted-foreground pt-1">
          Adaptive
        </div>
        <div className="space-y-6">
          <div className="p-8 bg-muted/30 rounded-xl flex items-center justify-center">
            <FlightStatusCardAdaptive />
          </div>
          <p className="text-xs text-muted-foreground">
            Automatically switches between dark and light based on system theme.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-[120px_1fr] gap-8">
        <div className="text-xs uppercase tracking-widest text-muted-foreground pt-1">
          Custom
        </div>
        <div className="space-y-6">
          <div className="p-8 bg-neutral-900 rounded-xl flex items-center justify-center">
            <FlightStatusCard
              departureCode="SFO"
              arrivalCode="LHR"
              departureCity="San Francisco"
              arrivalCity="London"
              departureTime="FRI, 10:30 AM"
              arrivalTime="SAT, 6:45 AM"
              eta="ETA 6:45 AM"
              timezone="London Time"
              nextEvent="LANDING IN"
              nextEventTime="4:15H"
              progress={65}
              remainingTime="-4H 15M"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Fully customizable with any route, times, and progress state.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-[120px_1fr] gap-8">
        <div className="text-xs uppercase tracking-widest text-muted-foreground pt-1">
          Features
        </div>
        <div className="space-y-4">
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>
              <strong className="text-foreground">Dot Matrix Display:</strong>{" "}
              LED-style airport code rendering with individual dot animations
            </li>
            <li>
              <strong className="text-foreground">Halftone Pattern:</strong>{" "}
              Subtle gradient dot pattern for visual depth
            </li>
            <li>
              <strong className="text-foreground">Progress Tracking:</strong>{" "}
              Animated progress bar with glowing plane icon
            </li>
            <li>
              <strong className="text-foreground">ETA Panel:</strong> Real-time
              arrival estimates with timezone and event countdown
            </li>
            <li>
              <strong className="text-foreground">Theme Support:</strong>{" "}
              Separate dark and light mode variants with adaptive option
            </li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-[120px_1fr] gap-8">
        <div className="text-xs uppercase tracking-widest text-muted-foreground pt-1">
          Code
        </div>
        <div className="space-y-4">
          <pre className="p-6 bg-muted/30 text-sm overflow-x-auto font-mono">
            {`import { 
  FlightStatusCard,
  FlightStatusCardLight,
  FlightStatusCardAdaptive 
} from "@workspace/ui/components/flight-status-card"

// Dark mode (default)
<FlightStatusCard />

// Light mode
<FlightStatusCardLight />

// Auto-switching based on theme
<FlightStatusCardAdaptive />

// With custom props
<FlightStatusCard
  departureCode="SFO"
  arrivalCode="LHR"
  departureCity="San Francisco"
  arrivalCity="London"
  departureTime="FRI, 10:30 AM"
  arrivalTime="SAT, 6:45 AM"
  eta="ETA 6:45 AM"
  timezone="London Time"
  nextEvent="LANDING IN"
  nextEventTime="4:15H"
  progress={65}
  remainingTime="-4H 15M"
/>`}
          </pre>
          <p className="text-xs text-muted-foreground">
            Import and use directly. All props are optional with sensible
            defaults.
          </p>
        </div>
      </div>
    </div>
  )
}
