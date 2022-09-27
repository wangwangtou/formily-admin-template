import path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
// import autoprefixer from 'autoprefixer'
//import { getThemeVariables } from 'antd/dist/theme'

const getWorkspaceAlias = () => {
  const results = {}
  return results
}

export default {
  mode: 'development',
  devtool: 'inline-source-map', // 嵌入到源文件中
  stats: {
    entrypoints: false,
    children: false,
  },
  entry: {
    playground: path.resolve(__dirname, './main'),
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].[hash].bundle.js',
    // libraryTarget: 'system', // 放到prod下
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: getWorkspaceAlias(),
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    moment: 'moment',
    antd: 'antd',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, require.resolve('css-loader')],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     plugins: () => autoprefixer(),
          //   },
          // },
          {
            loader: 'less-loader',
            options: {
              // modifyVars: getThemeVariables({
              //   dark: true, // 开启暗黑模式
              // }),
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: ['url-loader'],
      },
      {
        test: /\.html?$/,
        loader: require.resolve('file-loader'),
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },
}
