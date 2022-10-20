const baseConfig = require('./webpack.base')()
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
  ...baseConfig,
  mode: 'production',
  devtool: false,
  entry: {
    main: baseConfig.entry.main
  },
  plugins: [
    ...baseConfig.plugins,
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'react/css/[name].[hash].css',
      chunkFilename: 'react/css/[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './template.ejs'),
      inject: 'body',
      chunks: 'all',
    }),
  ],
  optimization: {
    ...baseConfig.optimization,
    minimize: true,
  },
}
