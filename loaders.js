const { resolve } = require('path')
const sass = require('sass').default

const babelLoader = ['cache-loader', 'babel-loader?cacheDirectory=true']

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
  {
    loader: 'sass-loader',
    options: {
      implementation: sass
    }
  },
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
