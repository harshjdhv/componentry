import { SeverityNumber } from "@opentelemetry/api-logs"
import { after } from "next/server"
import { NextRequest, NextResponse } from "next/server"
import { posthogLogger, loggerProvider } from "@/instrumentation"
import { highlightCode } from "@/lib/shiki"
import { readComponentSource } from "@/lib/source-code"
import type { BundledLanguage } from "shiki"

const LANGUAGE_WHITELIST = new Set<BundledLanguage>(["tsx", "typescript", "bash", "json"])

export async function POST(request: NextRequest) {
  posthogLogger?.emit({
    body: "Documentation source request received",
    severityNumber: SeverityNumber.INFO,
    attributes: { endpoint: "/api/docs/source", method: "POST" },
  })

  after(async () => {
    await loggerProvider?.forceFlush().catch(() => {})
  })

  try {
    const payload = (await request.json()) as { component?: string; code?: string; lang?: string }
    const requestedLang = (payload.lang || "tsx") as BundledLanguage
    const lang = LANGUAGE_WHITELIST.has(requestedLang) ? requestedLang : "tsx"

    if (payload.component) {
      const componentName = payload.component.trim()
      if (!/^[a-z0-9-]+$/i.test(componentName)) {
        return NextResponse.json({ error: "Invalid component name" }, { status: 400 })
      }

      const source = await readComponentSource(componentName)
      if (!source) {
        posthogLogger?.emit({
          body: "Documentation component source was unavailable",
          severityNumber: SeverityNumber.WARN,
          attributes: { endpoint: "/api/docs/source", source_type: "registry_component" },
        })
        return NextResponse.json({ error: "Source not found" }, { status: 404 })
      }

      const html = await highlightCode(source.trim(), lang)
      posthogLogger?.emit({
        body: "Documentation component source highlighted",
        severityNumber: SeverityNumber.INFO,
        attributes: { endpoint: "/api/docs/source", source_type: "registry_component" },
      })
      return NextResponse.json({ code: source, html })
    }

    if (!payload.code || typeof payload.code !== "string") {
      return NextResponse.json({ error: "Missing code" }, { status: 400 })
    }

    const html = await highlightCode(payload.code.trim(), lang)
    posthogLogger?.emit({
      body: "Documentation code highlighted",
      severityNumber: SeverityNumber.INFO,
      attributes: { endpoint: "/api/docs/source", source_type: "submitted_code" },
    })
    return NextResponse.json({ html })
  } catch {
    posthogLogger?.emit({
      body: "Documentation source request could not be processed",
      severityNumber: SeverityNumber.ERROR,
      attributes: { endpoint: "/api/docs/source" },
    })
    return NextResponse.json({ error: "Unable to process request" }, { status: 500 })
  }
}
