import type React from "react"
import { Logomark } from "./logomark"

export function LogoFull({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div className={`flex items-center gap-2 ${className}`} {...props}>
      <Logomark className="h-6 w-6" />
      <span className="font-bold text-lg tracking-tight">Componentry</span>
    </div>
  )
}
