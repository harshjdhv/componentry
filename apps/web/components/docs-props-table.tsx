import { cn } from "@/lib/utils"
import { docsLine, docsPanel, docsShell } from "@/components/docs-inset/surface"

export interface DocsPropItem {
  name: string
  type: string
  default?: string
  description: string
}

interface DocsPropsTableProps {
  props: DocsPropItem[]
  className?: string
}

const th = "px-4 pt-2 pb-2.5 text-[12.5px] font-medium text-zinc-500 dark:text-zinc-400"
const td = "px-4 py-3 align-top"
const mono = "font-mono text-[12.5px] leading-5"

/** Shared column widths so the header (in the shell) and body (in the panel) line up. */
function Cols() {
  return (
    <colgroup>
      <col className="w-[22%]" />
      <col className="w-[26%]" />
      <col className="w-[14%]" />
      <col />
    </colgroup>
  )
}

/**
 * Props table: Prop · Type · Default · Description. Column headings sit in the
 * outer shell, rows in the raised inner panel. Scrolls sideways on narrow screens.
 */
export function DocsPropsTable({ props, className }: DocsPropsTableProps) {
  return (
    <div className={cn(docsShell, "w-full overflow-x-auto", className)}>
      <div className="min-w-[640px]">
        <table className="w-full table-fixed border-collapse text-left">
          <Cols />
          <thead>
            <tr>
              <th className={th}>Prop</th>
              <th className={th}>Type</th>
              <th className={th}>Default</th>
              <th className={th}>Description</th>
            </tr>
          </thead>
        </table>

        <div className={docsPanel}>
          <table className="w-full table-fixed border-collapse text-left">
            <Cols />
            <tbody>
              {props.map((prop) => (
                <tr
                  key={prop.name}
                  className={cn("border-b last:border-b-0", docsLine)}
                >
                  <td className={td}>
                    <code className={cn(mono, "font-medium break-all text-zinc-900 dark:text-zinc-100")}>
                      {prop.name}
                    </code>
                  </td>
                  <td className={td}>
                    <code className={cn(mono, "break-words text-sky-700 dark:text-sky-300/90")}>
                      {prop.type}
                    </code>
                  </td>
                  <td className={td}>
                    {prop.default ? (
                      <code className={cn(mono, "break-words text-zinc-600 dark:text-zinc-300")}>
                        {prop.default}
                      </code>
                    ) : (
                      <span className="text-[13px] text-zinc-300 dark:text-zinc-600">—</span>
                    )}
                  </td>
                  <td className={cn(td, "text-pretty text-[13.5px] leading-5 text-zinc-600 dark:text-zinc-400")}>
                    {prop.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
