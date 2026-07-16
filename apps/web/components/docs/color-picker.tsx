import React from "react";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";
import { ColorPickerPreview } from "@/components/docs/previews/color-picker-preview";

const importCode = `import { ColorPicker } from "@workspace/ui/components/color-picker"`;

const defaultCode = `import { useState } from "react"
import { ColorPicker } from "@workspace/ui/components/color-picker"

export default function Page() {
    const [color, setColor] = useState("#06B5EF")
    return (
        <ColorPicker 
            value={color} 
            onValueChange={setColor} 
            showAlpha={false} 
            showContrast={true} 
        />
    )
}`;

const rtlCode = `import { useState } from "react"
import { ColorPicker } from "@workspace/ui/components/color-picker"

export default function Page() {
    const [color, setColor] = useState("#7B24D2")
    return (
        <ColorPicker 
            value={color} 
            onValueChange={setColor} 
            isRTL={true} 
            showAlpha={false} 
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
    )
}`;

const rectangularCode = `import { useState } from "react"
import { ColorPicker } from "@workspace/ui/components/color-picker"

export default function Page() {
    const [color, setColor] = useState("#EF4006")
    return (
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
    )
}`;

const lightCode = `import { useState } from "react"
import { ColorPicker } from "@workspace/ui/components/color-picker"

export default function Page() {
    const [color, setColor] = useState("#24EF23")
    return (
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
    )
}`;

const minimalistCode = `import { useState } from "react"
import { ColorPicker } from "@workspace/ui/components/color-picker"

export default function Page() {
    const [color, setColor] = useState("#4287f5")
    return (
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
    )
}`;

const japaneseCode = `import { useState } from "react"
import { ColorPicker } from "@workspace/ui/components/color-picker"

export default function Page() {
    const [color, setColor] = useState("#D6001C")
    return (
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
    )
}`;

export async function ColorPickerDocs() {
  const sourceCode =
    (await readComponentSource("color-picker")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Color Picker"
      description="An interactive and customizable color selection tool with HEX, RGB, and HSL modes, hue and saturation controls, and automatic contrast ratio display."
      fullWidthPreview={false}
      preview={
        <ColorPickerPreview
          src="/demo/color-picker"
          title="Color Picker - Default Variant"
        />
      }
      previewCode={defaultCode}
      installPackageName="color-picker"
      installDependencies="clsx tailwind-merge"
      installSourceCode={sourceCode}
      usageCode={importCode}
      examples={[
        {
          title: "Right-to-Left (RTL)",
          fullWidth: false,
          preview: (
            <ColorPickerPreview
              src="/demo/color-picker/rtl"
              title="RTL Variant"
            />
          ),
          code: rtlCode,
        },
        {
          title: "Rectangular",
          fullWidth: false,
          preview: (
            <ColorPickerPreview
              src="/demo/color-picker/rectangular"
              title="Rectangular Variant"
            />
          ),
          code: rectangularCode,
        },
        {
          title: "Light Mode",
          fullWidth: false,
          preview: (
            <ColorPickerPreview
              src="/demo/color-picker/light"
              title="Light Variant"
            />
          ),
          code: lightCode,
        },
        {
          title: "Minimalist",
          fullWidth: false,
          preview: (
            <ColorPickerPreview
              src="/demo/color-picker/minimalist"
              title="Minimalist Variant"
            />
          ),
          code: minimalistCode,
        },
        {
          title: "Japanese",
          fullWidth: false,
          preview: (
            <ColorPickerPreview
              src="/demo/color-picker/japanese"
              title="Japanese Variant"
            />
          ),
          code: japaneseCode,
        },
      ]}
      props={[
        {
          name: "value",
          type: "string",
          default: '"#06B5EF"',
          description: "Current selected color value in hex format.",
        },
        {
          name: "onValueChange",
          type: "(val: string) => void",
          description: "Callback triggered when the color changes.",
        },
        {
          name: "isRTL",
          type: "boolean",
          default: "false",
          description: "Enables right-to-left layout alignment and input ordering.",
        },
        {
          name: "showContrast",
          type: "boolean",
          default: "true",
          description: "Shows or hides the contrast ratio display and validation badges.",
        },
        {
          name: "enabledModes",
          type: 'Array<"hex" | "rgb" | "hsl">',
          default: '["hex", "rgb", "hsl"]',
          description: "Supported color formats accessible in the mode selector dropdown.",
        },
        {
          name: "defaultFormat",
          type: '"hex" | "rgb" | "hsl"',
          default: '"hex"',
          description: "The default active format displayed on component initialization.",
        },
        {
          name: "hexLabel",
          type: "string",
          default: '"HEX"',
          description: "Label used for HEX input mode.",
        },
        {
          name: "rgbLabel",
          type: "string",
          default: '"RGB"',
          description: "Label used for RGB input mode.",
        },
        {
          name: "hslLabel",
          type: "string",
          default: '"HSL"',
          description: "Label used for HSL input mode.",
        },
        {
          name: "modeLabel",
          type: "string",
          default: '"Mode"',
          description: "Label displayed for the mode selector dropdown trigger.",
        },
        {
          name: "rLabel",
          type: "string",
          default: '"R"',
          description: "Label for the Red channel input in RGB mode.",
        },
        {
          name: "gLabel",
          type: "string",
          default: '"G"',
          description: "Label for the Green channel input in RGB mode.",
        },
        {
          name: "bLabel",
          type: "string",
          default: '"B"',
          description: "Label for the Blue channel input in RGB mode.",
        },
        {
          name: "hLabel",
          type: "string",
          default: '"H"',
          description: "Label for the Hue channel input in HSL mode.",
        },
        {
          name: "sLabel",
          type: "string",
          default: '"S"',
          description: "Label for the Saturation channel input in HSL mode.",
        },
        {
          name: "lLabel",
          type: "string",
          default: '"L"',
          description: "Label for the Lightness channel input in HSL mode.",
        },
        {
          name: "contrastBgLuminance",
          type: "number",
          default: "0",
          description: "Luminance value used for computing contrast ratio.",
        },
        {
          name: "colorPreviewAreaText",
          type: "string",
          default: '"A"',
          description: "Text character displayed inside the color preview area.",
        },
        {
          name: "containerBg",
          type: "string",
          default: '"#000"',
          description: "Background color for the main outer container.",
        },
        {
          name: "containerBorderColor",
          type: "string",
          default: '"#242424"',
          description: "Border color for the main component container.",
        },
        {
          name: "containerBorderWidth",
          type: "number",
          default: "1",
          description: "Thickness of the container border.",
        },
        {
          name: "containerRadius",
          type: "string",
          default: '"12px"',
          description: "Corner radius of the outer container.",
        },
        {
          name: "containerPadding",
          type: "string",
          default: '"16px"',
          description: "Padding inside the color picker container.",
        },
        {
          name: "containerElementGap",
          type: "string",
          default: '"16px"',
          description: "Gap between inner container elements.",
        },
        {
          name: "saturationHeight",
          type: "number",
          default: "140",
          description: "Height of the saturation selection square in pixels.",
        },
        {
          name: "saturationRadius",
          type: "number",
          default: "8",
          description: "Corner radius of the saturation selection area.",
        },
        {
          name: "saturationBorderColor",
          type: "string",
          default: '"#242424"',
          description: "Border color of the saturation square.",
        },
        {
          name: "saturationBorderWidth",
          type: "number",
          default: "1",
          description: "Border width for the saturation square.",
        },
        {
          name: "saturationThumbWidth",
          type: "number | string",
          default: "14",
          description: "Width of the draggable thumb inside the saturation area.",
        },
        {
          name: "saturationThumbHeight",
          type: "number | string",
          default: "14",
          description: "Height of the draggable thumb inside the saturation area.",
        },
        {
          name: "saturationThumbRadius",
          type: "number | string",
          default: "50",
          description: "Corner radius for the saturation thumb indicator.",
        },
        {
          name: "saturationThumbBorderStyle",
          type: '"solid" | "dashed" | "none"',
          default: '"solid"',
          description: "Border style of the saturation thumb.",
        },
        {
          name: "saturationThumbBorderWidth",
          type: "number",
          default: "2",
          description: "Border thickness of the saturation thumb.",
        },
        {
          name: "saturationThumbBorderColor",
          type: "string",
          default: '"#ffffff"',
          description: "Border color of the saturation thumb.",
        },
        {
          name: "saturationThumbBgColor",
          type: "string",
          default: '"transparent"',
          description: "Background fill color of the saturation thumb.",
        },
        {
          name: "hueTrackHeight",
          type: "number | string",
          default: "10",
          description: "Height of the static hue slider track.",
        },
        {
          name: "hueTrackRadius",
          type: "number | string",
          default: '"8px"',
          description: "Corner radius of the static hue track.",
        },
        {
          name: "hueTrackBorderWidth",
          type: "number",
          default: "1",
          description: "Border width of the hue track.",
        },
        {
          name: "hueTrackBorderColor",
          type: "string",
          default: '"transparent"',
          description: "Border color of the hue track.",
        },
        {
          name: "hueThumbSize",
          type: "number | string",
          default: "16",
          description: "Dimension size of the draggable hue thumb.",
        },
        {
          name: "hueThumbRadius",
          type: "number | string",
          default: '"50%"',
          description: "Corner radius of the hue thumb.",
        },
        {
          name: "hueThumbBorderWidth",
          type: "number",
          default: "3",
          description: "Border thickness of the hue thumb.",
        },
        {
          name: "hueThumbBgDefault",
          type: "string",
          default: '"#f0f0f0"',
          description: "Default background color of the hue thumb.",
        },
        {
          name: "hueThumbBgHover",
          type: "string",
          default: '"#e5e5e5"',
          description: "Background color of the hue thumb when hovered.",
        },
        {
          name: "hueThumbBgActive",
          type: "string",
          default: '"#f0f0f0"',
          description: "Background color of the hue thumb when actively dragged.",
        },
        {
          name: "hueThumbBorderDefault",
          type: "string",
          default: '"#e5e5e5"',
          description: "Default border color of the hue thumb.",
        },
        {
          name: "hueThumbBorderHover",
          type: "string",
          default: '"#f0f0f0"',
          description: "Border color of the hue thumb on hover.",
        },
        {
          name: "hueThumbBorderActive",
          type: "string",
          default: '"#fff"',
          description: "Border color of the hue thumb when active.",
        },
        {
          name: "badgeBorderWidth",
          type: "number | string",
          default: "1",
          description: "Thickness of the contrast badge border.",
        },
        {
          name: "badgeBorderRadius",
          type: "number | string",
          default: '"50px"',
          description: "Corner radius of the contrast score badge.",
        },
        {
          name: "badgeFontSize",
          type: "number | string",
          default: '"10px"',
          description: "Font size for text inside the contrast badge.",
        },
        {
          name: "badgeFontWeight",
          type: "number",
          default: "600",
          description: "Font weight for text inside the contrast badge.",
        },
        {
          name: "badgeIconSize",
          type: "number | string",
          default: "10",
          description: "Dimension size of the pass/fail indicator icon inside the badge.",
        },
        {
          name: "badgePadding",
          type: "string",
          default: '"0.25rem 0.5rem"',
          description: "Inner padding of the contrast badge.",
        },
        {
          name: "badgeIconStrokeWidth",
          type: "number",
          default: "2.25",
          description: "Stroke thickness of the indicator icon inside the badge.",
        },
        {
          name: "badgeBgPass",
          type: "string",
          default: '"rgba(65, 239, 6, 0.1)"',
          description: "Background color for compliance passing badges.",
        },
        {
          name: "badgeBgFail",
          type: "string",
          default: '"rgba(239, 6, 65, 0.1)"',
          description: "Background color for compliance failing badges.",
        },
        {
          name: "badgeBorderPass",
          type: "string",
          default: '"rgba(65, 239, 6, 0.5)"',
          description: "Border color for a compliance passing contrast badge.",
        },
        {
          name: "badgeBorderFail",
          type: "string",
          default: '"rgba(239, 6, 65, 0.5)"',
          description: "Border color for a compliance failing contrast badge.",
        },
        {
          name: "badgeTextPass",
          type: "string",
          default: '"#41EF06"',
          description: "Text color for compliance passing badges.",
        },
        {
          name: "badgeTextFail",
          type: "string",
          default: '"#EF0641"',
          description: "Text color for compliance failing badges.",
        },
        {
          name: "contrastLabel",
          type: "string",
          default: '"Contrast"',
          description: "Label text for the contrast validation panel section.",
        },
        {
          name: "contrastLabelSize",
          type: "string",
          default: '"12px"',
          description: "Font size for the contrast section label.",
        },
        {
          name: "contrastLabelColor",
          type: "string",
          default: '"#737373"',
          description: "Text color for the contrast section label.",
        },
        {
          name: "contrastLabelWeight",
          type: "number",
          default: "700",
          description: "Font weight configuration of the contrast section label.",
        },
        {
          name: "contrastValueSize",
          type: "string",
          default: '"14px"',
          description: "Font size for the computed contrast ratio numerical value.",
        },
        {
          name: "contrastValueColor",
          type: "string",
          default: '"#ffffff"',
          description: "Text color for the contrast ratio value display.",
        },
        {
          name: "contrastValueWeight",
          type: "number",
          default: "400",
          description: "Font weight configuration of the contrast ratio numerical display.",
        },
        {
          name: "contrastFormat",
          type: '"value:1" | "1:value" | "value"',
          default: '"value:1"',
          description: "Display presentation format of the contrast ratio string.",
        },
        {
          name: "contrastLabelGap",
          type: "string",
          default: '"0.125rem"',
          description: "Vertical margin spacing between contrast label and actual value.",
        },
        {
          name: "contrastItemGap",
          type: "string",
          default: '"16px"',
          description: "Horizontal layout gap spacing between distinct contrast elements.",
        },
        {
          name: "contrastBadgeGap",
          type: "string",
          default: '"8px"',
          description: "Horizontal layout margin separating the AA and AAA score badges.",
        },
        {
          name: "showContrastAALabel",
          type: "boolean",
          default: "true",
          description: "Controls structural rendering visibility of the AA validation badge.",
        },
        {
          name: "showContrastAAALabel",
          type: "boolean",
          default: "true",
          description: "Controls structural rendering visibility of the AAA validation badge.",
        },
        {
          name: "contrastAreaTopMargin",
          type: "string",
          default: '"0px"',
          description: "External vertical spacing buffer applied directly above the contrast module.",
        },
        {
          name: "inputHeight",
          type: "number",
          default: "44",
          description: "Height dimension applied to color text value input nodes.",
        },
        {
          name: "inputBg",
          type: "string",
          default: '"#000"',
          description: "Background color property configuration of the text inputs.",
        },
        {
          name: "inputBorderColor",
          type: "string",
          default: '"#242424"',
          description: "Border color configuration of input text fields.",
        },
        {
          name: "inputBorderWidth",
          type: "number",
          default: "1",
          description: "Stroke border width applied to field boundaries.",
        },
        {
          name: "inputRadius",
          type: "number",
          default: "8",
          description: "Corner radius applied to color input containers.",
        },
        {
          name: "inputTextColor",
          type: "string",
          default: '"#ffffff"',
          description: "Font display color configuration of value string inputs.",
        },
        {
          name: "floatingLabelFocusBorderColor",
          type: "string",
          default: '"#06B5EF"',
          description: "Target layout border stroke highlight color applied on focused fields.",
        },
        {
          name: "inputErrorOutlineColor",
          type: "string",
          default: '"#EF0641"',
          description: "Boundary highlight color trigger when standard validation algorithms fail.",
        },
        {
          name: "floatingLabelBg",
          type: "string",
          description: "Background color region rendering beneath floating input labels.",
        },
        {
          name: "floatingLabelTextColor",
          type: "string",
          default: '"#777777"',
          description: "Neutral text color applied to inactive floating labels.",
        },
        {
          name: "floatingLabelActiveTextColor",
          type: "string",
          default: '"#ffffff"',
          description: "Highlight text color applied to focused floating label strings.",
        },
        {
          name: "floatingLabelRadius",
          type: "number",
          default: "4",
          description: "Corner boundary rounding of background elements supporting the floating label.",
        },
        {
          name: "floatingLabelBorderColor",
          type: "string",
          description: "Structural boundary stroke border color wrapping active floating labels.",
        },
        {
          name: "floatingLabelBorderWidth",
          type: "number",
          default: "0",
          description: "Stroke thickness applied around floating label background bounds.",
        },
        {
          name: "floatingLabelMainTextSize",
          type: "number",
          default: "14",
          description: "Underlying base font sizing applied to floating labels.",
        },
        {
          name: "dropdownHeight",
          type: "number",
          default: "44",
          description: "Vertical layout height dimension of the mode dropdown select trigger.",
        },
        {
          name: "dropdownBg",
          type: "string",
          description: "Inner background fill configuration of the select action dropdown button.",
        },
        {
          name: "dropdownBorderColor",
          type: "string",
          description: "Outer border color configuration wrapping dropdown select triggers.",
        },
        {
          name: "dropdownBorderWidth",
          type: "number",
          description: "Stroke border width applied to select trigger bounds.",
        },
        {
          name: "dropdownRadius",
          type: "number",
          description: "Corner radius rounding properties applied on selection dropdown trigger buttons.",
        },
        {
          name: "dropdownTextColor",
          type: "string",
          description: "Text font display color active within selection buttons.",
        },
        {
          name: "dropdownFocusBorderColor",
          type: "string",
          description: "Border stroke outline highlight applied on keyboard dropdown selection focus.",
        },
        {
          name: "dropdownChevronColor",
          type: "string",
          default: '"#6b7280"',
          description: "Stroke color active on the auxiliary indicator chevron icon.",
        },
        {
          name: "dropdownMenuBg",
          type: "string",
          default: '"#111111"',
          description: "Background fill color applied on open overlay selection lists.",
        },
        {
          name: "dropdownMenuBorderColor",
          type: "string",
          default: '"#242424"',
          description: "Border stroke wrap color active around opened dropdown panels.",
        },
        {
          name: "dropdownMenuBorderWidth",
          type: "number",
          default: "1",
          description: "Thickness wrap applied to selection menu dropdown outlines.",
        },
        {
          name: "dropdownMenuRadius",
          type: "number",
          default: "10",
          description: "Corner radius rounding properties of selection list overlays.",
        },
        {
          name: "dropdownMenuTextColor",
          type: "string",
          default: '"#d1d5db"',
          description: "Font text color applied on standard unselected select options.",
        },
        {
          name: "dropdownMenuActiveTextColor",
          type: "string",
          default: '"#ffffff"',
          description: "Font color rendering on actively chosen mode settings items.",
        },
        {
          name: "dropdownMenuHoverBg",
          type: "string",
          default: '"rgba(255,255,255,0.05)"',
          description: "Background highlight fill active under client pointer focus actions.",
        },
        {
          name: "dropdownMenuActiveBg",
          type: "string",
          default: '"rgba(255,255,255,0.10)"',
          description: "Background color property configuration highlighting actively selected variables.",
        },
        {
          name: "modeDropdownWidth",
          type: "string",
          default: '"128px"',
          description: "Width layout definition property of selection dropdown components.",
        },
        {
          name: "modeDropdownFullWidth",
          type: "boolean",
          default: "false",
          description: "Instructs components to stretch along full structural sibling widths.",
        },
        {
          name: "previewBgFallback",
          type: "string",
          default: '"#111111"',
          description: "Fallback color asset mapping inside color render preview regions.",
        },
        {
          name: "previewBorderColor",
          type: "string",
          default: '"rgba(255,255,255,0.14)"',
          description: "Outline layout border color active around color rendering indicators.",
        },
        {
          name: "previewBorderWidth",
          type: "number",
          default: "1",
          description: "Border boundary stroke thickness wrapping color previews.",
        },
        {
          name: "previewRadius",
          type: "number",
          default: "8",
          description: "Rounding layout property of preview sample cards.",
        },
        {
          name: "previewFontSize",
          type: "number",
          default: "18",
          description: "Font display size active on visual fallback preview letters.",
        },
        {
          name: "previewFontWeight",
          type: "number",
          default: "600",
          description: "Font weight active on visual preview letters.",
        },
        {
          name: "previewTextColor",
          type: "string",
          default: '"#ffffff"',
          description: "Text display color mapped on visual preview letters.",
        },
        {
          name: "colorPreviewPosition",
          type: '"top" | "contrast" | "none"',
          default: '"contrast"',
          description: "Anchor layout positioning location mappings of active color previews.",
        },
        {
          name: "previewWidth",
          type: "number | string",
          default: "44",
          description: "Width dimensions applied to target preview element configurations.",
        },
        {
          name: "previewHeight",
          type: "number",
          default: "44",
          description: "Height dimensions applied to target preview element configurations.",
        },
      ]}
    />
  );
}