const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const noop = require('noop-webpack-plugin')
const path = require('path')
const fs = require('fs')
const url = require('url')

const { ANALYZE } = process.env

const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

const packageJSON = JSON.parse(
  fs.readFileSync(
    path.join('.', 'package.json')
  )
)

<<<<<<< HEAD
const postCSSplugins = function() {
  return [
    require('autoprefixer')({ browsers: 'last 3 versions' })
    , require('postcss-easings')
    , require('css-mqpacker')
    , require('postcss-clearfix')
  ]
}

const PUBLIC_URL = process.env.PUBLIC_URL || (
=======
const PUBLIC_URL = (
>>>>>>> 8a659681389706c6dff63000cdaac6e8f1d4b6b6
  isProd
  && Object.prototype.hasOwnProperty.call(packageJSON, 'homepage')
) ? packageJSON['homepage'] : undefined
const APP_TITLE = (
  Object.prototype.hasOwnProperty.call(packageJSON, 'title')
) ? packageJSON['title'] : 'My Sample App'
const publicPath = PUBLIC_URL ? url.parse(PUBLIC_URL).pathname : ''

const postCSSplugins = function() {
  return [
    require('autoprefixer')({ browsers: 'last 3 versions' })
    , require('postcss-easings')
    , require('css-mqpacker')
    , require('postcss-clearfix')
  ]
}

var webpackConfig = {
  devtool: isProd ? 'hidden-source-map' : 'cheap-module-source-map'
  , entry: {
    js: [
			'stylesheets/global.scss'
			, 'index'
		]
  }
  , mode: isProd ? 'production' : 'development'
  , output: {
    path: path.join(__dirname, 'build')
    , filename: 'bundle.js'
    , publicPath
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
      /*
				Loader code for .css files. We use style-loader in
				development to get HMR support. In production, we use
				ExtractTextPlugin to get a pre-built CSS file.
			*/
      , {
        test: /\.css$/
        , use: ['extracted-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader'
          , use: [
            'css-loader'
            , {
              loader: 'postcss-loader'
              , options: {
                plugins: postCSSplugins
              }
            }
          ]
        }))
      }
      /*
				SASS loader code for the module files (in
				app/stylesheets/components). These are intended to be
				styles for individual React components, which will have a
				unique name space.

				As above (with the CSS loader), we use style-loader for
				HMR support in development and switch to ExtractTextPlugin
				for production.
			*/
      , {
        test: /\.scss$/
        , exclude: /global\.scss$/
        , use: ['extracted-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader'
          , use: [
            {
              loader: 'css-loader'
              , options: {
                modules: true
                , importLoaders: 1
                , localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            }
            , {
              loader: 'postcss-loader'
              , options: {
                plugins: postCSSplugins
              }
            }
            , 'sass-loader'
          ]
        }))
      }
      /*
				Loader code for a universal SCSS file. These styles will
				be (as long as you remember to import them into
				app/index.js) loaded for every component and are not
				uniquely namespaced as the module SCSS code above is.

				This file lives in app/stylesheets/global.scss. As above,
				we use style-loader for HMR in development and
				ExtractTextPlugin in production.
			*/
      , {
        test: /\.scss$/
        , include: /global\.scss$/
        , use: ['extracted-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader'
          , use: [
            'css-loader'
            , {
              loader: 'postcss-loader'
              , options: {
                plugins: postCSSplugins
              }
            }
            , 'sass-loader'
          ]
        }))
      }
    ]
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
    , new ExtractTextPlugin({
      filename: 'style.css'
      , allChunks: true
    })
    // Build the HTML file without having to include it in the app:
    , new HtmlWebpackPlugin({
      files: {
        css: isProd ? ['style.css'] : []
        , js: ['common.js', 'bundle.js']
      }
      , title: APP_TITLE
      , template: './app/template/index.ejs'
      , chunksSortMode: 'dependency'
      , chunks: {
        head: {
          css: isProd ? ['style.css'] : []
        }
        , main: {
          entry: ['common.js', 'bundle.js']
        }
      }
    })
    // Hot Module Replacement (HMR) plugins. They only load in development:
    , isProd ? noop() : new webpack.HotModuleReplacementPlugin()
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
    , new ExtractTextPlugin({
      filename: 'style.css'
      , allChunks: true
    })
    , isProd ? new webpack.optimize.AggressiveMergingPlugin() : noop()
    , isProd ? new webpack.optimize.OccurrenceOrderPlugin : noop()
    , new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv)
        , PUBLIC_URL: JSON.stringify(PUBLIC_URL)
      }
      , APP_TITLE: JSON.stringify(APP_TITLE)

    })
    // Loader option plugin for SASS and PostCSS:
    , new webpack.LoaderOptionsPlugin({
      test: /\.s{0,1}css$/
      , options: {
        context: __dirname
        , sassLoader: {
          includePaths: [
            './node_modules'
            , './bower_components'
            , './app/stylesheets'
          ]
        }
      }
    })
  ]
  , optimization: {
    splitChunks: {
      name: 'common',
      minChunks: 2
    }
    , noEmitOnErrors: !isProd
    , concatenateModules: isProd
    , namedModules: !isProd
  }
  , devServer: {
    contentBase: './app'
    , noInfo: false
    , historyApiFallback: true
    , hot: true
  }
}

module.exports = webpackConfig
