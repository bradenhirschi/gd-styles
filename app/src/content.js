let targetElemt = null;
const receiver = (message, sender, sendResponse) => {
  if (message.type === "getXPath") {
    console.log(message);
    parseDOM();
  }
};

chrome.runtime.onMessage.addListener(receiver);

window.addEventListener("DOMContentLoaded", (event) => {
  init();
});

const init = () => {
  document.addEventListener(
    "mousedown",
    (event) => {
      // This logs the element clicked on!!!
      //    console.log(event.target);
      // Save this ^
      targetElemt = event.target;
    },
    false
  );
};

const parseDOM = () => {
  console.log(targetElemt);
  console.log(targetElemt.id);
  console.log(targetElemt.placeholder);
  console.log(targetElemt.type);
};
