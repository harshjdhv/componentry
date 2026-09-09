"use client"

import * as React from "react"
import {
  PackageManagerCommand,
  type PackageManager,
} from "@/components/package-manager-command"

import { getInstallCommand } from "@/lib/install-command"

interface InstallCommandProps {
  component: string
}

export function InstallCommand({ component }: InstallCommandProps) {
  const getCommand = React.useCallback(
    (pm: PackageManager) => getInstallCommand(component, pm),
    [component]
  )

  return <PackageManagerCommand getCommand={getCommand} />
}
