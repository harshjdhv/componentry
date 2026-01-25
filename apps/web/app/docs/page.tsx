"use client"

import type React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Terminal, Copy, Palette } from "lucide-react"

export default function DocsIntroPage(): React.JSX.Element {
  return (
    <div className="space-y-16 pt-4">
      {/* Hero */}
      <header className="space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Components that feel
          <br />
          <span className="text-muted-foreground/60">like they belong</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-muted-foreground text-lg leading-relaxed max-w-xl"
        >
          Handcrafted React components built with Tailwind CSS and Framer Motion.
          No npm install — just copy the code and make it yours.
        </motion.p>
      </header>

      {/* Getting Started Flow */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                01
              </span>
            </div>
            <h3 className="font-medium">Run the CLI</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Use the install command to add dependencies automatically.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Copy className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                02
              </span>
            </div>
            <h3 className="font-medium">Copy the snippet</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Grab the component code with one click.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Palette className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                03
              </span>
            </div>
            <h3 className="font-medium">Make it yours</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Customize colors, sizes, and animations to match your brand.
            </p>
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          href="/docs/components/hyper-text"
          className="group inline-flex items-center gap-2 text-sm font-medium"
        >
          Start with your first component
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </motion.div>
    </div>
  )
}
