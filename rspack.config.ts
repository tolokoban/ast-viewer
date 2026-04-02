import path from "path";
import { defineConfig } from "@rspack/cli";
import { HtmlRspackPlugin } from "@rspack/core";
import pkg from "./package.json";

export default defineConfig({
  entry: "./src/index.tsx",
  output: { filename: "[name].[contenthash].js", clean: true },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs"],
    alias: { "@": path.resolve(__dirname, "src") },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: { syntax: "typescript", tsx: true },
              transform: { react: { runtime: "automatic" } },
            },
          },
        },
      },
      { test: /\.module\.css$/, type: "css/module" },
      {
        test: /\.wasm$/,
        type: "asset/resource",
        resourceQuery: /url/,
      },
    ],
  },
  plugins: [
    new HtmlRspackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    port: pkg.port,
    hot: true,
    open: true,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "credentialless",
    },
  },
  devtool: process.env.NODE_ENV === "production" ? false : "source-map",
  experiments: { css: true },
});
