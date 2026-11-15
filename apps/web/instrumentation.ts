import type { Logger } from "@opentelemetry/api-logs"
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http"
import { resourceFromAttributes } from "@opentelemetry/resources"
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs"

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST

export const loggerProvider =
  projectToken && host
    ? new LoggerProvider({
        resource: resourceFromAttributes({
          "service.name": "componentry-web",
          "deployment.environment": process.env.NODE_ENV ?? "development",
        }),
        processors: [
          new BatchLogRecordProcessor({
            exporter: new OTLPLogExporter({
              url: new URL("/i/v1/logs", host).toString(),
              headers: {
                Authorization: `Bearer ${projectToken}`,
                "Content-Type": "application/json",
              },
            }),
          }),
        ],
      })
    : null

// Keep this logger isolated so existing application logs are not exported.
export const posthogLogger: Logger | null =
  loggerProvider?.getLogger("componentry.posthog-logs") ?? null

export function register() {
  if (!loggerProvider && process.env.NODE_ENV !== "production") {
    const missingVariable = projectToken
      ? "NEXT_PUBLIC_POSTHOG_HOST"
      : "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN"

    console.warn(
      `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`,
    )
  }
}
