import { docsConfig } from "@/config/docs";

export function GET() {
  return new Response(docsConfig.llms.text, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
