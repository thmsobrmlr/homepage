var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var env = process.env.WEBPACK_ENV;
var host = '0.0.0.0';
var port = '9000';

var plugins = [], outputFileName;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFileName = 'bundle.min.js';
} else {
  outputFileName = 'bundle.js';
}

var config = {
  entry: './src/index.js',
  output: { path: __dirname + '/build', filename: outputFileName, publicPath: __dirname + '/public' },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  plugins: plugins
};

if (env === 'dev') {
  new WebpackDevServer(webpack(config), {
    contentBase: './public',
    hot: true,
    debug: true
  }).listen(port, host, function(error, result) {
    if(error) {
      console.log(error);
    }
  });

  console.log('Running at http://' + host + ':' + port + '/webpack-dev-server/');
}

module.exports = config;
