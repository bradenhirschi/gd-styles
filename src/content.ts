let targetElement: HTMLElement;

let propertiesToDisplay = [
  "background-color",
  "border",
  "border-radius",
  "color",
  "font-size",
  "font-weight",
  "padding",
];

// This receiver is added as a listener to accept the "getstyles" message from eventPage.ts
const receiver = (message: any, sender: any, sendResponse: any) => {
  if (message.type === "getstyles") {
    parseElement(targetElement);
  }
};
chrome.runtime.onMessage.addListener(receiver);

// Listen to mouse events once DOM is loaded
window.addEventListener("DOMContentLoaded", (event) => {
  document.addEventListener(
    "mousedown",
    (event) => {
      // When the user right clicks to open the context menu, this captures the element they clicked on
      targetElement = event.target as HTMLElement;
    },
    false
  );
});

// This function gets the CSSStyleDeclaration from the targetElement, then gets the Tailwind styles from various conversion functions, then passes the styles to the pane via message
const parseElement = (element: HTMLElement) => {
  const nodeName = element.nodeName;
  const styles = getComputedStyle(element);

  const classList = propertiesToDisplay
    .map((property) => {
      switch (property) {
        case "background-color":
          return backgroundColorToTailwind(styles.backgroundColor);
        case "border":
          return borderToTailwind(styles.border);
        case "border-radius":
          return borderRadiusToTailwind(styles.borderRadius);
        case "color":
          return colorToTailwind(styles.color);
        case "font-size":
          return fontSizeToTailwind(styles.fontSize);
        case "font-weight":
          return fontWeightToTailwind(styles.fontWeight);
        case "padding":
          return paddingToTailwind(styles.padding);
        default:
          return property + " " + styles.getPropertyValue(property);
      }
    })
    .join(" ");

  const stylesList = propertiesToDisplay
    .map((property) => {
      return `${property}:${styles.getPropertyValue(property)}`;
    })
    .join(";");

  let message = {
    request: "sendtopane",
    classList: classList,
    stylesList: stylesList,
    nodeName: nodeName,
  };
  chrome.runtime.sendMessage(message);
};
