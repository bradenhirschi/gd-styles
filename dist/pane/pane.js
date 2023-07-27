"use strict";
chrome.runtime.onMessage.addListener((req, rec, res) => {
    if (req.request === "sendtopane") {
        buildUI(req.classList);
    }
});
const buildUI = (data) => {
    var stylesBox = document.getElementById("styles");
    if (stylesBox) {
        stylesBox.textContent += data;
    }
};
