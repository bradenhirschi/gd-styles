"use strict";
/* Convert rgb or rgbacolor to hexidecimal
 *   Used for classes:
 *       color
 *       background-color
 */
function rgbaToHex(rgbaColor) {
    // Extract the individual color values from the string
    const colorValues = rgbaColor.match(/(?:\d+(\.\d+)?)/g);
    // Ensure the color string is valid
    if (!colorValues || (colorValues.length !== 3 && colorValues.length !== 4)) {
        throw new Error('Invalid RGBA color format. Expected format: "rgba(r, g, b, a)"');
    }
    // Convert each color value to its hexadecimal representation
    const hexValues = colorValues.slice(0, 3).map((value) => {
        const intValue = parseFloat(value);
        if (intValue < 0 || intValue > 255) {
            throw new Error("RGB values must be in the range of 0 to 255.");
        }
        const hex = Math.round(intValue).toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
    });
    // Handle alpha value if present
    let alphaHex = "";
    if (colorValues.length === 4) {
        const alphaValue = parseFloat(colorValues[3]);
        if (alphaValue < 0 || alphaValue > 1) {
            throw new Error("Alpha value must be in the range of 0 to 1.");
        }
        alphaHex = Math.round(alphaValue * 255).toString(16);
    }
    // Combine the hexadecimal color values into the final string
    return `#${hexValues.join("")}${alphaHex}`;
}
/*
  Used for class:
    Padding
*/
function paddingToTailwindClass(cssString) {
    const paddings = cssString.split(" ");
    let paddingClass = "";
    if (paddings.length === 1) {
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
}
