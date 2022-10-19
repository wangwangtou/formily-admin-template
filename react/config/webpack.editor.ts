import baseConfig from './webpack.base'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import MonacoPlugin from 'monaco-editor-webpack-plugin'
import path from 'path'

export default {
  ...baseConfig,
  entry: {
    editor: baseConfig.entry.editor
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../../vue2/public'),
    filename: 'editor/[name].system.bundle.js',
    libraryTarget: 'system'
  },
  // 打包为system，不往外拆分（1. 用system 的 amd 模式会与Monaco的loader冲突  2. 还没找到system合适使用 global 模式的方式）
  externals: {
  },
  plugins: [
    ...baseConfig.plugins,
    new MiniCssExtractPlugin({
      filename: 'editor/[name].system.css',
      chunkFilename: '[id].[hash].css',
    }),
    /** 生成供VUE调用的 systemjs 加载的designable文件 */
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './template.editor.ejs'),
      inject: false,
      chunks: 'editor',
    }),
    new MonacoPlugin({
      languages: ['json'],
      filename: 'editor/[name].worker.js'
    }),
  ],
  optimization: {
    minimize: true,
  },
}
