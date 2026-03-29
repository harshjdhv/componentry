"use client"

import { ScratchCard } from "@workspace/ui/components/scratch-card"

export function ScratchCardDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-20">
      <ScratchCard width={360} height={200} overlay="silver" borderRadius={16}>
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-600 to-indigo-600 p-6">
          <div className="text-center">
            <p className="text-sm font-medium text-white/70">You won</p>
            <p className="text-4xl font-bold text-white">$50 OFF</p>
            <p className="mt-1 text-xs text-white/60">Use code: SCRATCH50</p>
          </div>
        </div>
      </ScratchCard>
    </div>
  )
}

export function ScratchCardGoldDemo() {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center p-20">
      <ScratchCard width={360} height={200} overlay="gold" borderRadius={16}>
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-500 to-orange-600 p-6">
          <div className="text-center">
            <p className="text-sm font-medium text-white/70">Grand Prize</p>
            <p className="text-4xl font-bold text-white">FREE GIFT</p>
            <p className="mt-1 text-xs text-white/60">Claim within 24 hours</p>
          </div>
        </div>
      </ScratchCard>
    </div>
  )
}

export function ScratchCardHolographicDemo() {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center p-20">
      <ScratchCard width={360} height={200} overlay="holographic" borderRadius={20}>
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-fuchsia-500 via-purple-600 to-cyan-500 p-6">
          <div className="text-center">
            <p className="text-sm font-medium text-white/70">Mystery Reward</p>
            <p className="text-3xl font-bold text-white">VIP ACCESS</p>
            <p className="mt-1 text-xs text-white/60">Exclusive member perks</p>
          </div>
        </div>
      </ScratchCard>
    </div>
  )
}

export function ScratchCardDarkDemo() {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center p-20">
      <ScratchCard width={360} height={200} overlay="dark" borderRadius={12}>
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-400 to-teal-600 p-6">
          <div className="text-center">
            <p className="text-sm font-medium text-white/70">Congratulations</p>
            <p className="text-4xl font-bold text-white">20% OFF</p>
            <p className="mt-1 text-xs text-white/60">Your next purchase</p>
          </div>
        </div>
      </ScratchCard>
    </div>
  )
}
