chrome.runtime.onMessage.addListener((req, rec, res) => {
  if (req.request === "sendtopane") {
    buildUI(req.styles);
  }
});

const buildUI = (data) => {
  document.write(data);
};
