chrome.runtime.onMessage.addListener((req, rec, res) => {
  if (req.request === "sendtodevtools") {
    buildUI(req.xpath);
  }
});

const buildUI = (data) => {
  document.write(data);
};
