const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

let env = "dev";
let isProd = false;
let prodPlugins = [];
if (process.env.NODE_ENV === "production") {
  env = "prod";
  isProd = true;
  prodPlugins = [
    new UglifyJsPlugin({sourceMap: true}),
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    })
  ];
}

const baseWebpackConfig = {
  devtool: isProd ? "#source-map" : "#cheap-module-source-map",
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: ["babel-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/img/[name].[hash:7].[ext]"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: "static/fonts/[name].[hash:7].[ext]"
        }
      }, 
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": require("./" + env + ".env")
    }),
    ...prodPlugins
  ]
}

module.exports = baseWebpackConfig;
