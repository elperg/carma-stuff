var path = require('path');
var _ = require('lodash');
var webpack = require('webpack');

var webpackConfig = require('./webpack.config');
var devBuild = process.env.NODE_ENV !== 'production';
var nodeEnv = devBuild ? 'development' : 'production';


_.extend(webpackConfig, {
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    })
  ],
  entry: {}
});

// Add fixtures to webpack config
webpackConfig.resolve.alias['fixtures'] = path.join(process.cwd(), 'test', 'fixtures');
webpackConfig.resolve.alias['models'] = path.join(process.cwd(), 'test', 'models');


module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ], //run in PhantomJS
    singleRun: true, //just run once by default
    frameworks: [ 'jasmine' ], //use the jasmine test framework
    files: [
      './node_modules/babel-polyfill/dist/polyfill.js',
      './test/**/*.js'
    ],
    preprocessors: {
      './test/**/*.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'dots' ], //report results in this format
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};

