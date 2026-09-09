export const PACKAGE_MANAGERS = ["bun", "npm", "pnpm", "yarn"] as const
export type PackageManager = (typeof PACKAGE_MANAGERS)[number]

export const INSTALL_COMMANDS: Record<PackageManager, string> = {
  pnpm: "pnpm dlx shadcn@latest add",
  npm: "npx shadcn@latest add",
  yarn: "yarn dlx shadcn@latest add",
  bun: "bunx --bun shadcn@latest add",
}

export const registryNamespace =
  process.env.NEXT_PUBLIC_REGISTRY_NAMESPACE || "@componentry"
export const registryUrl = "https://componentry.dev/r/{name}.json"

export function getInstallCommand(
  component: string,
  pm: PackageManager = "npm",
  namespace = registryNamespace,
): string {
  const reference =
    component.startsWith("@") || /^https?:\/\//.test(component)
      ? component
      : `${namespace}/${component}`
  return `${INSTALL_COMMANDS[pm]} ${reference}`
}
