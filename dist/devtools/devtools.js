"use strict";
chrome.devtools.panels.elements.createSidebarPane("GD Styles", (pane) => {
    chrome.devtools.panels.elements.onSelectionChanged.addListener(() => {
        chrome.devtools.inspectedWindow.eval("parseElement($0)", {
            useContentScriptContext: true,
        });
    });
    pane.setPage("/src/pane/pane.html");
});
