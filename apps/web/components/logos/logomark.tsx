import type React from "react"

export function Logomark({ className, ...props }: React.SVGProps<SVGSVGElement>): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="m3 3 6 6" />
      <path d="m21 3-6 6" />
      <path d="m21 21-6-6" />
      <path d="m3 21 6-6" />
    </svg>
  )
}
