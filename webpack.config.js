const webpack = require('webpack');
const path = require('path');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

var productionPlugins = [
	new webpack.LoaderOptionsPlugin({
		minimize: true,
		debug: false
	}),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		},
		output: {
			comments: false
		},
		sourceMap: false
	})
];

var webpackConfig = {
	devtool: isProd ? 'hidden-source-map' : 'eval',
	entry: {
		js: [
			'index'
		]
	},
	output: {
		path: path.join(__dirname, 'app', 'dist', 'javascripts'),
		filename: 'bundle.js',
		publicPath: '/javascripts/'
	},
	module: {
		loaders: [
			{
				test: /\.(jsx|js)$/,
				exclude: /(node_modules|bower_components)/,
				loaders: [
					{
						loader: 'babel',
						query: {
							cacheDirectory: true,
							presets: ['es2015-native-modules', 'react', 'stage-0'],
							plugins: ['transform-runtime']
						},
						
					}
				],

			},
			{
				test: /\.css$/,
				loaders: [
					'style',
					'postcss',
					'css'
				]
			},
			{
				test: /\.scss$/,
				loaders: [
					'style',
					'css',
					'postcss',
					'sass'
				]
			},
			{test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
		],
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		modules: [
			path.resolve('./app/'),
			path.resolve('./node_modules')
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
		})
	],
	devServer: {
		contentBase: './app',
		noInfo: true
	},
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
};

if(isProd) {
	webpackConfig.plugins = webpackConfig.plugins.concat(productionPlugins)
}

module.exports = webpackConfig