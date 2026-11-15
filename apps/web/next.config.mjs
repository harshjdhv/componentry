import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"
import nextEnv from "@next/env"

// Next.js only reads env files from apps/web, but this monorepo keeps a single
// .env at the repo root. Load it here with Next's own loader: a missing file is
// skipped (CI, Vercel) and already-set variables are never overridden.
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
nextEnv.loadEnvConfig(repoRoot, process.env.NODE_ENV !== "production")

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
}

export default nextConfig
