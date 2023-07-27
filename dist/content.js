"use strict";
let targetElement;
// There's probably a good way to combine propertiesToDisplay and tailwindClassMap into the sama data structure
const propertiesToDisplay = ["color", "background-color"];
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
    let style = getComputedStyle(element);
    const targetElementProperties = [];
    propertiesToDisplay.forEach((property) => {
        const value = style.getPropertyValue(property);
        if (value) {
            targetElementProperties.push({ property: property, value: value });
        }
    });
    const tailwindStyles = convertCssToTailwind(targetElementProperties);
    let message = {
        request: "sendtopane",
        classList: tailwindStyles + style.backgroundColor,
    };
    chrome.runtime.sendMessage(message);
};
// Takes in an array of CSS property names and values and returns a Tailwind class list for the styles
const convertCssToTailwind = (properties) => {
    const tailwindClassListString = properties
        .map(({ property, value }) => {
        switch (property) {
            case "color":
                return `text-[${rgbToHex(value)}]`;
            case "background-color":
                break;
        }
    })
        .join(" ");
    return tailwindClassListString;
};
// Convert rgb color to hexidecimal
function rgbToHex(rgbColor) {
    // Extract the individual color values from the string
    const colorValues = rgbColor.match(/\d+/g);
    // Ensure the color string is valid
    if (!colorValues || colorValues.length !== 3) {
        throw new Error('Invalid RGB color format. Expected format: "rgb(r, g, b)"');
    }
    // Convert each color value to its hexadecimal representation
    const hexValues = colorValues.map((value) => {
        const intValue = parseInt(value, 10);
        const hex = intValue.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
    });
    // Combine the hexadecimal color values into the final string
    return `#${hexValues.join("")}`;
}
