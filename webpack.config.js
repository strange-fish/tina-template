const { resolve } = require('path')
const webpack = require('webpack')
const MinaEntryPlugin = require('@tinajs/mina-entry-webpack-plugin')
const MinaRuntimePlugin = require('@tinajs/mina-runtime-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

const loaders = {
  script: 'babel-loader',
  ts: {
    loader: 'ts-loader',
    options: {
      context: __dirname,
      transpileOnly: true,
      appendTsSuffixTo: [/\.vue$/]
    }
  },
  style: {
    loader: 'postcss-loader',
    options: {
      config: {
        path: resolve('./postcss.config.js')
      }
    }
  }
}

const myStyle = [
  loaders.style,
  'sass-loader',
  {
    loader: 'sass-resources-loader',
    options: {
      resources: resolve(__dirname, './src/styles/index.scss')
    }
  }
]

module.exports = {
  context: resolve('src'),
  entry: './app.vue',
  resolve: {
    extensions: ['.ts', '.js'],
    symlinks: true
  },
  output: {
    path: resolve('dist'),
    filename: '[name]',
    publicPath: '/',
    globalObject: 'wx'
  },
  stats: {
    assets: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    modules: false,
    colors: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: [
          {
            loader: '@tinajs/mina-loader',
            options: {
              loaders,
              // 那是相当坑啊！！！！！
              languages: {
                ts: loaders.ts,
                scss: myStyle
              }
            }
          }
        ]
      },
      {
        test: /\.mina$/,
        include: /node_modules/,
        use: '@tinajs/mina-loader'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: loaders.ts
      },
      {
        test: /\.(css|wxss)$/,
        exclude: /node_modules/,
        use: loaders.style
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[hash:6].[ext]'
          }
        }
      },
      {
        test: /\.wxs$/,
        use: {
          loader: '@tinajs/wxs-loader',
          options: {
            name: 'wxs/[name].[hash:6].[ext]'
          }
        }
      },
      {
        test: /\.wxml$/,
        use: [
          {
            loader: 'relative-file-loader',
            options: {
              name: 'wxml/[name].[hash:6].[ext]'
            }
          },
          {
            loader: '@tinajs/wxml-loader',
            options: {
              raw: true,
              enforceRelativePath: true,
              root: resolve('src')
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false
    }),
    new MinaEntryPlugin(),
    new MinaRuntimePlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'common.js',
      minChunks: 2,
      minSize: 0
    },
    runtimeChunk: {
      name: 'runtime.js'
    }
  },
  mode: isProduction ? 'production' : 'none'
}
