var path = require('path');
var webpack = require('webpack');
var server = require('webpack-dev-server');

var env = process.env.WEBPACK_ENV;
var host = '0.0.0.0';
var port = '9000';

var config = {
  entry: './src/index.js',
  output: { path: __dirname + '/build', filename: 'bundle.js', publicPath: __dirname + '/public' },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
};

if (env === 'dev') {
  new server(webpack(config), {
    contentBase: './public',
    hot: true,
    debug: true
  }).listen(port, host, function(error, result) {
    if(error) {
      console.log(error);
    }
  });

  console.log('Running at http://' + host + ':' + port);
}

module.exports = config;
