let classList = "";
let stylesList = "";
let nodeName = "";

document.addEventListener(
  "DOMContentLoaded",
  function () {
    document!
      .querySelector("#copy-button")!
      .addEventListener("click", copyStyles, false);
  },
  false
);

chrome.runtime.onMessage.addListener((req, rec, res) => {
  if (req.request === "sendtopane") {
    classList = req.classList;
    stylesList = req.stylesList;
    nodeName = req.nodeName;
    buildUI();
  }
});

const buildUI = () => {
  let elementTypeDiv = document.getElementById("element-type");
  elementTypeDiv!.textContent = nodeName.toLowerCase();

  let stylesBox = document.getElementById("styles")!;
  stylesBox.textContent = classList;

  let styledElement = document.getElementById("styled-element")!;
  styledElement.textContent = "Lorem Ipsum";
  styledElement.style.cssText = stylesList;
};

const copyStyles = () => {
  // display some kind of 'Copied!' message in the pane

  const message = {
    type: "copy",
    data: classList,
  };

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    if (activeTab) {
      chrome.tabs.sendMessage(activeTab!.id!, message);
    }
  });
};
