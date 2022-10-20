const baseConfig = require('./webpack.base')('editor')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const outputPath = path.resolve(__dirname, '../../vue2/public')

module.exports = {
  ...baseConfig,
  devtool: false,
  entry: {
    editor: baseConfig.entry.editor
  },
  mode: 'production',
  output: {
    path: outputPath,
    filename: 'editor/js/[name].system.bundle.js',
    chunkFilename: 'editor/js/[name].[hash].bundle.js',
    libraryTarget: 'system',
  },
  // 打包为system，不往外拆分（1. 用system 的 amd 模式会与Monaco的loader冲突  2. 还没找到system合适使用 global 模式的方式）
  // 用System.set的方式，可以将global注册进去
  // externals: {
  // },
  plugins: [
    ...baseConfig.plugins,
    /** 生成供VUE调用的 systemjs 加载的designable文件 */
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './template.editor.ejs'),
      inject: false,
      chunks: 'all',
    }),
  ],
  optimization: {
    // ...baseConfig.optimization,
    minimize: true,
  },
}
