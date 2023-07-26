let targetElemt = null;
let XPATHDATA = [];

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
  let attributes = targetElemt.attributes;
  addAllXPathAttributes(attributes, tag, targetElemt);
  getTextXPath(targetElemt);
  console.log(XPATHDATA);
  XPATHDATA = [];
};

// Add attributes to XPATHDATA
const addAllXPathAttributes = (attributes, tagName, targetElemt) => {
  Array.prototype.slice.call(attributes).forEach((element) => {
    switch (element.name) {
      case "id":
        getUniqueId(element, tagName);
        break;
      case "name":
        getUniqueName(element, tagName);
        break;
      case "className":
        getUniqueClassName(element, tagName);
        break;
      default:
        if (element.value != "") {
          attributeBasedXPath(element, tagName);
        }
        break;
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
  return count;
};

// id
const getUniqueId = (element, tag) => {
  let value = element.id;
  let idPattern = `//*[@id='${value}']`;
  let count = getCountOfXPath(idPattern);
  if (count == 1) {
    XPATHDATA.push(["unique id: ", value]);
  }
};

// name
const getUniqueName = (element, tag) => {
  let value = element.name;
  let namePattern = `//*[@name='${value}']`;
  let count = getCountOfXPath(namePattern);
  if (count == 1) {
    XPATHDATA.push(["unique name: ", value]);
  }
};

// className
const getUniqueClassName = (element, tag) => {
  let value = element.className;
  let classNamePattern = `//*[@class='${value}']`;
  let count = getCountOfXPath(namePattern);
  if (count == 1) {
    XPATHDATA.push(["unique className: ", value]);
  }
};

// tag
const getUniqueTag = (element, tag) => {
  let count = document.getElementsByTagName(tag).length;
  if (count == 1) {
    XPATHDATA.push(["unique tag name: ", tag]);
  }
};

// link
const getUniqueLink = (element, tag) => {};

// Attribute based XPath
const attributeBasedXPath = (element, tag) => {
  let temp = `//${tag}[@${element.name}='${element.value}']`;
  let count = getCountOfXPath(temp);
  if (count == 1) {
    XPATHDATA.push(["attributes based XPath: ", temp]);
  }
};
