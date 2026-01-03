import type React from "react"
import { Sparkles, Layers, Zap, Box } from "lucide-react"

function NoiseOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full opacity-[0.06]" style={{ mixBlendMode: "overlay" }}>
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  )
}

function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)" }}
      />
      <div 
        className="absolute -bottom-60 -left-60 w-[800px] h-[800px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)" }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 50%)" }}
      />
    </div>
  )
}

function GridLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at center, transparent 0%, #09090b 70%)"
      }} />
    </div>
  )
}

function CodePreviewCard({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="w-64 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl overflow-hidden">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="ml-2 text-[10px] text-white/40">component.tsx</span>
        </div>
        <div className="p-3 font-mono text-[10px] leading-relaxed">
          <div className="text-white/30">{"// Premium UI"}</div>
          <div><span className="text-purple-400/70">import</span> <span className="text-white/60">{"{ Button }"}</span></div>
          <div className="text-white/30 mt-2">{"// ..."}</div>
          <div className="mt-2">
            <span className="text-white/40">{"<"}</span>
            <span className="text-blue-400/70">Button</span>
            <span className="text-white/40">{" "}</span>
            <span className="text-green-400/70">variant</span>
            <span className="text-white/40">{"="}</span>
            <span className="text-amber-400/70">{'"shine"'}</span>
            <span className="text-white/40">{">"}</span>
          </div>
          <div className="pl-2 text-white/50">Click me</div>
          <div>
            <span className="text-white/40">{"</"}</span>
            <span className="text-blue-400/70">Button</span>
            <span className="text-white/40">{">"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ComponentPreviewCard({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="w-56 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl overflow-hidden">
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white/40" />
            </div>
            <div>
              <div className="text-xs font-medium text-white/70">Border Beam</div>
              <div className="text-[10px] text-white/40">Animated effect</div>
            </div>
          </div>
          <div className="h-20 rounded-lg border border-white/10 bg-black/30 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[10px] text-white/30">Preview</div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 h-7 rounded-md bg-white/10 flex items-center justify-center text-[10px] text-white/50">Copy</div>
            <div className="flex-1 h-7 rounded-md bg-white flex items-center justify-center text-[10px] text-black/80">Use</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FloatingBadge({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={className}>
      <div className="px-5 py-2.5 rounded-full border-2 border-white/15 bg-white/5 backdrop-blur-sm text-base text-white/60 whitespace-nowrap font-medium">
        {text}
      </div>
    </div>
  )
}

function FloatingIcon({ icon: Icon, className = "" }: { icon: React.ElementType; className?: string }) {
  return (
    <div className={className}>
      <div className="w-16 h-16 rounded-2xl border-2 border-white/15 bg-white/5 backdrop-blur-sm flex items-center justify-center">
        <Icon className="w-7 h-7 text-white/40" />
      </div>
    </div>
  )
}

function ConnectingLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
      <line x1="10%" y1="20%" x2="30%" y2="50%" stroke="white" strokeWidth="1" />
      <line x1="90%" y1="30%" x2="70%" y2="50%" stroke="white" strokeWidth="1" />
      <line x1="15%" y1="70%" x2="35%" y2="55%" stroke="white" strokeWidth="1" />
      <line x1="85%" y1="75%" x2="65%" y2="55%" stroke="white" strokeWidth="1" />
    </svg>
  )
}

export default function PreviewPage(): React.JSX.Element {
  return (
    <div className="relative min-h-screen h-screen flex flex-col bg-[#09090b] text-white overflow-hidden">
      <NoiseOverlay />
      <GridLines />
      <GradientOrbs />
      <ConnectingLines />

      {/* Border Frame */}
      <div className="absolute inset-6 border border-white/10 rounded-3xl pointer-events-none z-20" />

      {/* Heading Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none z-0"
        style={{ 
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="mb-10">
            <span className="inline-flex items-center gap-3 px-6 py-3 text-lg font-medium tracking-wider uppercase text-white/70 border-2 border-white/20 rounded-full bg-white/5 backdrop-blur-sm">
              <span className="w-3 h-3 rounded-full bg-green-500" />
              Now Open Source
            </span>
          </div>

          {/* Heading */}
          <h1 
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] tracking-tight leading-[0.85] mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            <span 
              className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent"
            >
              Premium
            </span>
            <span className="text-white"> UI</span>
            <br />
            <span className="text-white/50">Components</span>
          </h1>

          {/* Divider Line */}
          <div className="flex justify-center mb-6">
            <div className="w-64 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>

          {/* Tagline */}
          <p className="text-2xl md:text-3xl text-white/50 leading-relaxed max-w-4xl mx-auto">
            Handcrafted React components. Beautifully animated.
          </p>
        </div>
      </div>

      {/* Floating Elements - Larger for visibility */}
      <FloatingBadge text="Copy & Paste" className="absolute top-[15%] left-[8%]" />
      <FloatingBadge text="TypeScript" className="absolute bottom-[18%] left-[10%]" />
      <FloatingBadge text="Tailwind CSS" className="absolute top-[12%] right-[10%]" />
      <FloatingBadge text="Framer Motion" className="absolute bottom-[15%] right-[8%]" />

      {/* Corner Icons */}
      <FloatingIcon icon={Layers} className="absolute bottom-[30%] left-[4%]" />
      <FloatingIcon icon={Zap} className="absolute bottom-[32%] right-[4%]" />
      <FloatingIcon icon={Sparkles} className="absolute top-[28%] left-[5%]" />
      <FloatingIcon icon={Box} className="absolute top-[25%] right-[5%]" />
    </div>
  )
}
