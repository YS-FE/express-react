const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.config.base");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const util = require("./util");

const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    app: "./src/entry-server.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "entry-server.js",
    libraryTarget: "commonjs2"
  },
  target: "node",
  module: {
    rules: util.styleLoaders({
        sourceMap: true,
        usePostCSS: true,
        extract: true
      })
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.REACT_ENV": JSON.stringify("server")
    }),
    new ExtractTextPlugin({
      filename: "static/css/[name].[contenthash].css"
    })
  ]
});

module.exports = webpackConfig;
