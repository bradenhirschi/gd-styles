chrome.runtime.onMessage.addListener((req, rec, res) => {
  if (req.request === "sendtopane") {
    buildUI(req.classList);
  }
});

const buildUI = (data: any) => {
  var stylesBox = document.getElementById("styles")!;

  if (stylesBox) {
    stylesBox.textContent += data;
  }
};
