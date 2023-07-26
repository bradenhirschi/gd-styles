chrome.devtools.panels.elements.createSidebarPane("GD Styles", (pane) => {
  chrome.devtools.panels.elements.onSelectionChanged.addListener(() => {
    // pane.setExpression(`$0.attributes`);
    chrome.devtools.inspectedWindow.eval("parseDOM($0)", {
      useContentScriptContext: true,
    });
  });
});
