import { redirect } from "next/navigation"

/**
 * /docs has no page of its own: send visitors (and old links) to the
 * introduction, where the header's "Docs" item points. Temporary (307), so /docs can get a page again later without
 * browsers having cached a permanent redirect.
 */
export default function DocsIndexPage() {
  redirect("/docs/introduction")
}
