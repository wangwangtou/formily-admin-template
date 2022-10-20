const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const MonacoPlugin = require('monaco-editor-webpack-plugin')
const webpack = require('webpack')

// 如果直接用 webpack.*.ts 来进行配置，运行 webpack 时，会加载 tsconfig.json 来运行， 这是需要配置 module 为 commonjs 才能正常运行
// tsconfig.json 中 module: commonjs 在build时对 lazy import 不支持  split chunks， 需要改用 module: esnext
// 所以将webpack配置重新改为js

// 与vue共用的mock代码，设置一下VUE_APP_BASE_API
process.env.REACT_APP_BASE_API = '/formily-admin-template' 

const getWorkspaceAlias = () => {
  const results = {
    '@': path.resolve(__dirname, '../src'),
    'formily': path.resolve(__dirname, '../../formily'),
    // './node_modules/@designable/formily-antd/esm/components/Field/shared.js$': path.resolve(__dirname, '../src/designable/field_shared'),
  }
  return results
}

const replaceModulePlugin = {
  apply: (compiler) => {
    const pluginName = 'replaceModule'
    compiler.hooks.normalModuleFactory.tap(
      pluginName,
      (nmf) => {
        nmf.hooks.beforeResolve.tap(
          pluginName,
          mod => {
            const path1 = '@designable/formily-antd'
            const path2 = path1.replace(/\//g, '\\')
            const path3 = '@designable/formily-antd/esm/components/Field/shared'
            const path4 = path3.replace(/\//g, '\\')
            // if (mod.request.indexOf('formily-antd') >= 0) {
            //   debugger
            // }
            if ((
              (mod.context.indexOf(path1) >= 0 || mod.context.indexOf(path2) >= 0)
              && (
                path.resolve(mod.context, mod.request).indexOf(path3) >= 0
                || path.resolve(mod.context, mod.request).indexOf(path4) >= 0
                )
            ) || mod.request.indexOf(path3) == 0 || mod.request.indexOf(path4) == 0) {
              // console.log(mod)
              mod.request = path.resolve(__dirname, '../src/designable/field_shared')
            }
          }
        )
      }
    )
  }
}

const miniCssExtractLoader = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: '../../'
  }
}

module.exports = function (targetDir){
  targetDir = targetDir || 'react'
  return {
    mode: 'development',
    devtool: 'inline-source-map', // 嵌入到源文件中
    stats: {
      entrypoints: false,
      children: false,
    },
    entry: {
      main: path.resolve(__dirname, '../src/main'),
      editor: path.resolve(__dirname, '../src/editor'),
    },
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: targetDir + '/js/[name].[hash].bundle.js',
      chunkFilename: targetDir + '/js/[name].[hash].bundle.js',
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
          use: [miniCssExtractLoader, require.resolve('css-loader')],
        },
        {
          test: /\.less$/,
          exclude: /\.module\.less$/,
          use: [
            miniCssExtractLoader,
            { loader: 'css-loader' },
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
            miniCssExtractLoader,
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
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 20480,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    name: targetDir + '/res/[name].[hash:8].[ext]',
                  }
                }
              }
            },
            // 'url-loader?limit=20480'
          ]
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
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          reactDesignable: {
            name: 'chunk-react-designable',
            test: /[\\/]node_modules[\\/]_?@designable(.*)/, // can customize your rules
            priority: 21,
          },
          designable: {
            name: 'chunk-designable',
            test: path.resolve(__dirname, '../src/designable'), // can customize your rules
            priority: 9,
          },
          commons: {
            name: 'chunk-commons',
            test: path.resolve(__dirname, '../src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      }
    },
    plugins: [
      replaceModulePlugin,
      new webpack.DefinePlugin({
        ...Object.keys(process.env).filter(key => key.indexOf('REACT_APP_') == 0).reduce((pre, key) => {
          pre['process.env.' + key] = `'${process.env[key]}'`
          return pre
        }, {})
      }),
      new MiniCssExtractPlugin({
        filename: targetDir + '/css/[name].[hash].css',
        chunkFilename: targetDir + '/css/[id].[hash].css',
      }),
      new MonacoPlugin({
        languages: ['json'],
        filename: 'react/wjs/[name].worker.js'
      }),
    ]
  }
}
