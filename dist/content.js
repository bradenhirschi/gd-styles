"use strict";
let targetElement;
let propertiesToDisplay = [
    "color",
    "background-color",
    "padding",
    "border",
    "border-radius",
];
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
            case "padding":
                if (styles.padding) {
                    return paddingToTailwindClass(styles.padding);
                }
            default:
                return property + " " + styles.getPropertyValue(property);
        }
    })
        .join(" ");
    const stylesList = propertiesToDisplay
        .map((property) => {
        return `${property}:${styles.getPropertyValue(property)}`;
    })
        .join(";");
    let message = {
        request: "sendtopane",
        classList: classList,
        stylesList: stylesList,
    };
    chrome.runtime.sendMessage(message);
};
