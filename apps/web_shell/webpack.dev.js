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
      name: "host",
      remotes: {
        sidebar: "sidebar@http://localhost:3001/remoteEntry.js",
        reviews: "reviews@http://localhost:3003/remoteEntry.js",
        host: "host@http://localhost:3000/remoteEntry.js",
      },
      exposes: {
        "./sdk": "./src/providers/sdkProvider",
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
