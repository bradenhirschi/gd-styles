"use strict";
let targetElement;
let propertiesToDisplay = ["color", "background-color"];
// This receiver is added as a listener to accept the "getstyles" message from devtools.js
const receiver = (message, sender, sendResponse) => {
    if (message.type === "getstyles") {
        parseElement(targetElement);
    }
};
chrome.runtime.onMessage.addListener(receiver);
// Listen to mouse events once DOM is loaded
window.addEventListener("DOMContentLoaded", (event) => {
    document.addEventListener("mousedown", (event) => {
        // When the user right clicks to open the context menu, this captures the element they clicked on
        targetElement = event.target;
    }, false);
});
// This function gets the CSSStyleDeclaration from the targetElement, then gets the Tailwind styles from convertCssToTailwind, then passes the styles to the pane via message
const parseElement = (element) => {
    const styles = getComputedStyle(element);
    const classList = propertiesToDisplay
        .map((property) => {
        switch (property) {
            case "color":
                if (styles.color !== "rgb(0, 0, 0)") {
                    return `text-[${rgbaToHex(styles.color)}]`;
                }
                break;
            case "background-color":
                if (styles.backgroundColor !== "rgba(0, 0, 0, 0)") {
                    return `bg-[${rgbaToHex(styles.backgroundColor)}]`;
                }
                break;
        }
    })
        .join(" ");
    let message = {
        request: "sendtopane",
        classList: classList,
    };
    chrome.runtime.sendMessage(message);
};
// Convert rgb color to hexidecimal
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
