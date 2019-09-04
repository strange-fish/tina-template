const { resolve } = require('path')

const babelLoader = 'babel-loader?cacheDirectory=true'

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    config: {
      path: resolve('./postcss.config.js')
    }
  }
}

const scssLoader = [
  postCssLoader,
  'sass-loader',
  {
    loader: 'sass-resources-loader',
    options: {
      resources: resolve(__dirname, './src/styles/index.scss')
    }
  }
]

const lessLoader = [
  postCssLoader,
  'less-loader'
]

module.exports = {
  postCssLoader,
  lessLoader,
  scssLoader,
  babelLoader
}
