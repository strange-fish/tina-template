const { resolve } = require('path')
const webpack = require('webpack')
const MinaEntryPlugin = require('@tinajs/mina-entry-webpack-plugin')
const MinaRuntimePlugin = require('@tinajs/mina-runtime-webpack-plugin')
// happypack
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const isProduction = process.env.NODE_ENV === 'production'

function createHappyPlugin (id, loaders) {
  return new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,
    // make happy more verbose with HAPPY_VERBOSE=1
    verbose: process.env.HAPPY_VERBOSE === '1'
  })
}
const BABEL_ID = 'happy-babel-js'

const loaders = {
  script: {
    loader: 'happypack/loader',
    options: {
      id: BABEL_ID
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
        include: [resolve('src')],
        exclude: /node_modules/,
        use: [
          {
            loader: '@tinajs/mina-loader',
            options: {
              loaders,
              languages: {
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
        test: /\.js$/,
        exclude: /node_modules/,
        use: loaders.script
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
  resolve: {
    symlinks: true,
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      '@': resolve('src')
    }
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false
    }),
    createHappyPlugin(BABEL_ID, ['babel-loader?cacheDirectory=true']),
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
