const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const noop = require('noop-webpack-plugin');
const path = require('path');

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
		loaders: [
			{
				test: /\.(jsx|js)$/,
				exclude: /(node_modules|bower_components)/,
				loaders: [
					{
						loader: 'babel-loader',
						query: {
							cacheDirectory: true,
							presets: [['es2015', { "modules": false }], 'react', 'stage-0'],
							plugins: ['ramda', 'transform-runtime', 'tailcall-optimization']
						},
						
					}
				],

			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!postcss-loader'})
			},
			{ // Do module loading code for everything except global.scss
				test: /\.scss$/,
				exclude: /global\.scss$/,
				loader:  ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader'})
			},
			{ // Load global.scss using style-loader
				test: /\.scss$/,
				include: /global\.scss$/,
				// Include everything in style.css
				loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!postcss-loader!sass-loader'})
			},
			{test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
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
				css: ['style.css'],
				js: ['bundle.js']
			},
			title: APP_TITLE,
			chunks: {
				head: {
					css: ['style.css']
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
		new ExtractTextPlugin({ filename: 'style.css', allChunks: true }),
		new webpack.optimize.OccurrenceOrderPlugin,
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