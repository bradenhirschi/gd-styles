"use strict";
let targetElement;
const propertiesToDisplay = [
    "color",
    "font-family",
    "font-size",
    "padding",
    "margin",
    "border",
    "background",
    "width",
    "height",
    "display",
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
// This function gets the CSSStyleDeclaration from the targetElement, then pulls out the
const parseElement = (element) => {
    let style = getComputedStyle(element);
    const targetElementProperties = [];
    propertiesToDisplay.forEach((property) => {
        const value = style.getPropertyValue(property);
        if (value) {
            targetElementProperties.push({ property, value });
        }
    });
    let message = {
        request: "sendtopane",
        styles: targetElementProperties,
    };
    chrome.runtime.sendMessage(message);
};
