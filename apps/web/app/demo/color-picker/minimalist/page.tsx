"use client"

import { useState } from "react"
import { ColorPicker } from "@workspace/ui/components/color-picker"

export default function ColorPickerMinimalistDemoPage() {
    const [color, setColor] = useState("#4287f5")

    return (
        <div className="w-full min-h-screen bg-[#171717] flex flex-col items-center justify-center">
            <ColorPicker 
                value={color} 
                onValueChange={setColor} 
                enabledModes={["hex", "rgb"]} 
                containerRadius="4px" 
                hueTrackRadius="4px" 
                hueThumbRadius="4px" 
                inputRadius={4} 
                previewRadius={4} 
                saturationRadius={4} 
                saturationThumbRadius={4} 
                dropdownRadius={4} 
                dropdownMenuRadius={4} 
                badgeBorderRadius="4px" 
                hexLabel="HEX" 
                rgbLabel="RVB" 
                modeLabel="Mode" 
                rLabel="R" 
                gLabel="V" 
                bLabel="B" 
                showContrast={false} 
            />
        </div>
    )
}