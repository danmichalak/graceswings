'use strict';

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var lessPath = './less/app.less';

var entry = {
	app: [
		lessPath
	]
};

var plugins = [
	new ExtractTextPlugin({
    	filename: '[name].css'
  	})
]

module.exports = {
	context: path.resolve(__dirname, '.'),
	entry: entry,
	output: {
	    path: path.resolve(__dirname, 'css'),
	    filename: '[name].bundle.js',
	    publicPath: ''
	},
  	plugins: plugins,
	module: {
		rules: [
		{
        test: /\.(ttf|otf|eot|woff|woff2)(\?[a-z0-9]+)?$/,
        loader: 'url-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      },
			{
	        	test: /\.less$/,
	        	use: ExtractTextPlugin.extract({
	          		use: [ 'css-loader', 'less-loader' ],
	          		fallback: 'style-loader'
	        	})
	      	}
		]
	}
}