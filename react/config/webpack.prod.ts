import baseConfig from './webpack.base'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import MonacoPlugin from 'monaco-editor-webpack-plugin'
import path from 'path'

const createPages = (pages) => {
  return pages.map(({ filename, template, chunk }) => {
    return new HtmlWebpackPlugin({
      filename,
      template,
      inject: 'body',
      chunks: chunk,
    })
  })
}

export default {
  ...baseConfig,
  mode: 'production',
  ...baseConfig.plugins,
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    ...createPages([
      {
        filename: 'index.html',
        template: path.resolve(__dirname, './template.ejs'),
        chunk: ['main'],
      },
    ]),
    new MonacoPlugin({
      languages: ['json'],
    }),
  ],
  optimization: {
    minimize: true,
  },
}
