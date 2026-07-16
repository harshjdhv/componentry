"use client"

import { useState } from "react"
import { ColorPicker } from "@workspace/ui/components/color-picker"

export default function ColorPickerLightDemoPage() {
    const [color, setColor] = useState("#24EF23")

    return (
        <div className="w-full min-h-screen bg-[#171717] flex flex-col items-center justify-center">
            <ColorPicker 
                value={color} 
                onValueChange={setColor} 
                enabledModes={["hsl", "rgb"]} 
                defaultFormat="hsl" 
                containerBg="#fafafa" 
                containerBorderColor="#e0e0e0" 
                inputBg="#fff" 
                inputTextColor="#111" 
                floatingLabelTextColor="#0059B8" 
                floatingLabelActiveTextColor="#0E82FF" 
                floatingLabelFocusBorderColor="#333333" 
                floatingLabelBorderColor="#333333"         
                floatingLabelBorderWidth={1}               
                contrastLabel="Contrast" 
                rLabel="Red" 
                gLabel="Green" 
                bLabel="Blue" 
                hLabel="Hue" 
                sLabel="Sat" 
                lLabel="Lum" 
                showContrast={true} 
                contrastValueColor="#000" 
                dropdownMenuBg="#ffffff" 
                dropdownMenuBorderColor="#e0e0e0" 
                dropdownMenuTextColor="#333333" 
                dropdownMenuActiveTextColor="#000000" 
                dropdownMenuHoverBg="rgba(0,0,0,0.05)" 
                dropdownMenuActiveBg="rgba(0,0,0,0.10)" 
                modeDropdownWidth="96px" 
                hueTrackHeight={14} 
                hueTrackBorderColor="#333333"              
                hueTrackBorderWidth={1} 
                hueThumbSize={20} 
                hueThumbBgDefault="#333333"                
                hueThumbBgHover="#444444"                  
                hueThumbBgActive="#555555"                 
                hueThumbBorderDefault="#666666"            
                hueThumbBorderHover="#777777"              
                hueThumbBorderActive="#888888"             
                saturationBorderColor="#333" 
                saturationBorderWidth={1} 
            />
        </div>
    )
}