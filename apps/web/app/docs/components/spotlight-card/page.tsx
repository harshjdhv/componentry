import type React from "react"
import {
  SpotlightCard,
  SpotlightCardContent,
  SpotlightCardHeader,
  SpotlightCardTitle,
  SpotlightCardDescription,
  MultiSpotlightCard,
  BeamSpotlightCard,
  GradientFollowCard,
  TiltSpotlightCard,
} from "@workspace/ui/components/spotlight-card"
import { InstallCommand } from "@/components/install-command"
import { CodeBlock } from "@/components/code-block"
import { ComponentLayout, Section } from "@/components/component-layout"

const usageCode = `import {
  SpotlightCard,
  SpotlightCardContent,
  SpotlightCardHeader,
  SpotlightCardTitle,
  SpotlightCardDescription,
} from "components/ui/spotlight-card"

<SpotlightCard className="w-96">
  <SpotlightCardHeader>
    <SpotlightCardTitle>Spotlight Card</SpotlightCardTitle>
    <SpotlightCardDescription>
      Hover over this card to see the spotlight effect
    </SpotlightCardDescription>
  </SpotlightCardHeader>
  <SpotlightCardContent>
    Your content here
  </SpotlightCardContent>
</SpotlightCard>`

const multiSpotlightCode = `<MultiSpotlightCard className="w-full max-w-lg mx-auto p-6 h-64">
  <h4 className="text-white font-medium mb-2">Multi Spotlight</h4>
  <p className="text-neutral-400 text-sm">
    Multiple colored spotlight sources follow your cursor
  </p>
</MultiSpotlightCard>`

const beamSpotlightCode = `<BeamSpotlightCard className="w-full max-w-lg mx-auto p-6 h-64">
  <h4 className="text-white font-medium mb-2">Beam Spotlight</h4>
  <p className="text-neutral-400 text-sm">
    Crossing light beams create a dramatic effect
  </p>
</BeamSpotlightCard>`

const gradientFollowCode = `<GradientFollowCard className="w-full max-w-lg mx-auto p-6 h-64">
  <h4 className="text-white font-medium mb-2">Gradient Follow</h4>
  <p className="text-neutral-400 text-sm">
    Dynamic gradient background follows cursor position
  </p>
</GradientFollowCard>`

const tiltSpotlightCode = `<TiltSpotlightCard className="w-full max-w-lg mx-auto p-6 h-64">
  <h4 className="text-white font-medium mb-2">3D Tilt</h4>
  <p className="text-neutral-400 text-sm">
    Perspective tilt with glare effect for depth
  </p>
</TiltSpotlightCard>`

export default function SpotlightCardPage(): React.JSX.Element {
  return (
    <ComponentLayout
      title="Spotlight Card"
      description="Interactive cards with cursor-following spotlight effects, animated gradient borders, and 3D tilt animations. Inspired by the premium designs of Vercel, Linear, and Stripe."
      componentId="003"
    >
      <Section title="Preview">
        <div className="space-y-6">
          <div className="p-8 bg-muted/30 rounded-xl flex items-center justify-center">
            <SpotlightCard className="w-96">
              <SpotlightCardHeader>
                <SpotlightCardTitle>Spotlight Effect</SpotlightCardTitle>
                <SpotlightCardDescription>
                  Hover over this card to see the spotlight follow your cursor
                </SpotlightCardDescription>
              </SpotlightCardHeader>
              <SpotlightCardContent>
                <p className="text-neutral-300 text-sm">
                  This card features an animated gradient border and a soft
                  spotlight glow that tracks your mouse movement for an
                  interactive experience.
                </p>
              </SpotlightCardContent>
            </SpotlightCard>
          </div>
          <p className="text-xs text-muted-foreground">
            Move your cursor over the card to see the spotlight effect in
            action.
          </p>
        </div>
      </Section>

      <Section title="Custom">
        <div className="space-y-6">
          <div className="p-8 bg-muted/30 rounded-xl flex items-center justify-center">
            <SpotlightCard
              className="w-96"
              spotlightColor="rgba(255, 100, 100, 0.4)"
              glowIntensity={0.2}
              borderRadius={24}
            >
              <SpotlightCardHeader>
                <SpotlightCardTitle>Custom Colors</SpotlightCardTitle>
                <SpotlightCardDescription>
                  Fully customizable spotlight color and intensity
                </SpotlightCardDescription>
              </SpotlightCardHeader>
              <SpotlightCardContent>
                <p className="text-neutral-300 text-sm">
                  Customize the spotlight color, glow intensity, border radius,
                  and more to match your design system.
                </p>
              </SpotlightCardContent>
            </SpotlightCard>
          </div>
          <p className="text-xs text-muted-foreground">
            All props are customizable to match your brand colors.
          </p>
        </div>
      </Section>

      <Section title="Install">
        <div className="space-y-3">
          <InstallCommand component="spotlight-card" />
          <p className="text-xs text-muted-foreground">
            Requires shadcn CLI. Run{" "}
            <code className="bg-muted px-1 rounded">npx shadcn@latest init</code>{" "}
            first if not set up.
          </p>
        </div>
      </Section>

      <Section title="Code">
        <div className="space-y-4">
          <CodeBlock code={usageCode} lang="tsx" />
          <p className="text-xs text-muted-foreground">
            Basic usage with the structured card components.
          </p>
        </div>
      </Section>

      <Section title="Examples">
        <div className="space-y-12">
          
          <div className="space-y-0">
            <h3 className="text-xl font-medium mb-4">Multi Spotlight</h3>
            <div className="p-8 bg-muted/30 rounded-t-xl rounded-b-none border-b border-border flex items-center justify-center">
              <MultiSpotlightCard className="w-full max-w-lg mx-auto p-6 h-64">
                <h4 className="text-white font-medium mb-2">Multi Spotlight</h4>
                <p className="text-neutral-400 text-sm">
                  Multiple colored spotlight sources follow your cursor
                </p>
              </MultiSpotlightCard>
            </div>
            <CodeBlock code={multiSpotlightCode} lang="tsx" className="rounded-t-none" />
          </div>

          <div className="space-y-0">
            <h3 className="text-xl font-medium mb-4">Beam Spotlight</h3>
            <div className="p-8 bg-muted/30 rounded-t-xl rounded-b-none border-b border-border flex items-center justify-center">
              <BeamSpotlightCard className="w-full max-w-lg mx-auto p-6 h-64">
                <h4 className="text-white font-medium mb-2">Beam Spotlight</h4>
                <p className="text-neutral-400 text-sm">
                  Crossing light beams create a dramatic effect
                </p>
              </BeamSpotlightCard>
            </div>
            <CodeBlock code={beamSpotlightCode} lang="tsx" className="rounded-t-none" />
          </div>

          <div className="space-y-0">
            <h3 className="text-xl font-medium mb-4">Gradient Follow</h3>
            <div className="p-8 bg-muted/30 rounded-t-xl rounded-b-none border-b border-border flex items-center justify-center">
              <GradientFollowCard className="w-full max-w-lg mx-auto p-6 h-64">
                <h4 className="text-white font-medium mb-2">Gradient Follow</h4>
                <p className="text-neutral-400 text-sm">
                  Dynamic gradient background follows cursor position
                </p>
              </GradientFollowCard>
            </div>
            <CodeBlock code={gradientFollowCode} lang="tsx" className="rounded-t-none" />
          </div>

          <div className="space-y-0">
            <h3 className="text-xl font-medium mb-4">3D Tilt</h3>
            <div className="p-8 bg-muted/30 rounded-t-xl rounded-b-none border-b border-border flex items-center justify-center">
              <TiltSpotlightCard className="w-full max-w-lg mx-auto p-6 h-64">
                <h4 className="text-white font-medium mb-2">3D Tilt</h4>
                <p className="text-neutral-400 text-sm">
                  Perspective tilt with glare effect for depth
                </p>
              </TiltSpotlightCard>
            </div>
            <CodeBlock code={tiltSpotlightCode} lang="tsx" className="rounded-t-none" />
          </div>

        </div>
      </Section>

      <Section title="Features">
        <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-medium text-sm">Cursor Tracking</div>
            <div className="text-sm text-muted-foreground">
              Spotlight effect smoothly follows mouse position across the card
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-medium text-sm">Animated Border</div>
            <div className="text-sm text-muted-foreground">
              Rotating gradient border creates a subtle animated glow
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-medium text-sm">3D Tilt Effect</div>
            <div className="text-sm text-muted-foreground">
              Perspective-based tilt with glare for realistic depth
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-medium text-sm">Multiple Variants</div>
            <div className="text-sm text-muted-foreground">
              Choose from spotlight, multi-spotlight, beam, gradient, or tilt
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-medium text-sm">Customizable</div>
            <div className="text-sm text-muted-foreground">
              Fully configurable colors, intensity, radius, and animation
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-medium text-sm">Performance</div>
            <div className="text-sm text-muted-foreground">
              GPU-accelerated animations with smooth 60fps transitions
            </div>
          </div>
        </div>
      </Section>

      <Section title="Props">
        <div className="grid grid-cols-1 divide-y border rounded-xl bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-mono text-sm">spotlightColor</div>
            <div className="text-sm text-muted-foreground">
              Color of the spotlight effect (default: rgba(120, 119, 198,
              0.3))
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-mono text-sm">glowIntensity</div>
            <div className="text-sm text-muted-foreground">
              Intensity of the glow effect 0-1 (default: 0.15)
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-mono text-sm">borderRadius</div>
            <div className="text-sm text-muted-foreground">
              Border radius in pixels (default: 16)
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 p-4">
            <div className="font-mono text-sm">maxTilt</div>
            <div className="text-sm text-muted-foreground">
              Maximum tilt angle in degrees for TiltSpotlightCard (default:
              10)
            </div>
          </div>
        </div>
      </Section>
    </ComponentLayout>
  )
}
