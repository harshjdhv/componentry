import React from "react"
import { FlightStatusCardAdaptive } from "@workspace/ui/components/flight-status-card"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"

const defaultCardCode = `import { FlightStatusCardAdaptive } from "@/components/ui/flight-status-card"

<FlightStatusCardAdaptive />`

const customRouteCode = `import { FlightStatusCardAdaptive } from "@/components/ui/flight-status-card"

<FlightStatusCardAdaptive
  departureCode="SFO"
  arrivalCode="LHR"
  departureCity="San Francisco"
  arrivalCity="London"
  departureTime="FRI, 10:30 AM"
  arrivalTime="SAT, 6:45 AM"
  eta="ETA 6:45 AM"
  timezone="London Time"
  nextEvent="LANDING IN"
  nextEventTime="4:15H"
  progress={65}
  remainingTime="-4H 15M"
/>`

export async function FlightStatusCardDocs() {
    const sourceCode = (await readComponentSource("flight-status-card")) || "// Unable to load source code"

    return (
        <DocsPageLayout
            title="Flight Status Card"
            description="A detailed flight status widget with dot-matrix airport codes, progress tracking, and ETA information. Pixel-perfect recreation of a premium travel app design."
            preview={
                <div className="w-full flex justify-center p-4">
                    <FlightStatusCardAdaptive />
                </div>
            }
            previewCode={defaultCardCode}
            installPackageName="flight-status-card"
            installDependencies="framer-motion clsx tailwind-merge"
            installSourceCode={sourceCode}
            usageCode={defaultCardCode}
            examples={[
                {
                    title: "Custom Route",
                    preview: (
                        <div className="w-full flex justify-center p-4">
                            <FlightStatusCardAdaptive
                                departureCode="SFO"
                                arrivalCode="LHR"
                                departureCity="San Francisco"
                                arrivalCity="London"
                                departureTime="FRI, 10:30 AM"
                                arrivalTime="SAT, 6:45 AM"
                                eta="ETA 6:45 AM"
                                timezone="London Time"
                                nextEvent="LANDING IN"
                                nextEventTime="4:15H"
                                progress={65}
                                remainingTime="-4H 15M"
                            />
                        </div>
                    ),
                    code: customRouteCode,
                },
            ]}
            props={[
                {
                    name: "departureCode",
                    type: "string",
                    default: "YYZ",
                    description: "Three-letter IATA code for departure airport.",
                },
                {
                    name: "arrivalCode",
                    type: "string",
                    default: "HND",
                    description: "Three-letter IATA code for arrival airport.",
                },
                {
                    name: "departureCity",
                    type: "string",
                    default: "Toronto",
                    description: "Name of the departure city.",
                },
                {
                    name: "arrivalCity",
                    type: "string",
                    default: "Tokyo",
                    description: "Name of the arrival city.",
                },
                {
                    name: "departureTime",
                    type: "string",
                    default: "MON, 6:14 PM",
                    description: "Formatted string for departure time.",
                },
                {
                    name: "arrivalTime",
                    type: "string",
                    default: "TUE, 7:14 AM",
                    description: "Formatted string for arrival time.",
                },
                {
                    name: "eta",
                    type: "string",
                    default: "ETA 2:15 PM",
                    description: "Estimated time of arrival label.",
                },
                {
                    name: "timezone",
                    type: "string",
                    default: "Tokyo Time",
                    description: "Timezone information text.",
                },
                {
                    name: "nextEvent",
                    type: "string",
                    default: "DINNER IN",
                    description: "Label for the next scheduled event.",
                },
                {
                    name: "nextEventTime",
                    type: "string",
                    default: "2:34H",
                    description: "Time remaining until the next event.",
                },
                {
                    name: "progress",
                    type: "number",
                    default: "45",
                    description: "Percentage of flight completed (0-100).",
                },
                {
                    name: "remainingTime",
                    type: "string",
                    default: "-7H 01M",
                    description: "Formatted string for total remaining flight time.",
                },
                {
                    name: "className",
                    type: "string",
                    description: "Additional CSS classes for styling.",
                },
            ]}
        />
    )
}
