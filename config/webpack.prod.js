const merge = require("webpack-merge");
const common = require("./webpack.common");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const { entry, dist, root } = require("./paths");

module.exports = merge(common, {
  entry: [entry],
  output: {
    publicPath: "./",
  },
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin([dist], { root }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "report.html",
      openAnalyzer: false,
    }),
  ],
});
