const path = require("path");

module.exports = {
  mode: "development",
  entry: "./popup.tsx", // Use TypeScript entry point
  output: {
    filename: "popup.bundle.js",
    path: path.resolve(__dirname, "../../dist"), // Output location
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"], // Resolve these extensions
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Process .ts and .tsx files
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.json",
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "src/react-page"), // Only process CSS in React directory
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
};
