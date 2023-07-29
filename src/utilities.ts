/*
 * These are helper functions that are used in multiple functions within conversions.ts. Each one should have a brief
 * description of its functionality as well as a list of the functions within conversions.ts which call it
 */

/*
 * Convert rgb or rgbacolor to hexidecimal
 *
 * color
 * background-color
 */
const rgbaToHex = (rgbaColor: string) => {
  // Extract the individual color values from the string
  const colorValues = rgbaColor.match(/(?:\d+(\.\d+)?)/g);

  // Ensure the color string is valid
  if (!colorValues || (colorValues.length !== 3 && colorValues.length !== 4)) {
    throw new Error(
      'Invalid RGBA color format. Expected format: "rgba(r, g, b, a)"'
    );
  }

  // Convert each color value to its hexadecimal representation
  const hexValues = colorValues.slice(0, 3).map((value) => {
    const intValue = parseFloat(value);
    if (intValue < 0 || intValue > 255) {
      throw new Error("RGB values must be in the range of 0 to 255.");
    }
    const hex = Math.round(intValue).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  });

  // Handle alpha (the 'a' in rgba) value if present
  let alphaHex = "";
  if (colorValues.length === 4) {
    const alphaValue = parseFloat(colorValues[3]);
    if (alphaValue < 0 || alphaValue > 1) {
      throw new Error("Alpha value must be in the range of 0 to 1.");
    }
    alphaHex = Math.round(alphaValue * 255).toString(16);
  }

  // Combine the hexadecimal color values into the final string
  return `#${hexValues.join("")}${alphaHex}`;
};
