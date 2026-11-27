"use client"

import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import type * as React from "react"
import { cn } from "@workspace/ui/lib/utils"

/**
 * Dropdown menu on Base UI: keyboard navigation, typeahead, focus return and
 * outside-click handling come from the primitive. The popup scales in from the
 * trigger (Base UI sets --transform-origin) and exits faster than it enters.
 */
export const Menu = MenuPrimitive.Root
export const MenuTrigger = MenuPrimitive.Trigger

export function MenuPopup({
  className,
  children,
  align = "end",
  sideOffset = 6,
  ...props
}: MenuPrimitive.Popup.Props & {
  align?: MenuPrimitive.Positioner.Props["align"]
  sideOffset?: number
}): React.ReactElement {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner align={align} sideOffset={sideOffset} className="z-50 outline-none">
        <MenuPrimitive.Popup
          className={cn(
            "min-w-52 origin-(--transform-origin) rounded-lg border border-black/[0.07] bg-white p-1 shadow-[0_8px_24px_rgb(0_0_0/0.08)] outline-none dark:border-white/[0.07] dark:bg-[#18181a] dark:shadow-[0_8px_24px_rgb(0_0_0/0.4)]",
            "transition-[scale,opacity] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] data-ending-style:duration-100 data-ending-style:scale-[0.97] data-ending-style:opacity-0 data-starting-style:scale-[0.97] data-starting-style:opacity-0 motion-reduce:transition-opacity",
            className
          )}
          {...props}
        >
          {children}
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

/** Same type size as the segmented controls (text-base, sm:text-sm), with icons at 80%. */
const itemClassName =
  "flex w-full cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-base font-medium text-foreground/80 outline-none select-none data-highlighted:bg-muted data-highlighted:text-foreground sm:text-sm [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:opacity-80"

export function MenuItem({ className, ...props }: MenuPrimitive.Item.Props): React.ReactElement {
  return <MenuPrimitive.Item className={cn(itemClassName, className)} {...props} />
}

export function MenuLinkItem({ className, ...props }: MenuPrimitive.LinkItem.Props): React.ReactElement {
  return <MenuPrimitive.LinkItem className={cn(itemClassName, className)} {...props} />
}

export function MenuSeparator({ className, ...props }: MenuPrimitive.Separator.Props): React.ReactElement {
  return (
    <MenuPrimitive.Separator
      className={cn("mx-1.5 my-1 h-px bg-black/[0.06] dark:bg-white/[0.06]", className)}
      {...props}
    />
  )
}

export const MenuGroup = MenuPrimitive.Group

export function MenuGroupLabel({ className, ...props }: MenuPrimitive.GroupLabel.Props): React.ReactElement {
  return (
    <MenuPrimitive.GroupLabel
      className={cn("px-2 pt-1.5 pb-1 text-xs font-medium text-muted-foreground", className)}
      {...props}
    />
  )
}
