const path = require('path')
const nodeExternals = require('webpack-node-externals')
//const config = require('./webpack.config')

const config = {}
config.module = {
	rules:[
		{
			test: /\.scss$/
			, use: ['style-loader', 'css-loader?modules', 'sass-loader']
		}
		, {
			test: /\.css$/
			, use: ['style-loader', 'css-loader?modules']
		}
		, {
			test: /\.js$/
			, use: [
				{
					loader: 'babel-loader'
		            , options: {
		              cacheDirectory: true
		            }
				}
			]
		}
	]
}
config.target = 'node'
config.externals = [nodeExternals()]

module.exports = config
