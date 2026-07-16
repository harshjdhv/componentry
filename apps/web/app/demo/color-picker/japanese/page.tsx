"use client"

import { useState } from "react"
import { ColorPicker } from "@workspace/ui/components/color-picker"

export default function ColorPickerJapaneseDemoPage() {
    const [color, setColor] = useState("#D6001C")

    return (
        <div className="w-full min-h-screen bg-[#171717] flex flex-col items-center justify-center">
            <ColorPicker 
                value={color} 
                onValueChange={setColor} 
                containerBg="#0A0E17" 
                containerBorderColor="#1F2832" 
                containerRadius="12px" 
                containerPadding="24px" 
                enabledModes={["hex", "rgb"]} 
                inputBg="#151C26" 
                inputBorderColor="#2D3A4A"                  
                inputBorderWidth={1} 
                inputRadius={8} 
                inputTextColor="#F0F4F8"                    
                inputErrorOutlineColor="#8CE300" 
                saturationHeight={160} 
                saturationRadius={8} 
                saturationBorderColor="#2D3A4A"             
                saturationBorderWidth={1} 
                saturationThumbWidth={16} 
                saturationThumbHeight={16} 
                saturationThumbRadius={50} 
                saturationThumbBorderStyle="solid" 
                saturationThumbBorderWidth={1} 
                saturationThumbBorderColor="#F0F4F8"        
                hueTrackHeight={12} 
                hueTrackRadius="6px" 
                hueTrackBorderWidth={1} 
                hueTrackBorderColor="#2D3A4A"               
                hueThumbSize={20} 
                hueThumbRadius="50%" 
                hueThumbBorderWidth={1} 
                hueThumbBgDefault="#1A2333" 
                hueThumbBgHover="#25334A" 
                hueThumbBgActive="#334B62" 
                hueThumbBorderDefault="#F0F4F8"             
                hueThumbBorderHover="#FFFFFF" 
                hueThumbBorderActive="#FFFFFF" 
                hexLabel="十六進数" 
                rgbLabel="赤緑青" 
                hslLabel="色相・彩度・明度" 
                modeLabel="表示モード" 
                contrastLabel="コントラスト比" 
                rLabel="赤" 
                gLabel="緑" 
                bLabel="青" 
                hLabel="色相" 
                sLabel="彩度" 
                lLabel="明度" 
                previewBgFallback="#151C26" 
                previewBorderColor="#2D3A4A" 
                previewBorderWidth={1} 
                previewRadius={8} 
                previewFontSize={20} 
                previewFontWeight={500} 
                previewTextColor="#F0F4F8" 
                floatingLabelBg="#0A0E17" 
                floatingLabelTextColor="#8AA8C2"            
                floatingLabelActiveTextColor="#E13535"      
                floatingLabelFocusBorderColor="#E13535"     
                floatingLabelRadius={6} 
                floatingLabelBorderColor="#2D3A4A"          
                floatingLabelBorderWidth={1} 
                dropdownHeight={48} 
                dropdownBg="#151C26" 
                dropdownBorderColor="#2D3A4A" 
                dropdownBorderWidth={1} 
                dropdownRadius={8} 
                dropdownTextColor="#F0F4F8" 
                dropdownFocusBorderColor="#E13535"          
                dropdownChevronColor="#8AA8C2" 
                dropdownMenuBg="#0A0E17" 
                dropdownMenuBorderColor="#2D3A4A" 
                dropdownMenuBorderWidth={1} 
                dropdownMenuRadius={8} 
                dropdownMenuTextColor="#E0E8F0" 
                dropdownMenuActiveTextColor="#E13535"       
                dropdownMenuHoverBg="rgba(225,53,53,0.1)"   
                dropdownMenuActiveBg="rgba(225,53,53,0.15)" 
                modeDropdownWidth="120px" 
                badgeBgPass="rgba(227,53,53,0.18)"          
                badgeBgFail="rgba(70,80,90,0.25)"           
                badgeBorderPass="rgba(227,53,53,0.5)" 
                badgeBorderFail="rgba(70,80,90,0.5)" 
                badgeTextPass="#E13535"                     
                badgeTextFail="#787878"                     
                badgeBorderRadius="100px" 
                badgeFontWeight={500} 
            />
        </div>
    )
}