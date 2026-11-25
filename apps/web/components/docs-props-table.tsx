import { cn } from "@/lib/utils"

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

const th =
  "px-4 py-2.5 text-[12.5px] font-medium text-zinc-500 dark:text-zinc-400"
const td = "px-4 py-3 align-top"
const mono = "font-mono text-[12.5px] leading-5"

/** Bordered props table: Prop · Type · Default · Description. Scrolls sideways on narrow screens. */
export function DocsPropsTable({ props, className }: DocsPropsTableProps) {
  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-lg border border-black/[0.08] dark:border-white/[0.08]",
        className
      )}
    >
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead className="bg-zinc-50 dark:bg-white/[0.03]">
          <tr className="border-b border-black/[0.08] dark:border-white/[0.08]">
            <th className={cn(th, "w-[22%]")}>Prop</th>
            <th className={cn(th, "w-[26%]")}>Type</th>
            <th className={cn(th, "w-[14%]")}>Default</th>
            <th className={th}>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr
              key={prop.name}
              className="border-b border-black/[0.06] last:border-b-0 dark:border-white/[0.06]"
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
  )
}
