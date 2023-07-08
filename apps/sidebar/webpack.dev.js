const path = require("path");

const {merge} = require('webpack-merge')
const commonConfig = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const devConfig = {
  entry: "./src/index.tsx",
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
  devServer: {
    port: 3001,
    historyApiFallback: {
      index: true
    },
    static: {
      directory: path.join(__dirname, "dist"),
    },
  }
};

module.exports=merge(commonConfig,devConfig)
