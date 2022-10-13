import path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
// import autoprefixer from 'autoprefixer'
//import { getThemeVariables } from 'antd/dist/theme'

const getWorkspaceAlias = () => {
  const results = {
    '@': path.resolve(__dirname, '../src'),
    'formily': path.resolve(__dirname, '../../formily')
  }
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
    main: path.resolve(__dirname, '../src/main'),
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].[hash].bundle.js',
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
        exclude: /\.module\.less$/,
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
        test: /\.module\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
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
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg|gif|png)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: [path.resolve(__dirname, '../src/icons')],
        use: ['url-loader'],
      },
      {
        test: /\.svg$/,
        include: [path.resolve(__dirname, '../src/icons')],
        loader: require.resolve('svg-sprite-loader'),
        // use: ['svg-sprite-loader'],
        options: {
          symbolId: 'icon-[name]'
        }
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
