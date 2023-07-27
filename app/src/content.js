let targetElemt = null;

// This receiver is added as a listener to accept the "getstyles" message from devtools.js
const receiver = (message, sender, sendResponse) => {
  if (message.type === "getstyles") {
    parseDOM(targetElemt);
  }
};
chrome.runtime.onMessage.addListener(receiver);

// Listen to mouse events once DOM is loaded
window.addEventListener("DOMContentLoaded", (event) => {
  document.addEventListener(
    "mousedown",
    (event) => {
      // When the user right clicks to open the context menu, this captures the element they clicked on
      targetElemt = event.target;
    },
    false
  );
});

const parseDOM = (targetElemt) => {
  let style = getComputedStyle(targetElemt);

  // parseDOM is fired from devtools.js when element is selected, it passes this message to pane.js to update the page
  let message = {
    request: "sendtodevtools",
    xpath: JSON.stringify(style),
  };
  chrome.runtime.sendMessage(message);
};
