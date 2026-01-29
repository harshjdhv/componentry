"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Check, Command, Github, Loader2, Sparkles } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { SpotlightCard } from "@workspace/ui/components/spotlight-card"
import { InteractiveHoverButton } from "@workspace/ui/components/interactive-hover-button"
import { Logomark } from "@/components/logos/logomark"
import { HeroButtons } from "@/components/landing/hero-buttons"

// --- Components ---

function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 px-6 py-6 flex items-center justify-between pointer-events-none">
      <Link href="/" className="pointer-events-auto flex items-center gap-2 group">
        <Logomark className="w-6 h-6 text-foreground opacity-90 transition-opacity group-hover:opacity-100" />
        <span className="font-medium tracking-tight text-sm text-foreground/90">Componentry</span>
      </Link>
      <div className="pointer-events-auto flex items-center gap-6 text-sm font-medium text-muted-foreground/80">
        <Link href="/docs" className="hover:text-foreground transition-colors">Documentation</Link>
        <a href="https://github.com/harshjdhv/componentry" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 relative z-10 pt-20">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm text-xs font-medium text-muted-foreground mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
            v1.0.0 Stable
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-foreground mb-6">
            Interface primitives for <br />
            <span className="text-muted-foreground">serious products.</span>
          </h1>
          <p className="text-lg text-muted-foreground/80 leading-relaxed max-w-lg mx-auto font-light">
            A collection of robust, accessible components designed for density and precision.
            Built to be used, not just viewed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroButtons />
        </motion.div>
      </div>
    </section>
  )
}

// --- Interaction Showcase ---

function ShowcaseSection() {
  return (
    <section className="px-6 pb-32 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* Left Column: Description */}
        <div className="md:sticky md:top-32 space-y-6 pt-12">
          <h2 className="text-2xl font-serif">Engineered interactions.</h2>
          <p className="text-muted-foreground leading-relaxed">
            We prioritize feel over flash. Every interaction is tuned for weight, response time, and accessibility.
            Try the components on the right—they are real, functional, and production-ready.
          </p>

          <div className="flex flex-col gap-4 py-8">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-primary" />
              <span>Keyboard accessible</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-primary" />
              <span>Type-safe API</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-primary" />
              <span>Dark mode included</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Components */}
        <div className="space-y-8">

          {/* Item 1: The Input */}
          <div className="p-8 border border-border/40 rounded-xl bg-card/30 backdrop-blur-sm">
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-1">Input Fields</h3>
              <p className="text-xs text-muted-foreground">Focus states with ring offsets.</p>
            </div>
            <div className="space-y-4 max-w-sm">
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="user@example.com"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="password" className="text-sm font-medium leading-none">Password</label>
                <input
                  type="password"
                  id="password"
                  value="securepassword"
                  readOnly
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Item 2: The Buttons */}
          <div className="p-8 border border-border/40 rounded-xl bg-card/30 backdrop-blur-sm">
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-1">Buttons</h3>
              <p className="text-xs text-muted-foreground">Weighted presses and loading states.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button>Primary Action</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost" size="icon">
                <Sparkles className="w-4 h-4" />
              </Button>
              <Button disabled>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving
              </Button>
            </div>
            <div className="mt-8 pt-8 border-t border-border/30">
              <p className="text-xs text-muted-foreground mb-4">Specialized Interactions</p>
              <div className="flex items-center gap-4">
                <InteractiveHoverButton />
              </div>
            </div>
          </div>

          {/* Item 3: Spotlight Card */}
          <SpotlightCard className="p-8">
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-lg bg-foreground/5 border border-foreground/10 flex items-center justify-center mb-4">
                <Command className="w-5 h-5 text-foreground/70" />
              </div>
              <h3 className="text-lg font-medium mb-2">Spotlight Effect</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A subtle radial gradient that follows the cursor.
                Useful for highlighting active cards in a grid without overwhelming the user.
                <br /><br />
                It feels natural, almost like a flashlight in a dark room.
              </p>
            </div>
          </SpotlightCard>

        </div>
      </div>
    </section>
  )
}





// --- Closing Section ---

function ClosingSection() {
  return (
    <section className="px-6 py-32 flex flex-col items-center justify-center text-center">
      <div className="max-w-xl mx-auto space-y-8">
        <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-foreground">
          Ready to build?
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg font-light">
          Componentry is open source and free to use. <br />
          Copy the code, customize it, and make it yours.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/docs"
            className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-full bg-zinc-900 px-8 font-medium text-zinc-50 transition-all duration-300 hover:bg-zinc-900/90 hover:ring-2 hover:ring-zinc-900/20 hover:ring-offset-2 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:hover:ring-zinc-50/20"
          >
            <span className="mr-2">Read the Docs</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <a
            href="https://github.com/harshjdhv/componentry"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="px-6 py-12 border-t border-border/40">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Logomark className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-medium">Componentry</span>
        </div>

        <p className="text-sm text-muted-foreground/60 text-center md:text-right">
          Built by <a href="https://twitter.com/harshjdhv" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors underline decoration-border/50 underline-offset-4 hover:decoration-foreground">Harsh Jadhav</a>.
          Source code is available on <a href="https://github.com/harshjdhv/componentry" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors underline decoration-border/50 underline-offset-4 hover:decoration-foreground">GitHub</a>.
        </p>
      </div>
    </footer>
  )
}

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-foreground/10">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none mix-blend-overlay fixed" />
      <div className="relative">
        <Header />
        <Hero />
        <ShowcaseSection />
        <ClosingSection />
        <Footer />
      </div>
    </div>
  )
}
