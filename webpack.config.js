const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const config = {
  entry: {
    index: "./src/index.ts",
    // content: "./src/content.ts",
    conversions: "./src/conversions.ts",
    utilities: "./src/utilities.ts",
    popup: "./src/popup/popup.ts",
    eventPage: "./src/eventPage.ts",
    pane: "./src/devtools/pane.ts",
    devtools: "./src/devtools/devtools.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/popup/popup.html",
      filename: "popup.html",
      chunks: ["popup"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/devtools/pane.html",
      filename: "pane.html",
      chunks: ["pane"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/devtools/devtools.html",
      filename: "devtools.html",
      chunks: ["devtools"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader", // Use MiniCssExtractPlugin for production
          "css-loader",
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  devtool: "source-map",
  externals: {
    chrome: 'chrome'
  },
};

module.exports = () => {
  config.mode = isProduction ? "production" : "development";
  return config;
};
