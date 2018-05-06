const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const noop = require('noop-webpack-plugin')
const path = require('path')
const fs = require('fs')

const { ANALYZE } = process.env

const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

const packageJSON = JSON.parse(
  fs.readFileSync(
    path.join('.', 'package.json')
  )
)

const PUBLIC_URL = (
  isProd
  && Object.prototype.hasOwnProperty.call(packageJSON, 'homepage')
) ? packageJSON['homepage'] : undefined
const APP_TITLE = (
  Object.prototype.hasOwnProperty.call(packageJSON, 'title')
) ? packageJSON['title'] : 'My Sample App'


var webpackConfig = {
  devtool: isProd ? 'hidden-source-map' : 'cheap-module-source-map'
  , entry: {
    js: [
			'index'
		]
  }
  , output: {
    path: path.join(__dirname, 'build')
    , filename: 'bundle.js'
  }
  , module: {
    rules: [
      {
        test: /\.(jsx|js)$/
        , exclude: /(node_modules|bower_components)/
        , use: [
          {
            loader: 'babel-loader'
            , options: {
              cacheDirectory: true
            }
          }
        ],
      }
    ],
  }
  , resolve: {
    extensions: ['.js', '.jsx']
    , modules: [
      path.resolve('./app/')
      , path.resolve('./node_modules')
    ]
  }
  , plugins: [
    ANALYZE ? new BundleAnalyzerPlugin({
      analyzerMode: 'server'
      , analyzerHost: '127.0.0.1'
      , analyzerPort: 8888
      , openAnalyzer: true
    }) : noop()
    , new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
      , filename: 'common.js'
    })
    // Build the HTML file without having to include it in the app:
    , new HtmlWebpackPlugin({
      files: {
        js: ['common.js', 'bundle.js']
      }
      , title: APP_TITLE
      , template: './app/template/index.ejs'
      , chunksSortMode: 'dependency'
      , chunks: {
        main: {
          entry: ['common.js', 'bundle.js']
        }
      }
    })
    // Hot Module Replacement (HMR) plugins. They only load in development:
    , isProd ? noop() : new webpack.HotModuleReplacementPlugin()
    , isProd ? noop() : new webpack.NamedModulesPlugin()
    , isProd ? noop() : new webpack.NoEmitOnErrorsPlugin()
    // Production plugins:
    , isProd ? new webpack.optimize.ModuleConcatenationPlugin() : noop()
    , isProd ? new webpack.LoaderOptionsPlugin({
      minimize: true
      , debug: false
    }) : noop()
    , isProd ? new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
        , output: {
          comments: false
        }
      }
      , sourceMap: false
    }) : noop()
    , isProd ? new webpack.optimize.AggressiveMergingPlugin() : noop()
    , isProd ? new webpack.optimize.OccurrenceOrderPlugin : noop()
    , new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv)
        , PUBLIC_URL: JSON.stringify(PUBLIC_URL)
      }
      , APP_TITLE: JSON.stringify(APP_TITLE)

    })
  ]
  , devServer: {
    contentBase: './app'
    , noInfo: false
    , historyApiFallback: true
    , hot: true
  }
}

module.exports = webpackConfig
