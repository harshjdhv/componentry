"use client";

import { BorderBeam } from "@workspace/ui/components/border-beam";

export function BorderBeamDemo() {
  return (
    <>
      <div className="flex min-h-[350px] w-full items-center justify-center bg-background">
        <div className="z-10 text-center">
          <h3 className="text-2xl font-bold tracking-tight">Border Beam</h3>
          <p className="text-muted-foreground">
            The beam follows the border path
          </p>
        </div>
      </div>
      <BorderBeam />
    </>
  );
}

export function BorderBeamCustomDemo() {
  return (
    <>
      <div className="flex min-h-[300px] w-full items-center justify-center bg-background">
        <div className="z-10 text-center">
          <h3 className="text-2xl font-bold tracking-tight">Customized</h3>
          <p className="text-muted-foreground">Slower, larger, custom colors</p>
        </div>
      </div>
      <BorderBeam
        size={500}
        duration={20}
        borderWidth={2}
        colorFrom="#10b981"
        colorTo="#3b82f6"
      />
    </>
  );
}

export function BorderBeamFastDemo() {
  return (
    <>
      <div className="flex min-h-[300px] w-full items-center justify-center bg-background">
        <div className="z-10 text-center">
          <h3 className="text-2xl font-bold tracking-tight">Fast Beam</h3>
          <p className="text-muted-foreground">
            Quick animation with warm colors
          </p>
        </div>
      </div>
      <BorderBeam
        size={150}
        duration={5}
        colorFrom="#f97316"
        colorTo="#eab308"
      />
    </>
  );
}

export function BorderBeamDelayedDemo() {
  return (
    <>
      <div className="flex min-h-[300px] w-full items-center justify-center bg-background">
        <div className="z-10 text-center">
          <h3 className="text-2xl font-bold tracking-tight">Delayed Start</h3>
          <p className="text-muted-foreground">
            Beam starts after a 3 second delay
          </p>
        </div>
      </div>
      <BorderBeam
        size={250}
        duration={12}
        delay={3}
        colorFrom="#ec4899"
        colorTo="#8b5cf6"
      />
    </>
  );
}
