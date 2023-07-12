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
      name: "sidebar",
      filename: "remoteEntry.js",
      exposes: {
        "./Main": "./src/bootstrap",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: "^17.0.2",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^17.0.2",
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
  devServer: {
    port: 3001,
    historyApiFallback: {
      index: true,
    },
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
};

module.exports = merge(commonConfig, devConfig);
