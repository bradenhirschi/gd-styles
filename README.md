# GD Styles
**This is a work in progress and more supported CSS properties and other features are still being added**

## CSS properties currently supported:
***
- Color
- Background color
- Padding
- Border
- Border radius

## General flow of things within the extension
***
1. devtools/devtools.js creates sidebar pane with pane/pane.html as its contents
2. Element selected and parseElement triggered
   - eventPage.js creates context menu. On menu click it sends a message to content.js to trigger parseElement. content.js has a listener that tracked where the mouse touched down to open the context menu, it uses this to determine which element to parse
   - element can also be selected from DevTools elements panel. devtools/devtools.js runs parseElement on the selected element every time the selection is changed
3. In content.js, parseElement parses the element into the styles to be displayed to the user by making calls to various functions in conversions.js, some of which in turn call helper functions in utilities.js
4. In content.js, parseElement sends styles to be displayed as a message to pane.js, which in turn renders them in pane.html
