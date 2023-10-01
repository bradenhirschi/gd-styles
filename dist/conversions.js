"use strict";
/*
 * These are functions to convert CSS styles to Tailwind classes. Some call helper functions from utilities.ts.
 * Functions are listed here in alphabetical order
 */
const backgroundColorToTailwind = (cssString) => {
    if (cssString !== "rgba(0, 0, 0, 0)") {
        return `bg-[${rgbaToHex(cssString)}]`;
    }
    else {
        return "";
    }
};
function borderToTailwind(cssString) {
    const [width, styleAndColor] = cssString.split(/\s+/);
    const [style, color] = styleAndColor.split(/\s+/);
    let borderClasses = "";
    // Convert border width
    if (width === "0px") {
        return "";
    }
    else if (width !== undefined) {
        borderClasses += `border-[${width}] `;
    }
    // Convert border style
    if (style !== undefined && style !== "none") {
        const borderStyles = {
            hidden: "border-hidden",
            dotted: "border-dotted",
            dashed: "border-dashed",
            solid: "border",
            double: "border-double",
            groove: "border-groove",
            ridge: "border-ridge",
            inset: "border-inset",
            outset: "border-outset",
        };
        if (borderStyles[style]) {
            borderClasses += borderStyles[style] + " ";
        }
        else {
            borderClasses += `border-${style} `;
        }
    }
    // Convert border color
    if (color !== undefined) {
        borderClasses += `border-${color} `;
    }
    return borderClasses.trim();
}
const borderRadiusToTailwind = (cssString) => {
    const radii = cssString.split(" ");
    let roundedClass = "";
    if (radii.length === 1) {
        const radius = radii[0];
        if (radius === "0px") {
            roundedClass = "";
        }
        else if (radius === "50%" || radius === "9999px") {
            roundedClass = "rounded-full";
        }
        else {
            roundedClass = `rounded-[${radius}]`;
        }
    }
    else if (radii.length === 2) {
        const [topLeft, topRight] = radii;
        roundedClass = `rounded-t-[${topLeft}] rounded-tr-[${topRight}]`;
    }
    else if (radii.length === 3) {
        const [topLeft, topRight, bottomLeft] = radii;
        roundedClass = `rounded-t-[${topLeft}] rounded-tr-[${topRight}] rounded-bl-[${bottomLeft}]`;
    }
    else if (radii.length >= 4) {
        const [topLeft, topRight, bottomRight, bottomLeft] = radii;
        roundedClass = `rounded-tl-[${topLeft}] rounded-tr-[${topRight}] rounded-br-[${bottomRight}] rounded-bl-[${bottomLeft}]`;
    }
    return roundedClass;
};
const colorToTailwind = (cssString) => {
    if (cssString !== "rgb(0, 0, 0)") {
        return `text-[${rgbaToHex(cssString)}]`;
    }
    else {
        return "";
    }
};
const fontStyleToTailwind = (cssString) => {
    //Mapping of CSS font styles to Tailwind classes
    const fontStyleMap = {
        italic: "italic",
        oblique: "italic", // No direct oblique class in Tailwind
        // ... Add more mappings based on your needs
    };
    return fontStyleMap[cssString] || "";
};
const fontWeightToTailwind = (cssString) => {
    /*
    // Mapping of CSS font weights to Tailwind classes
    const fontWeightMap: { [key: string]: string } = {
      normal: "font-normal",
      bold: "font-bold",
      // ... Add more mappings based on your needs
    };
  
    return fontWeightMap[cssString] || "";
    */
    return `font-[${cssString}]`;
};
const fontSizeToTailwind = (cssString) => {
    /*
    // Mapping of CSS font sizes to Tailwind classes
    const fontSizeMap: { [key: string]: string } = {
      // Mapping of CSS font-size values to Tailwind classes
    };
  
    return fontSizeMap[cssFontSize] || "";
    */
    return `font-[${cssString}]`;
};
const paddingToTailwind = (cssString) => {
    const paddings = cssString.split(" ");
    let paddingClass = "";
    if (paddings.length === 1 && paddings[0] !== "0px") {
        paddingClass = `p-[${paddings[0]}]`;
    }
    else if (paddings.length === 2) {
        paddingClass = `py-[${paddings[0]}] px-[${paddings[1]}]`;
    }
    else if (paddings.length === 3) {
        paddingClass = `pt-[${paddings[0]}] px-[${paddings[1]}] pb-[${paddings[2]}]`;
    }
    else if (paddings.length >= 4) {
        paddingClass = `pt-[${paddings[0]}] pr-[${paddings[1]}] pb-[${paddings[2]}] pl-${paddings[3]}]`;
    }
    return paddingClass;
};
