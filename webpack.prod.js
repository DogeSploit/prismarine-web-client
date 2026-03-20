const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  resolve: {
    fallback: {
      "vm": require.resolve("vm-browserify"),
      "canvas": false // Prevents build failure from missing native canvas libs
    }
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: false, // CRITICAL: Stops memory-hungry worker processes
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new LodashModuleReplacementPlugin()
  ]
})
