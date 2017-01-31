var webpack = require('webpack');

module.exports = {
	entry: "./src/index.tsx",
	output: {
			filename: "bundle.js",
			path: __dirname + "/dist"
	},
	
	devtool: "source-map",
	
	resolve: {
		extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
	},
	
	module: {
		loaders: [
			{ test: /\.tsx?$/, loader: "awesome-typescript-loader" }
		],
		
		preLoaders: [
			{ test: /\.js$/, loader: "source-map-loader" }
		]
	},
	
	externals: {
		"react": "React",
		"react-dom": "ReactDOM"
	},
	
	plugins: [  
    new webpack.ProvidePlugin({
          Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
          fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
     })
	],
	
	watch: true
}