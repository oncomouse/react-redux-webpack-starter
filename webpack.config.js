const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const noop = require('noop-webpack-plugin');
const path = require('path');

// Set APP_TITLE to the title of your application. You can install and change this variable using react-helmet, if you need.
const APP_TITLE = 'My Sample App';

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

var webpackConfig = {
	devtool: isProd ? 'hidden-source-map' : 'eval',
	entry: {
		js: isProd ? ['index'] : [
			'react-hot-loader/patch',
			'index'
		]
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(jsx|js)$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
							presets: [['es2015', { "modules": false }], 'react', 'stage-0'],
							plugins: ['transform-runtime', 'ramda', 'tailcall-optimization']
						},
						
					}
				],

			},
			/*
				Loader code for .css files. We use style-loader in
				development to get HMR support. In production, we use
				ExtractTextPlugin to get a pre-built CSS file.
			*/
			{
				test: /\.css$/,
				use: isProd ? ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader',
						'postcss-loader'
					]
				}) : [
					'style-loader',
					'css-loader',
					'postcss-loader'
				]
			},
			/*
				SASS loader code for the module files (in
				app/stylesheets/components). These are intended to be
				styles for individual React components, which will have a
				unique name space.
			
				As above (with the CSS loader), we use style-loader for
				HMR support in development and switch to ExtractTextPlugin
				for production.
			*/
			{
				test: /\.scss$/,
				exclude: /global\.scss$/,
				use: isProd ? ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								modules: true,
								importLoaders: 1,
								localIdentName: '[name]__[local]___[hash:base64:5]'
							}
						},
						'postcss-loader',
						'sass-loader'
					]
				}) : [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 1,
							localIdentName: '[name]__[local]___[hash:base64:5]'
						}
					},
					'postcss-loader',
					'sass-loader'
				]
			},
			/*
				Loader code for a universal SCSS file. These styles will
				be (as long as you remember to import them into
				app/index.js) loaded for every component and are not
				uniquely namespaced as the module SCSS code above is.
			
				This file lives in app/stylesheets/global.scss. As above,
				we use style-loader for HMR in development and
				ExtractTextPlugin in production.
			*/
			{
				test: /\.scss$/,
				include: /global\.scss$/,
				// Include everything in style.css
				use: isProd ? ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader',
						'postcss-loader',
						'sass-loader'
					]
				}) : [
					'style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			/*
				Webfont loaders for Bootsrap and the like.
			*/
			{test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,use: [{loader: 'url-loader',options: {limit: 10000,mimetype: 'application/font-woff'}}]},
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,use: [{loader: 'url-loader',options: {limit: 10000,mimetype: 'application/octet-stream'}}]},
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,use: 'file-loader'},{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,use: [{loader: 'url-loader',options: {limit: 10000,mimetype: 'application/svg-xml'}}]}
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [
			path.resolve('./app/'),
			path.resolve('./node_modules')
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			files: {
				css: isProd ? ['style.css'] : [],
				js: ['bundle.js']
			},
			title: APP_TITLE,
			chunks: {
				head: {
					css: isProd ? ['style.css'] : []
				},
				main: {
					entry: 'bundle.js'
				}
			}
		}),
		isProd ? noop() : new webpack.HotModuleReplacementPlugin(),
		isProd ? noop() : new webpack.NamedModulesPlugin(),
		isProd ? noop() : new webpack.NoEmitOnErrorsPlugin(),
		isProd ? new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}) : noop(),
		isProd ? new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			output: {
				comments: false
			},
			sourceMap: false
		}) : noop(),
		isProd ? new ExtractTextPlugin({ filename: 'style.css', allChunks: true }) : noop(),
		isProd ? new webpack.optimize.OccurrenceOrderPlugin : noop(),
		new webpack.DefinePlugin({
			'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
			APP_TITLE: JSON.stringify(APP_TITLE)
			
		}),
		new webpack.LoaderOptionsPlugin({
			test: /\.s{0,1}css$/,
			options: {
				context: __dirname,
				sassLoader: {
					includePaths: [
						'./node_modules',
						'./bower_components',
						'./app/stylesheets'
					]
				},
				postcss: function() {
					return [
						require('autoprefixer')({browsers: 'last 3 versions'}),
						require('postcss-easings'),
						require('css-mqpacker'),
						require('postcss-clearfix')
					]
				}
			}
		})
	],
	devServer: {
		contentBase: './app',
		noInfo: false,
		historyApiFallback: true,
		hot: true
	}
};

module.exports = webpackConfig