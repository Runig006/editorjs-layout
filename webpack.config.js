module.exports = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  output: {
    filename: "index.js",
    library: "EditorJSLayout",
    libraryTarget: "umd",
  },
  optimization: {
    minimize: true,
  },
};
