"use client"

import type React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Box, Component, Zap, Layout, ArrowUpRight } from "lucide-react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

function BentoCard({ 
  children, 
  className = "", 
  href 
}: { 
  children: React.ReactNode
  className?: string
  href: string 
}) {
  return (
    <Link href={href} className={`block group relative overflow-hidden rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors ${className}`}>
      <div className="h-full w-full p-6">
        {children}
      </div>
      <div className="absolute top-4 right-4 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </Link>
  )
}

export default function DocsIntroPage(): React.JSX.Element {
  return (
    <div className="space-y-16">
      {/* Manifesto Section */}
      <div className="space-y-8">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Manifesto
        </p>
        <h1
          className="text-5xl md:text-6xl leading-[1.1] tracking-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          A sketchbook,
          <br />
          not a system.
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-md">
          This is a personal workshop for building UI components in public.
          Ideas are rough. Experiments are welcome. Nothing here is meant to be
          complete.
        </p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px]"
      >
        {/* Main Feature Card - Flight Status */}
        <motion.div variants={item} className="md:col-span-2 md:row-span-2">
          <BentoCard href="/docs/components/flight-status-card" className="h-full bg-gradient-to-br from-primary/5 via-card to-card">
            <div className="flex flex-col h-full justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Layout className="h-5 w-5" />
                  <span className="font-medium">Featured Component</span>
                </div>
                <h3 className="text-2xl font-semibold">Flight Status Card</h3>
                <p className="text-muted-foreground max-w-sm">
                  A complex, real-world data visualization component with dot-matrix typography and smooth animations.
                </p>
              </div>
              <div className="mt-4 relative h-32 w-full overflow-hidden rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm p-4">
                 {/* Abstract visual representation */}
                 <div className="flex items-center justify-between border-b border-border/40 pb-2 mb-2">
                    <div className="h-2 w-12 bg-primary/20 rounded"/>
                    <div className="h-2 w-8 bg-green-500/20 rounded"/>
                 </div>
                 <div className="space-y-2">
                    <div className="h-2 w-full bg-muted/40 rounded"/>
                    <div className="h-2 w-2/3 bg-muted/30 rounded"/>
                 </div>
              </div>
            </div>
          </BentoCard>
        </motion.div>

        {/* Button Card */}
        <motion.div variants={item} className="md:col-span-1 md:row-span-1">
          <BentoCard href="/docs/components/button" className="h-full">
            <div className="flex flex-col h-full justify-between">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Box className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Buttons</h3>
                <p className="text-sm text-muted-foreground">Interactive variants</p>
              </div>
            </div>
          </BentoCard>
        </motion.div>

        {/* Spotlight Card */}
        <motion.div variants={item} className="md:col-span-1 md:row-span-1">
           <BentoCard href="/docs/components/spotlight-card" className="h-full group">
            <div className="flex flex-col h-full justify-between">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                <Zap className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Spotlight</h3>
                <p className="text-sm text-muted-foreground">Cursor tracking effects</p>
              </div>
            </div>
          </BentoCard>
        </motion.div>

         {/* Shimmer Button Card */}
         <motion.div variants={item} className="md:col-span-1 md:row-span-1">
           <BentoCard href="/docs/components/shimmer-button" className="h-full">
            <div className="flex flex-col h-full justify-between">
              <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                <Component className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Shimmer</h3>
                <p className="text-sm text-muted-foreground">Loading & highlight states</p>
              </div>
            </div>
          </BentoCard>
        </motion.div>

        {/* Coming Soon / More */}
        <motion.div variants={item} className="md:col-span-2 md:row-span-1">
          <div className="h-full rounded-xl border border-dashed border-border bg-card/50 p-6 flex items-center justify-center gap-4 text-muted-foreground">
             <span className="text-sm">More components in the works...</span>
             <Link href="https://github.com/harshjdhv/componentry/issues" className="text-xs border px-3 py-1 rounded-full hover:bg-accent transition-colors">
               Request a component
             </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
