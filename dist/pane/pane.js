"use strict";
let classList = "";
chrome.runtime.onMessage.addListener((req, rec, res) => {
    if (req.request === "sendtopane") {
        classList = req.classList;
        buildUI();
    }
});
const buildUI = () => {
    let stylesBox = document.getElementById("styles");
    if (stylesBox) {
        stylesBox.textContent += classList;
    }
};
const copyButton = document.getElementById("copyButton");
if (copyButton) {
    copyButton.addEventListener("click", () => {
        chrome.tabs.sendMessage(0, {
            message: "copyText",
            textToCopy: "some text",
        });
    });
}
