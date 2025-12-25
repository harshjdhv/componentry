import type React from "react"
import { FlightStatusCardAdaptive } from "@workspace/ui/components/flight-status-card"
import { InstallCommand } from "@/components/install-command"
import { CodeBlock } from "@/components/code-block"
import { ComponentLayout, Section } from "@/components/component-layout"

const usageCode = `import { FlightStatusCardAdaptive } from "components/ui/flight-status-card"

// Auto-switches between dark and light mode
<FlightStatusCardAdaptive />

// With custom props
<FlightStatusCardAdaptive
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
/>`

export default function FlightStatusCardPage(): React.JSX.Element {
  return (
    <ComponentLayout
      title="Flight Status Card"
      description="A detailed flight status widget with dot-matrix airport codes, progress tracking, and ETA information. Pixel-perfect recreation of a premium travel app design."
      componentId="002"
    >
      <Section title="Preview">
        <div className="p-8 bg-muted/30 rounded-xl flex items-center justify-center">
          <FlightStatusCardAdaptive />
        </div>
        <p className="text-xs text-muted-foreground">
          Automatically adapts to light and dark mode. Toggle the theme to see it in action.
        </p>
      </Section>

      <Section title="Custom">
        <div className="p-8 bg-muted/30 rounded-xl flex items-center justify-center">
          <FlightStatusCardAdaptive
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
      </Section>

      <Section title="Install">
        <div className="space-y-3">
          <InstallCommand component="flight-status-card" />
          <p className="text-xs text-muted-foreground">
            Requires shadcn CLI. Run <code className="bg-muted px-1 rounded">npx shadcn@latest init</code> first if not set up.
          </p>
        </div>
      </Section>

      <Section title="Code">
        <CodeBlock code={usageCode} lang="tsx" />
        <p className="text-xs text-muted-foreground">
          Import and use directly. All props are optional with sensible
          defaults.
        </p>
      </Section>

      <Section title="Features">
        <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-medium text-sm">Dot Matrix Display</div>
            <div className="text-sm text-muted-foreground">
              LED-style airport code rendering with individual dot animations
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-medium text-sm">Halftone Pattern</div>
            <div className="text-sm text-muted-foreground">
              Subtle gradient dot pattern for visual depth
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-medium text-sm">Progress Tracking</div>
            <div className="text-sm text-muted-foreground">
              Animated progress bar with glowing plane icon
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-medium text-sm">ETA Panel</div>
            <div className="text-sm text-muted-foreground">
              Real-time arrival estimates with timezone and event countdown
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-medium text-sm">Theme Support</div>
            <div className="text-sm text-muted-foreground">
              Separate dark and light mode variants with adaptive option
            </div>
          </div>
        </div>
      </Section>
    </ComponentLayout>
  )
}
