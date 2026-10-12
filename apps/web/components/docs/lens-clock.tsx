import { LensClock } from "@workspace/ui/components/lens-clock"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"

const usageCode = `import { LensClock } from "@/components/ui/lens-clock"

export default function Demo() {
  return <LensClock />
}`

const themesCode = `import { LensClock } from "@/components/ui/lens-clock"

export default function Demo() {
  return (
    <div className="flex gap-6">
      <LensClock theme="light" />
      <LensClock theme="dark" />
    </div>
  )
}`

const worldClocksCode = `import { LensClock } from "@/components/ui/lens-clock"

const cities = [
  { name: "San Francisco", timeZone: "America/Los_Angeles" },
  { name: "New York", timeZone: "America/New_York" },
  { name: "London", timeZone: "Europe/London" },
]

export default function Demo() {
  return (
    <div className="flex flex-wrap gap-6">
      {cities.map((city) => (
        <figure key={city.timeZone} className="flex flex-col items-center gap-3">
          <LensClock timeZone={city.timeZone} className="w-52" />
          <figcaption className="text-sm text-muted-foreground">{city.name}</figcaption>
        </figure>
      ))}
    </div>
  )
}`

const cities = [
  { name: "San Francisco", timeZone: "America/Los_Angeles" },
  { name: "New York", timeZone: "America/New_York" },
  { name: "London", timeZone: "Europe/London" },
]

export async function LensClockDocs() {
  const sourceCode = await readComponentSource("lens-clock")

  return (
    <DocsPageLayout
      title="Lens Clock"
      description="A live clock widget that frames a corner of a large dial. The view pans with the hour hand and the edges fall out of focus. Set a time zone to show any city."
      preview={
        <div className="flex w-full justify-center py-10">
          <LensClock />
        </div>
      }
      previewCode={usageCode}
      installPackageName="lens-clock"
      installDependencies="framer-motion"
      installSourceCode={sourceCode ?? "// Unable to load source code"}
      usageCode={usageCode}
      usageNote="Without a theme prop the palette follows the dark class on an ancestor. Size it with a width class; everything inside scales with the card."
      examples={[
        {
          title: "Light and dark",
          preview: (
            <div className="flex w-full flex-wrap justify-center gap-6 py-10">
              <LensClock theme="light" className="w-60" />
              <LensClock theme="dark" className="w-60" />
            </div>
          ),
          code: themesCode,
        },
        {
          title: "World clocks",
          preview: (
            <div className="flex w-full flex-wrap justify-center gap-6 py-10">
              {cities.map((city) => (
                <figure key={city.timeZone} className="flex flex-col items-center gap-3">
                  <LensClock timeZone={city.timeZone} className="w-52" />
                  <figcaption className="text-sm text-muted-foreground">{city.name}</figcaption>
                </figure>
              ))}
            </div>
          ),
          code: worldClocksCode,
        },
      ]}
      props={[
        {
          name: "timeZone",
          type: "string",
          description: 'IANA time zone, such as "America/Los_Angeles". Omit it to use the viewer\'s zone. The clock stays live either way.',
        },
        {
          name: "time",
          type: "Date",
          description: "Fixed moment to display, shown in timeZone. Omit it to keep the clock live.",
        },
        {
          name: "theme",
          type: '"light" | "dark"',
          description: "Force a palette. Omit it to follow the surrounding dark class.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional styles. Defaults to w-72.",
        },
      ]}
    />
  )
}
