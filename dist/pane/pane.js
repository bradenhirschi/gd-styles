"use strict";
let classList = "";
let stylesList = "";
let nodeName = "";
chrome.runtime.onMessage.addListener((req, rec, res) => {
    if (req.request === "sendtopane") {
        classList = req.classList;
        stylesList = req.stylesList;
        nodeName = req.nodeName;
        buildUI();
    }
});
const buildUI = () => {
    /*
    Uncomment this to display element type above styles
    let elementTypeDiv = document.getElementById("element-type");
    elementTypeDiv!.textContent = nodeName.toLowerCase();
    */
    let stylesBox = document.getElementById("styles");
    stylesBox.textContent = classList;
    let styledElement = document.getElementById("styled-element");
    styledElement.textContent = "Lorem Ipsum";
    styledElement.style.cssText = stylesList;
};
