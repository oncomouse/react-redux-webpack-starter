const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const noop = require('noop-webpack-plugin')
const path = require('path')
<<<<<<< HEAD

/* Set APP_TITLE to the title of your application.
   You can install and change this variable using react-helmet, if you need.*/
=======
const fs = require('fs')

/* Set APP_TITLE to the title of your application.
   You can install and change this variable using react-helmet, if you need.
 */
>>>>>>> 3d427d6b473eaede6fb92f2f59fa9c95fcd8bd8b
const APP_TITLE = 'My Sample App'
const { ANALYZE } = process.env

const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'
<<<<<<< HEAD
=======

const packageJSON = JSON.parse(
  fs.readFileSync(
    path.join('.', 'package.json')
  )
)

const publicUrl = (
  isProd
  && Object.prototype.hasOwnProperty.call(packageJSON, 'homepage')
) ? packageJSON['homepage'] : undefined
>>>>>>> 3d427d6b473eaede6fb92f2f59fa9c95fcd8bd8b

const postCSSplugins = function() {
  return [
    require('autoprefixer')({ browsers: 'last 3 versions' })
    , require('postcss-easings')
    , require('css-mqpacker')
    , require('postcss-clearfix')
  ]
}

var webpackConfig = {
  devtool: isProd ? 'hidden-source-map' : 'eval'
  , entry: {
    js: isProd ? ['index'] : [
      'react-hot-loader/patch'
      , 'stylesheets/global.scss'
      , 'index'
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
<<<<<<< HEAD
            },

          }
        ],

=======
            }
          }
        ],

>>>>>>> 3d427d6b473eaede6fb92f2f59fa9c95fcd8bd8b
      }
      /*
				Loader code for .css files. We use style-loader in
				development to get HMR support. In production, we use
				ExtractTextPlugin to get a pre-built CSS file.
			*/
      , {
        test: /\.css$/
        , use: isProd ? ExtractTextPlugin.extract({
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
        }) : [
          'style-loader'
          , 'css-loader'
          , {
            loader: 'postcss-loader'
            , options: {
              plugins: postCSSplugins
            }
          }
        ]
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
        , use: isProd ? ExtractTextPlugin.extract({
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
        }) : [
          'style-loader'
          , {
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
        // Include everything in style.css
        , use: isProd ? ExtractTextPlugin.extract({
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
        }) : [
          'style-loader'
          , 'css-loader'
          , {
            loader: 'postcss-loader'
            , options: {
              plugins: postCSSplugins
            }
          }
          , 'sass-loader'
        ]
      }
      /*
				Webfont loaders for Bootsrap and the like.
			*/
      , { test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff' } }] }
      , { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'url-loader', options: { limit: 10000, mimetype: 'application/octet-stream' } }] }
      , { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader' }, { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'url-loader', options: { limit: 10000, mimetype: 'application/svg-xml' } }] }
    ],
  }
  , resolve: {
    extensions: ['.js', '.jsx']
    , modules: [
      path.resolve('./app/')
      , path.resolve('./node_modules')
    ]
<<<<<<< HEAD
    , alias: {
      'preact-compat': 'preact-compat/dist/preact-compat'
      , 'react': 'preact-compat'
      , 'react-dom': 'preact-compat'
      // Not necessary unless you consume a module using `createClass`
      , 'create-react-class': 'preact-compat/lib/create-react-class'
    }
=======
>>>>>>> 3d427d6b473eaede6fb92f2f59fa9c95fcd8bd8b
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
    , new webpack.optimize.ModuleConcatenationPlugin()
    // Hot Module Replacement (HMR) plugins. They only load in development:
    , isProd ? noop() : new webpack.HotModuleReplacementPlugin()
    , isProd ? noop() : new webpack.NamedModulesPlugin()
    , isProd ? noop() : new webpack.NoEmitOnErrorsPlugin()
    // Production plugins:
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
    , isProd ? new ExtractTextPlugin({
      filename: 'style.css'
      , allChunks: true
    }) : noop()
    , isProd ? new webpack.optimize.AggressiveMergingPlugin() : noop()
    , isProd ? new webpack.optimize.OccurrenceOrderPlugin : noop()
    , new webpack.DefinePlugin({
<<<<<<< HEAD
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
=======
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv)
        , PUBLIC_URL: JSON.stringify(publicUrl)
      }
>>>>>>> 3d427d6b473eaede6fb92f2f59fa9c95fcd8bd8b
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
  , devServer: {
    contentBase: './app'
    , noInfo: false
    , historyApiFallback: true
    , hot: true
  }
}

module.exports = webpackConfig