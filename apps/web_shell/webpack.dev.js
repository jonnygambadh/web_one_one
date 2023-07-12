const path = require("path");

const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const devConfig = {
  entry: "./src/index.tsx",
  mode: "development",
  plugins: [
    new ModuleFederationPlugin({
      name: "web-shell",
      remotes: {
        sidebar: "sidebar@http://localhost:3002/remoteEntry.js",
      },
      shared: {
        react: {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
  devServer: {
    port: 3000,
    historyApiFallback: {
      index: true,
    },
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
};

module.exports = merge(commonConfig, devConfig);
