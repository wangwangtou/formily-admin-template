const baseConfig = require('./webpack.base')()
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//import { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const webpack = require('webpack')
const path = require('path')
const mockServer = require('../../mock/mock-server')

const PORT = 3000

for (const key in baseConfig.entry) {
  if (Array.isArray(baseConfig.entry[key])) {
    baseConfig.entry[key].push(
      require.resolve('webpack/hot/dev-server'),
      `${require.resolve('webpack-dev-server/client')}?http://localhost:${PORT}`
    )
  }
}

module.exports = {
  ...baseConfig,
  // devtool: false,
  entry: {
    main: baseConfig.entry.main,
  },
  plugins: [
    ...baseConfig.plugins,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './template.ejs'),
      inject: 'body',
      chunks: 'all',
    }),
    new webpack.HotModuleReplacementPlugin()
    // new BundleAnalyzerPlugin()
  ],
  devServer: {
    host: '127.0.0.1',
    open: true,
    port: PORT,
    overlay: {
      warnings: false,
      errors: true
    },
    before: mockServer,
  },
}
