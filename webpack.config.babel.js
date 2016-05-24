/* eslint-disable no-console */

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import chalk from 'chalk';

import precss from 'precss';
import autoprefixer from 'autoprefixer';
import stylelint from 'stylelint';
import reporter from 'postcss-reporter';

const env = process.env.WEBPACK_ENV;
const host = '0.0.0.0';
const port = '9000';

const htmlWebpackConfig = {
  template: 'public/index.html',
  chunksSortMode: 'dependency',
};

const plugins = [
  new HtmlWebpackPlugin(htmlWebpackConfig),
];

let outputFileName;
let outputPath;
let cssLoader;

if (env === 'build') {
  // Minify js
  plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));

  // Extract css to file
  plugins.push(new ExtractTextPlugin('bundle.[chunkhash].min.css'));

  outputFileName = 'bundle.[chunkhash].min.js';
  outputPath = `${__dirname}/build/prod`;
  cssLoader = ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader');
} else {
  outputFileName = 'bundle.js';
  outputPath = `${__dirname}/build/dev`;
  cssLoader = 'style-loader!css-loader!postcss-loader';
}

const config = {
  entry: './src/index.js',
  output: {
    path: outputPath,
    filename: outputFileName,
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.html$/, loader: 'html' },
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader', 'eslint-loader'] },
      { test: /\.css$/, exclude: /node_modules/, loader: cssLoader },
      { test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i, loader: 'url-loader?limit=10000' },
    ],
  },
  plugins,
  eslint: {
    configFile: '.eslintrc',
  },
  postcss: [
    stylelint,
    precss,
    autoprefixer({ browsers: 'last 2 versions' }),
    reporter({ clearMessages: true }),
  ],
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

  console.log(chalk.green.bold(`Running at http://${host}:${port}/webpack-dev-server/`));
}

module.exports = config;
