"use client"

import { useState } from "react"
import { ColorPicker } from "@workspace/ui/components/color-picker"

export default function ColorPickerRectangularDemoPage() {
    const [color, setColor] = useState("#EF4006")

    return (
        <div className="w-full min-h-screen bg-[#171717] flex flex-col items-center justify-center">
            <ColorPicker 
                value={color} 
                onValueChange={setColor} 
                enabledModes={["hex", "rgb", "hsl"]} 
                saturationHeight={210} 
                saturationRadius={0} 
                saturationThumbRadius={0} 
                defaultFormat="rgb" 
                containerRadius="0px" 
                inputRadius={0} 
                previewRadius={0} 
                showContrast={true} 
                hexLabel="ESA" 
                rgbLabel="RGB" 
                hslLabel="TNL" 
                modeLabel="Modo" 
                contrastLabel="Rapporto di contrasto" 
                rLabel="Rosso" 
                gLabel="Verde" 
                bLabel="Blu" 
                hLabel="Ton" 
                sLabel="Sat" 
                lLabel="Lum" 
                badgeBorderRadius="0px" 
                contrastFormat="value" 
                hueTrackHeight={14} 
                hueTrackRadius="0px" 
                hueTrackBorderColor="#242424" 
                hueThumbSize={20} 
                hueThumbRadius="none" 
                modeDropdownWidth="120px" 
                dropdownMenuRadius={0} 
                contrastAreaTopMargin="8px" 
            />
        </div>
    )
}