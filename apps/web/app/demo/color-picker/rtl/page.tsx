"use client"

import { useState } from "react"
import { ColorPicker } from "@workspace/ui/components/color-picker"

export default function ColorPickerRTLDemoPage() {
    const [color, setColor] = useState("#7B24D2")

    return (
        <div className="w-full min-h-screen bg-[#171717] flex flex-col items-center justify-center">
            <ColorPicker 
                value={color} 
                onValueChange={setColor} 
                isRTL={true}  
                showContrast={true} 
                hexLabel="הקס" 
                rgbLabel="ארג׳יבי" 
                hslLabel="האסאל" 
                modeLabel="מצב" 
                contrastLabel="ניגודיות" 
                rLabel="אדום" 
                gLabel="ירוק" 
                bLabel="כחול" 
                hLabel="גוון" 
                sLabel="רוויה" 
                lLabel="בהירות" 
                floatingLabelFocusBorderColor="#fff" 
                floatingLabelActiveTextColor={color} 
            />
        </div>
    )
}