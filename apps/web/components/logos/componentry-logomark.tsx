import type React from "react"

export function ComponentryLogomark({ className, style, ...props }: React.HTMLAttributes<HTMLSpanElement>): React.JSX.Element {
    return (
        <span
            aria-hidden="true"
            className={className}
            style={{
                display: "inline-block",
                flexShrink: 0,
                backgroundColor: "currentColor",
                mask: 'url("/logo-new.svg") center / contain no-repeat',
                WebkitMask: 'url("/logo-new.svg") center / contain no-repeat',
                ...style,
            }}
            {...props}
        />
    )
}
