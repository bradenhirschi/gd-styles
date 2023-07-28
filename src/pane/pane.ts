let classList = "";
let stylesList = "";

chrome.runtime.onMessage.addListener((req, rec, res) => {
  if (req.request === "sendtopane") {
    classList = req.classList;
    stylesList = req.stylesList;
    buildUI();
  }
});

const buildUI = () => {
  let stylesBox = document.getElementById("styles")!;
  stylesBox.textContent = classList;

  let styledElement = document.getElementById("styledElement")!;
  styledElement.style.cssText = stylesList;
};
