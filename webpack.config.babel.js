/* eslint-disable no-console */

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const env = process.env.WEBPACK_ENV;
const host = '0.0.0.0';
const port = '9000';

const plugins = [];
let outputFileName;

if (env === 'build') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
  outputFileName = 'bundle.min.js';
} else {
  outputFileName = 'bundle.js';
}

const config = {
  entry: './src/index.js',
  output: {
    path: `${__dirname}/build`,
    filename: outputFileName,
    publicPath: `${__dirname}/public`,
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader', 'eslint-loader'] },
    ],
  },
  plugins,
  eslint: {
    configFile: '.eslintrc',
  },
};

if (env === 'dev') {
  new WebpackDevServer(webpack(config), {
    contentBase: './public',
    hot: true,
    debug: true,
  }).listen(port, host, (error) => {
    if (error) {
      console.log(error);
    }
  });

  console.log(`Running at http://${host}:${port}/webpack-dev-server/`);
}

module.exports = config;
