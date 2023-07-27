chrome.contextMenus.create({
  id: "GD Styles",
  title: "Get Tailwind styles",
  contexts: ["all"],
});

const getXPath = (info, tab) => {
  let msg = {
    type: "getXPath",
  };
  chrome.tabs.sendMessage(tab.id, msg, () => {
    console.log("Message sent");
  });
};

chrome.contextMenus.onClicked.addListener((info, tab) => {
  /*
  This doesn't work, see https://developer.chrome.com/docs/extensions/migrating/to-service-workers/
  alert(info);
  */
  getXPath(info, tab);
});
