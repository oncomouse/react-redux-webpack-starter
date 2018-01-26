const path = require('path')
const nodeExternals = require('webpack-node-externals')

const isCoverage = process.env.NODE_ENV === 'coverage';

const config = {}
config.module = {
	rules:[
		isCoverage ? {
		  test: /\.(js)/
		  , include: path.resolve('app') // instrument only testing sources with Istanbul, after ts-loader runs
		  , loader: 'istanbul-instrumenter-loader'
		}: []
		, {
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
// Uncomment for preact:
/*config.resolve = {
	alias: {
      'preact-compat': 'preact-compat/dist/preact-compat'
      , 'react': 'preact-compat'
      , 'react-dom': 'preact-compat'
      // Not necessary unless you consume a module using `createClass`
      , 'create-react-class': 'preact-compat/lib/create-react-class'
    }
}*/
config.target = 'node'
config.externals = [nodeExternals()]
config.devtool = "inline-cheap-module-source-map"

module.exports = config
