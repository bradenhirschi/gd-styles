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
  let tag = targetElemt.tagName.toLowerCase();
  let idValue = targetElemt.id;
  let idPattern = `//*[@id='${idValue}']`;
  let count = getCountOfXPath(idPattern);
  if (count == 1) {
    idPattern = `//${tag}[@id='${idValue}']`;
    console.log(idPattern);
  } else {
    console.log("Duplicate");
  }
  let attributes = targetElemt.attributes;
  addAllXPathAttributes(attributes, tag);
};

const addAllXPathAttributes = (attributes, tagName) => {
  console.log(attributes);
  console.log(tagName);

  Array.prototype.slice.call(attributes).forEach((element) => {
    //console.log(element);
    temp = `//${tagName}[@${element.name}='${element.value}']`;
    let count = getCountOfXPath(temp);
    if (count == 1) {
      console.log(temp);
    } else {
      // console.log("Duplicate");
    }
  });
};

const getCountOfXPath = (xpath) => {
  let count = document.evaluate(
    `count(${xpath})`,
    document,
    null,
    XPathResult.ANY_TYPE,
    null
  ).numberValue;
  console.log("Count of the xpath is : " + count);
  return count;
};
