const path = require("path");
const webpack = require('webpack');
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const baseWebpackConfig = require("./webpack.config.base");
const util = require("./util");

const isProd = process.env.NODE_ENV === "production";

const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    app: "./src/entry-client.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "static/js/[name].[chunkhash:8].js",
    publicPath: "/dist/" ,
    chunkFilename: "static/js/[name].[chunkhash:8].js"
  },
  module: {
    rules: util.styleLoaders({
        sourceMap: isProd ? true : false,
        usePostCSS: true,
        extract: isProd ? true : false
      })
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.template.html",
      inject: true,
      minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			}
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    })
  ]
});

if (isProd) {
  webpackConfig.plugins.push(
    new ExtractTextPlugin({
      filename: "static/css/[name].[contenthash].css"
    }),
    new ReactLoadablePlugin({
      filename: './dist/react-loadable.json',
    })
  );
}

module.exports = webpackConfig;
